// Admin tables: Bookings (with status management + filters + address drawer),
// Inquiries (with filters + search), Users (read-only).
//
// Booking status: admin can manually advance via dropdown (pending →
// confirmed → puja_slot_assigned → delivered → archived).
// Filters: status filter (chips) + free-text search (puja id, email, package).
// Auto-archive: handled by archiveDeliveredBookings() called from the
// admin dashboard (Admin.jsx).
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, firebaseConfigured } from "../../lib/firebase";
import { fetchUserAddresses, useAdminCollection } from "../../lib/cmsAdmin";
import { isHiddenEmail, maskEmail, roleDisplay, scrubText } from "../../lib/privacy";
import { useAuth } from "../../lib/auth";
import { updateBookingStatus } from "../../lib/orders";
import { BOOKING_STATUS, BOOKING_STATUS_KEYS, bookingStatusMeta } from "../../lib/bookingStatus";
import { formatAddress } from "../../lib/addresses";
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
export function useAdminIds() {
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

function Table({ cols, rows, onRowClick, activeRowId }) {
  return (
    <div className="ad-table-wrap">
      <div className="ad-table-scroll">
        <table className="ad-table">
          <thead>
            <tr>
              {cols.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(rows || []).map((r) => (
              <tr
                key={r.id}
                onClick={() => onRowClick?.(r)}
                style={{
                  cursor: onRowClick ? "pointer" : "default",
                  background: activeRowId === r.id ? "rgba(212,160,23,0.08)" : undefined,
                }}
              >
                {cols.map((c) => (
                  <td key={c.key}>
                    {c.render ? c.render(r) : String(r[c.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PageHead({ eyebrow, title, sub, count }) {
  return (
    <header className="ad-page-head">
      <div className="ad-page-head-text">
        <div className="ad-eyebrow">{eyebrow}</div>
        <h1 className="ad-page-title">{title}</h1>
        <p className="ad-page-sub">{sub}</p>
      </div>
      {count != null && (
        <div className="ad-page-actions">
          <div className="ad-stat" style={{ padding: "8px 14px", minWidth: 100 }}>
            <div className="ad-stat-label">Total</div>
            <div className="ad-stat-value">{count}</div>
          </div>
        </div>
      )}
    </header>
  );
}

function FilterBar({ search, setSearch, status, setStatus, statusOptions, showStatusFilter }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
      <input
        type="search"
        placeholder="Search puja, email, package, name, phone…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="ad-input ad-input-sm"
        style={{ maxWidth: 340, minWidth: 200, flex: 1 }}
      />
      {showStatusFilter && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="ad-input ad-input-sm"
          style={{ maxWidth: 180 }}
        >
          <option value="">All statuses</option>
          {statusOptions.map((s) => (
            <option key={s} value={s}>{bookingStatusMeta(s).label}</option>
          ))}
        </select>
      )}
    </div>
  );
}

function StatusSelect({ value, onChange, disabled }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="ad-input ad-input-sm"
      style={{ maxWidth: 160, padding: "4px 8px", fontSize: 11 }}
    >
      {BOOKING_STATUS_KEYS.map((s) => (
        <option key={s} value={s}>{bookingStatusMeta(s).label}</option>
      ))}
    </select>
  );
}

/** Booking detail drawer — shows full booking + delivery address. */
function BookingDrawer({ booking, onClose }) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(null);
  const [statusBusy, setStatusBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    if (!booking?.userId) { setAddresses([]); return; }
    let cancelled = false;
    (async () => {
      const list = await fetchUserAddresses(booking.userId);
      if (!cancelled) setAddresses(list);
    })();
    return () => { cancelled = true; };
  }, [booking?.id, booking?.userId]);

  if (!booking) return null;
  const addr = addresses?.find((a) => a.id === booking.addressId) || addresses?.[0];

  const changeStatus = async (newStatus) => {
    setStatusBusy(true);
    setStatusMsg(null);
    const res = await updateBookingStatus(booking.id, newStatus, user);
    setStatusBusy(false);
    setStatusMsg(res?.ok ? `Status updated to "${bookingStatusMeta(newStatus).label}".` : `Update failed: ${res?.error}`);
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100,
        display: "grid", placeItems: "center", padding: 20,
      }}
      onClick={onClose}
    >
      <div
        className="ad-card"
        style={{ maxWidth: 560, width: "100%", maxHeight: "90vh", overflow: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 className="ad-card-title" style={{ fontSize: 20 }}>Booking details</h2>
          <button onClick={onClose} className="ad-btn ad-btn-ghost ad-btn-sm">Close</button>
        </div>
        <div style={{ display: "grid", gap: 14, fontSize: 13 }}>
          <Row label="Booking ID" value={<code className="ad-code">{booking.id}</code>} />
          <Row label="Puja" value={booking.pujaId} />
          <Row label="Date" value={booking.date} />
          <Row label="Time" value={booking.time} />
          <Row label="Package" value={`${booking.package || "—"} (₹${(booking.packagePrice || 0).toLocaleString("en-IN")})`} />
          <Row label="Add-ons" value={Array.isArray(booking.addons) && booking.addons.length ? booking.addons.join(", ") : "—"} />
          <Row label="Payment" value={booking.payment || "—"} />
          <Row label="User email" value={maskEmail(booking.userEmail || "—")} />
          <Row label="User ID" value={<code className="ad-code">{booking.userId || "—"}</code>} />
          <Row label="Source" value={booking.source || "—"} />
          <Row label="Created" value={fmt(booking.createdAt)} />
          <Row label="Updated" value={fmt(booking.updatedAt)} />

          {booking.sankalp && (
            <div style={{ marginTop: 6, padding: 12, background: "var(--adm-surface-2)", borderRadius: 8 }}>
              <div className="ad-section-label">Sankalp</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                {Object.entries(booking.sankalp).map(([k, v]) => (
                  <div key={k}><strong>{k}:</strong> {String(v)}</div>
                ))}
              </div>
            </div>
          )}

          {addresses && addresses.length > 0 && (
            <div style={{ marginTop: 6, padding: 12, background: "var(--adm-surface-2)", borderRadius: 8 }}>
              <div className="ad-section-label">Delivery address{addr && booking.addressId ? " (selected)" : " (default)"}</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>
                {addresses.map((a) => (
                  <div key={a.id} style={{ padding: "4px 0", borderBottom: "1px dashed var(--adm-line)" }}>
                    <div><strong>{a.label}</strong>{a.id === booking.addressId ? " ✓" : ""}</div>
                    <div style={{ color: "var(--adm-muted)" }}>{formatAddress(a)}</div>
                    {a.phone && <div style={{ color: "var(--adm-muted)" }}>Phone: {a.phone}</div>}
                    {a.lat != null && a.lng != null && (
                      <div style={{ color: "var(--adm-muted)" }}>
                        Geo: {a.lat.toFixed(4)}, {a.lng.toFixed(4)}{" "}
                        <a
                          href={`https://www.google.com/maps?q=${a.lat},${a.lng}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "var(--adm-gold-2)", textDecoration: "underline" }}
                        >View on map →</a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: 6, padding: 12, border: "1px solid var(--adm-line)", borderRadius: 8 }}>
            <div className="ad-section-label">Status</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
              <StatusBadge status={booking.status} />
              <StatusSelect value={booking.status} onChange={changeStatus} disabled={statusBusy} />
            </div>
            {statusBusy && <p className="ad-stat-foot" style={{ marginTop: 6 }}>Saving…</p>}
            {statusMsg && <p className="ad-stat-foot" style={{ marginTop: 6 }}>{statusMsg}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <span className="ad-stat-label" style={{ flexShrink: 0 }}>{label}</span>
      <span style={{ textAlign: "right", overflowWrap: "anywhere" }}>{value}</span>
    </div>
  );
}

export function AdminBookings() {
  const { rows, loading, remote } = useAdminCollection("bookings", { includeDeleted: true, max: 200 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [drawerBooking, setDrawerBooking] = useState(null);

  const filtered = useMemo(() => {
    if (!rows) return rows;
    let out = rows;
    if (status) out = out.filter((r) => r.status === status);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter((r) =>
        String(r.pujaId || "").toLowerCase().includes(q) ||
        String(r.userEmail || "").toLowerCase().includes(q) ||
        String(r.package || "").toLowerCase().includes(q) ||
        String(r.id || "").toLowerCase().includes(q) ||
        String(r.userId || "").toLowerCase().includes(q)
      );
    }
    return out;
  }, [rows, status, search]);

  return (
    <div className="admin-root">
      <PageHead
        eyebrow="Bookings"
        title="Bookings"
        sub="Every booking is stored here even when the devotee continues on WhatsApp. Click a row to view full details, delivery address, and update status."
        count={rows?.length}
      />
      <div style={{ marginTop: 8 }}>
        {!remote && <p className="ad-msg ad-msg-warn">Firebase not configured.</p>}
        {loading && <p className="ad-stat-foot">Loading…</p>}
        {!loading && (!rows || rows.length === 0) && <p className="ad-stat-foot">No bookings yet.</p>}
        {rows && rows.length > 0 && (
          <>
            <FilterBar
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              statusOptions={BOOKING_STATUS_KEYS}
              showStatusFilter
            />
            <Table
              rows={filtered}
              onRowClick={(r) => setDrawerBooking(r)}
              activeRowId={drawerBooking?.id}
              cols={[
                { key: "pujaId", label: "Puja" },
                { key: "date", label: "Date" },
                { key: "package", label: "Package" },
                { key: "userEmail", label: "User", render: (r) => maskEmail(r.userEmail || "—") },
                { key: "addressId", label: "Address", render: (r) => r.addressId ? "✓" : "—" },
                { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> },
                { key: "createdAt", label: "Created", render: (r) => fmt(r.createdAt) },
              ]}
            />
            <p className="ad-stat-foot" style={{ marginTop: 8 }}>
              Showing {filtered?.length || 0} of {rows.length} bookings.
            </p>
          </>
        )}
      </div>
      {drawerBooking && <BookingDrawer booking={drawerBooking} onClose={() => setDrawerBooking(null)} />}
    </div>
  );
}

export function AdminInquiries() {
  const { rows, loading, remote } = useAdminCollection("inquiries", { max: 200 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(() => {
    if (!rows) return rows;
    let out = rows;
    if (status) out = out.filter((r) => r.status === status);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter((r) =>
        String(r.name || "").toLowerCase().includes(q) ||
        String(r.phone || "").toLowerCase().includes(q) ||
        String(r.pujaId || "").toLowerCase().includes(q) ||
        String(r.message || "").toLowerCase().includes(q) ||
        String(r.userEmail || "").toLowerCase().includes(q)
      );
    }
    return out;
  }, [rows, status, search]);

  return (
    <div className="admin-root">
      <PageHead
        eyebrow="Inquiries"
        title="Inquiries"
        sub="“Ask on WhatsApp” taps are logged here first, then WhatsApp opens."
        count={rows?.length}
      />
      <div style={{ marginTop: 8 }}>
        {!remote && <p className="ad-msg ad-msg-warn">Firebase not configured.</p>}
        {loading && <p className="ad-stat-foot">Loading…</p>}
        {!loading && (!rows || rows.length === 0) && <p className="ad-stat-foot">No inquiries yet.</p>}
        {rows && rows.length > 0 && (
          <>
            <FilterBar
              search={search}
              setSearch={setSearch}
              status={status}
              setStatus={setStatus}
              statusOptions={["new", "contacted", "archived"]}
              showStatusFilter
            />
            <Table
              rows={filtered}
              cols={[
                { key: "pujaId", label: "Puja" },
                { key: "name", label: "Name", render: (r) => scrubText(r.name || "—") },
                { key: "userEmail", label: "Email", render: (r) => maskEmail(r.userEmail || "—") },
                { key: "phone", label: "Phone" },
                { key: "message", label: "Message", render: (r) => <span style={{ whiteSpace: "pre-wrap" }}>{scrubText(r.message || "—")}</span> },
                { key: "source", label: "Source" },
                { key: "createdAt", label: "Created", render: (r) => fmt(r.createdAt) },
              ]}
            />
            <p className="ad-stat-foot" style={{ marginTop: 8 }}>
              Showing {filtered?.length || 0} of {rows.length} inquiries.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export function AdminUsers() {
  const { rows, loading, remote } = useAdminCollection("users", { max: 200 });
  const adminIds = useAdminIds();
  const [search, setSearch] = useState("");

  const users = useMemo(() => {
    if (!rows) return null;
    let out = rows.filter((r) => !isHiddenEmail(r.email));
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter((r) =>
        String(r.email || "").toLowerCase().includes(q) ||
        String(r.displayName || "").toLowerCase().includes(q) ||
        String(r.id || "").toLowerCase().includes(q)
      );
    }
    return out;
  }, [rows, search]);

  const staffIds = adminIds || new Set();
  const displayRole = (r) =>
    staffIds.has(r.id) ? "admin" : roleDisplay(r.role);

  return (
    <div className="admin-root">
      <PageHead
        eyebrow="Users"
        title="Users"
        sub="Read-only directory of accounts. Staff show as admin."
        count={users?.length}
      />
      <div style={{ marginTop: 8 }}>
        {!remote && <p className="ad-msg ad-msg-warn">Firebase not configured.</p>}
        {(loading || !users) && <p className="ad-stat-foot">Loading…</p>}
        {users && users.length === 0 && <p className="ad-stat-foot">No users yet.</p>}
        {users && users.length > 0 && (
          <>
            <FilterBar search={search} setSearch={setSearch} status="" setStatus={() => {}} showStatusFilter={false} />
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
          </>
        )}
      </div>
    </div>
  );
}
