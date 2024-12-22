import { Box, Stack } from "@mui/material";
import WSBreadcrumb from "components/Breadcrumb/WSBreadcrumb";
import { useDarkMode } from "hooks/useDarkMode";
import { useParams } from "react-router-dom";
import useColor from "theme/useColor";
import { productService } from "../service/ProductService";
import { useEffect, useState } from "react";
import { Product } from "../utils/types";
import ProductImages from "../components/ProductImages";
import ProductDetails from "../components/ProductDetails";

export default function ProductDetailPage() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const data = await productService.getProductById(id);
        setProduct(data);
      };
      fetchProduct();
    }
  }, [id]);

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

  if (!product) return <></>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: isDarkMode ? color.white : color.black,
        mt: 7,
        mb: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          px: { xs: 1, sm: 4, md: 18 },
          pt: 4,
          pb: { xs: 2, sm: 4, md: 8 },
        }}
      >
        {/* Breadcrumb */}
        <Box sx={{ mb: 2 }}>
          <WSBreadcrumb items={itemBreadcrumb} />
        </Box>
        {/* Render product details here */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
          {/* Render hình ảnh chính và danh sách hình ảnh */}
          <ProductImages images={product.images} />
          {/* Thong tin chi tiet */}
          <ProductDetails product={product} />
        </Stack>
      </Box>
    </Box>
  );
}
