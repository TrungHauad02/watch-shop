import { useCallback } from 'react';
import { Typography } from '@mui/material';
import WSButton from '@/components/WSButton';
import { WSCardProps, WS_CARD_DEFAULTS } from './WSCard.types';
import {
  StyledWSCard,
  StyledWSCardHeader,
  StyledWSCardContent,
  StyledWSCardActions,
  StyledWSCardMedia,
  LoadingSkeleton,
} from './WSCard.styles';

// ==============================================
// WS CARD COMPONENT - SIMPLIFIED
// ==============================================

// CUSTOMIZE: Bạn có thể chỉnh sửa variant (elevation, outlined),
// size (small, medium, large), và clickable để tùy chỉnh giao diện card
export default function WSCard({
  // Core styling props
  variant = WS_CARD_DEFAULTS.variant,
  size = WS_CARD_DEFAULTS.size,

  // Content
  children,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imageHeight = WS_CARD_DEFAULTS.imageHeight,

  // Footer configuration
  actions = [],

  // Enhanced features
  clickable = WS_CARD_DEFAULTS.clickable,
  loading = WS_CARD_DEFAULTS.loading,

  // Custom styling
  sx,
  className,

  // Event handlers
  onClick,

  // Accessibility
  ariaLabel,

  // Forward all other props to MUI Card
  ...otherProps
}: WSCardProps) {
  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (loading) {
        event.preventDefault();
        return;
      }

      if (onClick) {
        onClick(event);
      }
    },
    [onClick, loading]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (clickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        handleClick(event as unknown as React.MouseEvent<HTMLElement>);
      }
    },
    [clickable, handleClick]
  );

  // ==============================================
  // RENDER HELPERS
  // ==============================================

  const renderLoadingSkeleton = () => {
    if (!loading) return null;

    return (
      <StyledWSCardContent wsSize={size}>
        {/* Image skeleton */}
        {image && (
          <LoadingSkeleton
            height={imageHeight}
            width="100%"
            style={{ marginBottom: '16px' }}
          />
        )}

        {/* Title skeleton */}
        {title && (
          <LoadingSkeleton
            height="24px"
            width="60%"
            style={{ marginBottom: '8px' }}
          />
        )}

        {/* Subtitle skeleton */}
        {subtitle && (
          <LoadingSkeleton
            height="16px"
            width="40%"
            style={{ marginBottom: '12px' }}
          />
        )}

        {/* Description skeleton */}
        {description && (
          <>
            <LoadingSkeleton height="16px" width="100%" />
            <LoadingSkeleton height="16px" width="80%" />
            <LoadingSkeleton height="16px" width="60%" />
          </>
        )}

        {/* Custom children skeleton */}
        {children && !title && !subtitle && !description && (
          <>
            <LoadingSkeleton height="20px" width="100%" />
            <LoadingSkeleton height="20px" width="70%" />
            <LoadingSkeleton height="20px" width="50%" />
          </>
        )}
      </StyledWSCardContent>
    );
  };

  const renderMedia = () => {
    if (!image || loading) return null;

    return (
      <StyledWSCardMedia
        imageHeight={imageHeight}
        image={image}
        title={imageAlt || title || 'Card image'}
        onError={(e) => {
          // Handle image load error
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    );
  };

  const renderHeader = () => {
    if (loading || (!title && !subtitle)) return null;

    return (
      <StyledWSCardHeader wsSize={size} title={title} subheader={subtitle} />
    );
  };

  const renderContent = () => {
    if (loading) return null;

    // If children provided, render them directly
    if (children) {
      return (
        <StyledWSCardContent wsSize={size}>{children}</StyledWSCardContent>
      );
    }

    // Render description if provided
    if (description) {
      return (
        <StyledWSCardContent wsSize={size}>
          <Typography
            variant="body2"
            className="WSCard-description"
            component="p"
          >
            {description}
          </Typography>
        </StyledWSCardContent>
      );
    }

    return null;
  };

  const renderActions = () => {
    if (loading || actions.length === 0) return null;

    return (
      <StyledWSCardActions wsSize={size}>
        {actions.map((action, index) => (
          <WSButton
            key={index}
            variant={action.variant || 'text'}
            color={action.color || 'primary'}
            size={size === 'large' ? 'medium' : 'small'}
            onClick={action.onClick}
            disabled={action.disabled || false}
            loading={action.loading || false}
            startIcon={action.startIcon}
          >
            {action.label}
          </WSButton>
        ))}
      </StyledWSCardActions>
    );
  };

  // ==============================================
  // ACCESSIBILITY PROPS
  // ==============================================

  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-busy': loading,
    role: clickable ? 'button' : 'article',
    tabIndex: clickable ? 0 : undefined,
    ...(loading && { 'aria-live': 'polite' as const }),
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <StyledWSCard
      // Custom styling props
      wsVariant={variant}
      wsSize={size}
      clickable={clickable}
      loading={loading}
      // Styling
      {...(sx && { sx })}
      {...(className && { className })}
      // Event handlers
      onClick={clickable ? handleClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      // Accessibility
      {...accessibilityProps}
      // Forward other props
      {...otherProps}
    >
      {/* Loading state */}
      {loading && renderLoadingSkeleton()}

      {/* Media content */}
      {!loading && renderMedia()}

      {/* Header content */}
      {!loading && renderHeader()}

      {/* Main content */}
      {!loading && renderContent()}

      {/* Actions/Footer */}
      {!loading && renderActions()}
    </StyledWSCard>
  );
}
