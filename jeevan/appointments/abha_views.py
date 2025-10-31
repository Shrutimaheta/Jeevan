from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
import json
import random
import string
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

@csrf_exempt
@require_http_methods(["POST"])
def send_abha_otp(request):
    """
    Send OTP for ABHA ID creation
    """
    try:
        data = json.loads(request.body)
        mobile_number = data.get('mobile')
        
        if not mobile_number or len(mobile_number) != 10:
            return JsonResponse({
                'success': False,
                'error': 'Invalid mobile number'
            }, status=400)
        
        # Simulate OTP sending (in production, integrate with SMS service)
        otp = str(random.randint(100000, 999999))
        
        # Store OTP in session for verification
        request.session[f'abha_otp_{mobile_number}'] = {
            'otp': otp,
            'timestamp': datetime.now().isoformat(),
            'attempts': 0
        }
        
        logger.info(f"ABHA OTP sent to {mobile_number}: {otp}")
        
        return JsonResponse({
            'success': True,
            'message': 'OTP sent successfully',
            'otp': otp  # Remove this in production
        })
        
    except Exception as e:
        logger.error(f"Error sending ABHA OTP: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to send OTP'
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def verify_abha_otp(request):
    """
    Verify OTP for ABHA ID creation
    """
    try:
        data = json.loads(request.body)
        mobile_number = data.get('mobile')
        otp = data.get('otp')
        
        if not mobile_number or not otp:
            return JsonResponse({
                'success': False,
                'error': 'Mobile number and OTP are required'
            }, status=400)
        
        # Get stored OTP from session
        session_key = f'abha_otp_{mobile_number}'
        stored_data = request.session.get(session_key)
        
        if not stored_data:
            return JsonResponse({
                'success': False,
                'error': 'OTP not found or expired'
            }, status=400)
        
        # Check if OTP is expired (5 minutes)
        otp_time = datetime.fromisoformat(stored_data['timestamp'])
        if datetime.now() - otp_time > timedelta(minutes=5):
            del request.session[session_key]
            return JsonResponse({
                'success': False,
                'error': 'OTP has expired'
            }, status=400)
        
        # Check attempts limit
        if stored_data['attempts'] >= 3:
            del request.session[session_key]
            return JsonResponse({
                'success': False,
                'error': 'Maximum attempts exceeded'
            }, status=400)
        
        # Verify OTP
        if stored_data['otp'] != otp:
            stored_data['attempts'] += 1
            request.session[session_key] = stored_data
            return JsonResponse({
                'success': False,
                'error': 'Invalid OTP'
            }, status=400)
        
        # OTP verified successfully
        del request.session[session_key]
        
        return JsonResponse({
            'success': True,
            'message': 'OTP verified successfully'
        })
        
    except Exception as e:
        logger.error(f"Error verifying ABHA OTP: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to verify OTP'
        }, status=500)

