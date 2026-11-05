"""Presentation data stays fictional, while names and labels look natural."""
from datetime import date
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.db.models import Q, CharField, TextField
from care.models import CustomUser, Hospital, Specialization, CareCoordinator
from doctor.models import Doctor, AppointmentPrescription
from patient.models import Patient, PatientDocument, VitalSign, Notification, WellnessLog, Medication
from nurse.models import Nurse
from receptionist.models import Receptionist
from appointments.models import Appointment
from records.models import MedicalRecord


PEOPLE = {
    'patient': ('ananya.patel', 'Ananya Patel'),
    'doctor': ('kavya.shah', 'Kavya Shah'),
    'nurse': ('nisha.desai', 'Nisha Desai'),
    'receptionist': ('riya.joshi', 'Riya Joshi'),
    'care_coordinator': ('meera.trivedi', 'Meera Trivedi'),
    'outsider': ('isha.mehta', 'Isha Mehta'),
}


class Command(BaseCommand):
    help = 'Create or refresh natural-looking fictional demo identities in the isolated database.'

    def add_arguments(self, parser):
        parser.add_argument('--password', help='Optional initial password for NEW demo accounts only.')

    @transaction.atomic
    def handle(self, *args, **options):
        database = str(settings.DATABASES['default']['NAME'])
        protected_preview = (getattr(settings, 'IS_RENDER_PREVIEW', False)
                             and getattr(settings, 'DEMO_MODE', False) and database == 'jeevan_qa')
        if (settings.IS_PRODUCTION and not protected_preview) or not (database.endswith('qa.sqlite3') or database == 'jeevan_qa'):
            raise CommandError('Demo data may only be used in the isolated non-production database.')
        hospitals = []
        for old_code, code, name, city, phone in (
            ('QA-HOSP-A', 'JVN-AHD-001', 'Aarogya Multispeciality Clinic', 'Ahmedabad', '9000000000'),
            ('QA-HOSP-B', 'JVN-SRT-002', 'Prerna Family Clinic', 'Surat', '9000000009'),
        ):
            hospital = Hospital.objects.filter(registration_number__in=[old_code, code]).first()
            if hospital is None:
                hospital = Hospital(registration_number=code, location=city, contact_no=phone)
            hospital.registration_number, hospital.name = code, name
            hospital.email = ('aarogya' if city == 'Ahmedabad' else 'prerna') + '@example.com'
            hospital.save()
            hospitals.append(hospital)
        specialty = Specialization.objects.filter(sname='QA General Medicine').first()
        if specialty:
            specialty.sname = 'General Medicine'
            specialty.save()
        else:
            specialty = Specialization.objects.filter(sname='General Medicine').first()
            specialty = specialty or Specialization.objects.create(sname='General Medicine')
        hospitals[0].specialization.add(specialty)
        replacements, users, demo_patients = {}, {}, []
        for index, (role, (username, name)) in enumerate(PEOPLE.items(), 1):
            user = CustomUser.objects.filter(username='qa_' + role).first()
            user = user or CustomUser.objects.filter(username=username).first()
            if user and CustomUser.objects.filter(username=username).exclude(pk=user.pk).exists():
                raise CommandError('A demo username is already in use; nothing was changed.')
            if user and user.username != 'qa_' + role and user.full_name != name:
                raise CommandError('A demo username is already used by another identity; nothing was changed.')
            created = user is None
            user = user or CustomUser(role='patient' if role == 'outsider' else role,
                                      contact_number=f'90000000{index:02}')
            replacements[user.full_name] = name
            user.username, user.full_name, user.email = username, name, username + '@example.com'
            if created:
                user.set_password(options['password']) if options.get('password') else user.set_unusable_password()
            user.save()
            users[role] = user
        for role in ('patient', 'outsider'):
            person, _ = Patient.objects.get_or_create(user=users[role], defaults={
                'date_of_birth': date(1990, 1, 1), 'gender': 'Female', 'city': 'Ahmedabad', 'pincode': '380001'})
            person.full_name = users[role].full_name
            if not person.address or 'QA' in person.address or 'Fictional' in person.address:
                person.address = '12, Shantivan Society, Satellite' if role == 'patient' else '8, River View Society, Adajan'
            person.save()
            person.associated_hospitals.add(hospitals[role == 'outsider'])
            demo_patients.append(person.pk)
        for model, role, extra in (
            (Doctor, 'doctor', {'gender': 'Female', 'registration_number': None}),
            (Nurse, 'nurse', {'gender': 'Female'}),
            (Receptionist, 'receptionist', {'gender': 'Female', 'dob': date(1990, 1, 1), 'address': 'Satellite, Ahmedabad'}),
            (CareCoordinator, 'care_coordinator', {}),
        ):
            profile, _ = model.objects.get_or_create(user=users[role], defaults={'hospital': hospitals[0], 'full_name': users[role].full_name, **extra})
            profile.full_name = users[role].full_name
            if role == 'doctor' and (profile.registration_number or '').startswith('QA-'):
                profile.registration_number = None
            if role == 'receptionist' and ('QA' in profile.address or 'Fictional' in profile.address):
                profile.address = 'Satellite, Ahmedabad'
            profile.save()
            if role == 'doctor':
                profile.specialization.add(specialty)
        names = [('Mihir Joshi', 'mihir.joshi'), ('Dhruvi Shah', 'dhruvi.shah'), ('Aarav Desai', 'aarav.desai'),
                 ('Hetal Patel', 'hetal.patel'), ('Dev Mehta', 'dev.mehta'), ('Jinal Shah', 'jinal.shah'),
                 ('Rohan Trivedi', 'rohan.trivedi'), ('Aditi Joshi', 'aditi.joshi')]
        extras = CustomUser.objects.filter(Q(username__startswith='qa_sync_') | Q(full_name__startswith='QA Browser')).order_by('pk')
        for index, user in enumerate(extras):
            name, username = names[index % len(names)]
            if index >= len(names):
                username += '.' + str(user.pk)
            replacements[user.full_name] = name
            user.full_name, user.username, user.email = name, username + '.' + str(user.pk), username + '.' + str(user.pk) + '@example.com'
            user.save(update_fields=['full_name', 'username', 'email'])
            Patient.objects.filter(user=user).update(full_name=name, address='24, Shantivan Society, Ahmedabad')
            demo_patients.extend(Patient.objects.filter(user=user).values_list('pk', flat=True))
        for name, prefix in names:
            for user in CustomUser.objects.filter(username__startswith=prefix + '.', full_name=name):
                if user.username in (prefix + '.' + str(user.pk), prefix + '.' + str(user.pk) + '.' + str(user.pk)):
                    demo_patients.extend(Patient.objects.filter(user=user).values_list('pk', flat=True))
                    replacements[name] = name
        # Only known synthetic patients are eligible for display-text cleanup.
        queries = [(Appointment, Q(patient_id__in=demo_patients)), (PatientDocument, Q(patient_id__in=demo_patients)),
                   (VitalSign, Q(patient_id__in=demo_patients)), (WellnessLog, Q(patient_id__in=demo_patients)),
                   (Medication, Q(patient_id__in=demo_patients)), (MedicalRecord, Q(patient_id__in=demo_patients)),
                   (AppointmentPrescription, Q(appointment__patient_id__in=demo_patients)),
                   (Notification, Q(patient_id__in=demo_patients))]
        labels = {'symptoms': 'Routine follow-up consultation', 'notes': 'Follow-up recorded during the clinic visit.',
                  'summary': 'Follow-up consultation completed.', 'diagnosis': 'Follow-up review',
                  'title': 'Blood test report', 'description': 'Laboratory report for the follow-up visit.',
                  'name': 'Prescribed medication', 'medications': 'No medication prescribed at this visit.',
                  'advice': 'Follow the care plan discussed during your visit.', 'message': 'Your appointment details have been updated.'}
        for model, query in queries:
            for obj in model.objects.filter(query):
                changes = {}
                for field in model._meta.fields:
                    if not isinstance(field, (CharField, TextField)) or field.name in ('file', 'report_file'):
                        continue
                    value = getattr(obj, field.name)
                    if not value:
                        continue
                    updated = value
                    for before, after in replacements.items():
                        if before:
                            updated = updated.replace(before, after)
                    if value.startswith(('QA ', 'Fictional ', 'Example ')) or (field.name in labels and value in replacements.values()):
                        updated = labels.get(field.name, updated)
                    if updated != value:
                        changes[field.name] = updated
                if changes:
                    model.objects.filter(pk=obj.pk).update(**changes)
        self.stdout.write(self.style.SUCCESS('Demo names refreshed. Existing passwords and personal accounts were preserved.'))
