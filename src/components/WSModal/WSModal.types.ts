import { ReactNode, MouseEvent } from 'react';

export type WSModalSize =
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'fullscreen';
export type WSModalVariant = 'default' | 'luxury' | 'minimal' | 'card';

export interface WSModalProps {
  /**
   * Hiển thị/ẩn modal
   */
  open: boolean;

  /**
   * Callback khi đóng modal
   */
  onClose: (event?: MouseEvent | KeyboardEvent) => void;

  /**
   * Tiêu đề modal
   */
  title?: string;

  /**
   * Subtitle hoặc mô tả ngắn
   */
  subtitle?: string;

  /**
   * Nội dung chính của modal
   */
  children: ReactNode;

  /**
   * Kích thước modal
   * @default 'medium'
   */
  size?: WSModalSize;

  /**
   * Variant thiết kế
   * @default 'default'
   */
  variant?: WSModalVariant;

  /**
   * Hiển thị nút đóng (X)
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Đóng modal khi click vào backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Đóng modal khi nhấn ESC
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Hiển thị actions footer
   */
  actions?: ReactNode;

  /**
   * Căn chỉnh actions
   * @default 'flex-end'
   */
  actionsAlignment?: 'flex-start' | 'center' | 'flex-end' | 'space-between';

  /**
   * Vô hiệu hóa padding mặc định
   */
  disablePadding?: boolean;

  /**
   * Vô hiệu hóa scroll của body
   * @default true
   */
  disableScrollLock?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Custom styles
   */
  sx?: object;

  /**
   * Loading state
   */
  loading?: boolean;

  /**
   * Tắt animation
   */
  disableAnimation?: boolean;

  /**
   * Z-index custom
   */
  zIndex?: number;
}
