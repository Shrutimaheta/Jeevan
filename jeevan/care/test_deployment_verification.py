from io import StringIO
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import Mock, patch
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.core.mail.backends.smtp import EmailBackend as SMTPEmailBackend
from django.core.management import call_command
from django.core.management.base import CommandError
from django.test import TestCase, override_settings


COMMAND = 'care.management.commands.verify_deployment'


class DeploymentVerificationCommandTests(TestCase):
    def setUp(self):
        self.directory = TemporaryDirectory(dir=settings.BASE_DIR)
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.private = FileSystemStorage(location=self.root / 'private')
        self.public = FileSystemStorage(location=self.root / 'public')
        self.storage_patch = patch(f'{COMMAND}.storages', {'private': self.private, 'default': self.public})
        self.storage_patch.start()
        self.addCleanup(self.storage_patch.stop)
        self.output = StringIO()

    def smtp(self):
        backend = Mock(spec=SMTPEmailBackend)
        backend.send_messages.return_value = 1
        return backend

    def test_default_checks_storage_and_removes_only_probe_without_email(self):
        with patch(f'{COMMAND}.get_connection') as email:
            call_command('verify_deployment', stdout=self.output)
        email.assert_not_called()
        self.assertIn('round trip passed', self.output.getvalue())
        self.assertEqual(list(self.root.rglob('*.bin')), [])

    def test_storage_read_failure_cleans_probe_and_hides_sensitive_error(self):
        with patch.object(self.private, 'open', side_effect=OSError('secret-private-path/password')):
            with self.assertRaises(CommandError) as error:
                call_command('verify_deployment', stdout=self.output)
        self.assertNotIn('secret-private-path', str(error.exception))
        self.assertEqual(list(self.root.rglob('*.bin')), [])

    def test_pending_migrations_block_startup_before_storage_or_email(self):
        with patch(f'{COMMAND}.MigrationExecutor') as executor, patch.object(self.private, 'save') as save, patch(f'{COMMAND}.get_connection') as email:
            executor.return_value.migration_plan.return_value = [('pending migration', False)]
            with self.assertRaisesMessage(CommandError, 'unapplied migrations'):
                call_command('verify_deployment', check_smtp=True, stdout=self.output)
        save.assert_not_called()
        email.assert_not_called()

    def test_database_outage_does_not_report_success_or_touch_storage(self):
        with patch(f'{COMMAND}.connection.cursor', side_effect=OSError('private-database-password')), patch.object(self.private, 'save') as save:
            with self.assertRaises(CommandError) as error:
                call_command('verify_deployment', stdout=self.output)
        save.assert_not_called()
        self.assertNotIn('private-database-password', str(error.exception))
        self.assertNotIn('round trip passed', self.output.getvalue())

    def test_effective_private_storage_under_public_directory_is_rejected(self):
        unsafe = FileSystemStorage(location=self.root / 'public' / 'private')
        with patch(f'{COMMAND}.storages', {'private': unsafe, 'default': self.public}):
            with self.assertRaises(CommandError):
                call_command('verify_deployment', stdout=self.output)
        self.assertFalse((self.root / 'public' / 'private').exists())

    def test_smtp_connection_check_does_not_send_a_message(self):
        backend = self.smtp()
        with patch(f'{COMMAND}.get_connection', return_value=backend):
            call_command('verify_deployment', check_smtp=True, stdout=self.output)
        backend.open.assert_called_once_with()
        backend.send_messages.assert_not_called()
        backend.close.assert_called_once_with()
        self.assertIn('No email was sent', self.output.getvalue())
        self.assertIn('delivery is not verified', self.output.getvalue())

    @override_settings(DEFAULT_FROM_EMAIL='Clinic <noreply@example.test>')
    def test_explicit_test_email_sends_once_and_does_not_claim_inbox_delivery(self):
        backend = self.smtp()
        with patch(f'{COMMAND}.get_connection', return_value=backend):
            call_command('verify_deployment', check_smtp=True, send_test_email='qa@example.test', stdout=self.output)
        backend.open.assert_called_once_with()
        backend.send_messages.assert_called_once()
        message = backend.send_messages.call_args.args[0][0]
        self.assertEqual(message.to, ['qa@example.test'])
        self.assertEqual(message.from_email, 'Clinic <noreply@example.test>')
        self.assertIn('no patient information', message.body)
        self.assertIn('accepted one test email', self.output.getvalue())
        self.assertIn('Inbox delivery is not verified', self.output.getvalue())
        backend.close.assert_called_once_with()

    def test_smtp_failure_closes_connection_without_exposing_provider_error(self):
        backend = self.smtp()
        backend.open.side_effect = OSError('smtp-user:secret-password@private-host')
        with patch(f'{COMMAND}.get_connection', return_value=backend):
            with self.assertRaises(CommandError) as error:
                call_command('verify_deployment', check_smtp=True, stdout=self.output)
        self.assertNotIn('secret-password', str(error.exception))
        self.assertNotIn('private-host', self.output.getvalue())
        backend.close.assert_called_once_with()

    def test_zero_accepted_messages_is_failure(self):
        backend = self.smtp()
        backend.send_messages.return_value = 0
        with patch(f'{COMMAND}.get_connection', return_value=backend):
            with self.assertRaises(CommandError):
                call_command('verify_deployment', send_test_email='qa@example.test', stdout=self.output)
        self.assertNotIn('accepted one test email', self.output.getvalue())

    def test_console_backend_cannot_be_reported_as_smtp_success(self):
        with override_settings(EMAIL_BACKEND='django.core.mail.backends.locmem.EmailBackend'):
            with self.assertRaises(CommandError):
                call_command('verify_deployment', check_smtp=True, stdout=self.output)
        self.assertNotIn('SMTP connection opened', self.output.getvalue())

    def test_invalid_or_empty_recipient_is_rejected_before_any_email_action(self):
        with patch(f'{COMMAND}.get_connection') as email:
            for value in ('', 'not-an-email', 'one@example.test,two@example.test'):
                with self.subTest(value=value), self.assertRaises(CommandError):
                    call_command('verify_deployment', send_test_email=value, stdout=self.output)
        email.assert_not_called()
