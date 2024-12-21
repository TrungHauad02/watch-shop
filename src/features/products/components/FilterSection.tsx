import { Box, Slider, Stack, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { PriceRange, Product } from "../utils/types";
import FilterTitle from "./FilterTitle";
import WSCheckboxWithLabel from "components/Input/WSCheckboxWithLabel";
import { formatMoney } from "utils/format";

interface FilterSectionProps {
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  brands: string[];
  types: string[];
  mockProducts: Product[];
}

const FilterSection = ({
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedTypes,
  setSelectedTypes,
  brands,
  types,
  mockProducts,
}: FilterSectionProps) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        bgcolor: isDarkMode ? color.gray800 : color.gray50,
        borderRadius: "0 1rem 0 0",
        boxShadow: 3,
      }}
    >
      {/* Price Range Filter */}
      <Box>
        <FilterTitle>Giá tiền</FilterTitle>
        <Slider
          value={[priceRange.min, priceRange.max]}
          min={0}
          max={Math.max(...mockProducts.map((p) => p.price))}
          onChange={(event: Event, value: number | number[]) => {
            if (Array.isArray(value)) {
              setPriceRange({ min: value[0], max: value[1] as number });
            }
          }}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => formatMoney(value)}
          sx={{
            color: color.amber500, // Màu của đường slider đang được chọn
            "& .MuiSlider-thumb": {
              backgroundColor: color.amber400, // Màu của nút
              border: isDarkMode
                ? `1px solid ${color.white}`
                : `1px solid ${color.gray200}`,
              "&:hover, &.Mui-focusVisible": {
                boxShadow: isDarkMode
                  ? `0px 0px 0px 8px ${color.amber400}40`
                  : `0px 0px 0px 8px ${color.amber800}40`, // Hiệu ứng khi hover hoặc focus
              },
              "&.Mui-active": {
                boxShadow: isDarkMode
                  ? `0px 0px 0px 14px ${color.amber100}50`
                  : `0px 0px 0px 14px ${color.amber700}50`, // Hiệu ứng khi đang kéo
              },
            },
            "& .MuiSlider-rail": {
              color: "gray", // Màu của đường slider chưa được chọn
            },
          }}
        />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography>{formatMoney(priceRange.min)}</Typography>
          <Typography>{formatMoney(priceRange.max)}</Typography>
        </Stack>
      </Box>

      {/* Brands Filter */}
      <Box sx={{ mt: 1 }}>
        <FilterTitle>Nhãn hiệu</FilterTitle>
        {brands.map((brand) => (
          <Box sx={{ my: 1 }}>
            <WSCheckboxWithLabel
              key={brand}
              checked={selectedBrands.includes(brand)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedBrands([...selectedBrands, brand]);
                } else {
                  setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                }
              }}
              label={brand}
              name={brand}
              textColor={isDarkMode ? color.gray100 : color.gray950}
              checkedColor={isDarkMode ? color.slate100 : color.slate500}
              color={isDarkMode ? color.slate100 : color.slate500}
            />
          </Box>
        ))}
      </Box>

      {/* Types Filter */}
      <Box sx={{ mt: 1 }}>
        <FilterTitle>Loại</FilterTitle>
        {types.map((type) => (
          <Box sx={{ my: 1 }}>
            <WSCheckboxWithLabel
              key={type}
              checked={selectedTypes.includes(type)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTypes([...selectedTypes, type]);
                } else {
                  setSelectedTypes(selectedTypes.filter((t) => t !== type));
                }
              }}
              label={type}
              name={type}
              textColor={isDarkMode ? color.gray100 : color.gray950}
              checkedColor={isDarkMode ? color.slate100 : color.slate500}
              color={isDarkMode ? color.slate100 : color.slate500}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FilterSection;
