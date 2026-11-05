"""Cross-role workflows with independent, persistent signed-in sessions."""
import io
import zipfile
from datetime import timedelta

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import Client, TestCase
from django.urls import reverse
from django.utils import timezone

from appointments.models import Appointment
from care.models import CareCoordinator
from doctor.models import AppointmentPrescription, Consent
from jeevan.test_helpers import JeevanTestClientMixin
from nurse.models import Nurse
from patient.models import PatientDocument


class MultiUserSynchronizationTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        helper = JeevanTestClientMixin()
        cls.hospital = helper.create_hospital()
        cls.other_hospital = helper.create_hospital(name='Other Sync Clinic', registration_number='SYNC-OTHER')
        cls.users = {}
        for role in ('patient', 'doctor', 'nurse', 'receptionist', 'care_coordinator'):
            cls.users[role] = helper.create_user('sync_' + role, role=role)
        cls.patient = helper.create_patient_profile(cls.users['patient'], full_name='Sync Patient Example')
        cls.doctor = helper.create_doctor_profile(cls.users['doctor'], cls.hospital)
        Nurse.objects.create(user=cls.users['nurse'], hospital=cls.hospital,
                             full_name='Sync Nurse Example', gender='Female')
        helper.create_receptionist_profile(cls.users['receptionist'], cls.hospital,
                                           full_name='Sync Reception Example')
        CareCoordinator.objects.create(user=cls.users['care_coordinator'], hospital=cls.hospital,
                                       full_name='Sync Coordinator Example')
        cls.other_user = helper.create_user('sync_other_patient')
        helper.create_patient_profile(cls.other_user, full_name='Other Patient Example')

    def setUp(self):
        self.clients = {}
        for index, (role, user) in enumerate(self.users.items(), start=1):
            client = Client(REMOTE_ADDR=f'192.0.2.{index}')
            response = client.post(reverse('universal_login'), {
                'username': user.username, 'password': 'password123', 'role': role,
            })
            self.assertEqual(response.status_code, 302, role)
            self.assertEqual(int(client.session['_auth_user_id']), user.pk, role)
            self.clients[role] = client
        # Each browser has its own session; later requests never switch identities.
        self.assertEqual(len({client.session.session_key for client in self.clients.values()}), 5)

    def book(self):
        response = self.clients['patient'].post(reverse('appointments:appointment_create'), {
            'hospital': self.hospital.pk, 'doctor': self.doctor.pk,
            'appointment_date': (timezone.localdate() + timedelta(days=2)).isoformat(),
            'appointment_time': '10:00', 'hour': '10', 'minute': '0', 'am_pm': 'AM',
            'payment_mode': 'cash', 'symptoms': 'Fictional multi-user synchronization check',
        })
        self.assertEqual(response.status_code, 302)
        appointment = Appointment.objects.get(patient=self.patient)
        self.assertEqual(appointment.status, 'pending')
        return appointment

    def accept(self, appointment):
        response = self.clients['doctor'].post(reverse('doctor:update_appointment_status',
                                                     args=[appointment.pk, 'accepted']))
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])

    def test_booking_reschedule_acceptance_and_cancellation_refresh_across_roles(self):
        appointment = self.book()
        doctor_dashboard = self.clients['doctor'].get(reverse('doctor:dashboard'))
        self.assertEqual(doctor_dashboard.context['pending_count'], 1)
        reception = self.clients['receptionist'].get(reverse('receptionist:appointments'))
        self.assertEqual(list(reception.context['appointments']), [appointment])
        self.assertContains(self.clients['nurse'].get(reverse('nurse:dashboard')), self.patient.full_name)
        self.assertContains(self.clients['care_coordinator'].get(reverse('coordinator_dashboard')), self.patient.full_name)

        new_date = timezone.localdate() + timedelta(days=3)
        response = self.clients['patient'].post(reverse('appointments:appointment_update', args=[appointment.pk]), {
            'appointment_date': new_date.isoformat(), 'appointment_time': '11:15',
            'hour': '11', 'minute': '15', 'am_pm': 'AM', 'payment_mode': 'cash',
            'symptoms': 'Fictional rescheduled visit',
        })
        self.assertEqual(response.status_code, 302)
        for role, route in (('doctor', 'doctor:appointments'), ('receptionist', 'receptionist:appointments')):
            with self.subTest(role=role):
                listed = self.clients[role].get(reverse(route)).context['appointments'].get(pk=appointment.pk)
                self.assertEqual(listed.appointment_date, new_date)
                self.assertEqual(listed.appointment_time.strftime('%H:%M'), '11:15')

        response = self.clients['receptionist'].post(reverse('receptionist:appointment_action', args=[appointment.pk, 'accept']))
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['success'])
        patient_dashboard = self.clients['patient'].get(reverse('patient:profile_dashboard'))
        self.assertEqual(patient_dashboard.context['upcoming_count'], 1)
        self.assertEqual(patient_dashboard.context['upcoming_appointments'][0].appointment_date, new_date)
        self.assertEqual(self.clients['doctor'].get(reverse('doctor:dashboard')).context['accepted_count'], 1)

        response = self.clients['patient'].post(reverse('appointments:appointment_cancel', args=[appointment.pk]))
        self.assertEqual(response.status_code, 302)
        self.assertEqual(self.clients['patient'].get(reverse('patient:profile_dashboard')).context['upcoming_count'], 0)
        self.assertEqual(self.clients['doctor'].get(reverse('doctor:dashboard')).context['accepted_count'], 0)
        appointment.refresh_from_db()
        self.assertEqual(appointment.status, 'cancelled')

    def test_nurse_readings_and_doctor_prescription_reach_patient_session(self):
        appointment = self.book()
        self.accept(appointment)
        response = self.clients['nurse'].post(reverse('nurse:log_vitals', args=[self.patient.pk]), {
            'blood_pressure_systolic': '121', 'blood_pressure_diastolic': '81',
            'heart_rate': '76', 'temperature': '98.6', 'oxygen_saturation': '99',
            'notes': 'Fictional synchronized observation',
        })
        self.assertEqual(response.status_code, 302)
        response = self.clients['patient'].get(reverse('patient:vital_signs_api'))
        self.assertEqual(response.status_code, 200)
        reading = response.json()['data'][0]
        self.assertEqual(reading['heart_rate'], 76)
        self.assertEqual(reading['temperature'], 98.6)
        self.assertEqual(reading['notes'], 'Fictional synchronized observation')

        response = self.clients['doctor'].post(reverse('doctor:appointment_prescription', args=[appointment.pk]), {
            'diagnosis': 'Fictional synchronized diagnosis',
            'medications': 'Example medicine - Example dose - Example frequency - Example duration',
            'advice': 'Fictional patient instructions',
        })
        self.assertEqual(response.status_code, 302)
        prescription = AppointmentPrescription.objects.get(appointment=appointment)
        self.assertContains(self.clients['patient'].get(reverse('patient:prescription_list')), 'Fictional synchronized diagnosis')
        self.assertContains(self.clients['patient'].get(reverse('patient:prescription_detail', args=[prescription.pk])),
                            'Fictional patient instructions')
        appointment.refresh_from_db()
        self.assertEqual(appointment.status, 'completed')
        self.assertEqual(self.clients['doctor'].get(reverse('doctor:dashboard')).context['completed_count'], 1)
        self.assertEqual(self.clients['patient'].get(reverse('patient:profile_dashboard')).context['upcoming_count'], 0)

    def test_report_consent_grant_and_revocation_apply_to_existing_staff_sessions(self):
        appointment = self.book()
        self.accept(appointment)
        pdf = b'%PDF-1.4 fictional persistent-client report'
        response = self.clients['patient'].post(reverse('patient:document_upload'), {
            'title': 'Synchronized private report', 'document_type': 'report',
            'file': SimpleUploadedFile('synchronized.pdf', pdf, content_type='application/pdf'),
        })
        self.assertEqual(response.status_code, 302)
        document = PatientDocument.objects.get(patient=self.patient)
        self.addCleanup(document.file.storage.delete, document.file.name)
        download = reverse('patient:document_download', args=[document.pk])
        export = reverse('export_patient_reports_zip')
        self.assertEqual(self.clients['doctor'].get(download).status_code, 403)
        self.assertEqual(self.clients['care_coordinator'].post(export, {'patient_ids': [self.patient.pk]}).status_code, 302)

        response = self.clients['doctor'].post(reverse('doctor:request_consent', args=[self.patient.pk]), {'reason': 'Fictional sync check'})
        self.assertEqual(response.status_code, 302)
        consent = Consent.objects.get(doctor=self.doctor, patient=self.patient)
        self.assertContains(self.clients['patient'].get(reverse('patient:consent_requests')), self.doctor.full_name)
        self.assertEqual(self.clients['patient'].post(reverse('doctor:approve_consent', args=[consent.pk])).status_code, 200)

        response = self.clients['doctor'].get(download)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(b''.join(response.streaming_content), pdf)
        response = self.clients['care_coordinator'].post(export, {'patient_ids': [self.patient.pk]})
        self.assertEqual(response.status_code, 200)
        with zipfile.ZipFile(io.BytesIO(b''.join(response.streaming_content))) as archive:
            self.assertEqual(len(archive.namelist()), 1)
            self.assertEqual(archive.read(archive.namelist()[0]), pdf)

        other = Client(REMOTE_ADDR='192.0.2.100')
        self.assertTrue(other.login(username=self.other_user.username, password='password123'))
        self.assertEqual(other.get(download).status_code, 403)
        self.assertEqual(self.clients['patient'].post(reverse('doctor:reject_consent', args=[consent.pk])).status_code, 200)
        self.assertEqual(self.clients['doctor'].get(download).status_code, 403)
        self.assertEqual(self.clients['care_coordinator'].post(export, {'patient_ids': [self.patient.pk]}).status_code, 302)
