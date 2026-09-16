// CMS write backend — versioning, soft-delete (30-day trash), full history.
// Reads stay in src/lib/cms.js (public, published-only). Everything here is
// admin-only and must be called behind RequireAdmin.
//
// Data model per content doc:
//   { ...fields, status: 'published'|'draft'|'deleted',
//     order/priority, startDate/endDate (scheduling, see schedule.js),
//     version: n, versions: [{v, at, by, data}] (last 5, quick restore),
//     deletedAt, deleteAt (trash expiry), updatedAt, updatedBy, createdAt }
// Full audit: {collection}/{id}/history/{autoId} → {v, at, by, data, action}
//   - festivals: UI reads FULL history subcollection (per spec)
//   - everything else: UI reads doc.versions (last 5) for the right-side panel
// Bookings/inquiries: logBooking/logInquiry persist even when the user
// continues on WhatsApp — call BEFORE opening wa.me.
import { useEffect, useState } from "react";
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy,
  query, serverTimestamp, setDoc, Timestamp, where,
} from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";
import { COLLECTIONS, TRASH_RETENTION_DAYS, VERSION_LIMIT } from "./content";

const canWrite = () => firebaseConfigured && db;

function slugId(s, fallback = "item") {
  const s2 = String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
  return s2 || `${fallback}-${Date.now().toString(36)}`;
}

// Strip backend-only keys before snapshotting a version.
function snapshotOf(data) {
  const { versions, updatedAt, updatedBy, createdAt, ...rest } = data || {};
  try { return JSON.parse(JSON.stringify(rest)); } catch { return { ...rest }; }
}

function trashExpiry() {
  const d = new Date(Date.now() + TRASH_RETENTION_DAYS * 864e5);
  return Timestamp.fromDate(d);
}

export function isTrashExpired(docData, now = new Date()) {
  const del = docData?.deleteAt?.toDate?.() || (docData?.deleteAt ? new Date(docData.deleteAt) : null);
  return Boolean(del && now >= del);
}

/** Create a new content doc (id auto from title/name/key when omitted). */
export async function createContent(collectionName, data, user, { status = "draft" } = {}) {
  if (!canWrite()) throw new Error("Firebase not configured");
  const base = data?.title || data?.name || data?.key || data?.id || "item";
  const id = data?.id || slugId(base);
  const ref = doc(db, collectionName, id);
  const existing = await getDoc(ref);
  if (existing.exists()) throw new Error(`ID "${id}" already exists`);
  const clean = snapshotOf(data);
  const by = user?.email || user?.uid || null;
  const payload = {
    ...clean, id,
    status,
    version: 1, versions: [],
    updatedAt: serverTimestamp(), updatedBy: by, createdAt: serverTimestamp(),
  };
  await setDoc(ref, payload);
  await addDoc(collection(db, collectionName, id, "history"), {
    v: 1, at: serverTimestamp(), by, data: clean, action: "create",
  });
  return id;
}

/**
 * Update a doc with versioning.
 * - Pushes CURRENT server state onto versions[] (capped at 5) + history subcollection (uncapped).
 * - Then merges `data` + bumps version. Restoring a version also goes through here
 *   (so restore itself is versioned and undoable).
 */
export async function saveContent(collectionName, id, data, user, { status, action = "update" } = {}) {
  if (!canWrite()) throw new Error("Firebase not configured");
  if (!id) throw new Error("Missing doc id");
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error(`Not found: ${collectionName}/${id}`);
  const current = snap.data() || {};
  const by = user?.email || user?.uid || null;
  const prevVersion = Number(current.version) || 1;
  const nextVersion = prevVersion + 1;
  const prevSnap = snapshotOf(current);
  const nextVersions = [
    { v: prevVersion, at: new Date().toISOString(), by: current.updatedBy || null, data: prevSnap },
    ...(Array.isArray(current.versions) ? current.versions : []),
  ].slice(0, VERSION_LIMIT);
  const clean = snapshotOf(data);
  await addDoc(collection(db, collectionName, id, "history"), {
    v: prevVersion, at: serverTimestamp(), by, data: prevSnap, action,
  });
  await setDoc(ref, {
    ...clean, id,
    ...(status ? { status } : {}),
    version: nextVersion, versions: nextVersions,
    updatedAt: serverTimestamp(), updatedBy: by,
  }, { merge: true });
  return nextVersion;
}

