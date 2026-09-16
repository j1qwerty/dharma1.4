import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, PaintBrush, Sparkle, ArrowLeft } from "@phosphor-icons/react";
import {
  LeafBranch,
  LotusLine,
  MandalaRings,
  TempleArch,
  DiyaLamp,
  Kalash,
  DiyaCluster,
  Swastika,
  OmSymbol,
  Trishul,
  Conch,
  Rangoli,
  SacredTree,
  Hamsa,
  Bell,
  Yantra,
  Toran,
  Peacock,
  SacredMedallion,
  SpinDecor,
  DrawDecor,
  BackToTopHalo,
  SectionDecor,
} from "../components/common/decor";

const ITEMS = [
  {
    name: "LeafBranch",
    Comp: LeafBranch,
    desc: "Peepal / bodhi branch — pair of mirrored leaves with vein accents.",
    code: "<LeafBranch />",
    extra: { flip: false },
  },
  {
    name: "LeafBranch (flipped)",
    Comp: LeafBranch,
    desc: "Mirrored variant for symmetrical section corners.",
    code: "<LeafBranch flip />",
    props: { flip: true },
  },
  {
    name: "LotusLine",
    Comp: LotusLine,
    desc: "Stem-rising lotus with water line — hero & section accent.",
    code: "<LotusLine />",
  },
  {
    name: "MandalaRings",
    Comp: MandalaRings,
    desc: "Concentric rings + 16-ray + 8-petal lotus — the core motif.",
    code: "<MandalaRings />",
  },
  {
    name: "TempleArch",
    Comp: TempleArch,
    desc: "South-Indian gopuram arch with tiered roof lines.",
    code: "<TempleArch />",
  },
  {
    name: "DiyaLamp",
    Comp: DiyaLamp,
    desc: "Hanging oil lamp with flame, bowl & stand.",
    code: "<DiyaLamp />",
  },
  {
    name: "Kalash",
    Comp: Kalash,
    desc: "Sacred pot with coconut, mango leaves & base.",
    code: "<Kalash />",
  },
  {
    name: "DiyaCluster",
    Comp: DiyaCluster,
    desc: "Ring of 7 diya flames around a centre — Diwali pattern.",
    code: "<DiyaCluster />",
  },
  {
    name: "Swastika",
    Comp: Swastika,
    desc: "Auspicious right-facing swastika — stroke line-art.",
    code: "<Swastika />",
  },
  {
    name: "OmSymbol",
    Comp: OmSymbol,
    desc: "Sacred Om (Aum) with chandra + bindu.",
    code: "<OmSymbol />",
  },
  {
    name: "Trishul",
    Comp: Trishul,
    desc: "Shiva's three-pronged trident with shaft bands.",
    code: "<Trishul />",
  },
  { name: "Conch", Comp: Conch, desc: "Shankh sacred shell with spiral rings.", code: "<Conch />" },
  {
    name: "Rangoli",
    Comp: Rangoli,
    desc: "Symmetrical festival floor mandala — 8 + 8 petals.",
    code: "<Rangoli />",
  },
  {
    name: "SacredTree",
    Comp: SacredTree,
    desc: "Kalpavriksha wish-fulfilling tree with canopy fruits.",
    code: "<SacredTree />",
  },
  {
    name: "Hamsa",
    Comp: Hamsa,
    desc: "Sacred swan — vehicle of Saraswati, with water line.",
    code: "<Hamsa />",
  },
  {
    name: "Bell",
    Comp: Bell,
    desc: "Ghanta ritual bell with crown, rim & clapper.",
    code: "<Bell />",
  },
  {
    name: "Yantra",
    Comp: Yantra,
    desc: "Sri-yantra inspired geometric diagram — interlocking triangles.",
    code: "<Yantra />",
  },
  {
    name: "Toran",
    Comp: Toran,
    desc: "Mango-leaf door garland with catenary string.",
    code: "<Toran />",
  },
  {
    name: "Peacock",
    Comp: Peacock,
    desc: "Fanned-tail peacock — Karthikeya / Krishna motif.",
    code: "<Peacock />",
  },
];

