import { Box, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { COLORS, SEMANTIC_COLORS } from '@/styles/colors';

interface ContactInfoItem {
  icon: ReactNode;
  title: string;
  content: string;
}

interface FooterContactInfoProps {
  contactInfo: ContactInfoItem[];
}

export default function FooterContactInfo({
  contactInfo,
}: FooterContactInfoProps) {
  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          // Khớp với màu title các component khác
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
        Thông tin liên hệ
      </Typography>

      <Stack
        spacing={{ xs: 2.5, md: 2, lg: 2.5 }}
        direction={{ xs: 'column', md: 'row', lg: 'column' }}
        sx={{
          width: '100%',
          flexWrap: 'nowrap',
        }}
      >
        {contactInfo.map((info, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', md: 'center', lg: 'flex-start' },
              justifyContent: {
                xs: 'flex-start',
                md: 'center',
                lg: 'flex-start',
              },
              flexDirection: { xs: 'row', md: 'column', lg: 'row' },
              gap: { xs: 2, md: 1, lg: 2.5 },
              p: { xs: 2, md: 1.5, lg: 2.5 },
              borderRadius: 2,
              // Nền xanh nhẹ, tinh tế
              backgroundColor: `${SEMANTIC_COLORS.info50}80`,
              border: `1px solid ${SEMANTIC_COLORS.info200}`,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              textAlign: { xs: 'left', md: 'center', lg: 'left' },
              minHeight: { md: '100px' },
              flex: { md: '1 1 0%' },
              minWidth: { md: 0 },
              position: 'relative',
              overflow: 'hidden',

              // Hover effect đẹp mắt
              '&:hover': {
                backgroundColor: `${SEMANTIC_COLORS.info100}90`,
                borderColor: SEMANTIC_COLORS.info300,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 16px ${SEMANTIC_COLORS.info500}20`,

                // Subtle glow from icon
                '& .icon-container': {
                  boxShadow: `0 0 20px ${SEMANTIC_COLORS.info500}40`,
                },
              },

              // Subtle background pattern
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                width: '60px',
                height: '60px',
                background: `radial-gradient(circle, ${SEMANTIC_COLORS.info200}30 0%, transparent 70%)`,
                borderRadius: '50%',
                transform: 'translate(30px, -30px)',
                transition: 'all 0.3s ease',
              },

              '&:hover::before': {
                background: `radial-gradient(circle, ${SEMANTIC_COLORS.info300}40 0%, transparent 70%)`,
                transform: 'translate(20px, -20px) scale(1.2)',
              },
            }}
          >
            {/* Icon Container */}
            <Box
              className="icon-container"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 40, md: 32, lg: 44 },
                height: { xs: 40, md: 32, lg: 44 },
                borderRadius: 2,
                // Icon với gradient blue đẹp mắt
                background: `linear-gradient(135deg, ${SEMANTIC_COLORS.info500}, ${SEMANTIC_COLORS.info600})`,
                color: COLORS.white,
                flexShrink: 0,
                mb: { xs: 0, md: 1, lg: 0 },
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {info.icon}
            </Box>

            {/* Content */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: {
                  xs: 'flex-start',
                  md: 'center',
                  lg: 'flex-start',
                },
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.primary,
                  mb: 0.5,
                  fontSize: { xs: '0.9rem', md: '0.8rem', lg: '0.95rem' },
                  lineHeight: 1.2,
                  textAlign: { xs: 'left', md: 'center', lg: 'left' },
                }}
              >
                {info.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: COLORS.gray600,
                  fontWeight: 450,
                  lineHeight: 1.4,
                  fontSize: { xs: '0.85rem', md: '0.75rem', lg: '0.9rem' },
                  textAlign: { xs: 'left', md: 'center', lg: 'left' },
                  wordBreak: 'break-word',
                  hyphens: 'auto',
                }}
              >
                {info.content}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
