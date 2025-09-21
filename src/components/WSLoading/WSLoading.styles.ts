import { keyframes } from '@mui/material/styles';
import { COLORS } from '@/styles/colors';
import {
  WSLoadingVariant,
  WSLoadingSize,
  WSLoadingColor,
} from './WSLoading.types';

// CUSTOMIZE: Bạn có thể chỉnh sửa các animation keyframes tại đây
export const loadingAnimations = {
  spin: keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `,

  pulse: keyframes`
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.95); }
  `,

  dots: keyframes`
    0%, 80%, 100% { 
      transform: scale(0);
      opacity: 0.5;
    }
    40% { 
      transform: scale(1);
      opacity: 1;
    }
  `,

  luxuryGlow: keyframes`
    0%, 100% { 
      box-shadow: 0 0 20px ${COLORS.gold500}40;
    }
    50% { 
      box-shadow: 0 0 40px ${COLORS.gold500}80, 0 0 60px ${COLORS.gold500}40;
    }
  `,

  shimmer: keyframes`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  `,
};

// CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc loading tại đây
export const getLoadingColors = (color: WSLoadingColor) => {
  const colorMap = {
    primary: {
      main: COLORS.primary,
      light: COLORS.primaryLight,
      gradient: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
      glow: `${COLORS.primary}40`,
    },
    secondary: {
      main: COLORS.secondary,
      light: COLORS.secondaryLight,
      gradient: `linear-gradient(135deg, ${COLORS.secondary}, ${COLORS.secondaryLight})`,
      glow: `${COLORS.secondary}40`,
    },
    luxury: {
      main: COLORS.gold500,
      light: COLORS.gold300,
      gradient: `linear-gradient(135deg, ${COLORS.gold500}, ${COLORS.gold300})`,
      glow: `${COLORS.gold500}60`,
    },
    white: {
      main: COLORS.white,
      light: COLORS.offWhite,
      gradient: `linear-gradient(135deg, ${COLORS.white}, ${COLORS.offWhite})`,
      glow: `${COLORS.white}80`,
    },
  };

  return colorMap[color];
};

// CUSTOMIZE: Bạn có thể chỉnh sửa kích thước loading tại đây
export const getLoadingSizes = (size: WSLoadingSize) => {
  const sizeMap = {
    small: {
      spinner: 24,
      dots: 8,
      text: '0.75rem',
      spacing: 16,
    },
    medium: {
      spinner: 40,
      dots: 12,
      text: '0.875rem',
      spacing: 24,
    },
    large: {
      spinner: 56,
      dots: 16,
      text: '1rem',
      spacing: 32,
    },
    xlarge: {
      spinner: 80,
      dots: 20,
      text: '1.125rem',
      spacing: 40,
    },
  };

  return sizeMap[size];
};

// CUSTOMIZE: Bạn có thể chỉnh sửa styles cho từng variant tại đây
export const getVariantStyles = (
  variant: WSLoadingVariant,
  size: WSLoadingSize,
  color: WSLoadingColor
) => {
  const colors = getLoadingColors(color);
  const sizes = getLoadingSizes(size);

  const baseStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' as const,
    gap: sizes.spacing / 8,
  };

  const variantStyles = {
    circular: {
      '& .spinner': {
        width: sizes.spinner,
        height: sizes.spinner,
        border: `3px solid ${colors.main}20`,
        borderTop: `3px solid ${colors.main}`,
        borderRadius: '50%',
        animation: `${loadingAnimations.spin} 1s linear infinite`,
        position: 'relative' as const,

        '&::after': {
          content: '""',
          position: 'absolute' as const,
          top: -3,
          left: -3,
          right: -3,
          bottom: -3,
          borderRadius: '50%',
          background: colors.gradient,
          opacity: 0.1,
          animation: `${loadingAnimations.luxuryGlow} 2s ease-in-out infinite`,
        },
      },
    },

    linear: {
      '& .progress-bar': {
        width: sizes.spinner * 2,
        height: 4,
        backgroundColor: `${colors.main}20`,
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative' as const,

        '&::after': {
          content: '""',
          position: 'absolute' as const,
          top: 0,
          left: 0,
          height: '100%',
          width: '30%',
          background: colors.gradient,
          borderRadius: 2,
          animation: `${loadingAnimations.shimmer} 1.5s ease-in-out infinite`,
          boxShadow: `0 0 10px ${colors.glow}`,
        },
      },
    },

    dots: {
      '& .dots-container': {
        display: 'flex',
        gap: sizes.dots / 2,

        '& .dot': {
          width: sizes.dots,
          height: sizes.dots,
          backgroundColor: colors.main,
          borderRadius: '50%',
          animation: `${loadingAnimations.dots} 1.4s ease-in-out infinite both`,
          boxShadow: `0 0 ${sizes.dots}px ${colors.glow}`,

          '&:nth-of-type(1)': { animationDelay: '-0.32s' },
          '&:nth-of-type(2)': { animationDelay: '-0.16s' },
          '&:nth-of-type(3)': { animationDelay: '0s' },
        },
      },
    },

    pulse: {
      '& .pulse-circle': {
        width: sizes.spinner,
        height: sizes.spinner,
        background: colors.gradient,
        borderRadius: '50%',
        animation: `${loadingAnimations.pulse} 1.5s ease-in-out infinite`,
        boxShadow: `0 0 ${sizes.spinner / 2}px ${colors.glow}`,
        position: 'relative' as const,

        '&::before': {
          content: '""',
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '60%',
          backgroundColor: COLORS.white,
          borderRadius: '50%',
          opacity: 0.9,
        },
      },
    },

    skeleton: {
      '& .skeleton-lines': {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: sizes.spacing / 4,

        '& .skeleton-line': {
          height: sizes.dots,
          backgroundColor: `${colors.main}20`,
          borderRadius: sizes.dots / 2,
          position: 'relative' as const,
          overflow: 'hidden',

          '&::after': {
            content: '""',
            position: 'absolute' as const,
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            background: `linear-gradient(90deg, transparent, ${colors.main}40, transparent)`,
            animation: `${loadingAnimations.shimmer} 2s ease-in-out infinite`,
          },

          '&:nth-of-type(1)': { width: sizes.spinner * 1.5 },
          '&:nth-of-type(2)': { width: sizes.spinner * 1.2 },
          '&:nth-of-type(3)': { width: sizes.spinner },
        },
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant],
  };
};

// CUSTOMIZE: Bạn có thể chỉnh sửa overlay styles tại đây
export const overlayStyles = {
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: `${COLORS.primary}90`,
  backdropFilter: 'blur(8px)',
  zIndex: 9999,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${loadingAnimations.pulse} 3s ease-in-out infinite`,
};
