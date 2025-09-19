import {
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  ListItemIcon,
  Badge,
} from '@mui/material';
import {
  Person,
  FavoriteOutlined,
  ShoppingBag,
  Settings,
  Logout,
} from '@mui/icons-material';
import { UserDTO } from '@/shared/types';
import { userMenuActions } from '../header.data';

interface HeaderUserMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  user: UserDTO | null;
  wishlistCount?: number;
  onMenuAction: (action: string) => void;
}

export default function HeaderUserMenu({
  anchorEl,
  open,
  onClose,
  user,
  wishlistCount = 0,
  onMenuAction,
}: HeaderUserMenuProps) {
  const getMenuIcon = (actionKey: string) => {
    switch (actionKey) {
      case 'profile':
        return <Person fontSize="small" />;
      case 'wishlist':
        return (
          <Badge badgeContent={wishlistCount} color="error">
            <FavoriteOutlined fontSize="small" />
          </Badge>
        );
      case 'orders':
        return <ShoppingBag fontSize="small" />;
      case 'settings':
        return <Settings fontSize="small" />;
      default:
        return null;
    }
  };

  const handleMenuClick = (action: string) => {
    onMenuAction(action);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
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
          // CUSTOMIZE: Chỉnh sửa style của user menu ở đây
          backgroundColor: 'background.paper',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: 2,
          minWidth: 200,
          mt: 1,
        },
      }}
    >
      {/* User Info */}
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

      {/* Menu Actions */}
      {userMenuActions.map((action) => (
        <MenuItem key={action.key} onClick={() => handleMenuClick(action.key)}>
          <ListItemIcon>{getMenuIcon(action.key)}</ListItemIcon>
          {action.label}
        </MenuItem>
      ))}

      <Divider />

      {/* Logout */}
      <MenuItem
        onClick={() => handleMenuClick('logout')}
        sx={{ color: 'error.main' }}
      >
        <ListItemIcon>
          <Logout fontSize="small" sx={{ color: 'error.main' }} />
        </ListItemIcon>
        Đăng xuất
      </MenuItem>
    </Menu>
  );
}
