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
 * - backdropFadeIn:
 * - modalZoomIn:
 * - modalMobileSlide:
 * - modalFullscreenFade:
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
  // CUSTOMIZE: KÃ­ch thÆ°á»›c modal cho tá»«ng size
  const sizeMap = {
    small: {
      width: '400px', // ðŸ" Compact cho confirmations
      maxWidth: '90vw', // ðŸ"± Mobile responsive
      maxHeight: '80vh', // ðŸ" Prevent overflow
      padding: '16px', // ðŸ" Tight padding
      borderRadius: '12px', // ðŸ"„ Rounded corners
    },
    medium: {
      width: '600px', // ðŸ" Standard cho forms
      maxWidth: '90vw', // ðŸ"± Mobile responsive
      maxHeight: '85vh', // ðŸ" More content space
      padding: '24px', // ðŸ" Comfortable padding
      borderRadius: '16px', // ðŸ"„ More rounded
    },
    large: {
      width: '800px', // ðŸ" Wide cho complex content
      maxWidth: '95vw', // ðŸ"± Wider on desktop
      maxHeight: '90vh', // ðŸ" Almost full height
      padding: '32px', // ðŸ" Spacious padding
      borderRadius: '20px', // ðŸ"„ Very rounded
    },
    fullscreen: {
      width: '100vw', // ðŸ" Full viewport
      maxWidth: '100vw', // ðŸ" No limit
      maxHeight: '100vh', // ðŸ" Full height
      padding: '24px', // ðŸ" Standard padding
      borderRadius: '0px', // ðŸ"„ No radius for fullscreen
    },
  };

  return sizeMap[size];
};

// ==============================================
// VARIANT STYLES - THEME AWARE
// ==============================================

const getVariantStyles = (theme: any, variant: WSModalVariant) => {
  // CUSTOMIZE: Visual indicators cho tá»«ng variant
  const variants = {
    default: {
      borderTop: 'none',
      // ðŸŽ¨ Default: Clean, no special styling
    },
    confirmation: {
      // âš ï¸ CONFIRMATION: Warning accent
      borderTop: `4px solid ${theme.palette.warning.main}`,
      '& .modal-icon': {
        color: theme.palette.warning.main,
      },
    },
    form: {
      // ðŸ" FORM: Primary accent
      borderTop: `4px solid ${theme.palette.primary.main}`,
      '& .modal-icon': {
        color: theme.palette.primary.main,
      },
    },
  };

  return variants[variant];
};

// ==============================================
// STYLED MODAL COMPONENT - THEME INTEGRATED
// ==============================================

