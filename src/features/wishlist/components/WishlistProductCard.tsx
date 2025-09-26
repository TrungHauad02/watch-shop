import { Box, Typography, Chip, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { WSCard } from '@/components';
import { ProductDTO, GenderEnum } from '@/shared/types';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface WishlistProductCardProps {
  product: ProductDTO;
}

export default function WishlistProductCard({
  product,
}: WishlistProductCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

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

  const isOutOfStock = product.quantity === 0;

  // Responsive image dimensions
  const getImageSize = () => {
    if (isMobile) return { width: 80, height: 80 };
    if (isTablet) return { width: 100, height: 100 };
    return { width: 120, height: 120 };
  };

  const imageSize = getImageSize();

  return (
    <WSCard
      variant="elevated"
      clickable
      onClick={handleCardClick}
      sx={{
        width: '100%',
        mb: 2,
        opacity: isOutOfStock ? 0.6 : 1,
        filter: isOutOfStock ? 'grayscale(50%)' : 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          opacity: isOutOfStock ? 0.7 : 1,
          transform: isOutOfStock ? 'none' : 'translateY(-2px)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            width: isMobile ? '100%' : imageSize.width,
            height: isMobile ? 200 : imageSize.height,
            flexShrink: 0,
            overflow: 'hidden',
            borderRadius: 1,
            position: 'relative',
          }}
        >
          <img
            src={product.images?.[0]?.imageUrl || '/placeholder-watch.jpg'}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
          />

          {/* Discount Badge on Image */}
          {product.discount > 0 && (
            <Chip
              label={`-${product.discount}%`}
              size="small"
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: SEMANTIC_COLORS.error500,
                color: COLORS.white,
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            />
          )}
        </Box>

        {/* Product Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: isMobile ? 2 : 3,
            gap: isMobile ? 1 : 1.5,
          }}
        >
          {/* Title and Description Row */}
          <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
            {/* Left Side - Basic Info */}
            <Box sx={{ flex: 2, minWidth: 0 }}>
              <Typography
                variant={isMobile ? 'h6' : 'h5'}
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                  color: isOutOfStock
                    ? COLORS.textSecondary
                    : COLORS.textPrimary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {product.name}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1.5,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: isMobile ? 2 : 1,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: 1.4,
                }}
              >
                {product.description || 'Không có mô tả'}
              </Typography>

              {/* Specifications Chips */}
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={getGenderText(product.gender)}
                  size="small"
                  sx={{
                    backgroundColor: COLORS.gray100,
                    color: COLORS.textPrimary,
                    fontSize: '0.75rem',
                  }}
                />
                <Chip
                  label={`${product.caseSize}mm`}
                  size="small"
                  sx={{
                    backgroundColor: COLORS.gray100,
                    color: COLORS.textPrimary,
                    fontSize: '0.75rem',
                  }}
                />
                {product.origin && (
                  <Chip
                    label={product.origin}
                    size="small"
                    sx={{
                      backgroundColor: COLORS.gray100,
                      color: COLORS.textPrimary,
                      fontSize: '0.75rem',
                    }}
                  />
                )}
                {!isMobile && product.movement && (
                  <Chip
                    label={product.movement}
                    size="small"
                    sx={{
                      backgroundColor: COLORS.gold100,
                      color: COLORS.gold700,
                      fontSize: '0.75rem',
                    }}
                  />
                )}
              </Box>
            </Box>

            {/* Right Side - Price and Stock */}
            {!isMobile && (
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  minWidth: isTablet ? 180 : 220,
                }}
              >
                {/* Price Section */}
                <Box sx={{ textAlign: 'right', mb: 1 }}>
                  {product.discount > 0 ? (
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration: 'line-through',
                          color: COLORS.textSecondary,
                          fontSize: '0.875rem',
                          mb: 0.5,
                        }}
                      >
                        {formatPrice(product.price)}
                      </Typography>
                      <Typography
                        variant={isTablet ? 'h6' : 'h5'}
                        sx={{
                          fontWeight: 700,
                          color: COLORS.priceDiscount,
                        }}
                      >
                        {formatPrice(
                          getDiscountedPrice(product.price, product.discount)
                        )}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography
                      variant={isTablet ? 'h6' : 'h5'}
                      sx={{
                        fontWeight: 700,
                        color: isOutOfStock
                          ? COLORS.textSecondary
                          : COLORS.priceRegular,
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                  )}
                </Box>

                {/* Stock and Views */}
                <Box sx={{ textAlign: 'right' }}>
                  <Chip
                    label={
                      isOutOfStock ? 'Hết hàng' : `Còn ${product.quantity} cái`
                    }
                    size="small"
                    sx={{
                      backgroundColor: isOutOfStock
                        ? COLORS.gray300
                        : SEMANTIC_COLORS.success100,
                      color: isOutOfStock
                        ? COLORS.white
                        : SEMANTIC_COLORS.success700,
                      fontSize: '0.75rem',
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      color: COLORS.textTertiary,
                      display: 'block',
                    }}
                  >
                    {product.view} lượt xem
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* Mobile Price and Stock Row */}
          {isMobile && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 1,
                borderTop: `1px solid ${COLORS.borderLight}`,
              }}
            >
              <Box>
                {product.discount > 0 ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: 'line-through',
                        color: COLORS.textSecondary,
                        fontSize: '0.75rem',
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: COLORS.priceDiscount,
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
                      color: isOutOfStock
                        ? COLORS.textSecondary
                        : COLORS.priceRegular,
                    }}
                  >
                    {formatPrice(product.price)}
                  </Typography>
                )}
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Chip
                  label={isOutOfStock ? 'Hết hàng' : `Còn ${product.quantity}`}
                  size="small"
                  sx={{
                    backgroundColor: isOutOfStock
                      ? COLORS.gray300
                      : SEMANTIC_COLORS.success100,
                    color: isOutOfStock
                      ? COLORS.white
                      : SEMANTIC_COLORS.success700,
                    fontSize: '0.75rem',
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.textTertiary,
                    display: 'block',
                    mt: 0.5,
                  }}
                >
                  {product.view} views
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </WSCard>
  );
}
