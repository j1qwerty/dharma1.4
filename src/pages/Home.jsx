import React, { useEffect, useState } from "react";
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
} from "../components/common/Decor";
import FestivalCountdown from "../components/common/FestivalCountdown";
import AcharyaCard from "../components/common/AcharyaCard";
import { pujas, festivals, intentions, stories, social, acharyas } from "../lib/data";

const TRUST_ITEMS = [
  { icon: Sparkle, label: "Authentic Rituals" },
  { icon: ShieldCheck, label: "Trusted Priests" },
  { icon: VideoCamera, label: "Live Video" },
  { icon: UsersThree, label: "Family Sankalp" },
];

function splitTitle(title) {
  const parts = title.split(/\.\s*/).filter(Boolean);
  if (parts.length >= 2) {
    return [`${parts[0]}.`, `${parts.slice(1).join(". ")}${title.trim().endsWith(".") ? "" : ""}`];
  }
  return [title, ""];
}

const heroSlides = [
  {
    title: "Sacred rituals. Modern access.",
    copy: "Book a traditional puja, add your Sankalp, and receive the ceremony after it is performed.",
    image: "https://picsum.photos/seed/dharma-varanasi-sunset/2000/1250",
    date: "Ganesh Chaturthi · September 12",
  },
  {
    title: "Let devotion travel with you.",
    copy: "Festival-specific and evergreen pujas with a clear date, package, temple, and delivery journey.",
    image: "https://picsum.photos/seed/dharma-temple-diya/2000/1250",
    date: "Diwali · October 20",
  },
];

