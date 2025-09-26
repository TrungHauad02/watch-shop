import { Box, Typography, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { ProductDTO, BrandDTO } from '@/shared/types';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface ProductInfoSectionProps {
  product: ProductDTO;
  brand?: BrandDTO | null;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa layout và styling của product info section tại đây
export default function ProductInfoSection({
  product,
  brand,
}: ProductInfoSectionProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const isOutOfStock = product.quantity === 0;

  return (
    <Box>
      {/* Brand Chip */}
      {brand && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label={brand.name}
            sx={{
              backgroundColor: COLORS.gold100,
              color: COLORS.gold700,
              fontWeight: 600,
              fontSize: '0.875rem',
              height: 32,
            }}
          />
        </Box>
      )}

      {/* Product Name */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: COLORS.textPrimary,
          mb: 2,
          lineHeight: 1.2,
          fontSize: { xs: '1.75rem', md: '2.125rem' },
        }}
      >
        {product.name}
      </Typography>

      {/* Product Meta Info */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          flexWrap: 'wrap',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: COLORS.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <strong>Mã SP:</strong> {product.productId}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: COLORS.textTertiary,
          }}
        >
          <Visibility fontSize="small" />
          <Typography variant="body2">
            {formatNumber(product.view)} lượt xem
          </Typography>
        </Box>
      </Box>

      {/* Price Section */}
      <Box sx={{ mb: 3 }}>
        {product.discount > 0 ? (
          <Box>
            {/* Original Price & Discount Badge */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 1,
                flexWrap: 'wrap',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  textDecoration: 'line-through',
                  color: COLORS.textSecondary,
                  fontSize: '1.25rem',
                }}
              >
                {formatPrice(product.price)}
              </Typography>
              <Chip
                label={`-${product.discount}%`}
                size="small"
                sx={{
                  backgroundColor: SEMANTIC_COLORS.error500,
                  color: COLORS.white,
                  fontWeight: 700,
                  fontSize: '0.75rem',
                }}
              />
            </Box>

            {/* Discounted Price */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: COLORS.priceDiscount,
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: 1,
              }}
            >
              {formatPrice(getDiscountedPrice(product.price, product.discount))}
            </Typography>

            {/* Savings Amount */}
            <Typography
              variant="body2"
              sx={{
                color: SEMANTIC_COLORS.success600,
                fontWeight: 600,
                backgroundColor: SEMANTIC_COLORS.success50,
                px: 2,
                py: 0.5,
                borderRadius: 1,
                display: 'inline-block',
              }}
            >
              Tiết kiệm:{' '}
              {formatPrice(
                product.price -
                  getDiscountedPrice(product.price, product.discount)
              )}
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: isOutOfStock ? COLORS.textSecondary : COLORS.priceRegular,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {formatPrice(product.price)}
          </Typography>
        )}
      </Box>

      {/* Stock Status */}
      <Box sx={{ mb: 3 }}>
        <Chip
          label={isOutOfStock ? 'Hết hàng' : `Còn ${product.quantity} chiếc`}
          sx={{
            backgroundColor: isOutOfStock
              ? SEMANTIC_COLORS.error100
              : SEMANTIC_COLORS.success100,
            color: isOutOfStock
              ? SEMANTIC_COLORS.error700
              : SEMANTIC_COLORS.success700,
            fontWeight: 600,
            fontSize: '0.875rem',
            px: 2,
            py: 1,
            height: 36,
          }}
        />
      </Box>

      {/* Key Specifications */}
      <Box
        sx={{
          p: 3,
          backgroundColor: COLORS.gray50,
          borderRadius: 2,
          border: `1px solid ${COLORS.borderLight}`,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: COLORS.textPrimary,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          Thông số nổi bật
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
          }}
        >
          {/* Case Size */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: COLORS.gold500,
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: COLORS.textTertiary,
                  fontSize: '0.75rem',
                  display: 'block',
                }}
              >
                Kích thước
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontSize: '0.875rem',
                }}
              >
                {product.caseSize}mm
              </Typography>
            </Box>
          </Box>

          {/* Movement */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: COLORS.gold400,
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: COLORS.textTertiary,
                  fontSize: '0.75rem',
                  display: 'block',
                }}
              >
                Bộ máy
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontSize: '0.875rem',
                }}
              >
                {product.movement}
              </Typography>
            </Box>
          </Box>

          {/* Water Resistance */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: SEMANTIC_COLORS.info500,
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: COLORS.textTertiary,
                  fontSize: '0.75rem',
                  display: 'block',
                }}
              >
                Chống nước
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontSize: '0.875rem',
                }}
              >
                {product.waterResistance}m
              </Typography>
            </Box>
          </Box>

          {/* Origin */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: COLORS.primary,
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: COLORS.textTertiary,
                  fontSize: '0.75rem',
                  display: 'block',
                }}
              >
                Xuất xứ
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.textPrimary,
                  fontSize: '0.875rem',
                }}
              >
                {product.origin}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
