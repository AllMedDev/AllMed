from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password, specialization, isDoctor, first_name, surname, 
                    telephone, pin, address_street, address_city):
        if not email:
            raise ValueError("Email is required.")
        if not password:
            raise ValueError("Password is required.")
    
        user = self.model(pin=pin, isDoctor=isDoctor,
                          specialization=specialization,
                          first_name=first_name, surname=surname, 
                          telephone=telephone, email=email,
                          address_street=address_street,
                          address_city=address_city)
        user.set_password(password)
        user.save()
        return user

class User(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True, editable=False)
    pin = models.CharField(max_length=32, unique=True)
    
    specialization = models.CharField(max_length=64, blank=True)
    isDoctor = models.BooleanField()
    
    first_name = models.CharField(max_length=32)
    surname = models.CharField(max_length=32)
    
    telephone = models.CharField(max_length=32)
    email = models.EmailField(max_length=64, unique=True)
    
    address_street = models.CharField(max_length=64)
    address_city = models.CharField(max_length=64)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['pin', 'specialization', 'first_name', 'surname', 'telephone',
                       'address_street', 'address_city']
    
    objects = UserManager()
    
    def __str__(self):
        return f"{self.id} - {self.first_name} {self.surname}"

    
class Appointment(models.Model):
    patient_id = models.PositiveIntegerField()
    doctor_id = models.PositiveIntegerField()
    date = models.DateField()
    time = models.TimeField()
    
    
    def __str__(self):
        return f"{self.patient_id} - {self.doctor_id} : {self.date} {self.time}"