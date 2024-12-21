import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/slices/authSlice";

export default function useLoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async () => {
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

  const handleRegister = () => {
    navigate("/register");
  };

  const handleForgetPass = () => {
    navigate("/forget-password");
  };

  return {
    formData,
    loading,
    showPassword,
    handleChange,
    setShowPassword,
    handleSubmit,
    handleRegister,
    handleForgetPass,
  };
}
