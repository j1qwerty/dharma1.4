import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "./Motion";
import { useLanguage } from "./LanguageToggle";
import AcharyaCard from "./AcharyaCard";

/* ------------------------------------------------------------------ *
 * Home-only acharya presentation: principal spotlight (big) + the rest
 * as a shuffled, low-detail gallery strip. Reshuffles on each mount
 * (i.e. every refresh / fresh visit), principal always first.
 * ------------------------------------------------------------------ */

export function AcharyaSpotlight({ principal }) {
  const { lang } = useLanguage();
  if (!principal) return null;
  const tradition =
    lang === "hi" && principal.traditionHi ? principal.traditionHi : principal.tradition;
  const bio = lang === "hi" && principal.bioHi ? principal.bioHi : principal.bio;
  return (
    <Reveal>
      <div className="acharya-spotlight-dt">
        <div className="acharya-spotlight-media-dt">
          <img
            src={principal.image}
            alt={principal.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder.svg";
            }}
          />
          <div className="principal-badge-dt">
            <span className="principal-badge-star-dt" aria-hidden="true">
              ✦
            </span>
            {lang === "hi" ? "प्रमुख वेदाचार्य" : "Principal Vedacharya"}
          </div>
        </div>
        <div className="acharya-spotlight-copy-dt">
          <div className="eyebrow eyebrow-line-dt">
            {lang === "hi" ? "हमारे प्रमुख आचार्य" : "Our principal acharya"}
          </div>
          <h3 className="display-dt mt-3 text-4xl sm:text-5xl">{principal.name}</h3>
          {tradition && <div className="mt-2 text-xs font-bold uppercase tracking-[.14em] text-gold-600">{tradition}</div>}
          <p className="mt-4 text-sm leading-7 muted-dt line-clamp-4">{bio}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn-gold-dt" to={`/acharyas/${principal.id}`}>
              {lang === "hi" ? "पूरा परिचय पढ़ें" : "Read full profile"} <ArrowRight size={14} />
            </Link>
            <Link className="btn-ghost-dt" to="/pujas">
              {lang === "hi" ? "पूजा बुक करें" : "Book a puja"} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function AcharyaStrip({ items }) {
  const { lang } = useLanguage();
  const trackRef = useRef(null);
  // Shuffle the non-principal acharyas on every fresh data load / visit.
  const rest = useMemo(() => {
    const list = (items || []).filter((a) => !a.principal);
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [items]);
  const interactedAt = useRef(0);
  // Auto-slide on mobile only: advance one card every second, looping.
  // Pauses while the user is interacting and for reduced-motion users.
  // (Hooks stay above the early return so hook order never changes.)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      if (!window.matchMedia?.("(max-width: 639px)").matches) return;
      if (Date.now() - interactedAt.current < 3000) return;
      if (document.hidden) return;
      const max = el.scrollWidth - el.clientWidth - 8;
      if (el.scrollLeft >= max) el.scrollTo({ left: 0, behavior: "smooth" });
      else el.scrollBy({ left: 220, behavior: "smooth" });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const markInteracted = () => {
    interactedAt.current = Date.now();
  };
  if (!rest.length) return null;
  const nudge = (dir) => {
    markInteracted();
    trackRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };
  return (
    <>
      <div className="acharya-strip-nav-dt">
        <span className="acharya-strip-hint-dt">
          {lang === "hi" ? "स्वाइप करें" : "Swipe"}
        </span>
        <button
          type="button"
          onClick={() => nudge(-1)}
          className="acharya-strip-arrow-dt"
          aria-label={lang === "hi" ? "पीछे" : "Previous"}
        >
          <ArrowLeft size={16} weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          className="acharya-strip-arrow-dt"
          aria-label={lang === "hi" ? "आगे" : "Next"}
        >
          <ArrowRight size={16} weight="bold" />
        </button>
      </div>
      <div
        className="acharya-strip-dt"
        ref={trackRef}
        onTouchStart={markInteracted}
        onMouseDown={markInteracted}
      >
        {rest.map((a, i) => (
          <Reveal key={a.id} delay={Math.min(i, 5) * 0.04} className="acharya-strip-item-dt">
            <AcharyaCard a={a} clampBio />
          </Reveal>
        ))}
      </div>
    </>
  );
}
