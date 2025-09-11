from django.db import models
from doctor.models import Doctor
from care.models import Patient
from appointments.models import Appointment

class MedicalRecord(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='records')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='records')
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, blank=True)

    summary = models.TextField()  # visit summary / SOAP
    diagnosis = models.TextField(blank=True)
    prescription = models.TextField(blank=True)
    next_dose_date = models.DateField(null=True, blank=True)
    report_file = models.FileField(upload_to='reports/', null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Record: {self.patient.full_name} - {self.created_at.date()}"
# Model is correct, no changes needed.
