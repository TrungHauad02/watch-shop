import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { theme } from '@/styles/theme';
import AppRouter from './config/router';

// ==================== MAIN APP COMPONENT ====================
const globalStyles = (
  <GlobalStyles
    styles={{
      // CUSTOMIZE: Bạn có thể chỉnh sửa global styles ở đây
      '*': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
      html: {
        height: '100%',
        scrollBehavior: 'smooth',
      },
      body: {
        height: '100%',
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        lineHeight: 1.6,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      '#root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      // Custom scrollbar
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: theme.palette.grey[100],
      },
      '::-webkit-scrollbar-thumb': {
        background: theme.palette.grey[400],
        borderRadius: '4px',
        '&:hover': {
          background: theme.palette.grey[600],
        },
      },
      // Focus styles for accessibility
      'a, button, input, textarea, select': {
        '&:focus-visible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: '2px',
        },
      },
      // Smooth transitions for interactive elements
      'a, button, input, textarea': {
        transition: 'all 0.2s ease',
      },
      // Print styles
      '@media print': {
        body: {
          backgroundColor: 'white !important',
          color: 'black !important',
        },
        'header, footer, nav, aside': {
          display: 'none !important',
        },
      },
    }}
  />
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}

      {/* Main Application Router */}
      <AppRouter />
    </ThemeProvider>
  );
}
