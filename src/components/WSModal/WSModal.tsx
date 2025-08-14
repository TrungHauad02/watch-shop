import { useState, useCallback, useEffect } from 'react';
import { Typography, CircularProgress, useTheme } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import WSButton from '@/components/WSButton';
import {
  WSModalProps,
  WSModalAction,
  WS_MODAL_DEFAULTS,
} from './WSModal.types';
import {
  StyledWSModal,
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalFooter,
  CloseButton,
  LoadingOverlay,
  ModalActionGroup,
} from './WSModal.styles';

// ==============================================
// WSModal COMPONENT - THEME INTEGRATED
// ==============================================

// CUSTOMIZE: Bạn có thể chỉnh sửa size (small, medium, large, fullscreen),
// variant (default, confirmation, form), và actions để tùy chỉnh modal.
// Modal sẽ tự động thay đổi màu sắc theo theme (dark/light mode).
export default function WSModal({
  // Core styling props
  size = WS_MODAL_DEFAULTS.size,
  variant = WS_MODAL_DEFAULTS.variant,

  // Content
  children,
  title,
  subtitle,
  content,

  // Actions
  actions = [],
  showCloseButton = WS_MODAL_DEFAULTS.showCloseButton,

  // Enhanced features
  loading = WS_MODAL_DEFAULTS.loading,
  closable = WS_MODAL_DEFAULTS.closable,

  // Modal state
  open = WS_MODAL_DEFAULTS.open,

  // Event handlers
  onClose,

  // Custom styling
  sx,
  className,
  contentSx,
  headerSx,
  footerSx,

  // Accessibility
  ariaLabel,
  ariaDescribedBy,

  // Forward all other props
  ...otherProps
}: WSModalProps) {
  // ==============================================
  // THEME INTEGRATION
  // ==============================================

  const theme = useTheme();

  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [actionLoadingStates, setActionLoadingStates] = useState<
    Record<number, boolean>
  >({});

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  // Handle modal close (for backdrop/escape)
  const handleModalClose = useCallback(() => {
    if (closable && onClose) {
      onClose();
    }
  }, [closable, onClose]);

  // Handle close button click
  const handleClose = useCallback(() => {
    if (closable && onClose) {
      onClose();
    }
  }, [closable, onClose]);

  const handleActionClick = useCallback(
    async (action: WSModalAction, index: number) => {
      if (!action) return;

      try {
        // Set loading state for this specific action
        if (!action.loading) {
          setActionLoadingStates((prev) => ({ ...prev, [index]: true }));
        }

        // Execute action
        const result = action.onClick();

        // Handle async actions
        if (result && typeof result === 'object' && 'then' in result) {
          await (result as Promise<void>);
        }

        // Auto close if specified
        if (action.autoClose !== false && onClose) {
          onClose();
        }
      } catch (error) {
        console.error('WSModal action error:', error);
      } finally {
        // Clear loading state
        if (!action.loading) {
          setActionLoadingStates((prev) => ({ ...prev, [index]: false }));
        }
      }
    },
    [onClose]
  );

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closable && open) {
        handleClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }

    return undefined;
  }, [open, closable, handleClose]);

  // Focus management
  useEffect(() => {
    if (open) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [open]);

  // ==============================================
  // RENDER HELPERS - THEME AWARE
  // ==============================================

  const renderHeader = () => {
    if (!title && !subtitle && !showCloseButton) return null;

    return (
      <ModalHeader wsSize={size} {...(headerSx && { sx: headerSx })}>
        {(title || subtitle) && (
          <div>
            {title && (
              <Typography
                variant={
                  size === 'small' ? 'h6' : size === 'large' ? 'h4' : 'h5'
                }
                className="modal-title"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightBold || 600,
                }}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant={size === 'small' ? 'body2' : 'body1'}
                className="modal-subtitle"
                sx={{
                  color: theme.palette.text.secondary,
                  mt: 0.5,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </div>
        )}

        {showCloseButton && closable && (
          <CloseButton
            onClick={handleClose}
            aria-label="Đóng modal"
            size="small"
          >
            <CloseIcon />
          </CloseButton>
        )}
      </ModalHeader>
    );
  };

  const renderContent = () => {
    // If children provided, render them directly
    if (children) {
      return (
        <ModalContent wsSize={size} {...(contentSx && { sx: contentSx })}>
          {children}
        </ModalContent>
      );
    }

    // Render content prop
    if (content) {
      return (
        <ModalContent wsSize={size} {...(contentSx && { sx: contentSx })}>
          {typeof content === 'string' ? (
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                lineHeight: 1.6,
              }}
            >
              {content}
            </Typography>
          ) : (
            content
          )}
        </ModalContent>
      );
    }

    return null;
  };

  const renderFooter = () => {
    if (actions.length === 0) return null;

    return (
      <ModalFooter wsSize={size} {...(footerSx && { sx: footerSx })}>
        <ModalActionGroup>
          {actions.map((action, index) => {
            // CUSTOMIZE: Bạn có thể chỉnh sửa button styling trong actions tại đây
            const buttonVariant =
              action.variant ||
              (action.color === 'error' ? 'outlined' : 'contained');

            const buttonColor = action.color || 'primary';

            return (
              <WSButton
                key={index}
                variant={buttonVariant}
                color={buttonColor}
                size={size === 'small' ? 'small' : 'medium'}
                onClick={() => handleActionClick(action, index)}
                disabled={action.disabled || loading}
                loading={action.loading || actionLoadingStates[index] || false}
                startIcon={action.startIcon}
                sx={{
                  minWidth: size === 'small' ? '80px' : '100px',
                  ...action.sx,
                }}
              >
                {action.label}
              </WSButton>
            );
          })}
        </ModalActionGroup>
      </ModalFooter>
    );
  };

  const renderLoadingOverlay = () => {
    if (!loading) return null;

    return (
      <LoadingOverlay>
        <CircularProgress
          size={40}
          sx={{
            color: theme.palette.primary.main,
          }}
        />
      </LoadingOverlay>
    );
  };

  // ==============================================
  // ACCESSIBILITY PROPS
  // ==============================================

  const accessibilityProps = {
    'aria-label': ariaLabel || title || 'Modal dialog',
    'aria-describedby': ariaDescribedBy,
    'aria-modal': true,
    role: 'dialog',
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <StyledWSModal
      open={open}
      {...(closable && onClose && { onClose: handleModalClose })}
      closeAfterTransition
      {...(sx && { sx })}
      {...(className && { className })}
      {...(otherProps.style !== undefined && { style: otherProps.style })}
      {...Object.fromEntries(
        Object.entries(otherProps).filter(([key]) => key !== 'style')
      )}
    >
      <ModalContainer
        wsSize={size}
        wsVariant={variant}
        {...accessibilityProps}
        tabIndex={-1}
        sx={{
          // CUSTOMIZE: Bạn có thể override styles tại đây
          ...sx,
        }}
      >
        {/* Header */}
        {renderHeader()}

        {/* Content */}
        {renderContent()}

        {/* Footer */}
        {renderFooter()}

        {/* Loading overlay */}
        {renderLoadingOverlay()}
      </ModalContainer>
    </StyledWSModal>
  );
}
