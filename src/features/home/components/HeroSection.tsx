import { Box, Container, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  ArrowForward,
  Watch,
  Verified,
  LocalShipping,
  VerifiedUser,
  Inventory,
} from '@mui/icons-material';
import { WSButton } from '@/components';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';

// CUSTOMIZE: Bạn có thể chỉnh sửa nội dung hero, màu sắc và hình ảnh tại đây
const HERO_CONFIG = {
  shopName: 'Minh Nhật Watch Shop',
  title: 'Đồng Hồ Chính Hãng',
  subtitle: 'Uy Tín - Chất Lượng - Giá Tốt',
  description:
    'Chuyên cung cấp đồng hồ chính hãng với giá tốt nhất thị trường. Giao hàng toàn quốc, cho kiểm tra kỹ trước khi nhận.',
  ctaPrimary: 'Xem Sản Phẩm',
  ctaSecondary: 'Liên Hệ Tư Vấn',
  stats: [
    { value: '500+', label: 'Sản Phẩm' },
    { value: '50+', label: 'Thương Hiệu' },
    { value: '10K+', label: 'Khách Hàng' },
  ],
  features: [
    { label: 'Hàng chính hãng 100%', icon: Verified },
    { label: 'Bảo hành uy tín', icon: VerifiedUser },
    { label: 'Giao hàng toàn quốc', icon: LocalShipping },
    { label: 'Cho check hàng', icon: Inventory },
  ],
};

