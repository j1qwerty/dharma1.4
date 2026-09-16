import React from "react";

let _medId = 0;

/**
 * SacredMedallion — "Celestial Bindu". A bold redesign of the sacred coin:
 * a blazing gold medallion with a twin flame-ray halo, rope-twist rim,
 * gem-studded orbit ring, twin lotus petal rings, a Sri-Yantra heart and a
 * radiant bindu core. Pass `spin` to let the cosmos slowly turn.
 *
 * Props:
 *   size      — pixel size of the medallion           (default 120)
 *   glow      — soft outer aura                       (default true)
 *   rays      — flame-ray halo behind the disc        (default true)
 *   spin      — animate rings/petals/rays             (default false)
 *   spinSpeed — multiplier on the animation speeds    (default 1)
 */
export function SacredMedallion({
  size = 120,
  className = "",
  glow = true,
  rays = true,
  spin = false,
  spinSpeed = 1,
}) {
  const uid = React.useId ? React.useId().replace(/:/g, "") : `m${++_medId}`;
  const gFace  = `mf-${uid}`;
  const gEdge  = `me-${uid}`;
  const gRope  = `mr-${uid}`;
  const gFlame = `mfl-${uid}`;
  const gCore  = `mc-${uid}`;
  const gInner = `mi-${uid}`;
  const gSheen = `ms-${uid}`;

  const rot = (dur, rev = false) =>
    spin
      ? {
          animation: `${rev ? `med-rr-${uid}` : `med-rf-${uid}`} ${(dur / spinSpeed).toFixed(2)}s linear infinite`,
          transformOrigin: "60px 60px",
          transformBox: "view-box",
        }
      : undefined;

  const pt = (r, deg) => {
    const a = (deg * Math.PI) / 180;
    return [60 + r * Math.cos(a), 60 + r * Math.sin(a)];
  };

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
            inset: "-32%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,214,110,0.55) 0%, rgba(255,190,80,0.22) 45%, transparent 72%)",
            filter: "blur(4px)",
          }}
        />
      )}

      <svg
        viewBox="0 0 120 120"
        fill="none"
        style={{ position: "relative", width: "100%", height: "100%", display: "block" }}
      >
        <style>{`
          @keyframes med-rf-${uid} { to { transform: rotate(360deg); } }
          @keyframes med-rr-${uid} { to { transform: rotate(-360deg); } }
        `}</style>

        <defs>
          <radialGradient id={gFace} cx="36%" cy="30%" r="85%">
            <stop offset="0%"  stopColor="#fffbe9" />
            <stop offset="28%" stopColor="#ffe494" />
            <stop offset="52%" stopColor="#f2b32c" />
            <stop offset="76%" stopColor="#c07f14" />
            <stop offset="100%" stopColor="#6a4007" />
          </radialGradient>
          <radialGradient id={gEdge} cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="rgba(80,48,6,0)" />
            <stop offset="88%" stopColor="rgba(80,48,6,0.5)" />
            <stop offset="100%" stopColor="rgba(28,17,2,0.95)" />
          </radialGradient>
          <linearGradient id={gRope} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#fff7d2" />
            <stop offset="45%" stopColor="#e9b73a" />
            <stop offset="78%" stopColor="#8a5a0c" />
            <stop offset="100%" stopColor="#3f2704" />
          </linearGradient>
          <linearGradient id={gFlame} gradientUnits="userSpaceOnUse" x1="60" y1="3" x2="60" y2="17">
            <stop offset="0%"  stopColor="#fff8d2" />
            <stop offset="60%" stopColor="#ffd45e" />
            <stop offset="100%" stopColor="#dd9410" />
          </linearGradient>
          <radialGradient id={gCore} cx="38%" cy="34%" r="75%">
            <stop offset="0%"  stopColor="#ffffff" />
            <stop offset="30%" stopColor="#fff3bd" />
            <stop offset="65%" stopColor="#ffd054" />
            <stop offset="100%" stopColor="#dd9410" />
          </radialGradient>
          <radialGradient id={gInner} cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="rgba(255,244,190,0.4)" />
            <stop offset="100%" stopColor="rgba(255,244,190,0)" />
          </radialGradient>
          <linearGradient id={gSheen} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="rgba(255,255,255,0.65)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>

        {/* ——— twin flame-ray halo ——— */}
        {rays && (
          <g style={rot(46)}>
            {Array.from({ length: 24 }).map((_, i) => (
              <path
                key={`fl${i}`}
                d="M60 3 C63 7.5 63.6 12 60 16.5 C56.4 12 57 7.5 60 3 Z"
                transform={`rotate(${i * 15} 60 60)`}
                fill={`url(#${gFlame})`}
                stroke="rgba(140,88,10,0.45)"
                strokeWidth="0.4"
              />
            ))}
            {Array.from({ length: 24 }).map((_, i) => (
              <path
                key={`sp${i}`}
                d="M60 6 C61.5 9 61.7 11.5 60 14 C58.3 11.5 58.5 9 60 6 Z"
                transform={`rotate(${i * 15 + 7.5} 60 60)`}
                fill="#ffe9a6"
                opacity="0.85"
              />
            ))}
          </g>
        )}

        {/* ——— the disc ——— */}
        <circle cx="60" cy="60" r="50" fill={`url(#${gFace})`} />
        <circle cx="60" cy="60" r="50" fill={`url(#${gEdge})`} />

        {/* ——— rope-twist rim + gem-studded orbit ——— */}
        <g style={rot(70, true)}>
          {Array.from({ length: 30 }).map((_, i) => {
            const [x1, y1] = pt(47, (i / 30) * 360);
            const [x2, y2] = pt(47, ((i + 0.5) / 30) * 360);
            return (
              <path
                key={`rp${i}`}
                d={`M${x1} ${y1} A47 47 0 0 1 ${x2} ${y2}`}
                stroke={`url(#${gRope})`}
                strokeWidth="3"
                strokeLinecap="round"
                opacity={i % 2 === 0 ? 0.9 : 0.5}
              />
            );
          })}
          {Array.from({ length: 36 }).map((_, i) => {
            const a = (i / 36) * 360;
            const [x, y] = pt(41.5, a);
            return i % 3 === 0 ? (
              <path
                key={`gm${i}`}
                d={`M${x} ${y - 1.6} L${x + 1.3} ${y} L${x} ${y + 1.6} L${x - 1.3} ${y} Z`}
                fill="#5f3b07"
                stroke="#ffeaae"
                strokeWidth="0.35"
              />
            ) : (
              <circle key={`bd${i}`} cx={x} cy={y} r="0.95" fill="#6e460b" />
            );
          })}
        </g>

        {/* ——— orbit separators ——— */}
        <circle cx="60" cy="60" r="38.8" stroke="rgba(96,60,6,0.55)" strokeWidth="0.7" strokeDasharray="1.6 3.2" />
        <circle cx="60" cy="60" r="36.4" fill={`url(#${gInner})`} />
        <circle cx="60" cy="60" r="36.4" stroke="rgba(96,60,6,0.4)" strokeWidth="0.6" />

        {/* ——— twin lotus rings ——— */}
        <g style={rot(90)}>
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`p${i}`}
              d="M60 22.5 C64 27.5 64.6 32.5 60 37.5 C55.4 32.5 56 27.5 60 22.5 Z"
              transform={`rotate(${i * 22.5} 60 60)`}
              stroke="rgba(110,70,8,0.6)"
              strokeWidth="0.8"
              fill="rgba(255,236,150,0.16)"
            />
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <path
              key={`ip${i}`}
              d="M60 29 C62.7 32.3 63.1 35 60 38.2 C56.9 35 57.3 32.3 60 29 Z"
              transform={`rotate(${i * 22.5 + 11.25} 60 60)`}
              stroke="rgba(110,70,8,0.5)"
              strokeWidth="0.7"
              fill="rgba(255,236,150,0.1)"
            />
          ))}
        </g>

        {/* ——— Sri-Yantra heart ——— */}
        <circle cx="60" cy="60" r="20.5" stroke="rgba(96,60,6,0.4)" strokeWidth="0.6" strokeDasharray="2.5 2.5" />
        <path d="M60 43 L74.72 68.5 L45.28 68.5 Z" stroke="rgba(88,54,6,0.85)" strokeWidth="0.9" />
        <path d="M60 77 L45.28 51.5 L74.72 51.5 Z" stroke="rgba(88,54,6,0.85)" strokeWidth="0.9" />
        {[[60, 43], [74.72, 68.5], [45.28, 68.5], [60, 77], [45.28, 51.5], [74.72, 51.5]].map(([x, y], i) => (
          <circle key={`vx${i}`} cx={x} cy={y} r="1.05" fill="rgba(88,54,6,0.9)" />
        ))}

        {/* ——— bindu core ——— */}
        <circle cx="60" cy="60" r="10.5" fill={`url(#${gCore})`} stroke="rgba(120,75,8,0.6)" strokeWidth="1" />
        <circle cx="60" cy="60" r="7.6" stroke="rgba(255,252,235,0.65)" strokeWidth="0.7" />
        <circle cx="56.8" cy="56.2" r="1.7" fill="#ffffff" opacity="0.9" />
        <path d="M64 51.8 L64.7 53.9 L66.8 54.6 L64.7 55.3 L64 57.4 L63.3 55.3 L61.2 54.6 L63.3 53.9 Z" fill="#ffffff" opacity="0.95" />
        <path d="M56 62.4 L56.4 63.8 L57.8 64.2 L56.4 64.6 L56 66 L55.6 64.6 L54.2 64.2 L55.6 63.8 Z" fill="#ffffff" opacity="0.55" />

        {/* ——— sheen ——— */}
        <ellipse cx="51.5" cy="37.5" rx="27" ry="13.5" fill={`url(#${gSheen})`} opacity="0.75" />
      </svg>
    </span>
  );
}

export default SacredMedallion;