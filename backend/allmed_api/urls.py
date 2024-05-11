from django.urls import path

from . import views

urlpatterns = [
    path('user', views.UserView.as_view(), name='user'),
    
    path('patients', views.ListPatients.as_view(), name='list-patients'),
    path('doctors', views.ListDoctors.as_view(), name='list-doctors'),
    
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    
    path('appointments', views.ListAppointments.as_view(), name='appointments' ),
    path('new-appointment', views.AppointmentCreate.as_view(), name='new-appointment'),
    
    path('detailed-appointments', views.AppointmentsDetailed.as_view(), name='detailed-appointments'),
    path('doctor-detailed-patients', views.DoctorPatientsDetailed.as_view(), name='doctor-detailed-apointments')
]