import { SxProps, Theme } from '@mui/material/styles';

export interface WSLoadingProps {
  /** Loading variant to display */
  variant?: 'circular' | 'linear' | 'skeleton' | 'page' | 'overlay';

  /** Size of the loading indicator */
  size?: 'small' | 'medium' | 'large';

  /** Loading message to display */
  message?: string;

  /** Progress value (0-100) for determinate variants */
  progress?: number;

  /** Minimum height of the loading container */
  minHeight?: string | number;

  /** Whether to show as full screen overlay */
  fullScreen?: boolean;

  /** Color of the loading indicator */
  color?: 'primary' | 'secondary' | 'inherit';

  /** Additional styles */
  sx?: SxProps<Theme>;
}

export type LoadingVariant =
  | 'circular'
  | 'linear'
  | 'skeleton'
  | 'page'
  | 'overlay';
export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingColor = 'primary' | 'secondary' | 'inherit';
