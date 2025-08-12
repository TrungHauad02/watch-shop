/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { createWatchStoreTheme } from './styles/theme';
import AppRouter from './config/router';

// ==============================================
// MAIN APP COMPONENT
// ==============================================

function App() {
  // Theme state - will be managed by store later
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('ws-theme-mode');
    return saved === 'dark';
  });

  // Create theme based on current mode
  const theme = createWatchStoreTheme(isDarkMode ? 'dark' : 'light');

  // ==============================================
  // THEME PERSISTENCE
  // ==============================================

  useEffect(() => {
    localStorage.setItem('ws-theme-mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // ==============================================
  // THEME TOGGLE HANDLER
  // ==============================================

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  // ==============================================
  // RENDER
  // ==============================================

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="App">
        {/* Main Router */}
        <AppRouter />

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDarkMode ? '#333' : '#fff',
              color: isDarkMode ? '#fff' : '#333',
              fontSize: '14px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
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
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
