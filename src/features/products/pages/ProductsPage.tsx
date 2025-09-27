/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import { Link, NavigateNext } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { WSDecorativeBackground } from '@/components';
import {
  ProductDTO,
  BrandDTO,
  CategoryDTO,
  ProductFilterDTO,
} from '@/shared/types';
import { productsService } from '../services/productsService';
import ProductSearchBar from '../components/ProductSearchBar';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import ProductsPagination from '../components/ProductsPagination';
import { COLORS } from '@/styles/colors';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [brands, setBrands] = useState<BrandDTO[]>([]);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 12,
  });

  // Initialize filter from URL params
  const initialFilter = useMemo((): ProductFilterDTO => {
    const filter: ProductFilterDTO = {};
    const name = searchParams.get('search');
    if (name) filter.name = name;
    const brandId = searchParams.get('brand');
    if (brandId) filter.brandId = brandId;
    const categoryId = searchParams.get('category');
    if (categoryId) filter.categoryId = categoryId;
    const gender = searchParams.get('gender');
    if (gender) filter.gender = gender as any;
    const fromPrice = searchParams.get('fromPrice');
    if (fromPrice) filter.fromPrice = Number(fromPrice);
    const toPrice = searchParams.get('toPrice');
    if (toPrice) filter.toPrice = Number(toPrice);
    return filter;
  }, [searchParams]);

  const [filter, setFilter] = useState<ProductFilterDTO>(initialFilter);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  // Mock wishlist for demo - TODO: Connect to actual wishlist service
  const [wishlistProductIds, setWishlistProductIds] = useState<string[]>([]);

  // Update URL when filter changes
  const updateURL = (newFilter: ProductFilterDTO, page: number = 0) => {
    const params = new URLSearchParams();

    if (newFilter.name) params.set('search', newFilter.name);
    if (newFilter.brandId) params.set('brand', newFilter.brandId);
    if (newFilter.categoryId) params.set('category', newFilter.categoryId);
    if (newFilter.gender) params.set('gender', newFilter.gender);
    if (newFilter.fromPrice !== undefined)
      params.set('fromPrice', newFilter.fromPrice.toString());
    if (newFilter.toPrice !== undefined)
      params.set('toPrice', newFilter.toPrice.toString());
    if (page > 0) params.set('page', page.toString());

    setSearchParams(params);
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [brandsResponse, categoriesResponse] = await Promise.all([
          productsService.getBrands(),
          productsService.getCategories(),
        ]);

        if (brandsResponse.status) {
          setBrands(brandsResponse.data);
        }

        if (categoriesResponse.status) {
          setCategories(categoriesResponse.data);
        }
      } catch (err) {
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        console.error('Error fetching initial data:', err);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products when filter or pagination changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await productsService.getProducts(
          pagination.currentPage,
          pagination.pageSize,
          filter
        );

        if (response.status) {
          setProducts(response.data.content);
          setPagination((prev) => ({
            ...prev,
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
          }));
        } else {
          setError(response.message || 'Có lỗi xảy ra khi tải sản phẩm');
        }
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter, pagination.currentPage, pagination.pageSize]);

  // Handlers
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Remove 'name' if query is empty, otherwise set it
    const newFilter = { ...filter };
    if (query) {
      newFilter.name = query;
    } else {
      delete newFilter.name;
    }
    setFilter(newFilter);
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
    updateURL(newFilter, 0);
  };

  const handleFilterChange = (newFilter: ProductFilterDTO) => {
    setFilter(newFilter);
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
    updateURL(newFilter, 0);
  };

  const handleClearFilters = () => {
    const clearedFilter: ProductFilterDTO = {};
    setFilter(clearedFilter);
    setSearchQuery('');
    setPagination((prev) => ({ ...prev, currentPage: 0 }));
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
    updateURL(filter, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPagination((prev) => ({ ...prev, pageSize, currentPage: 0 }));
    updateURL(filter, 0);
  };

  const handleAddToWishlist = async (productId: string) => {
    // TODO: Connect to actual wishlist service
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      setWishlistProductIds((prev) => {
        if (prev.includes(productId)) {
          return prev.filter((id) => id !== productId);
        } else {
          return [...prev, productId];
        }
      });
    } catch (err) {
      console.error('Error updating wishlist:', err);
    }
  };

  return (
    <WSDecorativeBackground
      variant="light"
      density="high"
      sx={{
        background: `linear-gradient(-45deg, ${COLORS.gray600} 0%, ${COLORS.gray300} 50%, ${COLORS.gray50} 100%)`,
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            sx={{
              '& .MuiBreadcrumbs-separator': {
                color: COLORS.textTertiary,
              },
            }}
          >
            <MuiLink
              component={Link}
              to="/"
              sx={{
                color: COLORS.textSecondary,
                textDecoration: 'none',
                '&:hover': {
                  color: COLORS.primary,
                  textDecoration: 'underline',
                },
              }}
            >
              Trang chủ
            </MuiLink>
            <Typography sx={{ color: COLORS.textPrimary, fontWeight: 600 }}>
              Sản phẩm
            </Typography>
          </Breadcrumbs>
        </Box>

        {/* Page Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: COLORS.textPrimary,
              mb: 2,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Bộ sưu tập đồng hồ cao cấp
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: COLORS.textSecondary,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.125rem' },
            }}
          >
            Khám phá những chiếc đồng hồ tinh xảo từ các thương hiệu danh tiếng
            trên thế giới
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <ProductSearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Main Content */}
        <Grid container spacing={4}>
          {/* Filters Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <ProductFilters
              brands={brands}
              categories={categories}
              currentFilter={filter}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </Grid>

          {/* Products Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            {/* Results Header */}
            {!loading && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: COLORS.textPrimary,
                    mb: 1,
                  }}
                >
                  {pagination.totalElements > 0
                    ? `Tìm thấy ${pagination.totalElements} sản phẩm`
                    : 'Không tìm thấy sản phẩm nào'}
                </Typography>

                {/* Active Filters Display */}
                {(filter.name ||
                  filter.brandId ||
                  filter.categoryId ||
                  filter.gender ||
                  filter.fromPrice !== undefined ||
                  filter.toPrice !== undefined) && (
                  <Box sx={{ mt: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ color: COLORS.textSecondary, mb: 1 }}
                    >
                      Đang lọc theo:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {filter.name && (
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            backgroundColor: COLORS.primary,
                            color: 'white',
                            borderRadius: 1,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          Tìm kiếm: "{filter.name}"
                        </Box>
                      )}
                      {filter.brandId && (
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            backgroundColor: COLORS.gold100,
                            color: COLORS.gold700,
                            borderRadius: 1,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {brands.find((b) => b.id === filter.brandId)?.name}
                        </Box>
                      )}
                      {filter.categoryId && (
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            backgroundColor: COLORS.gray100,
                            color: COLORS.textSecondary,
                            borderRadius: 1,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {
                            categories.find((c) => c.id === filter.categoryId)
                              ?.name
                          }
                        </Box>
                      )}
                      {filter.gender && (
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            backgroundColor: COLORS.gray100,
                            color: COLORS.textSecondary,
                            borderRadius: 1,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          {filter.gender === 'MALE'
                            ? 'Nam'
                            : filter.gender === 'FEMALE'
                              ? 'Nữ'
                              : 'Unisex'}
                        </Box>
                      )}
                      {(filter.fromPrice !== undefined ||
                        filter.toPrice !== undefined) && (
                        <Box
                          sx={{
                            px: 2,
                            py: 0.5,
                            backgroundColor: COLORS.gray100,
                            color: COLORS.textSecondary,
                            borderRadius: 1,
                            fontSize: '0.875rem',
                            fontWeight: 500,
                          }}
                        >
                          Giá:{' '}
                          {filter.fromPrice
                            ? new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                                maximumFractionDigits: 0,
                              }).format(filter.fromPrice)
                            : '0đ'}{' '}
                          -{' '}
                          {filter.toPrice
                            ? new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                                maximumFractionDigits: 0,
                              }).format(filter.toPrice)
                            : '∞'}
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {/* Products Grid */}
            <ProductGrid
              products={products}
              loading={loading}
              onAddToWishlist={handleAddToWishlist}
              wishlistProductIds={wishlistProductIds}
            />

            {/* Pagination */}
            <ProductsPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalElements={pagination.totalElements}
              pageSize={pagination.pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              loading={loading}
            />
          </Grid>
        </Grid>

        {/* Additional Information Section */}
        {!loading && products.length > 0 && (
          <Box
            sx={{
              mt: 6,
              p: 4,
              backgroundColor: `${COLORS.gray50}`,
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              border: `1px solid ${COLORS.borderLight}30`,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: COLORS.textPrimary,
                mb: 2,
              }}
            >
              Tại sao chọn Minh Nhật Watch Shop?
            </Typography>
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: COLORS.gold100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      fontSize: 28,
                    }}
                  >
                    ✨
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Chính hãng 100%
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: COLORS.textSecondary }}
                  >
                    Tất cả sản phẩm đều được nhập khẩu chính hãng với đầy đủ
                    giấy tờ và bảo hành.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: COLORS.gold100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      fontSize: 28,
                    }}
                  >
                    🚚
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Giao hàng miễn phí
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: COLORS.textSecondary }}
                  >
                    Miễn phí giao hàng toàn quốc cho đơn hàng từ 5 triệu đồng.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: COLORS.gold100,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      fontSize: 28,
                    }}
                  >
                    🛡️
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Bảo hành dài hạn
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: COLORS.textSecondary }}
                  >
                    Bảo hành chính hãng từ 2-5 năm cùng dịch vụ hậu mãi tận tâm.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </WSDecorativeBackground>
  );
}
