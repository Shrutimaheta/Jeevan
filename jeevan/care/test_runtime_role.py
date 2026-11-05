import os
import uuid
from unittest import skipUnless
from unittest.mock import patch
from django.core.management import call_command
from django.core.management.base import CommandError
from django.db import connection
from django.test import SimpleTestCase, TransactionTestCase, override_settings


class RuntimeRoleConfigurationTests(SimpleTestCase):
    def test_missing_or_same_role_is_rejected(self):
        for role in ('', connection.settings_dict.get('USER', '')):
            with patch.dict(os.environ, {'JEEVAN_RUNTIME_DB_USER': role}):
                with self.assertRaises(CommandError):
                    call_command('grant_runtime_permissions')


@skipUnless(connection.vendor == 'postgresql', 'Runtime privileges require PostgreSQL.')
class RuntimeRolePermissionTests(TransactionTestCase):
    def test_runtime_can_use_data_but_cannot_edit_audit_or_create_schema_objects(self):
        role = 'qa_runtime_' + uuid.uuid4().hex[:12]
        quoted = connection.ops.quote_name(role)
        with connection.cursor() as cursor:
            cursor.execute(f'CREATE ROLE {quoted} NOLOGIN NOSUPERUSER NOCREATEDB NOCREATEROLE')
        try:
            with patch.dict(os.environ, {'JEEVAN_RUNTIME_DB_USER': role}):
                call_command('grant_runtime_permissions')
            with connection.cursor() as cursor:
                for table, privilege, expected in (
                    ('care_customuser', 'SELECT', True),
                    ('appointments_appointment', 'INSERT', True),
                    ('care_auditevent', 'INSERT', True),
                    ('care_auditevent', 'UPDATE', False),
                    ('care_auditevent', 'DELETE', False),
                    ('care_auditevent', 'TRUNCATE', False),
                ):
                    cursor.execute('SELECT has_table_privilege(%s, %s, %s)', [role, table, privilege])
                    self.assertEqual(cursor.fetchone()[0], expected, (table, privilege))
                cursor.execute('SELECT has_schema_privilege(%s, \'public\', \'CREATE\')', [role])
                self.assertFalse(cursor.fetchone()[0])
                cursor.execute(f'SET ROLE {quoted}')
                try:
                    with override_settings(RENDER_PROFILE='production'):
                        call_command('verify_deployment')
                finally:
                    cursor.execute('RESET ROLE')
        finally:
            with connection.cursor() as cursor:
                cursor.execute(f'DROP OWNED BY {quoted}')
                cursor.execute(f'DROP ROLE {quoted}')
