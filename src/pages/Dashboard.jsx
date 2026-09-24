import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Play,
  VideoCamera,
  Heart,
  Clock,
  BookmarkSimple,
  Sparkle,
  MapPin,
  MagnifyingGlass,
} from "@phosphor-icons/react";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, Bell, Kalash, SectionDecor } from "../components/common/decor";
import { useFavorites } from "../lib/favorites";
import { useAuth } from "../lib/auth";
import { useBookings } from "../lib/orders";
import { useAddresses } from "../lib/addresses";
import { useLivePujas } from "../lib/cms";
import { bookingStatusMeta } from "../lib/bookingStatus";

function BookingRow({ b, lang, pujas }) {
  const p = pujas.find((x) => x.id === b.pujaId);
  const title = lang === "hi" && p?.titleHi ? p.titleHi : p?.title || b.pujaId;
  const meta = bookingStatusMeta(b.status);
  const dateStr = b.date || b.createdAt?.toDate?.()?.toLocaleDateString?.() || "—";
  const timeStr = b.time || "";
  return (
    <div className="flex items-center gap-4 border-t border-dt py-4">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold truncate">{title}</div>
        <div className="mt-1 text-xs muted-dt">
          {dateStr}
          {timeStr ? ` · ${timeStr}` : ""}
        </div>
      </div>
      <span
        className="rounded-full px-3 py-1.5 text-[10px] font-bold"
        style={{ background: `${meta.color}22`, color: meta.color }}
      >
        {meta.label}
      </span>
      <Link to="/booking/tracking" className="btn-ghost-dt !py-2 !px-3 !text-[11px] flex-none">
        Track <ArrowRight size={13} />
      </Link>
    </div>
  );
}

function bookingTab(b) {
  const s = String(b.status || "").toLowerCase();
  if (["delivered", "archived", "completed"].includes(s)) return "Completed";
  return "Upcoming";
}

