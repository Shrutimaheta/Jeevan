from django.test import TestCase
from django.urls import reverse
from care.models import Specialization
from jeevan.test_helpers import JeevanTestClientMixin


class PublicControlTests(JeevanTestClientMixin, TestCase):
    def setUp(self):
        self.hospital = self.create_hospital()
        self.doctor_user = self.create_user('public_doctor', role='doctor')
        self.doctor = self.create_doctor_profile(self.doctor_user, self.hospital)

    def test_live_filters_reject_invalid_ids_and_ratings(self):
        for path in ('/htmx/hospitals/', '/htmx/doctors/'):
            for query in ('specialization=abc', 'specialization=999999999999999999999',
                          'min_rating=NaN', 'min_rating=inf', 'min_rating=-1'):
                with self.subTest(path=path, query=query):
                    self.assertEqual(self.client.get(path + '?' + query).status_code, 400)

    def test_doctor_search_does_not_duplicate_multiple_specializations(self):
        self.doctor.specialization.add(Specialization.objects.create(sname='Public A'),
                                       Specialization.objects.create(sname='Public B'))
        response = self.client.get('/htmx/doctors/', {'search': self.doctor.full_name})
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, f'?doctor={self.doctor.pk}', count=1)

    def test_booking_selection_survives_guest_sign_in_redirect(self):
        response = self.client.get(reverse('appointments:appointment_create'), {'doctor': self.doctor.pk})
        self.assertEqual(response.status_code, 302)
        self.assertIn('next=', response.url)
        self.assertIn(f'doctor%3D{self.doctor.pk}', response.url)
        page = self.client.get(reverse('hospital_doctors', args=[self.hospital.pk]))
        self.assertContains(page, f'/appointments/create/?doctor={self.doctor.pk}')

    def test_staff_hospital_header_does_not_link_to_patient_profile(self):
        self.client.force_login(self.doctor_user)
        response = self.client.get(reverse('hospital_doctors', args=[self.hospital.pk]))
        self.assertContains(response, 'href="/doctor/dashboard/"')
        self.assertNotContains(response, 'href="/patient/profile/"')
        self.assertNotContains(response, 'href="/patient/welcomePatient/"')

    def test_inactive_doctors_are_not_offered_for_public_booking(self):
        self.doctor.is_active = False
        self.doctor.save()
        for path in ('/', '/htmx/doctors/', reverse('hospital_doctors', args=[self.hospital.pk])):
            with self.subTest(path=path):
                self.assertNotContains(self.client.get(path), f'?doctor={self.doctor.pk}')

    def test_search_feedback_elements_exist_and_results_are_visible_without_animation(self):
        response = self.client.get('/')
        self.assertContains(response, 'id="hospital-search-status"')
        self.assertContains(response, 'id="location-help"')
        self.assertContains(response, 'id="hospital-location"')
        self.assertNotContains(response, "loadingState.style")
        self.assertNotContains(response, 'opacity: 0;\n            transform: translateY(50px);')
