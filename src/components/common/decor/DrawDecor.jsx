import { motion, useReducedMotion } from "motion/react";

/* Draw-on reveal for stroke SVGs: animates the path length. */
export function DrawDecor({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.span>
  );
}

export default DrawDecor;
