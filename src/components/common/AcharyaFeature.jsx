import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "./Motion";
import { useLanguage } from "./LanguageToggle";

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
            <Link className="btn-gold-dt" to="/acharyas">
              {lang === "hi" ? "परिचय पढ़ें" : "Read full profile"} <ArrowRight size={14} />
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
  // Shuffle the non-principal acharyas on every fresh data load / visit.
  const rest = useMemo(() => {
    const list = (items || []).filter((a) => !a.principal);
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }, [items]);
  if (!rest.length) return null;
  return (
    <div className="acharya-strip-dt">
      {rest.map((a, i) => {
        const tradition = lang === "hi" && a.traditionHi ? a.traditionHi : a.tradition;
        const place = lang === "hi" && a.placeHi ? a.placeHi : a.place;
        const expertise = lang === "hi" && a.expertiseHi ? a.expertiseHi : a.expertise;
        const lineage = lang === "hi" && a.lineageHi ? a.lineageHi : a.lineage;
        return (
          <Reveal key={a.id} delay={Math.min(i, 5) * 0.04} className="acharya-strip-item-dt">
            <Link to="/acharyas" className="acharya-mini-dt">
              <span className="acharya-mini-media-dt">
                <img
                  src={a.image}
                  alt={a.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.svg";
                  }}
                />
              </span>
              <span className="acharya-mini-name-dt">{a.name}</span>
              {tradition && <span className="acharya-mini-trad-dt">{tradition}</span>}
              <span className="acharya-mini-rows-dt">
                {place && (
                  <span className="acharya-mini-row-dt">
                    <span className="mini-k-dt">{lang === "hi" ? "स्थान" : "Place"}</span>
                    <span className="mini-v-dt">{place}</span>
                  </span>
                )}
                {expertise && (
                  <span className="acharya-mini-row-dt">
                    <span className="mini-k-dt">{lang === "hi" ? "विशेषज्ञता" : "Expertise"}</span>
                    <span className="mini-v-dt">{expertise}</span>
                  </span>
                )}
                {lineage && (
                  <span className="acharya-mini-row-dt">
                    <span className="mini-k-dt">{lang === "hi" ? "परंपरा" : "Lineage"}</span>
                    <span className="mini-v-dt">{lineage}</span>
                  </span>
                )}
              </span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
