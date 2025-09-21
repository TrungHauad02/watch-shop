import { LoginFormData } from '../../types';

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onErrorDismiss?: () => void;
}

export interface LoginFormState extends LoginFormData {
  showPassword: boolean;
}
