import io
from datetime import date
from django.test import TestCase, Client
from django.urls import reverse
from django.core.exceptions import ValidationError, PermissionDenied
from django.core.files.uploadedfile import SimpleUploadedFile
from django.contrib.auth import get_user_model
from django.core.cache import cache

from appointments.models import Appointment
from doctor.models import Doctor, Consent
from patient.models import Patient
from care.models import CustomUser, Hospital
from records.models import MedicalRecord
from records.services import create_medical_record, check_doctor_patient_access
from jeevan.test_helpers import JeevanTestClientMixin

User = get_user_model()

class MedicalRecordsTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        cache.clear()
        
        # Create hospital
        self.hospital = self.create_hospital()
        
        # Doctors
        self.doctor_user_a = self.create_user(username="doctor_a", role="doctor")
        self.doctor_a = self.create_doctor_profile(self.doctor_user_a, self.hospital, registration_number="DOC-A")
        
        self.doctor_user_b = self.create_user(username="doctor_b", role="doctor")
        self.doctor_b = self.create_doctor_profile(self.doctor_user_b, self.hospital, registration_number="DOC-B")
        
        # Patients
        self.patient_user_a = self.create_user(username="patient_a", role="patient")
        self.patient_a = self.create_patient_profile(self.patient_user_a)
        
        self.patient_user_b = self.create_user(username="patient_b", role="patient")
        self.patient_b = self.create_patient_profile(self.patient_user_b)
        
        # Appointment with Doctor A
        self.appointment = Appointment.objects.create(
            doctor=self.doctor_a,
            patient=self.patient_a,
            hospital=self.hospital,
            appointment_date=date.today(),
            appointment_time="10:00:00",
            status="accepted"
        )

    def test_create_record_service_authorized(self):
        # Create standard text file upload
        test_file = SimpleUploadedFile("report.pdf", b"%PDF-1.4 mock content here", content_type="application/pdf")
        
        record = create_medical_record(
            appointment_id=self.appointment.id,
            doctor=self.doctor_a,
            summary="Patient has flu.",
            diagnosis="Influenza",
            prescription="Rest and fluids.",
            report_file=test_file,
            actor=self.doctor_user_a
        )
        
        self.assertEqual(record.patient, self.patient_a)
        self.assertEqual(record.doctor, self.doctor_a)
        self.assertEqual(record.diagnosis, "Influenza")
        self.assertTrue(record.report_file.name.startswith("reports/report_"))

    def test_create_record_service_unauthorized_doctor(self):
        # Doctor B has no appointment/relationship, should be denied
        with self.assertRaises(PermissionDenied):
            create_medical_record(
                appointment_id=self.appointment.id,
                doctor=self.doctor_b,
                summary="Trying to read/write without relation.",
                actor=self.doctor_user_b
            )

    def test_create_record_service_file_validations(self):
        # 1. Invalid extension
        invalid_ext_file = SimpleUploadedFile("danger.exe", b"MZexecutable stuff", content_type="application/octet-stream")
        with self.assertRaises(ValidationError):
            create_medical_record(
                appointment_id=self.appointment.id,
                doctor=self.doctor_a,
                summary="Summary",
                report_file=invalid_ext_file,
                actor=self.doctor_user_a
            )
            
        # 2. Executable magic bytes in pdf name
        forged_pdf = SimpleUploadedFile("normal.pdf", b"MZ forged headers here", content_type="application/pdf")
        with self.assertRaises(ValidationError):
            create_medical_record(
                appointment_id=self.appointment.id,
                doctor=self.doctor_a,
                summary="Summary",
                report_file=forged_pdf,
                actor=self.doctor_user_a
            )

    def test_record_list_access_permissions(self):
        record = MedicalRecord.objects.create(
            appointment=self.appointment,
            patient=self.patient_a,
            doctor=self.doctor_a,
            summary="Flu checkup"
        )
        
        url = reverse('records:record_list', kwargs={'patient_id': self.patient_a.id})
        
        # 1. Patient A can view their own list
        self.login_user(self.client, "patient_a")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        
        # 2. Patient B cannot view Patient A's list (403)
        self.login_user(self.client, "patient_b")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)
        
        # 3. Doctor A (has appointment relationship) can view
        self.login_user(self.client, "doctor_a")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        
        # 4. Doctor B (no relationship) cannot view (403)
        self.login_user(self.client, "doctor_b")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)

    def test_record_detail_access_permissions(self):
        record = MedicalRecord.objects.create(
            appointment=self.appointment,
            patient=self.patient_a,
            doctor=self.doctor_a,
            summary="Flu checkup"
        )
        
        url = reverse('records:record_detail', kwargs={'record_id': record.id})
        
        # Patient A can view
        self.login_user(self.client, "patient_a")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        
        # Patient B cannot view (403)
        self.login_user(self.client, "patient_b")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)

    def test_rate_limiting_on_creation(self):
        # We login as Doctor A
        self.login_user(self.client, "doctor_a")
        url = reverse('records:create_record', kwargs={'appointment_id': self.appointment.id})
        
        # Call 5 times under limit
        for _ in range(5):
            response = self.client.post(url, {'summary': 'Checkup summary'})
            self.assertEqual(response.status_code, 302) # successful redirect
            
        # 6th call should be rate limited and redirect with error
        response = self.client.post(url, {'summary': 'Checkup summary'})
        self.assertEqual(response.status_code, 302)
        # Follow redirect or check messages
        # Cache key should prevent it
        cache_key = f"rl:create_record:{self.doctor_user_a.id}"
        self.assertEqual(cache.get(cache_key), 5)

    def test_fhir_and_snomed_interoperability(self):
        from records.services import create_medical_record
        record = create_medical_record(
            appointment_id=self.appointment.id,
            doctor=self.doctor_a,
            summary="SOAP visit summary details",
            diagnosis="Myocardial infarction",
            prescription="Aspirin 75mg once daily",
            snomed_diagnosis_code="22298006",
            snomed_diagnosis_display="Myocardial infarction",
            actor=self.doctor_user_a
        )
        
        self.assertEqual(record.snomed_diagnosis_code, "22298006")
        self.assertEqual(record.snomed_diagnosis_display, "Myocardial infarction")
        
        self.assertIsNotNone(record.fhir_condition)
        self.assertEqual(record.fhir_condition["resourceType"], "Condition")
        self.assertEqual(record.fhir_condition["code"]["coding"][0]["code"], "22298006")
        self.assertEqual(record.fhir_condition["code"]["coding"][0]["display"], "Myocardial infarction")
        self.assertEqual(record.fhir_condition["subject"]["reference"], f"Patient/{self.patient_a.id}")
        
        self.assertIsNotNone(record.fhir_medication_request)
        self.assertEqual(record.fhir_medication_request["resourceType"], "MedicationRequest")
        self.assertEqual(record.fhir_medication_request["medicationCodeableConcept"]["text"], "Aspirin 75mg once daily")
        self.assertEqual(record.fhir_medication_request["subject"]["reference"], f"Patient/{self.patient_a.id}")
