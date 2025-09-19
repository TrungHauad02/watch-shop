/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseEntity, PaginatedResponse, ResponseDTO } from './base.types';
import { GenderEnum, RoleEnum } from './enum.types';

// ==================== TYPE GUARDS ====================

export const isValidRole = (role: string): role is RoleEnum => {
  return Object.values(RoleEnum).includes(role as RoleEnum);
};

export const isValidGender = (gender: string): gender is GenderEnum => {
  return Object.values(GenderEnum).includes(gender as GenderEnum);
};

export const isResponseDTO = <T>(obj: any): obj is ResponseDTO<T> => {
  return obj && typeof obj.status === 'boolean' && 'message' in obj;
};

export const isPaginatedResponse = <T>(
  obj: any
): obj is PaginatedResponse<T> => {
  return (
    obj && Array.isArray(obj.content) && typeof obj.totalElements === 'number'
  );
};

// ==================== HELPER TYPES ====================

// Extract the data type from ResponseDTO
export type ExtractResponseData<T> = T extends ResponseDTO<infer U> ? U : never;

// Make all properties optional for patch operations
export type PartialDTO<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>;

// For create operations (without id, createdAt, updatedAt)
export type CreateDTO<T extends BaseEntity> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt'
>;

// For update operations (with id but without createdAt, updatedAt)
export type UpdateDTO<T extends BaseEntity> = Omit<
  T,
  'createdAt' | 'updatedAt'
>;
