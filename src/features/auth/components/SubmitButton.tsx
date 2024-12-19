import { LoadingButton } from "@mui/lab";

const SubmitButton = ({ loading }) => {
  return (
    <LoadingButton
      type="submit"
      fullWidth
      variant="contained"
      loading={loading}
      sx={{
        mt: 3,
        mb: 2,
        bgcolor: "primary.main",
        "&:hover": { bgcolor: "primary.dark" },
        py: 1.5,
      }}
    >
      Đăng nhập
    </LoadingButton>
  );
};

export default SubmitButton;
