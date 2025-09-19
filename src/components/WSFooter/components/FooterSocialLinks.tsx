import { BRAND_COLORS } from '@/styles/colors';
import { Box, IconButton, Stack, Typography, alpha } from '@mui/material';
import { ReactNode } from 'react';

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
          color: 'text.primary',
          mb: 2,
          // CUSTOMIZE: Chỉnh sửa style của tiêu đề social links ở đây
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
              // CUSTOMIZE: Chỉnh sửa style và hiệu ứng hover của social buttons ở đây
              backgroundColor: alpha(BRAND_COLORS.primary, 0.1),
              color: BRAND_COLORS.primary,
              width: 48,
              height: 48,
              borderRadius: '12px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: BRAND_COLORS.secondary,
                color: BRAND_COLORS.primary,
                transform: 'translateY(-6px) scale(1.1)',
                boxShadow: `0 10px 25px ${alpha(BRAND_COLORS.secondary, 0.4)}`,
              },
              // Focus styles cho accessibility
              '&:focus-visible': {
                outline: `2px solid ${BRAND_COLORS.accent}`,
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
