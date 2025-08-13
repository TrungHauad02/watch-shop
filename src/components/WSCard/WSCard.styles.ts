/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled, keyframes } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  CardMedia,
} from '@mui/material';
import { WSCardVariant, WSCardSize } from './WSCard.types';
import { BRAND_COLORS, COLOR_PALETTES } from '../../styles/colors';

// ==============================================
// ANIMATIONS
// ==============================================

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

const getSizeConfig = (size: WSCardSize) => {
  const sizeMap = {
    small: {
      padding: '12px',
      titleFontSize: '1rem',
      subtitleFontSize: '0.875rem',
      descriptionFontSize: '0.875rem',
      borderRadius: '8px',
      minHeight: '120px',
    },
    medium: {
      padding: '16px',
      titleFontSize: '1.25rem',
      subtitleFontSize: '0.875rem',
      descriptionFontSize: '0.875rem',
      borderRadius: '12px',
      minHeight: '160px',
    },
    large: {
      padding: '24px',
      titleFontSize: '1.5rem',
      subtitleFontSize: '1rem',
      descriptionFontSize: '1rem',
      borderRadius: '16px',
      minHeight: '200px',
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
        backgroundColor: theme.palette.background.paper,
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
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        hoverBoxShadow: isDark
          ? '0 4px 16px rgba(254, 231, 21, 0.1)'
          : '0 2px 8px rgba(16, 24, 32, 0.08)',
      };

    default:
      return {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        hoverBoxShadow: '0 6px 24px rgba(0, 0, 0, 0.12)',
      };
  }
};

// ==============================================
// STYLED CARD COMPONENT
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
  const variantStyles = getVariantStyles(wsVariant, theme);

  return {
    // Base styles
    position: 'relative',
    overflow: 'hidden',
    minHeight: sizeConfig.minHeight,
    borderRadius: sizeConfig.borderRadius,

    // Colors and background
    backgroundColor: variantStyles.backgroundColor,
    border: variantStyles.border,
    boxShadow: variantStyles.boxShadow,

    // Transitions
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

    // Hover effects
    ...(clickable && {
      cursor: 'pointer',
      userSelect: 'none',

      '&:hover': {
        boxShadow: variantStyles.hoverBoxShadow,
        transform: 'translateY(-2px)',
      },

      '&:focus-visible': {
        outline: `2px solid ${BRAND_COLORS.secondary}`,
        outlineOffset: '2px',
      },

      '&:active': {
        transform: 'translateY(0)',
      },
    }),

    // Loading state
    ...(loading && {
      cursor: 'wait',
      '&:hover': {
        transform: 'none',
      },
    }),

    // Responsive adjustments
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
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSCardSize;
}>(({ wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    padding: sizeConfig.padding,
    paddingBottom: `${parseInt(sizeConfig.padding) / 2}px`,

    '& .MuiCardHeader-title': {
      fontSize: sizeConfig.titleFontSize,
      fontWeight: 600,
      lineHeight: 1.3,
      color: 'inherit',
    },

    '& .MuiCardHeader-subheader': {
      fontSize: sizeConfig.subtitleFontSize,
      fontWeight: 400,
      lineHeight: 1.4,
      marginTop: '4px',
      opacity: 0.8,
    },
  };
});

// ==============================================
// STYLED CARD CONTENT
// ==============================================

export const StyledWSCardContent = styled(CardContent, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSCardSize;
}>(({ wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    padding: sizeConfig.padding,

    '&:last-child': {
      paddingBottom: sizeConfig.padding,
    },

    // Typography styles for content
    '& .WSCard-description': {
      fontSize: sizeConfig.descriptionFontSize,
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
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSCardSize;
}>(({ wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    padding: sizeConfig.padding,
    paddingTop: `${parseInt(sizeConfig.padding) / 2}px`,
    justifyContent: 'flex-end',
    gap: '8px',

    '& .MuiButton-root': {
      minWidth: 'auto',
    },
  };
});

// ==============================================
// STYLED CARD MEDIA
// ==============================================

export const StyledWSCardMedia = styled(CardMedia, {
  shouldForwardProp: (prop) => !['imageHeight'].includes(prop as string),
})<{
  imageHeight?: string | number;
}>(({ imageHeight }) => ({
  height: imageHeight || '200px',
  position: 'relative',
  overflow: 'hidden',
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
  marginBottom: '8px',
}));
