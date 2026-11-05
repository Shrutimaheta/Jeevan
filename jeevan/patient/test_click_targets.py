from datetime import timedelta, time
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase, Client
from django.urls import resolve, reverse
from django.utils import timezone
from jeevan.test_helpers import JeevanTestClientMixin
from appointments.models import Appointment
from doctor.models import AppointmentPrescription
from .models import PatientDocument
from .help_models import HealthResource, FAQ, SupportTicket


class Targets(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.urls, self.fragments, self.ids = [], [], set()
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('href'):
            self.urls.append(attrs['href'])
        if tag == 'form' and attrs.get('action'):
            self.urls.append(attrs['action'])
        if attrs.get('data-bs-target', '').startswith('#'):
            self.fragments.append(attrs['data-bs-target'][1:])


class PatientClickTargetTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.user = self.create_user('click_patient')
        self.patient = self.create_patient_profile(self.user)
        self.hospital = self.create_hospital()
        self.doctor = self.create_doctor_profile(self.create_user('click_doctor', role='doctor'), self.hospital)
        self.appointment = Appointment.objects.create(patient=self.patient, doctor=self.doctor, hospital=self.hospital,
            appointment_date=timezone.localdate()+timedelta(days=1), appointment_time=time(10), status='pending')
        self.prescription = AppointmentPrescription.objects.create(appointment=self.appointment, doctor=self.doctor,
            patient_name=self.patient.full_name, diagnosis='Fictional diagnosis', medications='Fictional medication')
        self.document = PatientDocument.objects.create(patient=self.patient, title='Fictional link audit',
            document_type='report', file=SimpleUploadedFile('link-audit.pdf', b'%PDF-1.4 fictional', content_type='application/pdf'))
        self.addCleanup(self.document.file.storage.delete, self.document.file.name)
        HealthResource.objects.create(title='Fictional resource', content='Example resource content', category='other')
        FAQ.objects.create(question='Fictional question?', answer='Example answer')
        self.ticket = SupportTicket.objects.create(patient=self.patient, subject='Fictional ticket', description='Example issue')
        self.client.force_login(self.user)

    def test_populated_pages_have_resolvable_links_forms_and_modal_targets(self):
        pages = ['/patient/documents/', f'/patient/documents/{self.document.pk}/', '/patient/documents/upload/',
                 '/patient/prescriptions/', f'/patient/prescriptions/{self.prescription.pk}/',
                 '/patient/help/', reverse('patient:faq_list'), '/patient/help/resources/', '/patient/help/contact/',
                 '/patient/help/tickets/', f'/patient/help/tickets/{self.ticket.pk}/', '/patient/help/tickets/create/',
                 '/appointments/', '/appointments/create/', f'/appointments/update/{self.appointment.pk}/',
                 f'/appointments/detail/{self.appointment.pk}/', f'/appointments/cancel/{self.appointment.pk}/']
        for page in pages:
            with self.subTest(page=page):
                response = self.client.get(page)
                self.assertEqual(response.status_code, 200)
                parsed = Targets(response.content.decode())
                for target in parsed.urls:
                    if target.startswith(('mailto:', 'tel:', 'javascript:', '#')):
                        continue
                    url = urlsplit(urljoin('http://testserver' + page, target))
                    if url.netloc != 'testserver':
                        continue
                    resolve(url.path)
                for fragment in parsed.fragments:
                    self.assertIn(fragment, parsed.ids, f'{page}: missing target #{fragment}')

    def test_appointment_page_cannot_generate_fake_abha_or_call_missing_save_route(self):
        response = self.client.get('/appointments/create/')
        self.assertEqual(response.content.decode().lower().count('<body'), 1)
        self.assertEqual(response.content.decode().lower().count('<!doctype html>'), 1)
        self.assertContains(response, 'ABHA linking is currently unavailable')
        for text in ('generateABHAId', '/patient/save-abha-id/', 'Create ABHA ID Now', 'ABHA ID Created Successfully'):
            self.assertNotContains(response, text)
        self.assertContains(response, 'id="hospital-select"')
        self.assertContains(response, "getElementById('hospital-select')")
        self.assertNotContains(response, "amPmSelect.value = 'PM'")
        import re
        import shutil
        import subprocess
        import tempfile
        from pathlib import Path
        from django.conf import settings
        if shutil.which('node'):
            with tempfile.TemporaryDirectory(dir=settings.BASE_DIR) as directory:
                for index, script in enumerate(re.findall(r'<script\b[^>]*>(.*?)</script>', response.content.decode(), re.S | re.I)):
                    if not script.strip():
                        continue
                    path = Path(directory) / f'booking-{index}.js'
                    path.write_text(script, encoding='utf-8')
                    result = subprocess.run(['node', '--check', str(path)], capture_output=True, text=True)
                    self.assertEqual(result.returncode, 0, result.stderr)

    def test_empty_prescription_booking_button_opens_booking(self):
        self.prescription.delete()
        response = self.client.get(reverse('patient:prescription_list'))
        self.assertContains(response, 'Book an Appointment')
        self.assertContains(response, f'href="{reverse("appointments:appointment_create")}"')

    def test_document_delete_requires_csrf_post_and_get_is_read_only(self):
        target = reverse('patient:document_delete', args=[self.document.pk])
        self.assertEqual(self.client.get(target).status_code, 405)
        self.assertTrue(PatientDocument.objects.filter(pk=self.document.pk).exists())
        csrf_client = Client(enforce_csrf_checks=True)
        csrf_client.force_login(self.user)
        self.assertEqual(csrf_client.post(target).status_code, 403)
        self.assertTrue(PatientDocument.objects.filter(pk=self.document.pk).exists())
        self.assertEqual(self.client.post(target).status_code, 302)
        self.assertFalse(PatientDocument.objects.filter(pk=self.document.pk).exists())
