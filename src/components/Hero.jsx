import { useState, useEffect, useRef } from "react";
import { Phone, ArrowRight, MapPinHouse } from "lucide-react";
import HeroImage from "../assets/Hero_image.jpg";
export default function HeroHeader() {
  const [showBar, setShowBar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const xRef = useRef(null);

  // Show/hide notification bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowBar(false);
      else setShowBar(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking anywhere outside menu or X button
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      // If click is outside the menu and outside the X button, close menu
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        xRef.current &&
        !xRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Notification Bar */}
      {showBar && !menuOpen && (
        <div className="hero-notification-bar">
          Rooms available from 1500
        </div>
      )}

      <header className="hero-header flex justify-between items-center px-6 py-6 w-full relative z-20">
        {/* Logo */}
        <div className="hero-logo relative">
          <h1 className="hero-logo-main">Travellers Inn</h1>
          <p className="hero-logo-sub">Resort</p>
        </div>

        {/* Desktop Nav */}
        <nav className="hero-nav hidden md:flex gap-4">
          {["About Us", "Rooms", "Contact Us", "Privacy Policy"].map((link, index) => (
            <button key={link} className={`hero-nav-btn hero-nav-btn-${index}`}>
              {link}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden relative z-40">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="hero-hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className={`hero-hamburger-line ${menuOpen ? "open" : ""}`} />
            <span className={`hero-hamburger-line ${menuOpen ? "open" : ""}`} />
          </button>
        </div>
      </header>

{/* Hero Images Section */}
      <section
        className="hero-visual w-full relative z-10"
        aria-label="Resort hero"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="hero-visual-overlay" aria-hidden="true" />
        <div className="hero-visual-content">
          <div className="hero-icon-wrap" aria-hidden="true">
            <MapPinHouse className="hero-pin-icon" />
          </div>

          <div className="hero-text-stack">
            <h2 className="hero-title">TRAVELLERS INN</h2>
            <p className="hero-subtitle">RESORT MALINDI</p>
            <p className="hero-support">
              Your cozy affordable stay in Watamu–Malindi
            </p>
          </div>

          <div className="hero-cta-row">
            <a className="hero-cta hero-cta-primary" href="/booking">
              <ArrowRight size={20} />
              <span>Book Now</span>
            </a>
            <a className="hero-cta hero-cta-secondary" href="tel:0717666666">
              <Phone size={20} />
              <span>Contact Us</span>
            </a>
          </div>
        </div>
      </section>


      {/* Mobile Fullscreen Overlay — always in DOM so CSS can animate open/close */}
      <div
        // overlay covers entire viewport; animation controlled by .open class
        className={`hero-mobile-menu ${menuOpen ? "open" : ""}`}
        ref={menuRef}
        // clicking anywhere in the overlay should close the menu
        onClick={() => setMenuOpen(false)}
        role="dialog"
        aria-hidden={!menuOpen}
      >
        <div className="hero-mobile-menu-inner" aria-hidden={!menuOpen}>
          {["About Us", "Rooms", "Contact Us", "Privacy Policy"].map((link) => (
            <a
              key={link}
              href="#"
              // allow link navigation and also close menu
              onClick={() => setMenuOpen(false)}
              className="hero-mobile-link mb-6 text-2xl"
            >
              {link}
            </a>
          ))}
        </div>
      </div>

      {/* Close X (sibling) fixed at top-right; always clickable when menuOpen */}
      {menuOpen && (
        <button
          ref={xRef}
          className="hero-mobile-x"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>
      )}
    </section>
  );
}
