from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse
from django.core.paginator import Paginator
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json
from .models import Patient, PatientDocument, VitalSign, WellnessLog, Medication, MedicationLog, LabResult, HealthGoal, Notification
from .forms import PatientRegistrationForm, PatientLoginForm, PatientProfileForm, ChangePasswordForm, PatientDocumentForm
from .help_views import *
from .forgot_password_views import *
from datetime import date, timedelta

from django.views.decorators.http import require_GET


def patient_list(request):
    """View to list all patients"""
    patients = Patient.objects.all().order_by('-id')
    
    # Add pagination
    paginator = Paginator(patients, 10)  # Show 10 patients per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'patients': page_obj,
        'page_obj': page_obj,
    }
    return render(request, 'patient/patient_list.html', context)


def patient_detail(request, patient_id):
    """View to show detailed information about a specific patient"""
    patient = get_object_or_404(Patient, id=patient_id)
    context = {
        'patient': patient,
    }
    return render(request, 'patient/patient_detail.html', context)


def patient_api_list(request):
    """API view to return patient data as JSON"""
    patients = Patient.objects.all().order_by('-id')
    
    # Convert to list of dictionaries
    patients_data = []
    for patient in patients:
        patients_data.append({
            'id': patient.id,
            'full_name': patient.full_name,
            'email': patient.email,
            'contact_number': patient.contact_number,
            'gender': patient.gender,
            'dob': patient.dob.strftime('%Y-%m-%d') if patient.dob else None,
            'city': patient.city,
            'blood_group': patient.blood_group,
            'abha_id': patient.abha_id,
        })
    
    return JsonResponse({
        'patients': patients_data,
        'count': len(patients_data)
    })


# Registration and Login Views
def patient_register(request):
    """Patient registration view"""
    if request.method == 'POST':
        form = PatientRegistrationForm(request.POST)
        if form.is_valid():
            patient = form.save()
            messages.success(request, 'Registration successful! Please login.')
            return redirect('patient:patient_login')
    else:
        form = PatientRegistrationForm()
    
    return render(request, 'patient/register.html', {'form': form})


def patient_login(request):
    """Unified login view for all user types (patient, doctor, receptionist, nurse, admin)"""
    from django.contrib.auth import authenticate
    from care.models import CustomUser
    
    # Check if user was redirected from password change
    if request.GET.get('password_changed') == '1':
        messages.success(request, 'Password changed successfully! Please login with your new password.')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        role = request.POST.get('role', 'patient')  # Default to patient if no role selected
        
        if username and password:
            # Try to authenticate the user - first try with username, then with email
            user = authenticate(request, username=username, password=password)
            
            # If authentication failed and username looks like an email, try with email
            if user is None and '@' in username:
                try:
                    from django.contrib.auth import get_user_model
                    User = get_user_model()
                    user_obj = User.objects.get(email=username)
                    user = authenticate(request, username=user_obj.username, password=password)
                except User.DoesNotExist:
                    pass
            
            if user is not None:
                # Validate role using user.role (except for admin)
                has_role = (role == 'admin' and user.is_superuser) or (getattr(user, 'role', None) == role)
                if has_role:
                    login(request, user)

                    # Get the user's full name based on role and redirect
                    if role == 'patient':
                        patient_obj = getattr(user, 'patient', None) or getattr(user, 'patient_profile', None)
                        full_name = getattr(patient_obj, 'full_name', None) or getattr(user, 'full_name', None) or user.get_username()
                        messages.success(request, f'Welcome back, {full_name}!')
                        return redirect('patient:profile_dashboard')
                    elif role == 'doctor':
                        if hasattr(user, 'doctor'):
                            full_name = user.doctor.full_name
                            messages.success(request, f'Welcome back, Dr. {full_name}!')
                            return redirect('doctor:dashboard')
                        messages.success(request, f'Welcome back!')
                        return redirect('doctor:dashboard')
                    elif role == 'receptionist':
                        if hasattr(user, 'receptionist'):
                            full_name = user.receptionist.full_name
                            messages.success(request, f'Welcome back, {full_name}!')
                        else:
                            messages.success(request, 'Welcome back!')
                        return redirect('receptionist:dashboard')
                    elif role == 'nurse':
                        if hasattr(user, 'nurse'):
                            full_name = user.nurse.full_name
                            messages.success(request, f'Welcome back, {full_name}!')
                        else:
                            messages.success(request, 'Welcome back!')
                        return redirect('nurse:dashboard')
                    elif role == 'admin' and user.is_superuser:
                        messages.success(request, 'Welcome back, Admin!')
                        return redirect('/admin/')
                    else:
                        messages.error(request, f'User does not have {role} role.')
                else:
                    messages.error(request, f'Invalid credentials or user does not have {role} role.')
            else:
                messages.error(request, 'Invalid username or password.')
        else:
            messages.error(request, 'Please fill in all fields.')
    
    # Create a simple form for the template
    form = PatientLoginForm()
    return render(request, 'patient/login.html', {'form': form})


