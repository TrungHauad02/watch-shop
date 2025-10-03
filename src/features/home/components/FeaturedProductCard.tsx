import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Chip, Fade } from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  LocalOfferOutlined,
} from '@mui/icons-material';
import { WSCard } from '@/components';
import { ProductDTO, GenderEnum } from '@/shared/types';
import { COLORS, SEMANTIC_COLORS, ALPHA_COLORS } from '@/styles/colors';

interface FeaturedProductCardProps {
  product: ProductDTO;
  onAddToWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa style và behavior của product card tại đây
export default function FeaturedProductCard({
  product,
  onAddToWishlist,
  isInWishlist = false,
}: FeaturedProductCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isInWishlist);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onAddToWishlist) {
      onAddToWishlist(product.id);
    }
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
  const isLowStock = product.quantity > 0 && product.quantity <= 5;
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
        opacity: isOutOfStock ? 0.7 : 1,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `2px solid ${isHovered ? COLORS.gold500 : COLORS.gray200}`,
        '&:hover': {
          transform: isOutOfStock ? 'none' : 'translateY(-8px)',
          boxShadow: isOutOfStock
            ? ''
            : `0 16px 40px ${ALPHA_COLORS.blackAlpha20}`,
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
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            filter: isOutOfStock ? 'grayscale(100%)' : 'none',
          }}
        />

        {/* Discount Badge */}
        {hasDiscount && !isOutOfStock && (
          <Fade in timeout={300}>
            <Chip
              icon={<LocalOfferOutlined sx={{ fontSize: 16 }} />}
              label={`-${product.discount}%`}
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                background: `linear-gradient(135deg, ${SEMANTIC_COLORS.error500}, ${SEMANTIC_COLORS.error600})`,
                color: COLORS.white,
                fontWeight: 700,
                fontSize: '0.85rem',
                height: 32,
                boxShadow: `0 4px 12px ${SEMANTIC_COLORS.error500}40`,
              }}
            />
          </Fade>
        )}

        {/* Out of Stock Badge */}
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
              background: ALPHA_COLORS.blackAlpha60,
              backdropFilter: 'blur(4px)',
            }}
          >
            <Chip
              label="HẾT HÀNG"
              sx={{
                background: COLORS.gray800,
                color: COLORS.white,
                fontWeight: 700,
                fontSize: '1rem',
                height: 40,
                px: 2,
              }}
            />
          </Box>
        )}

        {/* Wishlist Button */}
        <Fade in={isHovered || isFavorite} timeout={200}>
          <IconButton
            onClick={handleWishlistClick}
            disabled={isOutOfStock}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: COLORS.white,
              boxShadow: `0 4px 12px ${ALPHA_COLORS.blackAlpha15}`,
              '&:hover': {
                background: COLORS.white,
                transform: 'scale(1.1)',
              },
            }}
          >
            {isFavorite ? (
              <Favorite sx={{ color: SEMANTIC_COLORS.error500 }} />
            ) : (
              <FavoriteBorder sx={{ color: COLORS.gray700 }} />
            )}
          </IconButton>
        </Fade>
      </Box>

      {/* Product Info */}
      <Box
        sx={{
          p: 2.5,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
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
            fontSize: '0.7rem',
            height: 24,
          }}
        />

        {/* Product Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: COLORS.gray900,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            minHeight: '2.6em',
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </Typography>

        {/* Product Specs */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip
            label={`${product.caseSize}mm`}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.7rem',
              height: 22,
              borderColor: COLORS.gray300,
              color: COLORS.gray700,
            }}
          />
          <Chip
            label={product.movement}
            size="small"
            variant="outlined"
            sx={{
              fontSize: '0.7rem',
              height: 22,
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
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: SEMANTIC_COLORS.error600,
                  lineHeight: 1,
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
                  fontSize: '0.9rem',
                  mt: 0.5,
                }}
              >
                {formatPrice(product.price)}
              </Typography>
            </Box>
          ) : (
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: COLORS.gray900,
                lineHeight: 1,
              }}
            >
              {formatPrice(product.price)}
            </Typography>
          )}

          {/* Stock Status */}
          <Box sx={{ mt: 1.5 }}>
            <Chip
              label={
                isOutOfStock
                  ? 'Hết hàng'
                  : isLowStock
                    ? `Còn ${product.quantity} chiếc`
                    : `Còn hàng`
              }
              size="small"
              sx={{
                backgroundColor: isOutOfStock
                  ? COLORS.gray300
                  : isLowStock
                    ? SEMANTIC_COLORS.warning100
                    : SEMANTIC_COLORS.success100,
                color: isOutOfStock
                  ? COLORS.white
                  : isLowStock
                    ? SEMANTIC_COLORS.warning700
                    : SEMANTIC_COLORS.success700,
                fontWeight: 600,
                fontSize: '0.75rem',
                height: 24,
                border: `1px solid ${
                  isOutOfStock
                    ? COLORS.gray400
                    : isLowStock
                      ? SEMANTIC_COLORS.warning300
                      : SEMANTIC_COLORS.success300
                }`,
              }}
            />
          </Box>
        </Box>
      </Box>
    </WSCard>
  );
}
