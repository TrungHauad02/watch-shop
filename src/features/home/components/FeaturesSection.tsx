import { Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Award, Clock, Crown } from "lucide-react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

const features = [
  {
    icon: Clock,
    title: "Thợ thủ công tài ba",
    desc: "Những chiếc đồng hồ được chế tác với độ chính xác cao",
  },
  {
    icon: Crown,
    title: "Sự lựa chọn xa xỉ",
    desc: "Những bộ sưu tập cao cấp được tuyển chọn kỹ lưỡng",
  },
  {
    icon: Award,
    title: "Chứng nhận xác thực",
    desc: "Sản phẩm được nhập chính hãng được chứng nhận",
  },
];

const FeaturesSection = () => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
      {features.map((feature, index) => (
        <Grid item xs={12} md={4} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <Paper
              sx={{
                p: 3,
                textAlign: { xs: "center", sm: "left" },
                backgroundColor: isDarkMode ? color.gray800 : color.white,
                boxShadow: isDarkMode
                  ? `0px 4px 6px ${color.gray500}10, 0px 1px 3px ${color.gray500}08`
                  : `0px 4px 6px ${color.black}10, 0px 1px 3px ${color.black}08`,
              }}
            >
              <feature.icon
                className={`h-10 w-10 ${
                  isDarkMode ? "text-amber-400" : "text-amber-600"
                }`}
                style={{
                  color: isDarkMode ? color.amber400 : color.amber600,
                }}
              />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                {feature.title}
              </Typography>
              <Typography
                sx={{
                  color: isDarkMode ? "text.secondary" : "text.primary",
                }}
              >
                {feature.desc}
              </Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturesSection;