def patient_logout(request):
    """Patient logout view"""
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('patient:patient_login')


@login_required
def patient_dashboard(request):
    """Patient dashboard view with real health data"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    # Get upcoming appointments (today and future) - exclude cancelled
    from datetime import date, datetime
    from appointments.models import Appointment
    
    today = date.today()
    upcoming_appointments = Appointment.objects.filter(
        patient=patient,
        appointment_date__gte=today
    ).exclude(status='cancelled').order_by('appointment_date', 'appointment_time')[:5]  # Limit to 5 upcoming appointments
    
    # Get all appointments for stats (exclude cancelled)
    all_appointments = Appointment.objects.filter(patient=patient).exclude(status='cancelled')
    total_appointments = all_appointments.count()
    
    # Get appointment counts by status
    accepted_appointments = all_appointments.filter(status='accepted').count()
    pending_appointments = all_appointments.filter(status='pending').count()
    rejected_appointments = all_appointments.filter(status='rejected').count()
    completed_appointments = all_appointments.filter(status='completed').count()
    
    # Get recent appointments (last 5)
    recent_appointments = all_appointments.order_by('-created_at')[:5]
    
    # Check for recent status changes (last 24 hours)
    from datetime import timedelta
    yesterday = today - timedelta(days=1)
    recent_status_changes = all_appointments.filter(
        updated_at__gte=yesterday
    ).exclude(status='pending').order_by('-updated_at')[:3]
    
    # Get real health data
    
    # Get latest vital signs
    latest_vitals = VitalSign.objects.filter(patient=patient).order_by('-recorded_at').first()
    
    # Get recent wellness logs (last 7 days)
    recent_wellness = WellnessLog.objects.filter(patient=patient).order_by('-date')[:7]
    
    # Get active medications
    active_medications = Medication.objects.filter(patient=patient, is_active=True).order_by('-prescribed_date')[:5]
    
    # Get unread notifications
    unread_notifications = Notification.objects.filter(patient=patient, is_read=False).order_by('-created_at')[:5]
    
    # Get recent lab results
    recent_lab_results = LabResult.objects.filter(patient=patient).order_by('-test_date')[:3]
    
    # Calculate health score based on real data
    health_score = calculate_health_score(patient)
    
    # Calculate medication adherence
    medication_adherence = calculate_medication_adherence(patient)
    
    # Get wellness statistics
    wellness_stats = calculate_wellness_stats(patient)
    
    context = {
        'patient': patient,
        'upcoming_appointments': upcoming_appointments,
        'recent_appointments': recent_appointments,
        'recent_status_changes': recent_status_changes,
        'total_appointments': total_appointments,
        'accepted_appointments': accepted_appointments,
        'pending_appointments': pending_appointments,
        'rejected_appointments': rejected_appointments,
        'completed_appointments': completed_appointments,
        
        # Health data
        'latest_vitals': latest_vitals,
        'recent_wellness': recent_wellness,
        'active_medications': active_medications,
        'unread_notifications': unread_notifications,
        'recent_lab_results': recent_lab_results,
        'health_score': health_score,
        'medication_adherence': medication_adherence,
        'wellness_stats': wellness_stats,
    }
    return render(request, 'patient/profile_dashboard.html', context)


@login_required
def patient_profile(request):
    """Patient profile view and edit"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    if request.method == 'POST':
        form = PatientProfileForm(request.POST, request.FILES, instance=patient)
        if form.is_valid():
            # Save the form data
            updated_patient = form.save()
            messages.success(request, 'Profile updated successfully!')
            # Refresh the form with updated data instead of redirecting
            form = PatientProfileForm(instance=updated_patient)
        else:
            # If form is invalid, show errors
            messages.error(request, 'Please correct the errors below.')
    else:
        form = PatientProfileForm(instance=patient)
    
    # Refresh patient data from database to ensure we have the latest data
    patient.refresh_from_db()
    
    # Get dashboard statistics
    from appointments.models import Appointment
    from patient.models import PatientDocument
    from care.models import Hospital
    
    # Count upcoming appointments
    upcoming_appointments = Appointment.objects.filter(
        patient=patient, 
        appointment_date__gte=timezone.now().date()
    ).exclude(status='cancelled').count()
    
    # Count completed teleconsultations (placeholder - feature not implemented yet)
    completed_consultations = 0
    
    # Count medical documents
    medical_documents = PatientDocument.objects.filter(patient=patient).count()
    
    # Get hospitals
    hospitals = Hospital.objects.all().prefetch_related('doctor_set')
    
    # Get recent appointments
    recent_appointments = Appointment.objects.filter(
        patient=patient
    ).order_by('-appointment_date')[:6]
    
    context = {
        'patient': patient,
        'form': form,
        'upcoming_appointments': upcoming_appointments,
        'completed_consultations': completed_consultations,
        'medical_documents': medical_documents,
        'hospitals': hospitals,
        'recent_appointments': recent_appointments,
    }
    return render(request, 'patient/profile.html', context)


