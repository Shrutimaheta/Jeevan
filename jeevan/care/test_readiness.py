import json
from datetime import timedelta, time
from django.test import TestCase
from django.utils import timezone
from django.core.exceptions import ValidationError, PermissionDenied
from django.core.cache import cache
from jeevan.test_helpers import JeevanTestClientMixin
from appointments.models import Appointment
from appointments.services import update_appointment_status
from patient.models import VitalSign
from records.services import check_doctor_patient_access
from doctor.models import Consent


class ReadinessProbes(JeevanTestClientMixin, TestCase):
    def setUp(self):
        cache.clear()
        self.hospital = self.create_hospital()
        self.doctor_user = self.create_user('review_doctor', role='doctor')
        self.doctor = self.create_doctor_profile(self.doctor_user, self.hospital)
        self.patient_user = self.create_user('review_patient')
        self.patient = self.create_patient_profile(self.patient_user)

    def test_unrelated_doctor_cannot_read_patient_detail(self):
        self.client.force_login(self.doctor_user)
        response = self.client.get(f'/patient/{self.patient.id}/')
        self.assertEqual(response.status_code, 403)

    def test_rejected_consent_and_cancelled_appointment_deny_record_access(self):
        Appointment.objects.create(patient=self.patient, doctor=self.doctor,
            hospital=self.hospital, appointment_date=timezone.localdate()+timedelta(days=2),
            appointment_time=time(10), status='cancelled')
        Consent.objects.create(doctor=self.doctor, patient=self.patient, status='rejected')
        self.assertFalse(check_doctor_patient_access(self.doctor, self.patient))

    def test_past_appointment_can_be_completed(self):
        appointment = Appointment.objects.create(patient=self.patient, doctor=self.doctor,
            hospital=self.hospital, appointment_date=timezone.localdate()+timedelta(days=2),
            appointment_time=time(10), status='accepted')
        Appointment.objects.filter(pk=appointment.pk).update(appointment_date=timezone.localdate()-timedelta(days=1))
        result = update_appointment_status(appointment.pk, 'completed', self.doctor_user)
        self.assertEqual(result.status, 'completed')

    def test_patient_api_rejects_invalid_vitals(self):
        self.client.force_login(self.patient_user)
        response = self.client.post('/patient/api/vital-signs/add/',
            data=json.dumps(dict(blood_pressure_systolic=-5, blood_pressure_diastolic=-5,
                heart_rate=-10, temperature=98.6, oxygen_saturation=999)), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        self.assertFalse(VitalSign.objects.filter(patient=self.patient).exists())

    def test_login_rejects_external_redirect(self):
        response = self.client.post('/login/', dict(username='review_patient',
            password='password123', role='patient', next='https://example.org/review'))
        self.assertEqual(response.status_code, 302)
        self.assertNotEqual(response.url, 'https://example.org/review')

    def test_hospital_staff_cannot_read_other_hospital_patients(self):
        user = self.create_user('scoped_receptionist', role='receptionist')
        self.create_receptionist_profile(user, self.hospital, full_name='Receptionist Example')
        self.client.force_login(user)
        self.assertEqual(self.client.get(f'/patient/{self.patient.pk}/').status_code, 403)
        self.assertNotContains(self.client.get('/patient/'), self.patient.full_name)
        self.patient.associated_hospitals.add(self.hospital)
        self.patient.allergies = 'Confidential clinical detail'
        self.patient.save()
        response = self.client.get(f'/patient/{self.patient.pk}/')
        self.assertEqual(response.status_code, 200)
        self.assertNotContains(response, self.patient.allergies)

    def test_consent_renewal_preserves_history(self):
        from doctor.services import request_consent, approve_consent, reject_consent
        old = Consent.objects.create(doctor=self.doctor, patient=self.patient, status='rejected')
        fresh = request_consent(self.doctor, self.patient, 'New visit')
        self.assertNotEqual(fresh.pk, old.pk)
        approve_consent(fresh.pk, self.patient_user)
        self.assertTrue(check_doctor_patient_access(self.doctor, self.patient))
        reject_consent(fresh.pk, self.patient_user)
        self.assertFalse(check_doctor_patient_access(self.doctor, self.patient))
        old.refresh_from_db()
        self.assertEqual(old.status, 'rejected')

    def test_expired_consent_can_be_renewed(self):
        from doctor.services import request_consent
        old = Consent.objects.create(doctor=self.doctor, patient=self.patient, status='approved',
                                      expires_at=timezone.now()-timedelta(minutes=1))
        self.assertFalse(check_doctor_patient_access(self.doctor, self.patient))
        fresh = request_consent(self.doctor, self.patient)
        old.refresh_from_db()
        self.assertEqual(old.status, 'expired')
        self.assertEqual(fresh.status, 'pending')

    def test_medical_record_creator_loses_access_on_revocation(self):
        from records.models import MedicalRecord
        appointment = Appointment.objects.create(patient=self.patient, doctor=self.doctor, hospital=self.hospital,
            appointment_date=timezone.localdate()+timedelta(days=1), appointment_time=time(10), status='accepted')
        record = MedicalRecord.objects.create(patient=self.patient, doctor=self.doctor, appointment=appointment, summary='Private')
        consent = Consent.objects.create(doctor=self.doctor, patient=self.patient, status='approved')
        self.client.force_login(self.doctor_user)
        self.assertEqual(self.client.get(f'/records/{record.pk}/').status_code, 200)
        consent.reject()
        self.assertEqual(self.client.get(f'/records/{record.pk}/').status_code, 403)

    def test_throttle_is_shared_and_expires(self):
        from unittest.mock import patch
        from jeevan.throttling import allow_request
        from django.core.cache import cache
        with patch('jeevan.throttling.time.time', return_value=600):
            self.assertTrue(allow_request('shared:test', 1, 60))
            cache.clear()  # Clearing one worker's cache must not reset the limit.
            self.assertFalse(allow_request('shared:test', 1, 60))
        with patch('jeevan.throttling.time.time', return_value=660):
            self.assertTrue(allow_request('shared:test', 1, 60))

    def test_booking_policy_and_local_time(self):
        from appointments.scheduling import validate_booking_slot
        tomorrow = timezone.localdate() + timedelta(days=1)
        for invalid in (time(8), time(18), time(10, 7)):
            with self.assertRaises(ValidationError):
                validate_booking_slot(tomorrow, invalid)
        self.assertEqual(validate_booking_slot(tomorrow, time(17, 45)), (tomorrow, time(17, 45)))

    def test_other_doctor_cannot_reschedule_appointment(self):
        from appointments.services import reschedule_appointment
        appointment = Appointment.objects.create(patient=self.patient, doctor=self.doctor, hospital=self.hospital,
            appointment_date=timezone.localdate()+timedelta(days=1), appointment_time=time(10))
        outsider = self.create_user('outsider', role='doctor')
        with self.assertRaises(PermissionDenied):
            reschedule_appointment(appointment.pk, timezone.localdate()+timedelta(days=2), time(11), actor=outsider)

    def test_no_invented_health_score_when_no_data(self):
        from patient.views import calculate_health_score
        self.assertIsNone(calculate_health_score(self.patient))

    def test_phone_recovery_does_not_issue_challenge(self):
        from patient.models import OTPVerification
        response = self.client.post('/patient/forgot-password/', {'recovery_method': 'phone', 'contact_number': '9876543210'})
        self.assertEqual(response.status_code, 400)
        self.assertFalse(OTPVerification.objects.exists())

    def test_internal_redirect_and_private_response_headers(self):
        response = self.client.post('/login/', {'username': 'review_patient', 'password': 'password123', 'role': 'patient', 'next': '/patient/dashboard/'})
        self.assertEqual(response.url, '/patient/dashboard/')
        self.assertIn('no-store', response['Cache-Control'])

    def test_audit_event_survives_logging_and_cannot_be_edited(self):
        from care.models import AuditEvent
        from jeevan.decorators import log_audit_event
        log_audit_event(self.patient_user, 'TEST_VIEW', self.patient.pk)
        event = AuditEvent.objects.get(action='TEST_VIEW')
        self.assertEqual(event.actor_id, self.patient_user.pk)
        with self.assertRaises(ValueError):
            event.save()

    def test_inactive_staff_cannot_use_clinical_routes(self):
        self.doctor.is_active = False
        self.doctor.save()
        self.client.force_login(self.doctor_user)
        self.assertEqual(self.client.get('/doctor/appointments/').status_code, 403)
