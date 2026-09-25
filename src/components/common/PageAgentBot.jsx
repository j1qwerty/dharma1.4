// Floating launcher for the PageAgent AI assistant (bottom-right).
// The demo bot ships a Chinese-first panel, so instead of auto-starting it
// we show our own animated button. Clicking opens a card with a two-line
// description (English + Hindi); Start boots the bot in the site language
// (bot supports en-US/zh-CN only — Hindi maps to English, see lib/pageAgent).
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageToggle";
import {
  PAGEAGENT_VISIBILITY_EVENT,
  hidePageAgentCompletely,
  isPageAgentHidden,
  isPageAgentReady,
  startPageAgent,
  stopPageAgent,
} from "../../lib/pageAgent";

function BotSvg({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="pa-bot-head" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b2b40" />
          <stop offset="1" stopColor="#12121c" />
        </linearGradient>
      </defs>
      <path d="M12 9V5.5" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="4" r="1.6" fill="#a78bfa" />
      <circle cx="18.6" cy="5.4" r="1.1" fill="#7dd3fc" />
      <path d="M18.6 7.2v1.6M17.8 8h1.6" stroke="#7dd3fc" strokeWidth="1" strokeLinecap="round" />
      <rect x="4" y="9" width="16" height="11" rx="5.5" fill="url(#pa-bot-head)" stroke="#8b5cf6" strokeWidth="1.4" />
      <ellipse cx="9.3" cy="13.4" rx="1.7" ry="2" fill="#7dd3fc" />
      <ellipse cx="14.7" cy="13.4" rx="1.7" ry="2" fill="#7dd3fc" />
      <circle cx="9.3" cy="13.2" r="0.55" fill="#0b0b14" />
      <circle cx="14.7" cy="13.2" r="0.55" fill="#0b0b14" />
      <path d="M9.4 16.8c1.7 1 3.5 1 5.2 0" stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function PageAgentBot() {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(null);
  const [hidden, setHidden] = useState(() => isPageAgentHidden());
  const wrapRef = useRef(null);

  // Re-render when visibility changes (Hide button here or Settings toggle).
  useEffect(() => {
    const sync = () => setHidden(isPageAgentHidden());
    window.addEventListener(PAGEAGENT_VISIBILITY_EVENT, sync);
    return () => window.removeEventListener(PAGEAGENT_VISIBILITY_EVENT, sync);
  }, []);

  // Click-outside closes the description card (button stays put).
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      try {
        if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
      } catch { /* ignore */ }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [open]);

  const onStart = () => {
    setError(null);
    try {
      startPageAgent(lang);
      setStarted(true);
      setOpen(false);
    } catch (e) {
      setError(e?.message || "Could not start the assistant.");
    }
  };

  const onStop = () => {
    stopPageAgent();
    setStarted(false);
  };

  const onHide = () => {
    hidePageAgentCompletely();
    setStarted(false);
    setOpen(false);
  };

  // Hidden flag suppresses the launcher everywhere until re-enabled
  // via the header assistant toggle (or Admin → Settings).
  if (hidden) return null;

  return (
    <div
      ref={wrapRef}
      style={{ position: "fixed", right: 20, top: 96, zIndex: 55, display: "flex", flexDirection: "column", alignItems: "flex-end" }}
    >
      <style>{`@keyframes pa-pulse{0%{box-shadow:0 0 14px 2px rgba(139,92,246,.65),0 0 0 0 rgba(139,92,246,.5)}70%{box-shadow:0 0 18px 4px rgba(139,92,246,.65),0 0 0 14px rgba(139,92,246,0)}100%{box-shadow:0 0 14px 2px rgba(139,92,246,.65),0 0 0 0 rgba(139,92,246,0)}}@keyframes pa-floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
      <button
        onClick={() => { setError(null); setOpen((v) => !v); }}
        aria-label={hi ? "एआई सहायक खोलें" : "Open AI assistant"}
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 12px 7px 9px",
          borderRadius: 999,
          cursor: "pointer",
          color: "#fff",
          background: "linear-gradient(135deg,#23233a 0%,#12121c 100%)",
          border: "1px solid rgba(139,92,246,.7)",
          animation: "pa-pulse 2.2s ease-out infinite, pa-floaty 3s ease-in-out infinite",
        }}
      >
        <BotSvg size={18} />
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em" }}>AI</span>
      </button>
      {open && (
        <div
          className="panel-dt p-5"
          style={{ width: 300, maxWidth: "calc(100vw - 40px)", marginTop: 12, boxShadow: "0 24px 60px rgba(23,20,15,.22)" }}
          role="dialog"
          aria-label={hi ? "एआई सहायक" : "AI assistant"}
        >
          <div className="eyebrow">{hi ? "एआई सहायक" : "AI assistant"}</div>
          <p className="text-sm mt-2">
            {hi
              ? "यह बॉट आपके लिए इस पेज पर कार्य करता है — पूजा खोजना, फॉर्म भरना, बुकिंग में मदद। शुरू करने के लिए Start दबाएँ।"
              : "This bot performs tasks for you right on this page — finding pujas, filling forms, helping with booking. Press Start to launch it."}
          </p>
          {error && <p className="text-xs mt-2" style={{ color: "#b3261e" }}>{error}</p>}
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {!started ? (
              <button className="btn-gold-dt text-xs" onClick={onStart} style={{ cursor: "pointer" }}>
                {hi ? "Start करें" : "Start"}
              </button>
            ) : (
              <>
                <button className="btn-gold-dt text-xs" onClick={onStart} style={{ cursor: "pointer" }}>
                  {hi ? "बॉट खोलें" : "Open bot"}
                </button>
                <button className="btn-ghost-dt text-xs" onClick={onStop} style={{ cursor: "pointer" }}>
                  {hi ? "बंद करें" : "Stop"}
                </button>
              </>
            )}
            <button
              className="btn-ghost-dt text-xs"
              onClick={onHide}
              style={{ cursor: "pointer" }}
              title={hi ? "असिस्टेंट छिपाएँ" : "Hide assistant"}
            >
              {hi ? "छिपाएँ" : "Hide"}
            </button>
          </div>
          {!isPageAgentReady() && (
            <p className="text-[11px] muted-dt mt-2">
              {hi
                ? "नोट: असिस्टेंट स्क्रिप्ट लोड नहीं हुई (ब्लॉकर cdn.jsdelivr.net को रोक रहा हो तो अनुमति दें)।"
                : "Note: assistant script not loaded yet (allow cdn.jsdelivr.net if your blocker stops it)."}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
