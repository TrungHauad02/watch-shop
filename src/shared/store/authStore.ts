import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, RoleEnum } from '@/shared/types/common.types';
import apiClient, { TokenResponse, ApiError } from '@/shared/api/axiosConfig';
import { AUTH_CONFIG, STORAGE_KEYS } from '@/shared/constants/app.constants';
import { useEffect } from 'react';
import { TokenValidationDTO } from '../types/auth.types';

// ==============================================
// TYPES
// ==============================================

interface AuthState {
  // User data
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Auth status
  isInitialized: boolean;
  lastLoginTime: number | null;

  // Error handling
  error: string | null;
}

interface AuthActions {
  // Authentication actions
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;

  // Token management
  refreshToken: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;

  // User profile
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;

  // Password reset
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;

  // State management
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setUser: (user: User | null) => void;

  // Utilities
  hasRole: (role: RoleEnum) => boolean;
  hasPermission: (permission: string) => boolean;
  isTokenExpiringSoon: () => boolean;
}

interface AuthStore extends AuthState, AuthActions {}

// Register data interface (matches backend RegisterRequestDTO)
interface RegisterData {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

// ==============================================
// INITIAL STATE
// ==============================================

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  lastLoginTime: null,
  error: null,
};

// ==============================================
// AUTH STORE
// ==============================================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ...initialState,

      // ==============================================
      // AUTHENTICATION ACTIONS
      // ==============================================

      login: async (email: string, password: string, rememberMe = false) => {
        set({ isLoading: true, error: null });

        try {
          // CUSTOMIZE: Bạn có thể thêm logic validation email/password ở đây
          const response = await apiClient.postData<TokenResponse>(
            '/auth/login',
            {
              email,
              password,
              // Add client info for security logging (matches LoginRequestDTO)
              ipAddress: '', // Will be set by backend from request
              userAgent: navigator.userAgent,
              rememberMe,
            }
          );

          // Store tokens using apiClient
          apiClient.setAuthTokens(response);

          // Update store state
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            lastLoginTime: Date.now(),
            error: null,
          });

          // CUSTOMIZE: Bạn có thể thêm logic sau khi login thành công ở đây
          console.log('✅ Login successful:', response.user.email);
        } catch (error) {
          const apiError = error as ApiError;
          console.error('❌ Login failed:', apiError);

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: apiError.message || 'Đăng nhập thất bại',
          });

          throw error; // Re-throw for form handling
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null });

        try {
          // CUSTOMIZE: Bạn có thể thêm logic validation userData ở đây
          const response = await apiClient.postData<TokenResponse>(
            '/auth/register',
            {
              name: userData.name,
              email: userData.email,
              password: userData.password,
              phoneNumber: userData.phoneNumber,
            }
          );

          // Store tokens using apiClient
          apiClient.setAuthTokens(response);

          // Update store state
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            lastLoginTime: Date.now(),
            error: null,
          });

          // CUSTOMIZE: Bạn có thể thêm logic sau khi register thành công ở đây
          console.log('✅ Registration successful:', response.user.email);
        } catch (error) {
          const apiError = error as ApiError;
          console.error('❌ Registration failed:', apiError);

          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: apiError.message || 'Đăng ký thất bại',
          });

          throw error; // Re-throw for form handling
        }
      },

      logout: () => {
        try {
          // Call backend logout (fire and forget)
          apiClient.postData('/auth/logout', {}).catch(console.warn);

          // Clear tokens
          apiClient.clearAuth();

          // Reset store state
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            lastLoginTime: null,
            error: null,
          });

          // CUSTOMIZE: Bạn có thể thêm logic sau khi logout ở đây
          console.log('✅ Logout successful');

          // Redirect to login page
          window.location.href = '/login';
        } catch (error) {
          console.error('❌ Logout error:', error);
          // Force logout even if backend call fails
          apiClient.clearAuth();
          set(initialState);
          window.location.href = '/login';
        }
      },

      // ==============================================
      // TOKEN MANAGEMENT
      // ==============================================

      refreshToken: async () => {
        try {
          set({ isLoading: true });

          const response = await apiClient.postData<TokenResponse>(
            '/auth/refresh',
            {}
          );

          // Update tokens
          apiClient.setAuthTokens(response);

          // Update user data
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });

          console.log('✅ Token refresh successful');
        } catch (error) {
          console.error('❌ Token refresh failed:', error);

          // Force logout on refresh failure
          get().logout();
        }
      },

      checkAuthStatus: async () => {
        if (get().isInitialized) return;

        set({ isLoading: true });

        try {
          // Check if we have tokens
          const isAuthenticated = apiClient.isAuthenticated();
          const currentUser = apiClient.getCurrentUser();

          if (isAuthenticated && currentUser) {
            // Validate token with backend
            const response: TokenValidationDTO = await apiClient.postData(
              '/auth/validate-token',
              {}
            );

            if (response.valid) {
              set({
                user: currentUser,
                isAuthenticated: true,
                isLoading: false,
                isInitialized: true,
                error: null,
              });
            } else {
              // Token is invalid, clear auth
              get().logout();
            }
          } else {
            // No tokens, not authenticated
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              isInitialized: true,
              error: null,
            });
          }
        } catch (error) {
          console.error('❌ Auth status check failed:', error);

          // Clear auth on error
          apiClient.clearAuth();
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isInitialized: true,
            error: null,
          });
        }
      },

      // ==============================================
      // USER PROFILE MANAGEMENT
      // ==============================================

      updateProfile: async (userData: Partial<User>) => {
        set({ isLoading: true, error: null });

        try {
          const response = await apiClient.patchData<User>(
            '/auth/profile',
            userData
          );

          // Update local user data
          set({
            user: response,
            isLoading: false,
            error: null,
          });

          // CUSTOMIZE: Bạn có thể thêm logic sau khi update profile ở đây
          console.log('✅ Profile updated successfully');
        } catch (error) {
          const apiError = error as ApiError;
          console.error('❌ Profile update failed:', apiError);

          set({
            isLoading: false,
            error: apiError.message || 'Cập nhật thông tin thất bại',
          });

          throw error;
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        set({ isLoading: true, error: null });

        try {
          await apiClient.postData('/auth/change-password', {
            currentPassword,
            newPassword,
            confirmPassword: newPassword, // Backend expects this field
          });

          set({
            isLoading: false,
            error: null,
          });

          // CUSTOMIZE: Bạn có thể thêm logic sau khi đổi mật khẩu ở đây
          console.log('✅ Password changed successfully');
        } catch (error) {
          const apiError = error as ApiError;
          console.error('❌ Password change failed:', apiError);

          set({
            isLoading: false,
            error: apiError.message || 'Đổi mật khẩu thất bại',
          });

          throw error;
        }
      },

      // ==============================================
      // PASSWORD RESET
      // ==============================================

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });

        try {
          await apiClient.postData('/auth/forgot-password', { email });

          set({
            isLoading: false,
            error: null,
          });

          // CUSTOMIZE: Bạn có thể thêm logic sau khi gửi email reset ở đây
          console.log('✅ Password reset email sent');
        } catch (error) {
          const apiError = error as ApiError;
          console.error('❌ Forgot password failed:', apiError);

          set({
            isLoading: false,
            error: apiError.message || 'Gửi email thất bại',
          });

          throw error;
        }
      },

      resetPassword: async (token: string, newPassword: string) => {
        set({ isLoading: true, error: null });

        try {
          await apiClient.postData('/auth/reset-password', {
            token,
            newPassword,
            confirmPassword: newPassword, // Backend expects this field
          });

          set({
            isLoading: false,
            error: null,
          });

          // CUSTOMIZE: Bạn có thể thêm logic sau khi reset password ở đây
          console.log('✅ Password reset successful');
        } catch (error) {
          const apiError = error as ApiError;
          console.error('❌ Password reset failed:', apiError);

          set({
            isLoading: false,
            error: apiError.message || 'Đặt lại mật khẩu thất bại',
          });

          throw error;
        }
      },

      // ==============================================
      // STATE MANAGEMENT
      // ==============================================

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      // ==============================================
      // UTILITY METHODS
      // ==============================================

      hasRole: (role: RoleEnum) => {
        const { user } = get();
        return user?.role === role;
      },

      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;

        // CUSTOMIZE: Bạn có thể thêm logic phân quyền chi tiết ở đây
        switch (user.role) {
          case RoleEnum.ADMIN:
            return true; // Admin có mọi quyền
          case RoleEnum.MANAGER:
            return [
              'product.create',
              'product.update',
              'product.delete',
              'category.manage',
              'brand.manage',
            ].includes(permission);
          case RoleEnum.USER:
            return [
              'profile.view',
              'profile.update',
              'wishlist.manage',
            ].includes(permission);
          default:
            return false;
        }
      },

      isTokenExpiringSoon: () => {
        try {
          // Check if token expires within 5 minutes
          const token = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
          if (!token) return false;

          // This would need JWT parsing utility
          // For now, return false (token refresh will be handled by interceptor)
          return false;
        } catch (error) {
          console.error('❌ Token expiry check failed:', error);
          return true; // Assume expiring if can't check
        }
      },
    }),
    {
      name: STORAGE_KEYS.USER_DATA, // Storage key
      partialize: (state) => ({
        // Only persist essential data, not sensitive tokens
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        lastLoginTime: state.lastLoginTime,
      }),
      version: 1,
      migrate: (persistedState: unknown, version) => {
        // Handle migration if needed in future
        if (version === 0) {
          return {
            ...(persistedState as AuthState),
            isInitialized: false, // Force re-initialization
          };
        }
        return persistedState;
      },
    }
  )
);

