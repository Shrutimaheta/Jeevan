import re
from django.test import TestCase, Client
from django.urls import reverse
from django.core.exceptions import ValidationError, PermissionDenied
from django.contrib.auth import get_user_model
from django.core.cache import cache

from appointments.models import Appointment
from doctor.models import Doctor
from patient.models import Patient
from care.models import Hospital
from jeevan.test_helpers import JeevanTestClientMixin
from teleconsultation.models import Teleconsultation
from teleconsultation.services import create_teleconsultation

User = get_user_model()

class TeleconsultationTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        cache.clear()
        
        # Create hospital
        self.hospital = self.create_hospital(name="Tele Hospital", registration_number="TELE-H")
        
        # Doctor
        self.doctor_user = self.create_user(username="teledoc", role="doctor")
        self.doctor = self.create_doctor_profile(self.doctor_user, self.hospital, registration_number="DOC-TELE")
        
        # Patient
        self.patient_user = self.create_user(username="telepat", role="patient")
        self.patient = self.create_patient_profile(self.patient_user)
        
        # Another user
        self.other_user = self.create_user(username="otheruser", role="patient")
        
        # Appointment
        self.appointment = Appointment.objects.create(
            doctor=self.doctor,
            patient=self.patient,
            hospital=self.hospital,
            appointment_date="2026-07-06",
            appointment_time="12:00:00",
            status="accepted"
        )

    def test_teleconsultation_link_secure_generation(self):
        # Create session
        session = create_teleconsultation(
            appointment=self.appointment,
            symptoms="Mild cold",
            actor=self.doctor_user
        )
        
        # 1. Assert secure UUID4 in link
        # Format: https://meet.jeevancare.in/room/[uuid4]?pwd=[password]
        uuid_pattern = r"[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"
        match = re.search(uuid_pattern, session.meeting_link)
        self.assertIsNotNone(match, "Meeting link should contain a valid UUID4 room ID.")
        
        # 2. Assert secure random ID and password (not sequential)
        self.assertTrue(len(session.meeting_id) >= 16)
        self.assertTrue(len(session.meeting_password) >= 16)

    def test_start_teleconsultation_access_controls(self):
        session = create_teleconsultation(
            appointment=self.appointment,
            actor=self.doctor_user
        )
        
        start_url = reverse('teleconsultation:start', kwargs={'teleconsultation_id': session.id})
        
        # 1. Doctor joining transitions status and redirects
        self.login_user(self.client, "teledoc")
        response = self.client.get(start_url)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, session.meeting_link)
        
        session.refresh_from_db()
        self.assertEqual(session.status, "ongoing")
        self.assertIsNotNone(session.started_at)
        
        # 2. Patient joining redirects
        self.login_user(self.client, "telepat")
        response2 = self.client.get(start_url)
        self.assertEqual(response2.status_code, 302)
        
        # 3. Unrelated user joining is forbidden
        self.login_user(self.client, "otheruser")
        response3 = self.client.get(start_url)
        self.assertEqual(response3.status_code, 403)

    def test_get_teleconsultation_details(self):
        session = create_teleconsultation(
            appointment=self.appointment,
            actor=self.doctor_user
        )
        
        details_url = reverse('teleconsultation:details', kwargs={'teleconsultation_id': session.id})
        
        # 1. Doctor gets details
        self.login_user(self.client, "teledoc")
        response = self.client.get(details_url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['meeting_id'], session.meeting_id)
        
        # 2. Unrelated user gets 403
        self.login_user(self.client, "otheruser")
        response2 = self.client.get(details_url)
        self.assertEqual(response2.status_code, 403)
