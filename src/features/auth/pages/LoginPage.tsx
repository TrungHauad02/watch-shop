import { Box, Container, Typography } from '@mui/material';
import { LoginForm } from '../components';
import { useLogin } from '../hooks/useLogin';
import { COLORS, GRADIENT_COLORS } from '@/styles/colors';
import { LoginFormData } from '../types';

export default function LoginPage() {
  const { login, isLoading, error, clearError } = useLogin();

  const handleLogin = async (formData: LoginFormData): Promise<void> => {
    await login(formData);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: GRADIENT_COLORS.heroGradient,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, ${COLORS.gold500}10 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${COLORS.secondary}08 0%, transparent 50%),
            radial-gradient(circle at 40% 60%, ${COLORS.primary}05 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Brand Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${COLORS.white}, ${COLORS.gold300})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: `0 2px 4px ${COLORS.primary}40`,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              // CUSTOMIZE: Bạn có thể chỉnh sửa style của brand title tại đây
            }}
          >
            Minh Nhật Watch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: COLORS.white,
              opacity: 0.9,
              fontWeight: 400,
              textShadow: `0 1px 2px ${COLORS.primary}60`,
              // CUSTOMIZE: Bạn có thể chỉnh sửa style của brand subtitle tại đây
            }}
          >
            Thế giới đồng hồ cao cấp
          </Typography>
        </Box>

        {/* Login Form */}
        <LoginForm
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error?.message ?? null}
          onErrorDismiss={clearError}
        />
      </Container>
    </Box>
  );
}
