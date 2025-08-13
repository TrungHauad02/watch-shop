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
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  PlayArrow as PlayArrowIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import WSCard from '@/components/WSCard';
import {
  WSCardVariant,
  WSCardSize,
  WSCardShape,
  WSCardHoverEffect,
} from '@/components/WSCard/WSCard.types';
import { BRAND_COLORS } from '@/styles/colors';

export default function WSCardDemoPage() {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [variant, setVariant] = useState<WSCardVariant>('elevation');
  const [size, setSize] = useState<WSCardSize>('medium');
  const [shape, setShape] = useState<WSCardShape>('rounded');
  const [hoverEffect, setHoverEffect] = useState<WSCardHoverEffect>('lift');
  const [loading, setLoading] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [selected, setSelected] = useState(false);
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
      label: 'Chỉnh sửa',
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

  const handleCardSelect = (isSelected: boolean) => {
    setSelected(isSelected);
    console.log('Card selected:', isSelected);
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
              <MenuItem value="filled">Filled</MenuItem>
              <MenuItem value="gradient">Gradient</MenuItem>
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

        {/* Shape */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Shape</InputLabel>
            <Select
              value={shape}
              label="Shape"
              onChange={(e) => setShape(e.target.value as WSCardShape)}
            >
              <MenuItem value="rounded">Rounded</MenuItem>
              <MenuItem value="square">Square</MenuItem>
              <MenuItem value="circular">Circular</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Hover Effect */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Hover Effect</InputLabel>
            <Select
              value={hoverEffect}
              label="Hover Effect"
              onChange={(e) =>
                setHoverEffect(e.target.value as WSCardHoverEffect)
              }
            >
              <MenuItem value="lift">Lift</MenuItem>
              <MenuItem value="glow">Glow</MenuItem>
              <MenuItem value="scale">Scale</MenuItem>
              <MenuItem value="border">Border</MenuItem>
              <MenuItem value="none">None</MenuItem>
            </Select>
          </FormControl>
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
                  checked={selectable}
                  onChange={(e) => setSelectable(e.target.checked)}
                />
              }
              label="Selectable"
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

  const renderDemoCards = () => (
    <Grid container spacing={4}>
      {/* Main Demo Card */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Demo Card - Tùy chỉnh
          </Typography>
          <WSCard
            variant={variant}
            size={size}
            shape={shape}
            hoverEffect={hoverEffect}
            loading={loading}
            clickable={clickable}
            selectable={selectable}
            selected={selected}
            image={showImage ? sampleImage : ''}
            imageAlt="Demo watch"
            title="Đồng hồ Rolex Submariner"
            subtitle="Luxury Swiss Watch"
            description="Đồng hồ cao cấp với thiết kế tinh tế và chất lượng vượt trội. Được chế tác từ những vật liệu tốt nhất với độ chính xác cao."
            actions={showActions ? sampleActions : []}
            onClick={clickable ? handleCardClick : () => {}}
            onSelect={selectable ? handleCardSelect : () => {}}
          />
        </Box>
      </Grid>

      {/* Product Card Example */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Product Card Example
          </Typography>
          <WSCard
            variant="elevation"
            size="medium"
            hoverEffect="lift"
            clickable
            image="https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=400&h=300&fit=crop"
            imageAlt="Luxury watch"
            title="Omega Speedmaster"
            subtitle="42.000.000 VNĐ"
            headerActions={
              <Box sx={{ display: 'flex', gap: 1 }}>
                <FavoriteIcon
                  sx={{ color: 'text.secondary', cursor: 'pointer' }}
                />
                <ShareIcon
                  sx={{ color: 'text.secondary', cursor: 'pointer' }}
                />
              </Box>
            }
            actions={[
              {
                label: 'Thêm vào giỏ',
                onClick: () => alert('Đã thêm vào giỏ hàng'),
                color: 'primary',
                variant: 'contained',
              },
              {
                label: 'Yêu thích',
                onClick: () => alert('Đã thêm vào danh sách yêu thích'),
                color: 'secondary',
                variant: 'outlined',
                startIcon: <FavoriteIcon />,
              },
            ]}
            onClick={() => alert('Xem chi tiết sản phẩm')}
          />
        </Box>
      </Grid>

      {/* Custom Content Card */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Custom Content Card
          </Typography>
          <WSCard
            variant="gradient"
            size="large"
            hoverEffect="glow"
            title="Video hướng dẫn"
            headerActions={<PlayArrowIcon sx={{ color: 'primary.main' }} />}
          >
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <PlayArrowIcon
                sx={{ fontSize: 60, color: 'primary.main', mb: 2 }}
              />
              <Typography variant="h6" gutterBottom>
                Cách chăm sóc đồng hồ
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Video hướng dẫn chi tiết về cách bảo quản và chăm sóc đồng hồ để
                giữ được độ bền lâu dài.
              </Typography>
            </Box>
          </WSCard>
        </Box>
      </Grid>

      {/* Stats Card */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Stats Card
          </Typography>
          <WSCard
            variant="outlined"
            size="medium"
            hoverEffect="border"
            padding="large"
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h3" color="primary.main" fontWeight="bold">
                1,247
              </Typography>
              <Typography variant="h6" gutterBottom>
                Sản phẩm đã bán
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Trong tháng này
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Typography variant="caption" color="success.main">
                  ↗ +12%
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  so với tháng trước
                </Typography>
              </Box>
            </Box>
          </WSCard>
        </Box>
      </Grid>

      {/* Loading Card Example */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Loading State
          </Typography>
          <WSCard
            variant="elevation"
            size="medium"
            loading={true}
            image={sampleImage}
            title="Đang tải..."
            description="Nội dung đang được tải..."
            actions={sampleActions}
          />
        </Box>
      </Grid>

      {/* Minimal Card */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box>
          <Typography variant="h6" gutterBottom>
            Minimal Card
          </Typography>
          <WSCard
            variant="filled"
            size="small"
            padding="small"
            contentSpacing="compact"
            showDivider={false}
          >
            <Typography variant="body2">
              Card tối giản với ít padding và không có divider.
            </Typography>
          </WSCard>
        </Box>
      </Grid>
    </Grid>
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
          Thành phần Card tùy chỉnh với nhiều tính năng và hiệu ứng
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

      {/* Controls */}
      {renderControls()}

      {/* Demo Cards */}
      {renderDemoCards()}

      {/* Selected State Info */}
      {selectable && (
        <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="body1">
            <strong>Trạng thái selected:</strong>{' '}
            {selected ? 'Đã chọn' : 'Chưa chọn'}
          </Typography>
        </Box>
      )}
    </Container>
  );
}
