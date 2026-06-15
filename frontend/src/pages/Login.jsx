import { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
  console.log("Login Clicked");
  console.log(formData);

  try {
    const res = await api.post(
      "/auth/login",
      formData
    );

    console.log("LOGIN SUCCESS");
    console.log(res.data);

    localStorage.setItem(
      "token",
      res.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    window.location.href = "/dashboard";

  } catch (error) {
    console.log("LOGIN ERROR");
    console.log(error);

    alert(
      error.response?.data?.message ||
      error.message
    );
  }
};

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div
        className="glass-card"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <FaShieldAlt
            size={70}
            color="#00e5ff"
          />

          <h2 className="mt-3">
            Secure Access Portal
          </h2>

          <p className="feature-desc">
            Authenticate to continue
          </p>
        </div>

        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="form-control mb-2"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className="text-end mb-4">
          <Link
            to="/forgot-password"
            style={{
              color: "#00e5ff",
              textDecoration: "none",
              fontSize: "14px"
            }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="btn glow-btn w-100"
          onClick={handleSubmit}
        >
          Secure Login
        </button>

        <div className="text-center mt-4">
          <span className="text-secondary">
            Don't have an account?
          </span>

          <Link
            to="/register"
            className="ms-2"
            style={{
              color: "#00e5ff",
              textDecoration: "none"
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;