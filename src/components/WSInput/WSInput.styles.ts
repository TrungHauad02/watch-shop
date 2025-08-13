import { styled } from '@mui/material/styles';
import { TextField, FormHelperText, InputAdornment } from '@mui/material';
import { WSInputVariant, WSInputColor, WSInputSize } from './WSInput.types';
import {
  BRAND_COLORS,
  SEMANTIC_COLORS,
  COLOR_PALETTES,
} from '../../styles/colors';

// ==============================================
// COLOR CONFIGURATIONS
// ==============================================

const getInputColor = (
  color: WSInputColor,
  hasError: boolean,
  hasSuccess: boolean
): string => {
  // Handle error state first
  if (hasError) {
    return SEMANTIC_COLORS.error;
  }

  // Handle success state
  if (hasSuccess) {
    return SEMANTIC_COLORS.success;
  }

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

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeConfig = (size: WSInputSize) => {
  const sizeMap = {
    small: {
      height: '36px',
      padding: '6px 12px',
      fontSize: '0.875rem',
      iconSize: '16px',
      borderRadius: '6px',
    },
    medium: {
      height: '44px',
      padding: '10px 14px',
      fontSize: '1rem',
      iconSize: '20px',
      borderRadius: '8px',
    },
    large: {
      height: '52px',
      padding: '14px 16px',
      fontSize: '1.125rem',
      iconSize: '24px',
      borderRadius: '10px',
    },
  };

  return sizeMap[size];
};

// ==============================================
// STYLED TEXTFIELD COMPONENT
// ==============================================

export const StyledWSInput = styled(TextField, {
  shouldForwardProp: (prop) =>
    !['wsVariant', 'wsColor', 'wsSize', 'hasSuccess'].includes(prop as string),
})<{
  wsVariant: WSInputVariant;
  wsColor: WSInputColor;
  wsSize: WSInputSize;
  hasSuccess: boolean;
}>(({ theme, wsVariant, wsColor, wsSize, hasSuccess, error }) => {
  const focusColor = getInputColor(wsColor, !!error, hasSuccess);
  const sizeConfig = getSizeConfig(wsSize);

  return {
    // Base styles
    '& .MuiInputBase-root': {
      fontSize: sizeConfig.fontSize,
      borderRadius: sizeConfig.borderRadius,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontFamily: theme.typography.fontFamily,
      minHeight: sizeConfig.height,
    },

    // Input field styles
    '& .MuiInputBase-input': {
      padding: sizeConfig.padding,

      '&::placeholder': {
        opacity: 0.7,
      },

      // Remove autofill background
      '&:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
        transition: 'background-color 5000s ease-in-out 0s',
      },
    },

    // Multiline styles
    '& .MuiInputBase-inputMultiline': {
      padding: sizeConfig.padding,
      resize: 'vertical',
      minHeight: 'unset',
    },

    // Label styles
    '& .MuiInputLabel-root': {
      fontWeight: 500,

      '&.Mui-focused': {
        color: focusColor,
        fontWeight: 600,
      },

      '&.Mui-error': {
        color: SEMANTIC_COLORS.error,
      },
    },

    // Outlined variant styles
    '& .MuiOutlinedInput-notchedOutline': {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },

    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: `${focusColor}80`,
    },

    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: focusColor,
      borderWidth: '2px',
    },

    // Filled variant styles
    ...(wsVariant === 'filled' && {
      '& .MuiFilledInput-root': {
        borderRadius: `${sizeConfig.borderRadius} ${sizeConfig.borderRadius} 0 0`,

        '&:hover': {
          backgroundColor: `${focusColor}10`,
        },

        '&.Mui-focused': {
          backgroundColor: `${focusColor}15`,
        },

        '&:after': {
          borderBottomColor: focusColor,
        },
      },
    }),

    // Helper text styles
    '& .MuiFormHelperText-root': {
      marginTop: theme.spacing(0.5),
      fontSize: '0.75rem',
      lineHeight: 1.4,

      '&.Mui-error': {
        color: SEMANTIC_COLORS.error,
      },
    },

    // Disabled state
    '& .MuiInputBase-root.Mui-disabled': {
      backgroundColor: COLOR_PALETTES.neutral[100],
      color: COLOR_PALETTES.neutral[400],

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: COLOR_PALETTES.neutral[200],
      },
    },

    // Success state
    ...(hasSuccess &&
      !error && {
        '& .MuiInputLabel-root.Mui-focused': {
          color: SEMANTIC_COLORS.success,
        },

        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: SEMANTIC_COLORS.success,
        },

        '& .MuiFormHelperText-root': {
          color: SEMANTIC_COLORS.success,
        },
      }),

    // Focus-visible styles for accessibility
    '& .MuiInputBase-root.Mui-focusVisible': {
      outline: `2px solid ${focusColor}`,
      outlineOffset: '2px',
    },

    // Mobile optimizations
    [theme.breakpoints.down('sm')]: {
      '& .MuiInputBase-input': {
        fontSize: '16px', // Prevent zoom on mobile
      },
    },
  };
});

// ==============================================
// ICON WRAPPER COMPONENT
// ==============================================

export const IconWrapper = styled('div', {
  shouldForwardProp: (prop) => !['wsSize', 'position'].includes(prop as string),
})<{
  wsSize: WSInputSize;
  position: 'start' | 'end';
}>(({ wsSize, position }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sizeConfig.iconSize,
    color: COLOR_PALETTES.richBlack[500],

    ...(position === 'start' && {
      marginRight: '8px',
    }),

    ...(position === 'end' && {
      marginLeft: '8px',
    }),

    '& > *': {
      fontSize: 'inherit',
    },
  };
});

// ==============================================
// HELPER TEXT WITH CHARACTER COUNT
// ==============================================

export const StyledHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) => !['showCount'].includes(prop as string),
})<{
  showCount: boolean;
}>(({ theme, showCount }) => ({
  fontSize: '0.75rem',
  marginTop: theme.spacing(0.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',

  '& .helper-text': {
    flex: 1,
    marginRight: showCount ? theme.spacing(1) : 0,
  },

  '& .character-count': {
    flexShrink: 0,
    fontWeight: 500,
    fontSize: '0.75rem',
    color: COLOR_PALETTES.neutral[500],

    '&.over-limit': {
      color: SEMANTIC_COLORS.error,
      fontWeight: 600,
    },
  },
}));

// ==============================================
// INPUT ADORNMENT STYLED COMPONENT
// ==============================================

export const StyledInputAdornment = styled(InputAdornment, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSInputSize;
}>(({ wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    '& .MuiTypography-root': {
      fontSize: sizeConfig.iconSize,
      color: COLOR_PALETTES.richBlack[500],
    },

    '& .MuiSvgIcon-root': {
      fontSize: sizeConfig.iconSize,
      color: COLOR_PALETTES.richBlack[500],
    },
  };
});
