// src/components/WSButton/WSButton.styles.ts
import { styled, keyframes } from '@mui/material/styles';
import { Button } from '@mui/material';
import {
  WSButtonProps,
  WSButtonVariant,
  WSButtonColor,
  WSButtonSize,
  WSButtonShape,
} from './WSButton.types';
import {
  BRAND_COLORS,
  SEMANTIC_COLORS,
  COLOR_PALETTES,
} from '../../styles/colors';

// ==============================================
// ANIMATIONS
// ==============================================

const buttonGlow = keyframes`
  0% {
    box-shadow: 0 2px 8px rgba(254, 231, 21, 0.2);
  }
  50% {
    box-shadow: 0 4px 20px rgba(254, 231, 21, 0.4);
  }
  100% {
    box-shadow: 0 2px 8px rgba(254, 231, 21, 0.2);
  }
`;

const loadingSpinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// ==============================================
// COLOR CONFIGURATIONS
// ==============================================

const getButtonColors = (color: WSButtonColor, variant: WSButtonVariant) => {
  const colorMap = {
    primary: {
      main: BRAND_COLORS.primary,
      light: BRAND_COLORS.primaryLight,
      dark: BRAND_COLORS.primaryDark,
      contrast: BRAND_COLORS.secondary,
    },
    secondary: {
      main: BRAND_COLORS.secondary,
      light: BRAND_COLORS.secondaryLight,
      dark: BRAND_COLORS.secondaryDark,
      contrast: BRAND_COLORS.primary,
    },
    accent: {
      main: BRAND_COLORS.accent,
      light: BRAND_COLORS.accentLight,
      dark: BRAND_COLORS.accentDark,
      contrast: '#ffffff',
    },
    success: {
      main: SEMANTIC_COLORS.success,
      light: COLOR_PALETTES.emerald[400],
      dark: COLOR_PALETTES.emerald[700],
      contrast: '#ffffff',
    },
    warning: {
      main: SEMANTIC_COLORS.warning,
      light: COLOR_PALETTES.orange[400],
      dark: COLOR_PALETTES.orange[700],
      contrast: '#ffffff',
    },
    error: {
      main: SEMANTIC_COLORS.error,
      light: COLOR_PALETTES.red[400],
      dark: COLOR_PALETTES.red[700],
      contrast: '#ffffff',
    },
    info: {
      main: SEMANTIC_COLORS.info,
      light: COLOR_PALETTES.blue[400],
      dark: COLOR_PALETTES.blue[700],
      contrast: '#ffffff',
    },
  };

  const colors = colorMap[color];

  // Define base return type
  interface ButtonColors {
    backgroundColor: string;
    color: string;
    border: string;
    hoverBackgroundColor: string;
    hoverColor: string;
    activeBackgroundColor: string;
    background?: string;
    light?: string;
    main?: string;
  }

  switch (variant) {
    case 'contained':
      return {
        backgroundColor: colors.main,
        color: colors.contrast,
        border: 'none',
        hoverBackgroundColor: colors.dark,
        hoverColor: colors.contrast,
        activeBackgroundColor: colors.dark,
        main: colors.main,
        light: colors.light,
      } as ButtonColors;

    case 'outlined':
      return {
        backgroundColor: 'transparent',
        color: colors.main,
        border: `2px solid ${colors.main}`,
        hoverBackgroundColor: colors.main,
        hoverColor: colors.contrast,
        activeBackgroundColor: colors.dark,
        main: colors.main,
        light: colors.light,
      } as ButtonColors;

    case 'text':
      return {
        backgroundColor: 'transparent',
        color: colors.main,
        border: 'none',
        hoverBackgroundColor: `${colors.main}15`,
        hoverColor: colors.dark,
        activeBackgroundColor: `${colors.main}25`,
        main: colors.main,
        light: colors.light,
      } as ButtonColors;

    case 'gradient':
      return {
        backgroundColor: colors.main,
        color: colors.contrast,
        border: 'none',
        background: `linear-gradient(45deg, ${colors.main} 30%, ${colors.light} 90%)`,
        hoverBackgroundColor: colors.dark,
        hoverColor: colors.contrast,
        activeBackgroundColor: colors.dark,
        main: colors.main,
        light: colors.light,
      } as ButtonColors;

    default:
      return {
        backgroundColor: colors.main,
        color: colors.contrast,
        border: 'none',
        hoverBackgroundColor: colors.dark,
        hoverColor: colors.contrast,
        activeBackgroundColor: colors.dark,
        main: colors.main,
        light: colors.light,
      } as ButtonColors;
  }
};

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeStyles = (size: WSButtonSize) => {
  const sizeMap = {
    small: {
      height: '32px',
      padding: '6px 16px',
      fontSize: '0.875rem',
      fontWeight: 500,
      borderRadius: '6px',
      minWidth: '64px',
      iconSize: '16px',
    },
    medium: {
      height: '40px',
      padding: '8px 24px',
      fontSize: '0.875rem',
      fontWeight: 600,
      borderRadius: '8px',
      minWidth: '80px',
      iconSize: '18px',
    },
    large: {
      height: '48px',
      padding: '12px 32px',
      fontSize: '1rem',
      fontWeight: 600,
      borderRadius: '10px',
      minWidth: '120px',
      iconSize: '20px',
    },
  };

  return sizeMap[size];
};

