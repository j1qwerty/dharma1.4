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
import { pujas, festivals, intentions, deities } from "../lib/data";
import PujaCard from "../components/common/PujaCard";
import SectionHeading from "../components/common/SectionHeading";
import { Reveal } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, Rangoli, Toran } from "../components/common/Decor";

const SORTS = [
  { key: "popular", label: "Sort by Popular" },
  { key: "upcoming", label: "Sort by Upcoming" },
  { key: "price-asc", label: "Price low to high" },
  { key: "price-desc", label: "Price high to low" },
];

// parse "Sep 09, 2026" into a Date for upcoming sort
function parseDate(s) {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? Infinity : d.getTime();
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDeity = searchParams.get("deity");
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const [deity, setDeity] = useState(
    initialDeity && deities.includes(initialDeity) ? initialDeity : "All"
  );
  const [purpose, setPurpose] = useState("All");
  const [sort, setSort] = useState("popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const tags = ["All", "Festival", "Evergreen", "Popular", "Remedy", "Limited slots"];

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const result = useMemo(() => {
    const filtered = pujas.filter(
      (p) =>
        (tag === "All" || p.tag === tag) &&
        (deity === "All" || p.deity === deity) &&
        (purpose === "All" || p.purpose === purpose) &&
        `${p.title} ${p.deity} ${p.temple} ${p.purpose}`.toLowerCase().includes(q.toLowerCase())
    );
    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "upcoming") sorted.sort((a, b) => parseDate(a.date) - parseDate(b.date));
    // popular = original order
    return sorted;
  }, [q, tag, deity, purpose, sort]);

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

  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <div className="container-dt pt-24 pb-32">
          <Reveal>
            <div className="eyebrow !text-gold-300">Pujas</div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl">
              Find the puja that fits the moment.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">
              Browse by festival, deity, purpose, temple or ritual type. The same catalogue can carry
              year-round and seasonal inventory.
            </p>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt">
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <div className="flex items-center gap-3 rounded-full border border-dt surface-dt px-4 py-3 focus-within:border-gold-400 transition-colors">
              <MagnifyingGlass size={17} className="muted-dt" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="Search by puja, deity or temple"
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
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {tags.map((t) => (
              <button
                onClick={() => setTag(t)}
                key={t}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors ${tag === t ? "border-gold-400 bg-gold-400/10 text-gold-600 dark:text-gold-300" : "border-dt muted-dt hover:border-gold-400/50"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
            <aside className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
              <div className="flex items-center justify-between">
                <div className="eyebrow">Refine</div>
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-[10px] font-bold text-gold-600 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="mt-5 grid gap-7">
                <div>
                  <div className="text-xs font-semibold">Deity</div>
                  <div className="mt-2 grid gap-1">
                    {["All", ...deities].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDeity(d)}
                        className={`flex items-center justify-between border-b border-dt py-2 text-left text-sm transition-colors ${deity === d ? "text-gold-600" : "muted-dt hover:text-ink"}`}
                      >
                        {d}
                        {deity === d && <CheckCircle size={14} />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold">Purpose</div>
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
                  <div className="eyebrow">Results</div>
                  <div className="mt-2 text-sm muted-dt">
                    {result.length} {result.length === 1 ? "puja" : "pujas"} in this view
                    {priceRange && (
                      <span className="text-muted-dt/70">
                        {" "}
                        · ₹{priceRange.min.toLocaleString("en-IN")} - ₹{priceRange.max.toLocaleString("en-IN")}
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
                      {f.label}
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
                  <div className="display-dt mt-4 text-4xl">No pujas match this view.</div>
                  <p className="mt-3 text-sm muted-dt">Try another deity, tag or search term.</p>
                  <button onClick={clearAll} className="btn-gold-dt mt-6">
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          <section className="mt-20 has-decor-dt">
            <Rangoli className="decor-dt decor-bl hide-mobile soft-tone" />
            <SectionHeading
              title="Seasonal shelves"
              copy="These shelves can be promoted or hidden by CMS later without changing the catalogue layout."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {festivals.map((f, i) => (
                <Reveal key={f.name} delay={i * 0.04}>
                  <div className="panel-dt overflow-hidden">
                    <div className="media-dt aspect-[4/3]">
                      <img src={f.image} alt="" />
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] uppercase tracking-[.16em] text-gold-600">
                        {f.date}
                      </div>
                      <h3 className="mt-2 text-3xl">{f.name}</h3>
                      <p className="mt-1 text-xs leading-6 muted-dt">{f.note}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
