import { useState, useCallback } from 'react';

interface AppointmentData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  abhaId?: string;
  hospitalId: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  symptoms: string;
  paymentMode: string;
  needsAbha: boolean;
}

interface AppointmentResponse {
  success: boolean;
  appointmentId?: string;
  error?: string;
}

export const useAppointment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Book appointment
  const bookAppointment = useCallback(async (data: AppointmentData): Promise<AppointmentResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to book appointment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock appointment booking - in real implementation, this would call your backend API
      const mockAppointmentId = `APT${Date.now()}`;
      
      // Log the appointment data for debugging
      console.log('Booking appointment with data:', data);
      
      return {
        success: true,
        appointmentId: mockAppointmentId
      };
    } catch (err) {
      const errorMessage = 'Failed to book appointment. Please try again.';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Validate appointment data
  const validateAppointmentData = useCallback((data: AppointmentData): string[] => {
    const errors: string[] = [];
    
    if (!data.patientName.trim()) {
      errors.push('Patient name is required');
    }
    
    if (!data.patientEmail.trim()) {
      errors.push('Patient email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.patientEmail)) {
      errors.push('Please enter a valid email address');
    }
    
    if (!data.patientPhone.trim()) {
      errors.push('Patient phone number is required');
    } else if (!/^[0-9]{10}$/.test(data.patientPhone.replace(/\D/g, ''))) {
      errors.push('Please enter a valid 10-digit phone number');
    }
    
    if (!data.hospitalId) {
      errors.push('Please select a hospital');
    }
    
    if (!data.doctorId) {
      errors.push('Please select a doctor');
    }
    
    if (!data.appointmentDate) {
      errors.push('Please select an appointment date');
    } else {
      const selectedDate = new Date(data.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.push('Appointment date cannot be in the past');
      }
    }
    
    if (!data.appointmentTime) {
      errors.push('Please select an appointment time');
    }
    
    if (!data.paymentMode) {
      errors.push('Please select a payment mode');
    }
    
    return errors;
  }, []);

  // Check appointment availability
  const checkAvailability = useCallback(async (
    doctorId: string, 
    date: string, 
    time: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to check availability
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock availability check - in real implementation, this would call your backend API
      return true; // Mock available
    } catch (err) {
      setError('Failed to check availability. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get appointment details
  const getAppointmentDetails = useCallback(async (appointmentId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to get appointment details
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock appointment details - in real implementation, this would call your backend API
      return {
        id: appointmentId,
        patientName: 'John Doe',
        hospitalName: 'Jeevan Multi-Specialist Hospital',
        doctorName: 'Dr. Sarah Johnson',
        date: '2025-10-25',
        time: '10:00',
        status: 'confirmed'
      };
    } catch (err) {
      setError('Failed to fetch appointment details. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    bookAppointment,
    validateAppointmentData,
    checkAvailability,
    getAppointmentDetails,
    clearError: () => setError(null)
  };
};
