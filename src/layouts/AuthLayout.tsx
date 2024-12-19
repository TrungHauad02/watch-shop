import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "grey.900" : "grey.100",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
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
