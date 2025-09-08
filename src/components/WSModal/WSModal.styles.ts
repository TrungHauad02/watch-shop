/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled, keyframes } from '@mui/material/styles';
import { Modal, Paper, Box, IconButton } from '@mui/material';
import { WSModalSize, WSModalVariant } from './WSModal.types';

// ==============================================
// ANIMATIONS - SMOOTH & MODERN
// ==============================================

/**
 * WSModal Animation Guide
 * ======================
 *
 * CUSTOMIZE:
 *
 * Animation types:
 * - backdropFadeIn: Fade in với blur effect
 * - modalZoomIn: Zoom in animation cho desktop
 * - modalMobileSlide: Slide up animation cho mobile
 * - modalFullscreenFade: Fade animation cho fullscreen
 */

const backdropFadeIn = keyframes`
  from {
    opacity: 0;
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    backdrop-filter: blur(4px);
  }
`;

const modalZoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const modalMobileSlide = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const modalFullscreenFade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeConfig = (size: WSModalSize) => {
  // CUSTOMIZE: Kích thước modal cho từng size
  const sizeMap = {
    small: {
      width: '400px', // 📏 Compact cho confirmations
      maxWidth: '90vw', // 📱 Mobile responsive
      maxHeight: '80vh', // 📏 Prevent overflow
      padding: '16px', // 📏 Tight padding
      borderRadius: '12px', // 🎗️ Rounded corners
    },
    medium: {
      width: '600px', // 📏 Standard cho forms
      maxWidth: '90vw', // 📱 Mobile responsive
      maxHeight: '85vh', // 📏 More content space
      padding: '24px', // 📏 Comfortable padding
      borderRadius: '16px', // 🎗️ More rounded
    },
    large: {
      width: '800px', // 📏 Wide cho complex content
      maxWidth: '95vw', // 📱 Wider on desktop
      maxHeight: '90vh', // 📏 Almost full height
      padding: '32px', // 📏 Spacious padding
      borderRadius: '20px', // 🎗️ Very rounded
    },
    fullscreen: {
      width: '100vw', // 📏 Full viewport
      maxWidth: '100vw', // 📏 No limit
      maxHeight: '100vh', // 📏 Full height
      padding: '24px', // 📏 Standard padding
      borderRadius: '0px', // 🎗️ No radius for fullscreen
    },
  };

  return sizeMap[size];
};

// ==============================================
// VARIANT STYLES - THEME AWARE
// ==============================================

const getVariantStyles = (theme: any, variant: WSModalVariant) => {
  // CUSTOMIZE: Visual indicators cho từng variant
  const variants = {
    default: {
      borderTop: 'none',
      // 🎨 Default: Clean, no special styling
    },
    confirmation: {
      // ⚠️ CONFIRMATION: Warning accent
      borderTop: `4px solid ${theme.palette.warning.main}`,
      '& .modal-icon': {
        color: theme.palette.warning.main,
      },
    },
    form: {
      // 📝 FORM: Primary accent
      borderTop: `4px solid ${theme.palette.primary.main}`,
      '& .modal-icon': {
        color: theme.palette.primary.main,
      },
    },
  };

  return variants[variant];
};

// ==============================================
// DARK MODE COLOR HELPERS
// ==============================================

const getDarkModeColors = (theme: any) => {
  return {
    // 🌙 BACKGROUNDS: Softer dark backgrounds
    backdrop: 'rgba(0, 0, 0, 0.65)', // Giảm từ 0.75 xuống 0.65
    paper: theme.palette.grey[850] || '#303030', // Lighter than default paper
    headerFooter: theme.palette.grey[800] || '#424242', // Softer header/footer

    // 📝 TEXT: Reduced contrast
    primaryText: theme.palette.grey[100] || '#f5f5f5', // Softer white
    secondaryText: theme.palette.grey[400] || '#bdbdbd', // Less harsh gray

    // 🎨 BORDERS: Subtle separation
    border: theme.palette.grey[700] || '#616161', // Softer border
    divider: theme.palette.grey[600] || '#757575', // Gentle divider

    // 🔘 BUTTON STATES
    hoverBackground: theme.palette.grey[700] || '#616161',
    focusBackground: theme.palette.grey[600] || '#757575',
  };
};

