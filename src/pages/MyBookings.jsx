
import { Link, useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const allBookings = JSON.parse(
    localStorage.getItem("homeServiceBookings") || "[]"
  );

  const myBookings = allBookings.filter(
    (booking) => booking.userEmail === currentUser?.email
  );

  const cancelBooking = (id) => {
    const updatedBookings = allBookings.map((booking) =>
      booking.id === id && booking.status === "Pending"
        ? { ...booking, status: "Cancelled" }
        : booking
    );

    localStorage.setItem(
      "homeServiceBookings",
      JSON.stringify(updatedBookings)
    );

    alert("Booking cancelled successfully!");

    navigate(0);
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

      <section className="dashboard-services">
        <h2>My Bookings</h2>

        {myBookings.length === 0 ? (
          <p>You have not booked any services yet.</p>
        ) : (
          <div className="booking-list">

            {myBookings.map((booking) => (
              <div className="booking-card" key={booking.id}>

                <h3>{booking.service}</h3>

                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </span>
                </p>

                {booking.status === "Pending" && (
                  <button
                    className="cancel-booking"
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </button>
                )}

              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
}

export default MyBookings;
