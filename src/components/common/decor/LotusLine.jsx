const stroke = "currentColor";

/* A delicate lotus outline, stem rising. */
export function LotusLine({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 240 200" fill="none" aria-hidden="true">
      <path
        d="M120 192 C120 150 120 120 120 96"
        stroke={stroke}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M120 96 C86 92 52 70 30 40 C29 38 31 36 33 37 C66 48 98 70 120 96 Z"
        stroke={stroke}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M120 96 C154 92 188 70 210 40 C211 38 209 36 207 37 C174 48 142 70 120 96 Z"
        stroke={stroke}
        strokeWidth="1"
        strokeLinejoin="round"
      />
      <path
        d="M120 100 C104 96 92 80 84 60 C83 58 85 56 87 57 C102 62 114 78 120 98 Z"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M120 100 C136 96 148 80 156 60 C157 58 155 56 153 57 C138 62 126 78 120 98 Z"
        stroke={stroke}
        strokeWidth="0.9"
        strokeLinejoin="round"
      />
      <path
        d="M120 104 C112 102 106 94 102 84 C101 83 102 82 104 82 C112 84 118 92 120 102 Z"
        stroke={stroke}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      <path
        d="M120 104 C128 102 134 94 138 84 C139 83 138 82 136 82 C128 84 122 92 120 102 Z"
        stroke={stroke}
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
      {/* water line */}
      <path
        d="M40 188 C70 182 96 192 120 188 C144 184 168 192 200 186"
        stroke={stroke}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export default LotusLine;
