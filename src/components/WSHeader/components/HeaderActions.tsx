import {
  Box,
  IconButton,
  Badge,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FavoriteOutlined, AccountCircle, Login } from '@mui/icons-material';
import { COLORS } from '@/styles/colors';

interface HeaderActionsProps {
  isAuthenticated: boolean;
  wishlistCount?: number;
  onWishlistClick: () => void;
  onAccountClick: (event: React.MouseEvent<HTMLElement>) => void;
  onLoginClick: () => void;
}

export default function HeaderActions({
  isAuthenticated,
  wishlistCount = 0,
  onWishlistClick,
  onAccountClick,
  onLoginClick,
}: HeaderActionsProps) {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}
    >
      {/* Wishlist - Only show when authenticated */}
      {isAuthenticated && (
        <IconButton
          color="inherit"
          onClick={onWishlistClick}
          sx={{
            color: COLORS.white,
            transition: 'all 0.3s ease',
            '&:hover': {
              color: COLORS.secondary,
              transform: 'scale(1.1)',
            },
          }}
          aria-label="Danh sách yêu thích"
        >
          <Badge
            badgeContent={wishlistCount}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: COLORS.accent,
                color: COLORS.primary,
                fontWeight: 'bold',
              },
            }}
          >
            <FavoriteOutlined />
          </Badge>
        </IconButton>
      )}

      {/* Account Menu */}
      {isAuthenticated ? (
        <IconButton
          color="inherit"
          onClick={onAccountClick}
          sx={{
            color: COLORS.white,
            transition: 'all 0.3s ease',
            '&:hover': {
              color: COLORS.secondary,
              transform: 'scale(1.1)',
            },
          }}
          aria-label="Tài khoản"
        >
          <AccountCircle />
        </IconButton>
      ) : (
        <Button
          color="inherit"
          startIcon={<Login />}
          onClick={onLoginClick}
          sx={{
            color: COLORS.secondary,
            borderColor: COLORS.secondary,
            backgroundColor: 'rgba(254, 231, 21, 0.1)',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            px: { xs: 1, sm: 2 },
            py: { xs: 0.5, sm: 1 },
            borderRadius: '8px',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: COLORS.secondary,
              color: COLORS.primary,
              borderColor: COLORS.secondary,
              boxShadow: `0 4px 12px ${COLORS.secondary}33`,
              transform: 'translateY(-2px)',
            },
          }}
          variant="outlined"
          size={isSmallMobile ? 'small' : 'medium'}
        >
          {isSmallMobile ? 'Login' : 'Đăng nhập'}
        </Button>
      )}
    </Box>
  );
}
