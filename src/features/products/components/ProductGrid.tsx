import { Grid, Box, Typography, Skeleton } from '@mui/material';
import { ProductDTO } from '@/shared/types';
import ProductCard from './ProductCard';
import { COLORS } from '@/styles/colors';

interface ProductGridProps {
  products: ProductDTO[];
  loading?: boolean;
  onAddToWishlist?: (productId: string) => void;
  wishlistProductIds?: string[];
}

export default function ProductGrid({
  products,
  loading = false,
  onAddToWishlist,
  wishlistProductIds = [],
}: ProductGridProps) {
  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
            <Box
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 2,
                overflow: 'hidden',
                border: `1px solid ${COLORS.borderLight}`,
              }}
            >
              {/* Image Skeleton */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height={240}
                sx={{ backgroundColor: COLORS.gray100 }}
              />

              {/* Content Skeleton */}
              <Box sx={{ p: 2 }}>
                <Skeleton
                  variant="text"
                  width="60%"
                  height={20}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={28}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  height={28}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Skeleton variant="rounded" width={60} height={24} />
                  <Skeleton variant="rounded" width={50} height={24} />
                </Box>

                <Skeleton
                  variant="text"
                  width="70%"
                  height={32}
                  sx={{ mb: 1 }}
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Skeleton variant="text" width={40} height={20} />
                  <Skeleton variant="rounded" width={60} height={20} />
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (products.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 2,
          border: `1px solid ${COLORS.borderLight}`,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: COLORS.textSecondary,
            mb: 2,
            fontWeight: 600,
          }}
        >
          Không tìm thấy sản phẩm nào
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: COLORS.textTertiary,
            maxWidth: 400,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm để xem nhiều sản phẩm
          hơn. Chúng tôi có hàng trăm mẫu đồng hồ cao cấp đang chờ bạn khám phá.
        </Typography>

        {/* Decorative icon */}
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: COLORS.gray100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '24px auto 0',
            fontSize: 28,
          }}
        >
          ⌚
        </Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
          <ProductCard
            product={product}
            {...(onAddToWishlist ? { onAddToWishlist } : {})}
            isInWishlist={wishlistProductIds.includes(product.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
