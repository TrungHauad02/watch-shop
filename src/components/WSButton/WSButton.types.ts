import { ReactNode } from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSBUTTON TYPES - SIMPLIFIED
// ==============================================

export type WSButtonVariant = 'contained' | 'outlined' | 'text';

export type WSButtonColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type WSButtonSize = 'small' | 'medium' | 'large';

// ==============================================
// MAIN WSBUTTON PROPS INTERFACE
// ==============================================

export interface WSButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  // Core styling props
  variant?: WSButtonVariant;
  color?: WSButtonColor;
  size?: WSButtonSize;

  // Content
  children?: ReactNode;

  // Icons
  startIcon?: ReactNode;
  endIcon?: ReactNode;

  // Loading state
  loading?: boolean;
  loadingText?: string;

  // Enhanced features
  fullWidth?: boolean;
  disabled?: boolean;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;

  // Accessibility
  ariaLabel?: string;

  // Event handlers
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;

  // Form integration
  type?: 'button' | 'submit' | 'reset';

  // Advanced props
  component?: React.ElementType;
  href?: string;
  target?: string;
}

// ==============================================
// CONSTANTS
// ==============================================

export const WS_BUTTON_VARIANTS = ['contained', 'outlined', 'text'] as const;

export const WS_BUTTON_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
] as const;

export const WS_BUTTON_SIZES = ['small', 'medium', 'large'] as const;

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_BUTTON_DEFAULTS = {
  variant: 'contained' as WSButtonVariant,
  color: 'primary' as WSButtonColor,
  size: 'medium' as WSButtonSize,
  loading: false,
  disabled: false,
  fullWidth: false,
  type: 'button' as const,
} as const;

// ==============================================
// TYPE GUARDS
// ==============================================

export const isValidWSButtonVariant = (
  variant: unknown
): variant is WSButtonVariant => {
  return WS_BUTTON_VARIANTS.includes(variant as WSButtonVariant);
};

export const isValidWSButtonColor = (
  color: unknown
): color is WSButtonColor => {
  return WS_BUTTON_COLORS.includes(color as WSButtonColor);
};

export const isValidWSButtonSize = (size: unknown): size is WSButtonSize => {
  return WS_BUTTON_SIZES.includes(size as WSButtonSize);
};

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSButtonRef = HTMLButtonElement;
