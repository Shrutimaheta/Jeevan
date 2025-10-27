# Database Schema Documentation

## Overview
This document outlines the database schema for the patient dashboard health tracking system. All models extend Django's base Model class and include proper relationships, constraints, and indexes.

## Existing Models

### Patient Model (Already exists)
```python
class Patient(models.Model):
    user = OneToOneField(User, on_delete=models.CASCADE)
    # ... existing fields
```

### PatientDocument Model (Already exists)
```python
class PatientDocument(models.Model):
    patient = ForeignKey(Patient, on_delete=models.CASCADE)
    # ... existing fields
```

## New Health Tracking Models

### 1. VitalSign Model
**Purpose**: Store patient vital signs readings over time

```python
class VitalSign(models.Model):
    patient = ForeignKey(Patient, on_delete=models.CASCADE, related_name='vital_signs')
    recorded_at = DateTimeField(auto_now_add=True)
    blood_pressure_systolic = IntegerField(help_text="Systolic blood pressure (mmHg)")
    blood_pressure_diastolic = IntegerField(help_text="Diastolic blood pressure (mmHg)")
    heart_rate = IntegerField(help_text="Heart rate (BPM)")
    temperature = DecimalField(max_digits=4, decimal_places=1, help_text="Temperature (°F)")
    oxygen_saturation = IntegerField(help_text="Oxygen saturation (%)")
    weight = DecimalField(max_digits=5, decimal_places=1, null=True, blank=True, help_text="Weight (lbs)")
    notes = TextField(blank=True, help_text="Additional notes")
    
    class Meta:
        ordering = ['-recorded_at']
        indexes = [
            models.Index(fields=['patient', '-recorded_at']),
        ]
    
    def __str__(self):
        return f"{self.patient.user.get_full_name()} - {self.recorded_at.strftime('%Y-%m-%d %H:%M')}"
```

### 2. WellnessLog Model
**Purpose**: Track daily wellness metrics (hydration, sleep, steps, mood)

```python
class WellnessLog(models.Model):
    MOOD_CHOICES = [
        (1, 'Very Poor'),
        (2, 'Poor'),
        (3, 'Fair'),
        (4, 'Good'),
        (5, 'Excellent'),
    ]
    
    patient = ForeignKey(Patient, on_delete=models.CASCADE, related_name='wellness_logs')
    date = DateField()
    water_intake_glasses = IntegerField(default=0, help_text="Glasses of water consumed")
    sleep_hours = DecimalField(max_digits=3, decimal_places=1, help_text="Hours of sleep")
    steps_count = IntegerField(default=0, help_text="Number of steps taken")
    mood_score = IntegerField(choices=MOOD_CHOICES, help_text="Mood rating (1-5)")
    exercise_minutes = IntegerField(default=0, help_text="Minutes of exercise")
    stress_level = IntegerField(default=1, help_text="Stress level (1-5)")
    notes = TextField(blank=True, help_text="Daily wellness notes")
    
    class Meta:
        unique_together = ['patient', 'date']
        ordering = ['-date']
        indexes = [
            models.Index(fields=['patient', '-date']),
        ]
    
    def __str__(self):
        return f"{self.patient.user.get_full_name()} - {self.date}"
```

### 3. Medication Model
**Purpose**: Store patient medications and prescriptions

```python
class Medication(models.Model):
    FREQUENCY_CHOICES = [
        ('once_daily', 'Once Daily'),
        ('twice_daily', 'Twice Daily'),
        ('three_times_daily', 'Three Times Daily'),
        ('four_times_daily', 'Four Times Daily'),
        ('as_needed', 'As Needed'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly'),
    ]
    
    patient = ForeignKey(Patient, on_delete=models.CASCADE, related_name='medications')
    name = CharField(max_length=200, help_text="Medication name")
    dosage = CharField(max_length=100, help_text="Dosage amount")
    frequency = CharField(max_length=20, choices=FREQUENCY_CHOICES, help_text="How often to take")
    prescribed_date = DateField(help_text="Date prescribed")
    prescribed_by = CharField(max_length=200, blank=True, help_text="Prescribing doctor")
    is_active = BooleanField(default=True, help_text="Is medication currently active")
    instructions = TextField(blank=True, help_text="Special instructions")
    side_effects = TextField(blank=True, help_text="Noted side effects")
    
    class Meta:
        ordering = ['-prescribed_date']
        indexes = [
            models.Index(fields=['patient', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.name} - {self.patient.user.get_full_name()}"
```

