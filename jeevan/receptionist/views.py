from .models import Receptionist
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from jeevan.decorators import receptionist_required, log_audit_event
from django.db import transaction, IntegrityError
from django.db.models import Q, Count
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.utils.dateparse import parse_date
from django.utils import timezone
from datetime import datetime, timedelta
import json
from .forms import ReceptionistProfileForm, ReceptionistLoginForm, ReceptionistChangePasswordForm, ReceptionistBookAppointmentForm
from care.models import CustomUser, Hospital
from appointments.models import Appointment
from doctor.models import Doctor


def filter_date(value):
    try:
        return parse_date(value)
    except ValueError:
        return None


@receptionist_required
def receptionist_dashboard(request):
    """Receptionist dashboard with appointments summary, doctor schedules, and charts"""
    # Get the logged-in receptionist
    try:
        receptionist = request.user.receptionist
        if not receptionist:
            messages.error(request, 'Receptionist profile not found. Please contact administrator.')
            return redirect('/login/')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found. Please contact administrator.')
        return redirect('/login/')
    
    # Get appointments for the receptionist's hospital (exclude cancelled)
    today = timezone.localdate()
    appointments = Appointment.objects.select_related('doctor', 'patient', 'hospital').filter(doctor__hospital=receptionist.hospital).exclude(status='cancelled')
    
    # Dashboard statistics
    total_appointments = appointments.count()
    today_appointments = appointments.filter(appointment_date=today).count()
    pending_appointments = appointments.filter(status='pending').count()
    accepted_appointments = appointments.filter(status='accepted').count()
    rejected_appointments = appointments.filter(status='rejected').count()
    
    # Recent appointments
    recent_appointments = appointments.order_by('-created_at')[:5]
    
    # Upcoming appointments (next 7 days)
    now = timezone.localtime()
    upcoming_appointments = appointments.filter(
        appointment_date__gte=today,
        appointment_date__lte=today + timedelta(days=7),
        status__in=['pending', 'accepted'],
    ).filter(Q(appointment_date__gt=today) | Q(appointment_date=today, appointment_time__gte=now.time())).order_by('appointment_date', 'appointment_time')[:10]
    
    # Doctor schedules for today - only show doctors who have appointments today
    doctors_with_appointments = Doctor.objects.filter(
        hospital=receptionist.hospital,
        appointments__appointment_date=today,
        appointments__status__in=['pending', 'accepted', 'rejected', 'completed']
    ).distinct()
    
    doctor_schedules = []
    for doctor in doctors_with_appointments:
        doctor_appointments = appointments.filter(
            doctor=doctor,
            appointment_date=today
        ).order_by('appointment_time')
        doctor_schedules.append({
            'doctor': doctor,
            'appointments': doctor_appointments
        })
    
    # Chart data for appointments by status
    status_data = appointments.values('status').annotate(count=Count('id'))
    chart_data = {
        'labels': [item['status'].title() for item in status_data],
        'data': [item['count'] for item in status_data]
    }
    
    # Chart data for appointments by date (next 7 days from current date)
    date_data = []
    next_7_days_labels = []
    next_7_days_counts = []
    for i in range(7):
        date = today + timedelta(days=i)
        count = appointments.filter(appointment_date=date).count()
        date_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'count': count
        })
        next_7_days_labels.append(date.strftime('%b %d'))
        next_7_days_counts.append(count)
    
    context = {
        'receptionist': receptionist,
        'total_appointments': total_appointments,
        'today_appointments': today_appointments,
        'pending_appointments': pending_appointments,
        'accepted_appointments': accepted_appointments,
        'rejected_appointments': rejected_appointments,
        'recent_appointments': recent_appointments,
        'upcoming_appointments': upcoming_appointments,
        'doctor_schedules': doctor_schedules,
        'chart_data': json.dumps(chart_data),
        'date_data': json.dumps(date_data),
        'next_7_days_labels': next_7_days_labels,
        'next_7_days_counts': next_7_days_counts
    }
    
    response = render(request, 'receptionist/dashboard.html', context)
    
    # Add cache prevention headers to prevent back button issues after logout
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    response['X-Content-Type-Options'] = 'nosniff'
    response['X-Frame-Options'] = 'DENY'
    response['X-XSS-Protection'] = '1; mode=block'
    
    return response

