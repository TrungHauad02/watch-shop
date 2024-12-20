import { Box, Container } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Outlet } from "react-router-dom";
import useColor from "theme/useColor";

const AuthLayout = () => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        px: { xs: 2, sm: 4 },
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          py: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: isDarkMode ? color.gray800 : color.gray50,
            borderRadius: { xs: 1, sm: 2 },
            p: { xs: 1, sm: 4 },
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 0 10px rgba(0,0,0,0.5)"
                : "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;
