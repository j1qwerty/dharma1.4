import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { useAdminCollection, purgeExpiredTrash } from "../../lib/cmsAdmin";
import { useCollection } from "../../lib/cms";
import { getActiveFestivals, getPreviewNow } from "../../lib/schedule";
import { maskEmail } from "../../lib/privacy";
import { useSiteSettings, getArchiveAfterDays } from "../../lib/settings";
import { archiveDeliveredBookings } from "../../lib/orders";

const TRASH_COLLECTIONS = ["pujas", "festivals", "homepage_sections", "stories", "acharyas", "testimonials"];

const QUICK_LINKS = [
  { label: "Pujas", path: "/admin/pujas", collection: "pujas", desc: "Catalogue + PujaDetail + home preview", icon: "pujas" },
  { label: "Festivals", path: "/admin/festivals", collection: "festivals", desc: "Countdown, marquee, calendar", icon: "festivals" },
  { label: "Homepage", path: "/admin/homepage", collection: "homepage_sections", desc: "Order = home order", icon: "homepage" },
  { label: "Stories", path: "/admin/stories", collection: "stories", desc: "Journal + home preview", icon: "stories" },
  { label: "Acharyas", path: "/admin/acharyas", collection: "acharyas", desc: "Profiles + home preview", icon: "acharyas" },
  { label: "Testimonials", path: "/admin/testimonials", collection: "testimonials", desc: "Social proof", icon: "testimonials" },
  { label: "Bookings", path: "/admin/bookings", collection: "bookings", desc: "Status workflow + filters", icon: "bookings" },
  { label: "Inquiries", path: "/admin/inquiries", collection: "inquiries", desc: "Search + filter", icon: "inquiries" },
  { label: "Users", path: "/admin/users", collection: "users", desc: "Read-only directory", icon: "users" },
];

const ICONS = {
  pujas: <path d="M12 2c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4-1 3 2 4 2 1 0-2-1-4 0-6z" />,
  festivals: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
  homepage: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
  stories: <path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" />,
  acharyas: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
  testimonials: <path d="M7 8h10a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H7a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z" />,
  bookings: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  inquiries: <path d="M21 12a8 8 0 0 1-12 7l-5 1 1-5a8 8 0 1 1 16-3z" />,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6" /></>,
};

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

