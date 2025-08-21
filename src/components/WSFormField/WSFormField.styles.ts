import { styled } from '@mui/material/styles';
import { Box, Typography, FormHelperText } from '@mui/material';
import {
  WSFormFieldLabelPosition,
  WSFormFieldSpacing,
  WSFormFieldSpacingConfig,
} from './WSFormField.types';

// ==============================================
// SPACING CONFIGURATIONS
// ==============================================

/**
 * WSFormField Spacing Guide
 * =========================
 *
 * CUSTOMIZE: Bạn có thể chỉnh sửa khoảng cách giữa các elements
 *
 * Spacing types:
 * - labelToInput: 📐 Khoảng cách từ label đến input
 * - inputToHelper: 📐 Khoảng cách từ input đến helper text
 */

const getSpacingConfig = (
  spacing: WSFormFieldSpacing | number
): WSFormFieldSpacingConfig => {
  // CUSTOMIZE: Điều chỉnh spacing cho các preset
  if (typeof spacing === 'number') {
    return {
      labelToInput: `${spacing}px`,
      inputToHelper: `${Math.max(spacing / 2, 4)}px`,
    };
  }

  const spacingMap: Record<WSFormFieldSpacing, WSFormFieldSpacingConfig> = {
    none: {
      labelToInput: '0px', // 📐 Không có khoảng cách
      inputToHelper: '2px', // 📐 Minimal helper spacing
    },
    compact: {
      labelToInput: '4px', // 📐 Tight spacing cho mobile
      inputToHelper: '4px', // 📐 Compact helper spacing
    },
    comfortable: {
      labelToInput: '8px', // 📐 Standard spacing
      inputToHelper: '6px', // 📐 Standard helper spacing
    },
    spacious: {
      labelToInput: '16px', // 📐 Loose spacing cho desktop
      inputToHelper: '8px', // 📐 Generous helper spacing
    },
  };

  return spacingMap[spacing];
};

// ==============================================
// FORM FIELD CONTAINER - MAIN WRAPPER
// ==============================================

export const FormFieldContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['labelPosition', 'fullWidth', 'spacing'].includes(prop as string),
})<{
  labelPosition: WSFormFieldLabelPosition;
  fullWidth: boolean;
  spacing: WSFormFieldSpacing | number;
}>(({ theme, labelPosition, fullWidth, spacing }) => {
  const spacingConfig = getSpacingConfig(spacing);

  return {
    // === BASE CONTAINER STYLES ===
    display: 'flex',
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',

    // === LAYOUT SPECIFIC STYLES ===
    // 📐 TOP LAYOUT: Vertical stack
    ...(labelPosition === 'top' && {
      flexDirection: 'column',
      gap: spacingConfig.labelToInput,
    }),

    // 📐 LEFT LAYOUT: Horizontal with space-between
    ...(labelPosition === 'left' && {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: spacingConfig.labelToInput,
    }),

    // 📐 LEFT-ALIGNED LAYOUT: Horizontal kề nhau
    ...(labelPosition === 'left-aligned' && {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: spacingConfig.labelToInput,
    }),

    // === RESPONSIVE ADJUSTMENTS ===
    // 📱 Mobile: Convert left layouts to top on small screens
    [theme.breakpoints.down('sm')]: {
      ...(labelPosition !== 'top' && {
        flexDirection: 'column',
        gap: spacingConfig.labelToInput,
      }),
    },
  };
});

// ==============================================
// LABEL CONTAINER - THEME INTEGRATED
// ==============================================

export const LabelContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['labelPosition', 'labelWidth', 'labelAlign'].includes(prop as string),
})<{
  labelPosition: WSFormFieldLabelPosition;
  labelWidth?: string | number;
  labelAlign: 'left' | 'right' | 'center';
}>(({ theme, labelPosition, labelWidth, labelAlign }) => {
  return {
    // === BASE LABEL CONTAINER ===
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent:
      labelAlign === 'left'
        ? 'flex-start'
        : labelAlign === 'right'
          ? 'flex-end'
          : 'center',

    // === WIDTH CONFIGURATION ===
    // 📏 TOP LAYOUT: Full width available
    ...(labelPosition === 'top' && {
      width: '100%',
    }),

    // 📏 LEFT LAYOUT: Fixed width hoặc auto
    ...(labelPosition === 'left' && {
      width: labelWidth || 'auto',
      flexShrink: 0, // Prevent shrinking
      minWidth:
        typeof labelWidth === 'string'
          ? labelWidth
          : typeof labelWidth === 'number'
            ? `${labelWidth}px`
            : '120px',
    }),

    // 📏 LEFT-ALIGNED LAYOUT: Auto width
    ...(labelPosition === 'left-aligned' && {
      width: labelWidth || 'auto',
      flexShrink: 0,
    }),

    // === RESPONSIVE ===
    [theme.breakpoints.down('sm')]: {
      // 📱 Mobile: Reset width cho all layouts
      width: '100%',
      minWidth: 'unset',
    },
  };
});

// ==============================================
// INPUT CONTAINER
// ==============================================

