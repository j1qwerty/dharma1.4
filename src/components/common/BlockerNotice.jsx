// Blocker notice — detects content blockers (uBlock Origin, Brave Shields…)
// by probing a Google Analytics host. When blocked, shows a dismissible
// banner suggesting the user allow the site or try a clean browser.
// The site itself works fine without analytics (see src/lib/analytics.js);
// this banner only explains why, so users don't stare at a "limited" app.
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageToggle";

const DISMISS_KEY = "dt-blocker-dismissed";
const MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || null;
// Kill-switch for the top banner. false = never shown on any browser.
const SHOW_BLOCKER_NOTICE = false;

function probeBlocked(timeoutMs = 5000) {
  return new Promise((resolve) => {
    let done = false;
    const finish = (blocked) => {
      if (done) return;
      done = true;
      resolve(blocked);
    };
    const timer = setTimeout(() => finish(true), timeoutMs);
    try {
      fetch(`https://www.google-analytics.com/g/collect?v=2&tid=${MEASUREMENT_ID || "G-XXXX"}`, {
        method: "POST",
        mode: "no-cors",
        cache: "no-store",
        keepalive: false,
        body: "en=probe",
      }).then(() => {
        clearTimeout(timer);
        finish(false);
      }).catch(() => {
        clearTimeout(timer);
        finish(true);
      });
    } catch {
      clearTimeout(timer);
      finish(true);
    }
  });
}

export default function BlockerNotice() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);
  const hi = lang === "hi";

  useEffect(() => {
    if (!MEASUREMENT_ID) return; // analytics dormant — nothing to warn about
    let cancelled = false;
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") return;
    } catch { /* ignore */ }
    probeBlocked().then((blocked) => {
      if (!cancelled && blocked) setVisible(true);
    });
    return () => { cancelled = true; };
  }, []);

  // Hidden per request 2026-09-17 — never shown on any browser.
  // Code kept: re-enable by setting SHOW_BLOCKER_NOTICE to true.
  if (!SHOW_BLOCKER_NOTICE || !visible) return null;

  const dismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, "1"); } catch { /* ignore */ }
    setVisible(false);
  };

  return (
    <div
      role="status"
      style={{
        background: "#17140f",
        color: "#f8f1e3",
        fontSize: 12,
        padding: "10px 16px",
        display: "flex",
        gap: 12,
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        position: "relative",
        zIndex: 60,
      }}
    >
      <span>
        {hi
          ? "लगता है कोई कंटेंट ब्लॉकर (जैसे uBlock) सक्रिय है। साइट चलती रहेगी, पर पूर्ण अनुभव के लिए इस साइट को ब्लॉकर में अनुमति दें या बिना एक्सटेंशन वाला Chrome आज़माएँ।"
          : "Looks like a content blocker (e.g. uBlock) is active. The site keeps working, but for the full experience please allow this site in your blocker or try Chrome without extensions."}
      </span>
      <button
        onClick={dismiss}
        className="btn-gold-dt"
        style={{ padding: "6px 14px", cursor: "pointer" }}
      >
        {hi ? "समझ गया" : "Got it"}
      </button>
    </div>
  );
}
