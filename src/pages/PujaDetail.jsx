import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Clock,
  MapPin,
  ShieldCheck,
  VideoCamera,
  CheckCircle,
} from "@phosphor-icons/react";
import { pujas as defaultPujas, stories } from "../lib/data";
import { useLivePujas } from "../lib/cms";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionHeading from "../components/common/SectionHeading";
import SectionCurve from "../components/common/SectionCurve";
import {
  LeafBranch,
  LotusLine,
  DiyaCluster,
  Kalash,
  SectionDecor,
} from "../components/common/decor";
import FavToggle from "../components/common/FavToggle";
import { useToast } from "../components/common/Toast";
import FaqAccordion from "../components/common/FaqAccordion";
import { GalleryTile } from "../components/common/Lightbox";
import { useLanguage } from "../components/common/LanguageToggle";
import ShraadhContent from "../components/common/ShraadhContent";
import { buildInquiryHref, buildInquiryMessage } from "../lib/booking";
import { useAuth } from "../lib/auth";
import { logInquiry } from "../lib/cmsAdmin";
import { ux } from "../lib/analytics";

export default function PujaDetail() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const { user } = useAuth();
  // Cache-first: render hardcoded puja instantly, then refresh from Firestore
  // in the background when the published override arrives.
  const { items: livePujas } = useLivePujas();
  const p = useMemo(
    () =>
      livePujas.find((x) => x.id === id) ||
      defaultPujas.find((x) => x.id === id) ||
      defaultPujas[0],
    [livePujas, id]
  );
  const toast = useToast();
  const title = lang === "hi" && p.titleHi ? p.titleHi : p.title;
  const desc = lang === "hi" && p.descHi ? p.descHi : p.desc;
  const isShraadh = p.id === "shraadh";
  const galleryImages = [
    { src: p.image, alt: `${title} ritual moment` },
    { src: stories[1].image, alt: "Ritual moment" },
    { src: stories[2].image, alt: "Ritual moment" },
    { src: stories[3].image, alt: "Ritual moment" },
  ];
  return (
    <>
      <section className="detail-hero-dt has-decor-dt">
        <SectionDecor />
        <div className="detail-hero-media-dt">
          <ParallaxImage src={p.image} alt={title} className="h-full w-full" strength={28} />
        </div>
        <div className="container-dt detail-hero-content-dt pb-16">
          <Reveal>
            <div className="eyebrow !text-gold-300">{p.tag}</div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl lg:text-[76px]">
              {title}
            </h1>
            {p.titleHi && lang === "en" && (
              <p className="mt-2 text-sm text-white/40">{p.titleHi}</p>
            )}
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">{desc}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/55">
              <span className="inline-flex items-center gap-2">
                <CalendarBlank size={14} /> {p.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={14} /> {p.time}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} /> {p.temple}
              </span>
              {p.code && (
                <span className="inline-flex items-center gap-2 font-mono">
                  <CheckCircle size={14} /> {p.code}
                </span>
              )}
            </div>
            <div className="mt-7 flex flex-wrap gap-3 items-center">
              <Link className="btn-gold-dt" to={`/booking/${p.id}/date`}>
                {t("detail.proceedBooking")} <ArrowRight size={15} />
              </Link>
              <a
                className="btn-ghost-dt !border-white/20 !bg-white/10 !text-white"
                href={buildInquiryHref(p, lang)}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  // Log the inquiry first — the record exists even on WhatsApp.
                  logInquiry(
                    { pujaId: p.id, pujaCode: p.code, message: buildInquiryMessage(p, lang), lang },
                    user,
                    { source: "puja-page" }
                  );
                  // Analytics: track inquiry as a UX event.
                  try {
                    ux.inquiry({ puja_id: p.id, source: "puja-page" });
                  } catch {
                    /* ignore */
                  }
                }}
              >
                {lang === "hi" ? "WhatsApp पर पूछें" : "Ask on WhatsApp"} <ArrowUpRight size={14} />
              </a>
              <FavToggle
                id={p.id}
                title={title}
                variant="photo"
                size={17}
                className="!w-11 !h-11"
              />
              <button
                className="btn-ghost-dt !border-white/20 !bg-white/10 !text-white"
                onClick={() =>
                  toast.push({
                    type: "info",
                    title: t("detail.linkCopied"),
                    desc: t("detail.linkCopiedDesc"),
                  })
                }
              >
                {t("detail.share")} <ArrowUpRight size={14} />
              </button>
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>

      {isShraadh && <ShraadhContent />}

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <DiyaCluster className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] items-start">
            <Reveal>
              <div>
                <div className="eyebrow">{t("detail.aboutPuja")}</div>
                <h2 className="display-dt mt-3 text-5xl">{t("detail.ritualJourneyTitle")}</h2>
                <p className="mt-5 max-w-2xl text-sm leading-8 muted-dt">
                  {t("detail.ritualJourneyCopy")}
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    [t("detail.duration"), t("detail.durationValue")],
                    [t("detail.temple"), p.temple],
                    [t("detail.priest"), t("detail.priestValue")],
                    [t("detail.delivery"), t("detail.deliveryValue")],
                  ].map(([a, b]) => (
                    <div className="panel-dt p-5" key={a}>
                      <div className="text-[10px] uppercase tracking-[.15em] text-gold-600">
                        {a}
                      </div>
                      <div className="mt-2 text-sm font-semibold">{b}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="panel-dt p-6 puja-booking-widget-dt">
                <div className="flex items-center gap-2 text-gold-600">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-semibold">{t("detail.bookConfidence")}</span>
                </div>
                <div className="mt-5 text-sm muted-dt">{t("detail.startingFrom")}</div>
                <div className="mt-1 display-dt text-5xl puja-price-dt">
                  ₹{p.price.toLocaleString("en-IN")}
                </div>
                <div className="mt-1 text-[11px] muted-dt">{t("detail.inclusiveOf")}</div>

                <div className="mt-5 rounded-xl border border-dt overflow-hidden puja-breakdown-dt">
                  <div className="flex items-center justify-between px-4 py-2.5 text-[11px]">
                    <span className="muted-dt">{t("detail.pujaSeva")}</span>
                    <span className="font-semibold">
                      ₹{Math.round(p.price * 0.7).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 text-[11px] border-t border-dt">
                    <span className="muted-dt">{t("detail.materials")}</span>
                    <span className="font-semibold">
                      ₹{Math.round(p.price * 0.22).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 text-[11px] border-t border-dt">
                    <span className="muted-dt">{t("detail.videoDelivery")}</span>
                    <span className="font-semibold">
                      ₹{Math.round(p.price * 0.08).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-2">
                  {[
                    t("detail.personalizedSankalp"),
                    t("detail.templePriestContext"),
                    t("detail.photoVideo"),
                  ].map((x) => (
                    <div key={x} className="flex items-center gap-2 text-xs">
                      <CheckCircle size={14} className="text-gold-600" weight="fill" />
                      {x}
                    </div>
                  ))}
                </div>
                <Link className="btn-gold-dt mt-7 w-full" to={`/booking/${p.id}/date`}>
                  {t("detail.chooseDate")} <ArrowRight size={14} />
                </Link>
                <p className="mt-3 text-center text-[10px] muted-dt">{t("detail.noCharge")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="site-section has-decor-dt surface-2-dt">
        <SectionDecor />
        <div className="container-dt">
          <SectionHeading title={t("detail.whatReceive")} copy={t("detail.whatReceiveCopy")} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [VideoCamera, t("detail.video"), t("detail.videoCopy")],
              [ShieldCheck, t("detail.sankalp"), t("detail.sankalpCopy")],
              [CalendarBlank, t("detail.updates"), t("detail.updatesCopy")],
            ].map(([Icon, a, b], i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="panel-dt p-6">
                  <Icon size={22} className="text-gold-600" />
                  <h3 className="mt-5 text-3xl">{a}</h3>
                  <p className="mt-2 text-xs leading-6 muted-dt">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <Kalash className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] items-start">
            <Reveal>
              <h2 className="display-dt text-5xl">{t("detail.vidhiSankalp")}</h2>
            </Reveal>
            <Reveal>
              <div className="grid gap-5 text-sm leading-8 muted-dt">
                <p>{t("detail.vidhiCopy1")}</p>
                <p>{t("detail.vidhiCopy2")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="site-section has-decor-dt surface-2-dt">
        <SectionDecor />
        <div className="container-dt">
          <SectionHeading title={t("detail.pastMoments")} copy={t("detail.pastMomentsCopy")} />
          <div className="grid gap-4 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <GalleryTile
                images={galleryImages}
                startIdx={0}
                className="block rounded-[20px] overflow-hidden"
              >
                <ParallaxImage
                  src={p.image}
                  alt="Ritual moment"
                  className="aspect-[16/10] rounded-[20px]"
                  strength={14}
                />
              </GalleryTile>
            </Reveal>
            <Reveal className="md:col-span-5">
              <div className="grid gap-4">
                <GalleryTile
                  images={galleryImages}
                  startIdx={1}
                  className="block rounded-[20px] overflow-hidden"
                >
                  <ParallaxImage
                    src={stories[1].image}
                    alt="Ritual moment"
                    className="aspect-[4/3] rounded-[20px]"
                    strength={12}
                  />
                </GalleryTile>
                <GalleryTile
                  images={galleryImages}
                  startIdx={2}
                  className="block rounded-[20px] overflow-hidden"
                >
                  <ParallaxImage
                    src={stories[2].image}
                    alt="Ritual moment"
                    className="aspect-[4/3] rounded-[20px]"
                    strength={12}
                  />
                </GalleryTile>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <div className="container-dt">
          <SectionHeading title={t("detail.questionsTitle")} />
          <FaqAccordion
            items={[
              { q: t("detail.faq1Q"), a: t("detail.faq1A") },
              { q: t("detail.faq2Q"), a: t("detail.faq2A") },
              { q: t("detail.faq3Q"), a: t("detail.faq3A") },
              { q: t("detail.faq4Q"), a: t("detail.faq4A") },
            ]}
          />
        </div>
      </section>
    </>
  );
}
