const stroke = "currentColor";

/* A south-Indian gopuram / temple arch silhouette outline. */
export function TempleArch({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 300 360" fill="none" aria-hidden="true">
      <path d="M150 8 L150 0 M150 8 C150 8 150 14 150 22" stroke={stroke} strokeWidth="0.9" />
      <path
        d="M150 22 C120 22 100 44 100 80 L100 350 L200 350 L200 80 C200 44 180 22 150 22 Z"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M150 22 C132 22 118 38 118 66 L118 350 L182 350 L182 66 C182 38 168 22 150 22 Z"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinejoin="round"
        opacity="0.8"
      />
      {/* tiered roof lines */}
      <path d="M86 80 L214 80" stroke={stroke} strokeWidth="0.8" opacity="0.7" />
      <path d="M96 132 L204 132" stroke={stroke} strokeWidth="0.8" opacity="0.6" />
      <path d="M104 184 L196 184" stroke={stroke} strokeWidth="0.8" opacity="0.5" />
      <path d="M112 236 L188 236" stroke={stroke} strokeWidth="0.8" opacity="0.45" />
      <path d="M120 288 L180 288" stroke={stroke} strokeWidth="0.8" opacity="0.4" />
      {/* kalash finial */}
      <path
        d="M150 4 C146 4 144 7 144 11 C144 14 147 16 150 16 C153 16 156 14 156 11 C156 7 154 4 150 4 Z"
        stroke={stroke}
        strokeWidth="0.9"
      />
    </svg>
  );
}

export default TempleArch;
