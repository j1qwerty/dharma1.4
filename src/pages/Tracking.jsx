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
import SafeImage from "../components/common/SafeImage";
import { LeafBranch, LotusLine, Conch, Trishul, SectionDecor } from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";

export default function Tracking() {
  const { t, lang } = useLanguage();
  const items =
    lang === "hi"
      ? [
          ["बुकिंग पुष्ट", "5 सितं 2026 · 11:04 AM", 1],
          ["संकल्प जमा", "5 सितं 2026 · 11:07 AM", 1],
          ["तैयारी", "मंदिर अनुष्ठान तैयारी", 1],
          ["पूजा निर्धारित", "9 सितं 2026 · 07:30 AM", 0],
          ["पूजा संपन्न", "समारोह की प्रतीक्षा", 0],
          ["वीडियो डिलीवर", "प्रोसेसिंग के बाद", 0],
        ]
      : [
          ["Booking confirmed", "Sep 05, 2026 · 11:04 AM", 1],
          ["Sankalp submitted", "Sep 05, 2026 · 11:07 AM", 1],
          ["Preparation", "Temple ritual preparation", 1],
          ["Puja scheduled", "Sep 09, 2026 · 07:30 AM", 0],
          ["Puja performed", "Awaiting the ceremony", 0],
          ["Video delivered", "After processing", 0],
        ];
  return (
    <section className="site-section has-decor-dt">
      <SectionDecor />
      <Conch className="decor-dt decor-tl hide-mobile soft-tone" />
      <Trishul className="decor-dt decor-br hide-mobile soft-tone" />
      <div className="container-dt max-w-[1200px]">
        <Reveal>
          <div className="eyebrow">{t("track.eyebrow")}</div>
          <h1 className="display-dt mt-3 text-6xl">{t("track.title")}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 muted-dt">{t("track.copy")}</p>
        </Reveal>
        <div className="mt-8 overflow-hidden rounded-2xl">
          <SafeImage
            src="https://picsum.photos/seed/dharma-tracking/1600/700"
            alt=""
            className="h-52 w-full object-cover"
          />
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_.55fr]">
          <Reveal>
            <div className="panel-dt p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="text-xs muted-dt">DT-702450912</div>
                  <h2 className="display-dt mt-2 text-4xl">
                    {lang === "hi" ? "महा रुद्राभिषेक" : "Maha Rudrabhishek"}
                  </h2>
                  <div className="mt-3 flex gap-4 text-xs muted-dt">
                    <span className="inline-flex items-center gap-1">
                      <CalendarBlank size={13} /> {lang === "hi" ? "9 सितं" : "Sep 09"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={13} /> {lang === "hi" ? "काशी विश्वनाथ" : "Kashi Vishwanath"}
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-gold-400/12 px-3 py-2 text-xs font-bold text-gold-600 dark:text-gold-300">
                  {t("track.confirmed")}
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
                <div className="overflow-hidden rounded-xl">
                  <SafeImage
                    src="https://picsum.photos/seed/dharma-ritual-video/800/450"
                    alt=""
                    className="h-36 w-full object-cover"
                  />
                </div>
                <VideoCamera size={20} className="mt-4 text-gold-600" />
                <div className="display-dt mt-4 text-3xl">{t("track.videoTitle")}</div>
                <p className="mt-2 text-sm leading-6 muted-dt">{t("track.videoCopy")}</p>
              </div>
            </Reveal>
            <Link className="btn-gold-dt w-full" to="/dashboard">
              {t("track.openAccount")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
