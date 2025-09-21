// ==================== MAIN COLORS ====================

/**
 * Tất cả các màu chính sử dụng trong WatchStore
 * Bao gồm: Brand colors, Gray scale, và các màu chức năng
 */
export const COLORS = {
  // Brand Colors (Màu thương hiệu)
  primary: '#101820', // Rich Black
  primaryLight: '#2c2c2c',
  primaryDark: '#000000',

  secondary: '#FEE715', // Vivid Yellow
  secondaryLight: '#fff44d',
  secondaryDark: '#e6d200',

  accent: '#f59e0b', // Luxury Gold
  accentLight: '#fbbf24',
  accentDark: '#d97706',

  // White variations
  white: '#FFFFFF',
  black: '#000000',
  offWhite: '#FAFAFA',
  cream: '#F5F5F0',

  // Gray Scale
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  gold50: '#FFFBF0',
  gold100: '#FEF7E0',
  gold200: '#FDECC4',
  gold300: '#FBDB9B',
  gold400: '#F8C572',
  gold500: '#F59E0B', // Main luxury gold
  gold600: '#D97706',
  gold700: '#B45309',
  gold800: '#92400E',
  gold900: '#78350F',

  amber50: '#FFFBEB',
  amber100: '#FEF3C7',
  amber200: '#FDE68A',
  amber300: '#FCD34D',
  amber400: '#FBBF24',
  amber500: '#F59E0B', // Main amber
  amber600: '#D97706',
  amber700: '#B45309',
  amber800: '#92400E',
  amber900: '#78350F',

  // Black variations for premium UI
  black50: '#F8F8F8',
  black100: '#F1F1F1',
  black200: '#E8E8E8',
  black300: '#D1D1D1',
  black400: '#9A9A9A',
  black500: '#6B6B6B',
  black600: '#4A4A4A',
  black700: '#2C2C2C',
  black800: '#1A1A1A',
  black900: '#101820',

  // Background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',
  backgroundDark: '#101820',
  backgroundOverlay: 'rgba(16, 24, 32, 0.75)',

  // Border colors
  borderLight: '#E5E7EB',
  borderMedium: '#D1D5DB',
  borderDark: '#9CA3AF',
  borderFocus: '#FEE715',

  // Text colors
  textPrimary: '#101820',
  textSecondary: '#4B5563',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  textDisabled: '#D1D5DB',

  // Shadow colors
  shadow: 'rgba(16, 24, 32, 0.1)',
  shadowMedium: 'rgba(16, 24, 32, 0.15)',
  shadowStrong: 'rgba(16, 24, 32, 0.25)',

  // Product specific colors
  priceRegular: '#1F2937',
  priceDiscount: '#DC2626',
  priceSale: '#059669',
  stockAvailable: '#059669',
  stockLow: '#F59E0B',
  stockOut: '#DC2626',
  ratingFilled: '#FEE715',
  ratingEmpty: '#E5E7EB',
} as const;

// ==================== SEMANTIC COLORS ====================

export const SEMANTIC_COLORS = {
  // Success - Green variations
  success50: '#F0FDF4',
  success100: '#DCFCE7',
  success200: '#BBF7D0',
  success300: '#86EFAC',
  success400: '#4ADE80',
  success500: '#22C55E', // Main success
  success600: '#16A34A',
  success700: '#15803D',
  success800: '#166534',
  success900: '#14532D',

  // Warning - Amber variations
  warning50: '#FFFBEB',
  warning100: '#FEF3C7',
  warning200: '#FDE68A',
  warning300: '#FCD34D',
  warning400: '#FBBF24',
  warning500: '#F59E0B', // Main warning
  warning600: '#D97706',
  warning700: '#B45309',
  warning800: '#92400E',
  warning900: '#78350F',

  // Error - Red variations
  error50: '#FEF2F2',
  error100: '#FEE2E2',
  error200: '#FECACA',
  error300: '#FCA5A5',
  error400: '#F87171',
  error500: '#EF4444', // Main error
  error600: '#DC2626',
  error700: '#B91C1C',
  error800: '#991B1B',
  error900: '#7F1D1D',

  // Info - Blue variations
  info50: '#EFF6FF',
  info100: '#DBEAFE',
  info200: '#BFDBFE',
  info300: '#93C5FD',
  info400: '#60A5FA',
  info500: '#3B82F6', // Main info
  info600: '#2563EB',
  info700: '#1D4ED8',
  info800: '#1E40AF',
  info900: '#1E3A8A',
} as const;

// ==================== GRADIENT COLORS ====================

export const GRADIENT_COLORS = {
  // Brand gradients
  primaryGradient: 'linear-gradient(135deg, #101820 0%, #2c2c2c 100%)',
  secondaryGradient: 'linear-gradient(135deg, #FEE715 0%, #f59e0b 100%)',
  luxuryGradient:
    'linear-gradient(135deg, #f59e0b 0%, #FEE715 50%, #d97706 100%)',
  amberGradient: 'linear-gradient(135deg, #D97706 0%, #FCD34D 100%)',

  // Overlay gradients
  overlayGradient:
    'linear-gradient(180deg, transparent 0%, rgba(16, 24, 32, 0.7) 100%)',
  heroGradient:
    'linear-gradient(135deg, rgba(16, 24, 32, 0.8) 0%, rgba(245, 158, 11, 0.1) 100%)',

  // Semantic gradients
  successGradient: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
  warningGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  errorGradient: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
} as const;

