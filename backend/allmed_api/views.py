from hmac import new
from django.http import HttpResponse, JsonResponse
from allmed_api import models
import json
from django.views.decorators.csrf import csrf_exempt # Needed?


"""
GET - lists of all the patients
POST - create new patient 
"""
@csrf_exempt
def list_patients(request):
    if request.method == "GET":
        patients = list(models.User.objects.filter(id__in=models.Patient.objects.all().values('user')).values())
        return JsonResponse(patients, safe=False, status=200)
    elif request.method == "POST":
        user_dict = json.loads(request.body)
        new_user = create_user(user_dict)
        
        new_patient = models.Patient.objects.create(user=new_user)
        new_patient.save()
        
        return JsonResponse(user_dict, status=200)
        
    response = HttpResponse('Invalid method')
    response.status_code = 405
    return response



"""
GET - list of all the doctors
POST - create new doctor
"""
@csrf_exempt
def list_doctors(request):
    if request.method == "GET":
        doctors = list(models.User.objects.filter(id__in=models.Doctor.objects.all().values('user')).values())
        return JsonResponse(doctors, safe=False, status=200)
    elif request.method == "POST":
        # TODO add doctor's specializations
        user_dict = json.loads(request.body)
        new_user = create_user(user_dict)
        
        new_doctor = models.Doctor.objects.create(user=new_user)
        new_doctor.save()
        
        return JsonResponse(user_dict, status=200)
        
    response = HttpResponse('Invalid method')
    response.status_code = 405
    return response

"""
GET - profile of user with user_id == pk
PUT - updates user's data
"""
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





def create_user(user_dict):
     new_user = models.User(**user_dict)
     new_user.save()
     return new_user