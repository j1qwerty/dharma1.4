const stroke = "currentColor";

/* Kalpavriksha (wish-fulfilling tree) — a small sacred tree. */
export function SacredTree({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 160 220" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeLinecap="round" fill="none">
        <path d="M80 218 L80 130" strokeWidth="1.4" />
        <path d="M80 130 C50 120 30 96 30 72 C40 84 60 96 80 104" strokeWidth="1.1" />
        <path d="M80 130 C110 120 130 96 130 72 C120 84 100 96 80 104" strokeWidth="1.1" />
        <path d="M80 104 C54 96 38 76 38 54 C50 64 66 74 80 80" strokeWidth="1" />
        <path d="M80 104 C106 96 122 76 122 54 C110 64 94 74 80 80" strokeWidth="1" />
        <path d="M80 80 C62 72 50 58 52 40 C62 48 72 56 80 60" strokeWidth="0.9" />
        <path d="M80 80 C98 72 110 58 108 40 C98 48 88 56 80 60" strokeWidth="0.9" />
        <circle cx="48" cy="78" r="2.2" fill={stroke} stroke="none" opacity="0.7" />
        <circle cx="112" cy="78" r="2.2" fill={stroke} stroke="none" opacity="0.7" />
        <circle cx="60" cy="56" r="1.8" fill={stroke} stroke="none" opacity="0.6" />
        <circle cx="100" cy="56" r="1.8" fill={stroke} stroke="none" opacity="0.6" />
        <circle cx="80" cy="44" r="2" fill={stroke} stroke="none" opacity="0.65" />
        <path d="M80 218 C72 214 66 214 60 218" strokeWidth="1.1" />
        <path d="M80 218 C88 214 94 214 100 218" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

export default SacredTree;
