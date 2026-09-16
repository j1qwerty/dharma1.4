import React, { createContext, useCallback, useEffect, useState } from "react";
export const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    // Default to LIGHT on first load; only use dark if user explicitly saved "dark".
    try {
      const saved = localStorage.getItem("dt-theme");
      return saved === "dark";
    } catch {
      return false;
    }
  });
  const toggle = useCallback(() => setDark((v) => !v), []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("dt-theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);
  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle }}>{children}</ThemeContext.Provider>
  );
}
export default function ThemeToggle() {
  return null;
}
