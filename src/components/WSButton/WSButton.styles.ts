/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { WSButtonVariant, WSButtonColor, WSButtonSize } from './WSButton.types';

// ==============================================
// COLOR CONFIGURATIONS - THEME INTEGRATED
// ==============================================

const getButtonColors = (theme: any, color: WSButtonColor) => {
  // CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc button tại đây
  const colorMap = {
    primary: {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      dark: theme.palette.primary.dark,
      contrastText: theme.palette.primary.contrastText,
    },
    secondary: {
      main: theme.palette.secondary.main,
      light: theme.palette.secondary.light,
      dark: theme.palette.secondary.dark,
      contrastText: theme.palette.secondary.contrastText,
    },
    success: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
      contrastText: theme.palette.success.contrastText,
    },
    warning: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
      contrastText: theme.palette.warning.contrastText,
    },
    error: {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
      contrastText: theme.palette.error.contrastText,
    },
    info: {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      dark: theme.palette.info.dark,
      contrastText: theme.palette.info.contrastText,
    },
  };

  return colorMap[color];
};

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeConfig = (size: WSButtonSize) => {
  // CUSTOMIZE: Bạn có thể chỉnh sửa kích thước button tại đây
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
// VARIANT STYLES - THEME AWARE
// ==============================================

const getVariantStyles = (
  theme: any,
  variant: WSButtonVariant,
  colors: ReturnType<typeof getButtonColors>
) => {
  const variants = {
    contained: {
      backgroundColor: colors.main,
      color: colors.contrastText,
      border: 'none',
      boxShadow: theme.shadows[2],

      '&:hover': {
        backgroundColor: colors.dark,
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows[4],
      },

      '&:active': {
        backgroundColor: colors.dark,
        transform: 'translateY(0)',
        boxShadow: theme.shadows[1],
      },
    },

    outlined: {
      backgroundColor: 'transparent',
      color: colors.main,
      border: `2px solid ${colors.main}`,
      boxShadow: 'none',

      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${colors.main}20`
            : `${colors.main}15`,
        borderColor: colors.dark,
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows[2],
      },

      '&:active': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${colors.main}30`
            : `${colors.main}25`,
        transform: 'translateY(0)',
      },
    },

    text: {
      backgroundColor: 'transparent',
      color: colors.main,
      border: 'none',
      boxShadow: 'none',

      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${colors.main}15`
            : `${colors.main}10`,
        transform: 'translateY(-1px)',
      },

      '&:active': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${colors.main}25`
            : `${colors.main}20`,
        transform: 'translateY(0)',
      },
    },
  };

  return variants[variant];
};

// ==============================================
// STYLED BUTTON COMPONENT - THEME INTEGRATED
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
  const colors = getButtonColors(theme, wsColor);
  const sizeConfig = getSizeConfig(wsSize);
  const variantStyles = getVariantStyles(theme, wsVariant, colors);

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
    transition: theme.transitions.create(
      ['background-color', 'border-color', 'color', 'box-shadow', 'transform'],
      {
        duration: theme.transitions.duration.short,
      }
    ),
    position: 'relative' as const,
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

  // Focus styles - CUSTOMIZE: Bạn có thể chỉnh sửa focus outline tại đây
  const focusStyles = {
    '&:focus-visible': {
      outline: `2px solid ${colors.main}`,
      outlineOffset: '2px',
      boxShadow: `0 0 0 3px ${colors.main}25`,
    },
  };

  // Disabled styles - Theme aware
  const disabledStyles = {
    '&:disabled, &.Mui-disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
      border:
        wsVariant === 'outlined'
          ? `2px solid ${theme.palette.action.disabled}`
          : 'none',
      boxShadow: 'none',
      cursor: 'not-allowed',
      transform: 'none',

      '&:hover': {
        backgroundColor: theme.palette.action.disabledBackground,
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
    ...variantStyles,
    ...loadingStyles,
    ...focusStyles,
    ...disabledStyles,
    ...responsiveStyles,
  };
});

// ==============================================
// LOADING SPINNER - THEME INTEGRATED
// ==============================================

export const LoadingSpinner = styled(CircularProgress, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSButtonSize;
}>(({ theme, wsSize }) => {
  const sizeValue = wsSize === 'small' ? 16 : wsSize === 'medium' ? 20 : 24;

  return {
    width: `${sizeValue}px !important`,
    height: `${sizeValue}px !important`,
    marginRight: theme.spacing(1),
    // CUSTOMIZE: Bạn có thể chỉnh sửa màu loading spinner tại đây
    color: 'inherit',
  };
});

// ==============================================
// ICON WRAPPER - THEME INTEGRATED
// ==============================================

export const IconWrapper = styled('span', {
  shouldForwardProp: (prop) => !['position', 'wsSize'].includes(prop as string),
})<{
  position: 'start' | 'end';
  wsSize: WSButtonSize;
}>(({ theme, position, wsSize }) => {
  const iconSize =
    wsSize === 'small' ? '16px' : wsSize === 'medium' ? '18px' : '20px';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: iconSize,

    ...(position === 'start' && {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(-0.5),
    }),

    ...(position === 'end' && {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(-0.5),
    }),

    '& > *': {
      fontSize: 'inherit',
    },
  };
});

// ==============================================
// BUTTON CONTENT WRAPPER - THEME INTEGRATED
// ==============================================

export const ButtonContent = styled('span')<{
  loading: boolean;
  preserveWidth: boolean;
}>(({ theme, loading, preserveWidth }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  transition: theme.transitions.create(['opacity', 'visibility'], {
    duration: theme.transitions.duration.short,
  }),

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
// LOADING OVERLAY - THEME INTEGRATED
// ==============================================

export const LoadingOverlay = styled('div')<{
  loading: boolean;
}>(({ theme, loading }) => ({
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
  transition: theme.transitions.create(['opacity', 'visibility'], {
    duration: theme.transitions.duration.short,
  }),
}));