@login_required
def change_password(request):
    """Change password view"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    if request.method == 'POST':
        form = ChangePasswordForm(request.user, request.POST)
        if form.is_valid():
            # Update the password
            new_password = form.cleaned_data['new_password']
            request.user.set_password(new_password)
            request.user.save()
            
            # Also update the patient's password field
            from django.contrib.auth.hashers import make_password
            patient.password = make_password(new_password)
            patient.save()
            
            # Logout the user for security
            logout(request)
            
            # Redirect to login page with password change indicator
            return redirect('patient:patient_login?password_changed=1')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = ChangePasswordForm(request.user)
    
    context = {
        'patient': patient,
        'form': form,
    }
    return render(request, 'patient/change_password.html', context)




# Document Management Views
@login_required
def document_list(request):
    """View to list all patient documents"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    documents = PatientDocument.objects.filter(patient=patient)
    
    # Add pagination
    paginator = Paginator(documents, 10)  # Show 10 documents per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'patient': patient,
        'documents': page_obj,
        'page_obj': page_obj,
    }
    return render(request, 'patient/document_list.html', context)


@login_required
def document_upload(request):
    """View to upload new documents"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    if request.method == 'POST':
        form = PatientDocumentForm(request.POST, request.FILES)
        if form.is_valid():
            document = form.save(commit=False)
            document.patient = patient
            document.save()
            messages.success(request, 'Document uploaded successfully!')
            return redirect('patient:document_list')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = PatientDocumentForm()
    
    context = {
        'patient': patient,
        'form': form,
    }
    return render(request, 'patient/document_upload.html', context)


@login_required
def document_detail(request, document_id):
    """View to show document details"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    try:
        document = PatientDocument.objects.get(id=document_id, patient=patient)
    except PatientDocument.DoesNotExist:
        messages.error(request, 'Document not found.')
        return redirect('patient:document_list')
    
    context = {
        'patient': patient,
        'document': document,
    }
    return render(request, 'patient/document_detail.html', context)


