import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await registerUser(formData);
      login(data);
      navigate("/chat");
    } catch (err) {
  console.log("REGISTER ERROR:", err.response);

  const errorData = err.response?.data;

  if (typeof errorData === "string") {
    setError(errorData);
  } else if (errorData?.message) {
    setError(errorData.message);
  } else if (errorData?.email) {
    setError(errorData.email);
  } else if (errorData?.username) {
    setError(errorData.username);
  } else if (errorData?.password) {
    setError(errorData.password);
  } else {
    setError("Registration failed");
  }
}
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <p>Join ChatSphere and start chatting.</p>

        {error && <div className="error">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Register</button>

        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
}

export default RegisterPage;