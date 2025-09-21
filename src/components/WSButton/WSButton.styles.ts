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
    transition: 'all 0.2s ease',
    position: 'relative' as const,

    '&:focus-visible': {
      outline: `2px solid ${COLORS.gold400}`,
      outlineOffset: '2px',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      color: COLORS.textDisabled,
      backgroundColor: COLORS.gray200,
      borderColor: COLORS.borderLight,
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

  // CUSTOMIZE: Simple variant styles với clean design
  const variantStyles = {
    primary: {
      backgroundColor: COLORS.primary,
      color: COLORS.white,
      border: `1px solid ${COLORS.primary}`,

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.primaryDark,
        borderColor: COLORS.primaryDark,
      },

      '&:active:not(:disabled)': {
        backgroundColor: COLORS.black700,
      },
    },

    secondary: {
      backgroundColor: COLORS.secondary,
      color: COLORS.primary,
      border: `1px solid ${COLORS.secondary}`,

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.secondaryDark,
        borderColor: COLORS.secondaryDark,
      },

      '&:active:not(:disabled)': {
        backgroundColor: COLORS.amber700,
      },
    },

    outline: {
      backgroundColor: 'transparent',
      color: COLORS.textPrimary,
      border: `1px solid ${COLORS.borderMedium}`,

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.backgroundSecondary,
        borderColor: COLORS.primary,
        color: COLORS.primary,
      },

      '&:active:not(:disabled)': {
        backgroundColor: COLORS.backgroundTertiary,
      },
    },

    text: {
      backgroundColor: 'transparent',
      color: COLORS.textSecondary,
      border: 'none',

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.backgroundSecondary,
        color: COLORS.textPrimary,
      },

      '&:active:not(:disabled)': {
        backgroundColor: COLORS.backgroundTertiary,
      },
    },

    danger: {
      backgroundColor: SEMANTIC_COLORS.error500,
      color: COLORS.white,
      border: `1px solid ${SEMANTIC_COLORS.error500}`,

      '&:hover:not(:disabled)': {
        backgroundColor: SEMANTIC_COLORS.error600,
        borderColor: SEMANTIC_COLORS.error600,
      },

      '&:active:not(:disabled)': {
        backgroundColor: SEMANTIC_COLORS.error700,
      },
    },

    luxury: {
      backgroundColor: COLORS.gold500,
      color: COLORS.primary,
      border: `1px solid ${COLORS.gold500}`,
      fontWeight: 700,

      '&:hover:not(:disabled)': {
        backgroundColor: COLORS.gold600,
        borderColor: COLORS.gold600,
        color: COLORS.white,
      },

      '&:active:not(:disabled)': {
        backgroundColor: COLORS.gold700,
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};
