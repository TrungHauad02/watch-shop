import { Typography, Paper } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { WSButton } from '@/components';
import { COLORS } from '@/styles/colors';

interface ResetPasswordSuccessProps {
  onLoginClick: () => void;
}

export default function ResetPasswordSuccess({
  onLoginClick,
}: ResetPasswordSuccessProps) {
  return (
    <Paper
      elevation={24}
      sx={{
        p: 4,
        borderRadius: 3,
        textAlign: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        // CUSTOMIZE: Bạn có thể chỉnh sửa style của success paper tại đây
      }}
    >
      <CheckCircle
        sx={{
          fontSize: 64,
          color: COLORS.gold500,
          mb: 2,
        }}
      />

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: COLORS.primary,
          mb: 2,
        }}
      >
        Thành Công!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: COLORS.textSecondary,
          mb: 3,
          lineHeight: 1.6,
        }}
      >
        Mật khẩu của bạn đã được đặt lại thành công. Bạn sẽ được chuyển hướng
        đến trang đăng nhập trong giây lát.
      </Typography>

      <WSButton
        variant="primary"
        size="large"
        onClick={onLoginClick}
        sx={{ mb: 2 }}
        // CUSTOMIZE: Bạn có thể chỉnh sửa success button tại đây
      >
        Đăng nhập ngay
      </WSButton>
    </Paper>
  );
}
