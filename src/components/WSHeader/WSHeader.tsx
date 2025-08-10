import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Button,
  Menu,
  MenuItem,
  InputBase,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  FavoriteOutlined,
  AccountCircle,
  ShoppingBag,
  Home,
  Watch,
  Login,
  Person,
  Settings,
  Logout,
  LightMode,
  DarkMode,
  Close as CloseIcon,
} from '@mui/icons-material';
import { BRAND_COLORS } from '../../styles/colors';

// ==============================================
// TYPES
// ==============================================

export interface WSHeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    avatar?: string;
  } | null;
  wishlistCount?: number;
  cartCount?: number;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

// ==============================================
// COMPONENT
// ==============================================

const WSHeader: React.FC<WSHeaderProps> = ({
  onThemeToggle,
  isDarkMode = false,
  isAuthenticated = false,
  user = null,
  wishlistCount = 0,
  cartCount = 0,
  onLogin,
  onLogout,
  onProfileClick,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  // ==============================================
  // NAVIGATION ITEMS
  // ==============================================

  const navigationItems = [
    { label: 'Trang chủ', path: '/', icon: <Home /> },
    { label: 'Sản phẩm', path: '/products', icon: <Watch /> },
  ];

  // ==============================================
  // RENDER COMPONENTS
  // ==============================================

  const renderLogo = () => (
    <Typography
      variant="h6"
      component="div"
      onClick={() => navigate('/')}
      sx={{
        flexGrow: 0,
        mr: 2,
        color: BRAND_COLORS.secondary,
        fontWeight: 'bold',
        fontSize: { xs: '1.2rem', md: '1.5rem' },
        cursor: 'pointer',
        textDecoration: 'none',
        '&:hover': {
          opacity: 0.8,
        },
      }}
    >
      WatchStore
    </Typography>
  );

  const renderDesktopNavigation = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, gap: 1 }}>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => navigate(item.path)}
          sx={{
            color:
              location.pathname === item.path
                ? BRAND_COLORS.secondary
                : 'rgba(255,255,255,0.8)',
            fontWeight: location.pathname === item.path ? 600 : 400,
            '&:hover': {
              color: BRAND_COLORS.secondary,
              backgroundColor: 'rgba(254,231,21,0.1)',
            },
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  const renderSearchBox = () => (
    <Box
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        flexGrow: 1,
        mx: { xs: 1, md: 3 },
        maxWidth: { xs: 'none', md: 500 },
      }}
    >
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
          },
          '&:focus-within': {
            backgroundColor: 'rgba(255,255,255,0.25)',
            border: `1px solid ${BRAND_COLORS.secondary}`,
          },
        }}
      >
        <InputBase
          placeholder="Tìm kiếm đồng hồ..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            ml: 1,
            flex: 1,
            color: 'white',
            '& .MuiInputBase-input': {
              padding: '8px 0',
              '&::placeholder': {
                color: 'rgba(255,255,255,0.7)',
                opacity: 1,
              },
            },
          }}
        />
        <IconButton
          type="submit"
          sx={{
            p: '8px',
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              color: BRAND_COLORS.secondary,
            },
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );

  const renderActionButtons = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Theme Toggle */}
      <IconButton
        color="inherit"
        onClick={onThemeToggle}
        sx={{
          color: 'rgba(255,255,255,0.8)',
          '&:hover': {
            color: BRAND_COLORS.secondary,
          },
        }}
      >
        {isDarkMode ? <LightMode /> : <DarkMode />}
      </IconButton>

      {/* Wishlist */}
      {isAuthenticated && (
        <IconButton
          color="inherit"
          onClick={() => navigate('/wishlist')}
          sx={{
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              color: BRAND_COLORS.secondary,
            },
          }}
        >
          <Badge badgeContent={wishlistCount} color="error">
            <FavoriteOutlined />
          </Badge>
        </IconButton>
      )}

      {/* Shopping Cart (Future feature) */}
      <IconButton
        color="inherit"
        sx={{
          color: 'rgba(255,255,255,0.8)',
          '&:hover': {
            color: BRAND_COLORS.secondary,
          },
        }}
      >
        <Badge badgeContent={cartCount} color="error">
          <ShoppingBag />
        </Badge>
      </IconButton>

      {/* Account Menu */}
      {isAuthenticated ? (
        <IconButton
          color="inherit"
          onClick={handleAccountMenuOpen}
          sx={{
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              color: BRAND_COLORS.secondary,
            },
          }}
        >
          <AccountCircle />
        </IconButton>
      ) : (
        <Button
          color="inherit"
          startIcon={<Login />}
          onClick={onLogin || (() => navigate('/login'))}
          sx={{
            color: BRAND_COLORS.secondary,
            borderColor: BRAND_COLORS.secondary,
            '&:hover': {
              backgroundColor: 'rgba(254,231,21,0.1)',
              borderColor: BRAND_COLORS.secondary,
            },
          }}
          variant="outlined"
        >
          Đăng nhập
        </Button>
      )}
    </Box>
  );

  const renderAccountMenu = () => (
    <Menu
      anchorEl={accountMenuAnchor}
      open={Boolean(accountMenuAnchor)}
      onClose={handleAccountMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: 2,
          minWidth: 200,
          mt: 1,
        },
      }}
    >
      {user && (
        <>
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="subtitle1" fontWeight={600}>
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
          <Divider />
        </>
      )}

      <MenuItem
        onClick={() => {
          handleAccountMenuClose();
          onProfileClick?.();
        }}
      >
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        Thông tin cá nhân
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleAccountMenuClose();
          navigate('/wishlist');
        }}
      >
        <ListItemIcon>
          <FavoriteOutlined fontSize="small" />
        </ListItemIcon>
        Danh sách yêu thích
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleAccountMenuClose();
          navigate('/orders');
        }}
      >
        <ListItemIcon>
          <ShoppingBag fontSize="small" />
        </ListItemIcon>
        Đơn hàng của tôi
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleAccountMenuClose();
          navigate('/settings');
        }}
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Cài đặt
      </MenuItem>

      <Divider />

      <MenuItem
        onClick={() => {
          handleAccountMenuClose();
          onLogout?.();
        }}
        sx={{ color: 'error.main' }}
      >
        <ListItemIcon>
          <Logout fontSize="small" sx={{ color: 'error.main' }} />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: 280,
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" fontWeight={600} color="primary">
          WatchStore
        </Typography>
        <IconButton onClick={() => setMobileMenuOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {isAuthenticated ? (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/profile')}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Thông tin cá nhân" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/wishlist')}>
                <ListItemIcon>
                  <Badge badgeContent={wishlistCount} color="error">
                    <FavoriteOutlined />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary="Danh sách yêu thích" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('/settings')}>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Cài đặt" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={onLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                  <Logout sx={{ color: 'error.main' }} />
                </ListItemIcon>
                <ListItemText primary="Đăng xuất" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleNavigation('/login')}>
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Đăng nhập" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );

  // ==============================================
  // MAIN RENDER
  // ==============================================

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: BRAND_COLORS.primary,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleMobileMenuToggle}
              sx={{ mr: 1, color: BRAND_COLORS.secondary }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          {renderLogo()}

          {/* Desktop Navigation */}
          {!isMobile && renderDesktopNavigation()}

          {/* Search Box */}
          {renderSearchBox()}

          {/* Action Buttons */}
          {renderActionButtons()}
        </Toolbar>
      </AppBar>

      {/* Account Menu */}
      {renderAccountMenu()}

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </>
  );
};

export default WSHeader;
