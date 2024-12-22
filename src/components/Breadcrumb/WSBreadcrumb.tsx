import { Breadcrumbs, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface WSBreadcrumbProps {
  items: { path: string; label: string }[];
}

export default function WSBreadcrumb({ items }: WSBreadcrumbProps) {
  const navigate = useNavigate();

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {items.map((item, index) => (
        <Link
          key={index}
          component={"button"}
          underline="hover"
          color="inherit"
          onClick={() => navigate(item.path)}
        >
          {item.label}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