export const StyledWSModal = styled(Modal)(({ theme }) => ({
  // === BASE MODAL CONTAINER ===
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  zIndex: theme.zIndex.modal,
  // FIX: Remove position/transform issues that cause jumping
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,

  // === BACKDROP STYLING ===
  // CUSTOMIZE: Backdrop appearance vÃ  blur effect
  '& .MuiBackdrop-root': {
    // ðŸŒ«ï¸ BACKDROP: Dark overlay vá»›i blur
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.75)' // Darker cho dark mode
        : 'rgba(0, 0, 0, 0.6)', // Medium darkness cho light mode

    // âœ¨ BLUR EFFECT: Modern glassmorphism
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)', // Safari support

    // ðŸŽ¬ SMOOTH ANIMATION: Fade in vá»›i blur
    animation: `${backdropFadeIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,

    // âš¡ TRANSITIONS: Theme-aware transitions
    transition: theme.transitions.create(
      ['background-color', 'backdrop-filter'],
      {
        duration: theme.transitions.duration.standard,
        easing: theme.transitions.easing.easeOut,
      }
    ),
  },

  // === MOBILE RESPONSIVE ===
  // ðŸ"± Mobile: Bottom sheet layout
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    alignItems: 'flex-end', // Bottom-aligned cho mobile
  },

  // === FOCUS MANAGEMENT ===
  '&.Mui-focused': {
    outline: 'none',
  },
}));

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

  return {
    // === BASE CONTAINER STYLES ===
    position: 'relative',
    width: sizeConfig.width,
    maxWidth: sizeConfig.maxWidth,
    maxHeight: sizeConfig.maxHeight,

    // ðŸŽ¨ BACKGROUND: Theme-aware background
    backgroundColor: theme.palette.background.paper,

    // ðŸ"„ BORDER RADIUS: Size-dependent rounding
    borderRadius: wsSize === 'fullscreen' ? 0 : sizeConfig.borderRadius,

    // âœ¨ SHADOW: Elevated appearance
    boxShadow: wsSize === 'fullscreen' ? 'none' : theme.shadows[12], // Deep shadow cho depth

    // ðŸŽ¯ FOCUS: Remove default outline
    outline: 'none',
    overflow: 'hidden',

    // ðŸ" LAYOUT: Flex column for header/content/footer
    display: 'flex',
    flexDirection: 'column',

    // ðŸ"² BORDER: Subtle border cho definition
    border:
      wsSize === 'fullscreen' ? 'none' : `1px solid ${theme.palette.divider}`,

    // === ANIMATIONS ===
    // ðŸŽ¬ ENTRANCE ANIMATION: Smooth zoom-in animation
    animation:
      wsSize === 'fullscreen'
        ? `${modalFullscreenFade} 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
        : `${modalZoomIn} 0.5s ease-out`, // Smooth zoom animation

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

      // ðŸ"„ MOBILE RADIUS: Rounded top corners only
      borderRadius:
        wsSize === 'fullscreen'
          ? 0
          : `${sizeConfig.borderRadius} ${sizeConfig.borderRadius} 0 0`,

      // ðŸŽ¬ MOBILE ANIMATION: Bottom slide for mobile
      animation:
        wsSize === 'fullscreen'
          ? `${modalFullscreenFade} 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
          : `${modalMobileSlide} 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`,

      // ðŸ" HEIGHT LIMIT: Prevent overflow on mobile
      ...(wsSize !== 'fullscreen' && {
        maxHeight: '85vh',
      }),
    },

    // === ACCESSIBILITY ===
    // â™¿ FOCUS VISIBLE: Keyboard navigation support
    '&:focus-visible': {
      outline: `3px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },

    // === THEME TRANSITIONS ===
    // âš¡ SMOOTH TRANSITIONS: For theme switching
    transition: theme.transitions.create(
      ['background-color', 'border-color', 'box-shadow'],
      {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeOut,
      }
    ),

    // === INTERACTION STATES ===
    // ðŸ–±ï¸ HOVER: Subtle enhancement (desktop only)
    [theme.breakpoints.up('md')]: {
      '&:hover': {
        boxShadow: wsSize === 'fullscreen' ? 'none' : theme.shadows[16], // Enhanced shadow on hover
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

  return {
    // === LAYOUT & SPACING ===
    padding: `${sizeConfig.padding} ${sizeConfig.padding} 0 ${sizeConfig.padding}`,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: wsSize === 'small' ? '50px' : '60px',

    // ðŸ"² SEPARATOR: Subtle bottom border
    borderBottom: `1px solid ${theme.palette.divider}`,

    // ðŸŽ¨ BACKGROUND: Subtle background difference
    backgroundColor:
      theme.palette.mode === 'dark'
        ? `${theme.palette.background.paper}`
        : `${theme.palette.grey[50]}`,

    // === TYPOGRAPHY STYLES ===
    '& .modal-title': {
      // ðŸ" TITLE: Size-responsive typography
      fontSize:
        wsSize === 'small'
          ? theme.typography.h6.fontSize
          : wsSize === 'large'
            ? theme.typography.h4.fontSize
            : theme.typography.h5.fontSize,

      fontWeight: theme.typography.fontWeightBold || 700,
      color: theme.palette.text.primary,
      margin: 0,
      lineHeight: 1.3,
      flex: 1,
      marginRight: theme.spacing(2),
    },

    '& .modal-subtitle': {
      // ðŸ" SUBTITLE: Secondary information
      fontSize:
        wsSize === 'small'
          ? theme.typography.body2.fontSize
          : theme.typography.body1.fontSize,

      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
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

  return {
    // === LAYOUT ===
    padding: sizeConfig.padding,
    flex: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,

    // === CUSTOM SCROLLBAR ===
    // CUSTOMIZE: Scrollbar styling cho better UX
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },

    '&::-webkit-scrollbar-track': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.grey[100],
      borderRadius: '4px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[600]
          : theme.palette.grey[400],
      borderRadius: '4px',

      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[500]
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

  return {
    // === LAYOUT & SPACING ===
    padding: `${theme.spacing(2)} ${sizeConfig.padding} ${sizeConfig.padding} ${sizeConfig.padding}`, // FIX: Better top padding
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(2), // FIX: Increased gap between buttons
    minHeight: wsSize === 'small' ? '60px' : '70px', // FIX: More height for breathing room

    // ðŸ"² SEPARATOR: Top border
    borderTop: `1px solid ${theme.palette.divider}`,

    // ðŸŽ¨ BACKGROUND: Consistent vá»›i header
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.grey[50],

    // === MOBILE RESPONSIVE ===
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      gap: theme.spacing(1.5), // FIX: Better mobile spacing
      padding: `${theme.spacing(2)} ${theme.spacing(3)} ${theme.spacing(3)}`, // FIX: Better mobile padding

      // ðŸ" FULL WIDTH: Mobile buttons take full width
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

export const CloseButton = styled(IconButton)(({ theme }) => ({
  // === POSITIONING ===
  position: 'absolute',
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  zIndex: 1,

  // ðŸŽ¨ COLORS: Subtle but accessible
  color: theme.palette.text.secondary,
  backgroundColor: 'transparent',

  // ðŸ" SIZE: Compact but touchable
  width: '32px',
  height: '32px',

  // === INTERACTION STATES ===
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
    // âœ¨ SCALE: Subtle grow effect
    transform: 'scale(1.1)',
  },

  '&:active': {
    transform: 'scale(0.95)',
  },

  // === ACCESSIBILITY ===
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
    backgroundColor: theme.palette.action.focus,
  },

  // === TRANSITIONS ===
  transition: theme.transitions.create(
    ['background-color', 'color', 'transform'],
    {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut,
    }
  ),
}));

// ==============================================
// LOADING OVERLAY - ENHANCED BLUR
// ==============================================

export const LoadingOverlay = styled(Box)(({ theme }) => ({
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

  // ðŸŒ«ï¸ BACKDROP: Blur effect
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.9)',

  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',

  // === TRANSITIONS ===
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
}));

// ==============================================
// MODAL DIVIDER - ENHANCED SEPARATOR
// ==============================================

export const ModalDivider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: `${theme.spacing(3)} 0`, // Increased margin for better spacing

  // === TRANSITIONS ===
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
}));

// ==============================================
// MODAL ACTION GROUP - ENHANCED LAYOUT
// ==============================================

export const ModalActionGroup = styled(Box)(({ theme }) => ({
  // === LAYOUT ===
  display: 'flex',
  gap: theme.spacing(2), // FIX: Better spacing between buttons
  alignItems: 'center',
  justifyContent: 'flex-end',

  // === MOBILE RESPONSIVE ===
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    width: '100%',
    gap: theme.spacing(1.5), // FIX: Better mobile spacing

    // ðŸ" FULL WIDTH: All buttons take full width on mobile
    '& > *': {
      width: '100%',
    },
  },
}));
