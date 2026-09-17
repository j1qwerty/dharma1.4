import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, firebaseConfigured } from "./firebase";
import { useAuth } from "./auth";
import { ux } from "./analytics";

/* ------------------------------------------------------------------ *
 * FavoritesProvider - wishlist of puja ids.
 * - Always works offline-first via localStorage (instant UI).
 * - When signed in, syncs to users/{uid}.savedPujas in the background:
 *   on login the cloud list is union-merged with local; every toggle
 *   pushes the merged list (fire-and-forget, failures keep local truth).
 * ------------------------------------------------------------------ */

const FavContext = createContext(null);
const KEY = "dt-favorites";

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(read);
  const [cloud, setCloud] = useState("off"); // off | pending | on | error
  const { user } = useAuth();
  const skipPush = useRef(true);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* storage may be unavailable; ignore */
    }
    // Background push to Firestore (skip the initial load/merge cycle).
    if (skipPush.current || !firebaseConfigured || !db || !user) return;
    setCloud("pending");
    setDoc(doc(db, "users", user.uid), {
      savedPujas: ids,
      wishlistUpdatedAt: serverTimestamp(),
    }, { merge: true }).then(
      () => setCloud("on"),
      () => setCloud("error")
    );
  }, [ids, user]);

  // On sign-in: union-merge cloud wishlist into local (cloud never deletes local).
  useEffect(() => {
    if (!firebaseConfigured || !db || !user) { skipPush.current = true; return; }
    let cancelled = false;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        const remote = snap.exists() && Array.isArray(snap.data().savedPujas)
          ? snap.data().savedPujas
          : [];
        if (cancelled) return;
        setIds((prev) => {
          const merged = [...prev];
          for (const id of remote) if (!merged.includes(id)) merged.push(id);
          return merged;
        });
        setCloud("on");
      } catch { if (!cancelled) setCloud("error"); }
      if (!cancelled) skipPush.current = false;
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    function onStorage(e) {
      if (e.key === KEY) setIds(read());
    }
    // Sign-out reset (dispatched by logout(); same-tab storage events don't fire).
    function onLogout() {
      setIds([]);
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener("dt:logout", onLogout);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("dt:logout", onLogout);
    };
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id) => {
      const willAdd = !ids.includes(id);
      setIds((prev) => (willAdd ? [...prev, id] : prev.filter((x) => x !== id)));
      if (willAdd) ux.wishlistAdd(id); else ux.wishlistRemove(id);
    },
    [ids]
  );
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({ ids, count: ids.length, has, toggle, clear, cloud }),
    [ids, has, toggle, clear, cloud]
  );
  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
