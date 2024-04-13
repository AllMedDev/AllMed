from django.db import models
from django.core.validators import RegexValidator

class User(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    pin = models.IntegerField(max_length=32)
    
    first_name = models.CharField(max_length=32)
    surname = models.CharField(max_length=32)
    
    telephone = RegexValidator(r'^+[0-9]+$')
    email = models.EmailField(max_length=64)
    
    address_street = models.CharField(max_length=64)
    address_city = models.CharField(max_length=64)

class Patient(models.Model):
    user_id = models.PositiveIntegerField()
    
class Doctor(models.Model):
    user_id = models.PositiveIntegerField()
    
class Appointment(models.Model):
    patient_id = models.PositiveIntegerField()
    doctor_id = models.PositiveIntegerField()
    date_time = models.DateTimeField()