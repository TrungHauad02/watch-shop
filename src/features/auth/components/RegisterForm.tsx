import { Box, Stack, Typography, Link } from "@mui/material";
import useRegisterForm from "../hooks/useRegisterForm";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";
import { WSTextField } from "components/Input";
import WSLoadingButton from "components/Button/WSLoadingButton";

export default function RegisterForm() {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const registerForm = useRegisterForm();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: "300px", sm: "450px" },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          textAlign: "center",
          fontWeight: "bold",
          color: isDarkMode ? color.white : color.black,
          fontSize: { xs: "1.75rem", sm: "2.1rem" },
        }}
      >
        Chào mừng bạn mới
      </Typography>
      <Box>
        <Stack spacing={2}>
          <WSTextField
            label="Họ tên"
            type="fullName"
            value={registerForm.formData.fullName}
            onChange={registerForm.handleChange}
            name="fullName"
            required
          />
          <WSTextField
            label="Email"
            type="email"
            value={registerForm.formData.email}
            onChange={registerForm.handleChange}
            name="email"
            required
          />
          <WSTextField
            label="Mật khẩu"
            type={registerForm.showPassword ? "text" : "password"}
            value={registerForm.formData.password}
            onChange={registerForm.handleChange}
            name="password"
            showPassword={registerForm.showPassword}
            setShowPassword={registerForm.setShowPassword}
            required
          />
          <WSTextField
            label="Nhập lại mật khẩu"
            type={registerForm.showPassword ? "text" : "password"}
            value={registerForm.formData.rePassword}
            onChange={registerForm.handleChange}
            name="rePassword"
            showPassword={registerForm.showPassword}
            setShowPassword={registerForm.setShowPassword}
            required
          />
          <WSLoadingButton
            color={isDarkMode ? color.white : color.black}
            loading={registerForm.loading}
            bgcolor={color.amber500}
            hoverBgcolor={color.amber600}
            sx={{
              textTransform: "capitalize",
              fontSize: "0.95rem",
            }}
            onClick={registerForm.handleSubmit}
          >
            Đăng ký
          </WSLoadingButton>
        </Stack>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
            mb: { xs: -2, sm: -4 },
          }}
          spacing={1}
        >
          <Typography
            variant="body2"
            sx={{
              display: "inline",
              color: isDarkMode ? color.white : color.black,
            }}
          >
            Bạn đã có tài khoản?{"  "}
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={registerForm.handleLogin}
            fontWeight="600"
            sx={{
              color: isDarkMode ? color.amber600 : color.amber500,
              textDecoration: "none",
            }}
          >
            Đăng nhập tại đây
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
