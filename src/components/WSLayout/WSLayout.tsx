// src/components/WSLayout/WSLayout.tsx

import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  useMediaQuery,
  useTheme,
  Fab,
  Zoom,
  useScrollTrigger,
} from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import { SxProps, Theme } from '@mui/material/styles';
import WSHeader from '../WSHeader';
import WSFooter from '../WSFooter';
import WSLoading from '../WSLoading';
import { User } from '@/shared/types/common.types';

// ==============================================
// TYPES
// ==============================================

export interface WSLayoutProps {
  /** Main content */
  children: React.ReactNode;

  /** Container max width */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

  /** Whether to show header */
  showHeader?: boolean;

  /** Whether to show footer */
  showFooter?: boolean;

  /** Whether to show back to top button */
  showBackToTop?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Loading message */
  loadingMessage?: string;

  /** Custom header props */
  headerProps?: {
    onThemeToggle?: () => void;
    isDarkMode?: boolean;
    isAuthenticated?: boolean;
    user?: User | null;
    wishlistCount?: number;
    cartCount?: number;
    onLogin?: () => void;
    onLogout?: () => void;
    onProfileClick?: () => void;
  };

  /** Custom styles */
  sx?: SxProps<Theme>;

  /** Additional background color */
  backgroundColor?: string;

  /** Custom padding */
  padding?: number | string;

  /** Whether to disable container padding */
  disablePadding?: boolean;

  /** Whether to make full height */
  fullHeight?: boolean;

  /** Whether to center content vertically */
  centerContent?: boolean;

  /** Custom content spacing */
  contentSpacing?: number;

  /** Whether to add page transitions */
  enableTransitions?: boolean;
}

// ==============================================
// COMPONENT
// ==============================================

