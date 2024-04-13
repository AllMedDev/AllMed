from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class User(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    pin = models.IntegerField()
    
    first_name = models.CharField(max_length=32)
    surname = models.CharField(max_length=32)
    
    # telephone = PhoneNumberField(blank=True)
    telephone = models.CharField(max_length=32)
    email = models.EmailField(max_length=64)
    
    address_street = models.CharField(max_length=64)
    address_city = models.CharField(max_length=64)
    
    def __str__(self):
        return f"{self.id} - {self.first_name} {self.surname}"



class Patient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    
    
    
class Doctor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    
    
    
class Appointment(models.Model):
    patient_id = models.PositiveIntegerField()
    doctor_id = models.PositiveIntegerField()
    date_time = models.DateTimeField()
    
    def __str__(self):
        return f"{self.patient_id} - {self.doctor_id} : {self.date_time}"