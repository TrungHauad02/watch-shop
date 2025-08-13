/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled, keyframes } from '@mui/material/styles';
import { Card, CardContent, CardHeader, CardActions } from '@mui/material';
import {
  WSCardProps,
  WSCardVariant,
  WSCardSize,
  WSCardShape,
} from './WSCard.types';
import {
  BRAND_COLORS,
  COLOR_PALETTES,
  LIGHT_THEME,
  DARK_THEME,
} from '../../styles/colors';

// ==============================================
// ANIMATIONS
// ==============================================

const cardGlow = keyframes`
  0% {
    box-shadow: 0 4px 20px rgba(254, 231, 21, 0.1);
  }
  50% {
    box-shadow: 0 8px 40px rgba(254, 231, 21, 0.2);
  }
  100% {
    box-shadow: 0 4px 20px rgba(254, 231, 21, 0.1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeStyles = (size: WSCardSize) => {
  const sizeMap = {
    small: {
      padding: '12px',
      headerPadding: '12px 12px 8px 12px',
      footerPadding: '8px 12px 12px 12px',
      titleFontSize: '1rem',
      subtitleFontSize: '0.8rem',
      descriptionFontSize: '0.875rem',
      borderRadius: '8px',
      minHeight: '120px',
      spacing: '8px',
    },
    medium: {
      padding: '16px',
      headerPadding: '16px 16px 12px 16px',
      footerPadding: '12px 16px 16px 16px',
      titleFontSize: '1.25rem',
      subtitleFontSize: '0.875rem',
      descriptionFontSize: '0.875rem',
      borderRadius: '12px',
      minHeight: '160px',
      spacing: '12px',
    },
    large: {
      padding: '24px',
      headerPadding: '24px 24px 16px 24px',
      footerPadding: '16px 24px 24px 24px',
      titleFontSize: '1.5rem',
      subtitleFontSize: '1rem',
      descriptionFontSize: '1rem',
      borderRadius: '16px',
      minHeight: '200px',
      spacing: '16px',
    },
  };

  return sizeMap[size];
};

// ==============================================
// VARIANT CONFIGURATIONS
// ==============================================

const getVariantStyles = (variant: WSCardVariant, theme: any) => {
  const isDark = theme.palette.mode === 'dark';

  switch (variant) {
    case 'elevation':
      return {
        backgroundColor: isDark
          ? DARK_THEME.background.paper
          : LIGHT_THEME.background.paper,
        border: 'none',
        boxShadow: isDark
          ? '0 4px 16px rgba(0, 0, 0, 0.3)'
          : '0 2px 12px rgba(0, 0, 0, 0.08)',
        hoverBoxShadow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.4)'
          : '0 6px 24px rgba(0, 0, 0, 0.12)',
      };

    case 'outlined':
      return {
        backgroundColor: isDark
          ? DARK_THEME.background.paper
          : LIGHT_THEME.background.paper,
        border: `1px solid ${isDark ? DARK_THEME.border.primary : LIGHT_THEME.border.primary}`,
        boxShadow: 'none',
        hoverBoxShadow: isDark
          ? '0 4px 16px rgba(254, 231, 21, 0.1)'
          : '0 2px 8px rgba(16, 24, 32, 0.08)',
      };

    case 'filled':
      return {
        backgroundColor: isDark
          ? DARK_THEME.surface.primary
          : LIGHT_THEME.surface.primary,
        border: 'none',
        boxShadow: 'none',
        hoverBoxShadow: isDark
          ? '0 4px 16px rgba(0, 0, 0, 0.2)'
          : '0 2px 8px rgba(0, 0, 0, 0.06)',
      };

    case 'gradient':
      return {
        background: isDark
          ? `linear-gradient(135deg, ${COLOR_PALETTES.richBlack[800]} 0%, ${COLOR_PALETTES.richBlack[700]} 100%)`
          : `linear-gradient(135deg, ${COLOR_PALETTES.vividYellow[50]} 0%, ${COLOR_PALETTES.gold[50]} 100%)`,
        border: 'none',
        boxShadow: isDark
          ? '0 4px 16px rgba(0, 0, 0, 0.3)'
          : '0 2px 12px rgba(254, 231, 21, 0.1)',
        hoverBoxShadow: isDark
          ? '0 8px 32px rgba(254, 231, 21, 0.2)'
          : '0 6px 24px rgba(254, 231, 21, 0.15)',
      };

    default:
      return {
        backgroundColor: isDark
          ? DARK_THEME.background.paper
          : LIGHT_THEME.background.paper,
        border: 'none',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        hoverBoxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
      };
  }
};

// ==============================================
// SHAPE CONFIGURATIONS
// ==============================================

const getShapeStyles = (shape: WSCardShape, size: WSCardSize) => {
  const sizeStyles = getSizeStyles(size);

  switch (shape) {
    case 'square':
      return {
        borderRadius: '4px',
      };

    case 'circular':
      return {
        borderRadius: '50%',
        aspectRatio: '1',
      };

    case 'rounded':
    default:
      return {
        borderRadius: sizeStyles.borderRadius,
      };
  }
};

// ==============================================
// HOVER EFFECT STYLES
// ==============================================

const getHoverEffectStyles = (hoverEffect: WSCardProps['hoverEffect']) => {
  switch (hoverEffect) {
    case 'lift':
      return {
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      };

    case 'glow':
      return {
        '&:hover': {
          animation: `${cardGlow} 2s ease-in-out infinite`,
        },
      };

    case 'scale':
      return {
        '&:hover': {
          transform: 'scale(1.02)',
        },
      };

    case 'border':
      return {
        '&:hover': {
          borderColor: BRAND_COLORS.secondary,
        },
      };

    case 'none':
      return {};

    default:
      return {
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      };
  }
};

// ==============================================
// STYLED CARD COMPONENT
// ==============================================

export const StyledWSCard = styled(Card, {
  shouldForwardProp: (prop) =>
    ![
      'wsVariant',
      'wsSize',
      'wsShape',
      'animate',
      'hoverEffect',
      'clickable',
      'selectable',
      'selected',
      'loading',
      'contentSpacing',
    ].includes(prop as string),
})<{
  wsVariant: WSCardVariant;
  wsSize: WSCardSize;
  wsShape: WSCardShape;
  animate: boolean;
  hoverEffect: WSCardProps['hoverEffect'];
  clickable: boolean;
  selectable: boolean;
  selected: boolean;
  loading: boolean;
  contentSpacing: WSCardProps['contentSpacing'];
}>(({
  theme,
  wsVariant,
  wsSize,
  wsShape,
  animate,
  hoverEffect,
  clickable,
  selectable,
  selected,
  loading,
}) => {
  const sizeStyles = getSizeStyles(wsSize);
  const variantStyles = getVariantStyles(wsVariant, theme);
  const shapeStyles = getShapeStyles(wsShape, wsSize);
  const hoverEffectStyles = getHoverEffectStyles(hoverEffect);

  return {
    // Base styles
    position: 'relative',
    overflow: 'visible',
    minHeight: sizeStyles.minHeight,

    // Colors and background
    backgroundColor: variantStyles.backgroundColor,
    background: variantStyles.background,
    border: variantStyles.border,
    boxShadow: variantStyles.boxShadow,

    // Shape
    ...shapeStyles,

    // Transitions
    transition: animate ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',

    // Hover effects
    ...(animate && clickable && hoverEffectStyles),

    '&:hover': {
      ...(animate &&
        clickable && {
          boxShadow: variantStyles.hoverBoxShadow,
          ...hoverEffectStyles['&:hover'],
        }),
    },

    // Clickable styles
    ...(clickable && {
      cursor: 'pointer',
      userSelect: 'none',

      '&:focus-visible': {
        outline: `2px solid ${BRAND_COLORS.secondary}`,
        outlineOffset: '2px',
      },

      '&:active': {
        transform: animate ? 'scale(0.98)' : undefined,
      },
    }),

    // Selectable styles
    ...(selectable && {
      cursor: 'pointer',
      position: 'relative',

      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 'inherit',
        border: `2px solid transparent`,
        transition: 'border-color 0.2s ease',
        pointerEvents: 'none',
        zIndex: 1,
      },

      ...(selected && {
        '&::before': {
          borderColor: BRAND_COLORS.secondary,
        },
      }),
    }),

    // Loading state
    ...(loading && {
      cursor: 'wait',
      '&:hover': {
        transform: 'none',
      },
    }),

    // Disabled state
    '&.Mui-disabled': {
      backgroundColor: COLOR_PALETTES.neutral[100],
      color: COLOR_PALETTES.neutral[400],
      cursor: 'not-allowed',
      boxShadow: 'none',

      '&:hover': {
        transform: 'none',
        boxShadow: 'none',
      },
    },

    // Dark mode adjustments
    [theme.breakpoints.down('sm')]: {
      minHeight:
        wsSize === 'large' ? '180px' : wsSize === 'medium' ? '140px' : '100px',
    },
  };
});

// ==============================================
// STYLED CARD HEADER
// ==============================================

export const StyledWSCardHeader = styled(CardHeader, {
  shouldForwardProp: (prop) =>
    !['wsSize', 'contentSpacing'].includes(prop as string),
})<{
  wsSize: WSCardSize;
  contentSpacing: WSCardProps['contentSpacing'];
}>(({ wsSize, contentSpacing }) => {
  const sizeStyles = getSizeStyles(wsSize);

  const spacingMap = {
    compact: '8px',
    normal: sizeStyles.spacing,
    comfortable: `${parseInt(sizeStyles.spacing) * 1.5}px`,
  };

  return {
    padding: sizeStyles.headerPadding,
    paddingBottom: contentSpacing
      ? spacingMap[contentSpacing]
      : sizeStyles.spacing,

    '& .MuiCardHeader-title': {
      fontSize: sizeStyles.titleFontSize,
      fontWeight: 600,
      lineHeight: 1.3,
      color: 'inherit',
    },

    '& .MuiCardHeader-subheader': {
      fontSize: sizeStyles.subtitleFontSize,
      fontWeight: 400,
      lineHeight: 1.4,
      marginTop: '4px',
      opacity: 0.8,
    },

    '& .MuiCardHeader-action': {
      alignSelf: 'flex-start',
      marginTop: 0,
      marginRight: 0,
    },
  };
});

// ==============================================
// STYLED CARD CONTENT
// ==============================================

export const StyledWSCardContent = styled(CardContent, {
  shouldForwardProp: (prop) =>
    !['wsSize', 'contentSpacing'].includes(prop as string),
})<{
  wsSize: WSCardSize;
  contentSpacing: WSCardProps['contentSpacing'];
}>(({ wsSize, contentSpacing }) => {
  const sizeStyles = getSizeStyles(wsSize);

  const spacingMap = {
    compact: sizeStyles.padding,
    normal: sizeStyles.padding,
    comfortable: `${parseInt(sizeStyles.padding) * 1.5}px`,
  };

  return {
    padding: contentSpacing ? spacingMap[contentSpacing] : sizeStyles.padding,

    '&:last-child': {
      paddingBottom: contentSpacing
        ? spacingMap[contentSpacing]
        : sizeStyles.padding,
    },

    // Typography styles for content
    '& .WSCard-description': {
      fontSize: sizeStyles.descriptionFontSize,
      lineHeight: 1.6,
      color: 'text.secondary',
      margin: 0,
    },
  };
});

// ==============================================
// STYLED CARD ACTIONS
// ==============================================

export const StyledWSCardActions = styled(CardActions, {
  shouldForwardProp: (prop) =>
    !['wsSize', 'actionsAlignment'].includes(prop as string),
})<{
  wsSize: WSCardSize;
  actionsAlignment: WSCardProps['actionsAlignment'];
}>(({ wsSize, actionsAlignment }) => {
  const sizeStyles = getSizeStyles(wsSize);

  const alignmentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
    'space-between': 'space-between',
  };

  return {
    padding: sizeStyles.footerPadding,
    justifyContent: alignmentMap[actionsAlignment || 'right'],
    gap: '8px',

    '& .MuiButton-root': {
      minWidth: 'auto',
    },
  };
});

// ==============================================
// CARD MEDIA COMPONENT
// ==============================================

export const StyledWSCardMedia = styled('div', {
  shouldForwardProp: (prop) =>
    !['imageHeight', 'objectFit'].includes(prop as string),
})<{
  imageHeight?: string | number;
  objectFit?: string;
}>(({ imageHeight, objectFit }) => ({
  width: '100%',
  height: imageHeight || '200px',
  position: 'relative',
  overflow: 'hidden',

  '& img, & video': {
    width: '100%',
    height: '100%',
    objectFit: objectFit || 'cover',
    display: 'block',
  },
}));

// ==============================================
// LOADING SKELETON
// ==============================================

export const LoadingSkeleton = styled('div', {
  shouldForwardProp: (prop) => !['height', 'width'].includes(prop as string),
})<{
  height?: string | number;
  width?: string;
}>(({ height, width }) => ({
  height: height || '20px',
  width: width || '100%',
  backgroundColor: COLOR_PALETTES.neutral[200],
  borderRadius: '4px',
  background: `linear-gradient(90deg, ${COLOR_PALETTES.neutral[200]} 25%, ${COLOR_PALETTES.neutral[100]} 50%, ${COLOR_PALETTES.neutral[200]} 75%)`,
  backgroundSize: '200px 100%',
  animation: `${shimmer} 1.5s infinite`,
}));

// ==============================================
// CARD OVERLAY
// ==============================================

export const CardOverlay = styled('div', {
  shouldForwardProp: (prop) =>
    !['overlayColor', 'overlayOpacity'].includes(prop as string),
})<{
  overlayColor?: string;
  overlayOpacity?: number;
}>(({ overlayColor, overlayOpacity }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: overlayColor || 'rgba(0, 0, 0, 0.4)',
  opacity: overlayOpacity || 0.4,
  borderRadius: 'inherit',
  pointerEvents: 'none',
  zIndex: 1,
}));

// ==============================================
// DIVIDER COMPONENT
// ==============================================

export const StyledDivider = styled('hr')(({ theme }) => ({
  border: 'none',
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: 0,
  opacity: 0.6,
}));
