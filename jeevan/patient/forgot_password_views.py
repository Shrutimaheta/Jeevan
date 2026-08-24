import secrets
import string
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth import update_session_auth_hash
from care.models import CustomUser
from .models import Patient, PasswordResetToken, OTPVerification
from .forms import ForgotPasswordForm, ResetPasswordForm
from jeevan.decorators import rate_limit


@rate_limit(key_prefix="forgot_password", limit=5, period=60)
def forgot_password(request):
    """Forgot password page - step 1: Enter email or phone"""
    if request.method == 'POST':
        form = ForgotPasswordForm(request.POST)
        if form.is_valid():
            recovery_method = form.cleaned_data['recovery_method']
            email = form.cleaned_data.get('email')
            contact_number = form.cleaned_data.get('contact_number')
            
            user = None
            patient = None
            
            # Find the user and check if they have a patient profile
            if recovery_method == 'email':
                user = CustomUser.objects.filter(email=email).first()
            elif recovery_method == 'phone':
                user = CustomUser.objects.filter(contact_number=contact_number).first()
                
            if user:
                try:
                    patient = user.patient_profile
                except Patient.DoesNotExist:
                    # User is not a patient, ignore to prevent enumeration
                    user = None
            
            # If user exists, generate and send OTP
            if user and patient:
                # Check resend throttle (60 seconds cooldown)
                now = timezone.now()
                last_otp = OTPVerification.objects.filter(user=user, purpose='password_reset').first()
                if last_otp and now < last_otp.created_at + timezone.timedelta(seconds=60):
                    messages.error(request, 'Please wait at least 60 seconds before requesting a new code.')
                    return render(request, 'patient/forgot_password.html', {'form': form})
                
                # Delete any old OTPs
                OTPVerification.objects.filter(user=user, purpose='password_reset').delete()
                
                # Generate a cryptographically secure 6-digit OTP using secrets
                otp = ''.join(secrets.choice(string.digits) for _ in range(6))
                
                # Hash the OTP
                otp_hash = make_password(otp)
                
                # Save to database
                OTPVerification.objects.create(
                    user=user,
                    otp_hash=otp_hash,
                    purpose='password_reset',
                    expires_at=now + timezone.timedelta(minutes=5),
                    attempts=0,
                    max_attempts=3
                )
                
                # Log/print OTP in console for developer/test access
                print(f"==========================================")
                print(f"[SECURITY] Generated OTP for user {user.username}: {otp}")
                print(f"==========================================")
                
                # Send the OTP via recovery channel
                if recovery_method == 'phone':
                    # In production, send SMS. For dev, we do NOT put OTP in messages.
                    messages.success(request, 'A verification code has been sent to your registered phone number.')
                    request.session['reset_user_id'] = user.id
                    return redirect('patient:verify_otp', patient_id=patient.id)
                else:
                    subject = 'Password Reset Code - Patient Management System'
                    message = f'''Hello {patient.full_name},
                    
You have requested to reset your password.
Your verification code is: {otp}

This code will expire in 5 minutes.
If you did not request this, please ignore this email.

Best regards,
Patient Management System Team'''
                    try:
                        send_mail(
                            subject,
                            message,
                            settings.DEFAULT_FROM_EMAIL,
                            [user.email],
                            fail_silently=False,
                        )
                        messages.success(request, 'A verification code has been sent to your registered email address.')
                    except Exception as e:
                        print(f"Error sending email: {e}")
                        messages.error(request, 'Failed to send verification code. Please try again later.')
                        return render(request, 'patient/forgot_password.html', {'form': form})
                    
                    request.session['reset_user_id'] = user.id
                    return redirect('patient:verify_email_otp', patient_id=patient.id)
            else:
                # To prevent user enumeration, simulate a redirect and success message even if user does not exist
                messages.success(request, f'A verification code has been sent to your registered {recovery_method}.')
                request.session['reset_user_id'] = None
                dummy_id = 9999999
                if recovery_method == 'phone':
                    return redirect('patient:verify_otp', patient_id=dummy_id)
                else:
                    return redirect('patient:verify_email_otp', patient_id=dummy_id)
                    
    else:
        form = ForgotPasswordForm()
        
    return render(request, 'patient/forgot_password.html', {'form': form})


