export interface CategoryDTO {
  id: number;
  name: string;
  description: string;
  status: boolean;
}

export interface CategoryFilterDTO {
  name?: string;
  status?: boolean;
}
