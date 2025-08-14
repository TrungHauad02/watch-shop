/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { TextField, FormHelperText, InputAdornment } from '@mui/material';
import { WSInputVariant, WSInputColor, WSInputSize } from './WSInput.types';

// ==============================================
// COLOR CONFIGURATIONS - THEME INTEGRATED
// ==============================================

const getInputColors = (
  theme: any,
  color: WSInputColor,
  hasError: boolean,
  hasSuccess: boolean
) => {
  // Handle error state first
  if (hasError) {
    return {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
    };
  }

  // Handle success state
  if (hasSuccess) {
    return {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
    };
  }

  // CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc input tại đây
  const colorMap = {
    primary: {
      main: theme.palette.primary.main,
      light: theme.palette.primary.light,
      dark: theme.palette.primary.dark,
    },
    secondary: {
      main: theme.palette.secondary.main,
      light: theme.palette.secondary.light,
      dark: theme.palette.secondary.dark,
    },
    success: {
      main: theme.palette.success.main,
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
    },
    warning: {
      main: theme.palette.warning.main,
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
    },
    error: {
      main: theme.palette.error.main,
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
    },
    info: {
      main: theme.palette.info.main,
      light: theme.palette.info.light,
      dark: theme.palette.info.dark,
    },
  };

  return colorMap[color];
};

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeConfig = (size: WSInputSize) => {
  // CUSTOMIZE: Bạn có thể chỉnh sửa kích thước input tại đây
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
// STYLED TEXTFIELD COMPONENT - THEME INTEGRATED
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
  const colors = getInputColors(theme, wsColor, !!error, hasSuccess);
  const sizeConfig = getSizeConfig(wsSize);
  const focusColor = colors.main;

  return {
    // Base styles
    '& .MuiInputBase-root': {
      fontSize: sizeConfig.fontSize,
      borderRadius: sizeConfig.borderRadius,
      transition: theme.transitions.create(
        ['border-color', 'background-color', 'box-shadow'],
        {
          duration: theme.transitions.duration.short,
        }
      ),
      fontFamily: theme.typography.fontFamily,
      minHeight: sizeConfig.height,
      backgroundColor: theme.palette.background.paper,
    },

    // Input field styles
    '& .MuiInputBase-input': {
      padding: sizeConfig.padding,
      color: theme.palette.text.primary,

      '&::placeholder': {
        opacity: 0.7,
        color: theme.palette.text.secondary,
      },

      // Remove autofill background - theme aware
      '&:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
        transition: 'background-color 5000s ease-in-out 0s',
        WebkitTextFillColor: theme.palette.text.primary,
      },
    },

    // Multiline styles
    '& .MuiInputBase-inputMultiline': {
      padding: sizeConfig.padding,
      resize: 'vertical',
      minHeight: 'unset',
    },

    // Label styles - CUSTOMIZE: Bạn có thể chỉnh sửa label styling tại đây
    '& .MuiInputLabel-root': {
      fontWeight: theme.typography.fontWeightMedium || 500,
      color: theme.palette.text.secondary,

      '&.Mui-focused': {
        color: focusColor,
        fontWeight: 600,
      },

      '&.Mui-error': {
        color: theme.palette.error.main,
      },

      // Success state
      ...(hasSuccess &&
        !error && {
          '&.Mui-focused': {
            color: theme.palette.success.main,
          },
        }),
    },

    // Outlined variant styles
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
      transition: theme.transitions.create(['border-color'], {
        duration: theme.transitions.duration.short,
      }),
    },

    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor:
        theme.palette.mode === 'dark' ? `${focusColor}80` : `${focusColor}60`,
    },

    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: focusColor,
      borderWidth: '2px',
      boxShadow: `0 0 0 1px ${focusColor}25`,
    },

    // Filled variant styles
    ...(wsVariant === 'filled' && {
      '& .MuiFilledInput-root': {
        borderRadius: `${sizeConfig.borderRadius} ${sizeConfig.borderRadius} 0 0`,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[100],

        '&:hover': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? `${focusColor}15`
              : `${focusColor}10`,
        },

        '&.Mui-focused': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? `${focusColor}20`
              : `${focusColor}15`,
        },

        '&:after': {
          borderBottomColor: focusColor,
          borderBottomWidth: '2px',
        },
      },
    }),

    // Helper text styles
    '& .MuiFormHelperText-root': {
      marginTop: theme.spacing(0.5),
      fontSize: theme.typography.caption.fontSize,
      lineHeight: 1.4,
      color: theme.palette.text.secondary,

      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },

    // Disabled state - theme aware
    '& .MuiInputBase-root.Mui-disabled': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.action.disabled,
      },

      '& .MuiInputBase-input': {
        color: theme.palette.action.disabled,
        WebkitTextFillColor: theme.palette.action.disabled,
      },
    },

    // Success state - theme integrated
    ...(hasSuccess &&
      !error && {
        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.success.main,
          boxShadow: `0 0 0 1px ${theme.palette.success.main}25`,
        },

        '& .MuiFormHelperText-root': {
          color: theme.palette.success.main,
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

    // Dark mode specific adjustments
    ...(theme.palette.mode === 'dark' && {
      '& .MuiInputBase-root': {
        backgroundColor: theme.palette.background.paper,
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.grey[700],
      },

      '& .MuiInputBase-input:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
        WebkitTextFillColor: theme.palette.text.primary,
      },
    }),
  };
});