const WSLayout: React.FC<WSLayoutProps> = ({
  children,
  maxWidth = 'lg',
  showHeader = true,
  showFooter = true,
  showBackToTop = true,
  loading = false,
  loadingMessage,
  headerProps = {},
  sx = {},
  backgroundColor,
  padding,
  disablePadding = false,
  fullHeight = false,
  centerContent = false,
  contentSpacing = 0,
  enableTransitions = true,
}) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery('(max-width:480px)');

  // Enhanced scroll trigger for back to top button
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  // ==============================================
  // RESPONSIVE SPACING CALCULATION
  // ==============================================

  const getResponsivePadding = () => {
    if (disablePadding) return 0;
    if (padding) return padding;

    // Responsive padding based on screen size
    if (isSmallMobile) return 1; // 8px
    if (isMobile) return 2; // 16px
    if (isTablet) return 3; // 24px
    return 3; // 24px for desktop (reduced from 4)
  };

  const getContainerPadding = () => {
    const basePadding = getResponsivePadding();
    return {
      py: basePadding,
      px: disablePadding ? 0 : { xs: 1, sm: 2, md: 3 }, // Reduced padding
    };
  };

  // ==============================================
  // SCROLL TO TOP HANDLER
  // ==============================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // ==============================================
  // LOADING OVERLAY
  // ==============================================

  if (loading) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: backgroundColor || 'background.default',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {showHeader && (
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <WSHeader {...headerProps} />
            </Box>
          )}

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: showHeader && showFooter ? '60vh' : '100vh',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <WSLoading
              variant="page"
              message={loadingMessage || 'Đang tải...'}
              size={isMobile ? 'medium' : 'large'}
            />
          </Box>

          {showFooter && (
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <WSFooter />
            </Box>
          )}
        </Box>
      </>
    );
  }

  // ==============================================
  // MAIN LAYOUT
  // ==============================================

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: fullHeight ? '100vh' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: backgroundColor || 'background.default',
          position: 'relative',
          width: '100%', // Ensure full width
          overflowX: 'hidden', // Prevent horizontal scroll
          ...(enableTransitions && {
            transition: 'background-color 0.3s ease',
          }),
          ...sx,
        }}
      >
        {/* Header */}
        {showHeader && (
          <Box
            component="header"
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: theme.zIndex.appBar,
              width: '100%',
              ...(enableTransitions && {
                transition: 'all 0.3s ease',
              }),
            }}
          >
            <WSHeader {...headerProps} />
          </Box>
        )}

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '100%',
            minHeight: fullHeight
              ? `calc(100vh - ${showHeader ? '64px' : '0px'} - ${
                  showFooter ? '200px' : '0px'
                })`
              : 'auto',
            ...(centerContent && {
              justifyContent: 'center',
              alignItems: 'center',
            }),
            ...(contentSpacing > 0 && {
              gap: contentSpacing,
            }),
            ...(enableTransitions && {
              transition: 'all 0.3s ease',
            }),
          }}
        >
          {maxWidth === false ? (
            // Full width content without container
            <Box
              sx={{
                flex: 1,
                width: '100%',
                ...getContainerPadding(),
                ...(centerContent && {
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
              }}
            >
              {children}
            </Box>
          ) : (
            // Contained content with responsive behavior
            <Container
              maxWidth={maxWidth}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                ...getContainerPadding(),
                ...(centerContent && {
                  justifyContent: 'center',
                  alignItems: 'center',
                }),
                // Enhanced responsive behavior
                ...(isSmallMobile && {
                  px: 1,
                  mx: 'auto', // Changed from 0 to auto
                  width: '100%',
                  maxWidth: '100% !important',
                }),
                ...(isMobile &&
                  maxWidth === 'lg' && {
                    maxWidth: 'md',
                  }),
                ...(isTablet &&
                  maxWidth === 'xl' && {
                    maxWidth: 'lg',
                  }),
              }}
            >
              {children}
            </Container>
          )}
        </Box>

        {/* Footer */}
        {showFooter && (
          <Box
            component="footer"
            sx={{
              marginTop: 'auto',
              width: '100%',
              ...(enableTransitions && {
                transition: 'all 0.3s ease',
              }),
            }}
          >
            <WSFooter />
          </Box>
        )}

        {/* Enhanced Back to Top Button */}
        {showBackToTop && (
          <Zoom
            in={trigger}
            timeout={{
              enter: 300,
              exit: 200,
            }}
          >
            <Fab
              color="primary"
              size={isMobile ? 'small' : 'medium'}
              onClick={scrollToTop}
              sx={{
                position: 'fixed',
                bottom: {
                  xs: 16,
                  sm: 20,
                  md: 24,
                  lg: 32,
                },
                right: {
                  xs: 16,
                  sm: 20,
                  md: 24,
                  lg: 32,
                },
                zIndex: theme.zIndex.speedDial,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: theme.shadows[6],
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                  transform: 'translateY(-3px) scale(1.05)',
                  boxShadow: theme.shadows[12],
                },
                '&:active': {
                  transform: 'translateY(-1px) scale(0.98)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                // Enhanced mobile styling
                ...(isMobile && {
                  width: 48,
                  height: 48,
                  '& .MuiSvgIcon-root': {
                    fontSize: '1.2rem',
                  },
                }),
                // Responsive positioning adjustments
                ...(isSmallMobile && {
                  bottom: 12,
                  right: 12,
                  width: 44,
                  height: 44,
                }),
              }}
              aria-label="Lên đầu trang"
            >
              <KeyboardArrowUp />
            </Fab>
          </Zoom>
        )}

        {/* Scroll indicator (optional enhancement) */}
        {enableTransitions && (
          <Box
            sx={{
              position: 'fixed',
              top: showHeader ? 64 : 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, ${
                theme.palette.primary.main
              } ${Math.min(trigger ? 100 : 0, 100)}%, transparent 0%)`,
              zIndex: theme.zIndex.tooltip,
              transition: 'all 0.1s ease',
              opacity: trigger ? 1 : 0,
            }}
          />
        )}
      </Box>
    </>
  );
};

export default WSLayout;
