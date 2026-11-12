import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    if (!isOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [isOpen]);
  const active = (href: string) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);
  return (
    <header className="site-header">
      <div className="site-container header-layout">
        <Link to="/" className="brand" aria-label="ESGGEI home">
          <img src="/images/logo-small.webp" alt="" width="70" height="43" />
          <span>ESGGEI</span>
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              aria-current={active(link.href) ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Link
            className="button button-light"
            to="/partner"
            aria-current={active("/partner") ? "page" : undefined}
          >
            Contact Us
          </Link>
        </nav>
        <button
          ref={button}
          type="button"
          className="mobile-menu-button"
          aria-label="Toggle menu"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? (
            <X aria-hidden="true" size={24} />
          ) : (
            <Menu aria-hidden="true" size={24} />
          )}
        </button>
      </div>
      {isOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {[...navLinks, { name: "Contact Us", href: "/partner" }].map(
            (link) => (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active(link.href) ? "page" : undefined}
              >
                {link.name}
              </Link>
            ),
          )}
        </nav>
      )}
    </header>
  );
}
