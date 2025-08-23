// ==============================================
// WSMODAL COMPONENT EXPORTS
// ==============================================

export { default } from './WSModal';
export { default as WSModal } from './WSModal';

// Export types for external usage
export type {
  WSModalProps,
  WSModalRef,
  WSModalSize,
  WSModalVariant,
  WSModalAction,
  WSModalConfig,
  WSModalState,
  WSModalConfirmation,
  WSModalForm,
} from './WSModal.types';

// Export constants for external usage
export {
  WS_MODAL_SIZES,
  WS_MODAL_VARIANTS,
  WS_MODAL_DEFAULTS,
  isValidWSModalSize,
  isValidWSModalVariant,
} from './WSModal.types';
