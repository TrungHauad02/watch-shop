import { Box, IconButton, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { COLORS, SEMANTIC_COLORS, ALPHA_COLORS } from '@/styles/colors';

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
          // Khớp với màu title ở FooterLinkSection
          color: COLORS.white,
          mb: 2.5,
          position: 'relative',
          display: 'inline-block',
          fontSize: '1.05rem',
          letterSpacing: '0.3px',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-6px',
            left: 0,
            width: '32px',
            height: '2px',
            // Gradient underline đồng nhất
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

      <Stack direction="row" spacing={1.5}>
        {socialLinks.map((social) => (
          <IconButton
            key={social.name}
            onClick={() => handleSocialClick(social.url)}
            aria-label={`Theo dõi chúng tôi trên ${social.name}`}
            sx={{
              // Background gradient tinh tế
              background: `linear-gradient(135deg, ${COLORS.gray100}, ${COLORS.gray50})`,
              color: COLORS.gray600,
              width: 44,
              height: 44,
              borderRadius: '10px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              border: `1px solid ${COLORS.gray200}`,
              position: 'relative',
              overflow: 'hidden',

              // Hover effects đẹp mắt
              '&:hover': {
                background: `linear-gradient(135deg, ${COLORS.amber600}, ${COLORS.amber300})`,
                color: COLORS.white,
                transform: 'translateY(-2px) scale(1.02)',
                boxShadow: `0 6px 20px ${SEMANTIC_COLORS.info500}40`,
                borderColor: SEMANTIC_COLORS.info400,

                // Ripple effect
                '&::before': {
                  transform: 'scale(2)',
                  opacity: 0,
                },
              },

              // Ripple animation
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '20px',
                height: '20px',
                background: ALPHA_COLORS.whiteAlpha50,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%) scale(0)',
                transition: 'all 0.4s ease',
                opacity: 0.8,
              },

              // Active state
              '&:active': {
                transform: 'translateY(-1px) scale(0.98)',
                '&::before': {
                  transform: 'translate(-50%, -50%) scale(1.5)',
                  opacity: 0.4,
                },
              },

              // Focus accessibility
              '&:focus-visible': {
                outline: `2px solid ${SEMANTIC_COLORS.info400}`,
                outlineOffset: '3px',
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
