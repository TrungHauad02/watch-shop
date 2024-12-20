import { Box, Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

const AboutSection = () => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  // Nội dung của các phần giới thiệu
  const aboutItems = [
    {
      title: "Chuyên môn của chúng tôi",
      content:
        "Với hàng thập kỷ kinh nghiệm trong ngành đồng hồ xa xỉ, các chuyên gia của chúng tôi cung cấp kiến thức và sự tư vấn vô song trong hành trình chọn lựa đồng hồ của bạn.",
    },
    {
      title: "Cam kết của chúng tôi",
      content:
        "Chúng tôi cam kết cung cấp những sản phẩm chính hãng và chất lượng vượt trội, mang đến dịch vụ cá nhân hóa và sự tư vấn chuyên nghiệp cho cả những người mới bắt đầu và những người sưu tầm có kinh nghiệm.",
    },
  ];

  return (
    <Box sx={{ mt: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center" }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            color: isDarkMode ? color.white : color.black,
          }}
        >
          Giới thiệu về Watch-Shop
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: isDarkMode ? "text.secondary" : "text.primary",
            mb: 3,
          }}
        >
          Watch-Shop là điểm đến hàng đầu của bạn cho những chiếc đồng hồ xa xỉ,
          nơi đam mê đồng hồ gặp gỡ dịch vụ xuất sắc.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {aboutItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: isDarkMode
                    ? "rgba(56, 63, 73, 0.5)"
                    : "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: isDarkMode ? "text.secondary" : "text.primary",
                  }}
                >
                  {item.content}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default AboutSection;
