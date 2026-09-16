import React from "react";

let _medId = 0;

/**
 * SacredMedallion
 *
 * Premium sacred gold medallion featuring:
 * - Heavy braided outer rim
 * - Beaded inner rim
 * - Radial sun rays
 * - Four ornamental gemstones
 * - Ornate traditional diya
 * - Layered glowing flame
 * - Subtle flowing wind strokes
 * - Warm sacred aura
 *
 * No text / Om glyph.
 */
export function SacredMedallion({
  size = 120,
  className = "",
  glow = true,
  rays = true,
}) {
  const uid = React.useId
    ? React.useId().replace(/:/g, "")
    : `m${++_medId}`;

  const ids = {
    face: `sm-face-${uid}`,
    rim: `sm-rim-${uid}`,
    rope: `sm-rope-${uid}`,
    inner: `sm-inner-${uid}`,
    diya: `sm-diya-${uid}`,
    diyaLight: `sm-diya-light-${uid}`,
    flame: `sm-flame-${uid}`,
    flameInner: `sm-flame-inner-${uid}`,
    aura: `sm-aura-${uid}`,
    ray: `sm-ray-${uid}`,
    shadow: `sm-shadow-${uid}`,
    wind: `sm-wind-${uid}`,
    windGlow: `sm-wind-glow-${uid}`,
  };

  const center = 60;

  const polar = (radius, angle) => {
    const a = (angle * Math.PI) / 180;

    return {
      x: center + Math.cos(a) * radius,
      y: center + Math.sin(a) * radius,
    };
  };

  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      {glow && (
        <span
          style={{
            position: "absolute",
            inset: "-32%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,210,82,.5) 0%, rgba(255,176,35,.22) 38%, transparent 72%)",
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />
      )}

      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "relative",
          display: "block",
          overflow: "visible",
        }}
      >
        <defs>
          {/* Main medallion face */}
          <radialGradient
            id={ids.face}
            cx="36%"
            cy="28%"
            r="78%"
          >
            <stop offset="0%" stopColor="#FFF8DB" />
            <stop offset="22%" stopColor="#F9E49A" />
            <stop offset="48%" stopColor="#EFC457" />
            <stop offset="72%" stopColor="#D69720" />
            <stop offset="100%" stopColor="#895A0B" />
          </radialGradient>

          {/* Dark outer depth */}
          <radialGradient
            id={ids.rim}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop
              offset="72%"
              stopColor="rgba(255,244,198,0)"
            />
            <stop
              offset="86%"
              stopColor="rgba(135,88,7,.3)"
            />
            <stop
              offset="94%"
              stopColor="rgba(108,67,4,.72)"
            />
            <stop
              offset="100%"
              stopColor="rgba(52,30,2,.96)"
            />
          </radialGradient>

          {/* Braided gold */}
          <linearGradient
            id={ids.rope}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#FFF4C8" />
            <stop offset="20%" stopColor="#F4CC65" />
            <stop offset="48%" stopColor="#C98A17" />
            <stop offset="72%" stopColor="#87570B" />
            <stop offset="100%" stopColor="#E7B946" />
          </linearGradient>

          {/* Inner surface */}
          <radialGradient
            id={ids.inner}
            cx="50%"
            cy="38%"
            r="68%"
          >
            <stop
              offset="0%"
              stopColor="#FFF2B1"
              stopOpacity=".5"
            />
            <stop
              offset="35%"
              stopColor="#EBC45E"
              stopOpacity=".2"
            />
            <stop
              offset="100%"
              stopColor="#9E6810"
              stopOpacity=".08"
            />
          </radialGradient>

          {/* Diya bowl */}
          <linearGradient
            id={ids.diya}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#FFF1A7" />
            <stop offset="22%" stopColor="#F0C653" />
            <stop offset="55%" stopColor="#D58E18" />
            <stop offset="82%" stopColor="#9B610A" />
            <stop offset="100%" stopColor="#684007" />
          </linearGradient>

          {/* Bowl highlight */}
          <linearGradient
            id={ids.diyaLight}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFFFFF"
              stopOpacity=".68"
            />
            <stop
              offset="32%"
              stopColor="#FFF2B1"
              stopOpacity=".25"
            />
            <stop
              offset="100%"
              stopColor="#FFFFFF"
              stopOpacity="0"
            />
          </linearGradient>

          {/* Main flame */}
          <linearGradient
            id={ids.flame}
            x1="0"
            y1="1"
            x2="0"
            y2="0"
          >
            <stop offset="0%" stopColor="#FF8B08" />
            <stop offset="30%" stopColor="#FFB51E" />
            <stop offset="58%" stopColor="#FFD95B" />
            <stop offset="82%" stopColor="#FFF0AD" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Inner flame */}
          <linearGradient
            id={ids.flameInner}
            x1="0"
            y1="1"
            x2="0"
            y2="0"
          >
            <stop offset="0%" stopColor="#FFE061" />
            <stop offset="55%" stopColor="#FFF4BF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Flame aura */}
          <radialGradient id={ids.aura}>
            <stop
              offset="0%"
              stopColor="#FFE98A"
              stopOpacity=".85"
            />
            <stop
              offset="42%"
              stopColor="#FFB31B"
              stopOpacity=".3"
            />
            <stop
              offset="100%"
              stopColor="#FF8A00"
              stopOpacity="0"
            />
          </radialGradient>

          {/* Rays */}
          <linearGradient
            id={ids.ray}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="#FFF0AA"
              stopOpacity=".82"
            />
            <stop
              offset="100%"
              stopColor="#93600E"
              stopOpacity=".12"
            />
          </linearGradient>

          {/* Wind */}
          <linearGradient
            id={ids.wind}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#FFF4B7"
              stopOpacity="0"
            />
            <stop
              offset="30%"
              stopColor="#FFE88A"
              stopOpacity=".8"
            />
            <stop
              offset="100%"
              stopColor="#FFF3B6"
              stopOpacity="0"
            />
          </linearGradient>

          {/* Wind glow */}
          <linearGradient
            id={ids.windGlow}
            x1="0"
            y1="0"
            x2="1"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="#FFD75A"
              stopOpacity="0"
            />
            <stop
              offset="45%"
              stopColor="#FFD75A"
              stopOpacity=".35"
            />
            <stop
              offset="100%"
              stopColor="#FFD75A"
              stopOpacity="0"
            />
          </linearGradient>

          {/* Shadow */}
          <filter
            id={ids.shadow}
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feDropShadow
              dx="0"
              dy="3"
              stdDeviation="2.4"
              floodColor="#6A4204"
              floodOpacity=".45"
            />
          </filter>
        </defs>

        {/* -------------------------------------------------
            OUTER AURA
        ------------------------------------------------- */}

        {glow && (
          <circle
            cx="60"
            cy="60"
            r="58"
            fill={`url(#${ids.aura})`}
            opacity=".35"
          />
        )}

        {/* -------------------------------------------------
            SUN RAYS
        ------------------------------------------------- */}

        {rays &&
          Array.from({ length: 32 }).map((_, i) => {
            const angle = (i / 32) * 360;

            const p1 = polar(49, angle);
            const p2 = polar(
              i % 2 === 0 ? 56 : 54,
              angle
            );

            return (
              <line
                key={`ray-${i}`}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={`url(#${ids.ray})`}
                strokeWidth={
                  i % 2 === 0 ? 0.75 : 0.45
                }
                strokeLinecap="round"
              />
            );
          })}

        {/* -------------------------------------------------
            MAIN MEDALLION
        ------------------------------------------------- */}

        <circle
          cx="60"
          cy="60"
          r="51"
          fill={`url(#${ids.face})`}
          filter={`url(#${ids.shadow})`}
        />

        <circle
          cx="60"
          cy="60"
          r="51"
          fill={`url(#${ids.rim})`}
        />

        {/* -------------------------------------------------
            BRAIDED OUTER RIM
        ------------------------------------------------- */}

        {Array.from({ length: 28 }).map((_, i) => {
          const a1 = (i / 28) * 360;
          const a2 = ((i + 0.55) / 28) * 360;

          const p1 = polar(47.3, a1);
          const p2 = polar(47.3, a2);

          return (
            <path
              key={`rope-${i}`}
              d={`
                M ${p1.x} ${p1.y}
                A 47.3 47.3 0 0 1 ${p2.x} ${p2.y}
              `}
              stroke={`url(#${ids.rope})`}
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity={i % 2 === 0 ? 0.96 : 0.55}
            />
          );
        })}

        {/* -------------------------------------------------
            BEADED INNER RING
        ------------------------------------------------- */}

        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * 360;
          const p = polar(41.4, angle);

          return (
            <circle
              key={`bead-${i}`}
              cx={p.x}
              cy={p.y}
              r=".82"
              fill="rgba(102,66,7,.7)"
            />
          );
        })}

        <circle
          cx="60"
          cy="60"
          r="39"
          stroke="rgba(103,67,8,.56)"
          strokeWidth=".8"
        />

        <circle
          cx="60"
          cy="60"
          r="37"
          fill={`url(#${ids.inner})`}
        />

        {/* -------------------------------------------------
            FOUR CARDINAL JEWEL ORNAMENTS
        ------------------------------------------------- */}

        {[0, 90, 180, 270].map((angle) => {
          const p = polar(47.8, angle);

          return (
            <g
              key={`gem-${angle}`}
              transform={`
                translate(${p.x} ${p.y})
                rotate(${angle})
              `}
            >
              <path
                d="
                  M 0 -5.5
                  L 4.3 0
                  L 0 5.5
                  L -4.3 0
                  Z
                "
                fill={`url(#${ids.diya})`}
                stroke="rgba(104,64,5,.9)"
                strokeWidth=".8"
              />

              <path
                d="
                  M 0 -4.3
                  L 2.2 0
                  L 0 0
                  Z
                "
                fill="#FFF7C9"
                opacity=".75"
              />

              <circle
                cx="0"
                cy="0"
                r=".8"
                fill="#FFF5AA"
              />
            </g>
          );
        })}

        {/* -------------------------------------------------
            DECORATIVE INNER ARCHES
        ------------------------------------------------- */}

        <path
          d="
            M 31 48
            C 35 33 48 24 60 24
            C 72 24 85 33 89 48
          "
          stroke="rgba(111,70,7,.38)"
          strokeWidth=".65"
        />

        <path
          d="
            M 31 72
            C 35 87 48 96 60 96
            C 72 96 85 87 89 72
          "
          stroke="rgba(111,70,7,.25)"
          strokeWidth=".65"
        />

        {/* -------------------------------------------------
            FLAME AURA
        ------------------------------------------------- */}

        <ellipse
          cx="60"
          cy="45"
          rx="21"
          ry="25"
          fill={`url(#${ids.aura})`}
          opacity=".8"
        />

        {/* -------------------------------------------------
            WIND — BACK LAYER
        ------------------------------------------------- */}

        <g opacity=".6">
          <path
            d="
              M 34 44
              C 39 40 44 40 47 42
              C 51 45 55 44 58 40
            "
            stroke={`url(#${ids.windGlow})`}
            strokeWidth="1.1"
            strokeLinecap="round"
          />

          <path
            d="
              M 81 47
              C 76 44 72 45 69 48
              C 66 51 63 51 60 48
            "
            stroke={`url(#${ids.windGlow})`}
            strokeWidth=".85"
            strokeLinecap="round"
          />
        </g>

        {/* -------------------------------------------------
            DIYA FLAME
        ------------------------------------------------- */}

        <g>
          {/* Outer flame */}
          <path
            d="
              M 60 56

              C 51 53
                49 47
                53 42

              C 55 39
                59 36
                58 29

              C 65 35
                69 40
                67 45

              C 66 49
                64 53
                60 56

              Z
            "
            fill={`url(#${ids.flame})`}
            stroke="rgba(116,68,3,.4)"
            strokeWidth=".55"
          />

          {/* Flame white/gold core */}
          <path
            d="
              M 60 53

              C 55 50
                55 46
                58 42

              C 60 40
                61 38
                60 35

              C 64 40
                65 44
                64 47

              C 64 50
                62 52
                60 53

              Z
            "
            fill={`url(#${ids.flameInner})`}
          />

          {/* Bright flame center */}
          <ellipse
            cx="60"
            cy="47"
            rx="2.8"
            ry="6"
            fill="#FFFCE6"
            opacity=".85"
          />

          {/* Flame highlight */}
          <path
            d="
              M 59 38
              C 57.7 42
                58.2 45
                59.5 47
            "
            stroke="#FFFFFF"
            strokeWidth=".9"
            strokeLinecap="round"
            opacity=".75"
          />
        </g>

        {/* -------------------------------------------------
            WICK
        ------------------------------------------------- */}

        <path
          d="
            M 60 57
            C 59.4 54.8
              59.7 53.2
              60.4 51.8
          "
          stroke="#704305"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* -------------------------------------------------
            DIYA BOWL
        ------------------------------------------------- */}

        <g filter={`url(#${ids.shadow})`}>
          {/* Back lip */}
          <ellipse
            cx="60"
            cy="57.5"
            rx="18.5"
            ry="4.1"
            fill={`url(#${ids.diya})`}
            stroke="rgba(102,61,4,.85)"
            strokeWidth=".85"
          />

          {/* Bowl body */}
          <path
            d="
              M 40 57

              C 42 66
                48 72
                60 74

              C 72 72
                78 66
                80 57

              C 73 61
                47 61
                40 57

              Z
            "
            fill={`url(#${ids.diya})`}
            stroke="rgba(101,61,4,.88)"
            strokeWidth=".85"
          />

          {/* Upper gold lip */}
          <path
            d="
              M 40 57
              C 48 60
                72 60
                80 57
            "
            stroke="#FFE58A"
            strokeWidth="1.35"
            strokeLinecap="round"
            opacity=".8"
          />

          {/* Bowl highlight */}
          <path
            d="
              M 44 59
              C 47 65
                51 68
                56 69
            "
            stroke={`url(#${ids.diyaLight})`}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity=".65"
          />

          {/* Bowl engraved band */}
          <path
            d="
              M 45 66
              C 51 69
                69 69
                75 66
            "
            stroke="rgba(103,62,4,.52)"
            strokeWidth=".65"
          />

          {/* Small decorative dots */}
          {[48, 54, 60, 66, 72].map((x, i) => (
            <circle
              key={`bowl-dot-${i}`}
              cx={x}
              cy={67.1}
              r=".65"
              fill="#FFE292"
              opacity=".72"
            />
          ))}
        </g>

        {/* -------------------------------------------------
            DIYA BASE
        ------------------------------------------------- */}

        <path
          d="
            M 48 73
            C 51 77
              55 79
              60 79

            C 65 79
              69 77
              72 73
          "
          stroke="rgba(104,63,5,.72)"
          strokeWidth=".9"
        />

        <path
          d="
            M 51 76
            C 53 80
              56 82
              60 82

            C 64 82
              67 80
              69 76
          "
          fill={`url(#${ids.diya})`}
          stroke="rgba(105,64,5,.75)"
          strokeWidth=".8"
        />

        <ellipse
          cx="60"
          cy="81.5"
          rx="9"
          ry="2.2"
          fill="rgba(114,69,5,.28)"
        />

        {/* -------------------------------------------------
            FRONT WIND — LIGHTER, CLOSER TO FLAME
        ------------------------------------------------- */}

        <g>
          <path
            d="
              M 29 49
              C 36 46
                42 47
                47 50

              C 50 52
                53 52
                56 50
            "
            stroke={`url(#${ids.wind})`}
            strokeWidth=".9"
            strokeLinecap="round"
            opacity=".75"
          />

          <path
            d="
              M 92 51
              C 85 48
                79 49
                75 52

              C 72 54
                69 54
                67 52
            "
            stroke={`url(#${ids.wind})`}
            strokeWidth=".72"
            strokeLinecap="round"
            opacity=".62"
          />

          <path
            d="
              M 32 54
              C 38 52
                42 53
                45 55
            "
            stroke={`url(#${ids.wind})`}
            strokeWidth=".55"
            strokeLinecap="round"
            opacity=".48"
          />
        </g>

        {/* -------------------------------------------------
            DECORATIVE FLAME SPARKS
        ------------------------------------------------- */}

        {[
          [52, 32, 0.8],
          [69, 34, 0.65],
          [48, 41, 0.5],
          [73, 43, 0.45],
        ].map(([x, y, r], i) => (
          <g key={`spark-${i}`}>
            <circle
              cx={x}
              cy={y}
              r={r}
              fill="#FFF0A0"
              opacity=".8"
            />

            <circle
              cx={x}
              cy={y}
              r={r * 2.5}
              fill="#FFD65C"
              opacity=".08"
            />
          </g>
        ))}

        {/* -------------------------------------------------
            TOP HIGHLIGHT
        ------------------------------------------------- */}

        <ellipse
          cx="45"
          cy="32"
          rx="20"
          ry="10"
          fill="#FFFFFF"
          opacity=".12"
          transform="rotate(-18 45 32)"
        />

        {/* Fine inner circle */}
        <circle
          cx="60"
          cy="60"
          r="34"
          stroke="rgba(111,70,7,.25)"
          strokeWidth=".55"
        />
      </svg>
    </span>
  );
}

export default SacredMedallion;