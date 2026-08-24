from datetime import datetime, date, time, timedelta
from django.test import TestCase
from django.core.exceptions import ValidationError, PermissionDenied
from django.utils import timezone
from django.contrib.auth import get_user_model

from care.models import CustomUser, Hospital, Specialization
from doctor.models import Doctor
from patient.models import Patient
from appointments.models import Appointment
from appointments.services import create_appointment, reschedule_appointment, update_appointment_status

User = get_user_model()

class AppointmentServiceTests(TestCase):
    def setUp(self):
        # Create Patient
        self.patient_user = CustomUser.objects.create_user(
            username='patient1',
            email='patient1@example.com',
            password='Password123!',
            role='patient'
        )
        self.patient = Patient.objects.create(
            user=self.patient_user,
            full_name='Patient One',
            abha_id='1234-5678-9012'
        )

        # Create Patient B (for cross-ownership checks)
        self.patient_user_b = CustomUser.objects.create_user(
            username='patient2',
            email='patient2@example.com',
            password='Password123!',
            role='patient'
        )
        self.patient_b = Patient.objects.create(
            user=self.patient_user_b,
            full_name='Patient Two',
            abha_id='1234-5678-9013'
        )

        # Create Hospitals
        self.hospital_a = Hospital.objects.create(
            name='Hospital A',
            location='A Location',
            email='hosp_a@test.com',
            contact_no='1234567890',
            registration_number='REG_A'
        )
        self.hospital_b = Hospital.objects.create(
            name='Hospital B',
            location='B Location',
            email='hosp_b@test.com',
            contact_no='1234567891',
            registration_number='REG_B'
        )

        # Create Specialization
        self.specialization, _ = Specialization.objects.get_or_create(sname='General')

        # Create Doctor A (at Hospital A)
        self.doctor_user_a = CustomUser.objects.create_user(
            username='doctor_a',
            email='doc_a@example.com',
            password='Password123!',
            role='doctor'
        )
        self.doctor_a = Doctor.objects.create(
            user=self.doctor_user_a,
            full_name='Doctor A',
            hospital=self.hospital_a
        )
        self.doctor_a.specialization.add(self.specialization)

        # Create Doctor B (at Hospital B)
        self.doctor_user_b = CustomUser.objects.create_user(
            username='doctor_b',
            email='doc_b@example.com',
            password='Password123!',
            role='doctor'
        )
        self.doctor_b = Doctor.objects.create(
            user=self.doctor_user_b,
            full_name='Doctor B',
            hospital=self.hospital_b
        )
        self.doctor_b.specialization.add(self.specialization)

        # Create Receptionist A (at Hospital A)
        self.receptionist_user_a = CustomUser.objects.create_user(
            username='receptionist_a',
            email='recep_a@example.com',
            password='Password123!',
            role='receptionist'
        )
        from receptionist.models import Receptionist
        self.receptionist_a = Receptionist.objects.create(
            user=self.receptionist_user_a,
            full_name='Receptionist A',
            hospital=self.hospital_a
        )

        # Set valid upcoming date/time
        self.appt_date = timezone.now().date() + timedelta(days=2)
        self.appt_time = time(10, 0)

    def test_create_appointment_success(self):
        appt = create_appointment(
            patient=self.patient,
            doctor=self.doctor_a,
            hospital=self.hospital_a,
            appointment_date=self.appt_date,
            appointment_time=self.appt_time,
            symptoms='Cold',
            payment_mode='cash',
            actor=self.patient_user
        )
        self.assertEqual(appt.patient, self.patient)
        self.assertEqual(appt.doctor, self.doctor_a)
        self.assertEqual(appt.hospital, self.hospital_a)
        self.assertEqual(appt.status, 'pending')

    def test_create_appointment_mandatory_fields(self):
        with self.assertRaises(ValidationError):
            create_appointment(
                patient=self.patient,
                doctor=self.doctor_a,
                hospital=self.hospital_a,
                appointment_date=None,
                appointment_time=self.appt_time,
                actor=self.patient_user
            )

        with self.assertRaises(ValidationError):
            create_appointment(
                patient=self.patient,
                doctor=self.doctor_a,
                hospital=self.hospital_a,
                appointment_date=self.appt_date,
                appointment_time=None,
                actor=self.patient_user
            )

    def test_create_appointment_past_date(self):
        past_date = timezone.now().date() - timedelta(days=1)
        with self.assertRaises(ValidationError):
            create_appointment(
                patient=self.patient,
                doctor=self.doctor_a,
                hospital=self.hospital_a,
                appointment_date=past_date,
                appointment_time=self.appt_time,
                actor=self.patient_user
            )

    def test_create_appointment_past_time_today(self):
        # Construct a datetime 2 hours ago
        past_dt = timezone.localtime(timezone.now()) - timedelta(hours=2)
        with self.assertRaises(ValidationError):
            create_appointment(
                patient=self.patient,
                doctor=self.doctor_a,
                hospital=self.hospital_a,
                appointment_date=past_dt.date(),
                appointment_time=past_dt.time(),
                actor=self.patient_user
            )

    def test_create_appointment_invalid_hospital(self):
        # Doctor A is in Hospital A, but trying to book under Hospital B
        with self.assertRaises(ValidationError):
            create_appointment(
                patient=self.patient,
                doctor=self.doctor_a,
                hospital=self.hospital_b,
                appointment_date=self.appt_date,
                appointment_time=self.appt_time,
                actor=self.patient_user
            )

    def test_double_booking_prevention(self):
        # Create first appointment
        create_appointment(
            patient=self.patient,
            doctor=self.doctor_a,
            hospital=self.hospital_a,
            appointment_date=self.appt_date,
            appointment_time=self.appt_time,
            actor=self.patient_user
        )
        
        # Second attempt for same doctor, date, time by different patient should fail
        with self.assertRaises(ValidationError):
            create_appointment(
                patient=self.patient_b,
                doctor=self.doctor_a,
                hospital=self.hospital_a,
                appointment_date=self.appt_date,
                appointment_time=self.appt_time,
                actor=self.patient_user_b
            )

    def test_reschedule_appointment_success(self):
        appt = create_appointment(
            patient=self.patient,
            doctor=self.doctor_a,
            hospital=self.hospital_a,
            appointment_date=self.appt_date,
            appointment_time=self.appt_time,
            actor=self.patient_user
        )
        
        new_date = self.appt_date + timedelta(days=1)
        new_time = time(11, 0)
        
        rescheduled = reschedule_appointment(
            appointment_id=appt.id,
            new_date=new_date,
            new_time=new_time,
            actor=self.patient_user
        )
        self.assertEqual(rescheduled.appointment_date, new_date)
        self.assertEqual(rescheduled.appointment_time, new_time)

    def test_reschedule_appointment_conflict(self):
        # Book appt 1
        appt1 = create_appointment(
            patient=self.patient,
            doctor=self.doctor_a,
            hospital=self.hospital_a,
            appointment_date=self.appt_date,
            appointment_time=self.appt_time,
            actor=self.patient_user
        )
        
        # Book appt 2 on different time
        appt2 = create_appointment(
            patient=self.patient_b,
            doctor=self.doctor_a,
            hospital=self.hospital_a,
            appointment_date=self.appt_date,
            appointment_time=time(14, 0),
            actor=self.patient_user_b
        )
        
        # Rescheduling appt 1 to appt 2's slot should fail
        with self.assertRaises(ValidationError):
            reschedule_appointment(
                appointment_id=appt1.id,
                new_date=self.appt_date,
                new_time=time(14, 0),
                actor=self.patient_user
            )

    def test_status_transitions_valid(self):
        appt = create_appointment(
            patient=self.patient,
            doctor=self.doctor_a,
            hospital=self.hospital_a,
            appointment_date=self.appt_date,
            appointment_time=self.appt_time,
            actor=self.patient_user
        )
        
        # 1. pending -> accepted
        appt = update_appointment_status(appt.id, 'accepted', self.doctor_user_a)
        self.assertEqual(appt.status, 'accepted')
        
        # 2. accepted -> completed
        appt = update_appointment_status(appt.id, 'completed', self.doctor_user_a)
        self.assertEqual(appt.status, 'completed')

    def test_status_transitions_invalid(self):
        appt = create_appointment(
            patient=self.patient,
            doctor=self.doctor_a,
            hospital=self.hospital_a,
            appointment_date=self.appt_date,
            appointment_time=self.appt_time,
            actor=self.patient_user
        )
        
        # pending -> completed (invalid)
        with self.assertRaises(ValidationError):
            update_appointment_status(appt.id, 'completed', self.doctor_user_a)
            
        # reject first
        appt = update_appointment_status(appt.id, 'rejected', self.doctor_user_a, reason='Busy')
        self.assertEqual(appt.status, 'rejected')
        
        # rejected -> accepted (invalid transition from terminal state)
        with self.assertRaises(ValidationError):
            update_appointment_status(appt.id, 'accepted', self.doctor_user_a)

    def test_role_authorization_enforcement(self):
        appt = create_appointment(
            patient=self.patient,
            doctor=self.doctor_a,
            hospital=self.hospital_a,
            appointment_date=self.appt_date,
            appointment_time=self.appt_time,
            actor=self.patient_user
        )
        
        # Doctor B cannot accept Doctor A's appointment
        with self.assertRaises(PermissionDenied):
            update_appointment_status(appt.id, 'accepted', self.doctor_user_b)
            
        # Patient cannot accept their own appointment
        with self.assertRaises(ValidationError):
            update_appointment_status(appt.id, 'accepted', self.patient_user)
            
        # Patient B cannot cancel Patient A's appointment
        with self.assertRaises(PermissionDenied):
            update_appointment_status(appt.id, 'cancelled', self.patient_user_b)
            
        # Receptionist A can accept (same hospital)
        appt = update_appointment_status(appt.id, 'accepted', self.receptionist_user_a)
        self.assertEqual(appt.status, 'accepted')
