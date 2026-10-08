import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "./LanguageToggle";

const SLIDES = [
  {
    src: "/puja/navaratri/chandi-path.jpeg",
    alt: "Durga idol adorned for Chandi Path during Navratri",
    caption: "Chandi Path: the complete invocation",
    captionHi: "चंदी पाठ: पूर्ण आवाहन",
  },
  {
    src: "/puja/navaratri/devi-kavach.jpeg",
    alt: "Devi murti wrapped in marigold for Devi Kavach recitation",
    caption: "Devi Kavach: the Mother's protection",
    captionHi: "देवी कवच: माँ की सुरक्षा",
  },
  {
    src: "/puja/navaratri/ashttottara-shatanama-stotra.jpeg",
    alt: "Flowers and diya before the 108 names recitation",
    caption: "Ashtottara Shatanama: 108 names",
    captionHi: "अष्टोत्तर शतनाम: 108 नाम",
  },
  {
    src: "/puja/navaratri/siddha-kunjika-stotra.jpeg",
    alt: "Evening aarti lamps during Siddha Kunjika recitation",
    caption: "Siddha Kunjika: a concentrated invocation",
    captionHi: "सिद्ध कुंजिका: एकाग्र आवाहन",
  },
  {
    src: "/puja/navaratri/why-vadacharya-perform-navaratri-pooja.jpeg",
    alt: "Vedacharya performing Navratri puja with traditional vidhi",
    caption: "Performed by a Vedacharya, with your sankalpa",
    captionHi: "आपके संकल्प के साथ, वेदाचार्य द्वारा संपन्न",
  },
];

/* Full-width showcase slider: one large image on top, five small
 * previews below. Auto-advances every 2 seconds, pauses on hover or
 * focus, and stays manual under prefers-reduced-motion. */
export default function NavratriImageSlider() {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setActive((v) => (v + 1) % SLIDES.length), 2000);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const current = SLIDES[active];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={hi ? "नवरात्रि चित्र" : "Navratri images"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-black">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            referrerPolicy="no-referrer"
            className="absolute inset-0 h-full w-full object-cover"
            initial={reduce ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>
      <p className="mt-3 text-sm font-semibold" aria-live="polite">
        {hi ? current.captionHi : current.caption}
      </p>
      <div className="mt-3 grid grid-cols-5 gap-2 sm:gap-3">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={hi ? s.captionHi : s.caption}
            aria-current={active === i}
            className={`overflow-hidden rounded-xl transition-all duration-300 ${
              active === i
                ? "ring-2 ring-gold-400 ring-offset-2 ring-offset-transparent"
                : "opacity-60 hover:opacity-100"
            }`}
          >
            <img
              src={s.src}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover aspect-video"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
