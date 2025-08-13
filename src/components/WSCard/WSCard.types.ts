import { ReactNode } from 'react';
import { CardProps as MuiCardProps } from '@mui/material/Card';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSCARD VARIANT TYPES
// ==============================================

export type WSCardVariant = 'elevation' | 'outlined' | 'filled' | 'gradient';

export type WSCardSize = 'small' | 'medium' | 'large';

export type WSCardShape = 'rounded' | 'square' | 'circular';

// ==============================================
// HOVER EFFECT TYPES
// ==============================================

export type WSCardHoverEffect = 'lift' | 'glow' | 'scale' | 'border' | 'none';

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
  endIcon?: ReactNode;
}

// ==============================================
// MAIN WSCARD PROPS INTERFACE
// ==============================================

export interface WSCardProps
  extends Omit<MuiCardProps, 'variant' | 'onSelect'> {
  // Core styling props
  variant?: WSCardVariant;
  size?: WSCardSize;
  shape?: WSCardShape;

  // Content
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageHeight?: string | number;

  // Header configuration
  headerContent?: ReactNode;
  headerActions?: ReactNode;
  showDivider?: boolean;

  // Footer configuration
  footerContent?: ReactNode;
  actions?: WSCardAction[];
  actionsAlignment?: 'left' | 'center' | 'right' | 'space-between';

  // Enhanced features
  clickable?: boolean;
  selectable?: boolean;
  selected?: boolean;
  disabled?: boolean;

  // Animation and interaction
  animate?: boolean;
  hoverEffect?: WSCardHoverEffect;
  loading?: boolean;
  loadingHeight?: string | number;

  // Custom styling
  sx?: SxProps<Theme>;
  className?: string;
  contentSx?: SxProps<Theme>;
  headerSx?: SxProps<Theme>;
  footerSx?: SxProps<Theme>;

  // Background and overlay
  backgroundColor?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;

  // Spacing
  padding?: 'none' | 'small' | 'medium' | 'large';
  contentSpacing?: 'compact' | 'normal' | 'comfortable';

  // Event handlers
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  onSelect?: (selected: boolean) => void;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: string;
  tabIndex?: number;
}

// ==============================================
// STYLE CONFIGURATION TYPES
// ==============================================

export interface WSCardStyleConfig {
  backgroundColor: string;
  border: string;
  boxShadow: string;
  borderRadius: string;
  hoverBoxShadow: string;
  hoverTransform: string;
}

export interface WSCardSizeConfig {
  padding: string;
  headerPadding: string;
  footerPadding: string;
  titleFontSize: string;
  subtitleFontSize: string;
  descriptionFontSize: string;
  borderRadius: string;
  minHeight: string;
}

// ==============================================
// COMPONENT STATE TYPES
// ==============================================

export interface WSCardState {
  isHovered: boolean;
  isFocused: boolean;
  isSelected: boolean;
  isLoading: boolean;
}

// ==============================================
// MEDIA CONFIGURATION
// ==============================================

export interface WSCardMediaConfig {
  component?: 'img' | 'video' | 'iframe';
  height?: string | number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
  position?: 'top' | 'center' | 'bottom';
}

// ==============================================
// LOADING CONFIGURATION
// ==============================================

export interface WSCardLoadingConfig {
  showSkeleton?: boolean;
  skeletonLines?: number;
  skeletonHeight?: string | number;
  loadingText?: string;
}

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSCardRef = HTMLDivElement;

export type WSCardComponent = React.ForwardRefExoticComponent<
  WSCardProps & React.RefAttributes<WSCardRef>
>;

// ==============================================
// UTILITY TYPES
// ==============================================

export type WSCardEventHandler = (event: React.MouseEvent<HTMLElement>) => void;

export type WSCardAsyncHandler = (
  event: React.MouseEvent<HTMLElement>
) => Promise<void>;

// ==============================================
// CONSTANTS FOR TYPE CHECKING
// ==============================================

export const WS_CARD_VARIANTS = [
  'elevation',
  'outlined',
  'filled',
  'gradient',
] as const;

export const WS_CARD_SIZES = ['small', 'medium', 'large'] as const;

export const WS_CARD_SHAPES = ['rounded', 'square', 'circular'] as const;

export const WS_CARD_HOVER_EFFECTS = [
  'lift',
  'glow',
  'scale',
  'border',
  'none',
] as const;

export const WS_CARD_PADDING_OPTIONS = [
  'none',
  'small',
  'medium',
  'large',
] as const;

export const WS_CARD_CONTENT_SPACING = [
  'compact',
  'normal',
  'comfortable',
] as const;

// Type guards
export const isValidWSCardVariant = (
  variant: unknown
): variant is WSCardVariant => {
  return WS_CARD_VARIANTS.includes(variant as WSCardVariant);
};

export const isValidWSCardSize = (size: unknown): size is WSCardSize => {
  return WS_CARD_SIZES.includes(size as WSCardSize);
};

export const isValidWSCardShape = (shape: unknown): shape is WSCardShape => {
  return WS_CARD_SHAPES.includes(shape as WSCardShape);
};

export const isValidWSCardHoverEffect = (
  effect: unknown
): effect is WSCardHoverEffect => {
  return WS_CARD_HOVER_EFFECTS.includes(effect as WSCardHoverEffect);
};

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_CARD_DEFAULTS: Required<
  Pick<
    WSCardProps,
    | 'variant'
    | 'size'
    | 'shape'
    | 'animate'
    | 'hoverEffect'
    | 'padding'
    | 'contentSpacing'
    | 'showDivider'
    | 'actionsAlignment'
    | 'overlayOpacity'
  >
> = {
  variant: 'elevation',
  size: 'medium',
  shape: 'rounded',
  animate: true,
  hoverEffect: 'lift',
  padding: 'medium',
  contentSpacing: 'normal',
  showDivider: true,
  actionsAlignment: 'right',
  overlayOpacity: 0.4,
} as const;
