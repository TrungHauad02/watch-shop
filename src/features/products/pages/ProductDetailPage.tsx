import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Divider,
  Alert,
  Skeleton,
} from '@mui/material';
import { Link, NavigateNext } from '@mui/icons-material';
import { productDetailService } from '../services/productDetailService';
import { BrandDTO, CategoryDTO, ProductDTO } from '@/shared/types';
import { COLORS } from '@/styles/colors';
import { WSDecorativeBackground } from '@/components';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductInfoSection from '../components/ProductInfoSection';
import ProductSpecificationsTable from '../components/ProductSpecificationsTable';
import ContactButtons from '../components/ContactButtons';
import RelatedProductsSection from '../components/RelatedProductsSection';
import ProductFeatureCards from '../components/ProductFeatureCards';

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [category, setCategory] = useState<CategoryDTO | null>(null);
  const [brand, setBrand] = useState<BrandDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) {
      navigate('/products');
      return;
    }

    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const productData =
          await productDetailService.getProductDetail(productId);

        if (!productData) {
          setError('Không tìm thấy sản phẩm');
          return;
        }

        setProduct(productData);

        const fetchPromises = [];

        if (productData.brandId) {
          fetchPromises.push(
            productDetailService
              .getBrandById(productData.brandId)
              .then((brandData) => setBrand(brandData))
              .catch((error) => console.error('Failed to fetch brand:', error))
          );
        }

        if (productData.categoryId) {
          fetchPromises.push(
            productDetailService
              .getCategoryById(productData.categoryId)
              .then((categoryData) => setCategory(categoryData))
              .catch((error) =>
                console.error('Failed to fetch category:', error)
              )
          );
        }

        if (fetchPromises.length > 0) {
          await Promise.all(fetchPromises);
        }
      } catch (error) {
        console.error('Failed to fetch product detail:', error);
        setError('Có lỗi xảy ra khi tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId, navigate]);

  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  if (loading) {
    return (
      <WSDecorativeBackground variant="light" density="low" animated={true}>
        <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
          <Skeleton variant="text" width={400} height={32} sx={{ mb: 3 }} />
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Skeleton variant="rectangular" width="100%" height={500} />
            </Grid>
            <Grid size={{ xs: 12, lg: 6 }}>
              <Skeleton variant="text" width="80%" height={40} />
              <Skeleton variant="text" width="60%" height={32} sx={{ mt: 2 }} />
              <Skeleton variant="text" width="40%" height={48} sx={{ mt: 3 }} />
              <Box sx={{ mt: 4 }}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="text"
                    width="100%"
                    height={24}
                    sx={{ mt: 1 }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </WSDecorativeBackground>
    );
  }

  if (error || !product) {
    return (
      <WSDecorativeBackground variant="light" density="low" animated={false}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'Không tìm thấy sản phẩm'}
          </Alert>
          <Typography
            component={Link}
            to="/products"
            sx={{
              color: COLORS.primary,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            ← Quay lại danh sách sản phẩm
          </Typography>
        </Container>
      </WSDecorativeBackground>
    );
  }

  const isOutOfStock = product.quantity === 0;

  return (
    <WSDecorativeBackground
      variant="light"
      density="medium"
      animated={true}
      sx={{
        background: `linear-gradient(45deg, ${COLORS.gray50} 0%, ${COLORS.white} 50%, ${COLORS.gold50} 100%)`,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ py: { xs: 2, md: 4 }, position: 'relative', zIndex: 1 }}
      >
        {/* Breadcrumbs */}
        <Box
          sx={{
            mb: 3,
            p: 2,
            backgroundColor: `${COLORS.white}90`, // Semi-transparent white
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: `0 2px 8px ${COLORS.shadow}`,
            border: `1px solid ${COLORS.borderLight}30`,
          }}
        >
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            <MuiLink
              component={Link}
              to="/"
              sx={{
                color: COLORS.textSecondary,
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: COLORS.primary,
                  textDecoration: 'underline',
                },
              }}
            >
              Trang chủ
            </MuiLink>
            <MuiLink
              component={Link}
              to="/products"
              sx={{
                color: COLORS.textSecondary,
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: COLORS.primary,
                  textDecoration: 'underline',
                },
              }}
            >
              Sản phẩm
            </MuiLink>
            {category && (
              <Typography
                sx={{
                  color: COLORS.textSecondary,
                  fontSize: '0.875rem',
                }}
              >
                {category.name}
              </Typography>
            )}
            <Typography
              color="text.primary"
              sx={{
                fontWeight: 600,
                fontSize: '0.875rem',
                maxWidth: { xs: 200, sm: 'none' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.name}
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Main Content */}
        <Box
          sx={{
            backgroundColor: `${COLORS.white}95`, // Semi-transparent white
            backdropFilter: 'blur(15px)',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: `0 8px 32px ${COLORS.shadow}`,
            border: `1px solid ${COLORS.borderLight}40`,
          }}
        >
          <Grid container spacing={0}>
            {/* Left Column - Product Images & Feature Cards */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  backgroundColor: 'transparent',
                  borderRight: { lg: `1px solid ${COLORS.borderLight}30` },
                  borderBottom: {
                    xs: `1px solid ${COLORS.borderLight}30`,
                    lg: 'none',
                  },
                }}
              >
                {/* Product Image Gallery */}
                <ProductImageGallery
                  images={product.images || []}
                  productName={product.name}
                  discount={product.discount}
                />

                {/* Feature Cards Below Gallery */}
                <ProductFeatureCards product={product} />
              </Box>
            </Grid>

            {/* Right Column - Product Info & Contact */}
            <Grid size={{ xs: 12, lg: 6 }}>
              <Box
                sx={{
                  p: { xs: 3, md: 4 },
                  background: `linear-gradient(180deg, ${COLORS.white}80 0%, ${COLORS.gray50}60 100%)`,
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    position: { lg: 'sticky' },
                    top: { lg: 20 },
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    flex: 1,
                  }}
                >
                  {/* Product Information */}
                  <Box>
                    <ProductInfoSection product={product} brand={brand} />
                  </Box>

                  {/* Contact Buttons */}
                  <Box sx={{ mt: 'auto' }}>
                    <ContactButtons
                      productName={product.name}
                      price={
                        product.discount > 0
                          ? getDiscountedPrice(product.price, product.discount)
                          : product.price
                      }
                      isOutOfStock={isOutOfStock}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider
          sx={{
            my: 6,
            borderColor: `${COLORS.borderLight}50`,
          }}
        />

        {/* Product Specifications */}
        <Box
          sx={{
            mb: 6,
            p: 4,
            backgroundColor: `${COLORS.white}90`,
            backdropFilter: 'blur(10px)',
            borderRadius: 3,
            boxShadow: `0 4px 24px ${COLORS.shadow}`,
            border: `1px solid ${COLORS.borderLight}30`,
          }}
        >
          <ProductSpecificationsTable product={product} />
        </Box>

        {/* Related Products */}
        {productId && (
          <Box
            sx={{
              p: 4,
              backgroundColor: `${COLORS.white}90`,
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              boxShadow: `0 4px 24px ${COLORS.shadow}`,
              border: `1px solid ${COLORS.borderLight}30`,
            }}
          >
            <RelatedProductsSection currentProductId={productId} />
          </Box>
        )}
      </Container>
    </WSDecorativeBackground>
  );
}
