import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { Header } from "layouts/header/Header";

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <Header />
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
