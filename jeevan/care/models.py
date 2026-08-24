from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.contrib.auth.models import AbstractUser


phone_validator = RegexValidator(regex=r'^\d{10}$', message='Phone number must be exactly 10 digits.')


ROLE_CHOICES = [
    ('admin', 'Admin'),
    ('doctor', 'Doctor'),
    ('nurse', 'Nurse'),
    ('receptionist', 'Receptionist'),
    ('patient', 'Patient'),
    ('care_coordinator', 'Care Coordinator'),
]


class CustomUser(AbstractUser):
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')
    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True, null=True, blank=True, db_index=True)
    contact_number = models.CharField(max_length=15, unique=True, null=True, blank=True, validators=[phone_validator], db_index=True)

    def __str__(self):
        return self.username


class CareCoordinator(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'care_coordinator'}
    )
    hospital = models.ForeignKey('care.Hospital', on_delete=models.CASCADE, related_name='coordinators')
    full_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.full_name


class Specialization(models.Model):
    # Canonical field name used across the project
    sname = models.CharField(max_length=100, unique=True, db_column='Sname')
    description = models.TextField(blank=True, null=True)
    icon = models.ImageField(upload_to='specialization_icons/', blank=True, null=True)
    icon_data = models.BinaryField(blank=True, null=True, help_text="Binary image data stored in database")
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.sname


class Hospital(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=255)
    email = models.EmailField()
    contact_no = models.CharField(max_length=15)
    registration_number = models.CharField(max_length=50, unique=True)
    logo = models.ImageField(upload_to='hospital_logos/', blank=True, null=True)
    specialization = models.ManyToManyField(Specialization)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])
    accepts_insurance = models.BooleanField(default=False)

    def __str__(self):
        return self.name

 