import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  ArrowUpRight,
  CheckCircle,
  X,
  House,
} from "@phosphor-icons/react";
import { intentions, deities, deityHi } from "../lib/data";
import { upcomingFestivals } from "../lib/dates";
import { useLivePujas, useLiveFestivals } from "../lib/cms";
import PujaCard from "../components/common/PujaCard";
import SafeImage from "../components/common/SafeImage";
import SectionHeading from "../components/common/SectionHeading";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, Rangoli, Toran, SectionDecor } from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";

export default function Catalog() {
  const { t, lang } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDeity = searchParams.get("deity");
  const initialSearch = searchParams.get("search");
  const [q, setQ] = useState(initialSearch || "");
  const [tag, setTag] = useState("All");
  const [deity, setDeity] = useState(
    initialDeity && deities.includes(initialDeity) ? initialDeity : "All"
  );
  const [purpose, setPurpose] = useState("All");
  const [sort, setSort] = useState("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const tags = ["All", "Festival", "Evergreen", "Popular", "Remedy", "Limited slots", "Ancestral"];

  // Cache-first: render hardcoded pujas instantly, then merge Firestore
  // published overrides + new items in the background. Same for festivals.
  const { items: livePujas } = useLivePujas();
  const { items: liveFestivals } = useLiveFestivals();

  // Keep the URL in sync with the deity filter so links can pre-filter.
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    if (deity !== "All") next.set("deity", deity);
    else next.delete("deity");
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deity]);

  // If the URL deity changes from elsewhere (e.g. mega-menu click while on /pujas), reflect it.
  useEffect(() => {
    const urlDeity = searchParams.get("deity");
    const resolved = urlDeity && deities.includes(urlDeity) ? urlDeity : "All";
    setDeity(resolved);
    const urlSearch = searchParams.get("search");
    if (typeof urlSearch === "string") setQ(urlSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const result = useMemo(() => {
    const filtered = livePujas.filter(
      (p) =>
        (tag === "All" || p.tag === tag) &&
        (deity === "All" || p.deity === deity) &&
        (purpose === "All" || p.purpose === purpose) &&
        `${p.title} ${p.titleHi || ""} ${p.deity} ${p.temple} ${p.purpose}`
          .toLowerCase()
          .includes(q.toLowerCase())
    );
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "upcoming") sorted.sort((a, b) => parseDate(a.date) - parseDate(b.date));
    return sorted;
  }, [q, tag, deity, purpose, sort, livePujas]);

  const activeFilters = [
    tag !== "All" && { key: "tag", label: tag, clear: () => setTag("All") },
    deity !== "All" && { key: "deity", label: deity, clear: () => setDeity("All") },
    purpose !== "All" && { key: "purpose", label: purpose, clear: () => setPurpose("All") },
  ].filter(Boolean);

  const clearAll = () => {
    setTag("All");
    setDeity("All");
    setPurpose("All");
    setQ("");
  };

  const priceRange = useMemo(() => {
    if (!result.length) return null;
    const prices = result.map((p) => p.price);
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [result]);

  // Seasonal shelves soonest-first: order flips automatically as dates pass.
  const orderedFestivals = useMemo(() => upcomingFestivals(liveFestivals), [liveFestivals]);

  const SORTS = [
    { key: "popular", label: t("catalog.sortPopular") },
    { key: "upcoming", label: t("catalog.sortUpcoming") },
    { key: "price-asc", label: t("catalog.sortPriceAsc") },
    { key: "price-desc", label: t("catalog.sortPriceDesc") },
  ];

  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <SectionDecor />
        <div className="container-dt grid min-h-[480px] items-end gap-10 py-20 pt-24 pb-32 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <div className="eyebrow !text-gold-300">{t("catalog.eyebrow")}</div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl">{t("catalog.title")}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">{t("catalog.copy")}</p>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[24px]">
              <ParallaxImage
                src="https://picsum.photos/seed/dharma-catalog/1000/800"
                alt="Pujas"
                className="h-[340px] w-full lg:h-[440px]"
                strength={25}
              />
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-3 rounded-full border border-dt surface-dt px-4 py-3 focus-within:border-gold-400 transition-colors">
              <MagnifyingGlass size={17} className="muted-dt" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder={t("catalog.searchPlaceholder")}
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  aria-label="Clear search"
                  className="grid h-6 w-6 place-items-center rounded-full muted-dt hover:bg-surface-2-dt"
                >
                  <X size={13} />
                </button>
              )}
            </div>
            <button
              className="btn-ghost-dt lg:hidden"
              onClick={() => setMobileFiltersOpen((v) => !v)}
            >
              <SlidersHorizontal size={15} /> {t("catalog.filters")}
            </button>
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {tags.map((tg) => (
              <button
                onClick={() => setTag(tg)}
                key={tg}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors ${tag === tg ? "border-gold-400 bg-gold-400/10 text-gold-600 dark:text-gold-300" : "border-dt muted-dt hover:border-gold-400/50"}`}
              >
                {tg}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
            <aside className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
              <div className="flex items-center justify-between">
                <div className="eyebrow">{t("catalog.refine")}</div>
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-[10px] font-bold text-gold-600 hover:underline"
                  >
                    {t("catalog.clearAll")}
                  </button>
                )}
              </div>
              <div className="mt-5 grid gap-7">
                <div>
                  <div className="text-xs font-semibold">{t("catalog.deity")}</div>
                  <div className="mt-2 grid gap-1">
                    {["All", ...deities].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDeity(d)}
                        className={`flex items-center justify-between border-b border-dt py-2 text-left text-sm transition-colors ${deity === d ? "text-gold-600" : "muted-dt hover:text-ink"}`}
                      >
                        {d === "All" ? t("common.all") : lang === "hi" ? deityHi[d] || d : d}
                        {deity === d && <CheckCircle size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold">{t("catalog.purpose")}</div>
                  <div className="mt-2 grid gap-1">
                    {["All", ...intentions].map((x) => (
                      <button
                        key={x}
                        onClick={() => setPurpose(x)}
                        className={`flex items-center justify-between border-b border-dt py-2 text-left text-sm transition-colors ${purpose === x ? "text-gold-600" : "muted-dt hover:text-ink"}`}
                      >
                        {x}
                        {purpose === x && <CheckCircle size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
            <div>
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <div className="eyebrow">{t("catalog.results")}</div>
                  <div className="mt-2 text-sm muted-dt">
                    {result.length}{" "}
                    {result.length === 1 ? t("catalog.pujaInView") : t("catalog.pujasInView")}
                    {priceRange && (
                      <span className="text-muted-dt/70">
                        {" "}
                        · ₹{priceRange.min.toLocaleString("en-IN")} - ₹
                        {priceRange.max.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>
                </div>
                <label className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="appearance-none rounded-full border border-dt bg-transparent pl-4 pr-9 py-2 text-xs cursor-pointer hover:border-gold-400/50 transition-colors"
                  >
                    {SORTS.map((s) => (
                      <option key={s.key} value={s.key}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 muted-dt text-[10px]">
                    ▾
                  </span>
                </label>
              </div>

              {activeFilters.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeFilters.map((f) => (
                    <button
                      key={f.key}
                      onClick={f.clear}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-gold-400/8 px-3 py-1.5 text-[11px] font-semibold text-gold-600 dark:text-gold-300 hover:bg-gold-400/15 transition-colors"
                    >
                      {f.key === "deity" && lang === "hi" ? deityHi[f.label] || f.label : f.label}
                      <X size={11} />
                    </button>
                  ))}
                </div>
              )}

              {result.length ? (
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {result.map((p, i) => (
                    <PujaCard key={p.id} p={p} index={i} />
                  ))}
                </div>
              ) : (
                <div className="panel-dt mt-8 p-10 text-center">
                  <House size={32} className="mx-auto text-gold-600" />
                  <div className="display-dt mt-4 text-4xl">{t("catalog.noPujas")}</div>
                  <p className="mt-3 text-sm muted-dt">{t("catalog.tryAnother")}</p>
                  <button onClick={clearAll} className="btn-gold-dt mt-6">
                    {t("catalog.clearAllFilters")}
                  </button>
                </div>
              )}
            </div>
          </div>

          <section className="mt-20 has-decor-dt">
            <SectionDecor />
            <Rangoli className="decor-dt decor-bl hide-mobile soft-tone" />
            <SectionHeading title={t("catalog.seasonalShelves")} copy={t("catalog.seasonalCopy")} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {orderedFestivals.map((f, i) => {
                const name = lang === "hi" && f.nameHi ? f.nameHi : f.name;
                const note = lang === "hi" && f.noteHi ? f.noteHi : f.note;
                return (
                  <Reveal key={f.name} delay={i * 0.04}>
                    <div className="panel-dt overflow-hidden">
                      <div className="media-dt aspect-[4/3]">
                        <SafeImage
                          src={f.image}
                          alt={name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <div className="text-[10px] uppercase tracking-[.16em] text-gold-600">
                          {f.date}
                        </div>
                        <h3 className="mt-2 text-3xl">{name}</h3>
                        <p className="mt-1 text-xs leading-6 muted-dt">{note}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

function parseDate(s) {
  // Works for "Sep 09, 2026". For non-English strings returns Infinity.
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? Infinity : d.getTime();
}
