// Customer addresses in Firestore (`users/{uid}/addresses`).
// Max 5 addresses per user (enforced client-side). Each address has an
// optional "current location" geo point (lat/lng) so the admin can see it
// on a map.
import { useEffect, useState } from "react";
import {
  addDoc, collection, deleteDoc, doc, getDocs, limit, orderBy,
  query, serverTimestamp, updateDoc, where,
} from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";

export const MAX_ADDRESSES = 5;

/**
 * Add a new address for the signed-in user. Enforces MAX_ADDRESSES.
 * @returns {Promise<{ok:boolean, id?:string, error?:string}>}
 */
export async function addAddress(userId, address) {
  if (!firebaseConfigured || !db || !userId) {
    return { ok: false, error: "not-configured" };
  }
  try {
    // Enforce max-5 client-side.
    const existing = await getDocs(query(
      collection(db, "users", userId, "addresses"),
      limit(MAX_ADDRESSES + 1)
    ));
    if (existing.size >= MAX_ADDRESSES) {
      return { ok: false, error: "limit-reached" };
    }
    const payload = {
      label: address.label || "Home",
      line1: address.line1 || null,
      line2: address.line2 || null,
      city: address.city || null,
      state: address.state || null,
      pincode: address.pincode || null,
      phone: address.phone || null,
      notes: address.notes || null,
      // Geo: optional current-location capture.
      lat: typeof address.lat === "number" ? address.lat : null,
      lng: typeof address.lng === "number" ? address.lng : null,
      isDefault: Boolean(address.isDefault),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    const ref = await addDoc(collection(db, "users", userId, "addresses"), payload);
    return { ok: true, id: ref.id };
  } catch (e) {
    return { ok: false, error: e?.message || "unknown" };
  }
}

export async function updateAddress(userId, addressId, patch) {
  if (!firebaseConfigured || !db || !userId || !addressId) return { ok: false };
  try {
    const { id, createdAt, ...rest } = patch;
    await updateDoc(doc(db, "users", userId, "addresses", addressId), {
      ...rest,
      updatedAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message };
  }
}

export async function deleteAddress(userId, addressId) {
  if (!firebaseConfigured || !db || !userId || !addressId) return { ok: false };
  try {
    await deleteDoc(doc(db, "users", userId, "addresses", addressId));
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message };
  }
}

/**
 * Live list of the user's addresses, newest first. Returns null when not
 * signed in / unconfigured so callers can fall back to a local-only UI.
 */
export function useAddresses(user) {
  const [addresses, setAddresses] = useState(null);
  const [loading, setLoading] = useState(Boolean(firebaseConfigured && user));
  useEffect(() => {
    if (!firebaseConfigured || !db || !user) {
      setAddresses(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(query(
          collection(db, "users", user.uid, "addresses"),
          orderBy("createdAt", "desc"),
          limit(50)
        ));
        if (cancelled) return;
        setAddresses(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      } catch {
        if (!cancelled) setAddresses([]);
      }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [user?.uid]); // eslint-disable-line react-hooks/exhaustive-deps
  return { addresses, loading };
}

/** Format an address into a single string for display. */
export function formatAddress(a) {
  if (!a) return "—";
  const parts = [a.line1, a.line2, a.city, a.state, a.pincode].filter(Boolean);
  return parts.join(", ") || a.label || "—";
}
