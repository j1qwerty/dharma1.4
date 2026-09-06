import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from "motion/react";

/* ------------------------------------------------------------------ *
 * DharmaTribe decorative SVG system.
 * Line-art botanical / sacred motifs rendered as low-opacity section
 * backgrounds. All purely decorative (aria-hidden by callers).
 * Stroke-only so they read as "transparent branches" over any bg.
 * ------------------------------------------------------------------ */

const stroke = "currentColor";

/* A peepal / bodhi leaf branch with three leaves. */
export function LeafBranch({ className = "", flip = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 360"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M110 358 C110 280 112 210 112 150 C112 110 110 70 108 36"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* main leaves */}
      <path
        d="M110 250 C70 240 40 210 30 168 C30 166 32 164 35 165 C74 176 104 206 112 246"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M112 250 C152 240 184 210 192 168 C192 166 190 164 187 165 C148 176 120 206 112 246"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M110 170 C78 162 54 138 46 102 C46 100 48 98 51 99 C82 108 106 132 112 166"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M112 170 C144 162 168 138 176 102 C176 100 174 98 171 99 C140 108 118 132 112 166"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M110 92 C90 86 76 70 72 50 C72 49 73 48 75 48 C92 52 106 66 110 88"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M112 92 C132 86 146 70 150 50 C150 49 149 48 147 48 C130 52 116 66 112 88"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* vein accents */}
      <path d="M112 240 C92 232 74 214 66 190" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
      <path d="M112 240 C132 232 150 214 158 190" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
      <path d="M112 162 C98 156 86 144 80 128" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
      <path d="M112 162 C126 156 138 144 144 128" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

/* A delicate lotus outline, stem rising. */
export function LotusLine({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 240 200" fill="none" aria-hidden="true">
      <path
        d="M120 192 C120 150 120 120 120 96"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M120 96 C86 92 52 70 30 40 C29 38 31 36 33 37 C66 48 98 70 120 96 Z"
        stroke={stroke}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M120 96 C154 92 188 70 210 40 C211 38 209 36 207 37 C174 48 142 70 120 96 Z"
        stroke={stroke}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M120 100 C104 96 92 80 84 60 C83 58 85 56 87 57 C102 62 114 78 120 98 Z"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M120 100 C136 96 148 80 156 60 C157 58 155 56 153 57 C138 62 126 78 120 98 Z"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M120 104 C112 102 106 94 102 84 C101 83 102 82 104 82 C112 84 118 92 120 102 Z"
        stroke={stroke}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M120 104 C128 102 134 94 138 84 C139 83 138 82 136 82 C128 84 122 92 120 102 Z"
        stroke={stroke}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* water line */}
      <path
        d="M40 188 C70 182 96 192 120 188 C144 184 168 192 200 186"
        stroke={stroke}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

/* Concentric mandala rings, the recurring DharmaTribe motif. */
export function MandalaRings({ className = "" }) {
  const rings = [92, 72, 52, 32];
  return (
    <svg className={className} viewBox="0 0 220 220" fill="none" aria-hidden="true">
      {rings.map((r, i) => (
        <circle
          key={r}
          cx="110"
          cy="110"
          r={r}
          stroke={stroke}
          strokeWidth={i === 0 ? 1.1 : 0.8}
          opacity={1 - i * 0.12}
        />
      ))}
      {/* petal ring */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 110 + Math.cos(a) * 52;
        const y1 = 110 + Math.sin(a) * 52;
        const x2 = 110 + Math.cos(a) * 72;
        const y2 = 110 + Math.sin(a) * 72;
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={stroke}
            strokeWidth="0.8"
            opacity="0.7"
          />
        );
      })}
      {/* inner lotus petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * 360;
        return (
          <path
            key={i}
            d="M110 86 C114 76 114 64 110 54 C106 64 106 76 110 86 Z"
            stroke={stroke}
            strokeWidth="0.8"
            opacity="0.8"
            transform={`rotate(${a} 110 110)`}
          />
        );
      })}
      <circle cx="110" cy="110" r="6" stroke={stroke} strokeWidth="0.9" />
    </svg>
  );
}

/* A south-Indian gopuram / temple arch silhouette outline. */
export function TempleArch({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 300 360" fill="none" aria-hidden="true">
      <path
        d="M150 8 L150 0 M150 8 C150 8 150 14 150 22"
        stroke={stroke}
        strokeWidth="0.9"
      />
      <path
        d="M150 22 C120 22 100 44 100 80 L100 350 L200 350 L200 80 C200 44 180 22 150 22 Z"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M150 22 C132 22 118 38 118 66 L118 350 L182 350 L182 66 C182 38 168 22 150 22 Z"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinejoin="round"
        opacity="0.8"
      />
      {/* tiered roof lines */}
      <path d="M86 80 L214 80" stroke={stroke} strokeWidth="0.8" opacity="0.7" />
      <path d="M96 132 L204 132" stroke={stroke} strokeWidth="0.8" opacity="0.6" />
      <path d="M104 184 L196 184" stroke={stroke} strokeWidth="0.8" opacity="0.5" />
      <path d="M112 236 L188 236" stroke={stroke} strokeWidth="0.8" opacity="0.45" />
      <path d="M120 288 L180 288" stroke={stroke} strokeWidth="0.8" opacity="0.4" />
      {/* kalash finial */}
      <path
        d="M150 4 C146 4 144 7 144 11 C144 14 147 16 150 16 C153 16 156 14 156 11 C156 7 154 4 150 4 Z"
        stroke={stroke}
        strokeWidth="0.9"
      />
    </svg>
  );
}

/* A hanging diya / oil-lamp outline with flame. */
export function DiyaLamp({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 160" fill="none" aria-hidden="true">
      <path d="M60 6 L60 22" stroke={stroke} strokeWidth="0.8" />
      <path
        d="M60 22 C52 22 48 30 50 38 C52 44 58 46 60 50 C62 46 68 44 70 38 C72 30 68 22 60 22 Z"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M60 50 C58 50 56 52 56 54 C56 56 58 58 60 58 C62 58 64 56 64 54 C64 52 62 50 60 50 Z"
        stroke={stroke}
        strokeWidth="0.7"
      />
      {/* lamp bowl */}
      <path
        d="M30 96 C30 112 44 122 60 122 C76 122 90 112 90 96 L90 90 L30 90 Z"
        stroke={stroke}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path d="M24 90 L96 90" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M30 90 C30 80 90 80 90 90" stroke={stroke} strokeWidth="0.7" opacity="0.7" />
      {/* stand */}
      <path d="M60 122 L60 150" stroke={stroke} strokeWidth="0.9" />
      <path d="M44 150 L76 150" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/* Kalash (sacred pot) with coconut + mango leaves. */
export function Kalash({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" aria-hidden="true">
      {/* coconut */}
      <path
        d="M60 24 C50 24 44 32 44 42 C44 50 50 56 60 56 C70 56 76 50 76 42 C76 32 70 24 60 24 Z"
        stroke={stroke}
        strokeWidth="1"
      />
      <path d="M52 34 C56 30 64 30 68 34" stroke={stroke} strokeWidth="0.6" opacity="0.7" />
      {/* leaves */}
      <path d="M60 52 C44 50 34 58 30 72 C40 70 52 64 60 58" stroke={stroke} strokeWidth="0.9" />
      <path d="M60 52 C76 50 86 58 90 72 C80 70 68 64 60 58" stroke={stroke} strokeWidth="0.9" />
      {/* pot rim */}
      <path d="M38 70 L82 70" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path
        d="M40 70 C40 86 36 96 36 110 C36 130 46 142 60 142 C74 142 84 130 84 110 C84 96 80 86 80 70"
        stroke={stroke}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* pot band */}
      <path d="M38 110 L82 110" stroke={stroke} strokeWidth="0.7" opacity="0.6" />
      <path d="M40 122 C60 128 80 122 80 122" stroke={stroke} strokeWidth="0.7" opacity="0.5" />
      {/* base */}
      <path d="M48 142 L72 142 L68 156 L52 156 Z" stroke={stroke} strokeWidth="0.9" strokeLinejoin="round" />
      <path d="M44 156 L76 156" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- NEW DEVOTIONAL PATTERNS (10+) ---------------- */

/* 1. Diya flame cluster — a ring of small oil-lamp flames for Diwali. */
export function DiyaCluster({ className = "" }) {
  const flames = Array.from({ length: 7 });
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="14" stroke={stroke} strokeWidth="0.8" opacity="0.5" />
      {flames.map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        const cx = 100 + Math.cos(a) * 60;
        const cy = 100 + Math.sin(a) * 60;
        return (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <path
              d="M0 14 C-6 8 -6 2 0 -6 C6 2 6 8 0 14 Z"
              stroke={stroke}
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
            <path d="M-4 12 C-2 8 2 8 4 12" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
            <path d="M-9 14 L9 14" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

/* 2. Swastika — the ancient auspicious Hindu symbol (right-facing).
 * Variants: clean / footed / extended (tapered 45° tips). Stars are the
 * four auspicious dots rendered as curved 4-point stars. */
const PATHS = {
  clean: [
    "M60 60 V15 H90 V45",
    "M60 60 H105 V90 H75",
    "M60 60 V105 H30 V75",
    "M60 60 H15 V30 H45",
  ],
  footed: [
    "M60 60 V15 H90 V45 H105",
    "M60 60 H105 V90 H75 V105",
    "M60 60 V105 H30 V75 H15",
    "M60 60 H15 V30 H45 V15",
  ],
  // hooks only — the 45° feet are now tapered fills, not strokes
  extended: [
    "M60 60 V20 H100",
    "M60 60 H100 V100",
    "M60 60 V100 H20",
    "M60 60 H20 V20",
  ],
};

// pointed foot along the 45° diagonal: base = stroke width (3), apex at the tip.
// base corners are tip ± 1.5 perpendicular to the diagonal (1.5/√2 ≈ 1.06)
const TIP = "M98.94 18.94 L101.06 21.06 L110 10 Z";
const TIP_ROTATIONS = [0, 90, 180, 270];

function starPath(cx, cy, r = 7) {
  return [
    `M${cx} ${cy - r}`,
    `Q${cx} ${cy} ${cx + r} ${cy}`,
    `Q${cx} ${cy} ${cx} ${cy + r}`,
    `Q${cx} ${cy} ${cx - r} ${cy}`,
    `Q${cx} ${cy} ${cx} ${cy - r}`,
    "Z",
  ].join(" ");
}

const STARS = [
  [77, 43],
  [77, 77],
  [43, 77],
  [43, 43],
];

export function Swastika({
  className = "",
  stroke: strokeProp = "currentColor",
  variant = "extended",
  stars = true,
}) {
  return (
    <svg className={className} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g stroke={strokeProp} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        {PATHS[variant].map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {variant === "extended" && (
        <g fill={strokeProp}>
          {TIP_ROTATIONS.map((deg) => (
            <path key={deg} d={TIP} transform={deg ? `rotate(${deg} 60 60)` : undefined} />
          ))}
        </g>
      )}

      {stars && (
        <g fill={strokeProp}>
          {STARS.map(([cx, cy]) => (
            <path key={`${cx}-${cy}`} d={starPath(cx, cy)} />
          ))}
        </g>
      )}

      <circle cx={60} cy={60} r={2.5} fill={strokeProp} />
    </svg>
  );
}

/* 3. Om (Aum) — the sacred syllable rendered as line-art. */
export function OmSymbol({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 140 120" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* main spiral (the 3) */}
        <path d="M70 96 C50 96 34 82 34 64 C34 50 46 40 60 40 C72 40 80 50 80 62 C80 70 74 76 66 76" />
        {/* lower hook + dot curl */}
        <path d="M70 96 C84 96 96 86 96 72 C96 60 86 50 74 50" />
        {/* crescent (chandra) */}
        <path d="M82 30 C88 22 100 22 106 30 C100 26 90 26 86 32 Z" strokeWidth="1.6" />
        {/* bindu dot */}
        <circle cx="96" cy="16" r="3.5" fill={stroke} stroke="none" />
        {/* lower tail */}
        <path d="M34 64 C26 66 20 74 24 84" />
      </g>
    </svg>
  );
}

/* 4. Trishul — Shiva's three-pronged trident. */
export function Trishul({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 240" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* central prong */}
        <path d="M60 8 L60 36" />
        {/* left prong */}
        <path d="M28 36 C28 24 34 16 44 14 L44 38" />
        {/* right prong */}
        <path d="M92 36 C92 24 86 16 76 14 L76 38" />
        {/* crossbar */}
        <path d="M16 36 L104 36" />
        {/* shaft */}
        <path d="M60 36 L60 232" />
        {/* base disc */}
        <path d="M44 36 L76 36" />
        {/* decorative bands */}
        <path d="M52 70 L68 70" strokeWidth="1.4" />
        <path d="M50 92 L70 92" strokeWidth="1.4" />
        {/* base finial */}
        <path d="M48 232 L72 232" strokeWidth="2.4" />
        <path d="M52 220 L68 220" strokeWidth="1.4" opacity="0.7" />
      </g>
    </svg>
  );
}

/* 5. Conch (Shankh) — the sacred shell blown at the start of rituals. */
export function Conch({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* outer shell spiral */}
        <path d="M80 24 C50 24 30 50 30 84 C30 116 56 138 88 138 C112 138 130 120 130 96 C130 78 116 64 98 64 C86 64 76 74 76 86 C76 94 82 100 90 100" />
        {/* inner spiral rings */}
        <path d="M80 40 C60 40 46 56 46 78" strokeWidth="1" opacity="0.7" />
        <path d="M64 86 C64 74 74 64 86 64" strokeWidth="0.9" opacity="0.6" />
        <path d="M94 100 C100 100 105 95 105 88" strokeWidth="0.8" opacity="0.5" />
        {/* mouth/opening */}
        <path d="M76 86 C80 92 88 96 96 94" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

/* 6. Rangoli — a symmetrical floor mandala for festivals. */
export function Rangoli({ className = "" }) {
  const petals = Array.from({ length: 8 });
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="0.9" fill="none">
        {/* outer ring */}
        <circle cx="100" cy="100" r="90" opacity="0.5" />
        <circle cx="100" cy="100" r="76" opacity="0.7" />
        {/* 8 lotus petals around */}
        {petals.map((_, i) => {
          const a = (i / 8) * 360;
          return (
            <path
              key={`p${i}`}
              d="M100 38 C106 56 106 76 100 94 C94 76 94 56 100 38 Z"
              strokeWidth="1"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        {/* inner petal ring (offset 22.5deg) */}
        {petals.map((_, i) => {
          const a = (i / 8) * 360 + 22.5;
          return (
            <path
              key={`ip${i}`}
              d="M100 58 C104 70 104 82 100 92 C96 82 96 70 100 58 Z"
              strokeWidth="0.8"
              opacity="0.7"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        {/* center */}
        <circle cx="100" cy="100" r="14" strokeWidth="1.1" />
        <circle cx="100" cy="100" r="6" strokeWidth="0.9" />
        {/* dots between outer petals */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <circle
              key={`d${i}`}
              cx={100 + Math.cos(a) * 83}
              cy={100 + Math.sin(a) * 83}
              r="1.4"
              fill={stroke}
              stroke="none"
            />
          );
        })}
      </g>
    </svg>
  );
}

/* 7. Kalpavriksha (wish-fulfilling tree) — a small sacred tree. */
export function SacredTree({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 160 220" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeLinecap="round" fill="none">
        {/* trunk */}
        <path d="M80 218 L80 130" strokeWidth="1.4" />
        {/* canopy layers */}
        <path d="M80 130 C50 120 30 96 30 72 C40 84 60 96 80 104" strokeWidth="1.1" />
        <path d="M80 130 C110 120 130 96 130 72 C120 84 100 96 80 104" strokeWidth="1.1" />
        <path d="M80 104 C54 96 38 76 38 54 C50 64 66 74 80 80" strokeWidth="1" />
        <path d="M80 104 C106 96 122 76 122 54 C110 64 94 74 80 80" strokeWidth="1" />
        <path d="M80 80 C62 72 50 58 52 40 C62 48 72 56 80 60" strokeWidth="0.9" />
        <path d="M80 80 C98 72 110 58 108 40 C98 48 88 56 80 60" strokeWidth="0.9" />
        {/* small fruits/dots in canopy */}
        <circle cx="48" cy="78" r="2.2" fill={stroke} stroke="none" opacity="0.7" />
        <circle cx="112" cy="78" r="2.2" fill={stroke} stroke="none" opacity="0.7" />
        <circle cx="60" cy="56" r="1.8" fill={stroke} stroke="none" opacity="0.6" />
        <circle cx="100" cy="56" r="1.8" fill={stroke} stroke="none" opacity="0.6" />
        <circle cx="80" cy="44" r="2" fill={stroke} stroke="none" opacity="0.65" />
        {/* roots flare */}
        <path d="M80 218 C72 214 66 214 60 218" strokeWidth="1.1" />
        <path d="M80 218 C88 214 94 214 100 218" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

/* 8. Hamsa (sacred goose / swan) — vehicle of Saraswati. */
export function Hamsa({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 180 160" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* body */}
        <path d="M40 100 C40 80 58 70 80 70 L120 70 C140 70 150 80 150 96 C150 108 140 114 126 114 L70 114 C52 114 40 108 40 100 Z" />
        {/* wing */}
        <path d="M70 74 C80 60 100 56 120 62 C108 70 92 74 78 78" strokeWidth="1" />
        <path d="M76 84 C86 76 104 74 118 78" strokeWidth="0.8" opacity="0.7" />
        {/* neck + head */}
        <path d="M40 100 C30 92 26 80 30 68 C34 56 44 50 54 52" />
        <path d="M54 52 C50 46 52 40 58 40 C64 40 66 46 62 52" />
        {/* beak */}
        <path d="M62 48 L74 50 L62 54 Z" fill={stroke} stroke="none" />
        {/* eye */}
        <circle cx="56" cy="48" r="1.6" fill={stroke} stroke="none" />
        {/* water line */}
        <path d="M20 120 C50 116 90 124 130 120 C150 118 168 122 176 120" strokeWidth="0.9" opacity="0.6" />
        {/* tail */}
        <path d="M150 96 L162 92 L150 100" strokeWidth="1" />
      </g>
    </svg>
  );
}

/* 9. Bell (Ghanta) — the ritual bell rung during puja. */
export function Bell({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 180" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* top loop */}
        <path d="M60 12 C54 12 50 16 50 22 C50 28 54 32 60 32 C66 32 70 28 70 22 C70 16 66 12 60 12 Z" />
        {/* crown stem */}
        <path d="M60 32 L60 42" />
        {/* bell body */}
        <path d="M60 42 C36 46 26 70 26 100 L26 120 L94 120 L94 100 C94 70 84 46 60 42 Z" />
        {/* rim */}
        <path d="M22 120 L98 120 L94 132 L26 132 Z" />
        {/* clapper */}
        <path d="M60 132 L60 146" strokeWidth="0.9" />
        <circle cx="60" cy="150" r="4" strokeWidth="0.9" />
        {/* decorative band */}
        <path d="M30 96 L90 96" strokeWidth="0.8" opacity="0.6" />
      </g>
    </svg>
  );
}

/* 10. Yantra — a geometric sacred diagram (sri-yantra inspired). */
export function Yantra({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="0.9" fill="none">
        {/* outer square frame */}
        <rect x="20" y="20" width="160" height="160" rx="4" opacity="0.5" />
        {/* outer circle */}
        <circle cx="100" cy="100" r="72" opacity="0.5" />
        {/* 16-petal lotus */}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * 360;
          return (
            <path
              key={`l${i}`}
              d="M100 40 C103 52 103 64 100 72 C97 64 97 52 100 40 Z"
              strokeWidth="0.7"
              opacity="0.6"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        {/* 8-petal inner lotus */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * 360;
          return (
            <path
              key={`il${i}`}
              d="M100 72 C102 80 102 86 100 92 C98 86 98 80 100 72 Z"
              strokeWidth="0.8"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        {/* interlocking triangles (sri yantra) */}
        <path d="M100 58 L132 112 L68 112 Z" strokeWidth="1" />
        <path d="M100 142 L68 88 L132 88 Z" strokeWidth="1" />
        <path d="M100 74 L122 112 L78 112 Z" strokeWidth="0.9" opacity="0.85" />
        <path d="M100 126 L78 88 L122 88 Z" strokeWidth="0.9" opacity="0.85" />
        {/* bindu */}
        <circle cx="100" cy="100" r="3.5" fill={stroke} stroke="none" />
      </g>
    </svg>
  );
}

/* 11. Mango-leaf toran (door garland) — a hanging string of mango leaves. */
export function Toran({ className = "" }) {
  const leaves = Array.from({ length: 6 });
  return (
    <svg className={className} viewBox="0 0 240 160" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeLinecap="round" fill="none">
        {/* hanging string — gentle catenary */}
        <path d="M10 20 C60 56 180 56 230 20" strokeWidth="1.1" />
        {/* mango leaves hanging down */}
        {leaves.map((_, i) => {
          const t = (i + 0.5) / 6;
          const x = 10 + t * 220;
          // approximate catenary y at t
          const y = 20 + 36 * (1 - Math.pow(2 * t - 1, 2));
          return (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 0 L0 12" strokeWidth="0.9" />
              <path
                d="M0 12 C-8 16 -10 28 -6 40 C-2 50 2 50 6 40 C10 28 8 16 0 12 Z"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <path d="M0 16 L0 44" strokeWidth="0.5" opacity="0.6" />
            </g>
          );
        })}
        {/* central pendant */}
        <path d="M120 60 L120 72" strokeWidth="0.9" />
        <circle cx="120" cy="78" r="5" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

/* 12. Peacock — associated with Karthikeya and Krishna. */
export function Peacock({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 180 200" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* body */}
        <path d="M70 150 C70 120 86 104 110 104 C132 104 146 120 146 142 C146 156 136 164 122 164 L84 164 C74 164 70 158 70 150 Z" />
        {/* neck + head */}
        <path d="M86 120 C82 100 88 84 98 76 C104 72 112 74 114 80" />
        <path d="M114 80 C118 74 124 74 126 80 C124 86 118 88 114 86" />
        <path d="M126 80 L132 78" strokeWidth="1" />
        {/* eye dot */}
        <circle cx="118" cy="82" r="1.4" fill={stroke} stroke="none" />
        {/* fanned tail feathers */}
        {Array.from({ length: 5 }).map((_, i) => {
          const a = -60 + i * 30;
          return (
            <g key={i} transform={`translate(70 140) rotate(${a})`}>
              <path d="M0 0 L-60 -90" strokeWidth="1" />
              <circle cx="-60" cy="-90" r="7" strokeWidth="1" />
              <circle cx="-60" cy="-90" r="3" fill={stroke} stroke="none" opacity="0.7" />
              <path d="M-66 -84 C-60 -80 -54 -82 -54 -90 C-54 -96 -60 -98 -66 -96" strokeWidth="0.7" opacity="0.7" />
            </g>
          );
        })}
        {/* legs */}
        <path d="M96 164 L96 184" strokeWidth="0.9" />
        <path d="M120 164 L120 184" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * SacredMedallion — the redesigned hero "coin". A stunning layered
 * gold disc: outer rope-twist rim, beaded inner rim, sunburst rays,
 * an 8-petal engraved lotus with a second 8-petal ring rotated 22.5°,
 * an Om sigil in the centre, a top sheen and a soft outer glow. Works
 * in both light and dark themes. Each medallion gets unique gradient
 * ids so multiple can render on the same page without clashes.
 * ------------------------------------------------------------------ */
let _medId = 0;
export function SacredMedallion({
  size = 120,
  className = "",
  glow = true,
  rays = true,
}) {
  const uid = React.useId ? React.useId().replace(/:/g, "") : `m${++_medId}`;
  const gFace = `mf-${uid}`;
  const gRim = `mr-${uid}`;
  const gRope = `mrp-${uid}`;
  const gSheen = `ms-${uid}`;
  const gInner = `mi-${uid}`;
  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      {glow && (
        <span
          style={{
            position: "absolute",
            inset: "-26%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(247,207,91,0.46) 0%, rgba(247,207,91,0.18) 42%, transparent 70%)",
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

        {/* rays — finer sunburst */}
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

        {/* body + rim shading */}
        <circle cx="60" cy="60" r="50" fill={`url(#${gFace})`} />
        <circle cx="60" cy="60" r="50" fill={`url(#${gRim})`} />

        {/* outer rope-twist rim — alternating segments */}
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

        {/* beaded inner rim */}
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          return (
            <circle
              key={`b${i}`}
              cx={60 + Math.cos(a) * 40}
              cy={60 + Math.sin(a) * 40}
              r="0.7"
              fill="rgba(110,72,10,0.55)"
            />
          );
        })}
        <circle cx="60" cy="60" r="38" stroke="rgba(110,72,10,0.5)" strokeWidth="0.7" fill="none" />
        <circle cx="60" cy="60" r="37" fill={`url(#${gInner})`} />

        {/* outer 8-petal lotus */}
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
        {/* inner 8-petal lotus (offset 22.5°) */}
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

        {/* centre disc */}
        <circle cx="60" cy="60" r="11" fill="rgba(120,80,12,0.16)" stroke="rgba(110,72,10,0.6)" strokeWidth="0.9" />
        {/* Om sigil in centre */}
        <g transform="translate(60 60)" stroke="rgba(80,52,6,0.7)" strokeWidth="1" fill="none" strokeLinecap="round">
          <path d="M-5 -3 C-8 -3 -8 1 -5 1 C-2 1 -2 -3 -5 -3" transform="scale(0.62)" />
          <circle cx="0" cy="0" r="1.4" fill="rgba(80,52,6,0.7)" stroke="none" />
        </g>

        {/* top sheen */}
        <ellipse cx="52" cy="40" rx="26" ry="14" fill={`url(#${gSheen})`} opacity="0.7" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Animated wrapper: slowly rotates an SVG decor piece on scroll.
 * Respects reduced-motion.
 * ------------------------------------------------------------------ */
export function SpinDecor({ children, className = "", speed = 1, reverse = false }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * speed * (reverse ? -1 : 1)]);
  return (
    <span ref={ref} className={className} style={{ display: "inline-block" }}>
      {reduce ? (
        children
      ) : (
        <motion.span style={{ rotate, display: "inline-block" }}>{children}</motion.span>
      )}
    </span>
  );
}

/* Draw-on reveal for stroke SVGs: animates the path length. */
export function DrawDecor({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{children}</span>;
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ *
 * BackToTopHalo — sacred button halo for the floating scroll-to-top.
 * Slightly larger than the 44px button (default 68px) with a soft
 * outer glow. The mandala ring spins with page scroll exactly like
 * <SpinDecor> (scrollYProgress → rotate), respects reduced-motion.
 * Use directly as the button background; pointer-events none so the
 * button stays clickable.
 * ------------------------------------------------------------------ */


export function BackToTopHalo({ 
  size = 68, 
  className = "", 
  speed = 0.7, 
  idleMs = 480 
}) {
  // Framer Motion has a built-in useReducedMotion hook
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360 * speed]);

  const [scrolling, setScrolling] = useState(false);
  const timeoutRef = useRef(null);

  // 1. Native Framer Motion scroll listening (replaces window 'scroll' event)
  useMotionValueEvent(scrollYProgress, "change", () => {
    if (reduce) return;
    setScrolling(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setScrolling(false), idleMs);
  });

  // Cleanup timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const visible = reduce ? true : scrolling;

  // 2. Memoize heavy trigonometry calculations so they don't run on every render
  const geometry = useMemo(() => {
    const beads = Array.from({ length: 28 }).map((_, i) => {
      const a = (i / 28) * Math.PI * 2;
      return { cx: 50 + Math.cos(a) * 41, cy: 50 + Math.sin(a) * 41 };
    });

    const ticks = Array.from({ length: 16 }).map((_, i) => {
      const a = (i / 16) * Math.PI * 2;
      return {
        x1: 50 + Math.cos(a) * 33, y1: 50 + Math.sin(a) * 33,
        x2: 50 + Math.cos(a) * 38, y2: 50 + Math.sin(a) * 38,
      };
    });

    const petals = Array.from({ length: 8 }).map((_, i) => ({
      transform: `rotate(${(i / 8) * 360} 50 50)`,
    }));

    return { beads, ticks, petals };
  }, []);

  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
      }}
    >
      <motion.span
        className={className}
        aria-hidden="true"
        animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.86 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          display: "grid",
          placeItems: "center",
          pointerEvents: "none",
        }}
      >
      {/* Solid disc background with CSS variable fallbacks */}
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "color-mix(in srgb, var(--deep, #111827) 88%, var(--gold, #e7b631) 12%)",
          border: "1px solid rgba(231,182,49,0.35)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
        }}
      />

      {/* Soft outer glow */}
      <span
        style={{
          position: "absolute",
          inset: "-18%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(247,207,91,0.42) 0%, rgba(247,207,91,0.16) 42%, transparent 72%)",
          filter: "blur(4px)",
          zIndex: -1,
        }}
      />

      {/* Rotating SVG Layer */}
      <motion.span
        style={{
          display: "grid",
          placeItems: "center",
          width: "100%",
          height: "100%",
          rotate: reduce ? 0 : rotate,
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" style={{ width: "100%", height: "100%" }}>
          {/* Outer thin ring */}
          <circle cx="50" cy="50" r="46" stroke="rgba(231,182,49,0.5)" strokeWidth="0.9" />

          {/* 4. Grouped elements to reduce DOM attribute repetition */}
          <g fill="rgba(231,182,49,0.9)">
            {geometry.beads.map((bead, i) => (
              <circle key={i} cx={bead.cx} cy={bead.cy} r="0.9" />
            ))}
          </g>

          <g stroke="rgba(231,182,49,0.55)" strokeWidth="0.75" strokeLinecap="round">
            {geometry.ticks.map((tick, i) => (
              <line key={i} x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2} />
            ))}
          </g>

          <g stroke="rgba(231,182,49,0.45)" strokeWidth="0.7" fill="rgba(255,240,180,0.06)">
            {geometry.petals.map((petal, i) => (
              <path
                key={i}
                d="M50 29 C52.5 22 52.5 16 50 11 C47.5 16 47.5 22 50 29 Z"
                transform={petal.transform}
              />
            ))}
          </g>

          {/* Inner boundary */}
          <circle cx="50" cy="50" r="22" stroke="rgba(231,182,49,0.22)" strokeWidth="0.6" />
        </svg>
      </motion.span>
      </motion.span>
    </span>
  );
}
