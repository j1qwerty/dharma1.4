import React from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ *
 * AcharyaCard - a single acharya profile card. Reused by the Acharyas
 * page grid and the home preview slider. Compact media + name on the
 * photo, structured rows + bio in the body.
 * ------------------------------------------------------------------ */
export default function AcharyaCard({ a }) {
  return (
    <div className="acharya-card-dt">
      <div className="acharya-card-media-dt">
        <img src={a.image} alt={a.name} loading="lazy" />
        <span className="acharya-card-badge-dt">{a.tradition}</span>
        <div className="acharya-card-name-dt">{a.name}</div>
      </div>
      <div className="acharya-card-body-dt">
        <div className="acharya-card-row-dt">
          <span className="ar-label-dt">Place</span>
          <span className="ar-value-dt">{a.place}</span>
        </div>
        <div className="acharya-card-row-dt">
          <span className="ar-label-dt">Expertise</span>
          <span className="ar-value-dt">{a.expertise}</span>
        </div>
        <div className="acharya-card-row-dt">
          <span className="ar-label-dt">Lineage</span>
          <span className="ar-value-dt">{a.lineage}</span>
        </div>
        <div className="acharya-card-row-dt">
          <span className="ar-label-dt">Experience</span>
          <span className="ar-value-dt">{a.experience}</span>
        </div>
        <p className="acharya-card-bio-dt">{a.bio}</p>
      </div>
    </div>
  );
}
