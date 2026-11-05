import secrets
from pathlib import Path
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.files.base import ContentFile
from django.core.files.storage import FileSystemStorage, storages
from django.core.mail import EmailMessage, get_connection
from django.core.mail.backends.smtp import EmailBackend as SMTPEmailBackend
from django.core.management.base import BaseCommand, CommandError
from django.core.validators import validate_email
from django.db import connection
from django.db.migrations.executor import MigrationExecutor


class Command(BaseCommand):
    help = 'Verify database connectivity, applied migrations and a private-storage write/read/delete round trip.'

    def add_arguments(self, parser):
        parser.add_argument('--check-smtp', action='store_true',
                            help='Open the configured SMTP connection without sending email.')
        parser.add_argument('--send-test-email', metavar='RECIPIENT',
                            help='Explicitly send one verification email to this address using configured SMTP.')

    def handle(self, *args, **options):
        recipient = options.get('send_test_email')
        if recipient is not None:
            try:
                validate_email(recipient)
            except ValidationError:
                raise CommandError('Provide one valid recipient email address.') from None
        try:
            with connection.cursor() as cursor:
                cursor.execute('SELECT 1')
                if cursor.fetchone()[0] != 1:
                    raise ValueError('Database check failed.')
            executor = MigrationExecutor(connection)
            if executor.migration_plan(executor.loader.graph.leaf_nodes()):
                raise ValueError('Unapplied migrations exist.')
            if getattr(settings, 'RENDER_PROFILE', '') == 'production':
                self.check_runtime_role()
            storage = storages['private']
            self.check_storage_separation(storage)
            content = secrets.token_bytes(32)
            name = storage.save(f'_readiness/{secrets.token_hex(16)}.bin', ContentFile(content))
            try:
                with storage.open(name, 'rb') as stream:
                    if stream.read() != content:
                        raise ValueError('Storage round trip failed.')
            finally:
                storage.delete(name)
            if storage.exists(name):
                raise ValueError('The private-storage probe was not removed.')
        except Exception:
            raise CommandError('Deployment verification failed; check database connectivity, unapplied migrations, runtime permissions and private-storage configuration.') from None
        self.stdout.write(self.style.SUCCESS('Database and private-storage round trip passed. Verify backups and provider settings separately.'))
        if options.get('check_smtp') or recipient:
            self.check_smtp(recipient)

    def check_runtime_role(self):
        if connection.vendor != 'postgresql':
            raise ValueError('Render production requires PostgreSQL.')
        with connection.cursor() as cursor:
            cursor.execute('SELECT rolsuper, rolcreatedb, rolcreaterole, '
                           "has_schema_privilege(current_user, 'public', 'CREATE'), "
                           "has_table_privilege(current_user, 'care_auditevent', 'UPDATE'), "
                           "has_table_privilege(current_user, 'care_auditevent', 'DELETE'), "
                           "has_table_privilege(current_user, 'care_auditevent', 'TRUNCATE'), "
                           "pg_has_role(current_user, (SELECT relowner FROM pg_class "
                           "WHERE oid = 'care_auditevent'::regclass), 'MEMBER') "
                           'FROM pg_roles WHERE rolname = current_user')
            privileges = cursor.fetchone()
            if privileges is None or any(privileges):
                raise ValueError('Use a restricted runtime database role, not the migration owner.')

    def check_storage_separation(self, private_storage):
        """Check the effective storage instance, not only the environment paths."""
        if not isinstance(private_storage, FileSystemStorage):
            return
        private_root = Path(private_storage.location).resolve()
        public_storage = storages['default']
        public_roots = [Path(settings.MEDIA_ROOT), Path(settings.STATIC_ROOT), Path(settings.BASE_DIR) / 'static']
        if isinstance(public_storage, FileSystemStorage):
            public_roots.append(Path(public_storage.location))
        for root in public_roots:
            if private_root.is_relative_to(root.resolve()):
                raise ValueError('Private storage overlaps a public directory.')

    def check_smtp(self, recipient):
        backend = None
        try:
            backend = get_connection(fail_silently=False)
            if not isinstance(backend, SMTPEmailBackend):
                raise ValueError('SMTP backend required.')
            backend.open()
            if recipient:
                message = EmailMessage(
                    subject='Jeevan deployment verification',
                    body='This test was explicitly requested by your deployment administrator. '
                         'It contains no patient information. Confirm receipt with your administrator.',
                    from_email=settings.DEFAULT_FROM_EMAIL, to=[recipient], connection=backend,
                )
                if message.send(fail_silently=False) != 1:
                    raise ValueError('SMTP did not accept the test email.')
        except Exception:
            raise CommandError('SMTP verification failed; check the configured backend, connection, credentials and sender.') from None
        finally:
            if backend is not None:
                try:
                    backend.close()
                except Exception:
                    pass
        if recipient:
            self.stdout.write(self.style.SUCCESS('The SMTP server accepted one test email. Inbox delivery is not verified; confirm receipt with the recipient.'))
        else:
            self.stdout.write(self.style.SUCCESS('The configured SMTP connection opened successfully. No email was sent; delivery is not verified.'))
