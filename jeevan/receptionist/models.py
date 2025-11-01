from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.core.exceptions import ValidationError
from care.models import Hospital
import re

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
    full_name = models.CharField(
        max_length=255,
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z\s\-\'\.]+$',
                message='Name can only contain letters, spaces, hyphens, apostrophes, and dots.'
            )
        ],
        help_text='Full name (letters, spaces, hyphens, apostrophes, and dots only)'
    )
    # email and contact_number are inherited from CustomUser
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    dob = models.DateField(
        null=True, 
        blank=True, 
        help_text='Date of Birth (age must be between 18-65 years)'
    )
    address = models.TextField(
        blank=True, 
        null=True, 
        help_text='Full residential address (minimum 10 characters)'
    )
    qualification = models.CharField(
        max_length=255, 
        blank=True, 
        null=True, 
        help_text='Educational qualification (minimum 2 characters)'
    )
    experience = models.PositiveIntegerField(
        default=0, 
        validators=[MinValueValidator(0), MaxValueValidator(50)],
        help_text='Years of experience (0-50 years)'
    )
    profile_picture = models.ImageField(
        upload_to='receptionist_photos/', 
        blank=True, 
        null=True, 
        help_text='Upload your profile picture (JPG, PNG, GIF - Max 5MB)'
    )
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=True)
    
    def clean(self):
        """Model-level validation"""
        super().clean()
        
        # Validate date of birth
        if self.dob:
            from datetime import date
            today = date.today()
            age = today.year - self.dob.year - ((today.month, today.day) < (self.dob.month, self.dob.day))
            
            if age < 18:
                raise ValidationError({'dob': 'Age must be at least 18 years.'})
            elif age > 65:
                raise ValidationError({'dob': 'Age must not exceed 65 years.'})
        
        # Validate address length
        if self.address and len(self.address.strip()) < 10:
            raise ValidationError({'address': 'Address must be at least 10 characters long.'})
        
        # Validate qualification length
        if self.qualification and len(self.qualification.strip()) < 2:
            raise ValidationError({'qualification': 'Qualification must be at least 2 characters long.'})
        
        # Validate full name
        if self.full_name:
            if len(self.full_name.strip()) < 2:
                raise ValidationError({'full_name': 'Name must be at least 2 characters long.'})
            
            if len(self.full_name.split()) < 2:
                raise ValidationError({'full_name': 'Please enter your full name (first name and last name).'})
    
    def save(self, *args, **kwargs):
        """Override save to run clean validation"""
        self.clean()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.full_name} ({self.hospital.name})"
