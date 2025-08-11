import React from 'react';
import { Box, Container, Fade, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import WSHeader from '../WSHeader';
import WSFooter from '../WSFooter';
import { BRAND_COLORS } from '../../styles/colors';
import WSLayoutProps from './WSLayout.types';

export default function WSLayout({
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
}: WSLayoutProps) {
  const theme = useTheme();

  // ==============================================
  // SCROLL RESTORATION
  // ==============================================

  React.useEffect(() => {
    if (scrollRestoration) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollRestoration]);

  // ==============================================
  // BACKGROUND GRADIENT
  // ==============================================

  const getBackgroundStyle = () => {
    if (backgroundColor) {
      return backgroundColor;
    }

    // Default sophisticated gradient background
    return `linear-gradient(135deg, 
      ${theme.palette.background.default} 0%, 
      ${
        theme.palette.mode === 'dark'
          ? `${BRAND_COLORS.primary}05`
          : `${BRAND_COLORS.secondary}08`
      } 100%
    )`;
  };

  // ==============================================
  // MAIN CONTENT WRAPPER
  // ==============================================

  const MainContentWrapper: React.FC<{ children: React.ReactNode }> = ({
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

  // ==============================================
  // LOADING OVERLAY
  // ==============================================

  const LoadingOverlay: React.FC = () => (
    <Fade in={isLoading}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: theme.zIndex.modal + 1,
        }}
      >
        <Box
          sx={{
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
          }}
        />
      </Box>
    </Fade>
  );

  // ==============================================
  // SKIP TO CONTENT (Accessibility)
  // ==============================================

  const SkipToContent: React.FC = () => (
    <Box
      component="a"
      href="#main-content"
      sx={{
        position: 'absolute',
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
      }}
    >
      Bỏ qua đến nội dung chính
    </Box>
  );

  // ==============================================
  // MAIN RENDER
  // ==============================================

  return (
    <Box
      className={className}
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        background: getBackgroundStyle(),
        position: 'relative',
        overflow: 'hidden',
        // Smooth scrolling
        scrollBehavior: 'smooth',
        // Better font rendering
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        // Prevent horizontal scroll
        overflowX: 'hidden',
        ...sx,
      }}
    >
      {/* Accessibility: Skip to content */}
      <SkipToContent />

      {/* Header */}
      {showHeader && (
        <Box
          component="header"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndex.appBar,
            boxShadow: `0 2px 12px rgba(0, 0, 0, 0.1)`,
          }}
        >
          <WSHeader
            isDarkMode={theme.palette.mode === 'dark'}
            {...headerProps}
          />
        </Box>
      )}

      {/* Main Content Area */}
      <Box
        id="main-content"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          // Ensure content doesn't overlap with fixed headers
          ...(showHeader && {
            paddingTop: 0,
          }),
          // Smooth transitions for content changes
          '& > *': {
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          },
        }}
      >
        <MainContentWrapper>
          {/* Page Content */}
          <Fade in={!isLoading} timeout={300}>
            <Box
              sx={{
                width: '100%',
                minHeight: 'inherit',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Outlet />
            </Box>
          </Fade>
        </MainContentWrapper>
      </Box>

      {/* Footer */}
      {showFooter && (
        <Box
          component="footer"
          sx={{
            mt: 'auto',
            zIndex: 1,
          }}
        >
          <WSFooter />
        </Box>
      )}

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      {/* Background Decorative Elements */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: -1,
          opacity: 0.02,
          background: `radial-gradient(circle at 25% 25%, ${BRAND_COLORS.secondary} 0%, transparent 50%),
                      radial-gradient(circle at 75% 75%, ${BRAND_COLORS.accent} 0%, transparent 50%)`,
        }}
      />
    </Box>
  );
}
