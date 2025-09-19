from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User,AbstractUser
from django.conf import settings

ROLE_CHOICES = [
    ('admin', 'Admin'),
    ('doctor', 'Doctor'),
    ('nurse', 'Nurse'),
    ('receptionist', 'Receptionist'),
    ('patient', 'Patient'),
]

class CustomUser(AbstractUser):
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')
    full_name = models.CharField(max_length=150)

    def __str__(self):
        return self.full_name
    
class Specialization(models.Model):
    Sname = models.CharField(max_length=100)

    def __str__(self):
        return self.Sname

class Hospital(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=255)
    email = models.EmailField()
    contact_no = models.CharField(max_length=15)
    registration_number = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='hospital_logos/', blank=True, null=True)
    specialization = models.ManyToManyField(Specialization)

    def __str__(self):
        return self.name

class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'patient'}
    )
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    dob = models.DateField()
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    abha_id = models.CharField(max_length=20, unique=True, blank=True, null=True)
    emergency_number = models.CharField(max_length=15, blank=True, null=True)
    blood_group = models.CharField(max_length=5, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    existing_condition = models.TextField(blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.full_name
    