import json
from datetime import timedelta, time
from unittest.mock import patch
from django.core.exceptions import ValidationError, PermissionDenied
from django.test import TestCase
from django.utils import timezone
from appointments.models import Appointment
from appointments.services import create_appointment, reschedule_appointment, update_appointment_status
from doctor.models import Doctor
from jeevan.test_helpers import JeevanTestClientMixin
from .models import Medication, MedicationLog, PatientDocument, Patient
from .services import record_medication_day


class PatientNegativeJourneyTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.user = self.create_user('negative_patient')
        self.patient = self.create_patient_profile(self.user)
        self.hospital = self.create_hospital()
        self.doctor = self.create_doctor_profile(self.create_user('negative_doctor', role='doctor'), self.hospital)
        self.day = timezone.localdate()+timedelta(days=2)
        self.client.force_login(self.user)

    def medication(self, **changes):
        values = dict(patient=self.patient, name='Fictional item', dosage='Example dose', frequency='once_daily',
                      prescribed_date=timezone.localdate())
        values.update(changes)
        return Medication.objects.create(**values)

    def test_repeated_medication_submit_returns_same_log_and_does_not_overwrite_notes(self):
        medication = self.medication()
        first, created = record_medication_day(self.patient, medication.pk, 'Original note')
        second, repeated = record_medication_day(self.patient, medication.pk, 'Repeated note')
        self.assertTrue(created)
        self.assertFalse(repeated)
        self.assertEqual(first.pk, second.pk)
        self.assertEqual(MedicationLog.objects.count(), 1)
        self.assertEqual(second.notes, 'Original note')

    def test_inactive_future_and_invalid_medication_inputs_do_not_write(self):
        inactive = self.medication(is_active=False)
        future = self.medication(prescribed_date=timezone.localdate()+timedelta(days=1))
        active = self.medication()
        for payload in ({'medication_id': inactive.pk}, {'medication_id': future.pk},
                        {'medication_id': active.pk, 'notes': []}, {'medication_id': 1.5}):
            with self.subTest(payload=payload):
                response = self.client.post('/patient/api/medication-log/', json.dumps(payload), content_type='application/json')
                self.assertEqual(response.status_code, 400)
        self.assertFalse(MedicationLog.objects.exists())

    def test_other_patients_medication_cannot_be_logged(self):
        other = self.create_patient_profile(self.create_user('negative_other_patient'))
        medication = self.medication(patient=other)
        response = self.client.post('/patient/api/medication-log/', json.dumps({'medication_id': medication.pk}), content_type='application/json')
        self.assertEqual(response.status_code, 404)
        self.assertFalse(MedicationLog.objects.exists())

    def test_medication_date_uses_explicit_clinic_day(self):
        medication = self.medication(prescribed_date=timezone.localdate()-timedelta(days=2))
        clinic_day = timezone.localdate()+timedelta(days=1)
        with patch('django.utils.timezone.localdate', return_value=clinic_day):
            log, created = record_medication_day(self.patient, medication.pk)
        self.assertTrue(created)
        self.assertEqual(log.taken_date, clinic_day)

    def test_stale_doctor_object_cannot_book_after_deactivation(self):
        Doctor.objects.filter(pk=self.doctor.pk).update(is_active=False)
        with self.assertRaises(ValidationError):
            create_appointment(self.patient, self.doctor, self.hospital, self.day, time(10), actor=self.user)
        self.assertFalse(Appointment.objects.exists())
        self.assertEqual(self.client.get('/appointments/get-doctors/', {'hospital_id': self.hospital.pk}).json(), [])
        self.assertEqual(self.client.get('/appointments/create/', {'doctor': self.doctor.pk}).status_code, 400)

    def test_stale_doctor_object_cannot_book_at_previous_hospital(self):
        other_hospital = self.create_hospital(name='Other clinic', registration_number='OTHER-STALE')
        Doctor.objects.filter(pk=self.doctor.pk).update(hospital=other_hospital)
        with self.assertRaisesMessage(ValidationError, 'selected doctor does not belong'):
            create_appointment(self.patient, self.doctor, self.hospital, self.day, time(10), actor=self.user)
        self.assertFalse(Appointment.objects.exists())
        self.assertFalse(self.patient.associated_hospitals.exists())

    def test_inactive_receptionist_profile_cannot_create_appointment(self):
        user = self.create_user('inactive_booking_receptionist', role='receptionist')
        self.create_receptionist_profile(user, self.hospital, is_active=False, full_name='Inactive Receptionist')
        with self.assertRaises(PermissionDenied):
            create_appointment(self.patient, self.doctor, self.hospital, self.day, time(10), actor=user)
        self.assertFalse(Appointment.objects.exists())
        self.assertFalse(self.patient.associated_hospitals.exists())

    def test_reschedule_cannot_revive_stale_accepted_appointment(self):
        appointment = create_appointment(self.patient, self.doctor, self.hospital, self.day, time(10), actor=self.user)
        update_appointment_status(appointment.pk, 'accepted', self.doctor.user)
        response = self.client.post(f'/appointments/update/{appointment.pk}/', {
            'appointment_date': self.day.isoformat(), 'appointment_time': '11:00',
            'hour': '11', 'minute': '0', 'am_pm': 'AM', 'payment_mode': 'cash'})
        self.assertEqual(response.status_code, 302)
        appointment.refresh_from_db()
        self.assertEqual(appointment.appointment_time, time(10))
        self.assertEqual(appointment.status, 'accepted')

    def test_disabled_account_cannot_cancel_through_service(self):
        appointment = create_appointment(self.patient, self.doctor, self.hospital, self.day, time(10), actor=self.user)
        self.user.is_active = False
        with self.assertRaises(PermissionDenied):
            update_appointment_status(appointment.pk, 'cancelled', self.user)
        appointment.refresh_from_db()
        self.assertEqual(appointment.status, 'pending')

    def test_missing_stored_file_has_safe_detail_and_download_response(self):
        document = PatientDocument.objects.create(patient=self.patient, title='Unavailable fictional report',
            document_type='report', file='missing-test-file/no-private-file.pdf')
        response = self.client.get(f'/patient/documents/{document.pk}/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Unavailable')
        response = self.client.get(f'/patient/documents/{document.pk}/download/')
        self.assertEqual(response.status_code, 404)
        self.assertNotContains(response, 'missing-test-file', status_code=404)

    def test_first_time_patient_with_optional_profile_fields_can_open_inner_pages(self):
        fresh = self.create_user('first_time_negative')
        Patient.objects.create(user=fresh, full_name='Fictional new patient')
        self.client.force_login(fresh)
        for path in ('/patient/profile/', '/patient/documents/', '/appointments/create/'):
            with self.subTest(path=path):
                self.assertEqual(self.client.get(path).status_code, 200)
