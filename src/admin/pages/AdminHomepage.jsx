import CollectionEditor from "../components/CollectionEditor";
import { COLLECTIONS, HOMEPAGE_SECTIONS } from "../../lib/content";

// Common scheduling + visibility fields shown for every homepage section
// (under the "Schedule" tab, after the section-specific content tab).
const COMMON_FIELDS = [
  { key: "enabled", label: "Enabled on homepage", type: "checkbox", hint: "Off hides the section without deleting it." },
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

const FALLBACK = HOMEPAGE_SECTIONS.map((s, i) => ({
  id: s.key,
  key: s.key,
  status: "published",
  order: i,
  // Default empty overrides — the public site loads hardcoded defaults,
  // these are empty until the admin fills them in.
  enabled: true,
  title: null,
  titleHi: null,
  copy: null,
  copyHi: null,
  image: null,
}));

export default function AdminHomepage() {
  return (
    <CollectionEditor
      collection="homepage_sections"
      title="Homepage sections"
      subtitle="Each section shows only the fields relevant to it — colour pickers for graphical sections, image pickers for media sections, text for text-only sections. Empty fields fall back to the site defaults."
      sharedNote="By default, the homepage always loads the hardcoded defaults. When you save an override here, the site picks it up in the background and applies it on next page load. Order here = order on Home (top→bottom)."
      fields={[]}
      fieldsFor={fieldsForSection}
      commonFields={COMMON_FIELDS}
      orderField="order"
      idField="key"
      fallbackRows={FALLBACK}
    />
  );
}
