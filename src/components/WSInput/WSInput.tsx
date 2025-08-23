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

/**
 * WSInput - Custom Input Component
 *
 * CUSTOMIZE: Bạn có thể chỉnh sửa:
 * - variant: 'outlined' | 'filled'
 * - size: 'small' | 'medium' | 'large'
 * - color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
 * - type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'search'
 *
 * Input sẽ tự động thay đổi màu sắc theo theme (dark/light mode).
 *
 * @example
 * // Basic usage
 * <WSInput label="Tên sản phẩm" />
 *
 * // With validation
 * <WSInput
 *   label="Email"
 *   type="email"
 *   error={hasError}
 *   helperText="Email không hợp lệ"
 * />
 *
 * // With icons and character count
 * <WSInput
 *   label="Mô tả"
 *   multiline
 *   rows={3}
 *   maxCharacters={500}
 *   showCharacterCount
 *   startIcon={<DescriptionIcon />}
 * />
 */
export default function WSInput({
  // === CORE STYLING PROPS ===
  variant = WS_INPUT_DEFAULTS.variant, // 🎨 outlined | filled
  size = WS_INPUT_DEFAULTS.size, // 📏 small | medium | large
  color = WS_INPUT_DEFAULTS.color, // 🎨 primary | secondary | success | warning | error | info
  type = WS_INPUT_DEFAULTS.type, // ⌨️ text | password | email | number | tel | search

  // === CONTENT ===
  label, // 📝 Input label
  placeholder, // 💭 Placeholder text
  value, // 🔄 Controlled value
  defaultValue, // 🔄 Uncontrolled default value

  // === ICONS ===
  startIcon, // 🎯 Icon bên trái
  endIcon, // 🎯 Icon bên phải

  // === HELPER TEXT CONFIGURATION ===
  helperText, // 💬 Helper/error message
  showCharacterCount = WS_INPUT_DEFAULTS.showCharacterCount, // 🔢 Show character counter
  maxCharacters, // 📏 Maximum character limit

  // === ENHANCED FEATURES ===
  fullWidth = WS_INPUT_DEFAULTS.fullWidth, // 📐 Full width input
  required = false, // ⚠️ Required field
  disabled = false, // 🚫 Disabled state
  readOnly = false, // 👁️ Read-only state
  multiline = false, // 📄 Textarea mode
  rows, // 📄 Textarea rows

  // === VALIDATION ===
  error = false, // 🚨 Error state
  success = false, // ✅ Success state

  // === EVENT HANDLERS ===
  onChange, // 🔄 Change handler
  onFocus, // 🎯 Focus handler
  onBlur, // 👋 Blur handler

  // === ACCESSIBILITY ===
  ariaLabel, // ♿ Accessibility label

  // === FORM INTEGRATION ===
  name, // 📋 Form field name
  id, // 🔑 Element ID

  // === CUSTOM STYLING ===
  sx, // 🎨 MUI sx prop
  className, // 🎨 CSS class

  // === FORWARD ALL OTHER PROPS ===
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

  // 🔄 Determine actual value (controlled vs uncontrolled)
  const currentValue = value !== undefined ? value : internalValue;
  const stringValue = String(currentValue);
  const characterCount = stringValue.length;

  // 🚨 Validation states
  const hasError = error;
  const hasSuccess = success && !error;

  // 🔢 Character count validation
  const isOverLimit = maxCharacters ? characterCount > maxCharacters : false;
  const isNearLimit = maxCharacters
    ? characterCount >= maxCharacters * 0.8
    : false;
  const shouldShowCharacterCount: boolean =
    showCharacterCount && (maxCharacters !== null || characterCount > 0);

  // 📦 Container CSS classes
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

  /**
   * Handle input value changes
   * Manages both controlled and uncontrolled components
   */
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      // 🔄 Update internal value for uncontrolled component
      if (value === undefined) {
        setInternalValue(newValue);
      }

      // 📤 Call external onChange handler
      onChange?.(event);
    },
    [onChange, value]
  );

  /**
   * Handle input focus
   */
  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  /**
   * Handle input blur
   */
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

  /**
   * Render start icon adornment
   */
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

  /**
   * Render end icon adornment
   */
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

  /**
   * Render helper text with optional character count
   */
  const renderHelperText = () => {
    if (!helperText && !shouldShowCharacterCount) return undefined;

    return (
      <StyledHelperText
        showCount={shouldShowCharacterCount}
        error={hasError}
        sx={{
          // CUSTOMIZE: Màu helper text theo validation state
          color: hasError
            ? theme.palette.error.main // 🚨 Đỏ cho error
            : hasSuccess
              ? theme.palette.success.main // ✅ Xanh cho success
              : theme.palette.text.secondary, // 📝 Xám cho bình thường
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
        // === CUSTOM STYLING PROPS ===
        wsVariant={variant}
        wsColor={color}
        wsSize={size}
        hasSuccess={hasSuccess}
        // === MUI TEXTFIELD PROPS ===
        variant={variant}
        size={size === 'large' ? 'medium' : size}
        color={hasError ? 'error' : hasSuccess ? 'success' : 'primary'}
        // === CONTENT ===
        label={label}
        {...(placeholder && { placeholder })}
        value={currentValue}
        // === FEATURES ===
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
        multiline={multiline}
        {...(rows !== undefined && { rows })}
        // === VALIDATION ===
        error={hasError}
        // === FORM INTEGRATION ===
        {...(name && { name })}
        {...(id && { id })}
        type={type}
        // === INPUT PROPS ===
        inputProps={inputProps}
        InputProps={InputPropsConfig}
        // === HELPER TEXT ===
        helperText={renderHelperText()}
        // === EVENT HANDLERS ===
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // === STYLING ===
        // CUSTOMIZE: Bạn có thể override styles tại đây
        sx={{
          // 🎨 Theme integration cho background
          '& .MuiInputBase-root': {
            backgroundColor: theme.palette.background.paper,
            transition: theme.transitions.create(
              ['background-color', 'border-color', 'box-shadow'],
              { duration: theme.transitions.duration.short }
            ),
          },

          // ✨ Focus state enhancements
          '& .MuiInputBase-root.Mui-focused': {
            boxShadow: `0 0 0 2px ${
              hasError
                ? theme.palette.error.main + '25' // 🚨 Đỏ cho error
                : hasSuccess
                  ? theme.palette.success.main + '25' // ✅ Xanh cho success
                  : theme.palette.primary.main + '25' // 🎯 Theme color cho bình thường
            }`,
          },

          // 🌙 Dark mode adjustments
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
        // === FORWARD OTHER PROPS ===
        {...Object.fromEntries(
          Object.entries(otherProps).filter(
            ([key]) => !['InputProps', 'inputProps'].includes(key)
          )
        )}
      />
    </InputContainer>
  );
}
