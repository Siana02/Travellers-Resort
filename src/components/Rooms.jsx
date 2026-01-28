import { useEffect, useState } from "react";
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
  const MotionDiv = motion.div;

  useEffect(() => {
    document.body.style.overflow = openRoomId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openRoomId]);

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

  return (
    <section id="rooms" className="rooms-section">
      <div className="rooms-title">Find Your Perfect Stay</div>

      <div className="rooms-stack" aria-label="Available rooms">
        {rooms.map((room) => (
          <article
            key={room.id}
            className="room-card"
            style={{ backgroundImage: `url(${room.image})` }}
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
