import { WSHeaderProps } from '../WSHeader/WSHeader.types';
import { SxProps, Theme } from '@mui/material/styles';

export interface WSLayoutProps {
  /** Main content */
  children: React.ReactNode;

  /** Container max width */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

  /** Whether to show header */
  showHeader?: boolean;

  /** Whether to show footer */
  showFooter?: boolean;

  /** Whether to show back to top button */
  showBackToTop?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Loading message */
  loadingMessage?: string;

  /** Custom header props */
  headerProps?: WSHeaderProps;

  /** Custom styles */
  sx?: SxProps<Theme>;

  /** Additional background color */
  backgroundColor?: string;

  /** Custom padding */
  padding?: number | string;

  /** Whether to disable container padding */
  disablePadding?: boolean;

  /** Whether to make full height */
  fullHeight?: boolean;
}

export type LayoutMaxWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

export interface ResponsiveBreakpoints {
  isSmallMobile: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
