import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "../components/common/Motion";
import SectionCurve from "../components/common/SectionCurve";
import { SectionDecor } from "../components/common/decor";
import { pujas, acharyas } from "../lib/data";
import { WHATSAPP_NUMBER } from "../lib/site";
import { useLanguage } from "../components/common/LanguageToggle";

function Block({ id, index, title, children }) {
  return (
    <Reveal>
      <section id={id} className="panel-dt p-6 sm:p-8 review-block-dt">
        <div className="eyebrow">
          {String(index).padStart(2, "0")}
        </div>
        <h2 className="display-dt mt-2 text-4xl sm:text-5xl">{title}</h2>
        <div className="mt-5 grid gap-3 text-sm leading-7 text-muted-dt">{children}</div>
      </section>
    </Reveal>
  );
}

export default function Review() {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  const points = [
    "check all pages and section thoroughly suggest changes and sectons to keep and remove etc,",
    "provide images for all sections",
    "check all headings in english and hindi",
    "whatsapp number for booking and inquiry",
    "provide content for puja and their details",
  ];

  const homeSections = [
    ["Hero banner + trust strip", "Keep. Approve real hero photography (current images are placeholders)."],
    ["Assurance strip (dates, video, booking, family)", "Keep."],
    ["Festival countdown", "Keep if the countdown date is maintained."],
    ["The dates people are booking (Shraadh first)", "Keep."],
    ["Festival marquee band", "Optional — decorative only. Keep / Remove?"],
    ["The calendar keeps moving (4 festivals)", "Keep. Confirm festival list and dates."],
    ["The people who carry the tradition (acharyas)", "Keep."],
    ["What are you here to mark? (intentions)", "Keep once Hindi lines are provided."],
    ["Ritual journey (Choose → Submit → Receive)", "Keep."],
    ["Trust band (stats 50+ / 200+ / 4.9)", "Change — stats are sample data; send real numbers + testimonial."],
    ["Stories preview", "Keep — confirm the featured stories."],
    ["Wider social feed (links to “#”)", "Remove until real social channels exist."],
    ["Year-long recurring (Phase 3 copy)", "Remove for launch."],
    ["Temple network (Varanasi/Ayodhya/Somnath)", "Remove unless partnerships are confirmed."],
    ["Newsletter (email + Join)", "Connect it or remove — currently demo."],
  ];

  const headings = [
    ["Sacred rituals. Modern access.", "पवित्र अनुष्ठान। आधुनिक सुविधा।"],
    ["Let devotion travel with you.", "अपनी भक्ति को साथ ले जाएँ।"],
    ["The dates people are booking", "लोग इन तिथियों के लिए बुक कर रहे हैं"],
    ["The calendar keeps moving", "कैलेंडर चलता रहता है"],
    ["The people who carry the tradition.", "परंपरा को आगे बढ़ाने वाले लोग।"],
    ["What are you here to mark?", "आप किस उद्देश्य से आए हैं?"],
    ["Find the puja that fits the moment.", "क्षण के अनुरूप पूजा खोजें।"],
    ["Questions devotees ask", "भक्तों के सवाल"],
    ["Stories that give the ritual some context.", "कथाएँ जो अनुष्ठान को संदर्भ देती हैं।"],
    ["Ancient rituals, clearer access.", "प्राचीन अनुष्ठान, स्पष्ट पहुँच।"],
    ["Book a puja", "पूजा बुक करें"],
  ];

  const waRows = [
    ["Puja booking (payment step)", "Full booking summary: code, names (EN+HI), deity, temple, date, package, devotee details, total"],
    ["Per-puja inquiry (Ask on WhatsApp)", "Short message naming that exact puja with code + temple"],
    ["Shraadh → Speak to a Vedacharya", "Shraadh-specific inquiry (PUJA-009)"],
    ["Shraadh → Gaya Ji experience", "Dedicated Gaya Ji message (Tithi/Vidhi guidance)"],
    ["Floating bubble + footer", "General help message / plain chat open"],
  ];

  const otherPages = [
    ["Stories (/stories)", "Keep. Category chips are English-only — send Hindi categories. Article bodies need real text."],
    ["About (/about)", "Keep. Replace sample stats 50+ / 200+ / 4.9."],
    ["Booking flow (/booking/…)", "Keep. Confirm packages: Individual ₹1,100 / Couple ₹1,650 / Family ₹2,100."],
    ["Tracking + My bookings", "Demo data — needs real backend or a “demo” label."],
    ["Login / Terms / Privacy", "Placeholders — confirm scope + legal text."],
  ];

  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <SectionDecor />
        <div className="container-dt pt-24 pb-28">
          <Reveal>
            <div className="eyebrow !text-gold-300">
              {hi ? "ग्राहक समीक्षा" : "Client feedback"}
            </div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl">
              {hi ? "समीक्षा करें — क्या रखें, क्या हटाएँ।" : "Review — what to keep, what to change."}
            </h1>
            <p className="mt-6 max-w-2xl text-[15px] leading-8 text-white/65">
              {hi
                ? "लाइव साइट देखें, हर पृष्ठ जाँचें और नीचे हर बिंदु पर रखें / बदलें / हटाएँ लिखकर भेजें।"
                : "Open the live site, check every page, and reply Keep / Change / Remove against each point below."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="btn-gold-dt"
                href="https://dharmatribe.netlify.app/"
                target="_blank"
                rel="noreferrer"
              >
                {hi ? "लाइव साइट खोलें" : "Open live site"} <ArrowUpRight size={14} />
              </a>
              <a className="btn-ghost-dt !border-white/15 !bg-white/[.05] !text-white" href={waLink} target="_blank" rel="noreferrer">
                WhatsApp: {WHATSAPP_NUMBER} <ArrowUpRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <div className="container-dt grid gap-6 max-w-[960px]">
          <Block index={1} title={hi ? "समीक्षा बिंदु" : "Points to cover"}>
            <ul className="grid gap-2" style={{ listStyle: "disc", paddingLeft: 22 }}>
              {points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Block>

          <Block index={2} title={hi ? "व्हाट्सऐप नंबर" : "WhatsApp number — booking & inquiry"}>
            <p>
              {hi
                ? "बुकिंग और पूछताछ — दोनों के लिए एक ही नंबर है।"
                : "One centralized number for both booking and inquiry:"}{" "}
              <a className="font-bold text-gold-600 hover:underline" href={waLink} target="_blank" rel="noreferrer">
                {WHATSAPP_NUMBER}
              </a>
            </p>
            <div className="grid gap-2">
              {waRows.map(([a, b]) => (
                <div key={a} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-dt pb-2">
                  <span className="font-semibold text-ink sm:min-w-[280px]">{a}</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <p className="text-xs">
              {hi
                ? "यदि बुकिंग और पूछताछ अलग नंबरों पर जानी चाहिए, तो दोनों नंबर भेजें।"
                : "If booking and inquiry should go to different numbers, please share both."}
            </p>
          </Block>

          <Block index={3} title={hi ? "होम पेज — अनुभाग" : "Home page — sections"}>
            <div className="grid gap-2">
              {homeSections.map(([a, b]) => (
                <div key={a} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-dt pb-2">
                  <span className="font-semibold text-ink sm:min-w-[280px]">{a}</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Block>

          <Block index={4} title={hi ? "पूजा सूची और विवरण" : "Pujas & their details"}>
            <div className="grid gap-2">
              {pujas.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-dt pb-2">
                  <span className="font-semibold text-ink sm:min-w-[280px]">
                    {hi && p.titleHi ? p.titleHi : p.title}{" "}
                    <span className="font-normal text-xs">({p.code})</span>
                  </span>
                  <span>
                    {p.deity} · {p.temple} · ₹{p.price.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <p className="font-semibold text-ink">
              {hi ? "हर पूजा के लिए भेजें (EN + HI):" : "Please provide per puja (EN + HI):"}
            </p>
            <ul className="grid gap-1" style={{ listStyle: "disc", paddingLeft: 22 }}>
              <li>Short description (1–2 lines)</li>
              <li>Duration, auspicious days / timings</li>
              <li>What is included (priest, samagri, video, prasad)</li>
              <li>What the devotee must keep ready</li>
              <li>4 FAQs with answers</li>
              <li>2–3 photos of the actual ritual / temple</li>
            </ul>
          </Block>

          <Block index={5} title={hi ? "आचार्य" : "Acharyas"}>
            <div className="grid gap-2">
              {acharyas.map((a) => (
                <div key={a.id} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-dt pb-2">
                  <span className="font-semibold text-ink sm:min-w-[200px]">{a.name}</span>
                  <span>
                    {hi && a.traditionHi ? a.traditionHi : a.tradition}
                    {a.phone ? ` · ${a.phone}` : ""}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs">Confirm bios, publicly shown phone numbers, and photo consent.</p>
          </Block>

          <Block index={6} title={hi ? "अन्य पृष्ठ" : "Other pages"}>
            <div className="grid gap-2">
              {otherPages.map(([a, b]) => (
                <div key={a} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-dt pb-2">
                  <span className="font-semibold text-ink sm:min-w-[200px]">{a}</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Block>

          <Block index={7} title={hi ? "शीर्षक — अंग्रेज़ी / हिन्दी" : "Headings — English / Hindi"}>
            <div className="grid gap-2">
              {headings.map(([en, h]) => (
                <div key={en} className="flex flex-col sm:flex-row gap-1 sm:gap-4 border-b border-dt pb-2">
                  <span className="sm:min-w-[280px]">{en}</span>
                  <span className="font-semibold text-ink">{h}</span>
                </div>
              ))}
            </div>
            <p className="text-xs">Please proofread the Hindi column (tone: formal vs warm).</p>
          </Block>

          <Block index={8} title={hi ? "तस्वीरें" : "Images"}>
            <p>
              Home hero uses random `picsum` placeholders (not real photos) — highest priority
              replacement. Several puja/story cards reuse the same Unsplash photo (Shraadh =
              Satyanarayan). Acharya photos are real local files. ✅
            </p>
            <p>
              Minimum real photography needed: 2 hero images, 9 puja cards. Festival, story and
              About-gallery images can follow.
            </p>
            <Link className="btn-ghost-dt mt-2 self-start" to="/pujas">
              {hi ? "पूजा सूची देखें" : "View puja catalogue"} <ArrowUpRight size={14} />
            </Link>
          </Block>

          <Reveal>
            <div className="rounded-[18px] border border-dt p-5 text-xs leading-6 text-muted-dt">
              <strong className="text-ink">Note:</strong> for now the wishlist only works locally
              and saved on browser only.
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
