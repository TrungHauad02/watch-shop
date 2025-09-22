// ==================== LOGIN TYPES ====================

import { UserDTO } from '@/shared/types';

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}

export interface LoginError {
  field?: 'email' | 'password' | 'general';
  message: string;
}

// ==================== REGISTER TYPES ====================

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterResponse {
  user: UserDTO;
}

export interface RegisterError {
  field?:
    | 'name'
    | 'email'
    | 'phoneNumber'
    | 'password'
    | 'confirmPassword'
    | 'general';
  message: string;
}

// ==================== FORGET PASSWORD TYPES ====================

export interface ForgetPasswordFormData {
  email: string;
}

export interface ForgetPasswordResponse {
  message: string;
  success: boolean;
}

export interface ForgetPasswordError {
  field?: 'email' | 'general';
  message: string;
}
// ==================== AUTH STATE TYPES ====================

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: LoginResponse['user'] | null;
  error: LoginError | null;
}

// ==================== VALIDATION TYPES ====================

export interface LoginValidationErrors {
  email?: string;
  password?: string;
}

export interface RegisterValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ForgetPasswordValidationErrors {
  email?: string;
}
