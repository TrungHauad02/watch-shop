import { BRAND_COLORS } from '@/styles/colors';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
} from '@mui/material';
import {
  Close as CloseIcon,
  Person,
  FavoriteOutlined,
  ShoppingBag,
  Settings,
  Logout,
  Login,
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { UserDTO } from '@/shared/types';
import {
  NavigationItem,
  companyData,
  headerConfig,
  userMenuActions,
} from '../header.data';

interface HeaderMobileDrawerProps {
  open: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  isAuthenticated: boolean;
  user: UserDTO | null;
  wishlistCount?: number;
  onNavigate: (path: string) => void;
  onUserAction: (action: string) => void;
}

export default function HeaderMobileDrawer({
  open,
  onClose,
  navigationItems,
  isAuthenticated,
  user,
  wishlistCount = 0,
  onNavigate,
  onUserAction,
}: HeaderMobileDrawerProps) {
  const location = useLocation();

  const handleNavigation = (path: string) => {
    onNavigate(path);
    onClose();
  };

  const handleUserAction = (action: string) => {
    onUserAction(action);
    onClose();
  };

  const getUserActionIcon = (actionKey: string) => {
    switch (actionKey) {
      case 'profile':
        return <Person />;
      case 'wishlist':
        return (
          <Badge badgeContent={wishlistCount} color="error">
            <FavoriteOutlined />
          </Badge>
        );
      case 'orders':
        return <ShoppingBag />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: headerConfig.drawer.width,
          // CUSTOMIZE: Chỉnh sửa style của mobile drawer ở đây
          backgroundColor: 'background.paper',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6" fontWeight={600} color="primary">
          {companyData.name}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {/* Navigation Items */}
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                // CUSTOMIZE: Chỉnh sửa style của navigation items trong mobile drawer ở đây
                '&.Mui-selected': {
                  backgroundColor: `${BRAND_COLORS.secondary}20`,
                  '& .MuiListItemIcon-root': {
                    color: BRAND_COLORS.accent,
                  },
                  '& .MuiListItemText-primary': {
                    color: BRAND_COLORS.accent,
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 1 }} />

        {/* User Section */}
        {isAuthenticated ? (
          <>
            {/* User Info */}
            {user && (
              <ListItem>
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user.email}
                  </Typography>
                </Box>
              </ListItem>
            )}

            {/* User Actions */}
            {userMenuActions.map((action) => (
              <ListItem key={action.key} disablePadding>
                <ListItemButton onClick={() => handleUserAction(action.key)}>
                  <ListItemIcon>{getUserActionIcon(action.key)}</ListItemIcon>
                  <ListItemText primary={action.label} />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 1 }} />

            {/* Logout */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleUserAction('logout')}
                sx={{ color: 'error.main' }}
              >
                <ListItemIcon>
                  <Logout sx={{ color: 'error.main' }} />
                </ListItemIcon>
                <ListItemText primary="Đăng xuất" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          // Login button for unauthenticated users
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
}
