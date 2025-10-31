from django.db import models
from django.conf import settings
import uuid
from datetime import timedelta
from django.utils import timezone


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

    # Primary Key
    id = models.AutoField(primary_key=True)
    
    # User relationship
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'patient'}, related_name='patient_profile')
    
    # Personal Information
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, blank=True, null=True)
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    dob = models.DateField(blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    password = models.CharField(max_length=128, default='')  # Password field added
    profile_photo = models.ImageField(upload_to='patient_photos/', blank=True, null=True, help_text='Upload your profile photo')

    # Address Information
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)

    # Health Information
    emergency_number = models.CharField(max_length=15, blank=True, null=True)
    blood_group = models.CharField(max_length=5, choices=BLOOD_GROUP_CHOICES, blank=True, null=True)
    existing_condition = models.TextField(blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} ({self.email})"


class PatientDocument(models.Model):
    DOCUMENT_TYPES = [
        ('report', 'Medical Report'),
        ('prescription', 'Prescription'),
        ('lab_result', 'Lab Result'),
        ('scan', 'Scan/Imaging'),
        ('insurance', 'Insurance Document'),
        ('id_proof', 'ID Proof'),
        ('other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='documents')
    title = models.CharField(max_length=255, help_text='Document title or description')
    document_type = models.CharField(max_length=20, choices=DOCUMENT_TYPES, default='other')
    file = models.FileField(upload_to='patient_documents/%Y/%m/', help_text='Upload your document')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField(blank=True, null=True, help_text='Additional notes about this document')

    class Meta:
        ordering = ['-uploaded_at']
        verbose_name = 'Patient Document'
        verbose_name_plural = 'Patient Documents'

    def __str__(self):
        return f"{self.patient.full_name} - {self.title}"

    @property
    def file_size(self):
        """Return file size in human readable format"""
        if self.file:
            size = self.file.size
            for unit in ['B', 'KB', 'MB', 'GB']:
                if size < 1024.0:
                    return f"{size:.1f} {unit}"
                size /= 1024.0
            return f"{size:.1f} TB"
        return "0 B"

    @property
    def file_extension(self):
        """Return file extension"""
        if self.file:
            return self.file.name.split('.')[-1].upper()
        return ""

    @property
    def is_image(self):
        """Check if file is an image"""
        image_extensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        return self.file_extension.lower() in image_extensions

    @property
    def is_pdf(self):
        """Check if file is a PDF"""
        return self.file_extension.lower() == 'pdf'


class PasswordResetToken(models.Model):
    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='password_reset_tokens')
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Password Reset Token'
        verbose_name_plural = 'Password Reset Tokens'
    
    def __str__(self):
        return f"Reset token for {self.patient.full_name}"
    
    @property
    def is_expired(self):
        """Check if token is expired (24 hours)"""
        return timezone.now() > self.created_at + timedelta(hours=24)
    
    def is_valid(self):
        """Check if token is valid (not used and not expired)"""
        return not self.is_used and not self.is_expired


# Health Tracking Models

class VitalSign(models.Model):
    """Store patient vital signs readings over time"""
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='vital_signs')
    recorded_at = models.DateTimeField(auto_now_add=True)
    blood_pressure_systolic = models.IntegerField(help_text="Systolic blood pressure (mmHg)")
    blood_pressure_diastolic = models.IntegerField(help_text="Diastolic blood pressure (mmHg)")
    heart_rate = models.IntegerField(help_text="Heart rate (BPM)")
    temperature = models.DecimalField(max_digits=4, decimal_places=1, help_text="Temperature (°F)")
    oxygen_saturation = models.IntegerField(help_text="Oxygen saturation (%)")
    weight = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True, help_text="Weight (lbs)")
    notes = models.TextField(blank=True, help_text="Additional notes")
    
    class Meta:
        ordering = ['-recorded_at']
        indexes = [
            models.Index(fields=['patient', '-recorded_at']),
        ]
    
    def __str__(self):
        return f"{self.patient.user.get_full_name()} - {self.recorded_at.strftime('%Y-%m-%d %H:%M')}"


class WellnessLog(models.Model):
    """Track daily wellness metrics (hydration, sleep, steps, mood)"""
    MOOD_CHOICES = [
        (1, 'Very Poor'),
        (2, 'Poor'),
        (3, 'Fair'),
        (4, 'Good'),
        (5, 'Excellent'),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='wellness_logs')
    date = models.DateField()
    water_intake_glasses = models.IntegerField(default=0, help_text="Glasses of water consumed")
    sleep_hours = models.DecimalField(max_digits=3, decimal_places=1, help_text="Hours of sleep")
    steps_count = models.IntegerField(default=0, help_text="Number of steps taken")
    mood_score = models.IntegerField(choices=MOOD_CHOICES, help_text="Mood rating (1-5)")
    exercise_minutes = models.IntegerField(default=0, help_text="Minutes of exercise")
    stress_level = models.IntegerField(default=1, help_text="Stress level (1-5)")
    notes = models.TextField(blank=True, help_text="Daily wellness notes")
    
    class Meta:
        unique_together = ['patient', 'date']
        ordering = ['-date']
        indexes = [
            models.Index(fields=['patient', '-date']),
        ]
    
    def __str__(self):
        return f"{self.patient.user.get_full_name()} - {self.date}"


