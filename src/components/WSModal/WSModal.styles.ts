/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled, keyframes } from '@mui/material/styles';
import { Modal, Paper, Box, IconButton } from '@mui/material';
import { WSModalSize, WSModalVariant } from './WSModal.types';

// ==============================================
// ANIMATIONS
// ==============================================

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -60%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const slideInMobile = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeConfig = (size: WSModalSize) => {
  // CUSTOMIZE: Bạn có thể chỉnh sửa kích thước modal tại đây
  const sizeMap = {
    small: {
      width: '400px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      padding: '16px',
    },
    medium: {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '85vh',
      padding: '24px',
    },
    large: {
      width: '800px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      padding: '32px',
    },
    fullscreen: {
      width: '100vw',
      maxWidth: '100vw',
      maxHeight: '100vh',
      padding: '24px',
    },
  };

  return sizeMap[size];
};

// ==============================================
// VARIANT STYLES - THEME AWARE
// ==============================================

const getVariantStyles = (theme: any, variant: WSModalVariant) => {
  const variants = {
    default: {
      borderTop: 'none',
    },
    confirmation: {
      borderTop: `4px solid ${theme.palette.warning.main}`,
    },
    form: {
      borderTop: `4px solid ${theme.palette.primary.main}`,
    },
  };

  return variants[variant];
};

// ==============================================
// STYLED MODAL COMPONENT - THEME INTEGRATED
// ==============================================

export const StyledWSModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
  zIndex: theme.zIndex.modal,

  // Backdrop - CUSTOMIZE: Bạn có thể chỉnh sửa backdrop tại đây
  '& .MuiBackdrop-root': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.7)'
        : 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    animation: `${fadeIn} 0.3s ease-out`,
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
  },

  // Mobile adjustments
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    alignItems: 'flex-end', // Bottom-sheet style on mobile
  },
}));

// ==============================================
// MODAL CONTAINER - THEME INTEGRATED
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
    // Base styles
    position: 'relative',
    width: sizeConfig.width,
    maxWidth: sizeConfig.maxWidth,
    maxHeight: sizeConfig.maxHeight,
    backgroundColor: theme.palette.background.paper,
    borderRadius:
      wsSize === 'fullscreen'
        ? 0
        : (Number(theme.shape.borderRadius) || 4) * 1.5,
    boxShadow: theme.shadows[8],
    outline: 'none',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${theme.palette.divider}`,

    // Animation
    animation: `${wsSize === 'fullscreen' ? fadeIn : slideIn} 0.3s ${theme.transitions.easing.easeOut}`,

    // Variant-specific styles
    ...variantStyles,

    // Fullscreen styles
    ...(wsSize === 'fullscreen' && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100vh',
      borderRadius: 0,
      border: 'none',
    }),

    // Mobile adjustments
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      margin: 0,
      borderRadius:
        wsSize === 'fullscreen'
          ? 0
          : `${Number(theme.shape.borderRadius) * 1.5}px ${Number(theme.shape.borderRadius) * 1.5}px 0 0`,
      animation: `${wsSize === 'fullscreen' ? fadeIn : slideInMobile} 0.3s ${theme.transitions.easing.easeOut}`,

      ...(wsSize !== 'fullscreen' && {
        maxHeight: '80vh',
      }),
    },

    // Focus visible - CUSTOMIZE: Bạn có thể chỉnh sửa focus outline tại đây
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: '2px',
    },

    // Theme transition
    transition: theme.transitions.create(
      ['background-color', 'border-color', 'box-shadow'],
      {
        duration: theme.transitions.duration.short,
      }
    ),
  };
});

// ==============================================
// MODAL HEADER - THEME INTEGRATED
// ==============================================

export const ModalHeader = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSModalSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    padding: `${sizeConfig.padding} ${sizeConfig.padding} 0 ${sizeConfig.padding}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    minHeight: '60px',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.grey[50],

    '& .modal-title': {
      fontSize:
        wsSize === 'small'
          ? theme.typography.h6.fontSize
          : wsSize === 'large'
            ? theme.typography.h4.fontSize
            : theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightBold || 600,
      color: theme.palette.text.primary,
      margin: 0,
      lineHeight: 1.3,
      flex: 1,
      marginRight: theme.spacing(2),
    },

    '& .modal-subtitle': {
      fontSize:
        wsSize === 'small'
          ? theme.typography.body2.fontSize
          : theme.typography.body1.fontSize,
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.text.secondary,
      margin: `${theme.spacing(0.5)} 0 0 0`,
      lineHeight: 1.4,
    },

    // Theme transition
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// MODAL CONTENT - THEME INTEGRATED
// ==============================================

export const ModalContent = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSModalSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    padding: sizeConfig.padding,
    flex: 1,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,

    // Custom scrollbar - CUSTOMIZE: Bạn có thể chỉnh sửa scrollbar tại đây
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[800]
          : theme.palette.grey[100],
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor:
        theme.palette.mode === 'dark'
          ? theme.palette.grey[600]
          : theme.palette.grey[400],
      borderRadius: '3px',

      '&:hover': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? theme.palette.grey[500]
            : theme.palette.grey[500],
      },
    },

    // Theme transition
    transition: theme.transitions.create(['background-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// MODAL FOOTER - THEME INTEGRATED
// ==============================================

export const ModalFooter = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSModalSize;
}>(({ theme, wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    padding: `0 ${sizeConfig.padding} ${sizeConfig.padding} ${sizeConfig.padding}`,
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    minHeight: '60px',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.grey[50],

    // Mobile adjustments
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      gap: theme.spacing(1),

      '& > *': {
        width: '100%',
      },
    },

    // Theme transition
    transition: theme.transitions.create(['background-color', 'border-color'], {
      duration: theme.transitions.duration.short,
    }),
  };
});

// ==============================================
// CLOSE BUTTON - THEME INTEGRATED
// ==============================================

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.text.secondary,
  zIndex: 1,
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '2px',
  },

  // Theme transition
  transition: theme.transitions.create(['background-color', 'color'], {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ==============================================
// LOADING OVERLAY - THEME INTEGRATED
// ==============================================

export const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(0, 0, 0, 0.8)'
      : 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  backdropFilter: 'blur(2px)',

  // Theme transition
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
}));

// ==============================================
// MODAL SECTION DIVIDER - THEME INTEGRATED
// ==============================================

export const ModalDivider = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: `${theme.spacing(2)} 0`,

  // Theme transition
  transition: theme.transitions.create(['background-color'], {
    duration: theme.transitions.duration.short,
  }),
}));

// ==============================================
// MODAL ACTION GROUP - THEME INTEGRATED
// ==============================================

export const ModalActionGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
  justifyContent: 'flex-end',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column-reverse',
    width: '100%',

    '& > *': {
      width: '100%',
    },
  },
}));
