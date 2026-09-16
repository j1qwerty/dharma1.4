import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Sparkle, CalendarBlank, FlowerLotus } from "@phosphor-icons/react";
import { festivals } from "../../lib/data";
import { festivalDate } from "../../lib/dates";

/* ------------------------------------------------------------------ *
 * FestivalCountdown - a refined live countdown to the next festival.
 * Uses the handpicked display + timer fonts (Cormorant Garamond +
 * Marcellus) for a devotional, manuscript feel. Reduced-motion safe.
 * Dates come from data.js festivals via lib/dates (single source).
 * ------------------------------------------------------------------ */

function getNextFestival(now) {
  const candidates = festivals
    .map((f) => ({ name: f.name, note: f.note, date: festivalDate(f, now) }))
    .filter((f) => f.date);
  return candidates.sort((a, b) => a.date.getTime() - b.date.getTime())[0] || null;
}

function splitDuration(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function FestivalCountdown() {
  const reduce = useReducedMotion();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [reduce]);

  const next = getNextFestival(new Date(now));
  if (!next) return null;
  const remaining = splitDuration(next.date.getTime() - now);
  const units = [
    { label: "Days", value: remaining.days },
    { label: "Hours", value: remaining.hours },
    { label: "Minutes", value: remaining.minutes },
    { label: "Seconds", value: remaining.seconds },
  ];

  return (
    <div className="festival-countdown-dt fc-v2-dt">
      <div className="fc-frame-dt" aria-hidden="true">
        <span className="fc-frame-line-dt fc-fl-l-dt" />
        <span className="fc-frame-line-dt fc-fl-r-dt" />
        <FlowerLotus size={16} className="fc-frame-lotus-dt" />
      </div>

      <div className="fc-head-dt">
        <span className="fc-eyebrow-dt">
          <Sparkle size={13} weight="fill" /> Next sacred window
        </span>
        <span className="fc-date-dt">
          <CalendarBlank size={13} />
          {next.date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
      <h3 className="fc-name-dt">{next.name}</h3>
      <p className="fc-note-dt">{next.note}</p>

      <div className="fc-grid-dt fc-grid-v2-dt">
        {units.map((u, i) => (
          <div className="fc-unit-dt fc-unit-v2-dt" key={u.label}>
            <div className="fc-value-dt fc-value-v2-dt">
              {reduce ? (
                pad(u.value)
              ) : (
                <motion.span
                  key={u.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                >
                  {pad(u.value)}
                </motion.span>
              )}
            </div>
            <div className="fc-label-dt">{u.label}</div>
            {i < units.length - 1 && (
              <span className="fc-sep-dt" aria-hidden="true">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
