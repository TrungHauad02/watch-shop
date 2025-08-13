import { styled, keyframes } from '@mui/material/styles';
import { Box, CircularProgress, LinearProgress } from '@mui/material';
import { WSLoadingSize, WSLoadingColor } from './WSLoading.types';
import { BRAND_COLORS, SEMANTIC_COLORS } from '../../styles/colors';

// ==============================================
// ANIMATIONS
// ==============================================

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
`;

const dots = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

// ==============================================
// COLOR CONFIGURATIONS
// ==============================================

const getLoadingColor = (color: WSLoadingColor): string => {
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

const getSizeConfig = (size: WSLoadingSize) => {
  const sizeMap = {
    small: {
      size: '20px',
      thickness: 2,
      fontSize: '0.75rem',
      spacing: '6px',
      dotSize: '4px',
    },
    medium: {
      size: '32px',
      thickness: 4,
      fontSize: '0.875rem',
      spacing: '8px',
      dotSize: '6px',
    },
    large: {
      size: '48px',
      thickness: 6,
      fontSize: '1rem',
      spacing: '12px',
      dotSize: '8px',
    },
  };

  return sizeMap[size];
};

// ==============================================
// MAIN LOADING CONTAINER
// ==============================================

export const LoadingContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['fullScreen', 'backdrop'].includes(prop as string),
})<{
  fullScreen: boolean;
  backdrop: boolean;
}>(({ theme, fullScreen, backdrop }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: theme.spacing(2),

  // Full screen styles
  ...(fullScreen && {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    zIndex: theme.zIndex.modal,
  }),

  // Backdrop styles
  ...(backdrop && {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.7)'
        : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(4px)',
  }),
}));

// ==============================================
// SPINNER COMPONENT
// ==============================================

export const Spinner = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize', 'wsColor'].includes(prop as string),
})<{
  wsSize: WSLoadingSize;
  wsColor: WSLoadingColor;
}>(({ wsSize, wsColor }) => {
  const config = getSizeConfig(wsSize);
  const color = getLoadingColor(wsColor);

  return {
    width: config.size,
    height: config.size,
    border: `${config.thickness}px solid transparent`,
    borderTop: `${config.thickness}px solid ${color}`,
    borderRadius: '50%',
    animation: `${spin} 1s linear infinite`,
  };
});

// ==============================================
// DOTS COMPONENT
// ==============================================

export const Dots = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize', 'wsColor'].includes(prop as string),
})<{
  wsSize: WSLoadingSize;
  wsColor: WSLoadingColor;
}>(({ wsSize, wsColor }) => {
  const config = getSizeConfig(wsSize);
  const color = getLoadingColor(wsColor);

  return {
    display: 'flex',
    gap: config.spacing,
    alignItems: 'center',

    '& .dot': {
      width: config.dotSize,
      height: config.dotSize,
      backgroundColor: color,
      borderRadius: '50%',
      animation: `${dots} 1.4s ease-in-out infinite`,

      '&:nth-of-type(1)': {
        animationDelay: '0s',
      },
      '&:nth-of-type(2)': {
        animationDelay: '0.16s',
      },
      '&:nth-of-type(3)': {
        animationDelay: '0.32s',
      },
    },
  };
});

// ==============================================
// PULSE COMPONENT
// ==============================================

export const Pulse = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize', 'wsColor'].includes(prop as string),
})<{
  wsSize: WSLoadingSize;
  wsColor: WSLoadingColor;
}>(({ wsSize, wsColor }) => {
  const config = getSizeConfig(wsSize);
  const color = getLoadingColor(wsColor);

  return {
    width: config.size,
    height: config.size,
    backgroundColor: color,
    borderRadius: '50%',
    animation: `${pulse} 1.5s ease-in-out infinite`,
  };
});

// ==============================================
// STYLED CIRCULAR PROGRESS
// ==============================================

export const StyledCircularProgress = styled(CircularProgress, {
  shouldForwardProp: (prop) => !['wsColor'].includes(prop as string),
})<{
  wsColor: WSLoadingColor;
}>(({ wsColor }) => {
  const color = getLoadingColor(wsColor);

  return {
    color: color,
  };
});

// ==============================================
// STYLED LINEAR PROGRESS
// ==============================================

export const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => !['wsColor'].includes(prop as string),
})<{
  wsColor: WSLoadingColor;
}>(({ wsColor }) => {
  const color = getLoadingColor(wsColor);

  return {
    '& .MuiLinearProgress-bar': {
      backgroundColor: color,
    },
    '& .MuiLinearProgress-colorPrimary': {
      backgroundColor: `${color}20`,
    },
  };
});

// ==============================================
// LOADING MESSAGE
// ==============================================

export const LoadingMessage = styled(Box, {
  shouldForwardProp: (prop) => !['wsSize'].includes(prop as string),
})<{
  wsSize: WSLoadingSize;
}>(({ theme, wsSize }) => {
  const config = getSizeConfig(wsSize);

  return {
    fontSize: config.fontSize,
    fontWeight: 500,
    color: theme.palette.text.primary,
    textAlign: 'center',
    maxWidth: '300px',
    lineHeight: 1.5,
  };
});
