import { LoadingButton } from "@mui/lab";

interface WSLoadingButtonProps {
  loading: boolean;
  children?: any;
  variant?: "contained" | "outlined" | "text";
  sx?: any;
  bgcolor?: string;
  hoverBgcolor?: string;
  color?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const WSLoadingButton = ({
  loading,
  children,
  variant = "contained",
  sx,
  bgcolor,
  hoverBgcolor,
  color,
  onClick,
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
      onClick={onClick}
    >
      {children}
    </LoadingButton>
  );
};

export default WSLoadingButton;
