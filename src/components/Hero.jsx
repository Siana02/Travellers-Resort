// src/components/Hero.jsx
import { useState, useEffect } from "react";
import { Phone, ArrowRight } from "lucide-react";

export default function HeroHeader() {
  // show/hide notification bar on scroll
  const [showBar, setShowBar] = useState(true);

  // mobile menu open state (was missing)
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowBar(false);
      } else {
        setShowBar(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full">
      {showBar && (
        <div className="hero-notification-bar">
          Rooms available from 1500
        </div>
      )}

      <header className="hero-header flex justify-between items-center px-6 py-6 w-full relative z-20">
        <div className="hero-logo relative">
          <h1 className="hero-logo-main">Travellers Inn</h1>
          <p className="hero-logo-sub">Resort</p>
        </div>

        <nav className="hero-nav hidden md:flex gap-4">
          {["About Us", "Rooms", "Contact Us", "Privacy Policy"].map((link, index) => (
            <button key={link} className={`hero-nav-btn hero-nav-btn-${index}`}>
              {link}
            </button>
          ))}
        </nav>

        <div className="md:hidden relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`hero-hamburger`}
            aria-label="Toggle menu"
          >
            <span className={`hero-hamburger-line ${menuOpen ? "open" : ""}`}></span>
            <span className={`hero-hamburger-line ${menuOpen ? "open" : ""}`}></span>
          </button>

          {menuOpen && (
            <div className="hero-mobile-menu">
              {["About Us", "Rooms", "Contact Us", "Privacy Policy"].map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="hero-mobile-link"
                >
                  {link}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>
    </section>
  );
}
