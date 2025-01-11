import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/LoginStyles.css";

const baseURL = "https://recently-levitra-taxi-becoming.trycloudflare.com";

const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/login`, data);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className="input-label">Email</label>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="email" placeholder="Email" {...register("email")} />
        </div>
        <p className="error">{errors.email?.message}</p>
        <label htmlFor="name" className="input-label">Password</label>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <p className="error">{errors.password?.message}</p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;