@receptionist_required
def receptionist_profile(request):
    """Receptionist profile view - allows editing profile"""
    try:
        receptionist = request.user.receptionist
        if not receptionist:
            messages.error(request, 'Receptionist profile not found. Please contact administrator.')
            return redirect('/login/')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return redirect('receptionist:dashboard')
    
    if request.method == 'POST':
        form = ReceptionistProfileForm(request.POST, request.FILES, instance=receptionist)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('receptionist:profile')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = ReceptionistProfileForm(instance=receptionist)
    
    context = {
        'receptionist': receptionist,
        'form': form,
    }
    return render(request, 'receptionist/profile.html', context)

@receptionist_required
def appointment_list(request):
    """Appointment list with accept/reject functionality"""
    try:
        receptionist = request.user.receptionist
        if not receptionist:
            messages.error(request, 'Receptionist profile not found. Please contact administrator.')
            return redirect('/login/')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return redirect('/login/')
    
    # Opening a list must not expire accepted visits or reject pending requests.
    # Staff may need to finish a consultation after its scheduled start time.

    # Get appointments for the receptionist's hospital (exclude cancelled)
    appointments = Appointment.objects.select_related('doctor', 'patient', 'hospital').filter(
        Q(doctor__hospital=receptionist.hospital) | Q(hospital=receptionist.hospital)
    ).exclude(status='cancelled').order_by('-created_at')
    
    # Filter by specific patient if provided
    patient_filter = request.GET.get('patient')
    patient = None
    if patient_filter:
        try:
            from patient.models import Patient
            patient = Patient.objects.filter(associated_hospitals=receptionist.hospital).get(id=patient_filter)
            appointments = appointments.filter(patient=patient)
        except (Patient.DoesNotExist, ValueError, OverflowError):
            messages.error(request, 'Patient not found.')
            return redirect('receptionist:appointments')
    
    # Filter by status if provided (default: show all appointments)
    status_filter = request.GET.get('status', '')
    if status_filter:
        appointments = appointments.filter(status=status_filter)
    
    # Filter by date if provided
    date_filter = request.GET.get('date', '')
    if date_filter:
        selected_date = filter_date(date_filter)
        if selected_date is None:
            return JsonResponse({'error': 'Enter a valid date in YYYY-MM-DD format.'}, status=400)
        appointments = appointments.filter(appointment_date=selected_date)
    
    context = {
        'receptionist': receptionist,
        'appointments': appointments,
        'status_filter': status_filter,
        'date_filter': date_filter,
        'patient_filter': patient_filter,
        'patient': patient,
    }
    
    return render(request, 'receptionist/appointment_list.html', context)

