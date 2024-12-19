import { Box } from "@mui/material";
import RegisterForm from "../components/RegisterForm";
import { Header } from "layouts/header/Header";

const RegisterPage = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
