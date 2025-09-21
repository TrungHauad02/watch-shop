import React, { useMemo, useEffect } from 'react';
import { Box, Container, Fade, useTheme } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { SxProps, Theme } from '@mui/material/styles';
import WSHeader from '../WSHeader';
import WSFooter from '../WSFooter';
import LayoutBreadcrumb, {
  BreadcrumbItem,
} from './components/LayoutBreadcrumb';
import LayoutLoadingOverlay from './components/LayoutLoadingOverlay';
import LayoutBackgroundDecorative from './components/LayoutBackgroundDecorative';
import { UserDTO } from '@/shared/types';
import {
  LAYOUT_VARIANTS,
  getLayoutConfig,
  getBackgroundStyle,
  breadcrumbLabels,
  layoutConfig,
  mergeLayoutConfig,
  LayoutConfig,
} from './layout.data';

// ==================== INTERFACES ====================

interface WSLayoutProps {
  // Header configuration
  headerProps?: {
    isAuthenticated?: boolean;
    user?: UserDTO | null;
    wishlistCount?: number;
    onLogin?: () => void;
    onLogout?: () => void;
    onProfileClick?: () => void;
  };

  // Layout configuration
  variant?: keyof typeof LAYOUT_VARIANTS;
  showHeader?: boolean;
  showFooter?: boolean;
  showBreadcrumb?: boolean;
  breadcrumbItems?: BreadcrumbItem[];

  // Content configuration
  backgroundColor?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  useContainer?: boolean;
  contentPadding?: LayoutConfig['contentPadding'];
  minHeight?: string | number;

  // Features
  isLoading?: boolean;
  scrollRestoration?: boolean;
  showBackgroundDecorative?: boolean;

  // Styling
  className?: string;
  sx?: SxProps<Theme>;

  // Advanced configuration
  customLayoutConfig?: Partial<LayoutConfig>;
}

// ==================== SKIP TO CONTENT COMPONENT ====================

const SkipToContent = React.memo(() => {
  const theme = useTheme();

  return (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'absolute',
        top: -40,
        left: 6,
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        padding: '8px 16px',
        textDecoration: 'none',
        borderRadius: '0 0 4px 4px',
        zIndex: theme.zIndex.tooltip,
        fontSize: '0.875rem',
        fontWeight: 600,
        '&:focus': {
          top: 0,
        },
        transition: 'top 0.3s ease',
        // CUSTOMIZE: Chỉnh sửa style của skip link ở đây
      }}
    >
      Bỏ qua đến nội dung chính
    </Box>
  );
});

SkipToContent.displayName = 'SkipToContent';

// ==================== MAIN LAYOUT COMPONENT ====================

