import {
  Typography,
  Box,
  Drawer,
  List,
  ListItemText,
  Divider,
  ListItemButton,
  Stack,
} from "@mui/material";
import { Sun, Moon } from "lucide-react";
import { toggleTheme } from "../../../redux/slices/themeSlice";

export default function DrawerMenu({
  drawerOpen,
  handleDrawerToggle,
  isDarkMode,
  colors,
  MENU_ITEMS,
  navigate,
  dispatch,
}: any) {
  return (
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={handleDrawerToggle}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: isDarkMode ? colors.gray950 : colors.gray50,
        },
      }}
    >
      <Box sx={{ width: 250 }} role="presentation">
        <List>
          {MENU_ITEMS.map((item: any) => (
            <ListItemButton
              key={item.path}
              onClick={() => navigate(item.path)}
              sx={{
                color: isDarkMode ? colors.white : colors.black,
                "&:hover": {
                  bgcolor: isDarkMode ? "grey.700" : "grey.200",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
          <Divider />
          <ListItemButton
            onClick={() => navigate("/login")}
            sx={{
              color: isDarkMode ? colors.white : colors.black,
              "&:hover": {
                bgcolor: isDarkMode ? "grey.700" : "grey.200",
              },
            }}
          >
            <ListItemText primary="Đăng nhập" />
          </ListItemButton>
          <ListItemButton
            onClick={() => navigate("/register")}
            sx={{
              color: isDarkMode ? colors.white : colors.black,
              "&:hover": {
                bgcolor: isDarkMode ? "grey.700" : "grey.200",
              },
            }}
          >
            <ListItemText primary="Đăng ký" />
          </ListItemButton>
          <Divider />
          <ListItemButton
            onClick={() => dispatch(toggleTheme())}
            sx={{
              color: isDarkMode ? colors.amber400 : colors.amber600,
              "&:hover": {
                bgcolor: isDarkMode ? "grey.700" : "grey.200",
              },
            }}
          >
            <ListItemText
              primary={
                isDarkMode ? (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography sx={{ color: colors.white }}>
                      Chế độ sáng{" "}
                    </Typography>
                    <Sun size={20} />
                  </Stack>
                ) : (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography sx={{ color: colors.black }}>
                      Chế độ tối{" "}
                    </Typography>
                    <Moon size={20} />
                  </Stack>
                )
              }
            />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
