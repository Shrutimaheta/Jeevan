"""Populated-page link, form destination, tab and inline-control regressions."""
import json
import re
import shutil
import subprocess
from datetime import timedelta
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import resolve, reverse
from django.utils import timezone

from appointments.models import Appointment
from care import test_multiuser_sync as multiuser
from doctor.models import AppointmentPrescription, Consent
from nurse.models import ClinicalNote
from patient.models import PatientDocument


class ControlParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.actions, self.handlers, self.fragments = [], [], [], []
        self.ids = set()

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])
        if tag == 'form':
            self.actions.append(attrs.get('action', ''))
        for key, value in attrs.items():
            if key.startswith('on') and value:
                self.handlers.append(value)
        target = attrs.get('data-bs-target')
        if target and target.startswith('#'):
            self.fragments.append(target[1:])


class PopulatedStaffControlTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        multiuser.MultiUserSynchronizationTests.setUpTestData.__func__(cls)
        cls.appointments = {}
        for index, status in enumerate(('pending', 'accepted', 'completed', 'rejected', 'cancelled'), start=1):
            cls.appointments[status] = Appointment.objects.create(
                doctor=cls.doctor, patient=cls.patient, hospital=cls.hospital,
                appointment_date=timezone.localdate() + timedelta(days=index),
                appointment_time='10:00', status=status,
                symptoms='Fictional populated control check',
                rejection_reason='Fictional rejection reason' if status == 'rejected' else '',
            )
        cls.prescription = AppointmentPrescription.objects.create(
            appointment=cls.appointments['completed'], doctor=cls.doctor,
            patient_name=cls.patient.full_name, diagnosis='Fictional populated diagnosis',
            medications='Example medicine - Example dose - Example frequency - Example duration',
        )
        cls.consent = Consent.objects.create(doctor=cls.doctor, patient=cls.patient, status='approved')
        cls.note = ClinicalNote.objects.create(patient=cls.patient, nurse=cls.users['nurse'].nurse,
                                              note='Fictional populated clinical note')

    def setUp(self):
        multiuser.MultiUserSynchronizationTests.setUp(self)

    def test_populated_staff_pages_have_working_links_forms_tabs_and_inline_controls(self):
        document = PatientDocument.objects.create(patient=self.patient, title='Populated report', document_type='report',
            file=SimpleUploadedFile('staff-controls.pdf', b'%PDF-1.4 fictional control report', content_type='application/pdf'))
        self.addCleanup(document.file.storage.delete, document.file.name)
        pages = {
            'doctor': [reverse('doctor:' + route) for route in ('dashboard', 'profile', 'appointments', 'patients', 'calendar')]
                + [reverse('doctor:patient_detail', args=[self.patient.pk]),
                   reverse('doctor:patient_reports', args=[self.patient.pk]),
                   reverse('doctor:request_consent', args=[self.patient.pk]),
                   reverse('doctor:appointment_prescription', args=[self.appointments['accepted'].pk]),
                   reverse('doctor:view_prescription', args=[self.appointments['completed'].pk])],
            'nurse': [reverse('nurse:dashboard'), reverse('nurse:patient_detail', args=[self.patient.pk])],
            'receptionist': [reverse('receptionist:' + route) for route in
                ('dashboard', 'profile', 'change_password', 'appointments', 'doctor_schedule',
                 'doctor_availability', 'book_appointment', 'patient_list', 'register_patient')]
                + [reverse('receptionist:book_appointment_for_patient', args=[self.patient.pk]),
                   reverse('receptionist:doctor_schedule') + f'?doctor_id={self.doctor.pk}',
                   reverse('receptionist:doctor_availability') + f'?doctor_id={self.doctor.pk}'],
            'care_coordinator': [reverse('coordinator_dashboard')],
        }
        inventory = {'pages': 0, 'links': 0, 'form_actions': 0, 'modal_targets': 0, 'inline_handlers': 0,
                     'unique_destinations': set()}
        checked = set()
        for role, routes in pages.items():
            for page in routes:
                with self.subTest(role=role, page=page):
                    if role == 'doctor' and page == reverse('doctor:request_consent', args=[self.patient.pk]):
                        Consent.objects.filter(patient=self.patient).delete()
                    response = self.clients[role].get(page)
                    self.assertEqual(response.status_code, 200)
                    parser = ControlParser()
                    parser.feed(response.content.decode())
                    inventory['pages'] += 1
                    inventory['links'] += len(parser.links)
                    inventory['form_actions'] += len(parser.actions)
                    inventory['modal_targets'] += len(parser.fragments)
                    inventory['inline_handlers'] += len(parser.handlers)
                    for target in parser.fragments:
                        self.assertIn(target, parser.ids, f'{page}: missing modal/tab #{target}')
                    for action in parser.actions:
                        resolved = urlsplit(urljoin(page, action)).path
                        resolve(resolved)
                    if shutil.which('node'):
                        result = subprocess.run(['node', '-e',
                            'JSON.parse(process.argv[1]).forEach(code => new Function(code));', json.dumps(parser.handlers)],
                            capture_output=True, text=True)
                        self.assertEqual(result.returncode, 0, f'{page}: {result.stderr}')
                    for target in parser.links:
                        if target.startswith('#'):
                            if len(target) > 1:
                                self.assertIn(target[1:], parser.ids, f'{page}: missing fragment {target}')
                            continue
                        if urlsplit(target).scheme or target.startswith('//'):
                            continue
                        destination = urljoin(page, target)
                        path = urlsplit(destination).path
                        resolve(path)
                        if any(part in path for part in ('logout', 'download', 'export')):
                            continue
                        if (role, destination) in checked:
                            continue
                        checked.add((role, destination))
                        inventory['unique_destinations'].add(destination)
                        result = self.clients[role].get(destination, follow=True)
                        self.assertEqual(result.status_code, 200, f'{role}: {page} -> {destination}')
        # Dynamic AJAX/control destinations do not occur as anchor hrefs.
        for appointment in self.appointments.values():
            response = self.clients['doctor'].get(reverse('doctor:get_appointment_info', args=[appointment.pk]))
            self.assertEqual(response.status_code, 200)
            self.assertTrue(response.json()['success'])
        inventory['unique_destinations'] = len(inventory['unique_destinations'])
        print('STAFF_CONTROL_INVENTORY ' + json.dumps(inventory, sort_keys=True))

    def test_pending_patient_link_leads_to_review_instead_of_forbidden_details(self):
        Consent.objects.filter(patient=self.patient).delete()
        Appointment.objects.filter(patient=self.patient).exclude(status='pending').delete()
        response = self.clients['doctor'].get(reverse('doctor:patients'))
        detail = reverse('doctor:patient_detail', args=[self.patient.pk])
        self.assertNotContains(response, f'href="{detail}"')
        self.assertContains(response, 'Review appointment')
        self.assertEqual(self.clients['doctor'].get(reverse('doctor:appointments') + '?status=pending').status_code, 200)

    def test_apostrophe_name_keeps_rejection_control_valid(self):
        self.patient.full_name = "Patient O'Neil"
        self.patient.save()
        response = self.clients['receptionist'].get(reverse('receptionist:appointments'))
        parser = ControlParser()
        parser.feed(response.content.decode())
        handler = next(value for value in parser.handlers if value.startswith('showRejectModal('))
        self.assertIn(r'\u0027', handler)
        if shutil.which('node'):
            result = subprocess.run(['node', '-e', 'new Function(process.argv[1]);', handler], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)

    def test_calendar_data_does_not_break_script_document_for_patient_supplied_name(self):
        self.patient.full_name = 'Example </script><script>alert(1)</script>'
        self.patient.save()
        response = self.clients['doctor'].get(reverse('doctor:calendar'))
        html = response.content.decode()
        match = re.search(r'<script id="calendar-appointment-data" type="application/json">(.*?)</script>', html, re.S)
        self.assertIsNotNone(match)
        values = json.loads(match.group(1))
        self.assertEqual(len(values), 5)
        self.assertIn(self.patient.full_name, values[0]['title'])
        self.assertNotIn('</script><script>alert(1)</script>', html)
