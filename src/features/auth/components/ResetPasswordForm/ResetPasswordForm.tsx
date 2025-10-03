/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Box, Typography, Alert, Link as MuiLink, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Lock, ArrowBack } from '@mui/icons-material';
import { WSButton, WSInput } from '@/components';
import { COLORS } from '@/styles/colors';
import {
  ResetPasswordFormProps,
  ResetPasswordFormState,
} from './ResetPasswordForm.types';
import { ResetPasswordValidationErrors } from '../../types';

export default function ResetPasswordForm({
  onSubmit,
  onBackToLogin,
  isLoading = false,
  error,
  onErrorDismiss,
}: ResetPasswordFormProps) {
  const [formData, setFormData] = useState<ResetPasswordFormState>({
    password: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] =
    useState<ResetPasswordValidationErrors>({});

  // Clear validation errors when user starts typing
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors({});
    }
  }, [formData.password, formData.confirmPassword]);

  // Clear error when dismissed
  useEffect(() => {
    if (error && onErrorDismiss) {
      const timer = setTimeout(() => {
        onErrorDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    }
    return;
  }, [error, onErrorDismiss]);

  // CUSTOMIZE: Bạn có thể chỉnh sửa validation rules tại đây
  const validateForm = (): boolean => {
    const errors: ResetPasswordValidationErrors = {};

    // Password validation
    if (!formData.password.trim()) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 8) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Mật khẩu phải chứa chữ hoa, chữ thường và số';
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleInputChange =
    (field: keyof ResetPasswordFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
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

  return (
    <Paper
      elevation={24}
      sx={{
        p: 4,
        borderRadius: 3,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        // CUSTOMIZE: Bạn có thể chỉnh sửa style của form paper tại đây
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
          }}
        >
          Đặt Lại Mật Khẩu
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: COLORS.textSecondary,
            lineHeight: 1.6,
          }}
        >
          Vui lòng nhập mật khẩu mới của bạn
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && <Alert {...alertProps}>{error}</Alert>}

      {/* Form */}
      <Box component="form" onSubmit={handleSubmit}>
        {/* New Password Input */}
        <WSInput
          fullWidth
          label="Mật khẩu mới"
          type="password"
          placeholder="Nhập mật khẩu mới"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={!!validationErrors.password}
          {...(validationErrors.password && {
            errorText: validationErrors.password,
          })}
          startIcon={<Lock />}
          disabled={isLoading}
          autoFocus
          sx={{ mb: 3 }}
          helperText="Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số"
          // CUSTOMIZE: Bạn có thể chỉnh sửa password input tại đây
        />

        {/* Confirm Password Input */}
        <WSInput
          fullWidth
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="Nhập lại mật khẩu mới"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          error={!!validationErrors.confirmPassword}
          {...(validationErrors.confirmPassword && {
            errorText: validationErrors.confirmPassword,
          })}
          startIcon={<Lock />}
          disabled={isLoading}
          sx={{ mb: 4 }}
          // CUSTOMIZE: Bạn có thể chỉnh sửa confirm password input tại đây
        />

        {/* Submit Button */}
        <WSButton
          type="submit"
          variant="primary"
          size="large"
          fullWidth
          loading={isLoading}
          loadingText="Đang đặt lại mật khẩu..."
          disabled={isLoading}
          sx={{ mb: 3 }}
          // CUSTOMIZE: Bạn có thể chỉnh sửa submit button tại đây
        >
          Đặt Lại Mật Khẩu
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
      </Box>
    </Paper>
  );
}
