// ==================== BRAND COLORS (Primary Theme) ====================

/**
 * Màu chính của thương hiệu WatchStore
 * Theme: Luxury Watch Store với tông màu vàng và đen sang trọng
 */
export const BRAND_COLORS = {
  // Primary - Rich Black (Đen sang trọng)
  primary: '#101820',
  primaryLight: '#2c2c2c',
  primaryDark: '#000000',

  // Secondary - Vivid Yellow (Vàng nổi bật)
  secondary: '#FEE715',
  secondaryLight: '#fff44d',
  secondaryDark: '#e6d200',

  // Accent - Luxury Gold (Vàng luxury)
  accent: '#f59e0b',
  accentLight: '#fbbf24',
  accentDark: '#d97706',

  // White variations
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  cream: '#F5F5F0',
} as const;

// ==================== GRAY SCALE COLORS ====================

export const GRAY_COLORS = {
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

// ==================== SPECIALIZED COLORS ====================

export const LUXURY_COLORS = {
  // Gold variations for premium features
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
  black900: '#101820', // Main brand black
} as const;

// ==================== PRODUCT SPECIFIC COLORS ====================

export const PRODUCT_COLORS = {
  // Price colors
  priceRegular: '#1F2937',
  priceDiscount: '#DC2626',
  priceSale: '#059669',

  // Stock status
  stockAvailable: '#059669',
  stockLow: '#F59E0B',
  stockOut: '#DC2626',

  // Rating colors
  ratingFilled: '#FEE715',
  ratingEmpty: '#E5E7EB',

  // Badge colors
  badgeNew: '#10B981',
  badgeSale: '#F59E0B',
  badgeBestSeller: '#8B5CF6',
  badgeLimited: '#EF4444',
} as const;

// ==================== UI COMPONENT COLORS ====================

export const UI_COLORS = {
  // Background variations
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
} as const;

// ==================== ALPHA/OPACITY VARIATIONS ====================

export const ALPHA_COLORS = {
  // Brand colors with alpha
  primaryAlpha10: 'rgba(16, 24, 32, 0.1)',
  primaryAlpha20: 'rgba(16, 24, 32, 0.2)',
  primaryAlpha50: 'rgba(16, 24, 32, 0.5)',
  primaryAlpha75: 'rgba(16, 24, 32, 0.75)',

  secondaryAlpha10: 'rgba(254, 231, 21, 0.1)',
  secondaryAlpha20: 'rgba(254, 231, 21, 0.2)',
  secondaryAlpha50: 'rgba(254, 231, 21, 0.5)',
  secondaryAlpha75: 'rgba(254, 231, 21, 0.75)',

  // White with alpha for overlays
  whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
  whiteAlpha50: 'rgba(255, 255, 255, 0.5)',
  whiteAlpha75: 'rgba(255, 255, 255, 0.75)',
  whiteAlpha90: 'rgba(255, 255, 255, 0.9)',
} as const;

// ==================== GRADIENT COLORS ====================

export const GRADIENT_COLORS = {
  // Brand gradients
  primaryGradient: 'linear-gradient(135deg, #101820 0%, #2c2c2c 100%)',
  secondaryGradient: 'linear-gradient(135deg, #FEE715 0%, #f59e0b 100%)',
  luxuryGradient:
    'linear-gradient(135deg, #f59e0b 0%, #FEE715 50%, #d97706 100%)',

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

// ==================== EXPORT ALL COLORS ====================

export const COLORS = {
  ...BRAND_COLORS,
  ...GRAY_COLORS,
  ...SEMANTIC_COLORS,
  ...LUXURY_COLORS,
  ...PRODUCT_COLORS,
  ...UI_COLORS,
  ...ALPHA_COLORS,
  ...GRADIENT_COLORS,
} as const;

// ==================== TYPE DEFINITIONS ====================

export type BrandColorKeys = keyof typeof BRAND_COLORS;
export type GrayColorKeys = keyof typeof GRAY_COLORS;
export type SemanticColorKeys = keyof typeof SEMANTIC_COLORS;
export type LuxuryColorKeys = keyof typeof LUXURY_COLORS;
export type ProductColorKeys = keyof typeof PRODUCT_COLORS;
export type UIColorKeys = keyof typeof UI_COLORS;
export type AlphaColorKeys = keyof typeof ALPHA_COLORS;
export type GradientColorKeys = keyof typeof GRADIENT_COLORS;

export type ColorKeys = keyof typeof COLORS;

// ==================== COLOR PALETTE FOR MUI THEME ====================

export const MUI_COLOR_PALETTE = {
  primary: {
    main: BRAND_COLORS.primary,
    light: BRAND_COLORS.primaryLight,
    dark: BRAND_COLORS.primaryDark,
    contrastText: BRAND_COLORS.white,
  },
  secondary: {
    main: BRAND_COLORS.secondary,
    light: BRAND_COLORS.secondaryLight,
    dark: BRAND_COLORS.secondaryDark,
    contrastText: BRAND_COLORS.primary,
  },
  success: {
    main: SEMANTIC_COLORS.success500,
    light: SEMANTIC_COLORS.success300,
    dark: SEMANTIC_COLORS.success700,
    contrastText: BRAND_COLORS.white,
  },
  warning: {
    main: SEMANTIC_COLORS.warning500,
    light: SEMANTIC_COLORS.warning300,
    dark: SEMANTIC_COLORS.warning700,
    contrastText: BRAND_COLORS.white,
  },
  error: {
    main: SEMANTIC_COLORS.error500,
    light: SEMANTIC_COLORS.error300,
    dark: SEMANTIC_COLORS.error700,
    contrastText: BRAND_COLORS.white,
  },
  info: {
    main: SEMANTIC_COLORS.info500,
    light: SEMANTIC_COLORS.info300,
    dark: SEMANTIC_COLORS.info700,
    contrastText: BRAND_COLORS.white,
  },
  grey: {
    50: GRAY_COLORS.gray50,
    100: GRAY_COLORS.gray100,
    200: GRAY_COLORS.gray200,
    300: GRAY_COLORS.gray300,
    400: GRAY_COLORS.gray400,
    500: GRAY_COLORS.gray500,
    600: GRAY_COLORS.gray600,
    700: GRAY_COLORS.gray700,
    800: GRAY_COLORS.gray800,
    900: GRAY_COLORS.gray900,
  },
} as const;

export default COLORS;
