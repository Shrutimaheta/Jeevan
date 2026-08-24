from django.test import TestCase, Client
from django.urls import reverse
from care.models import CustomUser
from jeevan.test_helpers import JeevanTestClientMixin

class GetUserInfoSecurityTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        # Create a patient user (non-staff)
        self.patient_user = self.create_user(username="patient1", role="patient")
        # Create a staff user
        self.staff_user = self.create_user(username="staff1", role="receptionist", is_staff=True)
        # Create a generic user to query
        self.target_user = self.create_user(username="targetuser", role="patient")
        self.url = reverse('get_user_info', kwargs={'user_id': self.target_user.id})

    def test_unauthenticated_request_returns_401(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 401)
        self.assertIn('Authentication credentials were not provided', response.json().get('error'))

    def test_authenticated_non_staff_request_returns_403(self):
        self.login_user(self.client, "patient1")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 403)
        self.assertIn('You do not have permission to perform this action', response.json().get('error'))

    def test_authenticated_staff_request_returns_200_and_data(self):
        self.login_user(self.client, "staff1")
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['full_name'], self.target_user.full_name)
        self.assertEqual(data['email'], self.target_user.email)
        self.assertEqual(data['role'], self.target_user.role)


class CrossAccountSecurityTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        from care.models import Hospital
        from doctor.models import Doctor, Consent
        from patient.models import Patient
        from appointments.models import Appointment
        from receptionist.models import Receptionist
        
        self.hospital_a = Hospital.objects.create(name="Hospital A", registration_number="HOSP-A", rating=5)
        self.hospital_b = Hospital.objects.create(name="Hospital B", registration_number="HOSP-B", rating=5)
        
        # Doctor A
        self.doctor_user_a = self.create_user(username="doctor_a", role="doctor")
        self.doctor_a = Doctor.objects.create(user=self.doctor_user_a, full_name="Dr. A", hospital=self.hospital_a, registration_number="LIC-A", rating=5)
        
        # Doctor B
        self.doctor_user_b = self.create_user(username="doctor_b", role="doctor")
        self.doctor_b = Doctor.objects.create(user=self.doctor_user_b, full_name="Dr. B", hospital=self.hospital_b, registration_number="LIC-B", rating=5)
        
        # Patient A
        self.patient_user_a = self.create_user(username="patient_a", role="patient")
        self.patient_a = Patient.objects.create(user=self.patient_user_a, full_name="Patient A", date_of_birth="2000-01-01")
        
        # Patient B
        self.patient_user_b = self.create_user(username="patient_b", role="patient")
        self.patient_b = Patient.objects.create(user=self.patient_user_b, full_name="Patient B", date_of_birth="2000-01-01")
        
        # Receptionist A
        self.receptionist_user_a = self.create_user(username="receptionist_a", role="receptionist")
        self.receptionist_a = Receptionist.objects.create(user=self.receptionist_user_a, full_name="Recep A", hospital=self.hospital_a)
        
        # Receptionist B
        self.receptionist_user_b = self.create_user(username="receptionist_b", role="receptionist")
        self.receptionist_b = Receptionist.objects.create(user=self.receptionist_user_b, full_name="Recep B", hospital=self.hospital_b)

    def test_patient_a_cannot_view_patient_b_detail(self):
        self.login_user(self.client, "patient_a")
        url = reverse('patient:patient_detail', kwargs={'patient_id': self.patient_b.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 403)

    def test_doctor_a_cannot_view_patient_reports_without_consent(self):
        self.login_user(self.client, "doctor_a")
        url = reverse('doctor:patient_reports', kwargs={'patient_id': self.patient_a.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, 302)
        self.assertIn('request-consent', response.url)

    def test_only_patient_can_approve_consent(self):
        from doctor.models import Consent
        consent = Consent.objects.create(doctor=self.doctor_a, patient=self.patient_a, status='pending')
        url = reverse('doctor:approve_consent', kwargs={'consent_id': consent.id})
        
        self.login_user(self.client, "doctor_a")
        response = self.client.post(url)
        self.assertEqual(response.status_code, 403)
        
        self.login_user(self.client, "patient_b")
        response = self.client.post(url)
        self.assertEqual(response.status_code, 404)
        
        self.login_user(self.client, "patient_a")
        response = self.client.post(url)
        self.assertEqual(response.status_code, 200)
        consent.refresh_from_db()
        self.assertEqual(consent.status, 'approved')

    def test_receptionist_a_cannot_book_appointment_for_unrelated_patient(self):
        url = reverse('receptionist:book_appointment_for_patient', kwargs={'patient_id': self.patient_b.id})
        self.login_user(self.client, "receptionist_a")
        response = self.client.get(url)
        self.assertEqual(response.status_code, 302)


class CareCoordinatorTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        from care.models import Hospital, CareCoordinator
        from doctor.models import Doctor, Consent
        from patient.models import Patient
        from appointments.models import Appointment
        
        self.hospital_a = Hospital.objects.create(name="Hospital A", registration_number="REG-A")
        self.hospital_b = Hospital.objects.create(name="Hospital B", registration_number="REG-B")
        
        # Coordinator for Hospital A
        self.coord_user = self.create_user(username="coord1", role="care_coordinator")
        self.coord = CareCoordinator.objects.create(user=self.coord_user, hospital=self.hospital_a, full_name="Coordinator A")
        
        # Doctor A at Hospital A
        self.doc_user = self.create_user(username="doctor_a", role="doctor")
        self.doctor = Doctor.objects.create(user=self.doc_user, hospital=self.hospital_a, registration_number="DOC-A")
        
        # Patient A (has consent)
        self.patient_user_a = self.create_user(username="patient_a", role="patient")
        self.patient_a = Patient.objects.create(user=self.patient_user_a, full_name="Patient A")
        Consent.objects.create(doctor=self.doctor, patient=self.patient_a, status="approved")
        
        import datetime
        future_date = (datetime.date.today() + datetime.timedelta(days=1)).strftime("%Y-%m-%d")
        Appointment.objects.create(doctor=self.doctor, patient=self.patient_a, hospital=self.hospital_a, appointment_date=future_date, appointment_time="10:00:00", status="accepted")
        
        # Patient B (no consent)
        self.patient_user_b = self.create_user(username="patient_b", role="patient")
        self.patient_b = Patient.objects.create(user=self.patient_user_b, full_name="Patient B")
        Appointment.objects.create(doctor=self.doctor, patient=self.patient_b, hospital=self.hospital_a, appointment_date=future_date, appointment_time="11:00:00", status="accepted")

    def test_coordinator_dashboard_lists_patients_with_consent_status(self):
        self.login_user(self.client, "coord1")
        response = self.client.get(reverse('coordinator_dashboard'))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Patient A")
        self.assertContains(response, "Patient B")
        self.assertContains(response, "Active Consent Approved")
        self.assertContains(response, "No Active Consent")

    def test_export_zip_enforces_consent_filtering(self):
        from unittest.mock import patch
        self.login_user(self.client, "coord1")
        url = reverse('export_patient_reports_zip')
        
        with patch('care.views.log_audit_event') as mock_log_audit:
            # Request both Patient A and Patient B
            response = self.client.post(url, {'patient_ids': [self.patient_a.id, self.patient_b.id]})
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response['Content-Type'], 'application/zip')
            
            # Verify Audit Log was called
            mock_log_audit.assert_called_once()
            args, kwargs = mock_log_audit.call_args
            # log_audit_event signature: log_audit_event(user, action, target_id, details)
            self.assertEqual(kwargs.get('action'), "EXPORT_PATIENT_REPORTS_ZIP")
            self.assertIn(f"Exported patient IDs: ['{self.patient_a.id}']", kwargs.get('details'))
            self.assertIn(f"Excluded patient IDs: ['{self.patient_b.id}']", kwargs.get('details'))


class AdminDashboardTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        self.admin_user = self.create_user(username="admin1", role="admin", is_superuser=True)
        self.patient_user = self.create_user(username="patient1", role="patient")

    def test_admin_dashboard_security_and_diagnostics(self):
        # 1. Normal user cannot view admin dashboard
        self.login_user(self.client, "patient1")
        response = self.client.get(reverse('admin_dashboard'))
        self.assertEqual(response.status_code, 403)
        
        # 2. Admin can view dashboard without debug details
        self.login_user(self.client, "admin1")
        response2 = self.client.get(reverse('admin_dashboard'))
        self.assertEqual(response2.status_code, 200)
        self.assertNotContains(response2, "django-insecure")
        
        # 3. Admin views with debug diagnostics - must mask SECRET_KEY and DB credentials
        response3 = self.client.get(reverse('admin_dashboard') + "?debug=1")
        self.assertEqual(response3.status_code, 200)
        self.assertContains(response3, "REDACTED FOR SECURITY")
        self.assertContains(response3, "CREDENTIALS MASKED FOR SECURITY")
        self.assertNotContains(response3, "django-insecure")

class LoginRedirectionTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()
        self.patient_user = self.create_user(username="pat_redir", role="patient")
        self.patient = self.create_patient_profile(self.patient_user)

    def test_next_parameter_hiding_and_redirect(self):
        # 1. Access login page with next parameter
        login_url_with_next = reverse('universal_login') + "?next=/patient/documents/"
        response = self.client.get(login_url_with_next)
        
        # Should redirect to clean /login/ URL
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('universal_login'))
        
        # Verify next_url is saved in session
        self.assertEqual(self.client.session.get('next_url'), '/patient/documents/')

        # 2. Complete login POST and verify redirection to /patient/documents/
        response_login = self.client.post(reverse('universal_login'), {
            'username': 'pat_redir',
            'password': 'password123',
            'role': 'patient'
        })
        
        # Should redirect to the stored next path
        self.assertEqual(response_login.status_code, 302)
        self.assertEqual(response_login.url, '/patient/documents/')

class APIDocumentationTests(TestCase, JeevanTestClientMixin):
    def setUp(self):
        self.client = Client()

    def test_schema_view_response(self):
        url = reverse('api_v1:schema')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertTrue('text/yaml' in response.headers['Content-Type'] or 'application/vnd.oai.openapi' in response.headers['Content-Type'])

    def test_swagger_ui_response(self):
        url = reverse('api_v1:swagger-ui')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "SwaggerUIBundle")

    def test_redoc_ui_response(self):
        url = reverse('api_v1:redoc')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "<redoc")

