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
  Search as SearchIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import WSInput from '@/components/WSInput';

export default function WSInputDemoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    description: '',
    search: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      // Clear error when user starts typing
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

    if (!formData.password) {
      newErrors.password = 'Mật khẩu không được để trống';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        WSInput Component Demo
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Comprehensive demo of WSInput variants, sizes, colors and features
      </Typography>

      <Grid container spacing={4}>
        {/* === VARIANTS DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🎨 Input Variants
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Outlined và Filled variants
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  variant="outlined"
                  label="Outlined Input"
                  placeholder="Nhập text..."
                  startIcon={<PersonIcon />}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  variant="filled"
                  label="Filled Input"
                  placeholder="Nhập text..."
                  startIcon={<PersonIcon />}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* === SIZES DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📏 Input Sizes
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Small, Medium, và Large sizes
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
              <WSInput
                size="small"
                label="Small Input"
                placeholder="Kích thước nhỏ"
                startIcon={<SearchIcon />}
              />
              <WSInput
                size="medium"
                label="Medium Input"
                placeholder="Kích thước vừa"
                startIcon={<SearchIcon />}
              />
              <WSInput
                size="large"
                label="Large Input"
                placeholder="Kích thước lớn"
                startIcon={<SearchIcon />}
              />
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
              Tất cả màu sắc available
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSInput
                  color="primary"
                  label="Primary"
                  placeholder="Màu chính"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSInput
                  color="secondary"
                  label="Secondary"
                  placeholder="Màu phụ"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSInput
                  color="success"
                  label="Success"
                  placeholder="Màu thành công"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSInput
                  color="warning"
                  label="Warning"
                  placeholder="Màu cảnh báo"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSInput color="error" label="Error" placeholder="Màu lỗi" />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <WSInput
                  color="info"
                  label="Info"
                  placeholder="Màu thông tin"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* === INPUT TYPES DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              ⌨️ Input Types
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Các loại input khác nhau với icons phù hợp
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  type="text"
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  startIcon={<PersonIcon />}
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  type="email"
                  label="Email"
                  placeholder="example@email.com"
                  startIcon={<EmailIcon />}
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  type={showPassword ? 'text' : 'password'}
                  label="Mật khẩu"
                  placeholder="Nhập mật khẩu"
                  startIcon={<LockIcon />}
                  endIcon={
                    <Box
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Box>
                  }
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  type="tel"
                  label="Số điện thoại"
                  placeholder="0123456789"
                  startIcon={<PhoneIcon />}
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  type="search"
                  label="Tìm kiếm"
                  placeholder="Tìm kiếm sản phẩm..."
                  startIcon={<SearchIcon />}
                  value={formData.search}
                  onChange={handleInputChange('search')}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* === MULTILINE & CHARACTER COUNT === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📄 Multiline & Character Count
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Textarea với giới hạn ký tự và đếm ký tự
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  label="Mô tả ngắn"
                  multiline
                  rows={3}
                  maxCharacters={100}
                  showCharacterCount
                  placeholder="Nhập mô tả ngắn..."
                  startIcon={<DescriptionIcon />}
                  helperText="Mô tả ngắn về sản phẩm"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <WSInput
                  label="Mô tả chi tiết"
                  multiline
                  rows={4}
                  maxCharacters={500}
                  showCharacterCount
                  placeholder="Nhập mô tả chi tiết..."
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  helperText="Mô tả chi tiết về tính năng và đặc điểm"
                />
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
              Error, Success, và các trạng thái validation
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <WSInput
                  label="Input bình thường"
                  placeholder="Không có validation"
                  helperText="Trạng thái bình thường"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <WSInput
                  label="Input lỗi"
                  placeholder="Có lỗi"
                  error
                  helperText="Email không hợp lệ"
                  startIcon={<EmailIcon />}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <WSInput
                  label="Input thành công"
                  placeholder="Thành công"
                  success
                  helperText="Email hợp lệ"
                  startIcon={<EmailIcon />}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* === DISABLED & READONLY === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              🚫 Disabled & ReadOnly States
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Các trạng thái disabled và readonly
            </Typography>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <WSInput
                  label="Input disabled"
                  placeholder="Không thể nhập"
                  disabled
                  helperText="Input bị vô hiệu hóa"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <WSInput
                  label="Input readonly"
                  value="Giá trị chỉ đọc"
                  readOnly
                  helperText="Chỉ có thể đọc, không thể chỉnh sửa"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <WSInput
                  label="Input required"
                  placeholder="Bắt buộc nhập"
                  required
                  helperText="Trường bắt buộc"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* === FORM DEMO === */}
        <Grid size={{ xs: 12 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              📋 Form Integration Demo
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Form hoàn chỉnh với validation
            </Typography>

            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                if (validateForm()) {
                  alert(
                    'Form hợp lệ! Dữ liệu: ' + JSON.stringify(formData, null, 2)
                  );
                }
              }}
              sx={{ mt: 2 }}
            >
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <WSInput
                    label="Họ và tên *"
                    placeholder="Nhập họ và tên"
                    startIcon={<PersonIcon />}
                    value={formData.name}
                    onChange={handleInputChange('name')}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <WSInput
                    label="Email *"
                    type="email"
                    placeholder="example@email.com"
                    startIcon={<EmailIcon />}
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <WSInput
                    label="Ghi chú"
                    multiline
                    rows={3}
                    maxCharacters={200}
                    showCharacterCount
                    placeholder="Nhập ghi chú (tùy chọn)..."
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    helperText="Ghi chú thêm về đơn hàng"
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#101820',
                    color: '#FEE715',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Validate Form
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: '',
                      email: '',
                      password: '',
                      phone: '',
                      description: '',
                      search: '',
                    });
                    setErrors({});
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'transparent',
                    color: '#101820',
                    border: '2px solid #101820',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Reset Form
                </button>
              </Box>
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
            {`import { WSInput } from '@/components';

// Basic input
<WSInput label="Tên sản phẩm" />

// With validation
<WSInput
  label="Email"
  type="email"
  error={hasError}
  helperText="Email không hợp lệ"
  startIcon={<EmailIcon />}
/>

// Multiline with character count
<WSInput
  label="Mô tả"
  multiline
  rows={4}
  maxCharacters={500}
  showCharacterCount
  helperText="Mô tả chi tiết sản phẩm"
/>

// With success state
<WSInput
  label="Mật khẩu"
  type="password"
  success={isPasswordValid}
  helperText="Mật khẩu hợp lệ"
/>`}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
