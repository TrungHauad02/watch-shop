import { Breadcrumbs, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProductBreadcrumb() {
  const navigate = useNavigate();
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        component={"button"}
        underline="hover"
        color="inherit"
        onClick={() => {
          navigate("/");
        }}
      >
        Trang chủ
      </Link>
      <Link
        component={"button"}
        underline="hover"
        color="inherit"
        onClick={() => {
          navigate("/products");
        }}
      >
        Sản phẩm
      </Link>
    </Breadcrumbs>
  );
}
