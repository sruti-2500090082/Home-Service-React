
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const users = JSON.parse(
    localStorage.getItem("homeServiceUsers") || "[]"
  );

  const bookings = JSON.parse(
    localStorage.getItem("homeServiceBookings") || "[]"
  );

  const pending = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const confirmed = bookings.filter(
    (b) => b.status === "Confirmed"
  ).length;

  const completed = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="auth-container">
        <div className="auth-form">
          <h2>Admin Access Required</h2>
          <Link to="/login">Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <h2>🏠 Home Services Admin</h2>

        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/bookings">Manage Bookings</Link>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </header>

      <section className="dashboard-welcome">
        <h1>Welcome, Admin!</h1>
        <p>Manage your Home Service Booking System.</p>
      </section>

      <section className="admin-content">

        <h2>Dashboard Overview</h2>

        <div className="admin-stats">

          <div className="stat-card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>

          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p>{bookings.length}</p>
          </div>

          <div className="stat-card">
            <h3>Pending Bookings</h3>
            <p>{pending}</p>
          </div>

          <div className="stat-card">
            <h3>Confirmed Bookings</h3>
            <p>{confirmed}</p>
          </div>

          <div className="stat-card">
            <h3>Completed Bookings</h3>
            <p>{completed}</p>
          </div>

        </div>

        <Link to="/admin/bookings" className="admin-link">
          View All Bookings →
        </Link>

      </section>

    </div>
  );
}

export default AdminDashboard;
