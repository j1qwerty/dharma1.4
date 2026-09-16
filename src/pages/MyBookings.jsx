import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, Kalash, Trishul, SectionDecor } from "../components/common/decor";
const bookings = [
  ["Maha Rudrabhishek", "Sep 09, 2026", "Confirmed"],
  ["Ganesh Vighnaharta Puja", "Sep 10, 2026", "Confirmed"],
  ["Mahalakshmi Dhan Akarshan", "Oct 20, 2026", "Upcoming"],
  ["Satyanarayan Katha", "Aug 22, 2026", "Completed"],
  ["Sankat Mochan Hanuman Seva", "Aug 03, 2026", "Completed"],
];
export default function MyBookings() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const tabs = ["All", "Upcoming", "Completed"];
  const filtered = bookings.filter(
    (x) =>
      (tab === "All" || x[2] === tab || (tab === "Upcoming" && x[2] === "Confirmed")) &&
      x[0].toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <SectionDecor />
        <div className="container-dt grid min-h-[420px] items-end gap-10 py-20 pt-20 pb-28 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <div className="eyebrow !text-gold-300">My bookings</div>
            <h1 className="display-dt mt-3 text-6xl">Every ritual, one place.</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              Search, track, rebook, and open the media attached to each ceremony.
            </p>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[24px]">
              <ParallaxImage
                src="https://picsum.photos/seed/dharma-bookings/1000/800"
                alt="My bookings"
                className="h-[280px] w-full lg:h-[340px]"
                strength={25}
              />
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <Kalash className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt max-w-[1200px]">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold ${tab === t ? "border-gold-400 bg-gold-400/10 text-gold-600" : "border-dt muted-dt"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-full border border-dt surface-dt px-4 py-3">
            <MagnifyingGlass size={17} className="muted-dt" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search bookings"
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="mt-8 grid gap-3">
            {filtered.map((b, i) => (
              <Reveal key={b[0]} delay={i * 0.04}>
                <div className="panel-dt p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[.15em] text-gold-600">
                        {b[2]}
                      </span>
                      <h2 className="display-dt mt-1 text-3xl">{b[0]}</h2>
                      <div className="mt-1 text-xs muted-dt">{b[1]}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link className="btn-ghost-dt !py-2.5" to="/booking/tracking">
                        Track <ArrowRight size={14} />
                      </Link>
                      <Link className="btn-gold-dt !py-2.5" to="/booking/confirmation">
                        Open <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 border-t border-dt pt-10">
            <div className="grid gap-4 md:grid-cols-2">
              <Reveal>
                <div className="panel-dt p-6">
                  <div className="eyebrow">Rebook</div>
                  <h2 className="display-dt mt-2 text-4xl">Return to a ritual you already know.</h2>
                  <p className="mt-2 text-sm leading-7 muted-dt">
                    Past bookings can later become one-tap starting points for the same Sankalp and
                    family details.
                  </p>
                </div>
              </Reveal>
              <Reveal>
                <div className="panel-dt p-6">
                  <div className="eyebrow">Archive</div>
                  <h2 className="display-dt mt-2 text-4xl">
                    Keep the media after the booking closes.
                  </h2>
                  <p className="mt-2 text-sm leading-7 muted-dt">
                    Completed pujas can feed My Blessings in the next phase of the product.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
