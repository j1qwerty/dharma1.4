import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Clock,
  VideoCamera,
  ArrowRight,
  MapPin,
  CalendarBlank,
} from "@phosphor-icons/react";
import { Reveal } from "../components/common/Motion";
import { LeafBranch, LotusLine, Conch, Trishul } from "../components/common/Decor";
export default function Tracking() {
  const items = [
    ["Booking confirmed", "Sep 05, 2026 · 11:04 AM", 1],
    ["Sankalp submitted", "Sep 05, 2026 · 11:07 AM", 1],
    ["Preparation", "Temple ritual preparation", 1],
    ["Puja scheduled", "Sep 09, 2026 · 07:30 AM", 0],
    ["Puja performed", "Awaiting the ceremony", 0],
    ["Video delivered", "After processing", 0],
  ];
  return (
    <section className="site-section has-decor-dt">
      <Conch className="decor-dt decor-tl hide-mobile soft-tone" />
      <Trishul className="decor-dt decor-br hide-mobile soft-tone" />
      <div className="container-dt max-w-[1200px]">
        <Reveal>
          <div className="eyebrow">Booking tracking</div>
          <h1 className="display-dt mt-3 text-6xl">A timeline you can follow.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 muted-dt">
            Your booking becomes a visible lifecycle from confirmation through the ritual and
            video delivery.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.55fr]">
          <Reveal>
            <div className="panel-dt p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="text-xs muted-dt">DT-702450912</div>
                  <h2 className="display-dt mt-2 text-4xl">Maha Rudrabhishek</h2>
                  <div className="mt-3 flex gap-4 text-xs muted-dt">
                    <span className="inline-flex items-center gap-1">
                      <CalendarBlank size={13} /> Sep 09
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={13} /> Kashi Vishwanath
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-gold-400/12 px-3 py-2 text-xs font-bold text-gold-600 dark:text-gold-300">
                  Confirmed
                </span>
              </div>
              <div className="mt-8">
                {items.map((x, i) => (
                  <div className="relative flex gap-4 pb-7" key={x[0]}>
                    {i < items.length - 1 && (
                      <span className="absolute left-[17px] top-7 h-[calc(100%-12px)] w-px bg-[color:var(--line)]" />
                    )}
                    <span
                      className={`relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full ${x[2] ? "bg-gold-400 text-ink-950" : "border border-dt surface-dt muted-dt"}`}
                    >
                      {x[2] ? <CheckCircle size={16} weight="fill" /> : <Clock size={15} />}
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{x[0]}</div>
                      <div className="mt-1 text-xs muted-dt">{x[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid gap-4">
            <Reveal>
              <div className="panel-dt p-6">
                <VideoCamera size={20} className="text-gold-600" />
                <div className="display-dt mt-4 text-3xl">Video and photos</div>
                <p className="mt-2 text-sm leading-6 muted-dt">
                  The media area unlocks when the ceremony is completed and files finish processing.
                </p>
              </div>
            </Reveal>
            <Link className="btn-gold-dt w-full" to="/dashboard">
              Open my account <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
