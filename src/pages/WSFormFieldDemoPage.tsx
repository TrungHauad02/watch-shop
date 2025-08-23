import { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  AttachMoney as MoneyIcon,
  Description as DescriptionIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { WSFormField, WSInput } from '@/components';

export default function WSFormFieldDemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    price: '',
    description: '',
    address: '',
    company: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      // Clear error khi user bắt đầu nhập
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: '',
        }));
      }
    };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        WSFormField Component Demo
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Flexible form layout component với separated labels
      </Typography>

      <Grid container spacing={4}>
        {/* === LABEL POSITIONS DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📐 Label Positions
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Top, Left, và Left-aligned label positions
            </Typography>

            <Stack spacing={3} sx={{ mt: 2 }}>
              {/* TOP POSITION */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  1. Top Position (Default)
                </Typography>
                <WSFormField label="Tên sản phẩm" labelPosition="top" required>
                  <WSInput
                    placeholder="Nhập tên sản phẩm..."
                    startIcon={<PersonIcon />}
                  />
                </WSFormField>
              </Box>

              {/* LEFT POSITION */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  2. Left Position (Space-between)
                </Typography>
                <WSFormField
                  label="Giá sản phẩm"
                  labelPosition="left"
                  labelWidth="120px"
                  required
                >
                  <WSInput
                    placeholder="0"
                    type="number"
                    startIcon={<MoneyIcon />}
                  />
                </WSFormField>
              </Box>

              {/* LEFT-ALIGNED POSITION */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  3. Left-aligned Position (Kề nhau)
                </Typography>
                <WSFormField
                  label="Email"
                  labelPosition="left-aligned"
                  labelWidth="80px"
                  required
                >
                  <WSInput
                    placeholder="example@email.com"
                    type="email"
                    startIcon={<EmailIcon />}
                  />
                </WSFormField>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* === SPACING DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📏 Spacing Options
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              None, Compact, Comfortable, và Spacious spacing
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Compact Spacing
                </Typography>
                <WSFormField
                  label="Tên"
                  spacing="compact"
                  helperText="Spacing nhỏ gọn"
                >
                  <WSInput placeholder="Compact..." size="small" />
                </WSFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Comfortable Spacing (Default)
                </Typography>
                <WSFormField
                  label="Tên"
                  spacing="comfortable"
                  helperText="Spacing chuẩn"
                >
                  <WSInput placeholder="Comfortable..." />
                </WSFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Spacious Spacing
                </Typography>
                <WSFormField
                  label="Tên"
                  spacing="spacious"
                  helperText="Spacing rộng rãi"
                >
                  <WSInput placeholder="Spacious..." size="large" />
                </WSFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Custom Spacing (16px)
                </Typography>
                <WSFormField
                  label="Tên"
                  spacing={16}
                  helperText="Custom 16px spacing"
                >
                  <WSInput placeholder="Custom..." />
                </WSFormField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* === VALIDATION STATES === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              ✅ Validation States
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Normal, Error, và Success states với helper text
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <WSFormField
                  label="Input bình thường"
                  helperText="Thông tin bổ sung"
                >
                  <WSInput placeholder="Normal state..." />
                </WSFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <WSFormField
                  label="Input lỗi"
                  error
                  helperText="Email không hợp lệ"
                  required
                >
                  <WSInput placeholder="error@example" type="email" error />
                </WSFormField>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <WSFormField
                  label="Input thành công"
                  success
                  helperText="Email hợp lệ"
                >
                  <WSInput
                    placeholder="success@example.com"
                    type="email"
                    success
                  />
                </WSFormField>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* === LABEL ALIGNMENT === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📍 Label Alignment
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Left, Right, và Center label alignment cho left layouts
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
              <WSFormField
                label="Left align"
                labelPosition="left"
                labelWidth="150px"
                labelAlign="left"
              >
                <WSInput placeholder="Label align left..." />
              </WSFormField>

              <WSFormField
                label="Center align"
                labelPosition="left"
                labelWidth="150px"
                labelAlign="center"
              >
                <WSInput placeholder="Label align center..." />
              </WSFormField>

              <WSFormField
                label="Right align"
                labelPosition="left"
                labelWidth="150px"
                labelAlign="right"
              >
                <WSInput placeholder="Label align right..." />
              </WSFormField>
            </Stack>
          </Paper>
        </Grid>

        {/* === COMPLEX FORM DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📋 Complex Form Layout Demo
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Sử dụng WSFormField để tạo form layout phức tạp
            </Typography>

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                if (validateForm()) {
                  alert('Form hợp lệ!\n\n' + JSON.stringify(formData, null, 2));
                }
              }}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={3}>
                {/* PERSONAL INFO SECTION */}
                <Grid size={{ xs: 12 }}>
                  <Typography variant="h6" gutterBottom>
                    Thông tin cá nhân
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <WSFormField
                    label="Họ và tên"
                    required
                    error={!!errors.name}
                    helperText={errors.name}
                  >
                    <WSInput
                      placeholder="Nhập họ và tên..."
                      startIcon={<PersonIcon />}
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      error={!!errors.name}
                    />
                  </WSFormField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <WSFormField
                    label="Email"
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  >
                    <WSInput
                      type="email"
                      placeholder="example@email.com"
                      startIcon={<EmailIcon />}
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      error={!!errors.email}
                    />
                  </WSFormField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <WSFormField
                    label="Số điện thoại"
                    labelPosition="left-aligned"
                    labelWidth="120px"
                  >
                    <WSInput
                      type="tel"
                      placeholder="0123456789"
                      startIcon={<PhoneIcon />}
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                    />
                  </WSFormField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <WSFormField
                    label="Công ty"
                    labelPosition="left-aligned"
                    labelWidth="120px"
                  >
                    <WSInput
                      placeholder="Tên công ty..."
                      startIcon={<BusinessIcon />}
                      value={formData.company}
                      onChange={handleInputChange('company')}
                    />
                  </WSFormField>
                </Grid>

                {/* PRODUCT INFO SECTION */}
                <Grid size={{ xs: 12 }}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Thông tin sản phẩm
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                  <WSFormField label="Địa chỉ" spacing="compact">
                    <WSInput
                      placeholder="Nhập địa chỉ..."
                      startIcon={<LocationIcon />}
                      value={formData.address}
                      onChange={handleInputChange('address')}
                    />
                  </WSFormField>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <WSFormField
                    label="Giá"
                    labelPosition="left"
                    labelWidth="60px"
                    spacing="compact"
                  >
                    <WSInput
                      type="number"
                      placeholder="0"
                      startIcon={<MoneyIcon />}
                      value={formData.price}
                      onChange={handleInputChange('price')}
                    />
                  </WSFormField>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <WSFormField
                    label="Mô tả sản phẩm"
                    spacing="spacious"
                    helperText="Mô tả chi tiết về sản phẩm (tối đa 500 ký tự)"
                  >
                    <WSInput
                      multiline
                      rows={4}
                      maxCharacters={500}
                      showCharacterCount
                      placeholder="Nhập mô tả chi tiết..."
                      startIcon={<DescriptionIcon />}
                      value={formData.description}
                      onChange={handleInputChange('description')}
                    />
                  </WSFormField>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#101820',
                    color: '#FEE715',
                    '&:hover': {
                      backgroundColor: '#050a0f',
                    },
                  }}
                >
                  Validate Form
                </Button>

                <Button
                  type="button"
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      price: '',
                      description: '',
                      address: '',
                      company: '',
                    });
                    setErrors({});
                  }}
                  sx={{
                    borderColor: '#101820',
                    color: '#101820',
                    '&:hover': {
                      borderColor: '#050a0f',
                      backgroundColor: '#10182005',
                    },
                  }}
                >
                  Reset Form
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* === COMPARISON WITH WSInput === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🔄 So sánh WSInput vs WSFormField
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Cùng một input nhưng khác nhau về label approach
            </Typography>

            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  WSInput (Integrated Label)
                </Typography>
                <Stack spacing={2}>
                  <WSInput
                    label="Tên sản phẩm"
                    placeholder="Integrated label..."
                    required
                    helperText="Label tích hợp trong input"
                  />

                  <WSInput
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    startIcon={<EmailIcon />}
                    helperText="Phù hợp cho form đơn giản"
                  />
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  WSFormField (Separated Label)
                </Typography>
                <Stack spacing={2}>
                  <WSFormField
                    label="Tên sản phẩm"
                    required
                    helperText="Label tách biệt, linh hoạt hơn"
                  >
                    <WSInput placeholder="Separated label..." />
                  </WSFormField>

                  <WSFormField
                    label="Email"
                    labelPosition="left"
                    labelWidth="80px"
                    helperText="Phù hợp cho layout phức tạp"
                  >
                    <WSInput
                      type="email"
                      placeholder="email@example.com"
                      startIcon={<EmailIcon />}
                    />
                  </WSFormField>
                </Stack>
              </Grid>
            </Grid>
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
            {`import { WSFormField, WSInput } from '@/components';

// Top label (default)
<WSFormField label="Tên sản phẩm" required>
  <WSInput placeholder="Nhập tên..." />
</WSFormField>

// Left aligned with custom width
<WSFormField 
  label="Giá" 
  labelPosition="left"
  labelWidth="100px"
>
  <WSInput type="number" placeholder="0" />
</WSFormField>

// With validation
<WSFormField 
  label="Email"
  error={hasError}
  helperText="Email không hợp lệ"
>
  <WSInput type="email" error={hasError} />
</WSFormField>

// Complex layout
<WSFormField 
  label="Mô tả"
  labelPosition="left-aligned"
  labelWidth="120px"
  spacing="spacious"
  success={isValid}
  helperText="Mô tả hợp lệ"
>
  <WSInput 
    multiline 
    rows={4}
    maxCharacters={500}
    showCharacterCount
  />
</WSFormField>`}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
