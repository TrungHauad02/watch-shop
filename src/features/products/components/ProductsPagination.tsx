/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Pagination,
  Typography,
  FormControl,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { COLORS } from '@/styles/colors';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  loading?: boolean;
}

export default function ProductsPagination({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  onPageChange,
  onPageSizeChange,
  loading = false,
}: ProductsPaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const pageSizeOptions = [12, 24, 36, 48];

  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page - 1);
  };

  const handlePageSizeChange = (event: any) => {
    onPageSizeChange(Number(event.target.value));
  };

  if (totalElements === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: 3,
        mt: 4,
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        border: `1px solid ${COLORS.borderLight}`,
      }}
    >
      {/* Results Info */}
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}
      >
        <Typography
          variant="body2"
          sx={{
            color: COLORS.textSecondary,
            fontWeight: 500,
            minWidth: 'fit-content',
          }}
        >
          Hiển thị {startItem} - {endItem} của {totalElements} sản phẩm
        </Typography>

        {/* Page Size Selector */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: COLORS.textSecondary,
              fontSize: '0.875rem',
              whiteSpace: 'nowrap',
            }}
          >
            Hiển thị:
          </Typography>
          <FormControl size="small" disabled={loading}>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              sx={{
                minWidth: 70,
                height: 32,
                '& .MuiSelect-select': {
                  py: 0.5,
                  fontSize: '0.875rem',
                },
              }}
            >
              {pageSizeOptions.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: isMobile ? 'center' : 'flex-end',
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage + 1} // Convert to 1-based for Material-UI
            onChange={handlePageChange}
            disabled={loading}
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                color: COLORS.textSecondary,
                '&.Mui-selected': {
                  backgroundColor: COLORS.primary,
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: COLORS.primary,
                    opacity: 0.9,
                  },
                },
                '&:hover': {
                  backgroundColor: COLORS.gray100,
                },
              },
              '& .MuiPaginationItem-ellipsis': {
                color: COLORS.textTertiary,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
