import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: { xs: "2rem 0rem", sm: 4 },
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
