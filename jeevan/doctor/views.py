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
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.core.paginator import Paginator
from datetime import datetime, date, timedelta
import json

from .models import Doctor, Review
from care.models import CustomUser
from .forms import DoctorProfileForm
from appointments.models import Appointment
from .models import AppointmentPrescription
from .forms import AppointmentPrescriptionForm
from care.models import Hospital, Specialization

def doctor_login(request):
    """Doctor login (simple username/password using auth system)."""
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user and getattr(user, 'role', '') == 'doctor':
            login(request, user)
            return redirect('doctor:dashboard')
        else:
            messages.error(request, 'Invalid credentials or not authorized.')
    return render(request, 'doctor/login.html')

def doctor_dashboard(request):
    """Doctor dashboard view - shows only accepted appointments"""
    # Get the first doctor for demo purposes
    try:
        doctor = Doctor.objects.first()
        if not doctor:
            messages.error(request, 'No doctors found in the system.')
            return render(request, 'doctor/dashboard.html', {'doctor': None})
    except Doctor.DoesNotExist:
        messages.error(request, 'No doctors found in the system.')
        return render(request, 'doctor/dashboard.html', {'doctor': None})
    
    today = date.today()
    
    # Get accepted appointments (today and future)
    accepted_appointments = Appointment.objects.filter(
        doctor=doctor,
        status='accepted',
        appointment_date__gte=today
    ).order_by('appointment_date', 'appointment_time')[:5]  # Limit to 5 upcoming
    
    # Get all appointments for stats
    all_appointments = Appointment.objects.filter(doctor=doctor)
    
    # Get appointment counts by status
    accepted_count = all_appointments.filter(status='accepted').count()
    pending_count = all_appointments.filter(status='pending').count()
    rejected_count = all_appointments.filter(status='rejected').count()
    completed_count = all_appointments.filter(status='completed').count()
    
    # Get today's total appointments (all statuses)
    today_total_appointments = Appointment.objects.filter(
        doctor=doctor,
        appointment_date=today
    ).count()
    
    # Get recent appointments (last 5)
    recent_appointments = all_appointments.order_by('-created_at')[:5]
    
    # Get today's accepted appointments
    today_accepted = Appointment.objects.filter(
        doctor=doctor,
        status='accepted',
        appointment_date=today
    ).order_by('appointment_time')
    
    context = {
        'doctor': doctor,
        'accepted_appointments': accepted_appointments,
        'today_accepted': today_accepted,
        'recent_appointments': recent_appointments,
        'today_total_appointments': today_total_appointments,
        'accepted_count': accepted_count,
        'pending_count': pending_count,
        'rejected_count': rejected_count,
        'completed_count': completed_count,
    }
    
    return render(request, 'doctor/dashboard.html', context)

def doctor_profile(request):
    """Doctor profile view - edit profile information"""
    # Get the first doctor for demo purposes
    try:
        doctor = Doctor.objects.first()
        if not doctor:
            messages.error(request, 'No doctors found in the system.')
            return render(request, 'doctor/profile.html', {'doctor': None, 'form': None})
    except Doctor.DoesNotExist:
        messages.error(request, 'No doctors found in the system.')
        return render(request, 'doctor/profile.html', {'doctor': None, 'form': None})
    
    if request.method == 'POST':
        form = DoctorProfileForm(request.POST, instance=doctor)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('doctor:profile')
    else:
        form = DoctorProfileForm(instance=doctor)
    
    context = {
        'doctor': doctor,
        'form': form,
    }
    
    return render(request, 'doctor/profile.html', context)

def doctor_appointments(request):
    """Doctor appointments view - shows only accepted appointments by default"""
    try:
        doctor = Doctor.objects.first()
        if not doctor:
            messages.error(request, 'No doctors found in the system.')
            return render(request, 'doctor/appointments.html', {'doctor': None, 'page_obj': None})
    except Doctor.DoesNotExist:
        messages.error(request, 'No doctors found in the system.')
        return render(request, 'doctor/appointments.html', {'doctor': None, 'page_obj': None})
    
    # Default to showing only accepted appointments
    status_filter = request.GET.get('status', 'accepted')
    date_filter = request.GET.get('date', '')
    
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

def update_appointment_status(request, appointment_id):
    """Update appointment status"""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            new_status = data.get('status')
            
            doctor = Doctor.objects.first()
            if not doctor:
                return JsonResponse({'error': 'No doctor found'}, status=404)
            
            appointment = get_object_or_404(Appointment, id=appointment_id, doctor=doctor)
            
            if new_status in ['accepted', 'rejected', 'completed']:
                appointment.status = new_status
                appointment.save()
                
                return JsonResponse({
                    'success': True,
                    'message': f'Appointment {new_status} successfully',
                    'status': new_status
                })
            else:
                return JsonResponse({'error': 'Invalid status'}, status=400)
                
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)