const getLightModeColors = (theme: any) => {
  return {
    // ☀️ BACKGROUNDS: Clean light backgrounds
    backdrop: 'rgba(0, 0, 0, 0.6)',
    paper: theme.palette.background.paper,
    headerFooter: theme.palette.grey[50] || '#fafafa',

    // 📝 TEXT: Standard contrast
    primaryText: theme.palette.text.primary,
    secondaryText: theme.palette.text.secondary,

    // 🎨 BORDERS: Clear separation
    border: theme.palette.divider,
    divider: theme.palette.divider,

    // 🔘 BUTTON STATES
    hoverBackground: theme.palette.action.hover,
    focusBackground: theme.palette.action.focus,
  };
};

// ==============================================
// STYLED MODAL COMPONENT - THEME INTEGRATED
// ==============================================

export const StyledWSModal = styled(Modal)(({ theme }) => {
  const colors =
    theme.palette.mode === 'dark'
      ? getDarkModeColors(theme)
      : getLightModeColors(theme);

  return {
    // === BASE MODAL CONTAINER ===
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    zIndex: theme.zIndex.modal,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    // === BACKDROP STYLING ===
    // CUSTOMIZE: Backdrop appearance với blur effect
    '& .MuiBackdrop-root': {
      // 🌙 BACKDROP: Softer overlay với subtle blur
      backgroundColor: colors.backdrop,

      // ✨ BLUR EFFECT: Modern glassmorphism
      backdropFilter: 'blur(6px)', // Tăng blur để tạo depth
      WebkitBackdropFilter: 'blur(6px)', // Safari support

      // 🎬 SMOOTH ANIMATION: Fade in với blur
      animation: `${backdropFadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,

      // 🎯 TRANSITIONS: Theme-aware transitions
      transition: theme.transitions.create(
        ['background-color', 'backdrop-filter'],
        {
          duration: theme.transitions.duration.standard,
          easing: theme.transitions.easing.easeOut,
        }
      ),
    },

    // === MOBILE RESPONSIVE ===
    // 📱 Mobile: Bottom sheet layout
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      alignItems: 'flex-end', // Bottom-aligned cho mobile
    },

    // === FOCUS MANAGEMENT ===
    '&.Mui-focused': {
      outline: 'none',
    },
  };
});

// ==============================================
// MODAL CONTAINER - ENHANCED ANIMATIONS
// ==============================================

export const ModalContainer = styled(Paper, {
  shouldForwardProp: (prop) =>
    !['wsSize', 'wsVariant'].includes(prop as string),
})<{
  wsSize: WSModalSize;
  wsVariant: WSModalVariant;
}>(({ theme, wsSize, wsVariant }) => {
  const sizeConfig = getSizeConfig(wsSize);
  const variantStyles = getVariantStyles(theme, wsVariant);
  const colors =
    theme.palette.mode === 'dark'
      ? getDarkModeColors(theme)
      : getLightModeColors(theme);

  return {
    // === BASE CONTAINER STYLES ===
    position: 'relative',
    width: sizeConfig.width,
    maxWidth: sizeConfig.maxWidth,
    maxHeight: sizeConfig.maxHeight,

    // 🎨 BACKGROUND: Softer dark mode background
    backgroundColor: colors.paper,

    // 🎗️ BORDER RADIUS: Size-dependent rounding
    borderRadius: wsSize === 'fullscreen' ? 0 : sizeConfig.borderRadius,

    // ✨ SHADOW: Softer shadow cho dark mode
    boxShadow:
      wsSize === 'fullscreen'
        ? 'none'
        : theme.palette.mode === 'dark'
          ? '0 8px 32px rgba(0, 0, 0, 0.4)' // Softer shadow
          : theme.shadows[12], // Standard shadow cho light mode

    // 🎯 FOCUS: Remove default outline
    outline: 'none',
    overflow: 'hidden',

    // 📐 LAYOUT: Flex column for header/content/footer
    display: 'flex',
    flexDirection: 'column',

    // 🎨 BORDER: Subtle border cho definition
    border: wsSize === 'fullscreen' ? 'none' : `1px solid ${colors.border}`,

    // === ANIMATIONS ===
    // 🎬 ENTRANCE ANIMATION: Smooth zoom-in animation
    animation:
      wsSize === 'fullscreen'
        ? `${modalFullscreenFade} 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
        : `${modalZoomIn} 0.5s ease-out`,

    // === VARIANT STYLING ===
    ...variantStyles,

    // === FULLSCREEN SPECIFIC ===
    ...(wsSize === 'fullscreen' && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100vh',
      width: '100vw',
      borderRadius: 0,
      margin: 0,
    }),

    // === MOBILE RESPONSIVE ===
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      margin: 0,

      // 🎗️ MOBILE RADIUS: Rounded top corners only
      borderRadius:
        wsSize === 'fullscreen'
          ? 0
          : `${sizeConfig.borderRadius} ${sizeConfig.borderRadius} 0 0`,

      // 🎬 MOBILE ANIMATION: Bottom slide for mobile
      animation:
        wsSize === 'fullscreen'
          ? `${modalFullscreenFade} 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
          : `${modalMobileSlide} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,

      // 📐 HEIGHT LIMIT: Prevent overflow on mobile
      ...(wsSize !== 'fullscreen' && {
        maxHeight: '85vh',
      }),
    },

    // === ACCESSIBILITY ===
    // ♿ FOCUS VISIBLE: Keyboard navigation support
    '&:focus-visible': {
      outline: `3px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },

    // === THEME TRANSITIONS ===
    // 🎯 SMOOTH TRANSITIONS: For theme switching
    transition: theme.transitions.create(
      ['background-color', 'border-color', 'box-shadow'],
      {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeOut,
      }
    ),

    // === INTERACTION STATES ===
    // 🖱️ HOVER: Subtle enhancement (desktop only)
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        boxShadow:
          wsSize === 'fullscreen'
            ? 'none'
            : theme.palette.mode === 'dark'
              ? '0 12px 40px rgba(0, 0, 0, 0.5)' // Enhanced but softer
              : theme.shadows[16],
      },
    },
  };
});

// ==============================================
// MODAL HEADER - ENHANCED STYLING
// ==============================================

export const ModalHeader = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSModalSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);
  const colors =
    theme.palette.mode === 'dark'
      ? getDarkModeColors(theme)
      : getLightModeColors(theme);

  return {
    // === LAYOUT & SPACING ===
    padding: `${sizeConfig.padding} ${sizeConfig.padding} 0 ${sizeConfig.padding}`,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: wsSize === 'small' ? '50px' : '60px',

    // 🎨 SEPARATOR: Subtle bottom border
    borderBottom: `1px solid ${colors.divider}`,

    // 🎨 BACKGROUND: Softer background difference
    backgroundColor: colors.headerFooter,

    // === TYPOGRAPHY STYLES ===
    '& .modal-title': {
      // 📝 TITLE: Size-responsive typography
      fontSize:
        wsSize === 'small'
          ? theme.typography.h6.fontSize
          : wsSize === 'large'
            ? theme.typography.h4.fontSize
            : theme.typography.h5.fontSize,

      fontWeight: theme.typography.fontWeightBold || 700,
      color: colors.primaryText, // Softer text color
      margin: 0,
      lineHeight: 1.3,
      flex: 1,
      marginRight: theme.spacing(2),
    },

    '& .modal-subtitle': {
      // 📝 SUBTITLE: Secondary information
      fontSize:
        wsSize === 'small'
          ? theme.typography.body2.fontSize
          : theme.typography.body1.fontSize,

      fontWeight: theme.typography.fontWeightRegular,
      color: colors.secondaryText, // Softer secondary text
      margin: `${theme.spacing(0.5)} 0 0 0`,
      lineHeight: 1.4,
    },

    // === THEME TRANSITIONS ===
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// MODAL CONTENT - ENHANCED SCROLLING
// ==============================================

export const ModalContent = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSModalSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);
  const colors =
    theme.palette.mode === 'dark'
      ? getDarkModeColors(theme)
      : getLightModeColors(theme);

  return {
    // === LAYOUT ===
    padding: sizeConfig.padding,
    flex: 1,
    overflow: 'auto',
    backgroundColor: colors.paper,

    // === CUSTOM SCROLLBAR ===
    // CUSTOMIZE: Scrollbar styling cho better UX
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[800] || '#424242' // Softer track
          : theme.palette.grey[100],
      borderRadius: '4px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[600] || '#757575' // Softer thumb
          : theme.palette.grey[400],
      borderRadius: '4px',

      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[500] || '#9e9e9e' // Softer hover
            : theme.palette.grey[500],
      },
    },

    // === FIREFOX SCROLLBAR ===
    scrollbarWidth: 'thin',
    scrollbarColor:
      theme.palette.mode === 'dark'
        ? `${theme.palette.grey[600]} ${theme.palette.grey[800]}`
        : `${theme.palette.grey[400]} ${theme.palette.grey[100]}`,

    // === THEME TRANSITIONS ===
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// MODAL FOOTER - ENHANCED ACTIONS
// ==============================================

export const ModalFooter = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSModalSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);
  const colors =
    theme.palette.mode === 'dark'
      ? getDarkModeColors(theme)
      : getLightModeColors(theme);

  return {
    // === LAYOUT & SPACING ===
    padding: `${theme.spacing(2)} ${sizeConfig.padding} ${sizeConfig.padding} ${sizeConfig.padding}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    minHeight: wsSize === 'small' ? '60px' : '70px',

    // 🎨 SEPARATOR: Top border
    borderTop: `1px solid ${colors.divider}`,

    // 🎨 BACKGROUND: Consistent với header
    backgroundColor: colors.headerFooter,

    // === MOBILE RESPONSIVE ===
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      gap: theme.spacing(1.5),
      padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`,

      // 📱 FULL WIDTH: Mobile buttons take full width
      '& > *': {
        width: '100%',
      },
    },

    // === THEME TRANSITIONS ===
    transition: theme.transitions.create(['background-color', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// CLOSE BUTTON - ENHANCED STYLING
// ==============================================

export const CloseButton = styled(IconButton)(({ theme }) => {
  const colors =
    theme.palette.mode === 'dark'
      ? getDarkModeColors(theme)
      : getLightModeColors(theme);

  return {
    // === POSITIONING ===
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    zIndex: 1,

    // 🎨 COLORS: Softer but accessible
    color: colors.secondaryText,
    backgroundColor: 'transparent',

    // 📏 SIZE: Compact but touchable
    width: '32px',
    height: '32px',

    // === INTERACTION STATES ===
    '&:hover': {
      backgroundColor: colors.hoverBackground,
      color: colors.primaryText,
      // ✨ SCALE: Subtle grow effect
      transform: 'scale(1.1)',
    },

    '&:active': {
      transform: 'scale(0.95)',
    },

    // === ACCESSIBILITY ===
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
      backgroundColor: colors.focusBackground,
    },

    // === TRANSITIONS ===
    transition: theme.transitions.create(
      ['background-color', 'color', 'transform'],
      {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }
    ),
  };
});

// ==============================================
// LOADING OVERLAY - ENHANCED BLUR
// ==============================================

export const LoadingOverlay = styled(Box)(({ theme }) => {
  return {
    // === POSITIONING ===
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,

    // === LAYOUT ===
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    // 🌙 BACKDROP: Softer blur effect
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(48, 48, 48, 0.85)' // Softer dark overlay
        : 'rgba(255, 255, 255, 0.9)',

    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)',

    // === TRANSITIONS ===
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// MODAL DIVIDER - ENHANCED SEPARATOR
// ==============================================

export const ModalDivider = styled(Box)(({ theme }) => {
  const colors =
    theme.palette.mode === 'dark'
      ? getDarkModeColors(theme)
      : getLightModeColors(theme);

  return {
    width: '100%',
    height: '1px',
    backgroundColor: colors.divider,
    margin: `${theme.spacing(3)} 0`,

    // === TRANSITIONS ===
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// MODAL ACTION GROUP - ENHANCED LAYOUT
// ==============================================

export const ModalActionGroup = styled(Box)(({ theme }) => ({
  // === LAYOUT ===
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  justifyContent: 'flex-end',

  // === MOBILE RESPONSIVE ===
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    width: '100%',
    gap: theme.spacing(1.5),

    // 📱 FULL WIDTH: All buttons take full width on mobile
    '& > *': {
      width: '100%',
    },
  },
}));
