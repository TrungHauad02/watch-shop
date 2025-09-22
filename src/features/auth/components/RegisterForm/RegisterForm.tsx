/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Box, Typography, Alert, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { Person, Email, Lock } from '@mui/icons-material';
import { WSButton, WSInput } from '@/components';
import { COLORS } from '@/styles/colors';
import { RegisterFormProps, RegisterFormState } from './RegisterForm.types';
import { RegisterValidationErrors } from '../../types';

export default function RegisterForm({
  onSubmit,
  isLoading = false,
  error,
  onErrorDismiss,
}: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
  });

  const [validationErrors, setValidationErrors] =
    useState<RegisterValidationErrors>({});

  // Clear validation errors when user starts typing
  useEffect(() => {
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors({});
    }
  }, [
    formData.name,
    formData.email,
    formData.password,
    formData.confirmPassword,
  ]);

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
    const errors: RegisterValidationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Họ tên không được để trống';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Họ tên phải có ít nhất 2 ký tự';
    } else if (formData.name.trim().length > 50) {
      errors.name = 'Họ tên không được quá 50 ký tự';
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email không được để trống';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 8) {
      errors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password)) {
      errors.password =
        'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Xác nhận mật khẩu không được để trống';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
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
    (field: keyof RegisterFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  // Create Alert props conditionally
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
            background: COLORS.gray900,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            // CUSTOMIZE: Bạn có thể chỉnh sửa style của tiêu đề tại đây
          }}
        >
          Đăng Ký
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: COLORS.gray600,
            fontSize: '0.95rem',
          }}
        >
          Tạo tài khoản mới để trải nghiệm dịch vụ tốt nhất
        </Typography>
      </Box>

      {/* Error Alert */}
      {error && <Alert {...alertProps}>{error}</Alert>}

      {/* Name Input */}
      <WSInput
        fullWidth
        label="Họ và tên"
        type="text"
        placeholder="Nhập họ và tên đầy đủ"
        value={formData.name}
        onChange={handleInputChange('name')}
        error={!!validationErrors.name}
        {...(validationErrors.name && { errorText: validationErrors.name })}
        startIcon={<Person />}
        autoFocus
        disabled={isLoading}
        sx={{ mb: 3 }}
      />

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
        disabled={isLoading}
        sx={{ mb: 3 }}
      />

      {/* Password Input */}
      <WSInput
        fullWidth
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu mạnh"
        value={formData.password}
        onChange={handleInputChange('password')}
        error={!!validationErrors.password}
        {...(validationErrors.password && {
          errorText: validationErrors.password,
        })}
        startIcon={<Lock />}
        disabled={isLoading}
        helperText="Ít nhất 8 ký tự, có chữ hoa, chữ thường và số"
        sx={{ mb: 3 }}
      />

      {/* Confirm Password Input */}
      <WSInput
        fullWidth
        label="Xác nhận mật khẩu"
        type="password"
        placeholder="Nhập lại mật khẩu"
        value={formData.confirmPassword}
        onChange={handleInputChange('confirmPassword')}
        error={!!validationErrors.confirmPassword}
        {...(validationErrors.confirmPassword && {
          errorText: validationErrors.confirmPassword,
        })}
        startIcon={<Lock />}
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
        loadingText="Đang tạo tài khoản..."
        disabled={isLoading}
        sx={{ mb: 3 }}
      >
        Đăng Ký
      </WSButton>

      {/* Login Link */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: COLORS.gray600 }}>
          Đã có tài khoản?{' '}
          <MuiLink
            component={Link}
            to="/auth/login"
            sx={{
              color: COLORS.primary,
              textDecoration: 'none',
              fontWeight: 600,
              '&:hover': {
                textDecoration: 'underline',
                color: COLORS.gold600,
              },
              // CUSTOMIZE: Bạn có thể chỉnh sửa style của login link tại đây
            }}
          >
            Đăng nhập ngay
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
