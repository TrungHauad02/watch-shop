import { Typography, Box } from "@mui/material";
import { Watch } from "lucide-react";

export default function Logo({ isDarkMode, colors, navigate }: any) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => navigate("/")}
    >
      <Watch size={32} color={isDarkMode ? colors.amber400 : colors.amber600} />
      <Typography
        variant="h5"
        sx={{
          ml: 1,
          fontFamily: "serif",
          fontWeight: "bold",
          letterSpacing: 1,
          fontSize: "1.5rem",
          color: isDarkMode ? colors.white : colors.black,
        }}
      >
        Shop Đồng Hồ
      </Typography>
    </Box>
  );
}
