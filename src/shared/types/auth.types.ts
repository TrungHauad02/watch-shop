import { UserDTO } from './common.types';

export interface RegisterRequestDTO {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface LoginRequestDTO {
  email: string;
  password: string;
  ipAddress?: string;
  userAgent?: string;
  rememberMe?: boolean;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserDTO;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface ChangePasswordRequestDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}

export interface ResetPasswordRequestDTO {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface VerifyEmailRequestDTO {
  token: string;
}

export interface TokenValidationDTO {
  valid: boolean;
  email?: string;
  expiresAt?: number;
  message: string;
}
