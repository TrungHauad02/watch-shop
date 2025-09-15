/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Product,
  ProductFilter,
} from '@/features/products/types/product.types.ts';
import apiClient from '@/shared/api/axiosConfig';
import { BaseService, PaginatedResponse } from '@/shared/api/baseService';
import { PaginationParams } from '@/shared/types/common.types';

class ProductService extends BaseService<
  Product,
  Product,
  Product,
  ProductFilter
> {
  constructor() {
    super('/products');
  }

  // ==============================================
  // PRODUCT-SPECIFIC METHODS
  // ==============================================

  // Search products by name or productId
  async searchProducts(
    searchTerm: string,
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      const params = {
        ...this.buildQueryParams(pagination),
        search: searchTerm,
      };

      return await apiClient.getData<PaginatedResponse<Product>>(
        `${this.baseUrl}/search`,
        { params }
      );
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

  // Get products by category
  async getProductsByCategory(
    categoryId: number,
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      const filter: ProductFilter = { categoryId };
      return await this.findAllWithFilters(pagination, filter);
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  }

  // Get products by brand
  async getProductsByBrand(
    brandId: number,
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      const filter: ProductFilter = { brandId };
      return await this.findAllWithFilters(pagination, filter);
    } catch (error) {
      console.error('Error getting products by brand:', error);
      throw error;
    }
  }

  // Get products in price range
  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      const filter: ProductFilter = {
        fromPrice: minPrice,
        toPrice: maxPrice,
      };
      return await this.findAllWithFilters(pagination, filter);
    } catch (error) {
      console.error('Error getting products by price range:', error);
      throw error;
    }
  }

  // Get featured/popular products
  async getFeaturedProducts(limit: number = 12): Promise<Product[]> {
    try {
      const response = await this.findAllWithFilters({
        page: 0,
        size: limit,
        sortField: 'view',
        direction: 'DESC',
      });
      return response.content;
    } catch (error) {
      console.error('Error getting featured products:', error);
      throw error;
    }
  }

  // Update product view count
  async incrementViewCount(productId: number): Promise<void> {
    try {
      await apiClient.postData(`${this.baseUrl}/${productId}/view`);
    } catch (error) {
      console.error('Error incrementing view count:', error);
      // Don't throw error for view count as it's not critical
    }
  }

  // Bulk update product status
  async updateProductsStatus(
    productIds: number[],
    status: boolean
  ): Promise<void> {
    try {
      await apiClient.patchData(`${this.baseUrl}/status`, {
        ids: productIds,
        status,
      });
    } catch (error) {
      console.error('Error updating products status:', error);
      throw error;
    }
  }
}
