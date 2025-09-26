import { ResetPasswordFormData } from '../../types';

export interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  onBackToLogin: () => void;
  isLoading?: boolean;
  error?: string | null;
  onErrorDismiss?: () => void;
}

export interface ResetPasswordFormState {
  password: string;
  confirmPassword: string;
}
