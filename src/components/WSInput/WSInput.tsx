import { useState, useCallback, useMemo } from 'react';
import { WSInputProps, WS_INPUT_DEFAULTS } from './WSInput.types';
import {
  StyledWSInput,
  StyledHelperText,
  StyledInputAdornment,
  IconWrapper,
} from './WSInput.styles';

// ==============================================
// WSInput COMPONENT - SIMPLIFIED
// ==============================================

// CUSTOMIZE: Bạn có thể chỉnh sửa variant (outlined, filled),
// size (small, medium, large), color (primary, secondary, success, warning, error, info) để tùy chỉnh input
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
  // STATE MANAGEMENT
  // ==============================================

  const [internalValue, setInternalValue] = useState(
    value || defaultValue || ''
  );

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
  const shouldShowCharacterCount: boolean =
    showCharacterCount && (maxCharacters !== null || characterCount > 0);

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
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onBlur?.(event);
    },
    [onBlur]
  );

  // ==============================================
  // ADORNMENTS
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
  // HELPER TEXT COMPONENT
  // ==============================================

  const renderHelperText = () => {
    if (!helperText && !shouldShowCharacterCount) return undefined;

    return (
      <StyledHelperText showCount={shouldShowCharacterCount} error={hasError}>
        {helperText && <span className="helper-text">{helperText}</span>}
        {shouldShowCharacterCount && (
          <span
            className={`character-count ${isOverLimit ? 'over-limit' : ''}`}
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
  // RENDER COMPONENT
  // ==============================================

  return (
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
      inputProps={{
        readOnly,
        ...(maxCharacters && { maxLength: maxCharacters }),
        'aria-label': ariaLabel,
      }}
      // Adornments
      InputProps={{
        startAdornment,
        endAdornment,
        ...otherProps.InputProps,
      }}
      // Helper text
      helperText={renderHelperText()}
      // Event handlers
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      // Styling
      {...(sx && { sx })}
      {...(className && { className })}
      // Forward other props
      {...otherProps}
    />
  );
}
