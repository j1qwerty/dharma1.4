// Central CMS registry — single source of truth for the admin.
// - Ordered admin nav (sidebar) + ordered homepage sections (mirrors Home.jsx top→bottom)
// - Per-collection field schemas (bilingual EN/HI), image rules derived from
//   existing public/ assets + render sizes, shared-content notes.
// - Festivals = full history; everything else = last-5 quick versions
//   (+ full history subcollection for audit).

export const ADMIN_NAV = [
  { key: "dashboard", label: "Dashboard", path: "/admin" },
  { key: "pujas", label: "Pujas", path: "/admin/pujas", collection: "pujas" },
  { key: "festivals", label: "Festivals + scheduling", path: "/admin/festivals", collection: "festivals" },
  { key: "homepage", label: "Homepage sections", path: "/admin/homepage", collection: "homepage_sections" },
  { key: "stories", label: "Stories", path: "/admin/stories", collection: "stories" },
  { key: "acharyas", label: "Acharyas", path: "/admin/acharyas", collection: "acharyas" },
  { key: "testimonials", label: "Testimonials", path: "/admin/testimonials", collection: "testimonials" },
  { key: "bookings", label: "Bookings", path: "/admin/bookings", collection: "bookings", readOnly: true },
  { key: "inquiries", label: "Inquiries", path: "/admin/inquiries", collection: "inquiries", readOnly: true },
  { key: "users", label: "Users", path: "/admin/users", collection: "users", readOnly: true },
  { key: "trash", label: "Trash (30 days)", path: "/admin/trash" },
  { key: "settings", label: "Settings", path: "/admin/settings" },
];

// Homepage section order — MUST match Home.jsx render order top→bottom.
// Homepage never duplicates puja/festival/story text: previews reference
// live docs by id (config.pujaIds / config.festivalId) + local limit/mode.
//
// Per-section field schema: each section declares its own editable fields
// so the admin form shows only relevant inputs (no more "same fields for
// every section"). When the public Home page loads, defaults are hardcoded
// in Home.jsx; the admin can override any field via the homepage_sections
// collection — Home reads the overrides in the background and applies them.
export const HOMEPAGE_SECTIONS = [
  {
    key: "announcementBar", label: "Announcement bar",
    desc: "Thin top strip above hero.",
    fields: [
      { key: "text", label: "Text (EN)", type: "textarea" },
      { key: "textHi", label: "Text (HI)", type: "textarea" },
      { key: "bgColor", label: "Background colour", type: "color", hint: "Default: var(--gold). Use any CSS colour." },
      { key: "textColor", label: "Text colour", type: "color" },
    ],
  },
  {
    key: "hero", label: "Hero carousel",
    desc: "2 slides, full-bleed 2000×1250. Titles via i18n + per-slide image.",
    fields: [
      { key: "title", label: "Slide 1 title (EN)" },
      { key: "titleHi", label: "Slide 1 title (HI)" },
      { key: "copy", label: "Slide 1 copy (EN)", type: "textarea" },
      { key: "copyHi", label: "Slide 1 copy (HI)", type: "textarea" },
      { key: "image", label: "Slide 1 image", type: "image" },
      { key: "title2", label: "Slide 2 title (EN)" },
      { key: "title2Hi", label: "Slide 2 title (HI)" },
      { key: "copy2", label: "Slide 2 copy (EN)", type: "textarea" },
      { key: "image2", label: "Slide 2 image", type: "image" },
    ],
  },
  {
    key: "assurance", label: "Assurance strip (01–04)",
    desc: "4 icons, no images.",
    fields: [
      { key: "title", label: "Section title (EN)" },
      { key: "titleHi", label: "Section title (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
    ],
  },
  {
    key: "countdown", label: "Festival countdown",
    desc: "Auto from festivals collection (soonest 2).",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
    ],
  },
  {
    key: "acharyasPreview", label: "Acharyas preview",
    desc: "Live preview of acharyas grid.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
    ],
  },
  {
    key: "upcomingPujas", label: "Dates people are booking",
    desc: "pujas.slice(0,6) via PujaCard.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
    ],
  },
  {
    key: "festivalStrip", label: "Marquee band",
    desc: "Festival names ticker, text only.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "bgColor", label: "Background colour", type: "color" },
      { key: "textColor", label: "Text colour", type: "color" },
    ],
  },
  {
    key: "festivalCalendar", label: "Calendar keeps moving",
    desc: "4 festivals, images h-[220px]/sm:h-[320px].",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
    ],
  },
  {
    key: "intentions", label: "Start with intention",
    desc: "Intentions list → /pujas filter.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
      { key: "items", label: "Intentions (comma-separated)", type: "list" },
    ],
  },
  {
    key: "howItWorks", label: "Ritual journey 01–04",
    desc: "Reuses hero visual, steps via i18n.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
    ],
  },
  {
    key: "trustBand", label: "Trust band",
    desc: "Stats 50+/200+/4.9 + devotee quote.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
      { key: "image", label: "Background image (optional)", type: "image" },
      { key: "bgColor", label: "Background colour", type: "color" },
    ],
  },
  {
    key: "storiesPreview", label: "Stories preview",
    desc: "stories.slice(0,6), images min-h-[210px].",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
    ],
  },
  {
    key: "socialFeed", label: "Wider feed",
    desc: "/more/*.png, first tile col-span-7.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "image", label: "Featured image (optional)", type: "image" },
    ],
  },
  {
    key: "recurringSeva", label: "Year-long recurring",
    desc: "Static i18n strings.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
    ],
  },
  {
    key: "templeNetwork", label: "Temple network",
    desc: "/temples/*, h-44/md:h-72.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
    ],
  },
  {
    key: "newsletter", label: "Newsletter",
    desc: "Email input only.",
    fields: [
      { key: "title", label: "Heading (EN)" },
      { key: "titleHi", label: "Heading (HI)" },
      { key: "copy", label: "Copy (EN)", type: "textarea" },
      { key: "bgColor", label: "Background colour", type: "color" },
    ],
  },
];

