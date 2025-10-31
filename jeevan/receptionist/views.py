from .models import Receptionist
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Q, Count
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone
from datetime import datetime, timedelta
import json
from .forms import ReceptionistProfileForm, ReceptionistLoginForm, ReceptionistChangePasswordForm, ReceptionistBookAppointmentForm
from care.models import CustomUser, Hospital
from appointments.models import Appointment
from doctor.models import Doctor


def receptionist_login(request):
    """Receptionist login view"""
    if request.user.is_authenticated and hasattr(request.user, 'receptionist'):
        return redirect('receptionist:dashboard')
    
    if request.method == 'POST':
        form = ReceptionistLoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            
            if user and hasattr(user, 'receptionist'):
                login(request, user)
                messages.success(request, f'Welcome back, {user.receptionist.full_name}!')
                return redirect('receptionist:dashboard')
            else:
                messages.error(request, 'Invalid credentials or not a receptionist account.')
    else:
        form = ReceptionistLoginForm()
    
    # Use the universal auth login template
    next_url = request.GET.get('next') or '/receptionist/'
    context = {
        'form': form,
        'next_url': next_url,
    }
    return render(request, 'universal_auth/login.html', context)

@login_required(login_url='/login/')
def receptionist_logout(request):
    """Secure receptionist logout view with proper security measures"""
    # Get user info before logout for logging
    user_name = request.user.get_full_name() or request.user.username if request.user.is_authenticated else 'Unknown'
    user_id = request.user.id if request.user.is_authenticated else None
    
    # Log the logout action for security audit
    import logging
    logger = logging.getLogger(__name__)
    logger.info(f'Receptionist logout: User {user_name} (ID: {user_id}) logged out from IP: {request.META.get("REMOTE_ADDR")}')
    
    # Clear all session data securely
    request.session.flush()
    
    # Logout user
    logout(request)
    
    # Create redirect response with logout parameter to trigger security measures
    response = redirect('/?logout=true')
    
    # Clear any remaining cookies for security
    response.delete_cookie('sessionid')
    response.delete_cookie('csrftoken')
    
    # Add cache prevention headers to prevent back button issues
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    response['X-Content-Type-Options'] = 'nosniff'
    response['X-Frame-Options'] = 'DENY'
    response['X-XSS-Protection'] = '1; mode=block'
    
    # Show success message
    messages.success(request, 'You have been successfully logged out. Please login again to continue.')
    
    return response

@login_required(login_url='/login/')
def receptionist_dashboard(request):
    """Receptionist dashboard with appointments summary, doctor schedules, and charts"""
    # Verify user is authenticated
    if not request.user.is_authenticated:
        messages.error(request, 'Please login to access the dashboard.')
        return redirect('/login/')
    
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
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
    today = timezone.now().date()
    appointments = Appointment.objects.filter(doctor__hospital=receptionist.hospital).exclude(status='cancelled')
    
    # Dashboard statistics
    total_appointments = appointments.count()
    today_appointments = appointments.filter(appointment_date=today).count()
    pending_appointments = appointments.filter(status='pending').count()
    accepted_appointments = appointments.filter(status='accepted').count()
    rejected_appointments = appointments.filter(status='rejected').count()
    
    # Recent appointments
    recent_appointments = appointments.order_by('-created_at')[:5]
    
    # Upcoming appointments (next 7 days)
    upcoming_appointments = appointments.filter(
        appointment_date__gte=today,
        appointment_date__lte=today + timedelta(days=7)
    ).order_by('appointment_date', 'appointment_time')[:10]
    
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

