// Site settings (site_settings/global) — feature flags for login surfaces.
// phoneAuth: { customer: bool (for /auth/*), admin: bool (for /admin/login) }
// Missing doc/fields = disabled (hidden). Publicly readable, admin-writable.
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";

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
