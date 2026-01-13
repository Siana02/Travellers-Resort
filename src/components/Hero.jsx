import { useState, useEffect, useRef } from "react";
import { Phone, ArrowRight } from "lucide-react";

export default function HeroHeader() {
  const [showBar, setShowBar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Show/hide notification bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setShowBar(false);
      else setShowBar(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking anywhere outside menu
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) {
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
            onClick={() => setMenuOpen(true)}
            className="hero-hamburger"
            aria-label="Open menu"
          >
            <span className={`hero-hamburger-line ${menuOpen ? "open" : ""}`} />
            <span className={`hero-hamburger-line ${menuOpen ? "open" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Overlay */}
      {menuOpen && (
        <>
          {/* Overlay Menu */}
          <div
            className="hero-mobile-menu fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95 backdrop-blur-md"
            ref={menuRef}
          >
            {["About Us", "Rooms", "Contact Us", "Privacy Policy"].map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="hero-mobile-link mb-6 text-2xl"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Close X (sibling) */}
          <button
            className="hero-mobile-x fixed top-4 right-4 z-60"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </>
      )}
    </section>
  );
}
