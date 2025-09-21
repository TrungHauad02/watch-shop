import { CardProps as MuiCardProps } from '@mui/material/Card';
import { ReactNode } from 'react';

export type WSCardVariant = 'default' | 'outlined' | 'elevated' | 'luxury';
export type WSCardPadding = 'none' | 'small' | 'medium' | 'large';

export interface WSCardProps extends Omit<MuiCardProps, 'variant'> {
  /**
   * CUSTOMIZE: Variant của card
   * @default 'default'
   */
  variant?: WSCardVariant;

  /**
   * CUSTOMIZE: Padding bên trong card
   * @default 'medium'
   */
  padding?: WSCardPadding;

  /**
   * Có thể click được
   */
  clickable?: boolean;

  /**
   * Hiển thị loading state
   */
  loading?: boolean;

  /**
   * Card content
   */
  children?: ReactNode;

  /**
   * Callback khi click vào card
   */
  onClick?: () => void;
}