@login_required(login_url='/login/')
def receptionist_profile(request):
    """Receptionist profile view - allows editing profile"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
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

@login_required(login_url='/login/')
def appointment_list(request):
    """Appointment list with accept/reject functionality"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
    try:
        receptionist = request.user.receptionist
        if not receptionist:
            messages.error(request, 'Receptionist profile not found. Please contact administrator.')
            return redirect('/login/')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return redirect('/login/')
    
    # Mark expired appointments: accepted appointments that have passed their scheduled date and time
    from datetime import date, datetime
    # Use system local time for date and time comparisons (appointments are stored in local time)
    today = date.today()  # This uses local date
    # Get system local time (not Django's timezone-aware time, since TimeField doesn't have timezone)
    now_local = datetime.now()  # Uses system's local timezone
    current_time = now_local.time()  # Get local time for comparison
    
    # Find accepted appointments that have expired
    # An appointment is expired if:
    # 1. appointment_date < today, OR
    # 2. appointment_date == today AND appointment_time < current_time
    accepted_appointments = Appointment.objects.filter(
        Q(doctor__hospital=receptionist.hospital) | Q(hospital=receptionist.hospital),
        status='accepted'
    )
    
    # Mark appointments with date < today as expired (bulk update for efficiency)
    expired_past_date = accepted_appointments.filter(appointment_date__lt=today)
    expired_past_date.update(status='expired')
    
    # For today's accepted appointments, check if time has passed
    today_accepted = accepted_appointments.filter(appointment_date=today)
    for appointment in today_accepted:
        # Mark as expired if the appointment time has passed or is exactly at current time
        if appointment.appointment_time <= current_time:
            appointment.status = 'expired'
            appointment.save(update_fields=['status'])
    
    # Mark rejected appointments: pending appointments that have passed their scheduled date and time
    # IMPORTANT: This ONLY affects appointments with status='pending' (no accept/reject action performed)
    # If an appointment is still pending when its scheduled date/time has passed, automatically mark as rejected
    pending_appointments = Appointment.objects.filter(
        Q(doctor__hospital=receptionist.hospital) | Q(hospital=receptionist.hospital),
        status='pending'  # Only process appointments that haven't been accepted or rejected yet
    )
    
    # Mark pending appointments with date < today as rejected (bulk update for efficiency)
    # These are appointments from previous days that were never accepted/rejected
    rejected_past_date = pending_appointments.filter(appointment_date__lt=today)
    rejected_past_date.update(status='rejected')
    
    # For today's pending appointments, check if scheduled time has passed
    # Re-query to get fresh pending appointments for today (in case some were updated above)
    # This ensures we only check appointments that are still pending (no action performed)
    today_pending_appointments = Appointment.objects.filter(
        Q(doctor__hospital=receptionist.hospital) | Q(hospital=receptionist.hospital),
        status='pending',  # Still checking only pending appointments
        appointment_date=today
    )
    
    for appointment in today_pending_appointments:
        # Mark as rejected if the appointment time has passed or is exactly at current time
        # Only pending appointments without any action (accept/reject) will reach here
        if appointment.appointment_time <= current_time:
            # Scheduled time has passed without any action, mark as rejected
            appointment.status = 'rejected'
            appointment.save(update_fields=['status'])
    
    # Get appointments for the receptionist's hospital (exclude cancelled)
    appointments = Appointment.objects.filter(
        Q(doctor__hospital=receptionist.hospital) | Q(hospital=receptionist.hospital)
    ).exclude(status='cancelled').order_by('-created_at')
    
    # Filter by specific patient if provided
    patient_filter = request.GET.get('patient')
    patient = None
    if patient_filter:
        try:
            from patient.models import Patient
            patient = Patient.objects.get(id=patient_filter)
            appointments = appointments.filter(patient=patient)
        except Patient.DoesNotExist:
            messages.error(request, 'Patient not found.')
            return redirect('receptionist:appointments')
    
    # Filter by status if provided (default: show all appointments)
    status_filter = request.GET.get('status', '')
    if status_filter:
        appointments = appointments.filter(status=status_filter)
    
    # Filter by date if provided
    date_filter = request.GET.get('date', '')
    if date_filter:
        appointments = appointments.filter(appointment_date=date_filter)
    
    context = {
        'receptionist': receptionist,
        'appointments': appointments,
        'status_filter': status_filter,
        'date_filter': date_filter,
        'patient_filter': patient_filter,
        'patient': patient,
    }
    
    return render(request, 'receptionist/appointment_list.html', context)

