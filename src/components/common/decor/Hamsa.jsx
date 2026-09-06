const stroke = "currentColor";

/* Hamsa (sacred goose / swan) — vehicle of Saraswati. */
export function Hamsa({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 180 160" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M40 100 C40 80 58 70 80 70 L120 70 C140 70 150 80 150 96 C150 108 140 114 126 114 L70 114 C52 114 40 108 40 100 Z" />
        <path d="M70 74 C80 60 100 56 120 62 C108 70 92 74 78 78" strokeWidth="1" />
        <path d="M76 84 C86 76 104 74 118 78" strokeWidth="0.8" opacity="0.7" />
        <path d="M40 100 C30 92 26 80 30 68 C34 56 44 50 54 52" />
        <path d="M54 52 C50 46 52 40 58 40 C64 40 66 46 62 52" />
        <path d="M62 48 L74 50 L62 54 Z" fill={stroke} stroke="none" />
        <circle cx="56" cy="48" r="1.6" fill={stroke} stroke="none" />
        <path d="M20 120 C50 116 90 124 130 120 C150 118 168 122 176 120" strokeWidth="0.9" opacity="0.6" />
        <path d="M150 96 L162 92 L150 100" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default Hamsa;
