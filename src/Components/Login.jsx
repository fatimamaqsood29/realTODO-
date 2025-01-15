import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/LoginStyles.css";

// Validation schema
const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, data);
  //     console.log("Login Response:", response.data);
  //     alert(response.data.message);

  //     // Save token to localStorage
  //     localStorage.setItem("userToken", response.data.token);
  //     console.log("token stored:", localStorage.getItem("userToken"));
      
  //     localStorage.setItem("isAuthenticated", true); // Save auth state
  //     navigate("/todolist"); // Redirect after login
  //   } catch (error) {
  //     console.error("Login Error:", error.response);
  //     alert(error.response?.data?.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const onSubmit = async (data) => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, data);
  
  //     console.log("Login Response Data:", response.data); // Check the response structure
  //     const token = response.data.token;
  //     if (token) {
  //       localStorage.setItem("userToken", token);
  //       console.log("Token stored successfully:", localStorage.getItem("userToken"));
  //       alert(response.data.message);
  //       navigate("/todolist");
  //     } else {
  //       console.error("Token is missing in the response.");
  //     }
  //   } catch (error) {
  //     console.error("Login Error:", error.response);
  //     alert(error.response?.data?.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, data);
  
      console.log("Login Response Data:", response.data); // Debug the response
      const token = response.data.access_token; // Correct key for the token
      if (token) {
        localStorage.setItem("userToken", token); // Store the token in localStorage
        console.log("Token stored successfully:", localStorage.getItem("userToken"));
        alert(response.data.message); // Display success message
        navigate("/todolist"); // Redirect to todo list
      } else {
        console.error("Token is missing in the response.");
      }
    } catch (error) {
      console.error("Login Error:", error.response);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="input-label">
          Email
        </label>
        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
            className="input-field"
            autoComplete="email"
          />
        </div>
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="password" className="input-label">
          Password
        </label>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="input-field"
            autoComplete="current-password"
          />
          <span
            className="eye-icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <p className="error">{errors.password?.message}</p>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;