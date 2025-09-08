import { AUTH_CONFIG } from '@/shared/constants/app.constants';
import { TokenResponse } from '@/shared/api/axiosConfig';
import jwtUtils from './jwtUtils';
import { TokenValidationDTO } from '../types/auth.types';

// ==============================================
// TYPES
// ==============================================

interface TokenScheduler {
  refreshTimer?: NodeJS.Timeout | undefined;
  warningTimer?: NodeJS.Timeout | undefined;
  expiryTimer?: NodeJS.Timeout | undefined;
}

interface TokenManagerConfig {
  autoRefresh: boolean;
  refreshBufferMinutes: number;
  warningMinutes: number;
  onTokenExpiring?: () => void;
  onTokenExpired?: () => void;
  onRefreshSuccess?: (tokenResponse: TokenResponse) => void;
  onRefreshError?: (error: Error) => void;
}

// ==============================================
// TOKEN MANAGER CLASS
// ==============================================

class TokenManager {
  private static instance: TokenManager;
  private scheduler: TokenScheduler = {};
  private config: TokenManagerConfig;

  // CUSTOMIZE: Bạn có thể thay đổi cấu hình mặc định ở đây
  private readonly defaultConfig: TokenManagerConfig = {
    autoRefresh: true,
    refreshBufferMinutes: 5, // Refresh 5 minutes before expiry
    warningMinutes: 10, // Warn 10 minutes before expiry
  };

  constructor(config?: Partial<TokenManagerConfig>) {
    this.config = { ...this.defaultConfig, ...config };
  }

