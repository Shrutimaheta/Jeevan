from django.db import models
from django.conf import settings
from django.utils import timezone
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
        ('expired', 'Expired'),
    ]

    PAYMENT_MODE_CHOICES = [
        ('cash', 'Cash'),
        ('card', 'Card'),
        ('upi', 'UPI'),
        ('netbanking', 'Net Banking'),
        ('insurance', 'Insurance'),
    ]

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name="appointments")
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name="appointments")
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name="appointments")
    
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    
    symptoms = models.TextField(blank=True, null=True, help_text="Describe your symptoms or reason for appointment")
    payment_mode = models.CharField(max_length=20, choices=PAYMENT_MODE_CHOICES, default='cash')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    rejection_reason = models.TextField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Appointment"
        verbose_name_plural = "Appointments"
        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'appointment_date', 'appointment_time'],
                condition=~models.Q(status__in=['cancelled', 'rejected', 'expired']),
                name='unique_active_appointment_slot'
            )
        ]
        indexes = [
            models.Index(fields=["appointment_date"]),
            models.Index(fields=["doctor"]),
            models.Index(fields=["patient"]),
            models.Index(fields=["status"]),
        ]

    def __str__(self):
        return f"Appointment of {self.patient.full_name} with {self.doctor.full_name} on {self.appointment_date}"

    def clean(self):
        from django.core.exceptions import ValidationError
        from datetime import time, datetime
        super().clean()
        if self.status not in dict(self.STATUS_CHOICES):
            raise ValidationError('Invalid appointment status.')
        if self.payment_mode not in dict(self.PAYMENT_MODE_CHOICES):
            raise ValidationError('Invalid payment mode.')
        if self.doctor_id and self.hospital_id and self.doctor.hospital_id != self.hospital_id:
            raise ValidationError("The selected doctor does not belong to the selected hospital.")
            
        # Booking rules apply only when the date/time/doctor changes. Status
        # changes must remain possible after the visit has taken place.
        previous = type(self).objects.filter(pk=self.pk).first() if self.pk else None
        changed = previous is None or any(
            str(getattr(previous, field)) != str(getattr(self, field))
            for field in ('appointment_date', 'appointment_time', 'doctor_id', 'hospital_id')
        )
        if changed:
            from .scheduling import validate_booking_slot
            self.appointment_date, self.appointment_time = validate_booking_slot(
                self.appointment_date, self.appointment_time)

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
        if self.patient and self.hospital:
            self.patient.associated_hospitals.add(self.hospital)

    @property
    def can_edit(self):
        """Check if appointment can be edited (only if pending)"""
        return self.status == 'pending'
    
    @property
    def is_expired(self):
        """Check if appointment date has passed"""
        today = timezone.localdate()
        return self.appointment_date < today
    
    def check_and_update_expired_status(self):
        """Check if appointment should be marked as expired and update status"""
        # Only mark as expired if:
        # 1. The appointment date has passed
        # 2. The current status is 'pending' (not manually handled)
        if self.is_expired and self.status == 'pending':
            self.status = 'expired'
            self.save(update_fields=['status'])
            return True
        return False
    
    @classmethod
    def mark_expired_appointments(cls):
        """Class method to mark all expired pending appointments"""
        today = timezone.localdate()
        expired_count = cls.objects.filter(
            appointment_date__lt=today,
            status='pending'
        ).update(status='expired')
        return expired_count
    
    @property
    def can_cancel(self):
        """Check if appointment can be cancelled (only if pending or accepted)"""
        return self.status in ['pending', 'accepted']
