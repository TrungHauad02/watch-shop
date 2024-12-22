export interface Product {
  id: string;
  name: string;
  price: number;
  type: string;
  brand: string;
  description: string;
  specifications: Specification;
  images: string[];
}

export interface Specification {
  movement: string;
  caseSize: string;
  caseMaterial: string;
  waterResistance: string;
  crystal: string;
  powerReserve: string;
}

export interface SortOption {
  label: string;
  value: string;
}

export interface PriceRange {
  min: number;
  max: number;
}
