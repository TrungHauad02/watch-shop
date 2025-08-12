// src/components/WSInput/WSInput.tsx
import React, { forwardRef, useState, useCallback, useMemo } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { WSInputProps, WSInputRef, WS_INPUT_DEFAULTS } from './WSInput.types';
import {
  StyledWSInput,
  StyledHelperText,
  StyledInputAdornment,
  IconWrapper,
} from './WSInput.styles';

// ==============================================
// WSInput COMPONENT
// ==============================================

const WSInput = forwardRef<WSInputRef, WSInputProps>(
  (
    {
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
      // iconSize - removed unused prop
      // iconColor - removed unused prop

      // Helper text configuration
      helperText,
      showCharacterCount = WS_INPUT_DEFAULTS.showCharacterCount,
      maxCharacters,
      persistentHelper = WS_INPUT_DEFAULTS.persistentHelper,

      // Validation
      error = false,
      success = false,
      isValid,
      isInvalid,
      // isValidating - removed unused prop
      validationMessage,

      // Enhanced features
      fullWidth = true,
      required = false,
      disabled = false,
      readOnly = false,
      multiline = false,
      rows,
      maxRows,

      // Responsive
      responsive = WS_INPUT_DEFAULTS.responsive,
      mobileVariant,

      // Input restrictions
      minLength,
      maxLength,
      min,
      max,
      step,
      pattern,

      // Auto features
      autoComplete,
      autoFocus = false,

      // Accessibility
      ariaLabel,
      ariaDescribedBy,

      // Form integration
      name,
      id,
      // form - removed unused prop

      // Input modes
      inputMode,

      // Event handlers
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      onKeyUp,

      // Style props
      sx,
      className,

      // Forward all other props to MUI TextField
      ...otherProps
    },
    ref
  ) => {
    // ==============================================
    // HOOKS AND STATE
    // ==============================================

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // const [isFocused, setIsFocused] = useState(false); // Reserved for future use
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
    const hasError = error || isInvalid || !!validationMessage;
    const hasSuccess = success || isValid;

    // Determine effective variant based on responsive settings
    const effectiveVariant =
      responsive && isMobile && mobileVariant ? mobileVariant : variant;

    // Character count validation
    const isOverLimit = maxCharacters ? characterCount > maxCharacters : false;
    const shouldShowCharacterCount =
      showCharacterCount && (maxCharacters || characterCount > 0);

    // Helper text logic
    const effectiveHelperText = validationMessage || helperText;
    const shouldShowHelper =
      persistentHelper ||
      effectiveHelperText ||
      shouldShowCharacterCount ||
      hasError ||
      hasSuccess;

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
        // setIsFocused(true); // Reserved for future use
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // setIsFocused(false); // Reserved for future use
        onBlur?.(event);
      },
      [onBlur]
    );

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onKeyDown?.(event);
      },
      [onKeyDown]
    );

    const handleKeyUp = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onKeyUp?.(event);
      },
      [onKeyUp]
    );

    // ==============================================
    // ADORNMENTS
    // ==============================================

    const startAdornment = useMemo(() => {
      if (!startIcon) return undefined;

      return (
        <StyledInputAdornment position="start" wsSize={size}>
          <IconWrapper size={size} position="start">
            {startIcon}
          </IconWrapper>
        </StyledInputAdornment>
      );
    }, [startIcon, size]);

    const endAdornment = useMemo(() => {
      if (!endIcon) return undefined;

      return (
        <StyledInputAdornment position="end" wsSize={size}>
          <IconWrapper size={size} position="end">
            {endIcon}
          </IconWrapper>
        </StyledInputAdornment>
      );
    }, [endIcon, size]);

    // ==============================================
    // HELPER TEXT COMPONENT
    // ==============================================

    const renderHelperText = () => {
      if (!shouldShowHelper) return undefined;

      return (
        <StyledHelperText
          wsSize={size}
          showCount={!!shouldShowCharacterCount}
          error={hasError}
        >
          {effectiveHelperText && (
            <span className="helper-text">{effectiveHelperText}</span>
          )}
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
    // INPUT PROPS
    // ==============================================

    const inputProps = useMemo(
      () => ({
        // Input restrictions
        minLength,
        maxLength: maxCharacters || maxLength,
        min,
        max,
        step,
        pattern,

        // Input mode for mobile
        inputMode,

        // Accessibility
        'aria-label': ariaLabel,
        'aria-describedby': ariaDescribedBy,

        // Read only
        readOnly,
      }),
      [
        minLength,
        maxCharacters,
        maxLength,
        min,
        max,
        step,
        pattern,
        inputMode,
        ariaLabel,
        ariaDescribedBy,
        readOnly,
      ]
    );

    // ==============================================
    // RENDER COMPONENT
    // ==============================================

    return (
      <StyledWSInput
        ref={ref}
        // Custom styling props
        wsVariant={effectiveVariant}
        wsColor={color}
        wsSize={size}
        hasSuccess={(hasSuccess && !hasError) || false}
        responsive={responsive}
        {...(mobileVariant && { mobileVariant })}
        // MUI TextField props
        variant={effectiveVariant}
        size={size === 'large' ? 'medium' : size} // MUI doesn't have large size
        color={hasError ? 'error' : hasSuccess ? 'success' : 'primary'}
        // Content
        label={label}
        {...(placeholder && { placeholder })}
        value={currentValue}
        defaultValue={undefined} // Controlled by value prop
        // Features
        fullWidth={fullWidth}
        required={required}
        disabled={disabled}
        multiline={multiline}
        {...(rows !== undefined && { rows })}
        {...(maxRows !== undefined && { maxRows })}
        // Validation
        error={hasError}
        // Auto features
        {...(autoComplete && { autoComplete })}
        autoFocus={autoFocus}
        // Form integration
        {...(name && { name })}
        {...(id && { id })}
        // form prop removed - not supported by MUI TextField
        type={type}
        // Input props
        inputProps={inputProps}
        // Adornments - moved to InputProps above
        // InputProps already set above

        // Helper text
        helperText={renderHelperText()}
        // Event handlers - Use InputProps for proper event typing
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        // Input-specific event handlers
        InputProps={{
          startAdornment,
          endAdornment,
          onKeyDown: handleKeyDown,
          onKeyUp: handleKeyUp,
          ...otherProps.InputProps,
        }}
        // Styling
        {...(sx && { sx })}
        {...(className && { className })}
        // Forward other props
        {...otherProps}
      />
    );
  }
);

// ==============================================
// COMPONENT DISPLAY NAME
// ==============================================

WSInput.displayName = 'WSInput';

// ==============================================
// EXPORT COMPONENT
// ==============================================

export default WSInput;
