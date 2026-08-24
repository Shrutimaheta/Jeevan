from datetime import date, timedelta
from django.test import TestCase, Client
from django.urls import reverse
from django.core.exceptions import ValidationError, PermissionDenied
from django.contrib.auth import get_user_model

from appointments.models import Appointment
from doctor.models import Doctor, Consent, AppointmentPrescription
from patient.models import Patient
from care.models import CustomUser, Hospital
from jeevan.test_helpers import JeevanTestClientMixin
from doctor.services import save_prescription, request_consent, approve_consent, reject_consent

User = get_user_model()

class AppointmentStatusOwnershipTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        
        # Create hospital
        self.hospital = self.create_hospital()
        
        # Create doctor 1
        self.doctor_user_1 = self.create_user(username="doc1", role="doctor")
        self.doctor_1 = self.create_doctor_profile(self.doctor_user_1, self.hospital, registration_number="DOC001")
        
        # Create doctor 2
        self.doctor_user_2 = self.create_user(username="doc2", role="doctor")
        self.doctor_2 = self.create_doctor_profile(self.doctor_user_2, self.hospital, registration_number="DOC002")
        
        # Create patient
        self.patient_user = self.create_user(username="patient1", role="patient")
        self.patient = self.create_patient_profile(self.patient_user)
        
        # Create appointment for Doctor 1
        self.appointment = Appointment.objects.create(
            doctor=self.doctor_1,
            patient=self.patient,
            hospital=self.hospital,
            appointment_date="2026-10-10",
            appointment_time="10:00:00",
            status="pending"
        )
        
    def test_unauthorized_if_not_doctor(self):
        self.login_user(self.client, "patient1")
        url = reverse('doctor:update_appointment_status', kwargs={'appointment_id': self.appointment.id, 'status': 'accepted'})
        response = self.client.post(url)
        self.assertEqual(response.json()['success'], False)
        self.assertEqual(response.json()['message'], 'You do not have permission to perform this action.')

    def test_cannot_update_another_doctors_appointment(self):
        # Login as Doctor 2
        self.login_user(self.client, "doc2")
        url = reverse('doctor:update_appointment_status', kwargs={'appointment_id': self.appointment.id, 'status': 'accepted'})
        response = self.client.post(url)
        self.assertEqual(response.json()['success'], False)
        self.assertEqual(response.json()['message'], 'Appointment not found')

    def test_can_update_own_appointment(self):
        # Login as Doctor 1
        self.login_user(self.client, "doc1")
        url = reverse('doctor:update_appointment_status', kwargs={'appointment_id': self.appointment.id, 'status': 'accepted'})
        response = self.client.post(url)
        self.assertEqual(response.json()['success'], True)
        self.assertEqual(response.json()['new_status'], 'accepted')
        self.appointment.refresh_from_db()
        self.assertEqual(self.appointment.status, 'accepted')

class DoctorServiceAndSecurityTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        self.hospital = self.create_hospital()
        
        self.doctor_user_a = self.create_user(username="doctor_a", role="doctor")
        self.doctor_a = self.create_doctor_profile(self.doctor_user_a, self.hospital, registration_number="DOC-A")
        
        self.doctor_user_b = self.create_user(username="doctor_b", role="doctor")
        self.doctor_b = self.create_doctor_profile(self.doctor_user_b, self.hospital, registration_number="DOC-B")
        
        self.patient_user_a = self.create_user(username="patient_a", role="patient")
        self.patient_a = self.create_patient_profile(self.patient_user_a)

        self.appointment = Appointment.objects.create(
            doctor=self.doctor_a,
            patient=self.patient_a,
            hospital=self.hospital,
            appointment_date=date.today() + timedelta(days=1),
            appointment_time="11:00:00",
            status="accepted"
        )

    def test_prescription_medications_validation(self):
        # Invalid format should fail
        with self.assertRaises(ValidationError):
            save_prescription(
                appointment_id=self.appointment.id,
                doctor=self.doctor_a,
                diagnosis="Common Cold",
                medications="Paracetamol - 500mg" # Missing frequency and duration
            )
            
        # Valid format should pass
        pres = save_prescription(
            appointment_id=self.appointment.id,
            doctor=self.doctor_a,
            diagnosis="Common Cold",
            medications="Paracetamol - 500mg - Twice daily - 5 days\nIbuprofen - 400mg - Once daily - 3 days"
        )
        self.assertEqual(pres.diagnosis, "Common Cold")
        
    def test_prescription_prevent_edit_after_completed(self):
        # Save initially
        save_prescription(
            appointment_id=self.appointment.id,
            doctor=self.doctor_a,
            diagnosis="Flu",
            medications="Aspirin - 100mg - Once daily - 7 days"
        )
        self.appointment.refresh_from_db()
        self.assertEqual(self.appointment.status, "completed")
        
        # Save again after completion (editing) should fail
        with self.assertRaises(ValidationError):
            save_prescription(
                appointment_id=self.appointment.id,
                doctor=self.doctor_a,
                diagnosis="Flu Update",
                medications="Aspirin - 100mg - Once daily - 7 days"
            )

    def test_doctor_patient_access_security(self):
        # Doctor A has an appointment with Patient A, should have access
        self.login_user(self.client, "doctor_a")
        url = reverse('doctor:patient_detail', kwargs={'patient_id': self.patient_a.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

        # Doctor B has no appointment and no consent, should be forbidden (403)
        self.login_user(self.client, "doctor_b")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)

        # Let's request and approve consent for Doctor B
        consent = request_consent(doctor=self.doctor_b, patient=self.patient_a, reason="Consultation")
        approve_consent(consent_id=consent.id, patient_user=self.patient_user_a)
        
        # Now Doctor B should have access
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)

class PublicDoctorProfileTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        self.hospital = self.create_hospital()
        self.doctor_user = self.create_user(username="doctor_public", role="doctor")
        self.doctor = self.create_doctor_profile(self.doctor_user, self.hospital, registration_number="DOC-PUB")

    def test_public_profile_view_success(self):
        url = reverse('doctor:public_profile', kwargs={'doctor_id': self.doctor.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, self.doctor.full_name)
        self.assertContains(response, self.hospital.name)

    def test_public_profile_view_not_found(self):
        url = reverse('doctor:public_profile', kwargs={'doctor_id': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
