import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { COLORS } from '@/styles/colors';

interface WSDecorativeBackgroundProps {
  children?: React.ReactNode;
  variant?: 'light' | 'dark' | 'gold';
  density?: 'low' | 'medium' | 'high';
  animated?: boolean;
  sx?: SxProps<Theme>;
}

export default function WSDecorativeBackground({
  children,
  variant = 'light',
  density = 'medium',
  animated = true,
  sx = {},
}: WSDecorativeBackgroundProps) {
  // CUSTOMIZE: Cấu hình màu sắc cho từng variant
  const getCircleColors = () => {
    switch (variant) {
      case 'light':
        return {
          primary: COLORS.gray100,
          secondary: COLORS.gray200,
          tertiary: COLORS.gray50,
          accent: COLORS.gold100,
        };
      case 'dark':
        return {
          primary: COLORS.gray800,
          secondary: COLORS.gray700,
          tertiary: COLORS.gray600,
          accent: COLORS.gold800,
        };
      case 'gold':
        return {
          primary: COLORS.gold100,
          secondary: COLORS.gold200,
          tertiary: COLORS.gold50,
          accent: COLORS.amber100,
        };
      default:
        return {
          primary: COLORS.gray100,
          secondary: COLORS.gray200,
          tertiary: COLORS.gray50,
          accent: COLORS.gold100,
        };
    }
  };

  // CUSTOMIZE: Cấu hình số lượng và kích thước vòng tròn theo density
  const getCircleConfig = () => {
    switch (density) {
      case 'low':
        return { count: 8, sizes: [60, 80, 100, 120] };
      case 'medium':
        return { count: 12, sizes: [40, 60, 80, 100, 120, 150] };
      case 'high':
        return { count: 16, sizes: [30, 50, 70, 90, 110, 130, 160] };
      default:
        return { count: 12, sizes: [40, 60, 80, 100, 120, 150] };
    }
  };

  const colors = getCircleColors();
  const config = getCircleConfig();

  // CUSTOMIZE: Tạo các vòng tròn với vị trí và kích thước ngẫu nhiên
  const generateCircles = () => {
    const circles = [];
    const colorArray = Object.values(colors);

    for (let i = 0; i < config.count; i++) {
      const size =
        config.sizes[Math.floor(Math.random() * config.sizes.length)];
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = 0.3 + Math.random() * 0.4; // 0.3 - 0.7
      const animationDelay = Math.random() * 20; // 0-20s delay
      const animationDuration = 15 + Math.random() * 25; // 15-40s duration

      circles.push(
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: opacity,
            top: `${top}%`,
            left: `${left}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(0.5px)',
            pointerEvents: 'none',
            zIndex: -1,
            ...(animated && {
              animation: `float-${i} ${animationDuration}s ease-in-out infinite`,
              animationDelay: `${animationDelay}s`,
              '@keyframes': {
                [`float-${i}`]: {
                  '0%': {
                    transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                  },
                  '33%': {
                    transform: `translate(${-50 + Math.random() * 20 - 10}%, ${-50 + Math.random() * 20 - 10}%) scale(${0.8 + Math.random() * 0.4}) rotate(${Math.random() * 60 - 30}deg)`,
                  },
                  '66%': {
                    transform: `translate(${-50 + Math.random() * 20 - 10}%, ${-50 + Math.random() * 20 - 10}%) scale(${0.9 + Math.random() * 0.3}) rotate(${Math.random() * 60 - 30}deg)`,
                  },
                  '100%': {
                    transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
                  },
                },
              },
            }),
          }}
        />
      );
    }

    return circles;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        ...sx,
      }}
    >
      {/* Background circles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        {generateCircles()}
      </Box>

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
