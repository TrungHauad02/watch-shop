// CUSTOMIZE: Bạn có thể chỉnh sửa tất cả cấu hình layout ở file này

import { BRAND_COLORS } from '@/styles/colors';

// ==================== LAYOUT VARIANTS CONFIGURATION ====================

export interface LayoutConfig {
  showHeader: boolean;
  showFooter: boolean;
  useContainer: boolean;
  maxWidth: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  backgroundColor?: string;
  showBreadcrumb?: boolean;
  contentPadding?: {
    top?:
      | number
      | string
      | {
          xs?: number | string;
          sm?: number | string;
          md?: number | string;
          lg?: number | string;
          xl?: number | string;
        };
    bottom?:
      | number
      | string
      | {
          xs?: number | string;
          sm?: number | string;
          md?: number | string;
          lg?: number | string;
          xl?: number | string;
        };
    left?:
      | number
      | string
      | {
          xs?: number | string;
          sm?: number | string;
          md?: number | string;
          lg?: number | string;
          xl?: number | string;
        };
    right?:
      | number
      | string
      | {
          xs?: number | string;
          sm?: number | string;
          md?: number | string;
          lg?: number | string;
          xl?: number | string;
        };
  };
}

export const LAYOUT_VARIANTS: Record<string, LayoutConfig> = {
  default: {
    showHeader: true,
    showFooter: true,
    useContainer: true,
    maxWidth: 'xl',
    showBreadcrumb: false,
    contentPadding: {
      top: { xs: 2, sm: 3, md: 4 },
      bottom: { xs: 2, sm: 3, md: 4 },
      left: { xs: 1, sm: 2 },
      right: { xs: 1, sm: 2 },
    },
    backgroundColor: '',
  },
  admin: {
    showHeader: true,
    showFooter: false,
    useContainer: false,
    maxWidth: false,
    backgroundColor: '#f8f9fa',
    showBreadcrumb: true,
    contentPadding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  auth: {
    showHeader: false,
    showFooter: false,
    useContainer: true,
    maxWidth: 'sm',
    backgroundColor: `linear-gradient(135deg, ${BRAND_COLORS.offWhite} 0%, ${BRAND_COLORS.cream} 100%)`,
    showBreadcrumb: false,
    contentPadding: {
      top: { xs: 4, md: 8 },
      bottom: { xs: 4, md: 8 },
      left: { xs: 2, md: 3 },
      right: { xs: 2, md: 3 },
    },
  },
  fullscreen: {
    showHeader: false,
    showFooter: false,
    useContainer: false,
    maxWidth: false,
    backgroundColor: BRAND_COLORS.primary,
    showBreadcrumb: false,
    contentPadding: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
  minimal: {
    showHeader: true,
    showFooter: false,
    useContainer: true,
    maxWidth: 'lg',
    showBreadcrumb: false,
    contentPadding: {
      top: { xs: 1, md: 2 },
      bottom: { xs: 1, md: 2 },
      left: { xs: 1, md: 2 },
      right: { xs: 1, md: 2 },
    },
    backgroundColor: '',
  },
};

// ==================== BREADCRUMB CONFIGURATION ====================

export const breadcrumbLabels: Record<string, string> = {
  products: 'Sản phẩm',
  categories: 'Danh mục',
  brands: 'Thương hiệu',
  admin: 'Quản trị',
  profile: 'Hồ sơ',
  wishlist: 'Yêu thích',
  search: 'Tìm kiếm',
  about: 'Giới thiệu',
  contact: 'Liên hệ',
  policy: 'Chính sách',
  help: 'Trợ giúp',
  cart: 'Giỏ hàng',
  checkout: 'Thanh toán',
  orders: 'Đơn hàng',
  settings: 'Cài đặt',
};

// ==================== LAYOUT ANIMATIONS ====================

export const layoutAnimations = {
  pageTransition: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  contentFade: {
    duration: 250,
    easing: 'ease-in-out',
  },
  loadingOverlay: {
    duration: 200,
    easing: 'ease-out',
  },
} as const;

// ==================== LAYOUT CONFIGURATION ====================

export const layoutConfig = {
  // Header configuration
  header: {
    height: { xs: 56, sm: 64 },
    stickyPosition: true,
    showShadow: true,
  },
  // Footer configuration
  footer: {
    showShadow: true,
    marginTop: 'auto',
  },
  // Content configuration
  content: {
    minHeight: 'auto',
    scrollBehavior: 'smooth' as const,
  },
  // Loading configuration
  loading: {
    showOverlay: true,
    backdropBlur: 4,
    spinnerSize: 40,
  },
  // Background configuration
  background: {
    showDecorative: true,
    opacity: 0.02,
  },
} as const;

// ==================== PAGE METADATA DEFAULTS ====================

export const defaultPageMetadata = {
  title: 'WatchStore - Đồng hồ chính hãng cao cấp',
  description:
    'Chuyên cung cấp đồng hồ chính hãng, cao cấp với chất lượng tuyệt vời và dịch vụ khách hàng tận tâm.',
  keywords: [
    'đồng hồ',
    'watch',
    'luxury',
    'chính hãng',
    'cao cấp',
    'swiss',
    'automatic',
  ],
  ogImage: '/og-image.jpg',
} as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Get layout configuration by variant
 */
export const getLayoutConfig = (
  variant: keyof typeof LAYOUT_VARIANTS = 'default'
): LayoutConfig => {
  return LAYOUT_VARIANTS[variant];
};

/**
 * Merge layout configurations
 */
export const mergeLayoutConfig = (
  baseConfig: LayoutConfig,
  overrides: Partial<LayoutConfig>
): LayoutConfig => {
  return {
    ...baseConfig,
    ...overrides,
    contentPadding: {
      ...baseConfig.contentPadding,
      ...overrides.contentPadding,
    },
  };
};

/**
 * Generate background style based on variant
 */
export const getBackgroundStyle = (
  variant: keyof typeof LAYOUT_VARIANTS = 'default',
  customBackground?: string
): string => {
  if (customBackground) {
    return customBackground;
  }

  const config = LAYOUT_VARIANTS[variant];
  if (config.backgroundColor) {
    return config.backgroundColor;
  }

  // Default gradient background
  return `linear-gradient(135deg, 
    ${BRAND_COLORS.white} 0%, 
    ${BRAND_COLORS.offWhite} 50%,
    ${BRAND_COLORS.cream} 100%
  )`;
};

export default {
  LAYOUT_VARIANTS,
  breadcrumbLabels,
  layoutAnimations,
  layoutConfig,
  defaultPageMetadata,
  getLayoutConfig,
  mergeLayoutConfig,
  getBackgroundStyle,
};
