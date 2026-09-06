const stroke = "currentColor";

/* Bell (Ghanta) — the ritual bell rung during puja. */
export function Bell({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 180" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M60 12 C54 12 50 16 50 22 C50 28 54 32 60 32 C66 32 70 28 70 22 C70 16 66 12 60 12 Z" />
        <path d="M60 32 L60 42" />
        <path d="M60 42 C36 46 26 70 26 100 L26 120 L94 120 L94 100 C94 70 84 46 60 42 Z" />
        <path d="M22 120 L98 120 L94 132 L26 132 Z" />
        <path d="M60 132 L60 146" strokeWidth="0.9" />
        <circle cx="60" cy="150" r="4" strokeWidth="0.9" />
        <path d="M30 96 L90 96" strokeWidth="0.8" opacity="0.6" />
      </g>
    </svg>
  );
}

export default Bell;
