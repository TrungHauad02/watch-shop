import { Button, Box } from "@mui/material";

export default function MenuItems({
  items,
  isDarkMode,
  colors,
  navigate,
}: any) {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
      {items.map((item: any) => (
        <Button
          key={item.path}
          color="inherit"
          onClick={() => navigate(item.path)}
          sx={{
            fontSize: "1rem",
            color: isDarkMode ? colors.white : colors.black,
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );
}
