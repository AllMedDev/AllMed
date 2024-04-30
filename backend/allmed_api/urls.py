from django.urls import path

from . import views

urlpatterns = [
    path('patients', views.ListPatients.as_view(), name='list-patients'),
    path('doctors', views.ListDoctors.as_view(), name='list-doctors'),
    # path('user/<int:pk>', views.user_details, name='user-detail'),
    
    # path('appointments', views.create_appointment, name='create_appointment'),
    # path('appointments/<int:pk>', views.assigned_appointments, 
    #      name='show-assigned-appointments'),
    
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user')
]