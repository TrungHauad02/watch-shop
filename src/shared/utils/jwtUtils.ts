/* eslint-disable @typescript-eslint/no-explicit-any */
import { AUTH_CONFIG } from '@/shared/constants/app.constants';
import { RoleEnum } from '@/shared/types/common.types';

// ==============================================
// TYPES
// ==============================================

interface JwtPayload {
  sub: string; // email (subject)
  googleId?: string;
  role: string;
  type: 'access' | 'refresh';
  iat: number; // issued at
  exp: number; // expiration time
  [key: string]: any;
}

interface TokenInfo {
  email: string;
  role: RoleEnum;
  googleId?: string;
  issuedAt: Date;
  expiresAt: Date;
  isExpired: boolean;
  isExpiringSoon: boolean; // Within 5 minutes
  timeUntilExpiry: number; // milliseconds
}

interface TokenValidationResult {
  isValid: boolean;
  isExpired: boolean;
  isExpiringSoon: boolean;
  payload?: JwtPayload;
  error?: string;
}

// ==============================================
// JWT UTILITIES CLASS
// ==============================================

class JwtUtils {
  private static instance: JwtUtils;

  // CUSTOMIZE: Bạn có thể thay đổi thời gian buffer cho "expiring soon"
  private readonly EXPIRY_BUFFER_MS = 5 * 60 * 1000; // 5 minutes

  static getInstance(): JwtUtils {
    if (!JwtUtils.instance) {
      JwtUtils.instance = new JwtUtils();
    }
    return JwtUtils.instance;
  }

  // ==============================================
  // TOKEN PARSING
  // ==============================================

