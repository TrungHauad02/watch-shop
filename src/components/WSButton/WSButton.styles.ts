import { Theme } from '@mui/material/styles';
import { COLORS, SEMANTIC_COLORS, ALPHA_COLORS } from '@/styles/colors';
import { WSButtonVariant, WSButtonSize } from './WSButton.types';

// CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc và style của button tại đây
export const getButtonStyles = (
  theme: Theme,
  variant: WSButtonVariant,
  size: WSButtonSize
) => {
  const baseStyles = {
    textTransform: 'none' as const,
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    // Fix: Thêm will-change để tối ưu performance
    willChange: 'transform, box-shadow',

    '&:focus-visible': {
      outline: `2px solid ${COLORS.borderFocus}`,
      outlineOffset: '2px',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      pointerEvents: 'none',
      color: COLORS.textDisabled,
      backgroundColor: COLORS.gray200,
      borderColor: COLORS.borderLight,
      transform: 'none !important', // Fix: Prevent transform on disabled
      boxShadow: 'none !important', // Fix: Remove shadow on disabled
    },
  };

  const sizeStyles = {
    small: {
      padding: '6px 16px',
      fontSize: '0.875rem',
      minHeight: '32px',
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        '& > svg': {
          fontSize: '1rem',
        },
      },
    },
    medium: {
      padding: '10px 20px',
      fontSize: '0.9375rem',
      minHeight: '40px',
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        '& > svg': {
          fontSize: '1.125rem',
        },
      },
    },
    large: {
      padding: '12px 24px',
      fontSize: '1rem',
      minHeight: '48px',
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        '& > svg': {
          fontSize: '1.25rem',
        },
      },
    },
  };

  // Fix: Đơn giản hóa variant styles để tránh conflict
  const variantStyles = {
    primary: {
      backgroundColor: COLORS.black900,
      color: COLORS.textInverse,
      border: `1px solid ${COLORS.black900}`,
      boxShadow: `0 2px 8px ${ALPHA_COLORS.primaryAlpha20}`,

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.black800,
        borderColor: COLORS.black800,
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${ALPHA_COLORS.primaryAlpha50}`,
      },

      '&:active:not(:disabled)': {
        transform: 'translateY(0)',
        backgroundColor: COLORS.black700,
        boxShadow: `0 2px 8px ${ALPHA_COLORS.primaryAlpha75}`,
      },
    },

    secondary: {
      backgroundColor: COLORS.secondary,
      color: COLORS.textPrimary,
      border: `1px solid ${COLORS.secondary}`,
      boxShadow: `0 2px 8px ${ALPHA_COLORS.secondaryAlpha20}`,

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.secondaryDark,
        borderColor: COLORS.secondaryDark,
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${ALPHA_COLORS.secondaryAlpha50}`,
      },

      '&:active:not(:disabled)': {
        transform: 'translateY(0)',
        backgroundColor: COLORS.amber700,
        boxShadow: `0 2px 8px ${ALPHA_COLORS.secondaryAlpha75}`,
      },
    },

    outline: {
      backgroundColor: 'transparent',
      color: COLORS.textPrimary,
      border: `1px solid ${COLORS.borderMedium}`,
      boxShadow: 'none',

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.backgroundSecondary,
        borderColor: COLORS.black700,
        color: COLORS.textPrimary,
        boxShadow: `0 2px 8px ${COLORS.shadow}`,
      },

      '&:active:not(:disabled)': {
        backgroundColor: COLORS.backgroundTertiary,
        borderColor: COLORS.black800,
      },
    },

    text: {
      backgroundColor: 'transparent',
      color: COLORS.textSecondary,
      border: '1px solid transparent',
      boxShadow: 'none',

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.backgroundSecondary,
        color: COLORS.textPrimary,
      },

      '&:active:not(:disabled)': {
        backgroundColor: COLORS.backgroundTertiary,
        color: COLORS.textPrimary,
      },
    },

    danger: {
      backgroundColor: SEMANTIC_COLORS.error500,
      color: COLORS.textInverse,
      border: `1px solid ${SEMANTIC_COLORS.error500}`,
      boxShadow: `0 2px 8px rgba(239, 68, 68, 0.2)`,

      '&:hover:not(:disabled)': {
        backgroundColor: SEMANTIC_COLORS.error600,
        borderColor: SEMANTIC_COLORS.error600,
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px rgba(239, 68, 68, 0.4)`,
      },

      '&:active:not(:disabled)': {
        transform: 'translateY(0)',
        backgroundColor: SEMANTIC_COLORS.error700,
        boxShadow: `0 2px 8px rgba(239, 68, 68, 0.6)`,
      },
    },

    // Fix: Đơn giản hóa luxury variant
    luxury: {
      backgroundColor: COLORS.gold500,
      color: COLORS.textPrimary,
      border: `1px solid ${COLORS.gold500}`,
      boxShadow: `0 2px 8px ${ALPHA_COLORS.secondaryAlpha20}`,
      fontWeight: 700,

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.gold600,
        borderColor: COLORS.gold600,
        color: COLORS.textInverse,
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${ALPHA_COLORS.secondaryAlpha50}`,
      },

      '&:active:not(:disabled)': {
        transform: 'translateY(0)',
        backgroundColor: COLORS.gold700,
        boxShadow: `0 2px 8px ${ALPHA_COLORS.secondaryAlpha75}`,
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};

// Fix: Bỏ các animation phức tạp gây conflict
export const buttonUtils = {
  // Simple hover effect
  simpleHover: {
    '&:hover': {
      transform: 'translateY(-1px)',
      transition: 'transform 0.2s ease',
    },
  },

  // Subtle shadow
  subtleShadow: {
    boxShadow: `0 2px 8px ${ALPHA_COLORS.primaryAlpha10}`,
    '&:hover': {
      boxShadow: `0 4px 12px ${ALPHA_COLORS.primaryAlpha20}`,
    },
  },
};
