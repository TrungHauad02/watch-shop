export interface BrandDTO {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

export interface BrandFilterDTO {
  name?: string;
  status?: boolean;
}
