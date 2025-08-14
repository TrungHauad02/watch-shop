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
  useMemo,
  useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  useIsDarkMode,
  useLanguage,
  useStableThemeActions,
  subscribeToThemeChanges,
  subscribeToLanguageChanges,
} from '../../shared/store/themeStore';
import type WSLayoutProps from './WSLayout.types';
import type {
  LayoutContextType,
  PageMetadata,
  BreadcrumbItem,
  LayoutVariantConfig,
  LayoutConfig,
} from './WSLayout.types';

// ==============================================
// LAYOUT CONTEXT - OPTIMIZED
// ==============================================

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider = React.memo<{
  children: React.ReactNode;
  initialVariant?: WSLayoutProps['variant'];
}>(({ children, initialVariant = 'default' }) => {
  const [variant] = useState<WSLayoutProps['variant']>(initialVariant);
  const [isLoading, setIsLoading] = useState(false);
  const [isHeaderVisible] = useState(true);
  const [isFooterVisible] = useState(true);
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);
  const [pageMetadata, setPageMetadataState] = useState<PageMetadata>(() => ({
    title: 'WatchStore - Đồng hồ chính hãng',
    description:
      'Chuyên cung cấp đồng hồ chính hãng, cao cấp với chất lượng tuyệt vời',
    keywords: ['đồng hồ', 'watch', 'luxury', 'chính hãng'],
  }));

  // Memoized callbacks to prevent re-renders
  const setLoading = useCallback((loading: boolean): void => {
    setIsLoading(loading);
  }, []);

  const setPageMetadata = useCallback(
    (metadata: Partial<PageMetadata>): void => {
      setPageMetadataState((prev) => ({ ...prev, ...metadata }));
    },
    []
  );

  const setBreadcrumb = useCallback((items: BreadcrumbItem[]): void => {
    setBreadcrumbItems(items);
  }, []);

  // Memoized context value
  const contextValue = useMemo(
    (): LayoutContextType => ({
      variant,
      isHeaderVisible,
      isFooterVisible,
      isLoading,
      setLoading,
      setPageMetadata,
      setBreadcrumb,
      breadcrumbItems,
      pageMetadata,
    }),
    [
      variant,
      isHeaderVisible,
      isFooterVisible,
      isLoading,
      setLoading,
      setPageMetadata,
      setBreadcrumb,
      breadcrumbItems,
      pageMetadata,
    ]
  );

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
});

LayoutProvider.displayName = 'LayoutProvider';

// ==============================================
// LAYOUT HOOK - OPTIMIZED
// ==============================================

export const useLayout = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  const setPageTitle = useCallback(
    (title: string): void => {
      context.setPageMetadata({ title });
      // Also update document title
      document.title = title;
    },
    [context]
  );

  const addBreadcrumbItem = useCallback(
    (item: BreadcrumbItem): void => {
      context.setBreadcrumb([...context.breadcrumbItems, item]);
    },
    [context]
  );

  return useMemo(
    () => ({
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
    }),
    [
      context.setLoading,
      setPageTitle,
      context.setPageMetadata,
      context.setBreadcrumb,
      addBreadcrumbItem,
      context.isLoading,
      context.pageMetadata,
      context.breadcrumbItems,
    ]
  );
};

// ==============================================
// SCROLL RESTORATION HOOK - OPTIMIZED
// ==============================================

