import { BRAND_COLORS } from '@/styles/colors';
import { Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavigationItem } from '../header.data';

interface HeaderNavigationProps {
  navigationItems: NavigationItem[];
  onNavigate: (path: string) => void;
}

export default function HeaderNavigation({
  navigationItems,
  onNavigate,
}: HeaderNavigationProps) {
  const location = useLocation();

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, gap: 1 }}>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => onNavigate(item.path)}
          sx={{
            // CUSTOMIZE: Chỉnh sửa style của navigation items ở đây
            color:
              location.pathname === item.path
                ? BRAND_COLORS.secondary
                : 'rgba(255,255,255,0.8)',
            fontWeight: location.pathname === item.path ? 600 : 400,
            px: 2,
            '&:hover': {
              color: BRAND_COLORS.secondary,
              backgroundColor: 'rgba(254,231,21,0.1)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
