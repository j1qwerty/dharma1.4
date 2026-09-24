import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  MagnifyingGlass,
  List,
  X,
  Sun,
  Moon,
  CaretDown,
  PaintBrush,
  Globe,
  Heart,
  ArrowUpRight,
} from "@phosphor-icons/react";
import Brand from "./Brand";
import { deities, deityHi } from "../../lib/data";
import { useLivePujas, useLiveStories, useLiveAcharyas } from "../../lib/cms";
import { ThemeContext } from "./ThemeToggle";
import { useLanguage } from "./LanguageToggle";
import { useFavorites } from "../../lib/favorites";
import { useAuth } from "../../lib/auth";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pujasOpen, setPujasOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const closeTimer = useRef(null);
  const searchInputRef = useRef(null);
  const searchInputMobileRef = useRef(null);
  const navigate = useNavigate();
  const { dark, toggle } = useContext(ThemeContext) ?? { dark: false, toggle: () => {} };
  const { lang, toggle: toggleLang, t } = useLanguage();
  const { ids, count: favCount } = useFavorites();
  const { user, isAdmin, adminRole, logout } = useAuth();
  const staffHome = adminRole === "super-admin" ? "/admin" : "/staff";
  const acctName = user?.displayName || (user?.email ? user.email.split("@")[0] : "");
  const acctInitial = (acctName || user?.email || "?").trim().charAt(0).toUpperCase();
  // Cache-first: render hardcoded pujas instantly, then refresh from Firestore
  // in the background when published overrides arrive.
  const { items: pujas } = useLivePujas();
  const { items: stories } = useLiveStories();
  const { items: acharyas } = useLiveAcharyas();
  const savedPujas = useMemo(() => pujas.filter((p) => ids.includes(p.id)), [ids, pujas]);
  const links = [
    ["nav.home", "/", true],
    ["nav.pujas", "/pujas", false],
    ["nav.acharyas", "/acharyas", false],
    ["nav.stories", "/stories", false],
    ["nav.about", "/about", false],
    ["nav.review", "/review", false],
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

  // Close wishlist + search + account dropdowns on Escape or click-outside.
  // Closing the search also clears the query so the bar fully contracts.
  useEffect(() => {
    if (!favOpen && !searchOpen && !acctOpen) return;
    function onKey(e) {
      if (e.key === "Escape") {
        setFavOpen(false);
        setSearchOpen(false);
        setAcctOpen(false);
        setQuery("");
      }
    }
    function onDocClick(e) {
      if (e.target.closest(".fav-wrap-dt")) return;
      if (e.target.closest(".search-wrap-dt")) return;
      if (e.target.closest(".acct-wrap-dt")) return;
      setFavOpen(false);
      setSearchOpen(false);
      setAcctOpen(false);
      setQuery("");
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick);
    };
  }, [favOpen, searchOpen, acctOpen]);

  // Focus the visible search field whenever the panel opens so typing
  // starts immediately (desktop bar input, mobile panel input).
  useEffect(() => {
    if (searchOpen) {
      const id = requestAnimationFrame(() => {
        const desktop = searchInputRef.current;
        const target =
          desktop && desktop.offsetParent !== null ? desktop : searchInputMobileRef.current;
        target?.focus();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [searchOpen]);

  // Live search across pujas, stories and acharyas (EN + HI).
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { pujaResults: [], storyResults: [], acharyaResults: [] };
    const pujaResults = pujas
      .filter((p) =>
        `${p.title} ${p.titleHi || ""} ${p.deity} ${p.temple} ${p.purpose || ""}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 4);
    const storyResults = stories
      .filter((s) =>
        `${s.title} ${s.titleHi || ""} ${s.category || ""} ${s.excerpt || ""} ${s.excerptHi || ""}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 3);
    const acharyaResults = acharyas
      .filter((a) =>
        `${a.name} ${a.tradition || ""} ${a.traditionHi || ""} ${a.expertise || ""} ${a.expertiseHi || ""} ${a.place || ""} ${a.placeHi || ""}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 3);
    return { pujaResults, storyResults, acharyaResults };
  }, [query, pujas, stories, acharyas]);
  const hasResults =
    results.pujaResults.length + results.storyResults.length + results.acharyaResults.length > 0;

  function closeSearch() {
    setSearchOpen(false);
    setQuery("");
  }

  function toggleTheme() {
    toggle();
  }

  async function signOut() {
    setAcctOpen(false);
    setOpen(false);
    await logout();
    navigate("/");
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
        <div className="container-dt flex h-[64px] sm:h-[70px] items-center justify-between gap-2 sm:gap-5">
          <Link to="/" aria-label="DharmaTribe home" className="min-w-0 shrink">
            <Brand wordmark />
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
                              {lang === "hi" ? deityHi[d] || d : d}
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
          <div className="flex flex-none items-center gap-1 sm:gap-2">
            {/* <Link
              to="/decor"
              className="hidden sm:grid place-items-center h-9 w-9 rounded-full border border-dt hover:border-gold-400 hover:text-gold-600 transition"
              aria-label="Decor preview"
              title="Decor preview"
            >
              <PaintBrush size={16} weight="duotone" />
            </Link> */}
            <div className="search-wrap-dt">
              {/* Expanding search bar: collapsed icon button grows into a
                  typing bar in place. Placeholder carries the hint text. */}
              <div className={`search-expand-dt${searchOpen ? " is-open" : ""}`}>
                <button
                  type="button"
                  onClick={() => {
                    if (searchOpen) closeSearch();
                    else {
                      setSearchOpen(true);
                      setFavOpen(false);
                    }
                  }}
                  className="search-lens-dt"
                  aria-label={t("nav.search")}
                  title={t("nav.search")}
                  aria-expanded={searchOpen}
                >
                  {searchOpen ? <X size={16} /> : <MagnifyingGlass size={16} />}
                </button>
                {searchOpen && (
                  <>
                    <input
                      ref={searchInputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && query.trim()) {
                          navigate(`/pujas?search=${encodeURIComponent(query.trim())}`);
                          closeSearch();
                        }
                      }}
                      placeholder={
                        lang === "hi"
                          ? "पूजा, कथा या आचार्य खोजें"
                          : "Pujas, stories and acharyas — search them all here."
                      }
                      aria-label={t("nav.search")}
                      className="search-expand-input-dt"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="search-clear-dt"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </>
                )}
              </div>
              {/* Search results popup — temporarily disabled; kept for later use.
              {searchOpen && (
                <div className="search-panel-dt" role="dialog" aria-label={t("nav.search")}>
                  <div className="search-field-dt sm:hidden">
                    <MagnifyingGlass size={16} className="muted-dt flex-none" />
                    <input
                      ref={searchInputMobileRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && query.trim()) {
                          navigate(`/pujas?search=${encodeURIComponent(query.trim())}`);
                          closeSearch();
                        }
                      }}
                      placeholder={
                        lang === "hi"
                          ? "पूजा, कथा या आचार्य खोजें"
                          : "Pujas, stories and acharyas — search them all here."
                      }
                      aria-label={t("nav.search")}
                    />
                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        className="grid h-6 w-6 flex-none place-items-center rounded-full muted-dt hover:bg-surface-2-dt"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                  <div className="search-results-dt">
                    {!query.trim() ? (
                      <p className="search-hint-dt">
                        {lang === "hi"
                          ? "पूजा, कथाएँ और आचार्य — एक ही जगह खोजें।"
                          : "Pujas, stories and acharyas — search them all here."}
                      </p>
                    ) : !hasResults ? (
                      <div className="search-empty-dt">
                        <p>
                          {lang === "hi" ? "कुछ नहीं मिला।" : "No matches found."}
                        </p>
                        <Link
                          to="/pujas"
                          onClick={closeSearch}
                          className="text-[11px] font-bold text-gold-600 hover:underline"
                        >
                          {t("nav.viewAllPujas")}
                        </Link>
                      </div>
                    ) : (
                      <>
                        {results.pujaResults.length > 0 && (
                          <div className="search-group-dt">
                            <div className="search-group-label-dt">
                              {lang === "hi" ? "पूजा" : "Pujas"}
                            </div>
                            {results.pujaResults.map((p) => (
                              <Link
                                key={p.id}
                                to={`/pujas/${p.id}`}
                                onClick={closeSearch}
                                className="search-item-dt"
                              >
                                <img src={p.image} alt="" />
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-[13px] font-semibold">
                                    {lang === "hi" && p.titleHi ? p.titleHi : p.title}
                                  </span>
                                  <span className="block text-[10px] muted-dt">
                                    {p.deity} · ₹{p.price.toLocaleString("en-IN")}
                                  </span>
                                </span>
                                <ArrowUpRight size={14} className="muted-dt flex-none" />
                              </Link>
                            ))}
                          </div>
                        )}
                        {results.storyResults.length > 0 && (
                          <div className="search-group-dt">
                            <div className="search-group-label-dt">
                              {lang === "hi" ? "कथाएँ" : "Stories"}
                            </div>
                            {results.storyResults.map((s) => (
                              <Link
                                key={s.id}
                                to={`/stories/${s.id}`}
                                onClick={closeSearch}
                                className="search-item-dt"
                              >
                                <img src={s.image} alt="" />
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-[13px] font-semibold">
                                    {lang === "hi" && s.titleHi ? s.titleHi : s.title}
                                  </span>
                                  <span className="block text-[10px] muted-dt">
                                    {s.category}
                                  </span>
                                </span>
                                <ArrowUpRight size={14} className="muted-dt flex-none" />
                              </Link>
                            ))}
                          </div>
                        )}
                        {results.acharyaResults.length > 0 && (
                          <div className="search-group-dt">
                            <div className="search-group-label-dt">
                              {lang === "hi" ? "आचार्य" : "Acharyas"}
                            </div>
                            {results.acharyaResults.map((a) => (
                              <Link
                                key={a.id}
                                to="/acharyas"
                                onClick={closeSearch}
                                className="search-item-dt"
                              >
                                <img src={a.image} alt={a.name} />
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-[13px] font-semibold">
                                    {a.name}
                                  </span>
                                  <span className="block truncate text-[10px] muted-dt">
                                    {lang === "hi" && a.traditionHi ? a.traditionHi : a.tradition}
                                  </span>
                                </span>
                                <ArrowUpRight size={14} className="muted-dt flex-none" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}
              */}
            </div>
            <button
              onClick={toggleTheme}
              className="grid place-items-center h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-dt top-icon-dt"
              aria-label={t("nav.toggleTheme")}
              title={t("nav.toggleTheme")}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div className="fav-wrap-dt">
              <button
                onClick={() => {
                  // Always open the dropdown (works logged-out via localStorage).
                  // The auth gate lives on the footer link below, not the heart.
                  setFavOpen((v) => !v);
                  setSearchOpen(false);
                }}
                className="fav-nav-dt"
                aria-label={lang === "hi" ? "सहेजी हुई पूजा" : "Saved pujas"}
                title={lang === "hi" ? "सहेजी हुई पूजा" : "Saved pujas"}
                aria-expanded={favOpen}
              >
                <Heart size={16} weight={favCount > 0 ? "fill" : "regular"} />
                {favCount > 0 && <span className="fav-count-dt">{favCount}</span>}
              </button>
              {favOpen && (
                <div className="fav-panel-dt" role="dialog" aria-label="Saved pujas">
                  <div className="fav-panel-head-dt">
                    <span>{lang === "hi" ? "सहेजी हुई पूजा" : "Saved pujas"}</span>
                    <span className="muted-dt">{favCount}</span>
                  </div>
                  {savedPujas.length ? (
                    <div className="fav-list-dt">
                      {savedPujas.map((p) => (
                        <Link
                          key={p.id}
                          to={`/pujas/${p.id}`}
                          onClick={() => setFavOpen(false)}
                          className="fav-item-dt"
                        >
                          <img src={p.image} alt="" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-[13px] font-semibold">
                              {lang === "hi" && p.titleHi ? p.titleHi : p.title}
                            </span>
                            <span className="block text-[10px] muted-dt">
                              {p.deity} · ₹{p.price.toLocaleString("en-IN")}
                            </span>
                          </span>
                          <ArrowUpRight size={14} className="muted-dt flex-none" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="fav-empty-dt">
                      <Heart size={22} className="mx-auto text-gold-600" />
                      <p className="mt-2 text-xs leading-5 muted-dt">
                        {lang === "hi"
                          ? "अभी कुछ सहेजा नहीं है। किसी पूजा पर दिल दबाएँ।"
                          : "Nothing saved yet. Tap the heart on any puja."}
                      </p>
                      <Link
                        to="/pujas"
                        onClick={() => setFavOpen(false)}
                        className="mt-3 inline-block text-[11px] font-bold text-gold-600 hover:underline"
                      >
                        {t("nav.viewAllPujas")}
                      </Link>
                    </div>
                  )}
                  {savedPujas.length > 0 && (
                    <Link
                      to={user ? "/dashboard" : "/auth/login"}
                      state={user ? undefined : { from: "/dashboard" }}
                      onClick={() => setFavOpen(false)}
                      className="fav-panel-foot-dt"
                    >
                      {lang === "hi" ? "विशलिस्ट खोलें" : "Open wishlist"}
                      <ArrowUpRight size={13} />
                    </Link>
                  )}
                </div>
              )}
            </div>
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
            {user ? (
              <div className="acct-wrap-dt hidden sm:block">
                <button
                  onClick={() => {
                    setAcctOpen((v) => !v);
                    setFavOpen(false);
                    setSearchOpen(false);
                  }}
                  className="acct-btn-dt"
                  aria-label={lang === "hi" ? "खाता मेनू" : "Account menu"}
                  aria-expanded={acctOpen}
                >
                  <span className="acct-avatar-dt" aria-hidden="true">
                    {user.photoURL ? <img src={user.photoURL} alt="" /> : acctInitial}
                  </span>
                  <span className="acct-name-dt">{acctName || t("nav.account")}</span>
                  <CaretDown
                    size={11}
                    className={`transition-transform duration-300 ${acctOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {acctOpen && (
                  <div className="acct-panel-dt" role="menu">
                    <div className="acct-panel-head-dt">
                      <span className="block truncate">{acctName}</span>
                      {user.email && (
                        <span className="block truncate text-[10px] font-normal normal-case tracking-normal muted-dt">
                          {user.email}
                        </span>
                      )}
                    </div>
                    {isAdmin ? (
                      <Link
                        to={staffHome}
                        onClick={() => setAcctOpen(false)}
                        className="acct-item-dt"
                        role="menuitem"
                      >
                        {lang === "hi" ? "एडमिन डैशबोर्ड" : "Admin dashboard"}
                        <ArrowUpRight size={13} className="muted-dt" />
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/dashboard"
                          onClick={() => setAcctOpen(false)}
                          className="acct-item-dt"
                          role="menuitem"
                        >
                          {lang === "hi" ? "मेरा खाता" : "My account"}
                          <ArrowUpRight size={13} className="muted-dt" />
                        </Link>
                      </>
                    )}
                    <button
                      onClick={signOut}
                      className="acct-item-dt acct-signout-dt"
                      role="menuitem"
                    >
                      {lang === "hi" ? "साइन आउट" : "Sign out"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link className="hidden sm:inline-flex nav-dt font-semibold" to="/auth/login">
                {t("nav.account")}
              </Link>
            )}{" "}
            <Link className="hidden sm:inline-flex btn-gold-dt" to="/pujas">
              {t("nav.bookPuja")}
            </Link>
            <button
              className="lg:hidden grid place-items-center h-8 w-8 sm:h-9 sm:w-9 rounded-full border border-dt top-icon-dt"
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
              <button
                onClick={() => {
                  setOpen(false);
                  setFavOpen(false);
                  setSearchOpen(true);
                }}
                className="py-3 text-xl display-dt border-b border-dt mobile-nav-dt inline-flex items-center gap-2"
              >
                <MagnifyingGlass size={18} /> {t("nav.search")}
              </button>
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
              {user ? (
                <>
                  <Link
                    onClick={() => setOpen(false)}
                    className="py-3 text-xl display-dt border-b border-dt mobile-nav-dt"
                    to={isAdmin ? staffHome : "/dashboard"}
                  >
                    {acctName || t("nav.account")}
                  </Link>
                  <button
                    onClick={signOut}
                    className="py-3 text-xl display-dt border-b border-dt mobile-nav-dt text-left"
                  >
                    {lang === "hi" ? "साइन आउट" : "Sign out"}
                  </button>
                </>
              ) : (
                <Link
                  onClick={() => setOpen(false)}
                  className="py-3 text-xl display-dt border-b border-dt mobile-nav-dt"
                  to="/auth/login"
                >
                  {t("nav.account")}
                </Link>
              )}{" "}
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
