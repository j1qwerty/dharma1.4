// Read-only tables for bookings / inquiries / users.
import { useAdminCollection } from "../../lib/cmsAdmin";
import { StatusBadge } from "../components/ui";

function fmt(v) {
  try {
    const d = v?.toDate?.() || (v ? new Date(v) : null);
    return d && !Number.isNaN(d.getTime()) ? d.toLocaleString() : "—";
  } catch {
    return "—";
  }
}

function Table({ cols, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c.key} style={{ textAlign: "left", padding: "8px 10px", borderBottom: "1px solid var(--border-dt,#e8e0cf)" }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(rows || []).map((r) => (
            <tr key={r.id}>
              {cols.map((c) => (
                <td key={c.key} style={{ padding: "8px 10px", borderBottom: "1px solid #f0ead9", verticalAlign: "top" }}>
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
      <div className="panel-dt p-4 mt-4">
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
              { key: "userEmail", label: "User" },
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
      <div className="panel-dt p-4 mt-4">
        {!remote && <p className="text-xs">Firebase not configured.</p>}
        {loading && <p className="text-xs muted-dt">Loading…</p>}
        {!loading && (!rows || rows.length === 0) && <p className="text-xs muted-dt">No inquiries yet.</p>}
        {rows && rows.length > 0 && (
          <Table
            rows={rows}
            cols={[
              { key: "pujaId", label: "Puja" },
              { key: "name", label: "Name" },
              { key: "phone", label: "Phone" },
              { key: "message", label: "Message", render: (r) => <span style={{ whiteSpace: "pre-wrap" }}>{r.message || "—"}</span> },
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
  return (
    <section>
      <div className="eyebrow">CMS · users</div>
      <h1 className="display-dt" style={{ fontSize: 38, marginTop: 8 }}>Users</h1>
      <p className="text-sm muted-dt mt-2">Read-only directory of customer profiles.</p>
      <div className="panel-dt p-4 mt-4">
        {!remote && <p className="text-xs">Firebase not configured.</p>}
        {loading && <p className="text-xs muted-dt">Loading…</p>}
        {!loading && (!rows || rows.length === 0) && <p className="text-xs muted-dt">No users yet.</p>}
        {rows && rows.length > 0 && (
          <Table
            rows={rows}
            cols={[
              { key: "id", label: "UID" },
              { key: "email", label: "Email" },
              { key: "displayName", label: "Name" },
              { key: "phone", label: "Phone" },
              { key: "createdAt", label: "Created", render: (r) => fmt(r.createdAt) },
            ]}
          />
        )}
      </div>
    </section>
  );
}
