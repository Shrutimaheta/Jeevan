from django.db import models
from doctor.models import Doctor
from care.models import Hospital
from patient.models import Patient

class Teleconsultation(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
        ('no_show', 'No Show'),
    ]

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='teleconsultations')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='teleconsultations')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='teleconsultations')
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    duration_minutes = models.IntegerField(default=30, help_text='Duration in minutes')
    meeting_link = models.URLField(blank=True, null=True, help_text='Video call meeting link')
    meeting_id = models.CharField(max_length=100, blank=True, null=True, help_text='Meeting ID for video call')
    meeting_password = models.CharField(max_length=50, blank=True, null=True, help_text='Meeting password')
    symptoms = models.TextField(blank=True, null=True, help_text='Patient symptoms and concerns')
    notes = models.TextField(blank=True, null=True, help_text="Doctor's notes during consultation")
    prescription = models.TextField(blank=True, null=True, help_text='Prescription given during consultation')
    status = models.CharField(choices=STATUS_CHOICES, default='scheduled', max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    started_at = models.DateTimeField(blank=True, null=True)
    ended_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = 'Teleconsultation'
        verbose_name_plural = 'Teleconsultations'
        ordering = ['-created_at']

    def __str__(self):
        return f"Teleconsultation: {self.patient.full_name} with {self.doctor.full_name}"
