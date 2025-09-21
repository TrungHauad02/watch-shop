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
        // CUSTOMIZE: Luxury gold gradient giống LoginPage
        background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.gold300} 50%, ${COLORS.gold400} 100%)`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        fontWeight: 800,
        fontSize: {
          xs: '1.4rem',
          sm: '1.6rem',
          md: '1.8rem',
        },
        cursor: 'pointer',
        userSelect: 'none',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        position: 'relative',
        display: 'inline-block',

        // Premium shadow effect
        filter: `drop-shadow(0 2px 4px ${ALPHA_COLORS.primaryAlpha20})`,
        textShadow: `0 2px 4px ${COLORS.primary}40`,

        // Smooth transition
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

        // Hover effects giống LoginPage
        '&:hover': {
          transform: 'translateY(-2px)',
          background: `linear-gradient(135deg, ${COLORS.gold200} 0%, ${COLORS.gold400} 50%, ${COLORS.gold500} 100%)`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          filter: `drop-shadow(0 4px 8px ${ALPHA_COLORS.primaryAlpha30})`,
          textShadow: `0 4px 8px ${COLORS.primary}60`,

          // Underline animation
          '&::after': {
            width: '100%',
            background: `linear-gradient(135deg, ${COLORS.gold400}, ${COLORS.gold600})`,
          },
        },

        // Luxury underline
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0%',
          height: '3px',
          background: `linear-gradient(135deg, ${COLORS.gold500}, ${COLORS.gold700})`,
          borderRadius: '2px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 2px 8px ${ALPHA_COLORS.secondaryAlpha30}`,
        },

        // Active state
        '&:active': {
          transform: 'translateY(0)',
          transition: 'all 0.1s ease',
        },

        // Focus accessibility
        '&:focus-visible': {
          outline: `3px solid ${COLORS.gold400}`,
          outlineOffset: '4px',
          borderRadius: '6px',
        },
      }}
    >
      {companyName}
    </Typography>
  );
}
