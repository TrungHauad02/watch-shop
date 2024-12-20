import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Link, Stack } from "@mui/material";
import { motion } from "framer-motion";
import WSLoadingButton from "components/Button/WSLoadingButton";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { WSCheckboxWithLabel, WSTextField } from "components/Input";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";

const LoginForm = () => {
  const color = useColor();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      dispatch(
        login({
          id: "generated-id",
          name: formData.email.split("@")[0],
          email: formData.email,
        })
      );
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <Box
      component={motion.div}
      onSubmit={handleSubmit}
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

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <WSTextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
          <WSTextField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            name="password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <WSCheckboxWithLabel
              checked={formData.remember}
              onChange={handleChange}
              label="Ghi nhớ đăng nhập"
              name="remember"
              textColor={isDarkMode ? color.white : color.black}
              color={color.gray400}
              checkedColor={color.amber600}
            />
            <Link
              href="#"
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
          loading={loading}
          bgcolor={color.amber500}
          hoverBgcolor={color.amber600}
          sx={{
            textTransform: "capitalize",
            fontSize: "0.95rem",
          }}
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
            onClick={() => navigate("/register")}
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
