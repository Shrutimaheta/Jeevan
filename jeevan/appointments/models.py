from django.db import models
from django.conf import settings
from care.models import Hospital
from doctor.models import Doctor
from patient.models import Patient

class Appointment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_MODE_CHOICES = [
        ('cash', 'Cash'),
        ('card', 'Card'),
        ('upi', 'UPI'),
        ('netbanking', 'Net Banking'),
        ('insurance', 'Insurance'),
    ]

    abha_id = models.CharField(max_length=20, unique=True, help_text="ABHA ID for the appointment", default="")
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="appointments")
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="appointments")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="appointments")
    
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    
    symptoms = models.TextField(blank=True, null=True, help_text="Describe your symptoms or reason for appointment")
    payment_mode = models.CharField(max_length=20, choices=PAYMENT_MODE_CHOICES, default='cash')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Appointment"
        verbose_name_plural = "Appointments"

    def __str__(self):
        return f"Appointment of {self.patient.full_name} with {self.doctor.full_name} on {self.appointment_date}"

    @property
    def can_edit(self):
        """Check if appointment can be edited (only if pending)"""
        return self.status == 'pending'
    
    @property
    def can_cancel(self):
        """Check if appointment can be cancelled (only if pending or accepted)"""
        return self.status in ['pending', 'accepted']