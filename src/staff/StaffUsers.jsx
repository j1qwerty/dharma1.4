// Staff → Users: customer accounts only, with last login.
// Click a row to open the full user detail (bookings, inquiries, wishlist, addresses).
// Headers sort asc/desc; month/year + from–to filter on joined date; paginated.
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminCollection } from "../lib/cmsAdmin";
import {
  useAdminIds,
  sortRows,
  applyDateFilter,
  asDate,
  yearOptions,
  DateFilterFields,
  usePagination,
  PaginationBar,
} from "../admin/pages/AdminTables";
import { isHiddenEmail, scrubText } from "../lib/privacy";
import { isCustomer } from "../lib/roles";
import { fmt } from "./common";

const USER_COLS = [
  { key: "displayName", label: "Name", sortValue: (r) => r.displayName || "" },
  { key: "email", label: "Email", sortValue: (r) => r.email || "" },
  { key: "phone", label: "Phone", sortValue: (r) => r.phone || "" },
  { key: "lastLoginAt", label: "Last login", sortValue: (r) => r.lastLoginAt?.toMillis?.() || 0 },
  { key: "createdAt", label: "Joined", sortValue: (r) => r.createdAt?.toMillis?.() || 0 },
];

export default function StaffUsers() {
  const { rows, loading, remote } = useAdminCollection("users", { max: 200 });
  const adminIds = useAdminIds();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const nav = useNavigate();

  const onSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };
  const clearDates = () => { setFrom(""); setTo(""); setMonth(""); setYear(""); };

  const users = useMemo(() => {
    if (!rows) return null;
    const staffIds = adminIds || new Set();
    let out = rows.filter(
      (r) => isCustomer(r.role) && !isHiddenEmail(r.email) && !staffIds.has(r.id)
    );
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter(
        (r) =>
          String(r.email || "").toLowerCase().includes(q) ||
          String(r.displayName || "").toLowerCase().includes(q) ||
          String(r.phone || "").toLowerCase().includes(q) ||
          String(r.id || "").toLowerCase().includes(q)
      );
    }
    out = applyDateFilter(out, { from, to, month, year }, (r) => asDate(r.createdAt));
    return sortRows(out, sortKey, sortDir, USER_COLS);
  }, [rows, adminIds, search, from, to, month, year, sortKey, sortDir]);

  const years = useMemo(() => yearOptions(rows, (r) => asDate(r.createdAt)), [rows]);
  const pg = usePagination(
    users, 20,
    JSON.stringify([search, from, to, month, year, sortKey, sortDir, users?.length])
  );

  return (
    <div>
      <header className="ad-page-head">
        <div className="ad-page-head-text">
          <div className="ad-eyebrow">Users</div>
          <h1 className="ad-page-title">Customers</h1>
          <p className="ad-page-sub">
            Customer accounts with last login. Click a row for bookings, inquiries, wishlist and addresses.
          </p>
        </div>
        {users && (
          <div className="ad-page-actions">
            <div className="ad-stat" style={{ padding: "8px 14px", minWidth: 100 }}>
              <div className="ad-stat-label">Total</div>
              <div className="ad-stat-value">{users.length}</div>
            </div>
          </div>
        )}
      </header>

      {!remote && <p className="ad-msg ad-msg-warn">Firebase not configured.</p>}
      {(loading || !users) && <p className="ad-stat-foot">Loading…</p>}
      {users && users.length === 0 && <p className="ad-stat-foot">No customers yet.</p>}
      {users && users.length > 0 && (
        <>
          <input
            type="search"
            placeholder="Search name, email, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ad-input ad-input-sm"
            style={{ maxWidth: 340, marginBottom: 14 }}
          />
          <DateFilterFields
            from={from} to={to} month={month} year={year} years={years}
            onFrom={setFrom} onTo={setTo} onMonth={setMonth} onYear={setYear}
            onClear={clearDates}
          />
          <div className="ad-table-wrap">
            <div className="ad-table-scroll">
              <table className="ad-table">
                <thead>
                  <tr>
                    {USER_COLS.map((c) => (
                      <th
                        key={c.key}
                        aria-sort={sortKey === c.key ? (sortDir === "asc" ? "ascending" : "descending") : undefined}
                      >
                        <button type="button" className="ad-th-sort" onClick={() => onSort(c.key)} title={`Sort by ${c.label}`}>
                          {c.label}
                          <span aria-hidden="true" className={sortKey === c.key ? "on" : ""}>
                            {sortKey === c.key ? (sortDir === "asc" ? " ▲" : " ▼") : " ⇅"}
                          </span>
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pg.pageRows.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => nav(`/staff/users/${r.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{scrubText(r.displayName || "—")}</td>
                      <td>{r.email || "—"}</td>
                      <td>{r.phone || "—"}</td>
                      <td>{fmt(r.lastLoginAt)}</td>
                      <td>{fmt(r.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <PaginationBar page={pg.page} totalPages={pg.totalPages} total={pg.total} pageSize={pg.pageSize} onPage={pg.setPage} />
        </>
      )}
    </div>
  );
}
