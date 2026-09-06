import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function Reveal({ children, className = "", delay = 0, amount = 0.18, y = 30, scale = 1 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, scale: 0.985 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, scale }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
export function ParallaxImage({ src, alt = "", className = "", strength = 22, scale = 1.07 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={reduce ? {} : { y, scale }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
export function Magnetic({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gold-400"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
