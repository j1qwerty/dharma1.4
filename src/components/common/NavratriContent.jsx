import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle, CalendarBlank, MapPin, VideoCamera } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { Reveal, ParallaxImage } from "./Motion";
import SectionHeading from "./SectionHeading";
import { SectionDecor, LeafBranch, DiyaCluster, LotusLine } from "./decor";

/* Navratri page content. Original copy written for Dharmaa Tribe.
 * Hero image comes from PujaDetail (/puja/navratra.jpg).
 * Supporting visuals mix repo-verified Unsplash IDs and picsum seeds
 * so every band has a real image while festival photography is arranged. */
const FORMS = [
  { day: 1, name: "Shailputri", hi: "शैलपुत्री", mantra: "Om Devi Shailputryai Namah", colour: "Yellow", note: "Stability and new beginnings. Ghatasthapana and Kalash Sthapana happen on Pratipada, the first day of Sharad Navratri." },
  { day: 2, name: "Brahmacharini", hi: "ब्रह्मचारिणी", mantra: "Om Devi Brahmacharinyai Namah", colour: "Green", note: "Discipline, study and steady devotion. Favoured by students and families starting a new sankalp for Navratri." },
  { day: 3, name: "Chandraghanta", hi: "चंद्रघंटा", mantra: "Om Devi Chandraghantayai Namah", colour: "Grey", note: "Courage and protection. Worshipped for relief from fear, negativity and repeated obstacles during Durga Puja." },
  { day: 4, name: "Kushmanda", hi: "कूष्मांडा", mantra: "Om Devi Kushmandayai Namah", colour: "Orange", note: "Energy, health and warmth in the home. Her name recalls the cosmic egg, and her day suits health and family sankalps." },
  { day: 5, name: "Skandamata", hi: "स्कंदमाता", mantra: "Om Devi Skandamatayai Namah", colour: "White", note: "Care for children and family harmony. Panchami is the classic day for santan and parivarik sukh wishes." },
  { day: 6, name: "Katyayani", hi: "कात्यायनी", mantra: "Om Devi Katyayanyai Namah", colour: "Red", note: "Strength to finish difficult tasks. Shashti carries the Durga Puja Bodhon energy in Bengal traditions." },
  { day: 7, name: "Kalaratri", hi: "कालरात्रि", mantra: "Om Devi Kalaratryai Namah", colour: "Blue", note: "Removal of fear and deep obstacles. Saptami night worship is part of many Shakti Peeth Navratri schedules." },
  { day: 8, name: "Mahagauri", hi: "महागौरी", mantra: "Om Devi Mahagauryai Namah", colour: "Pink", note: "Peace, clarity and forgiveness. Ashtami hosts Kanya Pujan and is the peak booking day for Navratri puja online." },
  { day: 9, name: "Siddhidatri", hi: "सिद्धिदात्री", mantra: "Om Devi Siddhidatryai Namah", colour: "Purple", note: "Fulfilment and siddhi. Navami closes with Havan, Purnahuti and Dussehra the next morning." },
];

const KEYWORDS = [
  "navratri", "navratra", "sharad navratri 2026", "navratri 2026 dates",
  "durga puja", "durga saptashati path", "navratri puja online",
  "online navratri puja booking", "kalash sthapana", "ghatasthapana 2026",
  "kanya pujan", "kanjak", "ashtami puja", "navami havan", "navratri havan",
  "akhand jyoti", "navdurga", "nine forms of durga", "dandiya", "garba",
];

