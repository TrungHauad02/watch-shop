// ==================== LOGIN TYPES ====================

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface LoginError {
  field?: 'email' | 'password' | 'general';
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
