import { Box, Grid, Typography, Skeleton } from '@mui/material';
import { WSCard } from '@/components';
import { CategoryDTO } from '@/shared/types';
import { COLORS } from '@/styles/colors';
import CategoryCard from './CategoryCard';

interface CategoriesGridProps {
  categories: CategoryDTO[];
  loading?: boolean;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa layout grid danh mục tại đây
export default function CategoriesGrid({
  categories,
  loading = false,
}: CategoriesGridProps) {
  // Loading skeleton component
  const CategorySkeleton = () => (
    <WSCard variant="elevated" padding="none" sx={{ height: '100%' }}>
      {/* Image skeleton */}
      <Skeleton
        variant="rectangular"
        height={200}
        animation="wave"
        sx={{ backgroundColor: `${COLORS.gray100}` }}
      />

      {/* Content skeleton */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Skeleton
            variant="circular"
            width={20}
            height={20}
            animation="wave"
          />
          <Skeleton variant="text" width="60%" height={28} animation="wave" />
        </Box>
        <Skeleton
          variant="text"
          width="100%"
          height={20}
          animation="wave"
          sx={{ mb: 0.5 }}
        />
        <Skeleton
          variant="text"
          width="90%"
          height={20}
          animation="wave"
          sx={{ mb: 0.5 }}
        />
        <Skeleton
          variant="text"
          width="60%"
          height={20}
          animation="wave"
          sx={{ mb: 2 }}
        />

        {/* Action button skeleton */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pt: 1,
            borderTop: `1px solid ${COLORS.borderLight}`,
          }}
        >
          <Skeleton variant="text" width={100} height={20} animation="wave" />
          <Skeleton
            variant="circular"
            width={20}
            height={20}
            animation="wave"
          />
        </Box>
      </Box>
    </WSCard>
  );

  // Show loading skeletons
  if (loading) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <CategorySkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Show empty state
  if (!categories || categories.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: COLORS.textSecondary,
            mb: 1,
            fontWeight: 500,
          }}
        >
          Không tìm thấy danh mục nào
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: COLORS.textTertiary,
            maxWidth: 400,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại chính tả.
        </Typography>
      </Box>
    );
  }

  // Show categories grid
  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <CategoryCard category={category} />
        </Grid>
      ))}
    </Grid>
  );
}
