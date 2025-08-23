import { ReactNode } from 'react';
import { CardProps as MuiCardProps } from '@mui/material/Card';
import { SxProps, Theme } from '@mui/material/styles';
import { WSButtonVariant, WSButtonColor } from '../WSButton/WSButton.types';

// ==============================================
// WSCARD TYPES - ENHANCED
// ==============================================

export type WSCardVariant = 'elevation' | 'outlined';

export type WSCardSize = 'small' | 'medium' | 'large';

export type WSCardActionAlignment = 'left' | 'center' | 'right' | 'between';

// ==============================================
// ACTION CONFIGURATION - ENHANCED
// ==============================================

export interface WSCardAction {
  label: string;
  onClick: () => void | Promise<void>;
  variant?: WSButtonVariant;
  color?: WSButtonColor;
  disabled?: boolean;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
}

// ==============================================
// MEDIA CONFIGURATION
// ==============================================

export interface WSCardMedia {
  src: string;
  alt?: string;
  height?: string | number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

// ==============================================
// MAIN WSCARD PROPS INTERFACE - ENHANCED
// ==============================================

export interface WSCardProps extends Omit<MuiCardProps, 'variant'> {
  // === CORE STYLING PROPS ===
  variant?: WSCardVariant; // ðŸŽ¨ elevation | outlined
  size?: WSCardSize; // ðŸ" small | medium | large

  // === CONTENT ===
  children?: ReactNode; // ðŸ"§ Custom content component
  title?: string; // ðŸ" Card title
  subtitle?: string; // ðŸ" Card subtitle
  description?: ReactNode; // ðŸ" Content text hoáº·c ReactNode

  // === MEDIA ===
  image?: string; // ðŸ–¼ï¸ Image URL
  imageAlt?: string; // â™¿ Image alt text
  imageHeight?: string | number; // ðŸ" Image height
  imageObjectFit?: 'cover' | 'contain' | 'fill'; // ðŸ–¼ï¸ Image fit style

  // === FOOTER CONFIGURATION ===
  actions?: WSCardAction[]; // ðŸŽ¬ Array of action buttons
  actionsAlignment?: WSCardActionAlignment; // ðŸ" Actions alignment

  // === ENHANCED FEATURES ===
  clickable?: boolean; // ðŸ–±ï¸ Card can be clicked
  loading?: boolean; // ðŸ"„ Loading state
  skeleton?: boolean; // ðŸ'» Show skeleton loading

  // === CUSTOM STYLING ===
  sx?: SxProps<Theme>; // ðŸŽ¨ Container styles
  className?: string; // ðŸŽ¨ CSS class
  headerSx?: SxProps<Theme>; // ðŸŽ¨ Header area styles
  contentSx?: SxProps<Theme>; // ðŸŽ¨ Content area styles
  actionsSx?: SxProps<Theme>; // ðŸŽ¨ Actions area styles
  mediaSx?: SxProps<Theme>; // ðŸŽ¨ Media area styles

  // === EVENT HANDLERS ===
  onClick?: (event: React.MouseEvent<HTMLElement>) => void | Promise<void>; // ðŸ–±ï¸ Click handler
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement>) => void; // ðŸ–¼ï¸ Image error handler
  onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void; // ðŸ–¼ï¸ Image load handler

  // === ACCESSIBILITY ===
  ariaLabel?: string; // â™¿ Accessibility label
  ariaDescribedBy?: string; // â™¿ Accessibility description

  // === ADVANCED PROPS ===
  component?: React.ElementType; // ðŸ"— Custom component
  href?: string; // ðŸ"— URL for link cards
  target?: string; // ðŸ"— Link target

  // === ADDITIONAL PROPS ===
  style?: React.CSSProperties; // ðŸŽ¨ Inline styles
}

// ==============================================
// CONSTANTS
// ==============================================

export const WS_CARD_VARIANTS = ['elevation', 'outlined'] as const;

export const WS_CARD_SIZES = ['small', 'medium', 'large'] as const;

export const WS_CARD_ACTION_ALIGNMENTS = [
  'left',
  'center',
  'right',
  'between',
] as const;

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_CARD_DEFAULTS = {
  variant: 'elevation' as WSCardVariant,
  size: 'medium' as WSCardSize,
  loading: false,
  skeleton: false,
  clickable: false,
  imageHeight: '200px',
  imageObjectFit: 'cover' as const,
  actionsAlignment: 'right' as WSCardActionAlignment,
  actions: [] as WSCardAction[],
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

export const isValidWSCardActionAlignment = (
  alignment: unknown
): alignment is WSCardActionAlignment => {
  return WS_CARD_ACTION_ALIGNMENTS.includes(alignment as WSCardActionAlignment);
};

// ==============================================
// CARD CONFIGURATION TYPES
// ==============================================

export interface WSCardConfig {
  variant: WSCardVariant;
  size: WSCardSize;
  clickable: boolean;
  loading: boolean;
  skeleton: boolean;
  actionsAlignment: WSCardActionAlignment;
}

// ==============================================
// CARD STATE TYPES
// ==============================================

export interface WSCardState {
  isLoading: boolean;
  isHovered: boolean;
  isFocused: boolean;
  imageLoadError: boolean;
  actionLoadingStates: Record<number, boolean>;
}

// ==============================================
// CARD THEME TYPES
// ==============================================

export interface WSCardThemeOverrides {
  variants?: Array<{
    props: Partial<WSCardProps>;
    style: SxProps<Theme>;
  }>;
  defaultProps?: Partial<WSCardProps>;
}

// ==============================================
// UTILITY TYPES
// ==============================================

export type WSCardEventHandler = () => void;
export type WSCardAsyncHandler = () => Promise<void>;

// Card with specific patterns
export type WSCardProductCard = WSCardProps & {
  productName: string;
  price: string;
  originalPrice?: string;
  rating?: number;
  discount?: string;
};

export type WSCardArticleCard = WSCardProps & {
  articleTitle: string;
  author: string;
  publishDate: string;
  readTime?: string;
  tags?: string[];
};

export type WSCardUserCard = WSCardProps & {
  userName: string;
  userRole: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: string;
};

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSCardRef = HTMLDivElement;
