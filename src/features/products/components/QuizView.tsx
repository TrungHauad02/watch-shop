import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import { formatMoney } from "utils/format";
import { Product } from "../utils/types";
import useColor from "theme/useColor";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

interface QuickViewProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const QuickView = ({ open, onClose, product }: QuickViewProps) => {
  const color = useColor();
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ p: 3 }}>
        <Swiper spaceBetween={10} slidesPerView={1}>
          {product.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`${product.name} ${index}`}
                width="100%"
                height={300}
                style={{ objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Typography variant="h5" sx={{ mt: 2 }}>
          {product.name}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
          Thương hiệu: {product.brand}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {formatMoney(product.price)}
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Thông số kỹ thuật</Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body1">Chuyển động:</Typography>
            <Typography variant="body1">
              {product.specifications.movement}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body1">Kích thước vỏ:</Typography>
            <Typography variant="body1">
              {product.specifications.caseSize}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body1">Dự trữ năng lượng:</Typography>
            <Typography variant="body1">
              {product.specifications.powerReserve}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body1">Kính:</Typography>
            <Typography variant="body1">
              {product.specifications.crystal}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body1">Chất liệu vỏ:</Typography>
            <Typography variant="body1">
              {product.specifications.caseMaterial}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body1">Khả năng chống nước:</Typography>
            <Typography variant="body1">
              {product.specifications.waterResistance}
            </Typography>
          </Stack>
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={onClose}
          sx={{
            mt: 3,
            color: color.slate900,
            bgcolor: color.slate200,
            fontSize: "1.02rem",
            fontWeight: "bold",
          }}
        >
          Đóng
        </Button>
      </Box>
    </Dialog>
  );
};

export default QuickView;
