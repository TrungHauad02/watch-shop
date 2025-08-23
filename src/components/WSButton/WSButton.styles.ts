/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import { WSButtonVariant, WSButtonColor, WSButtonSize } from './WSButton.types';

// ==============================================
// COLOR CONFIGURATIONS - THEME INTEGRATED
// ==============================================

/**
 * WSButton Color Mapping Guide
 * ===========================
 *
 * CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc button tại đây
 *
 * Cấu trúc màu cho mỗi variant:
 * - backgroundColor: 🎨 Màu nền button
 * - color: 📝 Màu chữ/icon
 * - border: 🔲 Màu viền (chỉ cho outlined)
 * - hoverBackgroundColor: 🎨 Màu nền khi hover
 * - hoverColor: 📝 Màu chữ khi hover
 * - activeBackgroundColor: 🎨 Màu nền khi click
 */

const getButtonColors = (theme: any, color: WSButtonColor) => {
  // CUSTOMIZE: Mapping màu theme sang button elements
  const colorMap = {
    primary: {
      main: theme.palette.primary.main, // 🎨 #101820 (Rich Black)
      light: theme.palette.primary.light, // 🎨 #212529 (Lighter Black)
      dark: theme.palette.primary.dark, // 🎨 #050a0f (Darker Black)
      contrastText: theme.palette.primary.contrastText, // 📝 #FEE715 (Vivid Yellow)
    },
    secondary: {
      main: theme.palette.secondary.main, // 🎨 #FEE715 (Vivid Yellow)
      light: theme.palette.secondary.light, // 🎨 #fff4c4 (Light Yellow)
      dark: theme.palette.secondary.dark, // 🎨 #f59e0b (Gold)
      contrastText: theme.palette.secondary.contrastText, // 📝 #101820 (Rich Black)
    },
    success: {
      main: theme.palette.success.main, // 🎨 Green for positive actions
      light: theme.palette.success.light, // 🎨 Light Green
      dark: theme.palette.success.dark, // 🎨 Dark Green
      contrastText: theme.palette.success.contrastText || '#ffffff', // 📝 White
    },
    warning: {
      main: theme.palette.warning.main, // 🎨 Orange for warnings
      light: theme.palette.warning.light, // 🎨 Light Orange
      dark: theme.palette.warning.dark, // 🎨 Dark Orange
      contrastText: theme.palette.warning.contrastText || '#ffffff', // 📝 White
    },
    error: {
      main: theme.palette.error.main, // 🎨 Red for destructive actions
      light: theme.palette.error.light, // 🎨 Light Red
      dark: theme.palette.error.dark, // 🎨 Dark Red
      contrastText: theme.palette.error.contrastText || '#ffffff', // 📝 White
    },
    info: {
      main: theme.palette.info.main, // 🎨 Blue for informational
      light: theme.palette.info.light, // 🎨 Light Blue
      dark: theme.palette.info.dark, // 🎨 Dark Blue
      contrastText: theme.palette.info.contrastText || '#ffffff', // 📝 White
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
      height: '32px', // 📏 Chiều cao nhỏ
      padding: '6px 16px', // 📐 Padding compact
      fontSize: '0.875rem', // 📝 Font size nhỏ (14px)
      fontWeight: 500, // 📝 Font weight medium
      borderRadius: '6px', // 🔄 Bo góc nhỏ
      minWidth: '64px', // 📏 Độ rộng tối thiểu
      iconSize: '16px', // 🎯 Kích thước icon
    },
    medium: {
      height: '40px', // 📏 Chiều cao vừa
      padding: '8px 24px', // 📐 Padding chuẩn
      fontSize: '0.875rem', // 📝 Font size vừa (14px)
      fontWeight: 600, // 📝 Font weight semi-bold
      borderRadius: '8px', // 🔄 Bo góc vừa
      minWidth: '80px', // 📏 Độ rộng tối thiểu
      iconSize: '18px', // 🎯 Kích thước icon
    },
    large: {
      height: '48px', // 📏 Chiều cao lớn
      padding: '12px 32px', // 📐 Padding rộng rãi
      fontSize: '1rem', // 📝 Font size lớn (16px)
      fontWeight: 600, // 📝 Font weight semi-bold
      borderRadius: '10px', // 🔄 Bo góc lớn
      minWidth: '120px', // 📏 Độ rộng tối thiểu
      iconSize: '20px', // 🎯 Kích thước icon
    },
  };

  return sizeMap[size];
};

