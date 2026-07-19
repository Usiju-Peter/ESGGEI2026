import { Link, useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "../data";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { SVGProps } from "react";

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <footer className="bg-primary text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link to="/" className="inline-block group text-left">
              <div className="flex items-center space-x-3">
                <picture>
                  <source srcSet="/images/logo-small.webp" type="image/webp" />
                  <img 
                    src="/images/logo.png" 
                    alt="ESGGEI Logo" 
                    width="70"
                    height="43"
                    className="object-contain h-[43px] w-[70px]"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="font-serif font-bold text-3xl text-white leading-none tracking-wide group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">
                  ESGGEI
                </span>
              </div>
            </Link>
            <p className="text-lg md:text-xl font-serif italic text-cream/90">
              Empowering Lives. Restoring Hope.
            </p>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold text-xl md:text-2xl mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <button onClick={() => handleNavigation(link.href)} className="text-base md:text-lg text-cream/80 hover:text-white transition-colors font-light text-left w-full">
                    {link.name}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => handleNavigation("/partner")} className="text-base md:text-lg text-cream/80 hover:text-white transition-colors font-light text-left w-full">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold text-xl md:text-2xl mb-6">Get In Touch</h3>
            <ul className="space-y-4 text-base md:text-lg">
              <li><a href="mailto:esgeei@gmail.com" className="text-cream/80 hover:text-white transition-colors font-light">esgeei@gmail.com</a></li>
              <li><a href="tel:08064676210" className="text-cream/80 hover:text-white transition-colors font-light">0806 467 6210</a></li>
              <li>
                <button 
                  onClick={() => handleNavigation("/")} 
                  className="text-cream/80 hover:text-white transition-colors font-light text-left"
                >
                  www.esggei.org.ng
                </button>
              </li>
              <li className="text-cream/80 font-light leading-relaxed mt-4">
                No 16 MD Umar Close,<br />
                NAF Valley Estate.<br />
                Asokoro Abuja
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold text-xl md:text-2xl mb-6">Social Media</h3>
            <div className="flex flex-col space-y-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center space-x-3.5 text-cream/80 hover:text-white transition-colors text-base md:text-lg font-light w-max"
              >
                <div className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-md transition-all group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(24,119,242,0.6)]">
                  <Facebook size={18} fill="currentColor" stroke="none" />
                </div>
                <span className="font-serif font-medium tracking-wide">Facebook</span>
              </a>

              <a 
                href="https://x.com/esggei" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center space-x-3.5 text-cream/80 hover:text-white transition-colors text-base md:text-lg font-light w-max"
              >
                <div className="w-10 h-10 rounded-full bg-[#15202B] text-white flex items-center justify-center shadow-md border border-white/10 transition-all group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]">
                  <XIcon className="w-[16px] h-[16px]" />
                </div>
                <span className="font-serif font-medium tracking-wide">Twitter</span>
              </a>

              <a 
                href="https://www.instagram.com/esggei/" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center space-x-3.5 text-cream/80 hover:text-white transition-colors text-base md:text-lg font-light w-max"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-md transition-all group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(238,42,123,0.6)]">
                  <Instagram size={18} />
                </div>
                <span className="font-serif font-medium tracking-wide">Instagram</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/earthsprings-global-grace-empowerment-initiative-esggei-aa132537b/" 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center space-x-3.5 text-cream/80 hover:text-white transition-colors text-base md:text-lg font-light w-max"
              >
                <div className="w-10 h-10 rounded-full bg-[#0077B5] text-white flex items-center justify-center shadow-md transition-all group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(0,119,181,0.6)]">
                  <Linkedin size={18} fill="currentColor" stroke="none" />
                </div>
                <span className="font-serif font-medium tracking-wide">LinkedIn</span>
              </a>
            </div>
          </div>
          
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-xs text-white">
          <p>© {new Date().getFullYear()} EarthSprings Global Grace Empowerment Initiative. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
