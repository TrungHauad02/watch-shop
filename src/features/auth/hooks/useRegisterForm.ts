import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRegisterForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {};
  return {
    loading,
    formData,
    showPassword,
    setShowPassword,
    handleChange,
    handleSubmit,
    handleLogin,
  };
}
