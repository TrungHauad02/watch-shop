import { mockProducts } from '@/shared/mock/mockProducts';
import { ProductDTO } from '@/shared/types';

const getWishlistProducts = async (userId: string): Promise<ProductDTO[]> => {
  console.log('Fetching wishlist products for user:', userId);
  // TODO: Replace with actual API call
  // Mock API call to get wishlist product IDs
  const wishlistProductIds = ['1', '3', '5', '12']; // Example product IDs in wishlist
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          mockProducts.filter((prod) => wishlistProductIds.includes(prod.id))
        ),
      1000
    )
  );
};

export const wishlistService = {
  getWishlistProducts,
};
