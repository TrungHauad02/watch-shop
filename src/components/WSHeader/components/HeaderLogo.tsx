import { Typography } from '@mui/material';
import { companyData } from '../header.data';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';

interface HeaderLogoProps {
  onClick: () => void;
  companyName?: string;
}

export default function HeaderLogo({
  onClick,
  companyName = companyData.name,
}: HeaderLogoProps) {
  return (
    <Typography
      variant="h6"
      component="div"
      onClick={onClick}
      sx={{
        flexGrow: 0,
        mr: 2,
        // Vàng đẹp với gradient tinh tế
        background: `linear-gradient(135deg, ${COLORS.gold400} 0%, ${COLORS.gold500} 50%, ${COLORS.gold600} 100%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        fontWeight: 700,
        fontSize: {
          xs: '1.3rem',
          sm: '1.5rem',
          md: '1.7rem',
        },
        cursor: 'pointer',
        userSelect: 'none',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        position: 'relative',
        display: 'inline-block',

        // Animation đơn giản
        transition: 'all 0.3s ease',

        // Shadow nhẹ
        filter: `drop-shadow(0 2px 4px ${ALPHA_COLORS.primaryAlpha10})`,

        // Hover đơn giản
        '&:hover': {
          transform: 'translateY(-1px)',
          // Vàng sáng hơn khi hover
          background: `linear-gradient(135deg, ${COLORS.gold300} 0%, ${COLORS.gold400} 50%, ${COLORS.gold500} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          filter: `drop-shadow(0 4px 8px ${ALPHA_COLORS.primaryAlpha20})`,

          // Underline hiện ra
          '&::after': {
            width: '100%',
          },
        },

        // Underline đơn giản
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-4px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0%',
          height: '2px',
          background: COLORS.gold500,
          transition: 'width 0.3s ease',
          borderRadius: '1px',
        },

        // Active state
        '&:active': {
          transform: 'translateY(0)',
          transition: 'all 0.1s ease',
        },

        // Focus cho accessibility
        '&:focus-visible': {
          outline: `2px solid ${COLORS.gold400}`,
          outlineOffset: '3px',
          borderRadius: '4px',
        },
      }}
    >
      {companyName}
    </Typography>
  );
}
