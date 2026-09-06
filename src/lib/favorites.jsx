import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ *
 * FavoritesProvider - a localStorage-backed wishlist of puja ids.
 * Exposes toggle, has, count, and the list itself. Used by the heart
 * toggle on PujaCard / PujaDetail, and surfaced on the Dashboard.
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

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* storage may be unavailable; ignore */
    }
  }, [ids]);

  // Keep multiple tabs in sync.
  useEffect(() => {
    function onStorage(e) {
      if (e.key === KEY) setIds(read());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    []
  );
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(
    () => ({ ids, count: ids.length, has, toggle, clear }),
    [ids, has, toggle, clear]
  );
  return <FavContext.Provider value={value}>{children}</FavContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
