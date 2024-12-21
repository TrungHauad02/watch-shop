import { Box, Typography, Link, Stack } from "@mui/material";
import WSLoadingButton from "components/Button/WSLoadingButton";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WSCheckboxWithLabel, WSTextField } from "components/Input";
import useLoginForm from "../hooks/useLoginForm";

const LoginForm = () => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const loginForm = useLoginForm();

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
        Chào mừng trở lại
      </Typography>

      <Box>
        <Stack spacing={2}>
          <WSTextField
            label="Email"
            type="email"
            value={loginForm.formData.email}
            onChange={loginForm.handleChange}
            name="email"
            required
          />
          <WSTextField
            label="Mật khẩu"
            type={loginForm.showPassword ? "text" : "password"}
            value={loginForm.formData.password}
            onChange={loginForm.handleChange}
            name="password"
            showPassword={loginForm.showPassword}
            setShowPassword={loginForm.setShowPassword}
            required
          />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <WSCheckboxWithLabel
              checked={loginForm.formData.remember}
              onChange={loginForm.handleChange}
              label="Ghi nhớ đăng nhập"
              name="remember"
              textColor={isDarkMode ? color.white : color.black}
              color={color.gray400}
              checkedColor={color.amber600}
            />
            <Link
              onClick={loginForm.handleForgetPass}
              variant="body2"
              fontWeight="600"
              sx={{
                color: isDarkMode ? color.amber600 : color.amber500,
                textDecoration: "none",
              }}
            >
              Quên mật khẩu?
            </Link>
          </Stack>
        </Stack>
        <WSLoadingButton
          color={isDarkMode ? color.white : color.black}
          loading={loginForm.loading}
          bgcolor={color.amber500}
          hoverBgcolor={color.amber600}
          sx={{
            textTransform: "capitalize",
            fontSize: "0.95rem",
          }}
          onClick={loginForm.handleSubmit}
        >
          Đăng nhập
        </WSLoadingButton>
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
            Chưa có tài khoản?{"  "}
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={loginForm.handleRegister}
            fontWeight="600"
            sx={{
              color: isDarkMode ? color.amber600 : color.amber500,
              textDecoration: "none",
            }}
          >
            Đăng ký ngay
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginForm;