export const useScrollRestoration = (enabled: boolean = true) => {
  const location = useLocation();
  const [scrollPositions, setScrollPositions] = useState<Map<string, number>>(
    () => new Map()
  );

  // Memoized scroll handler
  const handleScroll = useCallback((): void => {
    setScrollPositions((prev) => {
      const newMap = new Map(prev);
      newMap.set(location.pathname, window.scrollY);
      return newMap;
    });
  }, [location.pathname]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const savedPosition = scrollPositions.get(location.pathname);

    if (savedPosition !== undefined) {
      // Restore saved position
      const timeoutId = setTimeout(() => {
        window.scrollTo({ top: savedPosition, behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      // Scroll to top for new pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, scrollPositions, enabled]);

  const scrollToTop = useCallback((): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToElement = useCallback((elementId: string): void => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return useMemo(
    () => ({
      scrollToTop,
      scrollToElement,
      currentPosition: scrollPositions.get(location.pathname) || 0,
    }),
    [scrollToTop, scrollToElement, scrollPositions, location.pathname]
  );
};

// ==============================================
// PAGE METADATA HOOK - OPTIMIZED
// ==============================================

export const usePageMetadata = () => {
  const { setPageMetadata } = useLayout();

  // Memoized meta tags updater
  const updateMetaTags = useCallback((metadata: PageMetadata): void => {
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
  }, []);

  useEffect(() => {
    // Initialize meta tags update function
    updateMetaTags({
      title: 'WatchStore',
      description: 'Premium watch store',
      keywords: ['watch', 'luxury'],
    });
  }, [updateMetaTags]);

  return useMemo(() => ({ setPageMetadata }), [setPageMetadata]);
};

// ==============================================
// RESPONSIVE LAYOUT HOOK - OPTIMIZED
// ==============================================

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useResponsiveLayout = () => {
  const [viewport, setViewport] = useState(() => {
    if (typeof window === 'undefined') {
      return {
        breakpoint: 'md' as Breakpoint,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        width: 1200,
        height: 800,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    let breakpoint: Breakpoint = 'md';
    let isMobile = false;
    let isTablet = false;
    let isDesktop = true;

    if (width < 600) {
      breakpoint = 'xs';
      isMobile = true;
      isTablet = false;
      isDesktop = false;
    } else if (width < 900) {
      breakpoint = 'sm';
      isMobile = true;
      isTablet = false;
      isDesktop = false;
    } else if (width < 1200) {
      breakpoint = 'md';
      isMobile = false;
      isTablet = true;
      isDesktop = false;
    } else if (width < 1536) {
      breakpoint = 'lg';
      isMobile = false;
      isTablet = false;
      isDesktop = true;
    } else {
      breakpoint = 'xl';
      isMobile = false;
      isTablet = false;
      isDesktop = true;
    }

    return { breakpoint, isMobile, isTablet, isDesktop, width, height };
  });

  // Throttled resize handler
  const updateBreakpoint = useCallback((): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    let breakpoint: Breakpoint = 'md';
    let isMobile = false;
    let isTablet = false;
    let isDesktop = true;

    if (width < 600) {
      breakpoint = 'xs';
      isMobile = true;
      isTablet = false;
      isDesktop = false;
    } else if (width < 900) {
      breakpoint = 'sm';
      isMobile = true;
      isTablet = false;
      isDesktop = false;
    } else if (width < 1200) {
      breakpoint = 'md';
      isMobile = false;
      isTablet = true;
      isDesktop = false;
    } else if (width < 1536) {
      breakpoint = 'lg';
      isMobile = false;
      isTablet = false;
      isDesktop = true;
    } else {
      breakpoint = 'xl';
      isMobile = false;
      isTablet = false;
      isDesktop = true;
    }

    setViewport({ breakpoint, isMobile, isTablet, isDesktop, width, height });
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledUpdate = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateBreakpoint, 100); // Throttle to 100ms
    };

    window.addEventListener('resize', throttledUpdate);
    return () => {
      window.removeEventListener('resize', throttledUpdate);
      clearTimeout(timeoutId);
    };
  }, [updateBreakpoint]);

  return viewport;
};

// ==============================================
// THEME INTEGRATION HOOK - OPTIMIZED
// ==============================================

export const useLayoutTheme = () => {
  const isDarkMode = useIsDarkMode();
  const language = useLanguage();
  const { toggleTheme, setTheme, setLanguage } = useStableThemeActions();

  // Memoized system preference checker
  const systemPreference = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  // Setup theme change subscription
  useEffect(() => {
    const unsubscribeTheme = subscribeToThemeChanges((newIsDarkMode) => {
      // Apply theme to document root for global styling
      document.documentElement.setAttribute(
        'data-theme',
        newIsDarkMode ? 'dark' : 'light'
      );
    });

    const unsubscribeLanguage = subscribeToLanguageChanges((newLanguage) => {
      document.documentElement.setAttribute('data-language', newLanguage);
    });

    // Initial setup
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );
    document.documentElement.setAttribute('data-language', language);

    return () => {
      unsubscribeTheme();
      unsubscribeLanguage();
    };
  }, []); // Empty deps - subscriptions handle changes

  return useMemo(
    () => ({
      isDarkMode,
      language,
      toggleTheme,
      setTheme,
      setLanguage,
      systemPreference,
    }),
    [isDarkMode, language, toggleTheme, setTheme, setLanguage, systemPreference]
  );
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
// LAYOUT UTILITIES - MEMOIZED
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
// BREADCRUMB UTILITIES - MEMOIZED
// ==============================================

const pathLabelsCache: Record<string, string> = {
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

    const label =
      pathLabelsCache[segment] ||
      segment.charAt(0).toUpperCase() + segment.slice(1);

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
// PERFORMANCE UTILITIES - OPTIMIZED
// ==============================================

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
}

export const useLayoutPerformance = (): PerformanceMetrics => {
  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics>(() => ({
      loadTime: 0,
      renderTime: 0,
      memoryUsage: 0,
    }));

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
// ACCESSIBILITY UTILITIES - OPTIMIZED
// ==============================================

interface AccessibilityUtils {
  announceToScreenReader: (message: string) => void;
}

export const useLayoutAccessibility = (): AccessibilityUtils => {
  const { toggleTheme } = useStableThemeActions();

  const announceToScreenReader = useCallback((message: string): void => {
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
  }, []);

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

      // Alt + T: Toggle theme
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (skipLink && skipLinkHandler) {
        skipLink.removeEventListener('click', skipLinkHandler);
      }
    };
  }, [toggleTheme]);

  return useMemo(
    () => ({
      announceToScreenReader,
    }),
    [announceToScreenReader]
  );
};

// ==============================================
// ERROR BOUNDARY UTILITIES - OPTIMIZED
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
