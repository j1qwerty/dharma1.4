const stroke = "currentColor";

/* Mango-leaf toran (door garland) — a hanging string of mango leaves. */
export function Toran({ className = "" }) {
  const leaves = Array.from({ length: 6 });
  return (
    <svg className={className} viewBox="0 0 240 160" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeLinecap="round" fill="none">
        <path d="M10 20 C60 56 180 56 230 20" strokeWidth="1.1" />
        {leaves.map((_, i) => {
          const t = (i + 0.5) / 6;
          const x = 10 + t * 220;
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
        <path d="M120 60 L120 72" strokeWidth="0.9" />
        <circle cx="120" cy="78" r="5" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

export default Toran;
