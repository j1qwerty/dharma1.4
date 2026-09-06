import React from "react";
import { FlowerLotus, UserCircle, Sparkle } from "@phosphor-icons/react";

/* ------------------------------------------------------------------ *
 * SankalpPreview - a live "patrika" (ritual slip) preview of the
 * Sankalp details the priest will receive. Updates as the user types
 * in BookingSankalp. Styled as a sacred document card.
 * ------------------------------------------------------------------ */
export default function SankalpPreview({ sankalp, pujaTitle, temple, date, time }) {
  const name = sankalp?.name?.trim() || "—";
  const gotra = sankalp?.gotra?.trim() || "—";
  const purpose = sankalp?.purpose?.trim() || "—";
  const family = Number(sankalp?.family) || 0;

  return (
    <div className="sankalp-preview-dt">
      <div className="sp-frame-dt">
        <div className="sp-corner-dt sp-tl-dt" />
        <div className="sp-corner-dt sp-tr-dt" />
        <div className="sp-corner-dt sp-bl-dt" />
        <div className="sp-corner-dt sp-br-dt" />

        <div className="sp-head-dt">
          <FlowerLotus size={20} weight="duotone" className="text-gold-600" />
          <div>
            <div className="sp-title-dt display-dt">Sankalp Patrika</div>
            <div className="sp-sub-dt">What the priest will receive</div>
          </div>
        </div>

        <div className="sp-ritual-dt">
          <div className="sp-ritual-label-dt">For the ritual</div>
          <div className="sp-ritual-name-dt">{pujaTitle || "Puja"}</div>
          <div className="sp-ritual-meta-dt">
            {temple}
            {date && <span> · {date}</span>}
            {time && <span> · {time}</span>}
          </div>
        </div>

        <dl className="sp-grid-dt">
          <div className="sp-row-dt">
            <dt>
              <UserCircle size={13} /> Devotee
            </dt>
            <dd>{name}</dd>
          </div>
          <div className="sp-row-dt">
            <dt>
              <Sparkle size={12} /> Gotra
            </dt>
            <dd>{gotra}</dd>
          </div>
          <div className="sp-row-dt sp-wide-dt">
            <dt>
              <FlowerLotus size={12} /> Manokamna
            </dt>
            <dd>{purpose}</dd>
          </div>
          <div className="sp-row-dt">
            <dt>
              <UserCircle size={13} /> Family
            </dt>
            <dd>{family > 0 ? `${family} ${family === 1 ? "person" : "people"}` : "—"}</dd>
          </div>
        </dl>

        <div className="sp-foot-dt">
          <span className="sp-sig-dt">॥ ॐ ॥</span>
          <span className="sp-note-dt">Live preview · updates as you type</span>
        </div>
      </div>
    </div>
  );
}
