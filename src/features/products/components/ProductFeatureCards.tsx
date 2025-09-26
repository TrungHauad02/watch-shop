import { Box, Typography } from '@mui/material';
import { LocalShipping, Shield } from '@mui/icons-material';
import { ProductDTO } from '@/shared/types';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface ProductFeatureCardsProps {
  product: ProductDTO;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa warranty và shipping cards tại đây
export default function ProductFeatureCards({
  product,
}: ProductFeatureCardsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
      {/* Warranty Card */}
      {product.warrantyYears && (
        <Box
          sx={{
            p: 2.5,
            backgroundColor: COLORS.gold50,
            borderRadius: 2,
            border: `1px solid ${COLORS.gold200}`,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Shield sx={{ color: COLORS.gold500, fontSize: '1.5rem' }} />
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                color: COLORS.gold700,
                fontSize: '0.875rem',
              }}
            >
              Bảo hành chính hãng {product.warrantyYears} năm
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: COLORS.gold600,
                fontSize: '0.75rem',
              }}
            >
              Đảm bảo chất lượng và uy tín
            </Typography>
          </Box>
        </Box>
      )}

      {/* Shipping Card */}
      <Box
        sx={{
          p: 2.5,
          backgroundColor: SEMANTIC_COLORS.info50,
          borderRadius: 2,
          border: `1px solid ${SEMANTIC_COLORS.info200}`,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <LocalShipping
          sx={{ color: SEMANTIC_COLORS.info500, fontSize: '1.5rem' }}
        />
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 600,
              color: SEMANTIC_COLORS.info700,
              fontSize: '0.875rem',
            }}
          >
            Miễn phí giao hàng toàn quốc
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: SEMANTIC_COLORS.info600,
              fontSize: '0.75rem',
            }}
          >
            Giao nhanh 1-2 ngày • Đóng gói cẩn thận
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
