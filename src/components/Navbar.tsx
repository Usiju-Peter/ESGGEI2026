import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data";
import { cn } from "../lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full bg-primary/90 backdrop-blur border-b border-white/5 py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <Link to="/" className="flex items-center space-x-3 z-50 group">
          <picture>
            <source srcSet="/images/logo-small.webp" type="image/webp" />
            <img
              src="/images/logo-small.png"
              alt="ESGGEI Logo" 
              width="70"
              height="43"
              className="object-contain transition-all duration-300 h-[43px] w-[70px]"
              loading="eager"
            />
          </picture>
          <span className="font-serif font-semibold text-2xl hidden lg:block text-white transition-colors duration-500 tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
            ESGGEI
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-8 text-base">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              if (link.href === "/about") {
                return (
                  <li key={link.name} className="group relative">
                    <Link
                      to={link.href}
                      className={cn(
                        "relative pb-1 transition-colors tracking-wide duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#B26F2B] after:transition-transform after:duration-300 hover:after:scale-x-100",
                        isActive ? "text-white font-medium" : "text-white/80 hover:text-white font-normal"
                      )}
                    >
                      {link.name}
                    </Link>
                    <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <div className="flex flex-col rounded-b-2xl border border-white/10 bg-primary/95 p-3 shadow-xl backdrop-blur-xl">
                        {[
                          ["Who We Are", "identity"],
                          ["How We Work", "how-we-work"],
                          ["Vision & Mission", "vision-mission"],
                          ["Aims & Objectives", "aims-objectives"],
                          ["Our Team", "our-team"],
                        ].map(([label, section]) => (
                          <Link key={section} to={`/about#${section}`} className="block border-b border-white/[0.07] px-4 py-3 text-sm font-medium tracking-wide text-white/80 transition-colors last:border-b-0 hover:bg-white/[0.07] hover:text-white">{label}</Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={cn(
                      "relative pb-1 transition-colors tracking-wide duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#B26F2B] after:transition-transform after:duration-300 hover:after:scale-x-100",
                      isActive ? "text-white font-medium" : "text-white/80 hover:text-white font-normal"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            to="/partner"
            className="px-7 py-2.5 rounded-full text-base font-medium transition-all duration-300 bg-white text-primary hover:bg-transparent hover:text-white border border-white hover:shadow-[0_0_15px_rgba(255,255,255,0.45)] shadow-sm"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden z-50 p-3 -mr-3 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
          <div
            className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-100/50 rounded-2xl py-6 px-6 lg:hidden flex flex-col space-y-1 z-50"
          >
            {navLinks.map((link) => (
              <div key={link.name}>
                <Link
                  to={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-lg transition-colors",
                    location.pathname === link.href
                      ? "bg-primary/5 text-primary font-medium"
                      : "text-charcoal/70 hover:bg-gray-50 hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
                {link.href === "/about" && (
                  <div className="ml-4 border-l border-primary/15 pl-3">
                    {[
                      ["Who We Are", "identity"],
                      ["How We Work", "how-we-work"],
                      ["Vision & Mission", "vision-mission"],
                      ["Aims & Objectives", "aims-objectives"],
                      ["Our Team", "our-team"],
                    ].map(([label, section]) => (
                      <Link key={section} to={`/about#${section}`} className="block rounded-lg px-3 py-2 text-sm text-charcoal/60 hover:bg-cream hover:text-primary">{label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6 mt-2 border-t border-gray-100">
              <Link
                to="/partner"
                className="w-full flex justify-center bg-primary text-white px-6 py-4 rounded-xl font-medium"
              >
                Contact Us
              </Link>
            </div>
          </div>
      )}
    </header>
  );
}
