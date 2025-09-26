import { useState } from 'react';
import { Box, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight, ZoomIn } from '@mui/icons-material';
import { ProductImageDTO } from '@/shared/types';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface ProductImageGalleryProps {
  images: ProductImageDTO[];
  productName: string;
  discount?: number;
}

export default function ProductImageGallery({
  images,
  productName,
  discount = 0,
}: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const currentImage = images[currentImageIndex];

  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          height: isMobile ? 300 : 500,
          backgroundColor: COLORS.gray100,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center', color: COLORS.textSecondary }}>
          Không có hình ảnh
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Main Image Display */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: isMobile ? 300 : 500,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: COLORS.white,
          border: `1px solid ${COLORS.borderLight}`,
          mb: 2,
        }}
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              backgroundColor: SEMANTIC_COLORS.error500,
              color: COLORS.white,
              px: 2,
              py: 1,
              borderRadius: 1,
              fontWeight: 700,
              fontSize: '1rem',
              zIndex: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            -{discount}%
          </Box>
        )}

        {/* Main Image */}
        <img
          src={currentImage?.imageUrl}
          alt={`${productName} - Ảnh ${currentImageIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />

        {/* Zoom Icon */}
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: COLORS.white,
            color: COLORS.textPrimary,
            '&:hover': {
              backgroundColor: COLORS.gray100,
            },
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          size="small"
        >
          <ZoomIn />
        </IconButton>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <IconButton
              onClick={handlePrevImage}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: COLORS.white,
                color: COLORS.textPrimary,
                '&:hover': {
                  backgroundColor: COLORS.gray100,
                },
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              <ChevronLeft />
            </IconButton>

            <IconButton
              onClick={handleNextImage}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: COLORS.white,
                color: COLORS.textPrimary,
                '&:hover': {
                  backgroundColor: COLORS.gray100,
                },
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              backgroundColor: 'rgba(0,0,0,0.7)',
              color: COLORS.white,
              px: 2,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.875rem',
            }}
          >
            {currentImageIndex + 1} / {images.length}
          </Box>
        )}
      </Box>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': {
              height: 4,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: COLORS.gray300,
              borderRadius: 2,
            },
          }}
        >
          {images.map((image, index) => (
            <Box
              key={image.id || index}
              onClick={() => handleThumbnailClick(index)}
              sx={{
                width: 80,
                height: 80,
                flexShrink: 0,
                borderRadius: 1,
                overflow: 'hidden',
                cursor: 'pointer',
                border: `2px solid ${
                  index === currentImageIndex
                    ? COLORS.primary
                    : COLORS.borderLight
                }`,
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: COLORS.primary,
                  transform: 'scale(1.05)',
                },
              }}
            >
              <img
                src={image.imageUrl}
                alt={`${productName} - Thumbnail ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
