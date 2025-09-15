/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '@/features/products/types/product.types';
import apiClient from '@/shared/api/axiosConfig';
import { BaseService, PaginatedResponse } from '@/shared/api/baseService';
import {
  PaginationParams,
  User,
  UserFilterDTO,
} from '@/shared/types/common.types';

class UserService extends BaseService<User, User, User, UserFilterDTO> {
  constructor() {
    super('/users');
  }

  // ==============================================
  // USER-SPECIFIC METHODS
  // ==============================================

  // Get current user profile
  async getCurrentProfile(): Promise<User> {
    try {
      return await apiClient.getData<User>('/auth/profile');
    } catch (error) {
      console.error('Error getting current profile:', error);
      throw error;
    }
  }

  // Update current user profile
  async updateCurrentProfile(data: Partial<User>): Promise<User> {
    try {
      return await apiClient.patchData<User>('/auth/profile', data);
    } catch (error) {
      console.error('Error updating current profile:', error);
      throw error;
    }
  }

  // Get user's saved products (wishlist)
  async getSavedProducts(
    userId: number,
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<Product>> {
    try {
      const params = this.buildQueryParams(pagination);
      return await apiClient.getData<PaginatedResponse<Product>>(
        `/users/${userId}/saved-products`,
        { params }
      );
    } catch (error) {
      console.error('Error getting saved products:', error);
      throw error;
    }
  }

  // Add product to wishlist
  async addToWishlist(userId: number, productId: number): Promise<void> {
    try {
      await apiClient.postData(`/users/${userId}/saved-products/${productId}`);
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw error;
    }
  }

  // Remove product from wishlist
  async removeFromWishlist(userId: number, productId: number): Promise<void> {
    try {
      await apiClient.deleteData(
        `/users/${userId}/saved-products/${productId}`
      );
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw error;
    }
  }

  // Check if product is in wishlist
  async isInWishlist(userId: number, productId: number): Promise<boolean> {
    try {
      const response = await apiClient.getData<{ inWishlist: boolean }>(
        `/users/${userId}/saved-products/${productId}/check`
      );
      return response.inWishlist;
    } catch (error) {
      console.error('Error checking wishlist status:', error);
      return false;
    }
  }

  // Get users by role (Admin only)
  async getUsersByRole(
    role: string,
    pagination: PaginationParams = {}
  ): Promise<PaginatedResponse<User>> {
    try {
      const filter: UserFilterDTO = { role: role as any };
      return await this.findAllWithFilters(pagination, filter);
    } catch (error) {
      console.error('Error getting users by role:', error);
      throw error;
    }
  }

  // Update user status (Admin only)
  async updateUserStatus(userId: number, status: boolean): Promise<User> {
    try {
      return await apiClient.patchData<User>(
        `${this.baseUrl}/${userId}/status`,
        {
          status,
        }
      );
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }
}
