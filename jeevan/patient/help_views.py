from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Patient
from .help_models import FAQ, SupportTicket, SupportMessage, HealthResource, ContactInfo
from .help_forms import SupportTicketForm, SupportMessageForm


@login_required
def help_support(request):
    """Main help and support page"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    # Get recent FAQs
    recent_faqs = FAQ.objects.filter(is_active=True)[:5]
    
    # Get active health resources
    health_resources = HealthResource.objects.filter(is_active=True)[:6]
    
    # Get contact information
    contact_info = ContactInfo.objects.filter(is_active=True).order_by('order')
    
    context = {
        'patient': patient,
        'recent_faqs': recent_faqs,
        'health_resources': health_resources,
        'contact_info': contact_info,
    }
    return render(request, 'patient/help_support.html', context)


@login_required
def faq_list(request):
    """FAQ list page"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    faqs = FAQ.objects.filter(is_active=True)
    
    # Add pagination
    paginator = Paginator(faqs, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'patient': patient,
        'faqs': page_obj,
        'page_obj': page_obj,
    }
    return render(request, 'patient/faq_list.html', context)


@login_required
def support_tickets(request):
    """Support tickets list page"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    tickets = SupportTicket.objects.filter(patient=patient)
    
    # Add pagination
    paginator = Paginator(tickets, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'patient': patient,
        'tickets': page_obj,
        'page_obj': page_obj,
    }
    return render(request, 'patient/support_tickets.html', context)


@login_required
def create_support_ticket(request):
    """Create new support ticket"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    if request.method == 'POST':
        form = SupportTicketForm(request.POST)
        if form.is_valid():
            ticket = form.save(commit=False)
            ticket.patient = patient
            ticket.save()
            messages.success(request, 'Support ticket created successfully! We will get back to you soon.')
            return redirect('patient:support_tickets')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = SupportTicketForm()
    
    context = {
        'patient': patient,
        'form': form,
    }
    return render(request, 'patient/create_support_ticket.html', context)


@login_required
def support_ticket_detail(request, ticket_id):
    """Support ticket detail page"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    ticket = get_object_or_404(SupportTicket, id=ticket_id, patient=patient)
    
    if request.method == 'POST':
        form = SupportMessageForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.ticket = ticket
            message.sender = patient
            message.save()
            messages.success(request, 'Message sent successfully!')
            return redirect('patient:support_ticket_detail', ticket_id=ticket.id)
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = SupportMessageForm()
    
    # Get all messages for this ticket
    messages_list = SupportMessage.objects.filter(ticket=ticket).order_by('created_at')
    
    context = {
        'patient': patient,
        'ticket': ticket,
        'form': form,
        'messages_list': messages_list,
    }
    return render(request, 'patient/support_ticket_detail.html', context)


@login_required
def health_resources(request):
    """Health resources page"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    category = request.GET.get('category', '')
    search_query = request.GET.get('search', '')
    
    resources = HealthResource.objects.filter(is_active=True)
    
    if category:
        resources = resources.filter(category=category)
    
    if search_query:
        resources = resources.filter(
            Q(title__icontains=search_query) | 
            Q(content__icontains=search_query)
        )
    
    # Add pagination
    paginator = Paginator(resources, 9)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    context = {
        'patient': patient,
        'resources': page_obj,
        'page_obj': page_obj,
        'category': category,
        'search_query': search_query,
        'category_choices': HealthResource.CATEGORY_CHOICES,
    }
    return render(request, 'patient/health_resources.html', context)


@login_required
def contact_info(request):
    """Contact information page"""
    try:
        patient = Patient.objects.get(user=request.user)
    except Patient.DoesNotExist:
        messages.error(request, 'Patient profile not found.')
        return redirect('patient:patient_login')
    
    contact_info = ContactInfo.objects.filter(is_active=True).order_by('order')
    
    # Separate emergency and regular contacts
    emergency_contacts = contact_info.filter(is_emergency=True)
    regular_contacts = contact_info.filter(is_emergency=False)
    
    context = {
        'patient': patient,
        'emergency_contacts': emergency_contacts,
        'regular_contacts': regular_contacts,
    }
    return render(request, 'patient/contact_info.html', context)
