import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Container } from '@mui/material';
import { ResetPasswordForm, ResetPasswordSuccess } from '../components';
import { useResetPassword } from '../hooks/useResetPassword';
import { GRADIENT_COLORS } from '@/styles/colors';
import { ResetPasswordFormData } from '../types';

export default function ResetPasswordPage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const {
    resetPassword,
    isLoading,
    error,
    isSuccess,
    clearError,
    redirectToLogin,
  } = useResetPassword(token || '');

  // Kiểm tra token validity khi component mount
  useEffect(() => {
    if (!token) {
      toast.error('Token không hợp lệ hoặc đã hết hạn. Vui lòng thử lại.');
      navigate('/auth/forget-password');
    }
  }, [token, navigate]);

  const handleSubmit = async (
    formData: ResetPasswordFormData
  ): Promise<void> => {
    await resetPassword(formData);
  };

  const handleBackToLogin = (): void => {
    redirectToLogin();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: GRADIENT_COLORS.heroGradient,
        // CUSTOMIZE: Bạn có thể chỉnh sửa background tại đây
      }}
    >
      <Container maxWidth="sm">
        {isSuccess ? (
          <ResetPasswordSuccess onLoginClick={redirectToLogin} />
        ) : (
          <ResetPasswordForm
            onSubmit={handleSubmit}
            onBackToLogin={handleBackToLogin}
            isLoading={isLoading}
            error={error?.message || null}
            onErrorDismiss={clearError}
          />
        )}
      </Container>
    </Box>
  );
}
