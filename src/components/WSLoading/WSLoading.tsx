// src/components/WSLoading/WSLoading.tsx

import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Fade,
  LinearProgress,
  Skeleton,
  useTheme,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { BRAND_COLORS } from '../../styles/colors';

// ==============================================
// TYPES
// ==============================================

export interface WSLoadingProps {
  /** Loading variant */
  variant?: 'circular' | 'linear' | 'page' | 'skeleton' | 'dots';

  /** Loading size */
  size?: 'small' | 'medium' | 'large';

  /** Loading message */
  message?: string;

  /** Show progress value */
  progress?: number;

  /** Minimum height for page variant */
  minHeight?: string;

  /** Custom color */
  color?: 'primary' | 'secondary' | 'inherit';

  /** Additional styles */
  sx?: SxProps<Theme>;

  /** Whether to show fade in animation */
  fadeIn?: boolean;

  /** Custom loading icon */
  icon?: React.ReactNode;
}

// ==============================================
// COMPONENT
// ==============================================

const WSLoading: React.FC<WSLoadingProps> = ({
  variant = 'circular',
  size = 'medium',
  message,
  progress,
  minHeight = '300px',
  color = 'primary',
  sx = {},
  fadeIn = true,
  icon,
}) => {
  const theme = useTheme();

  // ==============================================
  // SIZE CONFIGURATIONS
  // ==============================================

  const getSizeConfig = () => {
    const configs = {
      small: {
        circular: 24,
        fontSize: '0.875rem',
        spacing: 1,
      },
      medium: {
        circular: 40,
        fontSize: '1rem',
        spacing: 2,
      },
      large: {
        circular: 56,
        fontSize: '1.125rem',
        spacing: 3,
      },
    };

    return configs[size];
  };

  const sizeConfig = getSizeConfig();

  // ==============================================
  // COLOR CONFIGURATIONS
  // ==============================================

  const getColor = () => {
    switch (color) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return BRAND_COLORS.secondary;
      case 'inherit':
        return 'inherit';
      default:
        return theme.palette.primary.main;
    }
  };

  // ==============================================
  // LOADING VARIANTS
  // ==============================================

  const renderCircularLoading = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizeConfig.spacing,
        ...sx,
      }}
    >
      {icon || (
        <CircularProgress
          size={sizeConfig.circular}
          sx={{ color: getColor() }}
          variant={progress !== undefined ? 'determinate' : 'indeterminate'}
          value={progress ?? 0}
        />
      )}
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: sizeConfig.fontSize, textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
      {progress !== undefined && (
        <Typography variant="caption" color="text.secondary">
          {Math.round(progress)}%
        </Typography>
      )}
    </Box>
  );

  const renderLinearLoading = () => (
    <Box sx={{ width: '100%', ...sx }}>
      <LinearProgress
        variant={progress !== undefined ? 'determinate' : 'indeterminate'}
        value={progress ?? 0}
        sx={{
          height: size === 'small' ? 4 : size === 'large' ? 8 : 6,
          borderRadius: 1,
          backgroundColor: 'rgba(0,0,0,0.1)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: getColor(),
          },
        }}
      />
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: sizeConfig.fontSize,
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  const renderPageLoading = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: minHeight,
        width: '100%',
        gap: sizeConfig.spacing,
        ...sx,
      }}
    >
      {icon || (
        <CircularProgress
          size={sizeConfig.circular}
          sx={{ color: getColor() }}
        />
      )}
      {message && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: sizeConfig.fontSize, textAlign: 'center' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  const renderSkeletonLoading = () => (
    <Box sx={{ width: '100%', ...sx }}>
      <Skeleton
        variant="rectangular"
        height={size === 'small' ? 120 : size === 'large' ? 200 : 160}
        sx={{ borderRadius: 1, mb: 1 }}
      />
      <Skeleton variant="text" height={24} width="60%" sx={{ mb: 0.5 }} />
      <Skeleton variant="text" height={20} width="40%" />
      {message && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  const renderDotsLoading = () => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.5,
        ...sx,
      }}
    >
      {[0, 1, 2].map((index) => (
        <Box
          key={index}
          sx={{
            width: size === 'small' ? 6 : size === 'large' ? 12 : 8,
            height: size === 'small' ? 6 : size === 'large' ? 12 : 8,
            borderRadius: '50%',
            backgroundColor: getColor(),
            animation: 'dotPulse 1.4s ease-in-out infinite both',
            animationDelay: `${index * 0.16}s`,
            '@keyframes dotPulse': {
              '0%, 80%, 100%': {
                transform: 'scale(0)',
                opacity: 0.5,
              },
              '40%': {
                transform: 'scale(1)',
                opacity: 1,
              },
            },
          }}
        />
      ))}
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ ml: 2, fontSize: sizeConfig.fontSize }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );

  // ==============================================
  // RENDER MAIN COMPONENT
  // ==============================================

  const renderLoadingVariant = () => {
    switch (variant) {
      case 'linear':
        return renderLinearLoading();
      case 'page':
        return renderPageLoading();
      case 'skeleton':
        return renderSkeletonLoading();
      case 'dots':
        return renderDotsLoading();
      case 'circular':
      default:
        return renderCircularLoading();
    }
  };

  const loadingComponent = renderLoadingVariant();

  return fadeIn ? (
    <Fade in={true} timeout={300}>
      <div>{loadingComponent}</div>
    </Fade>
  ) : (
    loadingComponent
  );
};

export default WSLoading;
