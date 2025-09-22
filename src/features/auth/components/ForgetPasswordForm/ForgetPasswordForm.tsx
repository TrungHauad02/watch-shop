/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Alert,
  Link as MuiLink,
  Paper,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Email, ArrowBack, CheckCircle } from '@mui/icons-material';
import { WSButton, WSInput } from '@/components';
import { COLORS } from '@/styles/colors';
import {
  ForgetPasswordFormProps,
  ForgetPasswordFormState,
} from './ForgetPasswordForm.types';
import { ForgetPasswordValidationErrors } from '../../types';

export default function ForgetPasswordForm({
  onSubmit,
  onBackToLogin,
  isLoading = false,
  error,
  onErrorDismiss,
  isSuccess = false,
  successEmail,
}: ForgetPasswordFormProps) {
  const [formData, setFormData] = useState<ForgetPasswordFormState>({
    email: '',
  });

  const [validationErrors, setValidationErrors] =
    useState<ForgetPasswordValidationErrors>({});

  // Clear validation errors when user starts typing
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors({});
    }
  }, [formData.email]);

  // Clear error when dismissed
  useEffect(() => {
    if (error && onErrorDismiss) {
      const timer = setTimeout(() => {
        onErrorDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, onErrorDismiss]);

  const validateForm = (): boolean => {
    const errors: ForgetPasswordValidationErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    await onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ email: e.target.value });
  };

  const alertProps = {
    severity: 'error' as const,
    sx: {
      mb: 3,
      borderRadius: 2,
      // CUSTOMIZE: Bạn có thể chỉnh sửa style của error alert tại đây
    },
    ...(onErrorDismiss && {
      onClose: (_: React.SyntheticEvent) => onErrorDismiss(),
    }),
  };

  // Success state
  if (isSuccess) {
    return (
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          mx: 'auto',
          p: 4,
          borderRadius: 3,
          backgroundColor: COLORS.white,
          boxShadow: '0 8px 32px rgba(16, 24, 32, 0.12)',
          border: `1px solid ${COLORS.gray200}`,
          textAlign: 'center',
          // CUSTOMIZE: Bạn có thể chỉnh sửa style của success container tại đây
        }}
      >
        {/* Success Icon */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <CheckCircle
            sx={{
              fontSize: 64,
              color: COLORS.gold500,
              // CUSTOMIZE: Bạn có thể chỉnh sửa màu của success icon tại đây
            }}
          />
        </Box>

        {/* Success Message */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: COLORS.primary,
            mb: 2,
            // CUSTOMIZE: Bạn có thể chỉnh sửa style của success title tại đây
          }}
        >
          Email Đã Được Gửi
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: COLORS.gray600,
            mb: 1,
            lineHeight: 1.6,
          }}
        >
          Chúng tôi đã gửi link đặt lại mật khẩu đến:
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: COLORS.primary,
            fontWeight: 600,
            mb: 4,
            wordBreak: 'break-word',
          }}
        >
          {successEmail}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: COLORS.gray500,
            mb: 4,
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}
        >
          Vui lòng kiểm tra hộp thư đến (và cả thư mục spam) để tìm email từ
          chúng tôi. Link sẽ có hiệu lực trong 5 phút.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Back to Login */}
        <WSButton
          variant="primary"
          size="large"
          fullWidth
          onClick={onBackToLogin}
          startIcon={<ArrowBack />}
        >
          Quay Lại Đăng Nhập
        </WSButton>
      </Paper>
    );
  }

  // Form state
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        width: '100%',
        maxWidth: 400,
        mx: 'auto',
        p: 4,
        borderRadius: 3,
        backgroundColor: COLORS.white,
        boxShadow: '0 8px 32px rgba(16, 24, 32, 0.12)',
        border: `1px solid ${COLORS.gray200}`,
        // CUSTOMIZE: Bạn có thể chỉnh sửa style của form container tại đây
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: COLORS.primary,
            mb: 1,
            background: COLORS.gray900,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // CUSTOMIZE: Bạn có thể chỉnh sửa style của tiêu đề tại đây
          }}
        >
          Quên Mật Khẩu
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: COLORS.gray600,
            fontSize: '0.95rem',
            lineHeight: 1.5,
          }}
        >
          Nhập email của bạn để nhận link đặt lại mật khẩu
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && <Alert {...alertProps}>{error}</Alert>}

      {/* Email Input */}
      <WSInput
        fullWidth
        label="Email"
        type="email"
        placeholder="Nhập địa chỉ email đã đăng ký"
        value={formData.email}
        onChange={handleInputChange}
        error={!!validationErrors.email}
        {...(validationErrors.email && { errorText: validationErrors.email })}
        startIcon={<Email />}
        autoFocus
        disabled={isLoading}
        sx={{ mb: 4 }}
      />

      {/* Submit Button */}
      <WSButton
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        loading={isLoading}
        loadingText="Đang gửi email..."
        disabled={isLoading}
        sx={{ mb: 3 }}
      >
        Gửi Mã OTP
      </WSButton>

      {/* Back to Login Link */}
      <Box sx={{ textAlign: 'center' }}>
        <MuiLink
          component={Link}
          to="/auth/login"
          onClick={onBackToLogin}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            color: COLORS.primary,
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline',
              color: COLORS.gold600,
            },
            // CUSTOMIZE: Bạn có thể chỉnh sửa style của back link tại đây
          }}
        >
          <ArrowBack sx={{ fontSize: 16 }} />
          Quay lại đăng nhập
        </MuiLink>
      </Box>
    </Paper>
  );
}
