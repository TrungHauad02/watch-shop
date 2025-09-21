import {
  TextField,
  InputAdornment,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { forwardRef, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { WSInputProps } from './WSInput.types';
import { getInputStyles } from './WSInput.styles';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

const WSInput = forwardRef<HTMLDivElement, WSInputProps>(
  (
    {
      variant = 'outlined',
      size = 'medium',
      type = 'text',
      startIcon,
      endIcon,
      placeholder,
      helperText,
      error = false,
      errorText,
      required = false,
      disabled = false,
      readOnly = false,
      fullWidth = false,
      autoFocus = false,
      showCharacterCount = false,
      maxLength,
      label,
      value,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [showPassword, setShowPassword] = useState(false);

    // CUSTOMIZE: Bạn có thể chỉnh sửa logic xử lý password tại đây
    const isPasswordType = type === 'password';
    const actualType = isPasswordType && showPassword ? 'text' : type;

    // CUSTOMIZE: Bạn có thể chỉnh sửa logic hiển thị lỗi tại đây
    const hasError = error || !!errorText;
    const displayHelperText = hasError ? errorText : helperText;

    // CUSTOMIZE: Bạn có thể chỉnh sửa logic đếm ký tự tại đây
    const characterCount = typeof value === 'string' ? value.length : 0;
    const shouldShowCharacterCount =
      showCharacterCount && (maxLength || characterCount > 0);

    const inputStyles = getInputStyles(theme, variant, size);

    const handleTogglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Box sx={{ width: fullWidth ? '100%' : 'auto' }}>
        <TextField
          ref={ref}
          variant={variant}
          size={size === 'large' ? 'medium' : size}
          type={actualType}
          label={label}
          placeholder={placeholder ?? ''}
          helperText={displayHelperText}
          error={hasError}
          required={required}
          disabled={disabled}
          fullWidth={fullWidth}
          autoFocus={autoFocus}
          value={value}
          inputProps={{
            maxLength,
            readOnly,
            // CUSTOMIZE: Bạn có thể thêm các input props khác tại đây
          }}
          InputProps={{
            startAdornment: startIcon && (
              <InputAdornment position="start">
                <Box
                  sx={{
                    color: hasError
                      ? SEMANTIC_COLORS.error500
                      : COLORS.textSecondary,
                  }}
                >
                  {startIcon}
                </Box>
              </InputAdornment>
            ),
            endAdornment: (startIcon || endIcon || isPasswordType) && (
              <InputAdornment position="end">
                {isPasswordType ? (
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                    size="small"
                    disabled={disabled}
                    // CUSTOMIZE: Bạn có thể chỉnh sửa style của toggle password button tại đây
                    sx={{
                      color: hasError
                        ? SEMANTIC_COLORS.error500
                        : COLORS.textSecondary,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: COLORS.gold500,
                      },
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ) : endIcon ? (
                  <Box
                    sx={{
                      color: hasError
                        ? SEMANTIC_COLORS.error500
                        : COLORS.textSecondary,
                    }}
                  >
                    {endIcon}
                  </Box>
                ) : null}
              </InputAdornment>
            ),
          }}
          sx={{
            ...inputStyles,
            ...sx,
          }}
          {...props}
        />

        {/* Character Count */}
        {shouldShowCharacterCount && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 0.5,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: hasError
                  ? SEMANTIC_COLORS.error500
                  : COLORS.textSecondary,
                fontSize: '0.75rem',
                // CUSTOMIZE: Bạn có thể chỉnh sửa style của character count tại đây
              }}
            >
              {characterCount}
              {maxLength && `/${maxLength}`}
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
);

WSInput.displayName = 'WSInput';

export default WSInput;
