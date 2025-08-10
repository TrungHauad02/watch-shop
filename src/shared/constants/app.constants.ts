// ==============================================
// APPLICATION INFO
// ==============================================

export const APP_CONFIG = {
  NAME: 'WatchStore',
  VERSION: '1.0.0',
  DESCRIPTION: 'Premium Watch E-commerce Platform',
  AUTHOR: 'WatchStore Team',
  CONTACT_EMAIL: 'support@watchstore.vn',
  PHONE: '+84 123 456 789',
} as const;

// ==============================================
// API CONFIGURATION
// ==============================================

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
} as const;

// ==============================================
// AUTHENTICATION
// ==============================================

export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth-token',
  REFRESH_TOKEN_KEY: 'refresh-token',
  USER_KEY: 'user-data',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
  AUTO_LOGOUT_TIME: 30 * 60 * 1000, // 30 minutes of inactivity
} as const;

// ==============================================
// PAGINATION
// ==============================================

export const PAGINATION = {
  DEFAULT_PAGE: 0,
  DEFAULT_SIZE: 20,
  MAX_SIZE: 100,
  SIZE_OPTIONS: [12, 24, 48, 96],
} as const;

// ==============================================
// UI CONFIGURATION
// ==============================================

export const UI_CONFIG = {
  DEBOUNCE_DELAY: 500, // 500ms for search
  TOAST_DURATION: 4000, // 4 seconds
  LOADING_DELAY: 200, // Show loading after 200ms
  ANIMATION_DURATION: 300, // 300ms for transitions
  SIDEBAR_WIDTH: 240, // pixels
  HEADER_HEIGHT: 64, // pixels
  FOOTER_HEIGHT: 200, // pixels
} as const;

// ==============================================
// BREAKPOINTS (matching MUI)
// ==============================================

export const BREAKPOINTS = {
  XS: 0,
  SM: 600,
  MD: 900,
  LG: 1200,
  XL: 1536,
} as const;

// ==============================================
// FILE UPLOAD
// ==============================================

export const FILE_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_FILES_PER_UPLOAD: 10,
  IMAGE_QUALITY: 0.8,
  THUMBNAIL_SIZE: 200,
} as const;

// ==============================================
// BUSINESS RULES
// ==============================================

export const BUSINESS_RULES = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 128,
  MIN_SEARCH_LENGTH: 2,
  MAX_WISHLIST_ITEMS: 100,
  MAX_COMPARE_ITEMS: 4,
  MAX_RECENT_VIEWED: 50,
  MIN_PRODUCT_PRICE: 0,
  MAX_PRODUCT_PRICE: 1000000000, // 1 billion VND
  MAX_DISCOUNT_PERCENT: 100,
} as const;

// ==============================================
// VALIDATION PATTERNS
// ==============================================

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_VN: /^(\+84|84|0)[3|5|7|8|9][0-9]{8}$/,
  PRODUCT_ID: /^[A-Z0-9]{3,20}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
} as const;

// ==============================================
// LOCAL STORAGE KEYS
// ==============================================

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'ws-auth-token',
  REFRESH_TOKEN: 'ws-refresh-token',
  USER_DATA: 'ws-user-data',
  THEME_MODE: 'ws-theme-mode',
  LANGUAGE: 'ws-language',
  CART: 'ws-cart',
  WISHLIST: 'ws-wishlist',
  RECENTLY_VIEWED: 'ws-recently-viewed',
  SEARCH_HISTORY: 'ws-search-history',
  USER_PREFERENCES: 'ws-user-preferences',
} as const;

// ==============================================
// ROUTES
// ==============================================

export const ROUTES = {
  // Public routes
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CATEGORIES: '/categories',
  CATEGORY_PRODUCTS: '/categories/:categoryId/products',
  BRANDS: '/brands',
  BRAND_PRODUCTS: '/brands/:brandId/products',
  SEARCH: '/search',

  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  VERIFY_EMAIL: '/verify-email',

  // User routes
  PROFILE: '/profile',
  CHANGE_PASSWORD: '/change-password',
  WISHLIST: '/wishlist',
  ORDER_HISTORY: '/orders',

  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_BRANDS: '/admin/brands',
  ADMIN_USERS: '/admin/users',
  ADMIN_ANALYTICS: '/admin/analytics',

  // Error routes
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
  SERVER_ERROR: '/500',
} as const;

// ==============================================
// ERROR CODES
// ==============================================

export const ERROR_CODES = {
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',

  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  REQUIRED_FIELD: 'REQUIRED_FIELD',
  INVALID_FORMAT: 'INVALID_FORMAT',

  // Business logic errors
  INSUFFICIENT_STOCK: 'INSUFFICIENT_STOCK',
  PRODUCT_NOT_FOUND: 'PRODUCT_NOT_FOUND',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',

  // Server errors
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
} as const;

// ==============================================
// SUCCESS MESSAGES (Vietnamese)
// ==============================================

export const SUCCESS_MESSAGES = {
  LOGIN: 'Đăng nhập thành công',
  REGISTER: 'Đăng ký thành công',
  LOGOUT: 'Đăng xuất thành công',
  PROFILE_UPDATED: 'Cập nhật thông tin thành công',
  PASSWORD_CHANGED: 'Đổi mật khẩu thành công',
  EMAIL_VERIFIED: 'Xác thực email thành công',

  PRODUCT_CREATED: 'Tạo sản phẩm thành công',
  PRODUCT_UPDATED: 'Cập nhật sản phẩm thành công',
  PRODUCT_DELETED: 'Xóa sản phẩm thành công',

  CATEGORY_CREATED: 'Tạo danh mục thành công',
  CATEGORY_UPDATED: 'Cập nhật danh mục thành công',
  CATEGORY_DELETED: 'Xóa danh mục thành công',

  BRAND_CREATED: 'Tạo thương hiệu thành công',
  BRAND_UPDATED: 'Cập nhật thương hiệu thành công',
  BRAND_DELETED: 'Xóa thương hiệu thành công',

  ADDED_TO_WISHLIST: 'Đã thêm vào danh sách yêu thích',
  REMOVED_FROM_WISHLIST: 'Đã xóa khỏi danh sách yêu thích',
} as const;

