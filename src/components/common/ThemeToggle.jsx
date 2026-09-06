import React, { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    // Default to light mode on first load; respect an explicit saved choice.
    const saved = localStorage.getItem("dt-theme");
    return saved === "dark";
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dt-theme", dark ? "dark" : "light");
  }, [dark]);
  return <ThemeContext.Provider value={{ dark, setDark }}>{children}</ThemeContext.Provider>;
}
export default function ThemeToggle() {
  return null;
}
