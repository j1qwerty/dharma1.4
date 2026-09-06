const stroke = "currentColor";

/* Rangoli — a symmetrical floor mandala for festivals. */
export function Rangoli({ className = "" }) {
  const petals = Array.from({ length: 8 });
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <g stroke={stroke} strokeWidth="0.9" fill="none">
        <circle cx="100" cy="100" r="90" opacity="0.5" />
        <circle cx="100" cy="100" r="76" opacity="0.7" />
        {petals.map((_, i) => {
          const a = (i / 8) * 360;
          return (
            <path
              key={`p${i}`}
              d="M100 38 C106 56 106 76 100 94 C94 76 94 56 100 38 Z"
              strokeWidth="1"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        {petals.map((_, i) => {
          const a = (i / 8) * 360 + 22.5;
          return (
            <path
              key={`ip${i}`}
              d="M100 58 C104 70 104 82 100 92 C96 82 96 70 100 58 Z"
              strokeWidth="0.8"
              opacity="0.7"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
        <circle cx="100" cy="100" r="14" strokeWidth="1.1" />
        <circle cx="100" cy="100" r="6" strokeWidth="0.9" />
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return (
            <circle
              key={`d${i}`}
              cx={100 + Math.cos(a) * 83}
              cy={100 + Math.sin(a) * 83}
              r="1.4"
              fill={stroke}
              stroke="none"
            />
          );
        })}
      </g>
    </svg>
  );
}

export default Rangoli;
