export interface WSHeaderProps {
  /** Function to toggle theme mode */
  onThemeToggle?: () => void;

  /** Current theme mode */
  isDarkMode?: boolean;

  /** Whether user is authenticated */
  isAuthenticated?: boolean;

  /** Current user information */
  user?: {
    name: string;
    email: string;
    avatar?: string;
    role?: string;
  } | null;

  /** Number of items in wishlist */
  wishlistCount?: number;

  /** Number of items in cart */
  cartCount?: number;

  /** Login handler */
  onLogin?: () => void;

  /** Logout handler */
  onLogout?: () => void;

  /** Profile click handler */
  onProfileClick?: () => void;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

export interface UserMenuAction {
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color?: 'inherit' | 'primary' | 'secondary' | 'error';
  divider?: boolean;
}
