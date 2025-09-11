# from django.db import models
# from django.conf import settings  
# from care.models import Hospital, Specialization

# class Doctor(models.Model):
#     GENDER_CHOICES = [
#         ('Male', 'Male'),
#         ('Female', 'Female'),
#         ('Other', 'Other'),
#     ]

#     id = models.AutoField(primary_key=True)
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'doctor'})
#     hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
#     full_name = models.CharField(max_length=255)
#     contact_number = models.CharField(max_length=15)
#     gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
#     specialization = models.ManyToManyField(Specialization)
#     password = models.CharField(max_length=128)

#     def __str__(self):
#         return f"{self.full_name} ({self.hospital.name})"


from django.db import models
from django.conf import settings
from care.models import CustomUser, Hospital, Specialization

class Doctor(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={'role': 'doctor'}
    )
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    contact_number = models.CharField(max_length=15)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    specialization = models.ManyToManyField(Specialization)

    def __str__(self):
        return f"{self.full_name} ({self.hospital.name})"

# Model is correct, no changes needed.
