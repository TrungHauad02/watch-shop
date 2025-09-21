import { Theme } from '@mui/material/styles';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';
import { WSCardVariant, WSCardPadding } from './WSCard.types';

// CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc và style của card tại đây
export const getCardStyles = (
  theme: Theme,
  variant: WSCardVariant,
  padding: WSCardPadding,
  clickable: boolean
) => {
  const baseStyles = {
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    position: 'relative' as const,
    overflow: 'hidden' as const,

    ...(clickable && {
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0)',
      },
    }),
  };

  const paddingStyles = {
    none: {
      '& .MuiCardContent-root': {
        padding: 0,
        '&:last-child': {
          paddingBottom: 0,
        },
      },
    },
    small: {
      '& .MuiCardContent-root': {
        padding: theme.spacing(1),
        '&:last-child': {
          paddingBottom: theme.spacing(1),
        },
      },
    },
    medium: {
      '& .MuiCardContent-root': {
        padding: theme.spacing(2),
        '&:last-child': {
          paddingBottom: theme.spacing(2),
        },
      },
    },
    large: {
      '& .MuiCardContent-root': {
        padding: theme.spacing(3),
        '&:last-child': {
          paddingBottom: theme.spacing(3),
        },
      },
    },
  };

  // CUSTOMIZE: Simple variant styles
  const variantStyles = {
    default: {
      backgroundColor: COLORS.white,
      border: `1px solid ${COLORS.borderLight}`,
      boxShadow: 'none',

      ...(clickable && {
        '&:hover': {
          borderColor: COLORS.borderMedium,
          boxShadow: `0 4px 12px ${ALPHA_COLORS.primaryAlpha10}`,
        },
      }),
    },

    outlined: {
      backgroundColor: COLORS.white,
      border: `1px solid ${COLORS.borderMedium}`,
      boxShadow: 'none',

      ...(clickable && {
        '&:hover': {
          borderColor: COLORS.gold400,
          boxShadow: `0 4px 12px ${ALPHA_COLORS.primaryAlpha10}`,
        },
      }),
    },

    elevated: {
      backgroundColor: COLORS.white,
      border: `1px solid ${COLORS.borderLight}`,
      boxShadow: `0 2px 8px ${ALPHA_COLORS.primaryAlpha10}`,

      ...(clickable && {
        '&:hover': {
          boxShadow: `0 8px 20px ${ALPHA_COLORS.primaryAlpha20}`,
        },
      }),
    },

    luxury: {
      backgroundColor: COLORS.white,
      border: `1px solid ${COLORS.gold400}30`,
      boxShadow: `0 2px 8px ${ALPHA_COLORS.secondaryAlpha10}`,
      background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.cream} 100%)`,

      ...(clickable && {
        '&:hover': {
          borderColor: COLORS.gold400,
          boxShadow: `0 8px 20px ${ALPHA_COLORS.secondaryAlpha20}`,
        },
      }),
    },
  };

  return {
    ...baseStyles,
    ...paddingStyles[padding],
    ...variantStyles[variant],
  };
};
