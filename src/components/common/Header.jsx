import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MagnifyingGlass,
  List,
  X,
  Sun,
  Moon,
  CaretDown,
  PaintBrush,
  Globe,
} from "@phosphor-icons/react";
import Brand from "./Brand";
import { deities } from "../../lib/data";
import { ThemeContext } from "./ThemeToggle";
import { useLanguage } from "./LanguageToggle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pujasOpen, setPujasOpen] = useState(false);
  const closeTimer = useRef(null);
  const { dark, toggle } = useContext(ThemeContext) ?? { dark: false, toggle: () => {} };
  const { lang, toggle: toggleLang, t } = useLanguage();
  const links = [
    ["nav.home", "/", true],
    ["nav.pujas", "/pujas", false],
    ["nav.acharyas", "/acharyas", false],
    ["nav.stories", "/stories", false],
    ["nav.about", "/about", false],
  ];

  // Scroll-aware shrink via IntersectionObserver on a top sentinel.
  // (Avoids window scroll listeners per the taste-skill motion guidance.)
  useEffect(() => {
    const sentinel = document.getElementById("header-sentinel-dt");
    if (!sentinel) return;
    const io = new IntersectionObserver((entries) => setScrolled(!entries[0].isIntersecting), {
      rootMargin: "0px 0px 0px 0px",
      threshold: 0,
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  // Close mega-menu on Escape or click-outside (a11y + robustness).
  useEffect(() => {
    if (!pujasOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setPujasOpen(false);
    }
    function onDocClick(e) {
      const wrap = document.querySelector(".nav-wrap-dt");
      if (wrap && !wrap.contains(e.target)) setPujasOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    };
  }, [pujasOpen]);

  function toggleTheme() {
    toggle();
  }

  function openPujas() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPujasOpen(true);
  }
  function scheduleClosePujas() {
    closeTimer.current = setTimeout(() => setPujasOpen(false), 120);
  }

  return (
    <>
      <div id="header-sentinel-dt" aria-hidden="true" style={{ height: 1 }} />
      <header className={`header-dt ${scrolled ? "header-scrolled-dt" : ""}`}>
        <div className="container-dt flex h-[70px] items-center justify-between gap-5">
          <Link to="/" aria-label="DharmaTribe home">
            <Brand />
          </Link>
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {links.map(([key, to, exact]) =>
              key === "nav.pujas" ? (
                <div
                  key={to}
                  className="nav-wrap-dt"
                  onMouseEnter={openPujas}
                  onMouseLeave={scheduleClosePujas}
                >
                  <NavLink
                    className={({ isActive }) => `nav-dt${isActive ? " active" : ""}`}
                    to={to}
                    end={exact}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {t(key)}
                      <CaretDown
                        size={11}
                        className={`transition-transform duration-300 ${pujasOpen ? "rotate-180" : ""}`}
                      />
                    </span>
                  </NavLink>
                  {pujasOpen && (
                    <div className="megamenu-dt" role="menu">
                      <div className="megamenu-inner-dt">
                        <div className="megamenu-head-dt">
                          <div className="text-[9px] font-bold uppercase tracking-[.16em] text-gold-600">
                            {t("nav.browseByDeity")}
                          </div>
                          <Link
                            to="/pujas"
                            className="text-[10px] font-bold text-gold-600 hover:underline"
                          >
                            {t("nav.viewAllPujas")}
                          </Link>
                        </div>
                        <div className="megamenu-grid-dt">
                          {deities.map((d) => (
                            <Link
                              key={d}
                              to={`/pujas?deity=${encodeURIComponent(d)}`}
                              className="megamenu-item-dt"
                              onClick={() => setPujasOpen(false)}
                            >
                              <span className="megamenu-dot-dt" />
                              {d}
                            </Link>
                          ))}
                        </div>
                        <div className="megamenu-foot-dt">
                          <Link to="/stories" className="text-[11px] muted-dt hover:text-gold-600">
                            {t("nav.readRitualGuides")}
                          </Link>
                          <Link to="/about" className="text-[11px] muted-dt hover:text-gold-600">
                            {t("nav.howBookingWorks")}
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  className={({ isActive }) => `nav-dt${isActive ? " active" : ""}`}
                  to={to}
                  end={exact}
                  key={to}
                >
                  {t(key)}
                </NavLink>
              )
            )}
          </nav>
          <div className="flex items-center gap-2">
            {/* <Link
              to="/decor"
              className="hidden sm:grid place-items-center h-9 w-9 rounded-full border border-dt hover:border-gold-400 hover:text-gold-600 transition"
              aria-label="Decor preview"
              title="Decor preview"
            >
              <PaintBrush size={16} weight="duotone" />
            </Link> */}
            <button
              className="hidden sm:grid place-items-center h-9 w-9 rounded-full border border-dt"
              aria-label={t("nav.search")}
            >
              <MagnifyingGlass size={16} />
            </button>
            <button
              onClick={toggleTheme}
              className="grid place-items-center h-9 w-9 rounded-full border border-dt"
              aria-label={t("nav.toggleTheme")}
              title={t("nav.toggleTheme")}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={toggleLang}
              className="lang-toggle-dt"
              aria-label={t("nav.toggleLang")}
              title={t("nav.toggleLang")}
              data-lang={lang}
            >
              <Globe size={14} weight="duotone" />
              <span className="lang-toggle-label">{lang === "en" ? "EN" : "हि"}</span>
            </button>
            <Link className="hidden sm:inline-flex nav-dt font-semibold" to="/auth/login">
              {t("nav.account")}
            </Link>
            <Link className="hidden sm:inline-flex btn-gold-dt" to="/pujas">
              {t("nav.bookPuja")}
            </Link>
            <button
              className="lg:hidden grid place-items-center h-9 w-9 rounded-full border border-dt"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X /> : <List />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-dt surface-dt">
            <div className="container-dt py-5 grid gap-1">
              {links.map(([key, to, exact]) => (
                <NavLink
                  className={({ isActive }) =>
                    `py-3 text-xl display-dt border-b border-dt mobile-nav-dt${isActive ? " active" : ""}`
                  }
                  onClick={() => setOpen(false)}
                  key={to}
                  end={exact}
                  to={to}
                >
                  {t(key)}
                </NavLink>
              ))}
              <Link
                onClick={() => setOpen(false)}
                className="py-3 text-xl display-dt border-b border-dt mobile-nav-dt"
                to="/auth/login"
              >
                {t("nav.account")}
              </Link>
              <NavLink
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 text-xl display-dt border-b border-dt mobile-nav-dt${isActive ? " active" : ""} inline-flex items-center gap-2`
                }
                to="/decor"
              >
                <PaintBrush size={18} weight="duotone" /> {t("nav.decorPreview")}
              </NavLink>
              <button
                onClick={() => {
                  toggleLang();
                }}
                className="py-3 text-xl display-dt border-b border-dt mobile-nav-dt inline-flex items-center gap-2"
              >
                <Globe size={18} weight="duotone" />
                {lang === "en" ? "हिन्दी" : "English"}
              </button>
              <Link onClick={() => setOpen(false)} className="btn-gold-dt mt-3" to="/pujas">
                {t("nav.bookPuja")}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
