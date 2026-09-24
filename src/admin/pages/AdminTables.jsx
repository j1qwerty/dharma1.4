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
import { SHRAADH_TYPES } from "../../lib/shraadhTypes";
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

/* ---------- Shared table toolkit (sorting, date filters, pagination) ----------
 * Used by the staff console (opt-in via props). Super-admin tables keep
 * defaults (plain headers, no paging) unless they pass the same props. */

export function asDate(v) {
  try {
    const d = v?.toDate?.() || (v ? new Date(v) : null);
    return d && !Number.isNaN(d.getTime()) ? d : null;
  } catch {
    return null;
  }
}

function millis(v) {
  const d = asDate(v);
  return d ? d.getTime() : 0;
}

/** Sort rows by key using col.sortValue (or the raw field). Nulls last. */
export function sortRows(rows, sortKey, sortDir, cols) {
  if (!rows || !sortKey) return rows;
  const col = (cols || []).find((c) => (c.sortAccess || c.key) === sortKey);
  const get = col?.sortValue || ((r) => r[sortKey]);
  const dir = sortDir === "asc" ? 1 : -1;
  return [...rows].sort((a, b) => {
    const va = get(a);
    const vb = get(b);
    if (va == null && vb == null) return 0;
    if (va == null) return 1;
    if (vb == null) return -1;
    if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
    return String(va).localeCompare(String(vb), undefined, { numeric: true }) * dir;
  });
}

/** AND-combine active constraints: from/to range + month + year on getDate(r). */
export function applyDateFilter(rows, { from, to, month, year }, getDate) {
  if (!rows || (!from && !to && month === "" && (year === "" || year == null))) return rows;
  return rows.filter((r) => {
    const d = getDate(r);
    if (!d) return false;
    if (from) {
      const f = new Date(`${from}T00:00:00`);
      if (d < f) return false;
    }
    if (to) {
      const t = new Date(`${to}T23:59:59.999`);
      if (d > t) return false;
    }
    if (month !== "" && month != null && d.getMonth() !== Number(month)) return false;
    if (year !== "" && year != null && d.getFullYear() !== Number(year)) return false;
    return true;
  });
}

/** Distinct years (desc) present in rows for the year select. */
export function yearOptions(rows, getDate) {
  const set = new Set();
  for (const r of rows || []) {
    const d = getDate(r);
    if (d) set.add(d.getFullYear());
  }
  return [...set].sort((a, b) => b - a);
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Month + year selects and from–to date inputs. */
export function DateFilterFields({ from, to, month, year, years, onFrom, onTo, onMonth, onYear, onClear }) {
  const active = Boolean(from || to || month !== "" || (year !== "" && year != null));
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>
      <select value={month} onChange={(e) => onMonth(e.target.value)} className="ad-input ad-input-sm" style={{ maxWidth: 120 }} aria-label="Filter by month">
        <option value="">Month</option>
        {MONTHS.map((m, i) => <option key={m} value={i}>{m}</option>)}
      </select>
      <select value={year} onChange={(e) => onYear(e.target.value)} className="ad-input ad-input-sm" style={{ maxWidth: 110 }} aria-label="Filter by year">
        <option value="">Year</option>
        {(years || []).map((y) => <option key={y} value={y}>{y}</option>)}
      </select>
      <input type="date" value={from} onChange={(e) => onFrom(e.target.value)} className="ad-input ad-input-sm" style={{ maxWidth: 150 }} aria-label="From date" />
      <span className="ad-stat-foot">→</span>
      <input type="date" value={to} min={from || undefined} onChange={(e) => onTo(e.target.value)} className="ad-input ad-input-sm" style={{ maxWidth: 150 }} aria-label="To date" />
      {active && (
        <button type="button" onClick={onClear} className="ad-btn ad-btn-ghost ad-btn-sm">
          Clear dates
        </button>
      )}
    </div>
  );
}

