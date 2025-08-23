import { useState, useCallback, useEffect } from 'react';
import { Typography, CircularProgress, useTheme } from '@mui/material';
import WSButton from '@/components/WSButton';
import { WSCardProps, WSCardAction, WS_CARD_DEFAULTS } from './WSCard.types';
import {
  StyledWSCard,
  StyledWSCardHeader,
  StyledWSCardContent,
  StyledWSCardActions,
  StyledWSCardMedia,
  LoadingSkeleton,
  LoadingOverlay,
} from './WSCard.styles';

// ==============================================
// WSCard COMPONENT - ENHANCED & THEME INTEGRATED
// ==============================================

/**
 * WSCard - Flexible Card Component
 *
 * CUSTOMIZE: Báº¡n cÃ³ thá»ƒ chá»‰nh sá»­a:
 * - variant: 'elevation' | 'outlined'
 * - size: 'small' | 'medium' | 'large'
 * - clickable: Card cÃ³ thá»ƒ click Ä'Æ°á»£c
 * - actions: Button array vá»›i async support
 * - loading/skeleton: Loading states
 *
 * Card tá»± Ä'á»™ng responsive vÃ  thay Ä'á»•i theo theme (dark/light mode).
 *
 * @example
 * // Basic card
 * <WSCard
 *   title="Product Name"
 *   subtitle="Category"
 *   description="Product description here..."
 *   image="/product-image.jpg"
 * />
 *
 * // Clickable card vá»›i actions
 * <WSCard
 *   title="Article Title"
 *   subtitle="Published 2 days ago"
 *   description="Article preview content..."
 *   clickable
 *   onClick={() => navigateToArticle()}
 *   actions={[
 *     {
 *       label: "Read More",
 *       onClick: () => navigateToArticle(),
 *       variant: "contained"
 *     },
 *     {
 *       label: "Share",
 *       onClick: async () => await shareArticle(),
 *       variant: "outlined",
 *       startIcon: <ShareIcon />
 *     }
 *   ]}
 * />
 *
 * // Loading card
 * <WSCard
 *   loading
 *   skeleton
 *   title="Loading..."
 *   description="Content is loading..."
 * />
 *
 * // Custom content card
 * <WSCard size="large" variant="outlined">
 *   <CustomComponent data={data} />
 * </WSCard>
 */
