import { Box, Grid, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { Watch } from "interfaces/Watch";

interface FeaturedWatchesProps {
  watches: Watch[];
}

const FeaturedWatches: React.FC<FeaturedWatchesProps> = ({ watches }) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  return (
    <Box
      sx={{
        py: 10,
        background: `radial-gradient(circle, ${
          isDarkMode ? color.amber400 + "15" : color.amber500 + "15"
        } 0%, ${color.transparent} 60%)`,
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          color: isDarkMode ? color.white : color.black,
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
      >
        Sản phẩm nổi bật
      </Typography>
      <Grid container spacing={4} sx={{ mt: 1 }}>
        {watches.map((watch, index) => (
          <Grid item xs={12} sm={12} md={4} key={watch.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Paper
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  boxShadow: 3,
                  transform: "scale(1)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: isDarkMode
                      ? `0px 4px 8px ${color.gray200}40`
                      : `0px 4px 8px ${color.gray900}60`,
                  },
                }}
              >
                <Box sx={{ position: "relative", height: 300 }}>
                  <img
                    src={watch.image}
                    alt={watch.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {watch.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDarkMode ? color.gray300 : color.gray700,
                    }}
                  >
                    {watch.price}
                  </Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FeaturedWatches;
