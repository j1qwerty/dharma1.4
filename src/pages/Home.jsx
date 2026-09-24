import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  CheckCircle,
  Clock,
  Heart,
  Play,
  ShieldCheck,
  VideoCamera,
  MapPin,
  UsersThree,
  Sparkle,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "../components/common/SectionHeading";
import PujaCard from "../components/common/PujaCard";
import { Reveal, ParallaxImage, Magnetic, TiltCard } from "../components/common/Motion";
import { StoryMasonry } from "../components/common/Masonry";
import {
  LeafBranch,
  MandalaRings,
  LotusLine,
  SpinDecor,
  SacredMedallion,
  DiyaCluster,
  Conch,
  Rangoli,
  Trishul,
  Bell,
  Toran,
  Kalash,
  Yantra,
  SectionDecor,
} from "../components/common/decor";
import FestivalCountdown, { getUpcomingFestivals } from "../components/common/FestivalCountdown";
import AcharyaCard from "../components/common/AcharyaCard";
import { intentions, social } from "../lib/data";
import { upcomingFestivals } from "../lib/dates";
import {
  useHomepageOverrides,
  useLivePujas,
  useLiveFestivals,
  useLiveStories,
  useLiveAcharyas,
} from "../lib/cms";
import { useLanguage } from "../components/common/LanguageToggle";

const TRUST_ITEMS = ({ t }) => [
  { icon: Sparkle, label: t("home.trustAuthentic") },
  { icon: ShieldCheck, label: t("home.trustPriests") },
  { icon: VideoCamera, label: t("home.trustVideo") },
  { icon: UsersThree, label: t("home.trustFamily") },
];

function splitTitle(title) {
  // Split after the first sentence terminator — Latin period or Hindi danda —
  // keeping the original punctuation so both languages render as two lines.
  const m = title.match(/^(.+?[।.])(?:\s+)(.+)$/s);
  if (m) return [m[1].trim(), m[2].trim()];
  const parts = title.split(/\.\s*/).filter(Boolean);
  if (parts.length >= 2) {
    return [`${parts[0]}.`, `${parts.slice(1).join(". ")}${title.trim().endsWith(".") ? "" : ""}`];
  }
  return [title, ""];
}

