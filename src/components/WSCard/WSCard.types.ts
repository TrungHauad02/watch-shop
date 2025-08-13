import { ReactNode } from 'react';
import { CardProps as MuiCardProps } from '@mui/material/Card';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSCARD TYPES - SIMPLIFIED
// ==============================================

export type WSCardVariant = 'elevation' | 'outlined';

export type WSCardSize = 'small' | 'medium' | 'large';

// ==============================================
// ACTION CONFIGURATION
// ==============================================

export interface WSCardAction {
  label: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  variant?: 'contained' | 'outlined' | 'text';
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
}

// ==============================================
// MAIN WSCARD PROPS INTERFACE
// ==============================================

export interface WSCardProps extends Omit<MuiCardProps, 'variant'> {
  // Core styling props
  variant?: WSCardVariant;
  size?: WSCardSize;

  // Content
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageHeight?: string | number;

  // Footer configuration
  actions?: WSCardAction[];

  // Enhanced features
  clickable?: boolean;
  loading?: boolean;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;

  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  // Accessibility
  ariaLabel?: string;
}

// ==============================================
// CONSTANTS
// ==============================================

export const WS_CARD_VARIANTS = ['elevation', 'outlined'] as const;

export const WS_CARD_SIZES = ['small', 'medium', 'large'] as const;

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_CARD_DEFAULTS = {
  variant: 'elevation' as WSCardVariant,
  size: 'medium' as WSCardSize,
  loading: false,
  clickable: false,
  imageHeight: '200px',
} as const;

// ==============================================
// TYPE GUARDS
// ==============================================

export const isValidWSCardVariant = (
  variant: unknown
): variant is WSCardVariant => {
  return WS_CARD_VARIANTS.includes(variant as WSCardVariant);
};

export const isValidWSCardSize = (size: unknown): size is WSCardSize => {
  return WS_CARD_SIZES.includes(size as WSCardSize);
};

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSCardRef = HTMLDivElement;
