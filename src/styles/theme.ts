/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme, Theme } from '@mui/material/styles';
import { MUI_COLOR_PALETTE } from '@/styles/colors';

// ==================== TYPOGRAPHY CONFIGURATION ====================

const typography = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  h1: {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 600,
    fontSize: '2rem',
    lineHeight: 1.3,
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.75rem',
    lineHeight: 1.3,
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: 1.4,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
};

// ==================== COMPONENT OVERRIDES ====================

const components = {
  // CUSTOMIZE: Button component styling
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        fontWeight: 600,
        borderRadius: 8,
        padding: '10px 24px',
        transition: 'all 0.2s ease',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
      outlined: {
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },

  // CUSTOMIZE: Card component styling
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-2px)',
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },

  // CUSTOMIZE: TextField component styling
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
          '&.Mui-focused': {
            backgroundColor: 'rgba(255, 255, 255, 1)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: 2,
            },
          },
        },
      },
    },
  },

  // CUSTOMIZE: AppBar component styling
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        backdropFilter: 'blur(10px)',
      },
    },
  },

  // CUSTOMIZE: Paper component styling
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      elevation1: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
      elevation2: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
      },
      elevation3: {
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
      },
    },
  },

  // CUSTOMIZE: Chip component styling
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        fontWeight: 500,
      },
    },
  },

  // CUSTOMIZE: Dialog component styling
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },

  // CUSTOMIZE: Menu component styling
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: 8,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
        border: '1px solid rgba(0, 0, 0, 0.08)',
        marginTop: 4,
      },
    },
  },

  // CUSTOMIZE: Tooltip component styling
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        borderRadius: 6,
        fontSize: '0.75rem',
        fontWeight: 500,
        padding: '8px 12px',
      },
    },
  },

  // CUSTOMIZE: Tab component styling
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 3,
        borderRadius: 2,
      },
    },
  },

  // CUSTOMIZE: Drawer component styling
  MuiDrawer: {
    styleOverrides: {
      paper: {
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
      },
    },
  },
};

// ==================== BREAKPOINTS CONFIGURATION ====================

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// ==================== SPACING CONFIGURATION ====================

const spacing = 8; // Base spacing unit

// ==================== SHAPE CONFIGURATION ====================

const shape = {
  borderRadius: 8,
};

// ==================== Z-INDEX CONFIGURATION ====================

const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// ==================== MAIN THEME CREATION ====================

export const theme: Theme = createTheme({
  palette: MUI_COLOR_PALETTE,
  typography,
  components,
  breakpoints,
  spacing,
  shape,
  zIndex,
});

// ==================== THEME UTILITIES ====================

export const themeUtils = {
  // Get responsive value
  getResponsiveValue: (values: {
    xs?: any;
    sm?: any;
    md?: any;
    lg?: any;
    xl?: any;
  }) => values,

  // Get spacing value
  spacing: (factor: number) => theme.spacing(factor),

  // Get shadow value
  getShadow: (elevation: number) =>
    theme.shadows[elevation] || theme.shadows[1],

  // Get breakpoint value
  getBreakpoint: (breakpoint: keyof typeof theme.breakpoints.values) =>
    theme.breakpoints.values[breakpoint],
};

export default theme;
