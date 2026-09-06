const stroke = "currentColor";

/* Concentric mandala rings, the recurring DharmaTribe motif. */
export function MandalaRings({ className = "" }) {
  const rings = [92, 72, 52, 32];
  return (
    <svg className={className} viewBox="0 0 220 220" fill="none" aria-hidden="true">
      {rings.map((r, i) => (
        <circle key={r} cx="110" cy="110" r={r} stroke={stroke} strokeWidth={i === 0 ? 1.1 : 0.8} opacity={1 - i * 0.12} />
      ))}
      {/* petal ring */}
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        const x1 = 110 + Math.cos(a) * 52;
        const y1 = 110 + Math.sin(a) * 52;
        const x2 = 110 + Math.cos(a) * 72;
        const y2 = 110 + Math.sin(a) * 72;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="0.8" opacity="0.7" />;
      })}
      {/* inner lotus petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * 360;
        return (
          <path
            key={i}
            d="M110 86 C114 76 114 64 110 54 C106 64 106 76 110 86 Z"
            stroke={stroke}
            strokeWidth="0.8"
            opacity="0.8"
            transform={`rotate(${a} 110 110)`}
          />
        );
      })}
      <circle cx="110" cy="110" r="6" stroke={stroke} strokeWidth="0.9" />
    </svg>
  );
}

export default MandalaRings;
