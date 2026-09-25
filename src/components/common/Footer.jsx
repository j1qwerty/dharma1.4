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
import { BackToTopHalo } from "./decor";
import { useLanguage } from "./LanguageToggle";
import { WHATSAPP_NUMBER } from "../../lib/site";

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [joined, setJoined] = useState(false);
  const { t } = useLanguage();

  // Back-to-top visibility via IntersectionObserver on the header sentinel.
  useEffect(() => {
    const sentinel = document.getElementById("header-sentinel-dt");
    if (!sentinel) return;
    const io = new IntersectionObserver((entries) => setShowTop(!entries[0].isIntersecting), {
      threshold: 0,
    });
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
      <div className="container-dt pt-10 pb-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.35fr_.65fr_.65fr_1fr] lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <Brand dark large />
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">{t("footer.tagline")}</p>
          </div>
          <div>
            <div className="text-xs text-gold-300">{t("footer.explore")}</div>
            <div className="mt-4 grid gap-3 text-sm text-white/55">
              <Link to="/pujas">{t("nav.pujas")}</Link>
              <Link to="/acharyas">{t("nav.acharyas")}</Link>
              <Link to="/stories">{t("nav.stories")}</Link>
              <Link to="/about">{t("nav.about")}</Link>
              <Link to="/dashboard">{t("nav.account")}</Link>
            </div>
          </div>
          <div>
            <div className="text-xs text-gold-300">{t("footer.legal")}</div>
            <div className="mt-4 grid gap-3 text-sm text-white/55">
              <Link to="/terms">{t("footer.terms")}</Link>
              <Link to="/privacy">{t("footer.privacy")}</Link>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>{t("footer.whatsapp")}</a>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="flex gap-2">
              <a
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                href="#"
                aria-label="Instagram"
              >
                <InstagramLogo size={15} />
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                href="#"
                aria-label="Facebook"
              >
                <FacebookLogo size={15} />
              </a>
              <a
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 hover:border-gold-400/50 hover:text-gold-300 transition-colors"
                href="#"
                aria-label="YouTube"
              >
                <YoutubeLogo size={15} />
              </a>
            </div>
            <div className="mt-6 text-xs text-gold-300">{t("footer.stayConnected")}</div>
            <p className="mt-4 text-sm leading-6 text-white/55">{t("footer.stayCopy")}</p>
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
                    <Check size={14} weight="bold" /> {t("footer.joined")}
                  </span>
                ) : (
                  t("footer.join")
                )}
              </button>
            </form>
            {joined && (
              <p className="mt-2 text-[11px] text-gold-300/80">{t("footer.joinedNote")}</p>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-dt flex flex-col gap-2 py-5 text-[10px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 DharmaaTribe</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
      {showTop && (
        <button onClick={scrollTop} aria-label="Back to top" className="back-to-top-dt">
          <BackToTopHalo size={56} speed={0.6} />
          <span className="back-to-top-core-dt">
            <ArrowUp size={13} weight="bold" />
          </span>
        </button>
      )}
    </footer>
  );
}
