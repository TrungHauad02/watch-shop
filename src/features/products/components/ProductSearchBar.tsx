import { useState } from 'react';
import { Box, InputAdornment, IconButton } from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { WSInput } from '@/components';

interface ProductSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

// CUSTOMIZE: Bạn có thể chỉnh sửa giao diện search bar tại đây
export default function ProductSearchBar({
  searchQuery,
  onSearchChange,
  placeholder = 'Tìm kiếm đồng hồ theo tên hoặc mã sản phẩm...',
}: ProductSearchBarProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setLocalQuery(value);
    // Debounce search to avoid too many API calls
    // For now, trigger immediately for better UX
    onSearchChange(value);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearchChange('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearchChange(localQuery);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <WSInput
        value={localQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: localQuery && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                edge="end"
                aria-label="Xóa tìm kiếm"
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
            '&.Mui-focused': {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
          },
        }}
      />
    </Box>
  );
}
