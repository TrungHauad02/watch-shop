import { BRAND_COLORS } from '@/styles/colors';
import {
  Box,
  IconButton,
  Badge,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FavoriteOutlined, AccountCircle, Login } from '@mui/icons-material';

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
            // CUSTOMIZE: Chỉnh sửa style của wishlist button ở đây
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              color: BRAND_COLORS.secondary,
            },
          }}
          aria-label="Danh sách yêu thích"
        >
          <Badge badgeContent={wishlistCount} color="error">
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
            // CUSTOMIZE: Chỉnh sửa style của account button ở đây
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              color: BRAND_COLORS.secondary,
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
            // CUSTOMIZE: Chỉnh sửa style của login button ở đây
            color: BRAND_COLORS.secondary,
            borderColor: BRAND_COLORS.secondary,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            px: { xs: 1, sm: 2 },
            '&:hover': {
              backgroundColor: 'rgba(254,231,21,0.1)',
              borderColor: BRAND_COLORS.secondary,
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
