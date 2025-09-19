import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';
import { Box, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FooterLink {
  label: string;
  path: string;
}

interface FooterLinkSectionProps {
  title: string;
  links: FooterLink[];
}

export default function FooterLinkSection({
  title,
  links,
}: FooterLinkSectionProps) {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          // Màu title sang trọng với deep blue
          color: COLORS.primary,
          mb: 3,
          position: 'relative',
          fontSize: '1.05rem',
          letterSpacing: '0.3px',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '32px',
            height: '2px',
            // Gradient underline đẹp mắt
            background: `linear-gradient(90deg, ${SEMANTIC_COLORS.info500}, ${SEMANTIC_COLORS.info300})`,
            borderRadius: '2px',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '48px',
          },
        }}
      >
        {title}
      </Typography>

      <Stack spacing={1.2}>
        {links.map((link) => (
          <Link
            key={link.path}
            component="button"
            onClick={() => handleLinkClick(link.path)}
            sx={{
              textAlign: 'left',
              // Màu link tinh tế
              color: COLORS.gray600,
              textDecoration: 'none',
              fontSize: '0.875rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              borderRadius: '4px',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              fontWeight: 450,

              '&:hover': {
                // Hover với màu blue đẹp
                color: SEMANTIC_COLORS.info600,
                transform: 'translateX(6px)',
                fontWeight: 500,

                '&::before': {
                  opacity: 1,
                  transform: 'translateY(-50%) scaleX(1)',
                },
              },

              '&::before': {
                content: '""',
                position: 'absolute',
                left: '-10px',
                top: '50%',
                transform: 'translateY(-50%) scaleX(0)',
                width: '3px',
                height: '3px',
                backgroundColor: SEMANTIC_COLORS.info500,
                borderRadius: '50%',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: 0,
              },

              // Active state
              '&:active': {
                transform: 'translateX(4px)',
                color: SEMANTIC_COLORS.info700,
              },

              // Focus accessibility
              '&:focus-visible': {
                outline: `2px solid ${SEMANTIC_COLORS.info300}`,
                outlineOffset: '2px',
                borderRadius: '4px',
              },
            }}
          >
            {link.label}
          </Link>
        ))}
      </Stack>
    </Box>
  );
}
