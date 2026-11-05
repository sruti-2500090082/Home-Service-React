
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const services = [
    { name: "Plumbing", icon: "🔧", price: "₹300 onwards" },
    { name: "Electrical", icon: "⚡", price: "₹400 onwards" },
    { name: "Cleaning", icon: "🧹", price: "₹500 onwards" },
    { name: "Painting", icon: "🎨", price: "₹1,000 onwards" },
    { name: "AC Repair", icon: "❄️", price: "₹600 onwards" },
    { name: "Carpentry", icon: "🪚", price: "₹700 onwards" }
  ];

  const handleBooking = (e) => {
    e.preventDefault();

    const bookings = JSON.parse(
      localStorage.getItem("homeServiceBookings") || "[]"
    );

    const newBooking = {
      id: Date.now(),
      userName: currentUser.name,
      userEmail: currentUser.email,
      service: selectedService.name,
      date,
      time,
      address,
      phone,
      status: "Pending"
    };

    bookings.push(newBooking);

    localStorage.setItem(
      "homeServiceBookings",
      JSON.stringify(bookings)
    );

    alert("Your service has been booked successfully!");

    setSelectedService(null);
    setDate("");
    setTime("");
    setAddress("");
    setPhone("");

    navigate("/user/bookings");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!currentUser || currentUser.role !== "user") {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Please Login</h2>
          <Link to="/login">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <h2>🏠 Home Services</h2>

        <nav>
          <Link to="/user/dashboard">Dashboard</Link>
          <Link to="/user/bookings">My Bookings</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <section className="dashboard-welcome">
        <h1>Welcome, {currentUser.name}!</h1>
        <p>What service do you need today?</p>
      </section>

      <section className="dashboard-services">
        <h2>Available Home Services</h2>

        <div className="services">
          {services.map((service) => (
            <div className="service-card" key={service.name}>
              <div className="service-icon">{service.icon}</div>

              <h3>{service.name}</h3>

              <p>Starting from {service.price}</p>

              <button
                className="service-btn"
                onClick={() => setSelectedService(service)}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedService && (
        <div className="booking-overlay">
          <form className="auth-form" onSubmit={handleBooking}>

            <h2>Book {selectedService.name}</h2>

            <p>Fill in your booking details</p>

            <label>Booking Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              min={new Date().toLocaleDateString("en-CA")}
            />

            <label>Booking Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              pattern="[0-9]{10}"
              maxLength="10"
              required
            />

            <label>Service Address</label>
            <textarea
              placeholder="Enter your complete address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <button type="submit">Confirm Booking</button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setSelectedService(null)}
            >
              Cancel
            </button>

          </form>
        </div>
      )}

    </div>
  );
}

export default UserDashboard;

