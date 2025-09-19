import { Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavigationItem } from '../header.data';
import { COLORS } from '@/styles/colors';

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
        gap: 0.5,
        alignItems: 'center',
      }}
    >
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => onNavigate(item.path)}
          sx={{
            color:
              location.pathname === item.path ? COLORS.gray100 : COLORS.gray300,
            backgroundColor:
              location.pathname === item.path
                ? `${COLORS.gray200}15`
                : 'transparent',
            fontWeight: location.pathname === item.path ? 900 : 600,
            fontSize: '0.9rem',
            px: 2,
            py: 0.6,
            borderRadius: '6px',
            textTransform: 'capitalize',
            letterSpacing: '0.2px',
            position: 'relative',
            minHeight: '32px',

            // Smooth transition
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',

            // Hover effects
            '&:hover': {
              backgroundColor: `${COLORS.gray100}20`,
              transform: 'translateY(-1px)',
            },

            // Active press state
            '&:active': {
              transform: 'translateY(0)',
              transition: 'all 0.1s ease',
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
      ))}
    </Box>
  );
}
