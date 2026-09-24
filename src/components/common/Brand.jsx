import React from "react";

export default function Brand({ dark = false }) {
  return (
    <span className="brand-dt">
      <span className="brand-mark-dt brand-mark-img-dt">
        <img src="/logo-dharmatribe.jpeg" alt="Dharmaa Tribe logo" />
      </span>
      <span className={`brand-word-dt ${dark ? "text-white" : ""}`}>
        Dharma<span className="text-gold-500">Tribe</span>
      </span>
    </span>
  );
}
