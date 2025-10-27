from django.shortcuts import render
from care.models import Hospital, Specialization
from doctor.models import Doctor
from django.db.models import Q
from django.template.loader import render_to_string
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

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
    
    return render(request, 'home.html', context)


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

def test(request):
    return render(request, 'test.html')

def debug(request):
    return render(request, 'debug.html')

def simple_test(request):
    return render(request, 'simple_test.html')

def react_debug(request):
    return render(request, 'react_debug.html')

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
        
        context = {
            'hospital': hospital,
            'doctors': doctors,
            'specializations': specializations,
            'search_query': search_query,
            'specialization_filter': specialization_filter,
        }
        
        return render(request, 'hospital_doctors.html', context)
    except Hospital.DoesNotExist:
        return render(request, '404.html', {'message': 'Hospital not found'})

def book_appointment(request):
    """Public appointment booking page"""
    from care.models import Hospital
    from doctor.models import Doctor
    
    # Get URL parameters for pre-selection
    hospital_id = request.GET.get('hospital')
    doctor_id = request.GET.get('doctor')
    
    hospitals = Hospital.objects.all()
    doctors = Doctor.objects.all()
    
    # Pre-select based on URL parameters
    selected_hospital = None
    selected_doctor = None
    
    if hospital_id:
        try:
            selected_hospital = Hospital.objects.get(id=hospital_id)
            doctors = doctors.filter(hospital=selected_hospital)
        except Hospital.DoesNotExist:
            pass
    
    if doctor_id:
        try:
            selected_doctor = Doctor.objects.get(id=doctor_id)
        except Doctor.DoesNotExist:
            pass
    
    context = {
        'hospitals': hospitals,
        'doctors': doctors,
        'selected_hospital': selected_hospital,
        'selected_doctor': selected_doctor,
    }
    
    return render(request, 'book_appointment.html', context)


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
        reply = f"You can book an appointment here: /appointments/book/" \
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