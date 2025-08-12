import React, { forwardRef, useState, useCallback } from 'react';
import {
  WSButtonProps,
  WSButtonRef,
  WS_BUTTON_DEFAULTS,
} from './WSButton.types';
import {
  StyledWSButton,
  LoadingIndicator,
  IconWrapper,
  ButtonContent,
  LoadingOverlay,
} from './WSButton.styles';

// ==============================================
// WSButton COMPONENT
// ==============================================

const WSButton = forwardRef<WSButtonRef, WSButtonProps>(
  (
    {
      // Core props
      variant = WS_BUTTON_DEFAULTS.variant,
      color = WS_BUTTON_DEFAULTS.color,
      size = WS_BUTTON_DEFAULTS.size,
      shape = WS_BUTTON_DEFAULTS.shape,

      // Content
      children,

      // Icons
      startIcon,
      endIcon,
      // iconSize - removed unused prop

      // Loading configuration
      loading = false,
      loadingText,
      loadingPosition = WS_BUTTON_DEFAULTS.loadingPosition,
      preserveWidth = WS_BUTTON_DEFAULTS.preserveWidth,

      // Styling and animation
      animate = WS_BUTTON_DEFAULTS.animate,
      hoverEffect = WS_BUTTON_DEFAULTS.hoverEffect,
      fullWidth = false,
      disabled = false,
      disableElevation = false,
      disableRipple = false,

      // Accessibility
      ariaLabel,
      ariaDescribedBy,

      // Event handlers
      onClick,
      onFocus,
      onBlur,

      // Form props
      type = 'button',
      form,

      // Advanced props
      component,
      href,
      target,
      rel,

      // Style props
      sx,
      className,

      // Forward all other props to MUI Button
      ...otherProps
    },
    ref
  ) => {
    // ==============================================
    // STATE MANAGEMENT
    // ==============================================

    const [isInternalLoading, setIsInternalLoading] = useState(false);
    // const [isPressed, setIsPressed] = useState(false); // TODO: Reserved for future use

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

        // setIsPressed(true); // TODO: Reserved for future use

        try {
          // If onClick returns a promise, handle loading state
          if (onClick) {
            const result = onClick(event);

            // Check if result is a promise
            if (
              result !== undefined &&
              result !== null &&
              typeof result === 'object' &&
              'then' in result
            ) {
              setIsInternalLoading(true);
              await (result as Promise<void>);
            }
          }
        } catch (error) {
          console.error('WSButton onClick error:', error);
        } finally {
          setIsInternalLoading(false);
          // setIsPressed(false); // TODO: Reserved for future use
        }
      },
      [onClick, isDisabled, isLoading]
    );

    const handleFocus = useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (event: React.FocusEvent<HTMLButtonElement>) => {
        onBlur?.(event);
        // setIsPressed(false); // TODO: Reserved for future use
      },
      [onBlur]
    );

    // ==============================================
    // CONTENT RENDERING
    // ==============================================

    const renderStartIcon = () => {
      if (isLoading && loadingPosition === 'start') {
        return (
          <LoadingIndicator size={size} position="start">
            <div className="WSButton-loadingSpinner" />
          </LoadingIndicator>
        );
      }

      if (startIcon && !isLoading) {
        return (
          <IconWrapper
            size={size}
            position="start"
            className="WSButton-startIcon"
          >
            {startIcon}
          </IconWrapper>
        );
      }

      return null;
    };

    const renderEndIcon = () => {
      if (isLoading && loadingPosition === 'end') {
        return (
          <LoadingIndicator size={size} position="end">
            <div className="WSButton-loadingSpinner" />
          </LoadingIndicator>
        );
      }

      if (endIcon && !isLoading) {
        return (
          <IconWrapper size={size} position="end" className="WSButton-endIcon">
            {endIcon}
          </IconWrapper>
        );
      }

      return null;
    };

    const renderButtonContent = () => {
      // Display loading text if provided and loading
      const displayText = isLoading && loadingText ? loadingText : children;

      // For circular buttons, don't show text, only icons
      if (shape === 'circular') {
        return null;
      }

      return (
        <ButtonContent
          loading={isLoading && loadingPosition === 'center'}
          preserveWidth={preserveWidth}
        >
          {renderStartIcon()}
          {displayText}
          {renderEndIcon()}
        </ButtonContent>
      );
    };

    const renderCenterLoading = () => {
      if (isLoading && loadingPosition === 'center') {
        return (
          <LoadingOverlay loading={isLoading}>
            <div className="WSButton-loadingSpinner" />
          </LoadingOverlay>
        );
      }

      return null;
    };

    // ==============================================
    // ACCESSIBILITY PROPS
    // ==============================================

    const accessibilityProps = {
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescribedBy,
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
        rel: rel || (target === '_blank' ? 'noopener noreferrer' : undefined),
        component: component || 'a',
      }),

      // Form props
      type,
      form,
    };

    // ==============================================
    // RENDER COMPONENT
    // ==============================================

    return (
      <StyledWSButton
        ref={ref}
        // Custom styling props
        wsVariant={variant}
        wsColor={color}
        wsSize={size}
        wsShape={shape}
        animate={animate}
        hoverEffect={hoverEffect}
        loading={isLoading}
        // MUI Button props
        fullWidth={fullWidth}
        disabled={isDisabled}
        disableElevation={disableElevation}
        disableRipple={disableRipple}
        // Event handlers
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
        {/* Button content with conditional loading */}
        {renderButtonContent()}

        {/* Center loading overlay */}
        {renderCenterLoading()}

        {/* Circular button content (icon only) */}
        {shape === 'circular' && !isLoading && (startIcon || endIcon)}

        {/* Circular button loading */}
        {shape === 'circular' && isLoading && (
          <div className="WSButton-loadingSpinner" />
        )}
      </StyledWSButton>
    );
  }
);

// ==============================================
// COMPONENT DISPLAY NAME
// ==============================================

WSButton.displayName = 'WSButton';

// ==============================================
// EXPORT COMPONENT
// ==============================================

export default WSButton;
