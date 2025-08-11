import { User } from '@/shared/types/common.types';

export interface WSHeaderProps {
  onThemeToggle?: () => void;
  isDarkMode?: boolean;
  isAuthenticated?: boolean;
  user?: User | null;
  wishlistCount?: number;
  onLogin?: () => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

export interface NavigationItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
  adminOnly?: boolean;
}
