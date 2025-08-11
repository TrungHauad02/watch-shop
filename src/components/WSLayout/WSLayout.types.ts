import { SxProps, Theme } from '@mui/material/styles';
import { WSHeaderProps } from '../WSHeader/WSHeader.types';

// ==============================================
// LAYOUT PROPS INTERFACE
// ==============================================

interface WSLayoutProps {
  headerProps?: Omit<WSHeaderProps, 'children'>;
  showHeader?: boolean;
  showFooter?: boolean;
  backgroundColor?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  useContainer?: boolean;
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
  scrollRestoration?: boolean;
  minHeight?: string | number;
  isLoading?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
  showBreadcrumb?: boolean;
  breadcrumbProps?: BreadcrumbConfig;
  variant?: 'default' | 'admin' | 'auth' | 'fullscreen' | 'minimal';
  pageMetadata?: PageMetadata;
}

// ==============================================
// BREADCRUMB CONFIGURATION
// ==============================================

interface BreadcrumbConfig {
  show?: boolean;
  items?: BreadcrumbItem[];
  showHomeIcon?: boolean;
  separator?: React.ReactNode;
  maxItems?: number;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
  isActive?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

// ==============================================
// PAGE METADATA
// ==============================================
interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  customMeta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
}

// ==============================================
// LAYOUT VARIANT CONFIGURATIONS
// ==============================================

interface LayoutVariantConfig {
  default: LayoutConfig;
  admin: LayoutConfig;
  auth: LayoutConfig;
  fullscreen: LayoutConfig;
  minimal: LayoutConfig;
}

interface LayoutConfig {
  showHeader: boolean;
  showFooter: boolean;
  useContainer: boolean;
  maxWidth: WSLayoutProps['maxWidth'];
  backgroundColor?: string;
  contentPadding?: WSLayoutProps['contentPadding'];
  showBreadcrumb?: boolean;
}

// ==============================================
// LAYOUT CONTEXT TYPES
// ==============================================

interface LayoutContextType {
  variant: WSLayoutProps['variant'];
  isHeaderVisible: boolean;
  isFooterVisible: boolean;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  setPageMetadata: (metadata: Partial<PageMetadata>) => void;
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
  breadcrumbItems: BreadcrumbItem[];
  pageMetadata: PageMetadata;
}

// ==============================================
// LAYOUT HOOK TYPES
// ==============================================

interface UseLayoutReturn {
  setLoading: (loading: boolean) => void;
  setPageTitle: (title: string) => void;
  setPageMetadata: (metadata: Partial<PageMetadata>) => void;
  setBreadcrumb: (items: BreadcrumbItem[]) => void;
  addBreadcrumbItem: (item: BreadcrumbItem) => void;
  layoutState: {
    isLoading: boolean;
    pageMetadata: PageMetadata;
    breadcrumbItems: BreadcrumbItem[];
  };
}

// ==============================================
// SCROLL RESTORATION TYPES
// ==============================================

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollRestorationConfig {
  enabled: boolean;
  delay?: number;
  behavior?: 'auto' | 'smooth';
  restoreOnRouteChange?: boolean;
}

// ==============================================
// RESPONSIVE LAYOUT TYPES
// ==============================================

interface ResponsiveLayoutConfig {
  mobile: Partial<LayoutConfig>;
  tablet: Partial<LayoutConfig>;
  desktop: Partial<LayoutConfig>;
}

// ==============================================
// LAYOUT ANIMATION TYPES
// ==============================================

interface LayoutAnimationConfig {
  enabled: boolean;
  duration?: number;
  easing?: string;
  animations?: {
    pageTransition?: boolean;
    headerSlide?: boolean;
    contentFade?: boolean;
    loadingOverlay?: boolean;
  };
}

// ==============================================
// LAYOUT THEME TYPES
// ==============================================

interface LayoutThemeConfig {
  backgroundColor?: string;
  contentBackgroundColor?: string;
  headerBackgroundColor?: string;
  footerBackgroundColor?: string;
  gradients?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

// ==============================================
// ERROR BOUNDARY TYPES
// ==============================================

interface LayoutErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  showErrorDetails?: boolean;
}

// ==============================================
// EXPORT ALL TYPES
// ==============================================

export type {
  WSLayoutProps as default,
  BreadcrumbConfig,
  BreadcrumbItem,
  PageMetadata,
  LayoutVariantConfig,
  LayoutConfig,
  LayoutContextType,
  UseLayoutReturn,
  ScrollPosition,
  ScrollRestorationConfig,
  ResponsiveLayoutConfig,
  LayoutAnimationConfig,
  LayoutThemeConfig,
  LayoutErrorBoundaryProps,
};
