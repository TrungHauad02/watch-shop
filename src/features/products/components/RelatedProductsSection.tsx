import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WSCard } from '@/components';
import { ProductDTO, GenderEnum } from '@/shared/types';
import { productDetailService } from '../services/productDetailService';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface RelatedProductsSectionProps {
  currentProductId: string;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa cách hiển thị related products tại đây
export default function RelatedProductsSection({
  currentProductId,
}: RelatedProductsSectionProps) {
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const products =
          await productDetailService.getRelatedProducts(currentProductId);
        setRelatedProducts(products);
      } catch (error) {
        console.error('Failed to fetch related products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProductId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const getGenderText = (gender: GenderEnum) => {
    switch (gender) {
      case GenderEnum.MALE:
        return 'Nam';
      case GenderEnum.FEMALE:
        return 'Nữ';
      case GenderEnum.UNISEX:
        return 'Unisex';
      default:
        return 'Unisex';
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return (
      <Box sx={{ mt: 6 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: COLORS.textPrimary,
          }}
        >
          Sản phẩm liên quan
        </Typography>

        <Grid container spacing={3}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <WSCard variant="elevated">
                <Skeleton variant="rectangular" width="100%" height={200} />
                <Box sx={{ p: 2 }}>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={20}
                    sx={{ mt: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={28}
                    sx={{ mt: 2 }}
                  />
                </Box>
              </WSCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: COLORS.textPrimary,
        }}
      >
        Sản phẩm liên quan
      </Typography>

      <Grid container spacing={3}>
        {relatedProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={product.id}>
            <WSCard
              variant="elevated"
              clickable
              onClick={() => handleProductClick(product.id)}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: `0 8px 25px ${COLORS.shadow}`,
                },
              }}
            >
              {/* Product Image */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 200,
                  overflow: 'hidden',
                }}
              >
                <img
                  src={
                    product.images?.[0]?.imageUrl || '/placeholder-watch.jpg'
                  }
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                />

                {/* Discount Badge */}
                {product.discount > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: SEMANTIC_COLORS.error500,
                      color: COLORS.white,
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    -{product.discount}%
                  </Box>
                )}

                {/* Out of Stock Overlay */}
                {product.quantity === 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: COLORS.white,
                        fontWeight: 700,
                        backgroundColor: SEMANTIC_COLORS.error500,
                        px: 2,
                        py: 1,
                        borderRadius: 1,
                      }}
                    >
                      Hết hàng
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Product Info */}
              <Box
                sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: COLORS.textPrimary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '1rem',
                  }}
                >
                  {product.name}
                </Typography>

                <Box
                  sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: COLORS.gray100,
                      color: COLORS.textSecondary,
                      px: 1,
                      py: 0.5,
                      borderRadius: 0.5,
                      fontSize: '0.7rem',
                    }}
                  >
                    {getGenderText(product.gender)}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: COLORS.gray100,
                      color: COLORS.textSecondary,
                      px: 1,
                      py: 0.5,
                      borderRadius: 0.5,
                      fontSize: '0.7rem',
                    }}
                  >
                    {product.caseSize}mm
                  </Typography>
                </Box>

                <Box sx={{ mt: 'auto' }}>
                  {product.discount > 0 ? (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: 'line-through',
                          color: COLORS.textSecondary,
                          fontSize: '0.875rem',
                        }}
                      >
                        {formatPrice(product.price)}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: COLORS.priceDiscount,
                          fontSize: '1.1rem',
                        }}
                      >
                        {formatPrice(
                          getDiscountedPrice(product.price, product.discount)
                        )}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: COLORS.priceRegular,
                        fontSize: '1.1rem',
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                  )}
                </Box>
              </Box>
            </WSCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
