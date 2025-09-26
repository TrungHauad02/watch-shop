import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ResetPasswordError, ResetPasswordFormData } from '../types';

export const useResetPassword = (token: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ResetPasswordError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const resetPassword = async (
    formData: ResetPasswordFormData
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // await authService.resetPassword(token, formData.password);
      console.log('Resetting password with token:', token);
      console.log('New password:', formData.password);

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check if token is valid (simulate)
      if (!token || token.length < 10) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn');
      }

      setIsSuccess(true);
      toast.success('Đặt lại mật khẩu thành công!');

      // Auto redirect after success
      setTimeout(() => {
        navigate('/auth/login');
      }, 3000);

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Đặt lại mật khẩu thất bại';

      // Determine error field based on message
      let field: ResetPasswordError['field'] = 'general';
      if (
        errorMessage.includes('password') ||
        errorMessage.includes('mật khẩu')
      ) {
        field = 'password';
      }

      setError({ field, message: errorMessage });
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const redirectToLogin = () => {
    navigate('/auth/login');
  };

  return {
    resetPassword,
    isLoading,
    error,
    isSuccess,
    clearError,
    redirectToLogin,
  };
};
