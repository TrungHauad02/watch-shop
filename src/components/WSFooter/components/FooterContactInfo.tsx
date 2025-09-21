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
      {/* Section Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: COLORS.primary,
          mb: 2.5,
          fontSize: '1rem',
          // CUSTOMIZE: Có thể thay đổi màu title và font size tại đây
        }}
      >
        Thông tin liên hệ
      </Typography>

      {/* Contact Items */}
      <Stack spacing={2}>
        {contactInfo.map((info, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              p: 1.5,
              borderRadius: 1.5,
              backgroundColor: SEMANTIC_COLORS.info50,
              border: `1px solid ${SEMANTIC_COLORS.info200}`,
              transition: 'all 0.2s ease',
              // CUSTOMIZE: Có thể thay đổi màu nền và border tại đây

              '&:hover': {
                backgroundColor: SEMANTIC_COLORS.info100,
                borderColor: SEMANTIC_COLORS.info300,
                // CUSTOMIZE: Có thể tùy chỉnh hiệu ứng hover tại đây
              },
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: 1.5,
                backgroundColor: SEMANTIC_COLORS.info500,
                color: COLORS.white,
                flexShrink: 0,
                // CUSTOMIZE: Có thể thay đổi màu và kích thước icon tại đây
              }}
            >
              {info.icon}
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: COLORS.primary,
                  mb: 0.5,
                  fontSize: '0.875rem',
                  // CUSTOMIZE: Có thể thay đổi style của title tại đây
                }}
              >
                {info.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: COLORS.gray600,
                  fontSize: '0.8rem',
                  lineHeight: 1.4,
                  wordBreak: 'break-word',
                  // CUSTOMIZE: Có thể thay đổi style của content tại đây
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
