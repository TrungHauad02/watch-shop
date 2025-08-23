/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled, keyframes } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
  Box,
} from '@mui/material';
import { WSCardVariant, WSCardSize } from './WSCard.types';

// ==============================================
// ANIMATIONS - SMOOTH & MODERN
// ==============================================

/**
 * WSCard Animation Guide
 * ======================
 *
 * CUSTOMIZE: Bạn có thể chỉnh sửa animations tại đây
 *
 * Animation types:
 * - shimmer: 🌟 Loading skeleton shimmer effect
 * - cardHover: 📱 Card hover animation
 * - loadingPulse: 🔄 Loading state pulse
 */

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const loadingPulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeConfig = (size: WSCardSize) => {
  // CUSTOMIZE: Kích thước card cho từng size
  const sizeMap = {
    small: {
      padding: '12px', // 📏 Compact padding
      headerPadding: '12px', // 📏 Header padding
      contentPadding: '12px', // 📏 Content padding
      actionsPadding: '8px 12px', // 📏 Actions padding
      titleFontSize: '1rem', // 📏 Small title (16px)
      subtitleFontSize: '0.875rem', // 📏 Small subtitle (14px)
      descriptionFontSize: '0.875rem', // 📏 Small description (14px)
      borderRadius: '8px', // 🔄 Small border radius
      minHeight: '120px', // 📏 Minimum height
      iconSize: '16px', // 🎯 Icon size
      spacing: '8px', // 📏 Internal spacing
    },
    medium: {
      padding: '16px', // 📏 Standard padding
      headerPadding: '16px', // 📏 Header padding
      contentPadding: '16px', // 📏 Content padding
      actionsPadding: '12px 16px', // 📏 Actions padding
      titleFontSize: '1.25rem', // 📏 Medium title (20px)
      subtitleFontSize: '0.875rem', // 📏 Medium subtitle (14px)
      descriptionFontSize: '0.875rem', // 📏 Medium description (14px)
      borderRadius: '12px', // 🔄 Medium border radius
      minHeight: '160px', // 📏 Minimum height
      iconSize: '18px', // 🎯 Icon size
      spacing: '12px', // 📏 Internal spacing
    },
    large: {
      padding: '24px', // 📏 Spacious padding
      headerPadding: '24px', // 📏 Header padding
      contentPadding: '24px', // 📏 Content padding
      actionsPadding: '16px 24px', // 📏 Actions padding
      titleFontSize: '1.5rem', // 📏 Large title (24px)
      subtitleFontSize: '1rem', // 📏 Large subtitle (16px)
      descriptionFontSize: '1rem', // 📏 Large description (16px)
      borderRadius: '16px', // 🔄 Large border radius
      minHeight: '200px', // 📏 Minimum height
      iconSize: '20px', // 🎯 Icon size
      spacing: '16px', // 📏 Internal spacing
    },
  };

  return sizeMap[size];
};

// ==============================================
// VARIANT STYLES - THEME AWARE
// ==============================================

const getVariantStyles = (theme: any, variant: WSCardVariant) => {
  // CUSTOMIZE: Visual styles cho từng variant
  const variants = {
    elevation: {
      // 🎨 ELEVATION: Card nổi bật với shadow
      backgroundColor: theme.palette.background.paper,
      border: 'none',
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 4px 16px rgba(0, 0, 0, 0.3)' // Deeper shadow for dark mode
          : '0 2px 12px rgba(0, 0, 0, 0.08)', // Subtle shadow for light mode

      // 🎭 HOVER EFFECTS
      hoverBoxShadow:
        theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.4)' // Enhanced shadow on hover
          : '0 6px 24px rgba(0, 0, 0, 0.12)',
      hoverTransform: 'translateY(-2px)', // Lift effect
      hoverBorderColor: 'transparent', // No border change
    },

    outlined: {
      // 🔲 OUTLINED: Card với viền rõ ràng
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: 'none',

      // 🎭 HOVER EFFECTS
      hoverBoxShadow:
        theme.palette.mode === 'dark'
          ? '0 4px 16px rgba(254, 231, 21, 0.1)' // Yellow glow for dark mode
          : '0 2px 8px rgba(16, 24, 32, 0.08)', // Subtle shadow for light mode
      hoverBorderColor: theme.palette.primary.main, // Primary color border on hover
      hoverTransform: 'translateY(-1px)', // Subtle lift
    },
  };

  return variants[variant];
};

// ==============================================
// STYLED CARD COMPONENT - ENHANCED
// ==============================================

