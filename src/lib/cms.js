// Firestore read hooks with graceful fallback to local data.js.
// When Firebase is unconfigured or collections are empty, callers keep
// rendering local content so the site never breaks mid-migration.
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";

export function useCollection(path, { liveOnly = true, orderField = null, max = 100 } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(firebaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!firebaseConfigured || !db) return;
    let cancelled = false;
    (async () => {
      try {
        const constraints = [];
        if (liveOnly) constraints.push(where("status", "==", "published"));
        if (orderField) constraints.push(orderBy(orderField));
        constraints.push(limit(max));
        const snap = await getDocs(query(collection(db, path), ...constraints));
        if (!cancelled) {
          setData(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
          setLoading(false);
        }
      } catch (e) { if (!cancelled) { setError(e); setLoading(false); } }
    })();
    return () => { cancelled = true; };
  }, [path, liveOnly, orderField, max]);

  return { data, loading, error, remote: firebaseConfigured };
}

export function useDoc(path, id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(firebaseConfigured && Boolean(id));
  useEffect(() => {
    if (!firebaseConfigured || !db || !id) return;
    let cancelled = false;
    (async () => {
      const snap = await getDoc(doc(db, path, id));
      if (!cancelled) {
        setData(snap.exists() ? { id: snap.id, ...snap.data() } : null);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [path, id]);
  return { data, loading };
}

/**
 * Homepage overrides — reads `homepage_sections` collection in the background
 * and returns a map of { sectionKey: { ...fields } }.
 *
 * Per the spec: "by default when page loads always loads the default hardcoded
 * ones but in bg checks if there is update then loads that on site in bg".
 *
 * So callers render their hardcoded defaults immediately, then this hook
 * merges any overrides once they arrive (background re-render, no flicker).
 *
 * Returns { overrides, loading } where overrides is keyed by section.key.
 */
export function useHomepageOverrides() {
  const [overrides, setOverrides] = useState({});
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!firebaseConfigured || !db) return;
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, "homepage_sections"), limit(100)));
        if (cancelled) return;
        const map = {};
        for (const d of snap.docs) {
          const data = d.data();
          // Only apply published + enabled overrides.
          if (data.status === "deleted" || data.enabled === false) continue;
          const key = data.key || d.id;
          // Strip admin-only fields the public site doesn't need.
          const { versions, version, updatedBy, deletedAt, deleteAt, status, order, ...rest } = data;
          map[key] = rest;
        }
        setOverrides(map);
      } catch { /* silent — fall back to hardcoded defaults */ }
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  return { overrides, loading };
}

/**
 * Helper: merge a hardcoded default with a Firestore override. Override wins
 * only for non-null / non-empty fields, so partial overrides (e.g. only
 * changing the title) don't blank out the rest of the default.
 */
export function mergeOverride(defaults, override) {
  if (!override) return defaults;
  const out = { ...defaults };
  for (const [k, v] of Object.entries(override)) {
    if (v != null && v !== "") out[k] = v;
  }
  return out;
}
