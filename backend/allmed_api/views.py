from hmac import new
from urllib import response
from django.http import HttpResponse, JsonResponse, QueryDict
from jsonschema import ValidationError
from allmed_api import models
import json
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from rest_framework.permissions import IsAuthenticated



class IsDoctor(IsAuthenticated):
    def has_permission(self, request, view):
        # if not super().has_permission(request, view):
        #     return False
        return request.user.isDoctor

class IsPatient(IsAuthenticated):
    def has_permission(self, request, view):
        # if not super().has_permission(request, view):
        #     return False
        
        return (not request.user.isDoctor)
    

class CsrfExemptSessionAuthentication(SessionAuthentication):
    
    def enforce_csrf(self, request):
        return


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication, )
    
    def post(self, request):
        clean_data = json.loads(request.body)
        serializer = UserRegisterSerializer(data=clean_data)
        print(clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            print(user)
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
        print(data)
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
        patients = list(models.User.objects.filter(isDoctor=False).values())
        return JsonResponse(patients, safe=False, status=200)


class ListDoctors(APIView):
    permission_classes = [permissions.IsAuthenticated, IsPatient]
    authentication_classes = (CsrfExemptSessionAuthentication, SessionAuthentication,)
    
    def get(self, request):
        doctors = list(models.User.objects.filter(isDoctor = True).values('first_name', 'surname', 'specialization', 'address_city'))
        print(doctors)
        return JsonResponse(doctors, safe=False, status=200)



def user_details(request, pk):
    pass
    
    
"""
GET - list of appintments where <pk> is either patient or doctor
"""
def assigned_appointments(request, pk):
    pass

"""
POST - create new appointment
"""
def create_appointment(request):
    pass