export const StyledWSCard = styled(Card, {
  shouldForwardProp: (prop) =>
    !['wsVariant', 'wsSize', 'clickable', 'loading'].includes(prop as string),
})<{
  wsVariant: WSCardVariant;
  wsSize: WSCardSize;
  clickable: boolean;
  loading: boolean;
}>(({ theme, wsVariant, wsSize, clickable, loading }) => {
  const sizeConfig = getSizeConfig(wsSize);
  const variantStyles = getVariantStyles(theme, wsVariant);

  return {
    // === BASE CARD STYLES ===
    position: 'relative',
    overflow: 'hidden',
    minHeight: sizeConfig.minHeight,
    borderRadius: sizeConfig.borderRadius,

    // 🎨 COLORS & BACKGROUND
    backgroundColor: variantStyles.backgroundColor,
    border: variantStyles.border,
    boxShadow: variantStyles.boxShadow,

    // ✨ TRANSITIONS: Smooth animations
    transition: theme.transitions.create(
      ['box-shadow', 'transform', 'border-color'],
      {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeOut,
      }
    ),

    // === CLICKABLE INTERACTIONS ===
    ...(clickable && {
      cursor: 'pointer',
      userSelect: 'none',

      '&:hover': {
        boxShadow: variantStyles.hoverBoxShadow,
        transform: variantStyles.hoverTransform,
        ...(wsVariant === 'outlined' && {
          borderColor: variantStyles.hoverBorderColor,
        }),
      },

      // FOCUS STYLES: Accessibility
      '&:focus-visible': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
        boxShadow: `${variantStyles.boxShadow}, 0 0 0 3px ${theme.palette.primary.main}25`,
      },

      '&:active': {
        transform: 'translateY(0)', // Reset transform on click
        transition: theme.transitions.create(['transform'], {
          duration: theme.transitions.duration.shortest,
        }),
      },
    }),

    // === LOADING STATE ===
    ...(loading && {
      cursor: 'wait',
      animation: `${loadingPulse} 2s infinite`,

      '&:hover': {
        transform: 'none', // Disable hover effects when loading
      },
    }),

    // === RESPONSIVE DESIGN ===
    [theme.breakpoints.down('sm')]: {
      minHeight:
        wsSize === 'large' ? '180px' : wsSize === 'medium' ? '140px' : '100px',
      borderRadius:
        wsSize === 'large' ? '12px' : wsSize === 'medium' ? '8px' : '6px',
    },

    // === ACCESSIBILITY ===
    '&[role="button"]': {
      // ⚡ Better keyboard navigation
      '&:focus': {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: '2px',
      },
    },
  };
});

// ==============================================
// STYLED CARD HEADER - ENHANCED
// ==============================================

export const StyledWSCardHeader = styled(CardHeader, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSCardSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    // === LAYOUT & SPACING ===
    padding: `${sizeConfig.headerPadding} ${sizeConfig.headerPadding} ${parseInt(sizeConfig.headerPadding) / 2}px ${sizeConfig.headerPadding}`,

    // === TITLE STYLING ===
    '& .MuiCardHeader-title': {
      fontSize: sizeConfig.titleFontSize,
      fontWeight: theme.typography.fontWeightBold || 600,
      lineHeight: 1.3,
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(0.5),

      // CUSTOMIZE: Title truncation
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    // === SUBTITLE STYLING ===
    '& .MuiCardHeader-subheader': {
      fontSize: sizeConfig.subtitleFontSize,
      fontWeight: theme.typography.fontWeightRegular || 400,
      lineHeight: 1.4,
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(0.5),

      // CUSTOMIZE: Subtitle truncation
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },

    // === ACTION AREA ===
    '& .MuiCardHeader-action': {
      margin: 0,
      alignSelf: 'flex-start',
    },

    // === AVATAR AREA ===
    '& .MuiCardHeader-avatar': {
      marginRight: theme.spacing(2),
    },

    // === RESPONSIVE ===
    [theme.breakpoints.down('sm')]: {
      padding: `${parseInt(sizeConfig.headerPadding) * 0.75}px`,

      '& .MuiCardHeader-title': {
        fontSize:
          wsSize === 'large'
            ? '1.25rem'
            : wsSize === 'medium'
              ? '1.125rem'
              : '1rem',
      },
    },
  };
});

// ==============================================
// STYLED CARD CONTENT - ENHANCED
// ==============================================

export const StyledWSCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSCardSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    // === LAYOUT & SPACING ===
    padding: sizeConfig.contentPadding,
    flex: 1, // Allow content to grow

    '&:last-child': {
      paddingBottom: sizeConfig.contentPadding,
    },

    // === TYPOGRAPHY STYLES ===
    '& .WSCard-description': {
      fontSize: sizeConfig.descriptionFontSize,
      fontWeight: theme.typography.fontWeightRegular || 400,
      lineHeight: 1.6,
      color: theme.palette.text.secondary,
      margin: 0,
    },

    // === CONTENT SPACING ===
    '& > *:not(:last-child)': {
      marginBottom: sizeConfig.spacing,
    },

    // === CUSTOM SCROLLBAR (for overflow content) ===
    '&::-webkit-scrollbar': {
      width: '4px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.grey[100],
      borderRadius: '2px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[600]
          : theme.palette.grey[400],
      borderRadius: '2px',
    },

    // === RESPONSIVE ===
    [theme.breakpoints.down('sm')]: {
      padding: `${parseInt(sizeConfig.contentPadding) * 0.75}px`,

      '& .WSCard-description': {
        fontSize:
          wsSize === 'large'
            ? '0.875rem'
            : wsSize === 'medium'
              ? '0.875rem'
              : '0.75rem',
      },
    },
  };
});

