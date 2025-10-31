from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib import messages
from django.core.cache import cache
from django.utils import timezone
import random
import string
from datetime import datetime, timedelta
import json

def index(request):
    return HttpResponse("ABHA module works!")

@login_required
def create_abha_id(request):
    """
    View to handle ABHA ID creation form with OTP verification
    """
    if request.method == 'POST':
        # Handle both form data and JSON data
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            name = data.get('name', '').strip()
            dob = data.get('dob', '')
            gender = data.get('gender', '')
            mobile = data.get('mobile', '').strip()
            aadhaar = data.get('aadhaar', '').strip()
        else:
            # Fallback for form data
            name = request.POST.get('name', '').strip()
            dob = request.POST.get('dob', '')
            gender = request.POST.get('gender', '')
            mobile = request.POST.get('mobile', '').strip()
            aadhaar = request.POST.get('aadhaar', '').strip()
        
        # Validate required fields
        if not all([name, dob, gender, mobile, aadhaar]):
            return JsonResponse({
                'success': False,
                'error': 'Please fill in all required fields.'
            })
        
        # Validate mobile number
        if len(mobile) != 10 or not mobile.isdigit():
            return JsonResponse({
                'success': False,
                'error': 'Please enter a valid 10-digit mobile number.'
            })
        
        # Validate Aadhaar number
        if len(aadhaar) != 12 or not aadhaar.isdigit():
            return JsonResponse({
                'success': False,
                'error': 'Please enter a valid 12-digit Aadhaar number.'
            })
        
        # Check if OTP has been verified
        verification_key = f"abha_verified_{mobile}_{aadhaar}"
        verification_data = cache.get(verification_key)
        
        if not verification_data or not verification_data.get('verified'):
            return JsonResponse({
                'success': False,
                'error': 'Please verify your mobile number with OTP first.'
            })
        
        # Check for existing patient with same details
        try:
            from patient.models import Patient
            
            # Check if patient already exists with same mobile number
            existing_by_mobile = Patient.objects.filter(mobile_number=mobile).first()
            if existing_by_mobile and existing_by_mobile.abha_id:
                return JsonResponse({
                    'success': False,
                    'error': f'ABHA ID already exists for this mobile number: {existing_by_mobile.abha_id}'
                })
            
            # Check if patient exists with same Aadhaar number
            existing_by_aadhaar = Patient.objects.filter(contact_number=aadhaar).first()
            if existing_by_aadhaar and existing_by_aadhaar.abha_id:
                return JsonResponse({
                    'success': False,
                    'error': f'ABHA ID already exists for this Aadhaar number: {existing_by_aadhaar.abha_id}'
                })
            
            # Check if patient exists with same name, DOB, and gender (comprehensive check)
            existing_by_details = Patient.objects.filter(
                full_name__iexact=name,
                date_of_birth=dob,
                gender=gender
            ).first()
            if existing_by_details and existing_by_details.abha_id:
                return JsonResponse({
                    'success': False,
                    'error': f'ABHA ID already exists for this person: {existing_by_details.abha_id}'
                })
            
            # Check if current user already has an ABHA ID
            current_user_patient = Patient.objects.filter(user=request.user).first()
            if current_user_patient and current_user_patient.abha_id:
                return JsonResponse({
                    'success': False,
                    'error': f'You already have an ABHA ID: {current_user_patient.abha_id}'
                })
            
            # Generate unique ABHA ID
            abha_id = generate_unique_abha_id()
            
            # Get or create patient
            patient, created = Patient.objects.get_or_create(
                user=request.user,
                defaults={
                    'full_name': name,
                    'date_of_birth': dob,
                    'dob': dob,  # Also set the existing dob field
                    'gender': gender,
                    'mobile_number': mobile,
                    'contact_number': mobile,  # Also set contact_number
                    'email': request.user.email if request.user.email else '',
                    'address': '',
                    'abha_id': abha_id,
                }
            )
            
            if not created:
                # Update existing patient with new details
                patient.full_name = name
                patient.date_of_birth = dob
                patient.dob = dob  # Also update the existing dob field
                patient.gender = gender
                patient.mobile_number = mobile
                patient.contact_number = mobile  # Also update contact_number
                patient.abha_id = abha_id
                patient.save()
            
            # Clear verification cache after successful creation
            cache.delete(verification_key)
            
            # Return success response with patient details for auto-filling
            return JsonResponse({
                'success': True,
                'abha_id': abha_id,
                'message': 'ABHA ID created successfully!',
                'patient_details': {
                    'name': name,
                    'dob': dob,
                    'gender': gender,
                    'mobile': mobile,
                    'aadhaar': aadhaar
                }
            })
            
        except ImportError:
            # If Patient model doesn't exist, just return the generated ID
            abha_id = generate_unique_abha_id()
            return JsonResponse({
                'success': True,
                'abha_id': abha_id,
                'message': 'ABHA ID created successfully!'
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            })
    
    return render(request, 'abha/create_abha.html')

