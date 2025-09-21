import { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { ReactNode } from 'react';

export type WSButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'text'
  | 'danger';
export type WSButtonSize = 'small' | 'medium' | 'large';

export interface WSButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'size' | 'color'> {
  /**
   * Variant của button
   * @default 'primary'
   */
  variant?: WSButtonVariant;

  /**
   * Kích thước của button
   * @default 'medium'
   */
  size?: WSButtonSize;

  /**
   * Icon hiển thị bên trái text
   */
  startIcon?: ReactNode;

  /**
   * Icon hiển thị bên phải text
   */
  endIcon?: ReactNode;

  /**
   * Chỉ hiển thị icon (không có text)
   */
  iconOnly?: boolean;

  /**
   * Trạng thái loading
   */
  loading?: boolean;

  /**
   * Text hiển thị khi loading
   */
  loadingText?: string;

  /**
   * Chiều rộng full container
   */
  fullWidth?: boolean;

  /**
   * Vô hiệu hóa button
   */
  disabled?: boolean;

  /**
   * Children content
   */
  children?: ReactNode;
}
