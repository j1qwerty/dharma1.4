import React from "react";
import { useLanguage } from "./LanguageToggle";
import { Reveal } from "./Motion";
import { RECITATIONS } from "../../lib/navratriRecitations";

export default function NavratriRecitationCards({ className = "" }) {
  const { lang } = useLanguage();
  const hi = lang === "hi";

  return (
    <div className={className}>
      <Reveal>
        <div className="eyebrow eyebrow-line-dt">
          {hi ? "नवरात्रि के दस पवित्र पाठ" : "The ten sacred recitations"}
        </div>
        <h2 className="display-dt mt-3 max-w-3xl text-[clamp(30px,4.4vw,54px)]">
          {hi ? "अपना संकल्प, देवी की उपासना" : "Find a practice for your intention"}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 muted-dt">
          {hi
            ? "हर पाठ का अपना स्वरूप और पारंपरिक महत्व है। अपने संकल्प के अनुसार वेदाचार्य के मार्गदर्शन से चुनें।"
            : "Each recitation has its own form and traditional significance. Explore the options, then let your Vedacharya guide you by your sankalpa."}
        </p>
      </Reveal>

      <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {RECITATIONS.map((recitation, index) => (
          <Reveal key={recitation.id} delay={Math.min(index % 3, 2) * 0.04}>
            <article className="panel-dt h-full min-w-0 p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[10px] font-bold tracking-[.14em] text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="text-[9px] font-bold uppercase tracking-[.14em] text-gold-600">
                    {hi ? recitation.kickerHi : recitation.kicker}
                  </div>
                  <h3 className="display-dt mt-2 break-words text-xl leading-snug">
                    {hi ? recitation.nameHi : recitation.name}
                  </h3>
                </div>
              </div>
              <p className="mt-4 break-words text-[13px] leading-7 muted-dt">
                {hi ? recitation.bodyHi : recitation.body}
              </p>
              <div className="mt-4 border-t border-dt pt-4">
                <div className="text-[9px] font-bold uppercase tracking-[.14em] text-gold-600">
                  {hi ? "पारंपरिक महत्व" : "Traditional significance"}
                </div>
                <p className="mt-2 break-words text-xs leading-6 muted-dt">
                  {hi ? recitation.sigHi : recitation.sig}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
