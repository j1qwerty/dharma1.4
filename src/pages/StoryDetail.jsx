import React, { useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ShareNetwork } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { stories as defaultStories } from "../lib/data";
import { useLiveStories } from "../lib/cms";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, Peacock, Conch, SectionDecor } from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";
export default function StoryDetail() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  // Cache-first: render hardcoded story instantly, then refresh from Firestore
  // in the background when the published override arrives.
  const { items: liveStories } = useLiveStories();
  const s = useMemo(
    () =>
      liveStories.find((x) => x.id === id) ||
      defaultStories.find((x) => x.id === id) ||
      defaultStories[0],
    [liveStories, id]
  );
  const articleRef = useRef(null);
  const reduce = useReducedMotion();
  const title = lang === "hi" && s.titleHi ? s.titleHi : s.title;
  const excerpt = lang === "hi" && s.excerptHi ? s.excerptHi : s.excerpt;
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
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
              <span>{lang === "hi" ? "कथाएँ और अंतर्दृष्टि" : "Stories & Insights"}</span>
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt" ref={articleRef}>
        <SectionDecor />
        <Peacock className="decor-dt decor-tr hide-mobile soft-tone" />
        <Conch className="decor-dt decor-bl hide-mobile soft-tone" />
        <div className="container-dt grid gap-12 lg:grid-cols-[1fr_270px]">
          <main className="max-w-3xl">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-600"
            >
              <ArrowLeft size={14} /> {lang === "hi" ? "कथाओं पर वापस" : "Back to stories"}
            </Link>
            <Reveal>
              <p className="mt-9 display-dt text-3xl leading-tight">{excerpt}</p>
              <div className="mt-10 space-y-6 text-sm leading-8 text-muted-dt">
                <p>
                  {lang === "hi"
                    ? "जब क्रम दिखने लगे, तब अनुष्ठान समझना आसान हो जाता है। एक भक्त अवसर चुनता है, तिथि और मुहूर्त जाँचता है, संकल्प जोड़ता है, और जानता है कि बाद में क्या डिलीवर होगा।"
                    : "The ritual is easier to understand when the sequence is visible. A devotee chooses an occasion, checks the date and muhurat, adds a Sankalp, and knows what will be delivered afterwards."}
                </p>
                <p>
                  {lang === "hi"
                    ? "यह कथा पृष्ठ जानबूझकर संपादकीय है। लेख तस्वीरें, वीडियो, तथ्य, संबंधित पूजा और मंदिर या त्यौहार सामग्री के लिंक ले सकता है, बिना एक लंबी दीवार बने।"
                    : "This story page is intentionally editorial. The article can carry images, video, facts, related pujas and links into temple or festival content without becoming a wall of text."}
                </p>
                <p>
                  {lang === "hi"
                    ? "प्रोटोटाइप के लिए, नीचे की सामग्री एक यथार्थवादी लेख बॉडी की तरह काम करती है ताकि लेआउट को अलग-अलग लंबाई और मीडिया ब्लॉक के साथ परीक्षण किया जा सके।"
                    : "For the prototype, the content below acts as a realistic article body so the layout can be tested with different lengths and media blocks."}
                </p>
              </div>
            </Reveal>
            <div className="mt-12 rounded-[22px] overflow-hidden">
              <ParallaxImage
                src={stories[(stories.indexOf(s) + 2) % stories.length].image}
                alt="Related ritual"
                className="aspect-[16/9]"
                strength={16}
              />
            </div>
            <Reveal>
              <div className="mt-10 space-y-6 text-sm leading-8 text-muted-dt">
                <p>
                  {lang === "hi"
                    ? "अंतिम टुकड़ा वापसी मूल्य है। एक बार पूजा पूरी होने पर, बुकिंग गायब नहीं होनी चाहिए। तस्वीरें, वीडियो अपडेट और मूल संकल्प भक्त की अभिलेखागार का हिस्सा बन जाते हैं।"
                    : "The final piece is return value. Once a puja is complete, the booking should not disappear. Photos, video updates and the original Sankalp become part of the devotee's archive."}
                </p>
                <p>
                  {lang === "hi"
                    ? "यही विचार कथाओं को बुकिंग से जोड़ता है। एक उपयोगी लेख संबंधित पूजा तक ले जा सकता है, बिना हर पैराग्राफ़ को बिक्री संदेश बनाए।"
                    : "That same idea is what connects stories back to bookings. A useful article can lead to a relevant puja without turning every paragraph into a sales message."}
                </p>
              </div>
            </Reveal>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link className="btn-gold-dt" to="/pujas">
                {lang === "hi" ? "संबंधित पूजा देखें" : "Explore related pujas"}{" "}
                <ArrowUpRight size={14} />
              </Link>
              <button className="btn-ghost-dt">
                <ShareNetwork size={14} /> {lang === "hi" ? "कथा साझा करें" : "Share story"}
              </button>
            </div>
          </main>
          <aside className="lg:pt-10">
            <div className="panel-dt p-6 sticky top-24">
              <div className="eyebrow">{lang === "hi" ? "संबंधित पठन" : "Related reading"}</div>
              <div className="mt-5 grid gap-1">
                {stories
                  .filter((x) => x.id !== s.id)
                  .slice(0, 4)
                  .map((x) => {
                    const xTitle = lang === "hi" && x.titleHi ? x.titleHi : x.title;
                    return (
                      <Link
                        key={x.id}
                        to={`/stories/${x.id}`}
                        className="border-t border-dt py-4 text-sm font-semibold"
                      >
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
