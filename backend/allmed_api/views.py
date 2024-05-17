import datetime
from django.http import JsonResponse
from jsonschema import ValidationError
from allmed_api import models
import json
from django.contrib.auth import login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import AppointmentSerializer, UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated



class IsDoctor(IsAuthenticated):
    def has_permission(self, request, view):
        return request.user.is_doctor

class IsPatient(IsAuthenticated):
    def has_permission(self, request, view):
        return (not request.user.is_doctor)
    
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication, )
    
    def post(self, request):
        clean_data = json.loads(request.body)
        serializer = UserRegisterSerializer(data=clean_data)
        
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    
    def put(self, request):
        new_user = json.loads(request.body)
        curr_user = models.User.objects.get(pk=new_user['id'])
        serializer = UserRegisterSerializer(curr_user, data=new_user)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication,)
    
    def post(self, request):
        data = json.loads(request.body)
        
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            try:
                user = serializer.check_user(data)
            except ValidationError:
                return Response({'login':'Invalid user or password'}, status=status.HTTP_404_NOT_FOUND)
            login(request, user)
            return Response(serializer.data, status.HTTP_200_OK)
            

class UserLogout(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication, )
    
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication, )
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)



class ListPatients(APIView):
    permission_classes = [permissions.IsAuthenticated, IsDoctor]
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication,)
    
    def get(self, request):
        patients = list(models.User.objects.filter(is_doctor=False).values())
        return JsonResponse(patients, safe=False, status=200)


class ListDoctors(APIView):
    permission_classes = [permissions.IsAuthenticated, IsPatient]
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication,)
    
    def get(self, request):
        doctors = list(models.User.objects.filter(is_doctor = True).values('id', 'first_name', 'surname', 'specialization', 'address_street', 'address_city'))
        
        return JsonResponse(doctors, safe=False, status=200)
    
    def post(self, request):
        doctor_id = json.loads(request.body)
        candidate = GetDoctorById(doctor_id)
        
        return JsonResponse(candidate, safe=False, status=200)

class ListAppointments(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication,)
    
    def post(self, request):
        target_id = json.loads(request.body)['doctor_id']
        just_future = json.loads(request.body)['just_future']
        
        appointments = GetAppointmentsById  (target_id, just_future)     
        
        output = {}
        for entry in appointments:
            if (output.get(entry["date"].strftime("%Y-%m-%d"), False) == False):
                output[entry["date"].strftime("%Y-%m-%d")] = []
                
            output[entry["date"].strftime("%Y-%m-%d")].append(entry["time"].strftime("%H:%M"))


        return JsonResponse(output, safe=False, status=200)
    
class AppointmentCreate(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication,)
    
    def post(self, request):
        clean_data = json.loads(request.body)
        serializer = AppointmentSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            appointment = serializer.create(clean_data)
            if appointment:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class AppointmentsDetailed(APIView):
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication,)
    
    def post(self, request):
        target_id = json.loads(request.body)['id']
        just_future = json.loads(request.body)['just_future']
        
        appointments = GetAppointmentsById(target_id, just_future)
        
        output = []
        
        for entry in appointments:
            doctor = GetDoctorById(entry['doctor_id'])[0]
            patient = GetPatientById(entry['patient_id'])[0]
            
            output.append({
                "doctor_firstname":doctor['first_name'],
                "doctor_surname":doctor['surname'],
                "doctor_surname":doctor['surname'],
                "specialization":doctor['specialization'],
                "address_city":doctor['address_city'],
                "address_street":doctor['address_street'],
                
                "patient_first_name":patient['first_name'],
                "patient_surname":patient['surname'],
                "patient_address_street":patient['address_street'],
                "patient_telephone":patient['telephone'],
                "date":entry['date'],
                "time":entry['time'],
            })
        
        return Response(output, status=200)
    
class DoctorPatientsDetailed(APIView):
    permission_classes = [permissions.IsAuthenticated, IsDoctor, ]
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication, )
    
    def post(self, request):
        loaded_body = json.loads(request.body)
        target_id = loaded_body['doctor_id']
        appointments = GetAppointmentsById(target_id, loaded_body['just_future'])
        
        output = []
        
        for entry in appointments:
            patient = GetPatientById(entry['patient_id'])[0]
            if (PatientInOutput(patient['pin'], output)):
                continue
            last_appointment = GetLastAppointment(entry['patient_id'], target_id)
            
            output.append({
                "patient_pin":patient['pin'],
                "patient_first_name":patient['first_name'],
                "patient_surname":patient['surname'],
                
                "patient_telephone":patient['telephone'],
                "patient_email":patient['email'],
                
                "patient_address_street":patient['address_street'],
                "patient_address_city":patient['address_city'],
                "last_appointment_date":last_appointment['date']
            })
        
        return Response(output, status=200)
    


def GetDoctorById(doctor_id):
    return list(models.User.objects.filter(is_doctor = True).filter(id = doctor_id).values("first_name", "surname", "specialization", "address_street", "address_city"))

def GetPatientById(patient_id):
    return list(models.User.objects.filter(is_doctor = False).filter(id = patient_id).values("pin", "first_name", "surname", "email", "telephone", "address_street", "address_city"))

def GetLastAppointment(patient_id, doctor_id):
    return list(models.Appointment.objects.filter(patient_id = patient_id).filter(doctor_id = doctor_id).order_by("date").values("date"))[0]
        
def PatientInOutput(patient_pin, output):
    for entry in output:
        if (entry['patient_pin'] == patient_pin):
            return True
    return False

def GetAppointmentsById(userId, justFuture):
    if (justFuture):
        patient_appointments = list(models.Appointment.objects.filter(date__gte=datetime.datetime.now().date()).filter(patient_id = userId).values("patient_id", "doctor_id", "date", "time"))
        doctor_appointments = list(models.Appointment.objects.filter(date__gte=datetime.datetime.now().date()).filter(doctor_id = userId).values("patient_id", "doctor_id", "date", "time"))
    else:
        patient_appointments = list(models.Appointment.objects.filter(date__lt=datetime.datetime.now().date()).filter(patient_id = userId).values("patient_id", "doctor_id", "date", "time"))
        doctor_appointments = list(models.Appointment.objects.filter(date__lt=datetime.datetime.now().date()).filter(doctor_id = userId).values("patient_id", "doctor_id", "date", "time"))
    
    patient_appointments.extend(doctor_appointments)
    
    return patient_appointments

        