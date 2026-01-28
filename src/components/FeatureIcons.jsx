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
    <section className="w-full bg-[#f8f0e5] px-8 py-20 md:py-24">
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl rounded-2xl border border-[#082052]/14 bg-white/40 shadow-sm"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y divide-[#082052]/14 md:divide-y-0 md:divide-x">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <MotionDiv
                key={feature.label}
                className="group flex flex-col items-center text-center gap-6 md:gap-8 lg:gap-10 p-10 md:p-12 lg:p-14 transition-transform duration-200 md:hover:scale-[1.04] md:hover:-translate-y-1"
                variants={itemVariants}
                custom={index}
              >
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#082052] text-[#F8F0E5] transition-colors duration-200 md:group-hover:bg-[#f8f0e5] md:group-hover:text-[#082052] ring-1 ring-[#082052]/20 md:group-hover:ring-[#082052]/40">
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <p
                  className="text-sm md:text-base font-medium leading-snug text-[#082052]"
                  style={{ fontFamily: "'Libre Bodoni', serif" }}
                >
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
