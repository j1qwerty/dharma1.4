import React from "react";
import { SacredMedallion } from "./Decor";

/* ------------------------------------------------------------------ *
 * SectionCurve - the reusable "rounded side-corner" device used on
 * exactly ONE hero/section per secondary page. Echoes the home hero
 * curve without copying it. `edge` controls top vs bottom; mini
 * medallions sit on the two side corners for the sacred feel.
 * ------------------------------------------------------------------ */
export default function SectionCurve({
  edge = "bottom",
  coins = true,
  drop = true,
  flip = false,
}) {
  const cls = edge === "bottom" ? "curve-wrap-bottom-dt" : "curve-wrap-top-dt";
  return (
    <div className={cls} aria-hidden="true">
      <div className="curve-svg-dt">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          style={flip ? { transform: "scaleX(-1)" } : undefined}
        >
          <path d="M0,120 L0,18 C170,18 260,58 360,92 C460,124 620,128 720,128 C820,128 980,124 1080,92 C1180,58 1270,18 1440,18 L1440,120 Z" />
        </svg>
      </div>
      {drop && <span className="curve-drop-dt" />}
      {coins && (
        <>
          <span className="curve-coin-mini-dt left">
            <span className="medallion-wrap">
              <SacredMedallion size={46} />
            </span>
          </span>
          <span className="curve-coin-mini-dt right">
            <span className="medallion-wrap delay">
              <SacredMedallion size={46} />
            </span>
          </span>
        </>
      )}
    </div>
  );
}
