from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from care.models import Hospital, Specialization
from doctor.models import Doctor
from django.db.models import Q
from django.template.loader import render_to_string
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect
from urllib.parse import urlencode
import json
from jeevan.decorators import rate_limit

@rate_limit(key_prefix="login", limit=5, period=60)
def universal_login(request):
    """Universal login view for all user types"""
    # Hide next query parameter in the address bar by storing it in the session
    if request.method == 'GET' and 'next' in request.GET:
        next_url = request.GET.get('next')
        if next_url:
            request.session['next_url'] = next_url
        return redirect('universal_login')

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        role = request.POST.get('role', 'patient')  # Default to patient if no role selected
        
        if username and password:
            # Try to authenticate the user
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

                    # Retrieve and redirect to stored next_url if exists
                    next_url = request.session.pop('next_url', None) or request.POST.get('next')
                    if next_url:
                        messages.success(request, 'Logged in successfully!')
                        return redirect(next_url)

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
    
    # Render the universal login template
    return render(request, 'universal_auth/login.html')

def universal_logout(request):
    """Universal logout view for all user types"""
    logout(request)
    messages.info(request, 'You have been logged out successfully.')
    return redirect('universal_login')

def home(request):
    """Home page view"""
    return index(request)

def index(request):
    # Get all hospitals with their specializations
    hospitals = Hospital.objects.all().prefetch_related('specialization')
    
    # Get all specializations for filtering
    specializations = Specialization.objects.all()
    
    # Get featured doctors (you can modify this query as needed)
    featured_doctors = Doctor.objects.select_related('hospital').prefetch_related('specialization')[:6]
    
    # Get search parameters
    search_query = request.GET.get('search', '')
    specialization_filter = request.GET.get('specialization', '')
    location_filter = request.GET.get('location', '')
    min_rating = request.GET.get('min_rating')
    available_today = request.GET.get('available_today')
    insurance = request.GET.get('insurance')
    
    # Filter hospitals based on search criteria
    if search_query:
        hospitals = hospitals.filter(
            Q(name__icontains=search_query) | 
            Q(location__icontains=search_query)
        )
    
    if specialization_filter:
        hospitals = hospitals.filter(specialization__id=specialization_filter)
    
    if location_filter:
        hospitals = hospitals.filter(location__icontains=location_filter)

    if min_rating:
        try:
            hospitals = hospitals.filter(rating__gte=float(min_rating))
        except ValueError:
            pass

    if insurance == '1':
        hospitals = hospitals.filter(accepts_insurance=True)
    
    context = {
        'hospitals': hospitals,
        'specializations': specializations,
        'featured_doctors': featured_doctors,
        'search_query': search_query,
        'specialization_filter': specialization_filter,
        'location_filter': location_filter,
        'min_rating': min_rating or '',
        'available_today': available_today or '',
        'insurance': insurance or '',
    }
    
    response = render(request, 'universal_auth/home.html', context)
    
    # Add cache prevention headers for security
    response['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
    response['Pragma'] = 'no-cache'
    response['Expires'] = '0'
    
    return response


def htmx_filter_hospitals(request):
    hospitals = Hospital.objects.all().prefetch_related('specialization')
    search_query = request.GET.get('search', '')
    specialization_filter = request.GET.get('specialization', '')
    location_filter = request.GET.get('location', '')
    min_rating = request.GET.get('min_rating')
    insurance = request.GET.get('insurance')

    if search_query:
        hospitals = hospitals.filter(Q(name__icontains=search_query) | Q(location__icontains=search_query))
    if specialization_filter:
        hospitals = hospitals.filter(specialization__id=specialization_filter)
    if location_filter:
        hospitals = hospitals.filter(location__icontains=location_filter)
    if min_rating:
        try:
            hospitals = hospitals.filter(rating__gte=float(min_rating))
        except ValueError:
            pass
    if insurance == '1':
        hospitals = hospitals.filter(accepts_insurance=True)

    html = render_to_string('partials/hospital_list.html', {'hospitals': hospitals}, request=request)
    return HttpResponse(html)


def htmx_filter_doctors(request):
    doctors = Doctor.objects.select_related('hospital').prefetch_related('specialization').filter(is_active=True)
    search_query = request.GET.get('search', '')
    specialization_filter = request.GET.get('specialization', '')
    min_rating = request.GET.get('min_rating')
    available_today = request.GET.get('available_today')
    insurance = request.GET.get('insurance')

    if search_query:
        doctors = doctors.filter(Q(full_name__icontains=search_query) | Q(specialization__sname__icontains=search_query) | Q(hospital__name__icontains=search_query))
    if specialization_filter:
        doctors = doctors.filter(specialization__id=specialization_filter)
    if min_rating:
        try:
            doctors = doctors.filter(rating__gte=float(min_rating))
        except ValueError:
            pass
    if insurance == '1':
        doctors = doctors.filter(accepts_insurance=True)

    # Available today: has any appointment slots free today - simplifying: no accepted appointment at date today for now
    if available_today == '1':
        from django.utils import timezone
        today = timezone.localdate()
        # Doctor considered available if they have fewer than X accepted appointments today (simplified)
        doctors = doctors.exclude(appointments__appointment_date=today, appointments__status='accepted')

    html = render_to_string('partials/doctor_list.html', {'doctors': doctors}, request=request)
    return HttpResponse(html)



def patient_home(request):
    doctors = [
        {"name": "Dr. Aditi Sharma", "specialty": "Cardiologist", "photo": "https://via.placeholder.com/300x300?text=Dr.+Aditi"},
        {"name": "Dr. Rohan Verma", "specialty": "Neurologist", "photo": "https://via.placeholder.com/300x300?text=Dr.+Rohan"},
        {"name": "Dr. Meera Iyer", "specialty": "Pediatrician", "photo": "https://via.placeholder.com/300x300?text=Dr.+Meera"},
        {"name": "Dr. Akash Patel", "specialty": "Dermatologist", "photo": "https://via.placeholder.com/300x300?text=Dr.+Akash"},
    ]
    return render(request, 'patient_home.html', {"doctors": doctors})

def vaidya_login(request):
    return render(request, 'vaidya_login.html')

def hospital_doctors(request, hospital_id):
    """View to show all doctors in a specific hospital"""
    try:
        hospital = Hospital.objects.get(id=hospital_id)
        doctors = Doctor.objects.filter(hospital=hospital).select_related('hospital').prefetch_related('specialization')
        
        # Get search parameters
        search_query = request.GET.get('search', '')
        specialization_filter = request.GET.get('specialization', '')
        
        # Filter doctors based on search criteria
        if search_query:
            doctors = doctors.filter(
                Q(full_name__icontains=search_query) | 
                Q(specialization__sname__icontains=search_query)
            )
        
        if specialization_filter:
            doctors = doctors.filter(specialization__id=specialization_filter)
        
        # Get all specializations for filtering
        specializations = Specialization.objects.all()
        
        # Check if user is authenticated and get patient data
        patient = None
        is_authenticated = request.user.is_authenticated
        if is_authenticated:
            try:
                from patient.models import Patient
                patient = Patient.objects.get(user=request.user)
            except:
                patient = None
        
        context = {
            'hospital': hospital,
            'doctors': doctors,
            'specializations': specializations,
            'search_query': search_query,
            'specialization_filter': specialization_filter,
            'is_authenticated': is_authenticated,
            'patient': patient,
        }
        
        return render(request, 'hospital_doctors.html', context)
    except Hospital.DoesNotExist:
        return render(request, '404.html', {'message': 'Hospital not found'})

def redirect_book_to_create(request):
    """Temporary redirect: /appointments/book/ -> /appointments/create/ (preserve query params)"""
    query = request.META.get('QUERY_STRING', '')
    target = '/appointments/create/'
    if query:
        target = f"{target}?{query}"
    return HttpResponseRedirect(target)

from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.utils.decorators import method_decorator

@ensure_csrf_cookie
@csrf_protect
def book_appointment(request):
    """Appointment booking page with authentication check"""
    from care.models import Hospital
    from doctor.models import Doctor
    from django.contrib.auth.decorators import login_required
    from django.shortcuts import redirect
    from django.contrib import messages
    
    # Check if user is authenticated
    if not request.user.is_authenticated:
        messages.warning(request, 'Please log in to book an appointment.')
        return redirect('/login/')
    
    # Get patient data
    try:
        from patient.models import Patient
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found. Please complete your profile first.')
        return redirect('patient:patient_profile')
    
    # Get URL parameters for pre-selection
    hospital_id = request.GET.get('hospital')
    doctor_id = request.GET.get('doctor')
    
    # Create AppointmentForm with pre-selected values
    from appointments.forms import AppointmentForm
    
    # Prepare initial data for form
    initial_data = {}
    
    # If doctor is selected, automatically set the hospital
    if doctor_id:
        try:
            selected_doctor = Doctor.objects.get(id=doctor_id)
            initial_data['hospital'] = selected_doctor.hospital.id
            initial_data['doctor'] = selected_doctor.id
        except Doctor.DoesNotExist:
            pass
    
    # If only hospital is selected (and no doctor), set hospital
    elif hospital_id:
        try:
            selected_hospital = Hospital.objects.get(id=hospital_id)
            initial_data['hospital'] = selected_hospital.id
        except Hospital.DoesNotExist:
            pass
    
    # Handle POST request (form submission)
    if request.method == 'POST':
        print("POST request received for appointment booking")
        print("POST data:", request.POST)
        
        form = AppointmentForm(request.POST, patient=patient)
        
        # If form is invalid, reload doctor choices based on selected hospital
        if not form.is_valid() and 'hospital' in form.data:
            hospital_id = form.data.get('hospital')
            if hospital_id:
                form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=hospital_id)
                form.fields['doctor'].widget.attrs['disabled'] = False
        
        if form.is_valid():
            print("Form is valid, creating appointment")
            appointment = form.save(commit=False)
            appointment.patient = patient
            
            # Handle ABHA ID - if not provided, generate internal patient code
            if not appointment.abha_id:
                from datetime import datetime
                # Generate internal patient code: P + YYYYMMDD + 3-digit sequence
                today = datetime.now()
                date_str = today.strftime('%Y%m%d')
                
                # Get the count of appointments for this patient today
                from appointments.models import Appointment
                today_appointments = Appointment.objects.filter(
                    patient=patient,
                    created_at__date=today.date()
                ).count()
                
                # Generate unique internal code
                sequence = str(today_appointments + 1).zfill(3)
                appointment.abha_id = f"P{date_str}{sequence}"
            
            appointment.save()
            print(f"Appointment created successfully: {appointment.id}")
            messages.success(request, 'Appointment booked successfully! You will be notified once it\'s confirmed.')
            return redirect('appointments:appointment_list')
        else:
            print("Form is invalid")
            print("Form errors:", form.errors)
            # Add error messages to the request
            for field, errors in form.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
    else:
        # Create form with initial data for GET request
        form = AppointmentForm(patient=patient, initial=initial_data)
        
        # If doctor is pre-selected, filter doctor queryset to that hospital
        if doctor_id and 'doctor' in initial_data:
            form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=initial_data['hospital'])
    
    context = {
        'form': form,
        'patient': patient,
        'is_authenticated': True,
    }
    
    return render(request, 'appointments/appointment_create.html', context)


