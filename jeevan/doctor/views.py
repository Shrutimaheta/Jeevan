# # doctor/views.py
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import Doctor
# from .serializers import DoctorSerializer

# class DoctorListView(APIView):
#     def get(self, request):
#         doctors = Doctor.objects.all()
#         serializer = DoctorSerializer(doctors, many=True)
#         return Response(serializer.data)

from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.core.paginator import Paginator
from django.db import models
from django.views.decorators.http import require_http_methods
from django.utils import timezone
from django.views.decorators.csrf import csrf_protect
from django.urls import reverse
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.decorators import api_view
from datetime import datetime, date, timedelta
import json

from .models import Doctor, Consent
# from .serializers import DoctorSerializer
from .forms import DoctorProfileForm
from appointments.models import Appointment
from .models import AppointmentPrescription
from .forms import AppointmentPrescriptionForm
from care.models import Hospital, Specialization

def get_current_doctor(request):
    """Helper function to get the current logged-in doctor"""
    if not hasattr(request.user, 'role') or request.user.role != 'doctor':
        return None
    try:
        return Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        return None

@csrf_protect
def doctor_login(request):
    """Doctor login with proper authentication and role validation."""
    # Redirect if already logged in
    if request.user.is_authenticated and request.user.role == 'doctor':
        return redirect('doctor:dashboard')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        if not username or not password:
            messages.error(request, 'Please provide both username and password.')
            return render(request, 'doctor/login.html')
        
        # Authenticate user
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            # Check if user has doctor role
            if hasattr(user, 'role') and user.role == 'doctor':
                if user.is_active:
                    login(request, user)
                    messages.success(request, f'Welcome back, Dr. {user.get_full_name() or user.username}!')
                    return redirect('doctor:dashboard')
                else:
                    messages.error(request, 'Your account is inactive. Please contact administrator.')
            else:
                messages.error(request, 'You are not authorized to access the doctor dashboard.')
        else:
            messages.error(request, 'Invalid username or password.')
    
    return render(request, 'doctor/login.html')


@login_required
@csrf_protect
def doctor_logout(request):
    """Secure logout with CSRF protection - handles POST requests"""
    if request.method == 'POST':
        # Verify user is authenticated and has doctor role
        if not request.user.is_authenticated:
            messages.error(request, 'You must be logged in to logout.')
            return redirect('universal_login')
        
        # Check if user has doctor role
        if not hasattr(request.user, 'role') or request.user.role != 'doctor':
            messages.error(request, 'You are not authorized to access doctor logout.')
            return redirect('universal_login')
        
        # Get user info before logout
        user_name = request.user.get_full_name() or request.user.username
        user_id = request.user.id
        
        # Log the logout action for security audit
        import logging
        logger = logging.getLogger(__name__)
        logger.info(f'Doctor logout: User {user_name} (ID: {user_id}) logged out from IP: {request.META.get("REMOTE_ADDR")}')
        
        # Clear all session data securely
        request.session.flush()
        
        # Logout user
        logout(request)
        
        # Clear any remaining cookies for security
        response = redirect('universal_login')
        response.delete_cookie('sessionid')
        response.delete_cookie('csrftoken')
        
        # Add cache prevention headers to prevent back button issues
        response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
        response['Pragma'] = 'no-cache'
        response['Expires'] = '0'
        
        # Show success message
        messages.success(request, f'You have been successfully logged out, Dr. {user_name}.')
        
        return response
    
    # If GET request, redirect to dashboard (should not happen with proper form)
    return redirect('doctor:dashboard')

