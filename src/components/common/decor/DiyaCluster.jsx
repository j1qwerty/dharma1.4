const stroke = "currentColor";

/* Diya flame cluster — a ring of small oil-lamp flames for Diwali. */
export function DiyaCluster({ className = "" }) {
  const flames = Array.from({ length: 7 });
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="14" stroke={stroke} strokeWidth="0.8" opacity="0.5" />
      {flames.map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        const cx = 100 + Math.cos(a) * 60;
        const cy = 100 + Math.sin(a) * 60;
        return (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <path d="M0 14 C-6 8 -6 2 0 -6 C6 2 6 8 0 14 Z" stroke={stroke} strokeWidth="0.9" strokeLinejoin="round" />
            <path d="M-4 12 C-2 8 2 8 4 12" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
            <path d="M-9 14 L9 14" stroke={stroke} strokeWidth="0.8" strokeLinecap="round" />
          </g>
        );
      })}
    </svg>
  );
}

export default DiyaCluster;
