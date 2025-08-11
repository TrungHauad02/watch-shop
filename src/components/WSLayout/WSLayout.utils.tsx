/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  Component,
  ReactNode,
  ErrorInfo,
} from 'react';
import { useLocation } from 'react-router-dom';
import type WSLayoutProps from './WSLayout.types';
import type {
  LayoutContextType,
  PageMetadata,
  BreadcrumbItem,
  LayoutVariantConfig,
  LayoutConfig,
} from './WSLayout.types';

// ==============================================
// LAYOUT CONTEXT
// ==============================================

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider: React.FC<{
  children: React.ReactNode;
  initialVariant?: WSLayoutProps['variant'];
}> = ({ children, initialVariant = 'default' }) => {
  const [variant] = useState<WSLayoutProps['variant']>(initialVariant);
  const [isLoading, setIsLoading] = useState(false);
  const [isHeaderVisible] = useState(true);
  const [isFooterVisible] = useState(true);
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const [pageMetadata, setPageMetadataState] = useState<PageMetadata>({
    title: 'WatchStore - Đồng hồ chính hãng',
    description:
      'Chuyên cung cấp đồng hồ chính hãng, cao cấp với chất lượng tuyệt vời',
    keywords: ['đồng hồ', 'watch', 'luxury', 'chính hãng'],
  });

  const setLoading = (loading: boolean): void => {
    setIsLoading(loading);
  };

  const setPageMetadata = (metadata: Partial<PageMetadata>): void => {
    setPageMetadataState((prev) => ({ ...prev, ...metadata }));
  };

  const setBreadcrumb = (items: BreadcrumbItem[]): void => {
    setBreadcrumbItems(items);
  };

  const contextValue: LayoutContextType = {
    variant,
    isHeaderVisible,
    isFooterVisible,
    isLoading,
    setLoading,
    setPageMetadata,
    setBreadcrumb,
    breadcrumbItems,
    pageMetadata,
  };

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

// ==============================================
// LAYOUT HOOK
// ==============================================

export const useLayout = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  const setPageTitle = (title: string): void => {
    context.setPageMetadata({ title });
    // Also update document title
    document.title = title;
  };

  const addBreadcrumbItem = (item: BreadcrumbItem): void => {
    context.setBreadcrumb([...context.breadcrumbItems, item]);
  };

  return {
    setLoading: context.setLoading,
    setPageTitle,
    setPageMetadata: context.setPageMetadata,
    setBreadcrumb: context.setBreadcrumb,
    addBreadcrumbItem,
    layoutState: {
      isLoading: context.isLoading,
      pageMetadata: context.pageMetadata,
      breadcrumbItems: context.breadcrumbItems,
    },
  };
};

// ==============================================
// SCROLL RESTORATION HOOK
// ==============================================

