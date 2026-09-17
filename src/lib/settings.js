// Site settings (site_settings/global) — feature flags for login surfaces +
// bookings auto-archive window. Publicly readable, admin-writable.
//
// Shape (all optional):
//   {
//     phoneAuth: { customer: bool, admin: bool },
//     whatsappNumber: "9958728666",
//     announcement: { enabled, text, textHi },
//     archiveAfterDays: number | null  // null = no auto-archive
//   }
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";

export const DEFAULT_ARCHIVE_AFTER_DAYS = 30;

export function useSiteSettings() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(firebaseConfigured);
  useEffect(() => {
    if (!firebaseConfigured || !db) return;
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "site_settings", "global"));
        if (!cancelled) {
          setSettings(snap.exists() ? snap.data() : null);
          setLoading(false);
        }
      } catch { if (!cancelled) setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, []);
  return { settings, loading };
}

export function isPhoneEnabled(settings, surface) {
  return Boolean(settings?.phoneAuth?.[surface]);
}

/** Number of days after `delivered` that a booking auto-archives. null = off. */
export function getArchiveAfterDays(settings) {
  const v = settings?.archiveAfterDays;
  if (v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : null;
}