export default function Admin() {
  const { user, adminRole } = useAuth();
  const { settings } = useSiteSettings();
  const [previewDate, setPreviewDate] = useState("");
  const { data: festivals } = useCollection("festivals");
  const { now } = getPreviewNow();
  const active = getActiveFestivals(festivals || [], previewDate ? new Date(previewDate) : now);
  const previewHref = (path) => (previewDate ? `${path}?cmsPreview=${encodeURIComponent(new Date(previewDate).toISOString())}` : path);
  const [purged, setPurged] = useState(null);
  const [autoArchived, setAutoArchived] = useState(null);

  // Auto-archive sweep: runs on dashboard load if settings.archiveAfterDays is set.
  useEffect(() => {
    if (!settings) return;
    const days = getArchiveAfterDays(settings);
    if (!days) return;
    archiveDeliveredBookings(settings).then((n) => {
      if (n > 0) setAutoArchived(`Auto-archived ${n} delivered booking${n > 1 ? "s" : ""} older than ${days} days.`);
    }).catch(() => { /* ignore */ });
  }, [settings]);

  const purgeAll = async () => {
    let total = 0;
    for (const c of TRASH_COLLECTIONS) {
      try { total += await purgeExpiredTrash(c); } catch { /* ignore */ }
    }
    setPurged(`Purged ${total} expired trash doc(s).`);
  };

  return (
    <div className="admin-root">
      <header className="ad-page-head">
        <div className="ad-page-head-text">
          <div className="ad-eyebrow">Dashboard</div>
          <h1 className="ad-page-title">Welcome back</h1>
          <p className="ad-page-sub">
            Signed in as <strong>{maskEmail(user?.email, "admin") || "admin"}</strong>. Use the cards below to manage
            content, schedules and site settings. All changes go live the moment you hit save — preview links let you
            test scheduling windows before publishing.
          </p>
        </div>
        <div className="ad-page-actions">
          <Link to="/admin/trash" className="ad-btn ad-btn-ghost ad-btn-sm">View trash</Link>
          <Link to="/admin/settings" className="ad-btn ad-btn-ghost ad-btn-sm">Settings</Link>
        </div>
      </header>

      {/* Access check */}
      <div className="ad-card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "space-between" }}>
          <div>
            <h2 className="ad-card-title">Access check</h2>
            <p className="ad-card-desc">
              Writes need an <code className="ad-code">admins/{user?.uid || "{uid}"}</code> doc + deployed rules.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--adm-muted)", flexWrap: "wrap" }}>
            <div>
              <div className="ad-stat-label">UID</div>
              <div style={{ marginTop: 4 }}><code className="ad-code">{user?.uid || "—"}</code></div>
            </div>
            <div>
              <div className="ad-stat-label">Admin role</div>
              <div style={{ marginTop: 4 }}>
                {adminRole
                  ? <span className="ad-badge published"><span className="ad-badge-dot" />{adminRole}</span>
                  : <span className="ad-badge draft"><span className="ad-badge-dot" />none</span>}
              </div>
            </div>
          </div>
        </div>
        {!adminRole && (
          <p className="ad-msg ad-msg-warn" style={{ marginTop: 14 }}>
            No admin doc found for this account. Grant it with{" "}
            <code className="ad-code">node scripts/grantAdmin.mjs</code> (needs ADMIN_EMAIL, ADMIN_PASSWORD, TARGET_UID),
            then sign out + back in.
          </p>
        )}
      </div>

      {/* Quick action cards */}
      <div className="ad-section-label">Manage content</div>
      <div className="ad-quick-grid" style={{ marginBottom: 20 }}>
        {QUICK_LINKS.map((q) => (
          <Link key={q.label} to={q.path} className="ad-quick">
            <div className="ad-quick-icon"><Icon name={q.icon} /></div>
            <div className="ad-quick-label">{q.label}</div>
            <div className="ad-quick-desc">{q.desc}</div>
            {q.collection && <CollectionCount path={q.collection} />}
          </Link>
        ))}
      </div>

      {/* Preview tool */}
      <div className="ad-card" style={{ marginBottom: 16 }}>
        <h2 className="ad-card-title">Preview as of (scheduling test)</h2>
        <p className="ad-card-desc">Pick a date to simulate startDate/endDate windows across Home + Puja pages.</p>
        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
          <input
            type="datetime-local"
            value={previewDate}
            onChange={(e) => setPreviewDate(e.target.value)}
            className="ad-input"
            style={{ maxWidth: 260 }}
          />
          <Link className="ad-btn ad-btn-gold ad-btn-sm" to={previewHref("/")}>Preview Home</Link>
          <Link className="ad-btn ad-btn-ghost ad-btn-sm" to={previewHref("/pujas")}>Preview Pujas</Link>
          {previewDate && <button className="ad-btn ad-btn-soft ad-btn-sm" onClick={() => setPreviewDate("")}>Clear</button>}
        </div>
        <p className="ad-card-desc" style={{ marginTop: 12 }}>
          Active festivals in window:&nbsp;
          <strong>{active.length ? active.map((f) => f.name || f.id).join(", ") : "none"}</strong>
        </p>
      </div>

      {/* Auto-archive notice */}
      {autoArchived && (
        <p className="ad-msg ad-msg-info" style={{ marginBottom: 16 }}>{autoArchived}</p>
      )}

      {/* Trash maintenance */}
      <div className="ad-card">
        <h2 className="ad-card-title">Trash maintenance</h2>
        <p className="ad-card-desc">
          Soft-deleted docs auto-delete after 30 days. You can manually purge expired items now.
        </p>
        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
          <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={purgeAll}>Purge expired trash</button>
          <Link to="/admin/settings" className="ad-btn ad-btn-soft ad-btn-sm">
            Auto-archive: {getArchiveAfterDays(settings) || "off"}
          </Link>
        </div>
        {purged && <p className="ad-msg ad-msg-success" style={{ marginTop: 12 }}>{purged}</p>}
      </div>
    </div>
  );
}

function CollectionCount({ path }) {
  const { rows, loading, remote } = useAdminCollection(path);
  if (!remote) return <div className="ad-quick-count">—</div>;
  if (loading) return <div className="ad-quick-count">…</div>;
  return <div className="ad-quick-count">{rows?.length || 0}</div>;
}
