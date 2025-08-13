import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Paper,
  Divider,
  Alert,
  Chip,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Star as StarIcon,
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import WSCard from '@/components/WSCard';
import { WSCardVariant, WSCardSize } from '@/components/WSCard/WSCard.types';
import { BRAND_COLORS } from '@/styles/colors';

export default function WSCardDemoPage() {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [variant, setVariant] = useState<WSCardVariant>('elevation');
  const [size, setSize] = useState<WSCardSize>('medium');
  const [loading, setLoading] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [showActions, setShowActions] = useState(true);

  // ==============================================
  // DEMO DATA
  // ==============================================

  const sampleImage =
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop';

  const sampleActions = [
    {
      label: 'Xem',
      onClick: () => alert('Xem sản phẩm'),
      color: 'info' as const,
      variant: 'outlined' as const,
      startIcon: <VisibilityIcon />,
    },
    {
      label: 'Sửa',
      onClick: () => alert('Chỉnh sửa'),
      color: 'warning' as const,
      variant: 'contained' as const,
      startIcon: <EditIcon />,
    },
    {
      label: 'Xóa',
      onClick: () => alert('Xóa'),
      color: 'error' as const,
      variant: 'text' as const,
      startIcon: <DeleteIcon />,
    },
  ];

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const handleCardClick = () => {
    console.log('Card clicked!');
    alert('Card được click!');
  };

  const handleAsyncAction = async (actionName: string) => {
    console.log(`${actionName} action started`);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`${actionName} hoàn thành!`);
  };

  // ==============================================
  // RENDER CONTROLS
  // ==============================================

  const renderControls = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Điều khiển Demo
      </Typography>

      <Grid container spacing={3}>
        {/* Variant */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Variant</InputLabel>
            <Select
              value={variant}
              label="Variant"
              onChange={(e) => setVariant(e.target.value as WSCardVariant)}
            >
              <MenuItem value="elevation">Elevation</MenuItem>
              <MenuItem value="outlined">Outlined</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Size */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              value={size}
              label="Size"
              onChange={(e) => setSize(e.target.value as WSCardSize)}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Reset Button */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
            <Chip
              icon={<RefreshIcon />}
              label="Reset Demo"
              onClick={() => {
                setVariant('elevation');
                setSize('medium');
                setLoading(false);
                setClickable(false);
                setShowImage(true);
                setShowActions(true);
              }}
              color="secondary"
              variant="outlined"
            />
          </Box>
        </Grid>

        {/* Boolean Controls */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={loading}
                  onChange={(e) => setLoading(e.target.checked)}
                />
              }
              label="Loading"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={clickable}
                  onChange={(e) => setClickable(e.target.checked)}
                />
              }
              label="Clickable"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={showImage}
                  onChange={(e) => setShowImage(e.target.checked)}
                />
              }
              label="Show Image"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={showActions}
                  onChange={(e) => setShowActions(e.target.checked)}
                />
              }
              label="Show Actions"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  // ==============================================
  // RENDER DEMO CARDS
  // ==============================================

  const renderMainDemo = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        Demo Card - Tùy chỉnh
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <WSCard
            variant={variant}
            size={size}
            loading={loading}
            clickable={clickable}
            {...(showImage && { image: sampleImage, imageAlt: 'Demo watch' })}
            title="Đồng hồ Rolex Submariner"
            subtitle="Luxury Swiss Watch"
            description="Đồng hồ cao cấp với thiết kế tinh tế và chất lượng vượt trội. Được chế tác từ những vật liệu tốt nhất với độ chính xác cao."
            actions={showActions ? sampleActions : []}
            {...(clickable && { onClick: handleCardClick })}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Cấu hình hiện tại:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2">
              <strong>Variant:</strong> {variant}
            </Typography>
            <Typography variant="body2">
              <strong>Size:</strong> {size}
            </Typography>
            <Typography variant="body2">
              <strong>Loading:</strong> {loading ? 'true' : 'false'}
            </Typography>
            <Typography variant="body2">
              <strong>Clickable:</strong> {clickable ? 'true' : 'false'}
            </Typography>
            <Typography variant="body2">
              <strong>Image:</strong> {showImage ? 'visible' : 'hidden'}
            </Typography>
            <Typography variant="body2">
              <strong>Actions:</strong> {showActions ? 'visible' : 'hidden'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderEcommerceExamples = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🛒 E-commerce Examples
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Product Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <WSCard
            variant="elevation"
            size="medium"
            clickable
            image="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=300&fit=crop"
            imageAlt="Omega watch"
            title="Omega Speedmaster"
            subtitle="42.000.000 VNĐ"
            description="Đồng hồ chuyên nghiệp với thiết kế thể thao và độ chính xác cao."
            actions={[
              {
                label: 'Mua ngay',
                onClick: () => handleAsyncAction('Mua hàng'),
                color: 'primary',
                variant: 'contained',
                startIcon: <ShoppingCartIcon />,
              },
              {
                label: 'Yêu thích',
                onClick: () => handleAsyncAction('Thêm vào wishlist'),
                color: 'error',
                variant: 'outlined',
                startIcon: <FavoriteIcon />,
              },
            ]}
            onClick={() => alert('Xem chi tiết sản phẩm')}
          />
        </Grid>

        {/* Category Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <WSCard
            variant="outlined"
            size="medium"
            clickable
            image="https://images.unsplash.com/photo-1509048191080-d2e2678e3449?w=400&h=300&fit=crop"
            imageAlt="Luxury watches"
            title="Luxury Collection"
            subtitle="Bộ sưu tập cao cấp"
            description="Khám phá bộ sưu tập đồng hồ cao cấp từ các thương hiệu nổi tiếng thế giới."
            actions={[
              {
                label: 'Khám phá',
                onClick: () => alert('Chuyển đến danh mục'),
                color: 'secondary',
                variant: 'contained',
              },
            ]}
            onClick={() => alert('Xem danh mục luxury')}
          />
        </Grid>

        {/* Stats Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <WSCard
            variant="elevation"
            size="medium"
            title="Thống kê bán hàng"
            subtitle="Tháng này"
          >
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                1,247
              </Typography>
              <Typography variant="h6" gutterBottom>
                Sản phẩm đã bán
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  mt: 2,
                }}
              >
                <TrendingUpIcon color="success" />
                <Typography variant="body2" color="success.main">
                  +12% so với tháng trước
                </Typography>
              </Box>
            </Box>
          </WSCard>
        </Grid>

        {/* Review Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <WSCard
            variant="outlined"
            size="small"
            title="Đánh giá khách hàng"
            subtitle="Nguyễn Văn A - 2 ngày trước"
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    sx={{ color: 'warning.main', fontSize: 16 }}
                  />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                "Sản phẩm rất chất lượng, giao hàng nhanh. Đồng hồ đẹp và chính
                xác. Tôi rất hài lòng với dịch vụ của cửa hàng."
              </Typography>
            </Box>
          </WSCard>
        </Grid>

        {/* Promotion Card */}
        <Grid size={{ xs: 12, md: 6 }}>
          <WSCard
            variant="elevation"
            size="small"
            clickable
            title="🎉 Khuyến mãi đặc biệt"
            subtitle="Giảm giá lên đến 30%"
            description="Áp dụng cho tất cả sản phẩm trong tuần này. Cơ hội không thể bỏ lỡ!"
            actions={[
              {
                label: 'Mua ngay',
                onClick: () => alert('Chuyển đến trang khuyến mãi'),
                color: 'warning',
                variant: 'contained',
              },
            ]}
            onClick={() => alert('Xem chi tiết khuyến mãi')}
          />
        </Grid>
      </Grid>
    </Paper>
  );

  const renderVariantComparison = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        📋 Variant & Size Comparison
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Variants */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Variants
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <WSCard
                variant="elevation"
                size="medium"
                title="Elevation Variant"
                description="Card với shadow elevation, tạo cảm giác nổi lên từ background."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <WSCard
                variant="outlined"
                size="medium"
                title="Outlined Variant"
                description="Card với border outline, style tối giản và clean."
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Sizes */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Sizes
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <WSCard
                variant="elevation"
                size="small"
                title="Small Size"
                description="Kích thước nhỏ gọn, phù hợp cho sidebar hoặc summary cards."
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <WSCard
                variant="elevation"
                size="medium"
                title="Medium Size"
                description="Kích thước tiêu chuẩn, phù hợp cho hầu hết các use cases."
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <WSCard
                variant="elevation"
                size="large"
                title="Large Size"
                description="Kích thước lớn với nhiều không gian, phù hợp cho featured content."
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderLoadingStates = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        ⏳ Loading States
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Loading với image
          </Typography>
          <WSCard
            variant="elevation"
            size="medium"
            loading={true}
            image={sampleImage}
            title="Product Loading"
            description="Loading description"
            actions={sampleActions}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Loading chỉ text
          </Typography>
          <WSCard
            variant="outlined"
            size="medium"
            loading={true}
            title="Text Loading"
            subtitle="Subtitle loading"
            description="Description loading content here"
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Loading custom content
          </Typography>
          <WSCard variant="elevation" size="medium" loading={true}>
            <Typography variant="h6">Custom Content</Typography>
            <Typography variant="body2">
              Custom loading content will show skeleton automatically.
            </Typography>
          </WSCard>
        </Grid>
      </Grid>
    </Paper>
  );

  // ==============================================
  // RENDER COMPONENT
  // ==============================================

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: BRAND_COLORS.primary,
            mb: 2,
          }}
        >
          WSCard Component Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Thành phần Card đơn giản với 2 variant chính cho e-commerce
        </Typography>
        <Divider
          sx={{
            width: '100px',
            mx: 'auto',
            bgcolor: BRAND_COLORS.secondary,
            height: 3,
          }}
        />
      </Box>

      {/* Simplified Notice */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body2">
          <strong>Phiên bản đơn giản:</strong> WSCard đã được tối ưu với 2
          variant (elevation, outlined), 3 size (small, medium, large) và tập
          trung vào tính năng thiết yếu cho e-commerce cards.
        </Typography>
      </Alert>

      {/* Controls */}
      {renderControls()}

      {/* Main Demo */}
      {renderMainDemo()}

      {/* E-commerce Examples */}
      {renderEcommerceExamples()}

      {/* Variant & Size Comparison */}
      {renderVariantComparison()}

      {/* Loading States */}
      {renderLoadingStates()}

      {/* Usage Example */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Cách sử dụng WSCard
        </Typography>
        <Box
          sx={{
            p: 2,
            bgcolor: 'grey.100',
            borderRadius: 1,
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
          <pre>{`// Basic card
<WSCard title="Product Name" description="Description" />

// Product card với image và actions
<WSCard
  variant="elevation"
  size="medium"
  image="/product.jpg"
  title="Đồng hồ Rolex"
  subtitle="Luxury Watch"
  description="Mô tả sản phẩm..."
  actions={[
    {
      label: "Mua ngay",
      onClick: handleBuy,
      color: "primary",
      variant: "contained",
      startIcon: <ShoppingCartIcon />
    }
  ]}
  clickable
  onClick={handleProductClick}
/>

// Loading card
<WSCard loading title="Loading..." description="Loading..." />`}</pre>
        </Box>
      </Paper>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          WSCard - WatchStore Design System Component (Simplified Version)
        </Typography>
      </Box>
    </Container>
  );
}
