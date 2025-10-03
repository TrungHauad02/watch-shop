import { Box } from '@mui/material';
import {
  HeroSection,
  FeaturesSection,
  FeaturedProductsSection,
  CategoriesSection,
  BrandsSection,
} from '../components';
import { COLORS } from '@/styles/colors';

// ==================== HOMEPAGE COMPONENT ====================
/**
 * HomePage - Trang chủ của website đồng hồ
 *
 * Bố cục các section chính:
 * 1. HeroSection - Banner chính với CTA
 * 2. FeaturesSection - Đặc điểm nổi bật (Miễn phí vận chuyển, bảo hành, đổi trả)
 * 3. FeaturedProductsSection - Sản phẩm nổi bật
 * 4. CategoriesSection - Danh mục sản phẩm
 * 5. BrandsSection - Thương hiệu nổi bật
 */

export default function HomePage() {
  return (
    <Box
      sx={{
        // CUSTOMIZE: Màu nền gradient chính của toàn bộ HomePage
        background: `linear-gradient(-45deg, ${COLORS.gray500} 0%, ${COLORS.gray300} 50%, ${COLORS.gray50} 100%)`,
        width: '100%',
        minHeight: '100vh',
      }}
    >
      {/* Section 1: Hero Banner */}
      <HeroSection />

      {/* Section 2: Features/Benefits */}
      <FeaturesSection />

      {/* Section 3: Featured Products */}
      <FeaturedProductsSection />

      {/* Section 4: Categories */}
      <CategoriesSection />

      {/* Section 5: Brands Showcase */}
      <BrandsSection />
    </Box>
  );
}
