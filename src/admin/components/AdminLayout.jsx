// Admin shell v2: dark sidebar with icons + top bar with breadcrumb.
// Order comes from ADMIN_NAV (src/lib/content.js).
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ADMIN_NAV } from "../../lib/content";
import { maskEmail } from "../../lib/privacy";
import { useAuth } from "../../lib/auth";

// Phosphor-style inline icons (no extra dep). 16x16, currentColor stroke.
const ICONS = {
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  pujas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4-1 3 2 4 2 1 0-2-1-4 0-6z" />
      <path d="M5 22h14M7 22c0-3 2-5 5-5s5 2 5 5" />
    </svg>
  ),
  festivals: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
      <circle cx="8" cy="14" r="1.5" fill="currentColor" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
    </svg>
  ),
  homepage: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  ),
  stories: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" />
      <path d="M8 7h7M8 11h7M8 15h5" />
    </svg>
  ),
  acharyas: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  testimonials: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" />
      <path d="M9 12h6M9 15h4" />
    </svg>
  ),
  bookings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M8 14h3v3H8z" />
    </svg>
  ),
  inquiries: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 0 1-12 7l-5 1 1-5a8 8 0 1 1 16-3z" />
      <circle cx="12" cy="12" r="0.5" fill="currentColor" />
    </svg>
  ),
  users: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14c3 0 6 1.7 6 5" />
    </svg>
  ),
  trash: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
};

function groupOf(item) {
  if (item.key === "dashboard") return "Overview";
  if (item.key === "trash" || item.key === "settings") return "System";
  if (item.readOnly) return "Read-only";
  return "Content";
}

function crumbFor(pathname) {
  const item = ADMIN_NAV.find((i) =>
    i.path === "/admin" ? pathname === "/admin" : pathname.startsWith(i.path)
  );
  if (!item) return "Admin";
  if (item.path === "/admin") return "Dashboard";
  return item.label;
}

export default function AdminLayout() {
  const { user, logout, adminRole } = useAuth();
  const loc = useLocation();
  const nav = useNavigate();

  const onLogout = async () => {
    await logout();
    nav("/admin/login", { replace: true });
  };

  // Group nav items.
  const groups = [];
  let lastGroup = null;
  for (const item of ADMIN_NAV) {
    const g = groupOf(item);
    if (g !== lastGroup) { groups.push({ name: g, items: [] }); lastGroup = g; }
    groups[groups.length - 1].items.push(item);
  }

  const initial = (user?.email || "A").trim().charAt(0).toUpperCase();
  const crumb = crumbFor(loc.pathname);

  return (
    <div className="admin-root admin-shell">
      <aside>
        <div className="ad-side-brand">
          <div className="ad-side-mark" aria-hidden="true">ध</div>
          <div className="ad-side-brand-text">
            <span className="ad-side-brand-name">Dharma</span>
            <span className="ad-side-brand-sub">CMS Console</span>
          </div>
        </div>

        <nav className="ad-side-nav">
          {groups.map((grp) => (
            <div key={grp.name}>
              <div className="ad-side-group-label">{grp.name}</div>
              {grp.items.map((item) => {
                const active =
                  item.path === "/admin"
                    ? loc.pathname === "/admin"
                    : loc.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={item.key}
                    to={item.path}
                    className={`ad-side-link ${active ? "active" : ""} ${item.readOnly ? "readonly" : ""}`}
                  >
                    <span className="ad-side-icon" aria-hidden="true">
                      {ICONS[item.key] || ICONS.dashboard}
                    </span>
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="ad-side-foot">
          <div className="ad-user-chip">
            <div className="ad-user-avatar" aria-hidden="true">{initial}</div>
            <div className="ad-user-meta">
              <div className="ad-user-email" title={user?.email || ""}>
                {maskEmail(user?.email, "admin") || "admin"}
              </div>
              <div className="ad-user-role">
                {adminRole ? `role · ${adminRole}` : "signed in"}
              </div>
            </div>
          </div>
          <button className="ad-side-action" onClick={onLogout} type="button">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
          <NavLink to="/" className="ad-side-action">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View live site
          </NavLink>
        </div>
      </aside>

      <main>
        <div className="ad-topbar">
          <div className="ad-crumb">
            <a href="/admin">Admin</a>
            <span className="ad-crumb-sep">/</span>
            <span className="ad-crumb-current">{crumb}</span>
          </div>
          <div className="ad-topbar-actions">
            <a href="/" className="ad-btn ad-btn-ghost ad-btn-sm" target="_blank" rel="noreferrer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View site
            </a>
          </div>
        </div>
        <div className="ad-main">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
