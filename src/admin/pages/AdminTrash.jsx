// Trash across all content collections: soft-deleted docs kept 30 days,
// auto-purge when expired, manual restore / permanent delete.
import { useState } from "react";
import {
  hardDeleteContent, purgeExpiredTrash, restoreContent, useTrashCollection,
} from "../../lib/cmsAdmin";
import { useAuth } from "../../lib/auth";

const TRASH_COLLECTIONS = ["pujas", "festivals", "homepage_sections", "stories", "acharyas", "testimonials"];

function TrashBlock({ collection }) {
  const { user } = useAuth();
  const { rows, loading } = useTrashCollection(collection);
  const [msg, setMsg] = useState(null);

  const daysLeft = (d) => {
    try {
      const del = d?.deleteAt?.toDate?.() || (d?.deleteAt ? new Date(d.deleteAt) : null);
      if (!del) return "—";
      return `${Math.max(0, Math.ceil((del - new Date()) / 864e5))}d left`;
    } catch {
      return "—";
    }
  };

  return (
    <div className="panel-dt p-4">
      <h3 className="text-sm font-semibold">{collection} ({rows?.length ?? (loading ? "…" : 0)})</h3>
      {loading && <p className="text-xs muted-dt mt-2">Loading…</p>}
      {!loading && (!rows || rows.length === 0) && <p className="text-xs muted-dt mt-2">Empty.</p>}
      <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
        {(rows || []).map((d) => (
          <div key={d.id} style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", minWidth: 0 }}>
            <span className="text-xs" style={{ minWidth: 0, overflowWrap: "anywhere" }}>
              <strong>{d.title || d.name || d.key || d.id}</strong>
              <span className="muted-dt"> · {d.id} · {daysLeft(d)}</span>
            </span>
            <span style={{ display: "flex", gap: 6 }}>
              <button
                className="btn-ghost-dt text-xs"
                onClick={async () => { await restoreContent(collection, d.id, user); setMsg(`Restored ${d.id} to draft.`); }}
              >
                Restore
              </button>
              <button
                className="btn-ghost-dt text-xs"
                onClick={async () => {
                  if (window.confirm(`Permanently delete ${d.id}? This cannot be undone.`)) {
                    await hardDeleteContent(collection, d.id);
                    setMsg(`Permanently deleted ${d.id}.`);
                  }
                }}
              >
                Delete forever
              </button>
            </span>
          </div>
        ))}
      </div>
      {msg && <p className="text-[11px] muted-dt mt-2">{msg}</p>}
    </div>
  );
}

export default function AdminTrash() {
  const [purged, setPurged] = useState(null);
  const [purging, setPurging] = useState(false);

  const purgeAll = async () => {
    setPurging(true);
    let total = 0;
    for (const c of TRASH_COLLECTIONS) {
      try { total += await purgeExpiredTrash(c); } catch { /* ignore */ }
    }
    setPurged(`Purged ${total} expired doc(s) across all collections.`);
    setPurging(false);
  };

  return (
    <section>
      <div className="eyebrow">CMS · trash</div>
      <h1 className="display-dt" style={{ fontSize: 38, marginTop: 8 }}>Trash</h1>
      <p className="text-sm muted-dt mt-2">Soft-deleted items stay here for 30 days, then delete automatically. Restoring returns them as drafts.</p>
      <div style={{ marginTop: 14 }}>
        <button className="btn-gold-dt text-xs" onClick={purgeAll} disabled={purging}>
          {purging ? "Purging…" : "Purge expired now"}
        </button>
        {purged && <p className="text-xs muted-dt mt-2">{purged}</p>}
      </div>
      <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
        {TRASH_COLLECTIONS.map((c) => <TrashBlock key={c} collection={c} />)}
      </div>
    </section>
  );
}
