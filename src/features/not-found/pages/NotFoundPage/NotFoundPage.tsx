import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { WSButton } from '@/components';
import { getNotFoundStyles } from './NotFoundPage.styles';
import { GRADIENT_COLORS } from '@/styles/colors';

// CUSTOMIZE: Component NotFoundPage như một trang độc lập với concept đồng hồ
export default function NotFoundPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const styles = getNotFoundStyles(theme);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second for digital display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Handle navigation
  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.contentContainer}>
        {/* Watch Clock - Main focal point */}
        <Box sx={styles.clockContainer}>
          {/* Watch face */}
          <Box sx={styles.watchFace}>
            {/* Hour markers */}
            <Box sx={styles.hourMarker} className="marker-12" />
            <Box sx={styles.hourMarker} className="marker-3" />
            <Box sx={styles.hourMarker} className="marker-6" />
            <Box sx={styles.hourMarker} className="marker-9" />

            {/* 404 positioned like clock numbers */}
            <Typography sx={styles.clockNumber} className="number-4-left">
              4
            </Typography>
            <Typography sx={styles.clockNumber} className="number-0-top">
              0
            </Typography>
            <Typography sx={styles.clockNumber} className="number-4-right">
              4
            </Typography>

            {/* Clock hands pointing to 4:00 (404) */}
            <Box sx={styles.clockHand} className="hour-hand" />
            <Box sx={styles.clockHand} className="minute-hand" />
            <Box sx={styles.secondHand} />

            {/* Center dot */}
            <Box sx={styles.centerDot} />

            {/* Watch brand text */}
            <Typography sx={styles.brandText}>WATCH STORE</Typography>
          </Box>
        </Box>

        {/* Error title */}
        <Typography variant="h1" sx={styles.title}>
          Thời gian dừng lại
        </Typography>

        {/* Description */}
        <Typography variant="body1" sx={styles.description}>
          Có vẻ như thời gian đã dừng lại và trang bạn tìm kiếm không tồn tại.
          Hãy điều chỉnh lại hành trình của bạn.
        </Typography>

        {/* Current time display (like digital watch) */}
        <Box sx={styles.timeDisplay}>{formatTime(currentTime)}</Box>

        {/* Action buttons */}
        <Box sx={styles.buttonContainer}>
          <WSButton
            variant="luxury"
            size="large"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            sx={{
              minWidth: '200px',
              fontWeight: 600,
              background: GRADIENT_COLORS.amberGradient,
            }}
          >
            Về trang chủ
          </WSButton>

          <WSButton
            variant="outline"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            sx={{
              minWidth: '150px',
              fontWeight: 600,
            }}
          >
            Quay lại
          </WSButton>
        </Box>
      </Box>
    </Box>
  );
}
