import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Category as CategoryIcon } from '@mui/icons-material';
import { WSCard } from '@/components';
import { CategoryDTO } from '@/shared/types';
import { COLORS } from '@/styles/colors';

interface CategoryCardProps {
  category: CategoryDTO;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa giao diện card danh mục tại đây
export default function CategoryCard({ category }: CategoryCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to products page with category filter
    navigate(`/products?category=${category.id}`);
  };

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <WSCard
      variant="elevated"
      clickable
      onClick={handleClick}
      padding="none"
      sx={{
        height: '100%',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 32px ${COLORS.shadow}`,
          '& .category-image': {
            transform: 'scale(1.05)',
          },
          '& .arrow-icon': {
            transform: 'translateX(4px)',
            color: COLORS.primary,
          },
        },
      }}
    >
      {/* Category Image */}
      <Box
        sx={{
          position: 'relative',
          height: isMobile ? 180 : 200,
          overflow: 'hidden',
          backgroundColor: COLORS.gray50,
        }}
      >
        <img
          src={category.image}
          alt={category.name}
          className="category-image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          loading="lazy"
        />

        {/* Overlay gradient */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            display: 'flex',
            alignItems: 'flex-end',
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CategoryIcon
              sx={{
                color: COLORS.white,
                fontSize: '1.25rem',
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: COLORS.white,
                fontWeight: 700,
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                fontSize: isMobile ? '1.1rem' : '1.25rem',
              }}
            >
              {category.name}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Category Content */}
      <Box
        sx={{
          p: isMobile ? 2 : 3,
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 200px)',
          minHeight: 120,
        }}
      >
        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: COLORS.textSecondary,
            lineHeight: 1.6,
            flex: 1,
            fontSize: isMobile ? '0.875rem' : '0.95rem',
            mb: 2,
          }}
        >
          {truncateDescription(category.description, isMobile ? 100 : 120)}
        </Typography>

        {/* Action Button */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
            pt: 1,
            borderTop: `1px solid ${COLORS.borderLight}`,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: COLORS.primary,
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          >
            Xem sản phẩm
          </Typography>

          <ArrowForward
            className="arrow-icon"
            sx={{
              fontSize: '1.2rem',
              color: COLORS.textSecondary,
              transition: 'all 0.3s ease',
            }}
          />
        </Box>
      </Box>
    </WSCard>
  );
}