@login_required
@csrf_protect
def doctor_dashboard(request):
    """Doctor dashboard view - shows all appointments including pending ones"""
    # Check if user has doctor role
    if not hasattr(request.user, 'role') or request.user.role != 'doctor':
        messages.error(request, 'You are not authorized to access the doctor dashboard.')
        return redirect('universal_login')
    
    # Get the doctor associated with the logged-in user
    try:
        doctor = Doctor.objects.get(user=request.user)
        if not doctor:
            messages.error(request, 'Doctor profile not found.')
            response = render(request, 'doctor/dashboard.html', {'doctor': None})
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'
            return response
    except Doctor.DoesNotExist:
        messages.error(request, 'Doctor profile not found.')
        response = render(request, 'doctor/dashboard.html', {'doctor': None})
        response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
        response['Pragma'] = 'no-cache'
        response['Expires'] = '0'
        return response
    
    today = date.today()
    
    # Mark expired appointments before processing
    Appointment.mark_expired_appointments()
    
    # Get all appointments for the doctor
    all_appointments = Appointment.objects.filter(doctor=doctor)
    
    # Get appointment counts by status
    accepted_count = all_appointments.filter(status='accepted').count()
    pending_count = all_appointments.filter(status='pending').count()
    rejected_count = all_appointments.filter(status='rejected').count()
    completed_count = all_appointments.filter(status='completed').count()
    cancelled_count = all_appointments.filter(status='cancelled').count()
    expired_count = all_appointments.filter(status='expired').count()
    
    # Get today's total appointments (all statuses)
    today_total_appointments = Appointment.objects.filter(
        doctor=doctor,
        appointment_date=today
    ).count()
    
    # Get recent appointments (last 5) - all statuses
    recent_appointments = all_appointments.order_by('-appointment_date', '-appointment_time')[:5]
    
    # Get today's appointments (all statuses)
    today_appointments = Appointment.objects.filter(
        doctor=doctor,
        appointment_date=today
    ).order_by('appointment_time')
    
    # Get upcoming appointments (today and future) - all statuses
    upcoming_appointments = Appointment.objects.filter(
        doctor=doctor,
        appointment_date__gte=today
    ).order_by('appointment_date', 'appointment_time')[:10]  # Limit to 10 upcoming
    
    # Get pending appointments for management
    pending_appointments = Appointment.objects.filter(
        doctor=doctor,
        status='pending'
    ).order_by('appointment_date', 'appointment_time')
    
    # Get appointments that need prescriptions (accepted but no prescription)
    pending_prescriptions = Appointment.objects.filter(
        doctor=doctor,
        status='accepted'
    ).exclude(
        prescription__isnull=False
    ).order_by('appointment_date', 'appointment_time')
    
    # Calculate appointment counts for the next 7 days (from today to next 7 days)
    next_7_days_counts = []
    next_7_days_labels = []
    for i in range(7):
        target_date = today + timedelta(days=i)
        count = Appointment.objects.filter(
            doctor=doctor,
            appointment_date=target_date
        ).count()
        next_7_days_counts.append(count)
        # Format date for label
        next_7_days_labels.append(target_date.strftime('%b %d'))
    
    context = {
        'doctor': doctor,
        'upcoming_appointments': upcoming_appointments,
        'today_appointments': today_appointments,
        'recent_appointments': recent_appointments,
        'pending_appointments': pending_appointments,
        'pending_prescriptions': pending_prescriptions,
        'today_total_appointments': today_total_appointments,
        'accepted_count': accepted_count,
        'pending_count': pending_count,
        'rejected_count': rejected_count,
        'completed_count': completed_count,
        'cancelled_count': cancelled_count,
        'expired_count': expired_count,
        'next_7_days_counts': next_7_days_counts,
        'next_7_days_labels': next_7_days_labels,
    }
    
    response = render(request, 'doctor/dashboard.html', context)
    
    # Add cache prevention headers to prevent back button issues
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    
    return response

@login_required
@require_http_methods(["POST"])
def update_appointment_status(request, appointment_id, status):
    """Update appointment status (accept/reject/cancel)"""
    # Check if user has doctor role
    if not hasattr(request.user, 'role') or request.user.role != 'doctor':
        return JsonResponse({'success': False, 'message': 'Unauthorized access'})
    try:
        appointment = Appointment.objects.get(id=appointment_id)
        
        # Validate status
        valid_statuses = ['accepted', 'rejected', 'cancelled', 'completed']
        if status not in valid_statuses:
            return JsonResponse({'success': False, 'message': 'Invalid status'})
        
        # Update appointment status
        appointment.status = status
        appointment.save()
        
        return JsonResponse({
            'success': True, 
            'message': f'Appointment {status} successfully',
            'new_status': status
        })
        
    except Appointment.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Appointment not found'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})

