import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "./LanguageToggle";

/* ------------------------------------------------------------------ *
 * AcharyaCard - a single acharya profile card. Reused by the Acharyas
 * page grid and the home preview slider. Compact media + name on the
 * photo, structured rows + bio in the body.
 * ------------------------------------------------------------------ */
export default function AcharyaCard({ a, compact = false }) {
  const { lang, t } = useLanguage();
  const tradition = lang === "hi" && a.traditionHi ? a.traditionHi : a.tradition;
  const place = lang === "hi" && a.placeHi ? a.placeHi : a.place;
  const expertise = lang === "hi" && a.expertiseHi ? a.expertiseHi : a.expertise;
  const lineage = lang === "hi" && a.lineageHi ? a.lineageHi : a.lineage;
  const experience = lang === "hi" && a.experienceHi ? a.experienceHi : a.experience;
  const bio = lang === "hi" && a.bioHi ? a.bioHi : a.bio;
  return (
    <div className="acharya-card-dt">
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
              >
                {a.phone}
              </a>
            </span>
          </div>
        )}
        {!compact && <p className="acharya-card-bio-dt">{bio}</p>}
      </div>
    </div>
  );
}
