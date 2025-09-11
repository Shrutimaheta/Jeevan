from django.db import models
from care.models import Patient

class AbhaLink(models.Model):
    patient = models.OneToOneField(Patient, on_delete=models.CASCADE, related_name='abha_link')
    abha_id = models.CharField(max_length=20, unique=True)
    verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class OtpSession(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='otp_sessions')
    channel = models.CharField(max_length=10, choices=[('sms','SMS'),('email','Email')])
    code = models.CharField(max_length=6)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
