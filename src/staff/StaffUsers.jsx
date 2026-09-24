// Staff → Users: customer accounts only, with last login.
// Click a row to open the full user detail (bookings, inquiries, wishlist, addresses).
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminCollection } from "../lib/cmsAdmin";
import { useAdminIds } from "../admin/pages/AdminTables";
import { isHiddenEmail, scrubText } from "../lib/privacy";
import { isCustomer } from "../lib/roles";
import { fmt } from "./common";

export default function StaffUsers() {
  const { rows, loading, remote } = useAdminCollection("users", { max: 200 });
  const adminIds = useAdminIds();
  const [search, setSearch] = useState("");
  const nav = useNavigate();

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
    return out;
  }, [rows, adminIds, search]);

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
          <div className="ad-table-wrap">
            <div className="ad-table-scroll">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Last login</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((r) => (
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
          <p className="ad-stat-foot" style={{ marginTop: 8 }}>
            Showing {users.length} of {rows.length} accounts.
          </p>
        </>
      )}
    </div>
  );
}
