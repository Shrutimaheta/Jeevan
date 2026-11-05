from datetime import timedelta
from django.core.exceptions import PermissionDenied, ValidationError
from django.test import TestCase
from django.utils import timezone
from appointments.models import Appointment
from doctor.models import AppointmentPrescription
from doctor.services import save_prescription
from jeevan.test_helpers import JeevanTestClientMixin


class PrescriptionFinalizationSafetyTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        hospital = self.create_hospital()
        user = self.create_user('clinical_doctor', role='doctor')
        self.doctor = self.create_doctor_profile(user, hospital)
        patient = self.create_patient_profile(self.create_user('clinical_patient'))
        self.appointment = Appointment.objects.create(patient=patient, doctor=self.doctor, hospital=hospital,
            appointment_date=timezone.localdate() + timedelta(days=1), appointment_time='10:00', status='accepted')

    def test_blank_document_cannot_finalize_visit(self):
        with self.assertRaises(ValidationError):
            save_prescription(self.appointment.pk, self.doctor, diagnosis=' ', medications=' ')
        self.appointment.refresh_from_db()
        self.assertEqual(self.appointment.status, 'accepted')
        self.assertFalse(AppointmentPrescription.objects.exists())

    def test_empty_medication_components_are_rejected(self):
        with self.assertRaises(ValidationError):
            save_prescription(self.appointment.pk, self.doctor, diagnosis='Fictional diagnosis', medications='Example - - Daily -')
        self.assertFalse(AppointmentPrescription.objects.exists())

    def test_inactive_doctor_service_cannot_finalize_visit(self):
        self.doctor.is_active = False
        with self.assertRaises(PermissionDenied):
            save_prescription(self.appointment.pk, self.doctor, diagnosis='Fictional diagnosis', medications='')
        self.assertFalse(AppointmentPrescription.objects.exists())
