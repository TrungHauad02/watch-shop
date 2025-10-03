/* eslint-disable @typescript-eslint/no-unused-vars */
import { Home, Watch, Category, Info } from '@mui/icons-material';

export interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

// ==================== NAVIGATION ITEMS ====================

export const navigationItems: NavigationItem[] = [
  {
    label: 'Trang chủ',
    path: '/',
    icon: <Home />,
  },
  {
    label: 'Sản phẩm',
    path: '/products',
    icon: <Watch />,
  },
  {
    label: 'Thương hiệu',
    path: '/brands',
    icon: <Watch />,
  },
  {
    label: 'Danh mục',
    path: '/categories',
    icon: <Category />,
  },
  {
    label: 'Về chúng tôi',
    path: '#',
    icon: <Info />,
  },
];

// ==================== COMPANY INFORMATION ====================

export const companyData = {
  name: 'WatchStore',
  fullName: 'Minh Nhật Watch Shop',
  logo: '/logo.png', // Path to logo image if needed
  description: 'Chuyên cung cấp đồng hồ chính hãng cao cấp',
} as const;

// ==================== SEARCH CONFIGURATION ====================

export const searchConfig = {
  placeholder: 'Tìm kiếm đồng hồ...',
  maxSuggestions: 5,
  debounceDelay: 300, // ms
  minSearchLength: 2,
} as const;

// ==================== LAYOUT CONFIGURATION ====================

export const headerConfig = {
  // Height configuration
  heights: {
    mobile: 56,
    desktop: 64,
  },
  // Breakpoints
  breakpoints: {
    mobile: 'md', // Below md = mobile
  },
  // Features toggles
  features: {
    showWishlist: true,
    showSearch: true,
    showUserMenu: true,
    enableStickyHeader: false,
  },
  // Mobile drawer width
  drawer: {
    width: 280,
  },
} as const;

// ==================== USER MENU ACTIONS ====================

export const userMenuActions = [
  {
    key: 'profile',
    label: 'Thông tin cá nhân',
    path: '/profile',
  },
  {
    key: 'wishlist',
    label: 'Danh sách yêu thích',
    path: '/wishlist',
  },
] as const;

// ==================== HELPER FUNCTIONS ====================

/**
 * Get navigation items based on authentication state
 */
export const getNavigationItems = (
  isAuthenticated: boolean,
  isAdmin: boolean = false
) => {
  return navigationItems.filter((item) => {
    if (item.requiresAuth && !isAuthenticated) return false;
    if (item.adminOnly && !isAdmin) return false;
    return true;
  });
};

/**
 * Get user menu actions based on features
 */
export const getUserMenuActions = () => {
  // In a real application, you might want to filter actions based on user roles or permissions
  return true;
};

export default {
  navigationItems,
  companyData,
  searchConfig,
  headerConfig,
  userMenuActions,
  getNavigationItems,
  getUserMenuActions,
};
