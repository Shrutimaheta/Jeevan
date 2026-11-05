from types import SimpleNamespace
from unittest.mock import patch
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import TestCase
from care.models import CustomUser, Hospital
from patient.models import Patient


class DemoIdentityTests(TestCase):
    def seed(self):
        config = SimpleNamespace(IS_PRODUCTION=False, DATABASES={'default': {'NAME': 'qa.sqlite3'}})
        with patch('care.management.commands.seed_demo.settings', config):
            call_command('seed_demo')

    def test_names_refresh_without_resetting_password_or_touching_personal_account(self):
        user = CustomUser.objects.create_user(username='qa_patient', email='old@example.com', password='OriginalPassword!47', full_name='QA Patient Example')
        profile = Patient.objects.create(user=user, full_name=user.full_name, date_of_birth='1990-01-01', gender='Female')
        personal = CustomUser.objects.create_user(username='personal_user', email='personal@example.com', full_name='Personal Name', password='PersonalPassword!47')
        original_hash = user.password
        self.seed()
        count = CustomUser.objects.count()
        self.seed()
        user.refresh_from_db(); profile.refresh_from_db(); personal.refresh_from_db()
        self.assertEqual(user.username, 'ananya.patel')
        self.assertEqual(profile.full_name, 'Ananya Patel')
        self.assertEqual(user.password, original_hash)
        self.assertEqual(personal.full_name, 'Personal Name')
        self.assertEqual(CustomUser.objects.count(), count)
        self.assertFalse(CustomUser.objects.filter(full_name__startswith='QA ').exists())
        self.assertFalse(Hospital.objects.filter(name__startswith='QA ').exists())

    def test_real_database_is_rejected(self):
        config = SimpleNamespace(IS_PRODUCTION=True, DATABASES={'default': {'NAME': 'clinic'}})
        with patch('care.management.commands.seed_demo.settings', config), self.assertRaises(CommandError):
            call_command('seed_demo')
        self.assertFalse(CustomUser.objects.exists())
