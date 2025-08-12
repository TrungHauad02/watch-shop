/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSBUTTON VARIANT TYPES
// ==============================================

export type WSButtonVariant = 'contained' | 'outlined' | 'text' | 'gradient';

export type WSButtonColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type WSButtonSize = 'small' | 'medium' | 'large';

export type WSButtonShape = 'rounded' | 'square' | 'circular';

// ==============================================
// LOADING STATE CONFIGURATION
// ==============================================

export interface WSButtonLoadingConfig {
  loading?: boolean;
  loadingText?: string;
  loadingPosition?: 'start' | 'end' | 'center';
  preserveWidth?: boolean;
}

// ==============================================
// ICON CONFIGURATION
// ==============================================

export interface WSButtonIconConfig {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  iconSize?: 'small' | 'medium' | 'large';
}

// ==============================================
// MAIN WSBUTTON PROPS INTERFACE
// ==============================================

export interface WSButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'color' | 'size' | 'loading'>,
    WSButtonLoadingConfig,
    WSButtonIconConfig {
  // Core styling props
  variant?: WSButtonVariant;
  color?: WSButtonColor;
  size?: WSButtonSize;
  shape?: WSButtonShape;

  // Content
  children?: ReactNode;

  // Enhanced features
  fullWidth?: boolean;
  disabled?: boolean;
  disableElevation?: boolean;
  disableRipple?: boolean;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;

  // Animation and interaction
  animate?: boolean;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'none';

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;

  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLButtonElement>) => void;

  // Form integration
  type?: 'button' | 'submit' | 'reset';
  form?: string;

  // Advanced props
  component?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

// ==============================================
// STYLE CONFIGURATION TYPES
// ==============================================

export interface WSButtonStyleConfig {
  backgroundColor: string;
  color: string;
  border?: string;
  boxShadow?: string;
  hoverBackgroundColor: string;
  hoverColor: string;
  hoverBoxShadow?: string;
  activeBackgroundColor: string;
  disabledBackgroundColor: string;
  disabledColor: string;
}

export interface WSButtonSizeConfig {
  height: string;
  padding: string;
  fontSize: string;
  fontWeight: number;
  borderRadius: string;
  minWidth: string;
}

// ==============================================
// THEME INTEGRATION TYPES
// ==============================================

export interface WSButtonThemeOverrides {
  variants?: Array<{
    props: Partial<WSButtonProps>;
    style: SxProps<Theme>;
  }>;
  defaultProps?: Partial<WSButtonProps>;
}

// ==============================================
// COMPONENT STATE TYPES
// ==============================================

export interface WSButtonState {
  isHovered: boolean;
  isFocused: boolean;
  isPressed: boolean;
  isLoading: boolean;
}

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSButtonRef = HTMLButtonElement;

export type WSButtonComponent = React.ForwardRefExoticComponent<
  WSButtonProps & React.RefAttributes<WSButtonRef>
>;

// ==============================================
// UTILITY TYPES
// ==============================================

export type WSButtonEventHandler = (
  event: React.MouseEvent<HTMLButtonElement>
) => void;

export type WSButtonAsyncHandler = (
  event: React.MouseEvent<HTMLButtonElement>
) => Promise<void>;

// Helper type for conditional props
export type ConditionalProps<T> = T extends true ? Required<T> : Partial<T>;

// Helper type for button with href (acts as link)
export type WSButtonAsLink = WSButtonProps & {
  href: string;
  component?: 'a';
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
};

// Helper type for form submit button
export type WSButtonAsSubmit = WSButtonProps & {
  type: 'submit';
  form?: string;
  onClick?: WSButtonAsyncHandler;
};

// ==============================================
// CONSTANTS FOR TYPE CHECKING
// ==============================================

export const WS_BUTTON_VARIANTS = [
  'contained',
  'outlined',
  'text',
  'gradient',
] as const;
export const WS_BUTTON_COLORS = [
  'primary',
  'secondary',
  'accent',
  'success',
  'warning',
  'error',
  'info',
] as const;
export const WS_BUTTON_SIZES = ['small', 'medium', 'large'] as const;
export const WS_BUTTON_SHAPES = ['rounded', 'square', 'circular'] as const;
export const WS_BUTTON_HOVER_EFFECTS = [
  'lift',
  'glow',
  'scale',
  'none',
] as const;

// Type guards
export const isValidWSButtonVariant = (
  variant: any
): variant is WSButtonVariant => {
  return WS_BUTTON_VARIANTS.includes(variant);
};

export const isValidWSButtonColor = (color: any): color is WSButtonColor => {
  return WS_BUTTON_COLORS.includes(color);
};

export const isValidWSButtonSize = (size: any): size is WSButtonSize => {
  return WS_BUTTON_SIZES.includes(size);
};

export const isValidWSButtonShape = (shape: any): shape is WSButtonShape => {
  return WS_BUTTON_SHAPES.includes(shape);
};

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_BUTTON_DEFAULTS: Required<
  Pick<
    WSButtonProps,
    | 'variant'
    | 'color'
    | 'size'
    | 'shape'
    | 'animate'
    | 'hoverEffect'
    | 'loadingPosition'
    | 'preserveWidth'
  >
> = {
  variant: 'contained',
  color: 'primary',
  size: 'medium',
  shape: 'rounded',
  animate: true,
  hoverEffect: 'lift',
  loadingPosition: 'center',
  preserveWidth: true,
} as const;
