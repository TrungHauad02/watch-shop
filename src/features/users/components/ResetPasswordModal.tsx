import { Box, Typography } from '@mui/material';
import { WSModal, WSButton } from '@/components';
import { CheckCircle, Email } from '@mui/icons-material';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
  userEmail: string;
}

export default function ResetPasswordModal({
  open,
  onClose,
  userEmail,
}: ResetPasswordModalProps) {
  const handleSendResetEmail = async () => {
    try {
      // TODO: Implement send reset password email API call
      console.log('Sending reset password email to:', userEmail);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Modal will show success state
    } catch (error) {
      console.error('Failed to send reset password email:', error);
    }
  };

  return (
    <WSModal open={open} onClose={onClose} title="">
      <Box
        sx={{
          textAlign: 'center',
          py: 2,
        }}
      >
        {/* Success Icon */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: SEMANTIC_COLORS.success100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // CUSTOMIZE: Bạn có thể chỉnh sửa style của success icon container tại đây
            }}
          >
            <Email
              sx={{
                fontSize: 40,
                color: SEMANTIC_COLORS.success600,
              }}
            />
          </Box>
        </Box>

        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: COLORS.primary,
            mb: 2,
          }}
        >
          Email đổi mật khẩu đã được gửi
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: COLORS.textSecondary,
            mb: 1,
            lineHeight: 1.6,
          }}
        >
          Chúng tôi đã gửi hướng dẫn đổi mật khẩu đến email:
        </Typography>

        {/* Email */}
        <Typography
          variant="body1"
          sx={{
            color: COLORS.primary,
            fontWeight: 600,
            mb: 3,
            backgroundColor: COLORS.gray50,
            px: 3,
            py: 1.5,
            borderRadius: 1,
            display: 'inline-block',
            fontFamily: 'monospace',
          }}
        >
          {userEmail}
        </Typography>

        {/* Additional Instructions */}
        <Box
          sx={{
            backgroundColor: SEMANTIC_COLORS.info50,
            border: `1px solid ${SEMANTIC_COLORS.info200}`,
            borderRadius: 1,
            p: 3,
            mb: 4,
            textAlign: 'left',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              color: SEMANTIC_COLORS.info700,
              mb: 1.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <CheckCircle sx={{ fontSize: 18 }} />
            Hướng dẫn tiếp theo:
          </Typography>

          <Box component="ul" sx={{ m: 0, pl: 2 }}>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: SEMANTIC_COLORS.info600,
                mb: 0.5,
                lineHeight: 1.5,
              }}
            >
              Kiểm tra hộp thư email của bạn
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: SEMANTIC_COLORS.info600,
                mb: 0.5,
                lineHeight: 1.5,
              }}
            >
              Nhấp vào liên kết trong email để đổi mật khẩu
            </Typography>
            <Typography
              component="li"
              variant="body2"
              sx={{
                color: SEMANTIC_COLORS.info600,
                lineHeight: 1.5,
              }}
            >
              Tạo mật khẩu mới và đăng nhập lại
            </Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
          }}
        >
          <WSButton
            variant="outline"
            onClick={handleSendResetEmail}
            sx={
              {
                // CUSTOMIZE: Bạn có thể chỉnh sửa style của resend button tại đây
              }
            }
          >
            Gửi lại email
          </WSButton>

          <WSButton
            variant="primary"
            onClick={onClose}
            sx={{
              minWidth: 120,
              // CUSTOMIZE: Bạn có thể chỉnh sửa style của close button tại đây
            }}
          >
            Đóng
          </WSButton>
        </Box>

        {/* Footer Note */}
        <Typography
          variant="caption"
          sx={{
            color: COLORS.textTertiary,
            mt: 3,
            display: 'block',
            lineHeight: 1.4,
          }}
        >
          Không thấy email? Kiểm tra thư mục spam hoặc liên hệ hỗ trợ nếu cần
          thiết.
        </Typography>
      </Box>
    </WSModal>
  );
}
