import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  Stack,
  useTheme,
  Grid,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Email,
  Phone,
  LocationOn,
  Schedule,
} from '@mui/icons-material';
import { BRAND_COLORS } from '../../styles/colors';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// TYPES
// ==============================================

export interface WSFooterProps {
  /** Additional styles */
  sx?: SxProps<Theme>;
}

// ==============================================
// COMPONENT
// ==============================================

const WSFooter: React.FC<WSFooterProps> = ({ sx = {} }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // ==============================================
  // DATA
  // ==============================================

  const footerLinks = {
    products: [
      { label: 'Đồng hồ nam', path: '/products?gender=MALE' },
      { label: 'Đồng hồ nữ', path: '/products?gender=FEMALE' },
      { label: 'Đồng hồ unisex', path: '/products?gender=UNISEX' },
      { label: 'Đồng hồ thể thao', path: '/products?category=sport' },
      { label: 'Đồng hồ sang trọng', path: '/products?category=luxury' },
    ],
    support: [
      { label: 'Hướng dẫn mua hàng', path: '/guide/buying' },
      { label: 'Chính sách bảo hành', path: '/policy/warranty' },
      { label: 'Chính sách đổi trả', path: '/policy/return' },
      { label: 'Chính sách vận chuyển', path: '/policy/shipping' },
      { label: 'Câu hỏi thường gặp', path: '/faq' },
    ],
    company: [
      { label: 'Về chúng tôi', path: '/about' },
      { label: 'Tuyển dụng', path: '/careers' },
      { label: 'Tin tức', path: '/news' },
      { label: 'Liên hệ', path: '/contact' },
      { label: 'Chính sách bảo mật', path: '/policy/privacy' },
    ],
  };

  const socialLinks = [
    {
      icon: <Facebook />,
      url: 'https://facebook.com/watchstore',
      label: 'Facebook',
    },
    {
      icon: <Instagram />,
      url: 'https://instagram.com/watchstore',
      label: 'Instagram',
    },
    {
      icon: <Twitter />,
      url: 'https://twitter.com/watchstore',
      label: 'Twitter',
    },
    {
      icon: <YouTube />,
      url: 'https://youtube.com/watchstore',
      label: 'YouTube',
    },
  ];

  const contactInfo = [
    {
      icon: <LocationOn />,
      title: 'Địa chỉ',
      content: '123 Đường ABC, Quận 1, TP.HCM',
    },
    {
      icon: <Phone />,
      title: 'Hotline',
      content: '+84 123 456 789',
    },
    {
      icon: <Email />,
      title: 'Email',
      content: 'support@watchstore.vn',
    },
    {
      icon: <Schedule />,
      title: 'Giờ làm việc',
      content: '8:00 - 22:00 (T2-CN)',
    },
  ];

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const handleLinkClick = (path: string) => {
    navigate(path);
  };

  const handleSocialClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ==============================================
  // RENDER COMPONENTS
  // ==============================================

  const renderLinkSection = (
    title: string,
    links: typeof footerLinks.products
  ) => (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      <Stack spacing={1}>
        {links.map((link) => (
          <Link
            key={link.path}
            component="button"
            onClick={() => handleLinkClick(link.path)}
            sx={{
              textAlign: 'left',
              color: 'text.secondary',
              textDecoration: 'none',
              fontSize: '0.875rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
              '&:hover': {
                color: BRAND_COLORS.secondary,
                textDecoration: 'underline',
              },
              transition: 'color 0.2s ease',
            }}
          >
            {link.label}
          </Link>
        ))}
      </Stack>
    </Box>
  );

  const renderContactInfo = () => (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 2,
        }}
      >
        Thông tin liên hệ
      </Typography>
      <Stack spacing={2}>
        {contactInfo.map((info, index) => (
          <Box
            key={index}
            sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}
          >
            <IconButton
              size="small"
              sx={{
                color: BRAND_COLORS.secondary,
                p: 0,
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              {info.icon}
            </IconButton>
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: 'text.primary' }}
              >
                {info.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {info.content}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );

  const renderNewsletter = () => (
    <Box
      sx={{
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(254,231,21,0.05)'
            : 'rgba(16,24,32,0.03)',
        p: 3,
        borderRadius: 2,
        border: `1px solid ${
          theme.palette.mode === 'dark'
            ? 'rgba(254,231,21,0.2)'
            : 'rgba(16,24,32,0.1)'
        }`,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 1,
        }}
      >
        Đăng ký nhận tin
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt
      </Typography>

      {/* Newsletter form will be implemented later */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          mt: 2,
          p: 2,
          backgroundColor: 'background.paper',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Form đăng ký sẽ được triển khai sau
        </Typography>
      </Box>
    </Box>
  );

  // ==============================================
  // MAIN RENDER
  // ==============================================

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        width: '100%',
        ...sx,
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        {/* Main Footer Content */}
        <Box sx={{ py: 5 }}>
          <Grid container spacing={4}>
            {/* Company Info & Newsletter */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: BRAND_COLORS.primary,
                    mb: 1,
                  }}
                >
                  WatchStore
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 3 }}
                >
                  Chuyên cung cấp đồng hồ chính hãng, cao cấp với chất lượng
                  tuyệt vời và dịch vụ khách hàng tận tâm. Mang đến cho bạn
                  những trải nghiệm mua sắm tuyệt vời nhất.
                </Typography>
              </Box>
              {renderNewsletter()}
            </Grid>

            {/* Product Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              {renderLinkSection('Sản phẩm', footerLinks.products)}
            </Grid>

            {/* Support Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              {renderLinkSection('Hỗ trợ', footerLinks.support)}
            </Grid>

            {/* Company Links */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              {renderLinkSection('Công ty', footerLinks.company)}
            </Grid>

            {/* Contact Info */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>{renderContactInfo()}</Grid>
          </Grid>
        </Box>

        <Divider />

        {/* Bottom Footer */}
        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} WatchStore. Tất cả quyền được bảo lưu.
          </Typography>

          {/* Social Links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Theo dõi:
            </Typography>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                onClick={() => handleSocialClick(social.url)}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: BRAND_COLORS.secondary,
                  },
                }}
                aria-label={social.label}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WSFooter;
