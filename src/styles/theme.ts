import {
  createTheme,
  ThemeOptions,
  Theme,
  Shadows,
} from '@mui/material/styles';
import {
  BRAND_COLORS,
  SEMANTIC_COLORS,
  LIGHT_THEME,
  DARK_THEME,
  COLOR_PALETTES,
} from './colors';

// ==============================================
// BREAKPOINTS CONFIGURATION
// ==============================================

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

// ==============================================
// TYPOGRAPHY CONFIGURATION
// ==============================================

const typography = {
  fontFamily: [
    'Roboto',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),

  // Font weights
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,

  // Typography variants
  h1: {
    fontSize: '2.5rem', // 40px
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontSize: '2rem', // 32px
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontSize: '1.75rem', // 28px
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  h4: {
    fontSize: '1.5rem', // 24px
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontSize: '1.25rem', // 20px
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0em',
  },
  h6: {
    fontSize: '1rem', // 16px
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: '0.0075em',
  },
  subtitle1: {
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontSize: '0.875rem', // 14px
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  body2: {
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.6,
    letterSpacing: '0.01071em',
  },
  button: {
    fontSize: '0.875rem', // 14px
    fontWeight: 600,
    lineHeight: 1.75,
    letterSpacing: '0.02857em',
    textTransform: 'none' as const,
  },
  caption: {
    fontSize: '0.75rem', // 12px
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: '0.03333em',
  },
  overline: {
    fontSize: '0.75rem', // 12px
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: '0.08333em',
    textTransform: 'uppercase' as const,
  },
};

// ==============================================
// SHAPE CONFIGURATION
// ==============================================

const shape = {
  borderRadius: 8,
};

// ==============================================
// SPACING CONFIGURATION
// ==============================================

const spacing = 8; // Base spacing unit (8px)

// ==============================================
// SHADOW CONFIGURATION
// ==============================================

const shadows: Shadows = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
  '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
  '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
  '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
  '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
  '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
  '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
  '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
  '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
  '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
  '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
  '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
];

// ==============================================
// LIGHT THEME CONFIGURATION
// ==============================================

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',

    // Primary palette - Rich Black
    primary: {
      main: BRAND_COLORS.primary,
      light: BRAND_COLORS.primaryLight,
      dark: BRAND_COLORS.primaryDark,
      contrastText: BRAND_COLORS.secondary,
    },

    // Secondary palette - Vivid Yellow
    secondary: {
      main: BRAND_COLORS.secondary,
      light: BRAND_COLORS.secondaryLight,
      dark: BRAND_COLORS.secondaryDark,
      contrastText: BRAND_COLORS.primary,
    },

    // Semantic colors
    success: {
      main: SEMANTIC_COLORS.success,
      light: COLOR_PALETTES.emerald[300],
      dark: COLOR_PALETTES.emerald[700],
      contrastText: '#ffffff',
    },

    warning: {
      main: SEMANTIC_COLORS.warning,
      light: COLOR_PALETTES.orange[300],
      dark: COLOR_PALETTES.orange[700],
      contrastText: '#ffffff',
    },

    error: {
      main: SEMANTIC_COLORS.error,
      light: COLOR_PALETTES.red[300],
      dark: COLOR_PALETTES.red[700],
      contrastText: '#ffffff',
    },

    info: {
      main: SEMANTIC_COLORS.info,
      light: COLOR_PALETTES.blue[300],
      dark: COLOR_PALETTES.blue[700],
      contrastText: '#ffffff',
    },

    // Background colors
    background: {
      default: LIGHT_THEME.background.primary,
      paper: LIGHT_THEME.background.paper,
    },

    // Text colors
    text: {
      primary: LIGHT_THEME.text.primary,
      secondary: LIGHT_THEME.text.secondary,
      disabled: LIGHT_THEME.text.disabled,
    },

    // Divider and borders
    divider: LIGHT_THEME.border.primary,

    // Action colors
    action: {
      active: LIGHT_THEME.text.primary,
      hover: LIGHT_THEME.border.hover,
      selected: LIGHT_THEME.surface.secondary,
      disabled: LIGHT_THEME.text.disabled,
      disabledBackground: LIGHT_THEME.surface.tertiary,
      focus: LIGHT_THEME.border.focus,
    },
  },

  breakpoints,
  typography,
  shape,
  spacing,
  shadows,
};

