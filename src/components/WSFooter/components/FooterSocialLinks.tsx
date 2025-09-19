import { Box, IconButton, Stack, Typography, alpha } from '@mui/material';
import { ReactNode } from 'react';
import { COLORS } from '@/styles/colors';

interface SocialLink {
  icon: ReactNode;
  name: string;
  url: string;
}

interface FooterSocialLinksProps {
  socialLinks: SocialLink[];
  title: string;
}

export default function FooterSocialLinks({
  socialLinks,
  title,
}: FooterSocialLinksProps) {
  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box>
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          color: COLORS.textPrimary,
          mb: 2,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-6px',
            left: 0,
            width: '30px',
            height: '2px',
            backgroundColor: COLORS.secondary,
            borderRadius: '1px',
          },
        }}
      >
        {title}
      </Typography>

      <Stack direction="row" spacing={2}>
        {socialLinks.map((social) => (
          <IconButton
            key={social.name}
            onClick={() => handleSocialClick(social.url)}
            aria-label={`Theo dõi chúng tôi trên ${social.name}`}
            sx={{
              backgroundColor: alpha(COLORS.primary, 0.08),
              color: COLORS.primary,
              width: 48,
              height: 48,
              borderRadius: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: `1px solid ${alpha(COLORS.primary, 0.1)}`,
              '&:hover': {
                backgroundColor: COLORS.secondary,
                color: COLORS.primaryDark,
                transform: 'translateY(-4px) scale(1.05)',
                boxShadow: `0 8px 20px ${alpha(COLORS.secondary, 0.3)}`,
                borderColor: COLORS.secondaryLight,
              },
              // Focus styles cho accessibility
              '&:focus-visible': {
                outline: `2px solid ${COLORS.accent}`,
                outlineOffset: '2px',
              },
            }}
          >
            {social.icon}
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
}