export const InputContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['labelPosition', 'spacing'].includes(prop as string),
})<{
  labelPosition: WSFormFieldLabelPosition;
  spacing: WSFormFieldSpacing | number;
}>(({ theme, labelPosition, spacing }) => {
  const spacingConfig = getSpacingConfig(spacing);

  return {
    // === BASE INPUT CONTAINER ===
    display: 'flex',
    flexDirection: 'column',
    gap: spacingConfig.inputToHelper,

    // === WIDTH CONFIGURATION ===
    // 📐 TOP LAYOUT: Full width
    ...(labelPosition === 'top' && {
      width: '100%',
    }),

    // 📐 LEFT LAYOUT: Remaining space
    ...(labelPosition === 'left' && {
      flex: 1,
      minWidth: 0, // Allow shrinking
    }),

    // 📐 LEFT-ALIGNED LAYOUT: Remaining space
    ...(labelPosition === 'left-aligned' && {
      flex: 1,
      minWidth: 0,
    }),

    // === RESPONSIVE ===
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flex: 'unset',
    },
  };
});

// ==============================================
// STYLED LABEL - THEME INTEGRATED
// ==============================================

export const StyledLabel = styled(Typography, {
  shouldForwardProp: (prop) =>
    !['hasError', 'hasSuccess', 'isRequired'].includes(prop as string),
})<{
  hasError: boolean;
  hasSuccess: boolean;
  isRequired: boolean;
}>(({ theme, hasError, hasSuccess, isRequired }) => ({
  // === BASE LABEL STYLES ===
  fontWeight: theme.typography.fontWeightMedium || 500,
  lineHeight: 1.4,
  userSelect: 'none',
  cursor: 'default',

  // === COLOR STATES ===
  // CUSTOMIZE: Màu label theo validation states
  color: hasError
    ? theme.palette.error.main // 🚨 Đỏ cho error
    : hasSuccess
      ? theme.palette.success.main // ✅ Xanh cho success
      : theme.palette.text.primary, // 📝 Màu text chính

  // === REQUIRED INDICATOR ===
  ...(isRequired && {
    '&::after': {
      content: '" *"',
      // 🔴 Dấu * màu đỏ cho required
      color: theme.palette.error.main,
      fontWeight: 'bold',
      marginLeft: '2px',
    },
  }),

  // === TRANSITIONS ===
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  }),
}));

// ==============================================
// STYLED HELPER TEXT - THEME INTEGRATED
// ==============================================

export const StyledHelperText = styled(FormHelperText, {
  shouldForwardProp: (prop) =>
    !['hasError', 'hasSuccess'].includes(prop as string),
})<{
  hasError: boolean;
  hasSuccess: boolean;
}>(({ theme, hasError, hasSuccess }) => ({
  // === BASE HELPER STYLES ===
  fontSize: theme.typography.caption.fontSize,
  lineHeight: 1.4,
  margin: 0,
  marginTop: 0,

  // === COLOR STATES ===
  // CUSTOMIZE: Màu helper text theo validation states
  color: hasError
    ? theme.palette.error.main // 🚨 Đỏ cho error message
    : hasSuccess
      ? theme.palette.success.main // ✅ Xanh cho success message
      : theme.palette.text.secondary, // 📝 Xám cho thông tin thường

  // === TRANSITIONS ===
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.short,
  }),

  // === RESPONSIVE ===
  [theme.breakpoints.down('sm')]: {
    fontSize: theme.typography.caption.fontSize,
  },
}));

// ==============================================
// FIELD WRAPPER - VALIDATION STATES
// ==============================================

export const FieldWrapper = styled(Box, {
  shouldForwardProp: (prop) =>
    !['hasError', 'hasSuccess'].includes(prop as string),
})<{
  hasError: boolean;
  hasSuccess: boolean;
}>(({ theme, hasError, hasSuccess }) => ({
  // === BASE WRAPPER ===
  position: 'relative',
  width: '100%',

  // === VALIDATION CONTAINER CLASSES ===
  // 🚨 Error container styling
  ...(hasError && {
    '&.ws-field-error': {
      '& .validation-indicator': {
        color: theme.palette.error.main,
      },
    },
  }),

  // ✅ Success container styling
  ...(hasSuccess && {
    '&.ws-field-success': {
      '& .validation-indicator': {
        color: theme.palette.success.main,
      },
    },
  }),

  // === FOCUS-WITHIN ENHANCEMENT ===
  '&:focus-within': {
    // 🎯 Enhance focus appearance
    '& .ws-label': {
      fontWeight: 600,
    },
  },
}));

// ==============================================
// RESPONSIVE LAYOUT HELPER
// ==============================================

export const ResponsiveLayoutBox = styled(Box, {
  shouldForwardProp: (prop) => !['mobileStack'].includes(prop as string),
})<{
  mobileStack?: boolean;
}>(({ theme, mobileStack }) => ({
  // === MOBILE STACKING ===
  ...(mobileStack && {
    [theme.breakpoints.down('sm')]: {
      '& > *': {
        width: '100% !important',
        flexBasis: '100% !important',
      },
    },
  }),
}));
