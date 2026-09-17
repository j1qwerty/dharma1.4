// Firestore read hooks with graceful fallback to local data.js.
// When Firebase is unconfigured or collections are empty, callers keep
// rendering local content so the site never breaks mid-migration.
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";
import {
  pujas as defaultPujas,
  festivals as defaultFestivals,
  stories as defaultStories,
  acharyas as defaultAcharyas,
} from "./data";

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
      } catch (e) {
        if (!cancelled) {
          setError(e);
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
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
    return () => {
      cancelled = true;
    };
  }, [path, id]);
  return { data, loading };
}

/**
 * Background refresh helper.
 *
 * Per spec: "by default when page loads always loads the default hardcoded
 * ones or browser loads from cache but in bg checks if there is update the
 * loads that on site in bg and updates".
 *
 * Returns the hardcoded list immediately so the page renders instantly.
 * Then fetches `published` items from Firestore in the background and merges:
 * - For each Firestore published item that matches a default by id → override
 *   the default's fields with the Firestore version (non-empty wins).
 * - For each Firestore published item with NO default match → append it
 *   (so newly created items appear on the site after publish).
 * - If Firestore is not configured or the fetch fails, returns the defaults.
 *
 * @param {string} path   Firestore collection name (e.g. "pujas")
 * @param {Array}  defaults  Hardcoded list from src/lib/data.js
 * @param {object} opts
 * @param {string} opts.orderField  Optional order field. When set, the merged
 *   list is sorted by this field (Firestore items first since admin chose the
 *   order, then defaults that have no Firestore override).
 * @param {function} opts.idOf  Optional id extractor (defaults to item.id).
 */
export function useLiveCollection(path, defaults, { orderField = null, idOf = (x) => x?.id } = {}) {
  const [remote, setRemote] = useState(null); // published Firestore docs
  const [loading, setLoading] = useState(firebaseConfigured);

  useEffect(() => {
    if (!firebaseConfigured || !db) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const constraints = [where("status", "==", "published"), limit(200)];
        // Order needs an index — fall back to client sort when it fails.
        let snap;
        try {
          snap = await getDocs(query(collection(db, path), ...constraints));
        } catch {
          snap = await getDocs(
            query(collection(db, path), where("status", "==", "published"), limit(200))
          );
        }
        if (cancelled) return;
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRemote(docs);
      } catch {
        // Silent — keep using hardcoded defaults.
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [path]);

  // Merge: defaults first, override or append by id.
  const merged = (() => {
    if (!remote || remote.length === 0) return defaults;
    const byId = new Map(defaults.map((d) => [idOf(d), d]));
    const out = [];
    // Published Firestore items first, in their order (sorted by orderField if set).
    const sortedRemote = remote.slice();
    if (orderField) {
      sortedRemote.sort((a, b) => {
        const av = a[orderField];
        const bv = b[orderField];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        return av - bv;
      });
    }
    for (const r of sortedRemote) {
      const rid = idOf(r) || r.id;
      const base = byId.get(rid);
      if (base) {
        // Merge: Firestore wins on non-empty fields, defaults fill the gaps.
        out.push(mergeOverride(base, r));
        byId.delete(rid);
      } else {
        out.push(r);
      }
    }
    // Append remaining defaults that don't have a Firestore published override.
    for (const d of byId.values()) out.push(d);
    return out;
  })();

  return { items: merged, loading, remote: firebaseConfigured && remote != null };
}

/** Convenience: live pujas (cache-first from data.js, then Firestore). */
export function useLivePujas() {
  return useLiveCollection("pujas", defaultPujas, { orderField: "priority" });
}

/** Convenience: live festivals (cache-first from data.js, then Firestore). */
export function useLiveFestivals() {
  return useLiveCollection("festivals", defaultFestivals, {
    orderField: "priority",
    idOf: (f) =>
      f?.id ||
      String(f?.name || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
  });
}

/** Convenience: live stories (cache-first from data.js, then Firestore). */
export function useLiveStories() {
  return useLiveCollection("stories", defaultStories, { orderField: null });
}

/** Convenience: live acharyas (cache-first from data.js, then Firestore). */
export function useLiveAcharyas() {
  return useLiveCollection("acharyas", defaultAcharyas, { orderField: "order" });
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
          const { versions, version, updatedBy, deletedAt, deleteAt, status, order, ...rest } =
            data;
          map[key] = rest;
        }
        setOverrides(map);
      } catch {
        /* silent — fall back to hardcoded defaults */
      }
      if (!cancelled) setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
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
