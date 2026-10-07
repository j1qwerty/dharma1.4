import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { Reveal, ParallaxImage } from "./Motion";
import SectionHeading from "./SectionHeading";
import { SectionDecor, LeafBranch, DiyaCluster } from "./decor";

/* Navratri page content. Structure inspired by common Devi puja pages
 * (benefits, vidhi, 9 forms, FAQ) rewritten originally for Dharmaa Tribe.
 * Main image comes from PujaDetail hero (/puja/navratra.jpg).
 * Supporting visuals are lightweight placeholders. */
const FORMS = [
  { day: 1, name: "Shailputri", hi: "शैलपुत्री", note: "Stability and new beginnings. Kalash Sthapana on this day.", colour: "Yellow" },
  { day: 2, name: "Brahmacharini", hi: "ब्रह्मचारिणी", note: "Discipline and steady devotion.", colour: "Green" },
  { day: 3, name: "Chandraghanta", hi: "चंद्रघंटा", note: "Courage and protection from negativity.", colour: "Grey" },
  { day: 4, name: "Kushmanda", hi: "कूष्मांडा", note: "Energy, health and warmth in the home.", colour: "Orange" },
  { day: 5, name: "Skandamata", hi: "स्कंदमाता", note: "Care for children and family harmony.", colour: "White" },
  { day: 6, name: "Katyayani", hi: "कात्यायनी", note: "Strength to complete difficult tasks.", colour: "Red" },
  { day: 7, name: "Kalaratri", hi: "कालरात्रि", note: "Removal of fear and obstacles.", colour: "Blue" },
  { day: 8, name: "Mahagauri", hi: "महागौरी", note: "Peace, clarity and Kanya Pujan.", colour: "Pink" },
  { day: 9, name: "Siddhidatri", hi: "सिद्धिदात्री", note: "Fulfilment, Havan and Purnahuti.", colour: "Purple" },
];

