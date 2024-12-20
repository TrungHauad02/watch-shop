import { Checkbox, Stack, Typography } from "@mui/material";

interface WSCheckboxWithLabelProps {
  checked: boolean;
  onChange: (e) => void;
  label: string;
  name: string;
  textColor?: string;
  checkedColor?: string;
  color?: string;
}

const WSCheckboxWithLabel = ({
  checked,
  onChange,
  label,
  name,
  textColor,
  checkedColor,
  color,
}: WSCheckboxWithLabelProps) => {
  return (
    <Stack direction={"row"} spacing={1} alignItems={"center"}>
      <Checkbox
        sx={{
          p: 0,
          color: color || "default",
          "&.Mui-checked": {
            color: checkedColor || "primary",
          },
        }}
        checked={checked}
        onChange={onChange}
        name={name}
      />
      <Typography sx={{ color: textColor }}>{label}</Typography>
    </Stack>
  );
};

export default WSCheckboxWithLabel;
