import { ProductDTO } from '@/shared/types';
import { useEffect, useState } from 'react';
import { wishlistService } from '../services/wishlistService';
import { Box, Container, Typography, Divider } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';
import WishlistProductCard from '../components/WishlistProductCard';
import WishlistEmptyState from '../components/WishlistEmptyState';
import WishlistLoadingSkeleton from '../components/WishlistLoadingSkeleton';

// CUSTOMIZE: Bạn có thể chỉnh sửa layout và styling của trang wishlist tại đây
export default function WishlistPage() {
  const userId: string = localStorage.getItem('userId') || '123456';
  const [products, setProducts] = useState<ProductDTO[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);

        // TODO: Implement an API call to fetch user data
        const response = await wishlistService.getWishlistProducts(userId);
        setProducts(response);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setError('Không thể tải danh sách yêu thích. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const getStockSummary = () => {
    if (!products || products.length === 0) return null;

    const inStock = products.filter((p) => p.quantity > 0).length;
    const outOfStock = products.filter((p) => p.quantity === 0).length;

    return { inStock, outOfStock, total: products.length };
  };

  const stockSummary = getStockSummary();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Favorite
            sx={{
              fontSize: 32,
              color: COLORS.priceDiscount,
              mr: 2,
            }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: COLORS.textPrimary,
            }}
          >
            Danh sách yêu thích
          </Typography>
        </Box>

        {!loading && products && products.length > 0 && (
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: COLORS.textSecondary,
                mb: 2,
              }}
            >
              Bạn đã lưu {products.length} sản phẩm vào danh sách yêu thích
            </Typography>

            {stockSummary && (
              <Box
                sx={{
                  display: 'flex',
                  gap: 3,
                  p: 2,
                  backgroundColor: COLORS.gray50,
                  borderRadius: 2,
                  border: `1px solid ${COLORS.borderLight}`,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: SEMANTIC_COLORS.success500,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: COLORS.textSecondary }}
                  >
                    <strong>{stockSummary.inStock}</strong> có sẵn
                  </Typography>
                </Box>

                {stockSummary.outOfStock > 0 && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: COLORS.gray400,
                      }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS.textSecondary }}
                    >
                      <strong>{stockSummary.outOfStock}</strong> hết hàng
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        )}

        <Divider sx={{ mt: 3 }} />
      </Box>

      {/* Content Section */}
      <Box>
        {loading && <WishlistLoadingSkeleton />}

        {error && (
          <Box
            sx={{
              textAlign: 'center',
              py: 6,
              px: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: SEMANTIC_COLORS.error500,
                mb: 2,
              }}
            >
              Có lỗi xảy ra
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.textSecondary,
              }}
            >
              {error}
            </Typography>
          </Box>
        )}

        {!loading && !error && products && products.length === 0 && (
          <WishlistEmptyState />
        )}

        {!loading && !error && products && products.length > 0 && (
          <Box>
            {/* Available Products First */}
            {products
              .filter((product) => product.quantity > 0)
              .map((product) => (
                <WishlistProductCard key={product.id} product={product} />
              ))}

            {/* Out of Stock Products */}
            {products.filter((product) => product.quantity === 0).length >
              0 && (
              <>
                {products.filter((product) => product.quantity > 0).length >
                  0 && (
                  <Box sx={{ my: 3 }}>
                    <Divider />
                    <Typography
                      variant="h6"
                      sx={{
                        mt: 2,
                        mb: 2,
                        color: COLORS.textSecondary,
                        fontWeight: 600,
                      }}
                    >
                      Sản phẩm hết hàng
                    </Typography>
                  </Box>
                )}

                {products
                  .filter((product) => product.quantity === 0)
                  .map((product) => (
                    <WishlistProductCard key={product.id} product={product} />
                  ))}
              </>
            )}
          </Box>
        )}
      </Box>

      {/* Footer Note */}
      {!loading && !error && products && products.length > 0 && (
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${COLORS.borderLight}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: COLORS.textTertiary,
              fontStyle: 'italic',
            }}
          >
            💡 Nhấn vào sản phẩm để xem chi tiết hoặc mua ngay
          </Typography>
        </Box>
      )}
    </Container>
  );
}
