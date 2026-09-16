import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle,
  FlowerLotus,
  ShieldCheck,
  VideoCamera,
  UsersThree,
} from "@phosphor-icons/react";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionHeading from "../components/common/SectionHeading";
import { ImageMasonry } from "../components/common/Masonry";
import SectionCurve from "../components/common/SectionCurve";
import {
  LeafBranch,
  LotusLine,
  MandalaRings,
  SpinDecor,
  Trishul,
  Bell,
  Hamsa,
  Peacock,
  SectionDecor,
} from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";

const gallery = [
  "/more/rudraabishek.png",
  "/more/mahalaxmi.png",
  "/more/diya.png",
  "/more/temple.png",
  "/more/templeinside.png",
  "/more/ganesh.png",
];

export default function About() {
  const { t } = useLanguage();
  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <SectionDecor />
        <div className="container-dt grid min-h-[520px] items-end gap-10 py-20 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <div>
              <div className="eyebrow !text-gold-300">{t("about.eyebrow")}</div>
              <h1 className="display-dt mt-4 max-w-4xl text-6xl sm:text-7xl">{t("about.title")}</h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">{t("about.copy")}</p>
              <Link className="btn-gold-dt mt-7" to="/pujas">
                {t("about.explorePujas")} <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[24px]">
              <ParallaxImage
                src={gallery[0]}
                alt="Temple"
                className="h-[340px] w-full lg:h-[440px]"
                strength={25}
              />
            </div>
          </Reveal>
        </div>
        {/* single rounded bottom curve transitioning into the light page */}
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <h2 className="display-dt text-5xl sm:text-6xl">{t("about.trustTitle")}</h2>
            </Reveal>
            <Reveal>
              <div className="space-y-5 text-sm leading-8 muted-dt">
                <p>{t("about.trustCopy1")}</p>
                <p>{t("about.trustCopy2")}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <SpinDecor className="decor-dt decor-center hide-mobile" speed={0.35} reverse>
          <MandalaRings style={{ width: 420, height: 420 }} className="soft-tone" />
        </SpinDecor>
        <div className="container-dt">
          <SectionHeading title={t("about.whatVisible")} copy={t("about.whatVisibleCopy")} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [FlowerLotus, t("about.tradition"), t("about.traditionCopy")],
              [ShieldCheck, t("about.trust"), t("about.trustCopy")],
              [VideoCamera, t("about.proof"), t("about.proofCopy")],
              [UsersThree, t("about.family"), t("about.familyCopy")],
            ].map(([Icon, title, copy], i) => (
              <Reveal delay={i * 0.05} key={title}>
                <div className="panel-dt p-6">
                  <Icon size={22} className="text-gold-600" />
                  <h3 className="mt-5 text-3xl">{title}</h3>
                  <p className="mt-2 text-xs leading-6 muted-dt">{copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <Peacock className="decor-dt decor-bl hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading title={t("about.visualLanguage")} copy={t("about.visualCopy")} />
          <ImageMasonry items={gallery} />
        </div>
      </section>
      <section className="site-section ink-dt has-decor-dt">
        <SectionDecor />
        <Bell className="decor-dt decor-tr hide-mobile ink-tone" />
        <div className="container-dt grid gap-10 lg:grid-cols-[1.1fr_.9fr] items-end">
          <Reveal>
            <div>
              <div className="eyebrow !text-gold-300">{t("about.techTradition")}</div>
              <h2 className="display-dt mt-3 text-5xl">{t("about.interfaceTitle")}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
                {t("about.interfaceCopy")}
              </p>
            </div>
          </Reveal>
          <Reveal>
            <div className="border-t border-white/10 pt-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="stat-dt">
                  <div className="display-dt text-4xl text-gold-300">50+</div>
                  <div className="mt-1 text-[10px] text-white/40">{t("about.sampleTemples")}</div>
                </div>
                <div className="stat-dt">
                  <div className="display-dt text-4xl text-gold-300">200+</div>
                  <div className="mt-1 text-[10px] text-white/40">{t("about.samplePujas")}</div>
                </div>
                <div className="stat-dt">
                  <div className="display-dt text-4xl text-gold-300">4.9</div>
                  <div className="mt-1 text-[10px] text-white/40">{t("about.sampleRating")}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <Hamsa className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt text-center">
          <Reveal>
            <h2 className="display-dt text-5xl sm:text-6xl">{t("about.startNextDate")}</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 muted-dt">
              {t("about.startCopy")}
            </p>
            <Link className="btn-gold-dt mt-7" to="/pujas">
              {t("about.explorePujas")} <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
