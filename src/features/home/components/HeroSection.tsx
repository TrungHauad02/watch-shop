import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

const HeroSection = () => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box
      sx={{
        pt: 16,
        pb: 4,
        background: `radial-gradient(circle, ${
          isDarkMode ? color.amber400 + "10" : color.amber500 + "15"
        } 0%, ${color.transparent} 60%)`,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center" }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              color: isDarkMode ? color.white : color.gray900,
              textTransform: "capitalize",
              fontWeight: "bold",
              fontFamily:
                'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            }}
          >
            Vẻ đẹp vượt thời gian <br />
            <span
              style={{
                color: isDarkMode ? color.amber400 : color.amber600,
                fontFamily:
                  'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
              }}
            >
              Chính xác hiện đại
            </span>
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: isDarkMode ? color.gray400 : color.gray500,
              maxWidth: 600,
              margin: "auto",
              mb: 3,
              fontWeight: "bold",
              fontFamily:
                'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
            }}
          >
            Khám phá bộ sưu tập đồng hồ xa xỉ được tuyển chọn của chúng tôi, nơi
            di sản gặp gỡ sự đổi mới.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HeroSection;
