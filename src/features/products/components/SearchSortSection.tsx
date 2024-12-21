import { Search } from "@mui/icons-material";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { SortOption } from "../utils/types";

interface SearchSortSectionProps {
  sortOptions: SortOption[];
  searchQuery: string;
  selectedSort: string;
  setSearchQuery: (query: string) => void;
  setSelectedSort: (sort: string) => void;
}

export default function SearchSortSection({
  sortOptions,
  searchQuery,
  selectedSort,
  setSearchQuery,
  setSelectedSort,
}: SearchSortSectionProps) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Stack direction={"row"} spacing={3}>
      <TextField
        label="Tìm kiếm"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
        }}
      />
      <FormControl fullWidth>
        <InputLabel>Sắp xếp</InputLabel>
        <Select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          label="Sắp xếp"
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