def generate_unique_abha_id():
    """
    Generate a unique ABHA ID in the format: ABHA-XX-YYYY-ZZZZ
    Ensures uniqueness by checking against existing IDs
    """
    from patient.models import Patient
    
    max_attempts = 1000  # Increased attempts for better uniqueness
    attempts = 0
    
    while attempts < max_attempts:
        prefix = 'ABHA'
        part1 = random.randint(10, 99)  # 2-digit number
        part2 = random.randint(1000, 9999)  # 4-digit number
        part3 = random.randint(1000, 9999)  # 4-digit number
        
        abha_id = f"{prefix}-{part1}-{part2}-{part3}"
        
        # Check if this ID already exists in the database
        if not Patient.objects.filter(abha_id=abha_id).exists():
            return abha_id
        
        attempts += 1
    
    # If we can't generate a unique ID after max attempts, raise an error
    raise Exception("Unable to generate unique ABHA ID. Please try again.")

@csrf_exempt
@require_http_methods(["POST"])
def generate_otp(request):
    """
    Generate and send OTP for ABHA ID creation
    """
    try:
        data = json.loads(request.body)
        
        name = data.get('name', '').strip()
        dob = data.get('dob', '')
        gender = data.get('gender', '')
        mobile = data.get('mobile', '').strip()
        aadhaar = data.get('aadhaar', '').strip()
        
        # Validate required fields
        if not all([name, dob, gender, mobile, aadhaar]):
            return JsonResponse({
                'success': False,
                'error': 'Please fill in all required fields.'
            })
        
        # Validate mobile number
        if len(mobile) != 10 or not mobile.isdigit():
            return JsonResponse({
                'success': False,
                'error': 'Please enter a valid 10-digit mobile number.'
            })
        
        # Validate Aadhaar number
        if len(aadhaar) != 12 or not aadhaar.isdigit():
            return JsonResponse({
                'success': False,
                'error': 'Please enter a valid 12-digit Aadhaar number.'
            })
        
        # Check for existing ABHA ID
        try:
            from patient.models import Patient
            
            # Check if patient already exists with same mobile number
            existing_by_mobile = Patient.objects.filter(mobile_number=mobile).first()
            if existing_by_mobile and existing_by_mobile.abha_id:
                return JsonResponse({
                    'success': False,
                    'error': f'ABHA ID already exists for this mobile number: {existing_by_mobile.abha_id}'
                })
            
            # Check if patient exists with same Aadhaar number
            existing_by_aadhaar = Patient.objects.filter(contact_number=aadhaar).first()
            if existing_by_aadhaar and existing_by_aadhaar.abha_id:
                return JsonResponse({
                    'success': False,
                    'error': f'ABHA ID already exists for this Aadhaar number: {existing_by_aadhaar.abha_id}'
                })
            
            # Check if patient exists with same name, DOB, and gender
            existing_by_details = Patient.objects.filter(
                full_name__iexact=name,
                date_of_birth=dob,
                gender=gender
            ).first()
            if existing_by_details and existing_by_details.abha_id:
                return JsonResponse({
                    'success': False,
                    'error': f'ABHA ID already exists for this person: {existing_by_details.abha_id}'
                })
            
            # Check if current user already has an ABHA ID
            if request.user.is_authenticated:
                current_user_patient = Patient.objects.filter(user=request.user).first()
                if current_user_patient and current_user_patient.abha_id:
                    return JsonResponse({
                        'success': False,
                        'error': f'You already have an ABHA ID: {current_user_patient.abha_id}'
                    })
        
        except ImportError:
            # If Patient model doesn't exist, continue with OTP generation
            pass
        
        # Generate 4-digit OTP
        otp = str(random.randint(1000, 9999))
        
        # Store OTP in cache with expiration (5 minutes)
        cache_key = f"abha_otp_{mobile}_{aadhaar}"
        cache.set(cache_key, {
            'otp': otp,
            'name': name,
            'dob': dob,
            'gender': gender,
            'mobile': mobile,
            'aadhaar': aadhaar,
            'created_at': timezone.now().isoformat()
        }, timeout=300)  # 5 minutes
        
        # In a real implementation, you would send SMS here
        # For now, we'll return the OTP for testing purposes
        return JsonResponse({
            'success': True,
            'otp': otp,  # Remove this in production
            'message': f'OTP sent to mobile number ending with {mobile[-4:]}',
            'expires_in': 300  # 5 minutes
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': f'Error generating OTP: {str(e)}'
        })

