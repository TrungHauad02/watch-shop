import { ReactNode } from 'react';
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSINPUT TYPES - SIMPLIFIED
// ==============================================

export type WSInputVariant = 'outlined' | 'filled';

export type WSInputSize = 'small' | 'medium' | 'large';

export type WSInputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'search';

export type WSInputColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

// ==============================================
// MAIN WSINPUT PROPS INTERFACE
// ==============================================

export interface WSInputProps
  extends Omit<
    MuiTextFieldProps,
    'variant' | 'size' | 'color' | 'type' | 'helperText'
  > {
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

  // Icons
  startIcon?: ReactNode;
  endIcon?: ReactNode;

  // Helper text
  helperText?: string;
  showCharacterCount?: boolean;
  maxCharacters?: number;

  // Enhanced features
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
  rows?: number;

  // Validation
  error?: boolean;
  success?: boolean;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;

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

  // Accessibility
  ariaLabel?: string;

  // Form integration
  name?: string;
  id?: string;
}

// ==============================================
// CONSTANTS
// ==============================================

export const WS_INPUT_VARIANTS = ['outlined', 'filled'] as const;
export const WS_INPUT_SIZES = ['small', 'medium', 'large'] as const;
export const WS_INPUT_COLORS = [
  'primary',
  'secondary',
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
  'search',
] as const;

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_INPUT_DEFAULTS = {
  variant: 'outlined' as WSInputVariant,
  size: 'medium' as WSInputSize,
  color: 'primary' as WSInputColor,
  type: 'text' as WSInputType,
  fullWidth: true,
  showCharacterCount: false,
} as const;

// ==============================================
// TYPE GUARDS
// ==============================================

export const isValidWSInputVariant = (
  variant: unknown
): variant is WSInputVariant => {
  return WS_INPUT_VARIANTS.includes(variant as WSInputVariant);
};

export const isValidWSInputSize = (size: unknown): size is WSInputSize => {
  return WS_INPUT_SIZES.includes(size as WSInputSize);
};

export const isValidWSInputColor = (color: unknown): color is WSInputColor => {
  return WS_INPUT_COLORS.includes(color as WSInputColor);
};

export const isValidWSInputType = (type: unknown): type is WSInputType => {
  return WS_INPUT_TYPES.includes(type as WSInputType);
};

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSInputRef = HTMLDivElement;
