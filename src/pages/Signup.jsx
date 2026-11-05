
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("homeServiceUsers") || "[]"
    );

    const existingUser = users.find(
      (user) => user.email === email
    );

    if (existingUser) {
      alert("Email already registered!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "user"
    };

    users.push(newUser);

    localStorage.setItem(
      "homeServiceUsers",
      JSON.stringify(users)
    );

    alert("Registration successful!");

    navigate("/login");
  };

  return (
    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSignup}>

        <h2>Create Account</h2>

        <p>Join Home Services today!</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          minLength={6}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit">
          Sign Up
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

        <Link to="/">Back to Home</Link>

      </form>

    </div>
  );
}

export default Signup;
