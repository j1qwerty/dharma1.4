import React, { useMemo, useState } from "react";
import {
  MagnifyingGlass,
  SlidersHorizontal,
  ArrowUpRight,
  CheckCircle,
} from "@phosphor-icons/react";
import { pujas, festivals, intentions, deities } from "../lib/data";
import PujaCard from "../components/common/PujaCard";
import SectionHeading from "../components/common/SectionHeading";
import { Reveal } from "../components/common/Motion";

export default function Catalog() {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("All");
  const [deity, setDeity] = useState("All");
  const tags = ["All", "Festival", "Evergreen", "Popular", "Remedy", "Limited slots"];
  const result = useMemo(
    () =>
      pujas.filter(
        (p) =>
          (tag === "All" || p.tag === tag) &&
          (deity === "All" || p.deity === deity) &&
          `${p.title} ${p.deity} ${p.temple}`.toLowerCase().includes(q.toLowerCase())
      ),
    [q, tag, deity]
  );
  return (
    <section className="site-section">
      <div className="container-dt">
        <Reveal>
          <div className="eyebrow">Pujas</div>
          <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl">
            Find the puja that fits the moment.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-dt">
            Browse by festival, deity, purpose, temple or ritual type. The same catalogue can carry
            year-round and seasonal inventory.
          </p>
        </Reveal>
        <div className="mt-9 grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 rounded-full border border-dt surface-dt px-4 py-3">
            <MagnifyingGlass size={17} className="muted-dt" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search by puja, deity or temple"
            />
          </div>
          <button className="btn-ghost-dt">
            <SlidersHorizontal size={15} /> Filters
          </button>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {tags.map((t) => (
            <button
              onClick={() => setTag(t)}
              key={t}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold ${tag === t ? "border-gold-400 bg-gold-400/10 text-gold-600 dark:text-gold-300" : "border-dt muted-dt"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="eyebrow">Refine</div>
            <div className="mt-5 grid gap-7">
              <div>
                <div className="text-xs font-semibold">Deity</div>
                <div className="mt-2 grid gap-1">
                  {["All", ...deities].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDeity(d)}
                      className={`flex items-center justify-between border-b border-dt py-2 text-left text-sm ${deity === d ? "text-gold-600" : "muted-dt"}`}
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
                  {intentions.slice(0, 6).map((x) => (
                    <button key={x} className="border-b border-dt py-2 text-left text-sm muted-dt">
                      {x}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <div>
            <div className="flex items-end justify-between">
              <div>
                <div className="eyebrow">Results</div>
                <div className="mt-2 text-sm muted-dt">{result.length} pujas in this view</div>
              </div>
              <select className="rounded-full border border-dt bg-transparent px-4 py-2 text-xs">
                <option>Sort by Popular</option>
                <option>Upcoming</option>
                <option>Price low to high</option>
              </select>
            </div>
            {result.length ? (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {result.map((p, i) => (
                  <PujaCard key={p.id} p={p} index={i} />
                ))}
              </div>
            ) : (
              <div className="panel-dt mt-8 p-10 text-center">
                <div className="display-dt text-4xl">No pujas match this view.</div>
                <p className="mt-3 text-sm muted-dt">Try another deity, tag or search term.</p>
              </div>
            )}
          </div>
        </div>

        <section className="mt-20">
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
  );
}
