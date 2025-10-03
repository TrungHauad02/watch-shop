import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Star } from '@mui/icons-material';
import { WSButton, WSLoading } from '@/components';
import { COLORS } from '@/styles/colors';
import { ProductDTO } from '@/shared/types';
import FeaturedProductCard from './FeaturedProductCard';
import { mockProducts } from '@/shared/mock/mockProducts';

// CUSTOMIZE: Bạn có thể chỉnh sửa cấu hình section tại đây
const SECTION_CONFIG = {
  title: 'Sản Phẩm Nổi Bật',
  subtitle: 'Những mẫu đồng hồ được yêu thích nhất',
  viewAllText: 'Xem Tất Cả',
  limit: 8, // Số lượng sản phẩm hiển thị
};

export default function FeaturedProductsSection() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // CUSTOMIZE: Thay thế bằng API call thực tế
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const response = await productService.getFeaturedProducts(SECTION_CONFIG.limit);
        // setProducts(response.data);

        // Mock data for demonstration
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProducts(mockProducts.slice(0, 8));
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleViewAll = () => {
    navigate('/products');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        // CUSTOMIZE: Background trong suốt để hiển thị gradient từ HomePage
        background: 'transparent',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // CUSTOMIZE: Decorative pattern
          background: `
            radial-gradient(circle at 90% 20%, ${COLORS.amber200}30 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, ${COLORS.gold200}30 0%, transparent 50%),
            radial-gradient(circle at 10% 10%, ${COLORS.gray900}20 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Star sx={{ color: COLORS.gold600, fontSize: 28 }} />
              <Typography
                variant="h3"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2.25rem', lg: '2.75rem' },
                  fontWeight: 800,
                  color: COLORS.gray900,
                  letterSpacing: '-0.01em',
                }}
              >
                {SECTION_CONFIG.title}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: COLORS.gray700,
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                fontWeight: 500,
              }}
            >
              {SECTION_CONFIG.subtitle}
            </Typography>
          </Box>

          {/* View All Button - Desktop */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <WSButton
              variant="outline"
              size="medium"
              onClick={handleViewAll}
              endIcon={<ArrowForward />}
              sx={{
                borderColor: COLORS.gray700,
                color: COLORS.gray800,
                border: `2px solid ${COLORS.gray700}`,
                background: COLORS.white,
                '&:hover': {
                  borderColor: COLORS.gray900,
                  color: COLORS.gray900,
                  background: COLORS.gray100,
                },
              }}
            >
              {SECTION_CONFIG.viewAllText}
            </WSButton>
          </Box>
        </Box>

        {/* Products Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <WSLoading variant="dots" color="luxury" size="large" />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <FeaturedProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}

        {/* View All Button - Mobile */}
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'center',
            mt: 4,
          }}
        >
          <WSButton
            variant="primary"
            size="large"
            onClick={handleViewAll}
            endIcon={<ArrowForward />}
            fullWidth
            sx={{
              background: `linear-gradient(135deg, ${COLORS.gold600} 0%, ${COLORS.gold500} 100%)`,
              color: COLORS.white,
            }}
          >
            {SECTION_CONFIG.viewAllText}
          </WSButton>
        </Box>
      </Container>
    </Box>
  );
}
