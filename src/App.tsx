import React, { useEffect, useMemo } from 'react';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { createWatchStoreTheme } from './styles/theme';
import { useThemeStore } from './shared/store/themeStore';
import AppRouter from './config/router';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// ==============================================
// QUERY CLIENT CONFIGURATION
// ==============================================

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
    },
  },
});

// ==============================================
// GLOBAL STYLES COMPONENT - MEMOIZED
// ==============================================

const AppGlobalStyles = React.memo(() => {
  const { isDarkMode } = useThemeStore();

  const styles = useMemo(
    () => ({
      // Reset and normalize
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        height: '100%',
        fontSize: '16px',
        lineHeight: 1.5,
        scrollBehavior: 'smooth',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        WebkitTextSizeAdjust: '100%',
      },
      body: {
        height: '100%',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
        textRendering: 'optimizeLegibility',
        fontFeatureSettings: '"kern"',
        // CUSTOMIZE: Bạn có thể chỉnh sửa transition cho theme switching
        transition: 'background-color 0.3s ease, color 0.3s ease',
      },
      '#root': {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
      // CUSTOMIZE: Bạn có thể thay đổi scrollbar styling tại đây
      '::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '::-webkit-scrollbar-track': {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#f1f1f1',
      },
      '::-webkit-scrollbar-thumb': {
        backgroundColor: isDarkMode ? '#666' : '#c1c1c1',
        borderRadius: '4px',
        '&:hover': {
          backgroundColor: isDarkMode ? '#777' : '#a1a1a1',
        },
      },
      // Animation utilities
      '.animate-fade-in': {
        animation: 'fadeIn 0.3s ease-in-out',
      },
      '.animate-slide-up': {
        animation: 'slideUp 0.3s ease-out',
      },
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      '@keyframes slideUp': {
        from: {
          opacity: 0,
          transform: 'translateY(20px)',
        },
        to: {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
      // Utility classes
      '.sr-only': {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      },
    }),
    [isDarkMode]
  );

  return <GlobalStyles styles={styles} />;
});

AppGlobalStyles.displayName = 'AppGlobalStyles';

// ==============================================
// TOAST CONFIGURATION COMPONENT - MEMOIZED
// ==============================================

const AppToaster = React.memo(() => {
  const { isDarkMode } = useThemeStore();

  const toastOptions = useMemo(
    () => ({
      duration: 4000,
      style: {
        background: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#333',
        border: `1px solid ${isDarkMode ? '#555' : '#e0e0e0'}`,
        borderRadius: '8px',
        fontSize: '14px',
        maxWidth: '400px',
        boxShadow: isDarkMode
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        // CUSTOMIZE: Bạn có thể chỉnh sửa toast animation tại đây
        transition: 'all 0.3s ease',
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: '#10b981',
          secondary: '#fff',
        },
      },
      error: {
        duration: 5000,
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
      },
      loading: {
        duration: Infinity,
        iconTheme: {
          primary: '#3b82f6',
          secondary: '#fff',
        },
      },
    }),
    [isDarkMode]
  );

  return (
    <Toaster
      position="top-right"
      gutter={8}
      containerStyle={{
        top: 80, // Below header
      }}
      toastOptions={toastOptions}
    />
  );
});

AppToaster.displayName = 'AppToaster';

// ==============================================
// THEME SYNC COMPONENT - OPTIMIZED
// ==============================================

const ThemeSync = React.memo(() => {
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    // Update document attributes for theme
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light'
    );

    // Update meta theme-color for mobile browsers
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      // Create meta theme-color if it doesn't exist
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', isDarkMode ? '#101820' : '#ffffff');

    // Update body class for theme-specific styling
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${isDarkMode ? 'dark' : 'light'}`);

    // CUSTOMIZE: Bạn có thể thêm theme change notifications tại đây
    if (process.env.NODE_ENV === 'development') {
      console.log(`Theme changed to: ${isDarkMode ? 'dark' : 'light'} mode`);
    }
  }, [isDarkMode]);

  return null;
});

ThemeSync.displayName = 'ThemeSync';

// ==============================================
// MAIN APP CONTENT - MEMOIZED
// ==============================================

const AppContent = React.memo(() => {
  const { isDarkMode } = useThemeStore();

  // Create theme based on current mode - MEMOIZED to prevent re-creation
  const theme = useMemo(
    () => createWatchStoreTheme(isDarkMode ? 'dark' : 'light'),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      {/* CSS Baseline - Reset and normalize */}
      <CssBaseline />

      {/* Global Styles */}
      <AppGlobalStyles />

      {/* Theme Sync Component */}
      <ThemeSync />

      {/* Main App Content */}
      <div className="App">
        {/* Main Router */}
        <AppRouter />

        {/* Global Toast Notifications */}
        <AppToaster />
      </div>
    </ThemeProvider>
  );
});

AppContent.displayName = 'AppContent';

// ==============================================
// ERROR BOUNDARY - OPTIMIZED
// ==============================================

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);

    // Send error to monitoring service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry, LogRocket, etc.
      // Sentry.captureException(error);
    }
  }

  private resetError = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
              marginBottom: '1rem',
              color: '#333',
              fontWeight: 600,
            }}
          >
            Oops! Có lỗi xảy ra
          </h1>
          <p
            style={{
              fontSize: '1rem',
              marginBottom: '2rem',
              color: '#666',
              maxWidth: '500px',
              lineHeight: 1.6,
            }}
          >
            Ứng dụng đã gặp lỗi không mong muốn. Vui lòng thử lại sau.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#101820',
                color: '#FEE715',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Tải lại trang
            </button>
            <button
              onClick={this.resetError}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#101820',
                border: '2px solid #101820',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Thử lại
            </button>
          </div>

          {/* Development error details */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details
              style={{
                marginTop: '2rem',
                textAlign: 'left',
                maxWidth: '800px',
              }}
            >
              <summary
                style={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  marginBottom: '1rem',
                  color: '#666',
                }}
              >
                Chi tiết lỗi (Development Mode)
              </summary>
              <pre
                style={{
                  padding: '1rem',
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  overflow: 'auto',
                  color: '#333',
                  lineHeight: 1.4,
                }}
              >
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// ==============================================
// MAIN APP COMPONENT
// ==============================================

function App() {
  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />

        {/* React Query DevTools - Only in development */}
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        )}
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}

export default App;
