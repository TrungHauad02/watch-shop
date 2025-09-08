/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  API_CONFIG,
  AUTH_CONFIG,
  ERROR_CODES,
} from '@/shared/constants/app.constants';
import { User } from '../types/common.types';

// ==============================================
// TYPES
// ==============================================

interface ApiError {
  code: string;
  message: string;
  details?: string | undefined;
  timestamp?: string | undefined;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string; // Always "Bearer"
  expiresIn: number; // In seconds
  user: User;
}

interface BackendResponse<T = any> {
  status: boolean;
  data: T;
  message: string;
  errorDetail?: string; // Only present in dev mode or errors
}

interface RefreshTokenResponse extends BackendResponse<TokenResponse> {
  status: true;
  data: TokenResponse;
}

// ==============================================
// TOKEN MANAGEMENT
// ==============================================

class TokenManager {
  private static instance: TokenManager;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];

  static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem(AUTH_CONFIG.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  setTokens(tokenResponse: TokenResponse): void {
    try {
      localStorage.setItem(AUTH_CONFIG.TOKEN_KEY, tokenResponse.accessToken);
      localStorage.setItem(
        AUTH_CONFIG.REFRESH_TOKEN_KEY,
        tokenResponse.refreshToken
      );

      // Store user data from token response
      localStorage.setItem(
        AUTH_CONFIG.USER_KEY,
        JSON.stringify(tokenResponse.user)
      );
    } catch (error) {
      console.error('Error setting tokens:', error);
    }
  }

  clearTokens(): void {
    try {
      localStorage.removeItem(AUTH_CONFIG.TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      localStorage.removeItem(AUTH_CONFIG.USER_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  }

  async refreshAccessToken(): Promise<string> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ resolve, reject });
      });
    }

    this.isRefreshing = true;
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      this.processQueue(null, new Error('No refresh token available'));
      this.clearTokens();
      window.location.href = '/login';
      throw new Error('No refresh token available');
    }

    try {
      // Send refresh token in request body as RefreshTokenRequestDTO
      const response = await axios.post<RefreshTokenResponse>(
        `${API_CONFIG.BASE_URL}/auth/refresh`,
        {
          refreshToken: refreshToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Enable cookies for CookieUtil.java compatibility
        }
      );

      // Backend returns ResponseDTO<TokenResponse> format
      if (response.data.status && response.data.data) {
        const tokenResponse = response.data.data;
        this.setTokens(tokenResponse);
        this.processQueue(tokenResponse.accessToken, null);
        return tokenResponse.accessToken;
      } else {
        throw new Error(response.data.message || 'Token refresh failed');
      }
    } catch (error) {
      this.processQueue(null, error);
      this.clearTokens();
      window.location.href = '/login';
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  private processQueue(token: string | null, error: unknown): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else if (token) {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  getUserData(): User | null {
    try {
      const userData = localStorage.getItem(AUTH_CONFIG.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }
}

// ==============================================
// AXIOS CONFIGURATION
// ==============================================

class ApiClient {
  private instance: AxiosInstance;
  private tokenManager: TokenManager;

  constructor() {
    this.tokenManager = TokenManager.getInstance();
    this.instance = this.createAxiosInstance();
    this.setupInterceptors();
  }

  private createAxiosInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // Fixed: Enable credentials for CookieUtil.java compatibility
      withCredentials: true,
      // CUSTOMIZE: Thêm các headers mặc định khác ở đây
    });

    return instance;
  }

  private setupInterceptors(): void {
    // Request Interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Add auth token to requests (matches JwtAuthenticationFilter.java)
        const token = this.tokenManager.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request timestamp for debugging
        if (process.env.NODE_ENV === 'development') {
          (config as any).metadata = { startTime: new Date().getTime() };
        }

        // CUSTOMIZE: Bạn có thể thêm logic xử lý request khác ở đây
        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
        );

        return config;
      },
      (error: AxiosError) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(this.handleError(error));
      }
    );

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse<BackendResponse>) => {
        // Log successful responses in development
        if (process.env.NODE_ENV === 'development') {
          const config = response.config as InternalAxiosRequestConfig & {
            metadata?: { startTime: number };
          };
          const duration = config.metadata
            ? new Date().getTime() - config.metadata.startTime
            : 0;
          console.log(
            `✅ API Response: ${config.method?.toUpperCase()} ${config.url} - ${response.status} (${duration}ms)`
          );
        }

        // CUSTOMIZE: Bạn có thể thêm logic xử lý response thành công ở đây

        // Backend uses ResponseDTO format for all successful responses
        // All 2xx responses should contain ResponseDTO structure
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 Unauthorized - Token expired (matches SecurityConfig.java)
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const newToken = await this.tokenManager.refreshAccessToken();
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.instance(originalRequest);
          } catch (refreshError) {
            console.error('❌ Token refresh failed:', refreshError);
            return Promise.reject(this.handleError(error));
          }
        }

        // Handle other errors
        console.error('❌ API Response Error:', error);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(
    error: AxiosError<unknown> | AxiosError<BackendResponse> | ApiError
  ): ApiError {
    // If it's already an ApiError, return as is
    if ('code' in error && 'timestamp' in error) {
      return error as ApiError;
    }

    const axiosError = error as AxiosError<BackendResponse>;

    // CUSTOMIZE: Bạn có thể tùy chỉnh cách xử lý lỗi ở đây

    // Network error
    if (!axiosError.response) {
      return {
        code: ERROR_CODES.NETWORK_ERROR,
        message: 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet.',
        details: axiosError.message,
        timestamp: new Date().toISOString(),
      };
    }

    const { status, data } = axiosError.response;

    // Fixed: Handle backend ResponseDTO error format
    // Backend throws exceptions caught by GlobalExceptionHandler.java
    if (data && typeof data === 'object' && 'status' in data) {
      const backendResponse = data as BackendResponse;

      // Backend error responses have status: false
      if (!backendResponse.status) {
        return {
          code:
            this.extractErrorCode(backendResponse) ||
            this.getErrorCodeByStatus(status),
          message:
            backendResponse.message || this.getDefaultMessageByStatus(status),
          details: backendResponse.errorDetail || 'No additional details',
          timestamp: new Date().toISOString(),
        };
      }
    }

    // Handle Spring Boot default error responses (when GlobalExceptionHandler doesn't catch)
    if (data && typeof data === 'object' && 'message' in data) {
      return {
        code: this.getErrorCodeByStatus(status),
        message:
          (data as any).message || this.getDefaultMessageByStatus(status),
        details:
          (data as any).error || (data as any).path || axiosError.message,
        timestamp: (data as any).timestamp || new Date().toISOString(),
      };
    }

    // Fallback for non-backend responses
    return {
      code: this.getErrorCodeByStatus(status),
      message: this.getDefaultMessageByStatus(status),
      details: axiosError.message,
      timestamp: new Date().toISOString(),
    };
  }

  // Extract error code from backend response (matches ErrorCodes.java)
  private extractErrorCode(backendResponse: BackendResponse): string | null {
    // Check if errorDetail contains error code (from development mode)
    if (backendResponse.errorDetail) {
      // Look for error codes from ErrorCodes.java
      const errorCodes = [
        'RESOURCE_001',
        'RESOURCE_002',
        'RESOURCE_003',
        'RESOURCE_004',
        'VALIDATION_001',
        'VALIDATION_002',
        'VALIDATION_003',
        'VALIDATION_004',
        'VALIDATION_005',
        'AUTH_001',
        'AUTH_002',
        'AUTH_003',
        'AUTH_004',
        'BUSINESS_001',
        'BUSINESS_002',
        'BUSINESS_003',
        'BUSINESS_004',
        'SYSTEM_001',
        'SYSTEM_002',
        'SYSTEM_003',
        'SYSTEM_004',
        'SYSTEM_999',
        'INTEGRATION_001',
        'INTEGRATION_002',
        'INTEGRATION_003',
        'INTEGRATION_004',
      ];

      for (const code of errorCodes) {
        if (backendResponse.errorDetail.includes(code)) {
          return code;
        }
      }
    }

    return null;
  }

  // Map HTTP status codes to backend error codes (matches ErrorCodes.java)
  private getErrorCodeByStatus(status: number): string {
    switch (status) {
      case 400:
        return 'VALIDATION_001'; // INVALID_INPUT
      case 401:
        return 'AUTH_001'; // UNAUTHORIZED
      case 403:
        return 'AUTH_004'; // ACCESS_FORBIDDEN
      case 404:
        return 'RESOURCE_001'; // NOT_FOUND
      case 408:
        return ERROR_CODES.TIMEOUT_ERROR;
      case 409:
        return 'RESOURCE_003'; // ALREADY_EXISTS
      case 422:
        return 'BUSINESS_004'; // INVALID_OPERATION
      case 500:
        return 'SYSTEM_999'; // UNKNOWN_ERROR
      case 503:
        return 'SYSTEM_002'; // EXTERNAL_SERVICE_UNAVAILABLE
      default:
        return 'SYSTEM_999'; // UNKNOWN_ERROR
    }
  }

  private getDefaultMessageByStatus(status: number): string {
    switch (status) {
      case 400:
        return 'Dữ liệu không hợp lệ';
      case 401:
        return 'Bạn cần đăng nhập để tiếp tục';
      case 403:
        return 'Bạn không có quyền thực hiện hành động này';
      case 404:
        return 'Không tìm thấy dữ liệu';
      case 408:
        return 'Quá thời gian chờ, vui lòng thử lại';
      case 409:
        return 'Dữ liệu đã tồn tại';
      case 422:
        return 'Có lỗi xảy ra trong quá trình xử lý';
      case 500:
        return 'Lỗi máy chủ, vui lòng thử lại sau';
      case 503:
        return 'Dịch vụ tạm thời không khả dụng';
      default:
        return 'Có lỗi xảy ra, vui lòng thử lại';
    }
  }

  // HTTP methods - Return complete BackendResponse for full access to metadata
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BackendResponse<T>> {
    const response = await this.instance.get<BackendResponse<T>>(url, config);
    return response.data;
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<BackendResponse<T>> {
    const response = await this.instance.post<BackendResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<BackendResponse<T>> {
    const response = await this.instance.put<BackendResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<BackendResponse<T>> {
    const response = await this.instance.patch<BackendResponse<T>>(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<BackendResponse<T>> {
    const response = await this.instance.delete<BackendResponse<T>>(
      url,
      config
    );
    return response.data;
  }

  // Convenience methods - Extract data field and validate status
  async getData<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.get<T>(url, config);
    if (!response.status) {
      const error: ApiError = {
        code: this.extractErrorCode(response) || 'API_ERROR',
        message: response.message,
        details: response.errorDetail,
        timestamp: new Date().toISOString(),
      };
      throw error;
    }
    return response.data;
  }

  async postData<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.post<T>(url, data, config);
    if (!response.status) {
      const error: ApiError = {
        code: this.extractErrorCode(response) || 'API_ERROR',
        message: response.message,
        details: response.errorDetail,
        timestamp: new Date().toISOString(),
      };
      throw error;
    }
    return response.data;
  }

  async putData<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.put<T>(url, data, config);
    if (!response.status) {
      const error: ApiError = {
        code: this.extractErrorCode(response) || 'API_ERROR',
        message: response.message,
        details: response.errorDetail,
        timestamp: new Date().toISOString(),
      };
      throw error;
    }
    return response.data;
  }

  async patchData<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.patch<T>(url, data, config);
    if (!response.status) {
      const error: ApiError = {
        code: this.extractErrorCode(response) || 'API_ERROR',
        message: response.message,
        details: response.errorDetail,
        timestamp: new Date().toISOString(),
      };
      throw error;
    }
    return response.data;
  }

  async deleteData<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.delete<T>(url, config);
    if (!response.status) {
      const error: ApiError = {
        code: this.extractErrorCode(response) || 'API_ERROR',
        message: response.message,
        details: response.errorDetail,
        timestamp: new Date().toISOString(),
      };
      throw error;
    }
    return response.data;
  }

  // Get the raw axios instance if needed
  getInstance(): AxiosInstance {
    return this.instance;
  }

  // Authentication utilities - Match backend TokenResponse format
  setAuthTokens(tokenResponse: TokenResponse): void {
    this.tokenManager.setTokens(tokenResponse);
  }

  clearAuth(): void {
    this.tokenManager.clearTokens();
  }

  isAuthenticated(): boolean {
    return !!this.tokenManager.getAccessToken();
  }

  getCurrentUser(): User | null {
    return this.tokenManager.getUserData();
  }
}

// ==============================================
// SINGLETON INSTANCE
// ==============================================

const apiClient = new ApiClient();

// ==============================================
// EXPORTS
// ==============================================

export default apiClient;
export { ApiClient, TokenManager };
export type { ApiError, TokenResponse, RefreshTokenResponse, BackendResponse };

// Named exports for convenience
export const {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  patch: apiPatch,
  delete: apiDelete,
  getData: apiGetData,
  postData: apiPostData,
  putData: apiPutData,
  patchData: apiPatchData,
  deleteData: apiDeleteData,
  getInstance: getAxiosInstance,
  setAuthTokens,
  clearAuth,
  isAuthenticated,
  getCurrentUser,
} = apiClient;
