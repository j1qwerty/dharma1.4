import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/* Animated wrapper: slowly rotates an SVG decor piece on scroll. Respects reduced-motion. */
export function SpinDecor({ children, className = "", speed = 1, reverse = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * speed * (reverse ? -1 : 1)]);
  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {reduce ? (
        <>{children}</>
      ) : (
        <motion.span style={{ rotate, display: "inline-block" }}>{children}</motion.span>
      )}
    </span>
  );
}

export default SpinDecor;
