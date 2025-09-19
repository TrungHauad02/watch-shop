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
import { COLORS, ALPHA_COLORS, SEMANTIC_COLORS } from '@/styles/colors';

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
          <Badge
            badgeContent={wishlistCount}
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
          backgroundColor: COLORS.backgroundPrimary,
          backgroundImage:
            'linear-gradient(to bottom, rgba(255,255,255,0.98), rgba(250,250,250,0.97))',
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
          borderBottom: `1px solid ${COLORS.borderLight}`,
          backgroundColor: COLORS.primary,
          color: COLORS.white,
        }}
      >
        <Typography variant="h6" fontWeight={700} color={COLORS.secondary}>
          {companyData.name}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: COLORS.white }}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ py: 1 }}>
        {/* Navigation Items */}
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: ALPHA_COLORS.primaryAlpha10,
                },
                '&.Mui-selected': {
                  backgroundColor: ALPHA_COLORS.secondaryAlpha20,
                  '& .MuiListItemIcon-root': {
                    color: COLORS.accent,
                  },
                  '& .MuiListItemText-primary': {
                    color: COLORS.primary,
                    fontWeight: 600,
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: COLORS.textSecondary }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{ color: COLORS.textPrimary }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <Divider sx={{ my: 1, borderColor: COLORS.borderLight }} />

        {/* User Section */}
        {isAuthenticated ? (
          <>
            {/* User Info */}
            {user && (
              <ListItem>
                <Box sx={{ p: 1, width: '100%' }}>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    color={COLORS.textPrimary}
                  >
                    {user.name}
                  </Typography>
                  <Typography variant="caption" color={COLORS.textSecondary}>
                    {user.email}
                  </Typography>
                </Box>
              </ListItem>
            )}

            {/* User Actions */}
            {userMenuActions.map((action) => (
              <ListItem key={action.key} disablePadding>
                <ListItemButton
                  onClick={() => handleUserAction(action.key)}
                  sx={{
                    mx: 1,
                    my: 0.5,
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: ALPHA_COLORS.primaryAlpha10,
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: COLORS.textSecondary }}>
                    {getUserActionIcon(action.key)}
                  </ListItemIcon>
                  <ListItemText
                    primary={action.label}
                    sx={{ color: COLORS.textPrimary }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 1, borderColor: COLORS.borderLight }} />

            {/* Logout */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleUserAction('logout')}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: '8px',
                  color: SEMANTIC_COLORS.error500,
                  '&:hover': {
                    backgroundColor: ALPHA_COLORS.secondaryAlpha10,
                  },
                }}
              >
                <ListItemIcon sx={{ color: SEMANTIC_COLORS.error500 }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Đăng xuất" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          // Login button for unauthenticated users
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/login')}
              sx={{
                mx: 1,
                my: 0.5,
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: ALPHA_COLORS.secondaryAlpha20,
                },
              }}
            >
              <ListItemIcon sx={{ color: COLORS.textSecondary }}>
                <Login />
              </ListItemIcon>
              <ListItemText
                primary="Đăng nhập"
                sx={{ color: COLORS.textPrimary, fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Drawer>
  );
}
