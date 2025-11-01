from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.views import View
from care.models import CustomUser


@method_decorator(ensure_csrf_cookie, name='dispatch')
class HomePageView(View):
    """Beautiful home page with login modal"""
    
    def get(self, request):
        """Display the home page"""
        if request.user.is_authenticated:
            # Redirect authenticated users to their appropriate dashboard
            return self.redirect_to_dashboard(request.user)
        
        # Import models
        from care.models import Hospital, Specialization
        from doctor.models import Doctor
        
        # Get hospitals, doctors, and specializations from database
        hospitals = Hospital.objects.all()
        featured_doctors = Doctor.objects.all()[:8]  # Limit to 8 featured doctors
        specializations = Specialization.objects.all()
        
        context = {
            'hospitals': hospitals,
            'featured_doctors': featured_doctors,
            'specializations': specializations,
        }
        
        return render(request, 'universal_auth/home.html', context)
    
    def redirect_to_dashboard(self, user):
        """Redirect user to their role-specific dashboard"""
        role = user.role
        
        if role == 'patient':
            return HttpResponseRedirect(reverse('patient:profile_dashboard'))
        elif role == 'doctor':
            return HttpResponseRedirect(reverse('doctor:dashboard'))
        elif role == 'receptionist':
            return HttpResponseRedirect(reverse('receptionist:dashboard'))
        elif role == 'nurse':
            return HttpResponseRedirect(reverse('nurse:dashboard'))
        elif role == 'admin':
            return HttpResponseRedirect('/admin/')
        else:
            # Fallback to patient dashboard if role is not recognized
            return HttpResponseRedirect(reverse('patient:profile_dashboard'))


class UniversalLoginView(View):
    """Universal login view that handles authentication for all user roles"""
    
    def get(self, request):
        """Display the login form"""
        if request.user.is_authenticated:
            # Redirect authenticated users to their appropriate dashboard
            return self.redirect_to_dashboard(request.user)
        
        # Get the next URL parameter
        next_url = request.GET.get('next', '')
        
        return render(request, 'universal_auth/login.html', {'next_url': next_url})
    
    def post(self, request):
        """Process the login form submission"""
        username = request.POST.get('username')
        password = request.POST.get('password')
        role = request.POST.get('role')
        
        if not all([username, password, role]):
            messages.error(request, 'Please fill in all fields.')
            return render(request, 'universal_auth/login.html')
        
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
        
        if user is None:
            messages.error(request, 'Invalid username or password.')
            return render(request, 'universal_auth/login.html')
        
        # Check if user has the selected role
        if user.role != role:
            messages.error(request, f'You are not authorized to login as {role}. Your role is {user.role}.')
            return render(request, 'universal_auth/login.html')
        
        # Check if user is active
        if not user.is_active:
            messages.error(request, 'Your account is inactive. Please contact administrator.')
            return render(request, 'universal_auth/login.html')
        
        # Login the user
        login(request, user)
        
        # Get the user's full name based on role and redirect
        if role == 'patient':
            patient_obj = getattr(user, 'patient', None) or getattr(user, 'patient_profile', None)
            full_name = getattr(patient_obj, 'full_name', None) or getattr(user, 'full_name', None) or user.get_username()
            messages.success(request, f'Welcome back, {full_name}!')
        elif role == 'doctor':
            if hasattr(user, 'doctor'):
                full_name = user.doctor.full_name
                messages.success(request, f'Welcome back, Dr. {full_name}!')
            else:
                messages.success(request, f'Welcome back, Dr. {user.get_username()}!')
        elif role == 'receptionist':
            if hasattr(user, 'receptionist'):
                full_name = user.receptionist.full_name
                messages.success(request, f'Welcome back, {full_name}!')
            else:
                messages.success(request, f'Welcome back, {user.get_username()}!')
        elif role == 'nurse':
            if hasattr(user, 'nurse'):
                full_name = user.nurse.full_name
                messages.success(request, f'Welcome back, {full_name}!')
            else:
                messages.success(request, f'Welcome back, {user.get_username()}!')
        elif role == 'admin':
            messages.success(request, f'Welcome back, Admin {user.get_username()}!')
        else:
            messages.success(request, f'Welcome back, {user.get_username()}!')
        
        # Check if there's a 'next' parameter for redirection
        next_url = request.GET.get('next') or request.POST.get('next')
        if next_url:
            # Only allow patients to book appointments
            if role == 'patient':
                return HttpResponseRedirect(next_url)
            else:
                messages.info(request, 'Only patients can book appointments. Redirecting to your dashboard.')
        
        # Redirect to appropriate dashboard
        return self.redirect_to_dashboard(user)
    
    def redirect_to_dashboard(self, user):
        """Redirect user to their role-specific dashboard"""
        role = user.role
        
        if role == 'patient':
            return HttpResponseRedirect(reverse('patient:profile_dashboard'))
        elif role == 'doctor':
            return HttpResponseRedirect(reverse('doctor:dashboard'))
        elif role == 'receptionist':
            return HttpResponseRedirect(reverse('receptionist:dashboard'))
        elif role == 'nurse':
            return HttpResponseRedirect(reverse('nurse:dashboard'))
        elif role == 'admin':
            return HttpResponseRedirect('/admin/')
        else:
            # Fallback to patient dashboard if role is not recognized
            return HttpResponseRedirect(reverse('patient:profile_dashboard'))


