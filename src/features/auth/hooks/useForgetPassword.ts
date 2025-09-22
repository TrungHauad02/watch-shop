import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { ForgetPasswordFormData, ForgetPasswordError } from '../types';

export const useForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ForgetPasswordError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState<string>('');
  const navigate = useNavigate();

  const sendResetEmail = async (
    formData: ForgetPasswordFormData
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.forgotPassword(formData.email);

      setIsSuccess(true);
      setSuccessEmail(formData.email);

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Gửi email thất bại. Vui lòng thử lại.';

      // Determine error field
      let field: ForgetPasswordError['field'] = 'general';
      if (errorMessage.includes('email') || errorMessage.includes('Email')) {
        field = 'email';
      }

      setError({ field, message: errorMessage });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const backToLogin = () => {
    navigate('/auth/login');
  };

  const resetState = () => {
    setIsLoading(false);
    setError(null);
    setIsSuccess(false);
    setSuccessEmail('');
  };

  return {
    sendResetEmail,
    isLoading,
    error,
    clearError,
    isSuccess,
    successEmail,
    backToLogin,
    resetState,
  };
};