@login_required(login_url='/login/')
def appointment_action(request, appointment_id, action):
    """Accept or reject appointment"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        return JsonResponse({'error': 'You are not authorized to perform this action.'}, status=403)
    
    try:
        receptionist = request.user.receptionist
    except Receptionist.DoesNotExist:
        return JsonResponse({'error': 'Receptionist profile not linked to this user.'}, status=400)
    
    try:
        # Fetch only if appointment belongs to receptionist's hospital
        appointment = Appointment.objects.get(id=appointment_id, doctor__hospital=receptionist.hospital)
        print(f"Found appointment: {appointment.id}, status: {appointment.status}")
    except Appointment.DoesNotExist:
        return JsonResponse({'error': 'Appointment not found for your hospital.'}, status=404)
    
    # Check if appointment can be modified
    if appointment.status not in ['pending']:
        return JsonResponse({'error': f'Appointment is already {appointment.status} and cannot be modified.'}, status=400)
    
    print(f"Processing action: {action}")
    
    if action == 'accept':
        appointment.status = 'accepted'
        appointment.rejection_reason = None  # Clear any previous rejection reason
        appointment.save()
        
        # Log the action
        print(f"Appointment {appointment_id} accepted by receptionist {receptionist.full_name}")
        
        return JsonResponse({
            'success': True, 
            'message': f'Appointment with {appointment.patient.full_name} has been accepted for {appointment.appointment_date} at {appointment.appointment_time}.',
            'new_status': 'accepted',
            'appointment_id': appointment_id
        })
    elif action == 'reject':
        # Get rejection reason from request
        rejection_reason = request.POST.get('rejection_reason', '').strip()
        
        if not rejection_reason:
            return JsonResponse({'error': 'Rejection reason is required.'}, status=400)
        
        appointment.status = 'rejected'
        appointment.rejection_reason = rejection_reason
        appointment.save()
        
        # Log the action
        print(f"Appointment {appointment_id} rejected by receptionist {receptionist.full_name}. Reason: {rejection_reason}")
        
        return JsonResponse({
            'success': True, 
            'message': f'Appointment with {appointment.patient.full_name} has been rejected. Reason: {rejection_reason}',
            'new_status': 'rejected',
            'appointment_id': appointment_id,
            'rejection_reason': rejection_reason
        })
    else:
        print(f"Invalid action: {action}")
        return JsonResponse({'error': 'Invalid action. Use "accept" or "reject".'}, status=400)

@login_required(login_url='/login/')
def doctor_availability(request):
    """Doctor availability management for receptionists"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
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
        date_filter = date.today().strftime('%Y-%m-%d')
    
    selected_date = date.fromisoformat(date_filter)
    
    # Validate that the selected date is not in the past
    today = date.today()
    if selected_date < today:
        messages.warning(request, 'Cannot view availability for past dates. Showing today\'s availability.')
        date_filter = today.strftime('%Y-%m-%d')
        selected_date = today
    
    if doctor_id:
        selected_doctor = get_object_or_404(Doctor, id=doctor_id, hospital=receptionist.hospital)
        
        # Debug: Check all appointments for this doctor on this date
        all_appointments = Appointment.objects.filter(
            doctor=selected_doctor,
            appointment_date=selected_date
        ).exclude(status='cancelled')
        
        print(f"\n=== DEBUG INFO ===")
        print(f"Doctor: {selected_doctor.full_name}")
        print(f"Date: {selected_date}")
        print(f"Status Filter: {status_filter}")
        print(f"Total appointments found: {all_appointments.count()}")
        
        for apt in all_appointments:
            print(f"  - {apt.patient.full_name} at {apt.appointment_time} (Status: {apt.status})")
        print(f"==================\n")
        
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
    """Generate hourly availability data for a doctor on a specific date"""
    from datetime import time, datetime, timedelta
    
    # Define working hours (9 AM to 6 PM)
    start_time = time(9, 0)   # 9:00 AM
    end_time = time(18, 0)     # 6:00 PM
    
    # Generate hourly slots
    availability_slots = []
    current_time = datetime.combine(selected_date, start_time)
    end_datetime = datetime.combine(selected_date, end_time)
    
    while current_time < end_datetime:
        slot_time = current_time.time()
        slot_datetime = current_time
        next_slot_time = (current_time + timedelta(hours=1)).time()
        
        # Check if doctor has appointments in this hour
        appointments_in_slot = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=selected_date,
            appointment_time__hour=slot_time.hour
        ).exclude(status='cancelled')
        
        # Debug: Print appointment details
        print(f"Checking slot {slot_time} for doctor {doctor.full_name}")
        print(f"Found {appointments_in_slot.count()} appointments")
        for apt in appointments_in_slot:
            print(f"  - Appointment: {apt.patient.full_name} at {apt.appointment_time}")
        
        if appointments_in_slot.exists():
            # Doctor is busy in this slot
            appointment = appointments_in_slot.first()
            slot_status = 'busy'
            slot_class = 'danger'
            slot_text = f'Busy - {appointment.patient.full_name}'
            slot_details = {
                'appointment': appointment,
                'patient_name': appointment.patient.full_name,
                'symptoms': appointment.symptoms,
                'status': appointment.status,
                'appointment_time': appointment.appointment_time.strftime('%I:%M %p'),
            }
            print(f"  -> Slot marked as BUSY")
        else:
            # Doctor is available in this slot
            slot_status = 'available'
            slot_class = 'success'
            slot_text = 'Available'
            slot_details = None
            print(f"  -> Slot marked as AVAILABLE")
        
        # Apply status filter
        print(f"Filtering: status_filter='{status_filter}', slot_status='{slot_status}'")
        if status_filter == 'all' or slot_status == status_filter:
            print(f"  -> Adding slot to results")
            availability_slots.append({
                'time': slot_time,
                'time_display': slot_time.strftime('%I:%M %p'),
                'time_range': f"{slot_time.strftime('%I:%M %p')} - {next_slot_time.strftime('%I:%M %p')}",
                'datetime': slot_datetime,
                'status': slot_status,
                'class': slot_class,
                'text': slot_text,
                'details': slot_details,
            })
        else:
            print(f"  -> Filtering out slot")
        
        current_time += timedelta(hours=1)
    
    return availability_slots