  /**
   * Parse JWT token without verification (client-side only)
   * CUSTOMIZE: Bạn có thể thêm validation khác ở đây
   */
  parseToken(token: string): JwtPayload | null {
    try {
      if (!token || typeof token !== 'string') {
        return null;
      }

      // JWT format: header.payload.signature
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.warn('Invalid JWT format');
        return null;
      }

      // Decode payload (base64url)
      const payload = parts[1];
      const decodedPayload = this.base64UrlDecode(payload);

      if (!decodedPayload) {
        console.warn('Failed to decode JWT payload');
        return null;
      }

      const parsedPayload = JSON.parse(decodedPayload);

      // Validate required fields (matches backend JwtUtil.java)
      if (!parsedPayload.sub || !parsedPayload.role || !parsedPayload.exp) {
        console.warn('JWT missing required fields');
        return null;
      }

      return parsedPayload as JwtPayload;
    } catch (error) {
      console.error('Error parsing JWT token:', error);
      return null;
    }
  }

  /**
   * Get token information
   */
  getTokenInfo(token: string): TokenInfo | null {
    const payload = this.parseToken(token);
    if (!payload) {
      return null;
    }

    try {
      const now = Date.now();
      const issuedAt = new Date(payload.iat * 1000);
      const expiresAt = new Date(payload.exp * 1000);
      const timeUntilExpiry = expiresAt.getTime() - now;
      const isExpired = timeUntilExpiry <= 0;
      const isExpiringSoon =
        timeUntilExpiry <= this.EXPIRY_BUFFER_MS && !isExpired;

      // Parse role enum
      let role: RoleEnum;
      switch (payload.role) {
        case 'ADMIN':
          role = RoleEnum.ADMIN;
          break;
        case 'MANAGER':
          role = RoleEnum.MANAGER;
          break;
        case 'USER':
          role = RoleEnum.USER;
          break;
        default:
          console.warn('Unknown role in token:', payload.role);
          role = RoleEnum.USER;
      }

      return {
        email: payload.sub,
        role,
        googleId: payload.googleId || '',
        issuedAt,
        expiresAt,
        isExpired,
        isExpiringSoon,
        timeUntilExpiry: Math.max(0, timeUntilExpiry),
      };
    } catch (error) {
      console.error('Error getting token info:', error);
      return null;
    }
  }

  /**
   * Validate token structure and expiration
   * CUSTOMIZE: Bạn có thể thêm validation rules khác ở đây
   */
  validateToken(token: string): TokenValidationResult {
    if (!token) {
      return {
        isValid: false,
        isExpired: false,
        isExpiringSoon: false,
        error: 'Token is empty',
      };
    }

    const payload = this.parseToken(token);
    if (!payload) {
      return {
        isValid: false,
        isExpired: false,
        isExpiringSoon: false,
        error: 'Invalid token format',
      };
    }

    // Check token type (should be 'access' for access tokens)
    if (payload.type && payload.type !== 'access') {
      return {
        isValid: false,
        isExpired: false,
        isExpiringSoon: false,
        error: 'Invalid token type',
        payload,
      };
    }

    const now = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp <= now;
    const isExpiringSoon = payload.exp - now <= this.EXPIRY_BUFFER_MS / 1000;

    return {
      isValid: !isExpired,
      isExpired,
      isExpiringSoon,
      payload,
      error: isExpired ? 'Token expired' : '',
    };
  }

  /**
   * Validate refresh token
   */
  validateRefreshToken(token: string): TokenValidationResult {
    const result = this.validateToken(token);

    if (result.payload && result.payload.type !== 'refresh') {
      return {
        ...result,
        isValid: false,
        error: 'Invalid refresh token type',
      };
    }

    return result;
  }

  // ==============================================
  // TOKEN STORAGE MANAGEMENT
  // ==============================================

  /**
   * Get current access token from storage
   */
  getAccessToken(): string | null {
    try {
      return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  /**
   * Get current refresh token from storage
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  /**
   * Get current user info from access token
   */
  getCurrentUserInfo(): TokenInfo | null {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }

    return this.getTokenInfo(token);
  }

  /**
   * Check if current user has specific role
   */
  hasRole(role: RoleEnum): boolean {
    const userInfo = this.getCurrentUserInfo();
    return userInfo?.role === role;
  }

  /**
   * Check if current user is admin
   */
  isAdmin(): boolean {
    return this.hasRole(RoleEnum.ADMIN);
  }

  /**
   * Check if current user is manager or admin
   */
  isManager(): boolean {
    return this.hasRole(RoleEnum.MANAGER) || this.isAdmin();
  }

  /**
   * Check if tokens are expired or expiring soon
   */
  isTokenExpiringSoon(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return true;
    }

    const validation = this.validateToken(token);
    return validation.isExpired || validation.isExpiringSoon;
  }

  /**
   * Check if user is authenticated with valid token
   */
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      return false;
    }

    const validation = this.validateToken(token);
    return validation.isValid;
  }

  /**
   * Get time until token expiry in milliseconds
   */
  getTimeUntilExpiry(): number {
    const userInfo = this.getCurrentUserInfo();
    return userInfo?.timeUntilExpiry || 0;
  }

  /**
   * Format time until expiry as human readable string
   * CUSTOMIZE: Bạn có thể thay đổi format hiển thị thời gian ở đây
   */
  formatTimeUntilExpiry(): string {
    const timeMs = this.getTimeUntilExpiry();

    if (timeMs <= 0) {
      return 'Đã hết hạn';
    }

    const minutes = Math.floor(timeMs / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ngày`;
    } else if (hours > 0) {
      return `${hours} giờ`;
    } else {
      return `${minutes} phút`;
    }
  }

  // ==============================================
  // UTILITY METHODS
  // ==============================================

  /**
   * Base64URL decode (without padding)
   */
  private base64UrlDecode(str: string): string | null {
    try {
      // Add padding if needed
      const padded = str + '='.repeat((4 - (str.length % 4)) % 4);

      // Replace URL-safe characters
      const base64 = padded.replace(/-/g, '+').replace(/_/g, '/');

      // Decode
      const decoded = atob(base64);

      // Convert to UTF-8
      return decodeURIComponent(
        decoded
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (error) {
      console.error('Base64URL decode error:', error);
      return null;
    }
  }

  /**
   * Clear all stored tokens
   */
  clearTokens(): void {
    try {
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  /**
   * Debug token information (development only)
   * CUSTOMIZE: Bạn có thể thêm thông tin debug khác ở đây
   */
  debugTokenInfo(): void {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    console.group('🔑 JWT Token Debug Info');

    if (accessToken) {
      const accessInfo = this.getTokenInfo(accessToken);
      const accessValidation = this.validateToken(accessToken);

      console.log('Access Token:', {
        info: accessInfo,
        validation: accessValidation,
        raw: accessToken.substring(0, 50) + '...',
      });
    } else {
      console.log('Access Token: Not found');
    }

    if (refreshToken) {
      const refreshInfo = this.getTokenInfo(refreshToken);
      const refreshValidation = this.validateRefreshToken(refreshToken);

      console.log('Refresh Token:', {
        info: refreshInfo,
        validation: refreshValidation,
        raw: refreshToken.substring(0, 50) + '...',
      });
    } else {
      console.log('Refresh Token: Not found');
    }

    console.groupEnd();
  }
}

// ==============================================
// SINGLETON INSTANCE & HOOKS
// ==============================================

const jwtUtils = JwtUtils.getInstance();

// React hook for JWT utilities
export const useJwt = () => {
  return {
    // Token info
    getCurrentUserInfo: () => jwtUtils.getCurrentUserInfo(),
    getTimeUntilExpiry: () => jwtUtils.getTimeUntilExpiry(),
    formatTimeUntilExpiry: () => jwtUtils.formatTimeUntilExpiry(),

    // Validation
    isAuthenticated: () => jwtUtils.isAuthenticated(),
    isTokenExpiringSoon: () => jwtUtils.isTokenExpiringSoon(),

    // Permissions
    hasRole: (role: RoleEnum) => jwtUtils.hasRole(role),
    isAdmin: () => jwtUtils.isAdmin(),
    isManager: () => jwtUtils.isManager(),

    // Debug
    debugTokenInfo: () => jwtUtils.debugTokenInfo(),
  };
};

// ==============================================
// EXPORTS
// ==============================================

export default jwtUtils;
export { JwtUtils };
export type { JwtPayload, TokenInfo, TokenValidationResult };

// Named exports for convenience
export const {
  parseToken,
  getTokenInfo,
  validateToken,
  validateRefreshToken,
  getAccessToken,
  getRefreshToken,
  getCurrentUserInfo,
  hasRole,
  isAdmin,
  isManager,
  isTokenExpiringSoon,
  isAuthenticated,
  getTimeUntilExpiry,
  formatTimeUntilExpiry,
  clearTokens,
  debugTokenInfo,
} = jwtUtils;
