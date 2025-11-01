# Data Flow Diagram (DFD) - Healthcare Management System

## System Overview
This DFD represents the comprehensive healthcare management system "Jeevan" that handles patient registration, appointment booking, medical records management, and multi-role user interactions.

## Level 0 DFD - Context Diagram

```mermaid
graph TD
    A[Patient] -->|Registration Data, Appointment Requests, Health Data| B[Healthcare Management System]
    C[Doctor] -->|Medical Records, Prescriptions, Diagnosis| B
    D[Receptionist] -->|Appointment Management, Patient Registration| B
    E[Nurse] -->|Patient Care Data, Vital Signs| B
    F[Admin] -->|System Management, User Management| B
    G[ABHA System] -->|ABHA ID Verification| B
    H[Payment Gateway] -->|Payment Processing| B
    
    B -->|Appointment Confirmations, Notifications| A
    B -->|Patient Data, Appointment Schedules| C
    B -->|Appointment Status, Patient Information| D
    B -->|Patient Health Data, Care Instructions| E
    B -->|System Reports, Analytics| F
    B -->|ABHA ID Requests| G
    B -->|Payment Status| H
```

## Level 1 DFD - Main Processes

```mermaid
graph TD
    %% External Entities
    A[Patient]
    C[Doctor]
    D[Receptionist]
    E[Nurse]
    F[Admin]
    G[ABHA System]
    H[Payment Gateway]
    
    %% Main Processes
    P1[1.0<br/>User Authentication<br/>& Registration]
    P2[2.0<br/>Appointment<br/>Management]
    P3[3.0<br/>Medical Records<br/>Management]
    P4[4.0<br/>Patient Health<br/>Tracking]
    P5[5.0<br/>ABHA ID<br/>Management]
    P6[6.0<br/>Payment<br/>Processing]
    P7[7.0<br/>Notification<br/>System]
    P8[8.0<br/>System<br/>Administration]
    
    %% Data Stores
    D1[(D1: User Database)]
    D2[(D2: Patient Profiles)]
    D3[(D3: Appointment Database)]
    D4[(D4: Medical Records)]
    D5[(D5: Health Tracking Data)]
    D6[(D6: ABHA Database)]
    D7[(D7: Payment Records)]
    D8[(D8: Notification Queue)]
    D9[(D9: Hospital Database)]
    D10[(D10: Doctor Database)]
    
    %% Patient Flows
    A -->|Login Credentials| P1
    A -->|Registration Data| P1
    A -->|Appointment Request| P2
    A -->|Health Data Input| P4
    A -->|ABHA Application| P5
    A -->|Payment Information| P6
    
    %% Doctor Flows
    C -->|Login Credentials| P1
    C -->|Medical Records| P3
    C -->|Prescriptions| P3
    C -->|Diagnosis| P3
    
    %% Receptionist Flows
    D -->|Login Credentials| P1
    D -->|Appointment Management| P2
    D -->|Patient Registration| P1
    
    %% Nurse Flows
    E -->|Login Credentials| P1
    E -->|Vital Signs| P4
    E -->|Care Notes| P4
    
    %% Admin Flows
    F -->|Login Credentials| P1
    F -->|System Management| P8
    F -->|User Management| P8
    
    %% External System Flows
    G -->|ABHA Verification| P5
    H -->|Payment Confirmation| P6
    
    %% Process to Data Store Flows
    P1 -->|User Data| D1
    P1 -->|Patient Profile| D2
    P2 -->|Appointment Data| D3
    P3 -->|Medical Records| D4
    P4 -->|Health Data| D5
    P5 -->|ABHA Records| D6
    P6 -->|Payment Data| D7
    P7 -->|Notifications| D8
    P8 -->|Hospital Data| D9
    P8 -->|Doctor Data| D10
    
    %% Data Store to Process Flows
    D1 -->|User Info| P1
    D2 -->|Patient Info| P2
    D2 -->|Patient Info| P3
    D2 -->|Patient Info| P4
    D3 -->|Appointment Data| P2
    D3 -->|Appointment Data| P3
    D4 -->|Medical History| P3
    D5 -->|Health Trends| P4
    D6 -->|ABHA Status| P5
    D7 -->|Payment Status| P6
    D8 -->|Notifications| P7
    D9 -->|Hospital Info| P2
    D10 -->|Doctor Info| P2
    
    %% Output Flows
    P1 -->|Authentication Status| A
    P1 -->|Authentication Status| C
    P1 -->|Authentication Status| D
    P1 -->|Authentication Status| E
    P1 -->|Authentication Status| F
    P2 -->|Appointment Confirmation| A
    P2 -->|Appointment Schedule| C
    P2 -->|Appointment Status| D
    P3 -->|Medical Records| C
    P3 -->|Prescription| A
    P4 -->|Health Reports| A
    P4 -->|Vital Signs| C
    P5 -->|ABHA ID| A
    P6 -->|Payment Receipt| A
    P7 -->|Notifications| A
    P7 -->|Notifications| C
    P7 -->|Notifications| D
    P8 -->|System Reports| F
```

