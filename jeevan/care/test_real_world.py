import json
from django.test import TestCase
from django.db import IntegrityError
from django.urls import reverse
from care.models import CareCoordinator
from jeevan.test_helpers import JeevanTestClientMixin
from patient.forms import PatientRegistrationForm
from patient.models import WellnessLog


class RealWorldInputTests(JeevanTestClientMixin, TestCase):
    def test_profile_birth_date_field_is_named_and_initialized(self):
        response = self.client.get('/patient/profile/')
        self.assertContains(response, 'name="date_of_birth"')
        self.assertContains(response, 'value="1990-01-01"')
        self.assertNotContains(response, 'name=""')
        invalid = self.client.post('/patient/profile/', {'full_name': self.patient.full_name})
        self.assertContains(invalid, 'Please correct the following fields:')

    def test_profile_summary_displays_real_contact_without_fake_alerts(self):
        self.user.contact_number = '9876543210'
        self.user.save()
        response = self.client.get('/patient/profile/')
        self.assertContains(response, self.user.email, count=2)
        self.assertContains(response, '9876543210', count=2)
        self.assertNotContains(response, 'You have 3 new notifications')
        self.assertContains(response, 'Review consent requests')

    def test_dashboard_report_total_is_not_limited_to_preview(self):
        from patient.models import PatientDocument
        for index in range(6):
            PatientDocument.objects.create(patient=self.patient, title=f'Fictional report {index}',
                document_type='report', file='fictional-qa.pdf')
        response = self.client.get('/patient/welcomePatient/')
        self.assertEqual(response.context['reports_count'], 6)
        self.assertEqual(len(response.context['reports']), 5)

    def test_dashboard_upcoming_count_excludes_old_accepted_visits(self):
        from datetime import timedelta, time
        from django.utils import timezone
        from appointments.models import Appointment
        hospital = self.create_hospital()
        doctor_user = self.create_user('dashboard_doctor', role='doctor')
        doctor = self.create_doctor_profile(doctor_user, hospital)
        today = timezone.localdate()
        old = Appointment.objects.create(patient=self.patient, doctor=doctor, hospital=hospital,
            appointment_date=today + timedelta(days=1), appointment_time=time(10), status='accepted')
        Appointment.objects.filter(pk=old.pk).update(appointment_date=today - timedelta(days=1))
        future = Appointment.objects.create(patient=self.patient, doctor=doctor, hospital=hospital,
            appointment_date=today + timedelta(days=2), appointment_time=time(10), status='accepted')
        response = self.client.get('/patient/welcomePatient/')
        self.assertEqual(response.context['upcoming_count'], 1)
        self.assertEqual(list(response.context['upcoming_appointments']), [future])

    def setUp(self):
        self.user = self.create_user('real_patient')
        self.patient = self.create_patient_profile(self.user)
        self.client.force_login(self.user)

    def test_non_object_json_is_rejected(self):
        for path in ('vital-signs/add/', 'wellness-log/add/', 'medication-log/'):
            for payload in ('[]', 'null', '"text"', '{broken'):
                with self.subTest(path=path, payload=payload):
                    response = self.client.post('/patient/api/' + path, payload,
                                                content_type='application/json')
                    self.assertIn(response.status_code, (400, 429))

    def test_wellness_invalid_values_do_not_write(self):
        for field, value in [('sleep_hours', 25), ('sleep_hours', 'NaN'),
                             ('steps_count', -1), ('steps_count', 1.5),
                             ('mood_score', 6), ('stress_level', 0),
                             ('exercise_minutes', 1441), ('notes', [])]:
            with self.subTest(field=field, value=value):
                response = self.client.post('/patient/api/wellness-log/add/',
                    json.dumps({field: value}), content_type='application/json')
                self.assertEqual(response.status_code, 400)
                self.assertFalse(WellnessLog.objects.exists())

    def test_daily_wellness_updates_preserve_other_fields(self):
        for payload in ({'sleep_hours': 7.5, 'steps_count': 3000}, {'mood_score': 4}):
            response = self.client.post('/patient/api/wellness-log/add/',
                json.dumps(payload), content_type='application/json')
            self.assertEqual(response.status_code, 200)
        log = WellnessLog.objects.get()
        self.assertEqual(float(log.sleep_hours), 7.5)
        self.assertEqual(log.steps_count, 3000)
        self.assertEqual(log.mood_score, 4)

    def test_other_role_gets_not_found_in_patient_api(self):
        doctor = self.create_user('wrong_role', role='doctor')
        self.client.force_login(doctor)
        self.assertEqual(self.client.get('/patient/api/vital-signs/').status_code, 404)

    def test_public_otp_screen_does_not_identify_patient(self):
        self.client.logout()
        response = self.client.get(reverse('patient:verify_email_otp', args=[self.patient.pk]))
        self.assertEqual(response.status_code, 200)
        self.assertIsNone(response.context['patient'])

    def registration_data(self):
        return dict(username='new_patient', email='new@example.test', full_name='New Patient',
                    contact_number='9876543210', password='Complex-QA-Password!47',
                    confirm_password='Complex-QA-Password!47')

    def test_registration_rejects_weak_password_and_bad_phone(self):
        data = self.registration_data()
        data.update(password='123', confirm_password='123', contact_number='abc')
        form = PatientRegistrationForm(data)
        self.assertFalse(form.is_valid())
        self.assertIn('password', form.errors)
        self.assertIn('contact_number', form.errors)

    def test_registration_accepts_local_names_and_normal_username_characters(self):
        data = self.registration_data()
        data.update(username='kiran.patel_1', full_name='àª•àª¿àª°àª£ àªªàªŸà«‡àª²')
        form = PatientRegistrationForm(data)
        self.assertTrue(form.is_valid(), form.errors)
        patient = form.save()
        self.assertEqual(patient.full_name, 'àª•àª¿àª°àª£ àªªàªŸà«‡àª²')
        self.assertEqual(patient.user.username, 'kiran.patel_1')

    def test_failed_login_preserves_identity_and_role_without_echoing_password(self):
        self.client.logout()
        response = self.client.post('/login/', {'username': 'qa_unknown',
            'role': 'nurse', 'password': 'Never-Echo-This!47'})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'value="qa_unknown"')
        self.assertContains(response, 'value="nurse" selected')
        self.assertNotContains(response, 'Never-Echo-This!47')

    def test_registration_race_cannot_overwrite_existing_user(self):
        form = PatientRegistrationForm(self.registration_data())
        self.assertTrue(form.is_valid(), form.errors)
        existing = self.create_user('new_patient', role='doctor')
        with self.assertRaises(IntegrityError):
            form.save()
        existing.refresh_from_db()
        self.assertEqual(existing.role, 'doctor')
        self.assertNotEqual(existing.email, 'new@example.test')

    def test_coordinator_login_reaches_dashboard(self):
        user = self.create_user('coordinator_login', role='care_coordinator')
        CareCoordinator.objects.create(user=user, hospital=self.create_hospital(), full_name='Coordinator')
        self.client.logout()
        response = self.client.post('/login/', dict(username=user.username,
            password='password123', role='care_coordinator'))
        self.assertRedirects(response, reverse('coordinator_dashboard'), fetch_redirect_response=False)

    def test_missing_profile_does_not_create_login_session(self):
        user = self.create_user('missing_profile', role='nurse')
        self.client.logout()
        self.client.post('/login/', dict(username=user.username, password='password123', role='nurse'))
        self.assertNotIn('_auth_user_id', self.client.session)

    def test_home_cannot_promise_fake_emergency_or_live_support(self):
        response = self.client.get('/')
        self.assertContains(response, 'does not dispatch ambulances')
        for text in ('Ambulance booking confirmed!', 'Emergency appointment confirmed!',
                     'Our team will get back to you shortly', 'info@jeevan.com',
                     '123 Healthcare Street', '98765 43210'):
            self.assertNotContains(response, text)

    def test_home_does_not_embed_standalone_login_document(self):
        response = self.client.get('/')
        html = response.content.decode().lower()
        self.assertEqual(html.count('<!doctype html>'), 1)
        self.assertEqual(html.count('<body'), 1)
        self.assertNotIn('css/clinic-auth.css', html)
        self.assertNotIn('id="loginform"', html)

    def test_invalid_public_search_filters_are_client_errors(self):
        for query in ('specialization=abc', 'specialization=9999999999999999999999999',
                      'min_rating=NaN', 'min_rating=inf', 'min_rating=-1'):
            with self.subTest(query=query):
                self.assertEqual(self.client.get('/?' + query).status_code, 400)

    def test_rendered_dashboard_javascript_compiles(self):
        import re
        import shutil
        import subprocess
        import tempfile
        from pathlib import Path
        if not shutil.which('node'):
            self.skipTest('Node is needed to check rendered browser scripts.')
        for url in ('/', '/patient/welcomePatient/', '/appointments/'):
            response = self.client.get(url)
            self.assertEqual(response.status_code, 200)
            scripts = re.findall(r'<script\b[^>]*>(.*?)</script>', response.content.decode(), re.S | re.I)
            from django.conf import settings
            with tempfile.TemporaryDirectory(dir=settings.BASE_DIR) as directory:
                for index, script in enumerate(scripts):
                    if not script.strip():
                        continue
                    file = Path(directory) / f'script-{index}.js'
                    file.write_text(script, encoding='utf-8')
                    result = subprocess.run(['node', '--check', str(file)], capture_output=True, text=True)
                    self.assertEqual(result.returncode, 0, f'{url}: {result.stderr}')
