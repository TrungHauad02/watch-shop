import { Box, Typography, IconButton, Divider } from '@mui/material';
import { Phone, Chat, Facebook } from '@mui/icons-material';
import { WSButton } from '@/components';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface ContactButtonsProps {
  productName: string;
  price: number;
  isOutOfStock?: boolean;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa thông tin liên hệ và URLs tại đây
export default function ContactButtons({
  productName,
  price,
  isOutOfStock = false,
}: ContactButtonsProps) {
  // CUSTOMIZE: Contact information - Update these with real contact info
  const CONTACT_INFO = {
    phone: '0123456789',
    zalo: 'https://zalo.me/0123456789',
    facebook: 'https://m.me/minhnhatwatchshop',
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleZaloContact = () => {
    const message = `Xin chào! Tôi quan tâm đến sản phẩm: ${productName} - Giá: ${formatPrice(price)}. Vui lòng tư vấn thêm cho tôi!`;
    const zaloUrl = `${CONTACT_INFO.zalo}?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, '_blank');
  };

  const handleFacebookContact = () => {
    const message = `Xin chào! Tôi quan tâm đến sản phẩm: ${productName} - Giá: ${formatPrice(price)}. Vui lòng tư vấn thêm cho tôi!`;
    const fbUrl = `${CONTACT_INFO.facebook}?text=${encodeURIComponent(message)}`;
    window.open(fbUrl, '_blank');
  };

  const handlePhoneContact = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  if (isOutOfStock) {
    return (
      <Box
        sx={{
          p: 3,
          backgroundColor: COLORS.white,
          borderRadius: 2,
          border: `1px solid ${COLORS.borderLight}`,
          boxShadow: `0 2px 8px ${COLORS.shadow}`,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              color: COLORS.textSecondary,
              fontWeight: 600,
              mb: 1,
            }}
          >
            Sản phẩm tạm hết hàng
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.textTertiary,
              fontSize: '0.875rem',
            }}
          >
            Liên hệ để được tư vấn thời gian có hàng trở lại
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            mb: 3,
          }}
        >
          <WSButton
            variant="outline"
            startIcon={<Phone />}
            onClick={handlePhoneContact}
            size="medium"
            sx={{ fontSize: '0.875rem' }}
          >
            Gọi điện
          </WSButton>

          <WSButton
            variant="outline"
            startIcon={<Chat />}
            onClick={handleZaloContact}
            size="medium"
            sx={{ fontSize: '0.875rem' }}
          >
            Zalo
          </WSButton>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.textSecondary,
              fontWeight: 600,
            }}
          >
            Hotline: {CONTACT_INFO.phone}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: COLORS.white,
        borderRadius: 2,
        border: `1px solid ${COLORS.borderLight}`,
        boxShadow: `0 2px 8px ${COLORS.shadow}`,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          backgroundColor: COLORS.gold50,
          borderBottom: `1px solid ${COLORS.gold200}`,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: COLORS.textPrimary,
            mb: 1,
          }}
        >
          Liên hệ mua hàng
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: COLORS.textSecondary,
            fontSize: '0.875rem',
          }}
        >
          Liên hệ ngay để được tư vấn và đặt hàng
        </Typography>
      </Box>

      {/* Main Contact Buttons */}
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            mb: 3,
          }}
        >
          <WSButton
            variant="primary"
            startIcon={<Chat />}
            onClick={handleZaloContact}
            fullWidth
            size="large"
            sx={{
              backgroundColor: '#0180C7',
              '&:hover': {
                backgroundColor: '#0164A0',
              },
              fontSize: '0.9rem',
              py: 1.5,
            }}
          >
            Nhắn tin Zalo
          </WSButton>

          <WSButton
            variant="primary"
            startIcon={<Facebook />}
            onClick={handleFacebookContact}
            fullWidth
            size="large"
            sx={{
              backgroundColor: '#1877F2',
              '&:hover': {
                backgroundColor: '#166FE5',
              },
              fontSize: '0.9rem',
              py: 1.5,
            }}
          >
            Chat Facebook
          </WSButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Phone Contact */}
        <Box sx={{ textAlign: 'center' }}>
          <IconButton
            onClick={handlePhoneContact}
            sx={{
              backgroundColor: SEMANTIC_COLORS.success100,
              color: SEMANTIC_COLORS.success700,
              '&:hover': {
                backgroundColor: SEMANTIC_COLORS.success200,
              },
              mb: 1,
              width: 56,
              height: 56,
              border: `1px solid ${SEMANTIC_COLORS.success200}`,
            }}
          >
            <Phone fontSize="large" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.textSecondary,
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Hotline: {CONTACT_INFO.phone}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: COLORS.textTertiary,
              fontSize: '0.75rem',
              display: 'block',
              mt: 0.5,
            }}
          >
            Gọi ngay để được tư vấn
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
