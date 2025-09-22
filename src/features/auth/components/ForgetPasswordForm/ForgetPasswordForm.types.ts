import { ForgetPasswordFormData } from '../../types';

export interface ForgetPasswordFormProps {
  onSubmit: (data: ForgetPasswordFormData) => Promise<void>;
  onBackToLogin: () => void;
  isLoading?: boolean;
  error?: string | null;
  onErrorDismiss?: () => void;
  isSuccess?: boolean;
  successEmail?: string;
}

export interface ForgetPasswordFormState {
  email: string;
}
