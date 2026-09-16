import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ *
 * FaqAccordion - replaces the static <details> list on PujaDetail with
 * an animated, single-open accordion. Accessible (aria-expanded,
 * aria-controls), reduced-motion safe, keyboard friendly.
 * ------------------------------------------------------------------ */
export default function FaqAccordion({ items = [] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-3 md:grid-cols-2 items-start">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            className={`faq-item-dt ${isOpen ? "is-open md:col-span-2" : ""}`}
            key={it.q}
          >
            <button
              className="faq-q-dt"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
            >
              <span>{it.q}</span>
              <span className="faq-q-icon-dt">
                <Plus size={14} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-[22px] pb-5 pt-0 text-xs leading-6 muted-dt">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
