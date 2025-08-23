import { useState, useCallback, useEffect } from 'react';
import { Typography, CircularProgress, useTheme } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { WSButton } from '@/components';
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
// WSModal COMPONENT - ENHANCED & THEME INTEGRATED
// ==============================================

/**
 * WSModal - Flexible Modal Dialog Component
 *
 * CUSTOMIZE: Bạn có thể chỉnh sửa:
 * - size: 'small' | 'medium' | 'large' | 'fullscreen'
 * - variant: 'default' | 'confirmation' | 'form'
 * - animations: Smooth slide-in with blur backdrop
 * - actions: Button array với async support
 *
 * Modal tự động responsive và thay đổi theo theme (dark/light mode).
 *
 * @example
 * // Basic modal
 * <WSModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Xác nhận"
 *   content="Bạn có chắc chắn muốn thực hiện hành động này?"
 * />
 *
 * // Confirmation modal với actions
 * <WSModal
 *   open={showConfirm}
 *   onClose={() => setShowConfirm(false)}
 *   variant="confirmation"
 *   title="Xóa sản phẩm"
 *   subtitle="Hành động này không thể hoàn tác"
 *   content="Sản phẩm sẽ bị xóa vĩnh viễn khỏi hệ thống."
 *   actions={[
 *     {
 *       label: "Hủy",
 *       onClick: () => setShowConfirm(false),
 *       variant: "outlined"
 *     },
 *     {
 *       label: "Xóa",
 *       onClick: async () => await deleteProduct(),
 *       color: "error",
 *       autoClose: true
 *     }
 *   ]}
 * />
 *
 * // Form modal với custom content
 * <WSModal
 *   open={showForm}
 *   onClose={() => setShowForm(false)}
 *   variant="form"
 *   size="large"
 *   title="Thêm sản phẩm mới"
 * >
 *   <ProductForm onSubmit={handleSubmit} />
 * </WSModal>
 */
