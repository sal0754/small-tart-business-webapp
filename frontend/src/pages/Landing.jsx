import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Landing() {
  return (
    <main className="landing">
      <section className="hero">

        {/* ── NAV ─────────────────────────────────── */}
        <nav className="landing-nav">
          <h2 className="logo">La Petite Tarte</h2>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tart-builder">Tart Builder</Link></li>
            <li><Link to="/tarts">Tarts</Link></li>
            <li><Link to="/order">Contact Us</Link></li>
            <li><Link to="/account" className="nav-account">Account</Link></li>
          </ul>
        </nav>

        {/* ── HERO CONTENT ────────────────────────── */}
        <div className="landing-content fade-up-in">

          {/* Left: text + CTAs */}
          <div className="landing-text">
            <p className="hero-eyebrow">Handmade with love, daily</p>
            <h1 className="main-heading">
              Handcrafted tarts<br />
              made to brighten<br />
              every moment
            </h1>
            <div className="cta-buttons">
              <Link to="/tarts" className="btn primary">View popular tarts</Link>
              <Link to="/tart-builder"  className="btn secondary">Tart Builder</Link>
            </div>
          </div>

          {/* Right: large rectangular image with floating accents */}
          <div className="landing-image">

            <span className="floating-icon icon-one" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19c5 0 9-4 9-9 0-2-1-4-2-5-3 1-6 3-8 6-2 2-3 5-3 8h4z"/>
              </svg>
            </span>

            <span className="floating-icon icon-two" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3l2.2 4.8L19 10l-4.8 2.2L12 17l-2.2-4.8L5 10l4.8-2.2L12 3z"/>
              </svg>
            </span>

            <span className="floating-icon icon-three" aria-hidden="true">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14c3 0 5-2 6-4 2 1 4 2 6 2 2 0 4-1 5-2 0 5-4 9-9 9S4 19 4 14z"/>
              </svg>
            </span>

            <div className="image-frame">
              <img
                src="/assets/apple-tart.jpg"
                alt="Signature handcrafted apple tart"
              />
            </div>

          </div>
        </div>

        {/* ── WAVE DIVIDER ─────────────────────────── */}
        <svg
          className="wave-divider"
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,64 C220,126 520,0 760,40 C980,76 1220,152 1440,92 L1440,130 L0,130 Z" />
        </svg>

      </section>
    </main>
  );
}

export default Landing;
