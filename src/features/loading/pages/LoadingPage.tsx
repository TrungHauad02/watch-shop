import { Box, Typography, Container } from '@mui/material';
import { WSLoading } from '@/components';
import { ALPHA_COLORS, COLORS, GRADIENT_COLORS } from '@/styles/colors';

interface LoadingPageProps {
  /**
   * Message hiển thị dưới loading
   */
  message?: string;

  /**
   * Variant của loading
   */
  variant?: 'circular' | 'dots' | 'pulse';

  /**
   * Kích thước loading
   */
  size?: 'medium' | 'large' | 'xlarge';

  /**
   * Hiển thị logo brand
   */
  showLogo?: boolean;

  /**
   * Custom logo URL
   */
  logoUrl?: string;
}

// CUSTOMIZE: LoadingPage với thiết kế luxury phù hợp WatchStore
export default function LoadingPage({
  message = 'Đang tải trang...',
  variant = 'circular',
  size = 'large',
  showLogo = true,
  logoUrl,
}: LoadingPageProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.cream} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        // CUSTOMIZE: Background pattern cho luxury feel
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, ${ALPHA_COLORS.primaryAlpha10} 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, ${ALPHA_COLORS.secondaryAlpha15} 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, ${COLORS.gold100} 0%, transparent 50%)`,
          opacity: 0.3,
        },
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            py: 4,
          }}
        >
          {/* Logo Section - CUSTOMIZE: Có thể thay đổi logo */}
          {showLogo && (
            <Box
              sx={{
                mb: 4,
                p: 3,
                borderRadius: '50%',
                background: GRADIENT_COLORS.luxuryGradient,
                boxShadow: `0 8px 32px ${COLORS.gold500}40`,
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.05)' },
                },
              }}
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="WatchStore Logo"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: COLORS.primary,
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }}
                >
                  ⌚
                </Box>
              )}
            </Box>
          )}

          {/* Brand Name - CUSTOMIZE: Có thể thay đổi tên brand */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              background: GRADIENT_COLORS.luxuryGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 1,
              letterSpacing: '0.5px',
            }}
          >
            WatchStore
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: COLORS.textSecondary,
              mb: 4,
              fontWeight: 400,
            }}
          >
            Luxury Timepieces Collection
          </Typography>

          {/* Loading Component */}
          <Box sx={{ mb: 3 }}>
            <WSLoading variant={variant} size={size} color="luxury" />
          </Box>

          {/* Loading Message - CUSTOMIZE: Có thể thay đổi style text */}
          <Typography
            variant="body1"
            sx={{
              color: COLORS.textSecondary,
              fontWeight: 500,
              opacity: 0.8,
              animation: 'fadeInOut 2s ease-in-out infinite',
              '@keyframes fadeInOut': {
                '0%, 100%': { opacity: 0.8 },
                '50%': { opacity: 1 },
              },
            }}
          >
            {message}
          </Typography>

          {/* Subtle progress indicator */}
          <Box
            sx={{
              mt: 4,
              width: '200px',
              height: '2px',
              backgroundColor: COLORS.gray200,
              borderRadius: '1px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                height: '100%',
                background: GRADIENT_COLORS.luxuryGradient,
                borderRadius: '1px',
                animation: 'loading 2s ease-in-out infinite',
                '@keyframes loading': {
                  '0%': { width: '0%', marginLeft: '0%' },
                  '50%': { width: '60%', marginLeft: '20%' },
                  '100%': { width: '0%', marginLeft: '100%' },
                },
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