export default function HeroSection() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleContact = () => {
    // CUSTOMIZE: Có thể thay đổi logic liên hệ (navigate to contact page, open chat, etc.)
    navigate('/contact');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '700px', md: '800px' },
        py: 5,
        display: 'flex',
        alignItems: 'center',
        // CUSTOMIZE: Background trong suốt để hiển thị gradient từ HomePage
        background: 'transparent',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // CUSTOMIZE: Subtle pattern overlay cho light background
          background: `
            radial-gradient(circle at 15% 20%, ${ALPHA_COLORS.whiteAlpha30} 0%, transparent 40%),
            radial-gradient(circle at 85% 80%, ${COLORS.gold100}80 0%, transparent 50%)
          `,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // CUSTOMIZE: Subtle grid pattern
          backgroundImage: `
            linear-gradient(${ALPHA_COLORS.blackAlpha05} 1px, transparent 1px),
            linear-gradient(90deg, ${ALPHA_COLORS.blackAlpha05} 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          opacity: 0.3,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={6} alignItems="center">
          {/* Text Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              {/* Shop Name Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 3,
                  py: 1.5,
                  mb: 4,
                  borderRadius: '50px',
                  // CUSTOMIZE: Badge với nền trắng và border gold
                  background: COLORS.white,
                  border: `2px solid ${COLORS.gold500}`,
                  boxShadow: `0 4px 16px ${ALPHA_COLORS.blackAlpha10}`,
                }}
              >
                <Watch sx={{ fontSize: 20, color: COLORS.gold600 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.gold700,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    fontSize: '0.85rem',
                  }}
                >
                  {HERO_CONFIG.shopName}
                </Typography>
              </Box>

              {/* Main Title */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                  fontWeight: 900,
                  // CUSTOMIZE: Dark text gradient cho light background
                  background: `linear-gradient(135deg, ${COLORS.gray900} 0%, ${COLORS.gray700} 50%, ${COLORS.gold700} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  lineHeight: 1.1,
                  mb: 2,
                  letterSpacing: '-0.02em',
                  textShadow: `0 2px 8px ${ALPHA_COLORS.blackAlpha10}`,
                }}
              >
                {HERO_CONFIG.title}
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
                  fontWeight: 700,
                  color: COLORS.gray700,
                  mb: 2,
                  lineHeight: 1.3,
                  letterSpacing: '0.5px',
                }}
              >
                {HERO_CONFIG.subtitle}
              </Typography>

              {/* Description */}
              <Typography
                variant="h6"
                sx={{
                  color: COLORS.gray600,
                  mb: 5,
                  lineHeight: 1.7,
                  maxWidth: '540px',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                }}
              >
                {HERO_CONFIG.description}
              </Typography>

              {/* Features List - 4 items with 2x2 grid on mobile */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)',
                  },
                  gap: 2,
                  mb: 5,
                }}
              >
                {HERO_CONFIG.features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 1,
                        px: 2,
                        py: 2,
                        borderRadius: '12px',
                        // CUSTOMIZE: White feature cards với shadow
                        background: COLORS.white,
                        border: `1px solid ${COLORS.gray200}`,
                        boxShadow: `0 4px 12px ${ALPHA_COLORS.blackAlpha10}`,
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          background: COLORS.gold50,
                          border: `1px solid ${COLORS.gold400}`,
                          transform: 'translateY(-4px)',
                          boxShadow: `0 8px 24px ${ALPHA_COLORS.blackAlpha15}`,
                        },
                      }}
                    >
                      <Icon
                        sx={{
                          color: COLORS.gold600,
                          fontSize: 28,
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: COLORS.gray800,
                          fontWeight: 600,
                          fontSize: '0.85rem',
                          lineHeight: 1.3,
                        }}
                      >
                        {feature.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: 5,
                }}
              >
                <WSButton
                  variant="primary"
                  size="large"
                  onClick={handleShopNow}
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    // CUSTOMIZE: Gold button
                    background: `linear-gradient(135deg, ${COLORS.gold600} 0%, ${COLORS.gold500} 100%)`,
                    color: COLORS.white,
                    boxShadow: `0 4px 20px ${COLORS.gold500}40`,
                    border: `1px solid ${COLORS.gold400}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${COLORS.gold500} 0%, ${COLORS.gold400} 100%)`,
                      transform: 'translateY(-3px)',
                      boxShadow: `0 8px 28px ${COLORS.gold500}50`,
                    },
                  }}
                >
                  {HERO_CONFIG.ctaPrimary}
                </WSButton>

                <WSButton
                  variant="outline"
                  size="large"
                  onClick={handleContact}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    // CUSTOMIZE: White outline button
                    background: COLORS.white,
                    borderColor: COLORS.gray700,
                    color: COLORS.gray800,
                    border: `2px solid ${COLORS.gray700}`,
                    boxShadow: `0 4px 12px ${ALPHA_COLORS.blackAlpha10}`,
                    '&:hover': {
                      background: COLORS.gray100,
                      borderColor: COLORS.gray900,
                      color: COLORS.gray900,
                      transform: 'translateY(-3px)',
                      boxShadow: `0 8px 20px ${ALPHA_COLORS.blackAlpha15}`,
                    },
                  }}
                >
                  {HERO_CONFIG.ctaSecondary}
                </WSButton>
              </Box>

              {/* Stats */}
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 4,
                  pt: 3,
                  borderTop: `2px solid ${COLORS.gray300}`,
                }}
              >
                {HERO_CONFIG.stats.map((stat, index) => (
                  <Box key={index}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        // CUSTOMIZE: Dark gradient stats
                        background: `linear-gradient(135deg, ${COLORS.gray900} 0%, ${COLORS.gold700} 100%)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                        mb: 0.5,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: COLORS.gray600,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontSize: '0.75rem',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Visual Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: '400px', md: '600px' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Main Watch Display */}
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: '32px',
                  // CUSTOMIZE: White glass effect cho light background
                  background: COLORS.white,
                  border: `2px solid ${COLORS.gray200}`,
                  boxShadow: `
                    0 20px 60px ${ALPHA_COLORS.blackAlpha15},
                    0 0 0 1px ${ALPHA_COLORS.whiteAlpha50} inset
                  `,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at 50% 50%, ${COLORS.gold100}60 0%, transparent 70%)`,
                  },
                }}
              >
                {/* CUSTOMIZE: Thay thế bằng hình ảnh đồng hồ thực tế */}
                <Watch
                  sx={{
                    fontSize: '12rem',
                    color: COLORS.gold500,
                    opacity: 0.5,
                    filter: `drop-shadow(0 0 40px ${COLORS.gold400}60)`,
                  }}
                />

                {/* Inner glow effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    width: '60%',
                    height: '60%',
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${COLORS.gold300}15, transparent)`,
                    filter: 'blur(60px)',
                  }}
                />
              </Box>

              {/* Floating Info Card 1: Vietnam Nationwide */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 40,
                  right: 20,
                  px: 3,
                  py: 2,
                  borderRadius: '16px',
                  // CUSTOMIZE: Gold card với white background
                  background: COLORS.white,
                  border: `2px solid ${COLORS.gold500}`,
                  boxShadow: `0 8px 24px ${COLORS.gold500}30`,
                  animation: 'float 3s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                  },
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.gold700,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.7rem',
                  }}
                >
                  Giao Hàng
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: COLORS.gray900,
                    fontWeight: 900,
                    fontSize: '1.3rem',
                  }}
                >
                  Toàn Quốc
                </Typography>
              </Box>

              {/* Floating Info Card 2: Check Before Accept */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 40,
                  left: 20,
                  px: 3,
                  py: 2,
                  borderRadius: '16px',
                  // CUSTOMIZE: White card với shadow
                  background: COLORS.white,
                  border: `2px solid ${COLORS.gray300}`,
                  boxShadow: `0 8px 24px ${ALPHA_COLORS.blackAlpha15}`,
                  animation: 'float 3s ease-in-out infinite 1.5s',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: COLORS.gray600,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontSize: '0.7rem',
                  }}
                >
                  Chính Sách
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: 0.5,
                  }}
                >
                  <Inventory sx={{ color: COLORS.gold600, fontSize: 20 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: COLORS.gray900,
                      fontWeight: 700,
                      fontSize: '1rem',
                    }}
                  >
                    Cho Check Hàng
                  </Typography>
                </Box>
              </Box>

              {/* Decorative Glow Elements */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '10%',
                  left: '-10%',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${COLORS.gold300}20, transparent)`,
                  filter: 'blur(60px)',
                  zIndex: -1,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  bottom: '15%',
                  right: '-10%',
                  width: '250px',
                  height: '250px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${COLORS.amber300}15, transparent)`,
                  filter: 'blur(70px)',
                  zIndex: -1,
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
