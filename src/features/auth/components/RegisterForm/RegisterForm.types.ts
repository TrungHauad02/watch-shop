import { RegisterFormData } from '../../types';

export interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  onErrorDismiss?: () => void;
}

export interface RegisterFormState extends RegisterFormData {
  showPassword: boolean;
}
