import { useState, useCallback } from 'react';

interface ABHACreationData {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  mobileNumber: string;
  otp: string;
}

interface ABHAResponse {
  success: boolean;
  abhaId?: string;
  error?: string;
}

export const useABHA = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Send OTP for ABHA creation
  const sendOTP = useCallback(async (mobileNumber: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to ABHA sandbox
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock OTP sending - in real implementation, this would call ABHA API
      console.log(`Sending OTP to ${mobileNumber}`);
      
      return true;
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verify OTP
  const verifyOTP = useCallback(async (mobileNumber: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to ABHA sandbox
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock OTP verification - in real implementation, this would call ABHA API
      if (otp === '123456') { // Mock valid OTP
        return true;
      } else {
        setError('Invalid OTP. Please try again.');
        return false;
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create ABHA ID
  const createABHA = useCallback(async (data: ABHACreationData): Promise<ABHAResponse> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to ABHA sandbox
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock ABHA creation - in real implementation, this would call ABHA API
      const mockABHAId = `ABHA${Math.random().toString(36).substr(2, 10).toUpperCase()}`;
      
      return {
        success: true,
        abhaId: mockABHAId
      };
    } catch (err) {
      const errorMessage = 'Failed to create ABHA ID. Please try again.';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Validate ABHA ID format
  const validateABHAId = useCallback((abhaId: string): boolean => {
    // Remove spaces and dashes for validation
    const cleanId = abhaId.replace(/[\s-]/g, '');
    
    // Check if it's 14 characters (digits or alphanumeric)
    if (cleanId.length !== 14) {
      return false;
    }
    
    // Check if it's all digits or alphanumeric
    return /^[A-Z0-9]{14}$/i.test(cleanId);
  }, []);

  // Check ABHA ID status
  const checkABHAStatus = useCallback(async (abhaId: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to check ABHA status
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock ABHA status check - in real implementation, this would call ABHA API
      return true; // Mock successful status check
    } catch (err) {
      setError('Failed to verify ABHA ID. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    sendOTP,
    verifyOTP,
    createABHA,
    validateABHAId,
    checkABHAStatus,
    clearError: () => setError(null)
  };
};
