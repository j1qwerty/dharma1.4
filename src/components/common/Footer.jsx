import React from "react";
import { Link } from "react-router-dom";
import { InstagramLogo, FacebookLogo, YoutubeLogo, ArrowUpRight } from "@phosphor-icons/react";
import Brand from "./Brand";

export default function Footer() {
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
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10"
                href="#"
              >
                <InstagramLogo size={15} />
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10"
                href="#"
              >
                <FacebookLogo size={15} />
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10"
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
            <div className="mt-4 flex overflow-hidden rounded-full border border-white/10 bg-white/[.04]">
              <input
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                placeholder="your@email.com"
              />
              <button className="btn-gold-dt !px-4 !py-2.5">Join</button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-dt flex flex-col gap-2 py-5 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 DharmaTribe</span>
          <span>Devotional services are cultural and spiritual in nature.</span>
        </div>
      </div>
    </footer>
  );
}
