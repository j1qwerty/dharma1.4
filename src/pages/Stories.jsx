import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MagnifyingGlass, ArrowUpRight, CalendarBlank } from "@phosphor-icons/react";
import { stories } from "../lib/data";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import { StoryMasonry } from "../components/common/Masonry";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, Conch, Yantra } from "../components/common/Decor";

export default function Stories() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = [
    "All",
    "Festivals",
    "Deity Stories",
    "Rituals / Puja Vidhi",
    "Temple Histories",
    "Devotee Stories",
  ];
  const items = stories.filter(
    (s) =>
      (cat === "All" || s.category === cat) &&
      `${s.title} ${s.excerpt}`.toLowerCase().includes(q.toLowerCase())
  );
  const feature = items[0] || stories[0];
  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <div className="container-dt pt-24 pb-32">
          <Reveal>
            <div className="eyebrow !text-gold-300">Stories</div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl">
              Stories that give the ritual some context.
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">
              Festival guides, temple histories, ritual explainers and experiences from devotees.
            </p>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt">
        <Conch className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 rounded-full border border-dt surface-dt px-4 py-3">
            <MagnifyingGlass size={17} className="muted-dt" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              placeholder="Search stories"
            />
          </div>
          <button className="btn-ghost-dt">
            Featured <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {cats.map((c) => {
            const count =
              c === "All"
                ? stories.length
                : stories.filter((s) => s.category === c).length;
            return (
              <button
                onClick={() => setCat(c)}
                key={c}
                className={`whitespace-nowrap inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors ${cat === c ? "border-gold-400 bg-gold-400/10 text-gold-600 dark:text-gold-300" : "border-dt muted-dt hover:border-gold-400/50"}`}
              >
                {c}
                <span
                  className={`grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] ${cat === c ? "bg-gold-400/30 text-gold-700 dark:text-gold-200" : "bg-surface-2-dt muted-dt"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <section className="mt-14">
          <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <Reveal>
              <Link to={`/stories/${feature.id}`} className="card-dt block">
                <div className="media-dt aspect-[16/9]">
                  <ParallaxImage
                    src={feature.image}
                    alt={feature.title}
                    className="h-full"
                    strength={18}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute left-5 right-5 bottom-5 text-white">
                    <div className="text-[10px] uppercase tracking-[.18em] text-gold-300">
                      Featured story
                    </div>
                    <h2 className="mt-2 display-dt text-4xl sm:text-5xl">{feature.title}</h2>
                    <div className="mt-3 flex items-center gap-3 text-[11px] text-white/55">
                      <span>{feature.date}</span>
                      <span>{feature.read}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
            <Reveal>
              <div className="panel-dt h-full p-6 sm:p-7">
                <div className="eyebrow">This month</div>
                <h2 className="display-dt mt-3 text-4xl">Start with the ritual, then go deeper.</h2>
                <div className="mt-6 grid gap-1">
                  {stories.slice(1, 5).map((s) => (
                    <Link
                      key={s.id}
                      to={`/stories/${s.id}`}
                      className="flex items-center gap-4 border-t border-dt py-4"
                    >
                      <div className="h-14 w-16 overflow-hidden rounded-xl">
                        <img src={s.image} className="h-full w-full object-cover" alt="" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] uppercase tracking-[.16em] text-gold-600">
                          {s.category}
                        </div>
                        <div className="mt-1 text-sm font-semibold leading-5">{s.title}</div>
                      </div>
                      <ArrowUpRight size={14} className="muted-dt shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-end justify-between gap-5 flex-wrap">
            <div>
              <h2 className="display-dt text-5xl">The full journal</h2>
              <p className="mt-3 max-w-xl text-sm text-muted-dt">
                A masonry reading surface keeps different story lengths from feeling like identical
                cards.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[10px] muted-dt">
              <span className="inline-flex items-center gap-1.5">
                <CalendarBlank size={14} /> Updated throughout the season
              </span>
              <span className="hidden sm:inline text-muted-dt/60">·</span>
              <span className="hidden sm:inline font-semibold text-gold-600">
                {items.length} {items.length === 1 ? "story" : "stories"}
                {cat !== "All" && ` in ${cat}`}
              </span>
            </div>
          </div>
          <div className="mt-8">
            <StoryMasonry
              items={items}
              render={(s) => (
                <Link to={`/stories/${s.id}`} className="block">
                  <div className="story-card-dt">
                    <div className="story-media-dt">
                      <ParallaxImage
                        src={s.image}
                        alt={s.title}
                        className="h-auto min-h-[210px]"
                        strength={11}
                      />
                    </div>
                    <div className="story-copy-dt">
                      <div className="cat">{s.category}</div>
                      <h3>{s.title}</h3>
                      <p>{s.excerpt}</p>
                      <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-gold-600">
                        Read story <ArrowUpRight size={13} />
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            />
          </div>
        </section>

        <section className="mt-20 border-t border-dt pt-12 has-decor-dt">
          <Yantra className="decor-dt decor-br hide-mobile soft-tone" />
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] items-end">
            <Reveal>
              <div className="eyebrow">Keep reading</div>
              <h2 className="display-dt mt-3 text-5xl">
                A living archive for festivals, rituals and devotion.
              </h2>
            </Reveal>
            <Reveal>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="panel-dt p-6">
                  <div className="text-3xl display-dt">Festival guides</div>
                  <p className="mt-2 text-xs leading-6 text-muted-dt">
                    Dates, context and puja routes that change with the calendar.
                  </p>
                </div>
                <div className="panel-dt p-6">
                  <div className="text-3xl display-dt">Temple histories</div>
                  <p className="mt-2 text-xs leading-6 text-muted-dt">
                    Place-led stories that can later connect directly to temple pages.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </section>
    </>
  );
}
