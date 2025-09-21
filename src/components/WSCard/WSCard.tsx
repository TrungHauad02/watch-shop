import { forwardRef } from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { WSCardProps } from './WSCard.types';
import { getCardStyles } from './WSCard.styles';

// CUSTOMIZE: Component WSCard với style clean và đơn giản
const WSCard = forwardRef<HTMLDivElement, WSCardProps>(
  (
    {
      variant = 'default',
      padding = 'medium',
      clickable = false,
      loading = false,
      children,
      onClick,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const handleClick = () => {
      if (clickable && onClick && !loading) {
        onClick();
      }
    };

    // CUSTOMIZE: Loading skeleton
    if (loading) {
      return (
        <Card
          ref={ref}
          sx={{
            ...getCardStyles(theme, variant, padding, false),
            ...sx,
          }}
          {...props}
        >
          <CardContent>
            <Box>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton
                variant="text"
                width="100%"
                height={20}
                sx={{ mt: 1 }}
              />
              <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={{ mt: 0.5 }}
              />
              <Skeleton
                variant="rectangular"
                width="100%"
                height={120}
                sx={{ mt: 2 }}
              />
            </Box>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        onClick={handleClick}
        sx={{
          ...getCardStyles(theme, variant, padding, clickable),
          ...sx,
        }}
        {...props}
      >
        {padding === 'none' ? children : <CardContent>{children}</CardContent>}
      </Card>
    );
  }
);

WSCard.displayName = 'WSCard';

export default WSCard;
