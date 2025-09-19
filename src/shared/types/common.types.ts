import { BaseEntity } from './base.types';
import { GenderEnum, RoleEnum } from './enum.types';

// ==================== USER TYPES ====================

export interface UserDTO extends BaseEntity {
  name: string;
  email: string;
  role: RoleEnum;
  phoneNumber?: string;
  googleId?: string;
  savedProductIds?: string[];
  emailVerified?: boolean;
}

// ==================== PRODUCT TYPES ====================

export interface ProductImageDTO {
  id?: string;
  imageUrl: string;
  displayOrder: number;
}

export interface ProductDTO extends BaseEntity {
  view: number;
  name: string;
  productId: string;
  quantity: number;
  images?: ProductImageDTO[];
  price: number;
  discount: number;
  caseSize: number;
  caseThickness: number;
  waterResistance: number;
  origin: string;
  gender: GenderEnum;
  movement: string;
  glassType: string;
  description?: string;
  productCondition?: string;
  warrantyYears?: number;
  categoryId?: string;
  brandId?: string;
}

// ==================== CATEGORY TYPES ====================

export interface CategoryDTO extends BaseEntity {
  name: string;
  image: string;
  description: string;
}

// ==================== BRAND TYPES ====================

export interface BrandDTO extends BaseEntity {
  name: string;
  image: string;
  description: string;
}
