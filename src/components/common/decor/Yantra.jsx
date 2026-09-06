const stroke = "currentColor";

/* Yantra — a geometric sacred diagram (sri-yantra inspired). */
export function Yantra({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="0.9" fill="none">
        <rect x="20" y="20" width="160" height="160" rx="4" opacity="0.5" />
        <circle cx="100" cy="100" r="72" opacity="0.5" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * 360;
          return (
            <path
              key={`l${i}`}
              d="M100 40 C103 52 103 64 100 72 C97 64 97 52 100 40 Z"
              strokeWidth="0.7"
              opacity="0.6"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * 360;
          return (
            <path
              key={`il${i}`}
              d="M100 72 C102 80 102 86 100 92 C98 86 98 80 100 72 Z"
              strokeWidth="0.8"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        <path d="M100 58 L132 112 L68 112 Z" strokeWidth="1" />
        <path d="M100 142 L68 88 L132 88 Z" strokeWidth="1" />
        <path d="M100 74 L122 112 L78 112 Z" strokeWidth="0.9" opacity="0.85" />
        <path d="M100 126 L78 88 L122 88 Z" strokeWidth="0.9" opacity="0.85" />
        <circle cx="100" cy="100" r="3.5" fill={stroke} stroke="none" />
      </g>
    </svg>
  );
}

export default Yantra;
