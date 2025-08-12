import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Stack,
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
} from '@mui/icons-material';
import WSButton from '@components/WSButton';
import { BRAND_COLORS } from '../styles/colors';

const WSButtonDemoPage: React.FC = () => {
  const [loadingStates, setLoadingStates] = React.useState({
    addToCart: false,
    download: false,
    save: false,
  });

  // Simulate async operations
  const handleAsyncAction = async (action: keyof typeof loadingStates) => {
    setLoadingStates((prev) => ({ ...prev, [action]: true }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoadingStates((prev) => ({ ...prev, [action]: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          WatchStore luxury button component với Rich Black + Vivid Yellow theme
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Basic Variants */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: BRAND_COLORS.primary }}
            >
              🎨 Variants
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Standard Variants
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <WSButton variant="contained">Contained</WSButton>
                  <WSButton variant="outlined">Outlined</WSButton>
                  <WSButton variant="text">Text</WSButton>
                  <WSButton variant="gradient">Gradient</WSButton>
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Colors
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <WSButton color="primary" size="small">
                    Primary
                  </WSButton>
                  <WSButton color="secondary" size="small">
                    Secondary
                  </WSButton>
                  <WSButton color="accent" size="small">
                    Accent
                  </WSButton>
                  <WSButton color="success" size="small">
                    Success
                  </WSButton>
                  <WSButton color="error" size="small">
                    Error
                  </WSButton>
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Sizes
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <WSButton size="small">Small</WSButton>
                  <WSButton size="medium">Medium</WSButton>
                  <WSButton size="large">Large</WSButton>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Shapes & Icons */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: BRAND_COLORS.primary }}
            >
              ⭕ Shapes & Icons
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Button Shapes
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <WSButton shape="rounded">Rounded</WSButton>
                  <WSButton shape="square">Square</WSButton>
                  <WSButton
                    shape="circular"
                    startIcon={<Add />}
                    aria-label="Add item"
                  />
                  <WSButton
                    shape="circular"
                    startIcon={<Edit />}
                    color="accent"
                    size="large"
                    aria-label="Edit item"
                  />
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  With Icons
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={2}>
                    <WSButton startIcon={<ShoppingCart />}>
                      Add to Cart
                    </WSButton>
                    <WSButton
                      startIcon={<Favorite />}
                      color="error"
                      variant="outlined"
                    >
                      Wishlist
                    </WSButton>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <WSButton endIcon={<ArrowForward />} variant="text">
                      Continue
                    </WSButton>
                    <WSButton
                      startIcon={<Download />}
                      endIcon={<ArrowForward />}
                    >
                      Download & Go
                    </WSButton>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Loading States */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: BRAND_COLORS.primary }}
            >
              ⏳ Loading States
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Loading Positions
                </Typography>
                <Stack spacing={1}>
                  <WSButton
                    loading={loadingStates.addToCart}
                    loadingText="Adding to cart..."
                    loadingPosition="center"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAsyncAction('addToCart')}
                    fullWidth
                  >
                    Add to Cart (Center Loading)
                  </WSButton>

                  <Stack direction="row" spacing={2}>
                    <WSButton
                      loading={loadingStates.download}
                      loadingPosition="start"
                      startIcon={<Download />}
                      onClick={() => handleAsyncAction('download')}
                      variant="outlined"
                    >
                      Download
                    </WSButton>

                    <WSButton
                      loading={loadingStates.save}
                      loadingPosition="end"
                      endIcon={<Save />}
                      onClick={() => handleAsyncAction('save')}
                      color="success"
                    >
                      Save
                    </WSButton>
                  </Stack>
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Disabled States
                </Typography>
                <Stack direction="row" spacing={2}>
                  <WSButton disabled>Disabled</WSButton>
                  <WSButton disabled variant="outlined">
                    Disabled Outlined
                  </WSButton>
                  <WSButton disabled variant="text">
                    Disabled Text
                  </WSButton>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Hover Effects */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: BRAND_COLORS.primary }}
            >
              ✨ Hover Effects
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Stack spacing={2}>
              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  Animation Effects (Hover to see)
                </Typography>
                <Stack spacing={1}>
                  <Stack direction="row" spacing={2}>
                    <WSButton hoverEffect="lift">Lift Effect</WSButton>
                    <WSButton hoverEffect="scale" color="accent">
                      Scale Effect
                    </WSButton>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <WSButton hoverEffect="glow" color="secondary">
                      Glow Effect
                    </WSButton>
                    <WSButton hoverEffect="none" variant="outlined">
                      No Effect
                    </WSButton>
                  </Stack>
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  color="text.secondary"
                >
                  As Links
                </Typography>
                <Stack direction="row" spacing={2}>
                  <WSButton
                    href="https://mui.com"
                    target="_blank"
                    endIcon={<ArrowForward />}
                    variant="outlined"
                  >
                    External Link
                  </WSButton>
                  <WSButton href="/products" startIcon={<Search />}>
                    Internal Link
                  </WSButton>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* E-commerce Examples */}
        <Grid size={{ xs: 12 }}>
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
                    variant="gradient"
                  >
                    Add to Cart - $299
                  </WSButton>

                  <Stack direction="row" spacing={1}>
                    <WSButton
                      fullWidth
                      startIcon={<Favorite />}
                      color="error"
                      variant="outlined"
                    >
                      Wishlist
                    </WSButton>

                    <WSButton startIcon={<Share />} variant="text" color="info">
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
                  <WSButton fullWidth startIcon={<Login />} color="primary">
                    Sign In
                  </WSButton>

                  <WSButton
                    fullWidth
                    startIcon={<AccountCircle />}
                    variant="outlined"
                  >
                    Create Account
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
                    <WSButton size="small" startIcon={<Edit />} color="accent">
                      Edit
                    </WSButton>

                    <WSButton
                      size="small"
                      startIcon={<Delete />}
                      color="error"
                      variant="outlined"
                    >
                      Delete
                    </WSButton>

                    <WSButton
                      shape="circular"
                      size="small"
                      startIcon={<Add />}
                      color="success"
                      aria-label="Add new item"
                    />
                  </Stack>

                  <WSButton
                    fullWidth
                    startIcon={<Save />}
                    color="success"
                    variant="contained"
                  >
                    Save Changes
                  </WSButton>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          WSButton - WatchStore Design System Component
        </Typography>
      </Box>
    </Container>
  );
};

export default WSButtonDemoPage;
