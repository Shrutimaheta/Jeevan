from django.db import models
from django.conf import settings


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

    # Primary Key
    id = models.AutoField(primary_key=True)
    
    # User relationship
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'patient'}, related_name='patient_profile')
    
    # Personal Information
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    password = models.CharField(max_length=128, default='')  # Password field added
    profile_photo = models.ImageField(upload_to='patient_photos/', blank=True, null=True, help_text='Upload your profile photo')

    # Address Information
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)

    # Health Information
    abha_id = models.CharField(max_length=20, unique=True, blank=True, null=True)
    emergency_number = models.CharField(max_length=15, blank=True, null=True)
    blood_group = models.CharField(max_length=5, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    existing_condition = models.TextField(blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} ({self.email})"
