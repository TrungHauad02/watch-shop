import React, { useState } from 'react';
import { BRAND_COLORS } from '@/styles/colors';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { searchConfig } from '../header.data';

interface HeaderSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function HeaderSearch({
  onSearch,
  placeholder = searchConfig.placeholder,
}: HeaderSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
      setSearchQuery('');
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearchSubmit}
      sx={{
        flexGrow: 1,
        mx: { xs: 1, md: 3 },
        maxWidth: { xs: 'none', md: 500 },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          // CUSTOMIZE: Chỉnh sửa style của search box ở đây
          backgroundColor: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.2)',
          },
          '&:focus-within': {
            backgroundColor: 'rgba(255,255,255,0.25)',
            border: `1px solid ${BRAND_COLORS.secondary}`,
          },
          transition: 'all 0.2s ease',
        }}
      >
        <InputBase
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            ml: 1,
            flex: 1,
            color: 'white',
            '& .MuiInputBase-input': {
              padding: '8px 0',
              '&::placeholder': {
                color: 'rgba(255,255,255,0.7)',
                opacity: 1,
              },
            },
          }}
        />
        <IconButton
          type="submit"
          sx={{
            p: '8px',
            color: 'rgba(255,255,255,0.8)',
            '&:hover': {
              color: BRAND_COLORS.secondary,
            },
          }}
          aria-label="Tìm kiếm"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}
