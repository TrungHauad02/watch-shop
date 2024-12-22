import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import useColor from "theme/useColor";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

const MainLayout = () => {
  const color = useColor();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? color.gray900 : color.gray200,
        px: { xs: 2, sm: 4 },
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default MainLayout;
