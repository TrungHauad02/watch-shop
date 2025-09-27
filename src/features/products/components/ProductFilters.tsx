/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ExpandMore, FilterList } from '@mui/icons-material';
import { BrandDTO, CategoryDTO, ProductFilterDTO } from '@/shared/types';
import { WSButton } from '@/components';
import { COLORS } from '@/styles/colors';

interface ProductFiltersProps {
  brands: BrandDTO[];
  categories: CategoryDTO[];
  currentFilter: ProductFilterDTO;
  onFilterChange: (filter: ProductFilterDTO) => void;
  onClearFilters: () => void;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa filters và styling tại đây
export default function ProductFilters({
  brands,
  categories,
  currentFilter,
  onFilterChange,
  onClearFilters,
}: ProductFiltersProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 1000000000,
  ]);

  useEffect(() => {
    if (
      currentFilter.fromPrice !== undefined ||
      currentFilter.toPrice !== undefined
    ) {
      setPriceRange([
        currentFilter.fromPrice || 0,
        currentFilter.toPrice || 1000000000,
      ]);
    }
  }, [currentFilter.fromPrice, currentFilter.toPrice]);

  const handleFilterChange = (field: keyof ProductFilterDTO, value: any) => {
    onFilterChange({
      ...currentFilter,
      [field]: value || undefined,
    });
  };

  const handlePriceChange = (_: Event, newValue: number | number[]) => {
    const value = newValue as [number, number];
    setPriceRange(value);
  };

  const handlePriceCommitted = () => {
    const newFilter = { ...currentFilter };
    if (priceRange[0] > 0) {
      newFilter.fromPrice = priceRange[0];
    } else {
      delete newFilter.fromPrice;
    }
    if (priceRange[1] < 1000000000) {
      newFilter.toPrice = priceRange[1];
    } else {
      delete newFilter.toPrice;
    }
    onFilterChange(newFilter);
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (currentFilter.brandId) count++;
    if (currentFilter.categoryId) count++;
    if (currentFilter.gender) count++;
    if (
      currentFilter.fromPrice !== undefined ||
      currentFilter.toPrice !== undefined
    )
      count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  const filterContent = (
    <Box>
      <Grid container spacing={3}>
        {/* Brand Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Thương hiệu</InputLabel>
            <Select
              value={currentFilter.brandId || ''}
              label="Thương hiệu"
              onChange={(e) => handleFilterChange('brandId', e.target.value)}
            >
              <MenuItem value="">
                <em>Tất cả thương hiệu</em>
              </MenuItem>
              {brands.map((brand) => (
                <MenuItem key={brand.id} value={brand.id}>
                  {brand.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Category Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Danh mục</InputLabel>
            <Select
              value={currentFilter.categoryId || ''}
              label="Danh mục"
              onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            >
              <MenuItem value="">
                <em>Tất cả danh mục</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Gender Filter */}
        <Grid size={{ xs: 12, sm: 6, md: 12 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Giới tính</InputLabel>
            <Select
              value={currentFilter.gender || ''}
              label="Giới tính"
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value="MALE">Nam</MenuItem>
              <MenuItem value="FEMALE">Nữ</MenuItem>
              <MenuItem value="UNISEX">Unisex</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Price Range Filter */}
        <Grid size={{ xs: 12 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 2, fontWeight: 600, color: COLORS.textPrimary }}
          >
            Khoảng giá
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceCommitted}
              valueLabelDisplay="auto"
              valueLabelFormat={formatPrice}
              min={0}
              max={1000000000}
              step={10000000}
              sx={{
                color: COLORS.primary,
                '& .MuiSlider-thumb': {
                  backgroundColor: COLORS.primary,
                },
                '& .MuiSlider-track': {
                  backgroundColor: COLORS.primary,
                },
                '& .MuiSlider-rail': {
                  backgroundColor: COLORS.gray300,
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mt: 1,
                fontSize: '0.875rem',
                color: COLORS.textSecondary,
              }}
            >
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </Box>
          </Box>
        </Grid>

        {/* Clear Filters Button */}
        {activeFiltersCount > 0 && (
          <Grid size={{ xs: 12 }}>
            <WSButton
              variant="outline"
              onClick={onClearFilters}
              fullWidth
              size="small"
            >
              Xóa bộ lọc ({activeFiltersCount})
            </WSButton>
          </Grid>
        )}
      </Grid>
    </Box>
  );

  if (isMobile) {
    return (
      <Box sx={{ mb: 3 }}>
        <Accordion
          sx={{
            boxShadow: 'none',
            border: `1px solid ${COLORS.borderLight}`,
            borderRadius: 2,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMore />}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '8px 8px 0 0',
              minHeight: 56,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FilterList />
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Bộ lọc sản phẩm
              </Typography>
              {activeFiltersCount > 0 && (
                <Chip
                  label={activeFiltersCount}
                  size="small"
                  sx={{
                    backgroundColor: COLORS.primary,
                    color: 'white',
                    fontWeight: 600,
                    minWidth: 24,
                    height: 24,
                  }}
                />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 3 }}>{filterContent}</AccordionDetails>
        </Accordion>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 2,
        border: `1px solid ${COLORS.borderLight}`,
        position: 'sticky',
        top: 24,
        height: 'fit-content',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <FilterList />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Bộ lọc sản phẩm
        </Typography>
        {activeFiltersCount > 0 && (
          <Chip
            label={activeFiltersCount}
            size="small"
            sx={{
              backgroundColor: COLORS.primary,
              color: 'white',
              fontWeight: 600,
              minWidth: 24,
              height: 24,
            }}
          />
        )}
      </Box>
      {filterContent}
    </Box>
  );
}
