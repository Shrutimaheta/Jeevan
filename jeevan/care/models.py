from django.db import models
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User,AbstractUser
from django.conf import settings

ROLE_CHOICES = [
    ('admin', 'Admin'),
    ('doctor', 'Doctor'),
    ('nurse', 'Nurse'),
    ('receptionist', 'Receptionist'),
    ('patient', 'Patient'),
]

class CustomUser(AbstractUser):
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')
    full_name = models.CharField(max_length=150)

    def __str__(self):
        return self.full_name
    
class Specialization(models.Model):
    Sname = models.CharField(max_length=100)

    def __str__(self):
        return self.Sname

class Hospital(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=255)
    email = models.EmailField()
    contact_no = models.CharField(max_length=15)
    registration_number = models.CharField(max_length=50)
    logo = models.ImageField(upload_to='hospital_logos/', blank=True, null=True)
    specialization = models.ManyToManyField(Specialization)

    def __str__(self):
        return self.name

class Patient(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    BLOOD_GROUP_CHOICES = [
        ('A+', 'A+'), ('A-', 'A-'),
        ('B+', 'B+'), ('B-', 'B-'),
        ('AB+', 'AB+'), ('AB-', 'AB-'),
        ('O+', 'O+'), ('O-', 'O-'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'patient'}
    )
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    dob = models.DateField()
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    abha_id = models.CharField(max_length=20, unique=True, blank=True, null=True)
    emergency_number = models.CharField(max_length=15, blank=True, null=True)
    blood_group = models.CharField(max_length=5, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    existing_condition = models.TextField(blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    # password = models.CharField(max_length=128)

    def __str__(self):
        return self.full_name
    
# class Doctor(models.Model):
#     GENDER_CHOICES = [
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ]

    # STAFF_CHOICES = [
    #     ('Doctor', 'Doctor'),
    #     ('Nurse', 'Nurse'),
    #     ('Receptionist', 'Receptionist'),
    # ]

    # id = models.AutoField(primary_key=True)
    # user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'doctor'})
    # hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    # full_name = models.CharField(max_length=255)
    # contact_number = models.CharField(max_length=15)
    # gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    #staff=models.CharField(max_length=15,choices=STAFF_CHOICES,default='Doctor')
    # specialization =models.CharField(max_length=50,choices=SPECIALIZATION_CHOICES,default='General Physician')
    # specialization = models.ManyToManyField(Specialization)
    # password = models.CharField(max_length=128)  # Should be hashed before saving

    # Note: confirm_password is used during form validation, not stored in DB
    # def __str__(self):
    #     return f"{self.full_name} ({self.specialization})"

# class Edit_Doctor(models.Model):
#     GENDER_CHOICES = [
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ]

#     SPECIALIZATION_CHOICES = [
#     ('General Physician', 'General Physician'),
#     ('Cardiologist', 'Cardiologist'),
#     ('Dermatologist', 'Dermatologist'),
#     ('Orthopedic Surgeon', 'Orthopedic Surgeon'),
#     ('Neurologist', 'Neurologist'),
#     ('Psychiatrist', 'Psychiatrist'),
#     ('Pediatrician', 'Pediatrician'),
#     ('Gynecologist', 'Gynecologist'),
#     ('ENT Specialist', 'ENT Specialist'),
#     ('Urologist', 'Urologist'),
#     ('Oncologist', 'Oncologist'),
#     ('Radiologist', 'Radiologist'),
#     ('Nephrologist', 'Nephrologist'),
#     ('Gastroenterologist', 'Gastroenterologist'),
#     ('Endocrinologist', 'Endocrinologist'),
#     ('Pulmonologist', 'Pulmonologist'),
#     ('Ophthalmologist', 'Ophthalmologist'),
#     ('Dentist', 'Dentist'),
#     ('Anesthesiologist', 'Anesthesiologist'),
#     ('Rheumatologist', 'Rheumatologist'),
#     ('Plastic Surgeon', 'Plastic Surgeon'),
#     ('Pathologist', 'Pathologist'),
#     ('Allergist/Immunologist', 'Allergist/Immunologist'),
#     ('Hematologist', 'Hematologist'),
#     ('Infectious Disease Specialist', 'Infectious Disease Specialist'),
# ]


    # id = models.AutoField(primary_key=True)
    # hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    # full_name = models.CharField(max_length=255)
    # email = models.EmailField(unique=True)
    # contact_number = models.CharField(max_length=15)
    # gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    # dob = models.DateField()
    # specialization =models.CharField(max_length=50,choices=SPECIALIZATION_CHOICES,default='General Physician')
    # registration_number = models.CharField(max_length=100, unique=True)
    # experience = models.PositiveIntegerField(validators=[MinValueValidator(0)])
    # qualification = models.CharField(max_length=255)
    # address = models.TextField(blank=True, null=True)
    # profile_picture = models.ImageField(upload_to='doctor_profiles/', blank=True, null=True)
    # password = models.CharField(max_length=128) 

    # def __str__(self):
    #     return f"{self.full_name} ({self.specialization})"

# class Nurse(models.Model):
#     id = models.AutoField(primary_key=True)
#     hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='nurses')
#     user = models.ForeignKey (CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'Nurses'})
#     full_name = models.CharField(max_length=255)
#     contact_number = models.CharField(max_length=15)
#     gender = models.CharField(max_length=10, choices=[
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ])
#     # staff=models.CharField(max_length=15,choices=[
#     #     ('Doctor', 'Doctor'),
#     #     ('Nurse', 'Nurse'),
#     #     ('Receptionist', 'Receptionist'),
#     # ],default='Doctor')
#     password = models.CharField(max_length=128) 
#     def _str_(self):
#         return self.full_name


