import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jeevan.settings')
django.setup()

from django.db import connection

cursor = connection.cursor()
cursor.execute('PRAGMA table_info(care_specialization)')
columns = cursor.fetchall()

print('Current columns in care_specialization table:')
for col in columns:
    print(f'{col[1]} - {col[2]}')