## Level 2 DFD - Detailed Process Breakdown

### Process 2.0 - Appointment Management (Detailed)

```mermaid
graph TD
    %% External Entities
    A[Patient]
    C[Doctor]
    D[Receptionist]
    
    %% Sub-processes
    P2_1[2.1<br/>Appointment<br/>Booking]
    P2_2[2.2<br/>Appointment<br/>Scheduling]
    P2_3[2.3<br/>Appointment<br/>Confirmation]
    P2_4[2.4<br/>Appointment<br/>Status Update]
    
    %% Data Stores
    D2[(D2: Patient Profiles)]
    D3[(D3: Appointment Database)]
    D9[(D9: Hospital Database)]
    D10[(D10: Doctor Database)]
    D8[(D8: Notification Queue)]
    
    %% Patient to Booking
    A -->|Appointment Request| P2_1
    A -->|Preferred Date/Time| P2_1
    A -->|Symptoms Description| P2_1
    
    %% Booking Process
    P2_1 -->|Patient Selection| P2_2
    P2_1 -->|Hospital Selection| P2_2
    P2_1 -->|Doctor Selection| P2_2
    
    %% Scheduling Process
    P2_2 -->|Schedule Check| P2_3
    P2_3 -->|Confirmation| P2_4
    
    %% Receptionist Management
    D -->|Appointment Review| P2_3
    D -->|Accept/Reject| P2_4
    
    %% Doctor Management
    C -->|Appointment View| P2_4
    C -->|Status Update| P2_4
    
    %% Data Store Interactions
    D2 -->|Patient Info| P2_1
    D9 -->|Hospital Info| P2_2
    D10 -->|Doctor Info| P2_2
    D3 -->|Appointment Data| P2_3
    P2_1 -->|New Appointment| D3
    P2_4 -->|Updated Status| D3
    P2_4 -->|Notification| D8
    
    %% Outputs
    P2_3 -->|Booking Confirmation| A
    P2_4 -->|Status Update| A
    P2_4 -->|Schedule Update| C
    P2_4 -->|Management Update| D
```

### Process 3.0 - Medical Records Management (Detailed)

```mermaid
graph TD
    %% External Entities
    C[Doctor]
    A[Patient]
    
    %% Sub-processes
    P3_1[3.1<br/>Record<br/>Creation]
    P3_2[3.2<br/>Prescription<br/>Management]
    P3_3[3.3<br/>Diagnosis<br/>Entry]
    P3_4[3.4<br/>Report<br/>Generation]
    
    %% Data Stores
    D3[(D3: Appointment Database)]
    D4[(D4: Medical Records)]
    D2[(D2: Patient Profiles)]
    
    %% Doctor Inputs
    C -->|Visit Summary| P3_1
    C -->|Diagnosis| P3_3
    C -->|Prescription| P3_2
    C -->|Treatment Notes| P3_1
    
    %% Process Flow
    P3_1 -->|Medical Record| P3_4
    P3_2 -->|Prescription Data| P3_4
    P3_3 -->|Diagnosis Data| P3_4
    
    %% Data Store Interactions
    D3 -->|Appointment Info| P3_1
    D2 -->|Patient History| P3_1
    P3_1 -->|New Record| D4
    P3_2 -->|Prescription| D4
    P3_3 -->|Diagnosis| D4
    D4 -->|Medical History| P3_4
    
    %% Outputs
    P3_4 -->|Medical Report| A
    P3_4 -->|Prescription| A
    P3_4 -->|Treatment Summary| C
```

