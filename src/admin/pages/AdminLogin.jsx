import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { isSuperAdmin } from "../../lib/roles";
import PhoneLogin from "../../components/common/PhoneLogin";
import GoogleIcon from "../../components/common/GoogleIcon";

import { useSiteSettings, isPhoneEnabled } from "../../lib/settings";
import { maskEmail } from "../../lib/privacy";

export default function AdminLogin() {
  const { user, isAdmin, adminRole, loading, configured, signInWithGoogle, signInWithEmail } = useAuth();
  const { settings } = useSiteSettings();
  const showPhone = configured && isPhoneEnabled(settings, "admin");
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/admin";
  // Super-admins land in the CMS console; staff (admin role) in the staff console.
  const landing = isSuperAdmin(adminRole) ? from : "/staff";

  if (!loading && user && isAdmin) { nav(landing, { replace: true }); return null; }

  // Landing is decided by the render guard below, which runs after the
  // auth listener has resolved adminRole (avoids routing on a stale role).
  const goGoogle = async () => {
    setErr(null);
    try { await signInWithGoogle(); }
    catch (e) { setErr(e.message); }
  };

  const goEmail = async (e) => {
    e.preventDefault();
    setErr(null);
    try { await signInWithEmail(email, password); }
    catch (e2) { setErr(e2.message); }
  };

  return (
    <div className="admin-root ad-login-shell">
      {/* Left brand panel (hidden on small screens) */}
      <aside className="ad-login-aside">
        <div className="ad-login-aside-brand">
          <div className="ad-login-aside-mark" aria-hidden="true">ध</div>
          <div>
            <div className="ad-login-aside-name">Dharma</div>
            <div className="ad-login-aside-sub">CMS Console</div>
          </div>
        </div>

        <div>
          <p className="ad-login-quote">
            “यदाहं जात आसमित्थं प्राच्यतामनुपूर्वशः।
            यदाहं प्राच्यतेऽनेन तदाहं जात उच्यते॥”
          </p>
          <p className="ad-login-quote-source">— Taittirīya Āraṇyaka</p>
        </div>

        <div className="ad-login-aside-foot">
          Authorised personnel only · All actions are versioned
        </div>
      </aside>

      {/* Right form side */}
      <div className="ad-login-form-side">
        <div className="ad-login-card">
          <div className="ad-eyebrow">Sign in</div>
          <h1 className="ad-login-title">Admin access</h1>
          <p className="ad-login-sub">
            Use an authorised Google account, or your email + password. Access is restricted
            to accounts listed in the <code className="ad-code">admins</code> collection.
          </p>

          {!loading && user && !isAdmin && (
            <p className="ad-login-err">
              Signed in as {maskEmail(user.email, "this account")} — not an admin. Ask a super-admin to add your UID.
            </p>
          )}
          {err && <p className="ad-login-err">{err}</p>}

          <button className="ad-btn ad-btn-gold ad-btn-block" style={{ marginTop: 22, padding: "11px 16px" }} onClick={goGoogle}>
            <GoogleIcon />
            Continue with Google
          </button>

          <div className="ad-login-divider">or sign in with email</div>

          <form onSubmit={goEmail} style={{ display: "grid", gap: 12 }}>
            <input
              type="email"
              required
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ad-input"
              autoComplete="email"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ad-input"
              autoComplete="current-password"
            />
            <button type="submit" className="ad-btn ad-btn-ghost ad-btn-block" style={{ padding: "11px 16px" }}>
              Sign in with email
            </button>
          </form>

          {showPhone && (
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--adm-line)" }}>
              <div className="ad-login-divider" style={{ marginTop: 0 }}>or sign in with phone</div>
              <PhoneLogin onDone={() => { /* render guard above routes on role */ }} />
            </div>
          )}

          <p style={{ marginTop: 24, fontSize: 12, color: "var(--adm-muted)", textAlign: "center" }}>
            <Link to="/" className="ad-side-action" style={{ display: "inline-flex", color: "var(--adm-muted)", justifyContent: "center" }}>
              ← Back to site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