// ==============================================
// STYLED CARD ACTIONS - ENHANCED
// ==============================================

export const StyledWSCardActions = styled(CardActions, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSCardSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    // === LAYOUT & SPACING ===
    padding: sizeConfig.actionsPadding,
    justifyContent: 'flex-end', // Right-align actions by default
    gap: sizeConfig.spacing,
    borderTop: `1px solid ${theme.palette.divider}`, // Separator line
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.grey[50], // Subtle background difference

    // === BUTTON STYLING ===
    '& .MuiButton-root': {
      minWidth: 'auto',
      // CUSTOMIZE: Action button size mapping
      ...(wsSize === 'small' && {
        padding: '4px 8px',
        fontSize: '0.75rem',
      }),
      ...(wsSize === 'medium' && {
        padding: '6px 12px',
        fontSize: '0.875rem',
      }),
      ...(wsSize === 'large' && {
        padding: '8px 16px',
        fontSize: '0.875rem',
      }),
    },

    // === FLEXIBLE LAYOUT ===
    '&.WSCard-actions-left': {
      justifyContent: 'flex-start', // Left-align actions
    },

    '&.WSCard-actions-center': {
      justifyContent: 'center', // Center-align actions
    },

    '&.WSCard-actions-between': {
      justifyContent: 'space-between', // Spread actions
    },

    // === RESPONSIVE ===
    [theme.breakpoints.down('sm')]: {
      padding: `${parseInt(sizeConfig.actionsPadding.split(' ')[0]) * 0.75}px ${parseInt(sizeConfig.actionsPadding.split(' ')[1]) * 0.75}px`,
      gap: `${parseInt(sizeConfig.spacing) * 0.75}px`,

      // Stack actions vertically on very small screens
      '@media (max-width: 480px)': {
        flexDirection: 'column',
        '& .MuiButton-root': {
          width: '100%',
        },
      },
    },

    // === THEME TRANSITIONS ===
    transition: theme.transitions.create(['background-color', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// STYLED CARD MEDIA - ENHANCED
// ==============================================

export const StyledWSCardMedia = styled(CardMedia, {
  shouldForwardProp: (prop) => !['imageHeight'].includes(prop as string),
})<{
  imageHeight?: string | number;
}>(({ theme, imageHeight }) => ({
  // === BASE STYLES ===
  height: imageHeight || '200px',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.grey[200], // Placeholder background

  // === IMAGE LOADING STATES ===
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'transparent',
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.standard,
    }),
  },

  // === ERROR STATE ===
  '&.WSCard-media-error': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[100],
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',

    '&::before': {
      content: '"🖼️ Image not available"',
    },
  },

  // === RESPONSIVE ===
  [theme.breakpoints.down('sm')]: {
    height:
      typeof imageHeight === 'string'
        ? `calc(${imageHeight} * 0.75)`
        : `${(imageHeight as number) * 0.75}px`,
  },
}));

// ==============================================
// LOADING SKELETON - ENHANCED
// ==============================================

export const LoadingSkeleton = styled(Box, {
  shouldForwardProp: (prop) =>
    !['height', 'width', 'variant'].includes(prop as string),
})<{
  height?: string | number;
  width?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}>(({ theme, height, width, variant = 'rectangular' }) => {
  const baseColor =
    theme.palette.mode === 'dark'
      ? theme.palette.grey[700]
      : theme.palette.grey[200];
  const highlightColor =
    theme.palette.mode === 'dark'
      ? theme.palette.grey[600]
      : theme.palette.grey[100];

  return {
    // === BASE STYLES ===
    height: height || '20px',
    width: width || '100%',
    backgroundColor: baseColor,
    marginBottom: '8px',

    // === VARIANT STYLES ===
    ...(variant === 'text' && {
      borderRadius: '4px',
      height: '1em',
    }),
    ...(variant === 'circular' && {
      borderRadius: '50%',
    }),
    ...(variant === 'rectangular' && {
      borderRadius: '4px',
    }),

    // === SHIMMER ANIMATION ===
    background: `linear-gradient(90deg, ${baseColor} 25%, ${highlightColor} 50%, ${baseColor} 75%)`,
    backgroundSize: '200px 100%',
    animation: `${shimmer} 1.5s infinite`,

    // === ACCESSIBILITY ===
    'aria-hidden': true,
    '&::before': {
      content: '""',
      display: 'block',
    },
  };
});

// ==============================================
// LOADING OVERLAY - ENHANCED
// ==============================================

export const LoadingOverlay = styled(Box)(({ theme }) => ({
  // === POSITIONING ===
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 10,

  // === LAYOUT ===
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: theme.spacing(2),

  // === BACKDROP ===
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(2px)',
  WebkitBackdropFilter: 'blur(2px)',

  // === TRANSITIONS ===
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
}));
