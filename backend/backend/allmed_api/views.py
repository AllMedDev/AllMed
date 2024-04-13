from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt # Needed?


"""
GET - lists of all the patients
"""
def list_patients(request):
    pass

"""
GET - list of all the doctors
"""
def list_doctors(request):
    pass

"""
GET - profile of user with user_id == pk
POST - updates user's data
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