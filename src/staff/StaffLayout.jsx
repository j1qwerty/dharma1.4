// Staff console shell: top tab bar only — no sidebar by design.
// Tabs: Users / Bookings / Inquiries. Wraps pages in the shared admin theme.
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { maskEmail } from "../lib/privacy";
import PageAgentBot from "../components/common/PageAgentBot";

const TABS = [
  { to: "/staff/users", label: "Users" },
  { to: "/staff/bookings", label: "Bookings" },
  { to: "/staff/inquiries", label: "Inquiries" },
];

export default function StaffLayout() {
  const { user, adminRole, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/admin/login", { replace: true });
  };

  return (
    <div className="admin-root staff-root">
      <div className="staff-topbar">
        <div className="staff-brand">
          <span className="staff-mark" aria-hidden="true">ध</span>
          <span className="staff-brand-text">
            <span className="staff-brand-name">Staff Console</span>
            {adminRole && <span className="staff-brand-role">{adminRole}</span>}
          </span>
        </div>
        <nav className="staff-tabs" aria-label="Staff">
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              className={({ isActive }) => `staff-tab${isActive ? " active" : ""}`}
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
        <div className="staff-user">
          <span className="staff-user-email" title={user?.email || ""}>
            {maskEmail(user?.email, "staff") || "staff"}
          </span>
          <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={onLogout} type="button">
            Sign out
          </button>
        </div>
      </div>
      <div className="ad-main">
        <Outlet />
      </div>
      <PageAgentBot />
    </div>
  );
}
