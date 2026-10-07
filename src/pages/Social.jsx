import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FacebookLogo, InstagramLogo, YoutubeLogo, Play } from "@phosphor-icons/react";
import SectionHeading from "../components/common/SectionHeading";
import SectionCurve from "../components/common/SectionCurve";
import { Reveal, ParallaxImage } from "../components/common/Motion";
import { SectionDecor, LeafBranch, LotusLine } from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";
import { SOCIAL_POSTS, SOCIAL_SEO, YOUTUBE_CHANNEL_URL, FACEBOOK_URL, INSTAGRAM_URL } from "../lib/social";

function platformIcon(p) {
  if (p === "youtube") return YoutubeLogo;
  if (p === "facebook") return FacebookLogo;
  return InstagramLogo;
}

export default function Social() {
  const { lang } = useLanguage();
  const hi = lang === "hi";
  const yt = SOCIAL_POSTS.filter((p) => p.platform === "youtube");
  const fb = SOCIAL_POSTS.filter((p) => p.platform === "facebook");
  const ig = SOCIAL_POSTS.filter((p) => p.platform === "instagram");

  useEffect(() => {
    document.title = SOCIAL_SEO.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", SOCIAL_SEO.description);
    let kw = document.querySelector('meta[name="keywords"]');
    if (!kw) {
      kw = document.createElement("meta");
      kw.setAttribute("name", "keywords");
      document.head.appendChild(kw);
    }
    kw.setAttribute("content", SOCIAL_SEO.keywords.join(", "));
    const ldId = "social-ld-json";
    let ld = document.getElementById(ldId);
    if (!ld) {
      ld = document.createElement("script");
      ld.id = ldId;
      ld.type = "application/ld+json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: SOCIAL_SEO.title,
      description: SOCIAL_SEO.description,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: SOCIAL_POSTS.map((p, i) => ({
          "@type": "VideoObject",
          position: i + 1,
          name: p.title,
          description: p.desc,
          thumbnailUrl: p.thumbnail,
          contentUrl: p.url,
          keywords: (p.keywords || []).join(", "),
        })),
      },
    });
  }, []);

  return (
    <>
      <section className="ink-dt overflow-hidden has-decor-dt relative">
        <SectionDecor />
        <div className="container-dt grid min-h-[420px] items-end gap-10 py-20 pt-24 pb-32 lg:grid-cols-[1fr_.8fr]">
          <Reveal>
            <div className="eyebrow !text-gold-300">{hi ? "सोशल" : "Social"}</div>
            <h1 className="display-dt mt-3 max-w-4xl text-6xl sm:text-7xl">
              {hi ? "धर्मा ट्राइब की झलक सोशल पर।" : "Dharmaa Tribe in motion."}
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">
              {hi
                ? "नवरात्रि शॉर्ट्स, दुर्गा पूजा की झलक और भक्ति रील्स। यूट्यूब यहीं चलेगा, फेसबुक और इंस्टाग्राम ऐप में खुलेगा।"
                : "Navratri Shorts, Durga Puja glimpses and devotional reels from YouTube, Facebook and Instagram. YouTube plays inline. Facebook and Instagram open in their apps."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a className="btn-gold-dt" href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">
                <YoutubeLogo size={15} /> {hi ? "यूट्यूब चैनल" : "YouTube channel"} <ArrowUpRight size={14} />
              </a>
              <a className="btn-ghost-dt !border-white/20 !bg-white/10 !text-white" href={FACEBOOK_URL} target="_blank" rel="noreferrer">
                <FacebookLogo size={15} /> Facebook
              </a>
              <a className="btn-ghost-dt !border-white/20 !bg-white/10 !text-white" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                <InstagramLogo size={15} /> Instagram
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="overflow-hidden rounded-[24px]">
              <ParallaxImage
                src="https://picsum.photos/seed/dharma-social-hero/1000/800"
                alt="Dharmaa Tribe social feed"
                className="h-[300px] w-full lg:h-[380px]"
                strength={25}
              />
            </div>
          </Reveal>
        </div>
        <SectionCurve edge="bottom" />
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <LotusLine className="decor-dt decor-tr hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title={hi ? "यूट्यूब शॉर्ट्स" : "YouTube Shorts"}
            copy={
              hi
                ? "धर्मा ट्राइब के नवरात्रि शॉर्ट्स यहीं देखें। पूरा चैनल खोलने के लिए नीचे बटन है।"
                : "Navratri Shorts from the Dharmaa Tribe channel, playing inline. Titles verified via YouTube oEmbed."
            }
            action={{ label: hi ? "पूरा चैनल खोलें" : "Open full channel", to: YOUTUBE_CHANNEL_URL, external: true }}
            soft
          />
          <div className="grid gap-5 md:grid-cols-3">
            {yt.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <article className="panel-dt overflow-hidden">
                  <div className="aspect-video bg-black">
                    <iframe
                      src={`https://www.youtube.com/embed/${p.videoId}`}
                      title={p.title}
                      className="h-full w-full"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-gold-600">
                      <YoutubeLogo size={14} /> YouTube · {p.type}
                    </div>
                    <h3 className="mt-2 text-2xl leading-tight display-dt">{hi && p.titleHi ? p.titleHi : p.title}</h3>
                    <p className="mt-2 text-xs leading-6 muted-dt">{hi && p.descHi ? p.descHi : p.desc}</p>
                    <p className="mt-2 text-[10px] muted-dt">Keywords: {(p.keywords || []).slice(0, 4).join(", ")}</p>
                    <a href={p.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-gold-600">
                      {hi ? "यूट्यूब पर खोलें" : "Open on YouTube"} <ArrowUpRight size={13} />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section surface-2-dt has-decor-dt">
        <SectionDecor />
        <LeafBranch className="decor-dt decor-tl hide-mobile soft-tone" />
        <div className="container-dt">
          <SectionHeading
            title={hi ? "फेसबुक वीडियो" : "Facebook videos"}
            copy={
              hi
                ? "फेसबुक लॉगिन वॉल के कारण ये कार्ड बाहरी लिंक के रूप में खुलते हैं।"
                : "Facebook share links open externally because the Facebook video pages need login. Three videos from the submitted set."
            }
          />
          <div className="grid gap-5 md:grid-cols-3 items-stretch">
            {fb.map((p, i) => {
              const Icon = platformIcon(p.platform);
              return (
                <Reveal key={p.id} delay={i * 0.05} className="h-full">
                  <article className="card-dt flex h-full flex-col overflow-hidden">
                    <div className="h-[440px] w-full bg-black">
                      <iframe
                        src={p.embed}
                        title={p.title}
                        className="h-full w-full border-0"
                        loading="lazy"
                        scrolling="no"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-gold-600">
                        <Icon size={14} /> Facebook · {p.type}
                      </div>
                      <h3 className="mt-2 text-2xl leading-tight display-dt">{hi && p.titleHi ? p.titleHi : p.title}</h3>
                      <p className="mt-2 text-xs leading-6 muted-dt line-clamp-3">{hi && p.descHi ? p.descHi : p.desc}</p>
                      <p className="mt-2 text-[10px] muted-dt">Keywords: {(p.keywords || []).slice(0, 4).join(", ")}</p>
                      <a href={p.url} target="_blank" rel="noreferrer" className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[11px] font-bold text-gold-600">
                        <Play size={12} weight="fill" /> {hi ? "फेसबुक पर खोलें" : "Open on Facebook"} <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="site-section has-decor-dt">
        <SectionDecor />
        <div className="container-dt">
          <SectionHeading
            title={hi ? "इंस्टाग्राम रील" : "Instagram reel"}
            copy={
              hi
                ? "रील इंस्टाग्राम ऐप में खुलेगी।"
                : "One reel from the submitted set. Opens in Instagram."
            }
            action={{ label: hi ? "प्रोफाइल खोलें" : "Open Instagram", to: INSTAGRAM_URL, external: true }}
          />
          <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr] items-stretch">
            {ig.map((p) => (
              <React.Fragment key={p.id}>
                <Reveal className="h-full">
                  <div className="card-dt h-full overflow-hidden">
                    <div className="h-[520px] w-full bg-black">
                      <iframe
                        src={p.embed}
                        title={p.title}
                        className="h-full w-full border-0"
                        loading="lazy"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="panel-dt p-6 sm:p-8 h-full">
                    <div className="text-[10px] font-bold uppercase tracking-[.15em] text-gold-600">About this reel</div>
                    <p className="mt-3 text-sm leading-7 muted-dt">{hi && p.descHi ? p.descHi : p.desc}</p>
                    <p className="mt-3 text-[11px] muted-dt">URL: {p.url}</p>
                    <p className="mt-2 text-[11px] muted-dt">Keywords: {(p.keywords || []).join(", ")}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link className="btn-gold-dt" to="/pujas/navratri">
                        {hi ? "नवरात्रि पूजा बुक करें" : "Book Navratri puja"} <ArrowUpRight size={14} />
                      </Link>
                      <Link className="btn-ghost-dt" to="/pujas">
                        {hi ? "सभी पूजाएँ" : "All pujas"}
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
