export { default } from './WSInput';
export type {
  WSInputProps,
  WSInputRef,
  WSInputVariant,
  WSInputSize,
  WSInputType,
  WSInputColor,
  WSInputValidation,
  WSInputIconConfig,
  WSInputHelperConfig,
  WSInputStyleConfig,
  WSInputSizeConfig,
  WSInputState,
  WSInputComponent,
  WSInputEventHandler,
  WSInputFocusHandler,
  WSInputKeyboardHandler,
  WSInputControlled,
  WSInputUncontrolled,
} from './WSInput.types';

export {
  WS_INPUT_VARIANTS,
  WS_INPUT_SIZES,
  WS_INPUT_COLORS,
  WS_INPUT_TYPES,
  WS_INPUT_DEFAULTS,
  isValidWSInputVariant,
  isValidWSInputSize,
  isValidWSInputColor,
  isValidWSInputType,
} from './WSInput.types';

// Re-export styled components for advanced customization
export {
  StyledWSInput,
  StyledHelperText,
  StyledInputAdornment,
  IconWrapper,
} from './WSInput.styles';