export default function WSModal({
  // === CORE STYLING PROPS ===
  size = WS_MODAL_DEFAULTS.size, // 📏 small | medium | large | fullscreen
  variant = WS_MODAL_DEFAULTS.variant, // 🎨 default | confirmation | form

  // === CONTENT ===
  children, // 🔧 Custom content component
  title, // 📝 Modal title
  subtitle, // 📝 Modal subtitle
  content, // 📝 Content text hoặc ReactNode

  // === ACTIONS ===
  actions = WS_MODAL_DEFAULTS.actions, // 🎬 Array of action buttons
  showCloseButton = WS_MODAL_DEFAULTS.showCloseButton, // ❌ Show X button

  // === ENHANCED FEATURES ===
  loading = WS_MODAL_DEFAULTS.loading, // 🔄 Loading overlay
  closable = WS_MODAL_DEFAULTS.closable, // 🚪 Can be closed

  // === MODAL STATE ===
  open = WS_MODAL_DEFAULTS.open, // 👁️ Modal visibility

  // === EVENT HANDLERS ===
  onClose, // 🚪 Close handler

  // === CUSTOM STYLING ===
  sx, // 🎨 Container styles
  className, // 🎨 CSS class
  contentSx, // 🎨 Content area styles
  headerSx, // 🎨 Header area styles
  footerSx, // 🎨 Footer area styles

  // === ACCESSIBILITY ===
  ariaLabel, // ♿ Accessibility label
  ariaDescribedBy, // ♿ Accessibility description

  // === FORWARD OTHER PROPS ===
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

  /**
   * Handle modal close from backdrop or escape key
   */
  const handleModalClose = useCallback(
    (_event: unknown, reason: 'backdropClick' | 'escapeKeyDown') => {
      // 🚪 Only close if modal is closable
      if (closable && onClose) {
        // 📝 Optional: Different behavior based on close reason
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          onClose();
        }
      }
    },
    [closable, onClose]
  );

  /**
   * Handle close button click
   */
  const handleCloseButtonClick = useCallback(() => {
    if (closable && onClose) {
      onClose();
    }
  }, [closable, onClose]);

  /**
   * Handle action button click with loading state management
   */
  const handleActionClick = useCallback(
    async (action: WSModalAction, index: number) => {
      if (!action || action.disabled) return;

      try {
        // 🔄 Set loading state for this specific action
        if (!action.loading) {
          setActionLoadingStates((prev) => ({ ...prev, [index]: true }));
        }

        // 🚀 Execute action
        const result = action.onClick();

        // 🔄 Handle async actions
        if (result && typeof result === 'object' && 'then' in result) {
          await (result as Promise<void>);
        }

        // 🚪 Auto close if specified (default: true)
        if (action.autoClose !== false && onClose) {
          onClose();
        }
      } catch (error) {
        // 🚨 Log errors but don't crash the modal
        console.error('WSModal action error:', error);
        // TODO: Có thể show error toast ở đây
      } finally {
        // 🧹 Clear loading state
        if (!action.loading) {
          setActionLoadingStates((prev) => ({ ...prev, [index]: false }));
        }
      }
    },
    [onClose]
  );

  // ==============================================
  // LIFECYCLE EFFECTS
  // ==============================================

  /**
   * Handle escape key press
   */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closable && open && onClose) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }

    return undefined;
  }, [open, closable, onClose]);

  /**
   * Prevent body scroll when modal is open
   */
  useEffect(() => {
    if (open) {
      // 🔒 Lock body scroll
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        // 🔓 Restore original overflow
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // ==============================================
  // RENDER HELPERS - THEME AWARE
  // ==============================================

  /**
   * Render modal header with title, subtitle, and close button
   */
  const renderHeader = () => {
    if (!title && !subtitle && !showCloseButton) return null;

    // Build header props safely
    const headerProps = {
      wsSize: size,
      ...(headerSx && { sx: headerSx }),
    };

    return (
      <ModalHeader {...headerProps}>
        {/* 📝 TITLE & SUBTITLE SECTION */}
        {(title || subtitle) && (
          <div style={{ flex: 1 }}>
            {title && (
              <Typography
                component="h2"
                variant={
                  size === 'small' ? 'h6' : size === 'large' ? 'h4' : 'h5'
                }
                className="modal-title"
                sx={{
                  // CUSTOMIZE: Title styling
                  color: theme.palette.text.primary,
                  fontWeight: theme.typography.fontWeightBold || 700,
                  margin: 0,
                  lineHeight: 1.3,
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
                  // CUSTOMIZE: Subtitle styling
                  color: theme.palette.text.secondary,
                  marginTop: theme.spacing(0.5),
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </div>
        )}

        {/* ❌ CLOSE BUTTON */}
        {showCloseButton && closable && (
          <CloseButton
            onClick={handleCloseButtonClick}
            aria-label="Đóng modal"
            size="small"
            disabled={loading}
          >
            <CloseIcon fontSize="small" />
          </CloseButton>
        )}
      </ModalHeader>
    );
  };

  /**
   * Render modal content area
   */
  const renderContent = () => {
    // 🔧 CUSTOM CHILDREN: Render custom component if provided
    if (children) {
      // Build content props safely
      const contentProps = {
        wsSize: size,
        ...(contentSx && { sx: contentSx }),
      };

      return <ModalContent {...contentProps}>{children}</ModalContent>;
    }

    // 📝 CONTENT PROP: Render string or ReactNode content
    if (content) {
      // Build content props safely
      const contentProps = {
        wsSize: size,
        ...(contentSx && { sx: contentSx }),
      };

      return (
        <ModalContent {...contentProps}>
          {typeof content === 'string' ? (
            <Typography
              variant="body1"
              sx={{
                // CUSTOMIZE: Content text styling
                color: theme.palette.text.primary,
                lineHeight: 1.6,
                margin: 0,
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

  /**
   * Render modal footer with action buttons
   */
  const renderFooter = () => {
    if (!actions || actions.length === 0) return null;

    return (
      <ModalFooter wsSize={size} {...(footerSx && { sx: footerSx })}>
        <ModalActionGroup>
          {actions.map((action, index) => {
            // 🎨 BUTTON VARIANT: Smart defaults based on action
            const buttonVariant =
              action.variant ||
              (action.color === 'error' ? 'outlined' : 'contained');

            // 🎨 BUTTON COLOR: Default to primary
            const buttonColor = action.color || 'primary';

            // 🔄 LOADING STATE: Individual or global loading
            const isActionLoading =
              action.loading || actionLoadingStates[index] || loading;

            return (
              <WSButton
                key={`modal-action-${index}`}
                variant={buttonVariant}
                color={buttonColor}
                size={size === 'small' ? 'small' : 'medium'}
                onClick={() => handleActionClick(action, index)}
                disabled={action.disabled || loading}
                loading={isActionLoading}
                startIcon={action.startIcon}
                sx={{
                  // CUSTOMIZE: Action button styling
                  minWidth: size === 'small' ? '80px' : '120px',

                  // 📱 Mobile: Full width buttons
                  [theme.breakpoints.down('sm')]: {
                    width: '100%',
                  },

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

  /**
   * Render loading overlay when modal is in loading state
   */
  const renderLoadingOverlay = () => {
    if (!loading) return null;

    return (
      <LoadingOverlay>
        <CircularProgress
          size={size === 'small' ? 32 : 48}
          thickness={4}
          sx={{
            // CUSTOMIZE: Loading spinner styling
            color: theme.palette.primary.main,
          }}
        />
      </LoadingOverlay>
    );
  };

  // ==============================================
  // ACCESSIBILITY CONFIGURATION
  // ==============================================

  const accessibilityProps = {
    'aria-label': ariaLabel || title || 'Modal dialog',
    'aria-describedby': ariaDescribedBy,
    'aria-modal': true,
    role: 'dialog',
    // 🎯 Focus management
    tabIndex: -1,
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <StyledWSModal
      open={open}
      {...(closable && { onClose: handleModalClose })}
      closeAfterTransition
      disableEscapeKeyDown={!closable}
      {...(sx && { sx })}
      {...(className && { className })}
      {...otherProps}
    >
      <ModalContainer
        wsSize={size}
        wsVariant={variant}
        {...accessibilityProps}
        sx={{
          // === CUSTOM STYLING OVERRIDES ===
          // CUSTOMIZE: Bạn có thể override container styles tại đây

          // 🎨 Theme integration
          backgroundColor: theme.palette.background.paper,

          // 🌙 Dark mode enhancements
          ...(theme.palette.mode === 'dark' && {
            boxShadow: theme.shadows[24], // Deeper shadow in dark mode
          }),

          // 📱 Mobile responsive
          [theme.breakpoints.down('sm')]: {
            margin: 0,
            width: '100%',
            maxWidth: '100%',
          },
        }}
      >
        {/* === MODAL SECTIONS === */}

        {/* 📄 HEADER: Title, subtitle, close button */}
        {renderHeader()}

        {/* 📝 CONTENT: Main modal content */}
        {renderContent()}

        {/* 🎬 FOOTER: Action buttons */}
        {renderFooter()}

        {/* 🔄 LOADING: Overlay when processing */}
        {renderLoadingOverlay()}
      </ModalContainer>
    </StyledWSModal>
  );
}