### 4. MedicationLog Model
**Purpose**: Track when medications are taken for adherence monitoring

```python
class MedicationLog(models.Model):
    medication = ForeignKey(Medication, on_delete=models.CASCADE, related_name='logs')
    taken_at = DateTimeField(auto_now_add=True)
    taken_date = DateField(auto_now_add=True)
    notes = TextField(blank=True, help_text="Notes about taking medication")
    
    class Meta:
        ordering = ['-taken_at']
        indexes = [
            models.Index(fields=['medication', '-taken_at']),
        ]
    
    def __str__(self):
        return f"{self.medication.name} - {self.taken_date}"
```

### 5. Notification Model
**Purpose**: Store system notifications for patients

```python
class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ('appointment', 'Appointment'),
        ('medication', 'Medication'),
        ('health', 'Health'),
        ('system', 'System'),
        ('lab_result', 'Lab Result'),
        ('reminder', 'Reminder'),
    ]
    
    patient = ForeignKey(Patient, on_delete=models.CASCADE, related_name='notifications')
    title = CharField(max_length=200, help_text="Notification title")
    message = TextField(help_text="Notification message")
    type = CharField(max_length=20, choices=NOTIFICATION_TYPES, help_text="Notification type")
    is_read = BooleanField(default=False, help_text="Has notification been read")
    created_at = DateTimeField(auto_now_add=True)
    read_at = DateTimeField(null=True, blank=True, help_text="When notification was read")
    action_url = URLField(blank=True, help_text="Optional action URL")
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['patient', 'is_read', '-created_at']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.patient.user.get_full_name()}"
```

### 6. LabResult Model
**Purpose**: Store lab test results and reports

```python
class LabResult(models.Model):
    RESULT_STATUS = [
        ('normal', 'Normal'),
        ('abnormal', 'Abnormal'),
        ('critical', 'Critical'),
        ('pending', 'Pending'),
    ]
    
    patient = ForeignKey(Patient, on_delete=models.CASCADE, related_name='lab_results')
    test_name = CharField(max_length=200, help_text="Name of the lab test")
    test_date = DateField(help_text="Date test was performed")
    result_value = CharField(max_length=100, help_text="Test result value")
    normal_range = CharField(max_length=100, help_text="Normal range for this test")
    status = CharField(max_length=20, choices=RESULT_STATUS, help_text="Result status")
    doctor_notes = TextField(blank=True, help_text="Doctor's interpretation")
    lab_name = CharField(max_length=200, blank=True, help_text="Laboratory name")
    file_attachment = FileField(upload_to='lab_results/', blank=True, null=True)
    
    class Meta:
        ordering = ['-test_date']
        indexes = [
            models.Index(fields=['patient', '-test_date']),
        ]
    
    def __str__(self):
        return f"{self.test_name} - {self.patient.user.get_full_name()}"
```

### 7. HealthGoal Model
**Purpose**: Store patient health goals and targets

