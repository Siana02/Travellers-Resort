import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, ShoppingCart, X } from "lucide-react";
import DeluxeFamily from "../assets/Deluxe_family.jpg";
import DeluxeRoomSelfContained from "../assets/DeluxeRoom_selfcontained.jpg";
import QueenRoom from "../assets/Queen_room.jpg";
import StandardBasic from "../assets/Standard_basicroom.jpg";
import StandardFamily from "../assets/Standard_family.jpg";
import StandardSuperior from "../assets/Standard_superior.jpg";

const rooms = [
  {
    id: "standard-superior",
    name: "Standard Superior",
    image: StandardSuperior,
    price: 2500,
    breakfast: true,
    description: "Bright ensuite room with cozy finishes and great value.",
  },
  {
    id: "standard-family",
    name: "Standard Family",
    image: StandardFamily,
    price: 4500,
    breakfast: true,
    description: "Comfortable family room with ample space for everyone.",
  },
  {
    id: "deluxe-family",
    name: "Deluxe Family",
    image: DeluxeFamily,
    price: 5000,
    breakfast: true,
    capacity: "Family of 4–5",
    description: "Upgraded finishes with extra lounging space for the family.",
  },
  {
    id: "queen-room",
    name: "Queen Room",
    image: QueenRoom,
    price: 4500,
    breakfast: true,
    description: "Elegant queen bed setup perfect for couples or solo stays.",
  },
  {
    id: "deluxe-room-self",
    name: "Deluxe Room (Self-Contained)",
    image: DeluxeRoomSelfContained,
    price: 3500,
    breakfast: true,
    description: "Self-contained option with added privacy and convenience.",
  },
  {
    id: "standard-basic",
    name: "Standard Basic Room",
    image: StandardBasic,
    price: 1500,
    breakfast: false,
    description: "Budget-friendly choice with essential comforts.",
  },
];

