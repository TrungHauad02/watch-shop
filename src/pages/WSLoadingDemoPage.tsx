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
  Slider,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  CloudDownload as CloudDownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import WSLoading from '@/components/WSLoading';
import {
  WSLoadingVariant,
  WSLoadingSize,
  WSLoadingColor,
} from '@/components/WSLoading/WSLoading.types';
import { BRAND_COLORS } from '@/styles/colors';

export default function WSLoadingDemoPage() {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [variant, setVariant] = useState<WSLoadingVariant>('spinner');
  const [size, setSize] = useState<WSLoadingSize>('medium');
  const [color, setColor] = useState<WSLoadingColor>('primary');
  const [loading, setLoading] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [progress, setProgress] = useState(65);

  // Demo loading states
  const [apiLoading, setApiLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileUploading, setFileUploading] = useState(false);

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const handleApiCall = async () => {
    setApiLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setApiLoading(false);
  };

  const handleCardLoad = async () => {
    setCardLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setCardLoading(false);
  };

  const handleFileUpload = async () => {
    setFileUploading(true);
    setFileUploadProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      setFileUploadProgress(i);
    }

    setFileUploading(false);
  };

  const resetDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
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
              onChange={(e) => setVariant(e.target.value as WSLoadingVariant)}
            >
              <MenuItem value="spinner">Spinner</MenuItem>
              <MenuItem value="dots">Dots</MenuItem>
              <MenuItem value="pulse">Pulse</MenuItem>
              <MenuItem value="circular">Circular</MenuItem>
              <MenuItem value="linear">Linear</MenuItem>
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
              onChange={(e) => setSize(e.target.value as WSLoadingSize)}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Color */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Color</InputLabel>
            <Select
              value={color}
              label="Color"
              onChange={(e) => setColor(e.target.value as WSLoadingColor)}
            >
              <MenuItem value="primary">Primary</MenuItem>
              <MenuItem value="secondary">Secondary</MenuItem>
              <MenuItem value="success">Success</MenuItem>
              <MenuItem value="warning">Warning</MenuItem>
              <MenuItem value="error">Error</MenuItem>
              <MenuItem value="info">Info</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Reset Button */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Button
            variant="outlined"
            onClick={resetDemo}
            startIcon={<RefreshIcon />}
            fullWidth
            sx={{ height: '56px' }}
          >
            Reset Demo
          </Button>
        </Grid>

        {/* Progress Slider - Only for circular/linear */}
        {(variant === 'circular' || variant === 'linear') && (
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography gutterBottom>Progress: {progress}%</Typography>
            <Slider
              value={progress}
              onChange={(_, value) => setProgress(value as number)}
              min={0}
              max={100}
            />
          </Grid>
        )}

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
                  checked={fullScreen}
                  onChange={(e) => setFullScreen(e.target.checked)}
                />
              }
              label="Full Screen"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={backdrop}
                  onChange={(e) => setBackdrop(e.target.checked)}
                />
              }
              label="Backdrop"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={showMessage}
                  onChange={(e) => setShowMessage(e.target.checked)}
                />
              }
              label="Show Message"
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  // ==============================================
  // RENDER DEMO SECTIONS
  // ==============================================

  const renderMainDemo = () => (
    <Grid container spacing={4}>
      {/* Main Demo */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper sx={{ p: 3, position: 'relative', minHeight: '300px' }}>
          <Typography variant="h6" gutterBottom>
            Demo chính - Tùy chỉnh
          </Typography>

          <WSLoading
            variant={variant}
            size={size}
            color={color}
            loading={loading}
            fullScreen={fullScreen}
            backdrop={backdrop}
            {...(showMessage && { message: 'Đang tải dữ liệu...' })}
            {...((variant === 'circular' || variant === 'linear') && {
              progress,
            })}
          />

          {!loading && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="success.main">
                ✓ Nội dung đã được tải thành công!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Demo loading hoàn tất với cấu hình: {variant} - {size} - {color}
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>

      {/* Variant Examples */}
      <Grid size={{ xs: 12, lg: 6 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Tất cả các variant
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 6, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, minHeight: '80px' }}>
                <WSLoading variant="spinner" size="medium" color="primary" />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Spinner
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 6, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, minHeight: '80px' }}>
                <WSLoading variant="dots" size="medium" color="secondary" />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Dots
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 6, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, minHeight: '80px' }}>
                <WSLoading variant="pulse" size="medium" color="success" />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Pulse
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 6, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, minHeight: '80px' }}>
                <WSLoading variant="circular" size="medium" color="warning" />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Circular
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 6, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, minHeight: '80px' }}>
                <WSLoading
                  variant="linear"
                  size="medium"
                  color="error"
                  width="100px"
                />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Linear
                </Typography>
              </Box>
            </Grid>

            <Grid size={{ xs: 6, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2, minHeight: '80px' }}>
                <WSLoading
                  variant="circular"
                  size="medium"
                  color="info"
                  progress={75}
                />
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Progress 75%
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );

  const renderSizeComparison = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        So sánh kích thước
      </Typography>

      <Grid container spacing={4} sx={{ textAlign: 'center' }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="subtitle2" gutterBottom>
            Small
          </Typography>
          <WSLoading variant="spinner" size="small" color="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="subtitle2" gutterBottom>
            Medium
          </Typography>
          <WSLoading variant="spinner" size="medium" color="primary" />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography variant="subtitle2" gutterBottom>
            Large
          </Typography>
          <WSLoading variant="spinner" size="large" color="primary" />
        </Grid>
      </Grid>
    </Paper>
  );

  const renderPracticalExamples = () => (
    <Grid container spacing={4}>
      {/* API Call Loading */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              API Call Loading
            </Typography>
            <Button
              variant="contained"
              onClick={handleApiCall}
              disabled={apiLoading}
              fullWidth
              sx={{ mb: 2 }}
            >
              {apiLoading ? 'Đang gọi API...' : 'Gọi API'}
            </Button>

            <Box sx={{ position: 'relative', minHeight: '100px' }}>
              <WSLoading
                loading={apiLoading}
                variant="circular"
                message="Đang tải dữ liệu từ server..."
                backdrop
              />

              {!apiLoading && (
                <Typography variant="body2" color="text.secondary">
                  Dữ liệu API đã được tải thành công! Thông tin được hiển thị ở
                  đây.
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Card Content Loading */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Card Loading
            </Typography>
            <Button
              variant="outlined"
              onClick={handleCardLoad}
              disabled={cardLoading}
              fullWidth
              sx={{ mb: 2 }}
            >
              {cardLoading ? 'Đang tải...' : 'Tải nội dung'}
            </Button>

            <Box sx={{ position: 'relative', minHeight: '120px' }}>
              <WSLoading
                loading={cardLoading}
                variant="dots"
                message="Đang tải nội dung..."
                size="large"
                color="secondary"
              />

              {!cardLoading && (
                <Box>
                  <Typography variant="body1" gutterBottom>
                    Tiêu đề nội dung
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Đây là nội dung mẫu đã được tải hoàn tất. Lorem ipsum dolor
                    sit amet consectetur adipiscing elit.
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* File Upload Progress */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              File Upload Progress
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFileUpload}
              disabled={fileUploading}
              fullWidth
              sx={{ mb: 2 }}
              startIcon={<CloudDownloadIcon />}
            >
              {fileUploading
                ? `Uploading ${fileUploadProgress}%`
                : 'Upload File'}
            </Button>

            <WSLoading
              loading={fileUploading}
              variant="linear"
              progress={fileUploadProgress}
              message={`Đang upload... ${fileUploadProgress}%`}
              width="100%"
              color="success"
            />

            {!fileUploading && fileUploadProgress === 100 && (
              <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                ✓ File đã được upload thành công!
              </Typography>
            )}
          </CardContent>
        </Card>
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
          WSLoading Component Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Thành phần Loading đơn giản với 5 variant cốt lõi
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

      {/* Main Demo */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Demo Chính
        </Typography>
        {renderMainDemo()}
      </Box>

      {/* Size Comparison */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          So sánh kích thước
        </Typography>
        {renderSizeComparison()}
      </Box>

      {/* Practical Examples */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          Ví dụ Thực tế
        </Typography>
        {renderPracticalExamples()}
      </Box>

      {/* Current Settings Info */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'background.default' }}>
        <Typography variant="h6" gutterBottom>
          Cấu hình hiện tại
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2">
              <strong>Variant:</strong> {variant}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2">
              <strong>Size:</strong> {size}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2">
              <strong>Color:</strong> {color}
            </Typography>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Typography variant="body2">
              <strong>Loading:</strong> {loading ? 'true' : 'false'}
            </Typography>
          </Grid>
        </Grid>

        {/* Usage Example */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
          <Typography variant="subtitle2" gutterBottom>
            Cách sử dụng:
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
          >
            {`<WSLoading
  variant="${variant}"
  size="${size}"
  color="${color}"
  loading={${loading}}${showMessage ? '\n  message="Đang tải dữ liệu..."' : ''}${variant === 'circular' || variant === 'linear' ? `\n  progress={${progress}}` : ''}${fullScreen ? '\n  fullScreen' : ''}${backdrop ? '\n  backdrop' : ''}
/>`}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
