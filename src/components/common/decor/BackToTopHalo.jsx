import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from "motion/react";

/* BackToTopHalo — sacred button halo for the floating scroll-to-top.
 * Slightly larger than the 44px button (default 68px) with a soft
 * outer glow. The mandala ring spins with page scroll exactly like
 * <SpinDecor> (scrollYProgress → rotate), respects reduced-motion. */
export function BackToTopHalo({ size = 68, className = "", speed = 0.7, idleMs = 480 }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * speed]);

  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef(null);

  useMotionValueEvent(scrollYProgress, "change", () => {
    if (reduce) return;
    setScrolling(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setScrolling(false), idleMs);
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const visible = reduce ? true : scrolling;

  const geometry = useMemo(() => {
    const beads = Array.from({ length: 28 }).map((_, i) => {
      const a = (i / 28) * Math.PI * 2;
      return { cx: 50 + Math.cos(a) * 41, cy: 50 + Math.sin(a) * 41 };
    });
    const ticks = Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * Math.PI * 2;
      return {
        x1: 50 + Math.cos(a) * 33,
        y1: 50 + Math.sin(a) * 33,
        x2: 50 + Math.cos(a) * 38,
        y2: 50 + Math.sin(a) * 38,
      };
    });
    const petals = Array.from({ length: 8 }).map((_, i) => ({
      transform: `rotate(${(i / 8) * 360} 50 50)`,
    }));
    return { beads, ticks, petals };
  }, []);

  return (
    <span
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" }}
    >
      <motion.span
        className={className}
        aria-hidden="true"
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.86 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--deep, #111827) 88%, var(--gold, #e7b631) 12%)",
            border: "1px solid rgba(231,182,49,0.35)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
          }}
        />
        <span
          style={{
            position: "absolute",
            inset: "-18%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247,207,91,0.42) 0%, rgba(247,207,91,0.16) 42%, transparent 72%)",
            filter: "blur(4px)",
            zIndex: -1,
          }}
        />
        <motion.span
          style={{ display: "grid", placeItems: "center", width: "100%", height: "100%", rotate: reduce ? 0 : rotate }}
        >
          <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
            <circle cx="50" cy="50" r="46" stroke="rgba(231,182,49,0.5)" strokeWidth="0.9" />
            <g fill="rgba(231,182,49,0.9)">
              {geometry.beads.map((bead, i) => (
                <circle key={i} cx={bead.cx} cy={bead.cy} r="0.9" />
              ))}
            </g>
            <g stroke="rgba(231,182,49,0.55)" strokeWidth="0.75" strokeLinecap="round">
              {geometry.ticks.map((tick, i) => (
                <line key={i} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} />
              ))}
            </g>
            <g stroke="rgba(231,182,49,0.45)" strokeWidth="0.7" fill="rgba(255,240,180,0.06)">
              {geometry.petals.map((petal, i) => (
                <path key={i} d="M50 29 C52.5 22 52.5 16 50 11 C47.5 16 47.5 22 50 29 Z" transform={petal.transform} />
              ))}
            </g>
            <circle cx="50" cy="50" r="22" stroke="rgba(231,182,49,0.22)" strokeWidth="0.6" />
          </svg>
        </motion.span>
      </motion.span>
    </span>
  );
}

export default BackToTopHalo;
