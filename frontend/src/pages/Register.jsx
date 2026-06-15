import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
    try {
      const res = await api.post(
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      window.location.href = "/login";
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Registration Failed"
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
        style={{ maxWidth: "550px", width: "100%" }}
      >
        <div className="text-center mb-4">
          <FaUserShield size={70} color="#8b5cf6" />

          <h2 className="mt-3">
            Create Secure Account
          </h2>

          <p className="feature-desc">
            Register for protected cloud access
          </p>
        </div>

        <input
          type="text"
          name="name"
          className="form-control mb-3"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

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
          className="form-control mb-4"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          className="btn glow-btn w-100"
          onClick={handleSubmit}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Register;