@require_http_methods(["GET"])
def get_appointment_info(request, appointment_id):
    """Get appointment information for confirmation modal"""
    # Check if user has doctor role
    if not hasattr(request.user, 'role') or request.user.role != 'doctor':
        return JsonResponse({'success': False, 'message': 'Unauthorized access'})
    
    try:
        appointment = Appointment.objects.get(id=appointment_id)
        
        # Check if the appointment belongs to the current doctor
        if appointment.doctor.user != request.user:
            return JsonResponse({'success': False, 'message': 'Appointment not found'})
        
        return JsonResponse({
            'success': True,
            'patient_name': appointment.patient.full_name,
            'appointment_date': appointment.appointment_date.strftime('%B %d, %Y'),
            'appointment_time': appointment.appointment_time.strftime('%I:%M %p'),
            'symptoms': appointment.symptoms,
            'abha_id': appointment.abha_id,
            'status': appointment.status
        })
        
    except Appointment.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Appointment not found'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)})

@login_required
def doctor_profile(request):
    """Doctor profile view - edit profile information"""
    # Check if user has doctor role
    if not hasattr(request.user, 'role') or request.user.role != 'doctor':
        messages.error(request, 'You are not authorized to access the doctor profile.')
        return redirect('universal_login')
    # Get the doctor associated with the logged-in user
    try:
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        messages.error(request, 'Doctor profile not found. Please contact administrator.')
        return redirect('universal_login')
    
    if request.method == 'POST':
        form = DoctorProfileForm(request.POST, request.FILES, instance=doctor)
        if form.is_valid():
            # Save the form data (file will be saved by form.save())
            updated_doctor = form.save(commit=True)
            
            # CRITICAL: Get completely fresh instance from database after saving
            # This ensures we have the updated file URL and all relationships
            doctor = Doctor.objects.select_related('user').prefetch_related('specialization').get(pk=updated_doctor.pk)
            
            # Verify file was saved
            if updated_doctor.profile_picture:
                print(f"✓ Profile picture saved: {updated_doctor.profile_picture.name}")
            else:
                print("⚠ No profile picture in saved instance")
            
            messages.success(request, 'Profile updated successfully!')
            # Refresh the form with updated data
            form = DoctorProfileForm(instance=doctor)
        else:
            # If form is invalid, show errors
            print(f"✗ Form validation errors: {form.errors}")
            for field, errors in form.errors.items():
                print(f"  {field}: {errors}")
            messages.error(request, 'Please correct the errors below.')
    else:
        form = DoctorProfileForm(instance=doctor)
    
    # Always ensure we have the latest doctor instance from database
    doctor.refresh_from_db()
    
    # Get hospitals and specializations from database
    hospitals = Hospital.objects.all()
    specializations = Specialization.objects.all()
    
    context = {
        'doctor': doctor,
        'form': form,
        'hospitals': hospitals,
        'specializations': specializations,
    }
    
    return render(request, 'doctor/profile.html', context)