## Data Store Descriptions

### D1: User Database
- **Contents**: User credentials, roles, authentication data
- **Key Fields**: username, password, role, email, contact_number
- **Access**: All processes requiring authentication

### D2: Patient Profiles
- **Contents**: Complete patient information and health data
- **Key Fields**: full_name, gender, dob, address, abha_id, blood_group, allergies
- **Access**: Patient management, appointment booking, medical records

### D3: Appointment Database
- **Contents**: All appointment-related data
- **Key Fields**: patient_id, doctor_id, hospital_id, appointment_date, status, symptoms
- **Access**: Appointment management, scheduling, confirmation

### D4: Medical Records
- **Contents**: Patient medical history and treatment records
- **Key Fields**: appointment_id, patient_id, doctor_id, summary, diagnosis, prescription
- **Access**: Medical record management, prescription handling

### D5: Health Tracking Data
- **Contents**: Patient vital signs and wellness metrics
- **Key Fields**: patient_id, vital_signs, wellness_logs, medication_logs
- **Access**: Health monitoring, trend analysis

### D6: ABHA Database
- **Contents**: ABHA ID information and verification data
- **Key Fields**: abha_id, patient_id, verification_status, creation_date
- **Access**: ABHA management, patient identification

### D7: Payment Records
- **Contents**: Payment transactions and billing information
- **Key Fields**: appointment_id, amount, payment_mode, status, transaction_id
- **Access**: Payment processing, billing management

### D8: Notification Queue
- **Contents**: System notifications and alerts
- **Key Fields**: recipient_id, message, type, status, created_at
- **Access**: Notification system, alert management

### D9: Hospital Database
- **Contents**: Hospital information and configuration
- **Key Fields**: hospital_id, name, location, specialties, contact_info
- **Access**: Hospital management, appointment scheduling

### D10: Doctor Database
- **Contents**: Doctor profiles and specialization data
- **Key Fields**: doctor_id, hospital_id, specialization, experience, rating
- **Access**: Doctor management, appointment scheduling

## Key Data Flows

### Patient Registration Flow
1. Patient submits registration data → Process 1.0
2. Process 1.0 validates and stores data → D1, D2
3. System generates ABHA ID → Process 5.0 → D6
4. Confirmation sent → Process 7.0 → Patient

### Appointment Booking Flow
1. Patient requests appointment → Process 2.1
2. System checks availability → D3, D9, D10
3. Appointment scheduled → Process 2.2 → D3
4. Receptionist reviews → Process 2.3
5. Status updated → Process 2.4 → D3
6. Notification sent → Process 7.0 → Patient

### Medical Record Creation Flow
1. Doctor creates record → Process 3.1
2. System stores record → D4
3. Prescription generated → Process 3.2 → D4
4. Diagnosis recorded → Process 3.3 → D4
5. Report generated → Process 3.4 → Patient

## System Boundaries

### Internal Processes
- User authentication and registration
- Appointment management
- Medical records management
- Health tracking
- ABHA ID management
- Payment processing
- Notification system
- System administration

### External Entities
- Patients (end users)
- Doctors (medical professionals)
- Receptionists (hospital staff)
- Nurses (healthcare staff)
- Administrators (system managers)
- ABHA System (external verification)
- Payment Gateway (external processing)

## Security Considerations

### Data Protection
- All health data is PHI (Protected Health Information)
- Role-based access control implemented
- Audit trails for all data access
- Encryption for sensitive data transmission

### Access Control
- Patients can only access their own data
- Doctors can access patient data with proper authorization
- Receptionists have limited access to appointment data
- Administrators have system-wide access for management

## System Integration Points

### Frontend Integration
- React-based frontend for patient interface
- Django templates for staff interfaces
- RESTful API endpoints for data exchange

### External System Integration
- ABHA system for patient identification
- Payment gateway for transaction processing
- Notification services for alerts and reminders

This DFD provides a comprehensive view of the healthcare management system's data flows, processes, and data stores, enabling better understanding of the system architecture and data relationships.

