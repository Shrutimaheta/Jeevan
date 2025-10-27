from .models import Receptionist
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.http import JsonResponse
from django.db.models import Count, Q
from django.utils import timezone
from datetime import datetime, timedelta
import json
from .forms import ReceptionistProfileForm, ReceptionistLoginForm, ReceptionistChangePasswordForm
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
    
    return render(request, 'receptionist/login.html', {'form': form})

def receptionist_logout(request):
    """Receptionist logout view"""
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('receptionist:login')

def receptionist_dashboard(request):
    """Receptionist dashboard with appointments summary, doctor schedules, and charts"""
    # Get the first receptionist (Jinsy Rana) for demo purposes
    try:
        receptionist = Receptionist.objects.first()
        if not receptionist:
            messages.error(request, 'No receptionist found in the system.')
            return render(request, 'receptionist/login.html', {'form': ReceptionistLoginForm()})
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return render(request, 'receptionist/login.html', {'form': ReceptionistLoginForm()})
    
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
    
    # Chart data for appointments by date (last 7 days)
    date_data = []
    for i in range(7):
        date = today - timedelta(days=i)
        count = appointments.filter(appointment_date=date).count()
        date_data.append({
            'date': date.strftime('%Y-%m-%d'),
            'count': count
        })
    
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
        'date_data': json.dumps(date_data)
    }
    
    return render(request, 'receptionist/dashboard.html', context)

def receptionist_profile(request):
    """Receptionist profile view - allows editing profile"""
    try:
        receptionist = Receptionist.objects.first()
        if not receptionist:
            messages.error(request, 'No receptionist found in the system.')
            return redirect('receptionist:dashboard')
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

def appointment_list(request):
    """Appointment list with accept/reject functionality"""
    try:
        receptionist = Receptionist.objects.first()
        if not receptionist:
            messages.error(request, 'No receptionist found in the system.')
            return redirect('receptionist:dashboard')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return redirect('receptionist:dashboard')
    
    # Get appointments for the receptionist's hospital (exclude cancelled)
    appointments = Appointment.objects.filter(doctor__hospital=receptionist.hospital).exclude(status='cancelled').order_by('-created_at')
    
    # Filter by status if provided
    status_filter = request.GET.get('status')
    if status_filter:
        appointments = appointments.filter(status=status_filter)
    
    # Filter by date if provided
    date_filter = request.GET.get('date')
    if date_filter:
        appointments = appointments.filter(appointment_date=date_filter)
    
    context = {
        'receptionist': receptionist,
        'appointments': appointments,
        'status_filter': status_filter,
        'date_filter': date_filter,
    }
    
    return render(request, 'receptionist/appointment_list.html', context)

def appointment_action(request, appointment_id, action):
    """Accept or reject appointment"""
    try:
        receptionist = Receptionist.objects.first()
        if not receptionist:
            return JsonResponse({'error': 'No receptionist found in the system.'}, status=400)
    except Receptionist.DoesNotExist:
        return JsonResponse({'error': 'Receptionist profile not found.'}, status=400)
    
    try:
        appointment = Appointment.objects.get(id=appointment_id)
        print(f"Found appointment: {appointment.id}, status: {appointment.status}")
    except Appointment.DoesNotExist:
        return JsonResponse({'error': 'Appointment not found.'}, status=404)
    
    # Check if appointment can be modified
    if appointment.status not in ['pending']:
        return JsonResponse({'error': f'Appointment is already {appointment.status} and cannot be modified.'}, status=400)
    
    print(f"Processing action: {action}")
    
    if action == 'accept':
        appointment.status = 'accepted'
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
        appointment.status = 'rejected'
        appointment.save()
        
        # Log the action
        print(f"Appointment {appointment_id} rejected by receptionist {receptionist.full_name}")
        
        return JsonResponse({
            'success': True, 
            'message': f'Appointment with {appointment.patient.full_name} has been rejected.',
            'new_status': 'rejected',
            'appointment_id': appointment_id
        })
    else:
        print(f"Invalid action: {action}")
        return JsonResponse({'error': 'Invalid action. Use "accept" or "reject".'}, status=400)

def doctor_schedule_manage(request):
    """Doctor schedule management for receptionists"""
    try:
        receptionist = Receptionist.objects.first()
        if not receptionist:
            messages.error(request, 'No receptionist found in the system.')
            return redirect('receptionist:dashboard')
    except Receptionist.DoesNotExist:
        messages.error(request, 'Receptionist profile not found.')
        return redirect('receptionist:dashboard')
    
    # Get doctors from the same hospital
    doctors = Doctor.objects.filter(hospital=receptionist.hospital)
    
    # Get appointments for the selected doctor
    doctor_id = request.GET.get('doctor_id')
    selected_doctor = None
    appointments = []
    
    if doctor_id:
        selected_doctor = get_object_or_404(Doctor, id=doctor_id, hospital=receptionist.hospital)
        appointments = Appointment.objects.filter(doctor=selected_doctor).exclude(status='cancelled').order_by('appointment_date', 'appointment_time')
    
    context = {
        'receptionist': receptionist,
        'doctors': doctors,
        'selected_doctor': selected_doctor,
        'appointments': appointments,
    }
    
    return render(request, 'receptionist/doctor_schedule.html', context)

def receptionist_change_password(request):
    """Receptionist change password view"""
    try:
        receptionist = Receptionist.objects.first()
        if not receptionist:
            messages.error(request, 'No receptionist found in the system.')
            return redirect('receptionist:dashboard')
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

