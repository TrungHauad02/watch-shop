/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Email, Lock } from '@mui/icons-material';
import { WSButton, WSInput } from '@/components';
import { COLORS } from '@/styles/colors';
import { LoginFormProps, LoginFormState } from './LoginForm.types';
import { LoginValidationErrors } from '../../types';

export default function LoginForm({
  onSubmit,
  isLoading = false,
  error,
  onErrorDismiss,
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
    rememberMe: false,
    showPassword: false,
  });

  const [validationErrors, setValidationErrors] =
    useState<LoginValidationErrors>({});

  // Clear validation errors when user starts typing
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors({});
    }
  }, [formData.email, formData.password]);

  // Clear error when dismissed
  useEffect(() => {
    if (error && onErrorDismiss) {
      const timer = setTimeout(() => {
        onErrorDismiss();
      }, 5000); // Auto dismiss after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [error, onErrorDismiss]);

  const validateForm = (): boolean => {
    const errors: LoginValidationErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Loại bỏ showPassword khỏi submitData
    const { showPassword: _, ...submitData } = formData;
    await onSubmit(submitData);
  };

  const handleInputChange =
    (field: keyof LoginFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  // Create Alert props conditionally - không include onClose nếu không có handler
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
    <Box
      component="form"
      onSubmit={handleSubmit}
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
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gold600})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // CUSTOMIZE: Bạn có thể chỉnh sửa style của tiêu đề tại đây
          }}
        >
          Đăng Nhập
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: COLORS.gray600,
            fontSize: '0.95rem',
          }}
        >
          Chào mừng bạn trở lại với Minh Nhật Watch
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && <Alert {...alertProps}>{error}</Alert>}

      {/* Email Input */}
      <WSInput
        fullWidth
        label="Email"
        type="email"
        placeholder="Nhập địa chỉ email của bạn"
        value={formData.email}
        onChange={handleInputChange('email')}
        error={!!validationErrors.email}
        {...(validationErrors.email && { errorText: validationErrors.email })}
        startIcon={<Email />}
        autoFocus
        disabled={isLoading}
        sx={{ mb: 3 }}
      />

      {/* Password Input */}
      <WSInput
        fullWidth
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu của bạn"
        value={formData.password}
        onChange={handleInputChange('password')}
        error={!!validationErrors.password}
        {...(validationErrors.password && {
          errorText: validationErrors.password,
        })}
        startIcon={<Lock />}
        disabled={isLoading}
        sx={{ mb: 3 }}
      />

      {/* Remember Me & Forgot Password */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.rememberMe}
              onChange={handleInputChange('rememberMe')}
              disabled={isLoading}
              sx={{
                color: COLORS.gray400,
                '&.Mui-checked': {
                  color: COLORS.primary,
                },
                // CUSTOMIZE: Bạn có thể chỉnh sửa style của checkbox tại đây
              }}
            />
          }
          label={
            <Typography variant="body2" sx={{ color: COLORS.gray600 }}>
              Ghi nhớ đăng nhập
            </Typography>
          }
        />

        <MuiLink
          component={Link}
          to="/auth/forgot-password"
          sx={{
            fontSize: '0.875rem',
            color: COLORS.primary,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              color: COLORS.gold600,
            },
            // CUSTOMIZE: Bạn có thể chỉnh sửa style của forgot password link tại đây
          }}
        >
          Quên mật khẩu?
        </MuiLink>
      </Box>

      {/* Submit Button */}
      <WSButton
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        loading={isLoading}
        loadingText="Đang đăng nhập..."
        disabled={isLoading}
        sx={{ mb: 3 }}
      >
        Đăng Nhập
      </WSButton>

      {/* Register Link */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: COLORS.gray600 }}>
          Chưa có tài khoản?{' '}
          <MuiLink
            component={Link}
            to="/auth/register"
            sx={{
              color: COLORS.primary,
              textDecoration: 'none',
              fontWeight: 600,
              '&:hover': {
                textDecoration: 'underline',
                color: COLORS.gold600,
              },
              // CUSTOMIZE: Bạn có thể chỉnh sửa style của register link tại đây
            }}
          >
            Đăng ký ngay
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
