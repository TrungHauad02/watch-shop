import { mockBrands } from '@/shared/mock/mockBrands';
import { mockCategories } from '@/shared/mock/mockCategories';
import { mockProducts } from '@/shared/mock/mockProducts';
import { BrandDTO, CategoryDTO, ProductDTO } from '@/shared/types';

const getProductDetail = async (productId: string): Promise<ProductDTO> => {
  // TODO: implement API call
  const product = mockProducts.find((p) => p.id === productId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(product || mockProducts[0]);
    }, 1000);
  });
};

const getBrandById = async (brandId: string): Promise<BrandDTO> => {
  // TODO: implement API call
  const brand = mockBrands.find((p) => p.id === brandId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(brand || mockBrands[0]);
    }, 1000);
  });
};

const getCategoryById = async (categoryId: string): Promise<CategoryDTO> => {
  // TODO: implement API call
  const category = mockCategories.find((c) => c.id === categoryId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(category || mockCategories[0]);
    }, 1000);
  });
};

const getRelatedProducts = async (
  productId?: string
): Promise<ProductDTO[]> => {
  console.log('Fetching related products for:', productId);
  // TODO: implement API call
  return new Promise((resolve) =>
    setTimeout(() => {
      // Get 4 random products excluding current product
      const relatedProducts = mockProducts
        .filter((p) => p.id !== productId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      resolve(relatedProducts);
    }, 600)
  );
};

export const productDetailService = {
  getProductDetail,
  getBrandById,
  getCategoryById,
  getRelatedProducts,
};
