import {
  Modal,
  Box,
  Typography,
  IconButton,
  Backdrop,
  Fade,
  useMediaQuery,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { WSModalProps } from './WSModal.types';
import {
  getModalVariantStyles,
  getModalSizes,
  getBackdropStyles,
  getHeaderStyles,
  getContentStyles,
  getFooterStyles,
} from './WSModal.styles';
import { COLORS } from '@/styles/colors';
import WSLoading from '../WSLoading';

export default function WSModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  size = 'medium',
  variant = 'default',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  actions,
  actionsAlignment = 'flex-end',
  disablePadding = false,
  disableScrollLock = false,
  className,
  sx,
  loading = false,
  disableAnimation = false,
  zIndex = 1300,
}: WSModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // CUSTOMIZE: Bạn có thể chỉnh sửa responsive behavior tại đây
  const responsiveSize =
    isMobile && size !== 'fullscreen' ? 'fullscreen' : size;
  const modalSizes = getModalSizes(responsiveSize);
  const modalStyles = getModalVariantStyles(theme, variant);
  const backdropStyles = getBackdropStyles(theme);

  // CUSTOMIZE: Bạn có thể chỉnh sửa keyboard handling tại đây
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape && open) {
        onClose(event);
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);

      // Disable body scroll
      if (!disableScrollLock) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (!disableScrollLock) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [open, closeOnEscape, onClose, disableScrollLock]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick) {
      onClose(event);
    }
  };

  const handleCloseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose(event);
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        // Only close if allowed by props
        if (
          (reason === 'backdropClick' && closeOnBackdropClick) ||
          (reason === 'escapeKeyDown' && closeOnEscape)
        ) {
          onClose(event as unknown as React.MouseEvent);
        }
      }}
      closeAfterTransition
      disableScrollLock={disableScrollLock}
      sx={{ zIndex }}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          sx: backdropStyles,
          onClick: handleBackdropClick,
          timeout: disableAnimation ? 0 : 500,
        },
      }}
    >
      <Fade in={open} timeout={disableAnimation ? 0 : 300}>
        <Box
          className={className}
          sx={{
            ...modalStyles,
            width: isMobile ? '95vw' : 'auto',
            maxWidth: modalSizes.maxWidth,
            minHeight: modalSizes.minHeight,
            ...sx,
          }}
        >
          {/* Header */}
          {(title || subtitle || showCloseButton) && (
            <Box sx={getHeaderStyles(theme, variant)}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ flex: 1, pr: showCloseButton ? 2 : 0 }}>
                  {title && (
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        fontWeight: 600,
                        color: COLORS.primary,
                        mb: subtitle ? 0.5 : 0,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' },
                        lineHeight: 1.3,
                        // CUSTOMIZE: Bạn có thể chỉnh sửa style của title tại đây
                        ...(variant === 'luxury' && {
                          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.gold600})`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }),
                      }}
                    >
                      {title}
                    </Typography>
                  )}

                  {subtitle && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: COLORS.gray600,
                        fontSize: '0.875rem',
                        lineHeight: 1.5,
                        // CUSTOMIZE: Bạn có thể chỉnh sửa style của subtitle tại đây
                      }}
                    >
                      {subtitle}
                    </Typography>
                  )}
                </Box>

                {showCloseButton && (
                  <IconButton
                    onClick={handleCloseClick}
                    size="small"
                    sx={{
                      color: COLORS.gray500,
                      backgroundColor: 'transparent',
                      borderRadius: 1,
                      p: 1,
                      // CUSTOMIZE: Bạn có thể chỉnh sửa style của close button tại đây
                      '&:hover': {
                        backgroundColor: COLORS.gray100,
                        color: COLORS.gray700,
                      },
                      '&:focus-visible': {
                        outline: `2px solid ${COLORS.primary}`,
                        outlineOffset: '2px',
                      },
                    }}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                )}
              </Box>
            </Box>
          )}

          {/* Content */}
          <Box sx={getContentStyles(theme, disablePadding)}>
            {loading ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: theme.spacing(20),
                }}
              >
                <WSLoading
                  variant="pulse"
                  color={variant === 'luxury' ? 'luxury' : 'primary'}
                  size="large"
                  text="Đang tải..."
                />
              </Box>
            ) : (
              children
            )}
          </Box>

          {/* Footer Actions */}
          {actions && !loading && (
            <Box sx={getFooterStyles(theme, actionsAlignment)}>{actions}</Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