export const useScrollRestoration = (enabled: boolean = true) => {
  const location = useLocation();
  const [scrollPositions, setScrollPositions] = useState<Map<string, number>>(
    new Map()
  );

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = (): void => {
      setScrollPositions((prev) => {
        const newMap = new Map(prev);
        newMap.set(location.pathname, window.scrollY);
        return newMap;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const savedPosition = scrollPositions.get(location.pathname);

    if (savedPosition !== undefined) {
      // Restore saved position
      setTimeout(() => {
        window.scrollTo({ top: savedPosition, behavior: 'smooth' });
      }, 100);
    } else {
      // Scroll to top for new pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, scrollPositions, enabled]);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToElement = (elementId: string): void => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    scrollToTop,
    scrollToElement,
    currentPosition: scrollPositions.get(location.pathname) || 0,
  };
};

// ==============================================
// PAGE METADATA HOOK
// ==============================================

export const usePageMetadata = () => {
  const { setPageMetadata } = useLayout();

  useEffect(() => {
    // Update meta tags in document head
    const updateMetaTags = (metadata: PageMetadata): void => {
      if (metadata.description) {
        const descTag = document.querySelector(
          'meta[name="description"]'
        ) as HTMLMetaElement;
        if (descTag) {
          descTag.content = metadata.description;
        }
      }

      if (metadata.keywords) {
        const keywordsTag = document.querySelector(
          'meta[name="keywords"]'
        ) as HTMLMetaElement;
        if (keywordsTag) {
          keywordsTag.content = metadata.keywords.join(', ');
        }
      }

      if (metadata.ogImage) {
        const ogImageTag = document.querySelector(
          'meta[property="og:image"]'
        ) as HTMLMetaElement;
        if (ogImageTag) {
          ogImageTag.content = metadata.ogImage;
        }
      }
    };

    // Initialize meta tags update function
    updateMetaTags({
      title: 'WatchStore',
      description: 'Premium watch store',
      keywords: ['watch', 'luxury'],
    });
  }, [setPageMetadata]);

  return { setPageMetadata };
};

// ==============================================
// RESPONSIVE LAYOUT HOOK
// ==============================================

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useResponsiveLayout = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('md');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const updateBreakpoint = (): void => {
      const width = window.innerWidth;

      if (width < 600) {
        setBreakpoint('xs');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < 900) {
        setBreakpoint('sm');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else if (width < 1200) {
        setBreakpoint('md');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width < 1536) {
        setBreakpoint('lg');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else {
        setBreakpoint('xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);

    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return {
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// ==============================================
// LAYOUT VARIANT CONFIGURATIONS
// ==============================================

export const LAYOUT_VARIANTS: LayoutVariantConfig = {
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
  },
  admin: {
    showHeader: true,
    showFooter: false,
    useContainer: false,
    maxWidth: false,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
    backgroundColor: '#000000',
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
  },
};

// ==============================================
// LAYOUT UTILITIES
// ==============================================

export const getLayoutConfig = (
  variant: WSLayoutProps['variant'] = 'default'
): LayoutConfig => {
  return LAYOUT_VARIANTS[variant as keyof LayoutVariantConfig];
};

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

// ==============================================
// BREADCRUMB UTILITIES
// ==============================================

export const generateBreadcrumbFromPath = (
  pathname: string
): BreadcrumbItem[] => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Trang chủ', path: '/', icon: '🏠' },
  ];

  let currentPath = '';

  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;

    // Map common paths to Vietnamese labels
    const pathLabels: Record<string, string> = {
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
    };

    const label =
      pathLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    const breadcrumbItem: BreadcrumbItem = {
      label,
      isActive: isLast,
    };

    // Only add path if not the last item
    if (!isLast) {
      breadcrumbItem.path = currentPath;
    }

    breadcrumbs.push(breadcrumbItem);
  });

  return breadcrumbs;
};

// ==============================================
// PERFORMANCE UTILITIES
// ==============================================

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
}

export const useLayoutPerformance = (): PerformanceMetrics => {
  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics>({
      loadTime: 0,
      renderTime: 0,
      memoryUsage: 0,
    });

  useEffect(() => {
    const measurePerformance = (): void => {
      try {
        // Measure load time
        const navigationTiming = performance.getEntriesByType(
          'navigation'
        )[0] as PerformanceNavigationTiming;
        const loadTime =
          navigationTiming.loadEventEnd - navigationTiming.fetchStart;

        // Measure render time
        const paintTiming = performance.getEntriesByType('paint');
        const firstContentfulPaint = paintTiming.find(
          (entry) => entry.name === 'first-contentful-paint'
        );
        const renderTime = firstContentfulPaint
          ? firstContentfulPaint.startTime
          : 0;

        // Measure memory usage (if available)
        const memoryInfo = (performance as any).memory;
        const memoryUsage = memoryInfo
          ? memoryInfo.usedJSHeapSize / 1024 / 1024
          : 0;

        setPerformanceMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          memoryUsage: Math.round(memoryUsage),
        });
      } catch (error) {
        console.warn('Performance measurement failed:', error);
        setPerformanceMetrics({
          loadTime: 0,
          renderTime: 0,
          memoryUsage: 0,
        });
      }
    };

    // Measure after component mounts
    const timer = setTimeout(measurePerformance, 1000);
    return () => clearTimeout(timer);
  }, []);

  return performanceMetrics;
};

// ==============================================
// ACCESSIBILITY UTILITIES
// ==============================================

interface AccessibilityUtils {
  announceToScreenReader: (message: string) => void;
}

export const useLayoutAccessibility = (): AccessibilityUtils => {
  useEffect(() => {
    // Skip link functionality
    const skipLink = document.querySelector('a[href="#main-content"]');
    let skipLinkHandler: ((e: Event) => void) | null = null;

    if (skipLink) {
      skipLinkHandler = (e: Event): void => {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      };

      skipLink.addEventListener('click', skipLinkHandler);
    }

    // Keyboard navigation enhancement
    const handleKeyDown = (e: KeyboardEvent): void => {
      // Alt + M: Skip to main content
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
        }
      }

      // Alt + H: Skip to header
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        const header = document.querySelector('header');
        if (header) {
          (header as HTMLElement).focus();
        }
      }

      // Alt + F: Skip to footer
      if (e.altKey && e.key === 'f') {
        e.preventDefault();
        const footer = document.querySelector('footer');
        if (footer) {
          (footer as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (skipLink && skipLinkHandler) {
        skipLink.removeEventListener('click', skipLinkHandler);
      }
    };
  }, []);

  const announceToScreenReader = (message: string): void => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  return {
    announceToScreenReader,
  };
};

// ==============================================
// THEME UTILITIES
// ==============================================

interface ThemeUtils {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
  systemPreference: boolean;
}

export const useLayoutTheme = (): ThemeUtils => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved === 'dark';
  });

  const toggleTheme = (): void => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('theme-mode', newMode ? 'dark' : 'light');
  };

  const setTheme = (mode: 'light' | 'dark'): void => {
    setIsDarkMode(mode === 'dark');
    localStorage.setItem('theme-mode', mode);
  };

  // Sync with system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent): void => {
      if (!localStorage.getItem('theme-mode')) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    isDarkMode,
    toggleTheme,
    setTheme,
    systemPreference: window.matchMedia('(prefers-color-scheme: dark)').matches,
  };
};

// ==============================================
// ERROR BOUNDARY UTILITIES
// ==============================================

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

export const createLayoutErrorBoundary = (
  fallbackComponent?: React.ComponentType<{
    error: Error;
    resetError: () => void;
  }>
) => {
  return class LayoutErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
  > {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
      return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
      console.error('Layout Error Boundary caught an error:', error, errorInfo);

      // Send error to monitoring service
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'exception', {
          description: error.toString(),
          fatal: false,
        });
      }
    }

    private resetError = (): void => {
      this.setState({ hasError: false, error: null });
    };

    render(): ReactNode {
      if (this.state.hasError && this.state.error) {
        if (fallbackComponent) {
          const FallbackComponent = fallbackComponent;
          return (
            <FallbackComponent
              error={this.state.error}
              resetError={this.resetError}
            />
          );
        }

        return (
          <div
            style={{
              padding: '2rem',
              textAlign: 'center',
              minHeight: '50vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h2>Oops! Có lỗi xảy ra</h2>
            <p>Ứng dụng đã gặp lỗi không mong muốn.</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '1rem',
              }}
            >
              Tải lại trang
            </button>
          </div>
        );
      }

      return this.props.children;
    }
  };
};
