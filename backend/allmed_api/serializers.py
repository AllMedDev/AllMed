from xml.dom import ValidationErr
from jsonschema import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from . import models

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'password', 'pin', 'is_doctor', 'specialization', 'first_name', 'surname', 
                  'telephone', 'email', 'address_street', 'address_city']
    
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(pin = clean_data['pin'],
                                                 password = clean_data['password'],
                                                 specialization = clean_data['specialization'],
                                                 is_doctor = clean_data['is_doctor'],
                                                 first_name = clean_data['first_name'],
                                                 surname = clean_data['surname'],
                                                 telephone = clean_data['telephone'],
                                                 email = clean_data['email'],
                                                 address_street = clean_data['address_street'],
                                                 address_city = clean_data['address_city'])
        user_obj.save()
        return user_obj
        
    
class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()
    
    def check_user(self, clean_data):
        user = authenticate(email=clean_data['email'], 
                            password=clean_data['password'])
        if not user:
            raise ValidationError("User not found.")
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
         model = UserModel
         fields = ['id', 'is_doctor', 'email', 'pin', 'first_name', 'surname', 
                  'telephone', 'email', 'address_street', 'address_city']
         
class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Appointment
        fields = ['patient_id', 'doctor_id', "date", "time"]
         
    def create(self, clean_data):
        appointment_obj = models.Appointment.objects.create(patient_id = clean_data['patient_id'],
                                                                       doctor_id = clean_data['doctor_id'],
                                                                       date = clean_data['date'],
                                                                       time = clean_data['time'])
        appointment_obj.save()
        return appointment_obj