@login_required
def document_delete(request, document_id):
    """View to delete a document"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    try:
        document = PatientDocument.objects.get(id=document_id, patient=patient)
        document.delete()
        messages.success(request, 'Document deleted successfully!')
    except PatientDocument.DoesNotExist:
        messages.error(request, 'Document not found.')
    
    return redirect('patient:document_list')


@login_required
def document_download(request, document_id):
    """View to download a document"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    try:
        document = PatientDocument.objects.get(id=document_id, patient=patient)
        response = HttpResponse(document.file.read(), content_type='application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{document.title}.{document.file_extension.lower()}"'
        return response
    except PatientDocument.DoesNotExist:
        messages.error(request, 'Document not found.')
        return redirect('patient:document_list')


@login_required
def profile_dashboard(request):
    """React-enhanced patient profile dashboard mount page."""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')

    # Get all hospitals with their information and doctors
    from care.models import Hospital
    from doctor.models import Doctor
    from appointments.models import Appointment
    from datetime import date
    
    hospitals = Hospital.objects.all().prefetch_related('specialization', 'doctor_set__specialization')
    
    # Get upcoming appointments (today and future) - exclude cancelled
    today = date.today()
    upcoming_appointments = Appointment.objects.filter(
        patient=patient,
        appointment_date__gte=today
    ).exclude(status='cancelled').order_by('appointment_date', 'appointment_time')[:5]
    
    # Get all appointments for stats (exclude cancelled)
    all_appointments = Appointment.objects.filter(patient=patient).exclude(status='cancelled')
    total_appointments = all_appointments.count()
    
    # Get appointment counts by status
    accepted_appointments = all_appointments.filter(status='accepted').count()
    pending_appointments = all_appointments.filter(status='pending').count()
    rejected_appointments = all_appointments.filter(status='rejected').count()
    completed_appointments = all_appointments.filter(status='completed').count()
    
    # Get recent appointments (last 5)
    recent_appointments = all_appointments.order_by('-created_at')[:5]

    return render(request, 'patient/profile_dashboard.html', {
        'patient': patient,
        'hospitals': hospitals,
        'upcoming_appointments': upcoming_appointments,
        'recent_appointments': recent_appointments,
        'total_appointments': total_appointments,
        'accepted_appointments': accepted_appointments,
        'pending_appointments': pending_appointments,
        'rejected_appointments': rejected_appointments,
        'completed_appointments': completed_appointments,
    })


@login_required
@require_GET
def dashboard_data(request):
    """Lightweight JSON endpoint for patient dashboard widgets."""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        return JsonResponse({'error': 'Patient not found'}, status=404)

    from appointments.models import Appointment
    today = date.today()
    upcoming = list(Appointment.objects.filter(patient=patient, appointment_date__gte=today)
                    .exclude(status='cancelled')
                    .order_by('appointment_date', 'appointment_time')
                    .values('id', 'appointment_date', 'appointment_time', 'status')[:5])

    all_apps = Appointment.objects.filter(patient=patient).exclude(status='cancelled')
    stats = {
        'total': all_apps.count(),
        'accepted': all_apps.filter(status='accepted').count(),
        'pending': all_apps.filter(status='pending').count(),
        'rejected': all_apps.filter(status='rejected').count(),
        'completed': all_apps.filter(status='completed').count(),
    }

    recent_prescriptions = []
    # Optional: attempt to pull related prescriptions if model present
    try:
        from doctor.models import AppointmentPrescription
        recent_prescriptions = list(AppointmentPrescription.objects.filter(appointment__patient=patient)
                                    .order_by('-created_at')
                                    .values('id', 'appointment_id', 'diagnosis', 'created_at')[:5])
    except Exception:
        pass

    return JsonResponse({
        'patient': {
            'id': patient.id,
            'name': patient.full_name,
        },
        'upcomingAppointments': upcoming,
        'stats': stats,
        'recentPrescriptions': recent_prescriptions,
    })


# Helper functions for health calculations

def calculate_health_score(patient):
    """Calculate overall health score based on various factors"""
    score = 0
    factors = 0
    
    # Vital signs factor (30% weight)
    latest_vitals = VitalSign.objects.filter(patient=patient).order_by('-recorded_at').first()
    if latest_vitals:
        vitals_score = 0
        # Blood pressure scoring
        if 90 <= latest_vitals.blood_pressure_systolic <= 140 and 60 <= latest_vitals.blood_pressure_diastolic <= 90:
            vitals_score += 25
        elif 80 <= latest_vitals.blood_pressure_systolic <= 160 and 50 <= latest_vitals.blood_pressure_diastolic <= 100:
            vitals_score += 15
        else:
            vitals_score += 5
        
        # Heart rate scoring
        if 60 <= latest_vitals.heart_rate <= 100:
            vitals_score += 25
        elif 50 <= latest_vitals.heart_rate <= 120:
            vitals_score += 15
        else:
            vitals_score += 5
        
        # Temperature scoring
        if 97 <= float(latest_vitals.temperature) <= 99:
            vitals_score += 25
        elif 96 <= float(latest_vitals.temperature) <= 100:
            vitals_score += 15
        else:
            vitals_score += 5
        
        # Oxygen saturation scoring
        if latest_vitals.oxygen_saturation >= 95:
            vitals_score += 25
        elif latest_vitals.oxygen_saturation >= 90:
            vitals_score += 15
        else:
            vitals_score += 5
        
        score += vitals_score * 0.3
        factors += 0.3
    
    # Wellness factor (25% weight)
    recent_wellness = WellnessLog.objects.filter(patient=patient).order_by('-date')[:7]
    if recent_wellness:
        wellness_score = 0
        for log in recent_wellness:
            # Sleep scoring
            if 7 <= float(log.sleep_hours) <= 9:
                wellness_score += 20
            elif 6 <= float(log.sleep_hours) <= 10:
                wellness_score += 15
            else:
                wellness_score += 5
            
            # Mood scoring
            wellness_score += log.mood_score * 4  # 1-5 scale, max 20 points
            
            # Exercise scoring
            if log.exercise_minutes >= 30:
                wellness_score += 20
            elif log.exercise_minutes >= 15:
                wellness_score += 15
            else:
                wellness_score += 5
            
            # Water intake scoring
            if log.water_intake_glasses >= 8:
                wellness_score += 20
            elif log.water_intake_glasses >= 6:
                wellness_score += 15
            else:
                wellness_score += 5
        
        avg_wellness = wellness_score / len(recent_wellness) if recent_wellness else 0
        score += avg_wellness * 0.25
        factors += 0.25
    
    # Medication adherence factor (25% weight)
    adherence = calculate_medication_adherence(patient)
    score += adherence * 0.25
    factors += 0.25
    
    # Appointment compliance factor (20% weight)
    from appointments.models import Appointment
    from datetime import timedelta
    recent_appointments = Appointment.objects.filter(
        patient=patient,
        appointment_date__gte=timezone.now().date() - timedelta(days=30)
    ).exclude(status='cancelled')
    
    if recent_appointments:
        completed_rate = recent_appointments.filter(status='completed').count() / recent_appointments.count()
        score += completed_rate * 20 * 0.2
        factors += 0.2
    
    # Normalize score
    if factors > 0:
        final_score = min(100, max(0, score / factors))
    else:
        final_score = 75  # Default score if no data
    
    return round(final_score, 1)


def calculate_medication_adherence(patient):
    """Calculate medication adherence percentage"""
    from datetime import timedelta
    
    medications = Medication.objects.filter(patient=patient, is_active=True)
    if not medications:
        return 100.0  # No medications = 100% adherence
    
    total_adherence = 0
    medication_count = 0
    
    for med in medications:
        # Calculate expected doses based on frequency
        days_since_prescribed = (timezone.now().date() - med.prescribed_date).days + 1
        if days_since_prescribed <= 0:
            continue
        
        # Map frequency to daily doses
        frequency_map = {
            'once_daily': 1,
            'twice_daily': 2,
            'three_times_daily': 3,
            'four_times_daily': 4,
            'weekly': 1/7,
            'monthly': 1/30,
            'as_needed': 0.5,  # Assume taken half the time
        }
        
        daily_doses = frequency_map.get(med.frequency, 1)
        expected_doses = days_since_prescribed * daily_doses
        
        # Count actual doses taken
        actual_doses = MedicationLog.objects.filter(
            medication=med,
            taken_date__gte=med.prescribed_date
        ).count()
        
        if expected_doses > 0:
            adherence_rate = min(100, (actual_doses / expected_doses) * 100)
            total_adherence += adherence_rate
            medication_count += 1
    
    return round(total_adherence / medication_count, 1) if medication_count > 0 else 100.0


def calculate_wellness_stats(patient):
    """Calculate wellness statistics"""
    from datetime import timedelta
    
    # Get last 7 days of wellness data
    end_date = timezone.now().date()
    start_date = end_date - timedelta(days=7)
    
    wellness_logs = WellnessLog.objects.filter(
        patient=patient,
        date__gte=start_date,
        date__lte=end_date
    ).order_by('-date')
    
    if not wellness_logs:
        return {
            'avg_sleep': 0,
            'avg_mood': 0,
            'avg_exercise': 0,
            'avg_water': 0,
            'total_steps': 0,
            'days_logged': 0
        }
    
    total_sleep = sum(float(log.sleep_hours) for log in wellness_logs)
    total_mood = sum(log.mood_score for log in wellness_logs)
    total_exercise = sum(log.exercise_minutes for log in wellness_logs)
    total_water = sum(log.water_intake_glasses for log in wellness_logs)
    total_steps = sum(log.steps_count for log in wellness_logs)
    
    days_logged = len(wellness_logs)
    
    return {
        'avg_sleep': round(total_sleep / days_logged, 1) if days_logged > 0 else 0,
        'avg_mood': round(total_mood / days_logged, 1) if days_logged > 0 else 0,
        'avg_exercise': round(total_exercise / days_logged, 1) if days_logged > 0 else 0,
        'avg_water': round(total_water / days_logged, 1) if days_logged > 0 else 0,
        'total_steps': total_steps,
        'days_logged': days_logged
    }
