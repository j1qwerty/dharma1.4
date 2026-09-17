// Email-link sign-in completion. Firebase sends an email containing a link
// back to this route; on load we complete the sign-in and redirect.
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { postLoginPath } from "../lib/auth";
import { logUX } from "../lib/analytics";

export default function AuthFinish() {
  const nav = useNavigate();
  const loc = useLocation();
  const { completeEmailSignIn, loading, isAdmin } = useAuth();
  const [err, setErr] = useState(null);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      // Pre-fill email from query string (?email=) or localStorage.
      const params = new URLSearchParams(loc.search);
      let email = params.get("email") || "";
      if (!email) {
        try { email = localStorage.getItem("dt-email-for-signin") || ""; } catch { /* ignore */ }
      }
      try {
        await completeEmailSignIn(email);
        logUX("login", { method: "email-link" });
        if (!cancelled) {
          setBusy(false);
          nav(postLoginPath(isAdmin), { replace: true });
        }
      } catch (e) {
        if (!cancelled) {
          setErr(e?.message || "Could not complete sign-in.");
          setBusy(false);
        }
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (busy || loading) {
    return (
      <div style={{ minHeight: "80vh", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, color: "var(--muted)" }}>Completing sign-in…</div>
        </div>
      </div>
    );
  }
  if (err) {
    return (
      <div style={{ minHeight: "80vh", display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <h1 style={{ fontSize: 22, fontFamily: "var(--font-display)" }}>Sign-in failed</h1>
          <p style={{ marginTop: 10, color: "var(--muted)", fontSize: 14 }}>{err}</p>
          <button
            onClick={() => nav("/auth/login", { replace: true })}
            style={{ marginTop: 16, padding: "8px 14px", borderRadius: 8, border: "1px solid var(--line)", background: "transparent", cursor: "pointer" }}
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }
  return null;
}
