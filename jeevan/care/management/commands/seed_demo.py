"""Create demo accounts and data for a public demo deployment.

Safe to run on every deploy: existing accounts are left as they are (only
their password is reset to the demo password), and new upcoming appointments
are added only when the demo patient has none left.

    python manage.py seed_demo

Environment variables:
    DEMO_PASSWORD        password for every demo account (default: Demo@2026)
    DEMO_ADMIN_PASSWORD  if set, also creates superuser ``demo_admin``. Not shown
                         on the login page; keep it private.
"""

import os
from datetime import date, time, timedelta

from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import transaction

from appointments.models import Appointment
from care.models import CustomUser, Hospital
from doctor.models import Doctor
from nurse.models import Nurse
from patient.models import Patient
from receptionist.models import Receptionist

DEMO_ACCOUNTS = [
    # username, role, full name
    ("demo_patient", "patient", "Asha Patel"),
    ("dr_sharma", "doctor", "Dr. Rajesh Sharma"),
    ("demo_receptionist", "receptionist", "Kiran Desai"),
    ("demo_nurse", "nurse", "Meena Rao"),
]


class Command(BaseCommand):
    help = "Create demo users (one per role) and upcoming sample appointments."

    def handle(self, *args, **options):
        password = os.getenv("DEMO_PASSWORD", "").strip() or "Demo@2026"

        call_command("populate_sample_data", verbosity=0)
        hospital = Hospital.objects.get(name="City General Hospital")
        doctor = Doctor.objects.get(user__username="dr_sharma")

        with transaction.atomic():
            users = {}
            for username, role, full_name in DEMO_ACCOUNTS:
                user, _ = CustomUser.objects.get_or_create(
                    username=username,
                    defaults={
                        "role": role,
                        "full_name": full_name,
                        "email": f"{username}@demo.jeevan.local",
                    },
                )
                user.role = role
                user.is_active = True
                user.set_password(password)
                user.save()
                users[role] = user

            patient, _ = Patient.objects.get_or_create(
                user=users["patient"],
                defaults={
                    "full_name": "Asha Patel",
                    "gender": "Female",
                    "date_of_birth": date(1992, 4, 18),
                    "address": "14 Sardar Patel Marg, Navrangpura",
                    "city": "Ahmedabad",
                    "pincode": "380009",
                    "blood_group": "B+",
                },
            )
            patient.associated_hospitals.add(hospital)

            if not hasattr(users["receptionist"], "receptionist"):
                Receptionist.objects.create(
                    user=users["receptionist"],
                    hospital=hospital,
                    full_name="Kiran Desai",
                    gender="Female",
                    dob=date(1995, 6, 1),
                    address="22 CG Road, Ellisbridge, Ahmedabad",
                    qualification="BA",
                    experience=3,
                )
            if not hasattr(users["nurse"], "nurse"):
                Nurse.objects.create(
                    user=users["nurse"], hospital=hospital, full_name="Meena Rao", gender="Female"
                )

            self._ensure_upcoming_appointments(patient, doctor, hospital)

            admin_password = os.getenv("DEMO_ADMIN_PASSWORD", "").strip()
            if admin_password:
                admin, _ = CustomUser.objects.get_or_create(
                    username="demo_admin",
                    defaults={"email": "admin@demo.jeevan.local", "role": "admin", "full_name": "Demo Admin"},
                )
                admin.is_staff = admin.is_superuser = True
                admin.set_password(admin_password)
                admin.save()

        self.stdout.write(self.style.SUCCESS(
            "Demo ready. Logins (password from DEMO_PASSWORD): "
            + ", ".join(f"{u} ({r})" for u, r, _ in DEMO_ACCOUNTS)
        ))

    def _ensure_upcoming_appointments(self, patient, doctor, hospital):
        today = date.today()
        if Appointment.objects.filter(patient=patient, appointment_date__gte=today).exists():
            return
        plan = [
            (1, time(10, 0), "pending", "Chest discomfort while climbing stairs"),
            (2, time(11, 30), "accepted", "Follow-up for blood pressure"),
            (5, time(16, 0), "pending", "Routine check-up"),
        ]
        for days, at, status, symptoms in plan:
            day = today + timedelta(days=days)
            if Appointment.objects.filter(
                doctor=doctor, appointment_date=day, appointment_time=at
            ).exclude(status__in=["cancelled", "rejected", "expired"]).exists():
                continue
            Appointment.objects.create(
                patient=patient,
                doctor=doctor,
                hospital=hospital,
                appointment_date=day,
                appointment_time=at,
                symptoms=symptoms,
                status=status,
                payment_mode="cash",
            )