export default function WSLayout({
  headerProps,
  variant = 'default',
  showHeader,
  showFooter,
  showBreadcrumb,
  breadcrumbItems = [],
  backgroundColor,
  maxWidth,
  useContainer,
  contentPadding,
  minHeight = 'auto',
  isLoading = false,
  scrollRestoration = true,
  showBackgroundDecorative,
  className,
  sx,
  customLayoutConfig,
}: WSLayoutProps) {
  const theme = useTheme();
  const location = useLocation();

  // ==================== LAYOUT CONFIGURATION ====================

  const finalLayoutConfig = useMemo(() => {
    const baseConfig = getLayoutConfig(variant);
    const mergedConfig = customLayoutConfig
      ? mergeLayoutConfig(baseConfig, customLayoutConfig)
      : baseConfig;

    return {
      ...mergedConfig,
      // Override with explicit props
      showHeader: showHeader ?? mergedConfig.showHeader,
      showFooter: showFooter ?? mergedConfig.showFooter,
      useContainer: useContainer ?? mergedConfig.useContainer,
      maxWidth: maxWidth ?? mergedConfig.maxWidth,
      contentPadding: contentPadding ?? mergedConfig.contentPadding,
    };
  }, [
    variant,
    customLayoutConfig,
    showHeader,
    showFooter,
    useContainer,
    maxWidth,
    contentPadding,
  ]);

  // ==================== BREADCRUMB GENERATION ====================

  const generatedBreadcrumbItems = useMemo(() => {
    if (breadcrumbItems.length > 0) {
      return breadcrumbItems;
    }

    if (!showBreadcrumb && !finalLayoutConfig.showBreadcrumb) {
      return [];
    }

    // Auto-generate breadcrumbs from pathname
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Trang chủ', path: '/' }];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      const label =
        breadcrumbLabels[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);

      breadcrumbs.push(
        isLast
          ? { label, isActive: isLast }
          : { label, path: currentPath, isActive: isLast }
      );
    });

    return breadcrumbs;
  }, [
    breadcrumbItems,
    showBreadcrumb,
    finalLayoutConfig.showBreadcrumb,
    location.pathname,
  ]);

  // ==================== SCROLL RESTORATION ====================

  useEffect(() => {
    if (scrollRestoration) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, scrollRestoration]);

  // ==================== STYLES ====================

  const backgroundStyle = useMemo(() => {
    return getBackgroundStyle(variant, backgroundColor);
  }, [variant, backgroundColor]);

  const layoutStyles = useMemo(
    () => ({
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column' as const,
      background: backgroundStyle,
      position: 'relative' as const,
      overflow: 'hidden' as const,
      scrollBehavior: layoutConfig.content.scrollBehavior,
      WebkitFontSmoothing: 'antialiased' as const,
      MozOsxFontSmoothing: 'grayscale' as const,
      overflowX: 'hidden' as const,
      // CUSTOMIZE: Chỉnh sửa style tổng thể của layout ở đây
      transition: 'background 0.3s ease',
      ...sx,
    }),
    [backgroundStyle, sx]
  );

  const headerBoxStyles = useMemo(
    () => ({
      position: layoutConfig.header.stickyPosition
        ? ('sticky' as const)
        : ('relative' as const),
      top: 0,
      zIndex: theme.zIndex.appBar,
      ...(layoutConfig.header.showShadow && {
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
      }),
    }),
    [theme.zIndex.appBar]
  );

  const mainContentStyles = useMemo(
    () => ({
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
      minHeight: minHeight,
    }),
    [minHeight]
  );

  const footerBoxStyles = useMemo(
    () => ({
      mt: layoutConfig.footer.marginTop,
      zIndex: 1,
      ...(layoutConfig.footer.showShadow && {
        boxShadow: '0 -2px 12px rgba(0, 0, 0, 0.1)',
      }),
    }),
    []
  );

  // ==================== MAIN CONTENT WRAPPER ====================

  const MainContentWrapper = useMemo(() => {
    const Component: React.FC<{ children: React.ReactNode }> = ({
      children,
    }) => {
      const commonProps = {
        flexGrow: 1,
        minHeight: 'inherit',
        display: 'flex',
        flexDirection: 'column' as const,
        position: 'relative' as const,
        ...(finalLayoutConfig.contentPadding && {
          pt: finalLayoutConfig.contentPadding.top,
          pb: finalLayoutConfig.contentPadding.bottom,
          pl: finalLayoutConfig.contentPadding.left,
          pr: finalLayoutConfig.contentPadding.right,
        }),
      };

      if (!finalLayoutConfig.useContainer) {
        return (
          <Box component="main" sx={commonProps}>
            {children}
          </Box>
        );
      }

      return (
        <Container
          component="main"
          maxWidth={finalLayoutConfig.maxWidth}
          sx={commonProps}
        >
          {children}
        </Container>
      );
    };

    Component.displayName = 'MainContentWrapper';
    return Component;
  }, [finalLayoutConfig]);

  // ==================== RENDER ====================

  return (
    <Box className={className} sx={layoutStyles}>
      {/* Accessibility: Skip to content */}
      <SkipToContent />

      {/* Header */}
      {finalLayoutConfig.showHeader && (
        <Box component="header" sx={headerBoxStyles}>
          <WSHeader {...headerProps} />
        </Box>
      )}

      {/* Breadcrumb */}
      {generatedBreadcrumbItems.length > 0 && (
        <LayoutBreadcrumb items={generatedBreadcrumbItems} />
      )}

      {/* Main Content Area */}
      <Box id="main-content" sx={mainContentStyles}>
        <MainContentWrapper>
          <Fade
            in={!isLoading}
            timeout={
              layoutConfig.content.scrollBehavior === 'smooth' ? 300 : 200
            }
          >
            <Box
              sx={{
                width: '100%',
                minHeight: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                overflow: 'visible',
              }}
            >
              <Outlet />
            </Box>
          </Fade>
        </MainContentWrapper>
      </Box>

      {/* Footer */}
      {finalLayoutConfig.showFooter && (
        <Box component="footer" sx={footerBoxStyles}>
          <WSFooter />
        </Box>
      )}

      {/* Loading Overlay */}
      {isLoading && <LayoutLoadingOverlay isLoading={isLoading} />}

      {/* Background Decorative Elements */}
      <LayoutBackgroundDecorative
        show={
          showBackgroundDecorative ?? layoutConfig.background.showDecorative
        }
      />
    </Box>
  );
}
