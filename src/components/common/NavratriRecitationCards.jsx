import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { Reveal } from "./Motion";
import { RECITATIONS } from "../../lib/navratriRecitations";

const IMAGES = {
  "ashtottara-shatanama": {
    src: "/puja/navaratri/ashttottara-shatanama-stotra.jpeg",
    alt: "Flowers and diya before the 108 names recitation",
  },
  "devi-kavach": {
    src: "/puja/navaratri/devi-kavach.jpeg",
    alt: "Devi murti wrapped in marigold for Devi Kavach recitation",
  },
  "siddha-kunjika": {
    src: "/puja/navaratri/siddha-kunjika-stotra.jpeg",
    alt: "Evening aarti lamps during Siddha Kunjika recitation",
  },
  "chandi-path": {
    src: "/puja/navaratri/chandi-path.jpeg",
    alt: "Durga idol adorned for Chandi Path during Navratri",
  },
};

/* Bento spans on md (6-col grid). Hero and closing feature go full
 * width at sm and up. Exactly 10 cells for the 10 recitations. */
const SPANS = [
  "sm:col-span-2 md:col-span-6",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "sm:col-span-2 md:col-span-6",
];

function Kicker({ children }) {
  return (
    <div className="text-[9px] font-bold uppercase tracking-[.14em] text-gold-600">
      {children}
    </div>
  );
}

function Sig({ hi, children }) {
  return (
    <div className="mt-4">
      <div className="text-[9px] font-bold uppercase tracking-[.14em] text-gold-600">
        {hi ? "पारंपरिक महत्व" : "Traditional significance"}
      </div>
      <p className="mt-2 break-words text-xs leading-6 muted-dt">{children}</p>
    </div>
  );
}

export default function NavratriRecitationCards({ className = "" }) {
  const { lang } = useLanguage();
  const hi = lang === "hi";

  return (
    <div className={className}>
      <Reveal>
        <h2 className="display-dt mt-3 max-w-3xl text-[clamp(30px,4.4vw,54px)]">
          {hi ? "अपना संकल्प, देवी की उपासना" : "Find a practice for your intention"}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 muted-dt">
          {hi
            ? "हर पाठ का अपना स्वरूप और पारंपरिक महत्व है। अपने संकल्प के अनुसार वेदाचार्य के मार्गदर्शन से चुनें।"
            : "Each recitation has its own form and traditional significance. Explore the options, then let your Vedacharya guide you by your sankalpa."}
        </p>
      </Reveal>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6">
        {RECITATIONS.map((r, i) => {
          const name = hi ? r.nameHi : r.name;
          const img = IMAGES[r.id];
          const last = i === RECITATIONS.length - 1;

          if (i === 0) {
            return (
              <Reveal key={r.id} className={SPANS[i]}>
                <article className="panel-dt grid h-full min-w-0 gap-6 p-6 sm:p-8 md:grid-cols-2 md:items-center">
                  <div className="min-w-0">
                    <Kicker>{hi ? r.kickerHi : r.kicker}</Kicker>
                    <h3 className="display-dt mt-3 break-words text-4xl leading-tight sm:text-5xl">
                      {name}
                    </h3>
                    <p className="mt-4 break-words text-sm leading-7 muted-dt">
                      {hi ? r.bodyHi : r.body}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="break-words text-sm leading-7 muted-dt">
                      {hi ? r.whyHi : r.why}
                    </p>
                    <Sig hi={hi}>{hi ? r.sigHi : r.sig}</Sig>
                  </div>
                </article>
              </Reveal>
            );
          }

          if (last) {
            return (
              <Reveal key={r.id} className={SPANS[i]}>
                <article className="panel-dt grid h-full min-w-0 overflow-hidden md:grid-cols-2">
                  <div className="min-h-[220px] overflow-hidden md:min-h-[280px]">
                    <img
                      src="/puja/navaratri/why-vadacharya-perform-navaratri-pooja.jpeg"
                      alt="Vedacharya performing Navratri puja with traditional vidhi"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 p-6 sm:p-8">
                    <Kicker>{hi ? r.kickerHi : r.kicker}</Kicker>
                    <h3 className="display-dt mt-3 break-words text-3xl leading-tight sm:text-4xl">
                      {name}
                    </h3>
                    <p className="mt-4 break-words text-sm leading-7 muted-dt">
                      {hi ? r.bodyHi : r.body}
                    </p>
                    <Sig hi={hi}>{hi ? r.sigHi : r.sig}</Sig>
                    <Link className="btn-gold-dt mt-6" to="/booking/navratri/date">
                      {hi ? "नवरात्रि पूजा बुक करें" : "Book Navratri puja"}{" "}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          }

          return (
            <Reveal key={r.id} className={SPANS[i]}>
              <article className="panel-dt h-full min-w-0 overflow-hidden">
                {img && (
                  <div className="h-44 w-full overflow-hidden sm:h-52">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="min-w-0 p-5 sm:p-6">
                  <Kicker>{hi ? r.kickerHi : r.kicker}</Kicker>
                  <h3 className="display-dt mt-2 break-words text-2xl leading-snug">
                    {name}
                  </h3>
                  <p className="mt-3 break-words text-[13px] leading-7 muted-dt">
                    {hi ? r.bodyHi : r.body}
                  </p>
                  <Sig hi={hi}>{hi ? r.sigHi : r.sig}</Sig>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
