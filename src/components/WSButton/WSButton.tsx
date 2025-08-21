import { useState, useCallback } from 'react';
import { WSButtonProps, WS_BUTTON_DEFAULTS } from './WSButton.types';
import { StyledWSButton, LoadingSpinner, IconWrapper } from './WSButton.styles';

// ==============================================
// WSButton COMPONENT - THEME INTEGRATED
// ==============================================

/**
 * WSButton - Custom Button Component
 *
 * CUSTOMIZE: Bạn có thể chỉnh sửa:
 * - variant: 'contained' | 'outlined' | 'text'
 * - size: 'small' | 'medium' | 'large'
 * - color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
 *
 * Button sẽ tự động thay đổi màu sắc theo theme (dark/light mode).
 *
 * @example
 * // Basic usage
 * <WSButton>Click me</WSButton>
 *
 * // With loading
 * <WSButton loading>Saving...</WSButton>
 *
 * // With icons
 * <WSButton startIcon={<SaveIcon />} color="success">Save</WSButton>
 *
 * // Async handler (auto loading)
 * <WSButton onClick={async () => await saveData()}>Save</WSButton>
 *
 * // As link
 * <WSButton href="/products" target="_blank">View Products</WSButton>
 */
export default function WSButton({
  // === CORE STYLING PROPS ===
  variant = WS_BUTTON_DEFAULTS.variant, // 🎨 contained | outlined | text
  color = WS_BUTTON_DEFAULTS.color, // 🎨 primary | secondary | success | warning | error | info
  size = WS_BUTTON_DEFAULTS.size, // 📏 small | medium | large

  // === CONTENT ===
  children, // 📝 Button text/content

  // === ICONS ===
  startIcon, // 🎯 Icon bên trái
  endIcon, // 🎯 Icon bên phải

  // === LOADING STATE ===
  loading = WS_BUTTON_DEFAULTS.loading, // 🔄 Loading state
  loadingText, // 📝 Text hiển thị khi loading

  // === ENHANCED FEATURES ===
  fullWidth = WS_BUTTON_DEFAULTS.fullWidth, // 📐 Full width button
  disabled = WS_BUTTON_DEFAULTS.disabled, // 🚫 Disabled state

  // === CUSTOM STYLING ===
  sx, // 🎨 MUI sx prop
  className, // 🎨 CSS class

  // === ACCESSIBILITY ===
  ariaLabel, // ♿ Accessibility label

  // === EVENT HANDLERS ===
  onClick, // 🖱️ Click handler (có thể async)

  // === FORM INTEGRATION ===
  type = WS_BUTTON_DEFAULTS.type, // 📋 button | submit | reset

  // === ADVANCED PROPS ===
  component, // 🔗 Custom component (for links)
  href, // 🔗 URL for link buttons
  target, // 🔗 Link target

  // === FORWARD ALL OTHER PROPS ===
  ...otherProps
}: WSButtonProps) {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [isInternalLoading, setIsInternalLoading] = useState(false);

  // 🔄 Determine final loading state
  const isLoading = loading || isInternalLoading;

  // 🚫 Determine if button should be disabled
  const isDisabled = disabled || isLoading;

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  /**
   * Handle button click with async support
   * Automatically manages loading state for async operations
   */
  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      // 🛑 Prevent action if disabled or loading
      if (isDisabled || isLoading) {
        event.preventDefault();
        return;
      }

      try {
        if (onClick) {
          const result = onClick(event);

          // 🔄 Check if result is a promise (async operation)
          if (result && typeof result === 'object' && 'then' in result) {
            setIsInternalLoading(true);
            await (result as Promise<void>);
          }
        }
      } catch (error) {
        // 🚨 Log errors but don't throw to prevent app crashes
        console.error('WSButton onClick error:', error);
      } finally {
        // 🧹 Always clean up loading state
        setIsInternalLoading(false);
      }
    },
    [onClick, isDisabled, isLoading]
  );

  // ==============================================
  // CONTENT RENDERING - THEME AWARE
  // ==============================================

  /**
   * Render start icon or loading spinner
   */
  const renderStartIcon = () => {
    // 🔄 Show loading spinner instead of icon when loading
    if (isLoading) {
      return (
        <LoadingSpinner
          wsSize={size}
          size={size === 'small' ? 16 : size === 'medium' ? 20 : 24}
          thickness={4}
        />
      );
    }

    // 🎯 Show start icon if provided and not loading
    if (startIcon) {
      return (
        <IconWrapper position="start" wsSize={size}>
          {startIcon}
        </IconWrapper>
      );
    }

    return null;
  };

  /**
   * Render end icon (only when not loading)
   */
  const renderEndIcon = () => {
    // 🎯 Only show end icon if provided and not loading
    if (endIcon && !isLoading) {
      return (
        <IconWrapper position="end" wsSize={size}>
          {endIcon}
        </IconWrapper>
      );
    }

    return null;
  };

  /**
   * Render button content with conditional loading text
   */
  const renderContent = () => {
    // CUSTOMIZE: Bạn có thể chỉnh sửa text hiển thị khi loading tại đây
    // 📝 Show loading text if provided and loading, otherwise show children
    const displayText = isLoading && loadingText ? loadingText : children;

    return (
      <>
        {renderStartIcon()}
        {displayText}
        {renderEndIcon()}
      </>
    );
  };

  // ==============================================
  // ACCESSIBILITY PROPS
  // ==============================================

  const accessibilityProps = {
    'aria-label': ariaLabel, // ♿ Custom aria label
    'aria-disabled': isDisabled, // ♿ Disabled state
    'aria-busy': isLoading, // ♿ Loading state
    ...(isLoading && { 'aria-live': 'polite' as const }), // ♿ Loading announcements
  };

  // ==============================================
  // COMPONENT PROPS
  // ==============================================

  const componentProps = {
    // 🔗 Link props - for button as link
    ...(href && {
      href,
      target,
      rel: target === '_blank' ? 'noopener noreferrer' : undefined,
      component: component || 'a',
    }),

    // 📋 Form props
    type,
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <StyledWSButton
      // === CUSTOM STYLING PROPS ===
      wsVariant={variant}
      wsColor={color}
      wsSize={size}
      loading={isLoading}
      // === MUI BUTTON PROPS ===
      fullWidth={fullWidth}
      disabled={isDisabled}
      // === EVENT HANDLERS ===
      onClick={handleClick}
      // === STYLING ===
      {...(sx && { sx })}
      {...(className && { className })}
      // === ACCESSIBILITY ===
      {...accessibilityProps}
      // === COMPONENT AND LINK PROPS ===
      {...componentProps}
      // === FORWARD OTHER PROPS ===
      {...otherProps}
    >
      {renderContent()}
    </StyledWSButton>
  );
}
