import { BaseFilterDTO, GenderEnum } from '@/shared/types/common.types';

export interface Product {
  id: number;
  productId: string;
  name: string;
  description: string;
  origin: string;
  movement: string;
  glassType: string;
}

export interface ProductFilter extends BaseFilterDTO {
  productId?: string;
  name?: string;
  origin?: string;
  movement?: string;
  glassType?: string;
  gender?: GenderEnum;
  brandId?: number;
  categoryId?: number;
  fromPrice?: number;
  toPrice?: number;
  fromCaseSize?: number;
  toCaseSize?: number;
  fromCaseThickness?: number;
  toCaseThickness?: number;
  fromWaterResistance?: number;
  toWaterResistance?: number;
}
