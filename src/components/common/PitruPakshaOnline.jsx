import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { useLanguage } from "./LanguageToggle";
import { SectionDecor } from "./decor";
import FaqAccordion from "./FaqAccordion";
import { pujas as defaultPujas } from "../../lib/data";
import { useLivePujas } from "../../lib/cms";
import { buildInquiryHref } from "../../lib/booking";
import { WHATSAPP_NUMBER } from "../../lib/site";

/* ------------------------------------------------------------------ *
 * PitruPakshaOnline
 * Pitru Paksha online Shradh pooja marketing content for the Shraadh
 * puja detail page (/pujas/shraadh). Rendered above the cultural essay
 * (ShraadhContent). English copy as approved; shown in both languages.
 * ------------------------------------------------------------------ */
export default function PitruPakshaOnline() {
  const { lang } = useLanguage();
  const { items: pujas } = useLivePujas();
  const shraadhPuja = pujas.find((x) => x.id === "shraadh") || defaultPujas[0];
  const inquiryHref = buildInquiryHref(shraadhPuja, lang);
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}`;

  const included = [
    ["1. YOUR ANCESTRAL DETAILS & SANKALP", "Share the required details of the person or ancestors for whom the ritual is being performed. Our team helps you understand what information is required and assists you in preparing the Sankalp."],
    ["2. TITHI GUIDANCE", "Pitru Paksha rituals are traditionally performed according to the appropriate lunar Tithi. Based on the details you provide, our team helps identify the relevant Tithi and the appropriate ritual date."],
    ["3. VEDIC RITUAL BY AN ACHARYA", "The Shradh / Pitru ritual is performed by an experienced Vedic Acharya according to the prescribed traditional process. The Acharya performs the necessary Sankalp, offerings, prayers and associated rituals applicable to the selected service."],
    ["4. LIVE PARTICIPATION", "You don't have to simply \u201cbook a pooja\u201d. You can participate. A secure online link allows you and your family to join the ceremony remotely and be part of the Sankalp and ritual from wherever you are."],
    ["5. YOUR FAMILY'S SANKALP", "The ritual is performed with the Sankalp made for your family and the ancestors named by you. Where applicable, you may also participate in specific portions of the ritual as guided by the Acharya."],
    ["6. RECORD OF THE CEREMONY", "A recording or other appropriate confirmation of the completed ritual is shared with you after the ceremony, subject to the service selected."],
  ];

  const steps = [
    ["STEP 1 \u2014 BOOK YOUR POOJA", "Select the Pitru Paksha Shradh service and your preferred available date/time."],
    ["STEP 2 \u2014 SHARE YOUR DETAILS", "Provide the details required for the Sankalp and ritual, including the relevant ancestral information."],
    ["STEP 3 \u2014 WE CONFIRM YOUR TITHI", "Our team reviews your details and confirms the applicable ritual date and other information required for the ceremony."],
    ["STEP 4 \u2014 JOIN YOUR POOJA ONLINE", "You receive the joining details before the scheduled ceremony. Join with your family from your home, wherever you are in the world."],
    ["STEP 5 \u2014 THE ACHARYA PERFORMS THE RITUAL", "The prescribed ritual is conducted traditionally, with your family's Sankalp and ancestral details incorporated into the ceremony."],
    ["STEP 6 \u2014 COMPLETE YOUR SANKALP", "Participate as guided by the Acharya and complete the portions of the ritual that require your participation."],
    ["STEP 7 \u2014 RECEIVE CONFIRMATION", "After the ceremony, you receive the applicable recording, photographs or ritual confirmation included with your service."],
  ];

  const forWhom = [
    ["FOR FAMILIES LIVING ABROAD", "Unable to travel to India during Pitru Paksha? Participate from wherever you are."],
    ["FOR FAMILIES LIVING AWAY FROM THEIR HOMETOWN", "Your ancestral home may be hundreds of kilometres away. Your responsibilities don't have to be."],
    ["FOR THOSE WHO CANNOT FIND A TRUSTED ACHARYA", "Dharmaa Tribe helps connect families with experienced practitioners for traditional rituals."],
    ["FOR FAMILIES WHO WANT TO PARTICIPATE TOGETHER", "Children, siblings and relatives living in different cities or countries can join the same ceremony online."],
  ];

  const faqs = [
    { q: "What is Pitru Paksha?", a: "Pitru Paksha is a traditional period dedicated to remembering and honouring one's ancestors through rituals, offerings, prayers and acts of remembrance. The specific practices and customs followed can vary according to family tradition and regional practice." },
    { q: "What is Shradh?", a: "Shradh refers broadly to traditional Hindu rites performed in remembrance and honour of departed ancestors. The form of the ritual can vary according to the person's circumstances, family tradition, regional customs and the prescribed Tithi." },
    { q: "How do I know the correct Shradh date?", a: "Pitru Paksha rituals are generally associated with the lunar Tithi corresponding to the ancestor's death date. If you don't know the correct Tithi or are uncertain about which date applies, share the available details with us. Our team can guide you regarding the information required." },
    { q: "What if I don't know the exact date of death?", a: "Don't worry. Share whatever information you have with our team. Depending on the circumstances and your family tradition, an appropriate course of action may be suggested by the Acharya." },
    { q: "Do I have to be in India?", a: "No. You can participate from anywhere with a reliable internet connection." },
    { q: "Do I have to travel to the temple?", a: "No. For this online service, the physical ritual is conducted by the designated Acharya at the specified location while you participate remotely." },
    { q: "Can my family members join from different countries?", a: "Yes, provided they have access to the online joining link. This can be particularly useful when family members live in different cities or countries." },
    { q: "Do I have to perform anything myself?", a: "The Acharya will guide you regarding any part of the Sankalp or ritual that requires your participation. You will be informed beforehand if you need to keep anything ready." },
    { q: "What details do I need to provide?", a: "Typically, information may include: your name; family details required for the Sankalp; name of the ancestor(s); relationship with the ancestor; relevant date/Tithi information, if known; contact details; and other information specifically required for the selected ritual. Our team will tell you exactly what is required after booking." },
    { q: "Can I book for more than one ancestor?", a: "This depends on the specific Shradh service selected. If you wish to perform rituals for multiple ancestors, please contact us before booking so that we can guide you appropriately." },
    { q: "Will the pooja be performed by a real Acharya?", a: "Yes. Dharmaa Tribe's model is based on connecting devotees with real practitioners and Acharyas who conduct the physical rituals. The online component enables communication and participation. It does not replace the physical performance of the ritual." },
    { q: "Will I receive photographs or a recording?", a: "Where included in your selected service, photographs and/or a recording of the ceremony will be shared with you after the ritual. The exact deliverables are mentioned on the booking page for each service." },
    { q: "Can I speak to the Acharya?", a: "Where applicable, you may interact with the Acharya during the ceremony or through the process arranged for your selected service. For specific questions about your family's ritual requirements, our team can guide you on the appropriate channel." },
    { q: "What if I have a question about my family's tradition?", a: "We understand that Sanatan traditions are diverse. Different families and regions may follow different customs. Dharmaa Tribe does not seek to impose one uniform ritual on every family. Where a question requires an Acharya's guidance, we will help route it appropriately." },
  ];

  const different = [
    ["AUTHENTICITY OVER AUTOMATION", "We believe sacred rituals should never become just another transaction. Technology should make access easier \u2014 not make the ritual impersonal."],
    ["TRANSPARENCY", "You should know what you are booking, who is performing it, how you participate and what you receive afterwards."],
    ["TRADITION WITH CONTEMPORARY ACCESS", "We respect traditional practices while using technology to serve families living in a modern, connected world."],
    ["PARTICIPATION, NOT JUST BOOKING", "Our purpose is not simply to arrange a ritual on your behalf. Where possible, we want you and your family to understand, witness and participate in the ritual."],
    ["TRUST", "A sacred ritual begins with trust. That is why we aim to build relationships with knowledgeable and experienced Acharyas and communicate the process clearly to devotees."],
  ];

  const vision = [
    ["\uD83E\uDE94 AUTHENTIC ONLINE POOJA", "Traditional rituals conducted by experienced Acharyas, accessible to families across India and the world."],
    ["\uD83D\uDCDA VEDIC KNOWLEDGE & LEARNING", "Accessible learning experiences around Vedic literature, philosophy, traditions and practices."],
    ["\uD83D\uDE55 SPIRITUAL JOURNEYS", "Thoughtfully curated journeys to sacred places, temples and centres of Sanatan knowledge."],
    ["\u0950\uFE0F FESTIVAL & RITUAL GUIDANCE", "Helping families understand what a festival or ritual means, when it is observed and how it may traditionally be performed."],
    ["\uD83C\uDF3F A COMMUNITY AROUND DHARMA", "A space where tradition can be understood, practised and passed on \u2014 particularly across generations and across borders."],
  ];

  return (
    <section className="site-section has-decor-dt shraadh-page-dt">
      <SectionDecor />
      <div className="container-dt py-12">
        {/* Hero */}
        <div className="shraadh-section-dt">
          <span className="shraadh-section-num-dt">Pitru Paksha Online Shradh Pooja</span>
          <h2 className="display-dt text-5xl sm:text-6xl">Honour Your Ancestors. Fulfil Your Sankalp. Preserve the Tradition.</h2>
          <div className="shraadh-section-body-dt mt-6">
            <p>Distance should never come between you and your duties towards your ancestors.</p>
            <p>This Pitru Paksha, perform your Shradh and Pitru Tarpan with authentic Vedic rituals, conducted by experienced Acharyas in accordance with traditional practices \u2014 while you and your family participate from wherever you are in the world.</p>
            <p>Dharmaa Tribe brings the ritual to you, without taking away its sanctity.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="btn-gold-dt" to="/booking/shraadh/date">
              Book your Pitru Paksha Pooja <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        {/* Distance */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">This Pitru Paksha, don\u2019t let distance come in the way</h3>
          <div className="shraadh-section-body-dt">
            <p>For many families living away from their ancestral home, travelling to a particular place or finding a trusted priest at the right time and according to the appropriate Tithi can be difficult.</p>
            <p>Dharmaa Tribe makes it possible to fulfil your ancestral rituals remotely, while keeping the traditional process at the centre.</p>
            <p>Your Puja is performed by an experienced Vedic Acharya.</p>
            <p>Your Sankalp is made in the name of your family and ancestors.</p>
            <p>You can participate live from anywhere in the world.</p>
            <p>And after the ritual, you receive a record of the sacred ceremony performed on your behalf.</p>
            <p><strong>Tradition remains. Only the distance disappears.</strong></p>
          </div>
        </div>

        {/* What is included */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">What is included?</h3>
          <div className="shraadh-section-body-dt">
            <p>Your Pitru Paksha Shradh service is designed to make the entire process simple, transparent and meaningful.</p>
          </div>
          <div className="shraadh-three-grid-dt">
            {included.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">How does an online Shradh work?</h3>
          <div className="shraadh-section-body-dt">
            <p>It\u2019s simpler than you think.</p>
          </div>
          <div className="shraadh-journey-dt">
            {steps.map(([title, body], i) => (
              <div key={title} className="shraadh-journey-item-dt">
                <span className="shraadh-journey-num-dt">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="shraadh-journey-title-dt">{title}</div>
                  <div className="shraadh-journey-body-dt">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validity */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">But is an online pooja really valid?</h3>
          <div className="shraadh-section-body-dt">
            <p>This is one of the first questions many families ask.</p>
            <p>An online service does not mean an automated or virtual ritual.</p>
            <p>The physical ritual is performed by the Acharya at the designated place of worship. Your family\u2019s Sankalp and relevant details are incorporated into that ritual, while technology allows you to participate remotely.</p>
            <p>Think of it as remote participation in a physical Vedic ritual \u2014 not a virtual substitute for one.</p>
            <p>The exact ritual procedure can vary according to the tradition, family practice, location and service selected. Our Acharya guides you accordingly.</p>
          </div>
        </div>

        {/* What do I need */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">What do I need to do?</h3>
          <div className="shraadh-section-body-dt">
            <p>You don\u2019t need to become an expert in Vedic rituals.</p>
            <p>Before the ceremony, we tell you:</p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, marginTop: 8 }}>
              <li style={{ marginBottom: 4 }}>What information to provide</li>
              <li style={{ marginBottom: 4 }}>What you need to keep ready at home, if anything</li>
              <li style={{ marginBottom: 4 }}>When and how to join</li>
              <li style={{ marginBottom: 4 }}>How to participate during the Sankalp</li>
              <li style={{ marginBottom: 4 }}>What the Acharya will guide you through</li>
            </ul>
            <p style={{ marginTop: 12 }}>You simply need to be present with sincerity and attention.</p>
            <p><strong>We take care of the ritual. You take care of your Sankalp.</strong></p>
          </div>
        </div>

        {/* Who can perform */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">Who can perform this Shradh?</h3>
          <div className="shraadh-section-body-dt">
            <p>The service can be booked by families who wish to perform ancestral rituals for:</p>
            <ul style={{ listStyle: "disc", paddingLeft: 22, marginTop: 8 }}>
              <li style={{ marginBottom: 4 }}>Father</li>
              <li style={{ marginBottom: 4 }}>Mother</li>
              <li style={{ marginBottom: 4 }}>Grandparents</li>
              <li style={{ marginBottom: 4 }}>Great-grandparents</li>
              <li style={{ marginBottom: 4 }}>Other departed family members</li>
            </ul>
            <p style={{ marginTop: 12 }}>The appropriate ritual and requirements can differ depending on the family circumstances and tradition.</p>
            <p>If you are unsure which ritual is appropriate, speak to our team before booking.</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={inquiryHref} target="_blank" rel="noreferrer" className="btn-ghost-dt">
              I\u2019m not sure which pooja I need <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Who is this for */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">Who is this service for?</h3>
          <div className="shraadh-three-grid-dt">
            {forWhom.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">Frequently asked questions</h3>
          <div style={{ marginTop: 16 }}>
            <FaqAccordion items={faqs} />
          </div>
        </div>

        {/* What makes different */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">What makes Dharmaa Tribe different?</h3>
          <div className="shraadh-three-grid-dt">
            {different.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div className="shraadh-section-dt">
          <span className="shraadh-section-num-dt">More than an online pooja</span>
          <h3 className="shraadh-section-title-dt">Dharmaa Tribe</h3>
          <div className="shraadh-section-body-dt">
            <p>Ancient wisdom. Relevant for life.</p>
            <p>Dharmaa Tribe is being created as a contemporary platform for people who wish to stay connected with Sanatan traditions, knowledge and practices \u2014 wherever they live.</p>
            <p>Online pooja is only the beginning. Our vision extends across:</p>
          </div>
          <div className="shraadh-three-grid-dt">
            {vision.map(([title, body]) => (
              <div key={title} className="shraadh-card-dt">
                <div className="shraadh-card-title-dt">{title}</div>
                <div className="shraadh-card-body-dt">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Belief */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">Our belief</h3>
          <div className="shraadh-section-body-dt">
            <p>For generations, Sanatan traditions have been carried forward through families, teachers, temples and communities.</p>
            <p>But the world has changed.</p>
            <p>Families now live across cities, countries and continents.</p>
            <p>Children grow up far from their ancestral homes.</p>
            <p>Time zones separate siblings.</p>
            <p>And traditional knowledge is not always easy to access.</p>
            <p>We believe technology can help bridge that distance \u2014 without diluting the wisdom it carries.</p>
            <p>That is the space Dharmaa Tribe hopes to occupy.</p>
            <p>Not replacing tradition.</p>
            <p><strong>Making tradition accessible.</strong></p>
          </div>
        </div>

        {/* Closing CTA */}
        <div className="shraadh-cta-band-dt">
          <div className="shraadh-cta-title-dt">This Pitru Paksha, remember.</div>
          <div className="shraadh-cta-body-dt">
            The people who came before us are part of the story we continue to live.
            <br />
            Perform your Shradh with sincerity. Make your Sankalp. Honour your ancestors. Wherever you are.
            <br />
            <em>Dharmaa Tribe \u2014 Rooted in wisdom. Relevant for life. Together we rise.</em>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="btn-gold-dt" to="/booking/shraadh/date">
              Book your Pitru Paksha Pooja <ArrowUpRight size={14} />
            </Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-ghost-dt">
              Speak to us on WhatsApp <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="shraadh-section-dt">
          <h3 className="shraadh-section-title-dt">Important information</h3>
          <div className="shraadh-section-body-dt">
            <p>The rituals offered through Dharmaa Tribe are based on traditional Hindu practices. Specific procedures, eligibility, dates, mantras and ritual requirements may vary according to family tradition, regional customs, the nature of the ritual and the guidance of the performing Acharya.</p>
            <p>Dharmaa Tribe facilitates access, coordination and participation in the selected service. It does not claim that one ritual procedure is universally applicable to every Hindu tradition or family.</p>
            <p>For questions regarding a specific family circumstance or ritual requirement, please contact our team before booking.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
