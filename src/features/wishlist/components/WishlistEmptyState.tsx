import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Favorite, ShoppingBag } from '@mui/icons-material';
import { WSButton } from '@/components';
import { COLORS } from '@/styles/colors';

// CUSTOMIZE: Bạn có thể chỉnh sửa giao diện empty state tại đây
export default function WishlistEmptyState() {
  const navigate = useNavigate();

  const handleBrowseProducts = () => {
    navigate('/products');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: 8,
        px: 3,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          mb: 3,
        }}
      >
        <Favorite
          sx={{
            fontSize: 80,
            color: COLORS.gray300,
            mb: 2,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <ShoppingBag
            sx={{
              fontSize: 32,
              color: COLORS.gray400,
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: COLORS.textPrimary,
          mb: 1,
        }}
      >
        Danh sách yêu thích trống
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: COLORS.textSecondary,
          mb: 4,
          maxWidth: 400,
          lineHeight: 1.6,
        }}
      >
        Bạn chưa lưu sản phẩm nào vào danh sách yêu thích. Hãy khám phá các mẫu
        đồng hồ tuyệt vời của chúng tôi!
      </Typography>

      <WSButton
        variant="primary"
        size="large"
        startIcon={<ShoppingBag />}
        onClick={handleBrowseProducts}
        sx={{
          minWidth: 200,
        }}
      >
        Khám phá sản phẩm
      </WSButton>

      <Box
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: COLORS.gray50,
          borderRadius: 2,
          maxWidth: 500,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: COLORS.textSecondary,
            fontStyle: 'italic',
          }}
        >
          💡 <strong>Mẹo:</strong> Nhấn vào biểu tượng trái tim trên các sản
          phẩm để thêm chúng vào danh sách yêu thích của bạn
        </Typography>
      </Box>
    </Box>
  );
}
