import { Theme } from '@mui/material/styles';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';
import { WSInputVariant, WSInputSize } from './WSInput.types';

// CUSTOMIZE: Bạn có thể chỉnh sửa màu sắc và style của input tại đây
export const getInputStyles = (
  theme: Theme,
  variant: WSInputVariant,
  size: WSInputSize
) => {
  const baseStyles = {
    '& .MuiInputLabel-root': {
      fontWeight: 500,
      color: COLORS.gray600,
      fontSize: '0.9rem',

      '&.Mui-focused': {
        color: COLORS.primary,
      },

      '&.Mui-error': {
        color: SEMANTIC_COLORS.error500,
      },
    },

    '& .MuiInputBase-root': {
      backgroundColor: COLORS.white,
      borderRadius: theme.shape.borderRadius,
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      fontWeight: 400,

      '&:hover:not(.Mui-disabled):not(.Mui-error)': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: COLORS.gray400,
        },
      },

      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: COLORS.primary,
          borderWidth: '2px',
        },
      },

      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: SEMANTIC_COLORS.error500,
        },
      },

      '&.Mui-disabled': {
        backgroundColor: COLORS.gray50,
        color: COLORS.gray400,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: COLORS.gray200,
        },
      },
    },

    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: COLORS.gray300,
    },

    '& .MuiInputBase-input': {
      '&::placeholder': {
        color: COLORS.gray400,
        opacity: 1,
      },

      '&:focus': {
        outline: 'none',
      },
    },

    '& .MuiFormHelperText-root': {
      marginTop: theme.spacing(0.5),
      fontSize: '0.75rem',

      '&.Mui-error': {
        color: SEMANTIC_COLORS.error500,
      },
    },
  };

  const sizeStyles = {
    small: {
      '& .MuiInputBase-root': {
        fontSize: '0.875rem',

        '& .MuiInputBase-input': {
          padding: '8px 12px',
        },

        '&.MuiInputBase-adornedStart .MuiInputBase-input': {
          paddingLeft: 0,
        },

        '&.MuiInputBase-adornedEnd .MuiInputBase-input': {
          paddingRight: 0,
        },
      },

      '& .MuiInputAdornment-root': {
        '& .MuiSvgIcon-root': {
          fontSize: '1rem',
        },
      },
    },

    medium: {
      '& .MuiInputBase-root': {
        fontSize: '0.9375rem',

        '& .MuiInputBase-input': {
          padding: '12px 14px',
        },

        '&.MuiInputBase-adornedStart .MuiInputBase-input': {
          paddingLeft: 0,
        },

        '&.MuiInputBase-adornedEnd .MuiInputBase-input': {
          paddingRight: 0,
        },
      },

      '& .MuiInputAdornment-root': {
        '& .MuiSvgIcon-root': {
          fontSize: '1.125rem',
        },
      },
    },

    large: {
      '& .MuiInputBase-root': {
        fontSize: '1rem',

        '& .MuiInputBase-input': {
          padding: '16px 16px',
        },

        '&.MuiInputBase-adornedStart .MuiInputBase-input': {
          paddingLeft: 0,
        },

        '&.MuiInputBase-adornedEnd .MuiInputBase-input': {
          paddingRight: 0,
        },
      },

      '& .MuiInputAdornment-root': {
        '& .MuiSvgIcon-root': {
          fontSize: '1.25rem',
        },
      },
    },
  };

  const variantStyles = {
    outlined: {
      '& .MuiInputBase-root': {
        '&:hover:not(.Mui-disabled):not(.Mui-error)': {
          backgroundColor: COLORS.gray50,
        },

        '&.Mui-focused': {
          backgroundColor: COLORS.white,
          boxShadow: `0 0 0 3px ${COLORS.primary}20`,
        },
      },
    },

    filled: {
      '& .MuiInputBase-root': {
        backgroundColor: COLORS.gray100,
        border: 'none',

        '&:before': {
          borderBottom: `1px solid ${COLORS.gray300}`,
        },

        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `1px solid ${COLORS.gray400}`,
        },

        '&.Mui-focused:after': {
          borderBottom: `2px solid ${COLORS.primary}`,
        },
      },
    },

    standard: {
      '& .MuiInputBase-root': {
        backgroundColor: 'transparent',

        '&:before': {
          borderBottom: `1px solid ${COLORS.gray300}`,
        },

        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `1px solid ${COLORS.gray400}`,
        },

        '&.Mui-focused:after': {
          borderBottom: `2px solid ${COLORS.primary}`,
        },
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...variantStyles[variant],
  };
};
