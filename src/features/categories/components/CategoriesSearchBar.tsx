import { useState, useEffect } from 'react';
import { Box, InputAdornment, useTheme, useMediaQuery } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { WSInput, WSButton } from '@/components';
import { COLORS } from '@/styles/colors';

interface CategoriesSearchBarProps {
  value: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  loading?: boolean;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa giao diện tìm kiếm danh mục tại đây
export default function CategoriesSearchBar({
  value,
  onSearchChange,
  onSearch,
  loading = false,
}: CategoriesSearchBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue);

    // Auto search on input change (debounced)
    if (newValue.trim() === '') {
      onSearchChange('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearchChange(localValue.trim());
    onSearch();
  };

  const handleClear = () => {
    setLocalValue('');
    onSearchChange('');
    onSearch();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: isMobile ? 1 : 2,
        alignItems: 'center',
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
      }}
    >
      <WSInput
        value={localValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Tìm kiếm danh mục sản phẩm..."
        variant="outlined"
        fullWidth
        disabled={loading}
        size={isMobile ? 'small' : 'medium'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search
                sx={{
                  color: localValue ? COLORS.primary : COLORS.textSecondary,
                  fontSize: isMobile ? '1.2rem' : '1.5rem',
                }}
              />
            </InputAdornment>
          ),
          endAdornment: localValue && (
            <InputAdornment position="end">
              <WSButton
                variant="text"
                size="small"
                onClick={handleClear}
                disabled={loading}
                iconOnly
                startIcon={<Clear />}
                sx={{
                  minWidth: 'auto',
                  p: 0.5,
                  color: COLORS.textSecondary,
                  '&:hover': {
                    backgroundColor: `${COLORS.primary}10`,
                    color: COLORS.primary,
                  },
                }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: COLORS.white,
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: COLORS.primary,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: COLORS.primary,
                borderWidth: 2,
              },
            },
          },
        }}
      />

      <WSButton
        variant="primary"
        onClick={handleSearch}
        loading={loading}
        disabled={loading}
        size={isMobile ? 'small' : 'medium'}
        sx={{
          minWidth: isMobile ? 60 : 100,
          flexShrink: 0,
        }}
      >
        {isMobile ? 'Tìm' : 'Tìm kiếm'}
      </WSButton>
    </Box>
  );
}