class Medication(models.Model):
    """Store patient medications and prescriptions"""
    FREQUENCY_CHOICES = [
        ('once_daily', 'Once Daily'),
        ('twice_daily', 'Twice Daily'),
        ('three_times_daily', 'Three Times Daily'),
        ('four_times_daily', 'Four Times Daily'),
        ('as_needed', 'As Needed'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='medications')
    name = models.CharField(max_length=200, help_text="Medication name")
    dosage = models.CharField(max_length=100, help_text="Dosage amount")
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, help_text="How often to take")
    prescribed_date = models.DateField(help_text="Date prescribed")
    prescribed_by = models.CharField(max_length=200, blank=True, help_text="Prescribing doctor")
    is_active = models.BooleanField(default=True, help_text="Is medication currently active")
    instructions = models.TextField(blank=True, help_text="Special instructions")
    side_effects = models.TextField(blank=True, help_text="Noted side effects")
    
    class Meta:
        ordering = ['-prescribed_date']
        indexes = [
            models.Index(fields=['patient', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.patient.user.get_full_name()}"


class MedicationLog(models.Model):
    """Track when medications are taken for adherence monitoring"""
    medication = models.ForeignKey(Medication, on_delete=models.CASCADE, related_name='logs')
    taken_at = models.DateTimeField(auto_now_add=True)
    taken_date = models.DateField(auto_now_add=True)
    notes = models.TextField(blank=True, help_text="Notes about taking medication")
    
    class Meta:
        ordering = ['-taken_at']
        indexes = [
            models.Index(fields=['medication', '-taken_at']),
        ]
    
    def __str__(self):
        return f"{self.medication.name} - {self.taken_date}"


class Notification(models.Model):
    """Store system notifications for patients"""
    NOTIFICATION_TYPES = [
        ('appointment', 'Appointment'),
        ('medication', 'Medication'),
        ('health', 'Health'),
        ('system', 'System'),
        ('lab_result', 'Lab Result'),
        ('reminder', 'Reminder'),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200, help_text="Notification title")
    message = models.TextField(help_text="Notification message")
    type = models.CharField(max_length=20, choices=NOTIFICATION_TYPES, help_text="Notification type")
    is_read = models.BooleanField(default=False, help_text="Has notification been read")
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True, help_text="When notification was read")
    action_url = models.URLField(blank=True, help_text="Optional action URL")
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['patient', 'is_read', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.patient.user.get_full_name()}"


class LabResult(models.Model):
    """Store lab test results and reports"""
    RESULT_STATUS = [
        ('normal', 'Normal'),
        ('abnormal', 'Abnormal'),
        ('critical', 'Critical'),
        ('pending', 'Pending'),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='lab_results')
    test_name = models.CharField(max_length=200, help_text="Name of the lab test")
    test_date = models.DateField(help_text="Date test was performed")
    result_value = models.CharField(max_length=100, help_text="Test result value")
    normal_range = models.CharField(max_length=100, help_text="Normal range for this test")
    status = models.CharField(max_length=20, choices=RESULT_STATUS, help_text="Result status")
    doctor_notes = models.TextField(blank=True, help_text="Doctor's interpretation")
    lab_name = models.CharField(max_length=200, blank=True, help_text="Laboratory name")
    file_attachment = models.FileField(upload_to='lab_results/', blank=True, null=True)
    
    class Meta:
        ordering = ['-test_date']
        indexes = [
            models.Index(fields=['patient', '-test_date']),
        ]
    
    def __str__(self):
        return f"{self.test_name} - {self.patient.user.get_full_name()}"


class HealthGoal(models.Model):
    """Store patient health goals and targets"""
    GOAL_TYPES = [
        ('weight', 'Weight Management'),
        ('exercise', 'Exercise'),
        ('nutrition', 'Nutrition'),
        ('sleep', 'Sleep'),
        ('medication', 'Medication Adherence'),
        ('vitals', 'Vital Signs'),
        ('general', 'General Health'),
    ]
    
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='health_goals')
    goal_type = models.CharField(max_length=20, choices=GOAL_TYPES, help_text="Type of health goal")
    title = models.CharField(max_length=200, help_text="Goal title")
    description = models.TextField(help_text="Detailed goal description")
    target_value = models.CharField(max_length=100, help_text="Target value to achieve")
    current_value = models.CharField(max_length=100, blank=True, help_text="Current progress value")
    start_date = models.DateField(help_text="Goal start date")
    target_date = models.DateField(help_text="Goal target date")
    is_achieved = models.BooleanField(default=False, help_text="Has goal been achieved")
    is_active = models.BooleanField(default=True, help_text="Is goal currently active")
    
    class Meta:
        ordering = ['-start_date']
        indexes = [
            models.Index(fields=['patient', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.patient.user.get_full_name()}"