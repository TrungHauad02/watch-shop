import { useMemo, cloneElement, isValidElement } from 'react';
import { useTheme } from '@mui/material';
import { WSFormFieldProps, WS_FORMFIELD_DEFAULTS } from './WSFormField.types';
import {
  FormFieldContainer,
  LabelContainer,
  InputContainer,
  StyledLabel,
  StyledHelperText,
  FieldWrapper,
} from './WSFormField.styles';

// ==============================================
// WSFormField COMPONENT - FLEXIBLE FORM LAYOUT
// ==============================================

/**
 * WSFormField - Flexible Form Field Layout Component
 *
 * CUSTOMIZE: Bạn có thể chỉnh sửa:
 * - labelPosition: 'top' | 'left' | 'left-aligned'
 * - spacing: 'none' | 'compact' | 'comfortable' | 'spacious' | number
 * - labelWidth: string | number (cho left layouts)
 * - labelAlign: 'left' | 'right' | 'center'
 *
 * Component tự động responsive và thay đổi theo theme (dark/light mode).
 *
 * @example
 * // Top label (default)
 * <WSFormField label="Tên sản phẩm" required>
 *   <WSInput placeholder="Nhập tên..." />
 * </WSFormField>
 *
 * // Left aligned with custom width
 * <WSFormField
 *   label="Giá"
 *   labelPosition="left"
 *   labelWidth="100px"
 * >
 *   <WSInput type="number" placeholder="0" />
 * </WSFormField>
 *
 * // With validation
 * <WSFormField
 *   label="Email"
 *   error={hasError}
 *   helperText="Email không hợp lệ"
 * >
 *   <WSInput type="email" />
 * </WSFormField>
 */
