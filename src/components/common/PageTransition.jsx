import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const GOLD = "#e7b631";
const RED = "#c0392b";
const MIN_VISIBLE = 1000;
const LOOP_EVERY = 1650;

function pickColor() {
  return Math.random() < 0.5 ? GOLD : RED;
}

export default function PageTransition() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(GOLD);
  const [tick, setTick] = useState(0);

  const prevLoc = useRef(location.pathname + location.search + location.hash);
  const first = useRef(true);
  const hideTimer = useRef(null);
  const loopTimer = useRef(null);
  const pollTimer = useRef(null);

  const clearAll = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (loopTimer.current) clearInterval(loopTimer.current);
    if (pollTimer.current) clearTimeout(pollTimer.current);
    hideTimer.current = null;
    loopTimer.current = null;
    pollTimer.current = null;
  };

  const scheduleHide = () => {
    const start = Date.now();
    const check = () => {
      const elapsed = Date.now() - start;
      const fallbackPresent = !!document.querySelector('[aria-label="Loading"]');
      if (fallbackPresent && elapsed < 6000) {
        pollTimer.current = setTimeout(check, 180);
        return;
      }
      if (elapsed < MIN_VISIBLE) {
        pollTimer.current = setTimeout(check, MIN_VISIBLE - elapsed);
        return;
      }
      setVisible(false);
    };
    pollTimer.current = setTimeout(check, Math.max(0, MIN_VISIBLE - 260));
  };

  useEffect(() => {
    const cur = location.pathname + location.search + location.hash;
    if (first.current) {
      first.current = false;
      prevLoc.current = cur;
      // hide any initial flash — don't show on first paint
      setVisible(false);
      return;
    }
    if (prevLoc.current === cur) return;
    prevLoc.current = cur;

    clearAll();
    setColor(pickColor());
    setTick((t) => t + 1);
    setVisible(true);
    window.scrollTo({ top: 0, behavior: "instant" });
    scheduleHide();
    return () => clearAll();
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!visible) {
      if (loopTimer.current) clearInterval(loopTimer.current);
      loopTimer.current = null;
      return;
    }
    loopTimer.current = setInterval(() => setTick((t) => t + 1), LOOP_EVERY);
    return () => {
      if (loopTimer.current) clearInterval(loopTimer.current);
      loopTimer.current = null;
    };
  }, [visible]);

  const glow = color === RED ? "rgba(192,57,43,.26)" : "rgba(231,182,49,.28)";

  return (
    <div
      className="pt-overlay"
      data-visible={visible ? "true" : "false"}
      aria-hidden={!visible}
      aria-live="polite"
      aria-busy={visible}
      style={{ "--pt-color": color, "--pt-glow": glow }}
    >
      <style>{`
        .pt-overlay{
          position: fixed; inset:0; z-index: 9999;
          display:grid; place-items:center;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          transition: opacity .38s ease, visibility .38s ease;
        }
        .pt-overlay[data-visible="false"]{ opacity:0; visibility:hidden; pointer-events:none }
        .pt-overlay[data-visible="true"]{ opacity:1; visibility:visible; pointer-events:none }

        .pt-center{
          display:flex; flex-direction:column; align-items:center; gap:12px;
          position: relative;
          padding: 10px;
        }
        .pt-hero-wrap{
          position:relative;
          width: 88px; height: 88px;
          display:grid; place-items:center;
        }
        @media(min-width:768px){
          .pt-hero-wrap{ width: 110px; height: 110px; }
        }
        .pt-glow{
          position:absolute; inset: -24%;
          background: radial-gradient(circle at 50% 50%, var(--pt-glow), transparent 68%);
          filter: blur(16px);
          pointer-events:none;
          opacity:.95;
        }
        .pt-hero{
          position:relative;
          width:100%; height:100%;
          color: var(--pt-color);
          filter: drop-shadow(0 8px 22px color-mix(in srgb, var(--pt-color) 28%, transparent))
                  drop-shadow(0 1px 6px rgba(0,0,0,.10));
        }
        .pt-hero .arm{ stroke-dasharray:1; stroke-dashoffset:1; animation: pt-draw .58s ease-out forwards; }
        .pt-hero .a2{ animation-delay:.11s }
        .pt-hero .a3{ animation-delay:.22s }
        .pt-hero .a4{ animation-delay:.33s }
        .pt-hero .tip, .pt-hero .star, .pt-hero .dot{
          opacity:0; transform-box: fill-box; transform-origin:center; transform: scale(0);
          animation: pt-pop .38s cubic-bezier(.2,1.44,.42,1) forwards;
        }
        .pt-hero .t1{ animation-delay:.54s } .pt-hero .t2{ animation-delay:.66s }
        .pt-hero .t3{ animation-delay:.78s } .pt-hero .t4{ animation-delay:.90s }
        .pt-hero .s1{ animation-delay:.80s } .pt-hero .s2{ animation-delay:.90s }
        .pt-hero .s3{ animation-delay:.98s } .pt-hero .s4{ animation-delay:1.06s }
        .pt-hero .dot{ animation-delay:1.14s }
        @keyframes pt-draw{ to{ stroke-dashoffset:0 } }
        @keyframes pt-pop{ to{ opacity:1; transform: scale(1)} }

        .pt-label{
          display:flex; flex-direction:column; align-items:center; gap:3px;
          animation: pt-fade .4s ease both; animation-delay: .95s;
        }
        .pt-brand{
          font-family: var(--font-display, "Cormorant Garamond", serif);
          font-size: 10px; font-weight:700; letter-spacing:.26em; text-transform:uppercase;
          color: var(--pt-color);
        }
        .pt-sub{
          font-size:9px; letter-spacing:.16em; text-transform:uppercase;
          color: var(--muted, #8a8378);
        }
        @keyframes pt-fade{ from{ opacity:0; transform: translateY(4px)} to{ opacity:1; transform: translateY(0)} }

        @media (prefers-reduced-motion: reduce){
          .pt-hero .arm{ animation:none; stroke-dashoffset:0 }
          .pt-hero .tip, .pt-hero .star, .pt-hero .dot{ animation:none; opacity:1; transform:scale(1) }
        }
      `}</style>

      <div className="pt-center" aria-hidden={!visible}>
        <div className="pt-hero-wrap">
          <div className="pt-glow" aria-hidden="true" />
          <svg key={tick} className="pt-hero" viewBox="0 0 120 120" aria-hidden="true" role="img">
            <g
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path className="arm a1" pathLength="1" d="M60 60 V20 H100" />
              <path className="arm a2" pathLength="1" d="M60 60 H100 V100" />
              <path className="arm a3" pathLength="1" d="M60 60 V100 H20" />
              <path className="arm a4" pathLength="1" d="M60 60 H20 V20" />
            </g>
            <g fill="currentColor">
              <path className="tip t1" d="M98.94 18.94 L101.06 21.06 L110 10 Z" />
              <path className="tip t2" d="M101.06 98.94 L98.94 101.06 L110 110 Z" />
              <path className="tip t3" d="M21.06 101.06 L18.94 98.94 L10 110 Z" />
              <path className="tip t4" d="M18.94 21.06 L21.06 18.94 L10 10 Z" />
              <path
                className="star s1"
                d="M77 36 Q77 43 84 43 Q77 43 77 50 Q77 43 70 43 Q77 43 77 36 Z"
              />
              <path
                className="star s2"
                d="M77 70 Q77 77 84 77 Q77 77 77 84 Q77 77 70 77 Q77 77 77 70 Z"
              />
              <path
                className="star s3"
                d="M43 70 Q43 77 50 77 Q43 77 43 84 Q43 77 36 77 Q43 77 43 70 Z"
              />
              <path
                className="star s4"
                d="M43 36 Q43 43 50 43 Q43 43 43 50 Q43 43 36 43 Q43 43 43 36 Z"
              />
              <circle className="dot" cx="60" cy="60" r="2.5" />
            </g>
          </svg>
        </div>
        <div className="pt-label">
          <span className="pt-brand">DharmaTribe</span>
          <span className="pt-sub">Sacred passage</span>
        </div>
      </div>
    </div>
  );
}
