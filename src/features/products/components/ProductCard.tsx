import { Box, Button, Stack, Typography } from "@mui/material";
import { Eye } from "lucide-react";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { useState } from "react";
import { Product } from "../utils/types";
import { formatMoney } from "utils/format";
import QuickView from "./QuizView";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const navigate = useNavigate();
  const [showQuickView, setShowQuickView] = useState(false);

  const onQuickView = () => {
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
  };

  const onViewDetail = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          overflow: "hidden",
          cursor: "pointer",
          backgroundColor: isDarkMode ? color.gray800 : color.gray50,
          position: "relative",
          transition: "0.4s",
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.05)",
          },
          color: isDarkMode ? color.slate100 : color.slate900,
        }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          width="100%"
          height={200}
          style={{ objectFit: "cover" }}
        />
        <Box sx={{ p: 2 }} onClick={onViewDetail}>
          <Typography variant="h6" noWrap>
            {product.name}
          </Typography>
          <Typography
            variant="body1"
            noWrap
            sx={{ color: isDarkMode ? color.slate200 : color.slate800 }}
          >
            {product.brand}
          </Typography>
          <Typography variant="h6" noWrap sx={{ mt: 1 }}>
            Thông số
          </Typography>
          <Stack
            sx={{ mt: 1 }}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" noWrap>
              Chuyển động:
            </Typography>
            <Typography variant="body1" noWrap>
              {product.specifications.movement}
            </Typography>
          </Stack>
          <Stack
            sx={{ mt: 1 }}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" noWrap>
              Kích thước vỏ:
            </Typography>
            <Typography variant="body1" noWrap>
              {product.specifications.caseSize}
            </Typography>
          </Stack>
          <Stack
            sx={{ mt: 1 }}
            direction={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1" noWrap>
              Dự trữ năng lượng:
            </Typography>
            <Typography variant="body1" noWrap>
              {product.specifications.powerReserve}
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ mt: 1 }}>
            {formatMoney(product.price)}
          </Typography>
        </Box>
        <Button
          onClick={onQuickView}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: color.black,
            bgcolor: color.white + "99",
            px: 0,
            borderRadius: "99rem",
            "&:hover": {
              bgcolor: color.white,
            },
          }}
        >
          <Eye />
        </Button>
      </Box>
      {/* QuickView Component */}
      <QuickView
        open={showQuickView}
        onClose={closeQuickView}
        product={product}
      />
    </>
  );
};

export default ProductCard;