/** Slice rows into pages; resets to page 1 whenever resetKey changes. */
export function usePagination(rows, pageSize = 20, resetKey = "") {
  const [page, setPage] = useState(1);
  const total = rows?.length || 0;
  const size = Math.max(1, pageSize || 20);
  const totalPages = Math.max(1, Math.ceil(total / size));
  useEffect(() => { setPage(1); }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const safePage = Math.min(Math.max(1, page), totalPages);
  const pageRows = useMemo(
    () => (rows ? rows.slice((safePage - 1) * size, safePage * size) : rows),
    [rows, safePage, size]
  );
  return { pageRows, page: safePage, totalPages, total, pageSize: size, setPage };
}

export function PaginationBar({ page, totalPages, total, pageSize, onPage }) {
  if (!total || totalPages <= 1) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const nums = [];
  for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) nums.push(i);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
      <button type="button" className="ad-btn ad-btn-ghost ad-btn-sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        ← Prev
      </button>
      {nums[0] > 1 && <span className="ad-stat-foot">…</span>}
      {nums.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onPage(n)}
          className={`ad-btn ad-btn-sm ${n === page ? "ad-btn-primary" : "ad-btn-ghost"}`}
          aria-current={n === page ? "page" : undefined}
        >
          {n}
        </button>
      ))}
      {nums[nums.length - 1] < totalPages && <span className="ad-stat-foot">…</span>}
      <button type="button" className="ad-btn ad-btn-ghost ad-btn-sm" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        Next →
      </button>
      <span className="ad-stat-foot" style={{ marginLeft: "auto" }}>
        Showing {start}–{end} of {total}
      </span>
    </div>
  );
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

function Table({ cols, rows, onRowClick, activeRowId, sortKey, sortDir, onSort }) {
  return (
    <div className="ad-table-wrap">
      <div className="ad-table-scroll">
        <table className="ad-table">
          <thead>
            <tr>
              {cols.map((c) => {
                const access = c.sortAccess || c.key;
                const active = sortKey === access;
                return (
                  <th key={c.key} aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : undefined}>
                    {c.sortable && onSort ? (
                      <button type="button" className="ad-th-sort" onClick={() => onSort(access)} title={`Sort by ${c.label}`}>
                        {c.label}
                        <span aria-hidden="true" className={active ? "on" : ""}>
                          {active ? (sortDir === "asc" ? " ▲" : " ▼") : " ⇅"}
                        </span>
                      </button>
                    ) : (
                      c.label
                    )}
                  </th>
                );
              })}
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
          {booking.shraadhType && (() => {
            const rite = SHRAADH_TYPES.find((x) => x.id === booking.shraadhType);
            return rite ? <Row label="Shraadh rite" value={`${rite.name} — ${rite.short}`} /> : null;
          })()}
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

export function AdminBookings({ sortable = false, paginated = false, dateFilter = false, pageSize = 20 }) {
  const { rows, loading, remote } = useAdminCollection("bookings", { includeDeleted: true, max: 200 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [drawerBooking, setDrawerBooking] = useState(null);
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };
  const clearDates = () => { setFrom(""); setTo(""); setMonth(""); setYear(""); };

  const cols = useMemo(() => [
    { key: "pujaId", label: "Puja", sortable, sortValue: (r) => r.pujaId || "" },
    { key: "date", label: "Date", sortable, sortValue: (r) => r.date || "" },
    { key: "package", label: "Package", sortable, sortValue: (r) => r.package || "" },
    { key: "userEmail", label: "User", render: (r) => maskEmail(r.userEmail || "—"), sortable, sortValue: (r) => r.userEmail || "" },
    { key: "addressId", label: "Address", render: (r) => r.addressId ? "✓" : "—" },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} />, sortable, sortValue: (r) => r.status || "" },
    { key: "createdAt", label: "Created", render: (r) => fmt(r.createdAt), sortable, sortValue: (r) => millis(r.createdAt) },
  ], [sortable]);

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
    if (dateFilter) out = applyDateFilter(out, { from, to, month, year }, (r) => asDate(r.createdAt));
    return out;
  }, [rows, status, search, dateFilter, from, to, month, year]);

  const years = useMemo(
    () => (dateFilter ? yearOptions(rows, (r) => asDate(r.createdAt)) : []),
    [rows, dateFilter]
  );
  const sorted = useMemo(
    () => (sortable ? sortRows(filtered, sortKey, sortDir, cols) : filtered),
    [filtered, sortable, sortKey, sortDir, cols]
  );
  const pg = usePagination(
    sorted, pageSize,
    JSON.stringify([search, status, from, to, month, year, sortKey, sortDir, sorted?.length])
  );
  const displayRows = paginated ? pg.pageRows : sorted;

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
            {dateFilter && (
              <DateFilterFields
                from={from} to={to} month={month} year={year} years={years}
                onFrom={setFrom} onTo={setTo} onMonth={setMonth} onYear={setYear}
                onClear={clearDates}
              />
            )}
            <Table
              rows={displayRows}
              cols={cols}
              onRowClick={(r) => setDrawerBooking(r)}
              activeRowId={drawerBooking?.id}
              sortKey={sortable ? sortKey : undefined}
              sortDir={sortDir}
              onSort={sortable ? onSort : undefined}
            />
            {!paginated && (
              <p className="ad-stat-foot" style={{ marginTop: 8 }}>
                Showing {sorted?.length || 0} of {rows.length} bookings.
              </p>
            )}
            {paginated && (
              <PaginationBar page={pg.page} totalPages={pg.totalPages} total={pg.total} pageSize={pg.pageSize} onPage={pg.setPage} />
            )}
          </>
        )}
      </div>
      {drawerBooking && <BookingDrawer booking={drawerBooking} onClose={() => setDrawerBooking(null)} />}
    </div>
  );
}

