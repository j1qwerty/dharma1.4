import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarBlank,
  Clock,
  MapPin,
  ShieldCheck,
  VideoCamera,
  CheckCircle,
} from "@phosphor-icons/react";
import { pujas, stories } from "../lib/data";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import SectionHeading from "../components/common/SectionHeading";
import SectionCurve from "../components/common/SectionCurve";
import { LeafBranch, LotusLine, DiyaCluster, Kalash } from "../components/common/Decor";
import FavToggle from "../components/common/FavToggle";
import { useToast } from "../components/common/Toast";
import FaqAccordion from "../components/common/FaqAccordion";
import { GalleryTile } from "../components/common/Lightbox";

export default function PujaDetail() {
  const { id } = useParams();
  const p = pujas.find((x) => x.id === id) || pujas[0];
  const toast = useToast();
  const galleryImages = [
    { src: p.image, alt: `${p.title} ritual moment` },
    { src: stories[1].image, alt: "Ritual moment" },
    { src: stories[2].image, alt: "Ritual moment" },
    { src: stories[3].image, alt: "Ritual moment" },
  ];
  return (
    <>
      <section className="detail-hero-dt has-decor-dt">
        <div className="detail-hero-media-dt">
          <ParallaxImage src={p.image} alt={p.title} className="h-full w-full" strength={28} />
        </div>
        <div className="container-dt detail-hero-content-dt pb-16">
          <Reveal>
            <div className="eyebrow !text-gold-300">{p.tag}</div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl lg:text-[76px]">
              {p.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">{p.desc}</p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-white/55">
              <span className="inline-flex items-center gap-2">
                <CalendarBlank size={14} /> {p.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock size={14} /> {p.time}
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} /> {p.temple}
              </span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 items-center">
              <Link className="btn-gold-dt" to={`/booking/${p.id}/date`}>
                Proceed to booking <ArrowRight size={15} />
              </Link>
              <FavToggle
                id={p.id}
                title={p.title}
                variant="photo"
                size={17}
                className="!w-11 !h-11"
              />
              <button
                className="btn-ghost-dt !border-white/20 !bg-white/10 !text-white"
                onClick={() =>
                  toast.push({
                    type: "info",
                    title: "Link copied",
                    desc: "Share this puja with your family.",
                  })
                }
              >
                Share <ArrowUpRight size={14} />
              </button>
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>
      <section className="site-section has-decor-dt">
        <DiyaCluster className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] items-start">
            <Reveal>
              <div>
                <div className="eyebrow">About the puja</div>
                <h2 className="display-dt mt-3 text-5xl">
                  A ritual with a clear place in the journey.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-8 muted-dt">
                  This detail page keeps significance, process, temple context and booking
                  information close together. Devotees can understand the ritual before choosing a
                  package.
                </p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Ritual duration", "1 to 2 hours"],
                    ["Temple", "" + p.temple],
                    ["Priest", "Verified acharya network"],
                    ["Delivery", "Video in 24 to 48 hours"],
                  ].map(([a, b]) => (
                    <div className="panel-dt p-5" key={a}>
                      <div className="text-[10px] uppercase tracking-[.15em] text-gold-600">
                        {a}
                      </div>
                      <div className="mt-2 text-sm font-semibold">{b}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal>
              <div className="panel-dt p-6 puja-booking-widget-dt">
                <div className="flex items-center gap-2 text-gold-600">
                  <ShieldCheck size={16} />
                  <span className="text-xs font-semibold">Book with confidence</span>
                </div>
                <div className="mt-5 text-sm muted-dt">Starting from</div>
                <div className="mt-1 display-dt text-5xl puja-price-dt">
                  ₹{p.price.toLocaleString("en-IN")}
                </div>
                <div className="mt-1 text-[11px] muted-dt">
                  inclusive of priest, materials and delivery
                </div>

                <div className="mt-5 rounded-xl border border-dt overflow-hidden puja-breakdown-dt">
                  <div className="flex items-center justify-between px-4 py-2.5 text-[11px]">
                    <span className="muted-dt">Puja seva</span>
                    <span className="font-semibold">
                      ₹{Math.round(p.price * 0.7).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 text-[11px] border-t border-dt">
                    <span className="muted-dt">Materials & dakshina</span>
                    <span className="font-semibold">
                      ₹{Math.round(p.price * 0.22).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2.5 text-[11px] border-t border-dt">
                    <span className="muted-dt">Video & delivery</span>
                    <span className="font-semibold">
                      ₹{Math.round(p.price * 0.08).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid gap-2">
                  {[
                    "Personalized Sankalp",
                    "Temple and priest context",
                    "Photo / video delivery",
                  ].map((x) => (
                    <div key={x} className="flex items-center gap-2 text-xs">
                      <CheckCircle size={14} className="text-gold-600" weight="fill" />
                      {x}
                    </div>
                  ))}
                </div>
                <Link className="btn-gold-dt mt-7 w-full" to={`/booking/${p.id}/date`}>
                  Choose your date <ArrowRight size={14} />
                </Link>
                <p className="mt-3 text-center text-[10px] muted-dt">
                  No charge until you confirm. Free reschedule once.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="site-section surface-2-dt">
        <div className="container-dt">
          <SectionHeading
            title="What you receive"
            copy="Deliverables are explicit so the customer knows what remains after the puja is performed."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [VideoCamera, "Video", "Recorded ceremony available in the account."],
              [ShieldCheck, "Sankalp", "Personalized details included in the ritual."],
              [CalendarBlank, "Updates", "Booking and ritual status from start to finish."],
            ].map(([Icon, a, b], i) => (
              <Reveal key={a} delay={i * 0.05}>
                <div className="panel-dt p-6">
                  <Icon size={22} className="text-gold-600" />
                  <h3 className="mt-5 text-3xl">{a}</h3>
                  <p className="mt-2 text-xs leading-6 muted-dt">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="site-section has-decor-dt">
        <Kalash className="decor-dt decor-br hide-mobile soft-tone" />
        <div className="container-dt">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] items-start">
            <Reveal>
              <h2 className="display-dt text-5xl">Puja vidhi and Sankalp</h2>
            </Reveal>
            <Reveal>
              <div className="grid gap-5 text-sm leading-8 muted-dt">
                <p>
                  The booking can collect the name, gotra, family members, rashi, nakshatra and
                  purpose when the ritual needs them. Helpers should explain what each field means
                  without forcing the user to know everything in advance.
                </p>
                <p>
                  For the prototype, every package shares the same core information architecture. A
                  future CMS can vary the exact fields and ritual steps per puja.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="site-section surface-2-dt">
        <div className="container-dt">
          <SectionHeading
            title="Past ritual moments"
            copy="Tap any image to open the gallery. A mixed image set gives the detail page a visual sense of the ceremony without turning it into a photo grid."
          />
          <div className="grid gap-4 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <GalleryTile
                images={galleryImages}
                startIdx={0}
                className="block rounded-[20px] overflow-hidden"
              >
                <ParallaxImage
                  src={p.image}
                  alt="Ritual moment"
                  className="aspect-[16/10] rounded-[20px]"
                  strength={14}
                />
              </GalleryTile>
            </Reveal>
            <Reveal className="md:col-span-5">
              <div className="grid gap-4">
                <GalleryTile
                  images={galleryImages}
                  startIdx={1}
                  className="block rounded-[20px] overflow-hidden"
                >
                  <ParallaxImage
                    src={stories[1].image}
                    alt="Ritual moment"
                    className="aspect-[4/3] rounded-[20px]"
                    strength={12}
                  />
                </GalleryTile>
                <GalleryTile
                  images={galleryImages}
                  startIdx={2}
                  className="block rounded-[20px] overflow-hidden"
                >
                  <ParallaxImage
                    src={stories[2].image}
                    alt="Ritual moment"
                    className="aspect-[4/3] rounded-[20px]"
                    strength={12}
                  />
                </GalleryTile>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <section className="site-section">
        <div className="container-dt">
          <SectionHeading title="Questions devotees ask" />
          <FaqAccordion
            items={[
              {
                q: "Do I need to know my gotra?",
                a: "Not always. You can choose 'I do not know' on the Sankalp step and the priest will use a general gotra during the ritual. The booking still proceeds normally.",
              },
              {
                q: "When do photos and video arrive?",
                a: "Recorded ceremony photos and video are delivered to your account within 24 to 48 hours after the puja is performed. You will receive a notification when they are ready.",
              },
              {
                q: "Can my family join the Sankalp?",
                a: "Yes. The Sankalp step lets you add up to four family members on the Family package. Their names are included in the ritual intention alongside yours.",
              },
              {
                q: "What happens if I miss the live ritual?",
                a: "Nothing is lost. The recorded ceremony stays in your account under My Blessings, and you can revisit the Sankalp and video at any time afterwards.",
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
