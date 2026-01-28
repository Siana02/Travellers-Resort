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
    <section className="w-full bg-[#f8f0e5] px-6 py-10 md:py-12">
      <MotionDiv
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-6xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 lg:gap-6 place-items-center">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <MotionDiv
                key={feature.label}
                className="group flex flex-col items-center text-center gap-3 md:gap-4 p-3 md:p-4 transition-transform duration-200 md:hover:scale-[1.03]"
                variants={itemVariants}
                custom={index}
              >
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#082052] text-[#F8F0E5] transition-colors duration-200 md:group-hover:bg-[#f8f0e5] md:group-hover:text-[#082052]">
                  <Icon size={24} strokeWidth={1.8} />
                </div>
                <p className="text-sm md:text-base font-medium leading-tight text-[#082052]">
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
