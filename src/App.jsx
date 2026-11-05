import AdminBookings from "./pages/AdminBookings";
import AdminDashboard from "./pages/AdminDashboard";
import MyBookings from "./pages/MyBookings";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

function ComingSoon({ name }) {
  return (
    <div style={{ textAlign: "center", padding: "100px 20px" }}>
      <h1>{name}</h1>
      <p>This page will be available soon!</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

       <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />
        

       <Route
  path="/user/dashboard"
  element={<UserDashboard />}
/>

    <Route
  path="/user/bookings"
  element={<MyBookings />}
/>   

       <Route
  path="/admin/dashboard"
  element={<AdminDashboard />}
/>

        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

