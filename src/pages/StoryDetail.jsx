import React, { useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, ShareNetwork, CheckCircle } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { stories as defaultStories, pujas as defaultPujas } from "../lib/data";
import { useLiveStories, useLivePujas } from "../lib/cms";
import { getStoryBody } from "../lib/storyContent";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import FaqAccordion from "../components/common/FaqAccordion";
import { LeafBranch, Conch, SectionDecor } from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";

export default function StoryDetail() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const hi = lang === "hi";
  const { items: liveStories } = useLiveStories();
  const { items: livePujas } = useLivePujas();
  const s = useMemo(
    () =>
      liveStories.find((x) => x.id === id) ||
      defaultStories.find((x) => x.id === id) ||
      defaultStories[0],
    [liveStories, id]
  );
  const body = useMemo(() => getStoryBody(s.id, lang), [s.id, lang]);
  const relatedPuja = useMemo(() => {
    if (!body?.relatedPuja) return null;
    return livePujas.find((p) => p.id === body.relatedPuja) || defaultPujas.find((p) => p.id === body.relatedPuja) || null;
  }, [body, livePujas]);
  const articleRef = useRef(null);
  const reduce = useReducedMotion();
  const title = hi && s.titleHi ? s.titleHi : s.title;
  const excerpt = hi && s.excerptHi ? s.excerptHi : s.excerpt;
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    document.title = `${title} | Dharmaa Tribe`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", excerpt);
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) {
      kw = document.createElement("meta");
      kw.setAttribute("name", "keywords");
      document.head.appendChild(kw);
    }
    kw.setAttribute("content", (body?.keywords || [s.category]).join(", "));
    const ldId = "story-ld-json";
    let ld = document.getElementById(ldId);
    if (!ld) {
      ld = document.createElement("script");
      ld.id = ldId;
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description: excerpt,
      image: s.image,
      datePublished: s.date,
      author: { "@type": "Organization", name: "Dharmaa Tribe" },
      keywords: (body?.keywords || []).join(", "),
    });
  }, [title, excerpt, body, s]);

  return (
    <>
      {!reduce && (
        <motion.div
          className="reading-progress-dt"
          style={{ scaleX, width: "100%" }}
          aria-hidden="true"
        />
      )}
      <section className="detail-hero-dt has-decor-dt">
        <SectionDecor />
        <div className="detail-hero-media-dt">
          <ParallaxImage src={s.image} alt={title} className="h-full w-full" strength={24} />
        </div>
        <div className="container-dt detail-hero-content-dt">
          <Reveal>
            <div className="eyebrow !text-gold-300">{s.category}</div>
            <h1 className="display-dt mt-3 max-w-5xl text-6xl sm:text-7xl">{title}</h1>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/55">
              <span>{s.date}</span>
              <span>{s.read}</span>
              <span>{hi ? "कथाएँ और अंतर्दृष्टि" : "Stories and Insights"}</span>
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>

      <section className="site-section has-decor-dt" ref={articleRef}>
        <SectionDecor />
        <Conch className="decor-dt decor-bl hide-mobile soft-tone" />
        <LeafBranch className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt grid gap-12 lg:grid-cols-[1fr_270px]">
          <main className="max-w-3xl">
            <Link to="/stories" className="inline-flex items-center gap-2 text-xs font-bold text-gold-600">
              <ArrowLeft size={14} /> {hi ? "कथाओं पर वापस" : "Back to stories"}
            </Link>
            <Reveal>
              <p className="mt-9 display-dt text-3xl leading-tight">{body?.intro || excerpt}</p>
            </Reveal>

            {body?.sections.map((sec, i) => (
              <div key={sec.h || i} className="mt-12">
                <Reveal>
                  <h2 className="display-dt text-4xl sm:text-5xl">{sec.h}</h2>
                </Reveal>
                <div className={`mt-5 grid gap-6 ${sec.img && i % 2 === 1 ? "md:grid-cols-[.9fr_1.1fr] items-center" : ""}`}>
                  <Reveal>
                    <div className="space-y-5 text-sm leading-8 text-muted-dt">
                      {(sec.ps || []).map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}
                    </div>
                  </Reveal>
                  {sec.img && (
                    <Reveal delay={0.06}>
                      <div className="overflow-hidden rounded-[20px]">
                        <ParallaxImage src={sec.img} alt={sec.alt || sec.h} className="aspect-[16/10] w-full" strength={14} />
                      </div>
                    </Reveal>
                  )}
                </div>
                {sec.list && (
                  <Reveal>
                    <div className="panel-dt mt-6 grid gap-2 p-6 sm:grid-cols-2">
                      {sec.list.map((x) => (
                        <div key={x} className="flex items-center gap-2 text-xs font-semibold">
                          <CheckCircle size={15} className="flex-none text-gold-600" weight="fill" /> {x}
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )}
                {sec.quote && (
                  <Reveal>
                    <blockquote className="display-dt mt-6 border-l-2 border-gold-400 pl-6 text-2xl leading-snug sm:text-3xl">
                      {sec.quote}
                    </blockquote>
                  </Reveal>
                )}
              </div>
            ))}

            {body?.faq && body.faq.length > 0 && (
              <div className="mt-14">
                <Reveal>
                  <h2 className="display-dt text-4xl">{hi ? "सामान्य प्रश्न" : "Questions readers ask"}</h2>
                </Reveal>
                <div className="mt-5">
                  <FaqAccordion items={body.faq.map(([q, a]) => ({ q, a }))} />
                </div>
              </div>
            )}

            {relatedPuja && (
              <Reveal>
                <div className="panel-dt mt-12 flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
                  <div className="h-28 w-full flex-none overflow-hidden rounded-[16px] sm:w-40">
                    <img src={relatedPuja.image} alt="" className="h-full w-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-[.15em] text-gold-600">
                      {hi ? "संबंधित पूजा" : "Related puja"}
                    </div>
                    <div className="display-dt mt-1 text-2xl">
                      {hi && relatedPuja.titleHi ? relatedPuja.titleHi : relatedPuja.title}
                    </div>
                  </div>
                  <Link className="btn-gold-dt flex-none" to={`/pujas/${relatedPuja.id}`}>
                    {hi ? "पूजा देखें" : "View puja"} <ArrowRight size={14} />
                  </Link>
                </div>
              </Reveal>
            )}

            {(body?.keywords?.length > 0) && (
              <p className="mt-8 text-[11px] leading-6 muted-dt">Keywords: {body.keywords.join(", ")}</p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-gold-dt" to="/pujas">
                {hi ? "संबंधित पूजा देखें" : "Explore related pujas"} <ArrowUpRight size={14} />
              </Link>
              <button className="btn-ghost-dt">
                <ShareNetwork size={14} /> {hi ? "कथा साझा करें" : "Share story"}
              </button>
            </div>
          </main>

          <aside className="lg:pt-10">
            <div className="panel-dt p-6 sticky top-24">
              <div className="eyebrow">{hi ? "संबंधित पठन" : "Related reading"}</div>
              <div className="mt-5 grid gap-1">
                {defaultStories
                  .filter((x) => x.id !== s.id)
                  .slice(0, 4)
                  .map((x) => {
                    const xTitle = hi && x.titleHi ? x.titleHi : x.title;
                    return (
                      <Link key={x.id} to={`/stories/${x.id}`} className="border-t border-dt py-4 text-sm font-semibold">
                        {xTitle}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
