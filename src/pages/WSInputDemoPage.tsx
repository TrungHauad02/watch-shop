/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Stack,
  Button,
  FormControlLabel,
  Switch,
  Alert,
  Chip,
} from '@mui/material';
import {
  Email,
  Lock,
  Search,
  Person,
  Phone,
  Visibility,
  VisibilityOff,
  AttachMoney,
  AccountCircle,
  ShoppingCart,
  Star,
  Refresh,
} from '@mui/icons-material';
import WSInput from '@/components/WSInput';
import { BRAND_COLORS } from '@/styles/colors';

export default function WSInputDemoPage() {
  // ==============================================
  // STATE MANAGEMENT
  // ==============================================

  // Form data state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    bio: '',
    amount: '',
    search: '',
    productName: '',
    productPrice: '',
  });

  // Demo settings
  const [demoSettings, setDemoSettings] = useState({
    showPasswords: false,
    readonly: false,
    disabled: false,
    showCharacterCount: true,
    variant: 'outlined' as const,
    size: 'medium' as const,
  });

  // Validation demo state
  const [validationDemo, setValidationDemo] = useState({
    emailError: false,
    passwordError: false,
    phoneSuccess: false,
  });

  // ==============================================
  // EVENT HANDLERS
  // ==============================================

  // Handle form data changes
  const handleInputChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));

      // Demo validation
      if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setValidationDemo((prev) => ({
          ...prev,
          emailError:
            event.target.value.length > 0 &&
            !emailRegex.test(event.target.value),
        }));
      }

      if (field === 'password') {
        setValidationDemo((prev) => ({
          ...prev,
          passwordError:
            event.target.value.length > 0 && event.target.value.length < 8,
        }));
      }

      if (field === 'phone') {
        const phoneRegex = /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/;
        setValidationDemo((prev) => ({
          ...prev,
          phoneSuccess: phoneRegex.test(event.target.value),
        }));
      }
    };

  // Handle demo settings
  const handleSettingChange =
    (setting: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDemoSettings((prev) => ({
        ...prev,
        [setting]: event.target.checked,
      }));
    };

  const handleSelectChange = (setting: string, value: any) => {
    setDemoSettings((prev) => ({
      ...prev,
      [setting]: value,
    }));
  };

  const resetDemo = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      bio: '',
      amount: '',
      search: '',
      productName: '',
      productPrice: '',
    });
    setValidationDemo({
      emailError: false,
      passwordError: false,
      phoneSuccess: false,
    });
  };

  // ==============================================
  // RENDER SECTIONS
  // ==============================================

  const renderControls = () => (
    <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🎛️ Demo Controls
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <Stack spacing={2}>
        {/* Variant Control */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Variant
          </Typography>
          <Stack direction="row" spacing={1}>
            {['outlined', 'filled'].map((variant) => (
              <Button
                key={variant}
                size="small"
                variant={
                  demoSettings.variant === variant ? 'contained' : 'outlined'
                }
                onClick={() => handleSelectChange('variant', variant)}
              >
                {variant}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Size Control */}
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Size
          </Typography>
          <Stack direction="row" spacing={1}>
            {['small', 'medium', 'large'].map((size) => (
              <Button
                key={size}
                size="small"
                variant={demoSettings.size === size ? 'contained' : 'outlined'}
                onClick={() => handleSelectChange('size', size)}
              >
                {size}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* Toggle Controls */}
        <Stack spacing={1}>
          <FormControlLabel
            control={
              <Switch
                checked={demoSettings.showPasswords}
                onChange={handleSettingChange('showPasswords')}
              />
            }
            label="Show Passwords"
          />

          <FormControlLabel
            control={
              <Switch
                checked={demoSettings.readonly}
                onChange={handleSettingChange('readonly')}
              />
            }
            label="Read Only"
          />

          <FormControlLabel
            control={
              <Switch
                checked={demoSettings.disabled}
                onChange={handleSettingChange('disabled')}
              />
            }
            label="Disabled"
          />

          <FormControlLabel
            control={
              <Switch
                checked={demoSettings.showCharacterCount}
                onChange={handleSettingChange('showCharacterCount')}
              />
            }
            label="Character Count"
          />
        </Stack>

        {/* Reset Button */}
        <Chip
          icon={<Refresh />}
          label="Reset Demo"
          onClick={resetDemo}
          color="secondary"
          variant="outlined"
          clickable
        />
      </Stack>
    </Paper>
  );

  const renderBasicVariants = () => (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🎨 Basic Variants & Colors
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Variants */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Variants
          </Typography>
          <Stack spacing={2}>
            <WSInput
              variant="outlined"
              label="Outlined Input"
              placeholder="Enter text..."
              size={demoSettings.size}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
            <WSInput
              variant="filled"
              label="Filled Input"
              placeholder="Enter text..."
              size={demoSettings.size}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
          </Stack>
        </Grid>

        {/* Colors */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Colors
          </Typography>
          <Stack spacing={2}>
            <WSInput
              variant={demoSettings.variant}
              color="primary"
              label="Primary Color"
              placeholder="Primary..."
              size={demoSettings.size}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
            <WSInput
              variant={demoSettings.variant}
              color="secondary"
              label="Secondary Color"
              placeholder="Secondary..."
              size={demoSettings.size}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
            <WSInput
              variant={demoSettings.variant}
              color="success"
              label="Success Color"
              placeholder="Success..."
              size={demoSettings.size}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderIconsAndValidation = () => (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        🔍 Icons & Validation
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Icons */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            With Icons
          </Typography>
          <Stack spacing={2}>
            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Search"
              placeholder="Search products..."
              startIcon={<Search />}
              value={formData.search}
              onChange={handleInputChange('search')}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Amount"
              placeholder="0.00"
              type="number"
              startIcon={<AttachMoney />}
              value={formData.amount}
              onChange={handleInputChange('amount')}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Password"
              type={demoSettings.showPasswords ? 'text' : 'password'}
              startIcon={<Lock />}
              endIcon={
                demoSettings.showPasswords ? <VisibilityOff /> : <Visibility />
              }
              value={formData.password}
              onChange={handleInputChange('password')}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
          </Stack>
        </Grid>

        {/* Validation States */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Validation States
          </Typography>
          <Stack spacing={2}>
            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Email"
              type="email"
              startIcon={<Email />}
              value={formData.email}
              onChange={handleInputChange('email')}
              error={validationDemo.emailError}
              helperText={
                validationDemo.emailError
                  ? 'Please enter a valid email address'
                  : 'Enter your email address'
              }
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Password"
              type={demoSettings.showPasswords ? 'text' : 'password'}
              startIcon={<Lock />}
              value={formData.password}
              onChange={handleInputChange('password')}
              error={validationDemo.passwordError}
              helperText={
                validationDemo.passwordError
                  ? 'Password must be at least 8 characters'
                  : 'Enter a secure password'
              }
              showCharacterCount={demoSettings.showCharacterCount}
              maxCharacters={50}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Phone Number"
              type="tel"
              startIcon={<Phone />}
              value={formData.phone}
              onChange={handleInputChange('phone')}
              success={validationDemo.phoneSuccess}
              helperText={
                validationDemo.phoneSuccess
                  ? '✓ Valid phone number'
                  : 'Enter your phone number (VN format)'
              }
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderFormExample = () => (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        📝 E-commerce Forms
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* User Registration */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            User Registration
          </Typography>
          <Stack spacing={2}>
            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="First Name"
              placeholder="John"
              startIcon={<Person />}
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              required
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Last Name"
              placeholder="Doe"
              startIcon={<AccountCircle />}
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              required
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              startIcon={<Email />}
              value={formData.email}
              onChange={handleInputChange('email')}
              error={validationDemo.emailError}
              helperText={
                validationDemo.emailError
                  ? 'Please enter a valid email'
                  : 'Enter your email address'
              }
              required
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Phone Number"
              type="tel"
              placeholder="0987654321"
              startIcon={<Phone />}
              value={formData.phone}
              onChange={handleInputChange('phone')}
              success={validationDemo.phoneSuccess}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
          </Stack>
        </Grid>

        {/* Product Form */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h6" gutterBottom>
            Product Management
          </Typography>
          <Stack spacing={2}>
            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Product Name"
              placeholder="Rolex Submariner"
              startIcon={<Star />}
              value={formData.productName}
              onChange={handleInputChange('productName')}
              required
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Price (VNĐ)"
              type="number"
              placeholder="1000000"
              startIcon={<AttachMoney />}
              value={formData.productPrice}
              onChange={handleInputChange('productPrice')}
              required
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Product Search"
              type="search"
              placeholder="Search products..."
              startIcon={<Search />}
              endIcon={<ShoppingCart />}
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />

            <WSInput
              variant={demoSettings.variant}
              size={demoSettings.size}
              label="Product Description"
              placeholder="Describe the product..."
              multiline
              rows={4}
              value={formData.bio}
              onChange={handleInputChange('bio')}
              showCharacterCount={demoSettings.showCharacterCount}
              maxCharacters={500}
              helperText="Detailed product description"
              disabled={demoSettings.disabled}
              readOnly={demoSettings.readonly}
            />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderSizeComparison = () => (
    <Paper sx={{ p: 3 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: BRAND_COLORS.primary }}
      >
        📏 Size & Type Comparison
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Sizes */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom>
            Sizes
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <WSInput
                variant="outlined"
                size="small"
                label="Small Size"
                placeholder="Small input..."
                startIcon={<Search />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <WSInput
                variant="outlined"
                size="medium"
                label="Medium Size"
                placeholder="Medium input..."
                startIcon={<Search />}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <WSInput
                variant="outlined"
                size="large"
                label="Large Size"
                placeholder="Large input..."
                startIcon={<Search />}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Input Types */}
        <Grid size={{ xs: 12 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Input Types
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <WSInput
                type="text"
                label="Text Input"
                placeholder="Enter text..."
                startIcon={<Person />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <WSInput
                type="email"
                label="Email Input"
                placeholder="user@example.com"
                startIcon={<Email />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <WSInput
                type="password"
                label="Password Input"
                placeholder="Enter password..."
                startIcon={<Lock />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <WSInput
                type="number"
                label="Number Input"
                placeholder="123456"
                startIcon={<AttachMoney />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <WSInput
                type="tel"
                label="Phone Input"
                placeholder="0987654321"
                startIcon={<Phone />}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <WSInput
                type="search"
                label="Search Input"
                placeholder="Search..."
                startIcon={<Search />}
              />
            </Grid>
          </Grid>
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
          WSInput Component Demo
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
        >
          Input component đơn giản với 2 variant và 6 input types cốt lõi
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
          <strong>Phiên bản đơn giản:</strong> WSInput đã được tối ưu với 2
          variant (outlined, filled), 6 input types (text, password, email,
          number, tel, search) và tập trung vào tính năng thiết yếu cho forms.
        </Typography>
      </Alert>

      <Grid container spacing={4}>
        {/* Demo Controls */}
        <Grid size={{ xs: 12, md: 4 }}>{renderControls()}</Grid>

        {/* Demo Forms */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            {/* Basic Variants */}
            {renderBasicVariants()}

            {/* Icons & Validation */}
            {renderIconsAndValidation()}

            {/* Form Examples */}
            {renderFormExample()}

            {/* Size & Type Comparison */}
            {renderSizeComparison()}
          </Stack>
        </Grid>
      </Grid>

      {/* Usage Example */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Cách sử dụng WSInput
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
          <pre>{`// Basic input
<WSInput label="Product Name" placeholder="Enter name..." />

// Email input với validation
<WSInput
  type="email"
  label="Email"
  startIcon={<EmailIcon />}
  error={hasError}
  helperText="Please enter a valid email"
  required
/>

// Password input với character count
<WSInput
  type="password"
  label="Password"
  startIcon={<LockIcon />}
  showCharacterCount
  maxCharacters={50}
  helperText="Enter secure password"
/>

// Search input với icons
<WSInput
  type="search"
  variant="filled"
  placeholder="Search products..."
  startIcon={<SearchIcon />}
  endIcon={<FilterIcon />}
  size="large"
/>

// Multiline description
<WSInput
  multiline
  rows={4}
  label="Product Description"
  showCharacterCount
  maxCharacters={500}
  helperText="Detailed description"
/>`}</pre>
        </Box>
      </Paper>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          WSInput - WatchStore Design System Component (Simplified Version)
        </Typography>
      </Box>
    </Container>
  );
}
