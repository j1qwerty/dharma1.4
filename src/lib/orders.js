// Customer orders in Firestore (`bookings`).
// - saveBooking: idempotent upsert keyed by user+puja+date, called from
//   BookingConfirmation when signed in (fire-and-forget, local flow unaffected).
// - useBookings: live list for MyBookings; null when signed out/unconfigured
//   so pages fall back to local/demo content.
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";

function slug(s) {
  return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
}

export function bookingDocId(userId, booking) {
  return `${userId}_${slug(booking?.pujaId)}_${slug(booking?.date)}_${slug(booking?.time)}`.slice(0, 120);
}

export async function saveBooking(userId, booking) {
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
    status: "confirmed",
    source: "web",
    updatedAt: serverTimestamp(),
  };
  try {
    const ref = doc(db, "bookings", id);
    const existing = await getDoc(ref);
    await setDoc(ref, {
      ...payload,
      ...(existing.exists() ? {} : { createdAt: serverTimestamp() }),
    }, { merge: true });
    return id;
  } catch {
    return null; // offline / rules — local WhatsApp flow is unaffected
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
