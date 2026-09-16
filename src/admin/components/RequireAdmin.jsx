import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth";

export default function RequireAdmin({ children }) {
  const { user, isAdmin, loading, configured } = useAuth();
  const loc = useLocation();
  if (loading) {
    return (
      <div className="admin-root" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div className="ad-spinner" />
      </div>
    );
  }
  if (!configured) {
    return (
      <div className="admin-root" style={{ padding: 40, maxWidth: 640, margin: "0 auto" }}>
        <div className="ad-eyebrow">Setup required</div>
        <h1 className="ad-page-title" style={{ fontSize: 28, marginTop: 8 }}>Firebase not configured</h1>
        <p className="ad-page-sub" style={{ marginTop: 12 }}>
          Add <code className="ad-code">VITE_FIREBASE_*</code> to <code className="ad-code">.env.local</code>
          (see <code className="ad-code">firebase.md</code>) to enable the admin console.
        </p>
      </div>
    );
  }
  if (!user || !isAdmin) return <Navigate to="/admin/login" state={{ from: loc.pathname }} replace />;
  return children;
}
