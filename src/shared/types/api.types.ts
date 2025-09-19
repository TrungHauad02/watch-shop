// ==================== PAGINATION TYPES ====================

export interface PaginationParams {
  page?: number;
  size?: number;
  sortField?: string;
  direction?: 'ASC' | 'DESC';
}

// ==================== API ERROR TYPES ====================

export interface ApiError {
  status: boolean;
  message: string;
  errorDetail?: string;
  timestamp?: string;
}

// ==================== UTILITY TYPES ====================

export type SortDirection = 'ASC' | 'DESC';

export interface SelectOption {
  label: string;
  value: string | number;
}

// Common loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

// Common async operation state
export interface AsyncState<T> extends LoadingState {
  data?: T;
}
