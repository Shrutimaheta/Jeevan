#!/usr/bin/env python3
"""
Script to create sample data for Help & Support system
Run this script to populate the database with sample FAQs, health resources, and contact info
"""

import os
import sys
import django

# Add the project directory to Python path
sys.path.append('/home/turbo/project/Jeevan/jeevan')

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jeevan.settings')
django.setup()

from patient.help_models import FAQ, HealthResource, ContactInfo

def create_sample_data():
    print("Creating sample Help & Support data...")
    
    # Create sample FAQs
    faqs_data = [
        {
            'question': 'How do I book an appointment?',
            'answer': 'To book an appointment, go to the "Book Appointment" section in your dashboard. Select your preferred doctor, date, and time slot. You will receive a confirmation email once your appointment is booked.',
            'category': 'appointments',
            'is_active': True,
            'order': 1
        },
        {
            'question': 'How do I upload my medical documents?',
            'answer': 'You can upload documents by going to "View Documents" in your dashboard and clicking "Upload New Document". Supported formats include PDF, DOC, DOCX, and image files (JPG, PNG, etc.). Maximum file size is 10MB.',
            'category': 'documents',
            'is_active': True,
            'order': 2
        },
        {
            'question': 'How do I update my profile information?',
            'answer': 'To update your profile, go to "My Profile" in your dashboard. You can edit your personal information, contact details, and medical information. Remember to save your changes after updating.',
            'category': 'profile',
            'is_active': True,
            'order': 3
        },
        {
            'question': 'What should I do if I forget my password?',
            'answer': 'If you forget your password, click on "Forgot Password" on the login page. Enter your email address and follow the instructions sent to your email to reset your password.',
            'category': 'technical',
            'is_active': True,
            'order': 4
        },
        {
            'question': 'How do I view my appointment history?',
            'answer': 'Your appointment history is available in the "Book Appointment" section. You can view all your past and upcoming appointments, including their status and details.',
            'category': 'appointments',
            'is_active': True,
            'order': 5
        },
        {
            'question': 'What payment methods are accepted?',
            'answer': 'We accept various payment methods including credit cards, debit cards, net banking, and UPI. Payment is processed securely through our payment gateway.',
            'category': 'billing',
            'is_active': True,
            'order': 6
        }
    ]
    
    for faq_data in faqs_data:
        faq, created = FAQ.objects.get_or_create(
            question=faq_data['question'],
            defaults=faq_data
        )
        if created:
            print(f"Created FAQ: {faq.question}")
        else:
            print(f"FAQ already exists: {faq.question}")
    
    # Create sample health resources
    health_resources_data = [
        {
            'title': 'Understanding Blood Pressure',
            'content': 'Blood pressure is the force of blood pushing against the walls of your arteries. Normal blood pressure is typically 120/80 mmHg or lower. High blood pressure (hypertension) can lead to serious health problems including heart disease, stroke, and kidney disease. Regular monitoring and lifestyle changes can help manage blood pressure effectively.',
            'category': 'wellness',
            'is_active': True,
            'order': 1
        },
        {
            'title': 'Diabetes Management Tips',
            'content': 'Managing diabetes involves maintaining healthy blood sugar levels through proper diet, regular exercise, and medication as prescribed. Key tips include: eating balanced meals, monitoring blood sugar regularly, staying physically active, taking medications as directed, and regular check-ups with your healthcare provider.',
            'category': 'diseases',
            'is_active': True,
            'order': 2
        },
        {
            'title': 'Emergency First Aid Basics',
            'content': 'In case of medical emergencies, remember these basic first aid steps: 1) Call emergency services immediately, 2) Check for responsiveness, 3) Ensure clear airway, 4) Check for breathing and pulse, 5) Perform CPR if trained, 6) Control bleeding if present, 7) Keep the person comfortable until help arrives.',
            'category': 'emergency',
            'is_active': True,
            'order': 3
        },
        {
            'title': 'Mental Health and Wellness',
            'content': 'Mental health is as important as physical health. Practice self-care by getting enough sleep, eating well, exercising regularly, and managing stress. Don\'t hesitate to seek professional help if you\'re feeling overwhelmed, anxious, or depressed. Remember, it\'s okay to ask for help.',
            'category': 'mental_health',
            'is_active': True,
            'order': 4
        },
        {
            'title': 'Healthy Eating Guidelines',
            'content': 'A balanced diet includes fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, added sugars, and excessive salt. Stay hydrated by drinking plenty of water. Consider consulting a nutritionist for personalized dietary advice based on your health conditions.',
            'category': 'nutrition',
            'is_active': True,
            'order': 5
        },
        {
            'title': 'Exercise and Physical Activity',
            'content': 'Regular physical activity helps maintain a healthy weight, strengthens muscles and bones, improves mental health, and reduces the risk of chronic diseases. Aim for at least 150 minutes of moderate-intensity exercise per week. Always consult your doctor before starting a new exercise program.',
            'category': 'exercise',
            'is_active': True,
            'order': 6
        }
    ]
    
    for resource_data in health_resources_data:
        resource, created = HealthResource.objects.get_or_create(
            title=resource_data['title'],
            defaults=resource_data
        )
        if created:
            print(f"Created Health Resource: {resource.title}")
        else:
            print(f"Health Resource already exists: {resource.title}")
    
    # Create sample contact information
    contact_info_data = [
        {
            'name': 'Emergency Department',
            'phone': '+91-9876543210',
            'email': 'emergency@hospital.com',
            'department': 'Emergency Services',
            'is_emergency': True,
            'is_active': True,
            'order': 1
        },
        {
            'name': 'Appointment Desk',
            'phone': '+91-9876543211',
            'email': 'appointments@hospital.com',
            'department': 'Appointment Scheduling',
            'is_emergency': False,
            'is_active': True,
            'order': 2
        },
        {
            'name': 'Technical Support',
            'phone': '+91-9876543212',
            'email': 'support@hospital.com',
            'department': 'IT Support',
            'is_emergency': False,
            'is_active': True,
            'order': 3
        },
        {
            'name': 'Billing Department',
            'phone': '+91-9876543213',
            'email': 'billing@hospital.com',
            'department': 'Billing & Payments',
            'is_emergency': False,
            'is_active': True,
            'order': 4
        },
        {
            'name': 'General Information',
            'phone': '+91-9876543214',
            'email': 'info@hospital.com',
            'department': 'General Inquiries',
            'is_emergency': False,
            'is_active': True,
            'order': 5
        }
    ]
    
    for contact_data in contact_info_data:
        contact, created = ContactInfo.objects.get_or_create(
            name=contact_data['name'],
            defaults=contact_data
        )
        if created:
            print(f"Created Contact: {contact.name}")
        else:
            print(f"Contact already exists: {contact.name}")
    
    print("\nSample Help & Support data created successfully!")
    print("You can now access the Help & Support section from the patient dashboard.")

if __name__ == '__main__':
    create_sample_data()
