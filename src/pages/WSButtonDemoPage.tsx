import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Stack,
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Send as SendIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { WSButton } from '@/components';

export default function WSButtonDemoPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Simulate async operation
  const handleAsyncAction = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleAsyncClick = async () => {
    // This will automatically show loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('Async operation completed!');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        WSButton Component Demo
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Comprehensive demo of WSButton variants, sizes, colors and features
      </Typography>

      <Grid container spacing={4}>
        {/* === VARIANTS DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🎨 Button Variants
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Contained, Outlined, and Text variants with primary color
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <WSButton variant="contained" color="primary">
                Contained
              </WSButton>
              <WSButton variant="outlined" color="primary">
                Outlined
              </WSButton>
              <WSButton variant="text" color="primary">
                Text
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === SIZES DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📏 Button Sizes
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Small, Medium, and Large sizes
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <WSButton size="small" variant="contained">
                Small
              </WSButton>
              <WSButton size="medium" variant="contained">
                Medium
              </WSButton>
              <WSButton size="large" variant="contained">
                Large
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === COLORS DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🌈 Color Variants
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              All available color options for contained buttons
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSButton fullWidth color="primary">
                  Primary
                </WSButton>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSButton fullWidth color="secondary">
                  Secondary
                </WSButton>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSButton fullWidth color="success">
                  Success
                </WSButton>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSButton fullWidth color="warning">
                  Warning
                </WSButton>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSButton fullWidth color="error">
                  Error
                </WSButton>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSButton fullWidth color="info">
                  Info
                </WSButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* === ICONS DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🎯 Buttons with Icons
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Start icons, end icons, and different combinations
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 2 }}>
              <WSButton startIcon={<SaveIcon />} color="success">
                Save
              </WSButton>
              <WSButton startIcon={<DeleteIcon />} color="error">
                Delete
              </WSButton>
              <WSButton endIcon={<SendIcon />} color="primary">
                Send
              </WSButton>
              <WSButton startIcon={<AddIcon />} variant="outlined">
                Add New
              </WSButton>
              <WSButton
                startIcon={<DownloadIcon />}
                endIcon={<FavoriteIcon />}
                variant="text"
                color="secondary"
              >
                Download & Like
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === LOADING STATES DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🔄 Loading States
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Manual loading control and automatic async loading
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 2 }}>
              <WSButton
                loading={isLoading}
                onClick={handleAsyncAction}
                color="primary"
              >
                Manual Loading
              </WSButton>

              <WSButton
                loading={isLoading}
                loadingText="Saving..."
                startIcon={<SaveIcon />}
                color="success"
              >
                Save with Custom Text
              </WSButton>

              <WSButton
                onClick={handleAsyncClick}
                startIcon={<SendIcon />}
                color="secondary"
              >
                Auto Loading (Async)
              </WSButton>

              <WSButton loading variant="outlined" color="info">
                Always Loading
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === STATES DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🚫 Button States
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Disabled and various interactive states
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 2 }}>
              <WSButton disabled>Disabled</WSButton>
              <WSButton disabled variant="outlined">
                Disabled Outlined
              </WSButton>
              <WSButton disabled variant="text">
                Disabled Text
              </WSButton>
              <WSButton disabled startIcon={<SaveIcon />}>
                Disabled with Icon
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === LINK BUTTONS DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🔗 Link Buttons
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Buttons that act as links
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 2 }}>
              <WSButton href="/products" variant="contained" color="primary">
                View Products
              </WSButton>

              <WSButton
                href="https://example.com"
                target="_blank"
                variant="outlined"
                endIcon={<SendIcon />}
              >
                External Link
              </WSButton>

              <WSButton href="#demo" variant="text" color="secondary">
                Anchor Link
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === FULL WIDTH DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📐 Full Width Buttons
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Buttons that span the full width of their container
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
              <WSButton
                fullWidth
                size="large"
                startIcon={<AddIcon />}
                color="primary"
              >
                Add to Cart
              </WSButton>

              <WSButton
                fullWidth
                variant="outlined"
                startIcon={<FavoriteIcon />}
                color="secondary"
              >
                Add to Wishlist
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === FORM DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📋 Form Integration
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Buttons in form context with different types
            </Typography>

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                alert('Form submitted!');
              }}
              sx={{ mt: 2 }}
            >
              <Stack direction="row" spacing={2}>
                <WSButton
                  type="submit"
                  startIcon={<SaveIcon />}
                  color="success"
                >
                  Submit Form
                </WSButton>

                <WSButton type="reset" variant="outlined" color="warning">
                  Reset
                </WSButton>

                <WSButton
                  type="button"
                  variant="text"
                  color="error"
                  onClick={() => alert('Cancel clicked')}
                >
                  Cancel
                </WSButton>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* === USAGE EXAMPLES === */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 Usage Examples
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Basic Usage:
          </Typography>
          <Box
            component="pre"
            sx={{
              backgroundColor: 'grey.100',
              p: 2,
              borderRadius: 1,
              overflow: 'auto',
              fontSize: '0.875rem',
            }}
          >
            {`import { WSButton } from '@/components';

// Basic button
<WSButton>Click me</WSButton>

// With loading
<WSButton loading loadingText="Saving...">
  Save
</WSButton>

// With async handler (auto loading)
<WSButton onClick={async () => {
  await saveData();
}}>
  Save Data
</WSButton>

// With icons
<WSButton 
  startIcon={<SaveIcon />} 
  color="success"
  variant="contained"
>
  Save
</WSButton>`}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
