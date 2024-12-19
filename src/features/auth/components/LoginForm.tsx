import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";
import InputField from "./InputField";
import CheckboxWithLabel from "./CheckboxWithLabel";
import SubmitButton from "./SubmitButton";
import { motion } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
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
      sx={{ width: "100%", maxWidth: "450px" }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}
      >
        Chào mừng trở lại
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          name="email"
        />
        <InputField
          label="Mật khẩu"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          name="password"
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <CheckboxWithLabel
          checked={formData.remember}
          onChange={handleChange}
          label="Ghi nhớ đăng nhập"
          name="remember"
        />
        <SubmitButton loading={loading} />
        <Box sx={{ textAlign: "center" }}>
          <Link href="#" variant="body2">
            Quên mật khẩu?
          </Link>
          <Typography variant="body2" sx={{ display: "inline" }}>
            Chưa có tài khoản?{" "}
          </Typography>
          <Link
            component="button"
            variant="body2"
            onClick={() => navigate("/register")}
          >
            Đăng ký ngay
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
