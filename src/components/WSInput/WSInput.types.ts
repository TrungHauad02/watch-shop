/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/WSInput/WSInput.types.ts
import { ReactNode } from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSINPUT VARIANT TYPES
// ==============================================

export type WSInputVariant = 'outlined' | 'filled' | 'standard';

export type WSInputSize = 'small' | 'medium' | 'large';

export type WSInputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'month'
  | 'week';

export type WSInputColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

// ==============================================
// VALIDATION STATE
// ==============================================

export interface WSInputValidation {
  isValid?: boolean;
  isInvalid?: boolean;
  isValidating?: boolean;
  validationMessage?: string;
}

// ==============================================
// ICON CONFIGURATION
// ==============================================

export interface WSInputIconConfig {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  // iconSize and iconColor removed - calculated automatically based on input size
}

// ==============================================
// HELPER TEXT CONFIGURATION
// ==============================================

export interface WSInputHelperConfig {
  helperText?: string;
  showCharacterCount?: boolean;
  maxCharacters?: number;
  persistentHelper?: boolean;
}

// ==============================================
// MAIN WSINPUT PROPS INTERFACE
// ==============================================

export interface WSInputProps
  extends Omit<
      MuiTextFieldProps,
      | 'variant'
      | 'size'
      | 'color'
      | 'type'
      | 'helperText'
      | 'onChange'
      | 'onFocus'
      | 'onBlur'
      | 'onKeyDown'
      | 'onKeyUp'
    >,
    WSInputValidation,
    WSInputIconConfig,
    WSInputHelperConfig {
  // Core styling props
  variant?: WSInputVariant;
  size?: WSInputSize;
  color?: WSInputColor;
  type?: WSInputType;

  // Content and state
  label?: string;
  placeholder?: string;
  value?: string | number;
  defaultValue?: string | number;

  // Enhanced features
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;

  // Responsive behavior
  responsive?: boolean;
  mobileVariant?: WSInputVariant;

  // Validation
  error?: boolean;
  success?: boolean;

  // Auto features
  autoComplete?: string;
  autoFocus?: boolean;

  // Input restrictions
  minLength?: number;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  pattern?: string;

  // Event handlers
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyUp?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;

  // Form integration
  name?: string;
  id?: string;
  form?: string;

  // Input modes for mobile
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
}

// ==============================================
// STYLE CONFIGURATION TYPES
// ==============================================

export interface WSInputStyleConfig {
  borderColor: string;
  borderColorHover: string;
  borderColorFocus: string;
  backgroundColor: string;
  backgroundColorHover: string;
  backgroundColorFocus: string;
  textColor: string;
  labelColor: string;
  labelColorFocus: string;
  helperTextColor: string;
  placeholderColor: string;
}

export interface WSInputSizeConfig {
  height: string;
  padding: string;
  fontSize: string;
  labelFontSize: string;
  helperFontSize: string;
  iconSize: string;
  borderRadius: string;
}

// ==============================================
// COMPONENT STATE TYPES
// ==============================================

export interface WSInputState {
  isFocused: boolean;
  hasValue: boolean;
  isHovered: boolean;
  characterCount: number;
  isValidating: boolean;
}

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSInputRef = HTMLDivElement;

export type WSInputComponent = React.ForwardRefExoticComponent<
  WSInputProps & React.RefAttributes<WSInputRef>
>;

// ==============================================
// UTILITY TYPES
// ==============================================

export type WSInputEventHandler = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type WSInputFocusHandler = (
  event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

export type WSInputKeyboardHandler = (
  event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

// Helper type for controlled vs uncontrolled
export type WSInputControlled = WSInputProps & {
  value: string | number;
  onChange: WSInputEventHandler;
};

export type WSInputUncontrolled = WSInputProps & {
  defaultValue?: string | number;
  onChange?: WSInputEventHandler;
};

// ==============================================
// CONSTANTS FOR TYPE CHECKING
// ==============================================

export const WS_INPUT_VARIANTS = ['outlined', 'filled', 'standard'] as const;
export const WS_INPUT_SIZES = ['small', 'medium', 'large'] as const;
export const WS_INPUT_COLORS = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'error',
  'info',
] as const;
export const WS_INPUT_TYPES = [
  'text',
  'password',
  'email',
  'number',
  'tel',
  'url',
  'search',
  'date',
  'datetime-local',
  'time',
  'month',
  'week',
] as const;

// Type guards
export const isValidWSInputVariant = (
  variant: any
): variant is WSInputVariant => {
  return WS_INPUT_VARIANTS.includes(variant);
};

export const isValidWSInputSize = (size: any): size is WSInputSize => {
  return WS_INPUT_SIZES.includes(size);
};

export const isValidWSInputColor = (color: any): color is WSInputColor => {
  return WS_INPUT_COLORS.includes(color);
};

export const isValidWSInputType = (type: any): type is WSInputType => {
  return WS_INPUT_TYPES.includes(type);
};

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_INPUT_DEFAULTS: Required<
  Pick<
    WSInputProps,
    | 'variant'
    | 'size'
    | 'color'
    | 'type'
    | 'responsive'
    | 'persistentHelper'
    | 'showCharacterCount'
  >
> = {
  variant: 'outlined',
  size: 'medium',
  color: 'primary',
  type: 'text',
  responsive: true,
  persistentHelper: false,
  showCharacterCount: false,
} as const;
