// Read-only tables for bookings / inquiries / users.
// Users lists all accounts except hidden emails; staff (admins/* members or
// staff roles) show Role "admin", regular users blank. Hidden emails are
// masked everywhere (cells + free text).
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, firebaseConfigured } from "../../lib/firebase";
import { useAdminCollection } from "../../lib/cmsAdmin";
import { isHiddenEmail, maskEmail, roleDisplay, scrubText } from "../../lib/privacy";
import { StatusBadge } from "../components/ui";

function fmt(v) {
  try {
    const d = v?.toDate?.() || (v ? new Date(v) : null);
    return d && !Number.isNaN(d.getTime()) ? d.toLocaleString() : "—";
  } catch {
    return "—";
  }
}

/** UIDs present in admins/* — these rows are staff, never listed as users. */
function useAdminIds() {
  const [ids, setIds] = useState(null);
  useEffect(() => {
    if (!firebaseConfigured || !db) { setIds(new Set()); return; }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(collection(db, "admins"));
        if (!cancelled) setIds(new Set(snap.docs.map((d) => d.id)));
      } catch {
        if (!cancelled) setIds(new Set());
      }
    })();
    return () => { cancelled = true; };
  }, []);
  return ids;
}

function Table({ cols, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.key} style={{ textAlign: "left", padding: "8px 10px", borderBottom: "1px solid var(--border-dt,#e8e0cf)", whiteSpace: "nowrap" }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows || []).map((r) => (
            <tr key={r.id}>
              {cols.map((c) => (
                <td key={c.key} style={{ padding: "8px 10px", borderBottom: "1px solid #f0ead9", verticalAlign: "top", overflowWrap: "anywhere", minWidth: 90 }}>
                  {c.render ? c.render(r) : String(r[c.key] ?? "—")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminBookings() {
  const { rows, loading, remote } = useAdminCollection("bookings", { max: 200 });
  return (
    <section>
      <div className="eyebrow">CMS · bookings</div>
      <h1 className="display-dt" style={{ fontSize: 38, marginTop: 8 }}>Bookings</h1>
      <p className="text-sm muted-dt mt-2">Read-only. Every booking is stored here even when the devotee continues on WhatsApp.</p>
      <div className="panel-dt p-4 mt-4" style={{ minWidth: 0, overflow: "hidden" }}>
        {!remote && <p className="text-xs">Firebase not configured.</p>}
        {loading && <p className="text-xs muted-dt">Loading…</p>}
        {!loading && (!rows || rows.length === 0) && <p className="text-xs muted-dt">No bookings yet.</p>}
        {rows && rows.length > 0 && (
          <Table
            rows={rows}
            cols={[
              { key: "id", label: "ID" },
              { key: "pujaId", label: "Puja" },
              { key: "date", label: "Date" },
              { key: "package", label: "Package" },
              { key: "userEmail", label: "User", render: (r) => maskEmail(r.userEmail || "—") },
              { key: "source", label: "Source" },
              { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
              { key: "createdAt", label: "Created", render: (r) => fmt(r.createdAt) },
            ]}
          />
        )}
      </div>
    </section>
  );
}

export function AdminInquiries() {
  const { rows, loading, remote } = useAdminCollection("inquiries", { max: 200 });
  return (
    <section>
      <div className="eyebrow">CMS · inquiries</div>
      <h1 className="display-dt" style={{ fontSize: 38, marginTop: 8 }}>Inquiries</h1>
      <p className="text-sm muted-dt mt-2">Read-only. “Ask on WhatsApp” taps are logged here first, then WhatsApp opens.</p>
      <div className="panel-dt p-4 mt-4" style={{ minWidth: 0, overflow: "hidden" }}>
        {!remote && <p className="text-xs">Firebase not configured.</p>}
        {loading && <p className="text-xs muted-dt">Loading…</p>}
        {!loading && (!rows || rows.length === 0) && <p className="text-xs muted-dt">No inquiries yet.</p>}
        {rows && rows.length > 0 && (
          <Table
            rows={rows}
            cols={[
              { key: "pujaId", label: "Puja" },
              { key: "name", label: "Name", render: (r) => scrubText(r.name || "—") },
              { key: "phone", label: "Phone" },
              { key: "message", label: "Message", render: (r) => <span style={{ whiteSpace: "pre-wrap" }}>{scrubText(r.message || "—")}</span> },
              { key: "source", label: "Source" },
              { key: "createdAt", label: "Created", render: (r) => fmt(r.createdAt) },
            ]}
          />
        )}
      </div>
    </section>
  );
}

export function AdminUsers() {
  const { rows, loading, remote } = useAdminCollection("users", { max: 200 });
  const adminIds = useAdminIds();

  const users = useMemo(() => {
    if (!rows) return null;
    return rows.filter((r) => !isHiddenEmail(r.email));
  }, [rows]);

  const staffIds = adminIds || new Set();
  const displayRole = (r) =>
    staffIds.has(r.id) ? "admin" : roleDisplay(r.role);

  return (
    <section>
      <div className="eyebrow">CMS · users</div>
      <h1 className="display-dt" style={{ fontSize: 38, marginTop: 8 }}>Users</h1>
      <p className="text-sm muted-dt mt-2">Read-only directory of accounts. Staff show as admin.</p>
      <div className="panel-dt p-4 mt-4" style={{ minWidth: 0, overflow: "hidden" }}>
        {!remote && <p className="text-xs">Firebase not configured.</p>}
        {(loading || !users) && <p className="text-xs muted-dt">Loading…</p>}
        {users && users.length === 0 && <p className="text-xs muted-dt">No users yet.</p>}
        {users && users.length > 0 && (
          <Table
            rows={users}
            cols={[
              { key: "id", label: "UID" },
              { key: "email", label: "Email", render: (r) => maskEmail(r.email || "—") },
              { key: "displayName", label: "Name", render: (r) => scrubText(r.displayName || "—") },
              { key: "phone", label: "Phone" },
              { key: "role", label: "Role", render: (r) => displayRole(r) || "—" },
              { key: "createdAt", label: "Created", render: (r) => fmt(r.createdAt) },
            ]}
          />
        )}
      </div>
    </section>
  );
}
