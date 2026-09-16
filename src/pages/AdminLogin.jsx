import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import PhoneLogin from "../components/common/PhoneLogin";

export default function AdminLogin() {
  const { user, isAdmin, loading, signInWithGoogle, signInWithEmail } = useAuth();
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
      <p className="mt-4 text-sm leading-7 muted-dt">Sign in with an authorized Google account. First-time UIDs must be added to Firestore <code>admins</code> (see firebase.md).</p>
      {!loading && user && !isAdmin && (
        <p style={{ color: "#b3261e", fontSize: 13 }}>Signed in as {user.email} — not an admin. Ask a super-admin to add your UID.</p>
      )}
      {err && <p style={{ color: "#b3261e", fontSize: 13 }}>{err}</p>}
      <button className="btn-gold-dt mt-6 w-full" onClick={goGoogle}>
        <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.16 3.57-8.81z"/>
          <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24z"/>
          <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1z"/>
          <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.22 6.88 8.87 4.77 12 4.77z"/>
        </svg>
        Continue with Google
      </button>
      <form onSubmit={goEmail} className="mt-6 grid gap-3">
        <div className="eyebrow">or sign in with email</div>
        <input type="email" required placeholder="admin@dharmatribe.com" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none" />
        <input type="password" required placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 rounded-xl border border-dt bg-transparent px-3 text-sm outline-none" />
        <button type="submit" className="btn-ghost-dt w-full">Sign in with email</button>
      </form>
      <div className="mt-6 border-t border-dt pt-5">
        <div className="eyebrow mb-3">or sign in with phone</div>
        <PhoneLogin onDone={() => nav(from, { replace: true })} />
      </div>
      <p className="mt-4 text-xs muted-dt"><Link to="/" className="underline">Back to site</Link></p>
    </section>
  );
}
