# Patient Document Upload Feature

## Overview
This feature allows patients to upload, view, and manage their medical documents through the patient dashboard.

## Features Implemented

### 1. Document Model (`PatientDocument`)
- **Fields:**
  - `patient`: Foreign key to Patient model
  - `title`: Document title/description
  - `document_type`: Categorized document types (Medical Report, Prescription, Lab Result, etc.)
  - `file`: File upload field with organized storage
  - `description`: Optional additional notes
  - `uploaded_at`: Timestamp of upload
  - `updated_at`: Last modification timestamp

- **Properties:**
  - `file_size`: Human-readable file size
  - `file_extension`: File extension
  - `is_image`: Check if file is an image
  - `is_pdf`: Check if file is a PDF

### 2. Document Types Supported
- Medical Report
- Prescription
- Lab Result
- Scan/Imaging
- Insurance Document
- ID Proof
- Other

### 3. File Types Supported
- **Documents:** PDF, DOC, DOCX
- **Images:** JPG, JPEG, PNG, GIF, BMP, WEBP
- **Size Limit:** 10MB per file

### 4. Views Implemented
- `document_list`: List all patient documents with pagination
- `document_upload`: Upload new documents
- `document_detail`: View document details and preview
- `document_delete`: Delete documents
- `document_download`: Download documents

### 5. Templates Created
- `document_list.html`: Document listing with search and pagination
- `document_upload.html`: Upload form with guidelines
- `document_detail.html`: Document details and preview

### 6. Forms
- `PatientDocumentForm`: Form for document upload with validation

### 7. URL Patterns
- `/patient/documents/` - List documents
- `/patient/documents/upload/` - Upload new document
- `/patient/documents/<id>/` - View document details
- `/patient/documents/<id>/delete/` - Delete document
- `/patient/documents/<id>/download/` - Download document

## Usage

### For Patients:
1. Login to patient dashboard
2. Click "Upload Documents" or "View Documents" in Quick Actions
3. Upload documents with proper titles and descriptions
4. View, download, or delete documents as needed

### For Administrators:
- Documents are visible in Django admin panel
- Can view all patient documents
- Can manage document types and categories

## Security Features
- File type validation
- File size limits (10MB)
- User authentication required
- Patients can only access their own documents
- Secure file storage with organized directory structure

## Database Migration
The feature includes a database migration that creates the `PatientDocument` table with all necessary fields and relationships.

## Integration
- Integrated with existing patient dashboard
- Uses existing patient authentication system
- Follows the same UI/UX patterns as other patient features
