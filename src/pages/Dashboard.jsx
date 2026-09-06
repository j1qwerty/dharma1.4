import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarBlank,
  Play,
  VideoCamera,
  Heart,
  Clock,
  BookmarkSimple,
} from "@phosphor-icons/react";
import { Reveal } from "../components/common/Motion";
export default function Dashboard() {
  return (
    <section className="site-section">
      <div className="container-dt">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <div className="eyebrow">My account</div>
              <h1 className="display-dt mt-3 text-6xl">Good morning, Aarav.</h1>
              <p className="mt-4 max-w-xl text-sm leading-7 muted-dt">
                Your account is the place where upcoming bookings, ritual media and saved details
                stay together.
              </p>
            </div>
            <div className="panel-dt p-6">
              <div className="text-xs muted-dt">Next puja</div>
              <div className="display-dt mt-2 text-4xl">Maha Rudrabhishek</div>
              <div className="mt-3 flex items-center gap-2 text-xs muted-dt">
                <CalendarBlank size={15} /> Sep 09 · 07:30 AM
              </div>
              <Link to="/booking/tracking" className="btn-gold-dt mt-6">
                Track booking <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Total bookings", "5"],
            ["Upcoming", "2"],
            ["Completed", "3"],
          ].map(([a, b], i) => (
            <Reveal delay={i * 0.04} key={a}>
              <div className="panel-dt p-6">
                <div className="text-xs muted-dt">{a}</div>
                <div className="display-dt mt-3 text-5xl">{b}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <div className="panel-dt p-7">
              <div className="flex items-center justify-between">
                <div>
                  <div className="eyebrow">Upcoming</div>
                  <h2 className="mt-2 display-dt text-4xl">Your bookings</h2>
                </div>
                <Link className="btn-ghost-dt" to="/bookings">
                  View all
                </Link>
              </div>
              <div className="mt-6 grid gap-1">
                {[
                  ["Maha Rudrabhishek", "Sep 09 · 07:30 AM", "Confirmed"],
                  ["Ganesh Vighnaharta Puja", "Sep 10 · 09:00 AM", "Confirmed"],
                  ["Mahalakshmi Dhan Akarshan", "Oct 20 · 06:15 PM", "Upcoming"],
                ].map((x) => (
                  <div key={x[0]} className="flex items-center gap-4 border-t border-dt py-4">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{x[0]}</div>
                      <div className="mt-1 text-xs muted-dt">{x[1]}</div>
                    </div>
                    <span className="rounded-full bg-gold-400/12 px-3 py-1.5 text-[10px] font-bold text-gold-600 dark:text-gold-300">
                      {x[2]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="panel-dt p-7">
              <div className="eyebrow">My blessings</div>
              <h2 className="mt-2 display-dt text-4xl">Recent rituals</h2>
              <div className="mt-6 grid gap-4">
                {["Satyanarayan Katha", "Sankat Mochan Hanuman Seva", "Maha Rudrabhishek"].map(
                  (x) => (
                    <div key={x} className="flex gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full surface-2-dt">
                        <Play size={14} weight="fill" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold">{x}</div>
                        <div className="mt-1 text-xs muted-dt">Photos and video available</div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
        <section className="mt-12">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              [VideoCamera, "Puja videos", "Open your recorded ceremonies"],
              [BookmarkSimple, "Saved details", "Keep family information ready"],
            ].map(([Icon, title, copy], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <Link to="/bookings" className="panel-dt p-6 block">
                  <Icon size={20} className="text-gold-600" />
                  <div className="mt-5 text-3xl display-dt">{title}</div>
                  <p className="mt-2 text-xs muted-dt">{copy}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="mt-12 border-t border-dt pt-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="eyebrow">Your rhythm</div>
              <h2 className="display-dt mt-3 text-5xl">The account remembers the journey.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 muted-dt">
                Upcoming rituals sit next to completed ones, so the dashboard works as both a
                planning surface and a simple archive.
              </p>
            </Reveal>
            <Reveal>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="panel-dt p-5">
                  <Clock size={18} className="text-gold-600" />
                  <div className="mt-4 text-2xl display-dt">Next reminder</div>
                  <div className="mt-1 text-xs muted-dt">Sep 08 · Sankalp check</div>
                </div>
                <div className="panel-dt p-5">
                  <Heart size={18} className="text-gold-600" />
                  <div className="mt-4 text-2xl display-dt">Saved pujas</div>
                  <div className="mt-1 text-xs muted-dt">3 rituals saved for later</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </section>
  );
}
