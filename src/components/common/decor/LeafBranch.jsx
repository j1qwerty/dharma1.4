const stroke = "currentColor";

/* A peepal / bodhi leaf branch with three leaves. */
export function LeafBranch({ className = "", flip = false }) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 360"
      fill="none"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path
        d="M110 358 C110 280 112 210 112 150 C112 110 110 70 108 36"
        stroke={stroke}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {/* main leaves */}
      <path
        d="M110 250 C70 240 40 210 30 168 C30 166 32 164 35 165 C74 176 104 206 112 246"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M112 250 C152 240 184 210 192 168 C192 166 190 164 187 165 C148 176 120 206 112 246"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M110 170 C78 162 54 138 46 102 C46 100 48 98 51 99 C82 108 106 132 112 166"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M112 170 C144 162 168 138 176 102 C176 100 174 98 171 99 C140 108 118 132 112 166"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M110 92 C90 86 76 70 72 50 C72 49 73 48 75 48 C92 52 106 66 110 88"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M112 92 C132 86 146 70 150 50 C150 49 149 48 147 48 C130 52 116 66 112 88"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      {/* vein accents */}
      <path d="M112 240 C92 232 74 214 66 190" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
      <path d="M112 240 C132 232 150 214 158 190" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
      <path d="M112 162 C98 156 86 144 80 128" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
      <path d="M112 162 C126 156 138 144 144 128" stroke={stroke} strokeWidth="0.5" opacity="0.6" />
    </svg>
  );
}

export default LeafBranch;
