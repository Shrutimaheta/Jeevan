from django.contrib.auth import get_user_model
from care.models import Hospital, Specialization
from doctor.models import Doctor
from patient.models import Patient
from receptionist.models import Receptionist

User = get_user_model()

class JeevanTestClientMixin:
    """Helper mixin to easily create and authenticate users with roles."""

    def create_hospital(self, name="Test Hospital", registration_number="HOSP123", **kwargs):
        defaults = {
            "name": name,
            "location": "Test Location",
            "email": "hosp@test.com",
            "contact_no": "1234567890",
            "registration_number": registration_number,
        }
        defaults.update(kwargs)
        return Hospital.objects.create(**defaults)

    def create_user(self, username, password="password123", role="patient", **kwargs):
        defaults = {
            "email": f"{username}@test.com",
            "full_name": username.capitalize(),
            "role": role,
            "contact_number": kwargs.pop("contact_number", None),
        }
        defaults.update(kwargs)
        user = User.objects.create_user(username=username, password=password, **defaults)
        return user

    def create_patient_profile(self, user, **kwargs):
        defaults = {
            "full_name": user.full_name,
            "gender": "Male",
            "date_of_birth": "1990-01-01",
            "address": "123 Test Street",
            "city": "Test City",
            "pincode": "123456",
        }
        defaults.update(kwargs)
        return Patient.objects.create(user=user, **defaults)

    def create_doctor_profile(self, user, hospital, **kwargs):
        defaults = {
            "full_name": user.full_name,
            "gender": "Male",
            "registration_number": kwargs.pop("registration_number", "DOC123"),
            "experience": 5,
        }
        defaults.update(kwargs)
        doc = Doctor.objects.create(user=user, hospital=hospital, **defaults)
        return doc

    def create_receptionist_profile(self, user, hospital, **kwargs):
        defaults = {
            "full_name": user.full_name,
            "gender": "Male",
            "dob": "1990-01-01",
            "address": "Test Address Street",
        }
        defaults.update(kwargs)
        return Receptionist.objects.create(user=user, hospital=hospital, **defaults)

    def login_user(self, client, username, password="password123"):
        login_successful = client.login(username=username, password=password)
        self.assertTrue(login_successful, f"Failed to log in user {username}")
