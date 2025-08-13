import { ReactNode } from 'react';
import { ModalProps as MuiModalProps } from '@mui/material/Modal';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSMODAL TYPES - SIMPLIFIED
// ==============================================

export type WSModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

export type WSModalVariant = 'default' | 'confirmation' | 'form';

// ==============================================
// ACTION CONFIGURATION
// ==============================================

export interface WSModalAction {
  label: string;
  onClick: () => void | Promise<void>;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  variant?: 'contained' | 'outlined' | 'text';
  loading?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  autoClose?: boolean; // Close modal after action
}

// ==============================================
// MAIN WSMODAL PROPS INTERFACE
// ==============================================

export interface WSModalProps
  extends Omit<MuiModalProps, 'children' | 'content'> {
  // Core styling props
  size?: WSModalSize;
  variant?: WSModalVariant;

  // Content
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  content?: ReactNode;

  // Actions
  actions?: WSModalAction[];
  showCloseButton?: boolean;

  // Enhanced features
  loading?: boolean;
  closable?: boolean;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;
  contentSx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  footerSx?: SxProps<Theme>;

  // Event handlers
  onClose?: () => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

// ==============================================
// CONSTANTS
// ==============================================

export const WS_MODAL_SIZES = [
  'small',
  'medium',
  'large',
  'fullscreen',
] as const;
export const WS_MODAL_VARIANTS = ['default', 'confirmation', 'form'] as const;

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_MODAL_DEFAULTS = {
  size: 'medium' as WSModalSize,
  variant: 'default' as WSModalVariant,
  open: false,
  loading: false,
  closable: true,
  showCloseButton: true,
} as const;

// ==============================================
// TYPE GUARDS
// ==============================================

export const isValidWSModalSize = (size: unknown): size is WSModalSize => {
  return WS_MODAL_SIZES.includes(size as WSModalSize);
};

export const isValidWSModalVariant = (
  variant: unknown
): variant is WSModalVariant => {
  return WS_MODAL_VARIANTS.includes(variant as WSModalVariant);
};

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSModalRef = HTMLDivElement;
