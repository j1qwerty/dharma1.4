import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { Reveal, ParallaxImage } from "./Motion";
import { SectionDecor } from "./decor";
import { pujas as defaultPujas } from "../lib/data";
import { useLivePujas } from "../lib/cms";
import { buildInquiryHref } from "../lib/booking";
import { SHRAADH_TYPES, SHRAADH_COMPARE, SHRAADH_GUIDANCE } from "../lib/shraadhTypes";

/* ------------------------------------------------------------------ *
 * ShraadhTypes — the four Shraadh observances (umbrella: Shraadh).
 * - ShraadhTypeCards: pretty cards with image + short (details page,
 *   catalog band). Book goes to the booking flow; Details jumps to the
 *   full section below on /pujas/shraadh.
 * - ShraadhTypeDetails: full per-type sections (alternating media/text).
 * - ShraadhCompare: "which Shraadh is right for you" table + guidance.
 * ------------------------------------------------------------------ */

function typeName(t, hi) {
  return hi ? t.nameHi : t.name;
}

export function ShraadhTypeCards({ compact = false }) {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  return (
    <div className={`grid gap-5 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2"}`}>
      {SHRAADH_TYPES.map((t, i) => (
        <Reveal key={t.id} delay={i * 0.05}>
          <div className="card-dt h-full flex flex-col">
            <div className="media-dt aspect-[4/3]">
              <ParallaxImage src={t.image} alt={typeName(t, hi)} className="h-full w-full" strength={10} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[.14em] text-gold-300 backdrop-blur">
                {hi ? `विधि 0${i + 1}` : `Rite 0${i + 1}`}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="display-dt text-3xl">{typeName(t, hi)}</h3>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <p className="text-xs leading-6 text-muted-dt">{hi ? t.shortHi : t.short}</p>
              <p className="mt-3 text-[11px] font-semibold leading-5 text-gold-600">
                {hi ? t.positioningHi : t.positioning}
              </p>
              <div className="flex flex-wrap gap-2 pt-4 mt-auto">
                <Link className="btn-gold-dt !py-2.5 !px-4 !text-[11px]" to="/booking/shraadh/date">
                  {hi ? "बुक करें" : "Book"} <ArrowRight size={13} />
                </Link>
                <Link className="btn-ghost-dt !py-2.5 !px-4 !text-[11px]" to={`/pujas/shraadh#${t.id}`}>
                  {hi ? "विवरण" : "Details"} <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ShraadhTypeDetails() {
  return (
    <div className="grid gap-14 mt-4">
      {SHRAADH_TYPES.map((t, i) => (
        <Reveal key={t.id}>
          <article id={t.id} className="grid gap-8 lg:grid-cols-2 items-start scroll-mt-28">
            <div className={i % 2 ? "lg:order-2" : ""}>
              <div className="overflow-hidden rounded-[22px] panel-dt">
                <ParallaxImage src={t.image} alt={t.name} className="aspect-[4/3] w-full" strength={14} />
              </div>
              <div className="mt-4 rounded-[16px] border border-dt surface-2-dt p-5">
                <div className="text-[10px] font-bold uppercase tracking-[.16em] text-gold-600">
                  Dharmaa positioning
                </div>
                <p className="mt-2 text-sm font-semibold leading-6">{t.positioning}</p>
              </div>
            </div>
            <div className={i % 2 ? "lg:order-1" : ""}>
              <div className="eyebrow eyebrow-line-dt">0{i + 1} · Shraadh</div>
              <h3 className="display-dt mt-3 text-4xl sm:text-5xl">{t.name}</h3>
              <div className="mt-4 grid gap-3 text-sm leading-7 muted-dt">
                {t.what.map((p, k) => (
                  <p key={k}>{p}</p>
                ))}
              </div>
              <h4 className="mt-6 text-[11px] font-bold uppercase tracking-[.15em] text-gold-600">
                Significance
              </h4>
              <p className="mt-2 text-sm leading-7 muted-dt">{t.significance}</p>
              <h4 className="mt-6 text-[11px] font-bold uppercase tracking-[.15em] text-gold-600">
                Purpose
              </h4>
              {t.purposeIntro && <p className="mt-2 text-sm muted-dt">{t.purposeIntro}</p>}
              <ul className="mt-2 grid gap-2">
                {t.purpose.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm leading-6">
                    <CheckCircle size={15} weight="fill" className="mt-1 flex-none text-gold-600" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <h4 className="mt-6 text-[11px] font-bold uppercase tracking-[.15em] text-gold-600">
                {t.whoTitle}
              </h4>
              <p className="mt-2 text-sm muted-dt">{t.whoIntro}</p>
              <ul className="mt-2 grid gap-2">
                {t.who.map((x) => (
                  <li key={x} className="flex items-start gap-2 text-sm leading-6">
                    <CheckCircle size={15} weight="fill" className="mt-1 flex-none text-gold-600" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              {t.whoClose && <p className="mt-2 text-sm leading-7 muted-dt">{t.whoClose}</p>}
              {t.principle && (
                <div className="mt-5 rounded-[16px] border border-gold-400/30 bg-gold-400/5 p-5">
                  <div className="text-[10px] font-bold uppercase tracking-[.16em] text-gold-600">
                    {t.principleTitle}
                  </div>
                  <p className="mt-2 text-sm leading-7">{t.principle}</p>
                </div>
              )}
              <p className="mt-5 border-l-2 border-gold-400/50 pl-4 text-sm italic leading-7 muted-dt">
                {t.understanding}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link className="btn-gold-dt" to="/booking/shraadh/date">
                  Book {t.name} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function ShraadhCompare() {
  const { items: pujas } = useLivePujas();
  const { lang } = useLanguage();
  const shraadhPuja = pujas.find((x) => x.id === "shraadh") || defaultPujas[0];
  const askHref = buildInquiryHref(shraadhPuja, lang);
  const hi = lang === "hi";
  return (
    <div className="mt-16">
      <Reveal>
        <div className="eyebrow eyebrow-line-dt">{hi ? "मार्गदर्शन" : "Guidance"}</div>
        <h3 className="display-dt mt-3 text-4xl sm:text-5xl">{SHRAADH_GUIDANCE.title}</h3>
        <p className="mt-4 max-w-2xl text-sm leading-7 muted-dt">{SHRAADH_GUIDANCE.body}</p>
      </Reveal>
      <div className="mt-8 grid gap-3">
        {SHRAADH_COMPARE.map((row, i) => {
          const t = SHRAADH_TYPES.find((x) => x.id === row.typeId);
          return (
            <Reveal key={row.typeId} delay={i * 0.04}>
              <Link
                to={`/pujas/shraadh#${row.typeId}`}
                className="panel-dt p-5 flex items-center gap-4 hover:border-gold-400/50 transition-colors"
              >
                <span className="grid h-11 w-11 flex-none place-items-center overflow-hidden rounded-xl">
                  <img src={t.image} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] muted-dt">{row.need}</span>
                  <span className="mt-0.5 block text-base font-semibold display-dt">{row.ritual}</span>
                </span>
                <ArrowUpRight size={16} className="flex-none text-gold-600" />
              </Link>
            </Reveal>
          );
        })}
      </div>
      <Reveal>
        <div className="mt-8 rounded-[22px] border border-dt surface-dt p-7 text-center">
          <p className="mx-auto max-w-xl text-sm font-semibold leading-7">{SHRAADH_GUIDANCE.close}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a href={askHref} target="_blank" rel="noreferrer" className="btn-gold-dt">
              {hi ? "आचार्य से बात करें" : "Speak to an Acharya"} <ArrowUpRight size={14} />
            </a>
            <Link className="btn-ghost-dt" to="/booking/shraadh/date">
              {hi ? "पूजा बुक करें" : "Book your Shraadh"} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/** Full block for /pujas/shraadh: cards, details, compare + guidance. */
export default function ShraadhTypes() {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  return (
    <section className="site-section has-decor-dt">
      <SectionDecor />
      <div className="container-dt">
        <Reveal>
          <div className="eyebrow eyebrow-line-dt">{hi ? "चार विधियाँ" : "Four observances"}</div>
          <h2 className="display-dt mt-3 text-5xl sm:text-6xl">
            {hi ? "कौन-सा श्राद्ध आपके लिए है?" : "Shradh is four sacred paths."}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 muted-dt">
            {hi
              ? "श्राद्ध एक ही नाम के चार अलग अनुष्ठान हैं — अपनी परंपरा और आवश्यकता के अनुसार चुनें।"
              : "Shradh is one umbrella over four distinct rites. Choose the one that fits your family tradition and need — each is performed by an experienced Acharya with your Sankalp."}
          </p>
        </Reveal>
        <div className="mt-10">
          <ShraadhTypeCards />
        </div>
        <div className="mt-20">
          <ShraadhTypeDetails />
        </div>
        <ShraadhCompare />
      </div>
    </section>
  );
}