@login_required
def doctor_appointments(request):
    """Doctor appointments view - shows all appointments by default"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'You are not authorized to access doctor appointments.')
        return redirect('universal_login')
    
    # Default to showing all appointments
    status_filter = request.GET.get('status', '')
    date_filter = request.GET.get('date', '')
    
    # Mark expired appointments before processing
    Appointment.mark_expired_appointments()
    
    appointments = Appointment.objects.filter(doctor=doctor)
    
    if status_filter:
        appointments = appointments.filter(status=status_filter)
    
    if date_filter:
        appointments = appointments.filter(appointment_date=date_filter)
    
    appointments = appointments.order_by('-appointment_date', '-appointment_time')
    
    # Pagination
    paginator = Paginator(appointments, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'doctor': doctor,
        'page_obj': page_obj,
        'status_filter': status_filter,
        'date_filter': date_filter,
    }
    
    return render(request, 'doctor/appointments.html', context)

# API Views for React integration
def doctor_appointments_api(request):
    """API to get doctor appointments"""
    doctor = get_current_doctor(request)
    if not doctor:
        return JsonResponse({'error': 'Doctor not found'}, status=404)
    
    appointments = Appointment.objects.filter(doctor=doctor).order_by('-appointment_date', '-appointment_time')
    
    # Serialize appointments
    appointments_data = []
    for appointment in appointments:
        appointments_data.append({
            'id': appointment.id,
            'patient_name': appointment.patient.full_name,
            'patient_contact': appointment.patient.contact_number,
            'appointment_date': appointment.appointment_date.strftime('%Y-%m-%d'),
            'appointment_time': appointment.appointment_time.strftime('%H:%M'),
            'status': appointment.status,
            'symptoms': appointment.symptoms,
            'payment_mode': appointment.payment_mode,
        })
    
    return JsonResponse(appointments_data, safe=False)

def doctor_profile_api(request):
    """API to get doctor profile"""
    doctor = get_current_doctor(request)
    if not doctor:
        return JsonResponse({'error': 'Doctor not found'}, status=404)
    
    # Serialize doctor data manually
    doctor_data = {
        'id': doctor.id,
        'full_name': doctor.full_name,
        'specialization': [spec.sname for spec in doctor.specialization.all()],
        'hospital': doctor.hospital.name if doctor.hospital else None,
        'rating': doctor.rating,
        'experience_years': doctor.experience_years,
        'accepts_insurance': doctor.accepts_insurance,
    }
    return JsonResponse(doctor_data)

def doctor_home(request):
    return HttpResponse("Doctor Home Page")

def doctor_list_api(request):
    """API to get list of doctors"""
    doctors = Doctor.objects.all()
    doctors_data = []
    for doctor in doctors:
        doctors_data.append({
            'id': doctor.id,
            'full_name': doctor.full_name,
            'specialization': [spec.sname for spec in doctor.specialization.all()],
            'hospital': doctor.hospital.name if doctor.hospital else None,
            'rating': doctor.rating,
            'experience_years': doctor.experience_years,
            'accepts_insurance': doctor.accepts_insurance,
        })
    return JsonResponse(doctors_data, safe=False)

def appointment_prescription(request, appointment_id):
    """Create or edit prescription for an accepted appointment; on save mark completed."""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'You are not authorized to access prescriptions.')
        return redirect('universal_login')
    
    appointment = get_object_or_404(Appointment, id=appointment_id, doctor=doctor)

    prescription = getattr(appointment, 'prescription', None)

    if request.method == 'POST':
        form = AppointmentPrescriptionForm(request.POST, instance=prescription, appointment=appointment)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.appointment = appointment
            obj.doctor = doctor
            obj.patient_name = appointment.patient.full_name
            obj.save()
            # Mark appointment completed if not already
            if appointment.status != 'completed':
                appointment.status = 'completed'
                appointment.save()
            messages.success(request, 'Prescription saved and appointment marked completed.')
            return redirect('doctor:appointments')
    else:
        form = AppointmentPrescriptionForm(instance=prescription, appointment=appointment)

    return render(request, 'doctor/prescription_form.html', {
        'doctor': doctor,
        'appointment': appointment,
        'form': form,
        'is_edit': prescription is not None,
    })

def view_prescription(request, appointment_id):
    """View prescription for a completed appointment (read-only mode)"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'You are not authorized to view prescriptions.')
        return redirect('universal_login')
    
    appointment = get_object_or_404(Appointment, id=appointment_id, doctor=doctor)
    
    # Check if appointment is completed
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

