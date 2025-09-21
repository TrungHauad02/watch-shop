import { COLORS, GRADIENT_COLORS } from '@/styles/colors';
import { Box, Typography } from '@mui/material';
import FooterSocialLinks from './FooterSocialLinks';
import { getSocialMediaLinks } from '../footer.data';
import { Facebook, Instagram, YouTube, Twitter } from '@mui/icons-material';

interface FooterCompanyInfoProps {
  companyName: string;
  description: string;
  showSocialLinks: boolean;
}

export default function FooterCompanyInfo({
  companyName,
  description,
  showSocialLinks,
}: FooterCompanyInfoProps) {
  // Lấy social links từ data và map với icons
  const socialLinksData = getSocialMediaLinks().map((social) => ({
    ...social,
    icon:
      social.name === 'Facebook' ? (
        <Facebook />
      ) : social.name === 'Instagram' ? (
        <Instagram />
      ) : social.name === 'YouTube' ? (
        <YouTube />
      ) : social.name === 'Twitter' ? (
        <Twitter />
      ) : null,
  }));

  return (
    <Box sx={{ mb: 4 }}>
      {/* Company Name */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 800,
          // CUSTOMIZE: Chỉnh sửa gradient và typography của tên công ty ở đây
          background: GRADIENT_COLORS.amberGradient,

          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 3,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
        }}
      >
        {companyName}
      </Typography>

      {/* Company Description */}
      <Typography
        variant="body1"
        sx={{
          color: COLORS.white,
          lineHeight: 1.8,
          mb: 4,
          fontSize: '1.05rem',
          fontWeight: 400,
          // CUSTOMIZE: Chỉnh sửa style của mô tả công ty ở đây
        }}
      >
        {description}
      </Typography>

      {/* Social Links */}
      {showSocialLinks && (
        <FooterSocialLinks
          socialLinks={socialLinksData}
          title="Kết nối với chúng tôi"
        />
      )}
    </Box>
  );
}
