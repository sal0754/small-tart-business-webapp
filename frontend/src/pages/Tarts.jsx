import { Link } from "react-router-dom";
import "../styles/Tarts.css";

function Tarts() {
  const featuredTarts = [
    {
      id: 1,
      name: "Almond Apple Tart",
      price: "$34",
      description: "Delicate apple slices layered over almond cream in a buttery tart shell.",
      image: "/assets/IMG_8316-removebg-preview.png",
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Apple Pie Tart",
      price: "$32",
      description: "Warm spiced apple filling with a patisserie-style finish for cozy celebrations.",
      image: "/assets/apple-pie-tart.png",
      badge: "Fresh Daily",
    },
    {
      id: 3,
      name: "Pecan Tart",
      price: "$36",
      description: "Rich caramelised pecan filling in a crisp golden shell with a refined finish.",
      image: "/assets/pecan-tart.png",
      badge: "New",
    },
  ];

  const floatingFruit = [
    {
      id: 1,
      className: "fruit-one",
      src: "/assets/apple-slice-1.png",
      alt: "Green apple slice",
    },
    {
      id: 2,
      className: "fruit-two",
      src: "/assets/apple-slice-2.png",
      alt: "Green apple wedge",
    },
    {
      id: 3,
      className: "fruit-three",
      src: "/assets/apple-slice-3.png",
      alt: "Half apple slice",
    },
    {
      id: 4,
      className: "fruit-four",
      src: "/assets/apple-slice-4.png",
      alt: "Green apple wedge",
    },
  ];

  return (
    <main className="landing">
      <section className="hero">
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

        <div className="landing-content fade-up-in">
          <div className="landing-text">
            <p className="hero-eyebrow">Handmade with love, daily</p>

            <h1 className="main-heading">
              Handcrafted tarts
              <br />
              made to brighten
              <br />
              every moment
            </h1>

            <div className="cta-buttons">
              <Link to="/tarts" className="btn primary">View popular tarts</Link>
              <Link to="/order" className="btn secondary">Order Tarts</Link>
            </div>
          </div>

          <div className="landing-image">
            {floatingFruit.map((fruit) => (
              <img
                key={fruit.id}
                className={`floating-fruit ${fruit.className}`}
                src={fruit.src}
                alt={fruit.alt}
              />
            ))}

            <div className="hero-product-stage">
              <img
                src="/assets/hero-apple-tart.png"
                alt="Signature handcrafted apple tart"
                className="hero-product-image"
              />
            </div>
          </div>
        </div>

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

      <section className="featured-tarts">
        <div className="section-heading">
          <p className="section-eyebrow">Our favourites</p>
          <h2>Popular Tarts</h2>
          <p className="section-copy">
            Elegant tart designs made for gifting, gatherings, and little everyday celebrations.
          </p>
        </div>

        <div className="tart-grid">
          {featuredTarts.map((tart) => (
            <article className="tart-card" key={tart.id}>
              <div className="tart-image-wrap">
                <span className="tart-badge">{tart.badge}</span>
                <img src={tart.image} alt={tart.name} className="tart-image" />
              </div>

              <div className="tart-card-body">
                <div className="tart-card-top">
                  <h3>{tart.name}</h3>
                  <span className="tart-price">{tart.price}</span>
                </div>

                <p>{tart.description}</p>

                <div className="tart-card-actions">
                  <Link to="/order" className="card-btn solid">Order now</Link>
                  <Link to="/tarts" className="card-btn ghost">View details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Tarts;