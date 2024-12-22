import { useState } from "react";
import type { SortOption, PriceRange } from "../utils/types";
import { Box, Stack } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import FilterSection from "../components/FilterSection";
import SearchSortSection from "../components/SearchSortSection";
import ProductGrid from "../components/ProductGrid";
import { productService } from "../service/ProductService";
import WSBreadcrumb from "components/Breadcrumb/WSBreadcrumb";

const sortOptions: SortOption[] = [
  { label: "Giá: Thấp đến Cao", value: "price-asc" },
  { label: "Giá: Cao đến Thấp", value: "price-desc" },
  { label: "Tên: A đến Z", value: "name-asc" },
  { label: "Tên: Z đến A", value: "name-desc" },
];

const itemBreadcrumb = [
  {
    path: "/",
    label: "Trang chủ",
  },
  {
    path: "/products",
    label: "Sản phẩm",
  },
];

export default function ProductPage() {
  const mockProducts = productService.getAllProduct({});
  const brands = productService.getAllBrands();
  const types = productService.getAllTypes();

  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("price-asc");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0,
    max: productService.getMaxPrice(),
  });

  const filteredProducts = productService.getAllProduct({
    searchQuery,
    selectedSort,
    selectedBrands,
    selectedTypes,
    priceRange,
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: isDarkMode ? color.white : color.black,
        mt: 7,
        width: "100%",
      }}
    >
      <Box
        sx={{ px: { xs: 1, sm: 4, md: 8 }, pt: 4, pb: { xs: 2, sm: 4, md: 8 } }}
      >
        {/* Breadcrumb */}
        <Box sx={{ mb: 2 }}>
          <WSBreadcrumb items={itemBreadcrumb} />
        </Box>

        <Stack direction={"row"} justifyContent={"space-between"}>
          {/* Sidebar Filters - Desktop */}
          <Box sx={{ display: { xs: "none", md: "block" }, width: 300 }}>
            <Box sx={{ position: "sticky", top: 24 }}>
              <FilterSection
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                brands={brands}
                types={types}
                mockProducts={mockProducts}
              />
            </Box>
          </Box>

          {/* Main Content */}
          <Stack direction={"column"} spacing={4} sx={{ width: "100%", pl: 4 }}>
            {/* Search and Sort Controls */}
            <SearchSortSection
              sortOptions={sortOptions}
              searchQuery={searchQuery}
              selectedSort={selectedSort}
              setSearchQuery={setSearchQuery}
              setSelectedSort={setSelectedSort}
            />

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
