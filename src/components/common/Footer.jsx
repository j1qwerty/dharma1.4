import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
  ArrowUpRight,
  ArrowUp,
  Check,
} from "@phosphor-icons/react";
import Brand from "./Brand";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [joined, setJoined] = useState(false);

  // Back-to-top visibility via IntersectionObserver on the header sentinel.
  useEffect(() => {
    const sentinel = document.getElementById("header-sentinel-dt");
    if (!sentinel) return;
    const io = new IntersectionObserver(
      (entries) => setShowTop(!entries[0].isIntersecting),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // also scroll the iframe root if present
    const f = document.querySelector("iframe");
    if (f && f.contentWindow) {
      try {
        f.contentWindow.scrollTo({ top: 0, behavior: "smooth" });
      } catch {
        /* cross-origin, ignore */
      }
    }
  }

  return (
    <footer className="ink-dt mt-12 overflow-hidden">
      <div className="container-dt section-dt pb-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.35fr_.65fr_.65fr_1fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Brand dark />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              Traditional rituals, clear booking, and a place to return to when the ceremony is
              complete.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                href="#"
              >
                <InstagramLogo size={15} />
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                href="#"
              >
                <FacebookLogo size={15} />
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                href="#"
              >
                <YoutubeLogo size={15} />
              </a>
            </div>
          </div>
          <div>
            <div className="text-xs text-gold-300">Explore</div>
            <div className="mt-4 grid gap-3 text-sm text-white/55">
              <Link to="/pujas">Pujas</Link>
              <Link to="/acharyas">Acharyas</Link>
              <Link to="/stories">Stories</Link>
              <Link to="/about">About</Link>
              <Link to="/dashboard">My account</Link>
            </div>
          </div>
          <div>
            <div className="text-xs text-gold-300">Legal</div>
            <div className="mt-4 grid gap-3 text-sm text-white/55">
              <Link to="/terms">Terms</Link>
              <Link to="/privacy">Privacy</Link>
              <a href="https://wa.me/919999999999">WhatsApp support</a>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="text-xs text-gold-300">Stay connected</div>
            <p className="mt-4 text-sm leading-6 text-white/55">
              Festival reminders, new pujas, temple stories and booking windows.
            </p>
            <form
              className="mt-4 flex overflow-hidden rounded-full border border-white/10 bg-white/[.04] focus-within:border-gold-400/50 transition-colors"
              onSubmit={(e) => {
                e.preventDefault();
                setJoined(true);
                setTimeout(() => setJoined(false), 2600);
              }}
            >
              <input
                type="email"
                required
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                placeholder="your@email.com"
                aria-label="Email"
              />
              <button
                type="submit"
                className={`btn-gold-dt !px-4 !py-2.5 transition-all ${joined ? "!bg-transparent !text-gold-300" : ""}`}
              >
                {joined ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Check size={14} weight="bold" /> Joined
                  </span>
                ) : (
                  "Join"
                )}
              </button>
            </form>
            {joined && (
              <p className="mt-2 text-[11px] text-gold-300/80">
                Subscribed. Festival reminders will arrive soon.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-dt flex flex-col gap-2 py-5 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 DharmaTribe</span>
          <span>Devotional services are cultural and spiritual in nature.</span>
        </div>
      </div>
      {showTop && (
        <button
          onClick={scrollTop}
          aria-label="Back to top"
          className="back-to-top-dt"
        >
          <ArrowUp size={16} weight="bold" />
        </button>
      )}
    </footer>
  );
}
