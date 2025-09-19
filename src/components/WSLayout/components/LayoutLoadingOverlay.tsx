import { BRAND_COLORS } from '@/styles/colors';
import { Box, Fade, CircularProgress } from '@mui/material';
import { layoutConfig } from '../layout.data';

interface LayoutLoadingOverlayProps {
  isLoading: boolean;
  backdropBlur?: number;
  spinnerSize?: number;
}

export default function LayoutLoadingOverlay({
  isLoading,
  backdropBlur = layoutConfig.loading.backdropBlur,
  spinnerSize = layoutConfig.loading.spinnerSize,
}: LayoutLoadingOverlayProps) {
  return (
    <Fade in={isLoading}>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // CUSTOMIZE: Chỉnh sửa style của loading overlay ở đây
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: `blur(${backdropBlur}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: (theme) => theme.zIndex.modal + 1,
          pointerEvents: isLoading ? 'auto' : 'none',
        }}
      >
        <CircularProgress
          size={spinnerSize}
          thickness={3}
          sx={{
            // CUSTOMIZE: Chỉnh sửa màu sắc của spinner ở đây
            color: BRAND_COLORS.accent,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    </Fade>
  );
}
