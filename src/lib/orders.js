// Customer orders in Firestore (`bookings`).
// - saveBooking: idempotent upsert keyed by user+puja+date, called from
//   BookingConfirmation when signed in (fire-and-forget, local flow unaffected).
// - useBookings: live list for MyBookings; null when signed out/unconfigured
//   so pages fall back to local/demo content.
// - updateBookingStatus: admin-only status change (manual workflow).
// - archiveDelivered: client-side auto-archive sweep run on admin dashboard.
import { useEffect, useState } from "react";
import {
  collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc,
  updateDoc, where,
} from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";
import { BOOKING_STATUS, isAutoArchiveDue } from "./bookingStatus";
import { getArchiveAfterDays } from "./settings";

function slug(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
}

export function bookingDocId(userId, booking) {
  return `${userId}_${slug(booking?.pujaId)}_${slug(booking?.date)}_${slug(booking?.time)}`.slice(0, 120);
}

/**
 * Idempotent upsert — preserves existing status/deliveredAt/archivedAt so
 * re-saving a booking doesn't reset the admin's workflow.
 */
export async function saveBooking(userId, booking, { addressId = null, source = "web" } = {}) {
  if (!firebaseConfigured || !db || !userId || !booking?.pujaId) return null;
  const id = bookingDocId(userId, booking);
  const payload = {
    userId,
    pujaId: booking.pujaId,
    date: booking.date || null,
    time: booking.time || null,
    package: booking.package || null,
    packagePrice: booking.packagePrice ?? null,
    addons: Array.isArray(booking.addons) ? booking.addons : [],
    sankalp: booking.sankalp || null,
    payment: booking.payment || null,
    source,
    addressId: addressId || null,
    // Status: only set on first creation — admin overrides after.
    status: BOOKING_STATUS.pending ? "pending" : "pending",
    updatedAt: serverTimestamp(),
  };
  try {
    const ref = doc(db, "bookings", id);
    const existing = await getDoc(ref);
    if (existing.exists()) {
      // Merge but never overwrite status/admin fields.
      await setDoc(ref, {
        ...payload,
        // Drop status from the merge — keep the existing admin-set value.
        status: existing.data().status || "pending",
        deliveredAt: existing.data().deliveredAt || null,
        archivedAt: existing.data().archivedAt || null,
      }, { merge: true });
    } else {
      await setDoc(ref, {
        ...payload,
        status: "pending",
        createdAt: serverTimestamp(),
      }, { merge: true });
    }
    return id;
  } catch {
    return null; // offline / rules — local WhatsApp flow is unaffected
  }
}

/** Admin-only: change a booking's status. Sets deliveredAt/archivedAt as needed. */
export async function updateBookingStatus(bookingId, newStatus, user) {
  if (!firebaseConfigured || !db || !bookingId) return { ok: false, error: "not-configured" };
  const patch = {
    status: newStatus,
    updatedAt: serverTimestamp(),
    updatedBy: user?.email || user?.uid || null,
  };
  if (newStatus === "delivered" && !patch.deliveredAt) patch.deliveredAt = serverTimestamp();
  if (newStatus === "archived") patch.archivedAt = serverTimestamp();
  try {
    await updateDoc(doc(db, "bookings", bookingId), patch);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message };
  }
}

/**
 * Auto-archive sweep: walks delivered bookings, archives any whose
 * deliveredAt + archiveAfterDays has elapsed. Call from admin dashboard load.
 * @returns number of bookings archived.
 */
export async function archiveDeliveredBookings(settings) {
  if (!firebaseConfigured || !db) return 0;
  const days = getArchiveAfterDays(settings);
  if (!days) return 0; // auto-archive disabled
  try {
    const snap = await getDocs(query(collection(db, "bookings"), where("status", "==", "delivered")));
    let archived = 0;
    for (const d of snap.docs) {
      const data = d.data();
      if (isAutoArchiveDue(data, days)) {
        try {
          await updateDoc(d.ref, {
            status: "archived",
            archivedAt: serverTimestamp(),
            autoArchived: true,
          });
          archived += 1;
        } catch { /* ignore individual failures */ }
      }
    }
    return archived;
  } catch {
    return 0;
  }
}

export function useBookings(user) {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(Boolean(firebaseConfigured && user));
  useEffect(() => {
    if (!firebaseConfigured || !db || !user) { setBookings(null); setLoading(false); return; }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, "bookings"), where("userId", "==", user.uid)));
        if (cancelled) return;
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        rows.sort((a, b) => {
          const ta = a.createdAt?.toMillis?.() || 0;
          const tb = b.createdAt?.toMillis?.() || 0;
          return tb - ta;
        });
        setBookings(rows);
      } catch { if (!cancelled) setBookings([]); }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user?.uid]); // eslint-disable-line react-hooks/exhaustive-deps
  return { bookings, loading };
}