# API Views for React integration
def doctor_appointments_api(request):
    """API to get doctor appointments"""
    try:
        doctor = Doctor.objects.first()
        if not doctor:
            return JsonResponse({'error': 'No doctor found'}, status=404)
    except Doctor.DoesNotExist:
        return JsonResponse({'error': 'No doctor found'}, status=404)
    
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
            'created_at': appointment.created_at.strftime('%Y-%m-%d %H:%M'),
        })
    
    return JsonResponse(appointments_data, safe=False)

def doctor_profile_api(request):
    """API to get doctor profile"""
    try:
        doctor = Doctor.objects.first()
        if not doctor:
            return JsonResponse({'error': 'No doctor found'}, status=404)
    except Doctor.DoesNotExist:
        return JsonResponse({'error': 'No doctor found'}, status=404)
    
    doctor_data = {
        'id': doctor.id,
        'full_name': doctor.full_name,
        'specialization': doctor.specialization.sname if doctor.specialization else None,
        'hospital': doctor.hospital.name if doctor.hospital else None,
        'experience': doctor.experience,
        'qualification': doctor.qualification,
        'consultation_fee': doctor.consultation_fee,
        'bio': doctor.bio,
        'profile_photo': doctor.profile_photo.url if doctor.profile_photo else None,
    }
    
    return JsonResponse(doctor_data)

def doctor_home(request):
    return HttpResponse("Doctor Home Page")

def get_specializations_by_hospital(request):
    """AJAX endpoint to get specializations available at a specific hospital"""
    if request.method == 'GET':
        hospital_id = request.GET.get('hospital_id')
        if hospital_id:
            try:
                hospital = Hospital.objects.get(id=hospital_id)
                specializations = hospital.specialization.all()
                specializations_data = [
                    {'id': spec.id, 'name': spec.sname} 
                    for spec in specializations
                ]
                return JsonResponse({'specializations': specializations_data})
            except Hospital.DoesNotExist:
                return JsonResponse({'error': 'Hospital not found'}, status=404)
        else:
            return JsonResponse({'error': 'Hospital ID required'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def get_user_info(request):
    """AJAX endpoint to get selected user info for autofill in admin"""
    if request.method == 'GET':
        user_id = request.GET.get('user_id')
        if not user_id:
            return JsonResponse({'error': 'user_id required'}, status=400)
        try:
            user = CustomUser.objects.only('id', 'full_name', 'contact_number', 'email', 'role').get(id=user_id)
            return JsonResponse({
                'id': user.id,
                'full_name': user.full_name or '',
                'contact_number': user.contact_number or '',
                'email': user.email or ''
            })
        except CustomUser.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

def doctor_list_api(request):
    """API to get list of doctors"""
    doctors = Doctor.objects.all()
    doctors_data = []
    for doctor in doctors:
        doctors_data.append({
            'id': doctor.id,
            'full_name': doctor.full_name,
            'specialization': doctor.specialization.sname if doctor.specialization else None,
            'hospital': doctor.hospital.name if doctor.hospital else None,
            'experience': doctor.experience,
            'consultation_fee': doctor.consultation_fee,
            'profile_photo': doctor.profile_photo.url if doctor.profile_photo else None,
        })
    
    return JsonResponse(doctors_data, safe=False)

def appointment_prescription(request, appointment_id):
    """Create or edit prescription for an accepted appointment; on save mark completed."""
    doctor = Doctor.objects.first()
    appointment = get_object_or_404(Appointment, id=appointment_id, doctor=doctor)

    prescription = getattr(appointment, 'prescription', None)

    if request.method == 'POST':
        form = AppointmentPrescriptionForm(request.POST, instance=prescription)
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
        form = AppointmentPrescriptionForm(instance=prescription)

    return render(request, 'doctor/prescription_form.html', {
        'doctor': doctor,
        'appointment': appointment,
        'form': form,
        'is_edit': prescription is not None,
    })


def doctor_detail(request, doctor_id):
    doctor = get_object_or_404(Doctor.objects.select_related('hospital').prefetch_related('specialization', 'languages'), id=doctor_id)

    sort = request.GET.get('sort', 'newest')
    page = request.GET.get('page')

    reviews_qs = doctor.reviews.all()
    if sort == 'rating_desc':
        reviews_qs = reviews_qs.order_by('-rating', '-created_at')
    elif sort == 'rating_asc':
        reviews_qs = reviews_qs.order_by('rating', '-created_at')
    else:
        reviews_qs = reviews_qs.order_by('-created_at')

    paginator = Paginator(reviews_qs, 5)
    page_obj = paginator.get_page(page)

    context = {
        'doctor': doctor,
        'page_obj': page_obj,
        'sort': sort,
    }
    return render(request, 'doctor/doctor_detail.html', context)
