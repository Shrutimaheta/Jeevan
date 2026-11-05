import { useState } from 'react';
const unavailable = 'Use your clinic to manage appointments.';
export const useAppointment = () => {
  const [error, setError] = useState<string | null>(null);
  return { isLoading: false, error,
    bookAppointment: async (..._args: unknown[]) => { setError(unavailable); return {success: false, error: unavailable}; },
    validateAppointmentData: (..._args: unknown[]) => [unavailable],
    checkAvailability: async (..._args: unknown[]) => { setError(unavailable); return false; },
    getAppointmentDetails: async (..._args: unknown[]) => { setError(unavailable); return null; },
    clearError: () => setError(null) };
};
