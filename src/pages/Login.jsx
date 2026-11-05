
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Admin Login
    if (
      email.trim().toLowerCase() === "admin@gmail.com" &&
      password === "admin123"
    ) {
      const admin = {
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin"
      };

      localStorage.setItem("currentUser", JSON.stringify(admin));

      alert("Admin Login Successful!");

      navigate("/admin/dashboard");
      return;
    }

    // User Login
    const users = JSON.parse(
      localStorage.getItem("homeServiceUsers") || "[]"
    );

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));

      alert("Login Successful!");

      navigate("/user/dashboard");
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleLogin}>

        <h2>Welcome Back!</h2>

        <p>Login to your Home Services account</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>

        <Link to="/">Back to Home</Link>

      </form>

    </div>
  );
}

export default Login;
