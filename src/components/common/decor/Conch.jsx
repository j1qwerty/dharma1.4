const stroke = "currentColor";

/* Conch (Shankh) — the sacred shell blown at the start of rituals. */
export function Conch({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M80 24 C50 24 30 50 30 84 C30 116 56 138 88 138 C112 138 130 120 130 96 C130 78 116 64 98 64 C86 64 76 74 76 86 C76 94 82 100 90 100" />
        <path d="M80 40 C60 40 46 56 46 78" strokeWidth="1" opacity="0.7" />
        <path d="M64 86 C64 74 74 64 86 64" strokeWidth="0.9" opacity="0.6" />
        <path d="M94 100 C100 100 105 95 105 88" strokeWidth="0.8" opacity="0.5" />
        <path d="M76 86 C80 92 88 96 96 94" strokeWidth="1.1" />
      </g>
    </svg>
  );
}

export default Conch;
