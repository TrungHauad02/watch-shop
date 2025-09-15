/* eslint-disable @typescript-eslint/no-unused-vars */
import { BrandDTO, BrandFilterDTO } from '@/features/brands/types/brand.types';
import apiClient from '@/shared/api/axiosConfig';
import { BaseService } from '@/shared/api/baseService';

class BrandService extends BaseService<
  BrandDTO,
  BrandDTO,
  BrandDTO,
  BrandFilterDTO
> {
  constructor() {
    super('/brands');
  }

  // ==============================================
  // BRAND-SPECIFIC METHODS
  // ==============================================

  // Get all active brands (for dropdown/filter)
  async getActiveBrands(): Promise<BrandDTO[]> {
    try {
      const response = await this.findAllWithFilters(
        { page: 0, size: 100, sortField: 'name', direction: 'ASC' },
        { status: true }
      );
      return response.content;
    } catch (error) {
      console.error('Error getting active brands:', error);
      throw error;
    }
  }

  // Get brand with product count
  async getBrandWithProductCount(
    id: number
  ): Promise<BrandDTO & { productCount: number }> {
    try {
      return await apiClient.getData<BrandDTO & { productCount: number }>(
        `${this.baseUrl}/${id}/with-count`
      );
    } catch (error) {
      console.error('Error getting brand with product count:', error);
      throw error;
    }
  }

  // Get popular brands (by product count or views)
  async getPopularBrands(limit: number = 10): Promise<BrandDTO[]> {
    try {
      const response = await this.findAllWithFilters({
        page: 0,
        size: limit,
        sortField: 'createdAt',
        direction: 'DESC',
      });
      return response.content;
    } catch (error) {
      console.error('Error getting popular brands:', error);
      throw error;
    }
  }

  // Search brands by name
  async searchBrands(searchTerm: string): Promise<BrandDTO[]> {
    try {
      const response = await this.findAllWithFilters(
        { page: 0, size: 50 },
        { name: searchTerm }
      );
      return response.content;
    } catch (error) {
      console.error('Error searching brands:', error);
      throw error;
    }
  }
}
