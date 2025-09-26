import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { UserDTO } from '@/shared/types';
import HeaderLogo from './components/HeaderLogo';
import HeaderNavigation from './components/HeaderNavigation';
import HeaderSearch from './components/HeaderSearch';
import HeaderActions from './components/HeaderActions';
import HeaderUserMenu from './components/HeaderUserMenu';
import HeaderMobileDrawer from './components/HeaderMobileDrawer';
import {
  navigationItems,
  headerConfig,
  getNavigationItems,
} from './header.data';
import COLORS from '@/styles/colors';

// ==================== INTERFACES ====================

interface WSHeaderProps {
  isAuthenticated?: boolean;
  user?: UserDTO | null;
  wishlistCount?: number;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  // CUSTOMIZE: Cho phép override navigation items nếu cần
  customNavigationItems?: typeof navigationItems;
}

// ==================== MAIN COMPONENT ====================

export default function WSHeader({
  isAuthenticated = true,
  user = null,
  wishlistCount = 0,
  onLogin,
  onLogout,
  onProfileClick,
  customNavigationItems,
}: WSHeaderProps) {
  const theme = useTheme();
  const navigate = useNavigate();

  // Responsive breakpoint
  const isMobile = useMediaQuery(
    theme.breakpoints.down(headerConfig.breakpoints.mobile)
  );

  // ==================== STATE MANAGEMENT ====================

  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ==================== DATA ====================

  const currentNavigationItems =
    customNavigationItems ||
    getNavigationItems(isAuthenticated, user?.role === 'ADMIN');

  // ==================== EVENT HANDLERS ====================

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setMobileMenuOpen(false);
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleLoginClick = () => {
    if (onLogin) {
      onLogin();
    } else {
      navigate('/auth/login');
    }
  };

  const handleUserAction = (action: string) => {
    setAccountMenuAnchor(null);
    setMobileMenuOpen(false);

    switch (action) {
      case 'profile':
        if (onProfileClick) {
          onProfileClick();
        } else {
          navigate('/profile');
        }
        break;
      case 'wishlist':
        navigate('/wishlist');
        break;
      case 'orders':
        navigate('/orders');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        onLogout?.();
        break;
      default:
        break;
    }
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // ==================== MAIN RENDER ====================

  return (
    <>
      <AppBar
        position={
          headerConfig.features.enableStickyHeader ? 'sticky' : 'static'
        }
        sx={{
          backgroundColor: COLORS.gray900,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          width: '100%',
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: headerConfig.heights.mobile,
              sm: headerConfig.heights.desktop,
            },
            px: { xs: 1, sm: 2 },
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleMobileMenuToggle}
              sx={{
                mr: 1,
                color: COLORS.secondary,
              }}
              aria-label="Mở menu"
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <HeaderLogo onClick={() => handleNavigation('/')} />

          {/* Desktop Navigation */}
          {!isMobile && (
            <HeaderNavigation
              navigationItems={currentNavigationItems}
              onNavigate={handleNavigation}
            />
          )}

          {/* Search Box */}
          {headerConfig.features.showSearch && (
            <HeaderSearch onSearch={handleSearch} />
          )}

          {/* Action Buttons */}
          <HeaderActions
            isAuthenticated={isAuthenticated}
            wishlistCount={wishlistCount}
            onWishlistClick={handleWishlistClick}
            onAccountClick={handleAccountMenuOpen}
            onLoginClick={handleLoginClick}
          />
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      {isAuthenticated && headerConfig.features.showUserMenu && (
        <HeaderUserMenu
          anchorEl={accountMenuAnchor}
          open={Boolean(accountMenuAnchor)}
          onClose={handleAccountMenuClose}
          user={user}
          wishlistCount={wishlistCount}
          onMenuAction={handleUserAction}
        />
      )}

      {/* Mobile Drawer */}
      {isMobile && (
        <HeaderMobileDrawer
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          navigationItems={currentNavigationItems}
          isAuthenticated={isAuthenticated}
          user={user}
          wishlistCount={wishlistCount}
          onNavigate={handleNavigation}
          onUserAction={handleUserAction}
        />
      )}
    </>
  );
}
