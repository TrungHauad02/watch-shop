import { Box, Skeleton } from '@mui/material';
import { WSCard } from '@/components';

// CUSTOMIZE: Bạn có thể chỉnh sửa animation loading tại đây
export default function WishlistLoadingSkeleton() {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <Box>
      {skeletonItems.map((_, index) => (
        <WSCard
          key={index}
          variant="elevated"
          sx={{
            display: 'flex',
            width: '100%',
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              flexShrink: 0,
              overflow: 'hidden',
              borderRadius: 1,
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              p: 2,
              minHeight: 120,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Skeleton
                variant="text"
                width="70%"
                height={28}
                animation="wave"
                sx={{ mb: 1 }}
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
                width="80%"
                height={20}
                animation="wave"
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <Skeleton
                  variant="rounded"
                  width={60}
                  height={24}
                  animation="wave"
                />
                <Skeleton
                  variant="rounded"
                  width={50}
                  height={24}
                  animation="wave"
                />
                <Skeleton
                  variant="rounded"
                  width={70}
                  height={24}
                  animation="wave"
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Skeleton
                  variant="text"
                  width={80}
                  height={24}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width={120}
                  height={28}
                  animation="wave"
                />
                <Skeleton
                  variant="rounded"
                  width={50}
                  height={24}
                  animation="wave"
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={24}
                  animation="wave"
                  sx={{ mb: 0.5 }}
                />
                <Skeleton
                  variant="text"
                  width={60}
                  height={16}
                  animation="wave"
                />
              </Box>
            </Box>
          </Box>
        </WSCard>
      ))}
    </Box>
  );
}