export default function Home() {
  const { t, lang } = useLanguage();
  // Cache-first: render hardcoded defaults instantly. Each useLive* hook then
  // fetches the published Firestore docs in the background and merges them by
  // id (Firestore wins on non-empty fields, new items appended at the end).
  const { items: livePujas } = useLivePujas();
  const { items: liveFestivals } = useLiveFestivals();
  const { items: liveStories } = useLiveStories();
  const { items: liveAcharyas } = useLiveAcharyas();
  // Festivals soonest-first: order flips automatically as dates pass.
  const orderedFestivals = useMemo(() => upcomingFestivals(liveFestivals), [liveFestivals]);
  // Homepage overrides — loaded in the background from Firestore. The site
  // renders hardcoded defaults immediately, then merges any admin overrides
  // when they arrive (no flicker for visitors).
  const { overrides } = useHomepageOverrides();
  const heroOverride = overrides?.hero || null;
  const heroSlides = [
    {
      title: heroOverride?.title || t("home.heroSlide1Title"),
      copy: heroOverride?.copy || t("home.heroSlide1Copy"),
      image: heroOverride?.image || "https://picsum.photos/seed/dharma-varanasi-sunset/2000/1250",
      date: t("home.heroDate1"),
    },
    {
      title: heroOverride?.title2 || t("home.heroSlide2Title"),
      copy: heroOverride?.copy2 || t("home.heroSlide2Copy"),
      image: heroOverride?.image2 || "https://picsum.photos/seed/dharma-temple-diya/2000/1250",
      date: t("home.heroDate2"),
    },
  ];
  const [hero, setHero] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  // Spin the hero curve medallions only while the hero is on screen —
  // stops the infinite SVG animations once scrolled past.
  const heroRef = useRef(null);
  const [heroInView, setHeroInView] = useState(true);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), {
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const heroSpin = heroInView && !reduce;
  const current = heroSlides[hero];
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setHero((v) => (v + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  function onKey(e) {
    if (e.key === "ArrowRight") setHero((v) => (v + 1) % heroSlides.length);
    else if (e.key === "ArrowLeft") setHero((v) => (v - 1 + heroSlides.length) % heroSlides.length);
  }

  const [goldLine, whiteLine] = splitTitle(current.title);
  const trustItems = TRUST_ITEMS({ t });

  return (
    <>
      <section
        ref={heroRef}
        className={`hero-redesign-dt${lang === "hi" ? " lang-hi" : ""}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onKeyDown={onKey}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured rituals"
      >
        <div className="hero-photo-dt" aria-hidden="true">
          <motion.img
            key={current.image}
            src={current.image}
            alt=""
            referrerPolicy="no-referrer"
            className={reduce ? "" : "kb-dt"}
            initial={reduce ? false : { scale: 1.08, opacity: 0.6 }}
            animate={reduce ? undefined : { scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="hero-shade-dt" />
          <div className="hero-shade-left-dt" />
        </div>

        <div className="container-dt hero-copy-wrap-dt">
          <motion.div
            key={current.title}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hero-copy-inner-dt"
          >
            <div className="eyebrow-dt hero-eyebrow-dt">{current.date}</div>
            <h1 className="display-dt hero-title-dt">
              <span className="hero-line-gold-dt">{goldLine}</span>
              {whiteLine ? <span className="hero-line-white-dt">{whiteLine}</span> : null}
            </h1>
            <p className="hero-sub-dt">{current.copy}</p>
            <div className="hero-cta-dt">
              <Magnetic>
                <Link className="btn-gold-dt hero-btn-gold-dt" to="/pujas">
                  {t("home.heroExplore")} <ArrowRight size={17} />
                </Link>
              </Magnetic>
              <Link className="hero-btn-ghost-dt" to="/about">
                <span className="hero-play-dt">
                  <Play size={14} weight="fill" />
                </span>
                {t("home.heroWatch")}
              </Link>
            </div>
            <div className="hero-dots-dt" aria-label="Slides">
              {heroSlides.map((s, i) => (
                <button
                  key={s.title}
                  aria-label={`Show ${i + 1}`}
                  aria-current={hero === i}
                  onClick={() => setHero(i)}
                  className={hero === i ? "active" : undefined}
                >
                  {hero === i && !paused && !reduce && (
                    <span className="hero-dot-fill-dt" key={hero} />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
          <div className="hero-tagline-dt" aria-label="Dharmaa Tribe tagline">
            {t("home.tagline")}
          </div>
        </div>

        {/* Bottom curve — rounded corners on side-bottom only */}
        <div className="hero-curve-dt" aria-hidden="true">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 L0,18 C170,18 260,58 360,92 C460,124 620,128 720,128 C820,128 980,124 1080,92 C1180,58 1270,18 1440,18 L1440,120 Z" />
          </svg>
          <span className="hero-curve-coin-dt coin-left-dt">
            <span className="medallion-wrap">
              {/* <SacredMedallion size={75} glow={false} rays={false} /> */}
              <SacredMedallion size={75} spin={heroSpin} spinSpeed={1.2} />
            </span>
          </span>
          <span className="hero-curve-coin-dt coin-right-dt">
            <span className="medallion-wrap delay">
              <SacredMedallion size={75} spin={heroSpin} spinSpeed={1.2} />
            </span>
          </span>
          <span className="hero-curve-drop-dt" />
        </div>

        <div className="hero-trust-dt">
          <div className="container-dt hero-trust-row-dt">
            {trustItems.map(({ icon: Icon, label }) => (
              <span key={label} className="hero-trust-item-dt">
                <Icon size={22} weight="duotone" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="assurance-dt has-decor-dt">
        <SectionDecor />
        <LeafBranch className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt assurance-grid-dt">
          {[
            [CalendarBlank, t("home.assurance1Title"), t("home.assurance1Sub")],
            [VideoCamera, t("home.assurance2Title"), t("home.assurance2Sub")],
            [ShieldCheck, t("home.assurance3Title"), t("home.assurance3Sub")],
            [UsersThree, t("home.assurance4Title"), t("home.assurance4Sub")],
          ].map(([Icon, title, sub], i) => (
            <div className="assurance-item-dt" key={title}>
              <span className="assurance-index-dt">0{i + 1}</span>
              <span className="assurance-icon-dt">
                <Icon size={19} />
              </span>
              <div className="assurance-copy-dt">
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Festival countdown — live, dynamic feature band */}
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <DiyaCluster className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-center">
            <Reveal>
              <div className="eyebrow eyebrow-line-dt">{t("home.onHorizon")}</div>
              <h2 className="display-dt mt-3 text-5xl sm:text-6xl">{t("home.nextFestival")}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-dt">{t("home.planAhead")}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="btn-gold-dt" to="/pujas">
                  {t("home.bookBefore")} <ArrowRight size={15} />
                </Link>
                <Link className="btn-ghost-dt" to="/stories">
                  {t("home.readFestivalGuides")} <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="grid gap-5">
                {getUpcomingFestivals(new Date(), 2, liveFestivals).map((f, i) =>
                  i === 0 ? (
                    <FestivalCountdown key={f.name} festival={f} />
                  ) : (
                    <FestivalCountdown
                      key={f.name}
                      festival={f}
                      variant="crimson"
                      eyebrow="Also approaching"
                    />
                  )
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Acharyas preview — above the dates section, full-width 3-card grid */}
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LeafBranch className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="flex items-end justify-between gap-5 flex-wrap section-head-dt">
            <Reveal className="section-head-copy-dt">
              <h2 className="display-dt text-5xl sm:text-6xl title-soft">
                {t("home.peopleTradition")}
              </h2>
              <p>{t("home.peopleTraditionCopy")}</p>
            </Reveal>
            <Link className="btn-ghost-dt shrink-0" to="/acharyas">
              {t("home.meetAllAcharyas")} <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="mt-12 acharya-grid-dt">
            {liveAcharyas.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.05}>
                <AcharyaCard a={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title={t("home.datesBooking")}
            copy={t("home.datesCopy")}
            action={{ label: t("home.viewAllPujas"), to: "/pujas" }}
            soft
          />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 puja-grid-dt">
            {livePujas.slice(0, 6).map((p, i) => (
              <div key={p.id}>
                <PujaCard p={p} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Single restrained marquee: festival names drifting across the ink band */}
      <section className="ink-dt py-6 overflow-hidden">
        <div className="marquee-mask-dt">
          <div className="marquee-dt display-dt text-3xl text-white/40">
            {Array.from({ length: 2 }).map((_, k) => (
              <span key={k} className="flex items-center gap-16">
                {orderedFestivals.map((f) => {
                  const fName = lang === "hi" && f.nameHi ? f.nameHi : f.name;
                  return (
                    <span key={f.name + k} className="flex items-center gap-16">
                      <span className="text-gold-300/70">{fName}</span>
                      <span className="text-white/25">·</span>
                      <span className="text-white/30">{f.date}</span>
                      <Sparkle size={14} className="text-gold-400/40" />
                    </span>
                  );
                })}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section ink-dt has-decor-dt">
        <SectionDecor />
        <Trishul className="decor-dt decor-br hide-mobile ink-tone" />
        <div className="container-dt">
          <SectionHeading
            title={t("home.calendarKeepsMoving")}
            copy={t("home.calendarCopy")}
            action={{ label: t("home.exploreCatalogue"), to: "/pujas" }}
          />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {orderedFestivals.map((f, i) => {
              const fName = lang === "hi" && f.nameHi ? f.nameHi : f.name;
              const fNote = lang === "hi" && f.noteHi ? f.noteHi : f.note;
              return (
                <Reveal key={f.name} delay={i * 0.05}>
                  <TiltCard max={7}>
                    <Link
                      className="relative block h-[220px] sm:h-[320px] overflow-hidden rounded-[20px] bg-black"
                      to="/pujas"
                    >
                      <ParallaxImage
                        src={f.image}
                        className="absolute inset-0 h-full w-full"
                        strength={16}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5">
                        <div className="text-[10px] font-bold uppercase tracking-[.16em] text-gold-300">
                          {f.date}
                        </div>
                        <h3 className="title-soft mt-1 text-xl sm:text-3xl text-white">{fName}</h3>
                        <p className="mt-1 text-xs text-white/55">{fNote}</p>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LeafBranch className="decor-dt decor-bl hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="intent-grid-dt">
            <Reveal>
              <div className="eyebrow eyebrow-line-dt">{t("home.startWithIntention")}</div>
              <h2 className="display-dt mt-3 text-5xl sm:text-6xl">{t("home.whatMark")}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-dt">
                {t("home.browsePurpose")}
              </p>
              <Link className="btn-ghost-dt mt-7" to="/pujas">
                {t("home.findPuja")} <ArrowUpRight size={14} />
              </Link>
            </Reveal>
            <div className="intent-list-dt">
              {intentions.map((x, i) => (
                <Reveal key={x} delay={i * 0.035}>
                  <Link className="intent-item-dt" to="/pujas">
                    {x}
                    <ArrowRight size={16} />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <SpinDecor className="decor-dt decor-center hide-mobile" speed={0.4}>
          <MandalaRings style={{ width: 280, height: 280 }} className="soft-tone" />
        </SpinDecor>
        <div className="container-dt">
          <SectionHeading title={t("home.ritualJourney")} copy={t("home.ritualJourneyCopy")} />
          <div className="steps-dt">
            <Reveal>
              <div className="steps-visual-dt">
                <ParallaxImage src={current.image} className="h-full w-full" strength={28} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-[10px] uppercase tracking-[.18em] text-gold-300">
                    {t("home.yourBooking")}
                  </div>
                  <div className="mt-2 text-4xl display-dt">{t("home.chooseSubmitReceive")}</div>
                </div>
              </div>
            </Reveal>
            <div className="step-list-dt">
              {[
                ["01", t("home.step1Title"), t("home.step1Copy")],
                ["02", t("home.step2Title"), t("home.step2Copy")],
                ["03", t("home.step3Title"), t("home.step3Copy")],
                ["04", t("home.step4Title"), t("home.step4Copy")],
              ].map((x) => (
                <Reveal key={x[0]}>
                  <div className="step-item-dt">
                    <span className="step-num-dt">{x[0]}</span>
                    <div>
                      <h3 className="text-3xl">{x[1]}</h3>
                      <p className="mt-1 text-xs leading-6 text-muted-dt">{x[2]}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt ink-dt trust-band-dt">
        <SectionDecor />
        <div className="container-dt trust-band-inner-dt">
          <Reveal>
            <div>
              <div className="eyebrow !text-gold-300">{t("home.clearerTrust")}</div>
              <h2 className="display-dt mt-3 text-5xl sm:text-6xl">{t("home.seeMatters")}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
                {t("home.seeMattersCopy")}
              </p>
              <div className="stat-row-dt">
                <div className="stat-dt">
                  <div className="text-3xl display-dt text-gold-300">50+</div>
                  <div className="mt-1 text-[10px] text-white/45">{t("home.sampleTemples")}</div>
                </div>
                <div className="stat-dt">
                  <div className="text-3xl display-dt text-gold-300">200+</div>
                  <div className="mt-1 text-[10px] text-white/45">{t("home.pujaExperiences")}</div>
                </div>
                <div className="stat-dt">
                  <div className="text-3xl display-dt text-gold-300">4.9</div>
                  <div className="mt-1 text-[10px] text-white/45">{t("home.sampleRating")}</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-[22px] border border-white/10 bg-white/[.04] p-7">
              <div className="flex items-center gap-2 text-gold-300">
                <Sparkle size={17} />
                <span className="text-xs font-semibold">{t("home.devoteeNote")}</span>
              </div>
              <blockquote className="mt-6 display-dt text-3xl leading-tight">
                {t("home.devoteeQuote")}
              </blockquote>
              <div className="mt-5 text-xs text-white/45">
                {lang === "hi" ? "प्रिया शर्मा · बेंगलुरु" : "Priya Sharma · Bengaluru"}
              </div>
              <div className="mt-5 flex gap-1 text-gold-300">
                {Array.from({ length: 5 }, (_, i) => (
                  <Heart key={i} weight="fill" size={14} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <Conch className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title={t("home.storiesTitle")}
            copy={t("home.storiesCopy")}
            action={{ label: t("home.readAllStories"), to: "/stories" }}
          />
          <StoryMasonry
            items={liveStories.slice(0, 6)}
            render={(s) => {
              const sTitle = lang === "hi" && s.titleHi ? s.titleHi : s.title;
              const sExcerpt = lang === "hi" && s.excerptHi ? s.excerptHi : s.excerpt;
              return (
                <Link className="story-card-dt" to={`/stories/${s.id}`}>
                  <div className="story-media-dt">
                    <ParallaxImage
                      src={s.image}
                      alt={sTitle}
                      className="h-full min-h-[210px]"
                      strength={12}
                    />
                  </div>
                  <div className="story-copy-dt">
                    <div className="cat">{s.category}</div>
                    <h3>{sTitle}</h3>
                    <p>{sExcerpt}</p>
                    <div className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold text-gold-600">
                      {t("home.readStory")} <ArrowUpRight size={13} />
                    </div>
                  </div>
                </Link>
              );
            }}
          />
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading title={t("home.widerFeed")} copy={t("home.widerFeedCopy")} soft />
          <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-12">
            {social.map((x, i) => (
              <Reveal
                key={x.label}
                delay={i * 0.05}
                className={i === 0 ? "col-span-2 md:col-span-7" : "md:col-span-5"}
              >
                <a
                  href="#"
                  className="relative block min-h-[210px] md:min-h-[290px] overflow-hidden rounded-[20px] bg-black"
                >
                  <ParallaxImage
                    src={x.image}
                    className="absolute inset-0 h-full w-full"
                    strength={12}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 text-white">
                    <div className="text-[10px] uppercase tracking-[.17em] text-gold-300">
                      {x.label} · {x.type}
                    </div>
                    <div className="mt-2 text-2xl md:text-3xl display-dt">{x.copy}</div>
                    <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold text-gold-300">
                      {t("home.openChannel")} <ArrowUpRight size={13} />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <Kalash className="decor-dt decor-bl hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] items-end">
            <Reveal>
              <div className="eyebrow eyebrow-line-dt">{t("home.yearLong")}</div>
              <h2 className="display-dt mt-3 text-5xl sm:text-6xl">
                {t("home.keepIntentionGoing")}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-dt">
                {t("home.keepIntentionCopy")}
              </p>
              <Link className="btn-ghost-dt mt-7" to="/about">
                {t("home.seeRoadmap")} <ArrowUpRight size={14} />
              </Link>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                lang === "hi" ? "मासिक संकल्प" : "Monthly Sankalp",
                lang === "hi" ? "तिथि सेवा" : "Tithi Seva",
                lang === "hi" ? "दैनिक आरती प्रायोजन" : "Daily Aarti sponsorship",
                lang === "hi" ? "वार्षिक पाठ / जाप" : "Annual Path / Jaap",
              ].map((x, i) => (
                <Reveal key={x} delay={i * 0.06}>
                  <div className="panel-dt p-6">
                    <div className="text-3xl display-dt">{x}</div>
                    <p className="mt-2 text-xs leading-6 text-muted-dt">
                      {lang === "hi"
                        ? "भविष्य की आवर्ती सेवा सतह के रूप में डिज़ाइन किया गया।"
                        : "Designed as a future recurring-service surface."}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <LotusLine className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading title={t("home.templeNetwork")} copy={t("home.templeNetworkCopy")} soft />
          <div className="grid grid-cols-2 gap-4 md:gap-5 md:grid-cols-3">
            {[
              [
                lang === "hi" ? "वाराणसी" : "Varanasi",
                "Kashi Vishwanath",
                "/temples/kashivishwanath.webp",
                lang === "hi"
                  ? "मंदिर संदर्भ, उपलब्ध पूजा और आगामी क्षण।"
                  : "Temple context, available pujas and upcoming moments.",
              ],
              [
                lang === "hi" ? "अयोध्या" : "Ayodhya",
                "Ram Janmabhoomi Seva",
                "/temples/ram janambhoomi.jpg",
                lang === "hi"
                  ? "अनुष्ठानों और भक्ति सामग्री के लिए स्थान-आधारित मार्ग।"
                  : "A place-led route into rituals and devotional content.",
              ],
              [
                "Somnath",
                "Somnath Temple",
                "/temples/somnath.jpg",
                lang === "hi"
                  ? "भविष्य का मंदिर विवरण मार्ग, सेवा और कथा सामग्री के साथ।"
                  : "A future temple detail route with seva and story content.",
              ],
            ].map(([place, name, img, note], i) => (
              <Reveal
                key={name}
                delay={i * 0.05}
                className={i === 0 ? "col-span-2 md:col-span-1" : ""}
              >
                <TiltCard max={6}>
                  <div className="temple-card-dt">
                    <ParallaxImage src={img} className="h-44 md:h-72" strength={14} />
                    <div className="p-5 text-white">
                      <div className="text-[10px] text-gold-300">{place}</div>
                      <h3 className="mt-2 text-2xl md:text-3xl display-dt">{name}</h3>
                      <p className="mt-2 text-xs text-white/50">{note}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <Bell className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-end border-t border-dt pt-14">
            <Reveal>
              <div className="eyebrow eyebrow-line-dt">{t("home.stayConnected")}</div>
              <h2 className="display-dt title-soft mt-3 text-5xl sm:text-6xl">
                {t("home.knowComingNext")}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-dt">{t("home.stayCopy")}</p>
            </Reveal>
            <Reveal>
              <div className="flex overflow-hidden rounded-full border border-dt surface-dt">
                <input
                  aria-label="Email"
                  className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-sm outline-none"
                  placeholder="your@email.com"
                />
                <button className="btn-gold-dt m-1">{t("home.join")}</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
