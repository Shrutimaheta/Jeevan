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
    contact_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    specialization = models.ManyToManyField(Specialization)

    def __str__(self):
        return f"{self.full_name} ({self.hospital.name})"

# Model is correct, no changes needed.

from appointments.models import Appointment

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
