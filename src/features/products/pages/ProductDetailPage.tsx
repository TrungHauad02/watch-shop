import { Box } from "@mui/material";
import WSBreadcrumb from "components/Breadcrumb/WSBreadcrumb";
import { useDarkMode } from "hooks/useDarkMode";
import { useParams } from "react-router-dom";
import useColor from "theme/useColor";
import { productService } from "../service/ProductService";

export default function ProductDetailPage() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const { id } = useParams<{ id: string }>();
  const product = id ? productService.getProductById(id) : null;

  const itemBreadcrumb = [
    {
      path: "/",
      label: "Trang chủ",
    },
    {
      path: "/products",
      label: "Sản phẩm",
    },
    {
      path: `/products/${id}`,
      label: product?.name || "",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? color.gray900 : color.gray100,
        color: isDarkMode ? color.white : color.black,
        mt: 7,
        width: "100%",
      }}
    >
      <Box
        sx={{ px: { xs: 1, sm: 4, md: 8 }, pt: 4, pb: { xs: 2, sm: 4, md: 8 } }}
      >
        {/* Breadcrumb */}
        <Box sx={{ mb: 2 }}>
          <WSBreadcrumb items={itemBreadcrumb} />
        </Box>
        {/* Render product details here */}
      </Box>
    </Box>
  );
}
