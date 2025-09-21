import { Theme } from '@mui/material/styles';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';
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

    '&:focus-visible': {
      outline: `2px solid ${COLORS.primary}`,
      outlineOffset: '2px',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      pointerEvents: 'none',
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

  const variantStyles = {
    primary: {
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      border: `1px solid ${COLORS.primary}`,

      '&:hover': {
        backgroundColor: COLORS.primaryDark,
        borderColor: COLORS.primaryDark,
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${COLORS.primary}40`,
      },

      '&:active': {
        transform: 'translateY(0)',
        boxShadow: `0 2px 8px ${COLORS.primary}60`,
      },
    },

    secondary: {
      backgroundColor: COLORS.secondary,
      color: COLORS.primary,
      border: `1px solid ${COLORS.secondary}`,

      '&:hover': {
        backgroundColor: COLORS.secondaryDark,
        borderColor: COLORS.secondaryDark,
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${COLORS.secondary}40`,
      },

      '&:active': {
        transform: 'translateY(0)',
        boxShadow: `0 2px 8px ${COLORS.secondary}60`,
      },
    },

    outline: {
      backgroundColor: 'transparent',
      color: COLORS.primary,
      border: `1px solid ${COLORS.gray300}`,

      '&:hover': {
        backgroundColor: COLORS.gray50,
        borderColor: COLORS.primary,
        color: COLORS.primary,
      },

      '&:active': {
        backgroundColor: COLORS.gray100,
      },
    },

    text: {
      backgroundColor: 'transparent',
      color: COLORS.primary,
      border: '1px solid transparent',

      '&:hover': {
        backgroundColor: COLORS.gray50,
        color: COLORS.primaryDark,
      },

      '&:active': {
        backgroundColor: COLORS.gray100,
      },
    },

    danger: {
      backgroundColor: SEMANTIC_COLORS.error500,
      color: COLORS.white,
      border: `1px solid ${SEMANTIC_COLORS.error500}`,

      '&:hover': {
        backgroundColor: SEMANTIC_COLORS.error600,
        borderColor: SEMANTIC_COLORS.error600,
        transform: 'translateY(-1px)',
        boxShadow: `0 4px 12px ${SEMANTIC_COLORS.error500}40`,
      },

      '&:active': {
        transform: 'translateY(0)',
        boxShadow: `0 2px 8px ${SEMANTIC_COLORS.error500}60`,
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};
