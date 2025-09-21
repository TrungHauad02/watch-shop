import React, { useState } from 'react';
import { Box, IconButton, InputBase, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { searchConfig } from '../header.data';
import { COLORS, ALPHA_COLORS } from '@/styles/colors';

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
          p: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          // CUSTOMIZE: Simple glass effect với minimal styling
          backgroundColor: ALPHA_COLORS.whiteAlpha20,
          backdropFilter: 'blur(10px)',
          border: `1px solid ${ALPHA_COLORS.whiteAlpha20}`,
          borderRadius: '10px',

          '&:hover': {
            backgroundColor: ALPHA_COLORS.whiteAlpha25,
            border: `1px solid ${ALPHA_COLORS.whiteAlpha30}`,
          },

          '&:focus-within': {
            backgroundColor: ALPHA_COLORS.whiteAlpha30,
            border: `1px solid ${COLORS.gold400}`,
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
            color: COLORS.white,
            '& .MuiInputBase-input': {
              padding: '10px 4px',
              fontSize: '0.9rem',
              '&::placeholder': {
                color: ALPHA_COLORS.whiteAlpha75,
                opacity: 1,
              },
            },
          }}
        />
        <IconButton
          type="submit"
          sx={{
            p: '8px',
            color: ALPHA_COLORS.whiteAlpha75,
            '&:hover': {
              color: COLORS.gold300,
              backgroundColor: ALPHA_COLORS.whiteAlpha20,
            },
          }}
          aria-label="Tìm kiếm"
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Paper>
    </Box>
  );
}
