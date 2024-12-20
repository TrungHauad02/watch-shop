import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Container,
  Stack,
  AppBarProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCartStore } from "utils/cartStore";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { useState } from "react";
import { Actions, DrawerMenu, Logo, MenuItems } from "./common";

const MENU_ITEMS = [
  { path: "/", label: "Trang chủ" },
  { path: "/products", label: "Sản phẩm" },
  { path: "/about", label: "Giới thiệu" },
];

const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  transition: "all 0.3s",
  backgroundColor: theme.palette.mode === "dark" ? "#03071295" : "#ffffff95",
  backdropFilter: "blur(8px)",
  boxShadow:
    theme.palette.mode === "dark"
      ? "0px 2px 1px #ffffff10"
      : "0px 2px 1px #00000020",
}));

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const colors = useColor();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 50 });
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <StyledAppBar
      position="fixed"
      elevation={trigger ? 4 : 0}
      color="transparent"
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction={"row"} spacing={2}>
            <Logo isDarkMode={isDarkMode} colors={colors} navigate={navigate} />
            <MenuItems
              items={MENU_ITEMS}
              isDarkMode={isDarkMode}
              colors={colors}
              navigate={navigate}
            />
          </Stack>
          <Actions
            isDarkMode={isDarkMode}
            colors={colors}
            totalItems={totalItems}
            navigate={navigate}
            dispatch={dispatch}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Toolbar>
      </Container>
      <DrawerMenu
        drawerOpen={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        isDarkMode={isDarkMode}
        colors={colors}
        MENU_ITEMS={MENU_ITEMS}
        navigate={navigate}
        dispatch={dispatch}
      />
    </StyledAppBar>
  );
}
