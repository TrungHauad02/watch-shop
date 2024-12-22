import { Stack } from "@mui/material";

import { Typography } from "@mui/material";

import { Box } from "@mui/material";
import { Specification } from "../utils/types";

export default function ProductSpecifications({
  specifications,
}: {
  specifications: Specification;
}) {
  const specs = [
    { label: "Chuyển động", value: specifications.movement },
    { label: "Kích thước vỏ", value: specifications.caseSize },
    { label: "Dự trữ năng lượng", value: specifications.powerReserve },
    { label: "Kính", value: specifications.crystal },
    { label: "Chất liệu vỏ", value: specifications.caseMaterial },
    { label: "Khả năng chống nước", value: specifications.waterResistance },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Thông số kỹ thuật</Typography>
      {specs.map((spec, index) => (
        <Stack key={index} direction="row" sx={{ mt: 2 }} spacing={4}>
          <Typography variant="body1" sx={{ width: "100%" }}>
            {spec.label}:
          </Typography>
          <Typography variant="body1" sx={{ width: "100%" }}>
            {spec.value}
          </Typography>
        </Stack>
      ))}
    </Box>
  );
}
