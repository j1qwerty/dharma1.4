const stroke = "currentColor";

/* Peacock — associated with Karthikeya and Krishna. */
export function Peacock({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 180 200" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M70 150 C70 120 86 104 110 104 C132 104 146 120 146 142 C146 156 136 164 122 164 L84 164 C74 164 70 158 70 150 Z" />
        <path d="M86 120 C82 100 88 84 98 76 C104 72 112 74 114 80" />
        <path d="M114 80 C118 74 124 74 126 80 C124 86 118 88 114 86" />
        <path d="M126 80 L132 78" strokeWidth="1" />
        <circle cx="118" cy="82" r="1.4" fill={stroke} stroke="none" />
        {Array.from({ length: 5 }).map((_, i) => {
          const a = -60 + i * 30;
          return (
            <g key={i} transform={`translate(70 140) rotate(${a})`}>
              <path d="M0 0 L-60 -90" strokeWidth="1" />
              <circle cx="-60" cy="-90" r="7" strokeWidth="1" />
              <circle cx="-60" cy="-90" r="3" fill={stroke} stroke="none" opacity="0.7" />
              <path d="M-66 -84 C-60 -80 -54 -82 -54 -90 C-54 -96 -60 -98 -66 -96" strokeWidth="0.7" opacity="0.7" />
            </g>
          );
        })}
        <path d="M96 164 L96 184" strokeWidth="0.9" />
        <path d="M120 164 L120 184" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

export default Peacock;
