import { Box, Typography, Portal } from '@mui/material';
import { useEffect, useState } from 'react';
import { WSLoadingProps } from './WSLoading.types';
import {
  getVariantStyles,
  overlayStyles,
  getLoadingSizes,
  getLoadingColors,
} from './WSLoading.styles';
import COLORS from '@/styles/colors';

export default function WSLoading({
  variant = 'circular',
  size = 'medium',
  color = 'primary',
  text,
  overlay = false,
  backdrop = true,
  children,
  className,
  sx,
  visible = true,
  delay = 0,
}: WSLoadingProps) {
  const [shouldShow, setShouldShow] = useState(delay === 0);

  // CUSTOMIZE: Bạn có thể chỉnh sửa logic delay tại đây
  useEffect(() => {
    if (!visible) {
      setShouldShow(false);
      return;
    }

    if (delay > 0) {
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, delay);

      return () => clearTimeout(timer);
    } else {
      setShouldShow(true);
    }
    return;
  }, [visible, delay]);

  if (!shouldShow || !visible) {
    return null;
  }

  const variantStyles = getVariantStyles(variant, size, color);
  const sizes = getLoadingSizes(size);
  const colors = getLoadingColors(color);

  const renderLoadingContent = () => {
    if (children) {
      return children;
    }

    // CUSTOMIZE: Bạn có thể chỉnh sửa nội dung loading cho từng variant tại đây
    const loadingElements = {
      circular: <div className="spinner" />,

      linear: <div className="progress-bar" />,

      dots: (
        <div className="dots-container">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      ),

      pulse: <div className="pulse-circle" />,

      skeleton: (
        <div className="skeleton-lines">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      ),
    };

    return (
      <>
        {loadingElements[variant]}
        {text && (
          <Typography
            variant="body2"
            sx={{
              color: overlay ? COLORS.white : colors.main,
              fontSize: sizes.text,
              fontWeight: 500,
              textAlign: 'center',
              mt: 1,
              // CUSTOMIZE: Bạn có thể chỉnh sửa style của loading text tại đây
              textShadow: overlay ? `0 1px 3px ${COLORS.primary}80` : 'none',
              letterSpacing: '0.5px',
            }}
          >
            {text}
          </Typography>
        )}
      </>
    );
  };

  const loadingComponent = (
    <Box
      className={className}
      sx={{
        ...variantStyles,
        ...sx,
        // CUSTOMIZE: Bạn có thể thêm custom styles tại đây
      }}
    >
      {renderLoadingContent()}
    </Box>
  );

  // CUSTOMIZE: Bạn có thể chỉnh sửa overlay behavior tại đây
  if (overlay) {
    return (
      <Portal>
        <Box
          sx={{
            ...overlayStyles,
            backgroundColor: backdrop ? `${COLORS.primary}85` : 'transparent',
            backdropFilter: backdrop ? 'blur(8px)' : 'none',
          }}
        >
          {loadingComponent}
        </Box>
      </Portal>
    );
  }

  return loadingComponent;
}
