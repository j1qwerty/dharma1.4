import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue } from "motion/react";

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
export function ParallaxImage({ src, alt = "", className = "", strength = 22, scale = 1.07, fallback = "/images/placeholder.svg" }) {
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
        onError={(e) => {
          if (e.currentTarget.src !== window.location.origin + fallback) {
            e.currentTarget.src = fallback;
          }
        }}
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

/* 3D pointer-tracking tilt for premium image cards. Uses motion values so
 * the React tree never re-renders on pointer move. Reduced-motion = off. */
export function TiltCard({ children, className = "", max = 8 }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useTransform(rx, [-0.5, 0.5], [max, -max]);
  const sy = useTransform(ry, [-0.5, 0.5], [-max, max]);
  function onMove(e) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rx.set((e.clientY - r.top) / r.height - 0.5);
    ry.set((e.clientX - r.left) / r.width - 0.5);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: reduce ? 0 : sx,
        rotateY: reduce ? 0 : sy,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
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
