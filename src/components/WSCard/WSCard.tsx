import React, { useState, useCallback } from 'react';
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
  CardOverlay,
  StyledDivider,
} from './WSCard.styles';

// ==============================================
// WS CARD COMPONENT
// ==============================================

// CUSTOMIZE: Bạn có thể chỉnh sửa variant (elevation, outlined, filled, gradient), size (small, medium, large),
// shape (rounded, square, circular), hoverEffect (lift, glow, scale, border, none), và colors để tùy chỉnh giao diện card
export default function WSCard({
  // Core styling props
  variant = WS_CARD_DEFAULTS.variant,
  size = WS_CARD_DEFAULTS.size,
  shape = WS_CARD_DEFAULTS.shape,

  // Content
  children,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imageHeight = '200px',

  // Header configuration
  headerContent,
  headerActions,
  showDivider = WS_CARD_DEFAULTS.showDivider,

  // Footer configuration
  footerContent,
  actions = [],
  actionsAlignment = WS_CARD_DEFAULTS.actionsAlignment,

  // Enhanced features
  clickable = false,
  selectable = false,
  selected = false,
  disabled = false,

  // Animation and interaction
  animate = WS_CARD_DEFAULTS.animate,
  hoverEffect = WS_CARD_DEFAULTS.hoverEffect,
  loading = false,
  loadingHeight = '200px',

  // Custom styling
  sx,
  className,
  contentSx,
  headerSx,
  footerSx,

  // Background and overlay
  backgroundColor,
  backgroundImage,
  overlay = false,
  overlayColor,
  overlayOpacity = WS_CARD_DEFAULTS.overlayOpacity,

  // Spacing
  padding = WS_CARD_DEFAULTS.padding,
  contentSpacing = WS_CARD_DEFAULTS.contentSpacing,

  // Event handlers
  onClick,
  onSelect,

  // Accessibility
  ariaLabel,
  ariaDescribedBy,
  role = 'article',
  tabIndex,

  // Forward all other props to MUI Card
  ...otherProps
}: WSCardProps) {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [isSelected, setIsSelected] = useState(selected);

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }

      // Handle selection
      if (selectable && onSelect) {
        const newSelectedState = !isSelected;
        setIsSelected(newSelectedState);
        onSelect(newSelectedState);
      }

      // Handle custom click
      if (onClick) {
        onClick(event);
      }
    },
    [onClick, onSelect, selectable, isSelected, disabled, loading]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (
        (clickable || selectable) &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        handleClick(event as unknown as React.MouseEvent<HTMLElement>);
      }
    },
    [clickable, selectable, handleClick]
  );

  // ==============================================
  // RENDER HELPERS
  // ==============================================

  const renderLoadingSkeleton = () => {
    if (!loading) return null;

    return (
      <StyledWSCardContent
        wsSize={size}
        contentSpacing={contentSpacing}
        {...(contentSx && { sx: contentSx })}
      >
        {/* Image skeleton */}
        {image && (
          <LoadingSkeleton
            height={loadingHeight}
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
            <LoadingSkeleton
              height="16px"
              width="100%"
              style={{ marginBottom: '6px' }}
            />
            <LoadingSkeleton
              height="16px"
              width="80%"
              style={{ marginBottom: '6px' }}
            />
            <LoadingSkeleton height="16px" width="60%" />
          </>
        )}

        {/* Custom children skeleton */}
        {children && !title && !subtitle && !description && (
          <>
            <LoadingSkeleton
              height="20px"
              width="100%"
              style={{ marginBottom: '8px' }}
            />
            <LoadingSkeleton
              height="20px"
              width="70%"
              style={{ marginBottom: '8px' }}
            />
            <LoadingSkeleton height="20px" width="50%" />
          </>
        )}
      </StyledWSCardContent>
    );
  };

  const renderMedia = () => {
    if (!image || loading) return null;

    return (
      <StyledWSCardMedia imageHeight={imageHeight}>
        <img
          src={image}
          alt={imageAlt || title || 'Card image'}
          loading="lazy"
          onError={(e) => {
            // Handle image load error
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {overlay && (
          <CardOverlay
            {...(overlayColor && { overlayColor })}
            overlayOpacity={overlayOpacity}
          />
        )}
      </StyledWSCardMedia>
    );
  };

  const renderHeader = () => {
    if (loading) return null;

    // Custom header content takes precedence
    if (headerContent) {
      return (
        <StyledWSCardHeader
          wsSize={size}
          contentSpacing={contentSpacing}
          {...(headerSx && { sx: headerSx })}
        >
          {headerContent}
        </StyledWSCardHeader>
      );
    }

    // Default header with title and subtitle
    if (title || subtitle || headerActions) {
      return (
        <StyledWSCardHeader
          wsSize={size}
          contentSpacing={contentSpacing}
          title={title}
          subheader={subtitle}
          action={headerActions}
          {...(headerSx && { sx: headerSx })}
        />
      );
    }

    return null;
  };

  const renderContent = () => {
    if (loading) return null;

    // If children provided, render them directly
    if (children) {
      return (
        <StyledWSCardContent
          wsSize={size}
          contentSpacing={contentSpacing}
          {...(contentSx && { sx: contentSx })}
        >
          {children}
        </StyledWSCardContent>
      );
    }

    // Render description if provided
    if (description) {
      return (
        <StyledWSCardContent
          wsSize={size}
          contentSpacing={contentSpacing}
          {...(contentSx && { sx: contentSx })}
        >
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

  const renderDivider = () => {
    if (!showDivider || loading) return null;

    // Show divider if there's both header/content and footer
    const hasHeaderOrContent =
      headerContent || title || subtitle || children || description;
    const hasFooter = footerContent || actions.length > 0;

    if (hasHeaderOrContent && hasFooter) {
      return <StyledDivider />;
    }

    return null;
  };

  const renderActions = () => {
    if (loading) return null;

    // Custom footer content takes precedence
    if (footerContent) {
      return (
        <StyledWSCardActions
          wsSize={size}
          actionsAlignment={actionsAlignment}
          {...(footerSx && { sx: footerSx })}
        >
          {footerContent}
        </StyledWSCardActions>
      );
    }

    // Render action buttons
    if (actions.length > 0) {
      return (
        <StyledWSCardActions
          wsSize={size}
          actionsAlignment={actionsAlignment}
          {...(footerSx && { sx: footerSx })}
        >
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
              endIcon={action.endIcon}
            >
              {action.label}
            </WSButton>
          ))}
        </StyledWSCardActions>
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
    'aria-disabled': disabled,
    'aria-busy': loading,
    'aria-selected': selectable ? isSelected : undefined,
    role: clickable || selectable ? 'button' : role,
    tabIndex:
      clickable || selectable
        ? tabIndex !== undefined
          ? tabIndex
          : 0
        : tabIndex,
    ...(loading && { 'aria-live': 'polite' as const }),
  };

  // ==============================================
  // CARD STYLES
  // ==============================================

  const cardStyles = {
    ...(backgroundColor && { backgroundColor }),
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }),
    ...(padding === 'none' && {
      '& .MuiCardContent-root': { padding: 0 },
      '& .MuiCardHeader-root': { padding: 0 },
      '& .MuiCardActions-root': { padding: 0 },
    }),
    ...(padding === 'small' && {
      '& .MuiCardContent-root': { padding: '8px' },
      '& .MuiCardHeader-root': { padding: '8px' },
      '& .MuiCardActions-root': { padding: '8px' },
    }),
    ...(padding === 'large' && {
      '& .MuiCardContent-root': { padding: '24px' },
      '& .MuiCardHeader-root': { padding: '24px' },
      '& .MuiCardActions-root': { padding: '24px' },
    }),
    ...sx,
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <StyledWSCard
      // Custom styling props
      wsVariant={variant}
      wsSize={size}
      wsShape={shape}
      animate={animate}
      hoverEffect={hoverEffect}
      clickable={clickable}
      selectable={selectable}
      selected={isSelected}
      loading={loading}
      contentSpacing={contentSpacing}
      // MUI Card props
      raised={variant === 'elevation'}
      // Styling
      sx={cardStyles}
      {...(className && { className })}
      // Event handlers
      onClick={clickable || selectable ? handleClick : undefined}
      onKeyDown={clickable || selectable ? handleKeyDown : undefined}
      // Accessibility
      {...accessibilityProps}
      // Forward other props
      {...otherProps}
    >
      {/* Background overlay */}
      {overlay && backgroundImage && (
        <CardOverlay
          {...(overlayColor && { overlayColor })}
          overlayOpacity={overlayOpacity}
        />
      )}

      {/* Loading state */}
      {loading && renderLoadingSkeleton()}

      {/* Media content */}
      {!loading && renderMedia()}

      {/* Header content */}
      {!loading && renderHeader()}

      {/* Main content */}
      {!loading && renderContent()}

      {/* Divider */}
      {!loading && renderDivider()}

      {/* Actions/Footer */}
      {!loading && renderActions()}
    </StyledWSCard>
  );
}
