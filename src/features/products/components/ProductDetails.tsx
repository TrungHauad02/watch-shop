import { Button, Typography } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { Product } from "../utils/types";
import useColor from "theme/useColor";
import { Stack } from "@mui/material";
import { formatMoney } from "utils/format";
import ProductSpecifications from "./ProductSpecifications";

export default function ProductDetails({ product }: { product: Product }) {
  const { isDarkMode } = useDarkMode();
  const color = useColor();

  const contactLinks = [
    {
      label: "Facebook",
      link: "https://www.facebook.com/minh.nhat.615642",
      bgcolor: color.sky500,
    },
    {
      label: "Zalo",
      link: "https://zalo.me/0834821424",
      bgcolor: color.cyan500,
    },
  ];

  return (
    <Stack sx={{ width: "100%" }} direction="column">
      <Typography variant="h5" sx={{ mt: 2 }}>
        {product.name}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
        Thương hiệu: {product.brand}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          color: isDarkMode ? color.amber400 : color.amber600,
        }}
      >
        {formatMoney(product.price)}
      </Typography>

      {/* Specifications */}
      <ProductSpecifications specifications={product.specifications} />

      {/* Contact Seller */}
      <Stack sx={{ mt: 2 }}>
        <Typography
          variant="h6"
          sx={{ mb: 1, color: isDarkMode ? color.amber400 : color.amber600 }}
        >
          Liên hệ đặt hàng ngay hôm nay
        </Typography>
        <Stack direction="row" spacing={2}>
          {contactLinks.map((contact, index) => (
            <Button
              key={index}
              variant="contained"
              sx={{
                bgcolor: contact.bgcolor,
                color: isDarkMode ? color.black : color.white,
              }}
              onClick={() => window.open(contact.link, "_blank")}
            >
              {contact.label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}