  static getInstance(config?: Partial<TokenManagerConfig>): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager(config);
    }
    return TokenManager.instance;
  }

  // ==============================================
  // TOKEN LIFECYCLE MANAGEMENT
  // ==============================================

  /**
   * Store tokens and setup automatic refresh
   * CUSTOMIZE: Bạn có thể thêm logic xử lý sau khi store tokens ở đây
   */
  setTokens(tokenResponse: TokenResponse): void {
    try {
      // Store tokens in localStorage
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, tokenResponse.accessToken);
      localStorage.setItem(
        AUTH_CONFIG.REFRESH_TOKEN_KEY,
        tokenResponse.refreshToken
      );
      localStorage.setItem(
        AUTH_CONFIG.USER_KEY,
        JSON.stringify(tokenResponse.user)
      );

      // Setup automatic refresh schedule
      if (this.config.autoRefresh) {
        this.scheduleTokenRefresh(tokenResponse.accessToken);
      }

      console.log('✅ Tokens stored and refresh scheduled');
    } catch (error) {
      console.error('❌ Error storing tokens:', error);
      throw new Error('Failed to store authentication tokens');
    }
  }

  /**
   * Clear all tokens and cancel timers
   */
  clearTokens(): void {
    try {
      // Clear localStorage
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.USER_KEY);

      // Cancel all timers
      this.cancelAllTimers();

      console.log('✅ Tokens cleared and timers cancelled');
    } catch (error) {
      console.error('❌ Error clearing tokens:', error);
    }
  }

  /**
   * Schedule automatic token refresh
   * CUSTOMIZE: Bạn có thể thay đổi logic scheduling ở đây
   */
  private scheduleTokenRefresh(accessToken: string): void {
    // Cancel existing timers
    this.cancelAllTimers();

    const tokenInfo = jwtUtils.getTokenInfo(accessToken);
    if (!tokenInfo) {
      console.warn('Cannot schedule refresh: Invalid token');
      return;
    }

    const now = Date.now();
    const expiryTime = tokenInfo.expiresAt.getTime();
    const refreshTime =
      expiryTime - this.config.refreshBufferMinutes * 60 * 1000;
    const warningTime = expiryTime - this.config.warningMinutes * 60 * 1000;

    // Schedule warning
    if (warningTime > now && this.config.onTokenExpiring) {
      const warningDelay = warningTime - now;
      this.scheduler.warningTimer = setTimeout(() => {
        console.warn('⚠️ Token expiring soon');
        this.config.onTokenExpiring?.();
      }, warningDelay);
    }

    // Schedule refresh
    if (refreshTime > now) {
      const refreshDelay = refreshTime - now;
      this.scheduler.refreshTimer = setTimeout(async () => {
        try {
          await this.refreshAccessToken();
        } catch (error) {
          console.error('❌ Scheduled token refresh failed:', error);
          this.config.onRefreshError?.(error as Error);
        }
      }, refreshDelay);

      console.log(
        `🔄 Token refresh scheduled in ${Math.round(refreshDelay / 1000 / 60)} minutes`
      );
    }

    // Schedule expiry handler
    if (expiryTime > now && this.config.onTokenExpired) {
      const expiryDelay = expiryTime - now;
      this.scheduler.expiryTimer = setTimeout(() => {
        console.error('🚨 Token expired');
        this.config.onTokenExpired?.();
      }, expiryDelay);
    }
  }

  /**
   * Cancel all scheduled timers
   */
  private cancelAllTimers(): void {
    if (this.scheduler.refreshTimer) {
      clearTimeout(this.scheduler.refreshTimer);
      this.scheduler.refreshTimer = undefined;
    }

    if (this.scheduler.warningTimer) {
      clearTimeout(this.scheduler.warningTimer);
      this.scheduler.warningTimer = undefined;
    }

    if (this.scheduler.expiryTimer) {
      clearTimeout(this.scheduler.expiryTimer);
      this.scheduler.expiryTimer = undefined;
    }
  }

  // ==============================================
  // TOKEN REFRESH
  // ==============================================

  /**
   * Refresh access token using refresh token
   * CUSTOMIZE: Bạn có thể thay đổi endpoint refresh token ở đây
   */
  async refreshAccessToken(): Promise<TokenResponse> {
    const refreshToken = localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Validate refresh token
    const validation = jwtUtils.validateRefreshToken(refreshToken);
    if (!validation.isValid) {
      throw new Error(`Invalid refresh token: ${validation.error}`);
    }

    try {
      // Import apiClient here to avoid circular dependency
      const { default: apiClient } = await import('@/shared/api/axiosConfig');

      // Call refresh endpoint (matches AuthController.java)
      const response = await apiClient.postData<TokenResponse>(
        '/auth/refresh',
        {
          refreshToken,
        }
      );

      // Store new tokens and reschedule
      this.setTokens(response);

      // Notify success
      this.config.onRefreshSuccess?.(response);

      console.log('✅ Token refreshed successfully');
      return response;
    } catch (error) {
      console.error('❌ Token refresh failed:', error);

      // Clear tokens on refresh failure
      this.clearTokens();

      throw error;
    }
  }

  /**
   * Manual token refresh (can be called by user action)
   */
  async manualRefreshToken(): Promise<TokenResponse> {
    console.log('🔄 Manual token refresh initiated');
    return this.refreshAccessToken();
  }

  // ==============================================
  // TOKEN VALIDATION
  // ==============================================

  /**
   * Check if current tokens are valid
   */
  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    if (!accessToken) {
      return false;
    }

    const validation = jwtUtils.validateToken(accessToken);
    return validation.isValid;
  }

  /**
   * Check if token needs refresh
   */
  needsRefresh(): boolean {
    const accessToken = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    if (!accessToken) {
      return false;
    }

    const tokenInfo = jwtUtils.getTokenInfo(accessToken);
    if (!tokenInfo) {
      return false;
    }

    // Check if token expires within refresh buffer time
    const bufferMs = this.config.refreshBufferMinutes * 60 * 1000;
    return tokenInfo.timeUntilExpiry <= bufferMs;
  }

  /**
   * Get token status information
   */
  getTokenStatus(): {
    isAuthenticated: boolean;
    needsRefresh: boolean;
    timeUntilExpiry: number;
    timeUntilRefresh: number;
    formattedTimeUntilExpiry: string;
  } {
    const isAuthenticated = this.isAuthenticated();
    const needsRefresh = this.needsRefresh();
    const timeUntilExpiry = jwtUtils.getTimeUntilExpiry();
    const bufferMs = this.config.refreshBufferMinutes * 60 * 1000;
    const timeUntilRefresh = Math.max(0, timeUntilExpiry - bufferMs);
    const formattedTimeUntilExpiry = jwtUtils.formatTimeUntilExpiry();

    return {
      isAuthenticated,
      needsRefresh,
      timeUntilExpiry,
      timeUntilRefresh,
      formattedTimeUntilExpiry,
    };
  }

  // ==============================================
  // CONFIGURATION
  // ==============================================

  /**
   * Update token manager configuration
   * CUSTOMIZE: Bạn có thể thêm các options config khác ở đây
   */
  updateConfig(newConfig: Partial<TokenManagerConfig>): void {
    this.config = { ...this.config, ...newConfig };

    // Reschedule with new config if token exists
    const accessToken = localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    if (accessToken && this.config.autoRefresh) {
      this.scheduleTokenRefresh(accessToken);
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): TokenManagerConfig {
    return { ...this.config };
  }

  // ==============================================
  // UTILITIES
  // ==============================================

  /**
   * Force token validation with backend
   */
  async validateWithBackend(): Promise<boolean> {
    try {
      const { default: apiClient } = await import('@/shared/api/axiosConfig');

      const response: TokenValidationDTO = await apiClient.postData(
        '/auth/validate-token',
        {}
      );
      return response.valid === true;
    } catch (error) {
      console.error('❌ Backend token validation failed:', error);
      return false;
    }
  }

  /**
   * Get debug information
   */
  getDebugInfo(): object {
    const tokenStatus = this.getTokenStatus();
    const hasTimers = {
      refreshTimer: !!this.scheduler.refreshTimer,
      warningTimer: !!this.scheduler.warningTimer,
      expiryTimer: !!this.scheduler.expiryTimer,
    };

    return {
      config: this.config,
      tokenStatus,
      hasTimers,
      currentTime: new Date().toISOString(),
    };
  }

  /**
   * Debug token manager (development only)
   */
  debug(): void {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    console.group('🔐 Token Manager Debug');
    console.log('Config:', this.config);
    console.log('Status:', this.getTokenStatus());
    console.log('Timers:', {
      refresh: !!this.scheduler.refreshTimer,
      warning: !!this.scheduler.warningTimer,
      expiry: !!this.scheduler.expiryTimer,
    });
    jwtUtils.debugTokenInfo();
    console.groupEnd();
  }
}

