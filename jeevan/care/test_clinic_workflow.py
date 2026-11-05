from datetime import timedelta
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from appointments.models import Appointment
from doctor.models import Consent, AppointmentPrescription
from nurse.models import Nurse
from patient.models import PatientDocument, VitalSign
from jeevan.test_helpers import JeevanTestClientMixin


class ClinicWorkflowTests(JeevanTestClientMixin, TestCase):
    def test_booking_visit_and_report_consent_through_web_routes(self):
        hospital = self.create_hospital()
        doctor_user = self.create_user('workflow_doctor', role='doctor')
        doctor = self.create_doctor_profile(doctor_user, hospital)
        patient_user = self.create_user('workflow_patient')
        patient = self.create_patient_profile(patient_user)
        nurse_user = self.create_user('workflow_nurse', role='nurse')
        Nurse.objects.create(user=nurse_user, hospital=hospital, full_name='Workflow Nurse', gender='Female')

        self.client.force_login(patient_user)
        response = self.client.post(reverse('appointments:appointment_create'), {
            'hospital': hospital.pk, 'doctor': doctor.pk,
            'appointment_date': (timezone.localdate()+timedelta(days=1)).isoformat(),
            'appointment_time': '10:00', 'hour': '10', 'minute': '0', 'am_pm': 'AM',
            'payment_mode': 'cash', 'symptoms': 'Fictional workflow check',
        })
        self.assertEqual(response.status_code, 302)
        appointment = Appointment.objects.get(patient=patient, doctor=doctor)
        self.assertEqual(appointment.status, 'pending')

        self.client.force_login(doctor_user)
        response = self.client.post(reverse('doctor:update_appointment_status', args=[appointment.pk, 'accepted']))
        self.assertEqual(response.status_code, 200)
        appointment.refresh_from_db()
        self.assertEqual(appointment.status, 'accepted')
        response = self.client.post(reverse('doctor:request_consent', args=[patient.pk]), {'reason': 'Fictional visit'})
        self.assertEqual(response.status_code, 302)
        consent = Consent.objects.get(doctor=doctor, patient=patient)

        self.client.force_login(nurse_user)
        response = self.client.post(reverse('nurse:log_vitals', args=[patient.pk]), {
            'blood_pressure_systolic': '120', 'blood_pressure_diastolic': '80',
            'heart_rate': '75', 'temperature': '98.6', 'oxygen_saturation': '99',
        })
        self.assertEqual(response.status_code, 302)
        from django.contrib.messages import get_messages
        self.assertEqual(VitalSign.objects.filter(patient=patient).count(), 1,
                         [str(message) for message in get_messages(response.wsgi_request)])

        self.client.force_login(patient_user)
        response = self.client.post(reverse('patient:document_upload'), {
            'title': 'Fictional report', 'document_type': 'report',
            'file': SimpleUploadedFile('fictional.pdf', b'%PDF-1.4 fictional workflow report', content_type='application/pdf'),
        })
        self.assertEqual(response.status_code, 302)
        document = PatientDocument.objects.get(patient=patient)
        self.addCleanup(document.file.storage.delete, document.file.name)

        self.client.force_login(doctor_user)
        download = reverse('patient:document_download', args=[document.pk])
        self.assertEqual(self.client.get(download).status_code, 403)
        self.client.force_login(patient_user)
        self.assertEqual(self.client.post(reverse('doctor:approve_consent', args=[consent.pk])).status_code, 200)
        self.client.force_login(doctor_user)
        response = self.client.get(download)
        self.assertEqual(response.status_code, 200)
        # Django's streaming test iterator closes the response when consumed.
        # Closing it twice emits request_finished inside the test transaction.
        self.assertEqual(b''.join(response.streaming_content), b'%PDF-1.4 fictional workflow report')

        response = self.client.post(reverse('doctor:appointment_prescription', args=[appointment.pk]), {
            'diagnosis': 'Fictional test diagnosis',
            'medications': 'Example medication - Example dose - Example frequency - Example duration',
        })
        self.assertEqual(response.status_code, 302)
        self.assertTrue(AppointmentPrescription.objects.filter(appointment=appointment).exists())
        appointment.refresh_from_db()
        self.assertEqual(appointment.status, 'completed')

        self.client.force_login(patient_user)
        self.assertEqual(self.client.post(reverse('doctor:reject_consent', args=[consent.pk])).status_code, 200)
        self.client.force_login(doctor_user)
        self.assertEqual(self.client.get(download).status_code, 403)
