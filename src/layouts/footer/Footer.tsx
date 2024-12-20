import { Box, Typography, Divider } from "@mui/material";
import { Watch } from "lucide-react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

export function Footer() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  // Các mảng nội dung
  const navigationItems = ["Trang chủ", "Sản phẩm", "Giới thiệu", "Liên hệ"];
  const servicesItems = ["Thử đồng hồ ảo", "Chăm sóc đồng hồ", "Bảo hiểm"];
  const connectItems = ["Instagram", "Facebook", "Twitter", "LinkedIn"];

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        borderTop: 1,
        borderColor: isDarkMode ? color.gray100 : color.gray200,
        backgroundColor: color.transparent,
        color: isDarkMode ? color.gray400 : color.gray600,
      }}
    >
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 4, lg: 8 },
          py: 6,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
            gap: 4,
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Watch
                style={{
                  height: "32px",
                  width: "32px",
                  color: isDarkMode ? "#fbbf24" : "#d97706",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  ml: 1,
                  fontWeight: "bold",
                  fontFamily: "serif",
                  color: isDarkMode ? "white" : "grey.900",
                }}
              >
                Watch-Shop
              </Typography>
            </Box>
            <Typography variant="body2">
              Đồng hồ sang trọng dành cho những nhà sưu tầm tinh tế.
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                mb: 2,
                color: isDarkMode ? "white" : "grey.900",
              }}
            >
              Điều hướng
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: "none", m: 0 }}>
              {navigationItems.map((item) => (
                <Typography
                  key={item}
                  component="li"
                  variant="body2"
                  sx={{ mb: 1 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                mb: 2,
                color: isDarkMode ? "white" : "grey.900",
              }}
            >
              Dịch vụ
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: "none", m: 0 }}>
              {servicesItems.map((item) => (
                <Typography
                  key={item}
                  component="li"
                  variant="body2"
                  sx={{ mb: 1 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                mb: 2,
                color: isDarkMode ? "white" : "grey.900",
              }}
            >
              Kết nối
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: "none", m: 0 }}>
              {connectItems.map((item) => (
                <Typography
                  key={item}
                  component="li"
                  variant="body2"
                  sx={{ mb: 1 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            mt: 4,
            borderColor: isDarkMode ? "grey.800" : "grey.200",
          }}
        />
        <Typography
          variant="body2"
          sx={{
            mt: 4,
            textAlign: "center",
            color: isDarkMode ? "grey.400" : "grey.600",
          }}
        >
          © {new Date().getFullYear()} Watch-Shop. Bản quyền thuộc về chúng tôi.
        </Typography>
      </Box>
    </Box>
  );
}
