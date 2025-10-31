# Generated manually on 2025-10-28

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor', '0003_appointmentprescription'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor',
            name='dob',
            field=models.DateField(blank=True, help_text='Date of Birth', null=True),
        ),
        migrations.AddField(
            model_name='doctor',
            name='registration_number',
            field=models.CharField(blank=True, help_text='Official doctor license/medical registration ID', max_length=50, null=True, unique=True),
        ),
        migrations.AddField(
            model_name='doctor',
            name='experience',
            field=models.PositiveIntegerField(default=0, help_text='Years of experience'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='qualification',
            field=models.CharField(blank=True, help_text='e.g., MBBS, MD, MS, etc.', max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='doctor',
            name='address',
            field=models.TextField(blank=True, help_text='Full address', null=True),
        ),
        migrations.AddField(
            model_name='doctor',
            name='profile_picture',
            field=models.ImageField(blank=True, help_text='Upload doctor photo', null=True, upload_to='doctor_photos/'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='is_active',
            field=models.BooleanField(default=True, help_text='Enable/disable doctor access'),
        ),
        migrations.AddField(
            model_name='doctor',
            name='rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
        migrations.AddField(
            model_name='doctor',
            name='accepts_insurance',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='doctor',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='doctor',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True, blank=True),
        ),
        migrations.RemoveField(
            model_name='doctor',
            name='contact_number',
        ),
    ]
