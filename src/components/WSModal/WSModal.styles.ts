import { styled, keyframes } from '@mui/material/styles';
import { Modal, Paper, Box, IconButton } from '@mui/material';
import { WSModalSize, WSModalVariant } from './WSModal.types';
import { BRAND_COLORS, COLOR_PALETTES } from '../../styles/colors';

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

// ==============================================
// SIZE CONFIGURATIONS
// ==============================================

const getSizeConfig = (size: WSModalSize) => {
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
// STYLED MODAL COMPONENT
// ==============================================

export const StyledWSModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),

  // Backdrop
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(4px)',
    animation: `${fadeIn} 0.3s ease-out`,
  },

  // Mobile adjustments
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    alignItems: 'flex-end', // Bottom-sheet style on mobile
  },
}));

// ==============================================
// MODAL CONTAINER
// ==============================================

export const ModalContainer = styled(Paper, {
  shouldForwardProp: (prop) =>
    !['wsSize', 'wsVariant'].includes(prop as string),
})<{
  wsSize: WSModalSize;
  wsVariant: WSModalVariant;
}>(({ theme, wsSize, wsVariant }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    // Base styles
    position: 'relative',
    width: sizeConfig.width,
    maxWidth: sizeConfig.maxWidth,
    maxHeight: sizeConfig.maxHeight,
    backgroundColor: theme.palette.background.paper,
    borderRadius: wsSize === 'fullscreen' ? 0 : '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    outline: 'none',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',

    // Animation
    animation: `${wsSize === 'fullscreen' ? fadeIn : slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,

    // Variant-specific styles
    ...(wsVariant === 'confirmation' && {
      borderTop: `4px solid ${BRAND_COLORS.secondary}`,
    }),

    ...(wsVariant === 'form' && {
      borderTop: `4px solid ${BRAND_COLORS.primary}`,
    }),

    // Fullscreen styles
    ...(wsSize === 'fullscreen' && {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: '100vh',
      borderRadius: 0,
    }),

    // Mobile adjustments
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      maxWidth: '100%',
      margin: 0,
      borderRadius: wsSize === 'fullscreen' ? 0 : '12px 12px 0 0',

      ...(wsSize !== 'fullscreen' && {
        maxHeight: '80vh',
        animation: `${slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
      }),
    },

    // Focus visible
    '&:focus-visible': {
      outline: `2px solid ${BRAND_COLORS.secondary}`,
      outlineOffset: '2px',
    },
  };
});

// ==============================================
// MODAL HEADER
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

    '& .modal-title': {
      fontSize:
        wsSize === 'small'
          ? '1.25rem'
          : wsSize === 'large'
            ? '1.75rem'
            : '1.5rem',
      fontWeight: 600,
      color: theme.palette.text.primary,
      margin: 0,
      lineHeight: 1.3,
      flex: 1,
      marginRight: theme.spacing(2),
    },

    '& .modal-subtitle': {
      fontSize: wsSize === 'small' ? '0.875rem' : '1rem',
      fontWeight: 400,
      color: theme.palette.text.secondary,
      margin: `${theme.spacing(0.5)} 0 0 0`,
      lineHeight: 1.4,
    },
  };
});

// ==============================================
// MODAL CONTENT
// ==============================================

export const ModalContent = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSModalSize;
}>(({ wsSize }) => {
  const sizeConfig = getSizeConfig(wsSize);

  return {
    padding: sizeConfig.padding,
    flex: 1,
    overflow: 'auto',

    // Custom scrollbar
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: COLOR_PALETTES.neutral[100],
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: COLOR_PALETTES.neutral[300],
      borderRadius: '3px',

      '&:hover': {
        backgroundColor: COLOR_PALETTES.neutral[400],
      },
    },
  };
});

// ==============================================
// MODAL FOOTER
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

    // Mobile adjustments
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      gap: theme.spacing(1),

      '& > *': {
        width: '100%',
      },
    },
  };
});

// ==============================================
// CLOSE BUTTON
// ==============================================

export const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: theme.palette.text.secondary,
  zIndex: 1,

  '&:hover': {
    backgroundColor: COLOR_PALETTES.neutral[100],
    color: theme.palette.text.primary,
  },

  '&:focus-visible': {
    outline: `2px solid ${BRAND_COLORS.secondary}`,
    outlineOffset: '2px',
  },
}));

// ==============================================
// LOADING OVERLAY
// ==============================================

export const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  backdropFilter: 'blur(2px)',

  // Dark mode
  ...(theme.palette.mode === 'dark' && {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  }),
}));
