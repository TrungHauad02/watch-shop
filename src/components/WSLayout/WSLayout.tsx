import React, { useMemo, useCallback } from 'react';
import { Box, Container, Fade, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import WSHeader from '../WSHeader';
import WSFooter from '../WSFooter';
import { BRAND_COLORS } from '../../styles/colors';
import {
  useIsDarkMode,
  useStableThemeActions,
} from '../../shared/store/themeStore';
import WSLayoutProps from './WSLayout.types';

// ==============================================
// MEMOIZED SUB-COMPONENTS
// ==============================================

const SkipToContent = React.memo(() => {
  const theme = useTheme();

  const skipLinkStyles = useMemo(
    () => ({
      position: 'absolute' as const,
      top: -40,
      left: 6,
      backgroundColor: BRAND_COLORS.primary,
      color: BRAND_COLORS.secondary,
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
    }),
    [theme.zIndex.tooltip]
  );

  return (
    <Box component="a" href="#main-content" sx={skipLinkStyles}>
      Bỏ qua đến nội dung chính
    </Box>
  );
});

SkipToContent.displayName = 'SkipToContent';

const LoadingOverlay = React.memo<{ isLoading: boolean; isDarkMode: boolean }>(
  ({ isLoading, isDarkMode }) => {
    const theme = useTheme();

    const overlayStyles = useMemo(
      () => ({
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isDarkMode
          ? 'rgba(0, 0, 0, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: theme.zIndex.modal + 1,
      }),
      [isDarkMode, theme.zIndex.modal]
    );

    const spinnerStyles = useMemo(
      () => ({
        width: 40,
        height: 40,
        border: `3px solid ${BRAND_COLORS.secondary}`,
        borderTop: `3px solid transparent`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }),
      []
    );

    return (
      <Fade in={isLoading}>
        <Box sx={overlayStyles}>
          <Box sx={spinnerStyles} />
        </Box>
      </Fade>
    );
  }
);

LoadingOverlay.displayName = 'LoadingOverlay';

const BackgroundDecorative = React.memo<{ isDarkMode: boolean }>(
  ({ isDarkMode }) => {
    const decorativeStyles = useMemo(
      () => ({
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none' as const,
        zIndex: -1,
        opacity: isDarkMode ? 0.03 : 0.02,
        // CUSTOMIZE: Bạn có thể thay đổi decorative background tại đây
        background: `radial-gradient(circle at 25% 25%, ${BRAND_COLORS.secondary} 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, ${BRAND_COLORS.accent} 0%, transparent 50%)`,
        transition: 'opacity 0.3s ease',
      }),
      [isDarkMode]
    );

    return <Box sx={decorativeStyles} />;
  }
);

BackgroundDecorative.displayName = 'BackgroundDecorative';

// ==============================================
// MAIN LAYOUT COMPONENT
// ==============================================

const WSLayout = React.memo<WSLayoutProps>(
  ({
    headerProps,
    showHeader = true,
    showFooter = true,
    backgroundColor,
    maxWidth = 'xl',
    useContainer = true,
    contentPadding = {
      top: { xs: 2, sm: 3, md: 4 },
      bottom: { xs: 2, sm: 3, md: 4 },
      left: { xs: 1, sm: 2 },
      right: { xs: 1, sm: 2 },
    },
    scrollRestoration = true,
    minHeight = 'auto',
    isLoading = false,
    className,
    sx,
  }) => {
    // ==============================================
    // THEME MANAGEMENT - OPTIMIZED
    // ==============================================

    const isDarkMode = useIsDarkMode();
    const { toggleTheme } = useStableThemeActions();
    const theme = useTheme(); // Use theme from App.tsx ThemeProvider

    // ==============================================
    // SCROLL RESTORATION - MEMOIZED
    // ==============================================

    React.useEffect(() => {
      if (scrollRestoration) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, [scrollRestoration]);

    // ==============================================
    // BACKGROUND GRADIENT - MEMOIZED
    // ==============================================

    const backgroundStyle = useMemo(() => {
      if (backgroundColor) {
        return backgroundColor;
      }

      // CUSTOMIZE: Bạn có thể chỉnh sửa background gradient tại đây
      return `linear-gradient(135deg, 
      ${theme.palette.background.default} 0%, 
      ${
        isDarkMode ? `${BRAND_COLORS.primary}05` : `${BRAND_COLORS.secondary}08`
      } 100%
    )`;
    }, [backgroundColor, theme.palette.background.default, isDarkMode]);

    // ==============================================
    // THEME TOGGLE HANDLER - STABLE REFERENCE
    // ==============================================

    const handleThemeToggle = useCallback(() => {
      toggleTheme();
    }, [toggleTheme]);

    // ==============================================
    // MAIN CONTENT WRAPPER - MEMOIZED
    // ==============================================

    const MainContentWrapper = useMemo(() => {
      const Component: React.FC<{ children: React.ReactNode }> = ({
        children,
      }) => {
        if (!useContainer) {
          return (
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                minHeight: minHeight,
                width: '100%',
                position: 'relative',
                ...(contentPadding && {
                  pt: contentPadding.top,
                  pb: contentPadding.bottom,
                  pl: contentPadding.left,
                  pr: contentPadding.right,
                }),
              }}
            >
              {children}
            </Box>
          );
        }

        return (
          <Container
            component="main"
            maxWidth={maxWidth}
            sx={{
              flexGrow: 1,
              minHeight: minHeight,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              ...(contentPadding && {
                pt: contentPadding.top,
                pb: contentPadding.bottom,
              }),
            }}
          >
            {children}
          </Container>
        );
      };

      Component.displayName = 'MainContentWrapper';
      return Component;
    }, [useContainer, minHeight, contentPadding, maxWidth]);

    // ==============================================
    // LAYOUT STYLES - MEMOIZED
    // ==============================================

    const layoutStyles = useMemo(
      () => ({
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column' as const,
        background: backgroundStyle,
        position: 'relative' as const,
        overflow: 'hidden' as const,
        // Smooth scrolling
        scrollBehavior: 'smooth' as const,
        // Better font rendering
        WebkitFontSmoothing: 'antialiased' as const,
        MozOsxFontSmoothing: 'grayscale' as const,
        // Prevent horizontal scroll
        overflowX: 'hidden' as const,
        // CUSTOMIZE: Bạn có thể thêm transition effects tại đây
        transition: 'background 0.3s ease, color 0.3s ease',
        ...sx,
      }),
      [backgroundStyle, sx]
    );

    const headerBoxStyles = useMemo(
      () => ({
        position: 'sticky' as const,
        top: 0,
        zIndex: theme.zIndex.appBar,
        boxShadow: `0 2px 12px rgba(0, 0, 0, 0.1)`,
      }),
      [theme.zIndex.appBar]
    );

    const mainContentStyles = useMemo(
      () => ({
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        position: 'relative' as const,
        // Ensure content doesn't overlap with fixed headers
        ...(showHeader && {
          paddingTop: 0,
        }),
        // Smooth transitions for content changes
        '& > *': {
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        },
      }),
      [showHeader]
    );

    const contentBoxStyles = useMemo(
      () => ({
        width: '100%',
        minHeight: 'inherit',
        display: 'flex',
        flexDirection: 'column' as const,
      }),
      []
    );

    const footerBoxStyles = useMemo(
      () => ({
        mt: 'auto',
        zIndex: 1,
      }),
      []
    );

    // ==============================================
    // MAIN RENDER
    // ==============================================

    return (
      <Box className={className} sx={layoutStyles}>
        {/* Accessibility: Skip to content */}
        <SkipToContent />

        {/* Header */}
        {showHeader && (
          <Box component="header" sx={headerBoxStyles}>
            <WSHeader
              isDarkMode={isDarkMode}
              onThemeToggle={handleThemeToggle}
              {...headerProps}
            />
          </Box>
        )}

        {/* Main Content Area */}
        <Box id="main-content" sx={mainContentStyles}>
          <MainContentWrapper>
            {/* Page Content */}
            <Fade in={!isLoading} timeout={300}>
              <Box sx={contentBoxStyles}>
                <Outlet />
              </Box>
            </Fade>
          </MainContentWrapper>
        </Box>

        {/* Footer */}
        {showFooter && (
          <Box component="footer" sx={footerBoxStyles}>
            <WSFooter />
          </Box>
        )}

        {/* Loading Overlay */}
        {isLoading && (
          <LoadingOverlay isLoading={isLoading} isDarkMode={isDarkMode} />
        )}

        {/* Background Decorative Elements */}
        <BackgroundDecorative isDarkMode={isDarkMode} />
      </Box>
    );
  }
);

WSLayout.displayName = 'WSLayout';

export default WSLayout;
