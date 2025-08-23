/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { TextField, FormHelperText, InputAdornment } from '@mui/material';
import { WSInputVariant, WSInputColor, WSInputSize } from './WSInput.types';

// ==============================================
// COLOR CONFIGURATIONS - THEME INTEGRATED
// ==============================================

/**
 * WSInput Color Mapping Guide
 * ===========================
 *
 * CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc input tại đây
 *
 * Cấu trúc màu cho input:
 * - focusColor: 🎯 Màu khi focus (border + label)
 * - hoverColor: 🎨 Màu khi hover
 * - backgroundColor: 🎨 Màu nền input
 * - textColor: 📝 Màu chữ
 */

const getInputColors = (
  theme: any,
  color: WSInputColor,
  hasError: boolean,
  hasSuccess: boolean
) => {
  // Error state always takes priority
  if (hasError) {
    return {
      main: theme.palette.error.main, // 🚨 Đỏ cho lỗi
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
    };
  }

  // Success state when no error
  if (hasSuccess) {
    return {
      main: theme.palette.success.main, // ✅ Xanh cho thành công
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
    };
  }

  // CUSTOMIZE: Mapping màu theme cho các trạng thái bình thường
  const colorMap = {
    primary: {
      main: theme.palette.primary.main, // 🎯 Rich Black (#101820)
      light: theme.palette.primary.light, // 🎯 Lighter Black
      dark: theme.palette.primary.dark, // 🎯 Darker Black
    },
    secondary: {
      main: theme.palette.secondary.main, // 🎯 Vivid Yellow (#FEE715)
      light: theme.palette.secondary.light, // 🎯 Light Yellow
      dark: theme.palette.secondary.dark, // 🎯 Gold
    },
    success: {
      main: theme.palette.success.main, // ✅ Green
      light: theme.palette.success.light,
      dark: theme.palette.success.dark,
    },
    warning: {
      main: theme.palette.warning.main, // ⚠️ Orange
      light: theme.palette.warning.light,
      dark: theme.palette.warning.dark,
    },
    error: {
      main: theme.palette.error.main, // 🚨 Red
      light: theme.palette.error.light,
      dark: theme.palette.error.dark,
    },
    info: {
      main: theme.palette.info.main, // ℹ️ Blue
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
  // CUSTOMIZE: Kích thước input cho từng size
  const sizeMap = {
    small: {
      height: '36px', // 📏 Chiều cao compact
      padding: '8px 12px', // 📐 Padding nhỏ
      fontSize: '0.875rem', // 📝 14px - mobile friendly
      iconSize: '16px', // 🎯 Icon nhỏ
      borderRadius: '6px', // 🔄 Bo góc nhẹ
    },
    medium: {
      height: '44px', // 📏 Chiều cao chuẩn
      padding: '10px 14px', // 📐 Padding cân bằng
      fontSize: '1rem', // 📝 16px - prevent mobile zoom
      iconSize: '20px', // 🎯 Icon vừa
      borderRadius: '8px', // 🔄 Bo góc chuẩn
    },
    large: {
      height: '52px', // 📏 Chiều cao rộng rãi
      padding: '14px 16px', // 📐 Padding lớn
      fontSize: '1.125rem', // 📝 18px - dễ đọc
      iconSize: '24px', // 🎯 Icon lớn
      borderRadius: '10px', // 🔄 Bo góc mềm mại
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

  const filledPadding = () => {
    switch (wsSize) {
      case 'small':
        return '12px 12px';
      case 'medium':
        return '14px 14px';
      case 'large':
        return '16px 16px';
      default:
        return sizeConfig.padding;
    }
  };

  return {
    // === BASE INPUT STYLES ===
    '& .MuiInputBase-root': {
      fontSize: sizeConfig.fontSize,
      borderRadius: sizeConfig.borderRadius,
      minHeight: sizeConfig.height,
      // 🎨 NỀN: Màu nền từ theme (tự động dark/light)
      backgroundColor: theme.palette.background.paper,
      fontFamily: theme.typography.fontFamily,
      transition: theme.transitions.create(
        ['border-color', 'background-color', 'box-shadow'],
        { duration: theme.transitions.duration.short }
      ),
    },

    // === INPUT FIELD STYLES ===
    '& .MuiInputBase-input': {
      padding: sizeConfig.padding,
      ...(wsVariant === 'filled' && {
        padding: filledPadding,
      }),
      // 📝 CHỮ: Màu text chính từ theme
      color: theme.palette.text.primary,

      '&::placeholder': {
        opacity: 0.7,
        // 📝 PLACEHOLDER: Màu text phụ
        color: theme.palette.text.secondary,
      },

      // === AUTOFILL STYLES - THEME AWARE ===
      '&:-webkit-autofill': {
        WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.paper} inset`,
        WebkitTextFillColor: theme.palette.text.primary,
        transition: 'background-color 5000s ease-in-out 0s',
      },
    },

    // === MULTILINE TEXTAREA ===
    '& .MuiInputBase-inputMultiline': {
      padding: sizeConfig.padding,
      resize: 'vertical',
      minHeight: 'unset',
    },

    // === LABEL STYLES ===
    // CUSTOMIZE: Styling cho input label
    '& .MuiInputLabel-root': {
      fontWeight: theme.typography.fontWeightMedium || 500,
      // 📝 LABEL: Màu text phụ khi không focus
      color: theme.palette.text.secondary,

      // 🎯 LABEL FOCUS: Màu theme color khi focus
      '&.Mui-focused': {
        color: focusColor,
        fontWeight: 600,
      },

      // 🚨 LABEL ERROR: Màu đỏ khi có lỗi
      '&.Mui-error': {
        color: theme.palette.error.main,
      },

      // ✅ LABEL SUCCESS: Màu xanh khi thành công
      ...(hasSuccess &&
        !error && {
          '&.Mui-focused': {
            color: theme.palette.success.main,
          },
        }),
    },

    // === OUTLINED VARIANT STYLES ===
    '& .MuiOutlinedInput-notchedOutline': {
      // 🔲 VIỀN: Màu divider mặc định
      borderColor: theme.palette.divider,
      transition: theme.transitions.create(['border-color'], {
        duration: theme.transitions.duration.short,
      }),
    },

    // 🎨 VIỀN HOVER: Màu nhạt của theme color
    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor:
        theme.palette.mode === 'dark'
          ? `${focusColor}80` // 50% opacity cho dark mode
          : `${focusColor}60`, // 37% opacity cho light mode
    },

    // 🎯 VIỀN FOCUS: Màu đậm + shadow cho focus
    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: focusColor,
      borderWidth: '2px',
      // ✨ SHADOW FOCUS: Glow effect khi focus
      boxShadow: `0 0 0 1px ${focusColor}25`,
    },

    // === FILLED VARIANT STYLES ===
    ...(wsVariant === 'filled' && {
      '& .MuiFilledInput-root': {
        borderRadius: `${sizeConfig.borderRadius} ${sizeConfig.borderRadius} 0 0`,
        // 🎨 NỀN FILLED: Màu nền nhạt
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[800]
            : theme.palette.grey[100],

        // 🎨 NỀN HOVER: Màu theme nhạt khi hover
        '&:hover': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? `${focusColor}15`
              : `${focusColor}10`,
        },

        // 🎨 NỀN FOCUS: Màu theme đậm hơn khi focus
        '&.Mui-focused': {
          backgroundColor:
            theme.palette.mode === 'dark'
              ? `${focusColor}20`
              : `${focusColor}15`,
        },

        // 🔲 UNDERLINE: Màu underline khi focus
        '&:after': {
          borderBottomColor: focusColor,
          borderBottomWidth: '2px',
        },
      },
    }),

    // === HELPER TEXT STYLES ===
    '& .MuiFormHelperText-root': {
      marginTop: theme.spacing(0.5),
      fontSize: theme.typography.caption.fontSize,
      lineHeight: 1.4,
      color: theme.palette.text.secondary,

      // 🚨 HELPER ERROR: Màu đỏ cho error message
      '&.Mui-error': {
        color: theme.palette.error.main,
      },
    },

    // === DISABLED STATE ===
    '& .MuiInputBase-root.Mui-disabled': {
      // 🚫 NỀN DISABLED: Màu disabled từ theme
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,

      '& .MuiOutlinedInput-notchedOutline': {
        // 🚫 VIỀN DISABLED: Màu disabled
        borderColor: theme.palette.action.disabled,
      },

      '& .MuiInputBase-input': {
        // 🚫 CHỮ DISABLED: Màu disabled cho text
        color: theme.palette.action.disabled,
        WebkitTextFillColor: theme.palette.action.disabled,
      },
    },

    // === SUCCESS STATE ===
    ...(hasSuccess &&
      !error && {
        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          // ✅ VIỀN SUCCESS: Xanh cho thành công
          borderColor: theme.palette.success.main,
          boxShadow: `0 0 0 1px ${theme.palette.success.main}25`,
        },

        '& .MuiFormHelperText-root': {
          // ✅ HELPER SUCCESS: Màu xanh cho success message
          color: theme.palette.success.main,
        },
      }),

    // === ACCESSIBILITY ===
    '& .MuiInputBase-root.Mui-focusVisible': {
      // ♿ FOCUS OUTLINE: Outline cho keyboard navigation
      outline: `2px solid ${focusColor}`,
      outlineOffset: '2px',
    },

    // === MOBILE OPTIMIZATIONS ===
    [theme.breakpoints.down('sm')]: {
      '& .MuiInputBase-input': {
        // 📱 MOBILE: 16px để prevent zoom trên iOS
        fontSize: '16px',
      },
    },

    // === DARK MODE ADJUSTMENTS ===
    ...(theme.palette.mode === 'dark' && {
      '& .MuiInputBase-root': {
        backgroundColor: theme.palette.background.paper,
      },

      '& .MuiOutlinedInput-notchedOutline': {
        // 🌙 DARK BORDER: Viền sáng hơn cho dark mode
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
// ICON WRAPPER COMPONENT
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
    // CUSTOMIZE: Màu mặc định cho icons
    color: theme.palette.text.secondary,

    // 📐 SPACING: Khoảng cách với text
    ...(position === 'start' && {
      marginRight: theme.spacing(1),
    }),
    ...(position === 'end' && {
      marginLeft: theme.spacing(1),
    }),

    '& > *': {
      fontSize: 'inherit',
    },

    // 🖱️ INTERACTIVE: Hover effect cho clickable icons
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
// HELPER TEXT WITH CHARACTER COUNT
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

    // 🚨 OVER LIMIT: Đỏ khi vượt giới hạn
    '&.over-limit': {
      color: theme.palette.error.main,
      fontWeight: 600,
    },

    // ⚠️ NEAR LIMIT: Cam khi gần giới hạn (80%)
    '&.near-limit': {
      color: theme.palette.warning.main,
      fontWeight: theme.typography.fontWeightMedium || 500,
    },
  },

  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  }),
}));

// ==============================================
// INPUT ADORNMENT STYLED COMPONENT
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

    // 🖱️ CLICKABLE: Hover effect cho interactive adornments
    '&.clickable': {
      cursor: 'pointer',

      '&:hover .MuiSvgIcon-root': {
        color: theme.palette.primary.main,
      },
    },
  };
});

// ==============================================
// INPUT CONTAINER
// ==============================================

export const InputContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',

  '&:focus-within': {
    outline: 'none',
  },

  // 🚨 ERROR CONTAINER: Styling cho error state
  '&.error': {
    '& .validation-icon': {
      color: theme.palette.error.main,
    },
  },

  // ✅ SUCCESS CONTAINER: Styling cho success state
  '&.success': {
    '& .validation-icon': {
      color: theme.palette.success.main,
    },
  },
}));
