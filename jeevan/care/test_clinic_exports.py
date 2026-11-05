"""Clinic boundaries and bounded report archives for small production hosts."""
import io
import zipfile
from datetime import timedelta
from unittest.mock import patch

from django.core.files.storage import FileSystemStorage
from django.db.models.fields.files import FieldFile
from django.test import TestCase, override_settings
from django.urls import reverse
from django.utils import timezone

from care.models import AuditEvent, CareCoordinator
from care.views import check_coordinator_patient_consent
from doctor.models import Consent
from jeevan.test_helpers import JeevanTestClientMixin
from patient.models import PatientDocument


class ClinicExportTests(JeevanTestClientMixin, TestCase):
    @classmethod
    def setUpTestData(cls):
        helper = JeevanTestClientMixin()
        cls.clinic = helper.create_hospital()
        cls.other_clinic = helper.create_hospital(registration_number='EXPORT-OTHER')
        cls.coordinator_user = helper.create_user('export_coordinator', role='care_coordinator')
        cls.coordinator = CareCoordinator.objects.create(user=cls.coordinator_user,
            hospital=cls.clinic, full_name='Fictional Coordinator')
        cls.patient = helper.create_patient_profile(helper.create_user('export_patient'))
        cls.patient.associated_hospitals.add(cls.clinic)
        cls.doctor = helper.create_doctor_profile(helper.create_user('export_doctor', role='doctor'), cls.clinic)
        cls.consent = Consent.objects.create(doctor=cls.doctor, patient=cls.patient, status='approved',
            expires_at=timezone.now() + timedelta(days=1))

    def setUp(self):
        self.client.force_login(self.coordinator_user)

    def export(self, ids=None):
        return self.client.post(reverse('export_patient_reports_zip'),
            {'patient_ids': ids if ids is not None else [self.patient.pk]})

    def test_other_clinic_cannot_reuse_consent(self):
        self.coordinator.hospital = self.other_clinic
        self.coordinator.save()
        self.patient.associated_hospitals.add(self.other_clinic)
        self.assertFalse(check_coordinator_patient_consent(self.coordinator, self.patient))
        self.assertEqual(self.export().status_code, 302)

    def test_removed_clinic_association_blocks_crafted_export(self):
        self.patient.associated_hospitals.clear()
        self.assertFalse(check_coordinator_patient_consent(self.coordinator, self.patient))
        self.assertEqual(self.export().status_code, 302)
        self.assertFalse(AuditEvent.objects.filter(action='EXPORT_PATIENT_REPORTS_ZIP').exists())

    def test_inactive_doctor_cannot_authorize_coordinator_export(self):
        self.doctor.is_active = False
        self.doctor.save()
        self.assertFalse(check_coordinator_patient_consent(self.coordinator, self.patient))
        self.assertEqual(self.export().status_code, 302)

    def test_disabled_doctor_account_cannot_authorize_export(self):
        self.doctor.user.is_active = False
        self.doctor.user.save()
        self.assertFalse(check_coordinator_patient_consent(self.coordinator, self.patient))
        self.assertEqual(self.export().status_code, 302)

    def test_expired_and_revoked_consents_do_not_export_or_mutate_on_read(self):
        for values in ({'expires_at': timezone.now() - timedelta(seconds=1)}, {'status': 'rejected'}):
            with self.subTest(values=values):
                Consent.objects.filter(pk=self.consent.pk).update(**values)
                self.assertEqual(self.export().status_code, 302)
        self.consent.refresh_from_db()
        self.assertEqual(self.consent.status, 'rejected')

    @override_settings(REPORT_EXPORT_PATIENT_LIMIT=2)
    def test_selection_limit_precedes_file_access(self):
        with patch.object(FieldFile, 'open') as opened:
            self.assertEqual(self.export([1, 2, 3]).status_code, 302)
        opened.assert_not_called()

    def create_document(self):
        return PatientDocument.objects.create(patient=self.patient, title='Fictional report',
            document_type='report', file='fictional.bin')

    def test_archive_reads_in_chunks_and_preserves_bytes(self):
        self.create_document()
        content = b'fictional-report-' * 10000

        class ChunkedSource(io.BytesIO):
            def read(self, size=-1):
                if not 0 < size <= 64 * 1024:
                    raise AssertionError('An export must never read a whole file into RAM.')
                return super().read(size)

        with patch.object(FileSystemStorage, 'exists', return_value=True), patch.object(
                FieldFile, 'open', side_effect=lambda *args, **kwargs: ChunkedSource(content)):
            response = self.export()
            self.assertEqual(response['Content-Type'], 'application/zip')
            with zipfile.ZipFile(io.BytesIO(b''.join(response.streaming_content))) as archive:
                self.assertEqual(archive.read(archive.namelist()[0]), content)
        self.assertTrue(AuditEvent.objects.filter(action='EXPORT_PATIENT_REPORTS_ZIP').exists())

    @override_settings(REPORT_EXPORT_BYTE_LIMIT=1024)
    def test_compressible_export_over_limit_returns_no_partial_zip(self):
        self.create_document()
        with patch.object(FileSystemStorage, 'exists', return_value=True), patch.object(
                FieldFile, 'open', side_effect=lambda *args, **kwargs: io.BytesIO(b'0' * 2048)):
            response = self.export()
        self.assertEqual(response.status_code, 302)
        self.assertNotEqual(response.get('Content-Type'), 'application/zip')
        self.assertFalse(AuditEvent.objects.filter(action='EXPORT_PATIENT_REPORTS_ZIP').exists())

    def test_unreadable_file_returns_recovery_message_without_path(self):
        self.create_document()
        with patch.object(FileSystemStorage, 'exists', return_value=True), patch.object(
                FieldFile, 'open', side_effect=OSError('/private/server/location')):
            response = self.export()
        self.assertEqual(response.status_code, 302)
        page = self.client.get(response.url)
        self.assertContains(page, 'Unable to prepare this export')
        self.assertNotContains(page, '/private/server/location')

    @override_settings(REPORT_EXPORT_FILE_LIMIT=1)
    def test_many_empty_files_cannot_bypass_export_limits(self):
        self.create_document()
        self.create_document()
        with patch.object(FileSystemStorage, 'exists', return_value=True), patch.object(
                FieldFile, 'open', side_effect=lambda *args, **kwargs: io.BytesIO(b'')):
            self.assertEqual(self.export().status_code, 302)
        self.assertFalse(AuditEvent.objects.filter(action='EXPORT_PATIENT_REPORTS_ZIP').exists())

    @override_settings(REPORT_EXPORT_PATIENT_LIMIT=1)
    def test_dashboard_paginates_only_the_current_clinics_patients(self):
        second = self.create_patient_profile(self.create_user('export_second'), full_name='Zeta Patient')
        second.associated_hospitals.add(self.clinic)
        outsider = self.create_patient_profile(self.create_user('export_outsider'), full_name='Foreign Patient')
        outsider.associated_hospitals.add(self.other_clinic)
        first = self.client.get(reverse('coordinator_dashboard'))
        self.assertEqual(first.context['page_obj'].paginator.count, 2)
        self.assertEqual(len(first.context['patients_data']), 1)
        self.assertContains(first, '?page=2')
        self.assertNotContains(first, 'Foreign Patient')
        next_page = self.client.get(reverse('coordinator_dashboard'), {'page': 2})
        self.assertContains(next_page, 'Zeta Patient')
        self.assertNotContains(next_page, 'Foreign Patient')
