# from django.db import models
# from django.conf import settings  
# from care.models import Hospital, Specialization

# class Doctor(models.Model):
#     GENDER_CHOICES = [
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ]

#     id = models.AutoField(primary_key=True)
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'doctor'})
#     hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
#     full_name = models.CharField(max_length=255)
#     contact_number = models.CharField(max_length=15)
#     gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
#     specialization = models.ManyToManyField(Specialization)
#     password = models.CharField(max_length=128)

#     def __str__(self):
#         return f"{self.full_name} ({self.hospital.name})"


from django.db import models
from django.conf import settings
from care.models import CustomUser, Hospital, Specialization

class Doctor(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'doctor'}
    )
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    # email and contact_number are inherited from CustomUser
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    dob = models.DateField(null=True, blank=True, help_text='Date of Birth')
    specialization = models.ManyToManyField(Specialization)
    registration_number = models.CharField(max_length=50, unique=True, null=True, blank=True, help_text='Official doctor license/medical registration ID')
    experience = models.PositiveIntegerField(default=0, help_text='Years of experience')
    qualification = models.CharField(max_length=255, null=True, blank=True, help_text='e.g., MBBS, MD, MS, etc.')
    address = models.TextField(blank=True, null=True, help_text='Full address')
    profile_picture = models.ImageField(upload_to='doctor_photos/', blank=True, null=True, help_text='Upload doctor photo')
    is_active = models.BooleanField(default=True, help_text='Enable/disable doctor access')
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    accepts_insurance = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return f"{self.full_name} ({self.hospital.name})"

# Model is correct, no changes needed.

from appointments.models import Appointment


class Language(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# Extend Doctor with languages spoken
Doctor.add_to_class('languages', models.ManyToManyField(Language, blank=True))


class Review(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='reviews')
    patient_name = models.CharField(max_length=255)
    rating = models.PositiveSmallIntegerField(default=5)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Review {self.rating}★ for {self.doctor.full_name}"

class AppointmentPrescription(models.Model):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, related_name='prescription')
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='prescriptions')
    patient_name = models.CharField(max_length=255)
    diagnosis = models.TextField(blank=True)
    medications = models.TextField(blank=True, help_text='List medications with dosage and frequency')
    tests_recommended = models.TextField(blank=True)
    advice = models.TextField(blank=True)
    follow_up_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Prescription for Appointment {self.appointment_id}"
