import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { breadcrumbLabels } from './layout.data';
import { BreadcrumbItem } from './components/LayoutBreadcrumb';

// ==================== PAGE METADATA HOOK ====================

export interface PageMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export const usePageMetadata = () => {
  const [pageMetadata, setPageMetadataState] = useState<PageMetadata>({});

  const setPageMetadata = useCallback((metadata: Partial<PageMetadata>) => {
    setPageMetadataState((prev) => ({ ...prev, ...metadata }));

    // Update document title
    if (metadata.title) {
      document.title = metadata.title;
    }

    // Update meta description
    if (metadata.description) {
      const descTag = document.querySelector(
        'meta[name="description"]'
      ) as HTMLMetaElement;
      if (descTag) {
        descTag.content = metadata.description;
      }
    }

    // Update meta keywords
    if (metadata.keywords) {
      const keywordsTag = document.querySelector(
        'meta[name="keywords"]'
      ) as HTMLMetaElement;
      if (keywordsTag) {
        keywordsTag.content = metadata.keywords.join(', ');
      }
    }
  }, []);

  const setPageTitle = useCallback((title: string) => {
    setPageMetadata({ title });
  }, []);

  return useMemo(
    () => ({
      pageMetadata,
      setPageMetadata,
      setPageTitle,
    }),
    [pageMetadata, setPageMetadata, setPageTitle]
  );
};

// ==================== BREADCRUMB HOOK ====================

export const useBreadcrumb = () => {
  const location = useLocation();
  const [customBreadcrumbs, setCustomBreadcrumbs] = useState<BreadcrumbItem[]>(
    []
  );

  // Auto-generate breadcrumbs from current path
  const generatedBreadcrumbs = useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Trang chủ', path: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      const label =
        breadcrumbLabels[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);

      breadcrumbs.push({
        label,
        path: isLast ? undefined : currentPath,
        isActive: isLast,
      });
    });

    return breadcrumbs;
  }, [location.pathname]);

  const setBreadcrumb = useCallback((items: BreadcrumbItem[]) => {
    setCustomBreadcrumbs(items);
  }, []);

  const addBreadcrumbItem = useCallback((item: BreadcrumbItem) => {
    setCustomBreadcrumbs((prev) => [...prev, item]);
  }, []);

  const clearBreadcrumb = useCallback(() => {
    setCustomBreadcrumbs([]);
  }, []);

  const finalBreadcrumbs =
    customBreadcrumbs.length > 0 ? customBreadcrumbs : generatedBreadcrumbs;

  return useMemo(
    () => ({
      breadcrumbs: finalBreadcrumbs,
      setBreadcrumb,
      addBreadcrumbItem,
      clearBreadcrumb,
      generatedBreadcrumbs,
      hasCustomBreadcrumbs: customBreadcrumbs.length > 0,
    }),
    [
      finalBreadcrumbs,
      setBreadcrumb,
      addBreadcrumbItem,
      clearBreadcrumb,
      generatedBreadcrumbs,
      customBreadcrumbs.length,
    ]
  );
};

// ==================== LOADING HOOK ====================

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const startLoading = useCallback((message?: string) => {
    setIsLoading(true);
    if (message) {
      setLoadingMessage(message);
    }
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
  }, []);

  const withLoading = useCallback(
    async <T>(
      asyncOperation: () => Promise<T>,
      message?: string
    ): Promise<T> => {
      try {
        startLoading(message);
        const result = await asyncOperation();
        return result;
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );

  return useMemo(
    () => ({
      isLoading,
      loadingMessage,
      startLoading,
      stopLoading,
      withLoading,
    }),
    [isLoading, loadingMessage, startLoading, stopLoading, withLoading]
  );
};

// ==================== SCROLL RESTORATION HOOK ====================

export const useScrollRestoration = (enabled: boolean = true) => {
  const location = useLocation();
  const [scrollPositions, setScrollPositions] = useState<Map<string, number>>(
    new Map()
  );

  const handleScroll = useCallback(() => {
    if (!enabled) return;

    setScrollPositions((prev) => {
      const newMap = new Map(prev);
      newMap.set(location.pathname, window.scrollY);
      return newMap;
    });
  }, [location.pathname, enabled]);

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const savedPosition = scrollPositions.get(location.pathname);

    if (savedPosition !== undefined) {
      const timeoutId = setTimeout(() => {
        window.scrollTo({ top: savedPosition, behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }, [location.pathname, scrollPositions, enabled]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToElement = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// ==================== RESPONSIVE LAYOUT HOOK ====================

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const useResponsive = () => {
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

    return getViewportInfo();
  });

  const getViewportInfo = useCallback(() => {
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
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewport(getViewportInfo());
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [getViewportInfo]);

  return viewport;
};

// ==================== LAYOUT STATE HOOK ====================

export const useLayoutState = () => {
  const [layoutState, setLayoutState] = useState({
    headerHeight: 0,
    footerHeight: 0,
    sidebarWidth: 0,
    isHeaderVisible: true,
    isFooterVisible: true,
    isSidebarVisible: false,
  });

  const updateHeaderHeight = useCallback((height: number) => {
    setLayoutState((prev) => ({ ...prev, headerHeight: height }));
  }, []);

  const updateFooterHeight = useCallback((height: number) => {
    setLayoutState((prev) => ({ ...prev, footerHeight: height }));
  }, []);

  const toggleHeader = useCallback(() => {
    setLayoutState((prev) => ({
      ...prev,
      isHeaderVisible: !prev.isHeaderVisible,
    }));
  }, []);

  const toggleFooter = useCallback(() => {
    setLayoutState((prev) => ({
      ...prev,
      isFooterVisible: !prev.isFooterVisible,
    }));
  }, []);

  return useMemo(
    () => ({
      ...layoutState,
      updateHeaderHeight,
      updateFooterHeight,
      toggleHeader,
      toggleFooter,
    }),
    [
      layoutState,
      updateHeaderHeight,
      updateFooterHeight,
      toggleHeader,
      toggleFooter,
    ]
  );
};

export default {
  usePageMetadata,
  useBreadcrumb,
  useLoading,
  useScrollRestoration,
  useResponsive,
  useLayoutState,
};
