from django.db import models
from doctor.models import Doctor
from patient.models import Patient
from appointments.models import Appointment
from jeevan.storage import private_storage

from records.utils import secure_reports_path

class MedicalRecord(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE, related_name='records')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='records')
    doctor = models.ForeignKey(Doctor, on_delete=models.SET_NULL, null=True, blank=True)

    summary = models.TextField()  # visit summary / SOAP
    diagnosis = models.TextField(blank=True)
    prescription = models.TextField(blank=True)
    next_dose_date = models.DateField(null=True, blank=True)
    report_file = models.FileField(upload_to=secure_reports_path, storage=private_storage, null=True, blank=True)

    # Interoperability Support: SNOMED-CT & HL7 FHIR (JSON)
    snomed_diagnosis_code = models.CharField(max_length=50, blank=True, null=True, help_text="SNOMED-CT Code for the main diagnosis")
    snomed_diagnosis_display = models.CharField(max_length=255, blank=True, null=True, help_text="SNOMED-CT Preferred Term / Display name")
    fhir_condition = models.JSONField(blank=True, null=True, help_text="FHIR Condition resource representing diagnosis (JSON)")
    fhir_medication_request = models.JSONField(blank=True, null=True, help_text="FHIR MedicationRequest resource representing prescription (JSON)")

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def generate_fhir_resources(self):
        """
        Generates and populates fhir_condition and fhir_medication_request JSON structures 
        using HL7 FHIR standards integrated with SNOMED-CT terminology codes.
        """
        import datetime
        date_str = self.created_at.strftime('%Y-%m-%d') if self.created_at else datetime.date.today().strftime('%Y-%m-%d')
        
        # 1. Generate FHIR Condition Resource (Diagnosis)
        if self.snomed_diagnosis_code and self.snomed_diagnosis_display:
            self.fhir_condition = {
                "resourceType": "Condition",
                "id": f"condition-{self.id}",
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
                    "reference": f"Patient/{self.patient.id}",
                    "display": self.patient.full_name
                },
                "recordedDate": date_str,
                "asserter": {
                    "reference": f"Practitioner/{self.doctor.id if self.doctor else 'unknown'}",
                    "display": self.doctor.full_name if self.doctor else "Unknown Doctor"
                }
            }
        else:
            self.fhir_condition = None

        # 2. Generate FHIR MedicationRequest Resource (Prescription)
        if self.prescription:
            self.fhir_medication_request = {
                "resourceType": "MedicationRequest",
                "id": f"medicationrequest-{self.id}",
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
                    "text": self.prescription
                },
                "subject": {
                    "reference": f"Patient/{self.patient.id}",
                    "display": self.patient.full_name
                },
                "authoredOn": date_str,
                "requester": {
                    "reference": f"Practitioner/{self.doctor.id if self.doctor else 'unknown'}",
                    "display": self.doctor.full_name if self.doctor else "Unknown Doctor"
                },
                "dosageInstruction": [
                    {
                        "text": f"Take as directed. Next dose evaluation date: {self.next_dose_date.strftime('%Y-%m-%d') if self.next_dose_date else 'N/A'}"
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
        return f"Record: {self.patient.full_name} - {self.created_at.date()}"
