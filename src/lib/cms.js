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
