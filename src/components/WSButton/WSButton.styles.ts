import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { WSButtonVariant, WSButtonColor, WSButtonSize } from './WSButton.types';
import { BRAND_COLORS, SEMANTIC_COLORS } from '../../styles/colors';

// ==============================================
// COLOR CONFIGURATIONS
// ==============================================

const getButtonColor = (color: WSButtonColor): string => {
  const colorMap = {
    primary: BRAND_COLORS.primary,
    secondary: BRAND_COLORS.secondary,
    success: SEMANTIC_COLORS.success,
    warning: SEMANTIC_COLORS.warning,
    error: SEMANTIC_COLORS.error,
    info: SEMANTIC_COLORS.info,
  };

  return colorMap[color];
};

const getContrastColor = (color: WSButtonColor): string => {
  const contrastMap = {
    primary: BRAND_COLORS.secondary,
    secondary: BRAND_COLORS.primary,
    success: '#ffffff',
    warning: '#ffffff',
    error: '#ffffff',
    info: '#ffffff',
  };

  return contrastMap[color];
};

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeConfig = (size: WSButtonSize) => {
  const sizeMap = {
    small: {
      height: '32px',
      padding: '6px 16px',
      fontSize: '0.875rem',
      fontWeight: 500,
      borderRadius: '6px',
      minWidth: '64px',
    },
    medium: {
      height: '40px',
      padding: '8px 24px',
      fontSize: '0.875rem',
      fontWeight: 600,
      borderRadius: '8px',
      minWidth: '80px',
    },
    large: {
      height: '48px',
      padding: '12px 32px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      minWidth: '120px',
    },
  };

  return sizeMap[size];
};

// ==============================================
// STYLED BUTTON COMPONENT
// ==============================================

export const StyledWSButton = styled(Button, {
  shouldForwardProp: (prop) =>
    !['wsVariant', 'wsColor', 'wsSize', 'loading'].includes(prop as string),
})<{
  wsVariant: WSButtonVariant;
  wsColor: WSButtonColor;
  wsSize: WSButtonSize;
  loading: boolean;
}>(({ theme, wsVariant, wsColor, wsSize, loading }) => {
  const mainColor = getButtonColor(wsColor);
  const contrastColor = getContrastColor(wsColor);
  const sizeConfig = getSizeConfig(wsSize);

  // Base styles
  const baseStyles = {
    height: sizeConfig.height,
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    fontWeight: sizeConfig.fontWeight,
    minWidth: sizeConfig.minWidth,
    borderRadius: sizeConfig.borderRadius,
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none' as const,
    letterSpacing: '0.025em',
    lineHeight: 1.5,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
  };

  // Variant-specific styles
  const variantStyles = {
    contained: {
      backgroundColor: mainColor,
      color: contrastColor,
      border: 'none',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',

      '&:hover': {
        backgroundColor: `${mainColor}dd`,
        transform: 'translateY(-1px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      },

      '&:active': {
        backgroundColor: `${mainColor}bb`,
        transform: 'translateY(0)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      },
    },

    outlined: {
      backgroundColor: 'transparent',
      color: mainColor,
      border: `2px solid ${mainColor}`,
      boxShadow: 'none',

      '&:hover': {
        backgroundColor: `${mainColor}15`,
        borderColor: `${mainColor}dd`,
        transform: 'translateY(-1px)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },

      '&:active': {
        backgroundColor: `${mainColor}25`,
        transform: 'translateY(0)',
      },
    },

    text: {
      backgroundColor: 'transparent',
      color: mainColor,
      border: 'none',
      boxShadow: 'none',

      '&:hover': {
        backgroundColor: `${mainColor}10`,
        transform: 'translateY(-1px)',
      },

      '&:active': {
        backgroundColor: `${mainColor}20`,
        transform: 'translateY(0)',
      },
    },
  };

  // Loading styles
  const loadingStyles = loading
    ? {
        cursor: 'wait',
        '&:hover': {
          transform: 'none',
        },
      }
    : {};

  // Focus styles
  const focusStyles = {
    '&:focus-visible': {
      outline: `2px solid ${BRAND_COLORS.secondary}`,
      outlineOffset: '2px',
    },
  };

  // Disabled styles
  const disabledStyles = {
    '&:disabled, &.Mui-disabled': {
      backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
      color: theme.palette.mode === 'dark' ? '#666' : '#999',
      border:
        wsVariant === 'outlined'
          ? `2px solid ${theme.palette.mode === 'dark' ? '#333' : '#e0e0e0'}`
          : 'none',
      boxShadow: 'none',
      cursor: 'not-allowed',
      transform: 'none',

      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#f5f5f5',
        transform: 'none',
        boxShadow: 'none',
      },
    },
  };

  // Responsive styles
  const responsiveStyles = {
    [theme.breakpoints.down('sm')]: {
      ...(wsSize === 'large' && {
        height: '44px',
        padding: '10px 24px',
        fontSize: '0.875rem',
      }),
      ...(wsSize === 'medium' && {
        height: '36px',
        padding: '6px 16px',
      }),
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[wsVariant],
    ...loadingStyles,
    ...focusStyles,
    ...disabledStyles,
    ...responsiveStyles,
  };
});

// ==============================================
// LOADING SPINNER
// ==============================================

export const LoadingSpinner = styled(CircularProgress, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSButtonSize;
}>(({ wsSize }) => {
  const sizeValue = wsSize === 'small' ? 16 : wsSize === 'medium' ? 20 : 24;

  return {
    width: `${sizeValue}px !important`,
    height: `${sizeValue}px !important`,
    marginRight: '8px',
  };
});

// ==============================================
// ICON WRAPPER
// ==============================================

export const IconWrapper = styled('span', {
  shouldForwardProp: (prop) => !['position', 'wsSize'].includes(prop as string),
})<{
  position: 'start' | 'end';
  wsSize: WSButtonSize;
}>(({ position, wsSize }) => {
  const iconSize =
    wsSize === 'small' ? '16px' : wsSize === 'medium' ? '18px' : '20px';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: iconSize,

    ...(position === 'start' && {
      marginRight: '8px',
      marginLeft: '-4px',
    }),

    ...(position === 'end' && {
      marginLeft: '8px',
      marginRight: '-4px',
    }),

    '& > *': {
      fontSize: 'inherit',
    },
  };
});