// ==============================================
// ERROR MESSAGES (Vietnamese)
// ==============================================

export const ERROR_MESSAGES = {
  // General errors
  GENERAL: 'Có lỗi xảy ra, vui lòng thử lại',
  NETWORK: 'Lỗi kết nối mạng',
  TIMEOUT: 'Quá thời gian chờ, vui lòng thử lại',

  // Authentication errors
  UNAUTHORIZED: 'Bạn cần đăng nhập để tiếp tục',
  FORBIDDEN: 'Bạn không có quyền thực hiện hành động này',
  INVALID_CREDENTIALS: 'Email hoặc mật khẩu không đúng',
  TOKEN_EXPIRED: 'Phiên đăng nhập đã hết hạn',

  // Validation errors
  REQUIRED_FIELD: 'Trường này không được để trống',
  INVALID_EMAIL: 'Email không hợp lệ',
  INVALID_PHONE: 'Số điện thoại không hợp lệ',
  PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự',
  PASSWORD_MISMATCH: 'Mật khẩu xác nhận không khớp',

  // Business logic errors
  NOT_FOUND: 'Không tìm thấy dữ liệu',
  PRODUCT_NOT_FOUND: 'Không tìm thấy sản phẩm',
  CATEGORY_NOT_FOUND: 'Không tìm thấy danh mục',
  BRAND_NOT_FOUND: 'Không tìm thấy thương hiệu',
  USER_NOT_FOUND: 'Không tìm thấy người dùng',

  INSUFFICIENT_STOCK: 'Sản phẩm không đủ số lượng trong kho',
  DUPLICATE_EMAIL: 'Email đã được sử dụng',
  DUPLICATE_PRODUCT_ID: 'Mã sản phẩm đã tồn tại',

  // File upload errors
  FILE_TOO_LARGE: 'File quá lớn (tối đa 5MB)',
  INVALID_FILE_TYPE: 'Định dạng file không được hỗ trợ',
  UPLOAD_FAILED: 'Tải file lên thất bại',

  // Server errors
  SERVER_ERROR: 'Lỗi máy chủ, vui lòng thử lại sau',
  SERVICE_UNAVAILABLE: 'Dịch vụ tạm thời không khả dụng',
} as const;

// ==============================================
// CONFIRMATION MESSAGES (Vietnamese)
// ==============================================

export const CONFIRMATION_MESSAGES = {
  DELETE_PRODUCT: 'Bạn có chắc chắn muốn xóa sản phẩm này?',
  DELETE_CATEGORY: 'Bạn có chắc chắn muốn xóa danh mục này?',
  DELETE_BRAND: 'Bạn có chắc chắn muốn xóa thương hiệu này?',
  DELETE_USER: 'Bạn có chắc chắn muốn xóa người dùng này?',
  LOGOUT: 'Bạn có chắc chắn muốn đăng xuất?',
  CANCEL_ORDER: 'Bạn có chắc chắn muốn hủy đơn hàng?',
  CLEAR_WISHLIST:
    'Bạn có chắc chắn muốn xóa tất cả sản phẩm trong danh sách yêu thích?',
  CLEAR_CART: 'Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?',
} as const;

// ==============================================
// LOADING MESSAGES (Vietnamese)
// ==============================================

export const LOADING_MESSAGES = {
  DEFAULT: 'Đang tải...',
  LOGIN: 'Đang đăng nhập...',
  REGISTER: 'Đang đăng ký...',
  LOGOUT: 'Đang đăng xuất...',
  LOADING_PRODUCTS: 'Đang tải sản phẩm...',
  LOADING_CATEGORIES: 'Đang tải danh mục...',
  LOADING_BRANDS: 'Đang tải thương hiệu...',
  UPLOADING: 'Đang tải file lên...',
  SEARCHING: 'Đang tìm kiếm...',
  PROCESSING: 'Đang xử lý...',
  SAVING: 'Đang lưu...',
  DELETING: 'Đang xóa...',
} as const;

// ==============================================
// FEATURE FLAGS
// ==============================================

export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: true,
  ENABLE_PWA: false,
  ENABLE_ANALYTICS: true,
  ENABLE_CHAT_SUPPORT: false,
  ENABLE_SOCIAL_LOGIN: true,
  ENABLE_WISHLIST: true,
  ENABLE_PRODUCT_COMPARISON: true,
  ENABLE_REVIEWS: false, // Future feature
  ENABLE_NOTIFICATIONS: true,
  ENABLE_OFFLINE_MODE: false,
} as const;

// ==============================================
// ENVIRONMENT
// ==============================================

export const ENV = {
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'WatchStore',
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  VERSION: import.meta.env.PACKAGE_VERSION || '1.0.0',
} as const;

export const isDevelopment = ENV.NODE_ENV === 'development';
export const isProduction = ENV.NODE_ENV === 'production';
export const isTest = ENV.NODE_ENV === 'test';

// ==============================================
// TYPE EXPORTS
// ==============================================

export type StorageKey = keyof typeof STORAGE_KEYS;
export type RouteKey = keyof typeof ROUTES;
export type ErrorCode = keyof typeof ERROR_CODES;
export type SuccessMessage = keyof typeof SUCCESS_MESSAGES;
export type ErrorMessage = keyof typeof ERROR_MESSAGES;