/** Look up the field schema for a single homepage section by its key. */
export function homepageSectionSchema(key) {
  return HOMEPAGE_SECTIONS.find((s) => s.key === key) || null;
}

// Recommended image rules, measured from current render sizes + public/ assets.
// Admin ImageField shows these as "Recommended" + enforces soft limits + crop hint.
export const IMAGE_RULES = {
  puja: { label: "Puja card", aspect: "4 / 3", recommended: "1200 × 900", min: "800 × 600", maxMB: 2, accept: "jpg, png, webp", note: "PujaCard aspect-[4/3]. Existing: public/puja/*.jpg." },
  festival: { label: "Festival calendar", aspect: "16 / 9", recommended: "1600 × 900", min: "1200 × 675", maxMB: 2, accept: "jpg, png, webp", note: "Calendar h-[220px]/sm:h-[320px] full-bleed. Existing: public/festivals/*.jpg." },
  story: { label: "Story cover", aspect: "16 / 9", recommended: "1200 × 675", min: "800 × 450", maxMB: 1.5, accept: "png, jpg, webp", note: "StoryMasonry min-h-[210px]. Existing: public/stories/*.png." },
  acharya: { label: "Acharya portrait", aspect: "3 / 4", recommended: "900 × 1200", min: "600 × 800", maxMB: 1.5, accept: "jpg, png, webp", note: "AcharyaCard portrait. Existing: /amitdiwedi.jpg, /mohitsharma.jpg, /chandrashekhar.jpg, /Acharya/Dr. rangnath.jpeg, /Acharya/omkar nath Tiwari.jpeg, /Acharya/Prem Narayan Tripathi.jpeg, /Acharya/Dileep Pandey.jpeg." },
  hero: { label: "Homepage hero", aspect: "8 / 5", recommended: "2000 × 1250", min: "1600 × 1000", maxMB: 3, accept: "jpg, webp", note: "Full-bleed ParallaxImage + Ken Burns. Keep subject centred for crop." },
  temple: { label: "Temple network", aspect: "3 / 2", recommended: "1200 × 800", min: "800 × 533", maxMB: 2, accept: "webp, jpg, png", note: "h-44/md:h-72. Existing: public/temples/*." },
  generic: { label: "Section image", aspect: "free", recommended: "1600 × 1000", min: "800 × 500", maxMB: 2, accept: "jpg, png, webp", note: "Masonry /more/* has no fixed crop — centre-safe." },
};

export const COLLECTIONS = {
  pujas: {
    label: "Pujas", orderField: "priority", fullHistory: false,
    fields: ["title", "titleHi", "deity", "temple", "date", "time", "price", "tag", "purpose", "type", "code", "image", "desc", "descHi"],
    imageKind: "puja",
    shared: "Homepage 'Dates people are booking' + Catalog + PujaDetail read these docs live. Edit here, preview on Home.",
  },
  festivals: {
    label: "Festivals", orderField: "priority", fullHistory: true,
    fields: ["name", "nameHi", "date", "eventDate", "note", "noteHi", "image", "startDate", "endDate", "linkedPujaIds", "homepageTakeover", "countdownTo"],
    imageKind: "festival",
    shared: "Countdown + marquee + calendar on Home read these. startDate/endDate control site visibility (see schedule.js). Full history kept.",
  },
  homepage_sections: {
    label: "Homepage sections", orderField: "order", fullHistory: false,
    fields: ["key", "enabled", "order", "title", "titleHi", "copy", "copyHi", "image", "startDate", "endDate"],
    imageKind: "hero",
    shared: "Order here = order on Home. enabled=false hides section without deleting.",
  },
  stories: {
    label: "Stories", orderField: null, fullHistory: false,
    fields: ["title", "titleHi", "category", "read", "date", "image", "excerpt", "excerptHi"],
    imageKind: "story",
    shared: "Home stories preview shows first 6 live stories.",
  },
  acharyas: {
    label: "Acharyas", orderField: "order", fullHistory: false,
    fields: ["name", "tradition", "traditionHi", "place", "placeHi", "expertise", "expertiseHi", "experience", "experienceHi", "phone", "email", "image", "bio", "bioHi"],
    imageKind: "acharya",
    shared: "Home acharyas preview + /acharyas page read these live.",
  },
  testimonials: {
    label: "Testimonials", orderField: "order", fullHistory: false,
    fields: ["name", "place", "quote", "quoteHi", "rating", "image"],
    imageKind: "generic",
    shared: "Trust band / social proof slots.",
  },
  bookings: { label: "Bookings", orderField: null, fullHistory: true, readOnly: true, fields: [] },
  inquiries: { label: "Inquiries", orderField: null, fullHistory: true, readOnly: true, fields: [] },
  users: { label: "Users", orderField: null, fullHistory: false, readOnly: true, fields: [] },
};

export const TRASH_RETENTION_DAYS = 30;
export const VERSION_LIMIT = 5;

export function imageRuleFor(collection) {
  return IMAGE_RULES[COLLECTIONS[collection]?.imageKind] || IMAGE_RULES.generic;
}
