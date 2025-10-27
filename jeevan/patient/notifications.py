from django.utils import timezone
from .models import Patient, Notification


def create_notification(patient, title, message, notification_type='system', action_url=''):
    """Create a new notification for a patient"""
    return Notification.objects.create(
        patient=patient,
        title=title,
        message=message,
        type=notification_type,
        action_url=action_url
    )


def create_appointment_notification(patient, appointment):
    """Create notification for appointment events"""
    if appointment.status == 'accepted':
        create_notification(
            patient=patient,
            title="Appointment Confirmed",
            message=f"Your appointment with Dr. {appointment.doctor.full_name} on {appointment.appointment_date} has been confirmed.",
            notification_type='appointment',
            action_url=f"/appointments/{appointment.id}/"
        )
    elif appointment.status == 'rejected':
        create_notification(
            patient=patient,
            title="Appointment Cancelled",
            message=f"Your appointment with Dr. {appointment.doctor.full_name} on {appointment.appointment_date} has been cancelled.",
            notification_type='appointment',
            action_url=f"/appointments/{appointment.id}/"
        )
    elif appointment.status == 'completed':
        create_notification(
            patient=patient,
            title="Appointment Completed",
            message=f"Your appointment with Dr. {appointment.doctor.full_name} has been completed. Check your profile for any prescriptions or notes.",
            notification_type='appointment',
            action_url=f"/appointments/{appointment.id}/"
        )


def create_medication_reminder(patient, medication):
    """Create medication reminder notification"""
    create_notification(
        patient=patient,
        title="Medication Reminder",
        message=f"Time to take your {medication.name} ({medication.dosage}).",
        notification_type='medication',
        action_url="/patient/medications/"
    )


def create_lab_result_notification(patient, lab_result):
    """Create notification for new lab results"""
    status_text = {
        'normal': 'Your lab results are normal.',
        'abnormal': 'Your lab results show some abnormalities. Please contact your doctor.',
        'critical': 'Your lab results require immediate attention. Please contact your doctor immediately.',
        'pending': 'Your lab results are still being processed.'
    }
    
    create_notification(
        patient=patient,
        title="Lab Results Available",
        message=f"Your {lab_result.test_name} results are available. {status_text.get(lab_result.status, '')}",
        notification_type='lab_result',
        action_url=f"/patient/lab-results/{lab_result.id}/"
    )


def create_health_reminder(patient, message):
    """Create general health reminder notification"""
    create_notification(
        patient=patient,
        title="Health Reminder",
        message=message,
        notification_type='health',
        action_url="/patient/dashboard/"
    )


def create_system_notification(patient, title, message):
    """Create system notification"""
    create_notification(
        patient=patient,
        title=title,
        message=message,
        notification_type='system'
    )


def mark_notification_read(notification_id, patient):
    """Mark a notification as read"""
    try:
        notification = Notification.objects.get(id=notification_id, patient=patient)
        notification.is_read = True
        notification.read_at = timezone.now()
        notification.save()
        return True
    except Notification.DoesNotExist:
        return False


def get_unread_notifications_count(patient):
    """Get count of unread notifications for a patient"""
    return Notification.objects.filter(patient=patient, is_read=False).count()


def cleanup_old_notifications(days=30):
    """Delete notifications older than specified days"""
    from datetime import timedelta
    cutoff_date = timezone.now() - timedelta(days=days)
    deleted_count, _ = Notification.objects.filter(created_at__lt=cutoff_date).delete()
    return deleted_count
