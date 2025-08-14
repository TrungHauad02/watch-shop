import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { WSButtonVariant, WSButtonColor } from '../WSButton/WSButton.types';

// ==============================================
// WSMODAL TYPES
// ==============================================

export type WSModalSize = 'small' | 'medium' | 'large' | 'fullscreen';

export type WSModalVariant = 'default' | 'confirmation' | 'form';

// ==============================================
// MODAL ACTION INTERFACE
// ==============================================

export interface WSModalAction {
  label: string;
  onClick: () => void | Promise<void>;
  variant?: WSButtonVariant;
  color?: WSButtonColor;
  disabled?: boolean;
  loading?: boolean;
  autoClose?: boolean;
  startIcon?: ReactNode;
  sx?: SxProps<Theme>;
}

// ==============================================
// MAIN WSMODAL PROPS INTERFACE
// ==============================================

export interface WSModalProps {
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

  // Modal state
  open?: boolean;

  // Event handlers
  onClose?: () => void;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;
  contentSx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  footerSx?: SxProps<Theme>;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;

  // Additional props
  style?: React.CSSProperties;
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
  actions: [] as WSModalAction[],
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
// MODAL CONFIGURATION TYPES
// ==============================================

export interface WSModalConfig {
  size: WSModalSize;
  variant: WSModalVariant;
  closable: boolean;
  showCloseButton: boolean;
  backdrop: boolean;
  escapeKeyDown: boolean;
}

// ==============================================
// MODAL STATE TYPES
// ==============================================

export interface WSModalState {
  isOpen: boolean;
  isLoading: boolean;
  actionLoadingStates: Record<number, boolean>;
}

// ==============================================
// MODAL THEME TYPES
// ==============================================

export interface WSModalThemeOverrides {
  variants?: Array<{
    props: Partial<WSModalProps>;
    style: SxProps<Theme>;
  }>;
  defaultProps?: Partial<WSModalProps>;
}

// ==============================================
// UTILITY TYPES
// ==============================================

export type WSModalEventHandler = () => void;
export type WSModalAsyncHandler = () => Promise<void>;

// Modal with confirmation pattern
export type WSModalConfirmation = WSModalProps & {
  variant: 'confirmation';
  onConfirm: WSModalAsyncHandler;
  onCancel?: WSModalEventHandler;
  confirmText?: string;
  cancelText?: string;
};

// Modal with form pattern
export type WSModalForm = WSModalProps & {
  variant: 'form';
  onSubmit: WSModalAsyncHandler;
  onCancel?: WSModalEventHandler;
  submitText?: string;
  cancelText?: string;
  isValid?: boolean;
};

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSModalRef = HTMLDivElement;
