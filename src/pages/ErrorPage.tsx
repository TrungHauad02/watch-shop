import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WatchIcon from "@mui/icons-material/Watch";
import useColor from "theme/useColor";

const ErrorPage = () => {
  const navigate = useNavigate();
  const color = useColor();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        background: "linear-gradient(to bottom, #f7f7f7, #e0e0e0)",
        color: "#333",
        padding: "16px",
      }}
    >
      <WatchIcon sx={{ fontSize: "5rem", color: color.slate700 }} />
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: "4rem",
          fontWeight: "bold",
          mt: 2,
          color: color.slate800,
        }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, color: color.slate800 }}
      >
        Trang không tìm thấy
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, maxWidth: "600px" }}>
        Xin lỗi, chúng tôi không thể tìm thấy trang bạn yêu cầu.
      </Typography>
      <Typography
        variant="h6"
        sx={{ mb: 2, maxWidth: "600px", color: color.slate950 }}
      >
        Có lẽ bạn đã lạc mất thời gian? Hãy để chúng tôi giúp bạn quay lại đúng
        hướng.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          mt: 2,
          backgroundColor: color.slate700,
          color: color.white,
          ":hover": {
            backgroundColor: color.slate900,
          },
        }}
      >
        Quay về trang chủ
      </Button>
    </Box>
  );
};

export default ErrorPage;
