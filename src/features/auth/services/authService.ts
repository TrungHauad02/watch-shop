import { LoginFormData, LoginResponse } from '../types';

// ==================== MOCK DATA ====================

const MOCK_USERS = [
  {
    id: '01234567-89ab-cdef-0123-456789abcdef',
    name: 'Nguyễn Văn Admin',
    email: 'admin@minhnhatwatch.com',
    password: 'admin123',
    role: 'ADMIN',
  },
  {
    id: '11234567-89ab-cdef-0123-456789abcdef',
    name: 'Trần Thị Manager',
    email: 'manager@minhnhatwatch.com',
    password: 'manager123',
    role: 'MANAGER',
  },
  {
    id: '21234567-89ab-cdef-0123-456789abcdef',
    name: 'Lê Văn User',
    email: 'user@minhnhatwatch.com',
    password: 'user123',
    role: 'USER',
  },
  {
    id: '31234567-89ab-cdef-0123-456789abcdef',
    name: 'Phạm Thị Khách',
    email: 'customer@gmail.com',
    password: '123456',
    role: 'USER',
  },
] as const;

const MOCK_TOKENS = {
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pbmggTmjhuqF0IFdhdGNoIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  refreshToken:
    'refresh_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1pbmggTmjhuqF0IFdhdGNoIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  expiresIn: 86400, // 24 hours
} as const;

// ==================== MOCK SERVICE ====================

class AuthService {
  private readonly mockDelay = {
    login: 1500, // 1.5s để mô phỏng network delay
    logout: 800, // 0.8s
    validate: 1000, // 1s
  };

  /**
   * Mock đăng nhập người dùng
   */
  async login(formData: LoginFormData): Promise<LoginResponse> {
    // Mô phỏng network delay
    await this.delay(this.mockDelay.login);

    try {
      // Simulate API request processing
      console.log('🔐 Mock Login Request:', {
        email: formData.email,
        rememberMe: formData.rememberMe,
        timestamp: new Date().toISOString(),
      });

      // Find user in mock data
      const user = MOCK_USERS.find((u) => u.email === formData.email);

      if (!user) {
        throw new Error('Email không tồn tại trong hệ thống');
      }

      if (user.password !== formData.password) {
        throw new Error('Mật khẩu không chính xác');
      }

      // Simulate successful response
      const response: LoginResponse = {
        accessToken: MOCK_TOKENS.accessToken,
        refreshToken: MOCK_TOKENS.refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };

      console.log('✅ Mock Login Success:', {
        userId: user.id,
        userName: user.name,
        role: user.role,
      });

      return response;
    } catch (error) {
      console.error('❌ Mock Login Error:', error);

      // Simulate different error scenarios
      if (error instanceof Error) {
        throw error;
      }

      // Random network error simulation (5% chance)
      if (Math.random() < 0.05) {
        throw new Error('Lỗi kết nối mạng. Vui lòng thử lại.');
      }

      throw new Error('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  }

  /**
   * Mock đăng xuất người dùng
   */
  async logout(): Promise<void> {
    await this.delay(this.mockDelay.logout);

    try {
      console.log('🚪 Mock Logout Request:', {
        timestamp: new Date().toISOString(),
      });

      // Simulate API call
      // Always succeed for logout

      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      console.log('✅ Mock Logout Success');
    } catch (error) {
      console.error('❌ Mock Logout Error:', error);

      // Always clear local data even if "API" fails
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');

      throw new Error('Đăng xuất thất bại');
    }
  }

  /**
   * Mock validate token
   */
  async validateToken(): Promise<boolean> {
    await this.delay(this.mockDelay.validate);

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        return false;
      }

      // Simulate token validation
      const isValid = token === MOCK_TOKENS.accessToken;

      console.log('🔍 Mock Token Validation:', {
        isValid,
        hasToken: !!token,
      });

      return isValid;
    } catch (error) {
      console.error('❌ Mock Token Validation Error:', error);
      return false;
    }
  }

  /**
   * Mock forgot password
   */
  async forgotPassword(email: string): Promise<void> {
    await this.delay(1200);

    const user = MOCK_USERS.find((u) => u.email === email);

    if (!user) {
      throw new Error('Email không tồn tại trong hệ thống');
    }

    console.log('📧 Mock Forgot Password Email Sent:', {
      email,
      resetToken: 'mock_reset_token_12345',
    });
  }

  /**
   * Mock get current user
   */
  async getCurrentUser(): Promise<LoginResponse['user'] | null> {
    await this.delay(800);

    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (!userStr || !token) {
      return null;
    }

    try {
      const user = JSON.parse(userStr);

      // Validate token
      const isTokenValid = token === MOCK_TOKENS.accessToken;
      if (!isTokenValid) {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
        return null;
      }

      return user;
    } catch {
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      return null;
    }
  }

  /**
   * Mock refresh token
   */
  async refreshToken(): Promise<{ accessToken: string; refreshToken: string }> {
    await this.delay(1000);

    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken || refreshToken !== MOCK_TOKENS.refreshToken) {
      throw new Error('Refresh token không hợp lệ');
    }

    // Return new tokens
    return {
      accessToken: MOCK_TOKENS.accessToken + '_refreshed',
      refreshToken: MOCK_TOKENS.refreshToken + '_refreshed',
    };
  }

  // ==================== HELPER METHODS ====================

  /**
   * Utility để tạo delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  /**
   * Get mock users for development/testing
   */
  getMockUsers() {
    return MOCK_USERS.map((user) => ({
      email: user.email,
      password: user.password,
      role: user.role,
      name: user.name,
    }));
  }

  /**
   * Simulate random errors for testing
   */
  setErrorSimulation(enabled: boolean) {
    console.log(`🧪 Error simulation ${enabled ? 'enabled' : 'disabled'}`);
    // Could store this in localStorage for persistence
    localStorage.setItem('mockErrorSimulation', enabled.toString());
  }

  /**
   * Check if error simulation is enabled
   */
  private isErrorSimulationEnabled(): boolean {
    return localStorage.getItem('mockErrorSimulation') === 'true';
  }
}

export const authService = new AuthService();

// ==================== DEVELOPMENT HELPERS ====================

// Log available test accounts in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔑 Available Test Accounts:', authService.getMockUsers());
}
