import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { STRINGS } from "../../lib/i18n";

const LanguageContext = createContext(null);

const STORAGE_KEY = "dt-lang";

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "hi" || saved === "en" ? saved : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      // Set lang attribute on <html> for accessibility / font fallback
      document.documentElement.setAttribute("lang", lang === "hi" ? "hi" : "en");
    } catch {}
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "hi" : "en")), []);

  // Translation accessor: t("key") returns the string in the current language,
  // or the key itself as a fallback when missing.
  const t = useCallback(
    (key) => {
      const row = STRINGS[key];
      if (!row) return key;
      return row[lang] ?? row.en ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback in case provider is missing — defaults to English.
    return {
      lang: "en",
      setLang: () => {},
      toggle: () => {},
      t: (k) => k,
    };
  }
  return ctx;
}

export default LanguageProvider;
