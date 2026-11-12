import { Link } from "react-router-dom";
import { navLinks } from "../data";
import { analyticsConfigured } from "../lib/analytics";
export const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/esggei/" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/earthsprings-global-grace-empowerment-initiative-esggei-aa132537b/",
  },
  { name: "X (Twitter)", href: "https://x.com/esggei" },
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-layout">
          <div className="footer-brand">
            <Link to="/" className="brand" aria-label="ESGGEI home">
              <img
                src="/images/logo-small.webp"
                alt=""
                width="70"
                height="43"
                loading="lazy"
              />
              <span>ESGGEI</span>
            </Link>
            <p>Empowering lives. Restoring hope.</p>
            <div className="social-links" aria-label="Social profiles">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h2>Explore</h2>
            <nav aria-label="Footer navigation" className="footer-navigation">
              {[...navLinks, { name: "Contact Us", href: "/partner" }].map(
                (link) => (
                  <Link key={link.href} to={link.href}>
                    {link.name}
                  </Link>
                ),
              )}
            </nav>
          </div>
          <div>
            <h2>Get in touch</h2>
            <address>
              <a href="mailto:esgeei@gmail.com">esgeei@gmail.com</a>
              <a href="tel:+2348064676210">0806 467 6210</a>
              <p>
                No 16 MD Umar Close,
                <br />
                NAF Valley Estate,
                <br />
                Asokoro, Abuja
              </p>
            </address>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} EarthSprings Global Grace Empowerment
            Initiative.
          </p>
          <div>
            <Link to="/privacy">Privacy notice</Link>
            {analyticsConfigured && (
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new Event("esggei:analytics-preferences"),
                  )
                }
              >
                Analytics preferences
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
