export interface BaseEntity {
  id: string;
  status: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ResponseDTO<T> {
  status: boolean;
  data: T;
  message: string;
  errorDetail?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
