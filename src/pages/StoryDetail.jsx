import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ShareNetwork } from "@phosphor-icons/react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { stories } from "../lib/data";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, Peacock, Conch } from "../components/common/Decor";
export default function StoryDetail() {
  const { id } = useParams();
  const s = stories.find((x) => x.id === id) || stories[0];
  const articleRef = useRef(null);
  const reduce = useReducedMotion();
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
        <div className="detail-hero-media-dt">
          <ParallaxImage src={s.image} alt={s.title} className="h-full w-full" strength={24} />
        </div>
        <div className="container-dt detail-hero-content-dt">
          <Reveal>
            <div className="eyebrow !text-gold-300">{s.category}</div>
            <h1 className="display-dt mt-3 max-w-5xl text-6xl sm:text-7xl">{s.title}</h1>
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/55">
              <span>{s.date}</span>
              <span>{s.read}</span>
              <span>Stories & Insights</span>
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt" ref={articleRef}>
        <Peacock className="decor-dt decor-tr hide-mobile soft-tone" />
        <Conch className="decor-dt decor-bl hide-mobile soft-tone" />
        <div className="container-dt grid gap-12 lg:grid-cols-[1fr_270px]">
          <main className="max-w-3xl">
            <Link
              to="/stories"
              className="inline-flex items-center gap-2 text-xs font-bold text-gold-600"
            >
              <ArrowLeft size={14} /> Back to stories
            </Link>
            <Reveal>
              <p className="mt-9 display-dt text-3xl leading-tight">{s.excerpt}</p>
              <div className="mt-10 space-y-6 text-sm leading-8 text-muted-dt">
                <p>
                  The ritual is easier to understand when the sequence is visible. A devotee chooses
                  an occasion, checks the date and muhurat, adds a Sankalp, and knows what will be
                  delivered afterwards.
                </p>
                <p>
                  This story page is intentionally editorial. The article can carry images, video,
                  facts, related pujas and links into temple or festival content without becoming a
                  wall of text.
                </p>
                <p>
                  For the prototype, the content below acts as a realistic article body so the
                  layout can be tested with different lengths and media blocks.
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
                  The final piece is return value. Once a puja is complete, the booking should not
                  disappear. Photos, video updates and the original Sankalp become part of
                  the devotee's archive.
                </p>
                <p>
                  That same idea is what connects stories back to bookings. A useful article can
                  lead to a relevant puja without turning every paragraph into a sales message.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link className="btn-gold-dt" to="/pujas">
                Explore related pujas <ArrowUpRight size={14} />
              </Link>
              <button className="btn-ghost-dt">
                <ShareNetwork size={14} /> Share story
              </button>
            </div>
          </main>
          <aside className="lg:pt-10">
            <div className="panel-dt p-6 sticky top-24">
              <div className="eyebrow">Related reading</div>
              <div className="mt-5 grid gap-1">
                {stories
                  .filter((x) => x.id !== s.id)
                  .slice(0, 4)
                  .map((x) => (
                    <Link
                      key={x.id}
                      to={`/stories/${x.id}`}
                      className="border-t border-dt py-4 text-sm font-semibold"
                    >
                      {x.title}
                    </Link>
                  ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