export default function WSCard({
  // === CORE STYLING PROPS ===
  variant = WS_CARD_DEFAULTS.variant, // ðŸŽ¨ elevation | outlined
  size = WS_CARD_DEFAULTS.size, //  small | medium | large

  // === CONTENT ===
  children, // § Custom content component
  title, //  Card title
  subtitle, //  Card subtitle
  description, //  Content text hoáº·c ReactNode

  // === MEDIA ===
  image, // ðŸ–¼ï¸ Image URL
  imageAlt, // â™¿ Image alt text
  imageHeight = WS_CARD_DEFAULTS.imageHeight, //  Image height
  imageObjectFit = WS_CARD_DEFAULTS.imageObjectFit, // ðŸ–¼ï¸ Image fit style

  // === FOOTER CONFIGURATION ===
  actions = WS_CARD_DEFAULTS.actions, // ðŸŽ¬ Array of action buttons
  actionsAlignment = WS_CARD_DEFAULTS.actionsAlignment, //  Actions alignment

  // === ENHANCED FEATURES ===
  clickable = WS_CARD_DEFAULTS.clickable, // ðŸ–±ï¸ Card can be clicked
  loading = WS_CARD_DEFAULTS.loading, // „ Loading state
  skeleton = WS_CARD_DEFAULTS.skeleton, // ðŸ'» Show skeleton loading

  // === CUSTOM STYLING ===
  sx, // ðŸŽ¨ Container styles
  className, // ðŸŽ¨ CSS class
  headerSx, // ðŸŽ¨ Header area styles
  contentSx, // ðŸŽ¨ Content area styles
  actionsSx, // ðŸŽ¨ Actions area styles
  mediaSx, // ðŸŽ¨ Media area styles

  // === EVENT HANDLERS ===
  onClick, // ðŸ–±ï¸ Click handler
  onImageError, // ðŸ–¼ï¸ Image error handler
  onImageLoad, // ðŸ–¼ï¸ Image load handler

  // === ACCESSIBILITY ===
  ariaLabel, // â™¿ Accessibility label
  ariaDescribedBy, // â™¿ Accessibility description

  // === ADVANCED PROPS ===
  component, // — Custom component
  href, // — URL for link cards
  target, // — Link target

  // === FORWARD OTHER PROPS ===
  ...otherProps
}: WSCardProps) {
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
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isInternalLoading, setIsInternalLoading] = useState(false);

  // „ Determine final loading state
  const isLoading = loading || isInternalLoading;
  const shouldShowSkeleton = skeleton && isLoading;

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  /**
   * Handle card click with async support
   */
  const handleCardClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      if (!clickable || isLoading) {
        return;
      }

      try {
        if (onClick) {
          const result = onClick(event);

          // „ Handle async operations
          if (result && typeof result === 'object' && 'then' in result) {
            setIsInternalLoading(true);
            await (result as Promise<void>);
          }
        }
      } catch (error) {
        // ðŸš¨ Log errors but don't crash
        console.error('WSCard onClick error:', error);
      } finally {
        // ðŸ§¹ Clean up loading state
        setIsInternalLoading(false);
      }
    },
    [clickable, onClick, isLoading]
  );

  /**
   * Handle keyboard navigation for clickable cards
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (clickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        handleCardClick(event as unknown as React.MouseEvent<HTMLElement>);
      }
    },
    [clickable, handleCardClick]
  );

  /**
   * Handle action button click with loading state management
   */
  const handleActionClick = useCallback(
    async (action: WSCardAction, index: number) => {
      if (!action || action.disabled) return;

      try {
        // „ Set loading state for this specific action
        if (!action.loading) {
          setActionLoadingStates((prev) => ({ ...prev, [index]: true }));
        }

        // ðŸš€ Execute action
        const result = action.onClick();

        // „ Handle async actions
        if (result && typeof result === 'object' && 'then' in result) {
          await (result as Promise<void>);
        }
      } catch (error) {
        // ðŸš¨ Log errors but don't crash the card
        console.error('WSCard action error:', error);
      } finally {
        // ðŸ§¹ Clear loading state
        if (!action.loading) {
          setActionLoadingStates((prev) => ({ ...prev, [index]: false }));
        }
      }
    },
    []
  );

  /**
   * Handle image load error
   */
  const handleImageError = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageLoadError(true);
      if (onImageError) {
        onImageError(event);
      }
    },
    [onImageError]
  );

  /**
   * Handle image load success
   */
  const handleImageLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement>) => {
      setImageLoadError(false);
      if (onImageLoad) {
        onImageLoad(event);
      }
    },
    [onImageLoad]
  );

  // ==============================================
  // LIFECYCLE EFFECTS
  // ==============================================

  /**
   * Reset image error state when image prop changes
   */
  useEffect(() => {
    if (image) {
      setImageLoadError(false);
    }
  }, [image]);

  // ==============================================
  // RENDER HELPERS - THEME AWARE
  // ==============================================

  /**
   * Render loading skeleton
   */
  const renderLoadingSkeleton = () => {
    if (!shouldShowSkeleton) return null;

    return (
      <StyledWSCardContent wsSize={size} {...(contentSx && { sx: contentSx })}>
        {/* Image skeleton */}
        {image && (
          <LoadingSkeleton
            height={imageHeight}
            width="100%"
            variant="rectangular"
            sx={{ marginBottom: theme.spacing(2) }}
          />
        )}

        {/* Title skeleton */}
        {title && (
          <LoadingSkeleton
            height="24px"
            width="60%"
            variant="text"
            sx={{ marginBottom: theme.spacing(1) }}
          />
        )}

        {/* Subtitle skeleton */}
        {subtitle && (
          <LoadingSkeleton
            height="16px"
            width="40%"
            variant="text"
            sx={{ marginBottom: theme.spacing(1.5) }}
          />
        )}

        {/* Description skeleton */}
        {(description || children) && (
          <>
            <LoadingSkeleton height="16px" width="100%" variant="text" />
            <LoadingSkeleton height="16px" width="80%" variant="text" />
            <LoadingSkeleton height="16px" width="60%" variant="text" />
          </>
        )}
      </StyledWSCardContent>
    );
  };

  /**
   * Render card media with error handling
   */
  const renderMedia = () => {
    if (!image || shouldShowSkeleton) return null;

    if (imageLoadError) {
      return (
        <StyledWSCardMedia
          imageHeight={imageHeight}
          className="WSCard-media-error"
          {...(mediaSx && { sx: mediaSx })}
        />
      );
    }

    return (
      <StyledWSCardMedia
        imageHeight={imageHeight}
        image={image}
        title={imageAlt || title || 'Card image'}
        sx={{
          objectFit: imageObjectFit,
          ...mediaSx,
        }}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    );
  };

  /**
   * Render card header with title and subtitle
   */
  const renderHeader = () => {
    if (shouldShowSkeleton || (!title && !subtitle)) return null;

    return (
      <StyledWSCardHeader
        wsSize={size}
        title={title}
        subheader={subtitle}
        {...(headerSx && { sx: headerSx })}
      />
    );
  };

  /**
   * Render card content area
   */
  const renderContent = () => {
    if (shouldShowSkeleton) return null;

    // § CUSTOM CHILDREN: Render custom component if provided
    if (children) {
      return (
        <StyledWSCardContent
          wsSize={size}
          {...(contentSx && { sx: contentSx })}
        >
          {children}
        </StyledWSCardContent>
      );
    }

    //  DESCRIPTION: Render description content
    if (description) {
      return (
        <StyledWSCardContent
          wsSize={size}
          {...(contentSx && { sx: contentSx })}
        >
          {typeof description === 'string' ? (
            <Typography
              variant="body2"
              className="WSCard-description"
              component="p"
              sx={{
                // CUSTOMIZE: Description text styling
                color: theme.palette.text.secondary,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              {description}
            </Typography>
          ) : (
            description
          )}
        </StyledWSCardContent>
      );
    }

    return null;
  };

  /**
   * Render card actions/footer
   */
  const renderActions = () => {
    if (shouldShowSkeleton || !actions || actions.length === 0) return null;

    //  ACTION ALIGNMENT CLASS
    const alignmentClass = `WSCard-actions-${actionsAlignment}`;

    return (
      <StyledWSCardActions
        wsSize={size}
        className={alignmentClass}
        {...(actionsSx && { sx: actionsSx })}
      >
        {actions.map((action, index) => {
          // ðŸŽ¨ BUTTON SIZE: Map card size to button size
          const buttonSize =
            size === 'small' ? 'small' : size === 'large' ? 'medium' : 'small';

          // „ LOADING STATE: Individual or global loading
          const isActionLoading =
            action.loading || actionLoadingStates[index] || isLoading;

          return (
            <WSButton
              key={`card-action-${index}`}
              variant={action.variant || 'text'}
              color={action.color || 'primary'}
              size={buttonSize}
              onClick={() => handleActionClick(action, index)}
              disabled={action.disabled || isLoading}
              loading={isActionLoading}
              startIcon={action.startIcon}
              endIcon={action.endIcon}
              sx={{
                // CUSTOMIZE: Action button styling
                minWidth: size === 'small' ? '60px' : '80px',
                ...action.sx,
              }}
            >
              {action.label}
            </WSButton>
          );
        })}
      </StyledWSCardActions>
    );
  };

  /**
   * Render loading overlay when card is in loading state
   */
  const renderLoadingOverlay = () => {
    if (!isLoading || shouldShowSkeleton) return null;

    return (
      <LoadingOverlay>
        <CircularProgress
          size={size === 'small' ? 32 : size === 'large' ? 48 : 40}
          thickness={4}
          sx={{
            // CUSTOMIZE: Loading spinner styling
            color: theme.palette.primary.main,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            marginTop: theme.spacing(1),
          }}
        >
          Loading...
        </Typography>
      </LoadingOverlay>
    );
  };

  // ==============================================
  // ACCESSIBILITY CONFIGURATION
  // ==============================================

  const accessibilityProps = {
    'aria-label': ariaLabel || (clickable ? 'Clickable card' : 'Card'),
    'aria-describedby': ariaDescribedBy,
    'aria-busy': isLoading,
    role: clickable ? 'button' : 'article',
    tabIndex: clickable ? 0 : undefined,
    ...(isLoading && { 'aria-live': 'polite' as const }),
  };

  // ==============================================
  // COMPONENT PROPS
  // ==============================================

  const componentProps = {
    // Link props - for card as link
    ...(href && {
      href,
      target,
      rel: target === '_blank' ? 'noopener noreferrer' : undefined,
      component: component || 'a',
    }),
  };

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <StyledWSCard
      // === CUSTOM STYLING PROPS ===
      wsVariant={variant}
      wsSize={size}
      clickable={clickable}
      loading={isLoading}
      // === STYLING ===
      {...(sx && { sx })}
      {...(className && { className })}
      // === EVENT HANDLERS ===
      onClick={clickable ? handleCardClick : undefined}
      onKeyDown={clickable ? handleKeyDown : undefined}
      // === ACCESSIBILITY ===
      {...accessibilityProps}
      // === COMPONENT AND LINK PROPS ===
      {...componentProps}
      // === FORWARD OTHER PROPS ===
      {...otherProps}
    >
      {/* === CARD SECTIONS === */}

      {/* LOADING SKELETON: Show when skeleton is enabled */}
      {shouldShowSkeleton && renderLoadingSkeleton()}

      {/* MEDIA: Image content */}
      {!shouldShowSkeleton && renderMedia()}

      {/* HEADER: Title, subtitle */}
      {!shouldShowSkeleton && renderHeader()}

      {/* CONTENT: Main card content */}
      {!shouldShowSkeleton && renderContent()}

      {/* ACTIONS: Footer buttons */}
      {!shouldShowSkeleton && renderActions()}

      {/* LOADING: Overlay when processing */}
      {renderLoadingOverlay()}
    </StyledWSCard>
  );
}
