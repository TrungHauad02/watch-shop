import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSLOADING TYPES - SIMPLIFIED
// ==============================================

export type WSLoadingVariant =
  | 'spinner'
  | 'dots'
  | 'pulse'
  | 'circular'
  | 'linear';

export type WSLoadingSize = 'small' | 'medium' | 'large';

export type WSLoadingColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

// ==============================================
// MAIN WSLOADING PROPS INTERFACE
// ==============================================

export interface WSLoadingProps {
  // Core styling props
  variant?: WSLoadingVariant;
  size?: WSLoadingSize;
  color?: WSLoadingColor;

  // Content and messaging
  loading?: boolean;
  message?: string;
  children?: ReactNode;

  // Progress indication (only for linear/circular)
  progress?: number; // 0-100 for progress indicators

  // Sizing
  width?: string | number;
  height?: string | number;

  // Visibility and overlay
  fullScreen?: boolean;
  backdrop?: boolean;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;

  // Accessibility
  ariaLabel?: string;
}

// ==============================================
// CONSTANTS
// ==============================================

export const WS_LOADING_VARIANTS = [
  'spinner',
  'dots',
  'pulse',
  'circular',
  'linear',
] as const;

export const WS_LOADING_SIZES = ['small', 'medium', 'large'] as const;

export const WS_LOADING_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
] as const;

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_LOADING_DEFAULTS = {
  variant: 'spinner' as WSLoadingVariant,
  size: 'medium' as WSLoadingSize,
  color: 'primary' as WSLoadingColor,
  loading: true,
  fullScreen: false,
  backdrop: false,
} as const;

// ==============================================
// TYPE GUARDS
// ==============================================

export const isValidWSLoadingVariant = (
  variant: unknown
): variant is WSLoadingVariant => {
  return WS_LOADING_VARIANTS.includes(variant as WSLoadingVariant);
};

export const isValidWSLoadingSize = (size: unknown): size is WSLoadingSize => {
  return WS_LOADING_SIZES.includes(size as WSLoadingSize);
};

export const isValidWSLoadingColor = (
  color: unknown
): color is WSLoadingColor => {
  return WS_LOADING_COLORS.includes(color as WSLoadingColor);
};

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSLoadingRef = HTMLDivElement;
