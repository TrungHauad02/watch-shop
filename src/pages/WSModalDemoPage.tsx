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
  Warning as WarningIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Info as InfoIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { WSModal, WSButton, WSInput, WSFormField } from '@/components';

export default function WSModalDemoPage() {
  // Modal states
  const [basicModal, setBasicModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [fullscreenModal, setFullscreenModal] = useState(false);
  const [customModal, setCustomModal] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  // Simulate async operations
  const simulateAsyncOperation = () => {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, 2000);
    });
  };

  const handleDeleteProduct = async () => {
    await simulateAsyncOperation();
    alert('Sản phẩm đã được xóa!');
  };

  const handleSaveProduct = async () => {
    await simulateAsyncOperation();
    alert('Sản phẩm đã được lưu!');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        WSModal Component Demo
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Comprehensive demo of WSModal sizes, variants, animations and features
      </Typography>

      <Grid container spacing={4}>
        {/* === BASIC MODALS === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🎨 Modal Sizes & Basic Usage
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Small, Medium, Large, và Fullscreen sizes
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 2 }}>
              <WSButton onClick={() => setBasicModal(true)}>
                Small Modal
              </WSButton>

              <WSButton onClick={() => setFormModal(true)} color="secondary">
                Medium Modal (Form)
              </WSButton>

              <WSButton onClick={() => setCustomModal(true)} color="success">
                Large Modal
              </WSButton>

              <WSButton onClick={() => setFullscreenModal(true)} color="info">
                Fullscreen Modal
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === MODAL VARIANTS === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🎭 Modal Variants
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Default, Confirmation, và Form variants với styling khác nhau
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 2 }}>
              <WSButton variant="outlined" onClick={() => setBasicModal(true)}>
                Default Modal
              </WSButton>

              <WSButton
                variant="outlined"
                color="warning"
                onClick={() => setConfirmModal(true)}
                startIcon={<WarningIcon />}
              >
                Confirmation Modal
              </WSButton>

              <WSButton
                variant="outlined"
                color="info"
                onClick={() => setFormModal(true)}
                startIcon={<SaveIcon />}
              >
                Form Modal
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === LOADING STATES === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🔄 Loading States & Async Actions
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Modal với loading overlay và async button actions
            </Typography>

            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mt: 2 }}>
              <WSButton
                onClick={() => setLoadingModal(true)}
                startIcon={<SettingsIcon />}
              >
                Loading Modal
              </WSButton>

              <WSButton
                color="error"
                onClick={() => setConfirmModal(true)}
                startIcon={<DeleteIcon />}
              >
                Async Delete Action
              </WSButton>
            </Stack>
          </Paper>
        </Grid>

        {/* === ADVANCED FEATURES === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              ⚙️ Advanced Features
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Custom content, styling, và complex interactions
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Features Showcase:
              </Typography>
              <ul>
                <li>✨ Smooth animations với backdrop blur</li>
                <li>📱 Responsive design (desktop → mobile bottom sheet)</li>
                <li>🎨 Theme integration (dark/light mode)</li>
                <li>♿ Accessibility support (ARIA, keyboard navigation)</li>
                <li>🔄 Async action handling với loading states</li>
                <li>🎭 Multiple variants với visual indicators</li>
                <li>📏 Flexible sizing system</li>
                <li>🔒 Body scroll lock khi modal mở</li>
              </ul>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* === MODAL IMPLEMENTATIONS === */}

      {/* BASIC MODAL - Small Size */}
      <WSModal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        size="small"
        title="Thông báo"
        content="Đây là một modal cơ bản với kích thước nhỏ. Animation mượt mà và responsive."
        actions={[
          {
            label: 'Đóng',
            onClick: () => setBasicModal(false),
            variant: 'outlined',
          },
          {
            label: 'OK',
            onClick: () => setBasicModal(false),
            color: 'primary',
          },
        ]}
      />

      {/* CONFIRMATION MODAL - Warning Variant */}
      <WSModal
        open={confirmModal}
        onClose={() => setConfirmModal(false)}
        variant="confirmation"
        title="Xác nhận xóa sản phẩm"
        subtitle="Hành động này không thể hoàn tác"
        content="Sản phẩm sẽ bị xóa vĩnh viễn khỏi hệ thống. Bạn có chắc chắn muốn tiếp tục?"
        actions={[
          {
            label: 'Hủy',
            onClick: () => setConfirmModal(false),
            variant: 'outlined',
          },
          {
            label: 'Xóa sản phẩm',
            onClick: handleDeleteProduct,
            color: 'error',
            startIcon: <DeleteIcon />,
            autoClose: true,
          },
        ]}
      />

      {/* FORM MODAL - Medium Size */}
      <WSModal
        open={formModal}
        onClose={() => setFormModal(false)}
        variant="form"
        size="medium"
        title="Thêm sản phẩm mới"
        subtitle="Điền thông tin sản phẩm"
        actions={[
          {
            label: 'Hủy',
            onClick: () => setFormModal(false),
            variant: 'text',
          },
          {
            label: 'Lưu sản phẩm',
            onClick: handleSaveProduct,
            color: 'success',
            startIcon: <SaveIcon />,
            autoClose: true,
          },
        ]}
      >
        <Stack spacing={3}>
          <WSFormField label="Tên sản phẩm" required>
            <WSInput
              placeholder="Nhập tên sản phẩm..."
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </WSFormField>

          <WSFormField label="Email liên hệ">
            <WSInput
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </WSFormField>

          <WSFormField label="Mô tả sản phẩm">
            <WSInput
              multiline
              rows={4}
              placeholder="Mô tả chi tiết về sản phẩm..."
              maxCharacters={500}
              showCharacterCount
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </WSFormField>
        </Stack>
      </WSModal>

      {/* LOADING MODAL */}
      <WSModal
        open={loadingModal}
        onClose={() => setLoadingModal(false)}
        title="Đang xử lý"
        content="Vui lòng đợi trong khi hệ thống xử lý yêu cầu của bạn..."
        loading
        closable={false}
        showCloseButton={false}
      />

      {/* FULLSCREEN MODAL */}
      <WSModal
        open={fullscreenModal}
        onClose={() => setFullscreenModal(false)}
        size="fullscreen"
        title="Fullscreen Modal"
        subtitle="Modal toàn màn hình với nhiều nội dung"
        actions={[
          {
            label: 'Đóng',
            onClick: () => setFullscreenModal(false),
            variant: 'outlined',
          },
        ]}
      >
        <Box sx={{ py: 4 }}>
          <Typography variant="h6" gutterBottom>
            Nội dung fullscreen
          </Typography>
          <Typography variant="body1" paragraph>
            Modal fullscreen phù hợp cho:
          </Typography>
          <ul>
            <li>📊 Dashboards và analytics</li>
            <li>📝 Form phức tạp với nhiều sections</li>
            <li>📱 Mobile-first experiences</li>
            <li>🖼️ Media galleries</li>
            <li>⚙️ Settings và configuration panels</li>
          </ul>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Demo Content
          </Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h6">Item {item}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Demo content item
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </WSModal>

      {/* CUSTOM CONTENT MODAL - Large Size */}
      <WSModal
        open={customModal}
        onClose={() => setCustomModal(false)}
        size="large"
        title="Large Modal với Custom Content"
        subtitle="Showcase nhiều components và layouts"
        actions={[
          {
            label: 'Export',
            onClick: () => alert('Export functionality'),
            variant: 'outlined',
            startIcon: <SaveIcon />,
          },
          {
            label: 'Thêm mới',
            onClick: () => alert('Add new functionality'),
            color: 'success',
            startIcon: <AddIcon />,
          },
          {
            label: 'Đóng',
            onClick: () => setCustomModal(false),
            variant: 'text',
          },
        ]}
      >
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>
              📊 Demo Statistics
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  <Typography variant="h4">1,234</Typography>
                  <Typography variant="body2">Total Products</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'success.main',
                    color: 'success.contrastText',
                  }}
                >
                  <Typography variant="h4">567</Typography>
                  <Typography variant="body2">Active Users</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'warning.main',
                    color: 'warning.contrastText',
                  }}
                >
                  <Typography variant="h4">89</Typography>
                  <Typography variant="body2">Pending Orders</Typography>
                </Paper>
              </Grid>
              <Grid size={{ xs: 6, md: 3 }}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    bgcolor: 'error.main',
                    color: 'error.contrastText',
                  }}
                >
                  <Typography variant="h4">12</Typography>
                  <Typography variant="body2">Issues</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>
              🔧 Quick Actions
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              <WSButton size="small" startIcon={<AddIcon />}>
                Add Product
              </WSButton>
              <WSButton size="small" color="secondary" startIcon={<InfoIcon />}>
                View Reports
              </WSButton>
              <WSButton
                size="small"
                color="warning"
                startIcon={<WarningIcon />}
              >
                Check Issues
              </WSButton>
              <WSButton size="small" color="error" startIcon={<DeleteIcon />}>
                Bulk Delete
              </WSButton>
            </Stack>
          </Box>

          <Divider />

          <Box>
            <Typography variant="h6" gutterBottom>
              📝 Quick Form
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <WSFormField label="Search">
                  <WSInput placeholder="Search products..." />
                </WSFormField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <WSFormField label="Category">
                  <WSInput placeholder="Select category..." />
                </WSFormField>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </WSModal>

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
            {`import { WSModal } from '@/components';

// Basic modal
<WSModal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Thông báo"
  content="Nội dung modal"
/>

// Confirmation modal
<WSModal
  open={showConfirm}
  onClose={() => setShowConfirm(false)}
  variant="confirmation"
  title="Xác nhận xóa"
  content="Bạn có chắc chắn muốn xóa?"
  actions={[
    {
      label: "Hủy",
      onClick: () => setShowConfirm(false),
      variant: "outlined"
    },
    {
      label: "Xóa",
      onClick: async () => await deleteItem(),
      color: "error",
      autoClose: true
    }
  ]}
/>

// Form modal với custom content
<WSModal
  open={showForm}
  onClose={() => setShowForm(false)}
  variant="form"
  size="large"
  title="Thêm sản phẩm"
>
  <ProductForm onSubmit={handleSubmit} />
</WSModal>`}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
