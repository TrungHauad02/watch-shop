import { Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavigationItem } from '../header.data';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';

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
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        ml: 2,
        py: 0.5,
        gap: 1,
        alignItems: 'center',
      }}
    >
      {navigationItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Button
            key={item.path}
            color="inherit"
            onClick={() => onNavigate(item.path)}
            sx={{
              // CUSTOMIZE: Simple navigation style với clean design
              color: isActive ? COLORS.gold300 : COLORS.white,
              backgroundColor: isActive
                ? ALPHA_COLORS.whiteAlpha20
                : 'transparent',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.9rem',
              px: 2,
              py: 0.75,
              borderRadius: '8px',
              textTransform: 'capitalize',
              minHeight: '36px',

              // Simple transition
              transition: 'all 0.2s ease',

              // Hover effects
              '&:hover': {
                color: COLORS.gold300,
                backgroundColor: ALPHA_COLORS.whiteAlpha20,
              },

              // Focus accessibility
              '&:focus-visible': {
                outline: `2px solid ${COLORS.gold400}`,
                outlineOffset: '2px',
              },
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
}