// ==============================================
// VARIANT STYLES - THEME AWARE WITH VISUAL COMMENTS
// ==============================================

const getVariantStyles = (
  theme: any,
  variant: WSButtonVariant,
  colors: ReturnType<typeof getButtonColors>
) => {
  const variants = {
    // === CONTAINED VARIANT ===
    contained: {
      // 🎨 NỀN: Màu chính của theme (Rich Black cho primary)
      backgroundColor: colors.main,
      // 📝 CHỮ: Màu tương phản (Vivid Yellow cho primary)
      color: colors.contrastText,
      // 🔲 VIỀN: Không có viền cho contained
      border: 'none',
      // ✨ SHADOW: Độ bóng nhẹ để tạo depth
      boxShadow: theme.shadows[2],

      '&:hover': {
        // 🎨 NỀN HOVER: Màu đậm hơn khi hover
        backgroundColor: colors.dark,
        // ✨ HIỆU ỨNG: Nâng lên nhẹ
        transform: 'translateY(-1px)',
        // ✨ SHADOW HOVER: Bóng đậm hơn khi hover
        boxShadow: theme.shadows[4],
      },

      '&:active': {
        // 🎨 NỀN ACTIVE: Giữ màu đậm khi nhấn
        backgroundColor: colors.dark,
        // ✨ HIỆU ỨNG: Nhấn xuống
        transform: 'translateY(0)',
        // ✨ SHADOW ACTIVE: Bóng nhẹ khi nhấn
        boxShadow: theme.shadows[1],
      },
    },

    // === OUTLINED VARIANT ===
    outlined: {
      // 🎨 NỀN: Trong suốt ban đầu
      backgroundColor: 'transparent',
      // 📝 CHỮ: Màu chính để tương phản với nền
      color: colors.main,
      // 🔲 VIỀN: Màu chính để định nghĩa button boundary
      border: `2px solid ${colors.main}`,
      // ✨ SHADOW: Không có bóng cho outlined
      boxShadow: 'none',

      '&:hover': {
        // 🎨 NỀN HOVER: Fill màu nhạt (theme-aware opacity)
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${colors.main}20` // 20% opacity cho dark mode
            : `${colors.main}15`, // 15% opacity cho light mode
        // 🔲 VIỀN HOVER: Đậm hơn khi hover
        borderColor: colors.dark,
        // ✨ HIỆU ỨNG: Nâng lên nhẹ
        transform: 'translateY(-1px)',
        // ✨ SHADOW HOVER: Thêm bóng nhẹ
        boxShadow: theme.shadows[2],
      },

      '&:active': {
        // 🎨 NỀN ACTIVE: Fill đậm hơn khi nhấn
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${colors.main}30` // 30% opacity cho dark mode
            : `${colors.main}25`, // 25% opacity cho light mode
        // ✨ HIỆU ỨNG: Nhấn xuống
        transform: 'translateY(0)',
      },
    },

    // === TEXT VARIANT ===
    text: {
      // 🎨 NỀN: Hoàn toàn trong suốt
      backgroundColor: 'transparent',
      // 📝 CHỮ: Màu chính để dễ đọc
      color: colors.main,
      // 🔲 VIỀN: Không có viền
      border: 'none',
      // ✨ SHADOW: Không có bóng
      boxShadow: 'none',

      '&:hover': {
        // 🎨 NỀN HOVER: Fill rất nhạt để có feedback visual
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${colors.main}15` // 15% opacity cho dark mode
            : `${colors.main}10`, // 10% opacity cho light mode
        // ✨ HIỆU ỨNG: Nâng lên nhẹ
        transform: 'translateY(-1px)',
      },

      '&:active': {
        // 🎨 NỀN ACTIVE: Fill đậm hơn một chút khi nhấn
        backgroundColor:
          theme.palette.mode === 'dark'
            ? `${colors.main}25` // 25% opacity cho dark mode
            : `${colors.main}20`, // 20% opacity cho light mode
        // ✨ HIỆU ỨNG: Nhấn xuống
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

  // === BASE STYLES ===
  const baseStyles = {
    // 📏 Kích thước cơ bản
    height: sizeConfig.height,
    padding: sizeConfig.padding,
    fontSize: sizeConfig.fontSize,
    fontWeight: sizeConfig.fontWeight,
    minWidth: sizeConfig.minWidth,
    borderRadius: sizeConfig.borderRadius,

    // 📝 Typography
    fontFamily: theme.typography.fontFamily,
    textTransform: 'none' as const,
    letterSpacing: '0.025em',
    lineHeight: 1.5,

    // ✨ Transitions cho smooth animations
    transition: theme.transitions.create(
      ['background-color', 'border-color', 'color', 'box-shadow', 'transform'],
      {
        duration: theme.transitions.duration.short,
      }
    ),

    // 📐 Positioning cho loading overlay
    position: 'relative' as const,
  };

  // === LOADING STYLES ===
  const loadingStyles = loading
    ? {
        // 🔄 Cursor chờ khi loading
        cursor: 'wait',
        '&:hover': {
          // ✨ Tắt hover effect khi loading
          transform: 'none',
        },
      }
    : {};

  // === FOCUS STYLES ===
  // CUSTOMIZE: Bạn có thể chỉnh sửa focus outline tại đây
  const focusStyles = {
    '&:focus-visible': {
      // 🎯 Outline cho accessibility
      outline: `2px solid ${colors.main}`,
      outlineOffset: '2px',
      // ✨ Glow effect khi focus
      boxShadow: `0 0 0 3px ${colors.main}25`,
    },
  };

  // === DISABLED STYLES - THEME AWARE ===
  const disabledStyles = {
    '&:disabled, &.Mui-disabled': {
      // 🎨 NỀN DISABLED: Xám nhạt từ theme
      backgroundColor: theme.palette.action.disabledBackground,
      // 📝 CHỮ DISABLED: Xám đậm từ theme
      color: theme.palette.action.disabled,
      // 🔲 VIỀN DISABLED: Chỉ cho outlined variant
      border:
        wsVariant === 'outlined'
          ? `2px solid ${theme.palette.action.disabled}`
          : 'none',
      // ✨ Tắt tất cả effects
      boxShadow: 'none',
      cursor: 'not-allowed',
      transform: 'none',

      '&:hover': {
        // 🚫 Không có hover effect khi disabled
        backgroundColor: theme.palette.action.disabledBackground,
        transform: 'none',
        boxShadow: 'none',
      },
    },
  };

  // === RESPONSIVE STYLES ===
  const responsiveStyles = {
    // 📱 Mobile optimizations
    [theme.breakpoints.down('sm')]: {
      // Large buttons trở thành medium trên mobile
      ...(wsSize === 'large' && {
        height: '44px',
        padding: '10px 24px',
        fontSize: '0.875rem',
      }),
      // Medium buttons trở thành small trên mobile
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
  // 🎯 Size mapping cho loading spinner
  const sizeValue = wsSize === 'small' ? 16 : wsSize === 'medium' ? 20 : 24;

  return {
    width: `${sizeValue}px !important`,
    height: `${sizeValue}px !important`,
    marginRight: theme.spacing(1),
    // CUSTOMIZE: Bạn có thể chỉnh sửa màu loading spinner tại đây
    // 🎨 Inherit màu từ button text
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
  // 🎯 Icon size mapping
  const iconSize =
    wsSize === 'small' ? '16px' : wsSize === 'medium' ? '18px' : '20px';

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: iconSize,

    // 📐 Spacing cho start icon
    ...(position === 'start' && {
      marginRight: theme.spacing(1), // 8px khoảng cách với text
      marginLeft: theme.spacing(-0.5), // -4px để căn chỉnh với padding
    }),

    // 📐 Spacing cho end icon
    ...(position === 'end' && {
      marginLeft: theme.spacing(1), // 8px khoảng cách với text
      marginRight: theme.spacing(-0.5), // -4px để căn chỉnh với padding
    }),

    // 🎯 Icon inheritance
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
  // ✨ Smooth transition cho loading states
  transition: theme.transitions.create(['opacity', 'visibility'], {
    duration: theme.transitions.duration.short,
  }),

  // 🔄 Preserve width loading: ẩn content nhưng giữ kích thước
  ...(loading &&
    preserveWidth && {
      visibility: 'hidden',
    }),

  // 🔄 Dynamic width loading: fade out content
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
  // 📐 Absolute positioning để overlay lên content
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  // 🔄 Show/hide loading overlay
  opacity: loading ? 1 : 0,
  visibility: loading ? 'visible' : 'hidden',

  // ✨ Smooth transition
  transition: theme.transitions.create(['opacity', 'visibility'], {
    duration: theme.transitions.duration.short,
  }),
}));
