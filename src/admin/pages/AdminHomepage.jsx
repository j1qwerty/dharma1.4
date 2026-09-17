import CollectionEditor from "../components/CollectionEditor";
import { COLLECTIONS, HOMEPAGE_SECTIONS } from "../../lib/content";
import { STRINGS } from "../../lib/i18n";

// Common scheduling + visibility fields shown for every homepage section
// (under the "Schedule" tab, after the section-specific content tab).
const COMMON_FIELDS = [
  {
    key: "enabled",
    label: "Enabled on homepage",
    type: "checkbox",
    hint: "Off hides the section without deleting it.",
  },
  { key: "startDate", label: "Visible from", type: "datetime" },
  { key: "endDate", label: "Visible until", type: "datetime" },
];

/**
 * Returns the field schema for a specific section. Falls back to the
 * generic shape (title/copy/image) if the section key is unknown.
 * Each section gets ONLY the fields relevant to it — colour pickers for
 * graphical sections, image pickers for media sections, text for text-only
 * sections.
 */
function fieldsForSection(sectionKey) {
  const section = HOMEPAGE_SECTIONS.find((s) => s.key === sectionKey);
  if (section?.fields?.length) return section.fields;
  // Generic fallback
  return [
    { key: "title", label: "Title override (EN)", hint: "Empty = auto / i18n default." },
    { key: "titleHi", label: "Title override (HI)" },
    { key: "copy", label: "Copy override (EN)", type: "textarea" },
    { key: "copyHi", label: "Copy override (HI)", type: "textarea" },
    { key: "image", label: "Image override", type: "image" },
  ];
}

/**
 * Pull the current EN/HI value for an i18n key.
 * Falls back to "" when the key isn't found.
 */
function t(key) {
  const v = STRINGS[key];
  if (!v) return "";
  return v.en || "";
}
function tHi(key) {
  const v = STRINGS[key];
  if (!v) return "";
  return v.hi || "";
}

/**
 * FALLBACK rows = the existing hardcoded content the site currently shows.
 * The admin sees these pre-filled when they open the Homepage CMS page, so
 * they can edit a section's text/image and save it as an override. Without
 * this, the admin form was blank for every section.
 *
 * Each row carries ONLY the fields declared in HOMEPAGE_SECTIONS for that
 * section key, so the admin form shows the right pre-filled values per
 * section.
 */
function buildFallback() {
  return HOMEPAGE_SECTIONS.map((s, i) => {
    const row = {
      id: s.key,
      key: s.key,
      status: "published",
      order: i,
      // Default: section is enabled (visible) and has no scheduling window.
      enabled: true,
      // Section label so the admin list shows a friendly name even before
      // any title override is set.
      title: s.label,
      titleHi: s.label,
    };
    // Pre-fill per-section defaults from i18n strings + data.js so the
    // admin sees the actual content currently rendered on the live site.
    switch (s.key) {
      case "announcementBar":
        row.text = t("home.announcementText") || "Dharma Tribe · Sacred rituals, modern access.";
        row.textHi = tHi("home.announcementText") || "धर्म ट्राइब · पवित्र पूजा, सहज पहुँच।";
        row.bgColor = "";
        row.textColor = "";
        break;
      case "hero":
        row.title = t("home.heroSlide1Title");
        row.titleHi = tHi("home.heroSlide1Title");
        row.copy = t("home.heroSlide1Copy");
        row.copyHi = tHi("home.heroSlide1Copy");
        row.image = "";
        row.title2 = t("home.heroSlide2Title");
        row.title2Hi = tHi("home.heroSlide2Title");
        row.copy2 = t("home.heroSlide2Copy");
        row.image2 = "";
        break;
      case "assurance":
        row.title = t("home.assuranceSectionTitle") || "Why devotees book here";
        row.titleHi = tHi("home.assuranceSectionTitle") || "भक्त यहाँ क्यों बुक करते हैं";
        row.copy = t("home.assuranceCopy") || "";
        break;
      case "countdown":
        row.title = t("home.onHorizon");
        row.titleHi = tHi("home.onHorizon");
        break;
      case "acharyasPreview":
        row.title = t("home.peopleTradition");
        row.titleHi = tHi("home.peopleTradition");
        row.copy = t("home.peopleTraditionCopy") || "";
        break;
      case "upcomingPujas":
        row.title = t("home.datesBooking");
        row.titleHi = tHi("home.datesBooking");
        row.copy = t("home.datesCopy");
        break;
      case "festivalStrip":
        row.title = "";
        row.titleHi = "";
        row.bgColor = "";
        row.textColor = "";
        break;
      case "festivalCalendar":
        row.title = t("home.calendarKeepsMoving");
        row.titleHi = tHi("home.calendarKeepsMoving");
        row.copy = t("home.calendarCopy");
        break;
      case "intentions":
        row.title = t("home.whatMark");
        row.titleHi = tHi("home.whatMark");
        row.copy = t("home.browsePurpose");
        row.items = [
          "Peace & protection",
          "Health & well-being",
          "Wealth & prosperity",
          "Marriage & family",
          "Career & success",
          "Education",
          "New beginnings",
          "Ancestral peace",
          "Spiritual growth",
          "Dosha & remedy",
        ];
        break;
      case "howItWorks":
        row.title = t("home.ritualJourney");
        row.titleHi = tHi("home.ritualJourney");
        row.copy = t("home.ritualJourneyCopy");
        break;
      case "trustBand":
        row.title = t("home.seeMatters");
        row.titleHi = tHi("home.seeMatters");
        row.copy = t("home.seeMattersCopy");
        row.image = "";
        row.bgColor = "";
        break;
      case "storiesPreview":
        row.title = t("home.storiesTitle");
        row.titleHi = tHi("home.storiesTitle");
        row.copy = t("home.storiesCopy");
        break;
      case "socialFeed":
        row.title = t("home.widerFeed");
        row.titleHi = tHi("home.widerFeed");
        row.image = "";
        break;
      case "recurringSeva":
        row.title = t("home.keepIntentionGoing");
        row.titleHi = tHi("home.keepIntentionGoing");
        row.copy = t("home.keepIntentionCopy");
        break;
      case "templeNetwork":
        row.title = t("home.templeNetwork");
        row.titleHi = tHi("home.templeNetwork");
        row.copy = t("home.templeNetworkCopy");
        break;
      case "newsletter":
        row.title = t("home.knowComingNext");
        row.titleHi = tHi("home.knowComingNext");
        row.copy = t("home.stayCopy");
        row.bgColor = "";
        break;
      default:
        break;
    }
    return row;
  });
}

export default function AdminHomepage() {
  return (
    <CollectionEditor
      collection="homepage_sections"
      title="Homepage sections"
      subtitle="Each section shows the current hardcoded content pre-filled — edit any field, set status to published, and Save. Saved overrides are merged into the live homepage in the background on next page load. Empty fields fall back to the site defaults."
      sharedNote="By default, the homepage always loads the hardcoded defaults. When you save an override here, the site picks it up in the background and applies it on next page load. Order here = order on Home (top→bottom)."
      fields={[]}
      fieldsFor={fieldsForSection}
      commonFields={COMMON_FIELDS}
      orderField="order"
      idField="key"
      fallbackRows={buildFallback()}
    />
  );
}
