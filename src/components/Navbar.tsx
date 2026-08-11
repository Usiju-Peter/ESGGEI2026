import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8 text-base">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className={cn(
                      "transition-colors tracking-wide duration-300",
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
          className="md:hidden z-50 p-3 -mr-3 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl border border-gray-100/50 rounded-2xl py-6 px-6 md:hidden flex flex-col space-y-1 z-50"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg text-lg transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/5 text-primary font-medium"
                    : "text-charcoal/70 hover:bg-gray-50 hover:text-primary"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 mt-2 border-t border-gray-100">
              <Link
                to="/partner"
                className="w-full flex justify-center bg-primary text-white px-6 py-4 rounded-xl font-medium"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