@login_required(login_url='/login/')
def doctor_schedule_manage(request):
    """Doctor schedule management for receptionists"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
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
            today = date.today()
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

@login_required(login_url='/login/')
def receptionist_change_password(request):
    """Receptionist change password view"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
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
                
                # Update receptionist password field as well
                from django.contrib.auth.hashers import make_password
                receptionist.password = make_password(new_password)
                receptionist.save()
                
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


@login_required(login_url='/login/')
def receptionist_book_appointment(request):
    """Receptionist book appointment view"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
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
    
    if request.method == 'POST':
        form = ReceptionistBookAppointmentForm(request.POST, hospital=receptionist.hospital)
        if form.is_valid():
            try:
                # Create or get patient user
                patient_data = form.cleaned_data
                
                # Check if patient already exists by email or contact number
                patient_user = None
                created = False
                
                email = patient_data.get('email', '')
                contact_number = patient_data.get('contact_number', '')
                
                # First, try to find by email (if provided)
                if email:
                    try:
                        patient_user = CustomUser.objects.get(email=email)
                        created = False
                    except CustomUser.DoesNotExist:
                        pass
                
                # If not found by email and contact number is provided, check by contact number
                if not patient_user and contact_number:
                    try:
                        existing_user = CustomUser.objects.get(contact_number=contact_number)
                        # If contact number exists but email is different, show error
                        if email and existing_user.email != email:
                            messages.error(request, f'A user with contact number {contact_number} already exists with a different email address.')
                            return render(request, 'receptionist/book_appointment.html', {
                                'form': form,
                                'receptionist': receptionist,
                                'doctors': doctors
                            })
                        else:
                            patient_user = existing_user
                            created = False
                    except CustomUser.DoesNotExist:
                        pass
                
                # If no existing user found, create new user
                if not patient_user:
                    # Generate username if email not provided
                    username = email if email else f"patient_{patient_data['patient_name'].replace(' ', '_').lower()}_{contact_number}"
                    
                    patient_user = CustomUser.objects.create(
                        username=username,
                        email=email if email else None,
                        full_name=patient_data['patient_name'],
                        contact_number=contact_number if contact_number else None,
                        role='patient'
                    )
                    created = True
                
                if not created:
                    # Update existing patient information
                    patient_user.full_name = patient_data['patient_name']
                    # Only update contact number if it's different and not already used
                    if patient_user.contact_number != patient_data['contact_number']:
                        try:
                            patient_user.contact_number = patient_data['contact_number']
                            patient_user.save()
                        except Exception as e:
                            messages.error(request, f'Contact number {patient_data["contact_number"]} is already in use by another user.')
                            return render(request, 'receptionist/book_appointment.html', {
                                'form': form,
                                'receptionist': receptionist,
                                'doctors': doctors
                            })
                    else:
                        patient_user.save()
                
                # Create patient profile if it doesn't exist
                from patient.models import Patient
                patient_profile, profile_created = Patient.objects.get_or_create(
                    user=patient_user,
                    defaults={
                        'full_name': patient_data['patient_name'],
                        'email': email if email else None,
                        'contact_number': contact_number if contact_number else None,
                        'gender': patient_data['gender'],
                        'dob': patient_data['date_of_birth'],
                        'date_of_birth': patient_data['date_of_birth'],
                        'address': patient_data['address'],
                        'city': patient_data['city'],
                        'pincode': patient_data['pincode'],
                        'blood_group': patient_data.get('blood_group', ''),
                        'emergency_number': patient_data['emergency_number'],
                        'existing_condition': patient_data.get('existing_condition', ''),
                        'allergies': patient_data.get('allergies', '')
                    }
                )
                
                if not profile_created:
                    # Update existing patient profile
                    patient_profile.full_name = patient_data['patient_name']
                    patient_profile.email = email if email else patient_profile.email
                    patient_profile.contact_number = contact_number if contact_number else patient_profile.contact_number
                    patient_profile.gender = patient_data['gender']
                    patient_profile.dob = patient_data['date_of_birth']
                    patient_profile.date_of_birth = patient_data['date_of_birth']
                    patient_profile.address = patient_data['address']
                    patient_profile.city = patient_data['city']
                    patient_profile.pincode = patient_data['pincode']
                    patient_profile.blood_group = patient_data.get('blood_group', '')
                    patient_profile.emergency_number = patient_data['emergency_number']
                    patient_profile.existing_condition = patient_data.get('existing_condition', '')
                    patient_profile.allergies = patient_data.get('allergies', '')
                    
                    patient_profile.save()
                
                # Create appointment
                appointment = Appointment.objects.create(
                    patient=patient_profile,
                    doctor=patient_data['doctor'],
                    hospital=receptionist.hospital,  # Add hospital field
                    appointment_date=patient_data['appointment_date'],
                    appointment_time=patient_data['appointment_time'],
                    symptoms=patient_data.get('symptoms', ''),
                    status='pending',
                    payment_mode='offline'  # Default to offline for receptionist bookings
                )
                
                messages.success(request, f'Appointment booked successfully! Appointment ID: {appointment.id}')
                return redirect('receptionist:appointments')
                
            except Exception as e:
                error_message = str(e)
                if 'UNIQUE constraint failed: care_customuser.contact_number' in error_message:
                    messages.error(request, 'This contact number is already registered with another user. Please use a different contact number.')
                elif 'UNIQUE constraint failed: care_customuser.email' in error_message:
                    messages.error(request, 'This email address is already registered. Please use a different email address.')
                
                else:
                    messages.error(request, f'Error booking appointment: {error_message}')
                
                return render(request, 'receptionist/book_appointment.html', {
                    'form': form,
                    'receptionist': receptionist,
                    'doctors': doctors
                })
    else:
        form = ReceptionistBookAppointmentForm(hospital=receptionist.hospital)
    
    context = {
        'receptionist': receptionist,
        'form': form,
        'doctors': doctors,
    }
    return render(request, 'receptionist/book_appointment.html', context)


@login_required(login_url='/login/')
def receptionist_patient_list(request):
    """Show list of patients registered by the receptionist"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
    try:
        receptionist = request.user.receptionist
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not linked to this user. Please contact admin.')
        return redirect('receptionist:login')
    
    # Patients who have appointments within this hospital
    from patient.models import Patient
    all_patients = Patient.objects.filter(
        appointments__doctor__hospital=receptionist.hospital
    ).distinct().order_by('-user__date_joined')
    
    context = {
        'receptionist': receptionist,
        'patients': all_patients,
    }
    return render(request, 'receptionist/patient_list.html', context)


