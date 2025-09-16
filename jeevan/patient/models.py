from django.db import models
from django.conf import settings
import uuid
from datetime import timedelta
from django.utils import timezone


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
    contact_number = models.CharField(max_length=15, blank=True, null=True)
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


class PatientDocument(models.Model):
    DOCUMENT_TYPES = [
        ('report', 'Medical Report'),
        ('prescription', 'Prescription'),
        ('lab_result', 'Lab Result'),
        ('scan', 'Scan/Imaging'),
        ('insurance', 'Insurance Document'),
        ('id_proof', 'ID Proof'),
        ('other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255, help_text='Document title or description')
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES, default='other')
    file = models.FileField(upload_to='patient_documents/%Y/%m/', help_text='Upload your document')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField(blank=True, null=True, help_text='Additional notes about this document')

    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'Patient Document'
        verbose_name_plural = 'Patient Documents'

    def __str__(self):
        return f"{self.patient.full_name} - {self.title}"

    @property
    def file_size(self):
        """Return file size in human readable format"""
        if self.file:
            size = self.file.size
            for unit in ['B', 'KB', 'MB', 'GB']:
                if size < 1024.0:
                    return f"{size:.1f} {unit}"
                size /= 1024.0
            return f"{size:.1f} TB"
        return "0 B"

    @property
    def file_extension(self):
        """Return file extension"""
        if self.file:
            return self.file.name.split('.')[-1].upper()
        return ""

    @property
    def is_image(self):
        """Check if file is an image"""
        image_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        return self.file_extension.lower() in image_extensions

    @property
    def is_pdf(self):
        """Check if file is a PDF"""
        return self.file_extension.lower() == 'pdf'


class PasswordResetToken(models.Model):
    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='password_reset_tokens')
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Password Reset Token'
        verbose_name_plural = 'Password Reset Tokens'
    
    def __str__(self):
        return f"Reset token for {self.patient.full_name}"
    
    @property
    def is_expired(self):
        """Check if token is expired (24 hours)"""
        return timezone.now() > self.created_at + timedelta(hours=24)
    
    def is_valid(self):
        """Check if token is valid (not used and not expired)"""
        return not self.is_used and not self.is_expired
