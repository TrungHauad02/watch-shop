import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  useScrollTrigger,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Watch, ShoppingCart, User, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { useCartStore } from "utils/cartStore";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";

const MENU_ITEMS = [
  { path: "/", label: "Trang chủ" },
  { path: "/products", label: "Sản phẩm" },
  { path: "/about", label: "Giới thiệu" },
];

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  transition: "all 0.3s",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(18, 18, 18, 0.95)"
      : "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(8px)",
}));

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDarkMode = useDarkMode();
  const colors = useColor();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <StyledAppBar
      position="fixed"
      elevation={trigger ? 4 : 0}
      color="transparent"
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo và Menu bên trái */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              <Watch
                size={32}
                color={isDarkMode ? colors.amber400 : colors.amber600}
              />
              <Typography
                variant="h5"
                sx={{
                  ml: 1,
                  fontFamily: "serif",
                  fontWeight: "bold",
                  letterSpacing: 1,
                  fontSize: "1.5rem",
                }}
              >
                Shop Đồng Hồ
              </Typography>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {MENU_ITEMS.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{ fontSize: "1rem" }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Actions bên phải */}
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
              <Button color="inherit" onClick={() => navigate("/login")}>
                Đăng nhập
              </Button>
              <Button
                variant="contained"
                sx={{
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
              onClick={() => navigate("/login")}
            >
              <User size={20} />
            </IconButton>

            <IconButton
              onClick={() => dispatch(toggleTheme())}
              sx={{
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
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}
