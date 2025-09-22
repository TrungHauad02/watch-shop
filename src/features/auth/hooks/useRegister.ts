import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { RegisterError, RegisterFormData } from '../types';
import { useState } from 'react';

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<RegisterError | null>(null);
  const navigate = useNavigate();

  const register = async (formData: RegisterFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.register(formData);

      navigate('/auth/login');
      return true;
    } catch (err) {
      setError({
        field: 'general',
        message: err instanceof Error ? err.message : 'Đăng ký thất bại',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    register,
    isLoading,
    error,
    clearError,
  };
};
