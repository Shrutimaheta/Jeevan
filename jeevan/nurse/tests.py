from datetime import date
from django.test import TestCase, Client
from django.urls import reverse
from django.core.exceptions import ValidationError, PermissionDenied
from django.contrib.auth import get_user_model
from django.core.cache import cache

from appointments.models import Appointment
from nurse.models import Nurse, ClinicalNote
from patient.models import Patient, VitalSign
from care.models import CustomUser, Hospital
from jeevan.test_helpers import JeevanTestClientMixin
from nurse.services import create_clinical_note, update_clinical_note, log_patient_vitals

User = get_user_model()

class NurseModuleTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        cache.clear()
        
        # Create hospitals
        self.hospital_a = self.create_hospital(name="Hospital A", registration_number="REG-A")
        self.hospital_b = self.create_hospital(name="Hospital B", registration_number="REG-B")
        
        # Nurses
        self.nurse_user_a = self.create_user(username="nurse_a", role="nurse")
        self.nurse_a = Nurse.objects.create(user=self.nurse_user_a, hospital=self.hospital_a, full_name="Nurse A", gender="Female")
        
        self.nurse_user_b = self.create_user(username="nurse_b", role="nurse")
        self.nurse_b = Nurse.objects.create(user=self.nurse_user_b, hospital=self.hospital_b, full_name="Nurse B", gender="Female")
        
        # Patients
        self.patient_user_a = self.create_user(username="patient_a", role="patient")
        self.patient_a = self.create_patient_profile(self.patient_user_a)
        
        self.patient_user_b = self.create_user(username="patient_b", role="patient")
        self.patient_b = self.create_patient_profile(self.patient_user_b)
        
        # Doctor A
        self.doctor_user_a = self.create_user(username="doctor_a", role="doctor")
        self.doctor_a = self.create_doctor_profile(self.doctor_user_a, self.hospital_a, registration_number="DOC-A")
        
        # Appointment for Patient A at Hospital A (Nurse A's hospital)
        self.appointment_a = Appointment.objects.create(
            doctor=self.doctor_a,
            patient=self.patient_a,
            hospital=self.hospital_a,
            appointment_date=date.today(),
            appointment_time="09:00:00",
            status="accepted"
        )

    def test_clinical_note_creation_and_update(self):
        # 1. Nurse A can write note for Patient A (relationship exists)
        note = create_clinical_note(
            patient_id=self.patient_a.id,
            nurse=self.nurse_a,
            note_text="Patient has mild headache.",
            actor=self.nurse_user_a
        )
        self.assertEqual(note.note, "Patient has mild headache.")
        
        # 2. Nurse A can update their own note
        updated_note = update_clinical_note(
            note_id=note.id,
            nurse=self.nurse_a,
            note_text="Patient headache resolved.",
            actor=self.nurse_user_a
        )
        self.assertEqual(updated_note.note, "Patient headache resolved.")
        
        # 3. Nurse B (from other hospital) cannot write note for Patient A
        with self.assertRaises(PermissionDenied):
            create_clinical_note(
                patient_id=self.patient_a.id,
                nurse=self.nurse_b,
                note_text="Nurse B trying to record note.",
                actor=self.nurse_user_b
            )
            
        # 4. Nurse B cannot edit Nurse A's note
        with self.assertRaises(PermissionDenied):
            update_clinical_note(
                note_id=note.id,
                nurse=self.nurse_b,
                note_text="Nurse B trying to hijack edit.",
                actor=self.nurse_user_b
            )

    def test_vitals_logging_ranges_validation(self):
        # 1. Valid vitals signs values pass validation
        vs = log_patient_vitals(
            patient_id=self.patient_a.id,
            nurse=self.nurse_a,
            blood_pressure_systolic=120,
            blood_pressure_diastolic=80,
            heart_rate=72,
            temperature="98.6",
            oxygen_saturation=98,
            actor=self.nurse_user_a
        )
        self.assertEqual(vs.heart_rate, 72)
        
        # 2. Invalid vitals values raise ranges ValidationErrors (BP systolic exceeds 250)
        with self.assertRaises(ValidationError):
            log_patient_vitals(
                patient_id=self.patient_a.id,
                nurse=self.nurse_a,
                blood_pressure_systolic=300,
                blood_pressure_diastolic=80,
                heart_rate=72,
                temperature="98.6",
                oxygen_saturation=98,
                actor=self.nurse_user_a
            )

    def test_nurse_patient_hospital_scoping_dashboard(self):
        # Nurse A logged in should see Patient A (active appointment in Hospital A)
        self.login_user(self.client, "nurse_a")
        url = reverse('nurse:dashboard')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.patient_a.full_name)
        # Should not see Patient B
        self.assertNotContains(response, self.patient_b.full_name)
        
        # Trying to view Patient B detail page directly as Nurse A should raise PermissionDenied (403)
        detail_url = reverse('nurse:patient_detail', kwargs={'patient_id': self.patient_b.id})
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, 403)

    def test_nurse_list_api_serialization(self):
        self.login_user(self.client, "nurse_a")
        url = reverse('nurse:nurse_list_api')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(len(data) >= 2)
        self.assertEqual(data[0]['full_name'], "Nurse A")
        self.assertEqual(data[0]['hospital'], "Hospital A")
