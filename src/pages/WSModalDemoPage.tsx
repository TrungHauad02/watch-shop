/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Stack,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Save as SaveIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import WSButton from '@/components/WSButton';
import WSInput from '@/components/WSInput';
import WSModal from '@/components/WSModal';
import {
  WSModalSize,
  WSModalVariant,
} from '@/components/WSModal/WSModal.types';
import { BRAND_COLORS } from '@/styles/colors';

export default function WSModalDemoPage() {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  // Modal open states
  const [modals, setModals] = useState({
    basic: false,
    confirmation: false,
    form: false,
    loading: false,
    productDetail: false,
    deleteProduct: false,
    addToCart: false,
    feedback: false,
  });

  // Demo settings
  const [demoSettings, setDemoSettings] = useState({
    size: 'medium' as WSModalSize,
    variant: 'default' as WSModalVariant,
    showCloseButton: true,
    closable: true,
  });

  // Form data
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    productDescription: '',
    customerName: '',
    customerEmail: '',
    feedback: '',
  });

  // Loading states
  const [loadingStates, setLoadingStates] = useState({
    saving: false,
    deleting: false,
    processing: false,
  });

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  const openModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: keyof typeof modals) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const handleDemoSettingChange = (setting: string, value: any) => {
    setDemoSettings((prev) => ({ ...prev, [setting]: value }));
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Simulate async operations
  const simulateAsyncOperation = async (operation: string, duration = 2000) => {
    setLoadingStates((prev) => ({ ...prev, [operation]: true }));
    await new Promise((resolve) => setTimeout(resolve, duration));
    setLoadingStates((prev) => ({ ...prev, [operation]: false }));
  };

  const handleSaveProduct = async () => {
    await simulateAsyncOperation('saving');
    alert('Product saved successfully!');
    closeModal('form');
  };

  const handleDeleteProduct = async () => {
    await simulateAsyncOperation('deleting');
    alert('Product deleted successfully!');
    closeModal('deleteProduct');
  };

  const handleAddToCart = async () => {
    await simulateAsyncOperation('processing');
    alert('Product added to cart!');
    closeModal('addToCart');
  };

  // ==============================================
  // RENDER SECTIONS
  // ==============================================

  const renderControls = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Demo Controls
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Size Control */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Size</InputLabel>
            <Select
              value={demoSettings.size}
              label="Size"
              onChange={(e) => handleDemoSettingChange('size', e.target.value)}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
              <MenuItem value="fullscreen">Fullscreen</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Variant Control */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Variant</InputLabel>
            <Select
              value={demoSettings.variant}
              label="Variant"
              onChange={(e) =>
                handleDemoSettingChange('variant', e.target.value)
              }
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="confirmation">Confirmation</MenuItem>
              <MenuItem value="form">Form</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Boolean Controls */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack direction="row" spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={demoSettings.showCloseButton}
                  onChange={(e) =>
                    handleDemoSettingChange('showCloseButton', e.target.checked)
                  }
                />
              }
              label="Show Close Button"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={demoSettings.closable}
                  onChange={(e) =>
                    handleDemoSettingChange('closable', e.target.checked)
                  }
                />
              }
              label="Closable"
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderBasicExamples = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        📋 Basic Modal Examples
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <WSButton
            fullWidth
            variant="contained"
            onClick={() => openModal('basic')}
            startIcon={<InfoIcon />}
          >
            Basic Modal
          </WSButton>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <WSButton
            fullWidth
            variant="outlined"
            color="warning"
            onClick={() => openModal('confirmation')}
            startIcon={<WarningIcon />}
          >
            Confirmation
          </WSButton>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <WSButton
            fullWidth
            variant="contained"
            color="success"
            onClick={() => openModal('form')}
            startIcon={<SaveIcon />}
          >
            Form Modal
          </WSButton>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <WSButton
            fullWidth
            variant="text"
            onClick={() => openModal('loading')}
          >
            Loading Modal
          </WSButton>
        </Grid>
      </Grid>

      {/* Basic Modal */}
      <WSModal
        open={modals.basic}
        onClose={() => closeModal('basic')}
        size={demoSettings.size}
        variant={demoSettings.variant}
        showCloseButton={demoSettings.showCloseButton}
        closable={demoSettings.closable}
        title="Basic Modal"
        subtitle="This is a basic modal example"
      >
        <Typography variant="body1" paragraph>
          This is a basic modal with customizable size and variant. You can use
          it to display information, collect user input, or show confirmations.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Modal size: {demoSettings.size} | Variant: {demoSettings.variant}
        </Typography>
      </WSModal>

      {/* Confirmation Modal */}
      <WSModal
        open={modals.confirmation}
        onClose={() => closeModal('confirmation')}
        size="small"
        variant="confirmation"
        title="Confirm Action"
        subtitle="This action cannot be undone"
        actions={[
          {
            label: 'Cancel',
            onClick: () => closeModal('confirmation'),
            variant: 'outlined',
            color: 'secondary',
          },
          {
            label: 'Confirm',
            onClick: () => {
              alert('Action confirmed!');
              closeModal('confirmation');
            },
            variant: 'contained',
            color: 'warning',
            startIcon: <CheckCircleIcon />,
          },
        ]}
      >
        <Typography variant="body1">
          Are you sure you want to proceed with this action? This cannot be
          reversed.
        </Typography>
      </WSModal>

      {/* Form Modal */}
      <WSModal
        open={modals.form}
        onClose={() => closeModal('form')}
        size={demoSettings.size}
        variant="form"
        title="Add New Product"
        subtitle="Fill in the product details"
        actions={[
          {
            label: 'Cancel',
            onClick: () => closeModal('form'),
            variant: 'text',
            color: 'secondary',
          },
          {
            label: 'Save Product',
            onClick: handleSaveProduct,
            variant: 'contained',
            color: 'success',
            startIcon: <SaveIcon />,
            loading: loadingStates.saving,
          },
        ]}
      >
        <Stack spacing={2}>
          <WSInput
            label="Product Name"
            placeholder="Enter product name..."
            value={formData.productName}
            onChange={(e) => handleFormChange('productName', e.target.value)}
            required
          />
          <WSInput
            label="Price (VNĐ)"
            type="number"
            placeholder="0"
            value={formData.productPrice}
            onChange={(e) => handleFormChange('productPrice', e.target.value)}
            required
          />
          <WSInput
            label="Description"
            multiline
            rows={4}
            placeholder="Product description..."
            value={formData.productDescription}
            onChange={(e) =>
              handleFormChange('productDescription', e.target.value)
            }
            showCharacterCount
            maxCharacters={500}
          />
        </Stack>
      </WSModal>

      {/* Loading Modal */}
      <WSModal
        open={modals.loading}
        onClose={() => closeModal('loading')}
        size="small"
        title="Processing..."
        loading={true}
        closable={false}
      >
        <Typography variant="body1" textAlign="center">
          Please wait while we process your request.
        </Typography>
      </WSModal>
    </Paper>
  );

  const renderEcommerceExamples = () => (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🛒 E-commerce Modal Examples
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <WSButton
            fullWidth
            variant="contained"
            onClick={() => openModal('productDetail')}
            startIcon={<InfoIcon />}
          >
            Product Detail
          </WSButton>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <WSButton
            fullWidth
            variant="contained"
            color="error"
            onClick={() => openModal('deleteProduct')}
            startIcon={<DeleteIcon />}
          >
            Delete Product
          </WSButton>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <WSButton
            fullWidth
            variant="contained"
            color="success"
            onClick={() => openModal('addToCart')}
            startIcon={<ShoppingCartIcon />}
          >
            Add to Cart
          </WSButton>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <WSButton
            fullWidth
            variant="outlined"
            onClick={() => openModal('feedback')}
            startIcon={<FavoriteIcon />}
          >
            Customer Feedback
          </WSButton>
        </Grid>
      </Grid>

      {/* Product Detail Modal */}
      <WSModal
        open={modals.productDetail}
        onClose={() => closeModal('productDetail')}
        size="large"
        title="Đồng hồ Rolex Submariner"
        subtitle="Luxury Swiss Watch - 42,000,000 VNĐ"
        actions={[
          {
            label: 'Add to Wishlist',
            onClick: () => {
              alert('Added to wishlist!');
              closeModal('productDetail');
            },
            variant: 'outlined',
            color: 'error',
            startIcon: <FavoriteIcon />,
          },
          {
            label: 'Add to Cart',
            onClick: () => {
              alert('Added to cart!');
              closeModal('productDetail');
            },
            variant: 'contained',
            color: 'primary',
            startIcon: <ShoppingCartIcon />,
          },
        ]}
      >
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                width: '100%',
                height: '300px',
                backgroundColor: 'grey.100',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Product Image
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2}>
              <Typography variant="h6">Product Details</Typography>
              <Typography variant="body2">
                <strong>Brand:</strong> Rolex
              </Typography>
              <Typography variant="body2">
                <strong>Model:</strong> Submariner Date
              </Typography>
              <Typography variant="body2">
                <strong>Case Size:</strong> 41mm
              </Typography>
              <Typography variant="body2">
                <strong>Movement:</strong> Automatic
              </Typography>
              <Typography variant="body2">
                <strong>Water Resistance:</strong> 300m
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                The Rolex Submariner is a legendary diving watch that combines
                functionality with luxury. Perfect for both underwater
                adventures and elegant occasions.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </WSModal>

      {/* Delete Product Modal */}
      <WSModal
        open={modals.deleteProduct}
        onClose={() => closeModal('deleteProduct')}
        size="small"
        variant="confirmation"
        title="Delete Product"
        subtitle="This action cannot be undone"
        actions={[
          {
            label: 'Cancel',
            onClick: () => closeModal('deleteProduct'),
            variant: 'outlined',
            color: 'secondary',
          },
          {
            label: 'Delete',
            onClick: handleDeleteProduct,
            variant: 'contained',
            color: 'error',
            startIcon: <DeleteIcon />,
            loading: loadingStates.deleting,
          },
        ]}
      >
        <Typography variant="body1" paragraph>
          Are you sure you want to delete this product? This action will:
        </Typography>
        <Box component="ul" sx={{ pl: 2, mb: 0 }}>
          <li>Remove the product from all categories</li>
          <li>Delete all product images and data</li>
          <li>Cancel any pending orders for this product</li>
        </Box>
      </WSModal>

      {/* Add to Cart Modal */}
      <WSModal
        open={modals.addToCart}
        onClose={() => closeModal('addToCart')}
        size="medium"
        title="Add to Cart"
        subtitle="Confirm product details"
        actions={[
          {
            label: 'Continue Shopping',
            onClick: () => closeModal('addToCart'),
            variant: 'text',
            color: 'secondary',
          },
          {
            label: 'Add to Cart',
            onClick: handleAddToCart,
            variant: 'contained',
            color: 'success',
            startIcon: <ShoppingCartIcon />,
            loading: loadingStates.processing,
          },
        ]}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <Box
              sx={{
                width: '100%',
                height: '120px',
                backgroundColor: 'grey.100',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption">Product Image</Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 8 }}>
            <Stack spacing={1}>
              <Typography variant="h6">Rolex Submariner</Typography>
              <Typography variant="body2" color="text.secondary">
                Model: 126610LN
              </Typography>
              <Typography variant="h6" color="primary">
                42,000,000 VNĐ
              </Typography>
              <WSInput
                type="number"
                label="Quantity"
                defaultValue="1"
                size="small"
                sx={{ maxWidth: '100px' }}
              />
            </Stack>
          </Grid>
        </Grid>
      </WSModal>

      {/* Customer Feedback Modal */}
      <WSModal
        open={modals.feedback}
        onClose={() => closeModal('feedback')}
        size="medium"
        variant="form"
        title="Customer Feedback"
        subtitle="We value your opinion"
        actions={[
          {
            label: 'Skip',
            onClick: () => closeModal('feedback'),
            variant: 'text',
            color: 'secondary',
          },
          {
            label: 'Submit Feedback',
            onClick: () => {
              alert('Thank you for your feedback!');
              closeModal('feedback');
            },
            variant: 'contained',
            color: 'primary',
          },
        ]}
      >
        <Stack spacing={2}>
          <WSInput
            label="Your Name"
            placeholder="Enter your name..."
            value={formData.customerName}
            onChange={(e) => handleFormChange('customerName', e.target.value)}
            required
          />
          <WSInput
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={formData.customerEmail}
            onChange={(e) => handleFormChange('customerEmail', e.target.value)}
            required
          />
          <WSInput
            label="Feedback"
            multiline
            rows={4}
            placeholder="Tell us about your experience..."
            value={formData.feedback}
            onChange={(e) => handleFormChange('feedback', e.target.value)}
            showCharacterCount
            maxCharacters={1000}
            helperText="Your feedback helps us improve our service"
          />
        </Stack>
      </WSModal>
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
          WSModal Component Demo
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Modal component đơn giản với 4 sizes và 3 variants cho e-commerce
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
          <strong>Component đơn giản:</strong> WSModal được thiết kế với 4 sizes
          (small, medium, large, fullscreen), 3 variants (default, confirmation,
          form) và tập trung vào use cases e-commerce.
        </Typography>
      </Alert>

      {/* Controls */}
      {renderControls()}

      {/* Basic Examples */}
      {renderBasicExamples()}

      {/* E-commerce Examples */}
      {renderEcommerceExamples()}

      {/* Usage Example */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Cách sử dụng WSModal
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
          <pre>{`// Basic modal
<WSModal
  open={isOpen}
  onClose={handleClose}
  title="Modal Title"
  subtitle="Optional subtitle"
>
  <Typography>Modal content here</Typography>
</WSModal>

// Confirmation modal với actions
<WSModal
  open={showConfirm}
  onClose={handleClose}
  size="small"
  variant="confirmation"
  title="Confirm Delete"
  actions={[
    {
      label: 'Cancel',
      onClick: handleClose,
      variant: 'outlined'
    },
    {
      label: 'Delete',
      onClick: handleDelete,
      variant: 'contained',
      color: 'error',
      loading: isDeleting
    }
  ]}
>
  <Typography>Are you sure?</Typography>
</WSModal>

// Form modal
<WSModal
  open={showForm}
  onClose={handleClose}
  size="medium"
  variant="form"
  title="Add Product"
  actions={[
    {
      label: 'Save',
      onClick: handleSave,
      variant: 'contained',
      autoClose: true
    }
  ]}
>
  <Stack spacing={2}>
    <WSInput label="Name" />
    <WSInput label="Price" type="number" />
  </Stack>
</WSModal>`}</pre>
        </Box>
      </Paper>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          WSModal - WatchStore Design System Component
        </Typography>
      </Box>
    </Container>
  );
}
