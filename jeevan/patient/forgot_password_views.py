from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from .models import Patient, PasswordResetToken
from .forms import ForgotPasswordForm, ResetPasswordForm
import random
import string


def forgot_password(request):
    """Forgot password page - step 1: Enter email or phone"""
    if request.method == 'POST':
        form = ForgotPasswordForm(request.POST)
        if form.is_valid():
            patient = form.cleaned_data['patient']
            recovery_method = form.cleaned_data['recovery_method']
            
            # Delete any existing unused tokens for this patient
            PasswordResetToken.objects.filter(patient=patient, is_used=False).delete()
            
            # Create a new token
            token_obj = PasswordResetToken.objects.create(patient=patient)
            
            # Generate OTP for phone verification
            if recovery_method == 'phone':
                otp = ''.join(random.choices(string.digits, k=6))
                # Store OTP in session (in production, use Redis or database)
                request.session[f'otp_{patient.id}'] = otp
                request.session[f'otp_time_{patient.id}'] = timezone.now().isoformat()
                
                # In production, send SMS here
                # For now, we'll show it in a message (remove in production)
                messages.success(request, f'OTP sent to {patient.contact_number}. OTP: {otp}')
                
                return redirect('patient:verify_otp', patient_id=patient.id)
            
            # For email verification
            elif recovery_method == 'email':
                # Generate OTP for email verification
                otp = ''.join(random.choices(string.digits, k=6))
                # Store OTP in session (in production, use Redis or database)
                request.session[f'email_otp_{patient.id}'] = otp
                request.session[f'email_otp_time_{patient.id}'] = timezone.now().isoformat()
                
                subject = 'Password Reset Code - Patient Management System'
                message = f'''
                Hello {patient.full_name},
                
                You have requested to reset your password for your Patient Management System account.
                
                Your verification code is: {otp}
                
                This code will expire in 5 minutes.
                
                If you did not request this password reset, please ignore this email.
                
                Best regards,
                Patient Management System Team
                '''
                
                try:
                    send_mail(
                        subject,
                        message,
                        settings.DEFAULT_FROM_EMAIL,
                        [patient.email],
                        fail_silently=False,
                    )
                    messages.success(request, f'Verification code sent to {patient.email}. Code: {otp}')
                except Exception as e:
                    messages.error(request, 'Failed to send email. Please try again later.')
                    return render(request, 'patient/forgot_password.html', {'form': form})
                
                return redirect('patient:verify_email_otp', patient_id=patient.id)
    
    else:
        form = ForgotPasswordForm()
    
    return render(request, 'patient/forgot_password.html', {'form': form})


def verify_otp(request, patient_id):
    """Verify OTP for phone number reset"""
    try:
        patient = Patient.objects.get(id=patient_id)
    except Patient.DoesNotExist:
        messages.error(request, 'Invalid request.')
        return redirect('patient:forgot_password')
    
    if request.method == 'POST':
        entered_otp = request.POST.get('otp')
        stored_otp = request.session.get(f'otp_{patient_id}')
        otp_time_str = request.session.get(f'otp_time_{patient_id}')
        
        if not stored_otp or not otp_time_str:
            messages.error(request, 'OTP has expired. Please request a new one.')
            return redirect('patient:forgot_password')
        
        # Check if OTP is expired (5 minutes)
        otp_time = timezone.datetime.fromisoformat(otp_time_str)
        if timezone.now() > otp_time + timezone.timedelta(minutes=5):
            messages.error(request, 'OTP has expired. Please request a new one.')
            del request.session[f'otp_{patient_id}']
            del request.session[f'otp_time_{patient_id}']
            return redirect('patient:forgot_password')
        
        if entered_otp == stored_otp:
            # OTP verified, create reset token
            token_obj = PasswordResetToken.objects.create(patient=patient)
            # Clear OTP from session
            del request.session[f'otp_{patient_id}']
            del request.session[f'otp_time_{patient_id}']
            
            messages.success(request, 'OTP verified successfully!')
            return redirect('patient:reset_password', token=token_obj.token)
        else:
            messages.error(request, 'Invalid OTP. Please try again.')
    
    return render(request, 'patient/verify_otp.html', {'patient': patient})


def verify_email_otp(request, patient_id):
    """Verify OTP for email reset"""
    try:
        patient = Patient.objects.get(id=patient_id)
    except Patient.DoesNotExist:
        messages.error(request, 'Invalid request.')
        return redirect('patient:forgot_password')
    
    if request.method == 'POST':
        entered_otp = request.POST.get('otp')
        stored_otp = request.session.get(f'email_otp_{patient_id}')
        otp_time_str = request.session.get(f'email_otp_time_{patient_id}')
        
        if not stored_otp or not otp_time_str:
            messages.error(request, 'Verification code has expired. Please request a new one.')
            return redirect('patient:forgot_password')
        
        # Check if OTP is expired (5 minutes)
        otp_time = timezone.datetime.fromisoformat(otp_time_str)
        if timezone.now() > otp_time + timezone.timedelta(minutes=5):
            messages.error(request, 'Verification code has expired. Please request a new one.')
            del request.session[f'email_otp_{patient_id}']
            del request.session[f'email_otp_time_{patient_id}']
            return redirect('patient:forgot_password')
        
        if entered_otp == stored_otp:
            # OTP verified, create reset token
            token_obj = PasswordResetToken.objects.create(patient=patient)
            # Clear OTP from session
            del request.session[f'email_otp_{patient_id}']
            del request.session[f'email_otp_time_{patient_id}']
            
            messages.success(request, 'Email verification successful!')
            return redirect('patient:reset_password', token=token_obj.token)
        else:
            messages.error(request, 'Invalid verification code. Please try again.')
    
    return render(request, 'patient/verify_email_otp.html', {'patient': patient})


def reset_password(request, token):
    """Reset password page - step 2: Enter new password"""
    try:
        token_obj = PasswordResetToken.objects.get(token=token)
    except PasswordResetToken.DoesNotExist:
        messages.error(request, 'Invalid or expired reset link.')
        return redirect('patient:forgot_password')
    
    if not token_obj.is_valid():
        messages.error(request, 'Reset link has expired or has already been used.')
        return redirect('patient:forgot_password')
    
    if request.method == 'POST':
        form = ResetPasswordForm(request.POST)
        if form.is_valid():
            new_password = form.cleaned_data['new_password']
            
            # Update patient's password
            patient = token_obj.patient
            patient.user.set_password(new_password)
            patient.user.save()
            
            # Mark token as used
            token_obj.is_used = True
            token_obj.save()
            
            messages.success(request, 'Password reset successfully! You can now login with your new password.')
            return redirect('patient:patient_login')
    
    else:
        form = ResetPasswordForm()
    
    return render(request, 'patient/reset_password.html', {'form': form, 'patient': token_obj.patient})


def forgot_password_sent(request):
    """Confirmation page after sending reset email (legacy - not used with OTP system)"""
    return render(request, 'patient/forgot_password_sent.html')
