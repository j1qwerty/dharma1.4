import React, { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle, MapPin, Phone } from "@phosphor-icons/react";
import { acharyas as defaultAcharyas } from "../lib/data";
import { useLiveAcharyas } from "../lib/cms";
import { Reveal } from "../components/common/Motion";
import { SectionDecor, OmSymbol } from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";

function pick(hi, obj, base) {
  const hv = obj?.[`${base}Hi`];
  return hi && hv != null && hv !== "" ? hv : obj?.[base];
}

export default function AcharyaDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const { t, lang } = useLanguage();
  const hi = lang === "hi";
  const { items: acharyas } = useLiveAcharyas();
  const a = useMemo(
    () =>
      acharyas.find((x) => x.id === id) ||
      defaultAcharyas.find((x) => x.id === id) ||
      null,
    [acharyas, id]
  );

  const goBack = () => {
    if (window.history.length > 1) nav(-1);
    else nav("/acharyas", { replace: true });
  };

  if (!a) {
    return (
      <section className="site-section">
        <div className="container-dt max-w-[720px] text-center" style={{ padding: "60px 20px" }}>
          <h1 className="display-dt text-4xl">{hi ? "आचार्य नहीं मिले" : "Acharya not found"}</h1>
          <Link to="/acharyas" className="btn-gold-dt mt-6">
            {hi ? "सभी आचार्य" : "All acharyas"}
          </Link>
        </div>
      </section>
    );
  }

  const quals = pick(hi, a, "qualifications") || [];
  const expFull = pick(hi, a, "expertiseFull") || [];
  const qualList = Array.isArray(quals) ? quals : [];
  const expList = Array.isArray(expFull) ? expFull : [];

  return (
    <>
      <section className="site-section has-decor-dt" style={{ paddingTop: 40 }}>
        <SectionDecor />
        <OmSymbol className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt max-w-[1100px]">
          <button
            onClick={goBack}
            className="btn-ghost-dt !py-2"
          >
            <ArrowLeft size={14} /> {hi ? "वापस" : "Back"}
          </button>

          {/* Profile header: photo left, content right (no hero image) */}
          <div className="acharya-profile-dt">
            <div className="acharya-profile-media-dt">
              <img
                src={a.image}
                alt={a.name}
                onError={(e) => {
                  e.currentTarget.src = "/images/placeholder.svg";
                }}
              />
              {a.principal && (
                <span className="rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#1a1408] bg-gradient-to-b from-[#f6d47a] to-[#e0a92e] acharya-profile-badge-dt">
                  ✦ {hi ? "प्रमुख वेदाचार्य" : "Principal Vedacharya"}
                </span>
              )}
            </div>
            <div className="acharya-profile-copy-dt">
            <div className="acharya-profile-copy-dt">
              <div className="eyebrow eyebrow-line-dt">
                {hi ? "हमारे आचार्य" : "Our acharyas"}
              </div>
              <h1 className="display-dt mt-3 text-5xl sm:text-6xl">{a.name}</h1>
              {(hi ? a.traditionHi || a.tradition : a.tradition) && (
                <p className="mt-3 text-xs font-bold uppercase tracking-[.14em] text-gold-600">
                  {hi ? a.traditionHi || a.tradition : a.tradition}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs muted-dt">
                {(hi ? a.placeHi || a.place : a.place) && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={14} /> {hi ? a.placeHi || a.place : a.place}
                  </span>
                )}
                {a.phone && (
                  <a className="inline-flex items-center gap-2 text-gold-600 hover:underline" href={`tel:${a.phone.replace(/\s+/g, "")}`}>
                    <Phone size={14} /> {a.phone}
                  </a>
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-3 items-center">
                <Link className="btn-gold-dt" to="/pujas">
                  {t("nav.bookPuja")} <ArrowRight size={15} />
                </Link>
                <Link className="btn-ghost-dt" to="/acharyas">
                  {hi ? "सभी आचार्य" : "All acharyas"} <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          <Reveal>
            <div className="eyebrow eyebrow-line-dt mt-14">{hi ? "परिचय" : "Profile"}</div>
            <div className="mt-4 grid gap-4 text-[15px] leading-8 muted-dt">
              <p>{hi && a.bioHi ? a.bioHi : a.bio}</p>
            </div>
          </Reveal>

          {qualList.length > 0 && (
            <Reveal>
              <h2 className="display-dt mt-12 text-4xl sm:text-5xl">
                {hi ? "शैक्षणिक योग्यता" : "Qualifications"}
              </h2>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {qualList.map((q) => (
                  <li key={q} className="panel-dt p-4 flex items-start gap-2.5 text-sm leading-6">
                    <CheckCircle size={16} weight="fill" className="mt-0.5 flex-none text-gold-600" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {expList.length > 0 && (
            <Reveal>
              <h2 className="display-dt mt-12 text-4xl sm:text-5xl">
                {hi ? "विशेषज्ञता" : "Areas of expertise"}
              </h2>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {expList.map((x) => (
                  <li key={x} className="panel-dt p-4 flex items-start gap-2.5 text-sm leading-6">
                    <CheckCircle size={16} weight="fill" className="mt-0.5 flex-none text-gold-600" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal>
            <div className="mt-12 rounded-[22px] border border-dt surface-dt p-7">
              <div className="grid gap-2 text-sm">
                {[
                  [t("ach.cardLineage"), hi && a.lineageHi ? a.lineageHi : a.lineage],
                  [t("ach.cardExperience"), hi && a.experienceHi ? a.experienceHi : a.experience],
                  [t("ach.cardPlace"), hi && a.placeHi ? a.placeHi : a.place],
                ].map(([label, value]) =>
                  value ? (
                    <div key={label} className="flex justify-between gap-4 border-b border-dt py-2.5 last:border-0">
                      <span className="muted-dt">{label}</span>
                      <span className="font-semibold text-right">{value}</span>
                    </div>
                  ) : null
                )}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button onClick={goBack} className="btn-ghost-dt">
                  <ArrowLeft size={14} /> {hi ? "वापस" : "Back"}
                </button>
                <Link className="btn-gold-dt" to="/pujas">
                  {t("nav.bookPuja")} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
