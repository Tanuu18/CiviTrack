
import React, { useState } from "react";
import "./Login.css";
import { Mail, LockKeyhole } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from 'lucide-react'
import api from "../utils/axios";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      const role = response.data.user.role;

      if (role === "citizen") {
        navigate("/");
      } else if (role === "officer") {
        navigate("/officer");
      } else if (role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error.response?.data);

    }
  }
  return (
    <div className="login-page">
      <div className="login-container">

        <h2>Welcome Back</h2>

        <p className="login-subtitle">
          Login to your CiviTrack account
        </p>
        
        <label>Email Address</label>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <Mail className="input-icon" size={18} />
            
            <input
              type="email" name="email"
              placeholder="Enter your email"
            />
          </div>

          {/* <div className="input-wrapper">
            <LockKeyhole className="input-icon" size={18}/>
          <label>Password</label>
          <input
            type="password" name="password"
            placeholder="Enter your password"
          />
        </div> */}
        <label>Password</label>
          <div className="input-wrapper">
            <LockKeyhole className="input-icon" size={18} />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <button type="submit">
            Login
          </button>
        </form>
        <p className="register-link">
          Don't have an account?<Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
};
export default Login;
