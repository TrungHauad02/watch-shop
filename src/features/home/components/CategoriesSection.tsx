import { useState, useEffect, useMemo } from 'react';
import { Box, Container, Typography, Grid, Tabs, Tab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Category, ArrowForward } from '@mui/icons-material';
import { WSButton, WSLoading } from '@/components';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';
import { CategoryDTO, ProductDTO } from '@/shared/types';
import CategoryProductCard from './CategoryProductCard';
import { mockProducts } from '@/shared/mock/mockProducts';
import { mockCategories } from '@/shared/mock/mockCategories';

// CUSTOMIZE: Cấu hình section
const SECTION_CONFIG = {
  title: 'Danh Mục Sản Phẩm',
  subtitle: 'Khám phá bộ sưu tập đa dạng của chúng tôi',
  viewAllText: 'Xem Tất Cả',
  productsPerCategory: 4, // Số sản phẩm hiển thị cho mỗi category
};

export default function CategoriesSection() {
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API calls
        // const [categoriesRes, productsRes] = await Promise.all([
        //   categoryService.getCategories(),
        //   productService.getProducts()
        // ]);

        // Mock delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setCategories(mockCategories);
        setProducts(mockProducts);

        // Set default selected category
        if (mockCategories.length > 0) {
          setSelectedCategoryId(mockCategories[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return [];

    return products
      .filter((product) => product.categoryId === selectedCategoryId)
      .slice(0, SECTION_CONFIG.productsPerCategory);
  }, [selectedCategoryId, products]);

  // Get selected category info
  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategoryId(newValue);
  };

  const handleViewAll = () => {
    // Navigate to products page with category filter
    navigate(`/products?category=${selectedCategoryId}`);
  };

  const handleViewAllCategories = () => {
    navigate('/products');
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
            radial-gradient(circle at 90% 10%, ${COLORS.gold200}40 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, ${COLORS.amber200}06 0%, transparent 50%)
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
            <Category sx={{ color: COLORS.gold600, fontSize: 28 }} />
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

        {/* Category Tabs */}
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Tabs
            value={selectedCategoryId}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              background: COLORS.white,
              borderRadius: '16px',
              p: 1,
              boxShadow: `0 4px 16px ${ALPHA_COLORS.blackAlpha10}`,
              border: `2px solid ${COLORS.gray200}`,
              // CUSTOMIZE: Tab styles
              '& .MuiTabs-indicator': {
                height: 4,
                borderRadius: '4px 4px 0 0',
                background: `linear-gradient(90deg, ${COLORS.gold600}, ${COLORS.gold400})`,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                color: COLORS.gray700,
                minHeight: 56,
                px: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: COLORS.gold600,
                  background: COLORS.gold50,
                  borderRadius: '12px',
                },
                '&.Mui-selected': {
                  color: COLORS.gold700,
                  fontWeight: 700,
                },
              },
            }}
          >
            {categories.map((category) => (
              <Tab
                key={category.id}
                label={category.name}
                value={category.id}
              />
            ))}
          </Tabs>

          {/* Category Description */}
          {selectedCategory && (
            <Box
              sx={{
                p: 3,
                background: COLORS.white,
                borderRadius: '16px',
                border: `2px solid ${COLORS.gray200}`,
                boxShadow: `0 4px 12px ${ALPHA_COLORS.blackAlpha08}`,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: COLORS.gray700,
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                }}
              >
                {selectedCategory.description}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                  <CategoryProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            {/* View All Button */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                gap: 2,
                flexWrap: 'wrap',
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
                  '&:hover': {
                    color: COLORS.gray100,
                  },
                }}
              >
                Xem Thêm {selectedCategory?.name}
              </WSButton>

              <WSButton
                variant="outline"
                size="large"
                onClick={handleViewAllCategories}
                sx={{
                  borderColor: COLORS.gray700,
                  border: `2px solid ${COLORS.gray700}`,
                  background: COLORS.gray900,
                  color: COLORS.gray100,
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
              Chưa có sản phẩm nào
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.gray500,
              }}
            >
              Danh mục này đang được cập nhật
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