export default function Dashboard() {
  const { user } = useAuth();
  const { ids, count } = useFavorites();
  const { bookings, loading: bookingsLoading } = useBookings(user);
  const { addresses } = useAddresses(user);
  // Cache-first: render hardcoded pujas instantly, then refresh from Firestore
  // in the background when published overrides arrive.
  const { items: pujas } = useLivePujas();
  const saved = pujas.filter((p) => ids.includes(p.id));

  // Derive stats from real bookings
  const stats = React.useMemo(() => {
    const total = bookings?.length || 0;
    const upcoming =
      bookings?.filter((b) => ["pending", "confirmed", "puja_slot_assigned"].includes(b.status))
        .length || 0;
    const completed =
      bookings?.filter((b) => ["delivered", "archived"].includes(b.status)).length || 0;
    return { total, upcoming, completed };
  }, [bookings]);

  const greetingName = user?.displayName || (user?.email ? user.email.split("@")[0] : "friend");
  const nextBooking =
    bookings?.find((b) => ["pending", "confirmed", "puja_slot_assigned"].includes(b.status)) ||
    null;
  const nextPuja = nextBooking ? pujas.find((p) => p.id === nextBooking.pujaId) : null;
  const lang = "en"; // dashboard is always EN for simplicity

  // All bookings in one place (merged from MyBookings): search + status tabs.
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const filteredBookings = React.useMemo(() => {
    const list = bookings || [];
    const query = q.trim().toLowerCase();
    return list.filter((b) => {
      if (tab !== "All" && bookingTab(b) !== tab) return false;
      if (!query) return true;
      const p = pujas.find((x) => x.id === b.pujaId);
      return `${p?.title || ""} ${b.pujaId || ""} ${b.date || ""}`.toLowerCase().includes(query);
    });
  }, [bookings, pujas, q, tab]);

  if (!user) {
    // Wishlist auth gate: when not signed in, heart icon should route to login.
    // Dashboard itself is also gated — show sign-in CTA.
    return (
      <section className="site-section">
        <div className="container-dt max-w-[640px] text-center" style={{ padding: "60px 20px" }}>
          <Heart size={36} className="mx-auto text-gold-600" />
          <h1 className="display-dt mt-4" style={{ fontSize: 36 }}>
            Sign in to view your dashboard
          </h1>
          <p className="muted-dt mt-3 text-sm">
            Your wishlist, bookings and saved addresses live here once you sign in. Items you saved
            without signing in are kept locally and synced after you log in.
          </p>
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <Link to="/auth/login" className="btn-gold-dt">
              Sign in
            </Link>
            <Link to="/auth/register" className="btn-ghost-dt">
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <SectionDecor />
        <div className="container-dt pt-20 pb-16">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
              <div>
                <div className="eyebrow !text-gold-300">My account</div>
                <h1 className="display-dt mt-3 text-6xl">Good to see you, {greetingName}.</h1>
                <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
                  Your account is the place where upcoming bookings, ritual media and saved details
                  stay together.
                </p>
              </div>
              {nextPuja && (
                <div className="panel-dt p-6 bg-white/[.04] border-white/10">
                  <div className="overflow-hidden rounded-xl">
                    <ParallaxImage
                      src={nextPuja.image}
                      alt="Next puja"
                      className="h-36 w-full"
                      strength={18}
                    />
                  </div>
                  <div className="mt-4 text-xs text-white/45">Next puja</div>
                  <div className="display-dt mt-2 text-4xl">{nextPuja.title}</div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/45">
                    <CalendarBlank size={15} /> {nextBooking?.date || "—"}
                    {nextBooking?.time ? ` · ${nextBooking.time}` : ""}
                  </div>
                  <Link to="/booking/tracking" className="btn-gold-dt mt-6">
                    Track booking <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <Bell className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Total bookings", stats.total],
              ["Upcoming", stats.upcoming],
              ["Completed", stats.completed],
            ].map(([a, b], i) => (
              <Reveal delay={i * 0.04} key={a}>
                <div className="panel-dt p-6">
                  <div className="text-xs muted-dt">{a}</div>
                  <div className="display-dt mt-3 text-5xl">{b}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Quick links: addresses + wishlist */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              to="/addresses"
              className="panel-dt p-5 flex items-center gap-4 hover:border-gold-400/50 transition-colors"
            >
              <MapPin size={22} className="text-gold-600 flex-none" />
              <div className="min-w-0">
                <div className="text-sm font-semibold">Saved addresses</div>
                <div className="text-xs muted-dt mt-0.5">
                  {addresses?.length || 0} saved · max 5
                </div>
              </div>
              <ArrowUpRight size={16} className="muted-dt flex-none ml-auto" />
            </Link>
            <a
              href="#wishlist"
              className="panel-dt p-5 flex items-center gap-4 hover:border-gold-400/50 transition-colors"
            >
              <Heart size={22} className="text-gold-600 flex-none" />
              <div className="min-w-0">
                <div className="text-sm font-semibold">Saved pujas</div>
                <div className="text-xs muted-dt mt-0.5">
                  {count} {count === 1 ? "ritual" : "rituals"} in your wishlist
                </div>
              </div>
              <ArrowUpRight size={16} className="muted-dt flex-none ml-auto" />
            </a>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr]" id="bookings">
            <Reveal>
              <div className="panel-dt p-7">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <div className="eyebrow">Every ritual, one place</div>
                    <h2 className="mt-2 display-dt text-4xl">Your bookings</h2>
                  </div>
                  <div className="flex gap-2">
                    {["All", "Upcoming", "Completed"].map((label) => (
                      <button
                        key={label}
                        onClick={() => setTab(label)}
                        className={`rounded-full border px-3.5 py-1.5 text-[11px] font-semibold ${tab === label ? "border-gold-400 bg-gold-400/10 text-gold-600" : "border-dt muted-dt"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-full border border-dt surface-dt px-4 py-2.5">
                  <MagnifyingGlass size={16} className="muted-dt flex-none" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search bookings"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
                <div className="mt-4 grid gap-1">
                  {bookingsLoading ? (
                    <p className="text-xs muted-dt">Loading…</p>
                  ) : filteredBookings.length > 0 ? (
                    filteredBookings.map((b) => (
                      <BookingRow key={b.id} b={b} lang={lang} pujas={pujas} />
                    ))
                  ) : (
                    <p className="text-xs muted-dt">
                      {bookings?.length
                        ? "No bookings match this view."
                        : "No bookings yet — pick a puja to begin."}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="panel-dt p-7">
                <div className="eyebrow">My blessings</div>
                <h2 className="mt-2 display-dt text-4xl">Recent rituals</h2>
                <div className="mt-6 grid gap-4">
                  {(bookings || [])
                    .filter((b) => ["delivered", "archived"].includes(b.status))
                    .slice(0, 3)
                    .map((b) => {
                      const p = pujas.find((x) => x.id === b.pujaId);
                      return (
                        <div key={b.id} className="flex gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-full surface-2-dt">
                            <Play size={14} weight="fill" />
                          </span>
                          <div>
                            <div className="text-sm font-semibold">{p?.title || b.pujaId}</div>
                            <div className="mt-1 text-xs muted-dt">Photos and video available</div>
                          </div>
                        </div>
                      );
                    })}
                  {(!bookings ||
                    bookings.filter((b) => ["delivered", "archived"].includes(b.status)).length ===
                      0) && <p className="text-xs muted-dt">No completed rituals yet.</p>}
                </div>
              </div>
            </Reveal>
          </div>

          <section className="mt-12">
            <div className="grid gap-4 md:grid-cols-2">
              {[
                [VideoCamera, "Puja videos", "Open your recorded ceremonies", "/booking/tracking"],
                [BookmarkSimple, "Saved details", "Keep family information ready", "/addresses"],
              ].map(([Icon, title, copy, to], i) => (
                <Reveal key={title} delay={i * 0.05}>
                  <Link to={to} className="panel-dt p-6 block">
                    <Icon size={20} className="text-gold-600" />
                    <div className="mt-5 text-3xl display-dt">{title}</div>
                    <p className="mt-2 text-xs muted-dt">{copy}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Saved pujas — driven by the favorites wishlist */}
          <section className="mt-12 border-t border-dt pt-12" id="wishlist">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <div className="eyebrow">Your wishlist</div>
                <h2 className="display-dt mt-2 text-4xl">Saved pujas</h2>
                <p className="mt-2 text-sm muted-dt max-w-md">
                  Rituals you set aside for later. Tap the heart on any puja to add it here.
                </p>
              </div>
              <Link className="btn-ghost-dt" to="/pujas">
                Browse more <ArrowUpRight size={14} />
              </Link>
            </div>
            {saved.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {saved.map((p) => (
                  <Link
                    key={p.id}
                    to={`/pujas/${p.id}`}
                    className="panel-dt p-4 flex items-center gap-4 hover:border-gold-400/50 transition-colors"
                  >
                    <img
                      src={p.image}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-16 w-16 rounded-xl object-cover flex-none"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] uppercase tracking-[.15em] text-gold-600">
                        {p.deity}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold truncate">{p.title}</div>
                      <div className="mt-1 text-[11px] muted-dt">
                        From ₹{p.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <ArrowUpRight size={15} className="muted-dt flex-none" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-6 panel-dt p-8 text-center">
                <Sparkle size={26} className="mx-auto text-gold-600" />
                <div className="display-dt mt-3 text-3xl">No saved pujas yet.</div>
                <p className="mt-2 text-sm muted-dt">
                  Tap the heart on any puja card to keep it here for later.
                </p>
                <Link className="btn-gold-dt mt-5" to="/pujas">
                  Explore pujas <ArrowRight size={14} />
                </Link>
              </div>
            )}
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
                    <div className="mt-1 text-xs muted-dt">
                      {nextBooking ? nextBooking.date || "Soon" : "No upcoming rituals"}
                    </div>
                  </div>
                  <div className="panel-dt p-5">
                    <Heart size={18} className="text-gold-600" />
                    <div className="mt-4 text-2xl display-dt">Saved pujas</div>
                    <div className="mt-1 text-xs muted-dt">
                      {count} {count === 1 ? "ritual" : "rituals"} saved for later
                    </div>
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
