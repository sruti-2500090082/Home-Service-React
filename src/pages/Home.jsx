
import { Link } from "react-router-dom";

function Home() {
  const services = [
    {
      icon: "🔧",
      name: "Plumbing",
      description: "Professional plumbing services for your home."
    },
    {
      icon: "⚡",
      name: "Electrical",
      description: "Reliable electrical repairs and maintenance."
    },
    {
      icon: "🧹",
      name: "Cleaning",
      description: "Keep your home clean and fresh."
    },
    {
      icon: "🎨",
      name: "Painting",
      description: "Give your home a beautiful new look."
    },
    {
      icon: "❄️",
      name: "AC Repair",
      description: "AC servicing and repair at your doorstep."
    },
    {
      icon: "🪚",
      name: "Carpentry",
      description: "Professional furniture and carpentry work."
    }
  ];

  return (
    <div className="home-page">

      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">🏠 Home Services</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <Link to="/login">Login</Link>
          <Link to="/signup" className="nav-signup">Signup</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <h1>HOME SERVICES</h1>

        <p>Professional Services at Your Doorstep</p>

        <p className="hero-description">
          Finding help shouldn't be harder than fixing the problem.
        </p>

        <Link to="/login" className="book-btn">
          Book a Service
        </Link>
      </section>

      {/* Services Section */}
      <section className="services-section" id="services">
        <h2>Popular Services</h2>

        <p className="section-description">
          Choose the service you need for your home.
        </p>

        <div className="services">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="service-icon">{service.icon}</div>

              <h3>{service.name}</h3>

              <p>{service.description}</p>

              <Link to="/login" className="service-btn">
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <h2>About Us</h2>

        <p>
          Home Services is a convenient platform that connects
          customers with trusted professionals for various home
          services, including plumbing, electrical, cleaning,
          painting, AC repair and carpentry.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Home Services. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default Home;