# class Edit_Nurse(models.Model):
    #   id = models.AutoField(primary_key=True)
#     hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='nurses')
#     full_name = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     contact_number = models.CharField(max_length=15)
#     gender = models.CharField(max_length=10, choices=[
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ])
#     dob = models.DateField()
#     qualification = models.CharField(max_length=255, blank=True, null=True)
#     experience = models.PositiveIntegerField(blank=True, null=True)
#     department = models.CharField(max_length=100, blank=True, null=True)
#     address = models.TextField(blank=True, null=True)
#     profile_picture = models.ImageField(upload_to='nurse_profiles/', blank=True, null=True)
#     password = models.CharField(max_length=128)  
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

    # def _str_(self):
    #     return self.full_name


# class Receptionist(models.Model):
#     id = models.AutoField(primary_key=True)
#     hospital = models.ForeignKey('Hospital', on_delete=models.CASCADE, related_name='receptionists')
#     user = models.ForeignKey (CustomUser, on_delete=models.CASCADE, limit_choices_to={'role': 'receptionist'})
#     full_name = models.CharField(max_length=255)
#     contact_number = models.CharField(max_length=15)
#     gender = models.CharField(max_length=10, choices=[
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ])
#     # staff=models.CharField(max_length=15,choices=[
#     #     ('Doctor', 'Doctor'),
#     #     ('Nurse', 'Nurse'),
#     #     ('Receptionist', 'Receptionist'),
#     # ],default='Doctor')
#     password = models.CharField(max_length=128)
#     def _str_(self):
#         return self.full_name

# class Edit_Receptionist(models.Model):
    #   id = models.AutoField(primary_key=True)
#     hospital = models.ForeignKey('Hospital', on_delete=models.CASCADE, related_name='receptionists')
#     full_name = models.CharField(max_length=255)
#     email = models.EmailField(unique=True)
#     contact_number = models.CharField(max_length=15)
#     gender = models.CharField(max_length=10, choices=[
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ])
#     dob = models.DateField(blank=True, null=True)
#     address = models.TextField(blank=True, null=True)
#     qualification = models.CharField(max_length=255, blank=True, null=True)
#     experience = models.PositiveIntegerField(blank=True, null=True)
#     profile_picture = models.ImageField(upload_to='receptionist_profiles/', blank=True, null=True)
#     password = models.CharField(max_length=128) 
#     is_active = models.BooleanField(default=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)

#     def _str_(self):
#         return self.full_name

# Model is correct, no changes needed.


