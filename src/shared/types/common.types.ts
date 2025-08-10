import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material/styles';

// ==============================================
// BASE ENTITY TYPES
// ==============================================

export interface BaseEntity {
  id: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==============================================
// API RESPONSE TYPES
// ==============================================

export interface ResponseDTO<T> {
  status: boolean;
  data: T;
  message: string;
  errorDetail?: string;
  timestamp?: string;
}

// ==============================================
// PAGINATION & FILTERING
// ==============================================

export interface PaginationParams {
  page?: number;
  size?: number;
  sortField?: string;
  direction?: 'ASC' | 'DESC';
}

export interface SearchParams extends PaginationParams {
  search?: string;
}

export interface BaseFilterDTO {
  startCreatedAt?: string;
  endCreatedAt?: string;
  startUpdatedAt?: string;
  endUpdatedAt?: string;
  status?: boolean;
}

// Product, Brand, Category, and User filters extend BaseFilterDTO
export interface ProductFilterDTO extends BaseFilterDTO {
  productId?: string;
  name?: string;
  origin?: string;
  movement?: string;
  glassType?: string;
  gender?: GenderEnum;
  brandId?: number;
  categoryId?: number;
  fromPrice?: number;
  toPrice?: number;
  fromCaseSize?: number;
  toCaseSize?: number;
  fromCaseThickness?: number;
  toCaseThickness?: number;
  fromWaterResistance?: number;
  toWaterResistance?: number;
}

export interface UserFilterDTO extends BaseFilterDTO {
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: RoleEnum;
}

export interface BrandFilterDTO extends BaseFilterDTO {
  name?: string;
}

export interface CategoryFilterDTO extends BaseFilterDTO {
  name?: string;
}

// ==============================================
// UI COMPONENT TYPES
// ==============================================

export interface ComponentProps {
  children?: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
  progress?: number;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  message?: string;
}

// ==============================================
// THEME & STYLING
// ==============================================

export type ThemeMode = 'light' | 'dark';

export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type SizeVariant = 'small' | 'medium' | 'large';

// ==============================================
// USER & AUTHENTICATION
// ==============================================

export enum RoleEnum {
  USER = 'USER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNISEX = 'UNISEX',
}

// ==============================================
// FORM TYPES
// ==============================================

export interface FormFieldError {
  message: string;
  type: string;
}

export interface FormState {
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
  errors: Record<string, FormFieldError>;
}

// ==============================================
// NAVIGATION & ROUTING
// ==============================================

export interface RouteMetadata {
  title: string;
  description?: string;
  requiresAuth?: boolean;
  requiredRole?: RoleEnum;
}

export interface BreadcrumbItem {
  title: string;
  path?: string;
  isActive?: boolean;
}

// ==============================================
// UTILITY TYPES
// ==============================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialFields<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;

// ==============================================
// EVENT HANDLERS
// ==============================================

export type EventHandler<T = void> = () => T;
export type EventHandlerWithPayload<P, T = void> = (payload: P) => T;

// ==============================================
// ASYNC OPERATIONS
// ==============================================

export interface AsyncOperation<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
  isSuccess: boolean;
};

// ==============================================
// FILTER & SEARCH
// ==============================================

export interface BaseFilter {
  search?: string;
  sortField?: string;
  direction?: 'ASC' | 'DESC';
}

export interface DateRangeFilter {
  fromDate?: string;
  toDate?: string;
}

export interface PriceRangeFilter {
  minPrice?: number;
  maxPrice?: number;
}

// ==============================================
// FILE UPLOAD
// ==============================================

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface FileUploadProgress {
  fileId: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

// ==============================================
// NOTIFICATION SYSTEM
// ==============================================

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
  actions?: NotificationAction[];
}

export interface NotificationAction {
  label: string;
  action: () => void;
  color?: ColorVariant;
}

// ==============================================
// USER PROFILE
// ==============================================
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  role: RoleEnum;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
}

// ==============================================
// EXPORT ALL
// ==============================================

export type { ReactNode };
