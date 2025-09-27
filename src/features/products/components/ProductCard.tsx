import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Skeleton,
} from '@mui/material';
import {
  FavoriteBorder,
  Favorite,
  Visibility,
  LocalOfferOutlined,
  Star,
} from '@mui/icons-material';
import { WSCard } from '@/components';
import { ProductDTO, GenderEnum } from '@/shared/types';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface ProductCardProps {
  product: ProductDTO;
  onAddToWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

export default function ProductCard({
  product,
  onAddToWishlist,
  isInWishlist = false,
}: ProductCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onAddToWishlist || isWishlistLoading) return;

    setIsWishlistLoading(true);
    setWishlistAnimating(true);

    try {
      await onAddToWishlist(product.id);

      // Animation delay để tạo hiệu ứng
      setTimeout(() => {
        setWishlistAnimating(false);
      }, 600);
    } finally {
      setTimeout(() => {
        setIsWishlistLoading(false);
      }, 300);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
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

  const getGenderColor = (gender: GenderEnum) => {
    switch (gender) {
      case GenderEnum.MALE:
        return { bg: COLORS.blue50, text: COLORS.blue700 };
      case GenderEnum.FEMALE:
        return { bg: COLORS.pink50, text: COLORS.pink700 };
      case GenderEnum.UNISEX:
        return { bg: COLORS.gold100, text: COLORS.gold700 };
      default:
        return { bg: COLORS.gold100, text: COLORS.gold700 };
    }
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const isOutOfStock = product.quantity === 0;
  const hasDiscount = product.discount > 0;
  const genderColors = getGenderColor(product.gender);
  const isLowStock = product.quantity > 0 && product.quantity <= 3;
  const isHighView = product.view > 1000;

  return (
    <WSCard
      variant="elevated"
      clickable
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        height: '100%',
        position: 'relative',
        opacity: isOutOfStock ? 0.75 : 1,
        filter: isOutOfStock ? 'grayscale(20%)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transform:
          isHovered && !isOutOfStock
            ? 'translateY(-8px) scale(1.02)'
            : 'translateY(0) scale(1)',
        boxShadow:
          isHovered && !isOutOfStock
            ? `0 20px 40px ${COLORS.shadow}, 0 0 0 1px ${COLORS.primary}20`
            : ``,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 'inherit',
          background:
            isHovered && !isOutOfStock
              ? `linear-gradient(135deg, ${COLORS.primary}08, ${COLORS.gold500}08)`
              : 'transparent',
          transition: 'background 0.3s ease',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {/* Wishlist Button with Enhanced Animation */}
      {onAddToWishlist && (
        <Zoom in={true} timeout={300}>
          <IconButton
            onClick={handleWishlistClick}
            disabled={isWishlistLoading}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${isInWishlist ? SEMANTIC_COLORS.error500 : COLORS.borderLight}`,
              width: 40,
              height: 40,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: wishlistAnimating
                ? 'scale(1.3) rotate(12deg)'
                : isWishlistLoading
                  ? 'scale(0.9)'
                  : 'scale(1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                transform: 'scale(1.15)',
                boxShadow: `0 8px 24px ${COLORS.shadow}`,
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
            {isWishlistLoading ? (
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  border: `2px solid ${SEMANTIC_COLORS.error500}`,
                  borderTop: '2px solid transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              />
            ) : isInWishlist ? (
              <Favorite
                sx={{
                  color: SEMANTIC_COLORS.error500,
                  fontSize: 20,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              />
            ) : (
              <FavoriteBorder
                sx={{
                  color: COLORS.textSecondary,
                  fontSize: 20,
                  transition: 'color 0.2s ease',
                }}
              />
            )}
          </IconButton>
        </Zoom>
      )}

      {/* Enhanced Discount Badge */}
      {hasDiscount && (
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              zIndex: 3,
              backgroundColor: SEMANTIC_COLORS.error500,
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              boxShadow: `0 4px 12px ${SEMANTIC_COLORS.error500}40`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.2s ease',
            }}
          >
            <LocalOfferOutlined sx={{ fontSize: 14 }} />-{product.discount}%
          </Box>
        </Fade>
      )}

      {/* Popular Badge for High View Products */}
      {isHighView && !hasDiscount && (
        <Fade in={true} timeout={700}>
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              zIndex: 3,
              backgroundColor: COLORS.gold500,
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 2,
              fontSize: '0.75rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              boxShadow: `0 4px 12px ${COLORS.gold500}40`,
            }}
          >
            <Star sx={{ fontSize: 12 }} />
            Phổ biến
          </Box>
        </Fade>
      )}

      {/* Enhanced Out of Stock Overlay */}
      {isOutOfStock && (
        <Fade in={true} timeout={300}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              color: 'white',
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontSize: '0.9rem',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              textAlign: 'center',
              minWidth: 120,
            }}
          >
            Hết hàng
          </Box>
        </Fade>
      )}

      {/* Enhanced Product Image with Loading State */}
      <Box
        sx={{
          width: '100%',
          height: isMobile ? 220 : 260,
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          position: 'relative',
          backgroundColor: COLORS.gray50,
        }}
      >
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: COLORS.gray100,
            }}
          />
        )}

        <img
          src={product.images?.[0]?.imageUrl || '/placeholder-watch.jpg'}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered && !isOutOfStock ? 'scale(1.08)' : 'scale(1)',
            opacity: imageLoaded ? 1 : 0,
          }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400';
            setImageLoaded(true);
          }}
        />

        {/* Enhanced Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
            pointerEvents: 'none',
            opacity: isHovered ? 0.8 : 0.6,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* View Count Overlay */}
        <Fade in={isHovered} timeout={200}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              backdropFilter: 'blur(4px)',
            }}
          >
            <Visibility sx={{ fontSize: 12 }} />
            {formatNumber(product.view)}
          </Box>
        </Fade>
      </Box>

      {/* Enhanced Product Content */}
      <Box
        sx={{
          p: 2.5,
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Product ID with Enhanced Styling */}
        <Typography
          variant="caption"
          sx={{
            color: COLORS.textTertiary,
            fontWeight: 600,
            mb: 1,
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontSize: '0.7rem',
            opacity: 0.8,
          }}
        >
          {product.productId}
        </Typography>

        {/* Enhanced Product Name */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: COLORS.textPrimary,
            mb: 1.5,
            fontSize: isMobile ? '1.05rem' : '1.15rem',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: isMobile ? '2.8rem' : '3rem',
            transition: 'color 0.2s ease',
            '&:hover': {
              color: COLORS.primary,
            },
          }}
        >
          {product.name}
        </Typography>

        {/* Enhanced Product Meta with Better Spacing */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2.5, flexWrap: 'wrap' }}>
          <Chip
            label={getGenderText(product.gender)}
            size="small"
            sx={{
              backgroundColor: genderColors.bg,
              color: genderColors.text,
              fontWeight: 600,
              fontSize: '0.75rem',
              height: 28,
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: `0 2px 8px ${genderColors.text}30`,
              },
            }}
          />
          <Chip
            label={`⌀ ${product.caseSize}mm`}
            size="small"
            sx={{
              backgroundColor: COLORS.gray100,
              color: COLORS.textSecondary,
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 28,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: COLORS.gray200,
              },
            }}
          />
        </Box>

        {/* Enhanced Price Section */}
        <Box sx={{ mt: 'auto' }}>
          {hasDiscount ? (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: COLORS.textSecondary,
                  fontSize: '0.9rem',
                  mb: 0.5,
                  opacity: 0.7,
                }}
              >
                {formatPrice(product.price)}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: SEMANTIC_COLORS.error600,
                  fontSize: isMobile ? '1.2rem' : '1.3rem',
                  textShadow: `0 1px 2px ${SEMANTIC_COLORS.error600}20`,
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
                color: COLORS.textPrimary,
                fontSize: isMobile ? '1.2rem' : '1.3rem',
              }}
            >
              {formatPrice(product.price)}
            </Typography>
          )}
        </Box>

        {/* Enhanced Product Stats */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 2.5,
            pt: 2,
            borderTop: `1px solid ${COLORS.borderLight}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Visibility sx={{ fontSize: 16, color: COLORS.textTertiary }} />
            <Typography
              variant="caption"
              sx={{
                color: COLORS.textTertiary,
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {formatNumber(product.view)}
            </Typography>
          </Box>

          <Chip
            label={
              isOutOfStock
                ? 'Hết hàng'
                : isLowStock
                  ? `Sắp hết - Còn ${product.quantity}`
                  : `Còn ${product.quantity}`
            }
            size="small"
            sx={{
              color: isOutOfStock
                ? SEMANTIC_COLORS.error600
                : isLowStock
                  ? SEMANTIC_COLORS.warning700
                  : SEMANTIC_COLORS.success700,
              backgroundColor: isOutOfStock
                ? SEMANTIC_COLORS.error50
                : isLowStock
                  ? SEMANTIC_COLORS.warning50
                  : SEMANTIC_COLORS.success50,
              fontWeight: 600,
              fontSize: '0.7rem',
              height: 24,
              border: `1px solid ${
                isOutOfStock
                  ? SEMANTIC_COLORS.error200
                  : isLowStock
                    ? SEMANTIC_COLORS.warning200
                    : SEMANTIC_COLORS.success200
              }`,
              animation:
                isLowStock && !isOutOfStock
                  ? 'pulse 2s ease-in-out infinite'
                  : 'none',
              '@keyframes pulse': {
                '0%': { opacity: 1 },
                '50%': { opacity: 0.7 },
                '100%': { opacity: 1 },
              },
            }}
          />
        </Box>
      </Box>
    </WSCard>
  );
}
