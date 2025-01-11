import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/SignUpStyles.css";

const baseURL = "https://recently-levitra-taxi-becoming.trycloudflare.com";

const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include one uppercase letter")
    .matches(/[0-9]/, "Must include one number"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${baseURL}/signup`, data);
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name" className="input-label">Name</label>
        <div className="input-group">
          <FaUser className="icon" />
          <input type="text" placeholder="Name" {...register("name")} />
        </div>
        <p className="error">{errors.name?.message}</p>
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
        <label htmlFor="name" className="input-label">Confirm Password</label>
        <div className="input-group">
        
          <FaLock className="icon" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <span
            className="eye-icon"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <p className="error">{errors.confirmPassword?.message}</p>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;