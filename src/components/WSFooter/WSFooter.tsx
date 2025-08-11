import { BRAND_COLORS } from '@/styles/colors';
import {
  Box,
  Container,
  Grid,
  IconButton,
  Link,
  Stack,
  SxProps,
  Theme,
  Typography,
  Divider,
  alpha,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Schedule,
  Facebook,
  Instagram,
  YouTube,
  Twitter,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface WSFooterProps {
  sx?: SxProps<Theme>;
}

export default function WSFooter({ sx }: WSFooterProps) {
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
      { label: 'Liên hệ', path: '/contact' },
      { label: 'Chính sách bảo mật', path: '/policy/privacy' },
    ],
  };

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

  const socialLinks = [
    {
      icon: <Facebook />,
      name: 'Facebook',
      url: 'https://facebook.com/watchstore',
    },
    {
      icon: <Instagram />,
      name: 'Instagram',
      url: 'https://instagram.com/watchstore',
    },
    {
      icon: <YouTube />,
      name: 'YouTube',
      url: 'https://youtube.com/watchstore',
    },
    {
      icon: <Twitter />,
      name: 'Twitter',
      url: 'https://twitter.com/watchstore',
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
          fontWeight: 700,
          color: 'text.primary',
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
            backgroundColor: BRAND_COLORS.secondary,
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
              color: 'text.secondary',
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
                color: BRAND_COLORS.accent,
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
                backgroundColor: BRAND_COLORS.accent,
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

  const renderContactInfo = () => (
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
          // Trong trường hợp md, đảm bảo items không wrap
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
              backgroundColor: alpha(BRAND_COLORS.secondary, 0.05),
              border: `1px solid ${alpha(BRAND_COLORS.secondary, 0.1)}`,
              transition: 'all 0.2s ease',
              textAlign: { xs: 'left', md: 'center', lg: 'left' },
              minHeight: { md: '100px' },
              // Mỗi item chiếm 1/4 width trong md
              flex: { md: '1 1 0%' },
              minWidth: { md: 0 },
              '&:hover': {
                backgroundColor: alpha(BRAND_COLORS.secondary, 0.08),
                borderColor: alpha(BRAND_COLORS.secondary, 0.15),
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: { xs: 40, md: 32, lg: 44 },
                height: { xs: 40, md: 32, lg: 44 },
                borderRadius: 2,
                backgroundColor: BRAND_COLORS.secondary,
                color: BRAND_COLORS.primary,
                flexShrink: 0,
                mb: { xs: 0, md: 1, lg: 0 },
              }}
            >
              {info.icon}
            </Box>

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

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: `3px solid ${BRAND_COLORS.secondary}`,
        mt: 'auto',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 -4px 20px ${alpha(BRAND_COLORS.primary, 0.08)}`,
        ...sx,
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Main footer content */}
        <Box sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {/* Company info */}
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${BRAND_COLORS.primary} 0%, ${BRAND_COLORS.accent} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 3,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                  }}
                >
                  Minh Nhật Watch Shop
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    mb: 4,
                    fontSize: '1.05rem',
                    fontWeight: 400,
                  }}
                >
                  Chuyên cung cấp đồng hồ chính hãng, cao cấp với chất lượng
                  tuyệt vời và dịch vụ khách hàng tận tâm. Hơn 10 năm kinh
                  nghiệm trong ngành đồng hồ cao cấp.
                </Typography>

                {/* Social media */}
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: 'text.primary',
                      mb: 2,
                    }}
                  >
                    Kết nối với chúng tôi
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {socialLinks.map((social) => (
                      <IconButton
                        key={social.name}
                        onClick={() => handleSocialClick(social.url)}
                        sx={{
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
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>

            {/* Product */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              {renderLinkSection('Sản phẩm', footerLinks.products)}
            </Grid>

            {/* Support */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              {renderLinkSection('Hỗ trợ', footerLinks.support)}
            </Grid>

            {/* Company */}
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              {renderLinkSection('Công ty', footerLinks.company)}
            </Grid>

            {/* Contact */}
            <Grid size={{ xs: 12, sm: 6, md: 12, lg: 2 }}>
              {renderContactInfo()}
            </Grid>
          </Grid>
        </Box>

        <Divider
          sx={{
            borderColor: alpha(BRAND_COLORS.secondary, 0.2),
            borderWidth: '1px',
          }}
        />

        {/* Bottom Footer */}
        <Box
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              fontSize: '0.95rem',
            }}
          >
            © {new Date().getFullYear()} WatchStore. Tất cả quyền được bảo lưu.
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              '& button': {
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: BRAND_COLORS.accent,
                  backgroundColor: alpha(BRAND_COLORS.accent, 0.1),
                },
              },
            }}
          >
            <button onClick={() => handleLinkClick('/policy/privacy')}>
              Chính sách bảo mật
            </button>
            <button onClick={() => handleLinkClick('/policy/terms')}>
              Điều khoản sử dụng
            </button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
