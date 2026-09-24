// Staff → User detail: profile, bookings, inquiries, wishlist, addresses.
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, firebaseConfigured } from "../lib/firebase";
import { fetchUserAddresses, useAdminCollection } from "../lib/cmsAdmin";
import { sortRows, usePagination, PaginationBar } from "../admin/pages/AdminTables";
import { useLivePujas } from "../lib/cms";
import { formatAddress } from "../lib/addresses";
import { scrubText } from "../lib/privacy";
import { StatusBadge } from "../admin/components/ui";
import { fmt } from "./common";

function Section({ title, count, children }) {
  return (
    <div className="ad-card" style={{ marginTop: 16 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <h2 className="ad-card-title" style={{ fontSize: 19 }}>{title}</h2>
        {count != null && <span className="ad-stat-foot">{count}</span>}
      </div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function KV({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "7px 0", borderBottom: "1px dashed var(--adm-line)", fontSize: 13 }}>
      <span className="ad-stat-label" style={{ flexShrink: 0 }}>{label}</span>
      <span style={{ textAlign: "right", overflowWrap: "anywhere" }}>{value}</span>
    </div>
  );
}

export default function StaffUserDetail() {
  const { uid } = useParams();
  const [userDoc, setUserDoc] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [addresses, setAddresses] = useState(null);
  const { items: pujas } = useLivePujas();
  const { rows: bookings } = useAdminCollection("bookings", { includeDeleted: true, max: 200 });
  const { rows: inquiries } = useAdminCollection("inquiries", { max: 200 });

  useEffect(() => {
    if (!firebaseConfigured || !db || !uid) { setUserLoading(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", uid));
        if (!cancelled) setUserDoc(snap.exists() ? { id: snap.id, ...snap.data() } : null);
      } catch {
        if (!cancelled) setUserDoc(null);
      }
      if (!cancelled) setUserLoading(false);
    })();
    return () => { cancelled = true; };
  }, [uid]);

  useEffect(() => {
    if (!uid) { setAddresses([]); return; }
    let cancelled = false;
    (async () => {
      const list = await fetchUserAddresses(uid);
      if (!cancelled) setAddresses(list);
    })();
    return () => { cancelled = true; };
  }, [uid]);

  const email = userDoc?.email || null;
  const [bSortKey, setBSortKey] = useState("createdAt");
  const [bSortDir, setBSortDir] = useState("desc");
  const [qNewest, setQNewest] = useState(true);

  const onBSort = (key) => {
    if (bSortKey === key) setBSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setBSortKey(key); setBSortDir("asc"); }
  };

  const BOOKING_COLS = useMemo(() => [
    { key: "pujaId", label: "Puja", sortValue: (b) => b.pujaId || "" },
    { key: "date", label: "Date", sortValue: (b) => b.date || "" },
    { key: "package", label: "Package", sortValue: (b) => b.package || "" },
    { key: "status", label: "Status", sortValue: (b) => b.status || "" },
    { key: "createdAt", label: "Created", sortValue: (b) => b.createdAt?.toMillis?.() || 0 },
  ], []);

  const userBookings = useMemo(() => {
    if (!bookings) return null;
    const list = bookings.filter((b) => b.userId === uid || (email && b.userEmail === email));
    return sortRows(list, bSortKey, bSortDir, BOOKING_COLS);
  }, [bookings, uid, email, bSortKey, bSortDir, BOOKING_COLS]);
  const userInquiries = useMemo(() => {
    if (!inquiries) return null;
    const list = inquiries.filter((i) => i.userId === uid || (email && i.userEmail === email));
    const dir = qNewest ? "desc" : "asc";
    return sortRows(list, "createdAt", dir, [
      { key: "createdAt", sortValue: (i) => i.createdAt?.toMillis?.() || 0 },
    ]);
  }, [inquiries, uid, email, qNewest]);

  const bPg = usePagination(userBookings, 8, JSON.stringify([bSortKey, bSortDir, userBookings?.length]));
  const qPg = usePagination(userInquiries, 5, JSON.stringify([qNewest, userInquiries?.length]));
  const wishlist = useMemo(() => {
    const ids = Array.isArray(userDoc?.savedPujas) ? userDoc.savedPujas : [];
    return ids.map((id) => pujas.find((p) => p.id === id) || { id, title: id });
  }, [userDoc, pujas]);

  if (userLoading) return <p className="ad-stat-foot">Loading…</p>;
  if (!userDoc) {
    return (
      <div>
        <Link to="/staff/users" className="ad-card-link" style={{ marginTop: 0 }}>← All users</Link>
        <p className="ad-msg ad-msg-warn" style={{ marginTop: 12 }}>User not found.</p>
      </div>
    );
  }

  return (
    <div>
      <Link to="/staff/users" className="ad-card-link" style={{ marginTop: 0 }}>← All users</Link>
      <header className="ad-page-head" style={{ marginTop: 12 }}>
        <div className="ad-page-head-text">
          <div className="ad-eyebrow">Customer</div>
          <h1 className="ad-page-title">{scrubText(userDoc.displayName || "Unnamed")}</h1>
          <p className="ad-page-sub">{userDoc.email || "—"}</p>
        </div>
      </header>

      <div className="ad-card">
        <h2 className="ad-card-title" style={{ fontSize: 19 }}>Profile</h2>
        <div style={{ marginTop: 8 }}>
          <KV label="UID" value={<code className="ad-code">{userDoc.id}</code>} />
          <KV label="Email" value={userDoc.email || "—"} />
          <KV label="Name" value={scrubText(userDoc.displayName || "—")} />
          <KV label="Phone" value={userDoc.phone || "—"} />
          <KV label="Role" value={userDoc.role || "customer"} />
          <KV label="Last login" value={fmt(userDoc.lastLoginAt)} />
          <KV label="Joined" value={fmt(userDoc.createdAt)} />
        </div>
      </div>

      <Section title="Bookings" count={userBookings ? `${userBookings.length}` : "…"}>
        {!userBookings && <p className="ad-stat-foot">Loading…</p>}
        {userBookings && userBookings.length === 0 && (
          <p className="ad-stat-foot">No bookings for this user.</p>
        )}
        {userBookings && userBookings.length > 0 && (
          <>
            <div className="ad-table-wrap">
              <div className="ad-table-scroll">
                <table className="ad-table">
                  <thead>
                    <tr>
                      {BOOKING_COLS.map((c) => (
                        <th
                          key={c.key}
                          aria-sort={bSortKey === c.key ? (bSortDir === "asc" ? "ascending" : "descending") : undefined}
                        >
                          <button type="button" className="ad-th-sort" onClick={() => onBSort(c.key)} title={`Sort by ${c.label}`}>
                            {c.label}
                            <span aria-hidden="true" className={bSortKey === c.key ? "on" : ""}>
                              {bSortKey === c.key ? (bSortDir === "asc" ? " ▲" : " ▼") : " ⇅"}
                            </span>
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bPg.pageRows.map((b) => (
                      <tr key={b.id}>
                        <td>{b.pujaId || "—"}</td>
                        <td>{b.date || "—"}{b.time ? ` · ${b.time}` : ""}</td>
                        <td>{b.package || "—"}</td>
                        <td><StatusBadge status={b.status} /></td>
                        <td>{fmt(b.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <PaginationBar page={bPg.page} totalPages={bPg.totalPages} total={bPg.total} pageSize={bPg.pageSize} onPage={bPg.setPage} />
          </>
        )}
      </Section>

      <Section title="Inquiries" count={userInquiries ? `${userInquiries.length}` : "…"}>
        {!userInquiries && <p className="ad-stat-foot">Loading…</p>}
        {userInquiries && userInquiries.length === 0 && (
          <p className="ad-stat-foot">No inquiries from this user.</p>
        )}
        {userInquiries && userInquiries.length > 0 && (
          <>
            <div style={{ marginBottom: 10 }}>
              <button type="button" className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => setQNewest((v) => !v)}>
                {qNewest ? "Newest first ↓" : "Oldest first ↑"}
              </button>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {qPg.pageRows.map((q) => (
              <div key={q.id} style={{ padding: 12, background: "var(--adm-surface-2)", borderRadius: 8, fontSize: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                  <strong>{q.pujaId || "General"}</strong>
                  <span className="ad-stat-foot">{fmt(q.createdAt)}</span>
                </div>
                {q.message && (
                  <div style={{ marginTop: 6, whiteSpace: "pre-wrap", color: "var(--adm-muted)" }}>
                    {scrubText(q.message)}
                  </div>
                )}
                <div className="ad-stat-foot" style={{ marginTop: 6 }}>
                  {[q.source, q.status, q.phone].filter(Boolean).join(" · ")}
                </div>
              </div>
            ))}
          </div>
          <PaginationBar page={qPg.page} totalPages={qPg.totalPages} total={qPg.total} pageSize={qPg.pageSize} onPage={qPg.setPage} />
          </>
        )}
      </Section>

      <Section title="Wishlist" count={`${wishlist.length}`}>
        {wishlist.length === 0 && <p className="ad-stat-foot">Nothing saved.</p>}
        {wishlist.length > 0 && (
          <div style={{ display: "grid", gap: 8 }}>
            {wishlist.map((p) => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 13 }}>
                <span><strong>{p.title}</strong>{p.deity ? <span className="ad-stat-foot"> · {p.deity}</span> : null}</span>
                {p.price != null && <span className="ad-stat-foot">₹{Number(p.price).toLocaleString("en-IN")}</span>}
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Addresses" count={addresses ? `${addresses.length}` : "…"}>
        {!addresses && <p className="ad-stat-foot">Loading…</p>}
        {addresses && addresses.length === 0 && <p className="ad-stat-foot">No saved addresses.</p>}
        {addresses && addresses.length > 0 && (
          <div style={{ display: "grid", gap: 10 }}>
            {addresses.map((a) => (
              <div key={a.id} style={{ padding: 12, background: "var(--adm-surface-2)", borderRadius: 8, fontSize: 13 }}>
                <div className="ad-stat-label">{a.label || "Address"}</div>
                <div style={{ marginTop: 4 }}>{formatAddress(a)}</div>
                {a.phone && <div className="ad-stat-foot" style={{ marginTop: 4 }}>Phone: {a.phone}</div>}
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
