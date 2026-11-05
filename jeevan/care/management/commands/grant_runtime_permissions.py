import os
from django.core.management.base import BaseCommand, CommandError
from django.db import connection, transaction


class Command(BaseCommand):
    help = 'Grant the production web role data access without migration or audit-edit rights.'

    def handle(self, *args, **options):
        role = os.environ.get('JEEVAN_RUNTIME_DB_USER', '').strip()
        if not role or role == connection.settings_dict.get('USER'):
            raise CommandError('Set a distinct JEEVAN_RUNTIME_DB_USER and run as the migration owner.')
        if connection.vendor != 'postgresql':
            raise CommandError('Runtime role provisioning requires PostgreSQL.')
        quote = connection.ops.quote_name
        with transaction.atomic(), connection.cursor() as cursor:
            cursor.execute('SELECT rolsuper, rolcreatedb, rolcreaterole, '
                           'pg_has_role(rolname, current_user, \'MEMBER\'), '
                           'has_schema_privilege(rolname, \'public\', \'CREATE\') '
                           'FROM pg_roles WHERE rolname = %s', [role])
            privileges = cursor.fetchone()
            if privileges is None or any(privileges):
                raise CommandError('The web role must exist without superuser, database or role creation privileges.')
            cursor.execute(f'GRANT CONNECT ON DATABASE {quote(connection.settings_dict["NAME"])} TO {quote(role)}')
            cursor.execute(f'GRANT USAGE ON SCHEMA public TO {quote(role)}')
            cursor.execute(f'GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO {quote(role)}')
            cursor.execute(f'GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO {quote(role)}')
            cursor.execute(f'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO {quote(role)}')
            cursor.execute(f'ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO {quote(role)}')
            cursor.execute(f'REVOKE UPDATE, DELETE, TRUNCATE ON care_auditevent FROM {quote(role)}')
        self.stdout.write(self.style.SUCCESS('Runtime data access granted; audit editing remains denied.'))