export function AdminInquiries({ sortable = false, paginated = false, dateFilter = false, pageSize = 20 }) {
  const { rows, loading, remote } = useAdminCollection("inquiries", { max: 200 });
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };
  const clearDates = () => { setFrom(""); setTo(""); setMonth(""); setYear(""); };

  const cols = useMemo(() => [
    { key: "pujaId", label: "Puja", sortable, sortValue: (r) => r.pujaId || "" },
    { key: "name", label: "Name", render: (r) => scrubText(r.name || "—"), sortable, sortValue: (r) => r.name || "" },
    { key: "userEmail", label: "Email", render: (r) => maskEmail(r.userEmail || "—"), sortable, sortValue: (r) => r.userEmail || "" },
    { key: "phone", label: "Phone", sortable, sortValue: (r) => r.phone || "" },
    { key: "message", label: "Message", render: (r) => <span style={{ whiteSpace: "pre-wrap" }}>{scrubText(r.message || "—")}</span> },
    { key: "source", label: "Source", sortable, sortValue: (r) => r.source || "" },
    // Visible on staff (sortable) tables; super-admin keeps its current columns.
    ...(sortable ? [{ key: "status", label: "Status", sortable, sortValue: (r) => r.status || "" }] : []),
    { key: "createdAt", label: "Created", render: (r) => fmt(r.createdAt), sortable, sortValue: (r) => millis(r.createdAt) },
  ], [sortable]);

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
    if (dateFilter) out = applyDateFilter(out, { from, to, month, year }, (r) => asDate(r.createdAt));
    return out;
  }, [rows, status, search, dateFilter, from, to, month, year]);

  const years = useMemo(
    () => (dateFilter ? yearOptions(rows, (r) => asDate(r.createdAt)) : []),
    [rows, dateFilter]
  );
  const sorted = useMemo(
    () => (sortable ? sortRows(filtered, sortKey, sortDir, cols) : filtered),
    [filtered, sortable, sortKey, sortDir, cols]
  );
  const pg = usePagination(
    sorted, pageSize,
    JSON.stringify([search, status, from, to, month, year, sortKey, sortDir, sorted?.length])
  );
  const displayRows = paginated ? pg.pageRows : sorted;

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
            {dateFilter && (
              <DateFilterFields
                from={from} to={to} month={month} year={year} years={years}
                onFrom={setFrom} onTo={setTo} onMonth={setMonth} onYear={setYear}
                onClear={clearDates}
              />
            )}
            <Table
              rows={displayRows}
              cols={cols}
              sortKey={sortable ? sortKey : undefined}
              sortDir={sortDir}
              onSort={sortable ? onSort : undefined}
            />
            {!paginated && (
              <p className="ad-stat-foot" style={{ marginTop: 8 }}>
                Showing {sorted?.length || 0} of {rows.length} inquiries.
              </p>
            )}
            {paginated && (
              <PaginationBar page={pg.page} totalPages={pg.totalPages} total={pg.total} pageSize={pg.pageSize} onPage={pg.setPage} />
            )}
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
