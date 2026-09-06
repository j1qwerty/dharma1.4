const stroke = "currentColor";

/* Trishul — Shiva's three-pronged trident. */
export function Trishul({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 240" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M60 8 L60 36" />
        <path d="M28 36 C28 24 34 16 44 14 L44 38" />
        <path d="M92 36 C92 24 86 16 76 14 L76 38" />
        <path d="M16 36 L104 36" />
        <path d="M60 36 L60 232" />
        <path d="M44 36 L76 36" />
        <path d="M52 70 L68 70" strokeWidth="1.4" />
        <path d="M50 92 L70 92" strokeWidth="1.4" />
        <path d="M48 232 L72 232" strokeWidth="2.4" />
        <path d="M52 220 L68 220" strokeWidth="1.4" opacity="0.7" />
      </g>
    </svg>
  );
}

export default Trishul;
