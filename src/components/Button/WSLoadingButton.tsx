import { LoadingButton } from "@mui/lab";

interface WSLoadingButtonProps {
  loading: boolean;
  children?: any;
  variant?: "contained" | "outlined" | "text";
  sx?: any;
  bgcolor?: string;
  hoverBgcolor?: string;
  color?: string;
}

const WSLoadingButton = ({
  loading,
  children,
  variant = "contained",
  sx,
  bgcolor,
  hoverBgcolor,
  color,
}: WSLoadingButtonProps) => {
  const complexSx = {
    mt: 3,
    mb: 2,
    bgcolor: `${bgcolor}`,
    color: `${color}`,
    "&:hover": { bgcolor: `${hoverBgcolor}` },
    py: 1.5,
    borderRadius: "1rem",
    ...sx,
  };
  return (
    <LoadingButton
      type="submit"
      fullWidth
      variant={variant}
      loading={loading}
      sx={complexSx}
    >
      {children}
    </LoadingButton>
  );
};

export default WSLoadingButton;
