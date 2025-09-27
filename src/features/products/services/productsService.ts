import { mockBrands } from '@/shared/mock/mockBrands';
import { mockCategories } from '@/shared/mock/mockCategories';
import { mockProducts } from '@/shared/mock/mockProducts';
import {
  ProductDTO,
  BrandDTO,
  CategoryDTO,
  ResponseDTO,
  PaginatedResponse,
} from '@/shared/types';
import { ProductFilterDTO } from '@/shared/types/filter.types';

class ProductsService {
  // TODO: Replace with actual API calls
  async getProducts(
    page: number = 0,
    size: number = 20,
    filter?: ProductFilterDTO
  ): Promise<ResponseDTO<PaginatedResponse<ProductDTO>>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filteredProducts = [...mockProducts];

    // Apply filters
    if (filter) {
      if (filter.name) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(filter.name!.toLowerCase()) ||
            product.productId.toLowerCase().includes(filter.name!.toLowerCase())
        );
      }

      if (filter.brandId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.brandId === filter.brandId
        );
      }

      if (filter.categoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === filter.categoryId
        );
      }

      if (filter.gender) {
        filteredProducts = filteredProducts.filter(
          (product) => product.gender === filter.gender
        );
      }

      if (filter.fromPrice !== undefined) {
        filteredProducts = filteredProducts.filter((product) => {
          const finalPrice =
            product.discount > 0
              ? product.price - (product.price * product.discount) / 100
              : product.price;
          return finalPrice >= filter.fromPrice!;
        });
      }

      if (filter.toPrice !== undefined) {
        filteredProducts = filteredProducts.filter((product) => {
          const finalPrice =
            product.discount > 0
              ? product.price - (product.price * product.discount) / 100
              : product.price;
          return finalPrice <= filter.toPrice!;
        });
      }
    }

    // Pagination
    const totalElements = filteredProducts.length;
    const totalPages = Math.ceil(totalElements / size);
    const startIndex = page * size;
    const endIndex = startIndex + size;
    const content = filteredProducts.slice(startIndex, endIndex);

    return {
      status: true,
      data: {
        content,
        pageNumber: page,
        pageSize: size,
        totalElements,
        totalPages,
      },
      message: 'Lấy danh sách sản phẩm thành công',
      errorDetail: '',
    };
  }

  // TODO: Replace with actual API calls
  async getBrands(): Promise<ResponseDTO<BrandDTO[]>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      status: true,
      data: mockBrands,
      message: 'Lấy danh sách thương hiệu thành công',
    };
  }

  // TODO: Replace with actual API calls
  async getCategories(): Promise<ResponseDTO<CategoryDTO[]>> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      status: true,
      data: mockCategories,
      message: 'Lấy danh sách danh mục thành công',
    };
  }
}

export const productsService = new ProductsService();
