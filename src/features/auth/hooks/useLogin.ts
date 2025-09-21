import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { LoginFormData, LoginError } from '../types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const navigate = useNavigate();

  const login = async (formData: LoginFormData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement login logic
      const response = await authService.login(formData);

      // Store token and user info
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('user', JSON.stringify(response.user));

      // Redirect based on user role
      const redirectPath = response.user.role === 'ADMIN' ? '/admin' : '/';
      navigate(redirectPath);

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Đăng nhập thất bại';

      // Determine error field based on message
      let field: LoginError['field'] = 'general';
      if (errorMessage.includes('email') || errorMessage.includes('Email')) {
        field = 'email';
      } else if (
        errorMessage.includes('password') ||
        errorMessage.includes('mật khẩu')
      ) {
        field = 'password';
      }

      setError({ field, message: errorMessage });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    login,
    isLoading,
    error,
    clearError,
  };
};
