/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, Theme } from '@mui/material/styles';
import { COLORS } from '@/styles/colors';
import { WSModalSize, WSModalVariant } from './WSModal.types';

// CUSTOMIZE: Bạn có thể chỉnh sửa các animation cho modal tại đây
export const modalAnimations = {
  fadeIn: keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `,

  slideIn: keyframes`
    from {
      opacity: 0;
      transform: translate(-50%, -60%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  `,

  luxuryGlow: keyframes`
    0%, 100% {
      box-shadow: 0 8px 32px rgba(245, 158, 11, 0.15);
    }
    50% {
      box-shadow: 0 12px 48px rgba(245, 158, 11, 0.25);
    }
  `,

  shimmer: keyframes`
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  `,
};

// CUSTOMIZE: Bạn có thể chỉnh sửa kích thước modal tại đây
export const getModalSizes = (size: WSModalSize) => {
  const sizeMap = {
    small: {
      maxWidth: 400,
      minHeight: 200,
    },
    medium: {
      maxWidth: 600,
      minHeight: 300,
    },
    large: {
      maxWidth: 800,
      minHeight: 400,
    },
    xlarge: {
      maxWidth: 1200,
      minHeight: 500,
    },
    fullscreen: {
      maxWidth: '95vw',
      minHeight: '90vh',
    },
  };

  return sizeMap[size];
};

// CUSTOMIZE: Bạn có thể chỉnh sửa styles cho từng variant tại đây
export const getModalVariantStyles = (
  theme: Theme,
  variant: WSModalVariant
) => {
  const baseStyles = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    borderRadius: theme.spacing(2),
    backgroundColor: COLORS.white,
    boxShadow: '0 24px 48px rgba(16, 24, 32, 0.12)',
    animation: `${modalAnimations.slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
    maxHeight: '90vh',
    overflowY: 'auto' as const,

    // Custom scrollbar
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-track': {
      background: COLORS.gray100,
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: COLORS.gray400,
      borderRadius: '3px',
      '&:hover': {
        background: COLORS.gray500,
      },
    },
  };

  const variantStyles = {
    default: {
      border: `1px solid ${COLORS.gray200}`,

      '&:focus-visible': {
        outline: `2px solid ${COLORS.primary}`,
        outlineOffset: '2px',
      },
    },

    luxury: {
      background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.cream} 100%)`,
      border: `1px solid ${COLORS.gold200}`,
      boxShadow: `
        0 24px 48px rgba(16, 24, 32, 0.12),
        0 0 0 1px ${COLORS.gold300}40,
        inset 0 1px 0 ${COLORS.white}80
      `,
      animation: `
        ${modalAnimations.slideIn} 0.3s cubic-bezier(0.4, 0, 0.2, 1),
        ${modalAnimations.luxuryGlow} 3s ease-in-out infinite
      `,

      '&::before': {
        content: '""',
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${COLORS.gold400}, transparent)`,
        opacity: 0.6,
      },
    },

    minimal: {
      backgroundColor: COLORS.white,
      border: 'none',
      boxShadow: '0 8px 24px rgba(16, 24, 32, 0.08)',

      '&:focus-visible': {
        outline: `1px solid ${COLORS.gray300}`,
        outlineOffset: '2px',
      },
    },

    card: {
      backgroundColor: COLORS.white,
      border: `1px solid ${COLORS.gray200}`,
      boxShadow: `
        0 4px 8px rgba(16, 24, 32, 0.04),
        0 12px 24px rgba(16, 24, 32, 0.08)
      `,

      '&:hover': {
        boxShadow: `
          0 8px 16px rgba(16, 24, 32, 0.08),
          0 16px 32px rgba(16, 24, 32, 0.12)
        `,
      },
    },
  };

  return {
    ...baseStyles,
    ...variantStyles[variant],
  };
};

// CUSTOMIZE: Bạn có thể chỉnh sửa backdrop styles tại đây
export const getBackdropStyles = (_theme: Theme) => ({
  backgroundColor: `${COLORS.primary}85`,
  backdropFilter: 'blur(8px)',
  animation: `${modalAnimations.fadeIn} 0.2s ease-out`,
});

// CUSTOMIZE: Bạn có thể chỉnh sửa header styles tại đây
export const getHeaderStyles = (theme: Theme, variant: WSModalVariant) => {
  const baseStyles = {
    padding: theme.spacing(3, 3, 2, 3),
    borderBottom: `1px solid ${COLORS.gray200}`,
    position: 'relative' as const,
  };

  const variantStyles = {
    luxury: {
      background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.cream} 100%)`,
      borderBottom: `1px solid ${COLORS.gold200}`,

      '&::after': {
        content: '""',
        position: 'absolute' as const,
        bottom: 0,
        left: theme.spacing(3),
        right: theme.spacing(3),
        height: '1px',
        background: `linear-gradient(90deg, transparent, ${COLORS.gold400}, transparent)`,
        opacity: 0.4,
      },
    },
    minimal: {
      borderBottom: `1px solid ${COLORS.gray100}`,
      padding: theme.spacing(2, 3),
    },
    default: baseStyles,
    card: baseStyles,
  };

  return variantStyles[variant] || baseStyles;
};

// CUSTOMIZE: Bạn có thể chỉnh sửa content styles tại đây
export const getContentStyles = (theme: Theme, disablePadding: boolean) => ({
  padding: disablePadding ? 0 : theme.spacing(3),
  minHeight: theme.spacing(10),
});

// CUSTOMIZE: Bạn có thể chỉnh sửa footer styles tại đây
export const getFooterStyles = (theme: Theme, alignment: string) => ({
  padding: theme.spacing(2, 3, 3, 3),
  borderTop: `1px solid ${COLORS.gray200}`,
  display: 'flex',
  justifyContent: alignment,
  alignItems: 'center',
  gap: theme.spacing(2),
  flexWrap: 'wrap' as const,
});
