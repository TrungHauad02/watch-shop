import { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Breadcrumbs,
  Link as MuiLink,
  Alert,
  Fade,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { Home, Category as CategoryIcon } from '@mui/icons-material';
import { WSDecorativeBackground } from '@/components';
import { CategoryDTO } from '@/shared/types';
import { categoriesService } from '../services/categoriesService';
import CategoriesSearchBar from '../components/CategoriesSearchBar';
import CategoriesGrid from '../components/CategoriesGrid';
import CategoriesPagination from '../components/CategoriesPagination';
import { COLORS } from '@/styles/colors';

export default function CategoriesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
    pageSize: 12,
  });

  // Initialize search query and page from URL params
  const initialSearchQuery = searchParams.get('search') || '';
  const initialPage = parseInt(searchParams.get('page') || '0');
  const initialPageSize = parseInt(searchParams.get('size') || '12');

  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  // Update URL when search or pagination changes
  const updateURL = (
    query: string,
    page: number = 0,
    pageSize: number = 12
  ) => {
    const params = new URLSearchParams();

    if (query.trim()) params.set('search', query.trim());
    if (page > 0) params.set('page', page.toString());
    if (pageSize !== 12) params.set('size', pageSize.toString());

    setSearchParams(params);
  };

  // Fetch categories function
  const fetchCategories = async (
    page: number = 0,
    pageSize: number = 12,
    search: string = '',
    showSearchLoading: boolean = false
  ) => {
    try {
      if (showSearchLoading) {
        setSearchLoading(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const filter = search.trim() ? { name: search.trim() } : {};
      const response = await categoriesService.getCategories(
        page,
        pageSize,
        filter
      );

      if (response.status) {
        setCategories(response.data.content);
        setPagination({
          currentPage: response.data.pageNumber,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          pageSize: response.data.pageSize,
        });
      } else {
        setError(
          response.message || 'Có lỗi xảy ra khi tải danh sách danh mục'
        );
        setCategories([]);
        setPagination({
          currentPage: 0,
          totalPages: 0,
          totalElements: 0,
          pageSize: pageSize,
        });
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Không thể tải danh sách danh mục. Vui lòng thử lại sau.');
      setCategories([]);
    } finally {
      if (showSearchLoading) {
        setSearchLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchCategories(initialPage, initialPageSize, initialSearchQuery);
  }, []);

  // Handle search
  const handleSearch = () => {
    const newPage = 0; // Reset to first page on search
    updateURL(searchQuery, newPage, pagination.pageSize);
    fetchCategories(newPage, pagination.pageSize, searchQuery, true);
  };

  // Handle search query change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    // If search is cleared, fetch all categories immediately
    if (!value.trim()) {
      const newPage = 0;
      updateURL('', newPage, pagination.pageSize);
      fetchCategories(newPage, pagination.pageSize, '', true);
    }
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    updateURL(searchQuery, page, pagination.pageSize);
    fetchCategories(page, pagination.pageSize, searchQuery);

    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle page size change
  const handlePageSizeChange = (pageSize: number) => {
    const newPage = 0; // Reset to first page when changing page size
    updateURL(searchQuery, newPage, pageSize);
    fetchCategories(newPage, pageSize, searchQuery);
    setPagination((prev) => ({ ...prev, pageSize }));
  };

  // Clear error
  const handleErrorDismiss = () => {
    setError(null);
  };

  // Computed values
  const hasSearchQuery = searchQuery.trim().length > 0;
  const hasResults = categories.length > 0;
  const showPagination = hasResults && pagination.totalPages > 1;

  return (
    <WSDecorativeBackground variant="light" density="low">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator="›"
            sx={{
              mb: 2,
              '& .MuiBreadcrumbs-separator': {
                color: COLORS.textSecondary,
                mx: 1,
              },
            }}
          >
            <MuiLink
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: COLORS.textSecondary,
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  color: COLORS.primary,
                  textDecoration: 'underline',
                },
              }}
            >
              <Home sx={{ mr: 0.5, fontSize: '1rem' }} />
              Trang chủ
            </MuiLink>
            <Typography
              color="textPrimary"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                fontWeight: 500,
              }}
            >
              <CategoryIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
              Danh mục
            </Typography>
          </Breadcrumbs>

          {/* Page Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: COLORS.textPrimary,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Danh Mục Sản Phẩm
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
              Khám phá các danh mục đồng hồ đa dạng từ thể thao, cổ điển đến
              thông minh phù hợp với mọi phong cách
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ mb: 4 }}>
            <CategoriesSearchBar
              value={searchQuery}
              onSearchChange={handleSearchChange}
              onSearch={handleSearch}
              loading={searchLoading}
            />
          </Box>

          {/* Search Info */}
          {hasSearchQuery && (
            <Fade in={!searchLoading}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: COLORS.textSecondary,
                    fontSize: '0.95rem',
                  }}
                >
                  {hasResults ? (
                    <>
                      Tìm thấy <strong>{pagination.totalElements}</strong> danh
                      mục cho từ khóa <strong>"{searchQuery}"</strong>
                    </>
                  ) : !loading && !searchLoading ? (
                    <>
                      Không tìm thấy danh mục nào cho từ khóa{' '}
                      <strong>"{searchQuery}"</strong>
                    </>
                  ) : null}
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>

        {/* Error Alert */}
        {error && (
          <Box sx={{ mb: 4 }}>
            <Alert
              severity="error"
              onClose={handleErrorDismiss}
              sx={{
                '& .MuiAlert-message': {
                  fontSize: '0.95rem',
                },
              }}
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* Categories Grid */}
        <Box sx={{ mb: 4 }}>
          <CategoriesGrid
            categories={categories}
            loading={loading || searchLoading}
          />
        </Box>

        {/* Pagination */}
        {showPagination && (
          <CategoriesPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalElements={pagination.totalElements}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            loading={loading}
          />
        )}
      </Container>
    </WSDecorativeBackground>
  );
}
