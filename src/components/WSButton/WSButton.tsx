import { useState, useCallback } from 'react';
import { WSButtonProps, WS_BUTTON_DEFAULTS } from './WSButton.types';
import { StyledWSButton, LoadingSpinner, IconWrapper } from './WSButton.styles';

// ==============================================
// WSButton COMPONENT - SIMPLIFIED
// ==============================================

// CUSTOMIZE: Bạn có thể chỉnh sửa variant (contained, outlined, text),
// size (small, medium, large), color (primary, secondary, success, warning, error, info) để tùy chỉnh button
export default function WSButton({
  // Core styling props
  variant = WS_BUTTON_DEFAULTS.variant,
  color = WS_BUTTON_DEFAULTS.color,
  size = WS_BUTTON_DEFAULTS.size,

  // Content
  children,

  // Icons
  startIcon,
  endIcon,

  // Loading state
  loading = WS_BUTTON_DEFAULTS.loading,
  loadingText,

  // Enhanced features
  fullWidth = WS_BUTTON_DEFAULTS.fullWidth,
  disabled = WS_BUTTON_DEFAULTS.disabled,

  // Custom styling
  sx,
  className,

  // Accessibility
  ariaLabel,

  // Event handlers
  onClick,

  // Form integration
  type = WS_BUTTON_DEFAULTS.type,

  // Advanced props
  component,
  href,
  target,

  // Forward all other props
  ...otherProps
}: WSButtonProps) {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [isInternalLoading, setIsInternalLoading] = useState(false);

  // Determine final loading state
  const isLoading = loading || isInternalLoading;

  // Determine if button should be disabled
  const isDisabled = disabled || isLoading;

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const handleClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled || isLoading) {
        event.preventDefault();
        return;
      }

      try {
        if (onClick) {
          const result = onClick(event);

          // Check if result is a promise
          if (result && typeof result === 'object' && 'then' in result) {
            setIsInternalLoading(true);
            await (result as Promise<void>);
          }
        }
      } catch (error) {
        console.error('WSButton onClick error:', error);
      } finally {
        setIsInternalLoading(false);
      }
    },
    [onClick, isDisabled, isLoading]
  );

  // ==============================================
  // CONTENT RENDERING
  // ==============================================

  const renderStartIcon = () => {
    if (isLoading) {
      return <LoadingSpinner wsSize={size} size="small" />;
    }

    if (startIcon) {
      return (
        <IconWrapper position="start" wsSize={size}>
          {startIcon}
        </IconWrapper>
      );
    }

    return null;
  };

  const renderEndIcon = () => {
    if (endIcon && !isLoading) {
      return (
        <IconWrapper position="end" wsSize={size}>
          {endIcon}
        </IconWrapper>
      );
    }

    return null;
  };

  const renderContent = () => {
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
    'aria-label': ariaLabel,
    'aria-disabled': isDisabled,
    'aria-busy': isLoading,
    ...(isLoading && { 'aria-live': 'polite' as const }),
  };

  // ==============================================
  // COMPONENT PROPS
  // ==============================================

  const componentProps = {
    // Link props
    ...(href && {
      href,
      target,
      rel: target === '_blank' ? 'noopener noreferrer' : undefined,
      component: component || 'a',
    }),

    // Form props
    type,
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <StyledWSButton
      // Custom styling props
      wsVariant={variant}
      wsColor={color}
      wsSize={size}
      loading={isLoading}
      // MUI Button props
      fullWidth={fullWidth}
      disabled={isDisabled}
      // Event handlers
      onClick={handleClick}
      // Styling
      {...(sx && { sx })}
      {...(className && { className })}
      // Accessibility
      {...accessibilityProps}
      // Component and link props
      {...componentProps}
      // Forward other props
      {...otherProps}
    >
      {renderContent()}
    </StyledWSButton>
  );
}
