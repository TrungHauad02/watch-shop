import { Box } from '@mui/material';
import { layoutConfig } from '../layout.data';
import COLORS from '@/styles/colors';

interface LayoutBackgroundDecorativeProps {
  opacity?: number;
  show?: boolean;
}

export default function LayoutBackgroundDecorative({
  opacity = layoutConfig.background.opacity,
  show = layoutConfig.background.showDecorative,
}: LayoutBackgroundDecorativeProps) {
  if (!show) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: -1,
        opacity: opacity,
        // CUSTOMIZE: Chỉnh sửa decorative background pattern ở đây
        background: `
          radial-gradient(circle at 25% 25%, ${COLORS.secondary} 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, ${COLORS.accent} 0%, transparent 50%),
          linear-gradient(45deg, transparent 40%, ${COLORS.secondary}10 50%, transparent 60%)
        `,
        transition: 'opacity 0.3s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 100px,
              ${COLORS.accent}05 100px,
              ${COLORS.accent}05 102px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 100px,
              ${COLORS.secondary}03 100px,
              ${COLORS.secondary}03 102px
            )
          `,
        },
      }}
    />
  );
}
