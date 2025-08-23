import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// WSFORMFIELD TYPES
// ==============================================

export type WSFormFieldLabelPosition = 'top' | 'left' | 'left-aligned';

export type WSFormFieldSpacing =
  | 'none'
  | 'compact'
  | 'comfortable'
  | 'spacious';

// ==============================================
// MAIN WSFORMFIELD PROPS INTERFACE
// ==============================================

export interface WSFormFieldProps {
  // === LABEL CONFIGURATION ===
  label?: string; // 📝 Label text
  labelPosition?: WSFormFieldLabelPosition; // 📐 Label positioning
  labelWidth?: string | number; // 📏 Label width cho left layouts
  labelAlign?: 'left' | 'right' | 'center'; // 📍 Label text alignment

  // === VALIDATION & STATES ===
  required?: boolean; // ⚠️ Required field indicator
  error?: boolean; // 🚨 Error state
  success?: boolean; // ✅ Success state
  helperText?: string; // 💬 Helper/error message

  // === LAYOUT & STYLING ===
  spacing?: WSFormFieldSpacing | number; // 📐 Gap between label and input
  fullWidth?: boolean; // 📐 Full width container
  sx?: SxProps<Theme>; // 🎨 MUI sx prop
  className?: string; // 🎨 CSS class

  // === CONTENT ===
  children: ReactNode; // 🔧 Input component to wrap

  // === ACCESSIBILITY ===
  htmlFor?: string; // ♿ Link label with input
  id?: string; // 🔑 Container ID

  // === ADVANCED ===
  labelProps?: {
    // 🎛️ Additional label props
    sx?: SxProps<Theme>;
    className?: string;
    variant?: 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption';
  };
  helperTextProps?: {
    // 🎛️ Additional helper text props
    sx?: SxProps<Theme>;
    className?: string;
  };
}

// ==============================================
// CONSTANTS
// ==============================================

export const WS_FORMFIELD_LABEL_POSITIONS = [
  'top',
  'left',
  'left-aligned',
] as const;

export const WS_FORMFIELD_SPACINGS = [
  'none',
  'compact',
  'comfortable',
  'spacious',
] as const;

// ==============================================
// DEFAULT VALUES
// ==============================================

export const WS_FORMFIELD_DEFAULTS = {
  labelPosition: 'top' as WSFormFieldLabelPosition,
  spacing: 'comfortable' as WSFormFieldSpacing,
  fullWidth: true,
  labelAlign: 'left' as const,
  required: false,
  error: false,
  success: false,
} as const;

// ==============================================
// TYPE GUARDS
// ==============================================

export const isValidWSFormFieldLabelPosition = (
  position: unknown
): position is WSFormFieldLabelPosition => {
  return WS_FORMFIELD_LABEL_POSITIONS.includes(
    position as WSFormFieldLabelPosition
  );
};

export const isValidWSFormFieldSpacing = (
  spacing: unknown
): spacing is WSFormFieldSpacing => {
  return WS_FORMFIELD_SPACINGS.includes(spacing as WSFormFieldSpacing);
};

// ==============================================
// HELPER TYPES
// ==============================================

export interface WSFormFieldSpacingConfig {
  labelToInput: string;
  inputToHelper: string;
}

export interface WSFormFieldLayoutConfig {
  container: SxProps<Theme>;
  labelContainer: SxProps<Theme>;
  inputContainer: SxProps<Theme>;
  helperContainer: SxProps<Theme>;
}

// ==============================================
// EXPORT TYPES
// ==============================================

export type WSFormFieldRef = HTMLDivElement;