export default function WSFormField({
  // === LABEL CONFIGURATION ===
  label, // 📝 Label text
  labelPosition = WS_FORMFIELD_DEFAULTS.labelPosition, // 📐 top | left | left-aligned
  labelWidth, // 📏 Label width cho left layouts
  labelAlign = WS_FORMFIELD_DEFAULTS.labelAlign, // 📍 Label text alignment

  // === VALIDATION & STATES ===
  required = WS_FORMFIELD_DEFAULTS.required, // ⚠️ Required field
  error = WS_FORMFIELD_DEFAULTS.error, // 🚨 Error state
  success = WS_FORMFIELD_DEFAULTS.success, // ✅ Success state
  helperText, // 💬 Helper/error message

  // === LAYOUT & STYLING ===
  spacing = WS_FORMFIELD_DEFAULTS.spacing, // 📐 Gap between elements
  fullWidth = WS_FORMFIELD_DEFAULTS.fullWidth, // 📐 Full width container
  sx, // 🎨 MUI sx prop
  className, // 🎨 CSS class

  // === CONTENT ===
  children, // 🔧 Input component to wrap

  // === ACCESSIBILITY ===
  htmlFor, // ♿ Link label with input
  id, // 🔑 Container ID

  // === ADVANCED PROPS ===
  labelProps, // 🎛️ Additional label props
  helperTextProps, // 🎛️ Additional helper text props
}: WSFormFieldProps) {
  // ==============================================
  // THEME INTEGRATION
  // ==============================================

  const theme = useTheme();

  // ==============================================
  // COMPUTED VALUES
  // ==============================================

  // 🚨 Validation states
  const hasError = error;
  const hasSuccess = success && !error;
  const hasHelperText = Boolean(helperText);

  // 🔑 Generate unique IDs for accessibility
  const fieldId = id || `ws-field-${Math.random().toString(36).substr(2, 9)}`;
  const inputId = htmlFor || `${fieldId}-input`;
  const helperTextId = hasHelperText ? `${fieldId}-helper` : undefined;

  // 📦 Container classes for validation states
  const containerClasses = useMemo(() => {
    const classes = [];
    if (hasError) classes.push('ws-field-error');
    if (hasSuccess) classes.push('ws-field-success');
    if (className) classes.push(className);
    return classes.join(' ');
  }, [hasError, hasSuccess, className]);

  // ==============================================
  // CHILD COMPONENT ENHANCEMENT
  // ==============================================

  /**
   * Enhanced children with accessibility props
   * Automatically adds aria-describedby and other a11y props
   */
  const enhancedChildren = useMemo(() => {
    if (!isValidElement(children)) return children;

    // 🔧 Type-safe props extraction and enhancement
    const childProps = children.props as Record<string, unknown>;

    const enhancedProps = {
      // 🔑 Link với helper text cho accessibility
      ...(helperTextId && { 'aria-describedby': helperTextId }),
      // 🚨 Add aria-invalid cho error state
      ...(hasError && { 'aria-invalid': true }),
      // 🔑 Set input ID nếu chưa có
      ...(!childProps.id && { id: inputId }),
      // 📋 Preserve existing props
      ...childProps,
    };

    return cloneElement(children, enhancedProps);
  }, [children, helperTextId, hasError, inputId]);

  // ==============================================
  // RENDER LABEL COMPONENT
  // ==============================================

  const renderLabel = () => {
    if (!label) return null;

    // 🔧 Build label container props safely
    const labelContainerProps = {
      labelPosition,
      labelAlign,
      ...(labelWidth !== undefined && { labelWidth }),
    };

    // 🔧 Build label component props safely
    const labelComponentProps = {
      htmlFor: inputId,
      hasError,
      hasSuccess,
      isRequired: required,
      variant: labelProps?.variant || ('body1' as const),
      className: `ws-label ${labelProps?.className || ''}`,
      ...(labelProps?.sx && { sx: labelProps.sx }),
    };

    return (
      <LabelContainer {...labelContainerProps}>
        <StyledLabel {...labelComponentProps}>{label}</StyledLabel>
      </LabelContainer>
    );
  };

  // ==============================================
  // RENDER HELPER TEXT COMPONENT
  // ==============================================

  const renderHelperText = () => {
    if (!hasHelperText) return null;

    // 🔧 Build helper text props safely
    const helperComponentProps = {
      ...(helperTextId && { id: helperTextId }),
      hasError,
      hasSuccess,
      ...(helperTextProps?.className && {
        className: helperTextProps.className,
      }),
      ...(helperTextProps?.sx && { sx: helperTextProps.sx }),
    };

    return (
      <StyledHelperText {...helperComponentProps}>
        {helperText}
      </StyledHelperText>
    );
  };

  // ==============================================
  // RENDER INPUT SECTION
  // ==============================================

  const renderInputSection = () => {
    return (
      <InputContainer labelPosition={labelPosition} spacing={spacing}>
        {/* 🔧 Enhanced input component */}
        <FieldWrapper
          hasError={hasError}
          hasSuccess={hasSuccess}
          className={containerClasses}
        >
          {enhancedChildren}
        </FieldWrapper>

        {/* 💬 Helper text */}
        {renderHelperText()}
      </InputContainer>
    );
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <FormFieldContainer
      id={fieldId}
      labelPosition={labelPosition}
      fullWidth={fullWidth}
      spacing={spacing}
      sx={{
        // === CUSTOM STYLING OVERRIDES ===
        // CUSTOMIZE: Bạn có thể override container styles tại đây

        // 🎨 Theme integration
        '& .ws-label': {
          color: hasError
            ? theme.palette.error.main
            : hasSuccess
              ? theme.palette.success.main
              : theme.palette.text.primary,
        },

        // 🌙 Dark mode enhancements
        ...(theme.palette.mode === 'dark' && {
          '& .ws-label': {
            color: hasError
              ? theme.palette.error.light
              : hasSuccess
                ? theme.palette.success.light
                : theme.palette.text.primary,
          },
        }),

        // 📱 Mobile responsive adjustments
        [theme.breakpoints.down('sm')]: {
          // 📐 Stack all layouts vertically on mobile
          flexDirection: 'column',

          // 🔧 Reset label width on mobile
          '& .label-container': {
            width: '100% !important',
            minWidth: 'unset !important',
          },
        },

        ...sx,
      }}
      className={containerClasses}
    >
      {/* === LAYOUT RENDERING === */}

      {/* 📐 TOP LAYOUT: Label trên, Input dưới */}
      {labelPosition === 'top' && (
        <>
          {renderLabel()}
          {renderInputSection()}
        </>
      )}

      {/* 📐 LEFT LAYOUTS: Label trái, Input phải */}
      {(labelPosition === 'left' || labelPosition === 'left-aligned') && (
        <>
          {renderLabel()}
          {renderInputSection()}
        </>
      )}
    </FormFieldContainer>
  );
}
