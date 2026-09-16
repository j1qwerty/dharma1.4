import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { useCollection } from "../lib/cms";
import { getActiveFestivals, getPreviewNow } from "../lib/schedule";

const LINKS = [
  ["Pujas", "/admin/pujas (next)", "pujas"],
  ["Festivals + scheduling", "/admin/festivals (next)", "festivals"],
  ["Homepage sections", "/admin/homepage (next)", "homepage_sections"],
  ["Stories", "/admin/stories (next)", "stories"],
  ["Acharyas", "/admin/acharyas (next)", "acharyas"],
  ["Testimonials", "/admin/testimonials (next)", "testimonials"],
  ["Bookings (read-only)", "/admin/bookings (next)", "bookings"],
  ["Users (read-only)", "/admin/users (next)", "users"],
];

export default function Admin() {
  const { user, logout } = useAuth();
  const [previewDate, setPreviewDate] = useState("");
  const { data: festivals } = useCollection("festivals");
  const { now } = getPreviewNow();
  const active = getActiveFestivals(festivals || [], previewDate ? new Date(previewDate) : now);
  const previewHref = (path) => (previewDate ? `${path}?cmsPreview=${encodeURIComponent(new Date(previewDate).toISOString())}` : path);

  return (
    <section style={{ maxWidth: 960, margin: "6vh auto", padding: 24 }}>
      <div className="eyebrow">CMS · v1 foundation</div>
      <h1 className="display-dt" style={{ fontSize: 44, marginTop: 8 }}>Dashboard</h1>
      <p className="text-sm muted-dt">Signed in as {user?.email} · <button className="underline" onClick={logout}>Sign out</button></p>

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
        <div className="panel-dt p-5">
          <h3 className="text-xl">Settings</h3>
          <p className="text-[11px] muted-dt">Login options, feature flags</p>
          <p className="mt-3"><Link to="/admin/settings" className="underline text-sm font-semibold">Open settings →</Link></p>
        </div>
        {LINKS.map(([label, note, coll]) => (
          <CollectionCard key={label} label={label} note={note} path={coll} />
        ))}
      </div>
      <p className="text-xs muted-dt mt-6">Full CRUD editors land next (Pujas → Festivals → Homepage). Collections read live above; empty = not seeded yet (<code>node scripts/seedFirestore.mjs</code>).</p>
    </section>
  );
}

function CollectionCard({ label, note, path }) {
  const { data, loading, remote } = useCollection(path);
  return (
    <div className="panel-dt p-5">
      <h3 className="text-xl">{label}</h3>
      <p className="text-[11px] muted-dt">{note}</p>
      <p className="text-[11px] mt-2">{!remote ? "Firebase not configured" : loading ? "Loading…" : `${data?.length || 0} docs`}</p>
    </div>
  );
}
