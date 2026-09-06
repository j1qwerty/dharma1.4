const stroke = "currentColor";

/* Trishul — Shiva's three-pronged trident. */
/* Trishul (trident) — gold line-art. Slim spear + curved side prongs
   on a deliberately long shaft, diamond pommel. Themeable via currentColor. */

const PARTS = {
  spear: "M60 18 C65 30 65 50 60 66 C55 50 55 30 60 18 Z",
  prongL: "M46 82 C28 70 21 45 34 26",
  prongR: "M74 82 C92 70 99 45 86 26",
  crossbar: "M40 82 H80",
  shaft: "M60 66 V212", // long shaft — head is ~64 tall, shaft ~146
  pommel: "M60 212 L65.5 218 L60 224 L54.5 218 Z",
} ;

export function Trishul({
  className,
  stroke = "currentColor",
  strokeWidth = 3,
}) {
  return (
    <svg className={className} viewBox="0 0 120 240" fill="none" aria-hidden="true">
      <g
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={PARTS.spear} />
        <path d={PARTS.prongL} />
        <path d={PARTS.prongR} />
        <path d={PARTS.crossbar} />
        <path d={PARTS.shaft} />
        <path d={PARTS.pommel} />
      </g>
      {/* small filled accents: crossbar ends + pommel centre */}
      <g fill={stroke}>
        <circle cx={40} cy={82} r={1.8} />
        <circle cx={80} cy={82} r={1.8} />
        <circle cx={60} cy={218} r={1.5} />
      </g>
    </svg>
  );
}

export default Trishul;
