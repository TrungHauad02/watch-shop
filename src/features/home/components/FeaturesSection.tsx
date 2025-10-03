import { Box, Container, Typography, Grid } from '@mui/material';
import {
  LocalShipping,
  VerifiedUser,
  Inventory,
  SupportAgent,
  CardGiftcard,
  Security,
} from '@mui/icons-material';
import { COLORS, ALPHA_COLORS, SEMANTIC_COLORS } from '@/styles/colors';

// CUSTOMIZE: Bạn có thể chỉnh sửa danh sách features tại đây
const FEATURES_CONFIG = [
  {
    icon: LocalShipping,
    title: 'Giao Hàng Toàn Quốc',
    description: 'Miễn phí vận chuyển cho đơn hàng trên 5 triệu đồng',
    color: COLORS.blue500,
    gradient: `linear-gradient(135deg, ${COLORS.blue500}, ${COLORS.blue600})`,
  },
  {
    icon: Inventory,
    title: 'Cho Kiểm Tra Hàng',
    description: 'Kiểm tra kỹ lưỡng trước khi thanh toán và nhận hàng',
    color: COLORS.amber500,
    gradient: `linear-gradient(135deg, ${COLORS.amber500}, ${COLORS.amber600})`,
  },
  {
    icon: VerifiedUser,
    title: 'Bảo Hành Uy Tín',
    description: 'Bảo hành chính hãng từ 12-24 tháng theo từng sản phẩm',
    color: SEMANTIC_COLORS.success500,
    gradient: `linear-gradient(135deg, ${SEMANTIC_COLORS.success500}, ${SEMANTIC_COLORS.success600})`,
  },
  {
    icon: Security,
    title: 'Hàng Chính Hãng 100%',
    description: 'Cam kết nguồn gốc rõ ràng, đầy đủ giấy tờ xuất xứ',
    color: COLORS.gold500,
    gradient: `linear-gradient(135deg, ${COLORS.gold500}, ${COLORS.gold600})`,
  },
  {
    icon: SupportAgent,
    title: 'Hỗ Trợ 24/7',
    description: 'Đội ngũ tư vấn nhiệt tình, sẵn sàng hỗ trợ mọi lúc',
    color: COLORS.pink500,
    gradient: `linear-gradient(135deg, ${COLORS.pink500}, ${COLORS.pink600})`,
  },
  {
    icon: CardGiftcard,
    title: 'Quà Tặng Hấp Dẫn',
    description: 'Nhiều ưu đãi và quà tặng giá trị cho khách hàng thân thiết',
    color: SEMANTIC_COLORS.error500,
    gradient: `linear-gradient(135deg, ${SEMANTIC_COLORS.error500}, ${SEMANTIC_COLORS.error600})`,
  },
];

export default function FeaturesSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
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
          // CUSTOMIZE: Subtle decorative pattern cho light background
          background: `
            radial-gradient(circle at 90% 90%, ${COLORS.blue700}20 0%, transparent 50%),
            radial-gradient(circle at 10% 10%, ${COLORS.amber800}20 0%, transparent 50%)
          `,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 6, md: 8 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 800,
              color: COLORS.gray900,
              mb: 2,
              letterSpacing: '-0.01em',
            }}
          >
            Tại Sao Chọn Chúng Tôi?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: COLORS.gray700,
              maxWidth: '600px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
            }}
          >
            Cam kết mang đến trải nghiệm mua sắm tuyệt vời với dịch vụ chuyên
            nghiệp và sản phẩm chất lượng
          </Typography>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={3}>
          {FEATURES_CONFIG.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    height: '100%',
                    p: 4,
                    borderRadius: '20px',
                    // CUSTOMIZE: White card style cho light background
                    background: COLORS.white,
                    border: `2px solid ${COLORS.gray200}`,
                    boxShadow: `0 8px 24px ${ALPHA_COLORS.blackAlpha10}`,
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',

                    // Hover effect
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      border: `2px solid ${feature.color}`,
                      boxShadow: `0 16px 48px ${ALPHA_COLORS.blackAlpha15}`,

                      // Icon animation
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                      },

                      // Glow effect
                      '&::before': {
                        opacity: 0.15,
                      },
                    },

                    // Subtle glow background
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: feature.gradient,
                      opacity: 0.05,
                      transition: 'opacity 0.4s ease',
                      borderRadius: '20px',
                    },
                  }}
                >
                  {/* Icon Container */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                      position: 'relative',
                      // CUSTOMIZE: Icon background với gradient
                      background: feature.gradient,
                      boxShadow: `0 8px 24px ${feature.color}30`,
                    }}
                  >
                    <Icon
                      className="feature-icon"
                      sx={{
                        fontSize: 32,
                        color: COLORS.white,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </Box>

                  {/* Content */}
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: COLORS.gray900,
                        mb: 1.5,
                        fontSize: '1.25rem',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: COLORS.gray600,
                        lineHeight: 1.7,
                        fontSize: '0.95rem',
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* Bottom CTA (Optional) */}
        <Box
          sx={{
            mt: { xs: 6, md: 8 },
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: COLORS.gray700,
              fontSize: '1rem',
            }}
          >
            Bạn có thắc mắc?{' '}
            <Box
              component="span"
              sx={{
                color: COLORS.gold600,
                fontWeight: 600,
                cursor: 'pointer',
                borderBottom: `2px solid ${COLORS.gold600}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: COLORS.gold700,
                  borderBottomColor: COLORS.gold700,
                },
              }}
            >
              Liên hệ với chúng tôi ngay
            </Box>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
