// Left sidebar shell for every /admin/* page. Order comes from ADMIN_NAV
// (src/lib/content.js) so the sidebar always matches the site structure.
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ADMIN_NAV } from "../../lib/content";
import { maskEmail } from "../../lib/privacy";
import { useAuth } from "../../lib/auth";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/admin/login", { replace: true });
  };

  return (
    <>
      <style>{`.admin-shell{display:grid;grid-template-columns:240px minmax(0,1fr);min-height:80vh;gap:0}.admin-shell aside{min-width:0}.admin-shell main{min-width:0;overflow-wrap:anywhere}@media(max-width:800px){.admin-shell{grid-template-columns:1fr}.admin-shell aside{position:static !important;min-height:0 !important;border-right:none !important;border-bottom:1px solid var(--border-dt,#e8e0cf)}}`}</style>
    <div className="admin-shell">
      <aside
        style={{
          borderRight: "1px solid var(--border-dt, #e8e0cf)",
          padding: "20px 14px",
          position: "sticky",
          top: 0,
          alignSelf: "start",
          minHeight: "80vh",
        }}
      >
        <div className="eyebrow">CMS · admin</div>
        <nav style={{ display: "grid", gap: 2, marginTop: 12 }}>
          {ADMIN_NAV.map((item) => {
            const active =
              item.path === "/admin" ? loc.pathname === "/admin" : loc.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.key}
                to={item.path}
                style={{
                  padding: "9px 12px",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  background: active ? "rgba(231,182,49,.16)" : "transparent",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div style={{ marginTop: 18, padding: "0 12px" }}>
          <p className="text-[11px] muted-dt" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {maskEmail(user?.email, "admin") || "admin"}
          </p>
          <button className="underline text-xs mt-1" onClick={onLogout}>
            Sign out
          </button>
          <p className="mt-3">
            <NavLink to="/" className="underline text-xs">
              ← View site
            </NavLink>
          </p>
        </div>
      </aside>
      <div style={{ padding: "28px 28px 60px", minWidth: 0, overflow: "hidden" }}>
        <Outlet />
      </div>
    </div>
    </>
  );
}