@csrf_exempt
@require_http_methods(["POST"])
@login_required
def create_abha_id(request):
    """
    Create ABHA ID after OTP verification and store in database
    """
    try:
        data = json.loads(request.body)
        
        # Validate required fields
        required_fields = ['name', 'dob', 'gender', 'mobile', 'aadhaar', 'otp']
        for field in required_fields:
            if not data.get(field):
                return JsonResponse({
                    'success': False,
                    'error': f'{field} is required'
                }, status=400)
        
        # Validate mobile number
        mobile = data.get('mobile')
        if len(mobile) != 10 or not mobile.isdigit():
            return JsonResponse({
                'success': False,
                'error': 'Invalid mobile number'
            }, status=400)
        
        # Validate Aadhaar number
        aadhaar = data.get('aadhaar')
        if len(aadhaar) != 12 or not aadhaar.isdigit():
            return JsonResponse({
                'success': False,
                'error': 'Invalid Aadhaar number'
            }, status=400)
        
        # Verify OTP first
        session_key = f'abha_otp_{mobile}'
        stored_data = request.session.get(session_key)
        
        if not stored_data:
            return JsonResponse({
                'success': False,
                'error': 'OTP not found or expired. Please request a new OTP.'
            }, status=400)
        
        # Check if OTP is expired (5 minutes)
        otp_time = datetime.fromisoformat(stored_data['timestamp'])
        if datetime.now() - otp_time > timedelta(minutes=5):
            del request.session[session_key]
            return JsonResponse({
                'success': False,
                'error': 'OTP has expired. Please request a new OTP.'
            }, status=400)
        
        # Verify OTP
        if stored_data['otp'] != data.get('otp'):
            return JsonResponse({
                'success': False,
                'error': 'Invalid OTP. Please check and try again.'
            }, status=400)
        
        # Check if user already has an ABHA ID
        from patient.models import Patient
        try:
            patient = Patient.objects.get(user=request.user)
            if patient.abha_id:
                return JsonResponse({
                    'success': False,
                    'error': f'You already have an ABHA ID: {patient.abha_id}'
                }, status=400)
        except Patient.DoesNotExist:
            pass
        
        # Check uniqueness of user details (mobile, aadhaar)
        existing_patient = Patient.objects.filter(
            models.Q(mobile_number=mobile) | 
            models.Q(contact_number=mobile) |
            models.Q(abha_id__isnull=False)
        ).exclude(user=request.user).first()
        
        if existing_patient:
            return JsonResponse({
                'success': False,
                'error': 'A patient with this mobile number or Aadhaar already has an ABHA ID.'
            }, status=400)
        
        # Generate unique ABHA ID
        abha_id = generate_unique_abha_id()
        
        # Create or update patient record
        patient, created = Patient.objects.get_or_create(
            user=request.user,
            defaults={
                'full_name': data.get('name'),
                'date_of_birth': data.get('dob'),
                'dob': data.get('dob'),
                'gender': data.get('gender'),
                'mobile_number': mobile,
                'contact_number': mobile,
                'email': request.user.email if request.user.email else '',
                'address': '',
                'abha_id': abha_id,
            }
        )
        
        if not created:
            # Update existing patient with ABHA ID
            patient.full_name = data.get('name')
            patient.date_of_birth = data.get('dob')
            patient.dob = data.get('dob')
            patient.gender = data.get('gender')
            patient.mobile_number = mobile
            patient.contact_number = mobile
            patient.abha_id = abha_id
            patient.save()
        
        # Clear OTP session
        del request.session[session_key]
        
        logger.info(f"ABHA ID created and stored: {abha_id} for user {request.user.username}")
        
        return JsonResponse({
            'success': True,
            'abha_id': abha_id,
            'message': 'ABHA ID created and stored successfully'
        })
        
    except Exception as e:
        logger.error(f"Error creating ABHA ID: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to create ABHA ID'
        }, status=500)

def generate_unique_abha_id():
    """
    Generate a unique ABHA ID in the format: ABHA-XX-YYYY-ZZZZ
    Ensures uniqueness by checking against existing IDs in database
    """
    from patient.models import Patient
    from django.db import models
    
    max_attempts = 1000
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

@require_http_methods(["GET"])
def check_abha_status(request):
    """
    Check if ABHA ID exists and is valid
    """
    try:
        abha_id = request.GET.get('abha_id')
        
        if not abha_id:
            return JsonResponse({
                'success': False,
                'error': 'ABHA ID is required'
            }, status=400)
        
        # Mock ABHA status check
        # In production, this would query the ABHA API
        is_valid = validate_abha_id(abha_id)
        
        return JsonResponse({
            'success': True,
            'valid': is_valid,
            'message': 'ABHA ID is valid' if is_valid else 'ABHA ID is invalid'
        })
        
    except Exception as e:
        logger.error(f"Error checking ABHA status: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to check ABHA status'
        }, status=500)

def validate_abha_id(abha_id):
    """
    Validate ABHA ID format
    """
    if not abha_id:
        return False
    
    # Remove spaces and dashes
    clean_id = abha_id.replace(' ', '').replace('-', '')
    
    # Check if it's 14 characters
    if len(clean_id) != 14:
        return False
    
    # Check if it starts with ABHA
    if not clean_id.upper().startswith('ABHA'):
        return False
    
    # Check if the rest is alphanumeric
    suffix = clean_id[4:]
    return suffix.isalnum()

@require_http_methods(["GET"])
def get_abha_info(request):
    """
    Get ABHA information for the current user
    """
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'success': False,
                'error': 'Authentication required'
            }, status=401)
        
        # Get ABHA ID from session or user profile
        abha_id = request.session.get('created_abha_id', {}).get('abha_id')
        
        if not abha_id:
            return JsonResponse({
                'success': False,
                'error': 'No ABHA ID found'
            }, status=404)
        
        return JsonResponse({
            'success': True,
            'abha_id': abha_id,
            'message': 'ABHA ID retrieved successfully'
        })
        
    except Exception as e:
        logger.error(f"Error getting ABHA info: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'Failed to get ABHA information'
        }, status=500)
