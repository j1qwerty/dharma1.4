import React from "react";
import { FlowerLotus, UserCircle, Sparkle } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";

/* ------------------------------------------------------------------ *
 * SankalpPreview - a live "patrika" (ritual slip) preview of the
 * Sankalp details the priest will receive. Updates as the user types
 * in BookingSankalp. Styled as a sacred document card.
 * ------------------------------------------------------------------ */
export default function SankalpPreview({ sankalp, pujaTitle, temple, date, time }) {
  const { t } = useLanguage();
  const name = sankalp?.name?.trim() || "—";
  const gotra = sankalp?.gotra?.trim() || "—";
  const purpose = sankalp?.purpose?.trim() || "—";
  const family = Number(sankalp?.family) || 0;
  const familyStr =
    family > 0 ? `${family} ${family === 1 ? t("sp.person") : t("sp.people")}` : "—";

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
            <div className="sp-title-dt display-dt">{t("sp.title")}</div>
            <div className="sp-sub-dt">{t("sp.sub")}</div>
          </div>
        </div>

        <div className="sp-ritual-dt">
          <div className="sp-ritual-label-dt">{t("sp.forRitual")}</div>
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
              <UserCircle size={13} /> {t("sp.devotee")}
            </dt>
            <dd>{name}</dd>
          </div>
          <div className="sp-row-dt">
            <dt>
              <Sparkle size={12} /> {t("sp.gotra")}
            </dt>
            <dd>{gotra}</dd>
          </div>
          <div className="sp-row-dt sp-wide-dt">
            <dt>
              <FlowerLotus size={12} /> {t("sp.manokamna")}
            </dt>
            <dd>{purpose}</dd>
          </div>
          <div className="sp-row-dt">
            <dt>
              <UserCircle size={13} /> {t("sp.family")}
            </dt>
            <dd>{familyStr}</dd>
          </div>
        </dl>

        <div className="sp-foot-dt">
          <span className="sp-sig-dt">॥ ॐ ॥</span>
          <span className="sp-note-dt">{t("sp.livePreview")}</span>
        </div>
      </div>
    </div>
  );
}
