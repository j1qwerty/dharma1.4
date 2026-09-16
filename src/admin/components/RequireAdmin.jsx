import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth";

export default function RequireAdmin({ children }) {
  const { user, isAdmin, loading, configured } = useAuth();
  const loc = useLocation();
  if (loading) return <div style={{ minHeight: "50vh", display: "grid", placeItems: "center" }}>Checking access…</div>;
  if (!configured) return <div style={{ padding: 32 }}>Firebase not configured — add VITE_FIREBASE_* to .env.local (see firebase.md).</div>;
  if (!user || !isAdmin) return <Navigate to="/admin/login" state={{ from: loc.pathname }} replace />;
  return children;
}
