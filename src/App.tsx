import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import About from "./pages/About";
import Projects from "./pages/Projects";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Team from "./pages/Team";
import Partner from "./pages/Partner";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (hash) {
      const scrollToSection = () => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      const animationId = requestAnimationFrame(scrollToSection);
      const timeoutId = setTimeout(scrollToSection, 150);

      return () => {
        cancelAnimationFrame(animationId);
        clearTimeout(timeoutId);
      };
    }

    window.scrollTo(0, 0);

    // Fallback for asynchronous browser scroll restoration behavior
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname, hash]);

  return null;
}

export function AppContent() {
  return (
    <>
      <ScrollToTop />
      {/* Skip-to-content link for keyboard accessibility (WCAG AA 2.4.1 compliance) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-white focus:text-primary focus:px-6 focus:py-3.5 focus:rounded-xl focus:shadow-2xl focus:font-bold focus:z-[9999] border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D4A84F]"
      >
        Skip to main content
      </a>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogArticle />} />
              <Route path="/team" element={<Team />} />
              <Route path="/partner" element={<Partner />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}


export default function App() {
  return <Router><AppContent /></Router>;
}
