import { BRAND_COLORS } from '@/styles/colors';
import { Box, Stack, Typography, alpha } from '@mui/material';
import { ReactNode } from 'react';

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
          fontWeight: 700,
          color: 'text.primary',
          mb: 3,
          position: 'relative',
          fontSize: '1.1rem',
          // CUSTOMIZE: Chỉnh sửa style của tiêu đề ở đây
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-8px',
            left: 0,
            width: '40px',
            height: '3px',
            backgroundColor: BRAND_COLORS.secondary,
            borderRadius: '2px',
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
              // CUSTOMIZE: Chỉnh sửa màu nền và border của contact card ở đây
              backgroundColor: alpha(BRAND_COLORS.secondary, 0.05),
              border: `1px solid ${alpha(BRAND_COLORS.secondary, 0.1)}`,
              transition: 'all 0.2s ease',
              textAlign: { xs: 'left', md: 'center', lg: 'left' },
              minHeight: { md: '100px' },
              flex: { md: '1 1 0%' },
              minWidth: { md: 0 },
              '&:hover': {
                backgroundColor: alpha(BRAND_COLORS.secondary, 0.08),
                borderColor: alpha(BRAND_COLORS.secondary, 0.15),
              },
            }}
          >
            {/* Icon Container */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 40, md: 32, lg: 44 },
                height: { xs: 40, md: 32, lg: 44 },
                borderRadius: 2,
                // CUSTOMIZE: Chỉnh sửa màu sắc của icon container ở đây
                backgroundColor: BRAND_COLORS.secondary,
                color: BRAND_COLORS.primary,
                flexShrink: 0,
                mb: { xs: 0, md: 1, lg: 0 },
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
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: 'text.primary',
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
                  color: 'text.secondary',
                  fontWeight: 500,
                  lineHeight: 1.3,
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
