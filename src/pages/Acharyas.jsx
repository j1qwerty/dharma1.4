import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FlowerLotus, Sparkle } from "@phosphor-icons/react";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import {
  LeafBranch,
  LotusLine,
  OmSymbol,
  Swastika,
  SectionDecor,
} from "../components/common/decor";
import AcharyaCard from "../components/common/AcharyaCard";
import { useLiveAcharyas } from "../lib/cms";
import { useLanguage } from "../components/common/LanguageToggle";

export default function Acharyas() {
  const { t, lang } = useLanguage();
  const [tradition, setTradition] = useState("All");
  // Cache-first: render hardcoded acharyas instantly, then merge Firestore
  // published overrides + new items in the background.
  const { items: acharyas } = useLiveAcharyas();
  // Use English tradition label as the canonical key so filter works across langs.
  const traditions = useMemo(
    () => ["All", ...Array.from(new Set(acharyas.map((a) => a.tradition)))],
    [acharyas]
  );
  const filtered =
    tradition === "All" ? acharyas : acharyas.filter((a) => a.tradition === tradition);

  // For bilingual chips show the Hindi version of the tradition label when active.
  const chipLabel = (trad) => {
    if (trad === "All") return t("common.all");
    if (lang === "hi") {
      const found = acharyas.find((a) => a.tradition === trad);
      return found?.traditionHi || trad;
    }
    return trad;
  };

  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <SectionDecor />
        <div className="container-dt grid min-h-[520px] items-end gap-10 py-20 pt-24 pb-28 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <div className="eyebrow !text-gold-300">{t("ach.eyebrow")}</div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl">{t("ach.title")}</h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-white/65">{t("ach.copy1")}</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">{t("ach.copy2")}</p>

            <div className="acharya-hero-meta-dt">
              <div>
                <div className="ah-label-dt">{t("ach.tradition")}</div>
                <div className="ah-value-dt">
                  {lang === "hi"
                    ? "अंक ज्योतिष · वैदिक ज्योतिष · ग्राफोलॉजी"
                    : "Numerology · Vedic · Graphology"}
                </div>
              </div>
              <div>
                <div className="ah-label-dt">{t("ach.placeLearning")}</div>
                <div className="ah-value-dt">
                  {lang === "hi" ? "दिल्ली · दिल्ली-एनसीआर" : "Delhi · Delhi-NCR"}
                </div>
              </div>
              <div>
                <div className="ah-label-dt">{t("ach.approach")}</div>
                <div className="ah-value-dt">
                  {lang === "hi"
                    ? "ज्ञान · अनुशासन · प्रामाणिकता"
                    : "Knowledge · Discipline · Authenticity"}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-gold-dt" to="/pujas">
                {t("nav.bookPuja")} <ArrowUpRight size={14} />
              </Link>
              <a
                className="btn-ghost-dt !border-white/15 !bg-white/[.05] !text-white"
                href="#acharya-network"
              >
                {t("ach.meetNetwork")}
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[24px]">
              <ParallaxImage
                src="https://picsum.photos/seed/dharma-acharyas/1000/800"
                alt="Acharyas"
                className="h-[340px] w-full lg:h-[440px]"
                strength={25}
              />
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>

      <section id="acharya-network" className="site-section has-decor-dt">
        <SectionDecor />
        <OmSymbol className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <Reveal>
            <div className="flex items-end justify-between gap-5 flex-wrap">
              <div>
                <h2 className="display-dt text-5xl sm:text-6xl">{t("ach.network")}</h2>
                <p className="mt-3 max-w-xl text-sm text-muted-dt">
                  {acharyas.length} {t("ach.networkCopy")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {traditions.map((tr) => (
                  <button
                    key={tr}
                    onClick={() => setTradition(tr)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors ${tradition === tr ? "border-gold-400 bg-gold-400/10 text-gold-600 dark:text-gold-300" : "border-dt muted-dt hover:border-gold-400/50"}`}
                  >
                    {chipLabel(tr)}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-12 acharya-grid-dt">
            {filtered.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.04}>
                <AcharyaCard a={a} />
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3 has-decor-dt">
            <Swastika className="decor-dt decor-br hide-mobile soft-tone" />
            <Reveal>
              <div className="panel-dt p-6">
                <FlowerLotus size={22} className="text-gold-600" />
                <h3 className="mt-5 text-2xl display-dt">{t("ach.traditionCard")}</h3>
                <p className="mt-2 text-xs leading-6 muted-dt">{t("ach.traditionCardCopy")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="panel-dt p-6">
                <Sparkle size={22} className="text-gold-600" />
                <h3 className="mt-5 text-2xl display-dt">{t("ach.discipline")}</h3>
                <p className="mt-2 text-xs leading-6 muted-dt">{t("ach.disciplineCopy")}</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="panel-dt p-6">
                <FlowerLotus size={22} className="text-gold-600" />
                <h3 className="mt-5 text-2xl display-dt">{t("ach.authenticity")}</h3>
                <p className="mt-2 text-xs leading-6 muted-dt">{t("ach.authenticityCopy")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