export default function Rooms() {
  const [openRoomId, setOpenRoomId] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [allowPageScroll, setAllowPageScroll] = useState(false);
  const touchStartYRef = useRef(null);
  const cardRefs = useRef([]);
  const MotionDiv = motion.div;

  useEffect(() => {
    const lock = openRoomId || isAnimating;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openRoomId, isAnimating]);

  const drawerMotionProps = prefersReducedMotion
    ? {
        initial: false,
        animate: { y: 0 },
        exit: { y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { duration: 0.35, ease: "easeOut" },
      };

  const lastIndex = rooms.length - 1;

  const scrollToCard = useCallback(
    (index) => {
      const card = cardRefs.current[index];
      if (!card) return;
      setIsAnimating(true);
      const behavior = prefersReducedMotion ? "auto" : "smooth";
      card.scrollIntoView({ behavior, block: "start" });
      const settleTime = prefersReducedMotion ? 0 : 450;
      window.setTimeout(() => {
        setIsAnimating(false);
      }, settleTime);
    },
    [prefersReducedMotion],
  );

  const handleIntent = useCallback(
    (direction) => {
      if (openRoomId || isAnimating) return;

      // exiting after last card downward
      if (direction > 0 && activeIndex === lastIndex) {
        setAllowPageScroll(true);
        return;
      }

      // if already allowed normal scroll and user scrolls up, re-enter card stack
      if (allowPageScroll && direction < 0) {
        setAllowPageScroll(false);
        setActiveIndex(lastIndex);
        scrollToCard(lastIndex);
        return;
      }

      const nextIndex = Math.min(Math.max(activeIndex + direction, 0), lastIndex);
      if (nextIndex === activeIndex) return;
      setActiveIndex(nextIndex);
      scrollToCard(nextIndex);
    },
    [activeIndex, allowPageScroll, isAnimating, lastIndex, openRoomId, scrollToCard],
  );

  useEffect(() => {
    const stackEl = document.getElementById("rooms-stack");
    if (!stackEl) return;

    const wheelHandler = (e) => {
      if (allowPageScroll && e.deltaY > 0) return;
      if (openRoomId || isAnimating) {
        e.preventDefault();
        return;
      }
      const threshold = 28;
      if (Math.abs(e.deltaY) < threshold) return;
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      handleIntent(direction);
    };

    const touchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const touchMove = (e) => {
      if (allowPageScroll && e.touches[0].clientY < (touchStartYRef.current || 0)) return;
      if (openRoomId || isAnimating) {
        e.preventDefault();
        return;
      }
      if (touchStartYRef.current == null) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      const threshold = 36;
      if (Math.abs(deltaY) < threshold) return;
      e.preventDefault();
      const direction = deltaY > 0 ? 1 : -1;
      touchStartYRef.current = e.touches[0].clientY;
      handleIntent(direction);
    };

    stackEl.addEventListener("wheel", wheelHandler, { passive: false });
    stackEl.addEventListener("touchstart", touchStart, { passive: true });
    stackEl.addEventListener("touchmove", touchMove, { passive: false });

    return () => {
      stackEl.removeEventListener("wheel", wheelHandler);
      stackEl.removeEventListener("touchstart", touchStart);
      stackEl.removeEventListener("touchmove", touchMove);
    };
  }, [allowPageScroll, handleIntent, isAnimating, openRoomId]);

  useEffect(() => {
    if (prefersReducedMotion) {
      cardRefs.current[0]?.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    const t = window.requestAnimationFrame(() => scrollToCard(0));
    return () => window.cancelAnimationFrame(t);
  }, [prefersReducedMotion, scrollToCard]);

  return (
    <section id="rooms" className="rooms-section">
      <div className="rooms-title">Find Your Perfect Stay</div>

      <div className="rooms-stack" id="rooms-stack" aria-label="Available rooms">
        {rooms.map((room, index) => (
          <article
            key={room.id}
            className="room-card"
            style={{ backgroundImage: `url(${room.image})` }}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            aria-label={room.name}
          >
            <div className="room-card-overlay">
              <div className="room-card-top">
                <span className="room-name">{room.name}</span>
                <span className="room-price">KES {room.price.toLocaleString()} / night</span>
              </div>

              <div className="room-card-bottom">
                <button
                  type="button"
                  className="room-cta"
                  onClick={() => setOpenRoomId((prev) => (prev === room.id ? null : room.id))}
                  aria-expanded={openRoomId === room.id}
                  aria-controls={`${room.id}-details`}
                >
                  <Search size={18} />
                  <span>Details</span>
                </button>
                <a className="room-cta room-cta-primary" href="/booking">
                  <ShoppingCart size={18} />
                  <span>Book Room</span>
                </a>
              </div>
            </div>

            <AnimatePresence>
              {openRoomId === room.id && (
                <MotionDiv
                  id={`${room.id}-details`}
                  className="room-drawer"
                  role="dialog"
                  aria-modal="true"
                  aria-label={`${room.name} details`}
                  {...drawerMotionProps}
                >
                  <button
                    type="button"
                    className="room-drawer-close"
                    onClick={() => setOpenRoomId(null)}
                    aria-label={`Close ${room.name} details`}
                  >
                    <X size={22} />
                  </button>
                  <div className="room-drawer-content">
                    <p className="room-drawer-title">{room.name}</p>
                    <p className="room-drawer-text">{room.description}</p>
                    <div className="room-drawer-meta">
                      <span className="room-chip">{room.breakfast ? "Breakfast included" : "No breakfast"}</span>
                      {room.capacity && <span className="room-chip">{room.capacity}</span>}
                    </div>
                  </div>
                </MotionDiv>
              )}
            </AnimatePresence>
          </article>
        ))}

        <div className="rooms-end-peek" aria-hidden="true">
          Keep scrolling to explore more
        </div>
      </div>
    </section>
  );
}