def doctor_patients(request):
    """Doctor patients view - shows patients who have appointments with this doctor"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'You are not authorized to access patient list.')
        return redirect('universal_login')
    
    # Get search parameters
    search_query = request.GET.get('search', '').strip()
    search_date = request.GET.get('date', '').strip()
    
    # Get appointments with this doctor and include patient and appointment info
    appointments = Appointment.objects.filter(doctor=doctor).select_related('patient').order_by('-appointment_date', '-appointment_time')
    
    # Apply search filters
    if search_query:
        appointments = appointments.filter(patient__full_name__icontains=search_query)
    
    if search_date:
        appointments = appointments.filter(appointment_date=search_date)
    
    # Create a dictionary to store unique patients with their latest appointment info
    patients_data = {}
    
    for appointment in appointments:
        patient_id = appointment.patient.id
        if patient_id not in patients_data:
            patients_data[patient_id] = {
                'patient': appointment.patient,
                'latest_appointment_date': appointment.appointment_date,
                'latest_appointment_time': appointment.appointment_time,
                'latest_appointment_status': appointment.status,
                'latest_appointment_created_at': appointment.created_at,
                'total_appointments': 1
            }
        else:
            # Update with the latest appointment if this one is more recent
            if appointment.appointment_date > patients_data[patient_id]['latest_appointment_date'] or \
               (appointment.appointment_date == patients_data[patient_id]['latest_appointment_date'] and 
                appointment.appointment_time > patients_data[patient_id]['latest_appointment_time']):
                patients_data[patient_id]['latest_appointment_date'] = appointment.appointment_date
                patients_data[patient_id]['latest_appointment_time'] = appointment.appointment_time
                patients_data[patient_id]['latest_appointment_status'] = appointment.status
                patients_data[patient_id]['latest_appointment_created_at'] = appointment.created_at
            patients_data[patient_id]['total_appointments'] += 1
    
    # Convert to list for template
    patients_list = list(patients_data.values())
    
    context = {
        'doctor': doctor,
        'patients_data': patients_list,
        'search_query': search_query,
        'search_date': search_date,
    }
    
    return render(request, 'doctor/patients.html', context)

def patient_detail(request, patient_id):
    """Patient detail view - shows patient information and their appointments with this doctor"""
    # Check if user has doctor role
    if not hasattr(request.user, 'role') or request.user.role != 'doctor':
        messages.error(request, 'You are not authorized to access patient details.')
        return redirect('universal_login')
    
    # Get the doctor associated with the logged-in user
    try:
        doctor = Doctor.objects.get(user=request.user)
        if not doctor:
            messages.error(request, 'Doctor profile not found.')
            return render(request, 'doctor/patient_detail.html', {'doctor': None, 'patient': None, 'appointments': [], 'search_date': ''})
    except Doctor.DoesNotExist:
        messages.error(request, 'Doctor profile not found.')
        return render(request, 'doctor/patient_detail.html', {'doctor': None, 'patient': None, 'appointments': [], 'search_date': ''})
    
    # Get search parameters
    search_date = request.GET.get('date', '').strip()
    
    # Get patient and their appointments with this doctor
    from patient.models import Patient
    patient = get_object_or_404(Patient, id=patient_id)
    appointments = Appointment.objects.filter(doctor=doctor, patient=patient).order_by('-appointment_date', '-appointment_time')
    
    # Apply date filter if provided
    if search_date:
        appointments = appointments.filter(appointment_date=search_date)
    
    # Check consent status
    has_consent = check_consent(doctor, patient)
    consent_status = None
    existing_consent = None
    try:
        existing_consent = Consent.objects.get(doctor=doctor, patient=patient)
        consent_status = existing_consent.status
    except Consent.DoesNotExist:
        consent_status = 'none'
    
    context = {
        'doctor': doctor,
        'patient': patient,
        'appointments': appointments,
        'search_date': search_date,
        'has_consent': has_consent,
        'consent_status': consent_status,
        'existing_consent': existing_consent,
    }
    
    return render(request, 'doctor/patient_detail.html', context)

def doctor_calendar(request):
    """Doctor calendar view - shows appointments in calendar format"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'You are not authorized to access calendar.')
        return redirect('universal_login')
    
    try:
        # Get all appointments for the doctor (not just current month)
        appointments = Appointment.objects.filter(doctor=doctor).order_by('appointment_date', 'appointment_time')
        
        # Format appointments for FullCalendar
        appointments_data = []
        for appointment in appointments:
            try:
                # Determine color based on status
                color_map = {
                    'accepted': '#1e3a8a',
                    'pending': '#1e40af', 
                    'completed': '#28a745',
                    'rejected': '#dc3545',
                    'cancelled': '#6c757d'
                }
                
                # Calculate end time (30 minutes after start)
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
                print(f"Error processing appointment {appointment.id}: {e}")
                continue
        
        context = {
            'doctor': doctor,
            'appointments': appointments,
            'appointments_json': json.dumps(appointments_data),
            'current_month': date.today(),
        }
        
        return render(request, 'doctor/calendar.html', context)
        
    except Exception as e:
        print(f"Error in doctor_calendar view: {e}")
        messages.error(request, f'Error loading calendar: {str(e)}')
        return render(request, 'doctor/calendar.html', {'doctor': doctor, 'appointments': [], 'appointments_json': '[]'})


