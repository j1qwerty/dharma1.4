import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";

/* ------------------------------------------------------------------ *
 * AcharyaCard - a single acharya profile card. Same card on home and
 * /acharyas. Whole card navigates to /acharyas/:id (dedicated detail
 * page); Read more link does the same. Name sits over the photo on a
 * translucent gradient.
 * ------------------------------------------------------------------ */
export default function AcharyaCard({ a, compact = false, clampBio = false }) {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const go = () => navigate(`/acharyas/${a.id}`);
  const tradition = lang === "hi" && a.traditionHi ? a.traditionHi : a.tradition;
  const place = lang === "hi" && a.placeHi ? a.placeHi : a.place;
  const expertise = lang === "hi" && a.expertiseHi ? a.expertiseHi : a.expertise;
  const lineage = lang === "hi" && a.lineageHi ? a.lineageHi : a.lineage;
  const experience = lang === "hi" && a.experienceHi ? a.experienceHi : a.experience;
  const bio = lang === "hi" && a.bioHi ? a.bioHi : a.bio;
  const principal = Boolean(a.principal);
  return (
    <div
      className={`acharya-card-dt${principal ? " principal" : ""}`}
      role="link"
      tabIndex={0}
      aria-label={a.name}
      style={{ cursor: "pointer" }}
      onClick={go}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          go();
        }
      }}
    >
      <div className="acharya-card-media-dt">
        <img
          src={a.image}
          alt={a.name}
          loading="lazy"
          onError={(e) => {
            // Graceful fallback if the local profile image isn't present.
            e.currentTarget.src = "/images/placeholder.svg";
          }}
        />
        {principal && (
          <div className="principal-badge-dt">
            <span className="principal-badge-star-dt" aria-hidden="true">
              ✦
            </span>
            {lang === "hi" ? "प्रमुख वेदाचार्य" : "Principal Vedacharya"}
          </div>
        )}
        <div className="acharya-card-name-dt">{a.name}</div>
      </div>
      <div className="acharya-card-body-dt">
        {tradition && <span className="acharya-card-tag-dt">{tradition}</span>}
        <div className="acharya-card-row-dt">
          <span className="ar-label-dt">{t("ach.cardPlace")}</span>
          <span className="ar-value-dt">{place}</span>
        </div>
        <div className="acharya-card-row-dt">
          <span className="ar-label-dt">{t("ach.cardExpertise")}</span>
          <span className="ar-value-dt">{expertise}</span>
        </div>
        <div className="acharya-card-row-dt">
          <span className="ar-label-dt">{t("ach.cardLineage")}</span>
          <span className="ar-value-dt">{lineage}</span>
        </div>
        <div className="acharya-card-row-dt">
          <span className="ar-label-dt">{t("ach.cardExperience")}</span>
          <span className="ar-value-dt">{experience}</span>
        </div>
        {a.phone && !compact && (
          <div className="acharya-card-row-dt">
            <span className="ar-label-dt">{t("ach.cardContact")}</span>
            <span className="ar-value-dt">
              <a
                href={`tel:${a.phone.replace(/\s+/g, "")}`}
                className="text-gold-600 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {a.phone}
              </a>
            </span>
          </div>
        )}
        {!compact && <p className={`acharya-card-bio-dt${clampBio ? " clamp-4" : ""}`}>{bio}</p>}
        <Link
          to={`/acharyas/${a.id}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-600 hover:underline"
        >
          {lang === "hi" ? "और पढ़ें" : "Read more"} <ArrowUpRight size={13} />
        </Link>
      </div>
    </div>
  );
}