export default function NavratriContent() {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  return (
    <>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LeafBranch className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt grid gap-10 lg:grid-cols-[1.1fr_.9fr] items-center">
          <Reveal>
            <div className="eyebrow eyebrow-line-dt">{hi ? "शारदीय नवरात्रि" : "Sharad Navratri"}</div>
            <h2 className="display-dt mt-3 text-5xl sm:text-6xl">
              {hi ? "नौ रातें, नौ रूप, एक संकल्प।" : "Nine nights, nine forms, one Sankalp."}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-dt">
              {hi
                ? "नवरात्रि में देवी के नौ रूपों की उपासना होती है। धर्मा ट्राइब के साथ कलश स्थापना से हवन तक पूरी विधि संकल्प सहित संपन्न होती है।"
                : "Navratri honours the nine forms of Devi across nine nights. With Dharmaa Tribe the full sequence runs from Kalash Sthapana to Havan, carrying your family Sankalp throughout."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-gold-dt" to="/booking/navratri/date">
                {hi ? "नवरात्रि पूजा बुक करें" : "Book Navratri puja"} <ArrowRight size={15} />
              </Link>
              <Link className="btn-ghost-dt" to="/social">
                {hi ? "भक्ति वीडियो देखें" : "Watch devotional videos"}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[24px]">
              <ParallaxImage
                src="https://picsum.photos/seed/dharma-navratri-kalash/1000/800"
                alt="Navratri Kalash Sthapana"
                className="h-[300px] w-full sm:h-[380px]"
                strength={20}
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <div className="container-dt">
          <SectionHeading
            title={hi ? "नवदुर्गा: दिन अनुसार उपासना" : "Navdurga across nine days"}
            copy={
              hi
                ? "हर दिन एक रूप, एक रंग और एक भाव।"
                : "One form, one colour and one intention per day. Your Sankalp stays constant while the form changes."
            }
            soft
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FORMS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.04}>
                <div className="panel-dt p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[.16em] text-gold-600">
                    Day {f.day} · {f.colour}
                  </div>
                  <h3 className="mt-2 text-3xl display-dt">
                    {hi ? f.hi : f.name}
                  </h3>
                  <p className="mt-2 text-xs leading-6 muted-dt">{f.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <DiyaCluster className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt grid gap-10 lg:grid-cols-2 items-start">
          <Reveal>
            <div className="eyebrow eyebrow-line-dt">{hi ? "पूजा विधि" : "Puja vidhi"}</div>
            <h2 className="display-dt mt-3 text-5xl">{hi ? "क्रम स्पष्ट, भाव स्थिर।" : "A clear sequence, held with care."}</h2>
            <div className="mt-6 grid gap-3">
              {[
                [hi ? "कलश स्थापना" : "Kalash Sthapana", hi ? "पहले दिन घट स्थापना और अखंड ज्योति।" : "Ghatasthapana and Akhand Jyoti on day one."],
                [hi ? "दुर्गा सप्तशती पाठ" : "Durga Saptashati Path", hi ? "प्रतिदिन पाठ, परिवार के नाम सहित।" : "Daily recitation carrying your family names."],
                [hi ? "कन्या पूजन" : "Kanya Pujan", hi ? "अष्टमी या नवमी को कन्या पूजन।" : "Kanya Pujan on Ashtami or Navami."],
                [hi ? "हवन और पूर्णाहुति" : "Havan and Purnahuti", hi ? "नवमी को हवन से समापन।" : "Closing Havan and Purnahuti on Navami."],
              ].map(([a, b], i) => (
                <div key={a} className="panel-dt p-5 flex gap-4">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-dt text-xs font-bold text-gold-600">
                    0{i + 1}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{a}</span>
                    <span className="mt-1 block text-xs leading-6 muted-dt">{b}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[20px]">
                <ParallaxImage src="https://picsum.photos/seed/dharma-navratri-diya/1000/700" alt="Navratri diya" className="h-[240px] w-full" strength={14} />
              </div>
              <div className="panel-dt p-6">
                <div className="text-[10px] font-bold uppercase tracking-[.15em] text-gold-600">
                  {hi ? "क्यों बुक करें" : "Why book with Dharmaa"}
                </div>
                <div className="mt-4 grid gap-2">
                  {[
                    hi ? "व्यक्तिगत संकल्प हर दिन" : "Personal Sankalp carried daily",
                    hi ? "सत्यापित आचार्य नेटवर्क" : "Verified acharya network",
                    hi ? "पूजा के बाद वीडियो" : "Post-puja video delivery",
                    hi ? "कन्या पूजन व्यवस्था" : "Kanya Pujan coordination",
                  ].map((x) => (
                    <div key={x} className="flex items-center gap-2 text-xs font-semibold">
                      <CheckCircle size={15} className="text-gold-600" weight="fill" /> {x}
                    </div>
                  ))}
                </div>
                <Link className="btn-gold-dt mt-6 w-full" to="/booking/navratri/date">
                  {hi ? "तिथि चुनें" : "Choose your date"} <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <div className="container-dt">
          <SectionHeading
            title={hi ? "अक्सर पूछे जाने वाले प्रश्न" : "Navratri questions devotees ask"}
            copy={hi ? "तिथि, उपवास, कन्या पूजन और वीडियो से जुड़े उत्तर।" : "Dates, fasting, Kanya Pujan and video delivery."}
          />
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              [hi ? "क्या पूरे 9 दिन बुक करना जरूरी है?" : "Must I book all nine days?",
                hi ? "नहीं। एक दिन, अष्टमी-नवमी या पूरे 9 दिन, जैसा भाव हो।" : "No. Book a single day, Ashtami-Navami, or the full nine nights."],
              [hi ? "कलश स्थापना घर पर होगी?" : "Is Kalash Sthapana at home?",
                hi ? "हाँ, आचार्य लाइव मार्गदर्शन देंगे या आपकी ओर से संपन्न करेंगे।" : "Yes. The acharya guides you live at home, or performs on your behalf."],
              [hi ? "वीडियो कब मिलेगा?" : "When does the video arrive?",
                hi ? "पूजा के 24 से 48 घंटे के भीतर।" : "Within 24 to 48 hours after the puja."],
              [hi ? "परिवार के नाम शामिल होंगे?" : "Are family names included?",
                hi ? "हाँ, संकल्प में पूरे परिवार के नाम।" : "Yes. Family names go into the daily Sankalp."],
            ].map(([q, a]) => (
              <Reveal key={q}>
                <div className="panel-dt p-6">
                  <h3 className="text-xl font-bold display-dt">{q}</h3>
                  <p className="mt-2 text-xs leading-6 muted-dt">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 overflow-hidden rounded-[20px]">
            <ParallaxImage src="https://picsum.photos/seed/dharma-navratri-garba/1600/600" alt="Navratri celebration" className="h-[220px] w-full sm:h-[280px]" strength={16} />
          </div>
        </div>
      </section>
    </>
  );
}
