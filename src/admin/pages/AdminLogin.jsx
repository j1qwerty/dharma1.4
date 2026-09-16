import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import PhoneLogin from "../../components/common/PhoneLogin";
import GoogleIcon from "../../components/common/GoogleIcon";

import { useSiteSettings, isPhoneEnabled } from "../../lib/settings";
import { maskEmail } from "../../lib/privacy";

export default function AdminLogin() {
  const { user, isAdmin, loading, configured, signInWithGoogle, signInWithEmail } = useAuth();
  const { settings } = useSiteSettings();
  const showPhone = configured && isPhoneEnabled(settings, "admin");
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/admin";

  if (!loading && user && isAdmin) { nav(from, { replace: true }); return null; }

  const goGoogle = async () => {
    setErr(null);
    try { await signInWithGoogle(); nav(from, { replace: true }); }
    catch (e) { setErr(e.message); }
  };

  const goEmail = async (e) => {
    e.preventDefault();
    setErr(null);
    try { await signInWithEmail(email, password); nav(from, { replace: true }); }
    catch (e2) { setErr(e2.message); }
  };

  return (
    <section style={{ maxWidth: 480, margin: "8vh auto", padding: 24 }}>
      <div className="eyebrow">CMS access</div>
      <h1 className="display-dt" style={{ fontSize: 40, marginTop: 8 }}>Admin login</h1>
      <p className="mt-4 text-sm leading-7 muted-dt">Sign in with an authorized Google account.</p>
      {!loading && user && !isAdmin && (
        <p style={{ color: "#b3261e", fontSize: 13 }}>Signed in as {maskEmail(user.email, "this account")} — not an admin. Ask a super-admin to add your UID.</p>
      )}
      {err && <p style={{ color: "#b3261e", fontSize: 13 }}>{err}</p>}
      <button className="btn-gold-dt mt-6 w-full" onClick={goGoogle}>
        <GoogleIcon />
        Continue with Google
      </button>
      <form onSubmit={goEmail} className="mt-6 grid gap-3">
        <div className="eyebrow">or sign in with email</div>
        <input type="email" required placeholder="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none" />
        <input type="password" required placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none" />
        <button type="submit" className="btn-ghost-dt w-full">Sign in with email</button>
      </form>
      {showPhone && (
        <div className="mt-6 border-t border-dt pt-5">
          <div className="eyebrow mb-3">or sign in with phone</div>
          <PhoneLogin onDone={() => nav(from, { replace: true })} />
        </div>
      )}
      <p className="mt-4 text-xs muted-dt"><Link to="/" className="underline">Back to site</Link></p>
    </section>
  );
}