@csrf_exempt
def dialogflow_webhook(request):
    if request.method != 'POST':
        return JsonResponse({"error": "Invalid method"}, status=405)
    try:
        payload = json.loads(request.body.decode('utf-8'))
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    query_text = (
        payload.get('queryResult', {})
        .get('queryText', '')
    )
    intent = (
        payload.get('queryResult', {})
        .get('intent', {})
        .get('displayName', '')
    )
    params = payload.get('queryResult', {}).get('parameters', {})

    # Basic intent routing
    if intent == 'Appointment.Query':
        hospital = params.get('hospital') or ''
        spec = params.get('specialization') or ''
        reply = f"You can book an appointment here: /appointments/create/" \
                f"{'?hospital='+str(hospital) if hospital else ''}"
        return JsonResponse({"fulfillmentText": reply})

    if intent == 'FAQ.General':
        return JsonResponse({"fulfillmentText": "You can find FAQs on our site. For anything else, ask me!"})

    if intent == 'Escalation.Human':
        return JsonResponse({"fulfillmentText": "I’m connecting you to our support team. Please wait a moment."})

    # Default fallback
    return JsonResponse({"fulfillmentText": "Sorry, I didn't get that. Could you rephrase?"})

def test_logo(request):
    return render(request, 'test_logo.html')