```python
class HealthGoal(models.Model):
    GOAL_TYPES = [
        ('weight', 'Weight Management'),
        ('exercise', 'Exercise'),
        ('nutrition', 'Nutrition'),
        ('sleep', 'Sleep'),
        ('medication', 'Medication Adherence'),
        ('vitals', 'Vital Signs'),
        ('general', 'General Health'),
    ]
    
    patient = ForeignKey(Patient, on_delete=models.CASCADE, related_name='health_goals')
    goal_type = CharField(max_length=20, choices=GOAL_TYPES, help_text="Type of health goal")
    title = CharField(max_length=200, help_text="Goal title")
    description = TextField(help_text="Detailed goal description")
    target_value = CharField(max_length=100, help_text="Target value to achieve")
    current_value = CharField(max_length=100, blank=True, help_text="Current progress value")
    start_date = DateField(help_text="Goal start date")
    target_date = DateField(help_text="Goal target date")
    is_achieved = BooleanField(default=False, help_text="Has goal been achieved")
    is_active = BooleanField(default=True, help_text="Is goal currently active")
    
    class Meta:
        ordering = ['-start_date']
        indexes = [
            models.Index(fields=['patient', 'is_active']),
        ]
    
    def __str__(self):
        return f"{self.title} - {self.patient.user.get_full_name()}"
```

## Database Relationships

### Primary Relationships
- **Patient** → **VitalSign** (One-to-Many)
- **Patient** → **WellnessLog** (One-to-Many)
- **Patient** → **Medication** (One-to-Many)
- **Patient** → **Notification** (One-to-Many)
- **Patient** → **LabResult** (One-to-Many)
- **Patient** → **HealthGoal** (One-to-Many)
- **Medication** → **MedicationLog** (One-to-Many)

### Foreign Key Constraints
- All foreign keys use `on_delete=models.CASCADE` to maintain data integrity
- Patient deletion will cascade delete all related health data
- Medication deletion will cascade delete all medication logs

## Database Indexes

### Performance Indexes
1. **Patient + Date/Time**: For efficient querying of patient data by date
2. **Patient + Status**: For filtering active/inactive records
3. **Notification Status**: For unread notification queries
4. **Medication Active Status**: For current medication queries

### Composite Indexes
- `['patient', '-recorded_at']` for VitalSign
- `['patient', '-date']` for WellnessLog
- `['patient', 'is_read', '-created_at']` for Notification
- `['patient', 'is_active']` for Medication and HealthGoal

## Data Validation Rules

### VitalSign Validation
- Blood pressure: 50-300 mmHg (systolic), 30-200 mmHg (diastolic)
- Heart rate: 30-220 BPM
- Temperature: 90-110°F
- Oxygen saturation: 70-100%

### WellnessLog Validation
- Water intake: 0-20 glasses per day
- Sleep hours: 0-24 hours
- Steps: 0-100,000 per day
- Mood score: 1-5 only
- Exercise minutes: 0-1440 (24 hours)

### Medication Validation
- Name: Required, max 200 characters
- Dosage: Required, max 100 characters
- Frequency: Must be from predefined choices
- Prescribed date: Cannot be in the future

## Data Retention Policies

### Automatic Cleanup
- **VitalSign**: Keep for 7 years, then archive
- **WellnessLog**: Keep for 2 years, then archive
- **MedicationLog**: Keep for 5 years, then archive
- **Notification**: Keep for 1 year, then delete
- **LabResult**: Keep permanently (medical records)

### Archive Strategy
- Move old data to archive tables
- Compress archived data
- Maintain referential integrity
- Provide data export before deletion

## Security Considerations

### Data Encryption
- Sensitive fields encrypted at rest
- All health data considered PHI (Protected Health Information)
- Audit trail for all data access

### Access Control
- Patient can only access their own data
- Doctors can access patient data with proper authorization
- Admin access for system maintenance only

### Audit Logging
- Log all data modifications
- Track data access patterns
- Monitor for suspicious activity
- Regular security audits

## Migration Strategy

### Phase 1: Core Models
1. Create VitalSign, WellnessLog models
2. Create basic API endpoints
3. Update dashboard to use real data

### Phase 2: Medication Tracking
1. Create Medication, MedicationLog models
2. Implement medication adherence tracking
3. Add medication reminders

### Phase 3: Advanced Features
1. Create Notification, LabResult, HealthGoal models
2. Implement notification system
3. Add lab results management

### Phase 4: Optimization
1. Add database indexes
2. Implement data archiving
3. Performance optimization
4. Security hardening
