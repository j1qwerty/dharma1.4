import { useMemo } from "react";
import { LeafBranch } from "./LeafBranch";
import { LotusLine } from "./LotusLine";
import { MandalaRings } from "./MandalaRings";
import { TempleArch } from "./TempleArch";
import { DiyaLamp } from "./DiyaLamp";
import { Kalash } from "./Kalash";
import { DiyaCluster } from "./DiyaCluster";
import { Swastika } from "./Swastika";
import { OmSymbol } from "./OmSymbol";
import { Trishul } from "./Trishul";
import { Conch } from "./Conch";
import { Rangoli } from "./Rangoli";
import { SacredTree } from "./SacredTree";
import { Hamsa } from "./Hamsa";
import { Bell } from "./Bell";
import { Yantra } from "./Yantra";
import { Toran } from "./Toran";
import { Peacock } from "./Peacock";

// pool — everything *except* SacredMedallion / BackToTopHalo / wrappers
const MOTIFS = [
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
];

const TONES = ["gold", "saffron", "red", "yellow"];
const POSITIONS = ["decor-tl", "decor-tr", "decor-bl", "decor-br", "decor-top", "decor-bottom"];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * SectionDecor — drop inside any <section class="has-decor-dt">.
 * Picks a random motif / corner / colour on first mount.
 * - motif:  component override (e.g. LotusLine)
 * - tone:   "gold" | "saffron" | "red" | "yellow"
 * - position: "decor-tl" | "decor-tr" | "decor-bl" | "decor-br" | "decor-top" | "decor-bottom"
 * Colours automatically flip for dark mode & ink sections via CSS (index.css).
 */
export function SectionDecor({ motif: MotifProp, tone: toneProp, position: posProp, className = "", flip, style }) {
  const Motif = useMemo(() => MotifProp ?? pick(MOTIFS), [MotifProp]);
  const tone = useMemo(() => toneProp ?? pick(TONES), [toneProp]);
  const pos = useMemo(() => posProp ?? pick(POSITIONS), [posProp]);

  const toneClass = `decor-tone-${tone}`;
  // LeafBranch looks better flipped on right-side corners
  const isLeaf = Motif === LeafBranch;
  const autoFlip = isLeaf && (pos === "decor-tr" || pos === "decor-br");
  const flipVal = flip ?? autoFlip;

  const extra = isLeaf ? { flip: flipVal } : {};

  return <Motif className={`decor-dt ${pos} ${toneClass} hide-mobile ${className}`.trim()} style={style} {...extra} />;
}

export default SectionDecor;
