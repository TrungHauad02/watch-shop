import { IconButton, Box, Badge, Button } from "@mui/material";
import { ShoppingCart, Sun, Moon, Menu } from "lucide-react";
import { toggleTheme } from "../../../redux/slices/themeSlice";

export default function Actions({
  isDarkMode,
  colors,
  totalItems,
  navigate,
  dispatch,
  handleDrawerToggle,
}: any) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <IconButton
        onClick={() => navigate("/cart")}
        sx={{ position: "relative" }}
      >
        <Badge
          badgeContent={totalItems}
          color="warning"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: colors.amber500,
            },
          }}
        >
          <ShoppingCart size={20} />
        </Badge>
      </IconButton>

      <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
        <Button
          color="inherit"
          onClick={() => navigate("/login")}
          sx={{ color: isDarkMode ? colors.white : colors.black }}
        >
          Đăng nhập
        </Button>
        <Button
          variant="contained"
          sx={{
            color: isDarkMode ? colors.black : colors.white,
            bgcolor: colors.amber500,
            "&:hover": { bgcolor: colors.amber600 },
          }}
          onClick={() => navigate("/register")}
        >
          Đăng ký
        </Button>
      </Box>

      <IconButton
        sx={{ display: { xs: "flex", md: "none" } }}
        onClick={handleDrawerToggle}
      >
        <Menu size={20} />
      </IconButton>

      <IconButton
        onClick={() => dispatch(toggleTheme())}
        sx={{
          display: { xs: "none", sm: "flex" },
          bgcolor: isDarkMode ? "grey.800" : "grey.100",
          color: isDarkMode ? colors.amber400 : colors.amber600,
          "&:hover": {
            bgcolor: isDarkMode ? "grey.700" : "grey.200",
          },
        }}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </IconButton>
    </Box>
  );
}
