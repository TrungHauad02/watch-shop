// ==============================================
// WSCARD COMPONENT EXPORTS
// ==============================================

export { default } from './WSCard';
export { default as WSCard } from './WSCard';

// Export types for external usage
export type {
  WSCardProps,
  WSCardRef,
  WSCardVariant,
  WSCardSize,
  WSCardAction,
  WSCardActionAlignment,
  WSCardMedia,
  WSCardConfig,
  WSCardState,
  WSCardThemeOverrides,
  WSCardEventHandler,
  WSCardAsyncHandler,
  WSCardProductCard,
  WSCardArticleCard,
  WSCardUserCard,
} from './WSCard.types';

// Export constants for external usage
export {
  WS_CARD_VARIANTS,
  WS_CARD_SIZES,
  WS_CARD_ACTION_ALIGNMENTS,
  WS_CARD_DEFAULTS,
  isValidWSCardVariant,
  isValidWSCardSize,
  isValidWSCardActionAlignment,
} from './WSCard.types';
