from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from jeevan.decorators import doctor_required
from doctor.models import Doctor
from doctor.forms import DoctorProfileForm
from care.models import Hospital, Specialization

def get_current_doctor(request):
    """Helper function to get the current logged-in doctor"""
    if not hasattr(request.user, 'role') or request.user.role != 'doctor':
        return None
    try:
        return Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        return None

@doctor_required
def doctor_profile(request):
    """Doctor profile view - edit profile information"""
    try:
        doctor = Doctor.objects.get(user=request.user)
    except Doctor.DoesNotExist:
        messages.error(request, 'Doctor profile not found. Please contact administrator.')
        return redirect('universal_login')
    
    if request.method == 'POST':
        form = DoctorProfileForm(request.POST, request.FILES, instance=doctor)
        if form.is_valid():
            updated_doctor = form.save(commit=True)
            doctor = Doctor.objects.select_related('user').prefetch_related('specialization').get(pk=updated_doctor.pk)
            messages.success(request, 'Profile updated successfully!')
            form = DoctorProfileForm(instance=doctor)
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = DoctorProfileForm(instance=doctor)
    
    doctor.refresh_from_db()
    hospitals = Hospital.objects.all()
    specializations = Specialization.objects.all()
    
    context = {
        'doctor': doctor,
        'form': form,
        'hospitals': hospitals,
        'specializations': specializations,
    }
    return render(request, 'doctor/profile.html', context)

def doctor_home(request):
    from django.http import HttpResponse
    return HttpResponse("Doctor Home Page")

def public_doctor_profile(request, doctor_id):
    """Public profile view for a doctor"""
    doctor = get_object_or_404(Doctor, id=doctor_id)
    is_authenticated = request.user.is_authenticated
    context = {
        'doctor': doctor,
        'is_authenticated': is_authenticated,
    }
    return render(request, 'doctor/public_profile.html', context)