function CopyBtn({ text }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1200);
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-dt px-2.5 py-1 text-[10px] font-bold tracking-wide hover:bg-white/60 dark:hover:bg-white/10 transition"
      aria-label="Copy code"
    >
      {done ? <Check size={12} weight="bold" /> : <Copy size={12} />}
      {done ? "Copied" : "Copy"}
    </button>
  );
}

function PreviewCard({ name, Comp, desc, code, props = {} }) {
  const isMedallion = name.includes("Medallion");
  return (
    <div className="group relative overflow-hidden rounded-[20px] border border-dt bg-[var(--surface)] p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-bold tracking-[.14em] uppercase text-gold-600 flex items-center gap-1.5">
            <Sparkle size={10} weight="fill" /> {name}
          </div>
          <div className="mt-1 text-[12px] leading-5 text-[var(--muted)] max-w-[22ch]">{desc}</div>
        </div>
        <CopyBtn text={code} />
      </div>

      {/* stage */}
      <div className="mt-4 grid place-items-center rounded-[16px] border border-dt bg-[var(--surface-2)]/60 p-6 min-h-[170px] relative overflow-hidden">
        {/* subtle grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative text-ink-900 dark:text-ivory-100">
          {isMedallion ? (
            <Comp size={88} {...props} />
          ) : (
            <Comp className="w-[112px] h-[112px] sm:w-[128px] sm:h-[128px]" {...props} />
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <code className="flex-1 truncate rounded-full bg-ink-950 text-gold-200 px-3 py-1.5 text-[10px] font-mono">
          {code}
        </code>
      </div>
    </div>
  );
}

export default function DecorPreview() {
  const [tone, setTone] = useState("gold"); // gold | ink | ivory
  const toneMap = {
    gold: "text-[#b37e09] dark:text-[#f0c958]",
    ink: "text-ink-900 dark:text-ivory-100",
    ivory: "text-ink-900/60 dark:text-white/70",
  };

  return (
    <>
      {/* hero */}
      <section className="ink-dt relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden>
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 30%, #f8cf5b 0, transparent 50%), radial-gradient(circle at 80% 70%, #fff 0, transparent 40%)",
            }}
          />
        </div>
        <div className="container-dt relative py-10 sm:py-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[.12em] uppercase text-white/60 hover:text-white transition"
          >
            <ArrowLeft size={12} /> Back to home
          </Link>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="eyebrow !text-gold-300 flex items-center gap-2">
                <PaintBrush size={14} weight="duotone" /> Decor library — preview only
              </div>
              <h1 className="display-dt mt-3 text-5xl sm:text-6xl text-white leading-[0.9]">
                Every sacred
                <br />
                <span className="text-gold-300">motif, in one place.</span>
              </h1>
              <p className="mt-4 max-w-xl text-[13px] leading-6 text-white/60">
                All stroke motifs from <code className="text-gold-200">Decor.jsx</code> rendered
                live. Use this page to pick the right ornament for a section, card or divider. Copy
                the JSX and drop it in.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-white/10 text-white/80 px-3 py-1.5 border border-white/10">
                  Stroke-only · currentColor
                </span>
                <span className="rounded-full bg-white/10 text-white/80 px-3 py-1.5 border border-white/10">
                  aria-hidden decorative
                </span>
                <span className="rounded-full bg-gold-400 text-ink-950 px-3 py-1.5 font-bold">
                  {ITEMS.length} motifs + SacredMedallion
                </span>
              </div>
            </div>

            {/* live medallion cluster */}
            <div className="hidden lg:flex items-center gap-4">
              <SacredMedallion size={92} />
              <SacredMedallion size={72} />
              <SacredMedallion size={56} />
            </div>
          </div>

          {/* tone switcher */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold tracking-[.14em] uppercase text-white/50">
              Preview tone
            </span>
            {[
              ["Gold", "gold"],
              ["Ink", "ink"],
              ["Muted", "ivory"],
            ].map(([label, val]) => (
              <button
                key={val}
                onClick={() => setTone(val)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold border transition ${
                  tone === val
                    ? "bg-gold-400 text-ink-950 border-gold-400"
                    : "bg-white/10 text-white border-white/15 hover:bg-white/15"
                }`}
              >
                {label}
              </button>
            ))}
            <span className="text-[11px] text-white/40">
              controls stroke color for the grid below
            </span>
          </div>
        </div>
      </section>

      {/* medallion spotlight */}
      <section className="site-section has-decor-dt relative">
        <div className="container-dt">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 className="display-dt text-3xl sm:text-4xl">SacredMedallion — the coin</h2>
            <span className="text-[11px] tracking-[.12em] uppercase font-bold text-[var(--muted)]">
              Gold layered disc · glow + rays · rope rim
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[20px] border border-dt bg-[var(--surface)] p-6 flex flex-col items-center text-center">
              <div className={toneMap[tone]}>
                <SacredMedallion size={140} />
              </div>
              <div className="mt-4 text-sm font-bold">Default — 140px</div>
              <code className="mt-2 text-[10px] font-mono bg-ink-950 text-gold-200 px-3 py-1 rounded-full">
                {"<SacredMedallion size={140} />"}
              </code>
              <CopyBtn text="<SacredMedallion size={140} />" />
            </div>
            <div className="rounded-[20px] border border-dt bg-[var(--surface)] p-6 flex flex-col items-center text-center">
              <div className={toneMap[tone]}>
                <SacredMedallion size={96} glow={false} />
              </div>
              <div className="mt-4 text-sm font-bold">No glow</div>
              <code className="mt-2 text-[10px] font-mono bg-ink-950 text-gold-200 px-3 py-1 rounded-full">
                {"<SacredMedallion size={96} glow={false} />"}
              </code>
              <CopyBtn text="<SacredMedallion size={96} glow={false} />" />
            </div>
            <div className="rounded-[20px] border border-dt bg-[var(--surface)] p-6 flex flex-col items-center text-center">
              <div className={toneMap[tone]}>
                <SacredMedallion size={96} rays={false} />
              </div>
              <div className="mt-4 text-sm font-bold">No rays</div>
              <code className="mt-2 text-[10px] font-mono bg-ink-950 text-gold-200 px-3 py-1 rounded-full">
                {"<SacredMedallion size={96} rays={false} />"}
              </code>
              <CopyBtn text="<SacredMedallion size={96} rays={false} />" />
            </div>
          </div>

          <div className="mt-4 rounded-[16px] border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 px-4 py-3 text-xs leading-5 text-amber-900 dark:text-amber-200">
            <strong>Tip:</strong> Multiple medallions on one page are safe — each generates unique
            gradient ids via <code>React.useId()</code>. Works in both light & dark themes.
          </div>
        </div>
      </section>

      {/* full grid */}
      <section className="pb-12">
        <div className="container-dt">
          <div className="flex items-center justify-between gap-4">
            <h2 className="display-dt text-3xl">All stroke motifs</h2>
            <span className={`hidden sm:inline-flex items-center gap-2 text-xs ${toneMap[tone]}`}>
              <span className="h-2 w-2 rounded-full bg-current" /> preview tone: {tone}
            </span>
          </div>

          <div className={`mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ${toneMap[tone]}`}>
            {ITEMS.map((it) => (
              <PreviewCard key={it.name} {...it} />
            ))}
          </div>
        </div>
      </section>

      {/* animated wrappers demo */}
      <section className="site-section has-decor-dt border-t border-dt">
        <div className="container-dt">
          <h2 className="display-dt text-3xl">Animated wrappers</h2>
          <p className="mt-2 text-sm text-[var(--muted)] max-w-2xl">
            Two helpers in the same file — <code>SpinDecor</code> (scroll-linked rotation, respects
            reduced-motion) and <code>DrawDecor</code> (fade-in reveal for stroke SVGs).
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[20px] border border-dt bg-[var(--surface)] p-6">
              <div className="text-[11px] font-bold tracking-[.14em] uppercase text-gold-600">
                SpinDecor
              </div>
              <div className={`mt-4 flex justify-center ${toneMap[tone]}`}>
                <SpinDecor speed={0.6}>
                  <MandalaRings className="w-[120px] h-[120px]" />
                </SpinDecor>
              </div>
              <code className="mt-4 block rounded-xl bg-ink-950 text-gold-200 px-4 py-3 text-[11px] font-mono leading-5">
                {
                  '<SpinDecor speed={0.6}>\n  <MandalaRings className="w-[120px] h-[120px]" />\n</SpinDecor>'
                }
              </code>
              <div className="mt-2 text-[11px] text-[var(--muted)]">
                Scroll the page — the mandala rotates with scroll. Pass reverse to invert.
              </div>
            </div>

            <div className="rounded-[20px] border border-dt bg-[var(--surface)] p-6">
              <div className="text-[11px] font-bold tracking-[.14em] uppercase text-gold-600">
                DrawDecor
              </div>
              <div className={`mt-4 flex justify-center ${toneMap[tone]}`}>
                <DrawDecor>
                  <LotusLine className="w-[160px] h-[120px]" />
                </DrawDecor>
              </div>
              <code className="mt-4 block rounded-xl bg-ink-950 text-gold-200 px-4 py-3 text-[11px] font-mono leading-5">
                {
                  '<DrawDecor delay={0.1}>\n  <LotusLine className="w-[160px] h-[120px]" />\n</DrawDecor>'
                }
              </code>
              <div className="mt-2 text-[11px] text-[var(--muted)]">
                Fades in when scrolled into view. Respects prefers-reduced-motion.
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[20px] border border-dt bg-[var(--surface)] p-6">
            <div className="text-[11px] font-bold tracking-[.14em] uppercase text-gold-600">
              BackToTopHalo — floating button halo
            </div>
            <div className="mt-4 flex justify-center py-8 bg-ink-950 rounded-[14px] relative overflow-hidden">
              <span className="relative grid place-items-center w-11 h-11">
                <BackToTopHalo size={72} speed={0.6} />
                <span className="relative z-[1] grid place-items-center w-11 h-11 rounded-full border border-gold-400/50 bg-[color-mix(in_srgb,#0f0f0c_88%,#e7b631_12%)] text-gold-300">
                  ↑
                </span>
              </span>
            </div>
            <code className="mt-4 block rounded-xl bg-ink-950 text-gold-200 px-4 py-3 text-[11px] font-mono leading-5">
              {
                '<button className="back-to-top-dt">\n  <BackToTopHalo size={72} speed={0.6} />\n  <span className="back-to-top-core-dt"><ArrowUp /></span>\n</button>'
              }
            </code>
            <div className="mt-2 text-[11px] text-[var(--muted)]">
              72px halo behind the 44px button · scroll-linked spin like{" "}
              <code>SpinDecor speed=0.6</code> · glow + beaded ring + lotus petals. Respects
              reduced-motion.
            </div>
          </div>

          <div className="mt-6 rounded-[16px] border border-dt bg-[var(--surface-2)] px-4 py-3 text-xs leading-5 text-[var(--muted)]">
            Import from <code className="font-mono font-bold">src/components/common/decor</code> —
            e.g.{" "}
            <code className="font-mono bg-ink-950 text-gold-200 px-2 py-0.5 rounded-full text-[11px]">
              import {"{ MandalaRings }"} from "@/components/common/decor"
            </code>
          </div>
        </div>
      </section>
    </>
  );
}