/** Soft-delete → status='deleted', kept 30 days, auto-purged after. */
export async function softDeleteContent(collectionName, id, user) {
  if (!canWrite()) throw new Error("Firebase not configured");
  const ref = doc(db, collectionName, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Not found");
  const current = snap.data() || {};
  const by = user?.email || user?.uid || null;
  await addDoc(collection(db, collectionName, id, "history"), {
    v: Number(current.version) || 1, at: serverTimestamp(), by,
    data: snapshotOf(current), action: "soft-delete",
  });
  await setDoc(ref, {
    status: "deleted",
    deletedAt: serverTimestamp(), deleteAt: trashExpiry(),
    updatedAt: serverTimestamp(), updatedBy: by,
  }, { merge: true });
}

/** Restore from trash → back to draft (admin re-publishes explicitly). */
export async function restoreContent(collectionName, id, user) {
  if (!canWrite()) throw new Error("Firebase not configured");
  const by = user?.email || user?.uid || null;
  await setDoc(doc(db, collectionName, id), {
    status: "draft",
    deletedAt: null, deleteAt: null,
    updatedAt: serverTimestamp(), updatedBy: by,
  }, { merge: true });
  await addDoc(collection(db, collectionName, id, "history"), {
    v: null, at: serverTimestamp(), by, data: null, action: "restore",
  });
}

/** Permanently delete one doc + its history (admin action or auto-purge). */
export async function hardDeleteContent(collectionName, id) {
  if (!canWrite()) return;
  const hSnap = await getDocs(collection(db, collectionName, id, "history"));
  await Promise.all(hSnap.docs.map((d) => deleteDoc(d.ref)));
  await deleteDoc(doc(db, collectionName, id));
}

/** Purge all trash-expired docs in a collection. Call from Admin trash + dashboard. */
export async function purgeExpiredTrash(collectionName, now = new Date()) {
  if (!canWrite()) return 0;
  const q = query(collection(db, collectionName), where("status", "==", "deleted"), limit(100));
  const snap = await getDocs(q);
  let purged = 0;
  for (const d of snap.docs) {
    if (isTrashExpired(d.data(), now)) { await hardDeleteContent(collectionName, d.id); purged += 1; }
  }
  return purged;
}

/** Last-5 quick versions stored on the doc (right-side restore panel). */
export async function getVersions(collectionName, id) {
  if (!canWrite()) return [];
  const snap = await getDoc(doc(db, collectionName, id));
  const v = snap.exists() ? snap.data()?.versions : null;
  return Array.isArray(v) ? v : [];
}

/** Full history (uncapped) — used for festivals per spec; paginated. */
export async function getFullHistory(collectionName, id, max = 100) {
  if (!canWrite()) return [];
  const q = query(collection(db, collectionName, id, "history"), orderBy("at", "desc"), limit(max));
  try {
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    // orderBy+limit may need an index on first use — fall back to unordered read.
    const snap = await getDocs(collection(db, collectionName, id, "history"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() })).slice(0, max);
  }
}

/** Click a version on the right → refill the form (caller sets form state),
 *  then Save goes through saveContent so the restore is itself versioned. */
export async function restoreVersion(collectionName, id, versionEntry, user) {
  if (!versionEntry?.data) throw new Error("Version has no data");
  return saveContent(collectionName, id, versionEntry.data, user, { action: `restore-v${versionEntry.v ?? "?"}` });
}

// ---- bookings + inquiries: always persist, even when continuing on WhatsApp ----
function bookingSlug(b) {
  return String(b?.pujaId || b?.puja || "puja").toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
}

export async function logBooking(booking, user, { source = "web", status = "new" } = {}) {
  if (!canWrite()) return null;
  try {
    const ref = await addDoc(collection(db, "bookings"), {
      ...booking,
      userId: user?.uid || null, userEmail: user?.email || booking?.email || null,
      source, status,
      createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
    });
    return ref.id;
  } catch { return null; }
}

export async function logInquiry({ pujaId, pujaCode, name, phone, message, lang = "en" }, user, { source = "puja-page" } = {}) {
  if (!canWrite()) return null;
  try {
    const ref = await addDoc(collection(db, "inquiries"), {
      pujaId: pujaId || null, pujaCode: pujaCode || null,
      name: name || null, phone: phone || null, message: message || null, lang,
      userId: user?.uid || null, source, status: "new",
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch { return null; }
}

export { bookingSlug };

// ---- admin read hooks (include drafts + trash flags; public hooks stay published-only) ----
export function useAdminCollection(collectionName, { includeDeleted = false, max = 200 } = {}) {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(canWrite());
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!canWrite()) { setRows(null); setLoading(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const orderField = COLLECTIONS[collectionName]?.orderField;
        const constraints = [];
        if (orderField) { try { constraints.push(orderBy(orderField)); } catch { /* index-less fallback */ } }
        constraints.push(limit(max));
        const snap = await getDocs(query(collection(db, collectionName), ...constraints));
        if (cancelled) return;
        let docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (!includeDeleted) docs = docs.filter((d) => d.status !== "deleted");
        setRows(docs);
      } catch (e) { if (!cancelled) setError(e); }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [collectionName, includeDeleted, max]);
  return { rows, loading, error, remote: canWrite() };
}

export function useTrashCollection(collectionName) {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(canWrite());
  useEffect(() => {
    if (!canWrite()) { setRows(null); setLoading(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, collectionName), where("status", "==", "deleted"), limit(200)));
        if (!cancelled) setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch { if (!cancelled) setRows([]); }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [collectionName]);
  return { rows, loading };
}