export default function Home() {
  const [hero, setHero] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const current = heroSlides[hero];
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setHero((v) => (v + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, [paused]);

  function onKey(e) {
    if (e.key === "ArrowRight") setHero((v) => (v + 1) % heroSlides.length);
    else if (e.key === "ArrowLeft")
      setHero((v) => (v - 1 + heroSlides.length) % heroSlides.length);
  }

  const [goldLine, whiteLine] = splitTitle(current.title);
  return (
    <>
      <section
        className="hero-redesign-dt"
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
              {whiteLine ? (
                <span className="hero-line-white-dt">{whiteLine}</span>
              ) : null}
            </h1>
            <p className="hero-sub-dt">{current.copy}</p>
            <div className="hero-cta-dt">
              <Magnetic>
                <Link className="btn-gold-dt hero-btn-gold-dt" to="/pujas">
                  Explore Pujas <ArrowRight size={17} />
                </Link>
              </Magnetic>
              <Link className="hero-btn-ghost-dt" to="/about">
                <span className="hero-play-dt">
                  <Play size={14} weight="fill" />
                </span>
                Watch Video
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
        </div>

        {/* Bottom curve — rounded corners on side-bottom only */}
        <div className="hero-curve-dt" aria-hidden="true">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,120 L0,18 C170,18 260,58 360,92 C460,124 620,128 720,128 C820,128 980,124 1080,92 C1180,58 1270,18 1440,18 L1440,120 Z" />
          </svg>
          <span className="hero-curve-coin-dt coin-left-dt">
            <span className="medallion-wrap">
              <SacredMedallion size={74} />
            </span>
          </span>
          <span className="hero-curve-coin-dt coin-right-dt">
            <span className="medallion-wrap delay">
              <SacredMedallion size={74} />
            </span>
          </span>
          <span className="hero-curve-drop-dt" />
        </div>

        <div className="hero-trust-dt">
          <div className="container-dt hero-trust-row-dt">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <span key={label} className="hero-trust-item-dt">
                <Icon size={22} weight="duotone" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="assurance-dt has-decor-dt">
        <LeafBranch className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt assurance-grid-dt">
          {[
            [CalendarBlank, "Dates and muhurat", "Choose before checkout"],
            [VideoCamera, "Photos and video", "Access after the ritual"],
            [ShieldCheck, "Clear booking", "Sankalp and package details"],
            [UsersThree, "Family participation", "Add people to your Sankalp"],
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
        <DiyaCluster className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-center">
            <Reveal>
              <div className="eyebrow eyebrow-line-dt">On the horizon</div>
              <h2 className="display-dt mt-3 text-5xl sm:text-6xl">
                The next festival is closer than you think.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-dt">
                Plan ahead so the muhurat, the Sankalp and the package are all settled before the
                day arrives. The countdown keeps the calendar present without noise.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="btn-gold-dt" to="/pujas">
                  Book before the window <ArrowRight size={15} />
                </Link>
                <Link className="btn-ghost-dt" to="/stories">
                  Read festival guides <ArrowUpRight size={14} />
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <FestivalCountdown />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title="The dates people are booking"
            copy="A fast look at the next rituals, with festival-specific dates alongside year-round services."
            action={{ label: "View all pujas", to: "/pujas" }}
            soft
          />
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 puja-grid-dt">
            {pujas.slice(0, 6).map((p, i) => (
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
                {festivals.map((f) => (
                  <span key={f.name + k} className="flex items-center gap-16">
                    <span className="text-gold-300/70">{f.name}</span>
                    <span className="text-white/25">·</span>
                    <span className="text-white/30">{f.date}</span>
                    <Sparkle size={14} className="text-gold-400/40" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section ink-dt has-decor-dt">
        <Trishul className="decor-dt decor-br hide-mobile ink-tone" />
        <div className="container-dt">
          <SectionHeading
            title="The calendar keeps moving"
            copy="The shell stays consistent while festival, seasonal, evergreen and date-specific content changes."
            action={{ label: "Explore the catalogue", to: "/pujas" }}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {festivals.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.05}>
                <TiltCard max={7}>
                <Link
                  className="relative block h-[320px] overflow-hidden rounded-[20px] bg-black"
                  to="/pujas"
                >
                  <ParallaxImage
                    src={f.image}
                    className="absolute inset-0 h-full w-full"
                    strength={16}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-[10px] font-bold uppercase tracking-[.16em] text-gold-300">
                      {f.date}
                    </div>
                    <h3 className="title-soft mt-1 text-3xl text-white">{f.name}</h3>
                    <p className="mt-1 text-xs text-white/55">{f.note}</p>
                  </div>
                </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <LeafBranch className="decor-dt decor-bl hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="intent-grid-dt">
            <Reveal>
              <div className="eyebrow eyebrow-line-dt">Start with the intention</div>
              <h2 className="display-dt mt-3 text-5xl sm:text-6xl">What are you here to mark?</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-dt">
                Browse by purpose when you know what you want to focus on, even before you know the
                exact ritual.
              </p>
              <Link className="btn-ghost-dt mt-7" to="/pujas">
                Find a puja <ArrowUpRight size={14} />
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
        <SpinDecor className="decor-dt decor-center hide-mobile" speed={0.4}>
          <MandalaRings style={{ width: 280, height: 280 }} className="soft-tone" />
        </SpinDecor>
        <div className="container-dt">
          <SectionHeading
            title="A ritual journey with no hidden steps"
            copy="Each stage has a place in the interface, from the first date selection to the final video update."
          />
          <div className="steps-dt">
            <Reveal>
              <div className="steps-visual-dt">
                <ParallaxImage src={current.image} className="h-full w-full" strength={28} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="text-[10px] uppercase tracking-[.18em] text-gold-300">
                    Your booking
                  </div>
                  <div className="mt-2 text-4xl display-dt">Choose. Submit. Receive.</div>
                </div>
              </div>
            </Reveal>
            <div className="step-list-dt">
              {[
                ["01", "Choose a date", "See the day, muhurat and available slots."],
                ["02", "Select a package", "Compare family, couple and individual options."],
                ["03", "Add your Sankalp", "Enter the devotee details the priest needs."],
                ["04", "Track the ritual", "Follow preparation, performance and delivery."],
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

      <section className="site-section ink-dt trust-band-dt">
        <div className="container-dt trust-band-inner-dt">
          <Reveal>
            <div>
              <div className="eyebrow !text-gold-300">A clearer kind of trust</div>
              <h2 className="display-dt mt-3 text-5xl sm:text-6xl">
                See what matters before and after the puja.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
                Temple, priest, date, package, Sankalp and video are treated as part of one
                journey, not separate pieces.
              </p>
              <div className="stat-row-dt">
                <div className="stat-dt">
                  <div className="text-3xl display-dt text-gold-300">50+</div>
                  <div className="mt-1 text-[10px] text-white/45">sample temple partners</div>
                </div>
                <div className="stat-dt">
                  <div className="text-3xl display-dt text-gold-300">200+</div>
                  <div className="mt-1 text-[10px] text-white/45">puja experiences</div>
                </div>
                <div className="stat-dt">
                  <div className="text-3xl display-dt text-gold-300">4.9</div>
                  <div className="mt-1 text-[10px] text-white/45">sample rating</div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="rounded-[22px] border border-white/10 bg-white/[.04] p-7">
              <div className="flex items-center gap-2 text-gold-300">
                <Sparkle size={17} />
                <span className="text-xs font-semibold">A devotee note</span>
              </div>
              <blockquote className="mt-6 display-dt text-3xl leading-tight">
                “The important part was knowing what would happen next.”
              </blockquote>
              <div className="mt-5 text-xs text-white/45">Priya Sharma · Bengaluru</div>
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
        <Conch className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title="Stories, in the shape of a real journal"
            copy="Festival guides, ritual explainers, temple histories and devotee experiences. Uneven by design, easier to scan."
            action={{ label: "Read all stories", to: "/stories" }}
          />
          <StoryMasonry
            items={stories.slice(0, 6)}
            render={(s) => (
              <Link className="story-card-dt" to={`/stories/${s.id}`}>
                <div className="story-media-dt">
                  <ParallaxImage
                    src={s.image}
                    alt={s.title}
                    className="h-full min-h-[210px]"
                    strength={12}
                  />
                </div>
                <div className="story-copy-dt">
                  <div className="cat">{s.category}</div>
                  <h3>{s.title}</h3>
                  <p>{s.excerpt}</p>
                  <div className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold text-gold-600">
                    Read story <ArrowUpRight size={13} />
                  </div>
                </div>
              </Link>
            )}
          />
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title="The wider DharmaTribe feed"
            copy="Use the social layer for rituals in motion, temple moments and festival content."
            soft
          />
          <div className="grid gap-4 md:grid-cols-12">
            {social.map((x, i) => (
              <Reveal
                key={x.label}
                delay={i * 0.05}
                className={i === 0 ? "md:col-span-7" : "md:col-span-5"}
              >
                <a
                  href="#"
                  className="relative block min-h-[290px] overflow-hidden rounded-[20px] bg-black"
                >
                  <ParallaxImage
                    src={x.image}
                    className="absolute inset-0 h-full w-full"
                    strength={12}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="text-[10px] uppercase tracking-[.17em] text-gold-300">
                      {x.label} · {x.type}
                    </div>
                    <div className="mt-2 text-3xl display-dt">{x.copy}</div>
                    <div className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold text-gold-300">
                      Open channel <ArrowUpRight size={13} />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <Kalash className="decor-dt decor-bl hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] items-end">
            <Reveal>
              <div className="eyebrow eyebrow-line-dt">Year-long and recurring</div>
              <h2 className="display-dt mt-3 text-5xl sm:text-6xl">Keep one intention going.</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-dt">
                The Phase 3 subscription surfaces are not part of this launch, but the homepage
                already makes room for monthly Sankalp, tithi seva and annual paths.
              </p>
              <Link className="btn-ghost-dt mt-7" to="/about">
                See the roadmap intent <ArrowUpRight size={14} />
              </Link>
            </Reveal>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Monthly Sankalp",
                "Tithi Seva",
                "Daily Aarti sponsorship",
                "Annual Path / Jaap",
              ].map((x, i) => (
                <Reveal key={x} delay={i * 0.06}>
                  <div className="panel-dt p-6">
                    <div className="text-3xl display-dt">{x}</div>
                    <p className="mt-2 text-xs leading-6 text-muted-dt">
                      Designed as a future recurring-service surface.
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <LotusLine className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title="A temple network, presented with context"
            copy="The homepage should eventually point to temple stories, locations, rituals and related pujas without changing the core visual structure."
            soft
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                "Varanasi",
                "Kashi Vishwanath",
                "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1000&q=86",
                "Temple context, available pujas and upcoming moments.",
              ],
              [
                "Ayodhya",
                "Ram Janmabhoomi Seva",
                "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1000&q=86",
                "A place-led route into rituals and devotional content.",
              ],
              [
                "Somnath",
                "Somnath Temple",
                "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1000&q=86",
                "A future temple detail route with seva and story content.",
              ],
            ].map(([place, name, img, note], i) => (
              <Reveal key={name} delay={i * 0.05}>
                <TiltCard max={6}>
                <div className="temple-card-dt">
                  <ParallaxImage src={img} className="h-72" strength={14} />
                  <div className="p-5 text-white">
                    <div className="text-[10px] text-gold-300">{place}</div>
                    <h3 className="mt-2 text-3xl display-dt">{name}</h3>
                    <p className="mt-2 text-xs text-white/50">{note}</p>
                  </div>
                </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Acharyas preview — dynamic slider */}
      <section className="site-section has-decor-dt">
        <LeafBranch className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="flex items-end justify-between gap-5 flex-wrap section-head-dt">
            <Reveal className="section-head-copy-dt">
              <h2 className="display-dt text-5xl sm:text-6xl title-soft">
                The people who carry the tradition.
              </h2>
              <p>
                Scholars and practitioners behind every ritual, with their learning, traditions and
                areas of expertise clearly presented.
              </p>
            </Reveal>
            <Link className="btn-ghost-dt shrink-0" to="/acharyas">
              Meet all acharyas <ArrowUpRight size={14} />
            </Link>
          </div>
          <Reveal>
            <div className="acharya-slider-dt mt-8">
              {acharyas.map((a) => (
                <div key={a.id} className="acharya-slide-dt">
                  <AcharyaCard a={a} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <Bell className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-end border-t border-dt pt-14">
            <Reveal>
              <div className="eyebrow eyebrow-line-dt">Stay connected</div>
              <h2 className="display-dt title-soft mt-3 text-5xl sm:text-6xl">
                Know what is coming next.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-dt">
                Festival reminders, new puja windows and useful stories, without filling the inbox.
              </p>
            </Reveal>
            <Reveal>
              <div className="flex overflow-hidden rounded-full border border-dt surface-dt">
                <input
                  aria-label="Email"
                  className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-sm outline-none"
                  placeholder="your@email.com"
                />
                <button className="btn-gold-dt m-1">Join</button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
