from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse, FileResponse, Http404
from django.core.paginator import Paginator
from django.db import transaction, IntegrityError
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from .access import patients_for_user, can_access_patient
from jeevan.decorators import role_required, patient_required, log_audit_event
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from django.utils.decorators import method_decorator
from django.views import View
import json
from .models import Patient, PatientDocument, VitalSign, WellnessLog, Medication, MedicationLog, LabResult, HealthGoal, Notification
from .forms import PatientRegistrationForm, PatientLoginForm, PatientProfileForm, ChangePasswordForm, PatientDocumentForm
from .help_views import (
    help_support, faq_list, support_tickets, create_support_ticket,
    support_ticket_detail, health_resources, contact_info
)
from .forgot_password_views import (
    forgot_password, verify_otp, verify_email_otp, reset_password, forgot_password_sent
)
from datetime import date, timedelta
from django.utils import timezone

from django.views.decorators.http import require_GET, require_POST


@patient_required
@require_GET
def patient_medical_records(request):
    """Keep old patient links safe while using the authorized records screen."""
    patient = get_object_or_404(Patient, user=request.user)
    return redirect('records:record_list', patient_id=patient.pk)


@login_required
@role_required(['doctor', 'receptionist', 'nurse'])
def patient_list(request):
    """View to list all patients"""
    patients = patients_for_user(request.user).order_by('-id')
    
    # Add pagination
    paginator = Paginator(patients, 10)  # Show 10 patients per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'patients': page_obj,
        'page_obj': page_obj,
    }
    return render(request, 'patient/patient_list.html', context)


@login_required
def patient_detail(request, patient_id):
    """View to show detailed information about a specific patient"""
    patient = get_object_or_404(Patient, id=patient_id)
    
    if not can_access_patient(request.user, patient):
        raise PermissionDenied("You do not have permission to view this profile.")
    log_audit_event(request.user, "VIEW_PATIENT_PROFILE", patient.id)
    context = {
        'patient': patient,
        'can_view_health': can_access_patient(request.user, patient, clinical=True),
    }
    return render(request, 'patient/patient_detail.html', context)


@login_required
@role_required(['doctor', 'receptionist', 'nurse'])
def patient_api_list(request):
    """API view to return patient data as JSON"""
    patients = patients_for_user(request.user).order_by('-id')
    page = Paginator(patients, 100).get_page(request.GET.get('page'))
    
    # Convert to list of dictionaries
    patients_data = []
    for patient in page:
        patients_data.append({
            'id': patient.id,
            'full_name': patient.full_name,
            'email': patient.user.email if patient.user else None,
            'contact_number': patient.user.contact_number if patient.user else None,
            'gender': patient.gender,
            'dob': patient.date_of_birth.strftime('%Y-%m-%d') if patient.date_of_birth else None,
            'city': patient.city,
        })
    
    return JsonResponse({
        'patients': patients_data,
        'count': len(patients_data),
        'total': page.paginator.count,
        'page': page.number,
        'pages': page.paginator.num_pages,
    })


# Registration and Login Views
def patient_register(request):
    """Patient registration view"""
    if request.method == 'POST':
        form = PatientRegistrationForm(request.POST)
        if form.is_valid():
            try:
                with transaction.atomic():
                    patient = form.save()
                messages.success(request, 'Registration successful! Please login.')
                return redirect('universal_login')
            except IntegrityError:
                form.add_error(None, "An error occurred during registration. The username or email might already be taken.")
    else:
        form = PatientRegistrationForm()
    
    return render(request, 'patient/register.html', {'form': form})