@csrf_exempt
@require_http_methods(["POST"])
def verify_otp(request):
    """
    Verify OTP for ABHA ID creation
    """
    try:
        data = json.loads(request.body)
        
        mobile = data.get('mobile', '').strip()
        aadhaar = data.get('aadhaar', '').strip()
        entered_otp = data.get('otp', '').strip()
        
        if not all([mobile, aadhaar, entered_otp]):
            return JsonResponse({
                'success': False,
                'error': 'Please provide mobile number, Aadhaar number, and OTP.'
            })
        
        # Get stored OTP data
        cache_key = f"abha_otp_{mobile}_{aadhaar}"
        stored_data = cache.get(cache_key)
        
        if not stored_data:
            return JsonResponse({
                'success': False,
                'error': 'OTP has expired or not found. Please generate a new OTP.'
            })
        
        # Verify OTP
        if stored_data['otp'] != entered_otp:
            return JsonResponse({
                'success': False,
                'error': 'Invalid OTP. Please check and try again.'
            })
        
        # OTP verified successfully
        # Store verification status in cache
        verification_key = f"abha_verified_{mobile}_{aadhaar}"
        cache.set(verification_key, {
            'verified': True,
            'user_data': stored_data,
            'verified_at': timezone.now().isoformat()
        }, timeout=600)  # 10 minutes
        
        return JsonResponse({
            'success': True,
            'message': 'OTP verified successfully!',
            'verified': True
        })
        
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': f'Error verifying OTP: {str(e)}'
        })
@csrf_exempt
@require_http_methods(["POST"])
def check_abha_uniqueness(request):
    """
    Check if ABHA ID can be created for given user details
    """
    import json
    data = json.loads(request.body)
    
    name = data.get('name', '').strip()
    dob = data.get('dob', '')
    gender = data.get('gender', '')
    mobile = data.get('mobile', '').strip()
    aadhaar = data.get('aadhaar', '').strip()
    
    try:
        from patient.models import Patient
        
        # Check if patient already exists with same mobile number
        existing_by_mobile = Patient.objects.filter(mobile_number=mobile).first()
        if existing_by_mobile and existing_by_mobile.abha_id:
            return JsonResponse({
                'can_create': False,
                'error': f'ABHA ID already exists for this mobile number: {existing_by_mobile.abha_id}'
            })
        
        # Check if patient exists with same Aadhaar number
        existing_by_aadhaar = Patient.objects.filter(contact_number=aadhaar).first()
        if existing_by_aadhaar and existing_by_aadhaar.abha_id:
            return JsonResponse({
                'can_create': False,
                'error': f'ABHA ID already exists for this Aadhaar number: {existing_by_aadhaar.abha_id}'
            })
        
        # Check if patient exists with same name, DOB, and gender
        existing_by_details = Patient.objects.filter(
            full_name__iexact=name,
            date_of_birth=dob,
            gender=gender
        ).first()
        if existing_by_details and existing_by_details.abha_id:
            return JsonResponse({
                'can_create': False,
                'error': f'ABHA ID already exists for this person: {existing_by_details.abha_id}'
            })
        
        # Check if current user already has an ABHA ID
        if request.user.is_authenticated:
            current_user_patient = Patient.objects.filter(user=request.user).first()
            if current_user_patient and current_user_patient.abha_id:
                return JsonResponse({
                    'can_create': False,
                    'error': f'You already have an ABHA ID: {current_user_patient.abha_id}'
                })
        
        return JsonResponse({
            'can_create': True,
            'message': 'ABHA ID can be created for this user.'
        })
        
    except Exception as e:
        return JsonResponse({
            'can_create': False,
            'error': str(e)
        })

@csrf_exempt
@require_http_methods(["POST"])
def verify_abha(request):
    """
    Mock ABHA verification endpoint
    """
    import json
    data = json.loads(request.body)
    abha_id = data.get('abha_id', '')
    
    # Mock verification - in real implementation, this would call ABHA API
    if abha_id.startswith('ABHA-'):
        return JsonResponse({
            'valid': True,
            'name': 'Mock Patient Name',
            'dob': '1990-01-01',
            'gender': 'M'
        })
    else:
        return JsonResponse({
            'valid': False,
            'error': 'Invalid ABHA ID format'
        })
