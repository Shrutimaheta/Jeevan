# Jeevan – Patient Management System

Jeevan is a Django-based Patient Management System designed to streamline clinic operations such as patient registration, appointment scheduling, medical record management, and billing.

This project demonstrates backend development skills including database modeling, authentication, workflow management, and modular application architecture using Django.

---

## 🚀 Features

- Patient Registration & Profile Management
- Doctor Management
- Appointment Scheduling
- Medical Records Tracking
- Billing Management
- Admin Dashboard
- Secure Authentication & Role-Based Access Control
- CRUD Operations with Server-Side Validation

---

## 🏗️ Tech Stack

- Backend: Python, Django
- Database: SQLite / MySQL
- Frontend: HTML, CSS
- Architecture: Django MVT (Model-View-Template)
- Version Control: Git
- AI-Assisted Development: Debugging, query optimization, and documentation refinement

---

## 🧠 System Architecture

The application follows Django’s MVT architecture:

- **Models** – Relational database schema for patients, doctors, appointments, billing, and medical records.
- **Views** – Business logic and request-response handling.
- **Templates** – Dynamic UI rendering with secure form handling.
- **Authentication** – User login/logout with role-based access control.

---

## 📊 Database Design

The system uses relational database modeling with proper foreign key relationships between:

- Patient
- Doctor
- Appointment
- Billing
- Medical Records

Optimized queries ensure performance and data consistency.

---

## 🔐 Security Features

- Role-based access control
- Django authentication system
- Backend form validation
- Secure data handling practices

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Shrutimaheta/Jeevan.git
2. Navigate into the project directory:
   cd Jeevan
3. Create a virtual environment:
   python -m venv venv
4. Activate the virtual environment:
   Windows: venv\Scripts\activate
   Mac/Linux: source venv/bin/activate
5. Install dependencies:
   pip install -r requirements.txt
6. Apply migrations:
    python manage.py migrate
7. Run the development server:
   python manage.py runserver
8. Open in browser:
   http://127.0.0.1:8000/
