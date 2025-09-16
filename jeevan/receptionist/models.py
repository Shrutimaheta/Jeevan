from django.db import models
from django.conf import settings  
from care.models import Hospital

# Create your models here.
class Receptionist(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='receptionists')
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'receptionist'})
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, null=True, blank=True)
    contact_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    dob = models.DateField(null=True, blank=True, help_text='Date of Birth')
    address = models.TextField(blank=True, null=True, help_text='Full address')
    qualification = models.CharField(max_length=255, blank=True, null=True, help_text='Educational qualification')
    experience = models.PositiveIntegerField(default=0, help_text='Years of experience')
    profile_picture = models.ImageField(upload_to='receptionist_photos/', blank=True, null=True, help_text='Upload your profile picture')
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.full_name} ({self.hospital.name})"
