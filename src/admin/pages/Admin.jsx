import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { useAdminCollection, purgeExpiredTrash } from "../../lib/cmsAdmin";
import { useCollection } from "../../lib/cms";
import { getActiveFestivals, getPreviewNow } from "../../lib/schedule";

const LINKS = [
  ["Pujas", "/admin/pujas", "pujas", "Catalogue, detail + home preview"],
  ["Festivals + scheduling", "/admin/festivals", "festivals", "Countdown, marquee, calendar"],
  ["Homepage sections", "/admin/homepage", "homepage_sections", "Order = home order"],
  ["Stories", "/admin/stories", "stories", "Journal + home preview"],
  ["Acharyas", "/admin/acharyas", "acharyas", "Profiles + home preview"],
  ["Testimonials", "/admin/testimonials", "testimonials", "Social proof"],
  ["Bookings", "/admin/bookings", "bookings", "Read-only"],
  ["Inquiries", "/admin/inquiries", "inquiries", "Read-only"],
  ["Users", "/admin/users", "users", "Read-only"],
  ["Trash (30 days)", "/admin/trash", null, "Soft-deleted items"],
  ["Settings", "/admin/settings", null, "Site-wide flags"],
];

export default function Admin() {
  const { user, adminRole } = useAuth();
  const [previewDate, setPreviewDate] = useState("");
  const { data: festivals } = useCollection("festivals");
  const { now } = getPreviewNow();
  const active = getActiveFestivals(festivals || [], previewDate ? new Date(previewDate) : now);
  const previewHref = (path) => (previewDate ? `${path}?cmsPreview=${encodeURIComponent(new Date(previewDate).toISOString())}` : path);
  const [purged, setPurged] = useState(null);

  const purgeAll = async () => {
    let total = 0;
    for (const c of ["pujas", "festivals", "homepage_sections", "stories", "acharyas", "testimonials"]) {
      try { total += await purgeExpiredTrash(c); } catch { /* ignore */ }
    }
    setPurged(`Purged ${total} expired trash doc(s).`);
  };

  return (
    <section>
      <div className="eyebrow">CMS · dashboard</div>
      <h1 className="display-dt" style={{ fontSize: 44, marginTop: 8 }}>Dashboard</h1>
      <p className="text-sm muted-dt">Signed in as {user?.email}</p>

      <div className="panel-dt p-5 mt-6">
        <h3 className="text-xl">Access check</h3>
        <p className="text-[11px] muted-dt mt-1">
          Writes need an <code>admins/{user?.uid || "{uid}"}</code> doc + deployed rules.
          If saving fails with permissions, confirm both below.
        </p>
        <p className="text-xs mt-2">UID: <code>{user?.uid || "—"}</code></p>
        <p className="text-xs mt-1">Admin role: <code>{adminRole || "none — not an admin"}</code></p>
        {!adminRole && (
          <p className="text-xs mt-2" style={{ color: "#b3261e" }}>
            No admin doc found for this account. Grant it with{" "}
            <code>node scripts/grantAdmin.mjs</code> (needs ADMIN_EMAIL, ADMIN_PASSWORD, TARGET_UID),
            then sign out + back in.
          </p>
        )}
      </div>

      <div className="panel-dt p-6 mt-6">
        <h2 className="text-2xl">Preview as of (scheduling test)</h2>
        <p className="text-xs muted-dt">Pick a date to simulate startDate/endDate windows across Home + Puja pages.</p>
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          <input type="datetime-local" value={previewDate} onChange={(e) => setPreviewDate(e.target.value)} className="h-11 rounded-xl border border-dt bg-transparent px-3 text-sm" />
          <Link className="btn-gold-dt" to={previewHref("/")}>Preview Home</Link>
          <Link className="btn-ghost-dt" to={previewHref("/pujas")}>Preview Pujas</Link>
          {previewDate && <button className="btn-ghost-dt" onClick={() => setPreviewDate("")}>Clear</button>}
        </div>
        <p className="text-xs mt-3">Active festivals in window: {active.length ? active.map((f) => f.name || f.id).join(", ") : "none"}</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 mt-6">
        {LINKS.map(([label, path, coll, desc]) => (
          <div key={label} className="panel-dt p-5">
            <h3 className="text-xl">{label}</h3>
            <p className="text-[11px] muted-dt">{desc}</p>
            {coll ? <CollectionCount path={coll} /> : <p className="text-[11px] mt-2 muted-dt">—</p>}
            <p className="mt-3"><Link to={path} className="underline text-sm font-semibold">Open →</Link></p>
          </div>
        ))}
      </div>

      <div className="panel-dt p-5 mt-6">
        <h3 className="text-xl">Trash maintenance</h3>
        <p className="text-[11px] muted-dt">Soft-deleted docs auto-delete after 30 days. Purge expired now:</p>
        <p className="mt-3"><button className="btn-ghost-dt text-xs" onClick={purgeAll}>Purge expired trash</button></p>
        {purged && <p className="text-xs muted-dt mt-2">{purged}</p>}
      </div>
    </section>
  );
}

function CollectionCount({ path }) {
  const { rows, loading, remote } = useAdminCollection(path);
  if (!remote) return <p className="text-[11px] mt-2">Firebase not configured</p>;
  if (loading) return <p className="text-[11px] mt-2">Loading…</p>;
  return <p className="text-[11px] mt-2">{rows?.length || 0} docs</p>;
}
