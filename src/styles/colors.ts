interface ColorPalettes {
  // Primary palette - Rich Black variations
  richBlack: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  // Secondary palette - Vivid Yellow variations
  vividYellow: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  // Complementary palettes
  gold: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  amber: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  slate: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  neutral: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  // Status colors
  emerald: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  red: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  orange: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
  blue: Record<
    50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950,
    string
  >;
}

// Color Palettes - Rich Black & Vivid Yellow focused
const COLOR_PALETTES: ColorPalettes = {
  // Rich Black palette - Primary brand color
  richBlack: {
    50: '#f8f9fa', // Lightest - for backgrounds
    100: '#e9ecef', // Very light gray
    200: '#d4d8dd', // Light gray
    300: '#adb5bd', // Medium light gray
    400: '#6c757d', // Medium gray
    500: '#495057', // Dark gray
    600: '#343a40', // Darker gray
    700: '#212529', // Very dark gray
    800: '#101820', // Rich Black - Main brand color
    900: '#0a0f14', // Darker rich black
    950: '#050a0f', // Darkest
  },

  // Vivid Yellow palette - Secondary brand color
  vividYellow: {
    50: '#fffef7', // Cream white
    100: '#fffbea', // Lightest yellow
    200: '#fff4c4', // Very light yellow
    300: '#ffe98a', // Light yellow
    400: '#ffd93d', // Medium light yellow
    500: '#FEE715', // Vivid Yellow - Main brand color
    600: '#f59e0b', // Golden yellow
    700: '#d97706', // Darker gold
    800: '#b45309', // Dark amber
    900: '#92400e', // Very dark amber
    950: '#78350f', // Darkest amber
  },

  // Gold palette - Luxury complement
  gold: {
    50: '#fffdf2',
    100: '#fef9e7',
    200: '#fef2cd',
    300: '#fde68a',
    400: '#fcd34d',
    500: '#f59e0b', // Main gold
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Amber palette - Warm complement
  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },

  // Slate palette - Cool neutrals
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Neutral palette - Warm neutrals
  neutral: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },

  // Emerald palette - Success colors
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },

  // Red palette - Error colors
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },

  // Orange palette - Warning colors
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },

  // Blue palette - Info colors
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
} as const;

interface BrandColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  accent: string;
  accentLight: string;
  accentDark: string;
}

// Brand Colors - WatchStore luxury theme
const BRAND_COLORS: BrandColors = {
  primary: '#101820', // Rich Black - Main brand
  primaryLight: '#212529', // Lighter rich black
  primaryDark: '#050a0f', // Darker rich black
  secondary: '#FEE715', // Vivid Yellow - Secondary brand
  secondaryLight: '#fff4c4', // Lighter vivid yellow
  secondaryDark: '#f59e0b', // Darker vivid yellow
  accent: '#f59e0b', // Gold accent - luxury feel
  accentLight: '#fcd34d', // Lighter gold
  accentDark: '#d97706', // Darker gold
} as const;

interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
  // Dark mode variants
  successDark: string;
  warningDark: string;
  errorDark: string;
  infoDark: string;
}

// Semantic Colors - Status and feedback
const SEMANTIC_COLORS: SemanticColors = {
  success: COLOR_PALETTES.emerald[600], // Success green
  warning: COLOR_PALETTES.orange[500], // Warning orange
  error: COLOR_PALETTES.red[600], // Error red
  info: COLOR_PALETTES.blue[600], // Info blue
  successDark: COLOR_PALETTES.emerald[400], // Success green for dark mode
  warningDark: COLOR_PALETTES.orange[400], // Warning orange for dark mode
  errorDark: COLOR_PALETTES.red[400], // Error red for dark mode
  infoDark: COLOR_PALETTES.blue[400], // Info blue for dark mode
} as const;

interface ActionColors {
  save: string;
  edit: string;
  delete: string;
  view: string;
  create: string;
  update: string;
  cancel: string;
  submit: string;
  submitHover: string;
  reset: string;
}

// Action Colors - User actions and states
const ACTION_COLORS: ActionColors = {
  save: COLOR_PALETTES.emerald[600], // Green save
  edit: COLOR_PALETTES.vividYellow[600], // Yellow edit
  delete: COLOR_PALETTES.red[600], // Red delete
  view: COLOR_PALETTES.blue[600], // Blue view
  create: COLOR_PALETTES.emerald[500], // Green create
  update: COLOR_PALETTES.amber[600], // Amber update
  cancel: COLOR_PALETTES.slate[500], // Gray cancel
  submit: COLOR_PALETTES.richBlack[800], // Black submit
  submitHover: COLOR_PALETTES.richBlack[700], // Lighter black hover
  reset: COLOR_PALETTES.neutral[500], // Neutral reset
} as const;

interface ThemeColors {
  background: {
    primary: string;
    secondary: string;
    paper: string;
    elevated: string;
  };
  surface: {
    primary: string;
    secondary: string;
    tertiary: string;
    elevated: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
  };
  border: {
    primary: string;
    secondary: string;
    tertiary: string;
    focus: string;
    hover: string;
  };
  shadow: {
    primary: string;
    secondary: string;
    elevated: string;
  };
  overlay: {
    light: string;
    medium: string;
    dark: string;
  };
}

