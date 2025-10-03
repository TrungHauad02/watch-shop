import { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Storefront, ArrowForward } from '@mui/icons-material';
import { WSButton, WSLoading } from '@/components';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';
import { BrandDTO } from '@/shared/types';
import BrandCard from './BrandCard';
import { mockBrands } from '@/shared/mock/mockBrands';

// CUSTOMIZE: Cấu hình section
const SECTION_CONFIG = {
  title: 'Thương Hiệu',
  subtitle: 'Những thương hiệu đồng hồ uy tín hàng đầu thế giới',
  viewAllText: 'Xem Tất Cả Thương Hiệu',
  displayLimit: 8, // Số lượng brands hiển thị
};

export default function BrandsSection() {
  const navigate = useNavigate();
  const [brands, setBrands] = useState<BrandDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call
        // const brandsRes = await brandService.getBrands();

        // Mock delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setBrands(mockBrands.slice(0, SECTION_CONFIG.displayLimit));
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewAll = () => {
    navigate('/products');
  };

  const handleBrandClick = (brandId: string) => {
    navigate(`/products?brand=${brandId}`);
  };

  if (loading) {
    return (
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <WSLoading variant="dots" color="luxury" size="large" />
      </Box>
    );
  }

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
            radial-gradient(circle at 80% 30%, ${COLORS.gold200}60 0%, transparent 50%),
            radial-gradient(circle at 10% 90%, ${COLORS.amber200}40 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <Storefront sx={{ color: COLORS.gold600, fontSize: 28 }} />
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

        {/* Brands Grid */}
        {brands.length > 0 ? (
          <>
            {/* Main brands container với white background */}
            <Box
              sx={{
                background: COLORS.gray900 + '55',
                borderRadius: '24px',
                p: { xs: 3, md: 4 },
                boxShadow: `0 8px 32px ${ALPHA_COLORS.blackAlpha10}`,
              }}
            >
              <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {brands.map((brand) => (
                  <Grid key={brand.id} size={{ xs: 6, sm: 4, md: 3 }}>
                    <BrandCard
                      brand={brand}
                      onClick={() => handleBrandClick(brand.id)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* View All Button */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 5,
              }}
            >
              <WSButton
                variant="primary"
                size="large"
                onClick={handleViewAll}
                endIcon={<ArrowForward />}
                sx={{
                  background: COLORS.gray100,
                  color: COLORS.gray900,
                  px: 4,
                }}
              >
                {SECTION_CONFIG.viewAllText}
              </WSButton>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              px: 3,
              background: COLORS.white,
              borderRadius: '16px',
              border: `2px solid ${COLORS.gray200}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: COLORS.gray600,
                mb: 1,
              }}
            >
              Chưa có thương hiệu nào
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.gray500,
              }}
            >
              Đang cập nhật thêm thương hiệu
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