def emergency_guide(request):
    """Comprehensive emergency guide with tips and information"""
    return render(request, 'emergency/emergency_guide.html')

def emergency_nearest_hospitals(request):
    """Find nearest emergency hospitals"""
    from care.models import Hospital
    
    hospitals = Hospital.objects.all().order_by('name')
    
    context = {
        'hospitals': hospitals,
    }
    return render(request, 'emergency/nearest_hospitals.html', context)


from django.views.decorators.csrf import csrf_protect

@csrf_protect
def book_appointment(request):

    """Appointment booking page with authentication check"""

    from care.models import Hospital

    from doctor.models import Doctor

    from django.contrib.auth.decorators import login_required

    from django.shortcuts import redirect

    from django.contrib import messages

    

    # Check if user is authenticated

    if not request.user.is_authenticated:

        messages.warning(request, 'Please log in to book an appointment.')

        return redirect('/login/')

    

    # Get patient data

    try:

        from patient.models import Patient

        patient = Patient.objects.get(user=request.user)

    except Patient.DoesNotExist:

        messages.error(request, 'Patient profile not found. Please complete your profile first.')

        return redirect('patient:patient_profile')

    

    # Get URL parameters for pre-selection

    hospital_id = request.GET.get('hospital')

    doctor_id = request.GET.get('doctor')

    

    # Create AppointmentForm with pre-selected values

    from appointments.forms import AppointmentForm

    

    # Prepare initial data for form

    initial_data = {}

    

    # If doctor is selected, automatically set the hospital

    if doctor_id:

        try:

            selected_doctor = Doctor.objects.get(id=doctor_id)

            initial_data['hospital'] = selected_doctor.hospital.id

            initial_data['doctor'] = selected_doctor.id

        except Doctor.DoesNotExist:

            pass

    

    # If only hospital is selected (and no doctor), set hospital

    elif hospital_id:

        try:

            selected_hospital = Hospital.objects.get(id=hospital_id)

            initial_data['hospital'] = selected_hospital.id

        except Hospital.DoesNotExist:

            pass

    

    # Handle POST request (form submission)

    if request.method == 'POST':

        print(f"POST request received. CSRF token in headers: {request.META.get('HTTP_X_CSRFTOKEN')}")
        print(f"CSRF token in POST data: {request.POST.get('csrfmiddlewaretoken')}")
        
        form = AppointmentForm(request.POST, patient=patient)

        

        # If form is invalid, reload doctor choices based on selected hospital

        if not form.is_valid() and 'hospital' in form.data:

            hospital_id = form.data.get('hospital')

            if hospital_id:

                form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=hospital_id)

                form.fields['doctor'].widget.attrs['disabled'] = False

        

        if form.is_valid():

            appointment = form.save(commit=False)

            appointment.patient = patient

            

            # Handle ABHA ID - if not provided, generate internal patient code

            if not appointment.abha_id:

                from datetime import datetime

                # Generate internal patient code: P + YYYYMMDD + 3-digit sequence

                today = datetime.now()

                date_str = today.strftime('%Y%m%d')

                

                # Get the count of appointments for this patient today

                from appointments.models import Appointment

                today_appointments = Appointment.objects.filter(

                    patient=patient,

                    created_at__date=today.date()

                ).count()

                

                # Generate unique internal code

                sequence = str(today_appointments + 1).zfill(3)

                appointment.abha_id = f"P{date_str}{sequence}"

            

            appointment.save()

            messages.success(request, 'Appointment booked successfully! You will be notified once it\'s confirmed.')

            return redirect('appointments:appointment_list')

        else:

            # Debug: Print form errors

            print("Form errors:", form.errors)

            print("Form data:", form.data)

    else:

        # Create form with initial data for GET request

        form = AppointmentForm(patient=patient, initial=initial_data)

        

        # If doctor is pre-selected, filter doctor queryset to that hospital

        if doctor_id and 'doctor' in initial_data:

            form.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=initial_data['hospital'])

    

    context = {

        'form': form,

        'patient': patient,

        'is_authenticated': True,

    }

    

    return render(request, 'appointments/appointment_create.html', context)





