/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
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
  CalendarToday,
  Link,
  AccountCircle,
  CreditCard,
} from '@mui/icons-material';
import WSInput from '@components/WSInput';
import { BRAND_COLORS } from '../styles/colors';
import { VALIDATION_PATTERNS } from '@/shared/constants/app.constants';

const WSInputDemoPage: React.FC = () => {
  // State for demo controls
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    website: '',
    bio: '',
    amount: '',
    date: '',
    search: '',
  });

  const [demoSettings, setDemoSettings] = React.useState({
    showPasswords: false,
    readonly: false,
    disabled: false,
    showCharacterCount: true,
    variant: 'outlined' as const,
    size: 'medium' as const,
  });

  const [validationDemo, setValidationDemo] = React.useState({
    emailError: false,
    passwordError: false,
    phoneSuccess: false,
  });

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
        const phoneRegex = VALIDATION_PATTERNS.PHONE_VN;
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
          WSInput Component Demo
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: 'auto' }}
        >
          WatchStore premium input component với Rich Black + Vivid Yellow theme
          và responsive design
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Demo Controls */}
        <Grid size={{ xs: 12, md: 4 }}>
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
                  {['outlined', 'filled', 'standard'].map((variant) => (
                    <Button
                      key={variant}
                      size="small"
                      variant={
                        demoSettings.variant === variant
                          ? 'contained'
                          : 'outlined'
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
                      variant={
                        demoSettings.size === size ? 'contained' : 'outlined'
                      }
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
            </Stack>
          </Paper>
        </Grid>

        {/* Demo Forms */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>
            {/* Basic Variants */}
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
                    <WSInput
                      variant="standard"
                      label="Standard Input"
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
                      color="accent"
                      label="Accent Color"
                      placeholder="Accent..."
                      size={demoSettings.size}
                      disabled={demoSettings.disabled}
                      readOnly={demoSettings.readonly}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Icons & Validation */}
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
                        demoSettings.showPasswords ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )
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
                          ? 'Valid phone number'
                          : 'Enter your phone number'
                      }
                      disabled={demoSettings.disabled}
                      readOnly={demoSettings.readonly}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Form Example */}
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: BRAND_COLORS.primary }}
              >
                📝 User Registration Form
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Grid container spacing={3}>
                {/* Personal Information */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
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
                      {...(validationDemo.emailError && {
                        helperText: 'Please enter a valid email',
                      })}
                      required
                      disabled={demoSettings.disabled}
                      readOnly={demoSettings.readonly}
                    />

                    <WSInput
                      variant={demoSettings.variant}
                      size={demoSettings.size}
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      startIcon={<Phone />}
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      success={validationDemo.phoneSuccess}
                      inputMode="tel"
                      disabled={demoSettings.disabled}
                      readOnly={demoSettings.readonly}
                    />
                  </Stack>
                </Grid>

                {/* Additional Information */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    Additional Information
                  </Typography>
                  <Stack spacing={2}>
                    <WSInput
                      variant={demoSettings.variant}
                      size={demoSettings.size}
                      label="Website"
                      type="url"
                      placeholder="https://example.com"
                      startIcon={<Link />}
                      value={formData.website}
                      onChange={handleInputChange('website')}
                      disabled={demoSettings.disabled}
                      readOnly={demoSettings.readonly}
                    />

                    <WSInput
                      variant={demoSettings.variant}
                      size={demoSettings.size}
                      label="Date of Birth"
                      type="date"
                      startIcon={<CalendarToday />}
                      value={formData.date}
                      onChange={handleInputChange('date')}
                      disabled={demoSettings.disabled}
                      readOnly={demoSettings.readonly}
                    />

                    <WSInput
                      variant={demoSettings.variant}
                      size={demoSettings.size}
                      label="Bio"
                      placeholder="Tell us about yourself..."
                      multiline
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange('bio')}
                      showCharacterCount={demoSettings.showCharacterCount}
                      maxCharacters={500}
                      helperText="Brief description about yourself"
                      disabled={demoSettings.disabled}
                      readOnly={demoSettings.readonly}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Paper>

            {/* Responsive Demo */}
            <Paper sx={{ p: 3 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: BRAND_COLORS.primary }}
              >
                📱 Responsive Design
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <Alert severity="info" sx={{ mb: 3 }}>
                Resize your browser window to see responsive behavior. On mobile
                devices, inputs automatically adjust their size and variant for
                better touch interaction.
              </Alert>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <WSInput
                    variant="outlined"
                    label="Mobile Optimized"
                    placeholder="Auto-adjusts on mobile"
                    responsive
                    mobileVariant="filled"
                    startIcon={<Search />}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <WSInput
                    variant="outlined"
                    label="Email Input"
                    type="email"
                    placeholder="email@example.com"
                    responsive
                    inputMode="email"
                    startIcon={<Email />}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <WSInput
                    variant="outlined"
                    label="Numeric Input"
                    type="number"
                    placeholder="123456"
                    responsive
                    inputMode="numeric"
                    startIcon={<CreditCard />}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Footer */}
      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          WSInput - WatchStore Design System Component with Responsive Design
        </Typography>
      </Box>
    </Container>
  );
};

export default WSInputDemoPage;
