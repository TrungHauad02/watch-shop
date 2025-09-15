import apiClient from './axiosConfig';
import { PaginationParams, BaseFilterDTO } from '@/shared/types/common.types';

export interface PaginatedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface BaseServiceInterface<
  T,
  CreateDTO = T,
  UpdateDTO = Partial<T>,
  FilterDTO = BaseFilterDTO,
> {
  // CRUD operations
  findById(id: number): Promise<T>;
  create(data: CreateDTO): Promise<T>;
  update(id: number, data: UpdateDTO): Promise<T>;
  patch(id: number, data: Partial<UpdateDTO>): Promise<T>;
  delete(id: number): Promise<boolean>;

  // Pagination and filtering
  findAllWithFilters(
    pagination: PaginationParams,
    filter?: FilterDTO
  ): Promise<PaginatedResponse<T>>;
}

export abstract class BaseService<
  T,
  CreateDTO = T,
  UpdateDTO = Partial<T>,
  FilterDTO = BaseFilterDTO,
> implements BaseServiceInterface<T, CreateDTO, UpdateDTO, FilterDTO>
{
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // ==============================================
  // CRUD OPERATIONS
  // ==============================================

  async findById(id: number): Promise<T> {
    try {
      const response = await apiClient.getData<T>(`${this.baseUrl}/${id}`);
      return response;
    } catch (error) {
      console.error(`Error finding ${this.baseUrl} by ID ${id}:`, error);
      throw error;
    }
  }

  async create(data: CreateDTO): Promise<T> {
    try {
      const response = await apiClient.postData<T>(this.baseUrl, data);
      return response;
    } catch (error) {
      console.error(`Error creating ${this.baseUrl}:`, error);
      throw error;
    }
  }

  async update(id: number, data: UpdateDTO): Promise<T> {
    try {
      const response = await apiClient.putData<T>(
        `${this.baseUrl}/${id}`,
        data
      );
      return response;
    } catch (error) {
      console.error(`Error updating ${this.baseUrl} ID ${id}:`, error);
      throw error;
    }
  }

  async patch(id: number, data: Partial<UpdateDTO>): Promise<T> {
    try {
      const response = await apiClient.patchData<T>(
        `${this.baseUrl}/${id}`,
        data
      );
      return response;
    } catch (error) {
      console.error(`Error patching ${this.baseUrl} ID ${id}:`, error);
      throw error;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await apiClient.deleteData<string>(`${this.baseUrl}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting ${this.baseUrl} ID ${id}:`, error);
      throw error;
    }
  }

  // ==============================================
  // PAGINATION AND FILTERING
  // ==============================================

  async findAllWithFilters(
    pagination: PaginationParams = {},
    filter?: FilterDTO
  ): Promise<PaginatedResponse<T>> {
    try {
      const params = this.buildQueryParams(pagination, filter);
      const response = await apiClient.getData<PaginatedResponse<T>>(
        this.baseUrl,
        { params }
      );
      return response;
    } catch (error) {
      console.error(`Error finding ${this.baseUrl} with filters:`, error);
      throw error;
    }
  }

  // ==============================================
  // UTILITY METHODS
  // ==============================================

  protected buildQueryParams(
    pagination: PaginationParams = {},
    filter?: FilterDTO
  ): Record<string, unknown> {
    const params: Record<string, unknown> = {
      // Default pagination values matching backend PaginationUtil
      page: pagination.page ?? 0,
      size: pagination.size ?? 20,
      sortField: pagination.sortField ?? 'createdAt',
      direction: pagination.direction ?? 'DESC',
    };

    // Add filter parameters if provided
    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params[key] = value;
        }
      });
    }

    return params;
  }
}
