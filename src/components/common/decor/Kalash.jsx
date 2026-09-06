const stroke = "currentColor";

/* Kalash (sacred pot) with coconut + mango leaves. */
export function Kalash({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" aria-hidden="true">
      {/* coconut */}
      <path d="M60 24 C50 24 44 32 44 42 C44 50 50 56 60 56 C70 56 76 50 76 42 C76 32 70 24 60 24 Z" stroke={stroke} strokeWidth="1" />
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

export default Kalash;