// ==============================================
// REACT HOOKS
// ==============================================

/**
 * React hook for token manager
 * CUSTOMIZE: Bạn có thể thêm các hook methods khác ở đây
 */
export const useTokenManager = (config?: Partial<TokenManagerConfig>) => {
  const tokenManager = TokenManager.getInstance(config);

  return {
    // Token operations
    refreshToken: () => tokenManager.manualRefreshToken(),
    clearTokens: () => tokenManager.clearTokens(),

    // Status checks
    isAuthenticated: () => tokenManager.isAuthenticated(),
    needsRefresh: () => tokenManager.needsRefresh(),
    getTokenStatus: () => tokenManager.getTokenStatus(),

    // Validation
    validateWithBackend: () => tokenManager.validateWithBackend(),

    // Configuration
    updateConfig: (newConfig: Partial<TokenManagerConfig>) =>
      tokenManager.updateConfig(newConfig),
    getConfig: () => tokenManager.getConfig(),

    // Debug
    debug: () => tokenManager.debug(),
  };
};

// ==============================================
// SINGLETON INSTANCE
// ==============================================

const tokenManager = TokenManager.getInstance();

// ==============================================
// EXPORTS
// ==============================================

export default tokenManager;
export { TokenManager };
export type { TokenManagerConfig, TokenScheduler };

// Named exports for convenience
export const {
  setTokens,
  clearTokens,
  refreshAccessToken,
  manualRefreshToken,
  isAuthenticated,
  needsRefresh,
  getTokenStatus,
  validateWithBackend,
  updateConfig,
  getConfig,
  debug,
} = tokenManager;
