# from django.db import models
# from django.conf import settings  
# from care.models import Hospital, Specialization

# # Create your models here.
# class Nurse(models.Model):
#     id = models.AutoField(primary_key=True)
#     hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='nurses')
#     user = models.ForeignKey (settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'nurse'})
#     full_name = models.CharField(max_length=255)
#     contact_number = models.CharField(max_length=15)
#     gender = models.CharField(max_length=10, choices=[
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ])
#     password = models.CharField(max_length=128) 
#     def _str_(self):
#         return self.full_name

from django.db import models
from django.conf import settings  
from care.models import Hospital, CustomUser

class Nurse(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'nurse'}
    )
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='nurses')
    full_name = models.CharField(max_length=255)
    # contact_number is inherited from CustomUser
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.full_name

class ClinicalNote(models.Model):
    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey('patient.Patient', on_delete=models.CASCADE, related_name='clinical_notes')
    nurse = models.ForeignKey(Nurse, on_delete=models.CASCADE, related_name='clinical_notes')
    note = models.TextField(help_text="Clinical observation notes recorded by the nurse")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Note by {self.nurse.full_name} for {self.patient.full_name} ({self.created_at.date()})"

# Model is correct, no changes needed.