// ==============================================
// ICON WRAPPER COMPONENT - THEME INTEGRATED
// ==============================================

export const IconWrapper = styled('div', {
  shouldForwardProp: (prop) => !['wsSize', 'position'].includes(prop as string),
})<{
  wsSize: WSInputSize;
  position: 'start' | 'end';
}>(({ theme, wsSize, position }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sizeConfig.iconSize,
    // CUSTOMIZE: Bạn có thể chỉnh sửa màu icon tại đây
    color: theme.palette.text.secondary,

    ...(position === 'start' && {
      marginRight: theme.spacing(1),
    }),

    ...(position === 'end' && {
      marginLeft: theme.spacing(1),
    }),

    '& > *': {
      fontSize: 'inherit',
    },

    // Hover effect for interactive icons
    '&.interactive': {
      cursor: 'pointer',
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.shorter,
      }),

      '&:hover': {
        color: theme.palette.primary.main,
      },
    },
  };
});

// ==============================================
// HELPER TEXT WITH CHARACTER COUNT - THEME INTEGRATED
// ==============================================

export const StyledHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) => !['showCount'].includes(prop as string),
})<{
  showCount: boolean;
}>(({ theme, showCount }) => ({
  fontSize: theme.typography.caption.fontSize,
  marginTop: theme.spacing(0.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  color: theme.palette.text.secondary,

  '& .helper-text': {
    flex: 1,
    marginRight: showCount ? theme.spacing(1) : 0,
    lineHeight: 1.4,
  },

  '& .character-count': {
    flexShrink: 0,
    fontWeight: theme.typography.fontWeightMedium || 500,
    fontSize: theme.typography.caption.fontSize,
    color: theme.palette.text.secondary,

    '&.over-limit': {
      color: theme.palette.error.main,
      fontWeight: 600,
    },

    '&.near-limit': {
      color: theme.palette.warning.main,
      fontWeight: theme.typography.fontWeightMedium || 500,
    },
  },

  // Theme transition
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  }),
}));

// ==============================================
// INPUT ADORNMENT STYLED COMPONENT - THEME INTEGRATED
// ==============================================

export const StyledInputAdornment = styled(InputAdornment, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSInputSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    '& .MuiTypography-root': {
      fontSize: sizeConfig.iconSize,
      color: theme.palette.text.secondary,
    },

    '& .MuiSvgIcon-root': {
      fontSize: sizeConfig.iconSize,
      color: theme.palette.text.secondary,
      transition: theme.transitions.create(['color'], {
        duration: theme.transitions.duration.shorter,
      }),
    },

    // Interactive adornments
    '&.clickable': {
      cursor: 'pointer',

      '&:hover .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  };
});

// ==============================================
// INPUT CONTAINER - THEME INTEGRATED
// ==============================================

export const InputContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',

  // Focus ring for better accessibility
  '&:focus-within': {
    outline: 'none',
  },

  // Error state container
  '&.error': {
    '& .validation-icon': {
      color: theme.palette.error.main,
    },
  },

  // Success state container
  '&.success': {
    '& .validation-icon': {
      color: theme.palette.success.main,
    },
  },
}));
