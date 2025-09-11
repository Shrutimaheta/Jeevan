from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
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
from .models import Patient
from .forms import PatientRegistrationForm, PatientLoginForm, PatientProfileForm, ChangePasswordForm
from .serializers import PatientSerializer, PatientRegistrationSerializer, PatientLoginSerializer


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
            return redirect('patient:patient_dashboard')
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
    
    # Get upcoming appointments (today and future)
    from datetime import date, datetime
    from appointments.models import Appointment
    
    today = date.today()
    upcoming_appointments = Appointment.objects.filter(
        patient=patient,
        appointment_date__gte=today
    ).order_by('appointment_date', 'appointment_time')[:5]  # Limit to 5 upcoming appointments
    
    # Get total appointment count for stats
    total_appointments = Appointment.objects.filter(patient=patient).count()
    
    context = {
        'patient': patient,
        'upcoming_appointments': upcoming_appointments,
        'total_appointments': total_appointments,
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
            # Redirect to refresh the page with updated data
            return redirect('patient:patient_profile')
        else:
            # If form is invalid, show errors
            messages.error(request, 'Please correct the errors below.')
    else:
        form = PatientProfileForm(instance=patient)
    
    # Refresh patient data from database to ensure we have the latest data
    patient.refresh_from_db()
    
    context = {
        'patient': patient,
        'form': form,
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