class UniversalLogoutView(View):
    """Universal logout view"""
    
    def get(self, request):
        """Logout the user and redirect to login page"""
        logout(request)
        messages.success(request, 'You have been logged out successfully.')
        return redirect('universal_login')


# Function-based view alternative (for compatibility)
@csrf_protect
def universal_login(request):
    """Function-based universal login view"""
    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect_to_dashboard(request.user)
        return render(request, 'universal_auth/login.html')
    
    elif request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        role = request.POST.get('role')
        
        if not all([username, password, role]):
            messages.error(request, 'Please fill in all fields.')
            return render(request, 'universal_auth/login.html')
        
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
        
        if user is None:
            messages.error(request, 'Invalid username or password.')
            return render(request, 'universal_auth/login.html')
        
        if user.role != role:
            messages.error(request, f'You are not authorized to login as {role}. Your role is {user.role}.')
            return render(request, 'universal_auth/login.html')
        
        if not user.is_active:
            messages.error(request, 'Your account is inactive. Please contact administrator.')
            return render(request, 'universal_auth/login.html')
        
        login(request, user)
        
        # Get the user's full name based on role
        if role == 'patient':
            patient_obj = getattr(user, 'patient', None) or getattr(user, 'patient_profile', None)
            full_name = getattr(patient_obj, 'full_name', None) or getattr(user, 'full_name', None) or user.get_username()
            messages.success(request, f'Welcome back, {full_name}!')
        elif role == 'doctor':
            if hasattr(user, 'doctor'):
                full_name = user.doctor.full_name
                messages.success(request, f'Welcome back, Dr. {full_name}!')
            else:
                messages.success(request, f'Welcome back, Dr. {user.get_username()}!')
        elif role == 'receptionist':
            if hasattr(user, 'receptionist'):
                full_name = user.receptionist.full_name
                messages.success(request, f'Welcome back, {full_name}!')
            else:
                messages.success(request, f'Welcome back, {user.get_username()}!')
        elif role == 'nurse':
            if hasattr(user, 'nurse'):
                full_name = user.nurse.full_name
                messages.success(request, f'Welcome back, {full_name}!')
            else:
                messages.success(request, f'Welcome back, {user.get_username()}!')
        elif role == 'admin':
            messages.success(request, f'Welcome back, Admin {user.get_username()}!')
        else:
            messages.success(request, f'Welcome back, {user.get_username()}!')
        
        return redirect_to_dashboard(user)


def universal_logout(request):
    """Function-based universal logout view"""
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('universal_auth:universal_login')


def redirect_to_dashboard(user):
    """Helper function to redirect user to appropriate dashboard"""
    role = user.role
    
    if role == 'patient':
        return HttpResponseRedirect(reverse('patient:profile_dashboard'))
    elif role == 'doctor':
        return HttpResponseRedirect(reverse('doctor:dashboard'))
    elif role == 'receptionist':
        return HttpResponseRedirect(reverse('receptionist:dashboard'))
    elif role == 'nurse':
        return HttpResponseRedirect(reverse('nurse:dashboard'))
    elif role == 'admin':
        return HttpResponseRedirect('/admin/')
    else:
        return HttpResponseRedirect(reverse('patient:profile_dashboard'))