@receptionist_required
@require_POST
def appointment_action(request, appointment_id, action):
    """Accept or reject appointment"""
    try:
        receptionist = request.user.receptionist
    except Receptionist.DoesNotExist:
        return JsonResponse({'error': 'Receptionist profile not linked to this user.'}, status=400)
    
    try:
        # Fetch only if appointment belongs to receptionist's hospital
        appointment = Appointment.objects.get(id=appointment_id, doctor__hospital=receptionist.hospital)
        pass  # Sensitive request data is not logged.
    except Appointment.DoesNotExist:
        return JsonResponse({'error': 'Appointment not found for your hospital.'}, status=404)
    
    try:
        from appointments.services import update_appointment_status
        if action == 'accept':
            appointment = update_appointment_status(
                appointment_id=appointment_id,
                new_status='accepted',
                actor=request.user
            )
            return JsonResponse({
                'success': True, 
                'message': f'Appointment with {appointment.patient.full_name} has been accepted for {appointment.appointment_date} at {appointment.appointment_time}.',
                'new_status': 'accepted',
                'appointment_id': appointment_id
            })
        elif action == 'reject':
            rejection_reason = request.POST.get('rejection_reason', '').strip()
            if not rejection_reason:
                return JsonResponse({'error': 'Rejection reason is required.'}, status=400)
                
            appointment = update_appointment_status(
                appointment_id=appointment_id,
                new_status='rejected',
                actor=request.user,
                reason=rejection_reason
            )
            return JsonResponse({
                'success': True, 
                'message': f'Appointment with {appointment.patient.full_name} has been rejected. Reason: {rejection_reason}',
                'new_status': 'rejected',
                'appointment_id': appointment_id,
                'rejection_reason': rejection_reason
            })
        else:
            return JsonResponse({'error': 'Invalid action. Use "accept" or "reject".'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@receptionist_required
def doctor_availability(request):
    """Doctor availability management for receptionists"""
    try:
        receptionist = request.user.receptionist
        if not receptionist:
            messages.error(request, 'Receptionist profile not found. Please contact administrator.')
            return redirect('/login/')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return redirect('/login/')
    
    # Get doctors from the same hospital
    doctors = Doctor.objects.filter(hospital=receptionist.hospital, is_active=True)
    
    # Get filters
    doctor_id = request.GET.get('doctor_id')
    date_filter = request.GET.get('date')
    status_filter = request.GET.get('status', 'all')  # all, available, busy
    
    selected_doctor = None
    availability_data = []
    
    # Default to today if no date provided
    from datetime import date, timedelta
    if not date_filter:
        date_filter = timezone.localdate().strftime('%Y-%m-%d')
    
    selected_date = filter_date(date_filter)
    if selected_date is None:
        return JsonResponse({'error': 'Enter a valid date in YYYY-MM-DD format.'}, status=400)
    
    # Validate that the selected date is not in the past
    today = timezone.localdate()
    if selected_date < today:
        messages.warning(request, 'Cannot view availability for past dates. Showing today\'s availability.')
        date_filter = today.strftime('%Y-%m-%d')
        selected_date = today
    
    if doctor_id:
        if not doctor_id.isascii() or not doctor_id.isdigit() or len(doctor_id) > 10:
            return JsonResponse({'error': 'Select a valid doctor.'}, status=400)
        selected_doctor = get_object_or_404(Doctor, id=doctor_id, hospital=receptionist.hospital)
        
        # Debug: Check all appointments for this doctor on this date
        all_appointments = Appointment.objects.filter(
            doctor=selected_doctor,
            appointment_date=selected_date
        ).exclude(status='cancelled')
        
        pass  # Sensitive request data is not logged.
        pass  # Sensitive request data is not logged.
        pass  # Sensitive request data is not logged.
        pass  # Sensitive request data is not logged.
        pass  # Sensitive request data is not logged.
        
        for apt in all_appointments:
            pass  # Sensitive request data is not logged.
        pass  # Sensitive request data is not logged.
        
        # Generate availability data for the selected date
        availability_data = generate_doctor_availability(selected_doctor, selected_date, status_filter)
    
    # Get all doctors availability summary for the date
    doctors_summary = []
    for doctor in doctors:
        doctor_appointments = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=selected_date
        ).exclude(status='cancelled')
        
        total_appointments = doctor_appointments.count()
        pending_appointments = doctor_appointments.filter(status='pending').count()
        accepted_appointments = doctor_appointments.filter(status='accepted').count()
        completed_appointments = doctor_appointments.filter(status='completed').count()
        
        # Calculate availability status
        if total_appointments == 0:
            availability_status = 'available'
            status_text = 'Available'
            status_class = 'success'
        elif pending_appointments > 0:
            availability_status = 'busy'
            status_text = 'Busy'
            status_class = 'warning'
        elif accepted_appointments > 0:
            availability_status = 'busy'
            status_text = 'Busy'
            status_class = 'warning'
        else:
            availability_status = 'available'
            status_text = 'Available'
            status_class = 'success'
        
        doctors_summary.append({
            'doctor': doctor,
            'total_appointments': total_appointments,
            'pending_appointments': pending_appointments,
            'accepted_appointments': accepted_appointments,
            'completed_appointments': completed_appointments,
            'availability_status': availability_status,
            'status_text': status_text,
            'status_class': status_class,
        })
    
    context = {
        'receptionist': receptionist,
        'doctors': doctors,
        'selected_doctor': selected_doctor,
        'availability_data': availability_data,
        'doctors_summary': doctors_summary,
        'date_filter': date_filter,
        'status_filter': status_filter,
        'selected_date': selected_date,
    }
    
    return render(request, 'receptionist/doctor_availability.html', context)

def generate_doctor_availability(doctor, selected_date, status_filter):
    from datetime import datetime, timedelta
    from appointments.scheduling import OPENING_TIME, CLOSING_TIME, SLOT_MINUTES, INACTIVE_STATUSES
    appointments = {appointment.appointment_time: appointment for appointment in
        Appointment.objects.filter(doctor=doctor, appointment_date=selected_date).exclude(status__in=INACTIVE_STATUSES)}
    current = datetime.combine(selected_date, OPENING_TIME)
    end = datetime.combine(selected_date, CLOSING_TIME)
    slots = []
    while current < end:
        appointment = appointments.get(current.time())
        status = 'busy' if appointment else 'available'
        next_slot = current + timedelta(minutes=SLOT_MINUTES)
        if status_filter == 'all' or status_filter == status:
            slots.append({'time': current.time(), 'time_display': current.strftime('%I:%M %p'),
                'time_range': f"{current.strftime('%I:%M %p')} - {next_slot.strftime('%I:%M %p')}",
                'datetime': current, 'status': status, 'class': 'danger' if appointment else 'success',
                'text': 'Busy' if appointment else 'Available',
                'details': {'appointment': appointment, 'patient_name': appointment.patient.full_name,
                    'symptoms': appointment.symptoms, 'status': appointment.status,
                    'appointment_time': current.strftime('%I:%M %p')} if appointment else None})
        current = next_slot
    return slots

@receptionist_required
def doctor_schedule_manage(request):
    """Doctor schedule management for receptionists"""
    try:
        receptionist = request.user.receptionist
        if not receptionist:
            messages.error(request, 'Receptionist profile not found. Please contact administrator.')
            return redirect('/login/')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return redirect('receptionist:dashboard')
    
    # Get doctors from the same hospital
    doctors = Doctor.objects.filter(hospital=receptionist.hospital)
    
    # Get appointments for the selected doctor
    doctor_id = request.GET.get('doctor_id')
    status_filter = request.GET.get('status')
    date_filter = request.GET.get('date')
    
    selected_doctor = None
    appointments = []
    
    if doctor_id:
        selected_doctor = get_object_or_404(Doctor, id=doctor_id, hospital=receptionist.hospital)
        # Show only accepted appointments in doctor schedule
        appointments = Appointment.objects.filter(doctor=selected_doctor, status='accepted')
        
        # Apply date filter if provided, otherwise show today's appointments
        if date_filter:
            appointments = appointments.filter(appointment_date=date_filter)
        else:
            # Show today's appointments by default
            from datetime import date
            today = timezone.localdate()
            appointments = appointments.filter(appointment_date=today)
        
        appointments = appointments.order_by('appointment_date', 'appointment_time')
    
    context = {
        'receptionist': receptionist,
        'doctors': doctors,
        'selected_doctor': selected_doctor,
        'appointments': appointments,
        'status_filter': status_filter,
        'date_filter': date_filter,
    }
    
    return render(request, 'receptionist/doctor_schedule.html', context)

@receptionist_required
def receptionist_change_password(request):
    """Receptionist change password view"""
    try:
        receptionist = request.user.receptionist
        if not receptionist:
            messages.error(request, 'Receptionist profile not found. Please contact administrator.')
            return redirect('/login/')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return redirect('receptionist:dashboard')
    
    if request.method == 'POST':
        form = ReceptionistChangePasswordForm(request.POST)
        if form.is_valid():
            current_password = form.cleaned_data['current_password']
            new_password = form.cleaned_data['new_password']
            
            # Check current password
            if receptionist.user.check_password(current_password):
                # Set new password
                receptionist.user.set_password(new_password)
                receptionist.user.save()
                
                messages.success(request, 'Password changed successfully! Please login again.')
                return redirect('receptionist:login')
            else:
                form.add_error('current_password', 'Current password is incorrect.')
    else:
        form = ReceptionistChangePasswordForm()
    
    context = {
        'receptionist': receptionist,
        'form': form,
    }
    return render(request, 'receptionist/change_password.html', context)


@receptionist_required
def receptionist_book_appointment(request):
    """Create a new walk-in profile and appointment in one transaction."""
    from .services import book_walkin_patient
    from django.core.exceptions import ValidationError, PermissionDenied
    receptionist = request.user.receptionist
    form = ReceptionistBookAppointmentForm(request.POST or None, hospital=receptionist.hospital)
    if request.method == 'POST' and form.is_valid():
        try:
            appointment = book_walkin_patient(receptionist, form.cleaned_data)
        except (ValidationError, PermissionDenied) as exc:
            form.add_error(None, ' '.join(getattr(exc, 'messages', [str(exc)])))
        except IntegrityError:
            form.add_error(None, 'These details are already registered. Use Patients to book an existing patient.')
        else:
            messages.success(request, f'Appointment requested successfully. Appointment ID: {appointment.pk}')
            return redirect('receptionist:appointments')
    return render(request, 'receptionist/book_appointment.html', {
        'form': form, 'receptionist': receptionist,
        'doctors': Doctor.objects.filter(hospital=receptionist.hospital, is_active=True),
    })


@receptionist_required
def receptionist_patient_list(request):
    """Show list of patients registered by the receptionist"""
    try:
        receptionist = request.user.receptionist
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not linked to this user. Please contact admin.')
        return redirect('receptionist:login')
    
    # Patients who are associated with this hospital (Tenant Isolation)
    from patient.models import Patient
    all_patients = Patient.objects.filter(
        associated_hospitals=receptionist.hospital
    ).distinct().order_by('-user__date_joined')
    
    context = {
        'receptionist': receptionist,
        'patients': all_patients,
    }
    return render(request, 'receptionist/patient_list.html', context)


@receptionist_required
def receptionist_register_patient(request):
    """Register a new portal patient without updating any existing account."""
    from .patient_forms import ReceptionistPatientRegistrationForm
    from .services import register_patient
    from django.core.exceptions import ValidationError, PermissionDenied
    receptionist = request.user.receptionist
    form = ReceptionistPatientRegistrationForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        try:
            patient = register_patient(receptionist, form.cleaned_data)
        except (ValidationError, PermissionDenied) as exc:
            form.add_error(None, ' '.join(getattr(exc, 'messages', [str(exc)])))
        except IntegrityError:
            form.add_error(None, 'An account already uses these details. No patient was created.')
        else:
            messages.success(request, f'Patient {patient.full_name} registered successfully!')
            return redirect('receptionist:patient_list')
    return render(request, 'receptionist/register_patient.html', {'form': form, 'receptionist': receptionist})


@receptionist_required
def receptionist_book_appointment_for_patient(request, patient_id):
    """Book appointment for a specific patient"""
    try:
        receptionist = request.user.receptionist
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found for your account.')
        return redirect('receptionist:login')
    
    # Get the patient
    from patient.models import Patient
    try:
        # Scope lookup to hospital bounds (Tenant Isolation)
        patient = Patient.objects.filter(
            id=patient_id,
            associated_hospitals=receptionist.hospital
        ).distinct().get()
    except Patient.DoesNotExist:
        messages.error(request, 'Patient not found or not authorized for your hospital.')
        return redirect('receptionist:patient_list')
    
    # Get doctors from the same hospital
    doctors = Doctor.objects.filter(hospital=receptionist.hospital)
    
    if request.method == 'POST':
        from .patient_forms import SimpleAppointmentBookingForm
        form = SimpleAppointmentBookingForm(request.POST, hospital=receptionist.hospital)
        if form.is_valid():
            try:
                # Create appointment using service
                from appointments.services import create_appointment
                appointment = create_appointment(
                    patient=patient,
                    doctor=form.cleaned_data['doctor'],
                    hospital=receptionist.hospital,
                    appointment_date=form.cleaned_data['appointment_date'],
                    appointment_time=form.cleaned_data['appointment_time'],
                    symptoms=form.cleaned_data.get('symptoms', ''),
                    payment_mode='cash',
                    status='pending',
                    actor=request.user
                )
                
                messages.success(request, f'Appointment booked successfully for {patient.full_name}! Appointment ID: {appointment.id}')
                return redirect('receptionist:patient_list')
                
            except Exception as e:
                messages.error(request, f'Error booking appointment: {str(e)}')
    else:
        from .patient_forms import SimpleAppointmentBookingForm
        form = SimpleAppointmentBookingForm(hospital=receptionist.hospital)
    
    context = {
        'receptionist': receptionist,
        'patient': patient,
        'form': form,
        'doctors': doctors,
    }
    return render(request, 'receptionist/book_appointment_for_patient.html', context)
