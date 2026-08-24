import json
from datetime import datetime, date, timedelta
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from jeevan.decorators import doctor_required, log_audit_event
from doctor.models import Doctor, AppointmentPrescription
from appointments.models import Appointment
from doctor.forms import AppointmentPrescriptionForm
from .auth_views import get_current_doctor

@doctor_required
@csrf_protect
def doctor_dashboard(request):
    """Doctor dashboard view - shows all appointments including pending ones"""
    try:
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        messages.error(request, 'Doctor profile not found.')
        response = render(request, 'doctor/dashboard.html', {'doctor': None})
        response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
        response['Pragma'] = 'no-cache'
        response['Expires'] = '0'
        return response
    
    today = date.today()
    Appointment.mark_expired_appointments()
    
    all_appointments = Appointment.objects.select_related('patient').filter(doctor=doctor)
    accepted_count = all_appointments.filter(status='accepted').count()
    pending_count = all_appointments.filter(status='pending').count()
    rejected_count = all_appointments.filter(status='rejected').count()
    completed_count = all_appointments.filter(status='completed').count()
    cancelled_count = all_appointments.filter(status='cancelled').count()
    expired_count = all_appointments.filter(status='expired').count()
    
    today_total_appointments = Appointment.objects.filter(
        doctor=doctor,
        appointment_date=today
    ).count()
    
    recent_appointments = all_appointments.order_by('-appointment_date', '-appointment_time')[:5]
    today_appointments = Appointment.objects.select_related('patient').filter(
        doctor=doctor,
        appointment_date=today
    ).order_by('appointment_time')
    
    # Next 7 days trends
    next_7_days_counts = []
    next_7_days_labels = []
    for i in range(7):
        day = today + timedelta(days=i)
        count = all_appointments.filter(appointment_date=day, status='accepted').count()
        next_7_days_counts.append(count)
        next_7_days_labels.append(day.strftime('%a (%d %b)'))
        
    context = {
        'doctor': doctor,
        'accepted_count': accepted_count,
        'pending_count': pending_count,
        'rejected_count': rejected_count,
        'completed_count': completed_count,
        'cancelled_count': cancelled_count,
        'expired_count': expired_count,
        'today_total_appointments': today_total_appointments,
        'recent_appointments': recent_appointments,
        'today_appointments': today_appointments,
        'next_7_days_counts': next_7_days_counts,
        'next_7_days_labels': next_7_days_labels,
    }
    
    response = render(request, 'doctor/dashboard.html', context)
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    return response

