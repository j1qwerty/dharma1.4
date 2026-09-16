// Right-side version history panel.
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

  if (!docId) return <p className="text-xs muted-dt">Save once to start version history.</p>;

  return (
    <div style={{ display: "grid", gap: 10, alignContent: "start" }}>
      <h3 className="text-sm font-semibold">Previous versions (last 5)</h3>
      {(!versions || versions.length === 0) && (
        <p className="text-xs muted-dt">No earlier versions yet — edit + save to create one.</p>
      )}
      {(versions || []).map((v, i) => (
        <button
          key={`${v.v}-${i}`}
          className="panel-dt p-3 text-left"
          style={{ cursor: "pointer" }}
          onClick={() => onRestore(v.data)}
          title="Click to refill the form with this version"
        >
          <div className="text-xs font-semibold">v{v.v ?? "?"} · {fmtTime(v.at)}</div>
          <div className="text-[11px] muted-dt">by {v.by || "admin"}</div>
          <div className="text-[11px] underline mt-1">Restore into form →</div>
        </button>
      ))}
      {fullHistory && (
        <div style={{ marginTop: 4 }}>
          {!showFull ? (
            <button className="btn-ghost-dt text-xs" onClick={loadFull} disabled={loadingFull}>
              {loadingFull ? "Loading full history…" : "Show full history (all changes)"}
            </button>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              <h4 className="text-xs font-semibold">Full history ({full?.length ?? "…"})</h4>
              {(full || []).map((h) => (
                <button
                  key={h.id}
                  className="panel-dt p-3 text-left"
                  style={{ cursor: h.data ? "pointer" : "default" }}
                  onClick={() => h.data && onRestore(h.data)}
                  disabled={!h.data}
                >
                  <div className="text-xs font-semibold">
                    {h.action || "update"} · {h.v != null ? `v${h.v}` : ""} · {fmtTime(h.at)}
                  </div>
                  <div className="text-[11px] muted-dt">by {h.by || "admin"}</div>
                  {h.data && <div className="text-[11px] underline mt-1">Restore into form →</div>}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
