import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import "../App.css";

function LoginPage() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
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

      const data = await loginUser(formData);

      login(data);

      navigate("/chat");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );

    }
  };

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h1>Welcome Back</h1>
        <p>Login to ChatSphere</p>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

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

        <button type="submit">
          Login
        </button>

        <span>
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </span>

      </form>

    </div>
  );
}

export default LoginPage;