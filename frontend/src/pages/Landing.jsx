import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  return (
    <section className="landing">
      <nav className="landing-nav">
        <h2 className="logo">Mai's Tarts</h2>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tarts">View Tarts</Link></li>
          <li><Link to="/tart-builder">Tart Builder</Link></li>
          <li><Link to="/order">Contact Us</Link></li>
          <li><Link to="/loginUser">Account</Link></li>


        </ul>
      </nav>

      <div className="landing-content">
        <div className="landing-text">
          <h1 className="main-heading">
            Handcrafted tarts<br />
            made to brighten<br />
            every moment
          </h1>

          <div className="cta-buttons">
            <Link to="/tarts" className="btn primary">
              View popular tarts
            </Link>

            <Link to="/tart-builder" className="btn secondary">
              Tart Builder
            </Link>
          </div>
        </div>

        <div className="landing-image">
          <img
            src="/assets/apple-tart.jpg"
            alt="Apple tart"
          />
        </div>
      </div>
    </section>
  );
}


export default Landing