export default function NavratriContent() {
  const { lang } = useLanguage();
  const hi = lang === "hi";

  useEffect(() => {
    document.title = hi
      ? "शारदीय नवरात्रि पूजा 2026: तिथि, विधि और बुकिंग | Dharmaa Tribe"
      : "Sharad Navratri Puja 2026: Dates, Vidhi and Online Booking | Dharmaa Tribe";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      hi
        ? "शारदीय नवरात्रि 2026 में कलश स्थापना, दुर्गा सप्तशती पाठ, कन्या पूजन और हवन ऑनलाइन बुक करें। तिथि, विधि, व्रत नियम और verified आचार्य।"
        : "Book Sharad Navratri 2026 puja online: Kalash Sthapana, Durga Saptashati path, Kanya Pujan and Havan with verified acharyas, family Sankalp and video delivery."
    );
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) {
      kw = document.createElement("meta");
      kw.setAttribute("name", "keywords");
      document.head.appendChild(kw);
    }
    kw.setAttribute("content", KEYWORDS.join(", "));
    const ldId = "navratri-ld-json";
    let ld = document.getElementById(ldId);
    if (!ld) {
      ld = document.createElement("script");
      ld.id = ldId;
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Sharad Navratri Devi Puja 2026",
      description:
        "Nine nights of Devi worship: Kalash Sthapana, Durga Saptashati path, Kanya Pujan and Havan with family Sankalp.",
      image: "https://dharmaatribe.com/puja/navratra.jpg",
      brand: { "@type": "Brand", name: "Dharmaa Tribe" },
      offers: { "@type": "Offer", priceCurrency: "INR", price: "2101", availability: "https://schema.org/InStock" },
    });
  }, [hi]);

  return (
    <>
      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LeafBranch className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt grid gap-10 lg:grid-cols-[1.1fr_.9fr] items-center">
          <Reveal>
            <h2 className="display-dt mt-3 text-5xl sm:text-6xl">
              {hi ? "नौ रातें, नौ रूप, एक संकल्प।" : "Nine nights, nine forms, one Sankalp."}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-dt">
              {hi
                ? "शारदीय नवरात्रि 2026 में 11 अक्टूबर से देवी के नौ रूपों की उपासना। कलश स्थापना से हवन तक पूरी विधि, पारिवारिक संकल्प सहित।"
                : "Sharad Navratri 2026 begins 11 Oct with nine nights of Devi worship. From Kalash Sthapana to Havan, the full Navratri vidhi carries your family Sankalp every day."}
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 max-w-xl">
              {[
                [hi ? "11 अक्टूबर" : "11 Oct", hi ? "कलश स्थापना" : "Ghatasthapana"],
                [hi ? "18 अक्टूबर" : "18 Oct", hi ? "अष्टमी पूजन" : "Ashtami Pujan"],
                [hi ? "19 अक्टूबर" : "19 Oct", hi ? "नवमी हवन" : "Navami Havan"],
              ].map(([a, b]) => (
                <div key={a} className="panel-dt p-4 text-center">
                  <div className="display-dt text-2xl">{a}</div>
                  <div className="mt-1 text-[11px] muted-dt">{b}</div>
                </div>
              ))}
            </div>
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
            <div className="grid gap-4">
              <div className="overflow-hidden rounded-[24px]">
                <ParallaxImage
                  src="/puja/navratra.jpg"
                  alt="Sharad Navratri Devi idol decorated for Durga Puja"
                  className="h-[300px] w-full sm:h-[380px]"
                  strength={20}
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["https://images.unsplash.com/photo-1604608672516-f1b9c7f84d1c?auto=format&fit=crop&w=600&q=70", "Akhand Jyoti diya for Navratri"],
                  ["https://picsum.photos/seed/dharma-navratri-flowers/600/450", "Navratri flower offerings for Devi"],
                  ["https://picsum.photos/seed/dharma-navratri-temple/600/450", "Temple visit during Navratri nights"],
                ].map(([src, alt]) => (
                  <div key={src} className="overflow-hidden rounded-[16px]">
                    <ParallaxImage src={src} alt={alt} className="h-[110px] w-full sm:h-[130px]" strength={10} />
                  </div>
                ))}
              </div>
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
                ? "हर दिन एक रूप, एक रंग, एक मंत्र और एक भाव।"
                : "One form, one colour, one mantra and one intention per day. Your Sankalp stays constant while the form of Durga changes through Navratri."
            }
            soft
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FORMS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.03}>
                <div className="panel-dt flex h-full flex-col p-6">
                  <div className="text-[10px] font-bold uppercase tracking-[.16em] text-gold-600">
                    Day {f.day} · {f.colour}
                  </div>
                  <h3 className="mt-2 text-3xl display-dt">{hi ? f.hi : f.name}</h3>
                  <p className="mt-1 font-mono text-[11px] muted-dt">{f.mantra}</p>
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
            <h2 className="display-dt mt-3 text-5xl">{hi ? "क्रम स्पष्ट, भाव स्थिर।" : "A clear Navratri sequence."}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 muted-dt">
              {hi
                ? "प्रतिपदा से नवमी तक: घट स्थापना, daily सप्तशती पाठ, अष्टमी कन्या पूजन, नवमी हवन।"
                : "Pratipada to Navami: Ghatasthapana, daily Saptashati recitation, Ashtami Kanya Pujan, Navami Havan and Purnahuti."}
            </p>
            <div className="mt-6 grid gap-3">
              {[
                [hi ? "कलश स्थापना" : "Kalash Sthapana", hi ? "पहले दिन घट स्थापना और अखंड ज्योति, संकल्प के साथ।" : "Day one Ghatasthapana and Akhand Jyoti with your family Sankalp for Navratri 2026."],
                [hi ? "दुर्गा सप्तशती पाठ" : "Durga Saptashati Path", hi ? "13 अध्यायों का प्रतिदिन पाठ, परिवार के नाम सहित।" : "Daily recitation across 13 chapters, carrying your family names through all nine nights."],
                [hi ? "कन्या पूजन" : "Kanya Pujan", hi ? "अष्टमी या नवमी को 9 कन्याओं का पूजन और भोज।" : "Ashtami or Navami Kanjak: worship of nine girls with prasad and dakshina, coordinated by Dharmaa."],
                [hi ? "हवन और पूर्णाहुति" : "Havan and Purnahuti", hi ? "नवमी को नवदुर्गा हवन से समापन, फिर दशहरा।" : "Closing Navdurga Havan and Purnahuti on Navami, leading into Dussehra morning."],
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
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1603561596112-0a132b5a965a?auto=format&fit=crop&w=1000&q=70"
                  alt="Diya flames during Navratri aarti"
                  className="h-[240px] w-full"
                  strength={14}
                />
              </div>
              <div className="panel-dt p-6">
                <div className="grid gap-2">
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

      <section className="site-section ink-dt has-decor-dt">
        <SectionDecor />
        <div className="container-dt grid gap-10 lg:grid-cols-[.9fr_1.1fr] items-center">
          <Reveal>
            <h2 className="display-dt text-5xl sm:text-6xl title-soft">
              {hi ? "व्रत, रंग और भोग।" : "Fasting, colours and bhog."}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
              {hi
                ? "नवरात्रि व्रत में सेंधा नमक, कुट्टू और फल। हर दिन का रंग और देवी का प्रिय भोग पहले से तय रखें।"
                : "Navratri fasting uses sendha namak, kuttu and fruit. Fix each day colour and Devi bhog in advance so the nine days stay calm."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-gold-dt" to="/stories/navratri-nine-nights">
                {hi ? "पूरी गाइड पढ़ें" : "Read the full guide"} <ArrowRight size={15} />
              </Link>
              <Link className="btn-ghost-dt !border-white/20 !bg-white/10 !text-white" to="/pujas/navratri">
                {hi ? "पूजा बुक करें" : "Book the puja"} <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [hi ? "व्रत थाली" : "Vrat thali", hi ? "सेंधा नमक, कुट्टू आटा, सिंघाड़ा, फल।" : "Sendha namak, kuttu atta, singhara and fruit.", "https://picsum.photos/seed/dharma-navratri-vrat/700/500"],
              [hi ? "दैनिक रंग" : "Daily colours", hi ? "पीला, हरा, ग्रे, नारंगी, सफेद, लाल, नीला, गुलाबी, बैंगनी।" : "Yellow, green, grey, orange, white, red, blue, pink, purple.", "https://picsum.photos/seed/dharma-navratri-colours/700/500"],
              [hi ? "भोग" : "Daily bhog", hi ? "घी, गुड़, खीर, मालपुआ, केला, शहद, नारियल।" : "Ghee, jaggery, kheer, malpua, banana, honey, coconut.", "https://picsum.photos/seed/dharma-navratri-bhog/700/500"],
              [hi ? "गरबा रातें" : "Garba nights", hi ? "आरती के बाद गरबा, परंपरा के साथ।" : "Garba after aarti, held with tradition.", "https://picsum.photos/seed/dharma-navratri-garba/700/500"],
            ].map(([a, b, src], i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="overflow-hidden rounded-[20px] bg-black">
                  <ParallaxImage src={src} alt={a} className="h-[170px] w-full" strength={10} />
                  <div className="p-5 bg-white/[.04]">
                    <div className="display-dt text-2xl text-white">{a}</div>
                    <p className="mt-1.5 text-xs leading-6 text-white/55">{b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <LotusLine className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title={hi ? "नवरात्रि प्रश्न" : "Navratri questions devotees ask"}
            copy={hi ? "तिथि, उपवास, कन्या पूजन, हवन और वीडियो।" : "Navratri dates, fasting, Kanya Pujan, Havan and video delivery."}
          />
          <div className="grid gap-3 lg:grid-cols-2">
            {[
              [hi ? "शारदीय नवरात्रि 2026 कब है?" : "When is Sharad Navratri 2026?",
                hi ? "11 अक्टूबर से 19 अक्टूबर, दशहरा 20 अक्टूबर।" : "11 Oct to 19 Oct, with Dussehra on 20 Oct. Ghatasthapana on Pratipada morning."],
              [hi ? "क्या पूरे 9 दिन बुक करना जरूरी है?" : "Must I book all nine days?",
                hi ? "नहीं। एक दिन, अष्टमी-नवमी या पूरे 9 दिन।" : "No. Book a single day, Ashtami-Navami, or the full nine nights of Navratri."],
              [hi ? "कलश स्थापना घर पर होगी?" : "Is Kalash Sthapana at home?",
                hi ? "हाँ, आचार्य लाइव मार्गदर्शन देंगे या आपकी ओर से संपन्न करेंगे।" : "Yes. The acharya guides you live at home, or performs the Navratri puja on your behalf."],
              [hi ? "कन्या पूजन में क्या होता है?" : "What happens in Kanya Pujan?",
                hi ? "9 कन्याओं के चरण पूजन, भोज, दक्षिणा।" : "Pada pujan of nine girls with bhoj and dakshina on Ashtami or Navami."],
              [hi ? "हवन कब होता है?" : "When is the Havan?",
                hi ? "नवमी को पूर्णाहुति के साथ।" : "Navami Havan with Purnahuti closes the Navratri sequence."],
              [hi ? "वीडियो कब मिलेगा?" : "When does the video arrive?",
                hi ? "पूजा के 24 से 48 घंटे के भीतर।" : "Within 24 to 48 hours after each Navratri puja day."],
            ].map(([q, a]) => (
              <Reveal key={q}>
                <div className="panel-dt p-6">
                  <h3 className="text-xl font-bold display-dt">{q}</h3>
                  <p className="mt-2 text-xs leading-6 muted-dt">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=70", "Navratri temple aarti with lamps"],
              ["https://picsum.photos/seed/dharma-navratri-dandiya/800/600", "Dandiya sticks for Navratri nights"],
              ["https://picsum.photos/seed/dharma-navratri-havan/800/600", "Navami Havan kund for Purnahuti"],
            ].map(([src, alt]) => (
              <div key={src} className="overflow-hidden rounded-[20px]">
                <ParallaxImage src={src} alt={alt} className="h-[190px] w-full" strength={12} />
              </div>
            ))}
          </div>
          <p className="mt-8 text-[11px] leading-6 muted-dt">
            Navratri keywords: navratri, navratra, sharad navratri 2026, navratri 2026 dates, durga puja,
            durga saptashati path, navratri puja online, kalash sthapana, ghatasthapana, kanya pujan,
            kanjak, ashtami puja, navami havan, akhand jyoti, navdurga, dandiya, garba.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs muted-dt">
            <span className="inline-flex items-center gap-1.5"><CalendarBlank size={14} /> 11-19 Oct 2026</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} /> Shakti Peeth Seva · At Home</span>
            <span className="inline-flex items-center gap-1.5"><VideoCamera size={14} /> Video in 24-48 hours</span>
          </div>
        </div>
      </section>
    </>
  );
}