@csrf_exempt

def dialogflow_webhook(request):

    if request.method != 'POST':

        return JsonResponse({"error": "Invalid method"}, status=405)

    try:

        payload = json.loads(request.body.decode('utf-8'))

    except Exception:

        return JsonResponse({"error": "Invalid JSON"}, status=400)



    query_text = (

        payload.get('queryResult', {})

        .get('queryText', '')

    )

    intent = (

        payload.get('queryResult', {})

        .get('intent', {})

        .get('displayName', '')

    )

    params = payload.get('queryResult', {}).get('parameters', {})



    # Basic intent routing

    if intent == 'Appointment.Query':

        hospital = params.get('hospital') or ''

        spec = params.get('specialization') or ''

        reply = f"You can book an appointment here: /appointments/create/{'?hospital='+str(hospital) if hospital else ''}"

        return JsonResponse({"fulfillmentText": reply})



    if intent == 'FAQ.General':

        return JsonResponse({"fulfillmentText": "You can find FAQs on our site. For anything else, ask me!"})



    if intent == 'Escalation.Human':

        return JsonResponse({"fulfillmentText": "I’m connecting you to our support team. Please wait a moment."})



    # Default fallback

    return JsonResponse({"fulfillmentText": "Sorry, I didn't get that. Could you rephrase?"})



def test_logo(request):

    return render(request, 'test_logo.html')



def emergency_guide(request):

    """Comprehensive emergency guide with tips and information"""

    return render(request, 'emergency/emergency_guide.html')



def emergency_nearest_hospitals(request):

    """Find nearest emergency hospitals"""

    from care.models import Hospital

    

    hospitals = Hospital.objects.all().order_by('name')

    

    context = {

        'hospitals': hospitals,

    }

    return render(request, 'emergency/nearest_hospitals.html', context)
