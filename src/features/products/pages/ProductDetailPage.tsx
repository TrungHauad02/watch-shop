import { Box } from "@mui/material";
import { useDarkMode } from "hooks/useDarkMode";
import { useParams } from "react-router-dom";
import useColor from "theme/useColor";

export default function ProductDetailPage() {
  const { isDarkMode } = useDarkMode();
  const color = useColor();
  const { id } = useParams();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? color.gray900 : color.gray100,
        color: isDarkMode ? color.white : color.black,
        mt: 9,
        width: "100%",
      }}
    >
      Product Detail Page {id}
    </Box>
  );
}
