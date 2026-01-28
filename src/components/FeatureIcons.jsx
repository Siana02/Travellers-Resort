import { BadgeDollarSign, CalendarHeart, Headset, Star } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const features = [
  { icon: BadgeDollarSign, label: "Affordable stays" },
  { icon: CalendarHeart, label: "Fast & easy booking" },
  { icon: Headset, label: "24/7 customer support" },
  { icon: Star, label: "Trusted by guests" },
];

export default function FeatureIcons() {
  const prefersReducedMotion = useReducedMotion();
  const MotionDiv = motion.div;

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
        delay: prefersReducedMotion ? 0 : i * 0.08,
      },
    }),
  };

  return (
    <section className="feature-section">
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="feature-wrapper"
      >
        <div className="feature-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <MotionDiv
                key={feature.label}
                className="feature-card"
                variants={itemVariants}
                custom={index}
              >
                <div className="feature-icon">
                  <Icon size={30} strokeWidth={1.9} />
                </div>
                <p className="feature-label" style={{ fontFamily: "'Libre Bodoni', serif" }}>
                  {feature.label}
                </p>
              </MotionDiv>
            );
          })}
        </div>
      </MotionDiv>
    </section>
  );
}
