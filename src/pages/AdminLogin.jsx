import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function AdminLogin() {
  const { user, isAdmin, loading, signInWithGoogle } = useAuth();
  const [err, setErr] = useState(null);
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/admin";

  if (!loading && user && isAdmin) { nav(from, { replace: true }); return null; }

  const go = async () => {
    setErr(null);
    try { await signInWithGoogle(); nav(from, { replace: true }); }
    catch (e) { setErr(e.message); }
  };

  return (
    <section style={{ maxWidth: 480, margin: "8vh auto", padding: 24 }}>
      <div className="eyebrow">CMS access</div>
      <h1 className="display-dt" style={{ fontSize: 40, marginTop: 8 }}>Admin login</h1>
      <p className="mt-4 text-sm leading-7 muted-dt">Sign in with an authorized Google account. First-time UIDs must be added to Firestore <code>admins</code> (see firebase.md).</p>
      {!loading && user && !isAdmin && (
        <p style={{ color: "#b3261e", fontSize: 13 }}>Signed in as {user.email} — not an admin. Ask a super-admin to add your UID.</p>
      )}
      {err && <p style={{ color: "#b3261e", fontSize: 13 }}>{err}</p>}
      <button className="btn-gold-dt mt-6 w-full" onClick={go}>Continue with Google</button>
      <p className="mt-4 text-xs muted-dt"><Link to="/" className="underline">Back to site</Link></p>
    </section>
  );
}
