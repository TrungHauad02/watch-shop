import { BrandDTO, ResponseDTO, PaginatedResponse } from '@/shared/types';
import { mockBrands } from '@/shared/mock/mockBrands';

interface BrandFilterDTO {
  name?: string;
  status?: boolean;
}

class BrandsService {
  // Simulate API delay
  private async delay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Filter brands based on search query
   */
  private filterBrands(brands: BrandDTO[], searchQuery: string): BrandDTO[] {
    if (!searchQuery.trim()) return brands;

    const query = searchQuery.toLowerCase().trim();
    return brands.filter(
      (brand) =>
        brand.name.toLowerCase().includes(query) ||
        brand.description.toLowerCase().includes(query)
    );
  }

  /**
   * Paginate brands
   */
  private paginateBrands(
    brands: BrandDTO[],
    page: number,
    pageSize: number
  ): { content: BrandDTO[]; totalPages: number; totalElements: number } {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const content = brands.slice(startIndex, endIndex);

    return {
      content,
      totalPages: Math.ceil(brands.length / pageSize),
      totalElements: brands.length,
    };
  }

  /**
   * Get all brands with pagination and filtering
   */
  async getBrands(
    page: number = 0,
    size: number = 12,
    filter: BrandFilterDTO = {}
  ): Promise<ResponseDTO<PaginatedResponse<BrandDTO>>> {
    try {
      await this.delay();

      // Filter brands based on search criteria
      let filteredBrands = mockBrands.filter((brand) => brand.status !== false);

      // Apply name filter (search)
      if (filter.name?.trim()) {
        filteredBrands = this.filterBrands(filteredBrands, filter.name);
      }

      // Apply status filter
      if (filter.status !== undefined) {
        filteredBrands = filteredBrands.filter(
          (brand) => brand.status === filter.status
        );
      }

      // Paginate results
      const paginatedResult = this.paginateBrands(filteredBrands, page, size);

      return {
        status: true,
        data: {
          content: paginatedResult.content,
          pageNumber: page,
          pageSize: size,
          totalElements: paginatedResult.totalElements,
          totalPages: paginatedResult.totalPages,
        },
        message: 'Lấy danh sách thương hiệu thành công',
      };
    } catch (error) {
      console.error('Error fetching brands:', error);
      return {
        status: false,
        data: {
          content: [],
          pageNumber: 0,
          pageSize: size,
          totalElements: 0,
          totalPages: 0,
        },
        message: 'Có lỗi xảy ra khi lấy danh sách thương hiệu',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get brand by ID
   */
  async getBrandById(id: string): Promise<ResponseDTO<BrandDTO | null>> {
    try {
      await this.delay(200);

      const brand = mockBrands.find((b) => b.id === id && b.status);

      if (!brand) {
        return {
          status: false,
          data: null,
          message: 'Không tìm thấy thương hiệu',
        };
      }

      return {
        status: true,
        data: brand,
        message: 'Lấy thông tin thương hiệu thành công',
      };
    } catch (error) {
      console.error('Error fetching brand:', error);
      return {
        status: false,
        data: null,
        message: 'Có lỗi xảy ra khi lấy thông tin thương hiệu',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search brands
   */
  async searchBrands(
    query: string,
    page: number = 0,
    size: number = 12
  ): Promise<ResponseDTO<PaginatedResponse<BrandDTO>>> {
    return this.getBrands(page, size, { name: query });
  }

  /**
   * Get popular brands (first 8 brands for homepage)
   */
  async getPopularBrands(): Promise<ResponseDTO<BrandDTO[]>> {
    try {
      await this.delay(300);

      const popularBrands = mockBrands
        .filter((brand) => brand.status)
        .slice(0, 8);

      return {
        status: true,
        data: popularBrands,
        message: 'Lấy danh sách thương hiệu phổ biến thành công',
      };
    } catch (error) {
      console.error('Error fetching popular brands:', error);
      return {
        status: false,
        data: [],
        message: 'Có lỗi xảy ra khi lấy danh sách thương hiệu phổ biến',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get all brands without pagination (for filters)
   */
  async getAllBrands(): Promise<ResponseDTO<BrandDTO[]>> {
    try {
      await this.delay(200);

      const allBrands = mockBrands.filter((brand) => brand.status);

      return {
        status: true,
        data: allBrands,
        message: 'Lấy tất cả thương hiệu thành công',
      };
    } catch (error) {
      console.error('Error fetching all brands:', error);
      return {
        status: false,
        data: [],
        message: 'Có lỗi xảy ra khi lấy tất cả thương hiệu',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const brandsService = new BrandsService();
