from xml.dom import ValidationErr
from jsonschema import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from . import models

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'password', 'pin', 'isDoctor', 'specialization', 'first_name', 'surname', 
                  'telephone', 'email', 'address_street', 'address_city']
    
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(pin = clean_data['pin'],
                                                 password = clean_data['password'],
                                                 specialization = clean_data['specialization'],
                                                 isDoctor = clean_data['isDoctor'],
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
         fields = ['id', 'password', 'isDoctor', 'email', 'pin', 'first_name', 'surname', 
                  'telephone', 'email', 'address_street', 'address_city']
         