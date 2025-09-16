from django.db import models
from django.conf import settings
from .models import Patient


class FAQ(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General'),
        ('appointments', 'Appointments'),
        ('documents', 'Documents'),
        ('profile', 'Profile'),
        ('technical', 'Technical'),
        ('billing', 'Billing'),
    ]

    id = models.AutoField(primary_key=True)
    question = models.CharField(max_length=500)
    answer = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question


class SupportTicket(models.Model):
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
        ('closed', 'Closed'),
    ]

    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('urgent', 'Urgent'),
    ]

    CATEGORY_CHOICES = [
        ('technical', 'Technical Issue'),
        ('appointment', 'Appointment Related'),
        ('document', 'Document Upload'),
        ('account', 'Account Issue'),
        ('billing', 'Billing Question'),
        ('other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='support_tickets')
    subject = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Support Ticket'
        verbose_name_plural = 'Support Tickets'

    def __str__(self):
        return f"Ticket #{self.id} - {self.subject}"


class SupportMessage(models.Model):
    id = models.AutoField(primary_key=True)
    ticket = models.ForeignKey(SupportTicket, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(Patient, on_delete=models.CASCADE)
    message = models.TextField()
    is_admin_reply = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']
        verbose_name = 'Support Message'
        verbose_name_plural = 'Support Messages'

    def __str__(self):
        return f"Message for Ticket #{self.ticket.id}"


class HealthResource(models.Model):
    CATEGORY_CHOICES = [
        ('wellness', 'Wellness & Prevention'),
        ('medication', 'Medication Guide'),
        ('diseases', 'Diseases & Conditions'),
        ('emergency', 'Emergency Care'),
        ('mental_health', 'Mental Health'),
        ('nutrition', 'Nutrition & Diet'),
        ('exercise', 'Exercise & Fitness'),
        ('other', 'Other'),
    ]

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'created_at']
        verbose_name = 'Health Resource'
        verbose_name_plural = 'Health Resources'

    def __str__(self):
        return self.title


class ContactInfo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    department = models.CharField(max_length=100)
    is_emergency = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Contact Information'
        verbose_name_plural = 'Contact Information'

    def __str__(self):
        return f"{self.name} - {self.department}"
