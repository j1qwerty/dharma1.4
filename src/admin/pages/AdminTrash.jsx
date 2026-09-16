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
      const days = Math.max(0, Math.ceil((del - new Date()) / 864e5));
      return `${days}d left`;
    } catch {
      return "—";
    }
  };

  return (
    <div className="ad-trash-block">
      <div className="ad-trash-head">
        <h3 className="ad-card-title" style={{ fontSize: 16 }}>{collection}</h3>
        <span className="ad-stat-label">{rows?.length ?? (loading ? "…" : 0)} docs</span>
      </div>
      {loading && <p className="ad-stat-foot" style={{ marginTop: 10 }}>Loading…</p>}
      {!loading && (!rows || rows.length === 0) && (
        <p className="ad-stat-foot" style={{ marginTop: 12, padding: "8px 0" }}>Empty.</p>
      )}
      <div>
        {(rows || []).map((d) => (
          <div key={d.id} className="ad-trash-row">
            <span style={{ minWidth: 0, flex: 1 }}>
              <span className="ad-trash-title">{d.title || d.name || d.key || d.id}</span>
              <span className="ad-trash-meta">
                <span>{d.id}</span>
                <span>·</span>
                <span>{daysLeft(d)}</span>
              </span>
            </span>
            <span className="ad-trash-actions">
              <button
                className="ad-btn ad-btn-ghost ad-btn-sm"
                onClick={async () => {
                  await restoreContent(collection, d.id, user);
                  setMsg(`Restored ${d.id} to draft.`);
                }}
              >
                Restore
              </button>
              <button
                className="ad-btn ad-btn-danger ad-btn-sm"
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
      {msg && <p className="ad-msg ad-msg-info" style={{ marginTop: 10 }}>{msg}</p>}
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
    <div className="admin-root">
      <header className="ad-page-head">
        <div className="ad-page-head-text">
          <div className="ad-eyebrow">System · Trash</div>
          <h1 className="ad-page-title">Trash</h1>
          <p className="ad-page-sub">
            Soft-deleted items stay here for 30 days, then delete automatically. Restoring returns them as drafts.
          </p>
        </div>
        <div className="ad-page-actions">
          <button
            className="ad-btn ad-btn-gold ad-btn-sm"
            onClick={purgeAll}
            disabled={purging}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M5 6l1 14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-14" />
            </svg>
            {purging ? "Purging…" : "Purge expired"}
          </button>
        </div>
      </header>

      {purged && <p className="ad-msg ad-msg-success" style={{ marginBottom: 16 }}>{purged}</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {TRASH_COLLECTIONS.map((c) => <TrashBlock key={c} collection={c} />)}
      </div>
    </div>
  );
}
