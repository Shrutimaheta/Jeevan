"""End-to-end workflow tests: each test walks one real job through the web UI
as the person who does it (receptionist books, doctor treats, nurse records
vitals, patient manages their own data). They catch broken forms and views
that unit tests and access checks miss.
"""

from datetime import date, timedelta

from django.core.cache import cache
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import Client, TestCase
from django.urls import reverse

from appointments.models import Appointment
from doctor.models import AppointmentPrescription, Consent
from jeevan.test_helpers import JeevanTestClientMixin
from nurse.models import ClinicalNote, Nurse
from patient.models import Patient, PatientDocument, VitalSign
from records.models import MedicalRecord

AJAX = {"HTTP_X_REQUESTED_WITH": "XMLHttpRequest"}


class WorkflowTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        cache.clear()
        self.client = Client()
        self.hospital = self.create_hospital(name="City Hospital", registration_number="CH1")
        self.doctor_user = self.create_user("doc", role="doctor")
        self.doctor = self.create_doctor_profile(self.doctor_user, self.hospital, registration_number="D1")
        self.other_doctor_user = self.create_user("doc2", role="doctor")
        self.other_doctor = self.create_doctor_profile(self.other_doctor_user, self.hospital, registration_number="D2")
        self.recep_user = self.create_user("recep", role="receptionist")
        self.create_receptionist_profile(self.recep_user, self.hospital, dob=date(1990, 1, 1), full_name="Kiran Desai")
        self.nurse_user = self.create_user("nurse", role="nurse")
        Nurse.objects.create(user=self.nurse_user, hospital=self.hospital, full_name="Meena Rao", gender="Female")
        self.patient_user = self.create_user("asha", role="patient")
        self.patient = self.create_patient_profile(self.patient_user)
        self.patient.associated_hospitals.add(self.hospital)
        self.day = date.today() + timedelta(days=3)

    def _appointment(self, status="pending", hour=10):
        return Appointment.objects.create(
            doctor=self.doctor, patient=self.patient, hospital=self.hospital,
            appointment_date=self.day, appointment_time=f"{hour}:00", status=status, symptoms="cough",
        )

    # ---------------- receptionist ----------------
    def test_receptionist_registers_patient(self):
        self.login_user(self.client, "recep")
        resp = self.client.post(reverse("receptionist:register_patient"), {
            "username": "newpat", "first_name": "Neha", "last_name": "Shah", "email": "neha@example.com",
            "gender": "Female", "dob": "1994-02-03", "contact_number": "9876501234",
            "address": "12 Ring Road, Ahmedabad", "city": "Ahmedabad", "pincode": "380001",
            "password": "Str0ng!Pass99", "confirm_password": "Str0ng!Pass99",
        })
        self.assertIn(resp.status_code, (200, 302))
        patient = Patient.objects.filter(user__username="newpat").first()
        self.assertIsNotNone(patient, resp.content.decode()[:500] if resp.status_code == 200 else "")
        self.assertTrue(patient.associated_hospitals.filter(id=self.hospital.id).exists())

    def test_receptionist_books_walk_in_without_abha(self):
        self.login_user(self.client, "recep")
        resp = self.client.post(reverse("receptionist:book_appointment"), {
            "patient_name": "Walk In Person", "email": "walkin@example.com", "contact_number": "9876512345",
            "gender": "male", "date_of_birth": "1990-05-05", "blood_group": "O+",
            "address": "12 Ring Road Ahmedabad", "city": "Ahmedabad", "pincode": "380001",
            "emergency_number": "9876500000", "abha_id": "", "doctor": self.doctor.id,
            "appointment_date": self.day.isoformat(), "appointment_time": "15:00", "symptoms": "fever",
        })
        self.assertRedirects(resp, reverse("receptionist:appointments"), fetch_redirect_response=False)
        walk_in = Patient.objects.get(user__email="walkin@example.com")
        self.assertEqual(walk_in.gender, "Male")
        self.assertTrue(Appointment.objects.filter(patient=walk_in, doctor=self.doctor).exists())

    def test_receptionist_books_for_existing_patient(self):
        self.login_user(self.client, "recep")
        resp = self.client.post(reverse("receptionist:book_appointment_for_patient", args=[self.patient.id]), {
            "doctor": self.doctor.id, "appointment_date": self.day.isoformat(), "appointment_time": "11:00",
            "symptoms": "follow-up",
        })
        self.assertIn(resp.status_code, (200, 302))
        self.assertTrue(Appointment.objects.filter(patient=self.patient, appointment_time="11:00").exists())

    def test_receptionist_accepts_only_with_post(self):
        appt = self._appointment()
        self.login_user(self.client, "recep")
        url = reverse("receptionist:appointment_action", args=[appt.id, "accept"])
        self.assertEqual(self.client.get(url).status_code, 405)
        self.client.post(url, **AJAX)
        appt.refresh_from_db()
        self.assertEqual(appt.status, "accepted")

    # ---------------- doctor ----------------
    def test_doctor_accepts_prescribes_and_patient_sees_it(self):
        appt = self._appointment()
        self.login_user(self.client, "doc")
        self.client.post(reverse("doctor:update_appointment_status", args=[appt.id, "accepted"]), **AJAX)
        appt.refresh_from_db()
        self.assertEqual(appt.status, "accepted")

        resp = self.client.post(reverse("doctor:appointment_prescription", args=[appt.id]), {
            "diagnosis": "Viral fever",
            "medications": "Paracetamol - 500mg - Twice daily - 3 days",
            "tests_recommended": "", "advice": "Rest", "follow_up_date": "",
        })
        self.assertRedirects(resp, reverse("doctor:appointments"), fetch_redirect_response=False)
        appt.refresh_from_db()
        self.assertEqual(appt.status, "completed")
        self.assertTrue(AppointmentPrescription.objects.filter(appointment=appt).exists())

        self.client.logout()
        self.login_user(self.client, "asha")
        self.assertContains(self.client.get(reverse("patient:prescription_list")), "Viral fever")

    def test_doctor_creates_medical_record(self):
        appt = self._appointment(status="accepted")
        self.login_user(self.client, "doc")
        self.client.post(reverse("records:create_record", args=[appt.id]), {"summary": "Mild viral infection"})
        self.assertTrue(MedicalRecord.objects.filter(appointment=appt).exists())

    def test_consent_request_and_approval_unlocks_reports(self):
        self.login_user(self.client, "doc2")
        reports = reverse("doctor:patient_reports", args=[self.patient.id])
        self.assertNotEqual(self.client.get(reports).status_code, 200)
        self.client.post(reverse("doctor:request_consent", args=[self.patient.id]), {"reason": "Second opinion"})
        consent = Consent.objects.get(doctor=self.other_doctor, patient=self.patient)

        self.client.logout()
        self.login_user(self.client, "asha")
        self.client.post(reverse("doctor:approve_consent", args=[consent.id]), **AJAX)
        consent.refresh_from_db()
        self.assertEqual(consent.status, "approved")

        self.client.logout()
        self.login_user(self.client, "doc2")
        self.assertEqual(self.client.get(reports).status_code, 200)

    # ---------------- nurse ----------------
    def test_nurse_logs_vitals_and_notes(self):
        self.login_user(self.client, "nurse")
        resp = self.client.post(reverse("nurse:log_vitals", args=[self.patient.id]), {
            "blood_pressure_systolic": 120, "blood_pressure_diastolic": 80, "heart_rate": 72,
            "temperature": 98.6, "oxygen_saturation": 98, "weight": "", "notes": "stable",
        })
        msgs = [str(m) for m in resp.wsgi_request._messages] if hasattr(resp, "wsgi_request") else []
        self.assertTrue(VitalSign.objects.filter(patient=self.patient).exists(), msgs)
        self.client.post(reverse("nurse:add_note", args=[self.patient.id]), {"note": "Patient comfortable"})
        note = ClinicalNote.objects.get(patient=self.patient)
        self.client.post(reverse("nurse:edit_note", args=[note.id]), {"note": "Patient comfortable, ate lunch"})
        note.refresh_from_db()
        self.assertIn("ate lunch", note.note_text if hasattr(note, "note_text") else str(note.__dict__))

    # ---------------- patient ----------------
    def test_patient_books_reschedules_and_cancels(self):
        self.login_user(self.client, "asha")
        resp = self.client.post(reverse("appointments:appointment_create"), {
            "hospital": self.hospital.id, "doctor": self.doctor.id, "appointment_date": self.day.isoformat(),
            "hour": 2, "minute": 30, "am_pm": "PM", "symptoms": "headache", "payment_mode": "cash",
        })
        self.assertRedirects(resp, reverse("appointments:appointment_list"), fetch_redirect_response=False)
        appt = Appointment.objects.get(patient=self.patient, appointment_time="14:30")

        self.client.post(reverse("appointments:appointment_update", args=[appt.id]), {
            "hospital": self.hospital.id, "doctor": self.doctor.id,
            "appointment_date": (self.day + timedelta(days=1)).isoformat(),
            "hour": 3, "minute": 0, "am_pm": "PM", "symptoms": "headache", "payment_mode": "cash",
        })
        appt.refresh_from_db()
        self.assertEqual(str(appt.appointment_time)[:5], "15:00")

        self.client.post(reverse("appointments:appointment_cancel", args=[appt.id]))
        appt.refresh_from_db()
        self.assertEqual(appt.status, "cancelled")

    def test_patient_uploads_and_deletes_document_only_by_post(self):
        self.login_user(self.client, "asha")
        self.client.post(reverse("patient:document_upload"), {
            "title": "Blood test", "document_type": "lab_result", "description": "",
            "file": SimpleUploadedFile("blood.pdf", b"%PDF-1.4\n%test\n", content_type="application/pdf"),
        })
        doc = PatientDocument.objects.get(patient=self.patient, title="Blood test")
        delete_url = reverse("patient:document_delete", args=[doc.id])
        self.assertEqual(self.client.get(delete_url).status_code, 405)
        self.assertTrue(PatientDocument.objects.filter(id=doc.id).exists())
        self.client.post(delete_url)
        self.assertFalse(PatientDocument.objects.filter(id=doc.id).exists())

    def test_patient_changes_password(self):
        self.login_user(self.client, "asha")
        self.client.post(reverse("patient:change_password"), {
            "current_password": "password123", "new_password": "N3w!Secure-Pass", "confirm_password": "N3w!Secure-Pass",
        })
        self.patient_user.refresh_from_db()
        self.assertTrue(self.patient_user.check_password("N3w!Secure-Pass"))

    def test_patient_support_ticket(self):
        from patient.help_models import SupportTicket

        self.login_user(self.client, "asha")
        self.client.post(reverse("patient:create_support_ticket"), {
            "subject": "Cannot see report", "description": "My report is missing", "category": "technical", "priority": "medium",
        })
        self.assertTrue(SupportTicket.objects.filter(patient=self.patient, subject="Cannot see report").exists())