// ==================== ALPHA/OPACITY VARIATIONS ====================

export const ALPHA_COLORS = {
  // Primary colors with alpha
  primaryAlpha05: 'rgba(16, 24, 32, 0.05)',
  primaryAlpha10: 'rgba(16, 24, 32, 0.1)',
  primaryAlpha15: 'rgba(16, 24, 32, 0.15)',
  primaryAlpha20: 'rgba(16, 24, 32, 0.2)',
  primaryAlpha30: 'rgba(16, 24, 32, 0.3)',
  primaryAlpha40: 'rgba(16, 24, 32, 0.4)',
  primaryAlpha50: 'rgba(16, 24, 32, 0.5)',
  primaryAlpha75: 'rgba(16, 24, 32, 0.75)',

  // Secondary colors with alpha
  secondaryAlpha10: 'rgba(254, 231, 21, 0.1)',
  secondaryAlpha15: 'rgba(254, 231, 21, 0.15)',
  secondaryAlpha20: 'rgba(254, 231, 21, 0.2)',
  secondaryAlpha25: 'rgba(254, 231, 21, 0.25)',
  secondaryAlpha30: 'rgba(254, 231, 21, 0.3)',
  secondaryAlpha40: 'rgba(254, 231, 21, 0.4)',
  secondaryAlpha50: 'rgba(254, 231, 21, 0.5)',
  secondaryAlpha75: 'rgba(254, 231, 21, 0.75)',

  // White with alpha for overlays
  whiteAlpha05: 'rgba(255, 255, 255, 0.05)',
  whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
  whiteAlpha15: 'rgba(255, 255, 255, 0.15)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
  whiteAlpha25: 'rgba(255, 255, 255, 0.25)',
  whiteAlpha30: 'rgba(255, 255, 255, 0.3)',
  whiteAlpha40: 'rgba(255, 255, 255, 0.4)',
  whiteAlpha50: 'rgba(255, 255, 255, 0.5)',
  whiteAlpha60: 'rgba(255, 255, 255, 0.6)',
  whiteAlpha75: 'rgba(255, 255, 255, 0.75)',
  whiteAlpha90: 'rgba(255, 255, 255, 0.9)',
} as const;

// ==================== COLOR UTILITIES ====================

/**
 * Utility functions để làm việc với colors
 */
export const colorUtils = {
  // Convert hex to rgba
  hexToRgba: (hex: string, alpha: number = 1): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  },

  // Get color with alpha
  withAlpha: (color: string, alpha: number): string => {
    if (color.startsWith('#')) {
      return colorUtils.hexToRgba(color, alpha);
    }
    return color.replace(/rgba?\([^)]+\)/, '') + `, ${alpha})`;
  },

  // Check if color is dark
  isDark: (hex: string): boolean => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  },
};

// ==================== TYPE DEFINITIONS ====================

export type ColorKeys = keyof typeof COLORS;
export type SemanticColorKeys = keyof typeof SEMANTIC_COLORS;
export type GradientColorKeys = keyof typeof GRADIENT_COLORS;
export type AlphaColorKeys = keyof typeof ALPHA_COLORS;

// ==================== COLOR PALETTE FOR MUI THEME ====================

export const MUI_COLOR_PALETTE = {
  primary: {
    main: COLORS.primary,
    light: COLORS.primaryLight,
    dark: COLORS.primaryDark,
    contrastText: COLORS.white,
  },
  secondary: {
    main: COLORS.secondary,
    light: COLORS.secondaryLight,
    dark: COLORS.secondaryDark,
    contrastText: COLORS.primary,
  },
  success: {
    main: SEMANTIC_COLORS.success500,
    light: SEMANTIC_COLORS.success300,
    dark: SEMANTIC_COLORS.success700,
    contrastText: COLORS.white,
  },
  warning: {
    main: SEMANTIC_COLORS.warning500,
    light: SEMANTIC_COLORS.warning300,
    dark: SEMANTIC_COLORS.warning700,
    contrastText: COLORS.white,
  },
  error: {
    main: SEMANTIC_COLORS.error500,
    light: SEMANTIC_COLORS.error300,
    dark: SEMANTIC_COLORS.error700,
    contrastText: COLORS.white,
  },
  info: {
    main: SEMANTIC_COLORS.info500,
    light: SEMANTIC_COLORS.info300,
    dark: SEMANTIC_COLORS.info700,
    contrastText: COLORS.white,
  },
  grey: {
    50: COLORS.gray50,
    100: COLORS.gray100,
    200: COLORS.gray200,
    300: COLORS.gray300,
    400: COLORS.gray400,
    500: COLORS.gray500,
    600: COLORS.gray600,
    700: COLORS.gray700,
    800: COLORS.gray800,
    900: COLORS.gray900,
  },
} as const;

export default COLORS;