def verify_otp_internal(request, patient_id, template_name, recovery_method):
    """Internal helper to verify phone/email OTP"""
    reset_user_id = request.session.get('reset_user_id')
    
    # Try to fetch the patient for UI rendering
    patient = None
    if patient_id != 9999999:
        try:
            patient = Patient.objects.get(id=patient_id)
        except Patient.DoesNotExist:
            pass
            
    if request.method == 'POST':
        entered_otp = request.POST.get('otp', '').strip()
        
        # If dummy session or mismatch, fail gracefully to prevent enumeration timing
        if not reset_user_id:
            messages.error(request, 'Invalid verification code. Please try again.')
            return render(request, template_name, {'patient': patient})
            
        user = CustomUser.objects.filter(id=reset_user_id).first()
        if not user:
            messages.error(request, 'Invalid verification code. Please try again.')
            return render(request, template_name, {'patient': patient})
            
        verification = OTPVerification.objects.filter(user=user, purpose='password_reset').first()
        if not verification:
            messages.error(request, 'Verification code has expired. Please request a new one.')
            return redirect('patient:forgot_password')
            
        # Check expiry
        if timezone.now() > verification.expires_at:
            verification.delete()
            messages.error(request, 'Verification code has expired. Please request a new one.')
            return redirect('patient:forgot_password')
            
        # Increment attempts and save
        verification.attempts += 1
        verification.save()
        
        if verification.attempts > verification.max_attempts:
            verification.delete()
            messages.error(request, 'Too many failed attempts. Please request a new code.')
            return redirect('patient:forgot_password')
            
        # Check OTP
        if check_password(entered_otp, verification.otp_hash):
            # Success!
            # Generate a 15-minute single-use reset token linked to the patient
            patient_profile = get_object_or_404(Patient, user=user)
            
            # Delete any existing unused tokens first
            PasswordResetToken.objects.filter(patient=patient_profile, is_used=False).delete()
            
            token_obj = PasswordResetToken.objects.create(patient=patient_profile)
            
            # Delete verification object
            verification.delete()
            # Clear user ID from session
            if 'reset_user_id' in request.session:
                del request.session['reset_user_id']
                
            messages.success(request, 'Verification successful!')
            return redirect('patient:reset_password', token=token_obj.token)
        else:
            remaining = verification.max_attempts - verification.attempts
            if remaining <= 0:
                verification.delete()
                messages.error(request, 'Too many failed attempts. Please request a new code.')
                return redirect('patient:forgot_password')
            else:
                messages.error(request, f'Invalid verification code. You have {remaining} attempts remaining.')
                
    return render(request, template_name, {'patient': patient})


@rate_limit(key_prefix="verify_otp", limit=5, period=60)
def verify_otp(request, patient_id):
    """Verify OTP for phone number reset"""
    return verify_otp_internal(request, patient_id, 'patient/verify_otp.html', 'phone')


@rate_limit(key_prefix="verify_email_otp", limit=5, period=60)
def verify_email_otp(request, patient_id):
    """Verify OTP for email reset"""
    return verify_otp_internal(request, patient_id, 'patient/verify_email_otp.html', 'email')


@rate_limit(key_prefix="reset_password", limit=5, period=60)
def reset_password(request, token):
    """Reset password page - step 2: Enter new password"""
    try:
        token_obj = PasswordResetToken.objects.get(token=token)
    except PasswordResetToken.DoesNotExist:
        messages.error(request, 'Invalid or expired reset link.')
        return redirect('patient:forgot_password')
    
    # Token must be unused and less than 15 minutes old
    if token_obj.is_used or timezone.now() > token_obj.created_at + timezone.timedelta(minutes=15):
        messages.error(request, 'Reset link has expired or has already been used.')
        return redirect('patient:forgot_password')
        
    if request.method == 'POST':
        form = ResetPasswordForm(request.POST)
        if form.is_valid():
            new_password = form.cleaned_data['new_password']
            patient = token_obj.patient
            
            # Validate password using Django's validators
            try:
                validate_password(new_password, user=patient.user)
            except ValidationError as e:
                for error in e.messages:
                    form.add_error('new_password', error)
                return render(request, 'patient/reset_password.html', {'form': form, 'patient': patient})
                
            # Update password
            patient.user.set_password(new_password)
            patient.user.save()
            
            # Mark token as used
            token_obj.is_used = True
            token_obj.save()
            
            # Invalidate all previous reset tokens after password change
            PasswordResetToken.objects.filter(patient=patient).update(is_used=True)
            
            # Rotate active session using update_session_auth_hash
            update_session_auth_hash(request, patient.user)
            
            messages.success(request, 'Password reset successfully! You can now login with your new password.')
            return redirect('universal_login')
    else:
        form = ResetPasswordForm()
        
    return render(request, 'patient/reset_password.html', {'form': form, 'patient': token_obj.patient})


def forgot_password_sent(request):
    """Confirmation page (legacy)"""
    return render(request, 'patient/forgot_password_sent.html')