// ==============================================
// SHAPE CONFIGURATIONS
// ==============================================

const getShapeStyles = (shape: WSButtonShape, size: WSButtonSize) => {
  const sizeStyles = getSizeStyles(size);

  switch (shape) {
    case 'square':
      return {
        borderRadius: '4px',
      };

    case 'circular':
      return {
        borderRadius: '50%',
        width: sizeStyles.height,
        height: sizeStyles.height,
        minWidth: sizeStyles.height,
        padding: '0',
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

const getHoverEffectStyles = (hoverEffect: WSButtonProps['hoverEffect']) => {
  switch (hoverEffect) {
    case 'lift':
      return {
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        },
      };

    case 'glow':
      return {
        '&:hover': {
          boxShadow: '0 0 20px rgba(254, 231, 21, 0.6)',
          animation: `${buttonGlow} 1.5s ease-in-out infinite`,
        },
      };

    case 'scale':
      return {
        '&:hover': {
          transform: 'scale(1.05)',
        },
      };

    case 'none':
      return {};

    default:
      return {
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
        },
      };
  }
};

// ==============================================
// STYLED BUTTON COMPONENT
// ==============================================

export const StyledWSButton = styled(Button, {
  shouldForwardProp: (prop) =>
    ![
      'wsVariant',
      'wsColor',
      'wsSize',
      'wsShape',
      'animate',
      'hoverEffect',
      'loading',
    ].includes(prop as string),
})<{
  wsVariant: WSButtonVariant;
  wsColor: WSButtonColor;
  wsSize: WSButtonSize;
  wsShape: WSButtonShape;
  animate: boolean;
  hoverEffect: WSButtonProps['hoverEffect'];
  loading: boolean;
}>(({
  theme,
  wsVariant,
  wsColor,
  wsSize,
  wsShape,
  animate,
  hoverEffect,
  loading,
}) => {
  const colors = getButtonColors(wsColor, wsVariant);
  const sizeStyles = getSizeStyles(wsSize);
  const shapeStyles = getShapeStyles(wsShape, wsSize);
  const hoverEffectStyles = getHoverEffectStyles(hoverEffect);

  return {
    // Base styles
    height: sizeStyles.height,
    padding: sizeStyles.padding,
    fontSize: sizeStyles.fontSize,
    fontWeight: sizeStyles.fontWeight,
    minWidth: sizeStyles.minWidth,
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none',
    letterSpacing: '0.025em',
    lineHeight: 1.5,

    // Colors and background
    backgroundColor:
      wsVariant === 'gradient' ? 'transparent' : colors.backgroundColor,
    background: wsVariant === 'gradient' ? colors.background : undefined,
    color: colors.color,
    border: colors.border,

    // Shape
    ...shapeStyles,

    // Base shadow and transitions
    boxShadow:
      wsVariant === 'contained' || wsVariant === 'gradient'
        ? '0 2px 8px rgba(0, 0, 0, 0.1)'
        : 'none',
    transition: animate ? 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',

    // Hover effects
    ...(animate && hoverEffectStyles),

    '&:hover': {
      backgroundColor:
        wsVariant === 'gradient' ? 'transparent' : colors.hoverBackgroundColor,
      background:
        wsVariant === 'gradient'
          ? `linear-gradient(45deg, ${colors.hoverBackgroundColor} 30%, ${colors.main} 90%)`
          : undefined,
      color: colors.hoverColor,
      ...(animate && hoverEffectStyles['&:hover']),
    },

    // Active state
    '&:active': {
      backgroundColor: colors.activeBackgroundColor,
      transform: animate ? 'translateY(0)' : undefined,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },

    // Focus state
    '&:focus-visible': {
      outline: `2px solid ${BRAND_COLORS.secondary}`,
      outlineOffset: '2px',
    },

    // Disabled state
    '&:disabled, &.Mui-disabled': {
      backgroundColor: COLOR_PALETTES.neutral[200],
      color: COLOR_PALETTES.neutral[400],
      border:
        wsVariant === 'outlined'
          ? `2px solid ${COLOR_PALETTES.neutral[200]}`
          : 'none',
      boxShadow: 'none',
      cursor: 'not-allowed',
      transform: 'none',

      '&:hover': {
        backgroundColor: COLOR_PALETTES.neutral[200],
        transform: 'none',
        boxShadow: 'none',
      },
    },

    // Loading state
    ...(loading && {
      cursor: 'wait',
      '&:hover': {
        transform: 'none',
      },
    }),

    // Icon styles
    '& .WSButton-startIcon': {
      marginRight: wsShape === 'circular' ? 0 : '8px',
      marginLeft: '-4px',
      fontSize: sizeStyles.iconSize,

      '& > *:nth-of-type(1)': {
        fontSize: 'inherit',
      },
    },

    '& .WSButton-endIcon': {
      marginLeft: wsShape === 'circular' ? 0 : '8px',
      marginRight: '-4px',
      fontSize: sizeStyles.iconSize,

      '& > *:nth-of-type(1)': {
        fontSize: 'inherit',
      },
    },

    // Loading spinner
    '& .WSButton-loadingSpinner': {
      width: sizeStyles.iconSize,
      height: sizeStyles.iconSize,
      border: `2px solid transparent`,
      borderTop: `2px solid currentColor`,
      borderRadius: '50%',
      animation: `${loadingSpinner} 1s linear infinite`,
    },

    // Responsive adjustments
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
});

// ==============================================
// LOADING INDICATOR COMPONENT
// ==============================================

export const LoadingIndicator = styled('div')<{
  size: WSButtonSize;
  position: 'start' | 'end' | 'center';
}>(({ size, position }) => {
  const sizeStyles = getSizeStyles(size);

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    ...(position === 'start' && {
      marginRight: '8px',
      marginLeft: '-4px',
    }),

    ...(position === 'end' && {
      marginLeft: '8px',
      marginRight: '-4px',
    }),

    '& .WSButton-loadingSpinner': {
      width: sizeStyles.iconSize,
      height: sizeStyles.iconSize,
      border: `2px solid transparent`,
      borderTop: `2px solid currentColor`,
      borderRadius: '50%',
      animation: `${loadingSpinner} 1s linear infinite`,
    },
  };
});

// ==============================================
// ICON WRAPPER COMPONENT
// ==============================================

export const IconWrapper = styled('span')<{
  size: WSButtonSize;
  position: 'start' | 'end';
}>(({ size, position }) => {
  const sizeStyles = getSizeStyles(size);

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sizeStyles.iconSize,

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

// ==============================================
// BUTTON CONTENT WRAPPER
// ==============================================

export const ButtonContent = styled('span')<{
  loading: boolean;
  preserveWidth: boolean;
}>(({ loading, preserveWidth }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',

  ...(loading &&
    preserveWidth && {
      visibility: 'hidden',
    }),

  ...(loading &&
    !preserveWidth && {
      opacity: 0,
    }),
}));

// ==============================================
// LOADING OVERLAY
// ==============================================

export const LoadingOverlay = styled('div')<{
  loading: boolean;
}>(({ loading }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: loading ? 1 : 0,
  visibility: loading ? 'visible' : 'hidden',
  transition: 'opacity 0.2s ease-in-out',
}));