@login_required
def patient_dashboard(request):
    """Legacy URL uses the canonical dashboard's complete, consistent context."""
    return profile_dashboard(request)


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
            
            # Logout the user for security
            logout(request)
            messages.success(request, 'Your password has been changed. Sign in with your new password.')
            return redirect('universal_login')
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
@require_POST
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
    """View to download or view a document with secure role-based authorization check"""
    document = get_object_or_404(PatientDocument, id=document_id)
    
    has_access = False
    
    # If logged-in user is the patient owner
    if hasattr(request.user, 'role') and request.user.role == 'patient':
        try:
            patient = Patient.objects.get(user=request.user)
            if document.patient == patient:
                has_access = True
        except Patient.DoesNotExist:
            pass
            
    # If logged-in user is a doctor
    elif hasattr(request.user, 'role') and request.user.role == 'doctor':
        try:
            from doctor.models import Doctor
            from doctor.views import check_consent
            doctor = Doctor.objects.get(user=request.user)
            # A doctor can access if they have approved consent for this patient
            if check_consent(doctor, document.patient):
                has_access = True
        except Doctor.DoesNotExist:
            pass
            
    if not has_access:
        messages.error(request, 'You are not authorized to view or download this document.')
        raise PermissionDenied("You do not have permission to view this document.")
        
    file_ext = document.file_extension.lower()
    content_types = {
        'pdf': 'application/pdf',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'bmp': 'image/x-ms-bmp',
        'webp': 'image/webp',
        'doc': 'application/msword',
        'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    }
    content_type = content_types.get(file_ext, 'application/octet-stream')
    
    # Check if viewing inline is requested
    view_mode = request.GET.get('view', 'false').lower() == 'true'
    
    # Audit log
    log_audit_event(request.user, "ACCESS_PATIENT_RECORDS", document.patient.id, f"Downloaded/Viewed document: {document.title} (ID: {document.id})")
    
    try:
        inline = view_mode and file_ext in ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        response = FileResponse(document.file.open('rb'), content_type=content_type,
                                as_attachment=not inline, filename=f'{document.title}.{file_ext}')
        return response
    except Exception:
        # A missing/unavailable stored file must not expose its private storage path.
        raise Http404('This document file is currently unavailable.') from None


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
    
    # Get all specializations
    from care.models import Specialization
    specializations = Specialization.objects.all()
    
    # Get upcoming appointments (today and future) - only accepted status, exclude cancelled
    today = timezone.localdate()
    now = timezone.localtime()
    from django.db.models import Q
    upcoming_appointments = Appointment.objects.filter(
        patient=patient,
        appointment_date__gte=today,
        status='accepted'
    ).filter(Q(appointment_date__gt=today) | Q(appointment_date=today, appointment_time__gte=now.time())).order_by('appointment_date', 'appointment_time')
    
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

    # Get prescriptions from completed appointments
    from doctor.models import AppointmentPrescription
    prescriptions = AppointmentPrescription.objects.filter(
        appointment__patient=patient
    ).select_related('doctor', 'appointment').order_by('-created_at')

    # Get reports from PatientDocument (report, lab_result, scan types)
    reports = PatientDocument.objects.filter(
        patient=patient,
        document_type__in=['report', 'lab_result', 'scan']
    ).order_by('-uploaded_at')
    
    # Get pending consent requests from doctors
    from doctor.models import Consent
    pending_consents = Consent.objects.filter(
        patient=patient,
        status='pending'
    ).select_related('doctor').order_by('-requested_at')
    
    bills_due_total = 0  # Placeholder for bills

    response = render(request, 'patient/profile_dashboard.html', {
        'patient': patient,
        'hospitals': hospitals,
        'specializations': specializations,
        'upcoming_appointments': upcoming_appointments[:5],
        'upcoming_count': upcoming_appointments.count(),
        'first_patient_login': request.session.get('patient_first_login', False),
        'recent_appointments': recent_appointments,
        'total_appointments': total_appointments,
        'accepted_appointments': accepted_appointments,
        'pending_appointments': pending_appointments,
        'rejected_appointments': rejected_appointments,
        'completed_appointments': completed_appointments,
        'prescriptions': prescriptions[:5],
        'prescriptions_count': prescriptions.count(),
        'reports': reports[:5],
        'reports_count': reports.count(),
        'bills_due_total': bills_due_total,
        'pending_consents': pending_consents,
        'pending_consents_count': pending_consents.count(),
    })
    
    # Add cache prevention headers to prevent back button issues after logout
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    
    return response


@login_required
@require_GET
def dashboard_data(request):
    """Lightweight JSON endpoint for patient dashboard widgets."""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        return JsonResponse({'error': 'Patient not found'}, status=404)

    from appointments.models import Appointment
    from datetime import date
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


@login_required
def consent_requests(request):
    """View to display and manage consent requests from doctors"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    # Get pending consent requests from doctors
    from doctor.models import Consent
    pending_consents = Consent.objects.filter(
        patient=patient,
        status='pending'
    ).select_related('doctor', 'doctor__hospital').order_by('-requested_at')
    
    # Get all consent history (approved, rejected, expired)
    all_consents = Consent.objects.filter(
        patient=patient
    ).select_related('doctor', 'doctor__hospital').order_by('-requested_at')
    
    context = {
        'patient': patient,
        'pending_consents': pending_consents,
        'all_consents': all_consents,
        'pending_count': pending_consents.count(),
    }
    
    return render(request, 'patient/consent_requests.html', context)


@login_required
def upload_report(request):
    """Handle report upload functionality"""
    print(f"Upload request method: {request.method}")
    print(f"CSRF token in request: {request.META.get('HTTP_X_CSRFTOKEN')}")
    print(f"CSRF token in POST: {request.POST.get('csrfmiddlewaretoken')}")
    
    if request.method == 'POST':
        try:
            patient = Patient.objects.get(user=request.user)
            
            # Get form data
            title = request.POST.get('title', '')
            file = request.FILES.get('file')
            
            if not title or not file:
                return JsonResponse({'error': 'Title and file are required'}, status=400)
            
            # Create a PatientDocument record
            document = PatientDocument.objects.create(
                patient=patient,
                title=title,
                document_type='report',
                file=file,
                description=f"Report uploaded: {title}"
            )
            
            return JsonResponse({
                'success': True,
                'message': 'Report uploaded successfully',
                'document_id': document.id
            })
            
        except Patient.DoesNotExist:
            return JsonResponse({'error': 'Patient not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)


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
    
    # Daily self-reported medication logs cannot establish dose adherence or health.

    # Appointment compliance factor (20% weight)
    from appointments.models import Appointment
    from datetime import timedelta
    recent_appointments = Appointment.objects.filter(
        patient=patient,
        appointment_date__gte=timezone.localdate() - timedelta(days=30),
        appointment_date__lte=timezone.localdate(),
        status__in=['accepted', 'completed'],
    )
    
    if recent_appointments:
        completed_rate = recent_appointments.filter(status='completed').count() / recent_appointments.count()
        score += completed_rate * 100 * 0.2
        factors += 0.2
    
    # Normalize score
    if factors > 0:
        final_score = min(100, max(0, score / factors))
    else:
        return None  # No observations: do not invent a health result.
    
    return round(final_score, 1)


def calculate_medication_adherence(patient):
    """Compatibility name: percentage of eligible days with self-reported logs."""
    from .services import medication_logging_summary
    return medication_logging_summary(patient)[0]


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


# ABHA integration removed


@login_required
def prescription_list(request):
    """View to list all prescriptions for the logged-in patient"""
    try:
        patient = Patient.objects.get(user=request.user)
        
        # Get all prescriptions for this patient through appointments
        from doctor.models import AppointmentPrescription
        prescriptions = AppointmentPrescription.objects.filter(
            appointment__patient=patient
        ).select_related('appointment', 'doctor', 'appointment__hospital').order_by('-created_at')
        
        # Pagination
        from django.core.paginator import Paginator
        paginator = Paginator(prescriptions, 10)  # Show 10 prescriptions per page
        page_number = request.GET.get('page')
        page_obj = paginator.get_page(page_number)
        
        context = {
            'prescriptions': page_obj,
            'patient': patient
        }
        return render(request, 'patient/prescription_list.html', context)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')


@login_required
def prescription_detail(request, prescription_id):
    """View to show detailed prescription information"""
    try:
        patient = Patient.objects.get(user=request.user)
        
        from doctor.models import AppointmentPrescription
        prescription = get_object_or_404(
            AppointmentPrescription.objects.select_related('appointment', 'doctor', 'appointment__hospital'),
            id=prescription_id,
            appointment__patient=patient
        )
        
        context = {
            'prescription': prescription,
            'patient': patient
        }
        return render(request, 'patient/prescription_detail.html', context)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