// ==============================================
// DARK THEME CONFIGURATION
// ==============================================

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',

    // Primary palette - Rich Black (adjusted for dark mode)
    primary: {
      main: BRAND_COLORS.secondary, // Use yellow as primary in dark mode
      light: BRAND_COLORS.secondaryLight,
      dark: BRAND_COLORS.secondaryDark,
      contrastText: BRAND_COLORS.primary,
    },

    // Secondary palette - Vivid Yellow (adjusted for dark mode)
    secondary: {
      main: BRAND_COLORS.primary, // Use black as secondary in dark mode
      light: BRAND_COLORS.primaryLight,
      dark: BRAND_COLORS.primaryDark,
      contrastText: BRAND_COLORS.secondary,
    },

    // Semantic colors (dark variants)
    success: {
      main: SEMANTIC_COLORS.successDark,
      light: COLOR_PALETTES.emerald[200],
      dark: COLOR_PALETTES.emerald[800],
      contrastText: COLOR_PALETTES.emerald[900],
    },

    warning: {
      main: SEMANTIC_COLORS.warningDark,
      light: COLOR_PALETTES.orange[200],
      dark: COLOR_PALETTES.orange[800],
      contrastText: COLOR_PALETTES.orange[900],
    },

    error: {
      main: SEMANTIC_COLORS.errorDark,
      light: COLOR_PALETTES.red[200],
      dark: COLOR_PALETTES.red[800],
      contrastText: COLOR_PALETTES.red[900],
    },

    info: {
      main: SEMANTIC_COLORS.infoDark,
      light: COLOR_PALETTES.blue[200],
      dark: COLOR_PALETTES.blue[800],
      contrastText: COLOR_PALETTES.blue[900],
    },

    // Background colors
    background: {
      default: DARK_THEME.background.primary,
      paper: DARK_THEME.background.paper,
    },

    // Text colors
    text: {
      primary: DARK_THEME.text.primary,
      secondary: DARK_THEME.text.secondary,
      disabled: DARK_THEME.text.disabled,
    },

    // Divider and borders
    divider: DARK_THEME.border.primary,

    // Action colors
    action: {
      active: DARK_THEME.text.primary,
      hover: DARK_THEME.border.hover,
      selected: DARK_THEME.surface.secondary,
      disabled: DARK_THEME.text.disabled,
      disabledBackground: DARK_THEME.surface.tertiary,
      focus: DARK_THEME.border.focus,
    },
  },

  breakpoints,
  typography,
  shape,
  spacing,
  shadows,
};

// ==============================================
// COMPONENT OVERRIDES
// ==============================================

const componentOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        fontWeight: 600,
        borderRadius: 8,
        padding: '8px 16px',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
        },
      },
      contained: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        },
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: 0,
        borderRight: 'none',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        fontWeight: 500,
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      },
    },
  },

  MuiTableCell: {
    styleOverrides: {
      root: {
        borderBottom: `1px solid rgba(224, 224, 224, 0.5)`,
      },
      head: {
        fontWeight: 600,
        backgroundColor: 'rgba(0,0,0,0.02)',
      },
    },
  },
};

// ==============================================
// CREATE THEMES
// ==============================================

const lightTheme = createTheme({
  ...lightThemeOptions,
  components: componentOverrides,
});

const darkTheme = createTheme({
  ...darkThemeOptions,
  components: componentOverrides,
});

// ==============================================
// THEME CREATOR FUNCTION
// ==============================================

const createWatchStoreTheme = (mode: 'light' | 'dark') => {
  return mode === 'dark' ? darkTheme : lightTheme;
};

// ==============================================
// THEME UTILITIES
// ==============================================

const getThemeColor = (theme: Theme, colorPath: string) => {
  const paths = colorPath.split('.');
  let current: unknown = theme.palette;

  for (const path of paths) {
    if (typeof current === 'object' && current !== null && path in current) {
      current = (current as Record<string, unknown>)[path];
    } else {
      return undefined;
    }
  }

  return current;
};

const createCustomShadow = (
  color: string,
  opacity: number = 0.1,
  blur: number = 8
) => {
  return `0 2px ${blur}px rgba(${color}, ${opacity})`;
};

// ==============================================
// RESPONSIVE HELPERS
// ==============================================

const responsiveSpacing = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 4,
  xl: 5,
};

const responsiveFontSizes = {
  xs: {
    h1: '1.75rem',
    h2: '1.5rem',
    h3: '1.25rem',
    h4: '1.125rem',
    h5: '1rem',
    h6: '0.875rem',
  },
  sm: {
    h1: '2rem',
    h2: '1.75rem',
    h3: '1.5rem',
    h4: '1.25rem',
    h5: '1.125rem',
    h6: '1rem',
  },
  md: {
    h1: '2.5rem',
    h2: '2rem',
    h3: '1.75rem',
    h4: '1.5rem',
    h5: '1.25rem',
    h6: '1rem',
  },
};

// ==============================================
// ANIMATION HELPERS
// ==============================================

const animations = {
  fadeIn: 'fadeIn 0.3s ease-in-out',
  slideUp: 'slideUp 0.3s ease-out',
  scaleIn: 'scaleIn 0.2s ease-out',

  keyframes: {
    fadeIn: `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `,
    slideUp: `
      @keyframes slideUp {
        from { 
          opacity: 0;
          transform: translateY(20px);
        }
        to { 
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
    scaleIn: `
      @keyframes scaleIn {
        from { 
          opacity: 0;
          transform: scale(0.9);
        }
        to { 
          opacity: 1;
          transform: scale(1);
        }
      }
    `,
  },
};

// ==============================================
// COMMON STYLE MIXINS
// ==============================================

const mixins = {
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  absoluteCenter: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },

  textEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
  },

  hover: (styles: Record<string, unknown>) => ({
    transition: 'all 0.2s ease-in-out',
    '&:hover': styles,
  }),

  focusVisible: (styles: Record<string, unknown>) => ({
    '&:focus-visible': {
      outline: `2px solid ${BRAND_COLORS.secondary}`,
      outlineOffset: 2,
      ...styles,
    },
  }),
};

// ==============================================
// Z-INDEX LEVELS
// ==============================================

const zIndexLevels = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
};

// ==============================================
// EXPORTS
// ==============================================

export default lightTheme;

export {
  lightTheme,
  darkTheme,
  createWatchStoreTheme,
  getThemeColor,
  createCustomShadow,
  responsiveSpacing,
  responsiveFontSizes,
  animations,
  mixins,
  zIndexLevels,
};

// Type exports
export type WatchStoreTheme = typeof lightTheme;
export type ThemeMode = 'light' | 'dark';
