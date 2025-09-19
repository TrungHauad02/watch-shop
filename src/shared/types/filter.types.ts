import { GenderEnum, RoleEnum } from './enum.types';

export interface BaseFilterDTO {
  startCreatedAt?: string;
  endCreatedAt?: string;
  startUpdatedAt?: string;
  endUpdatedAt?: string;
  status?: boolean;
}

export interface ProductFilterDTO extends BaseFilterDTO {
  productId?: string;
  name?: string;
  origin?: string;
  movement?: string;
  glassType?: string;
  gender?: GenderEnum;
  brandId?: string;
  categoryId?: string;
  fromPrice?: number;
  toPrice?: number;
  fromCaseSize?: number;
  toCaseSize?: number;
  fromCaseThickness?: number;
  toCaseThickness?: number;
  fromWaterResistance?: number;
  toWaterResistance?: number;
}

export interface UserFilterDTO extends BaseFilterDTO {
  name?: string;
  email?: string;
  phoneNumber?: string;
  role?: RoleEnum;
}

export interface CategoryFilterDTO extends BaseFilterDTO {
  name?: string;
}

export interface BrandFilterDTO extends BaseFilterDTO {
  name?: string;
}
