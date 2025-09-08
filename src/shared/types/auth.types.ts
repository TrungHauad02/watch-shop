export interface TokenValidationDTO {
  valid: boolean;
  email: string;
  expiresAt: string; // ISO date string
}
