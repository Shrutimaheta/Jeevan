from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from care.models import Hospital, Specialization, CustomUser
from doctor.models import Doctor
from django.db import transaction

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate sample hospitals, doctors, and specializations'

    def handle(self, *args, **options):
        with transaction.atomic():
            # Create specializations
            specializations_data = [
                {'sname': 'Cardiology', 'description': 'Heart and cardiovascular system'},
                {'sname': 'Neurology', 'description': 'Brain and nervous system'},
                {'sname': 'Orthopedics', 'description': 'Bones and joints'},
                {'sname': 'Pediatrics', 'description': 'Children\'s health'},
                {'sname': 'Dermatology', 'description': 'Skin conditions'},
                {'sname': 'Gynecology', 'description': 'Women\'s health'},
                {'sname': 'General Medicine', 'description': 'General health care'},
                {'sname': 'Emergency Medicine', 'description': 'Emergency care'},
            ]
            
            specializations = []
            for spec_data in specializations_data:
                spec, created = Specialization.objects.get_or_create(
                    sname=spec_data['sname'],
                    defaults={'description': spec_data['description']}
                )
                specializations.append(spec)
                if created:
                    self.stdout.write(f'Created specialization: {spec.sname}')
            
            # Create hospitals
            hospitals_data = [
                {
                    'name': 'City General Hospital',
                    'location': 'Downtown Medical District, Mumbai',
                    'email': 'info@citygeneral.com',
                    'contact_no': '+91-22-1234-5678',
                    'registration_number': 'MH-HOSP-001',
                    'rating': 4.5,
                    'accepts_insurance': True,
                    'specializations': ['Cardiology', 'Neurology', 'General Medicine', 'Emergency Medicine']
                },
                {
                    'name': 'Metro Medical Center',
                    'location': 'Central Business District, Delhi',
                    'email': 'contact@metromedical.com',
                    'contact_no': '+91-11-9876-5432',
                    'registration_number': 'DL-HOSP-002',
                    'rating': 4.2,
                    'accepts_insurance': True,
                    'specializations': ['Orthopedics', 'Pediatrics', 'Dermatology', 'General Medicine']
                },
                {
                    'name': 'Sunrise Healthcare',
                    'location': 'Tech Park Area, Bangalore',
                    'email': 'admin@sunrisehealth.com',
                    'contact_no': '+91-80-5555-1234',
                    'registration_number': 'KA-HOSP-003',
                    'rating': 4.8,
                    'accepts_insurance': True,
                    'specializations': ['Gynecology', 'Cardiology', 'Neurology', 'Emergency Medicine']
                },
                {
                    'name': 'Green Valley Hospital',
                    'location': 'Suburban Area, Chennai',
                    'email': 'info@greenvalley.com',
                    'contact_no': '+91-44-7777-8888',
                    'registration_number': 'TN-HOSP-004',
                    'rating': 4.0,
                    'accepts_insurance': False,
                    'specializations': ['General Medicine', 'Pediatrics', 'Dermatology']
                }
            ]
            
            hospitals = []
            for hosp_data in hospitals_data:
                hospital, created = Hospital.objects.get_or_create(
                    name=hosp_data['name'],
                    defaults={
                        'location': hosp_data['location'],
                        'email': hosp_data['email'],
                        'contact_no': hosp_data['contact_no'],
                        'registration_number': hosp_data['registration_number'],
                        'rating': hosp_data['rating'],
                        'accepts_insurance': hosp_data['accepts_insurance'],
                    }
                )
                
                # Add specializations
                for spec_name in hosp_data['specializations']:
                    spec = Specialization.objects.get(sname=spec_name)
                    hospital.specialization.add(spec)
                
                hospitals.append(hospital)
                if created:
                    self.stdout.write(f'Created hospital: {hospital.name}')
            
            # Create doctor users and doctors
            doctors_data = [
                {
                    'username': 'dr_sharma',
                    'full_name': 'Dr. Rajesh Sharma',
                    'email': 'rajesh.sharma@citygeneral.com',
                    'contact_number': '+91-98765-43210',
                    'hospital': 'City General Hospital',
                    'specializations': ['Cardiology'],
                    'experience': 15,
                    'qualification': 'MD Cardiology',
                    'rating': 4.7,
                    'accepts_insurance': True,
                },
                {
                    'username': 'dr_patel',
                    'full_name': 'Dr. Priya Patel',
                    'email': 'priya.patel@metromedical.com',
                    'contact_number': '+91-98765-43211',
                    'hospital': 'Metro Medical Center',
                    'specializations': ['Pediatrics'],
                    'experience': 12,
                    'qualification': 'MD Pediatrics',
                    'rating': 4.5,
                    'accepts_insurance': True,
                },
                {
                    'username': 'dr_kumar',
                    'full_name': 'Dr. Amit Kumar',
                    'email': 'amit.kumar@sunrisehealth.com',
                    'contact_number': '+91-98765-43212',
                    'hospital': 'Sunrise Healthcare',
                    'specializations': ['Neurology'],
                    'experience': 18,
                    'qualification': 'MD Neurology',
                    'rating': 4.9,
                    'accepts_insurance': True,
                },
                {
                    'username': 'dr_singh',
                    'full_name': 'Dr. Neha Singh',
                    'email': 'neha.singh@greenvalley.com',
                    'contact_number': '+91-98765-43213',
                    'hospital': 'Green Valley Hospital',
                    'specializations': ['General Medicine'],
                    'experience': 10,
                    'qualification': 'MBBS, MD',
                    'rating': 4.3,
                    'accepts_insurance': False,
                },
                {
                    'username': 'dr_gupta',
                    'full_name': 'Dr. Vikram Gupta',
                    'email': 'vikram.gupta@citygeneral.com',
                    'contact_number': '+91-98765-43214',
                    'hospital': 'City General Hospital',
                    'specializations': ['Orthopedics'],
                    'experience': 20,
                    'qualification': 'MS Orthopedics',
                    'rating': 4.6,
                    'accepts_insurance': True,
                },
                {
                    'username': 'dr_reddy',
                    'full_name': 'Dr. Sunita Reddy',
                    'email': 'sunita.reddy@metromedical.com',
                    'contact_number': '+91-98765-43215',
                    'hospital': 'Metro Medical Center',
                    'specializations': ['Dermatology'],
                    'experience': 14,
                    'qualification': 'MD Dermatology',
                    'rating': 4.4,
                    'accepts_insurance': True,
                },
                {
                    'username': 'dr_verma',
                    'full_name': 'Dr. Anil Verma',
                    'email': 'anil.verma@sunrisehealth.com',
                    'contact_number': '+91-98765-43216',
                    'hospital': 'Sunrise Healthcare',
                    'specializations': ['Gynecology'],
                    'experience': 16,
                    'qualification': 'MD Gynecology',
                    'rating': 4.8,
                    'accepts_insurance': True,
                },
                {
                    'username': 'dr_joshi',
                    'full_name': 'Dr. Meera Joshi',
                    'email': 'meera.joshi@greenvalley.com',
                    'contact_number': '+91-98765-43217',
                    'hospital': 'Green Valley Hospital',
                    'specializations': ['Emergency Medicine'],
                    'experience': 8,
                    'qualification': 'MD Emergency Medicine',
                    'rating': 4.2,
                    'accepts_insurance': False,
                }
            ]
            
            for doc_data in doctors_data:
                # Create user
                user, created = CustomUser.objects.get_or_create(
                    username=doc_data['username'],
                    defaults={
                        'full_name': doc_data['full_name'],
                        'email': doc_data['email'],
                        'contact_number': doc_data['contact_number'],
                        'role': 'doctor',
                        'is_active': True,
                    }
                )
                
                if created:
                    user.set_password('doctor123')  # Default password
                    user.save()
                
                # Create doctor profile
                hospital = Hospital.objects.get(name=doc_data['hospital'])
                doctor, created = Doctor.objects.get_or_create(
                    user=user,
                    defaults={
                        'hospital': hospital,
                        'full_name': doc_data['full_name'],
                        'gender': 'Male' if 'Rajesh' in doc_data['full_name'] or 'Amit' in doc_data['full_name'] or 'Vikram' in doc_data['full_name'] or 'Anil' in doc_data['full_name'] else 'Female',
                        'experience': doc_data['experience'],
                        'qualification': doc_data['qualification'],
                        'rating': doc_data['rating'],
                        'accepts_insurance': doc_data['accepts_insurance'],
                    }
                )
                
                # Add specializations
                for spec_name in doc_data['specializations']:
                    spec = Specialization.objects.get(sname=spec_name)
                    doctor.specialization.add(spec)
                
                if created:
                    self.stdout.write(f'Created doctor: {doctor.full_name}')
            
            self.stdout.write(
                self.style.SUCCESS('Successfully populated sample data!')
            )
            self.stdout.write(f'Created {len(specializations)} specializations')
            self.stdout.write(f'Created {len(hospitals)} hospitals')
            self.stdout.write(f'Created {len(doctors_data)} doctors')