// Light Theme Colors
const LIGHT_THEME: ThemeColors = {
  background: {
    primary: '#ffffff', // Pure white
    secondary: COLOR_PALETTES.neutral[50], // Warm off-white
    paper: '#ffffff', // White paper
    elevated: COLOR_PALETTES.neutral[50], // Slightly off-white
  },
  surface: {
    primary: COLOR_PALETTES.vividYellow[50], // Cream surface
    secondary: COLOR_PALETTES.neutral[100], // Light neutral
    tertiary: COLOR_PALETTES.gold[50], // Light gold
    elevated: '#ffffff', // White elevated
  },
  text: {
    primary: COLOR_PALETTES.richBlack[800], // Rich black text
    secondary: COLOR_PALETTES.richBlack[600], // Medium black
    tertiary: COLOR_PALETTES.neutral[600], // Light gray text
    disabled: COLOR_PALETTES.neutral[400], // Disabled gray
    inverse: COLOR_PALETTES.vividYellow[500], // Yellow inverse text
  },
  border: {
    primary: COLOR_PALETTES.richBlack[200], // Light border
    secondary: COLOR_PALETTES.neutral[200], // Lighter border
    tertiary: COLOR_PALETTES.vividYellow[200], // Yellow border
    focus: COLOR_PALETTES.vividYellow[500], // Yellow focus
    hover: COLOR_PALETTES.vividYellow[300], // Yellow hover
  },
  shadow: {
    primary: `${COLOR_PALETTES.richBlack[800]}15`, // 15% black shadow
    secondary: `${COLOR_PALETTES.richBlack[800]}08`, // 8% black shadow
    elevated: `${COLOR_PALETTES.richBlack[800]}25`, // 25% black shadow
  },
  overlay: {
    light: `${COLOR_PALETTES.richBlack[800]}10`, // 10% overlay
    medium: `${COLOR_PALETTES.richBlack[800]}50`, // 50% overlay
    dark: `${COLOR_PALETTES.richBlack[800]}80`, // 80% overlay
  },
} as const;

// Dark Theme Colors
const DARK_THEME: ThemeColors = {
  background: {
    primary: COLOR_PALETTES.richBlack[950], // Darkest black
    secondary: COLOR_PALETTES.richBlack[900], // Very dark black
    paper: COLOR_PALETTES.richBlack[800], // Rich black paper
    elevated: COLOR_PALETTES.richBlack[700], // Lighter black
  },
  surface: {
    primary: COLOR_PALETTES.richBlack[800], // Rich black surface
    secondary: COLOR_PALETTES.richBlack[700], // Lighter surface
    tertiary: COLOR_PALETTES.neutral[800], // Dark neutral
    elevated: COLOR_PALETTES.richBlack[600], // Elevated surface
  },
  text: {
    primary: COLOR_PALETTES.vividYellow[500], // Vivid yellow text
    secondary: COLOR_PALETTES.vividYellow[300], // Lighter yellow
    tertiary: COLOR_PALETTES.neutral[400], // Gray text
    disabled: COLOR_PALETTES.neutral[600], // Disabled gray
    inverse: COLOR_PALETTES.richBlack[800], // Black inverse text
  },
  border: {
    primary: COLOR_PALETTES.vividYellow[700], // Gold border
    secondary: COLOR_PALETTES.neutral[700], // Gray border
    tertiary: COLOR_PALETTES.vividYellow[800], // Darker gold
    focus: COLOR_PALETTES.vividYellow[500], // Bright yellow focus
    hover: COLOR_PALETTES.vividYellow[600], // Yellow hover
  },
  shadow: {
    primary: `${COLOR_PALETTES.richBlack[950]}40`, // 40% black shadow
    secondary: `${COLOR_PALETTES.richBlack[950]}20`, // 20% black shadow
    elevated: `${COLOR_PALETTES.richBlack[950]}60`, // 60% black shadow
  },
  overlay: {
    light: `${COLOR_PALETTES.richBlack[950]}20`, // 20% overlay
    medium: `${COLOR_PALETTES.richBlack[950]}60`, // 60% overlay
    dark: `${COLOR_PALETTES.richBlack[950]}90`, // 90% overlay
  },
} as const;

// ==============================================
// UTILITY CONSTANTS
// ==============================================

const UTILITY_COLORS = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  inherit: 'inherit',
  current: 'currentColor',
} as const;

// Common color combinations for quick access
const COLOR_COMBINATIONS = {
  luxury: {
    background: BRAND_COLORS.primary,
    text: BRAND_COLORS.secondary,
    accent: BRAND_COLORS.accent,
  },
  premium: {
    background: BRAND_COLORS.secondary,
    text: BRAND_COLORS.primary,
    accent: BRAND_COLORS.accent,
  },
  elegant: {
    background: COLOR_PALETTES.neutral[50],
    text: BRAND_COLORS.primary,
    accent: BRAND_COLORS.secondary,
  },
} as const;

// ==============================================
// EXPORTS
// ==============================================

export type {
  ColorPalettes,
  BrandColors,
  SemanticColors,
  ActionColors,
  ThemeColors,
};

export {
  COLOR_PALETTES,
  BRAND_COLORS,
  SEMANTIC_COLORS,
  ACTION_COLORS,
  LIGHT_THEME,
  DARK_THEME,
  UTILITY_COLORS,
  COLOR_COMBINATIONS,
};
