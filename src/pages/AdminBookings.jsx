
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminBookings() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [bookings, setBookings] = useState(
    JSON.parse(localStorage.getItem("homeServiceBookings")) || []
  );

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="dashboard">
        <h2>Admin login required</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  function updateStatus(id, newStatus) {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id
        ? { ...booking, status: newStatus }
        : booking
    );

    setBookings(updatedBookings);
    localStorage.setItem(
      "homeServiceBookings",
      JSON.stringify(updatedBookings)
    );
  }

  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin - Manage Bookings</h2>

        <div>
          <Link to="/admin/dashboard">Dashboard</Link>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="admin-content">
        <h2>All Customer Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings available.</p>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking.id}>
                <h3>{booking.service}</h3>

                <p><strong>Customer:</strong> {booking.userName}</p>
                <p><strong>Email:</strong> {booking.userEmail}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Address:</strong> {booking.address}</p>

                <p>
                  <strong>Status:</strong> {booking.status}
                </p>

                {booking.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(booking.id, "Confirmed")
                      }
                    >
                      Confirm
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(booking.id, "Cancelled")
                      }
                    >
                      Cancel
                    </button>
                  </>
                )}

                {booking.status === "Confirmed" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(booking.id, "Completed")
                      }
                    >
                      Mark Completed
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(booking.id, "Cancelled")
                      }
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminBookings;
