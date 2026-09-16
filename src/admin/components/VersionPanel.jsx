// Right/below version history panel.
// Shows last-5 quick versions (all collections) + full history for festivals.
// Clicking a version calls onRestore(version.data) so the form refills;
// saving afterwards goes through saveContent (restore stays versioned).
import { useEffect, useState } from "react";
import { getFullHistory } from "../../lib/cmsAdmin";

function fmtTime(v) {
  try {
    const d = v?.toDate?.() || (v ? new Date(v) : null);
    if (!d || Number.isNaN(d.getTime())) return "—";
    return d.toLocaleString();
  } catch {
    return "—";
  }
}

export default function VersionPanel({ collection, docId, versions, fullHistory = false, onRestore }) {
  const [full, setFull] = useState(null);
  const [loadingFull, setLoadingFull] = useState(false);
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    setFull(null);
    setShowFull(false);
  }, [collection, docId]);

  const loadFull = async () => {
    if (full || loadingFull) { setShowFull(true); return; }
    setLoadingFull(true);
    try {
      const rows = await getFullHistory(collection, docId, 100);
      setFull(rows);
      setShowFull(true);
    } finally {
      setLoadingFull(false);
    }
  };

  if (!docId) {
    return (
      <div>
        <div className="ad-item-list-title">Version history</div>
        <p className="ad-stat-foot" style={{ marginTop: 10 }}>
          Save once to start version history.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div className="ad-item-list-title">Previous versions (last 5)</div>
      {(!versions || versions.length === 0) && (
        <p className="ad-stat-foot">No earlier versions yet — edit + save to create one.</p>
      )}
      <div className="ad-ver-list">
        {(versions || []).map((v, i) => (
          <button
            key={`${v.v}-${i}`}
            className="ad-ver"
            onClick={() => onRestore(v.data)}
            title="Click to refill the form with this version"
          >
            <div className="ad-ver-head">v{v.v ?? "?"} · {fmtTime(v.at)}</div>
            <div className="ad-ver-by">by {v.by || "admin"}</div>
            <div className="ad-ver-restore">Restore into form →</div>
          </button>
        ))}
      </div>
      {fullHistory && (
        <div style={{ marginTop: 6 }}>
          {!showFull ? (
            <button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={loadFull} disabled={loadingFull}>
              {loadingFull ? "Loading…" : "Show full history"}
            </button>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              <div className="ad-item-list-title">Full history ({full?.length ?? "…"})</div>
              <div className="ad-ver-list">
                {(full || []).map((h) => (
                  <button
                    key={h.id}
                    className="ad-ver"
                    style={{ cursor: h.data ? "pointer" : "default", opacity: h.data ? 1 : 0.6 }}
                    onClick={() => h.data && onRestore(h.data)}
                    disabled={!h.data}
                  >
                    <div className="ad-ver-head">
                      {h.action || "update"} · {h.v != null ? `v${h.v}` : ""} · {fmtTime(h.at)}
                    </div>
                    <div className="ad-ver-by">by {h.by || "admin"}</div>
                    {h.data && <div className="ad-ver-restore">Restore into form →</div>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
