import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FlowerLotus, Sparkle } from "@phosphor-icons/react";
import { Reveal } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, OmSymbol, Swastika, SectionDecor } from "../components/common/decor";
import AcharyaCard from "../components/common/AcharyaCard";
import { acharyas } from "../lib/data";

const TRADITIONS = ["All", ...Array.from(new Set(acharyas.map((a) => a.tradition)))];

export default function Acharyas() {
  const [tradition, setTradition] = useState("All");
  const filtered =
    tradition === "All"
      ? acharyas
      : acharyas.filter((a) => a.tradition === tradition);

  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <SectionDecor />
        <div className="container-dt pt-24 pb-28">
          <Reveal>
            <div className="eyebrow !text-gold-300">Our Acharyas</div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl">
              The people who carry the tradition forward.
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-white/65">
              DharmaTribe is built around people who understand that ritual is not performance. It
              is knowledge, discipline, pronunciation, procedure, intention and responsibility.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              Our growing network will introduce the scholars and practitioners behind every ritual,
              with their learning, traditions and areas of expertise clearly presented.
            </p>

            <div className="acharya-hero-meta-dt">
              <div>
                <div className="ah-label-dt">Tradition</div>
                <div className="ah-value-dt">Vedic / Sanatan</div>
              </div>
              <div>
                <div className="ah-label-dt">Place of learning</div>
                <div className="ah-value-dt">Kashi &amp; beyond</div>
              </div>
              <div>
                <div className="ah-label-dt">Approach</div>
                <div className="ah-value-dt">Knowledge · Discipline · Authenticity</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="btn-gold-dt" to="/pujas">
                Explore pujas <ArrowUpRight size={14} />
              </Link>
              <a
                className="btn-ghost-dt !border-white/15 !bg-white/[.05] !text-white"
                href="#acharya-network"
              >
                Meet the network
              </a>
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>

      <section
        id="acharya-network"
        className="site-section has-decor-dt"
      >
        <SectionDecor />
        <OmSymbol className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <Reveal>
            <div className="flex items-end justify-between gap-5 flex-wrap">
              <div>
                <h2 className="display-dt text-5xl sm:text-6xl">The network</h2>
                <p className="mt-3 max-w-xl text-sm text-muted-dt">
                  {acharyas.length} scholars and practitioners across traditions, with their
                  learning, place of practice and the rituals they lead.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {TRADITIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTradition(t)}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors ${tradition === t ? "border-gold-400 bg-gold-400/10 text-gold-600 dark:text-gold-300" : "border-dt muted-dt hover:border-gold-400/50"}`}
                  >
                    {t}
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
                <h3 className="mt-5 text-2xl display-dt">Tradition</h3>
                <p className="mt-2 text-xs leading-6 muted-dt">
                  Each acharya belongs to a recognised parampara, with the recitation metres,
                  agama procedure and seva etiquette of that lineage.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="panel-dt p-6">
                <Sparkle size={22} className="text-gold-600" />
                <h3 className="mt-5 text-2xl display-dt">Discipline</h3>
                <p className="mt-2 text-xs leading-6 muted-dt">
                  Daily practice, sandhya, and the pronunciation discipline of padapatha keep the
                  ritual accurate across years of repetition.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="panel-dt p-6">
                <FlowerLotus size={22} className="text-gold-600" />
                <h3 className="mt-5 text-2xl display-dt">Authenticity</h3>
                <p className="mt-2 text-xs leading-6 muted-dt">
                  The devotee's Sankalp is carried by a person whose learning is traceable to a
                  teacher and a place, not a generic priest pool.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
