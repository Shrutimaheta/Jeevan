import io
import uuid
from datetime import timedelta
from PIL import Image

from django.test import TestCase, Client
from django.core.exceptions import ValidationError, PermissionDenied
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

from care.models import CustomUser
from doctor.models import Doctor, Consent
from patient.models import Patient, PatientDocument, VitalSign, Medication, MedicationLog, Notification, PasswordResetToken, OTPVerification
from patient.forms import validate_file_security, PatientProfileForm, PatientDocumentForm

User = get_user_model()

class PatientSecurityTests(TestCase):
    def setUp(self):
        # Create users
        self.patient_user = CustomUser.objects.create_user(
            username='pat1',
            email='pat1@example.com',
            password='Password123!',
            role='patient'
        )
        self.patient = Patient.objects.create(
            user=self.patient_user,
            full_name='Patient One',
            abha_id='1234-5678-9012'
        )
        
        self.other_user = CustomUser.objects.create_user(
            username='pat2',
            email='pat2@example.com',
            password='Password123!',
            role='patient'
        )
        self.other_patient = Patient.objects.create(
            user=self.other_user,
            full_name='Patient Two',
            abha_id='1234-5678-9013'
        )
        
        self.doctor_user = CustomUser.objects.create_user(
            username='doc1',
            email='doc1@example.com',
            password='Password123!',
            role='doctor'
        )
        # Doctor needs a hospital, let's mock one
        from receptionist.models import Hospital
        self.hospital = Hospital.objects.create(
            name='Test Hospital',
            location='123 Test St',
            email='hospital@test.com',
            contact_no='1234567890',
            registration_number='HOSP12345'
        )
        from care.models import Specialization
        spec, _ = Specialization.objects.get_or_create(sname='General')
        self.doctor = Doctor.objects.create(
            user=self.doctor_user,
            full_name='Doctor One',
            hospital=self.hospital
        )
        self.doctor.specialization.add(spec)
        
        # Helper to generate valid jpeg bytes
        f = io.BytesIO()
        img = Image.new('RGB', (100, 100), color='blue')
        img.save(f, format='JPEG')
        self.valid_jpeg_bytes = f.getvalue()

    def test_file_security_validation(self):
        # 1. Valid jpeg
        valid_file = SimpleUploadedFile("photo.jpg", self.valid_jpeg_bytes, content_type="image/jpeg")
        try:
            validate_file_security(valid_file, is_image_only=True)
        except ValidationError:
            self.fail("validate_file_security raised ValidationError on a valid JPEG image.")
            
        # 2. Exceed limit size
        large_bytes = b'a' * (6 * 1024 * 1024) # 6MB
        large_file = SimpleUploadedFile("big.jpg", large_bytes, content_type="image/jpeg")
        with self.assertRaises(ValidationError):
            validate_file_security(large_file, is_image_only=True)
            
        # 3. Invalid extension
        invalid_ext = SimpleUploadedFile("photo.exe", self.valid_jpeg_bytes, content_type="image/jpeg")
        with self.assertRaises(ValidationError):
            validate_file_security(invalid_ext, is_image_only=True)
            
        # 4. Extension / Magic bytes mismatch
        mismatch_file = SimpleUploadedFile("doc.pdf", self.valid_jpeg_bytes, content_type="application/pdf")
        with self.assertRaises(ValidationError):
            validate_file_security(mismatch_file, is_image_only=False)
            
        # 5. Image pixel dimensions limit (5000x5000)
        f_huge = io.BytesIO()
        img_huge = Image.new('RGB', (5001, 100), color='red')
        img_huge.save(f_huge, format='JPEG')
        huge_file = SimpleUploadedFile("huge.jpg", f_huge.getvalue(), content_type="image/jpeg")
        with self.assertRaises(ValidationError):
            validate_file_security(huge_file, is_image_only=True)

    def test_authoritative_profile_sync(self):
        # Using PatientProfileForm to save profile
        form_data = {
            'full_name': 'Updated Patient Name',
            'gender': 'Male',
            'date_of_birth': '1990-01-01',
            'abha_id': '1234-5678-9012',
            'email': 'newemail@example.com',
            'contact_number': '9876543210',
            'address': 'New Address',
            'city': 'New City',
            'pincode': '123456'
        }
        form = PatientProfileForm(data=form_data, instance=self.patient)
        self.assertTrue(form.is_valid(), form.errors)
        saved_patient = form.save()
        
        # Verify sync to CustomUser
        self.patient_user.refresh_from_db()
        self.assertEqual(self.patient_user.full_name, 'Updated Patient Name')
        self.assertEqual(self.patient_user.email, 'newemail@example.com')
        self.assertEqual(self.patient_user.contact_number, '9876543210')

    def test_relative_route_redirect_notifications(self):
        # 1. Safe relative URL path
        notification = Notification(
            patient=self.patient,
            title='Test',
            message='Test message',
            type='system',
            action_url='/patient/dashboard/'
        )
        try:
            notification.full_clean()
            notification.save()
        except ValidationError:
            self.fail("Notification clean failed on a safe relative route.")
            
        # 2. Unsafe protocol-relative URL (potential open redirect/hijack)
        notification.action_url = '//evil.com/payload'
        with self.assertRaises(ValidationError):
            notification.full_clean()
            
        # 3. Unsafe external URL
        notification.action_url = 'https://evil.com/hijack'
        with self.assertRaises(ValidationError):
            notification.full_clean()

    def test_idempotent_medication_logging(self):
        medication = Medication.objects.create(
            patient=self.patient,
            name='Aspirin',
            dosage='100mg',
            frequency='Daily',
            is_active=True,
            prescribed_date=timezone.now().date()
        )
        
        # First log creation
        client = Client()
        client.force_login(self.patient_user)
        response = client.post(
            reverse('patient:log_medication_api'),
            data={'medication_id': medication.id, 'notes': 'Taken in morning'},
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        res_data = response.json()
        self.assertTrue(res_data['success'])
        first_log_id = res_data['id']
        self.assertFalse(res_data['already_logged'])
        
        # Duplicate log creation (same day)
        response2 = client.post(
            reverse('patient:log_medication_api'),
            data={'medication_id': medication.id, 'notes': 'Taken in morning again'},
            content_type='application/json'
        )
        self.assertEqual(response2.status_code, 200)
        res_data2 = response2.json()
        self.assertTrue(res_data2['success'])
        self.assertEqual(res_data2['id'], first_log_id)
        self.assertTrue(res_data2['already_logged'])
        
        # Database count should remain 1
        self.assertEqual(MedicationLog.objects.filter(medication=medication).count(), 1)

    def test_database_aggregation_charting(self):
        # Create some vitals readings over a range of dates
        now = timezone.now()
        vs1 = VitalSign.objects.create(
            patient=self.patient,
            blood_pressure_systolic=120,
            blood_pressure_diastolic=80,
            heart_rate=72,
            temperature=98.6,
            oxygen_saturation=98,
            weight=150.0
        )
        VitalSign.objects.filter(id=vs1.id).update(recorded_at=now - timedelta(days=2))
        
        vs2 = VitalSign.objects.create(
            patient=self.patient,
            blood_pressure_systolic=130,
            blood_pressure_diastolic=90,
            heart_rate=78,
            temperature=99.0,
            oxygen_saturation=97,
            weight=150.0
        )
        VitalSign.objects.filter(id=vs2.id).update(recorded_at=now - timedelta(days=2))
        
        vs3 = VitalSign.objects.create(
            patient=self.patient,
            blood_pressure_systolic=140,
            blood_pressure_diastolic=95,
            heart_rate=80,
            temperature=98.2,
            oxygen_saturation=99,
            weight=152.0
        )
        VitalSign.objects.filter(id=vs3.id).update(recorded_at=now - timedelta(days=15))
        
        client = Client()
        client.force_login(self.patient_user)
        
        # Test Month Aggregation (grouped by date)
        response = client.get(reverse('patient:vital_signs_api'), {'period': 'month'})
        self.assertEqual(response.status_code, 200)
        data = response.json()['data']
        # Should aggregate the two readings on (now - 2 days) into a single day average
        self.assertEqual(len(data), 2)
        
        # First date entry (now - 15 days) average systolic = 140
        self.assertEqual(data[0]['blood_pressure_systolic'], 140.0)
        # Second date entry (now - 2 days) average systolic = (120+130)/2 = 125
        self.assertEqual(data[1]['blood_pressure_systolic'], 125.0)

    def test_secure_document_download(self):
        document = PatientDocument.objects.create(
            patient=self.patient,
            title='Lab Report',
            file=SimpleUploadedFile("report.pdf", b'%PDF-1.4 test file data', content_type='application/pdf')
        )
        
        client = Client()
        
        # 1. Unauthenticated user denied redirect
        resp = client.get(reverse('patient:document_download', args=[document.id]))
        self.assertEqual(resp.status_code, 302)
        
        # 2. Patient Owner allowed access
        client.force_login(self.patient_user)
        resp = client.get(reverse('patient:document_download', args=[document.id]))
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp['Content-Type'], 'application/pdf')
        self.assertIn(b'%PDF', resp.content)
        
        # 3. Other Patient denied access
        client.force_login(self.other_user)
        resp3 = client.get(reverse('patient:document_download', args=[document.id]))
        self.assertEqual(resp3.status_code, 403)
        
        # 4. Doctor without consent denied access
        client.force_login(self.doctor_user)
        resp4 = client.get(reverse('patient:document_download', args=[document.id]))
        self.assertEqual(resp4.status_code, 403)
            
        # 5. Doctor with approved consent allowed access
        Consent.objects.create(
            doctor=self.doctor,
            patient=self.patient,
            status='approved'
        )
        resp = client.get(reverse('patient:document_download', args=[document.id]))
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp['Content-Type'], 'application/pdf')

    def test_secure_password_reset_flow(self):
        client = Client()
        
        # 1. Try forgot password request
        resp = client.post(reverse('patient:forgot_password'), {
            'recovery_method': 'email',
            'email': 'pat1@example.com'
        })
        self.assertEqual(resp.status_code, 302)
        
        resp_dummy = client.post(reverse('patient:forgot_password'), {
            'recovery_method': 'email',
            'email': 'nonexistent@example.com'
        })
        self.assertEqual(resp_dummy.status_code, 302)
        
        # 2. Check generated OTP hash in DB
        otp_verification = OTPVerification.objects.filter(user=self.patient_user).first()
        self.assertIsNotNone(otp_verification)
        self.assertTrue(otp_verification.otp_hash.startswith('pbkdf2_sha256$') or otp_verification.otp_hash.startswith('bcrypt'))
        
        # 3. Check cooldown throttle
        resp_throttle = client.post(reverse('patient:forgot_password'), {
            'recovery_method': 'email',
            'email': 'pat1@example.com'
        })
        self.assertEqual(resp_throttle.status_code, 200)
        
        # 4. Test OTP attempts limit
        session = client.session
        session['reset_user_id'] = self.patient_user.id
        session.save()
        
        client.post(reverse('patient:verify_email_otp', args=[self.patient.id]), {'otp': '000000'})
        otp_verification.refresh_from_db()
        self.assertEqual(otp_verification.attempts, 1)
        
        client.post(reverse('patient:verify_email_otp', args=[self.patient.id]), {'otp': '000000'})
        client.post(reverse('patient:verify_email_otp', args=[self.patient.id]), {'otp': '000000'})
        with self.assertRaises(OTPVerification.DoesNotExist):
            otp_verification.refresh_from_db()
            
        # 5. Correct OTP resets password
        otp_code = '123456'
        OTPVerification.objects.create(
            user=self.patient_user,
            otp_hash=make_password(otp_code),
            purpose='password_reset',
            expires_at=timezone.now() + timedelta(minutes=5)
        )
        session = client.session
        session['reset_user_id'] = self.patient_user.id
        session.save()
        
        resp_otp = client.post(reverse('patient:verify_email_otp', args=[self.patient.id]), {'otp': otp_code})
        self.assertEqual(resp_otp.status_code, 302)
        
        self.assertEqual(OTPVerification.objects.filter(user=self.patient_user).count(), 0)
        reset_token = PasswordResetToken.objects.filter(patient=self.patient, is_used=False).first()
        self.assertIsNotNone(reset_token)
        
        resp_reset = client.post(reverse('patient:reset_password', args=[reset_token.token]), {
            'new_password': 'NewPassword123!',
            'confirm_password': 'NewPassword123!'
        })
        self.assertEqual(resp_reset.status_code, 302)
        
        reset_token.refresh_from_db()
        self.assertTrue(reset_token.is_used)
        
        self.patient_user.refresh_from_db()
        self.assertTrue(self.patient_user.check_password('NewPassword123!'))
