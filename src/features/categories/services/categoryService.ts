/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CategoryDTO,
  CategoryFilterDTO,
} from '@/features/categories/types/category.types';
import apiClient from '@/shared/api/axiosConfig';
import { BaseService } from '@/shared/api/baseService';

class CategoryService extends BaseService<
  CategoryDTO,
  CategoryDTO,
  CategoryDTO,
  CategoryFilterDTO
> {
  constructor() {
    super('/categories');
  }

  // ==============================================
  // CATEGORY-SPECIFIC METHODS
  // ==============================================

  // Get all active categories (for dropdown/filter)
  async getActiveCategories(): Promise<CategoryDTO[]> {
    try {
      const response = await this.findAllWithFilters(
        { page: 0, size: 100, sortField: 'name', direction: 'ASC' },
        { status: true }
      );
      return response.content;
    } catch (error) {
      console.error('Error getting active categories:', error);
      throw error;
    }
  }

  // Get category with product count
  async getCategoryWithProductCount(
    id: number
  ): Promise<CategoryDTO & { productCount: number }> {
    try {
      return await apiClient.getData<CategoryDTO & { productCount: number }>(
        `${this.baseUrl}/${id}/with-count`
      );
    } catch (error) {
      console.error('Error getting category with product count:', error);
      throw error;
    }
  }

  // Search categories by name
  async searchCategories(searchTerm: string): Promise<CategoryDTO[]> {
    try {
      const response = await this.findAllWithFilters(
        { page: 0, size: 50 },
        { name: searchTerm }
      );
      return response.content;
    } catch (error) {
      console.error('Error searching categories:', error);
      throw error;
    }
  }
}