@doctor_required
def doctor_appointments(request):
    """Doctor appointments view - shows all appointments by default"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'Doctor profile not found.')
        return redirect('universal_login')
        
    Appointment.mark_expired_appointments()
    
    # Filter status
    status_filter = request.GET.get('status', 'all').strip().lower()
    appointments = Appointment.objects.filter(doctor=doctor).select_related('patient').order_by('-appointment_date', '-appointment_time')
    
    if status_filter != 'all':
        appointments = appointments.filter(status=status_filter)
        
    context = {
        'doctor': doctor,
        'appointments': appointments,
        'status_filter': status_filter,
    }
    return render(request, 'doctor/appointments.html', context)

@doctor_required
@require_http_methods(["POST"])
def update_appointment_status(request, appointment_id, status):
    """Update appointment status (accept/reject/cancel/completed)"""
    try:
        doctor = Doctor.objects.get(user=request.user)
        # Verify ownership
        appointment = Appointment.objects.get(id=appointment_id, doctor=doctor)
        
        from appointments.services import update_appointment_status as update_status_svc
        try:
            appointment = update_status_svc(
                appointment_id=appointment_id,
                new_status=status,
                actor=request.user
            )
            return JsonResponse({
                'success': True, 
                'message': f'Appointment {status} successfully',
                'new_status': status
            })
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)})
            
    except Appointment.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Appointment not found'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})

@doctor_required
@require_http_methods(["GET"])
def get_appointment_info(request, appointment_id):
    """Get appointment information for confirmation modal"""
    try:
        doctor = Doctor.objects.get(user=request.user)
        # Scope strictly to this doctor's appointments
        appointment = Appointment.objects.get(id=appointment_id, doctor=doctor)
        
        return JsonResponse({
            'success': True,
            'patient_name': appointment.patient.full_name,
            'appointment_date': appointment.appointment_date.strftime('%B %d, %Y'),
            'appointment_time': appointment.appointment_time.strftime('%I:%M %p'),
            'symptoms': appointment.symptoms,
            'abha_id': appointment.patient.abha_id,
            'status': appointment.status
        })
    except (Doctor.DoesNotExist, Appointment.DoesNotExist):
        return JsonResponse({'success': False, 'message': 'Appointment not found'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})

@doctor_required
def appointment_prescription(request, appointment_id):
    """Create or edit prescription for an accepted appointment; on save mark completed."""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'Doctor profile not found.')
        return redirect('universal_login')
    
    appointment = get_object_or_404(Appointment, id=appointment_id, doctor=doctor)
    prescription = getattr(appointment, 'prescription', None)

    if request.method == 'POST':
        form = AppointmentPrescriptionForm(request.POST, instance=prescription, appointment=appointment)
        if form.is_valid():
            from doctor.services import save_prescription
            try:
                save_prescription(
                    appointment_id=appointment.id,
                    doctor=doctor,
                    diagnosis=form.cleaned_data['diagnosis'],
                    medications=form.cleaned_data['medications'],
                    tests_recommended=form.cleaned_data.get('tests_recommended', ''),
                    advice=form.cleaned_data.get('advice', ''),
                    follow_up_date=form.cleaned_data.get('follow_up_date'),
                    snomed_diagnosis_code=form.cleaned_data.get('snomed_diagnosis_code'),
                    snomed_diagnosis_display=form.cleaned_data.get('snomed_diagnosis_display')
                )
                messages.success(request, 'Prescription saved and appointment marked completed.')
                return redirect('doctor:appointments')
            except Exception as e:
                messages.error(request, str(e))
    else:
        form = AppointmentPrescriptionForm(instance=prescription, appointment=appointment)

    return render(request, 'doctor/prescription_form.html', {
        'doctor': doctor,
        'appointment': appointment,
        'form': form,
        'is_edit': prescription is not None,
    })

@doctor_required
def view_prescription(request, appointment_id):
    """View prescription for a completed appointment (read-only mode)"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'Doctor profile not found.')
        return redirect('universal_login')
    
    appointment = get_object_or_404(Appointment, id=appointment_id, doctor=doctor)
    
    if appointment.status != 'completed':
        messages.error(request, 'This appointment is not completed yet.')
        return redirect('doctor:appointments')
    
    prescription = getattr(appointment, 'prescription', None)
    if not prescription:
        messages.error(request, 'No prescription found for this appointment.')
        return redirect('doctor:appointments')
    
    return render(request, 'doctor/view_prescription.html', {
        'doctor': doctor,
        'appointment': appointment,
        'prescription': prescription,
    })

@doctor_required
def doctor_calendar(request):
    """Doctor calendar view - shows appointments in calendar format"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'Doctor profile not found.')
        return redirect('universal_login')
    
    try:
        appointments = Appointment.objects.filter(doctor=doctor).order_by('appointment_date', 'appointment_time')
        appointments_data = []
        for appointment in appointments:
            try:
                color_map = {
                    'accepted': '#1e3a8a',
                    'pending': '#1e40af', 
                    'completed': '#28a745',
                    'rejected': '#dc3545',
                    'cancelled': '#6c757d'
                }
                start_datetime = datetime.combine(appointment.appointment_date, appointment.appointment_time)
                end_datetime = start_datetime + timedelta(minutes=30)
                
                appointments_data.append({
                    'id': appointment.id,
                    'title': f"{appointment.patient.full_name} ({appointment.appointment_time.strftime('%I:%M %p')})",
                    'start': start_datetime.isoformat(),
                    'end': end_datetime.isoformat(),
                    'color': color_map.get(appointment.status, '#6c757d'),
                    'textColor': 'white',
                    'extendedProps': {
                        'status': appointment.status,
                        'patient_name': appointment.patient.full_name,
                        'symptoms': appointment.symptoms or 'No symptoms listed',
                        'contact': getattr(appointment.patient.user, 'contact_number', 'N/A') if hasattr(appointment.patient, 'user') else 'N/A'
                    }
                })
            except Exception as e:
                continue
        
        context = {
            'doctor': doctor,
            'appointments': appointments,
            'appointments_json': json.dumps(appointments_data),
            'current_month': date.today(),
        }
        return render(request, 'doctor/calendar.html', context)
        
    except Exception as e:
        messages.error(request, f'Error loading calendar: {str(e)}')
        return render(request, 'doctor/calendar.html', {'doctor': doctor, 'appointments': [], 'appointments_json': '[]'})
