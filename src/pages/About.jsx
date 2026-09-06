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
import { LeafBranch, LotusLine, MandalaRings, SpinDecor, Trishul, Bell, Hamsa, Peacock } from "../components/common/Decor";

const gallery = [
  "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=84",
  "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=84",
  "https://images.unsplash.com/photo-1603561596112-0a132b5a965a?auto=format&fit=crop&w=800&q=84",
  "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=800&q=84",
  "https://images.unsplash.com/photo-1567591414240-e6c5a9e0a0c4?auto=format&fit=crop&w=800&q=84",
];

export default function About() {
  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <div className="container-dt grid min-h-[520px] items-end gap-10 py-20 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <div>
              <div className="eyebrow !text-gold-300">About DharmaTribe</div>
              <h1 className="display-dt mt-4 max-w-4xl text-6xl sm:text-7xl">
                Ancient rituals, clearer access.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
                A digital layer between a devotee at home and a ritual being performed at a sacred
                place.
              </p>
              <Link className="btn-gold-dt mt-7" to="/pujas">
                Explore pujas <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[24px]">
              <ParallaxImage src={gallery[0]} alt="Temple" className="h-[340px]" strength={25} />
            </div>
          </Reveal>
        </div>
        {/* single rounded bottom curve transitioning into the light page */}
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt">
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <h2 className="display-dt text-5xl sm:text-6xl">The product starts with trust.</h2>
            </Reveal>
            <Reveal>
              <div className="space-y-5 text-sm leading-8 muted-dt">
                <p>
                  The experience should feel closer to a trusted introduction than a generic
                  checkout. That is why dates, muhurat, temple, package, Sankalp and delivery are
                  kept visible.
                </p>
                <p>
                  The same page system also has to survive an entire year of content changes.
                  Festival campaigns can replace evergreen shelves, then settle back without
                  redesigning the product.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="site-section surface-2-dt has-decor-dt">
        <SpinDecor className="decor-dt decor-center hide-mobile" speed={0.35} reverse>
          <MandalaRings style={{ width: 420, height: 420 }} className="soft-tone" />
        </SpinDecor>
        <div className="container-dt">
          <SectionHeading
            title="What we keep visible"
            copy="The platform is designed around the parts of a booking that create confidence."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              [FlowerLotus, "Tradition", "Keep ritual context in the interface."],
              [ShieldCheck, "Trust", "Show who, when and where."],
              [VideoCamera, "Proof", "Make post-puja delivery obvious."],
              [UsersThree, "Family", "Support shared Sankalp details."],
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
        <Peacock className="decor-dt decor-bl hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title="The visual language"
            copy="Cream and charcoal keep the page calm. Gold marks action, ritual, and emphasis. Photography does the rest."
          />
          <ImageMasonry items={gallery} />
        </div>
      </section>
      <section className="site-section ink-dt has-decor-dt">
        <Bell className="decor-dt decor-tr hide-mobile ink-tone" />
        <div className="container-dt grid gap-10 lg:grid-cols-[1.1fr_.9fr] items-end">
          <Reveal>
            <div className="eyebrow !text-gold-300">Technology + tradition</div>
            <h2 className="display-dt mt-3 text-5xl">
              The interface should disappear when the ritual starts.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
              Everything before the ceremony should reduce uncertainty. Everything after it should
              help the devotee return to the memory.
            </p>
          </Reveal>
          <Reveal>
            <div className="border-t border-white/10 pt-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="stat-dt">
                  <div className="display-dt text-4xl text-gold-300">50+</div>
                  <div className="mt-1 text-[10px] text-white/40">sample temples</div>
                </div>
                <div className="stat-dt">
                  <div className="display-dt text-4xl text-gold-300">200+</div>
                  <div className="mt-1 text-[10px] text-white/40">sample pujas</div>
                </div>
                <div className="stat-dt">
                  <div className="display-dt text-4xl text-gold-300">4.9</div>
                  <div className="mt-1 text-[10px] text-white/40">sample rating</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="site-section has-decor-dt">
        <Hamsa className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt text-center">
          <Reveal>
            <h2 className="display-dt text-5xl sm:text-6xl">Start with the next sacred date.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 muted-dt">
              Explore current pujas or return to the booking flow from your account.
            </p>
            <Link className="btn-gold-dt mt-7" to="/pujas">
              Explore pujas <ArrowUpRight size={14} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
