// src/components/WSInput/WSInput.styles.ts
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

const getInputColors = (
  color: WSInputColor,
  hasError: boolean,
  hasSuccess: boolean
) => {
  // Handle error state first
  if (hasError) {
    return {
      borderColor: SEMANTIC_COLORS.error,
      borderColorHover: COLOR_PALETTES.red[600],
      borderColorFocus: SEMANTIC_COLORS.error,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.red[50],
      backgroundColorFocus: COLOR_PALETTES.red[50],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: SEMANTIC_COLORS.error,
      labelColorFocus: SEMANTIC_COLORS.error,
      helperTextColor: SEMANTIC_COLORS.error,
      placeholderColor: COLOR_PALETTES.red[400],
    };
  }

  // Handle success state
  if (hasSuccess) {
    return {
      borderColor: SEMANTIC_COLORS.success,
      borderColorHover: COLOR_PALETTES.emerald[600],
      borderColorFocus: SEMANTIC_COLORS.success,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.emerald[50],
      backgroundColorFocus: COLOR_PALETTES.emerald[50],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: SEMANTIC_COLORS.success,
      labelColorFocus: SEMANTIC_COLORS.success,
      helperTextColor: SEMANTIC_COLORS.success,
      placeholderColor: COLOR_PALETTES.emerald[400],
    };
  }

  const colorMap = {
    primary: {
      borderColor: COLOR_PALETTES.richBlack[300],
      borderColorHover: COLOR_PALETTES.richBlack[400],
      borderColorFocus: BRAND_COLORS.primary,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.richBlack[50],
      backgroundColorFocus: COLOR_PALETTES.vividYellow[50],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: COLOR_PALETTES.richBlack[600],
      labelColorFocus: BRAND_COLORS.primary,
      helperTextColor: COLOR_PALETTES.richBlack[600],
      placeholderColor: COLOR_PALETTES.richBlack[400],
    },
    secondary: {
      borderColor: COLOR_PALETTES.vividYellow[300],
      borderColorHover: COLOR_PALETTES.vividYellow[400],
      borderColorFocus: BRAND_COLORS.secondary,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.vividYellow[50],
      backgroundColorFocus: COLOR_PALETTES.vividYellow[100],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: COLOR_PALETTES.vividYellow[700],
      labelColorFocus: BRAND_COLORS.secondary,
      helperTextColor: COLOR_PALETTES.vividYellow[700],
      placeholderColor: COLOR_PALETTES.vividYellow[400],
    },
    accent: {
      borderColor: COLOR_PALETTES.gold[300],
      borderColorHover: COLOR_PALETTES.gold[400],
      borderColorFocus: BRAND_COLORS.accent,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.gold[50],
      backgroundColorFocus: COLOR_PALETTES.gold[100],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: COLOR_PALETTES.gold[700],
      labelColorFocus: BRAND_COLORS.accent,
      helperTextColor: COLOR_PALETTES.gold[700],
      placeholderColor: COLOR_PALETTES.gold[400],
    },
    success: {
      borderColor: COLOR_PALETTES.emerald[300],
      borderColorHover: COLOR_PALETTES.emerald[400],
      borderColorFocus: SEMANTIC_COLORS.success,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.emerald[50],
      backgroundColorFocus: COLOR_PALETTES.emerald[100],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: COLOR_PALETTES.emerald[700],
      labelColorFocus: SEMANTIC_COLORS.success,
      helperTextColor: COLOR_PALETTES.emerald[700],
      placeholderColor: COLOR_PALETTES.emerald[400],
    },
    warning: {
      borderColor: COLOR_PALETTES.orange[300],
      borderColorHover: COLOR_PALETTES.orange[400],
      borderColorFocus: SEMANTIC_COLORS.warning,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.orange[50],
      backgroundColorFocus: COLOR_PALETTES.orange[100],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: COLOR_PALETTES.orange[700],
      labelColorFocus: SEMANTIC_COLORS.warning,
      helperTextColor: COLOR_PALETTES.orange[700],
      placeholderColor: COLOR_PALETTES.orange[400],
    },
    error: {
      borderColor: COLOR_PALETTES.red[300],
      borderColorHover: COLOR_PALETTES.red[400],
      borderColorFocus: SEMANTIC_COLORS.error,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.red[50],
      backgroundColorFocus: COLOR_PALETTES.red[100],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: COLOR_PALETTES.red[700],
      labelColorFocus: SEMANTIC_COLORS.error,
      helperTextColor: COLOR_PALETTES.red[700],
      placeholderColor: COLOR_PALETTES.red[400],
    },
    info: {
      borderColor: COLOR_PALETTES.blue[300],
      borderColorHover: COLOR_PALETTES.blue[400],
      borderColorFocus: SEMANTIC_COLORS.info,
      backgroundColor: 'transparent',
      backgroundColorHover: COLOR_PALETTES.blue[50],
      backgroundColorFocus: COLOR_PALETTES.blue[100],
      textColor: COLOR_PALETTES.richBlack[800],
      labelColor: COLOR_PALETTES.blue[700],
      labelColorFocus: SEMANTIC_COLORS.info,
      helperTextColor: COLOR_PALETTES.blue[700],
      placeholderColor: COLOR_PALETTES.blue[400],
    },
  };

  return colorMap[color];
};

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeStyles = (size: WSInputSize) => {
  const sizeMap = {
    small: {
      height: '36px',
      padding: '6px 12px',
      fontSize: '0.875rem',
      labelFontSize: '0.75rem',
      helperFontSize: '0.75rem',
      iconSize: '16px',
      borderRadius: '6px',
    },
    medium: {
      height: '44px',
      padding: '10px 14px',
      fontSize: '1rem',
      labelFontSize: '0.875rem',
      helperFontSize: '0.75rem',
      iconSize: '20px',
      borderRadius: '8px',
    },
    large: {
      height: '52px',
      padding: '14px 16px',
      fontSize: '1.125rem',
      labelFontSize: '1rem',
      helperFontSize: '0.875rem',
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
    ![
      'wsVariant',
      'wsColor',
      'wsSize',
      'hasSuccess',
      'responsive',
      'mobileVariant',
    ].includes(prop as string),
})<{
  wsVariant: WSInputVariant;
  wsColor: WSInputColor;
  wsSize: WSInputSize;
  hasSuccess: boolean;
  responsive: boolean;
  mobileVariant?: WSInputVariant;
}>(({
  theme,
  wsVariant,
  wsColor,
  wsSize,
  hasSuccess,
  error,
  responsive,
  mobileVariant,
}) => {
  const colors = getInputColors(wsColor, !!error, hasSuccess);
  const sizeStyles = getSizeStyles(wsSize);

  return {
    // Base styles
    '& .MuiInputBase-root': {
      fontSize: sizeStyles.fontSize,
      borderRadius: sizeStyles.borderRadius,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      fontFamily: theme.typography.fontFamily,

      // Size-specific height
      minHeight: sizeStyles.height,

      // Color and interaction styles
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.borderColorHover,
        },
      },

      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.borderColorFocus,
          borderWidth: '2px',
        },
      },

      '&.Mui-disabled': {
        backgroundColor: COLOR_PALETTES.neutral[100],
        color: COLOR_PALETTES.neutral[400],

        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: COLOR_PALETTES.neutral[200],
        },
      },
    },

    // Input field styles
    '& .MuiInputBase-input': {
      padding: sizeStyles.padding,
      color: colors.textColor,

      '&::placeholder': {
        color: colors.placeholderColor,
        opacity: 1,
      },

      // Remove autofill background
      '&:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${colors.backgroundColorFocus} inset`,
        WebkitTextFillColor: colors.textColor,
        transition: 'background-color 5000s ease-in-out 0s',
      },
    },

    // Multiline styles
    '& .MuiInputBase-inputMultiline': {
      padding: sizeStyles.padding,
      resize: 'vertical',
      minHeight: 'unset',
    },

    // Label styles
    '& .MuiInputLabel-root': {
      fontSize: sizeStyles.labelFontSize,
      color: colors.labelColor,
      fontWeight: 500,

      '&.Mui-focused': {
        color: colors.labelColorFocus,
        fontWeight: 600,
      },

      '&.Mui-error': {
        color: SEMANTIC_COLORS.error,
      },

      '&.Mui-disabled': {
        color: COLOR_PALETTES.neutral[400],
      },
    },

    // Outlined variant specific styles
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: colors.borderColor,
      borderWidth: '1px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },

    // Filled variant specific styles
    ...(wsVariant === 'filled' && {
      '& .MuiFilledInput-root': {
        backgroundColor: colors.backgroundColor,
        borderRadius: `${sizeStyles.borderRadius} ${sizeStyles.borderRadius} 0 0`,

        '&:hover': {
          backgroundColor: colors.backgroundColorHover,
        },

        '&.Mui-focused': {
          backgroundColor: colors.backgroundColorFocus,
        },

        '&:before': {
          borderBottomColor: colors.borderColor,
        },

        '&:hover:before': {
          borderBottomColor: colors.borderColorHover,
        },

        '&:after': {
          borderBottomColor: colors.borderColorFocus,
        },
      },
    }),

    // Standard variant specific styles
    ...(wsVariant === 'standard' && {
      '& .MuiInput-underline': {
        '&:before': {
          borderBottomColor: colors.borderColor,
        },

        '&:hover:before': {
          borderBottomColor: colors.borderColorHover,
        },

        '&:after': {
          borderBottomColor: colors.borderColorFocus,
        },
      },
    }),

    // Helper text styles
    '& .MuiFormHelperText-root': {
      fontSize: sizeStyles.helperFontSize,
      color: colors.helperTextColor,
      marginTop: theme.spacing(0.5),
      lineHeight: 1.4,

      '&.Mui-error': {
        color: SEMANTIC_COLORS.error,
      },
    },

    // Responsive styles
    ...(responsive && {
      [theme.breakpoints.down('sm')]: {
        // Mobile-specific adjustments
        '& .MuiInputBase-root': {
          fontSize: '16px', // Prevent zoom on mobile
          minHeight:
            wsSize === 'large' ? '48px' : wsSize === 'medium' ? '44px' : '40px',
        },

        '& .MuiInputBase-input': {
          padding:
            wsSize === 'large'
              ? '12px 14px'
              : wsSize === 'medium'
                ? '10px 12px'
                : '8px 10px',
        },

        // Switch to mobile variant if specified
        ...(mobileVariant &&
          mobileVariant !== wsVariant && {
            '& .MuiInputBase-root': {
              ...(mobileVariant === 'filled' && {
                backgroundColor: colors.backgroundColor,
                borderRadius: `${sizeStyles.borderRadius} ${sizeStyles.borderRadius} 0 0`,
              }),
            },
          }),
      },

      [theme.breakpoints.down('xs')]: {
        // Extra small mobile adjustments
        '& .MuiInputBase-root': {
          fontSize: '16px',
          minHeight: '44px', // Consistent height on very small screens
        },

        '& .MuiInputBase-input': {
          padding: '10px 12px',
        },
      },
    }),

    // Focus-visible styles for accessibility
    '& .MuiInputBase-root.Mui-focusVisible': {
      outline: `2px solid ${colors.borderColorFocus}`,
      outlineOffset: '2px',
    },
  };
});

// ==============================================
// ICON WRAPPER COMPONENT
// ==============================================

export const IconWrapper = styled('div')<{
  size: WSInputSize;
  position: 'start' | 'end';
}>(({ size, position }) => {
  const sizeStyles = getSizeStyles(size);

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sizeStyles.iconSize,
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

export const StyledHelperText = styled(FormHelperText)<{
  wsSize: WSInputSize;
  showCount: boolean;
}>(({ theme, wsSize, showCount }) => {
  const sizeStyles = getSizeStyles(wsSize);

  return {
    fontSize: sizeStyles.helperFontSize,
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
  };
});

// ==============================================
// INPUT ADORNMENT STYLED COMPONENT
// ==============================================

export const StyledInputAdornment = styled(InputAdornment)<{
  wsSize: WSInputSize;
}>(({ wsSize }) => {
  const sizeStyles = getSizeStyles(wsSize);

  return {
    '& .MuiTypography-root': {
      fontSize: sizeStyles.iconSize,
      color: COLOR_PALETTES.richBlack[500],
    },

    '& .MuiSvgIcon-root': {
      fontSize: sizeStyles.iconSize,
      color: COLOR_PALETTES.richBlack[500],
    },
  };
});
