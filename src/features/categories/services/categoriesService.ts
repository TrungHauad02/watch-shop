import { CategoryDTO, ResponseDTO, PaginatedResponse } from '@/shared/types';
import { mockCategories } from '@/shared/mock/mockCategories';

interface CategoryFilterDTO {
  name?: string;
  status?: boolean;
}

class CategoriesService {
  // Simulate API delay
  private async delay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Filter categories based on search query
   */
  private filterCategories(
    categories: CategoryDTO[],
    searchQuery: string
  ): CategoryDTO[] {
    if (!searchQuery.trim()) return categories;

    const query = searchQuery.toLowerCase().trim();
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description.toLowerCase().includes(query)
    );
  }

  /**
   * Paginate categories
   */
  private paginateCategories(
    categories: CategoryDTO[],
    page: number,
    pageSize: number
  ): { content: CategoryDTO[]; totalPages: number; totalElements: number } {
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const content = categories.slice(startIndex, endIndex);

    return {
      content,
      totalPages: Math.ceil(categories.length / pageSize),
      totalElements: categories.length,
    };
  }

  /**
   * Get all categories with pagination and filtering
   */
  async getCategories(
    page: number = 0,
    size: number = 12,
    filter: CategoryFilterDTO = {}
  ): Promise<ResponseDTO<PaginatedResponse<CategoryDTO>>> {
    try {
      await this.delay();

      // Filter categories based on search criteria
      let filteredCategories = mockCategories.filter(
        (category) => category.status !== false
      );

      // Apply name filter (search)
      if (filter.name?.trim()) {
        filteredCategories = this.filterCategories(
          filteredCategories,
          filter.name
        );
      }

      // Apply status filter
      if (filter.status !== undefined) {
        filteredCategories = filteredCategories.filter(
          (category) => category.status === filter.status
        );
      }

      // Paginate results
      const paginatedResult = this.paginateCategories(
        filteredCategories,
        page,
        size
      );

      return {
        status: true,
        data: {
          content: paginatedResult.content,
          pageNumber: page,
          pageSize: size,
          totalElements: paginatedResult.totalElements,
          totalPages: paginatedResult.totalPages,
        },
        message: 'Lấy danh sách danh mục thành công',
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return {
        status: false,
        data: {
          content: [],
          pageNumber: 0,
          pageSize: size,
          totalElements: 0,
          totalPages: 0,
        },
        message: 'Có lỗi xảy ra khi lấy danh sách danh mục',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get category by ID
   */
  async getCategoryById(id: string): Promise<ResponseDTO<CategoryDTO | null>> {
    try {
      await this.delay(200);

      const category = mockCategories.find((c) => c.id === id && c.status);

      if (!category) {
        return {
          status: false,
          data: null,
          message: 'Không tìm thấy danh mục',
        };
      }

      return {
        status: true,
        data: category,
        message: 'Lấy thông tin danh mục thành công',
      };
    } catch (error) {
      console.error('Error fetching category:', error);
      return {
        status: false,
        data: null,
        message: 'Có lỗi xảy ra khi lấy thông tin danh mục',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search categories
   */
  async searchCategories(
    query: string,
    page: number = 0,
    size: number = 12
  ): Promise<ResponseDTO<PaginatedResponse<CategoryDTO>>> {
    return this.getCategories(page, size, { name: query });
  }

  /**
   * Get popular categories (first 8 categories for homepage)
   */
  async getPopularCategories(): Promise<ResponseDTO<CategoryDTO[]>> {
    try {
      await this.delay(300);

      const popularCategories = mockCategories
        .filter((category) => category.status)
        .slice(0, 8);

      return {
        status: true,
        data: popularCategories,
        message: 'Lấy danh sách danh mục phổ biến thành công',
      };
    } catch (error) {
      console.error('Error fetching popular categories:', error);
      return {
        status: false,
        data: [],
        message: 'Có lỗi xảy ra khi lấy danh sách danh mục phổ biến',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get all categories without pagination (for filters)
   */
  async getAllCategories(): Promise<ResponseDTO<CategoryDTO[]>> {
    try {
      await this.delay(200);

      const allCategories = mockCategories.filter(
        (category) => category.status
      );

      return {
        status: true,
        data: allCategories,
        message: 'Lấy tất cả danh mục thành công',
      };
    } catch (error) {
      console.error('Error fetching all categories:', error);
      return {
        status: false,
        data: [],
        message: 'Có lỗi xảy ra khi lấy tất cả danh mục',
        errorDetail: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const categoriesService = new CategoriesService();
