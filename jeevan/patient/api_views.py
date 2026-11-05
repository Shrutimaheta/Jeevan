from django.core.exceptions import ValidationError, PermissionDenied
from django.http import JsonResponse, Http404
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from datetime import datetime, timedelta
import json
import logging


def json_object(body):
    data = json.loads(body)
    if not isinstance(data, dict):
        raise ValueError("Expected a JSON object.")
    return data

from django.db.models.functions import TruncDate, TruncMonth
from django.db.models import Avg
from django.core.paginator import Paginator

from .models import Patient, VitalSign, WellnessLog, Medication, MedicationLog, Notification, LabResult, HealthGoal


@login_required
@require_http_methods(["GET"])
def vital_signs_api(request):
    """Get vital signs history for the patient with aggregation for longer periods"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        period = request.GET.get('period', 'week')  # week, month, year
        
        end_date = timezone.now()
        if period == 'week':
            start_date = end_date - timedelta(days=7)
        elif period == 'month':
            start_date = end_date - timedelta(days=30)
        elif period == 'year':
            start_date = end_date - timedelta(days=365)
        else:
            start_date = end_date - timedelta(days=7)
            
        if period == 'week':
            vital_signs = VitalSign.objects.filter(
                patient=patient,
                recorded_at__gte=start_date,
                recorded_at__lte=end_date
            ).order_by('-recorded_at')
            
            data = []
            for vs in vital_signs:
                data.append({
                    'id': vs.id,
                    'recorded_at': vs.recorded_at.isoformat(),
                    'blood_pressure_systolic': vs.blood_pressure_systolic,
                    'blood_pressure_diastolic': vs.blood_pressure_diastolic,
                    'heart_rate': vs.heart_rate,
                    'temperature': float(vs.temperature),
                    'oxygen_saturation': vs.oxygen_saturation,
                    'weight': float(vs.weight) if vs.weight else None,
                    'notes': vs.notes,
                })
        elif period == 'month':
            vital_signs = (
                VitalSign.objects.filter(
                    patient=patient,
                    recorded_at__gte=start_date,
                    recorded_at__lte=end_date
                )
                .annotate(date_only=TruncDate('recorded_at'))
                .values('date_only')
                .annotate(
                    avg_systolic=Avg('blood_pressure_systolic'),
                    avg_diastolic=Avg('blood_pressure_diastolic'),
                    avg_heart_rate=Avg('heart_rate'),
                    avg_temperature=Avg('temperature'),
                    avg_oxygen=Avg('oxygen_saturation'),
                    avg_weight=Avg('weight')
                )
                .order_by('date_only')
            )
            
            data = []
            for item in vital_signs:
                data.append({
                    'date': item['date_only'].isoformat() if item['date_only'] else None,
                    'blood_pressure_systolic': float(item['avg_systolic']) if item['avg_systolic'] is not None else 0,
                    'blood_pressure_diastolic': float(item['avg_diastolic']) if item['avg_diastolic'] is not None else 0,
                    'heart_rate': float(item['avg_heart_rate']) if item['avg_heart_rate'] is not None else 0,
                    'temperature': float(item['avg_temperature']) if item['avg_temperature'] is not None else 0,
                    'oxygen_saturation': float(item['avg_oxygen']) if item['avg_oxygen'] is not None else 0,
                    'weight': float(item['avg_weight']) if item['avg_weight'] is not None else None,
                })
        else: # year
            vital_signs = (
                VitalSign.objects.filter(
                    patient=patient,
                    recorded_at__gte=start_date,
                    recorded_at__lte=end_date
                )
                .annotate(month_only=TruncMonth('recorded_at'))
                .values('month_only')
                .annotate(
                    avg_systolic=Avg('blood_pressure_systolic'),
                    avg_diastolic=Avg('blood_pressure_diastolic'),
                    avg_heart_rate=Avg('heart_rate'),
                    avg_temperature=Avg('temperature'),
                    avg_oxygen=Avg('oxygen_saturation'),
                    avg_weight=Avg('weight')
                )
                .order_by('month_only')
            )
            
            data = []
            for item in vital_signs:
                data.append({
                    'month': item['month_only'].strftime('%Y-%m') if item['month_only'] else None,
                    'blood_pressure_systolic': float(item['avg_systolic']) if item['avg_systolic'] is not None else 0,
                    'blood_pressure_diastolic': float(item['avg_diastolic']) if item['avg_diastolic'] is not None else 0,
                    'heart_rate': float(item['avg_heart_rate']) if item['avg_heart_rate'] is not None else 0,
                    'temperature': float(item['avg_temperature']) if item['avg_temperature'] is not None else 0,
                    'oxygen_saturation': float(item['avg_oxygen']) if item['avg_oxygen'] is not None else 0,
                    'weight': float(item['avg_weight']) if item['avg_weight'] is not None else None,
                })
                
        return JsonResponse({
            'success': True,
            'data': data,
            'period': period,
            'count': len(data)
        })
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


from jeevan.decorators import rate_limit

@login_required
@require_http_methods(["POST"])
@rate_limit(key_prefix="vitals", limit=5, period=60, is_api=True)
def add_vital_sign_api(request):
    """Add new vital sign reading"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        data = json_object(request.body)
        
        from .services import record_vitals
        vital_sign = record_vitals(
            patient=patient, actor=request.user,
            blood_pressure_systolic=data.get('blood_pressure_systolic'),
            blood_pressure_diastolic=data.get('blood_pressure_diastolic'),
            heart_rate=data.get('heart_rate'),
            temperature=data.get('temperature'),
            oxygen_saturation=data.get('oxygen_saturation'),
            weight=data.get('weight'),
            notes=data.get('notes', '')
        )
        

        return JsonResponse({
            'success': True,
            'message': 'Vital signs recorded successfully',
            'id': vital_sign.id
        })
    
    except (ValidationError, ValueError, TypeError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid vital signs.',
                             'errors': getattr(exc, 'message_dict', {'input': [str(exc)]})}, status=400)
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["GET"])
def wellness_log_api(request):
    """Get wellness tracking data"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        period = request.GET.get('period', 'week')
        
        # Calculate date range
        end_date = timezone.now().date()
        if period == 'week':
            start_date = end_date - timedelta(days=7)
        elif period == 'month':
            start_date = end_date - timedelta(days=30)
        else:
            start_date = end_date - timedelta(days=7)
        
        wellness_logs = WellnessLog.objects.filter(
            patient=patient,
            date__gte=start_date,
            date__lte=end_date
        ).order_by('-date')
        
        data = []
        for log in wellness_logs:
            data.append({
                'id': log.id,
                'date': log.date.isoformat(),
                'water_intake_glasses': log.water_intake_glasses,
                'sleep_hours': float(log.sleep_hours),
                'steps_count': log.steps_count,
                'mood_score': log.mood_score,
                'exercise_minutes': log.exercise_minutes,
                'stress_level': log.stress_level,
                'notes': log.notes,
            })
        
        return JsonResponse({
            'success': True,
            'data': data,
            'period': period,
            'count': len(data)
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["POST"])
def log_wellness_api(request):
    """Log daily wellness data"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        data = json_object(request.body)
        
        from .services import record_wellness
        wellness_log, created = record_wellness(patient, data)

        return JsonResponse({
            'success': True,
            'message': 'Wellness data logged successfully',
            'created': created,
            'id': wellness_log.id
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["GET"])
def medications_api(request):
    """Get patient medications"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        active_only = request.GET.get('active_only', 'true').lower() == 'true'
        
        medications = Medication.objects.filter(patient=patient)
        if active_only:
            medications = medications.filter(is_active=True)
        
        medications = medications.order_by('-prescribed_date')
        
        data = []
        for med in medications:
            from .services import medication_logging_rate
            adherence_rate = medication_logging_rate(med)

            data.append({
                'id': med.id,
                'name': med.name,
                'dosage': med.dosage,
                'frequency': med.frequency,
                'prescribed_date': med.prescribed_date.isoformat(),
                'prescribed_by': med.prescribed_by,
                'is_active': med.is_active,
                'instructions': med.instructions,
                'side_effects': med.side_effects,
                'adherence_rate': adherence_rate,
                'metric_label': 'Self-reported medication logging',
                'metric_description': 'Percentage of elapsed days with at least one log; not dose adherence.'
            })
        
        return JsonResponse({
            'success': True,
            'data': data,
            'count': len(data)
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["POST"])
def log_medication_api(request):
    """Log medication taken with daily idempotence"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        data = json_object(request.body)
        
        from .services import record_medication_day
        medication_log, created = record_medication_day(patient, data.get('medication_id'), data.get('notes', ''))
        
        return JsonResponse({
            'success': True,
            'message': 'Medication logged successfully' if created else 'Medication already logged for today',
            'id': medication_log.id,
            'already_logged': not created
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["GET"])
def health_trends_api(request):
    """Get health trend data for charts"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        period = request.GET.get('period', 'week')
        
        # Calculate date range
        end_date = timezone.now()
        if period == 'week':
            start_date = end_date - timedelta(days=7)
        elif period == 'month':
            start_date = end_date - timedelta(days=30)
        else:
            start_date = end_date - timedelta(days=7)
        
        # Get wellness data for trend chart
        wellness_logs = WellnessLog.objects.filter(
            patient=patient,
            date__gte=start_date.date(),
            date__lte=end_date.date()
        ).order_by('date')
        
        # Prepare chart data
        labels = []
        mood_data = []
        sleep_data = []
        water_data = []
        steps_data = []
        
        for log in wellness_logs:
            labels.append(log.date.strftime('%Y-%m-%d'))
            mood_data.append(log.mood_score)
            sleep_data.append(float(log.sleep_hours))
            water_data.append(log.water_intake_glasses)
            steps_data.append(log.steps_count)
        
        return JsonResponse({
            'success': True,
            'data': {
                'labels': labels,
                'mood': mood_data,
                'sleep': sleep_data,
                'water': water_data,
                'steps': steps_data
            },
            'period': period
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["GET"])
def vital_signs_chart_api(request):
    """Get vital signs data for radar chart"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        
        # Get latest vital signs
        latest_vitals = VitalSign.objects.filter(patient=patient).order_by('-recorded_at').first()
        
        if not latest_vitals:
            return JsonResponse({
                'success': True,
                'data': {
                    'labels': ['BP Systolic', 'BP Diastolic', 'Heart Rate', 'Temperature', 'Oxygen Sat'],
                    'values': [0, 0, 0, 0, 0],
                    'normal_ranges': {
                        'bp_systolic': [90, 140],
                        'bp_diastolic': [60, 90],
                        'heart_rate': [60, 100],
                        'temperature': [97, 99],
                        'oxygen_saturation': [95, 100]
                    }
                }
            })
        
        # Normalize values for radar chart (0-100 scale)
        def normalize_value(value, min_val, max_val):
            return max(0, min(100, ((value - min_val) / (max_val - min_val)) * 100))
        
        data = {
            'labels': ['BP Systolic', 'BP Diastolic', 'Heart Rate', 'Temperature', 'Oxygen Sat'],
            'values': [
                normalize_value(latest_vitals.blood_pressure_systolic, 70, 180),
                normalize_value(latest_vitals.blood_pressure_diastolic, 40, 110),
                normalize_value(latest_vitals.heart_rate, 40, 120),
                normalize_value(float(latest_vitals.temperature), 95, 105),
                normalize_value(latest_vitals.oxygen_saturation, 85, 100)
            ],
            'raw_values': {
                'bp_systolic': latest_vitals.blood_pressure_systolic,
                'bp_diastolic': latest_vitals.blood_pressure_diastolic,
                'heart_rate': latest_vitals.heart_rate,
                'temperature': float(latest_vitals.temperature),
                'oxygen_saturation': latest_vitals.oxygen_saturation
            }
        }
        
        return JsonResponse({
            'success': True,
            'data': data
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["GET"])
def medication_adherence_api(request):
    """Compatibility endpoint for self-reported medication logging days."""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        
        from .services import medication_logging_summary
        overall_adherence, medication_count = medication_logging_summary(patient)

        return JsonResponse({
            'success': True,
            'data': {
                'overall_adherence': overall_adherence,
                'metric_label': 'Self-reported medication logging',
                'metric_description': 'Percentage of elapsed days with at least one log; not proof of taking every prescribed dose.',
                'medication_count': medication_count
            }
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["GET"])
def notifications_api(request):
    """Get user notifications with pagination"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        unread_only = request.GET.get('unread_only', 'false').lower() == 'true'
        
        notifications = Notification.objects.filter(patient=patient).order_by('-created_at')
        if unread_only:
            notifications = notifications.filter(is_read=False)
            
        page_number = request.GET.get('page', 1)
        paginator = Paginator(notifications, 10)  # 10 notifications per page
        try:
            page_obj = paginator.get_page(page_number)
        except Exception:
            return JsonResponse({'success': False, 'error': 'Invalid page number'}, status=400)
            
        data = []
        for notification in page_obj:
            data.append({
                'id': notification.id,
                'title': notification.title,
                'message': notification.message,
                'type': notification.type,
                'is_read': notification.is_read,
                'created_at': notification.created_at.isoformat(),
                'read_at': notification.read_at.isoformat() if notification.read_at else None,
                'action_url': notification.action_url
            })
            
        return JsonResponse({
            'success': True,
            'data': data,
            'count': len(data),
            'has_next': page_obj.has_next(),
            'has_previous': page_obj.has_previous(),
            'total_pages': paginator.num_pages,
            'current_page': page_obj.number,
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)


@login_required
@require_http_methods(["POST"])
def mark_notification_read_api(request):
    """Mark notification as read"""
    try:
        patient = get_object_or_404(Patient, user=request.user)
        data = json_object(request.body)
        notification_id = data.get('notification_id')
        
        notification = get_object_or_404(Notification, id=notification_id, patient=patient)
        notification.is_read = True
        notification.read_at = timezone.now()
        notification.save()
        
        return JsonResponse({
            'success': True,
            'message': 'Notification marked as read'
        })
    
    except Http404:
        return JsonResponse({'success': False, 'error': 'Not found.'}, status=404)
    except PermissionDenied:
        return JsonResponse({'success': False, 'error': 'Access denied.'}, status=403)
    except (ValidationError, ValueError, TypeError, OverflowError) as exc:
        return JsonResponse({'success': False, 'error': 'Invalid input.',
                             'errors': getattr(exc, 'message_dict', {})}, status=400)
    except Exception:
        logging.getLogger(__name__).exception('Patient API request failed')
        return JsonResponse({'success': False, 'error': 'Unable to complete the request.'}, status=500)