// ==============================================
// SELECTORS (Optional - for better performance)
// ==============================================

export const useAuth = () =>
  useAuthStore((state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
  }));

export const useAuthActions = () =>
  useAuthStore((state) => ({
    login: state.login,
    register: state.register,
    logout: state.logout,
    updateProfile: state.updateProfile,
    changePassword: state.changePassword,
    forgotPassword: state.forgotPassword,
    resetPassword: state.resetPassword,
    clearError: state.clearError,
  }));

export const useUserPermissions = () =>
  useAuthStore((state) => ({
    hasRole: state.hasRole,
    hasPermission: state.hasPermission,
    user: state.user,
  }));

// ==============================================
// AUTH UTILITIES
// ==============================================

// CUSTOMIZE: Bạn có thể thêm các utility functions khác ở đây
export const getAuthToken = () => {
  return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
};

export const isUserRole = (user: User | null, role: RoleEnum): boolean => {
  return user?.role === role;
};

export const isAdmin = (user: User | null): boolean => {
  return isUserRole(user, RoleEnum.ADMIN);
};

export const isManager = (user: User | null): boolean => {
  return isUserRole(user, RoleEnum.MANAGER) || isAdmin(user);
};

export const canManageProducts = (user: User | null): boolean => {
  return isManager(user);
};

export const canManageUsers = (user: User | null): boolean => {
  return isAdmin(user);
};

// ==============================================
// AUTH HOOK FOR COMPONENTS
// ==============================================

export const useAuthRequired = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { checkAuthStatus } = useAuthStore();

  // Auto-check auth status on mount
  useEffect(() => {
    if (!useAuthStore.getState().isInitialized) {
      checkAuthStatus();
    }
  }, [checkAuthStatus]);

  return {
    isAuthenticated,
    isLoading,
    user,
    isReady: useAuthStore.getState().isInitialized,
  };
};

export default useAuthStore;
