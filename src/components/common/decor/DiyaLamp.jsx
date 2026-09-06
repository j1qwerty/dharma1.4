const stroke = "currentColor";

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
      <path d="M60 50 C58 50 56 52 56 54 C56 56 58 58 60 58 C62 58 64 56 64 54 C64 52 62 50 60 50 Z" stroke={stroke} strokeWidth="0.7" />
      {/* lamp bowl */}
      <path d="M30 96 C30 112 44 122 60 122 C76 122 90 112 90 96 L90 90 L30 90 Z" stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
      <path d="M24 90 L96 90" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
      <path d="M30 90 C30 80 90 80 90 90" stroke={stroke} strokeWidth="0.7" opacity="0.7" />
      {/* stand */}
      <path d="M60 122 L60 150" stroke={stroke} strokeWidth="0.9" />
      <path d="M44 150 L76 150" stroke={stroke} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export default DiyaLamp;
