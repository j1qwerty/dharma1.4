import React from "react";

export default function Brand({ dark = false, large = false, wordmark = false }) {
  return (
    <span className={`brand-dt${large ? " brand-dt-large" : ""}`}>
      <img
        src="/logo-dharmatribe.jpeg"
        alt="Dharmaa Tribe — Rooted in wisdom. Relevant for life. Together we rise."
        className="brand-logo-full-dt"
      />
      {wordmark && (
        <span className={`brand-word-dt ${dark ? "text-white" : ""}`}>
          Dharma<span className="text-gold-500">Tribe</span>
        </span>
      )}
    </span>
  );
}
