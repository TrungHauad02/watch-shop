import {
  Box,
  IconButton,
  Badge,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { FavoriteOutlined, AccountCircle, Login } from '@mui/icons-material';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';

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
            // CUSTOMIZE: Luxury style cho wishlist button
            color: COLORS.white,
            background: `linear-gradient(135deg, ${ALPHA_COLORS.whiteAlpha10}, ${ALPHA_COLORS.whiteAlpha20})`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${ALPHA_COLORS.whiteAlpha20}`,
            borderRadius: '12px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              color: COLORS.gold300,
              background: `linear-gradient(135deg, ${ALPHA_COLORS.secondaryAlpha10}, ${ALPHA_COLORS.secondaryAlpha20})`,
              transform: 'translateY(-2px) scale(1.05)',
              boxShadow: `0 8px 20px ${ALPHA_COLORS.primaryAlpha20}`,
            },
            '&:active': {
              transform: 'translateY(0) scale(1)',
            },
          }}
          aria-label="Danh sách yêu thích"
        >
          <Badge
            badgeContent={wishlistCount}
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                background: `linear-gradient(135deg, ${COLORS.gold400}, ${COLORS.gold600})`,
                color: COLORS.primary,
                fontWeight: 'bold',
                fontSize: '0.7rem',
                boxShadow: `0 2px 8px ${ALPHA_COLORS.secondaryAlpha50}`,
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
            // CUSTOMIZE: Luxury style cho account button
            color: COLORS.white,
            background: `linear-gradient(135deg, ${ALPHA_COLORS.whiteAlpha10}, ${ALPHA_COLORS.whiteAlpha20})`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${ALPHA_COLORS.whiteAlpha20}`,
            borderRadius: '12px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              color: COLORS.gold300,
              background: `linear-gradient(135deg, ${ALPHA_COLORS.secondaryAlpha10}, ${ALPHA_COLORS.secondaryAlpha20})`,
              transform: 'translateY(-2px) scale(1.05)',
              boxShadow: `0 8px 20px ${ALPHA_COLORS.primaryAlpha20}`,
            },
            '&:active': {
              transform: 'translateY(0) scale(1)',
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
            // CUSTOMIZE: Premium login button style giống LoginPage
            background: `linear-gradient(135deg, ${COLORS.gold400}15, ${COLORS.gold500}25)`,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${COLORS.gold400}40`,
            color: COLORS.gold300,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            px: { xs: 1.5, sm: 2.5 },
            py: { xs: 0.75, sm: 1 },
            borderRadius: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

            // Shimmer effect
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: `linear-gradient(90deg, transparent, ${ALPHA_COLORS.whiteAlpha20}, transparent)`,
              transition: 'left 0.5s ease',
            },

            '&:hover': {
              background: `linear-gradient(135deg, ${COLORS.gold500}, ${COLORS.gold600})`,
              color: COLORS.primary,
              border: `1px solid ${COLORS.gold500}`,
              transform: 'translateY(-2px)',
              boxShadow: `
                0 8px 25px ${ALPHA_COLORS.secondaryAlpha30},
                0 4px 10px ${ALPHA_COLORS.secondaryAlpha20}
              `,

              '&::before': {
                left: '100%',
              },
            },

            '&:active': {
              transform: 'translateY(0)',
              boxShadow: `0 4px 15px ${ALPHA_COLORS.secondaryAlpha40}`,
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
