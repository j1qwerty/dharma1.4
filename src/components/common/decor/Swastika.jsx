/* Swastika — the ancient auspicious Hindu symbol (right-facing).
 * Variants: clean / footed / extended (tapered 45° tips). Stars are the
 * four auspicious dots rendered as curved 4-point stars. */
const PATHS = {
  clean: ["M60 60 V15 H90 V45", "M60 60 H105 V90 H75", "M60 60 V105 H30 V75", "M60 60 H15 V30 H45"],
  footed: [
    "M60 60 V15 H90 V45 H105",
    "M60 60 H105 V90 H75 V105",
    "M60 60 V105 H30 V75 H15",
    "M60 60 H15 V30 H45 V15",
  ],
  // hooks only — the 45° feet are now tapered fills, not strokes
  extended: ["M60 60 V20 H100", "M60 60 H100 V100", "M60 60 V100 H20", "M60 60 H20 V20"],
};

// pointed foot along the 45° diagonal: base = stroke width (3), apex at the tip.
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

export default Swastika;
