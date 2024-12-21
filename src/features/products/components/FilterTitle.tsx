import { Typography } from "@mui/material";
import React from "react";
interface FilterTitleProps {
  children: React.ReactNode;
}

export default function FilterTitle({ children }: FilterTitleProps) {
  return (
    <Typography
      variant="h6"
      gutterBottom
      sx={{ textTransform: "capitalize", fontWeight: "bold" }}
    >
      {children}
    </Typography>
  );
}
