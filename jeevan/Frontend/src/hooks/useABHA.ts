import { useState } from 'react';
const unavailable = 'ABHA services are not connected. Continue without an ABHA ID.';
export const useABHA = () => {
  const [error, setError] = useState<string | null>(null);
  const fail = async (..._args: unknown[]) => { setError(unavailable); return false; };
  return { isLoading: false, error, sendOTP: fail, verifyOTP: fail, checkABHAStatus: fail,
    createABHA: async (..._args: unknown[]) => { setError(unavailable); return {success: false, error: unavailable}; },
    validateABHAId: (_value: string) => false, clearError: () => setError(null) };
};