def patient_reports(request, patient_id):
    """View patient medical reports with consent check"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'You are not authorized to view medical reports.')
        return redirect('doctor:patients')
    
    # Get patient
    from patient.models import Patient
    patient = get_object_or_404(Patient, id=patient_id)
    
    # Check consent
    has_consent = check_consent(doctor, patient)
    
    # Get consent status for display
    consent_status = None
    try:
        consent = Consent.objects.get(doctor=doctor, patient=patient)
        consent_status = consent.status
    except Consent.DoesNotExist:
        consent_status = 'none'
    
    # Check if consent is rejected first
    if consent_status == 'rejected':
        messages.error(request, f'Patient {patient.full_name} has rejected your consent request. You cannot view their medical reports. You may send a new consent request if needed.')
        return redirect('doctor:request_consent', patient_id=patient_id)
    
    if not has_consent:
        if consent_status == 'pending':
            messages.warning(request, 'Consent request is pending. Please wait for patient approval or request consent again.')
            return redirect('doctor:request_consent', patient_id=patient_id)
        else:
            # No consent request exists, redirect to request form
            messages.info(request, 'Consent required to view patient reports. Please request consent from the patient.')
            return redirect('doctor:request_consent', patient_id=patient_id)
    
    # Get patient documents (medical reports)
    documents = patient.documents.filter(document_type__in=['report', 'lab_result', 'scan']).order_by('-uploaded_at')
    
    # Get medical records if they exist
    # Note: MedicalRecord uses care.models.Patient, but we're using patient.models.Patient
    # So we'll only query if we can match the patient correctly
    medical_records = []
    try:
        from records.models import MedicalRecord
        from care.models import Patient as CarePatient
        # Try to get the corresponding CarePatient
        try:
            care_patient = CarePatient.objects.get(user=patient.user)
            medical_records = MedicalRecord.objects.filter(patient=care_patient, doctor=doctor).order_by('-created_at')
        except CarePatient.DoesNotExist:
            # If CarePatient doesn't exist, just use empty list
            medical_records = []
    except Exception:
        # If MedicalRecord model doesn't exist or there's any error, use empty list
        medical_records = []
    
    context = {
        'doctor': doctor,
        'patient': patient,
        'documents': documents,
        'medical_records': medical_records,
        'has_consent': has_consent,
        'consent_status': consent_status,
    }
    
    return render(request, 'doctor/patient_reports.html', context)


def request_patient_consent(request, patient_id):
    """Request consent from patient to view their medical reports"""
    doctor = get_current_doctor(request)
    if not doctor:
        messages.error(request, 'You are not authorized to view consent forms.')
        return redirect('doctor:patients')
    
    # Get patient
    from patient.models import Patient
    patient = get_object_or_404(Patient, id=patient_id)
    
    # Check existing consent status
    has_consent = check_consent(doctor, patient)
    consent_status = None
    existing_consent = None
    try:
        existing_consent = Consent.objects.get(doctor=doctor, patient=patient)
        consent_status = existing_consent.status
    except Consent.DoesNotExist:
        consent_status = 'none'
    
    # If consent is already approved, redirect to reports page
    if has_consent:
        messages.info(request, 'You already have consent to view this patient\'s reports.')
        return redirect('doctor:patient_reports', patient_id=patient_id)
    
    if request.method == 'POST':
        reason = request.POST.get('reason', 'Doctor needs access to view patient medical reports for treatment purposes')
        
        # Request consent
        consent = request_consent(doctor=doctor, patient=patient, reason=reason)
        
        messages.success(request, 'Consent request sent to patient successfully. You will be able to view reports once the patient approves the consent.')
        return redirect('doctor:request_consent', patient_id=patient_id)
    
    context = {
        'doctor': doctor,
        'patient': patient,
        'has_consent': has_consent,
        'consent_status': consent_status,
        'existing_consent': existing_consent,
    }
    
    return render(request, 'doctor/request_consent.html', context)


# Consent management functions
def check_consent(doctor, patient):
    """Check if doctor has approved consent to view patient reports"""
    try:
        consent = Consent.objects.get(doctor=doctor, patient=patient)
        return consent.is_approved()
    except Consent.DoesNotExist:
        return False


def request_consent(doctor, patient, reason=''):
    """Request consent from patient to view their medical reports"""
    consent, created = Consent.objects.get_or_create(
        doctor=doctor,
        patient=patient,
        defaults={
            'reason': reason,
            'status': 'pending'
        }
    )
    
    if not created:
        # Update existing consent request
        # Reset the consent to pending status and update timestamp
        consent.reason = reason
        consent.status = 'pending'
        # Reset responded_at when re-requesting
        consent.responded_at = None
        # Update requested_at to current time for re-requests
        # Note: Even though requested_at has auto_now_add=True, we can manually update it
        consent.requested_at = timezone.now()
        consent.save()
    
    return consent


@require_http_methods(["POST"])
def approve_consent(request, consent_id):
    """Approve consent request (called by patient)"""
    try:
        consent = get_object_or_404(Consent, id=consent_id)
        notes = request.POST.get('notes', '')
        
        consent.approve(notes)
        
        messages.success(request, 'Consent approved successfully.')
        return JsonResponse({'status': 'success', 'message': 'Consent approved'})
    
    except Exception as e:
        messages.error(request, f'Error approving consent: {str(e)}')
        return JsonResponse({'status': 'error', 'message': str(e)})


@require_http_methods(["POST"])
def reject_consent(request, consent_id):
    """Reject consent request (called by patient)"""
    try:
        consent = get_object_or_404(Consent, id=consent_id)
        notes = request.POST.get('notes', '')
        
        consent.reject(notes)
        
        messages.success(request, 'Consent rejected.')
        return JsonResponse({'status': 'success', 'message': 'Consent rejected'})
    
    except Exception as e:
        messages.error(request, f'Error rejecting consent: {str(e)}')
        return JsonResponse({'status': 'error', 'message': str(e)})


def consent_status(request, doctor_id, patient_id):
    """Get consent status for doctor-patient pair"""
    try:
        doctor = get_object_or_404(Doctor, id=doctor_id)
        patient = get_object_or_404(Patient, id=patient_id)
        
        has_consent = check_consent(doctor, patient)
        
        return JsonResponse({
            'has_consent': has_consent,
            'doctor_id': doctor_id,
            'patient_id': patient_id
        })
    
    except Exception as e:
        return JsonResponse({
            'has_consent': False,
            'error': str(e)
        })