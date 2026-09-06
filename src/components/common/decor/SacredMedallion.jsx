import React from "react";

let _medId = 0;

/* SacredMedallion — the redesigned hero "coin". A stunning layered
 * gold disc: outer rope-twist rim, beaded inner rim, sunburst rays,
 * an 8-petal engraved lotus with a second 8-petal ring rotated 22.5°,
 * an Om sigil in the centre, a top sheen and a soft outer glow. */
export function SacredMedallion({ size = 120, className = "", glow = true, rays = true }) {
  const uid = React.useId ? React.useId().replace(/:/g, "") : `m${++_medId}`;
  const gFace = `mf-${uid}`;
  const gRim = `mr-${uid}`;
  const gRope = `mrp-${uid}`;
  const gSheen = `ms-${uid}`;
  const gInner = `mi-${uid}`;
  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-block", width: size, height: size }}
      aria-hidden="true"
    >
      {glow && (
        <span
          style={{
            position: "absolute",
            inset: "-26%",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(247,207,91,0.46) 0%, rgba(247,207,91,0.18) 42%, transparent 70%)",
            filter: "blur(3px)",
          }}
        />
      )}
      <svg viewBox="0 0 120 120" fill="none" style={{ position: "relative", width: "100%", height: "100%" }}>
        <defs>
          <radialGradient id={gFace} cx="38%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#fff6d6" />
            <stop offset="34%" stopColor="#f4d378" />
            <stop offset="68%" stopColor="#e0a92a" />
            <stop offset="100%" stopColor="#9c6a13" />
          </radialGradient>
          <radialGradient id={gRim} cx="50%" cy="50%" r="50%">
            <stop offset="82%" stopColor="rgba(255,243,194,0)" />
            <stop offset="90%" stopColor="rgba(120,78,8,0.5)" />
            <stop offset="100%" stopColor="rgba(60,38,4,0.9)" />
          </radialGradient>
          <linearGradient id={gRope} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff0c0" />
            <stop offset="50%" stopColor="#c89212" />
            <stop offset="100%" stopColor="#7a5210" />
          </linearGradient>
          <linearGradient id={gSheen} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="44%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <radialGradient id={gInner} cx="50%" cy="42%" r="60%">
            <stop offset="0%" stopColor="rgba(255,240,180,0.35)" />
            <stop offset="100%" stopColor="rgba(180,120,20,0.05)" />
          </radialGradient>
        </defs>

        {rays &&
          Array.from({ length: 32 }).map((_, i) => {
            const a = (i / 32) * Math.PI * 2;
            const r1 = 49;
            const r2 = 56;
            return (
              <line
                key={`r${i}`}
                x1={60 + Math.cos(a) * r1}
                y1={60 + Math.sin(a) * r1}
                x2={60 + Math.cos(a) * r2}
                y2={60 + Math.sin(a) * r2}
                stroke="rgba(110,72,10,0.45)"
                strokeWidth="0.5"
              />
            );
          })}

        <circle cx="60" cy="60" r="50" fill={`url(#${gFace})`} />
        <circle cx="60" cy="60" r="50" fill={`url(#${gRim})`} />

        {Array.from({ length: 28 }).map((_, i) => {
          const a = (i / 28) * Math.PI * 2;
          const a2 = ((i + 0.5) / 28) * Math.PI * 2;
          return (
            <path
              key={`rp${i}`}
              d={`M${60 + Math.cos(a) * 47.5} ${60 + Math.sin(a) * 47.5} A47.5 47.5 0 0 1 ${60 + Math.cos(a2) * 47.5} ${60 + Math.sin(a2) * 47.5}`}
              stroke={`url(#${gRope})`}
              strokeWidth="2.6"
              strokeLinecap="round"
              opacity={i % 2 === 0 ? 0.85 : 0.5}
            />
          );
        })}

        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          return <circle key={`b${i}`} cx={60 + Math.cos(a) * 41} cy={60 + Math.sin(a) * 41} r="0.7" fill="rgba(110,72,10,0.55)" />;
        })}
        <circle cx="60" cy="60" r="38" stroke="rgba(110,72,10,0.5)" strokeWidth="0.7" fill="none" />
        <circle cx="60" cy="60" r="37" fill={`url(#${gInner})`} />

        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * 360;
          return (
            <path
              key={`p${i}`}
              d="M60 28 C65 18 65 6 60 -2 C55 6 55 18 60 28 Z"
              stroke="rgba(110,72,10,0.62)"
              strokeWidth="0.9"
              fill="rgba(255,240,180,0.1)"
              transform={`rotate(${a} 60 60)`}
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * 360 + 22.5;
          return (
            <path
              key={`ip${i}`}
              d="M60 38 C63 31 63 23 60 17 C57 23 57 31 60 38 Z"
              stroke="rgba(110,72,10,0.55)"
              strokeWidth="0.75"
              fill="rgba(255,240,180,0.08)"
              transform={`rotate(${a} 60 60)`}
            />
          );
        })}

        <circle cx="60" cy="60" r="11" fill="rgba(120,80,12,0.16)" stroke="rgba(110,72,10,0.6)" strokeWidth="0.9" />
        <g transform="translate(60 60)" stroke="rgba(80,52,6,0.7)" strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M-5 -3 C-8 -3 -8 1 -5 1 C-2 1 -2 -3 -5 -3" transform="scale(0.62)" />
          <circle cx="0" cy="0" r="1.4" fill="rgba(80,52,6,0.7)" stroke="none" />
        </g>

        <ellipse cx="52" cy="40" rx="26" ry="14" fill={`url(#${gSheen})`} opacity="0.7" />
      </svg>
    </span>
  );
}

export default SacredMedallion;
