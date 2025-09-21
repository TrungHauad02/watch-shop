import { ReactNode } from 'react';

export type WSLoadingVariant =
  | 'circular'
  | 'linear'
  | 'dots'
  | 'pulse'
  | 'skeleton';
export type WSLoadingSize = 'small' | 'medium' | 'large' | 'xlarge';
export type WSLoadingColor = 'primary' | 'secondary' | 'luxury' | 'white';

export interface WSLoadingProps {
  /**
   * Variant của loading
   * @default 'circular'
   */
  variant?: WSLoadingVariant;

  /**
   * Kích thước của loading
   * @default 'medium'
   */
  size?: WSLoadingSize;

  /**
   * Màu sắc của loading
   * @default 'primary'
   */
  color?: WSLoadingColor;

  /**
   * Text hiển thị bên dưới loading
   */
  text?: string;

  /**
   * Hiển thị overlay toàn màn hình
   */
  overlay?: boolean;

  /**
   * Backdrop blur khi có overlay
   */
  backdrop?: boolean;

  /**
   * Tùy chỉnh nội dung loading
   */
  children?: ReactNode;

  /**
   * ClassName tùy chỉnh
   */
  className?: string;

  /**
   * Style tùy chỉnh
   */
  sx?: object;

  /**
   * Ẩn/hiện loading
   */
  visible?: boolean;

  /**
   * Delay trước khi hiển thị (ms)
   */
  delay?: number;
}