@login_required(login_url='/login/')
def receptionist_register_patient(request):
    """Register a new patient by receptionist"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
    try:
        receptionist = Receptionist.objects.get(user=request.user)
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not linked to this user. Please contact admin.')
        return redirect('receptionist:login')
    
    from .patient_forms import ReceptionistPatientRegistrationForm
    
    if request.method == 'POST':
        form = ReceptionistPatientRegistrationForm(request.POST)
        if form.is_valid():
            try:
                # Create or get patient user
                patient_data = form.cleaned_data
                
                # Check if patient already exists by email or contact number
                patient_user = None
                created = False
                
                email = patient_data.get('email', '')
                contact_number = patient_data.get('contact_number', '')
                
                # First, try to find by email (if provided)
                if email:
                    try:
                        patient_user = CustomUser.objects.get(email=email)
                        created = False
                    except CustomUser.DoesNotExist:
                        pass
                
                # If not found by email and contact number is provided, check by contact number
                if not patient_user and contact_number:
                    try:
                        existing_user = CustomUser.objects.get(contact_number=contact_number)
                        # If contact number exists but email is different, show error
                        if email and existing_user.email != email:
                            messages.error(request, f'A user with contact number {contact_number} already exists with a different email address.')
                            return render(request, 'receptionist/register_patient.html', {
                                'form': form,
                                'receptionist': receptionist
                            })
                        else:
                            patient_user = existing_user
                            created = False
                    except CustomUser.DoesNotExist:
                        pass
                
                # If no existing user found, create new user
                if not patient_user:
                    username = patient_data['username']
                    password = patient_data['password']
                    full_name = f"{patient_data['first_name']} {patient_data['last_name']}"
                    
                    patient_user = CustomUser.objects.create(
                        username=username,
                        email=email,
                        full_name=full_name,
                        contact_number=contact_number,
                        role='patient'
                    )
                    patient_user.set_password(password)
                    patient_user.save()
                    created = True
                
                if not created:
                    # Update existing patient information
                    patient_user.full_name = patient_data['full_name']
                    # Only update contact number if it's different and not already used
                    if patient_user.contact_number != patient_data['contact_number']:
                        try:
                            patient_user.contact_number = patient_data['contact_number']
                            patient_user.save()
                        except Exception as e:
                            messages.error(request, f'Contact number {patient_data["contact_number"]} is already in use by another user.')
                            return render(request, 'receptionist/register_patient.html', {
                                'form': form,
                                'receptionist': receptionist
                            })
                    else:
                        patient_user.save()
                
                # Create patient profile if it doesn't exist
                from patient.models import Patient
                full_name = f"{patient_data['first_name']} {patient_data['last_name']}"
                patient_profile, profile_created = Patient.objects.get_or_create(
                    user=patient_user,
                    defaults={
                        'full_name': full_name,
                        'email': email,
                        'contact_number': contact_number,
                        'gender': patient_data['gender'],
                        'dob': patient_data['dob'],
                        'date_of_birth': patient_data['dob'],
                        'address': patient_data['address'],
                        'city': patient_data['city'],
                        'pincode': patient_data['pincode'],
                        'password': patient_data['password']  # Store password in patient model
                    }
                )
                
                if not profile_created:
                    # Update existing patient profile
                    full_name = f"{patient_data['first_name']} {patient_data['last_name']}"
                    patient_profile.full_name = full_name
                    patient_profile.email = email
                    patient_profile.contact_number = contact_number
                    patient_profile.gender = patient_data['gender']
                    patient_profile.dob = patient_data['dob']
                    patient_profile.date_of_birth = patient_data['dob']
                    patient_profile.address = patient_data['address']
                    patient_profile.city = patient_data['city']
                    patient_profile.pincode = patient_data['pincode']
                    patient_profile.password = patient_data['password']
                    patient_profile.save()
                
                messages.success(request, f'Patient {patient_profile.full_name} registered successfully!')
                return redirect('receptionist:patient_list')
                
            except Exception as e:
                error_message = str(e)
                if 'UNIQUE constraint failed: care_customuser.contact_number' in error_message:
                    messages.error(request, 'This contact number is already registered with another user. Please use a different contact number.')
                elif 'UNIQUE constraint failed: care_customuser.email' in error_message:
                    messages.error(request, 'This email address is already registered. Please use a different email address.')
                else:
                    messages.error(request, f'Error registering patient: {error_message}')
                
                return render(request, 'receptionist/register_patient.html', {
                    'form': form,
                    'receptionist': receptionist
                })
    else:
        form = ReceptionistPatientRegistrationForm()
    
    context = {
        'receptionist': receptionist,
        'form': form,
    }
    return render(request, 'receptionist/register_patient.html', context)


@login_required(login_url='/login/')
def receptionist_book_appointment_for_patient(request, patient_id):
    """Book appointment for a specific patient"""
    # Verify user has receptionist role
    if not hasattr(request.user, 'role') or request.user.role != 'receptionist':
        messages.error(request, 'You are not authorized to access this page.')
        return redirect('/login/')
    
    try:
        receptionist = request.user.receptionist
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found for your account.')
        return redirect('receptionist:login')
    
    # Get the patient
    from patient.models import Patient
    try:
        patient = Patient.objects.get(id=patient_id)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient not found.')
        return redirect('receptionist:patient_list')
    
    # Get doctors from the same hospital
    doctors = Doctor.objects.filter(hospital=receptionist.hospital)
    
    if request.method == 'POST':
        from .patient_forms import SimpleAppointmentBookingForm
        form = SimpleAppointmentBookingForm(request.POST, hospital=receptionist.hospital)
        if form.is_valid():
            try:
                # Create appointment
                appointment = Appointment.objects.create(
                    patient=patient,
                    doctor=form.cleaned_data['doctor'],
                    hospital=receptionist.hospital,
                    appointment_date=form.cleaned_data['appointment_date'],
                    appointment_time=form.cleaned_data['appointment_time'],
                    symptoms=form.cleaned_data.get('symptoms', ''),
                    status='pending',
                    payment_mode='offline',  # Default to offline for receptionist bookings
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