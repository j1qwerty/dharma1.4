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
import { useEffect, useRef, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";
import { COLLECTIONS, TRASH_RETENTION_DAYS, VERSION_LIMIT } from "./content";

const canWrite = () => firebaseConfigured && db;

function slugId(s, fallback = "item") {
  const s2 = String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
  return s2 || `${fallback}-${Date.now().toString(36)}`;
}

// Strip backend-only keys before snapshotting a version.
function snapshotOf(data) {
  const { versions, updatedAt, updatedBy, createdAt, ...rest } = data || {};
  try {
    return JSON.parse(JSON.stringify(rest));
  } catch {
    return { ...rest };
  }
}

function trashExpiry() {
  const d = new Date(Date.now() + TRASH_RETENTION_DAYS * 864e5);
  return Timestamp.fromDate(d);
}

export function isTrashExpired(docData, now = new Date()) {
  const del =
    docData?.deleteAt?.toDate?.() || (docData?.deleteAt ? new Date(docData.deleteAt) : null);
  return Boolean(del && now >= del);
}

function rulesHint(e) {
  if (e?.code === "permission-denied" || /insufficient permissions/i.test(e?.message || "")) {
    return " (Missing or insufficient permissions — check: 1) your account has an admins/{uid} doc, 2) latest firestore.rules are deployed: firebase deploy --only firestore:rules)";
  }
  return "";
}

/** Create a new content doc (id auto from title/name/key when omitted). */
export async function createContent(collectionName, data, user, { status = "draft" } = {}) {
  if (!canWrite()) throw new Error("Firebase not configured");
  const base = data?.title || data?.name || data?.key || data?.id || "item";
  const id = data?.id || slugId(base);
  const ref = doc(db, collectionName, id);
  // NOTE: getDoc on a MISSING doc can throw permission-denied even for admins
  // when rules reference resource.data (null for missing docs). The write
  // below is authoritative, so a failed existence check must not block creation.
  try {
    const existing = await getDoc(ref);
    if (existing.exists()) throw new Error(`ID "${id}" already exists`);
  } catch (e) {
    if (e?.message?.includes("already exists")) throw e;
    // fall through — setDoc enforces admin-only via rules
  }
  const clean = snapshotOf(data);
  const by = user?.email || user?.uid || null;
  const payload = {
    ...clean,
    id,
    status,
    version: 1,
    versions: [],
    updatedAt: serverTimestamp(),
    updatedBy: by,
    createdAt: serverTimestamp(),
  };
  try {
    await setDoc(ref, payload);
    await addDoc(collection(db, collectionName, id, "history"), {
      v: 1,
      at: serverTimestamp(),
      by,
      data: clean,
      action: "create",
    });
  } catch (e) {
    throw new Error(`Create failed: ${e.message}${rulesHint(e)}`);
  }
  return id;
}

/**
 * Update a doc with versioning.
 * - Pushes CURRENT server state onto versions[] (capped at 5) + history subcollection (uncapped).
 * - Then merges `data` + bumps version. Restoring a version also goes through here
 *   (so restore itself is versioned and undoable).
 */
export async function saveContent(
  collectionName,
  id,
  data,
  user,
  { status, action = "update" } = {}
) {
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
  try {
    await addDoc(collection(db, collectionName, id, "history"), {
      v: prevVersion,
      at: serverTimestamp(),
      by,
      data: prevSnap,
      action,
    });
    await setDoc(
      ref,
      {
        ...clean,
        id,
        ...(status ? { status } : {}),
        version: nextVersion,
        versions: nextVersions,
        updatedAt: serverTimestamp(),
        updatedBy: by,
      },
      { merge: true }
    );
  } catch (e) {
    throw new Error(`Save failed: ${e.message}${rulesHint(e)}`);
  }
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
  try {
    await addDoc(collection(db, collectionName, id, "history"), {
      v: Number(current.version) || 1,
      at: serverTimestamp(),
      by,
      data: snapshotOf(current),
      action: "soft-delete",
    });
    await setDoc(
      ref,
      {
        status: "deleted",
        deletedAt: serverTimestamp(),
        deleteAt: trashExpiry(),
        updatedAt: serverTimestamp(),
        updatedBy: by,
      },
      { merge: true }
    );
  } catch (e) {
    throw new Error(`Delete failed: ${e.message}${rulesHint(e)}`);
  }
}

/** Restore from trash → back to draft (admin re-publishes explicitly). */
export async function restoreContent(collectionName, id, user) {
  if (!canWrite()) throw new Error("Firebase not configured");
  const by = user?.email || user?.uid || null;
  await setDoc(
    doc(db, collectionName, id),
    {
      status: "draft",
      deletedAt: null,
      deleteAt: null,
      updatedAt: serverTimestamp(),
      updatedBy: by,
    },
    { merge: true }
  );
  await addDoc(collection(db, collectionName, id, "history"), {
    v: null,
    at: serverTimestamp(),
    by,
    data: null,
    action: "restore",
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
    if (isTrashExpired(d.data(), now)) {
      await hardDeleteContent(collectionName, d.id);
      purged += 1;
    }
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
  return saveContent(collectionName, id, versionEntry.data, user, {
    action: `restore-v${versionEntry.v ?? "?"}`,
  });
}

// ---- bookings + inquiries: always persist, even when continuing on WhatsApp ----
function bookingSlug(b) {
  return String(b?.pujaId || b?.puja || "puja")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 40);
}

export async function logBooking(booking, user, { source = "web", status = "pending" } = {}) {
  if (!canWrite()) return null;
  try {
    const ref = await addDoc(collection(db, "bookings"), {
      ...booking,
      userId: user?.uid || null,
      userEmail: user?.email || booking?.email || null,
      source,
      status, // pending by default — admin advances the workflow.
      deliveredAt: null,
      archivedAt: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  } catch {
    return null;
  }
}

export async function logInquiry(
  { pujaId, pujaCode, name, phone, message, lang = "en" },
  user,
  { source = "puja-page" } = {}
) {
  if (!canWrite()) return null;
  try {
    const ref = await addDoc(collection(db, "inquiries"), {
      pujaId: pujaId || null,
      pujaCode: pujaCode || null,
      name: name || null,
      phone: phone || null,
      message: message || null,
      lang,
      userId: user?.uid || null,
      userEmail: user?.email || null,
      source,
      status: "new",
      createdAt: serverTimestamp(),
    });
    return ref.id;
  } catch {
    return null;
  }
}

export { bookingSlug };

// ---- checkout progress: resilient per-step persistence for the booking flow ----
// Problem it solves: writes used to fire only at the very end (payment click /
// confirmation mount), so slow networks, tab closes, or refreshes lost the
// whole booking. Now every step upserts ONE stable draft doc (no duplicates),
// failures land in a localStorage outbox retried on reconnect, and the
// confirmation marks the same doc completed. Admin advances status from there.
import { useAuth } from "./auth";
import { useBooking } from "./booking";

const CLIENT_BID_KEY = "dt-client-booking-id";
const CLIENT_BID_PUJA_KEY = "dt-client-booking-puja";
const OUTBOX_KEY = "dt-booking-outbox";
const DRAFT_CREATED_PREFIX = "dt-draft-created-";

function lsGet(k) {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
}
function lsSet(k, v) {
  try {
    if (v == null) localStorage.removeItem(k);
    else localStorage.setItem(k, v);
  } catch {
    /* storage unavailable */
  }
}
function lsJson(k, fallback) {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function newClientBid() {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID().slice(0, 8);
  } catch {
    /* fall through */
  }
  return `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`;
}

/** Stable per-checkout-flow id. New puja = new flow (auto-separated). Survives refresh. */
export function getClientBookingId(pujaId) {
  const cur = lsGet(CLIENT_BID_KEY);
  const curPuja = lsGet(CLIENT_BID_PUJA_KEY);
  if (cur && curPuja === (pujaId || "")) return cur;
  const id = newClientBid();
  lsSet(CLIENT_BID_KEY, id);
  lsSet(CLIENT_BID_PUJA_KEY, pujaId || "");
  return id;
}

export function checkoutDocId(booking, user) {
  const bid = getClientBookingId(booking?.pujaId || "puja");
  return user?.uid ? `draft_${user.uid}_${bid}` : `draft_guest_${bid}`;
}

/** Firestore rejects `undefined` — deep-convert to null so snapshots never fail to write. */
function cleanForFirestore(v) {
  if (v === undefined) return null;
  if (Array.isArray(v)) return v.map(cleanForFirestore);
  if (v && typeof v === "object" && !(v instanceof Date)) {
    const out = {};
    for (const [k, val] of Object.entries(v)) out[k] = cleanForFirestore(val);
    return out;
  }
  return v;
}

// ---- offline outbox (localStorage queue, flushed on reconnect / next save) ----
function readOutbox() {
  const box = lsJson(OUTBOX_KEY, []);
  return Array.isArray(box) ? box : [];
}
function writeOutbox(box) {
  try {
    localStorage.setItem(OUTBOX_KEY, JSON.stringify(box.slice(0, 20)));
  } catch {
    /* ignore */
  }
}

export function queueCheckoutEntry(docId, payload) {
  if (!docId || !payload) return;
  const box = readOutbox().filter((e) => e?.docId !== docId);
  box.push({ docId, payload, ts: Date.now() });
  writeOutbox(box);
}

export async function flushCheckoutOutbox() {
  if (!canWrite()) return 0;
  const box = readOutbox();
  if (!box.length) return 0;
  const remaining = [];
  for (const e of box) {
    try {
      await setDoc(
        doc(db, "bookings", e.docId),
        { ...e.payload, updatedAt: serverTimestamp() },
        { merge: true }
      );
    } catch {
      remaining.push(e);
    }
  }
  writeOutbox(remaining);
  return box.length - remaining.length;
}

let onlineHooked = false;
function ensureOnlineFlush() {
  if (onlineHooked || typeof window === "undefined") return;
  onlineHooked = true;
  try {
    window.addEventListener("online", () => {
      flushCheckoutOutbox().catch(() => {});
    });
  } catch {
    /* ignore */
  }
}

function buildProgressPayload(snapshot, user, { step, completed, source }) {
  const bid = getClientBookingId(snapshot?.pujaId || "puja");
  const docId = checkoutDocId(snapshot, user);
  const createdFlag = `${DRAFT_CREATED_PREFIX}${bid}`;
  const isFirst = !lsGet(createdFlag);
  const payload = {
    ...cleanForFirestore(snapshot),
    id: docId,
    clientBookingId: bid,
    userId: user?.uid || null,
    userEmail: user?.email || snapshot?.email || null,
    checkoutStep: step || "unknown",
    completed: Boolean(completed),
    source: source || "web",
    // status/admin timestamps are set ONLY on first save — later merges must
    // never clobber values the admin set (or the original createdAt).
    ...(isFirst
      ? { status: "pending", deliveredAt: null, archivedAt: null, createdAt: serverTimestamp() }
      : {}),
  };
  return { docId, payload, createdFlag };
}

/**
 * Upsert the stable draft doc for this checkout flow. Never throws:
 * resolves to the doc id on success, queues to the outbox + resolves null
 * when offline or on failure (retried automatically on reconnect/next save).
 */
export async function saveCheckoutProgress(
  { booking, user, step = "unknown", completed = false, source = "web" } = {}
) {
  if (!canWrite() || !booking?.pujaId) return null;
  ensureOnlineFlush();
  const { docId, payload, createdFlag } = buildProgressPayload(booking, user, {
    step,
    completed,
    source,
  });
  try {
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      throw new Error("offline");
    }
    await setDoc(
      doc(db, "bookings", docId),
      { ...payload, updatedAt: serverTimestamp() },
      { merge: true }
    );
    lsSet(createdFlag, "1");
    // Piggyback: flush anything queued while we were offline.
    flushCheckoutOutbox().catch(() => {});
    return docId;
  } catch {
    queueCheckoutEntry(docId, payload);
    return null;
  }
}

/**
 * Call once per booking-step page. Saves on mount (covers refresh landings),
 * on unmount (covers step-to-step navigation), on tab hide/close, and flushes
 * the outbox when back online. Slow internet just delays — never loses — the write.
 */
export function useCheckoutProgressSync(step, pujaIdOverride) {
  const { booking } = useBooking();
  const { user } = useAuth();
  const latest = useRef(null);
  latest.current = { booking, user, step, pujaIdOverride };

  useEffect(() => {
    const snapOf = (cur) => ({
      ...cur.booking,
      pujaId: cur.pujaIdOverride || cur.booking?.pujaId,
    });
    const cur = latest.current;
    if (cur?.booking?.pujaId || cur?.pujaIdOverride) {
      saveCheckoutProgress({ booking: snapOf(cur), user: cur.user, step }).catch(() => {});
    }
    flushCheckoutOutbox().catch(() => {});
    const onOnline = () => flushCheckoutOutbox().catch(() => {});
    const onHide = () => {
      // Tab closed/hidden mid-write: stage the latest snapshot so the next
      // visit (any page running this hook) flushes it.
      try {
        const c = latest.current;
        const snap = { ...c.booking, pujaId: c.pujaIdOverride || c.booking?.pujaId };
        if (!snap?.pujaId) return;
        const { docId, payload } = buildProgressPayload(snap, c.user, {
          step: c.step,
          completed: false,
          source: "web",
        });
        queueCheckoutEntry(docId, payload);
      } catch {
        /* ignore */
      }
    };
    window.addEventListener("online", onOnline);
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("pagehide", onHide);
      try {
        const c = latest.current;
        const snap = { ...c.booking, pujaId: c.pujaIdOverride || c.booking?.pujaId };
        if (snap?.pujaId) {
          saveCheckoutProgress({ booking: snap, user: c.user, step: c.step }).catch(() => {});
        }
      } catch {
        /* ignore */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
}

// ---- admin read hooks (include drafts + trash flags; public hooks stay published-only) ----
export function useAdminCollection(collectionName, { includeDeleted = false, max = 200 } = {}) {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(canWrite());
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    if (!canWrite()) {
      setRows(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const orderField = COLLECTIONS[collectionName]?.orderField;
        const constraints = [];
        if (orderField) {
          try {
            constraints.push(orderBy(orderField));
          } catch {
            /* index-less fallback */
          }
        }
        constraints.push(limit(max));
        const snap = await getDocs(query(collection(db, collectionName), ...constraints));
        if (cancelled) return;
        let docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        if (!includeDeleted) docs = docs.filter((d) => d.status !== "deleted");
        setRows(docs);
      } catch (e) {
        if (!cancelled) setError(e);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [collectionName, includeDeleted, max, refreshKey]);
  const refresh = () => setRefreshKey((k) => k + 1);
  return { rows, loading, error, remote: canWrite(), refresh };
}

export function useTrashCollection(collectionName) {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(canWrite());
  useEffect(() => {
    if (!canWrite()) {
      setRows(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, collectionName), where("status", "==", "deleted"), limit(200))
        );
        if (!cancelled) setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        if (!cancelled) setRows([]);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [collectionName]);
  return { rows, loading };
}

/**
 * Admin: fetch a single user's addresses (subcollection users/{uid}/addresses).
 * Used by the bookings admin page to display the delivery address.
 */
export async function fetchUserAddresses(userId) {
  if (!canWrite() || !userId) return [];
  try {
    const snap = await getDocs(collection(db, "users", userId, "addresses"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}
