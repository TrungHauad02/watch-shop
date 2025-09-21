import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { ReactNode } from 'react';

export type WSInputVariant = 'outlined' | 'filled' | 'standard';
export type WSInputSize = 'small' | 'medium' | 'large';
export type WSInputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'url'
  | 'search';

export interface WSInputProps
  extends Omit<MuiTextFieldProps, 'variant' | 'size' | 'type'> {
  /**
   * Variant của input
   * @default 'outlined'
   */
  variant?: WSInputVariant;

  /**
   * Kích thước của input
   * @default 'medium'
   */
  size?: WSInputSize;

  /**
   * Loại input
   * @default 'text'
   */
  type?: WSInputType;

  /**
   * Icon hiển thị bên trái
   */
  startIcon?: ReactNode;

  /**
   * Icon hiển thị bên phải
   */
  endIcon?: ReactNode;

  /**
   * Text gợi ý hiển thị trong input
   */
  placeholder?: string;

  /**
   * Text hiển thị bên dưới input (thông tin bổ sung)
   */
  helperText?: string;

  /**
   * Trạng thái lỗi
   */
  error?: boolean;

  /**
   * Text hiển thị khi có lỗi
   */
  errorText?: string; // Đã optional từ trước

  /**
   * Bắt buộc nhập
   */
  required?: boolean;

  /**
   * Vô hiệu hóa input
   */
  disabled?: boolean;

  /**
   * Chỉ đọc
   */
  readOnly?: boolean;

  /**
   * Chiều rộng full container
   */
  fullWidth?: boolean;

  /**
   * Tự động focus khi mount
   */
  autoFocus?: boolean;

  /**
   * Hiển thị số ký tự / giới hạn
   */
  showCharacterCount?: boolean;

  /**
   * Số ký tự tối đa
   */
  maxLength?: number;

  /**
   * Label của input
   */
  label?: string;
}
