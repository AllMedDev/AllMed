from django.urls import path

from . import views

urlpatterns = [
    path('patients', views.list_patients, name='list-patients'),
    path('doctors', views.list_doctors, name='list-doctors'),
    path('user/<int:pk>', views.user_details, name='user-detail'),
    
    path('appointments', views.create_appointment, name='create_appointment'),
    path('appointments/<int:pk>', views.assigned_appointments, 
         name='show-assigned-appointments'),
]