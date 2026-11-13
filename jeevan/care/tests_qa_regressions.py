"""Regression tests for the bugs found in the November 2026 QA pass.

Each test reproduces a problem that was found by using the app as a real
user, so it fails if that problem comes back.
"""

from datetime import date, timedelta

from django.core.cache import cache
from django.test import Client, TestCase
from django.urls import reverse

from appointments.models import Appointment
from doctor.services import save_prescription
from jeevan.test_helpers import JeevanTestClientMixin

XSS = 'fever</script><script>alert(document.cookie)</script>'


class QARegressionTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        cache.clear()
        self.client = Client()
        self.hospital_a = self.create_hospital(name="Hospital A", registration_number="HA1")
        self.hospital_b = self.create_hospital(name="Hospital B", registration_number="HB1")

        self.doctor_user = self.create_user("doc_a", role="doctor")
        self.doctor = self.create_doctor_profile(self.doctor_user, self.hospital_a, registration_number="D1")
        self.other_doctor_user = self.create_user("doc_b", role="doctor")
        self.other_doctor = self.create_doctor_profile(self.other_doctor_user, self.hospital_b, registration_number="D2")

        self.recep_b_user = self.create_user("recep_b", role="receptionist")
        self.create_receptionist_profile(self.recep_b_user, self.hospital_b, dob=date(1990, 1, 1), full_name="Kiran Desai")

        self.patient_user = self.create_user("asha", role="patient")
        self.patient = self.create_patient_profile(self.patient_user)

        self.appointment = Appointment.objects.create(
            doctor=self.doctor,
            patient=self.patient,
            hospital=self.hospital_a,
            appointment_date=date.today() + timedelta(days=2),
            appointment_time="10:00",
            symptoms=XSS,
            status="accepted",
        )

    # C1: a patient's symptoms must never be emitted as live <script> in a doctor page
    def test_calendar_does_not_render_patient_script(self):
        self.login_user(self.client, "doc_a")
        html = self.client.get(reverse("doctor:calendar")).content.decode()
        self.assertNotIn("</script><script>alert", html)
        self.assertIn('id="appointments-data"', html)

    # C2: unrelated staff cannot open a patient's profile by changing the URL
    def test_unrelated_doctor_cannot_view_patient_profile(self):
        self.login_user(self.client, "doc_b")
        resp = self.client.get(reverse("patient:patient_detail", args=[self.patient.id]))
        self.assertEqual(resp.status_code, 403)

    def test_other_hospital_receptionist_cannot_view_patient_profile(self):
        self.login_user(self.client, "recep_b")
        resp = self.client.get(reverse("patient:patient_detail", args=[self.patient.id]))
        self.assertEqual(resp.status_code, 403)

    def test_treating_doctor_can_view_patient_profile(self):
        self.login_user(self.client, "doc_a")
        resp = self.client.get(reverse("patient:patient_detail", args=[self.patient.id]))
        self.assertEqual(resp.status_code, 200)

    # C3: appointments whose day has passed can still be completed / prescribed for
    def test_can_prescribe_for_yesterdays_appointment(self):
        Appointment.objects.filter(pk=self.appointment.pk).update(
            appointment_date=date.today() - timedelta(days=1)
        )
        save_prescription(
            appointment_id=self.appointment.id,
            doctor=self.doctor,
            diagnosis="Viral fever",
            medications="Paracetamol - 500mg - Twice daily - 3 days",
        )
        self.appointment.refresh_from_db()
        self.assertEqual(self.appointment.status, "completed")

    def test_new_booking_in_the_past_is_still_rejected(self):
        from django.core.exceptions import ValidationError

        with self.assertRaises(ValidationError):
            Appointment.objects.create(
                doctor=self.doctor,
                patient=self.patient,
                hospital=self.hospital_a,
                appointment_date=date.today() - timedelta(days=1),
                appointment_time="11:00",
            )

    # C4: correct logins are not blocked by page views; repeated wrong passwords are
    def _login(self, username, password, role):
        self.client.get(reverse("universal_login"))
        return self.client.post(
            reverse("universal_login"),
            {"username": username, "password": password, "role": role},
        )

    def test_several_correct_logins_in_a_row_work(self):
        for _ in range(4):
            resp = self._login("asha", "password123", "patient")
            self.assertRedirects(resp, reverse("patient:profile_dashboard"), fetch_redirect_response=False)
            self.client.logout()

    def test_account_locks_after_repeated_wrong_passwords(self):
        for _ in range(5):
            self._login("asha", "wrong", "patient")
        resp = self._login("asha", "password123", "patient")
        self.assertEqual(resp.status_code, 200)  # still on the login page
        self.assertContains(resp, "Too many failed login attempts")

    # C5: no redirect to other sites after login
    def test_login_ignores_external_next_url(self):
        self.client.get(reverse("universal_login") + "?next=https://evil.example.com/phish")
        resp = self.client.post(
            reverse("universal_login"),
            {"username": "asha", "password": "password123", "role": "patient"},
        )
        self.assertNotIn("evil.example.com", resp.get("Location", ""))

    # H1: patient dashboard and profile load
    def test_patient_dashboard_and_profile_load(self):
        self.login_user(self.client, "asha")
        self.assertEqual(self.client.get(reverse("patient:patient_dashboard")).status_code, 200)
        self.assertEqual(self.client.get(reverse("patient:patient_profile")).status_code, 200)

    # H3: nurses are offered on the login page
    def test_login_page_offers_nurse_role(self):
        self.assertContains(self.client.get(reverse("universal_login")), 'value="nurse"')

    # M1: weak passwords and bad phone numbers are rejected at registration
    def test_registration_rejects_weak_password_and_bad_phone(self):
        resp = self.client.post(
            reverse("patient:patient_register"),
            {
                "full_name": "Test Person",
                "username": "weakling",
                "email": "weak@example.com",
                "contact_number": "abc",
                "password": "1",
                "confirm_password": "1",
            },
        )
        self.assertEqual(resp.status_code, 200)
        form = resp.context["form"]
        self.assertIn("password", form.errors)
        self.assertIn("contact_number", form.errors)
