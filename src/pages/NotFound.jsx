import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "../components/common/Icons";
import { LotusLine, MandalaRings, SpinDecor, SectionDecor } from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <section className="site-section has-decor-dt">
      <SectionDecor />
      <SpinDecor className="decor-dt decor-center hide-mobile" speed={0.3}>
        <MandalaRings style={{ width: 420, height: 420 }} className="soft-tone" />
      </SpinDecor>
      <LotusLine className="decor-dt decor-tl hide-mobile soft-tone" />
      <div className="container-x">
        <div className="panel p-16 text-center relative z-10">
          <div className="font-display text-7xl">404</div>
          <h1 className="display mt-4 text-5xl">{t("nf.title")}</h1>
          <p className="mt-3 text-sm text-muted">{t("nf.copy")}</p>
          <Link to="/" className="btn-gold mt-7">
            {t("nf.returnHome")} <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
