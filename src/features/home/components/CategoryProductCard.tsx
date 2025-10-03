import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Chip } from '@mui/material';
import { LocalOfferOutlined } from '@mui/icons-material';
import { WSCard } from '@/components';
import { ProductDTO, GenderEnum } from '@/shared/types';
import { COLORS, SEMANTIC_COLORS, ALPHA_COLORS } from '@/styles/colors';

interface CategoryProductCardProps {
  product: ProductDTO;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa style của category product card tại đây
export default function CategoryProductCard({
  product,
}: CategoryProductCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  // Helper functions
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
  const hasDiscount = product.discount > 0;

  return (
    <WSCard
      variant="elevated"
      padding="none"
      clickable
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        opacity: isOutOfStock ? 0.6 : 1,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `2px solid ${isHovered ? COLORS.gold500 : COLORS.gray200}`,
        '&:hover': {
          transform: isOutOfStock ? 'none' : 'translateY(-6px)',
          boxShadow: isOutOfStock
            ? ''
            : `0 12px 32px ${ALPHA_COLORS.blackAlpha15}`,
        },
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          paddingTop: '100%', // 1:1 Aspect Ratio
          overflow: 'hidden',
          backgroundColor: COLORS.gray50,
        }}
      >
        {/* Product Image */}
        <Box
          component="img"
          src={product.images?.[0]?.imageUrl || '/placeholder-watch.jpg'}
          alt={product.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease',
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            filter: isOutOfStock ? 'grayscale(100%)' : 'none',
          }}
        />

        {/* Discount Badge */}
        {hasDiscount && !isOutOfStock && (
          <Chip
            icon={<LocalOfferOutlined sx={{ fontSize: 14 }} />}
            label={`-${product.discount}%`}
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: `linear-gradient(135deg, ${SEMANTIC_COLORS.error500}, ${SEMANTIC_COLORS.error600})`,
              color: COLORS.white,
              fontWeight: 700,
              fontSize: '0.75rem',
              height: 28,
              boxShadow: `0 4px 12px ${SEMANTIC_COLORS.error500}40`,
            }}
          />
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: ALPHA_COLORS.blackAlpha50,
              backdropFilter: 'blur(3px)',
            }}
          >
            <Chip
              label="HẾT HÀNG"
              sx={{
                background: COLORS.gray800,
                color: COLORS.white,
                fontWeight: 700,
                fontSize: '0.9rem',
                height: 36,
                px: 2,
              }}
            />
          </Box>
        )}
      </Box>

      {/* Product Info */}
      <Box
        sx={{
          p: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.75,
        }}
      >
        {/* Gender Badge */}
        <Chip
          label={getGenderText(product.gender)}
          size="small"
          sx={{
            width: 'fit-content',
            backgroundColor: COLORS.gold100,
            color: COLORS.gold700,
            fontWeight: 600,
            fontSize: '0.65rem',
            height: 20,
          }}
        />

        {/* Product Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '0.95rem',
            color: COLORS.gray900,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.4em',
            lineHeight: 1.2,
          }}
        >
          {product.name}
        </Typography>

        {/* Product Specs */}
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          <Chip
            label={`${product.caseSize}mm`}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.65rem',
              height: 20,
              borderColor: COLORS.gray300,
              color: COLORS.gray700,
            }}
          />
          <Chip
            label={product.movement}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.65rem',
              height: 20,
              borderColor: COLORS.gray300,
              color: COLORS.gray700,
            }}
          />
        </Box>

        {/* Price Section */}
        <Box sx={{ mt: 'auto', pt: 1 }}>
          {hasDiscount ? (
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: SEMANTIC_COLORS.error600,
                  lineHeight: 1,
                  fontSize: '1.1rem',
                }}
              >
                {formatPrice(
                  getDiscountedPrice(product.price, product.discount)
                )}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: COLORS.gray500,
                  fontSize: '0.8rem',
                  mt: 0.3,
                }}
              >
                {formatPrice(product.price)}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="h6"
              sx={{
                fontWeight: 900,
                color: COLORS.gray900,
                lineHeight: 1,
                fontSize: '1.1rem',
              }}
            >
              {formatPrice(product.price)}
            </Typography>
          )}
        </Box>
      </Box>
    </WSCard>
  );
}
