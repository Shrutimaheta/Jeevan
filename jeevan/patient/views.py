from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse, HttpResponse
from django.core.paginator import Paginator
from django.contrib.auth import login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
import json
from .models import Patient, PatientDocument
from .forms import PatientRegistrationForm, PatientLoginForm, PatientProfileForm, ChangePasswordForm, PatientDocumentForm
from .serializers import PatientSerializer, PatientRegistrationSerializer, PatientLoginSerializer
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
    """Patient login view"""
    # Check if user was redirected from password change
    if request.GET.get('password_changed') == '1':
        messages.success(request, 'Password changed successfully! Please login with your new password.')
    
    if request.method == 'POST':
        form = PatientLoginForm(request.POST)
        if form.is_valid():
            patient = form.cleaned_data['patient']
            login(request, patient.user)
            messages.success(request, f'Welcome back, {patient.full_name}!')
            return redirect('patient:profile_dashboard')
    else:
        form = PatientLoginForm()
    
    return render(request, 'patient/login.html', {'form': form})


def patient_logout(request):
    """Patient logout view"""
    logout(request)
    messages.info(request, 'You have been logged out.')
    return redirect('patient:patient_login')


@login_required
def patient_dashboard(request):
    """Patient dashboard view"""
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
    }
    return render(request, 'patient/dashboard.html', context)


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
    from teleconsultation.models import Teleconsultation
    from patient.models import PatientDocument
    from care.models import Hospital
    
    # Count upcoming appointments
    upcoming_appointments = Appointment.objects.filter(
        patient=patient, 
        appointment_date__gte=timezone.now().date()
    ).exclude(status='cancelled').count()
    
    # Count completed teleconsultations
    completed_consultations = Teleconsultation.objects.filter(
        patient=patient, 
        status='completed'
    ).count()
    
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


# RESTful API Views
@api_view(['POST'])
@permission_classes([AllowAny])
def api_register(request):
    """API endpoint for patient registration"""
    serializer = PatientRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        patient = serializer.save()
        try:
            token, created = Token.objects.get_or_create(user=patient.user)
            return Response({
                'message': 'Registration successful',
                'patient_id': patient.id,
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'message': 'Registration successful',
                'patient_id': patient.id,
                'error': 'Token creation failed'
            }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def api_login(request):
    """API endpoint for patient login"""
    serializer = PatientLoginSerializer(data=request.data)
    if serializer.is_valid():
        patient = serializer.validated_data['patient']
        try:
            token, created = Token.objects.get_or_create(user=patient.user)
            return Response({
                'message': 'Login successful',
                'patient_id': patient.id,
                'token': token.key,
                'patient': PatientSerializer(patient).data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'message': 'Login successful',
                'patient_id': patient.id,
                'patient': PatientSerializer(patient).data,
                'error': 'Token creation failed'
            }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def api_profile(request):
    """API endpoint to get patient profile"""
    try:
        patient = Patient.objects.get(user=request.user)
        serializer = PatientSerializer(patient)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Patient.DoesNotExist:
        return Response({'error': 'Patient profile not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PUT'])
def api_update_profile(request):
    """API endpoint to update patient profile"""
    try:
        patient = Patient.objects.get(user=request.user)
        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Patient.DoesNotExist:
        return Response({'error': 'Patient profile not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def api_patients(request):
    """API endpoint to get all patients (for admin use)"""
    patients = Patient.objects.all()
    serializer = PatientSerializer(patients, many=True)
    return Response({
        'patients': serializer.data,
        'count': len(serializer.data)
    }, status=status.HTTP_200_OK)


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
    hospitals = Hospital.objects.all().prefetch_related('specialization', 'doctor_set__specialization')

    # Minimal context; React will fetch / display richer data client-side.
    return render(request, 'patient/profile_dashboard.html', {
        'patient': patient,
        'hospitals': hospitals,
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
