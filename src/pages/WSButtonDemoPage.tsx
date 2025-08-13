import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  Add,
  Delete,
  Edit,
  Save,
  Download,
  Share,
  ArrowForward,
  Search,
  Login,
  AccountCircle,
  Refresh,
} from '@mui/icons-material';
import WSButton from '@/components/WSButton';
import { BRAND_COLORS } from '@/styles/colors';

export default function WSButtonDemoPage() {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  const [loadingStates, setLoadingStates] = useState({
    addToCart: false,
    download: false,
    save: false,
    login: false,
  });

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  // Simulate async operations
  const handleAsyncAction = async (action: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [action]: true }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingStates((prev) => ({ ...prev, [action]: false }));
  };

  const handleSyncAction = (actionName: string) => {
    console.log(`${actionName} clicked!`);
    alert(`${actionName} action executed!`);
  };

  // ==============================================
  // RENDER SECTIONS
  // ==============================================

  const renderBasicVariants = () => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🎨 Variants
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Các variant chính
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <WSButton variant="contained">Contained</WSButton>
            <WSButton variant="outlined">Outlined</WSButton>
            <WSButton variant="text">Text</WSButton>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Màu sắc
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <WSButton color="primary" size="small">
              Primary
            </WSButton>
            <WSButton color="secondary" size="small">
              Secondary
            </WSButton>
            <WSButton color="success" size="small">
              Success
            </WSButton>
            <WSButton color="warning" size="small">
              Warning
            </WSButton>
            <WSButton color="error" size="small">
              Error
            </WSButton>
            <WSButton color="info" size="small">
              Info
            </WSButton>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Kích thước
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <WSButton size="small">Small</WSButton>
            <WSButton size="medium">Medium</WSButton>
            <WSButton size="large">Large</WSButton>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );

  const renderIconsAndInteractions = () => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🔧 Icons & Interactions
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Buttons với icons
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <WSButton
                startIcon={<ShoppingCart />}
                onClick={() => handleSyncAction('Add to Cart')}
              >
                Add to Cart
              </WSButton>
              <WSButton
                startIcon={<Favorite />}
                color="error"
                variant="outlined"
                onClick={() => handleSyncAction('Add to Wishlist')}
              >
                Wishlist
              </WSButton>
            </Stack>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <WSButton
                endIcon={<ArrowForward />}
                variant="text"
                onClick={() => handleSyncAction('Continue')}
              >
                Continue
              </WSButton>
              <WSButton
                startIcon={<Search />}
                endIcon={<ArrowForward />}
                color="info"
                onClick={() => handleSyncAction('Search and Go')}
              >
                Search & Go
              </WSButton>
            </Stack>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Disabled states
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <WSButton disabled>Disabled</WSButton>
            <WSButton disabled variant="outlined">
              Disabled Outlined
            </WSButton>
            <WSButton disabled variant="text">
              Disabled Text
            </WSButton>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Full width buttons
          </Typography>
          <Stack spacing={1}>
            <WSButton fullWidth startIcon={<Save />} color="success">
              Save Changes (Full Width)
            </WSButton>
            <WSButton
              fullWidth
              variant="outlined"
              startIcon={<Refresh />}
              onClick={() => handleSyncAction('Reset')}
            >
              Reset Form
            </WSButton>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );

  const renderLoadingStates = () => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        ⏳ Loading States
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Async actions với loading
          </Typography>
          <Stack spacing={2}>
            <WSButton
              loading={loadingStates.addToCart}
              loadingText="Đang thêm vào giỏ..."
              startIcon={<ShoppingCart />}
              onClick={() => handleAsyncAction('addToCart')}
              fullWidth
              size="large"
            >
              Add to Cart - $299
            </WSButton>

            <Stack direction="row" spacing={2}>
              <WSButton
                loading={loadingStates.download}
                startIcon={<Download />}
                onClick={() => handleAsyncAction('download')}
                variant="outlined"
                color="info"
              >
                Download
              </WSButton>

              <WSButton
                loading={loadingStates.save}
                loadingText="Saving..."
                startIcon={<Save />}
                onClick={() => handleAsyncAction('save')}
                color="success"
              >
                Save File
              </WSButton>
            </Stack>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Loading với custom text
          </Typography>
          <WSButton
            loading={loadingStates.login}
            loadingText="Đang đăng nhập..."
            startIcon={<Login />}
            onClick={() => handleAsyncAction('login')}
            color="primary"
            fullWidth
          >
            Sign In
          </WSButton>
        </Box>
      </Stack>
    </Paper>
  );

  const renderLinksAndForms = () => (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🔗 Links & Forms
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Button as links
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <WSButton
              href="https://mui.com"
              target="_blank"
              endIcon={<ArrowForward />}
              variant="outlined"
              color="info"
            >
              External Link
            </WSButton>
            <WSButton href="/products" startIcon={<Search />} variant="text">
              View Products
            </WSButton>
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            Form buttons
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <WSButton type="submit" color="primary">
              Submit Form
            </WSButton>
            <WSButton type="reset" variant="outlined" color="warning">
              Reset Form
            </WSButton>
            <WSButton type="button" variant="text">
              Cancel
            </WSButton>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );

  const renderEcommerceExamples = () => (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🛒 E-commerce Use Cases
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Product Actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Product Actions
          </Typography>
          <Stack spacing={2}>
            <WSButton
              fullWidth
              size="large"
              startIcon={<ShoppingCart />}
              color="primary"
              onClick={() => handleSyncAction('Add to Cart $299')}
            >
              Add to Cart - $299
            </WSButton>

            <Stack direction="row" spacing={1}>
              <WSButton
                fullWidth
                startIcon={<Favorite />}
                color="error"
                variant="outlined"
                onClick={() => handleSyncAction('Add to Wishlist')}
              >
                Wishlist
              </WSButton>

              <WSButton
                startIcon={<Share />}
                variant="text"
                color="info"
                onClick={() => handleSyncAction('Share Product')}
              >
                Share
              </WSButton>
            </Stack>
          </Stack>
        </Grid>

        {/* Auth Actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Auth Actions
          </Typography>
          <Stack spacing={2}>
            <WSButton
              fullWidth
              startIcon={<Login />}
              color="primary"
              onClick={() => handleSyncAction('Sign In')}
            >
              Sign In
            </WSButton>

            <WSButton
              fullWidth
              startIcon={<AccountCircle />}
              variant="outlined"
              color="secondary"
              onClick={() => handleSyncAction('Create Account')}
            >
              Create Account
            </WSButton>

            <WSButton
              fullWidth
              variant="text"
              onClick={() => handleSyncAction('Forgot Password')}
            >
              Forgot Password?
            </WSButton>
          </Stack>
        </Grid>

        {/* Admin Actions */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Admin Actions
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1}>
              <WSButton
                size="small"
                startIcon={<Edit />}
                color="warning"
                onClick={() => handleSyncAction('Edit')}
              >
                Edit
              </WSButton>

              <WSButton
                size="small"
                startIcon={<Delete />}
                color="error"
                variant="outlined"
                onClick={() => handleSyncAction('Delete')}
              >
                Delete
              </WSButton>

              <WSButton
                size="small"
                startIcon={<Add />}
                color="success"
                onClick={() => handleSyncAction('Add New')}
              >
                Add
              </WSButton>
            </Stack>

            <WSButton
              fullWidth
              startIcon={<Save />}
              color="success"
              variant="contained"
              onClick={() => handleSyncAction('Save All Changes')}
            >
              Save Changes
            </WSButton>
          </Stack>
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
          gutterBottom
          sx={{
            fontWeight: 700,
            color: BRAND_COLORS.primary,
            mb: 2,
          }}
        >
          WSButton Component Demo
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
        >
          WatchStore button component đơn giản với 3 variant chính
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
          <strong>Phiên bản đơn giản:</strong> WSButton đã được tối ưu với 3
          variant (contained, outlined, text), 3 size (small, medium, large) và
          6 màu chính. Tập trung vào tính năng thiết yếu cho e-commerce.
        </Typography>
      </Alert>

      <Grid container spacing={4}>
        {/* Basic Variants */}
        <Grid size={{ xs: 12, md: 6 }}>{renderBasicVariants()}</Grid>

        {/* Icons & Interactions */}
        <Grid size={{ xs: 12, md: 6 }}>{renderIconsAndInteractions()}</Grid>

        {/* Loading States */}
        <Grid size={{ xs: 12, md: 6 }}>{renderLoadingStates()}</Grid>

        {/* Links & Forms */}
        <Grid size={{ xs: 12, md: 6 }}>{renderLinksAndForms()}</Grid>

        {/* E-commerce Examples */}
        <Grid size={{ xs: 12 }}>{renderEcommerceExamples()}</Grid>
      </Grid>

      {/* Usage Example */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Cách sử dụng WSButton
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
          <pre>{`// Basic usage
<WSButton>Click me</WSButton>

// With variant and color
<WSButton variant="outlined" color="secondary">
  Secondary Button
</WSButton>

// With loading state
<WSButton 
  loading={isLoading} 
  loadingText="Processing..."
  onClick={handleAsyncAction}
>
  Submit
</WSButton>

// With icons
<WSButton 
  startIcon={<SaveIcon />} 
  color="success"
  onClick={handleSave}
>
  Save
</WSButton>

// As link
<WSButton href="/products" variant="text">
  View Products
</WSButton>`}</pre>
        </Box>
      </Paper>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          WSButton - WatchStore Design System Component (Simplified Version)
        </Typography>
      </Box>
    </Container>
  );
}
