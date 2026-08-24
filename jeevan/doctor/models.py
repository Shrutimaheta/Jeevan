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
from django.core.validators import MinValueValidator, MaxValueValidator
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
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    accepts_insurance = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

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
    
    # Interoperability Support: SNOMED-CT & HL7 FHIR (JSON)
    snomed_diagnosis_code = models.CharField(max_length=50, blank=True, null=True, help_text="SNOMED-CT Code for the main diagnosis")
    snomed_diagnosis_display = models.CharField(max_length=255, blank=True, null=True, help_text="SNOMED-CT Preferred Term / Display name")
    fhir_condition = models.JSONField(blank=True, null=True, help_text="FHIR Condition resource representing diagnosis (JSON)")
    fhir_medication_request = models.JSONField(blank=True, null=True, help_text="FHIR MedicationRequest resource representing prescription (JSON)")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def generate_fhir_resources(self):
        """
        Generates and populates fhir_condition and fhir_medication_request JSON structures 
        using HL7 FHIR standards integrated with SNOMED-CT terminology codes.
        """
        import datetime
        date_str = self.created_at.strftime('%Y-%m-%d') if self.created_at else datetime.date.today().strftime('%Y-%m-%d')
        patient = self.appointment.patient
        
        # 1. Generate FHIR Condition Resource (Diagnosis)
        if self.snomed_diagnosis_code and self.snomed_diagnosis_display:
            self.fhir_condition = {
                "resourceType": "Condition",
                "id": f"condition-prescription-{self.id}",
                "clinicalStatus": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                            "code": "active",
                            "display": "Active"
                        }
                    ]
                },
                "verificationStatus": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                            "code": "confirmed",
                            "display": "Confirmed"
                        }
                    ]
                },
                "category": [
                    {
                        "coding": [
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                                "code": "encounter-diagnosis",
                                "display": "Encounter Diagnosis"
                            }
                        ]
                    }
                ],
                "code": {
                    "coding": [
                        {
                            "system": "http://snomed.info/sct",
                            "code": self.snomed_diagnosis_code,
                            "display": self.snomed_diagnosis_display
                        }
                    ],
                    "text": self.diagnosis or self.snomed_diagnosis_display
                },
                "subject": {
                    "reference": f"Patient/{patient.id}",
                    "display": patient.full_name
                },
                "recordedDate": date_str,
                "asserter": {
                    "reference": f"Practitioner/{self.doctor.id}",
                    "display": self.doctor.full_name
                }
            }
        else:
            self.fhir_condition = None

        # 2. Generate FHIR MedicationRequest Resource (Prescription)
        if self.medications:
            self.fhir_medication_request = {
                "resourceType": "MedicationRequest",
                "id": f"medicationrequest-prescription-{self.id}",
                "status": "active",
                "intent": "order",
                "medicationCodeableConcept": {
                    "coding": [
                        {
                            "system": "http://snomed.info/sct",
                            "code": "763158003",
                            "display": "Medicinal product"
                        }
                    ],
                    "text": self.medications
                },
                "subject": {
                    "reference": f"Patient/{patient.id}",
                    "display": patient.full_name
                },
                "authoredOn": date_str,
                "requester": {
                    "reference": f"Practitioner/{self.doctor.id}",
                    "display": self.doctor.full_name
                },
                "dosageInstruction": [
                    {
                        "text": f"Take as directed. Follow-up evaluation date: {self.follow_up_date.strftime('%Y-%m-%d') if self.follow_up_date else 'N/A'}"
                    }
                ]
            }
        else:
            self.fhir_medication_request = None

    def save(self, *args, **kwargs):
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new or not self.fhir_condition or not self.fhir_medication_request:
            self.generate_fhir_resources()
            super().save(update_fields=['fhir_condition', 'fhir_medication_request'])

    def __str__(self):
        return f"Prescription for Appointment {self.appointment_id}"


from django.utils import timezone
from patient.models import Patient


class Consent(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('expired', 'Expired'),
    ]
    
    id = models.BigAutoField(primary_key=True)
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending',
        help_text='Current status of the consent request'
    )
    requested_at = models.DateTimeField(
        auto_now_add=True,
        help_text='When the consent was requested'
    )
    responded_at = models.DateTimeField(
        blank=True, 
        null=True,
        help_text='When the patient responded to the consent request'
    )
    expires_at = models.DateTimeField(
        blank=True, 
        null=True,
        help_text='When the consent expires (if applicable)'
    )
    reason = models.TextField(
        blank=True, 
        help_text='Reason for requesting access to medical reports'
    )
    notes = models.TextField(
        blank=True, 
        help_text='Additional notes from patient'
    )
    doctor = models.ForeignKey(
        Doctor, 
        on_delete=models.CASCADE, 
        related_name='consent_requests',
        help_text='Doctor requesting access'
    )
    patient = models.ForeignKey(
        Patient, 
        on_delete=models.CASCADE, 
        related_name='consent_requests',
        help_text='Patient whose reports are being accessed'
    )

    class Meta:
        verbose_name = 'Consent Request'
        verbose_name_plural = 'Consent Requests'
        ordering = ['-requested_at']
        constraints = [
            models.UniqueConstraint(
                fields=['doctor', 'patient'],
                condition=models.Q(status__in=['pending', 'approved']),
                name='unique_active_consent'
            )
        ]

    def __str__(self):
        return f"Consent: {self.doctor.full_name} -> {self.patient.full_name} ({self.status})"
    
    def is_approved(self):
        """Check if consent is approved and not expired"""
        if self.status != 'approved':
            return False
        
        if self.expires_at and timezone.now() > self.expires_at:
            self.status = 'expired'
            self.save()
            return False
        
        return True
    
    def approve(self, notes=''):
        """Approve the consent request"""
        self.status = 'approved'
        self.responded_at = timezone.now()
        self.notes = notes
        self.save()
    
    def reject(self, notes=''):
        """Reject the consent request"""
        self.status = 'rejected'
        self.responded_at = timezone.now()
        self.notes = notes
        self.save()
    
    def set_expiry(self, days=30):
        """Set expiry date for the consent"""
        self.expires_at = timezone.now() + timezone.timedelta(days=days)
        self.save()

    def clean(self):
        from django.core.exceptions import ValidationError
        super().clean()
        if self.pk:
            original = Consent.objects.get(pk=self.pk)
            if original.status != self.status:
                allowed = {
                    'pending': ['approved', 'rejected', 'expired'],
                    'approved': ['expired', 'rejected'],
                    'rejected': [],
                    'expired': [],
                }
                if self.status not in allowed.get(original.status, []):
                    raise ValidationError(f"Invalid transition from {original.status} to {self.status}.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
