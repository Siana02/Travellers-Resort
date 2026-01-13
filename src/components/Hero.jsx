import { useState, useEffect, useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";

export default function HeroHeader() {
  const [showBar, setShowBar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // reference to the mobile menu

  // Show/hide notification bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowBar(false);
      else setShowBar(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);


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
