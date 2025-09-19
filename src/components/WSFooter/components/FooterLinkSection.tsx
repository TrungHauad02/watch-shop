import COLORS from '@/styles/colors';
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
          fontWeight: 700,
          color: COLORS.textPrimary,
          mb: 3,
          position: 'relative',
          fontSize: '1.1rem',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '40px',
            height: '3px',
            backgroundColor: COLORS.secondary, // Sử dụng màu secondary từ colors.ts
            borderRadius: '2px',
          },
        }}
      >
        {title}
      </Typography>

      <Stack spacing={1.5}>
        {links.map((link) => (
          <Link
            key={link.path}
            component="button"
            onClick={() => handleLinkClick(link.path)}
            sx={{
              textAlign: 'left',
              color: COLORS.textSecondary, // Sử dụng màu textSecondary từ colors.ts
              textDecoration: 'none',
              fontSize: '0.9rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: '6px 0',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              position: 'relative',
              '&:hover': {
                color: COLORS.accent, // Sử dụng màu accent từ colors.ts
                transform: 'translateX(8px)',
                '&::before': {
                  opacity: 1,
                  transform: 'scaleX(1)',
                },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                left: '-12px',
                top: '50%',
                transform: 'translateY(-50%) scaleX(0)',
                width: '4px',
                height: '4px',
                backgroundColor: COLORS.accent, // Sử dụng màu accent từ colors.ts
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                opacity: 0,
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
