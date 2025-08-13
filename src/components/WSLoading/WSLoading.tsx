import { Portal, Typography } from '@mui/material';
import { WSLoadingProps, WS_LOADING_DEFAULTS } from './WSLoading.types';
import {
  LoadingContainer,
  Spinner,
  Dots,
  Pulse,
  StyledCircularProgress,
  StyledLinearProgress,
  LoadingMessage,
} from './WSLoading.styles';

// ==============================================
// WS LOADING COMPONENT - SIMPLIFIED
// ==============================================

// CUSTOMIZE: Bạn có thể chỉnh sửa variant (spinner, dots, pulse, circular, linear),
// size (small, medium, large), color (primary, secondary, success, warning, error, info) để tùy chỉnh loading
export default function WSLoading({
  // Core styling props
  variant = WS_LOADING_DEFAULTS.variant,
  size = WS_LOADING_DEFAULTS.size,
  color = WS_LOADING_DEFAULTS.color,

  // Content and messaging
  loading = WS_LOADING_DEFAULTS.loading,
  message,
  children,

  // Progress indication
  progress,

  // Sizing
  width,
  height,

  // Visibility and overlay
  fullScreen = WS_LOADING_DEFAULTS.fullScreen,
  backdrop = WS_LOADING_DEFAULTS.backdrop,

  // Custom styling
  sx,
  className,

  // Accessibility
  ariaLabel,

  // Forward all other props
  ...otherProps
}: WSLoadingProps) {
  // ==============================================
  // RENDER HELPERS
  // ==============================================

  const renderLoadingIndicator = () => {
    const sizeValue = size === 'small' ? 20 : size === 'medium' ? 32 : 48;

    switch (variant) {
      case 'spinner':
        return <Spinner wsSize={size} wsColor={color} />;

      case 'dots':
        return (
          <Dots wsSize={size} wsColor={color}>
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
          </Dots>
        );

      case 'pulse':
        return <Pulse wsSize={size} wsColor={color} />;

      case 'circular':
        return (
          <StyledCircularProgress
            wsColor={color}
            size={sizeValue}
            thickness={size === 'small' ? 2 : size === 'medium' ? 4 : 6}
            variant={progress !== undefined ? 'determinate' : 'indeterminate'}
            {...(progress !== undefined && { value: progress })}
          />
        );

      case 'linear':
        return (
          <StyledLinearProgress
            wsColor={color}
            variant={progress !== undefined ? 'determinate' : 'indeterminate'}
            {...(progress !== undefined && { value: progress })}
            sx={{
              width: width || '200px',
              height: size === 'small' ? 4 : size === 'medium' ? 6 : 8,
              borderRadius: 4,
            }}
          />
        );

      default:
        return <Spinner wsSize={size} wsColor={color} />;
    }
  };

  const renderMessage = () => {
    if (!message) return null;

    return (
      <LoadingMessage wsSize={size}>
        <Typography
          variant={
            size === 'small' ? 'caption' : size === 'large' ? 'h6' : 'body2'
          }
          component="div"
        >
          {message}
        </Typography>
      </LoadingMessage>
    );
  };

  // ==============================================
  // CONDITIONAL RENDERING
  // ==============================================

  if (!loading) {
    return null;
  }

  // ==============================================
  // ACCESSIBILITY PROPS
  // ==============================================

  const accessibilityProps = {
    'aria-label': ariaLabel || (message ? `Loading: ${message}` : 'Loading'),
    'aria-busy': loading,
    'aria-live': 'polite' as const,
    role: 'status',
    ...(progress !== undefined && {
      'aria-valuenow': progress,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
    }),
  };

  // ==============================================
  // CONTAINER STYLES
  // ==============================================

  const containerStyles = {
    ...(width && { width }),
    ...(height && { height }),
    ...(sx && typeof sx === 'object' ? sx : {}),
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  const LoadingComponent = (
    <LoadingContainer
      fullScreen={fullScreen}
      backdrop={backdrop}
      sx={containerStyles}
      {...(className && { className })}
      {...accessibilityProps}
      {...otherProps}
    >
      {renderLoadingIndicator()}
      {renderMessage()}
      {children}
    </LoadingContainer>
  );

  // Handle full screen loading with portal
  if (fullScreen) {
    return <Portal>{LoadingComponent}</Portal>;
  }

  return LoadingComponent;
}
