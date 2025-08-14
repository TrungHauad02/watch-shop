import { useState, useCallback, useMemo } from 'react';
import { useTheme } from '@mui/material';
import { WSInputProps, WS_INPUT_DEFAULTS } from './WSInput.types';
import {
  StyledWSInput,
  StyledHelperText,
  StyledInputAdornment,
  IconWrapper,
  InputContainer,
} from './WSInput.styles';

// ==============================================
// WSInput COMPONENT - THEME INTEGRATED
// ==============================================

// CUSTOMIZE: Bạn có thể chỉnh sửa variant (outlined, filled),
// size (small, medium, large), color (primary, secondary, success, warning, error, info) để tùy chỉnh input.
// Input sẽ tự động thay đổi màu sắc theo theme (dark/light mode).
export default function WSInput({
  // Core props
  variant = WS_INPUT_DEFAULTS.variant,
  size = WS_INPUT_DEFAULTS.size,
  color = WS_INPUT_DEFAULTS.color,
  type = WS_INPUT_DEFAULTS.type,

  // Content
  label,
  placeholder,
  value,
  defaultValue,

  // Icons
  startIcon,
  endIcon,

  // Helper text configuration
  helperText,
  showCharacterCount = WS_INPUT_DEFAULTS.showCharacterCount,
  maxCharacters,

  // Enhanced features
  fullWidth = WS_INPUT_DEFAULTS.fullWidth,
  required = false,
  disabled = false,
  readOnly = false,
  multiline = false,
  rows,

  // Validation
  error = false,
  success = false,

  // Event handlers
  onChange,
  onFocus,
  onBlur,

  // Accessibility
  ariaLabel,

  // Form integration
  name,
  id,

  // Style props
  sx,
  className,

  // Forward all other props to MUI TextField
  ...otherProps
}: WSInputProps) {
  // ==============================================
  // THEME INTEGRATION
  // ==============================================

  const theme = useTheme();

  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [internalValue, setInternalValue] = useState(
    value || defaultValue || ''
  );
  const [isFocused, setIsFocused] = useState(false);

  // ==============================================
  // COMPUTED VALUES
  // ==============================================

  // Determine actual values
  const currentValue = value !== undefined ? value : internalValue;
  const stringValue = String(currentValue);
  const characterCount = stringValue.length;

  // Determine validation state
  const hasError = error;
  const hasSuccess = success && !error;

  // Character count validation
  const isOverLimit = maxCharacters ? characterCount > maxCharacters : false;
  const isNearLimit = maxCharacters
    ? characterCount >= maxCharacters * 0.8
    : false;
  const shouldShowCharacterCount: boolean =
    showCharacterCount && (maxCharacters !== null || characterCount > 0);

  // Container classes
  const containerClasses = useMemo(() => {
    const classes = [];
    if (hasError) classes.push('error');
    if (hasSuccess) classes.push('success');
    if (isFocused) classes.push('focused');
    return classes.join(' ');
  }, [hasError, hasSuccess, isFocused]);

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      // Update internal value if uncontrolled
      if (value === undefined) {
        setInternalValue(newValue);
      }

      // Call external onChange handler
      onChange?.(event);
    },
    [onChange, value]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  // ==============================================
  // ADORNMENTS - THEME AWARE
  // ==============================================

  const startAdornment = useMemo(() => {
    if (!startIcon) return undefined;

    return (
      <StyledInputAdornment position="start" wsSize={size}>
        <IconWrapper wsSize={size} position="start">
          {startIcon}
        </IconWrapper>
      </StyledInputAdornment>
    );
  }, [startIcon, size]);

  const endAdornment = useMemo(() => {
    if (!endIcon) return undefined;

    return (
      <StyledInputAdornment position="end" wsSize={size}>
        <IconWrapper wsSize={size} position="end">
          {endIcon}
        </IconWrapper>
      </StyledInputAdornment>
    );
  }, [endIcon, size]);

  // ==============================================
  // HELPER TEXT COMPONENT - THEME AWARE
  // ==============================================

  const renderHelperText = () => {
    if (!helperText && !shouldShowCharacterCount) return undefined;

    return (
      <StyledHelperText
        showCount={shouldShowCharacterCount}
        error={hasError}
        sx={{
          // CUSTOMIZE: Bạn có thể chỉnh sửa helper text styling tại đây
          color: hasError
            ? theme.palette.error.main
            : hasSuccess
              ? theme.palette.success.main
              : theme.palette.text.secondary,
        }}
      >
        {helperText && <span className="helper-text">{helperText}</span>}
        {shouldShowCharacterCount && (
          <span
            className={`character-count ${
              isOverLimit ? 'over-limit' : isNearLimit ? 'near-limit' : ''
            }`}
          >
            {maxCharacters
              ? `${characterCount}/${maxCharacters}`
              : characterCount}
          </span>
        )}
      </StyledHelperText>
    );
  };

  // ==============================================
  // INPUT PROPS CONFIGURATION
  // ==============================================

  const inputProps = useMemo(
    () => ({
      readOnly,
      ...(maxCharacters && { maxLength: maxCharacters }),
      'aria-label': ariaLabel,
      'aria-invalid': hasError,
      'aria-describedby': helperText ? `${id || name}-helper-text` : undefined,
    }),
    [readOnly, maxCharacters, ariaLabel, hasError, helperText, id, name]
  );

  const InputPropsConfig = useMemo(
    () => ({
      startAdornment,
      endAdornment,
      ...otherProps.InputProps,
    }),
    [startAdornment, endAdornment, otherProps.InputProps]
  );

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <InputContainer className={containerClasses}>
      <StyledWSInput
        // Custom styling props
        wsVariant={variant}
        wsColor={color}
        wsSize={size}
        hasSuccess={hasSuccess}
        // MUI TextField props
        variant={variant}
        size={size === 'large' ? 'medium' : size} // MUI doesn't have large size
        color={hasError ? 'error' : hasSuccess ? 'success' : 'primary'}
        // Content
        label={label}
        {...(placeholder && { placeholder })}
        value={currentValue}
        // Features
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
        multiline={multiline}
        {...(rows !== undefined && { rows })}
        // Validation
        error={hasError}
        // Form integration
        {...(name && { name })}
        {...(id && { id })}
        type={type}
        // Input props
        inputProps={inputProps}
        // Adornments
        InputProps={InputPropsConfig}
        // Helper text
        helperText={renderHelperText()}
        // Event handlers
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // Styling - CUSTOMIZE: Bạn có thể override styles tại đây
        sx={{
          // Ensure proper theme integration
          '& .MuiInputBase-root': {
            backgroundColor: theme.palette.background.paper,
            transition: theme.transitions.create(
              ['background-color', 'border-color', 'box-shadow'],
              {
                duration: theme.transitions.duration.short,
              }
            ),
          },

          // Focus state enhancements
          '& .MuiInputBase-root.Mui-focused': {
            boxShadow: `0 0 0 2px ${
              hasError
                ? theme.palette.error.main + '25'
                : hasSuccess
                  ? theme.palette.success.main + '25'
                  : theme.palette.primary.main + '25'
            }`,
          },

          // Dark mode specific adjustments
          ...(theme.palette.mode === 'dark' && {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey[700],
            },
            '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.grey[600],
            },
          }),

          ...sx,
        }}
        {...(className && { className })}
        // Forward other props
        {...Object.fromEntries(
          Object.entries(otherProps).filter(
            ([key]) => !['InputProps', 'inputProps'].includes(key)
          )
        )}
      />
    </InputContainer>
  );
}
