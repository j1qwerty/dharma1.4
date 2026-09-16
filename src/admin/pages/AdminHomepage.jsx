import CollectionEditor from "../components/CollectionEditor";
import { COLLECTIONS, HOMEPAGE_SECTIONS } from "../../lib/content";

const FIELDS = [
  { key: "key", label: "Section key (fixed)" },
  { key: "enabled", label: "Enabled on homepage", type: "checkbox", hint: "Off hides the section without deleting it." },
  { key: "title", label: "Title override (EN)", hint: "Empty = auto / i18n default." },
  { key: "titleHi", label: "Title override (HI)" },
  { key: "copy", label: "Copy override (EN)", type: "textarea" },
  { key: "copyHi", label: "Copy override (HI)", type: "textarea" },
  { key: "image", label: "Image override", type: "image" },
  { key: "startDate", label: "Visible from", type: "datetime" },
  { key: "endDate", label: "Visible until", type: "datetime" },
];

const FALLBACK = HOMEPAGE_SECTIONS.map((s, i) => ({
  id: s.key, key: s.key, status: "published", order: i,
  title: null, titleHi: null, copy: null, copyHi: null, image: null, enabled: true,
}));

export default function AdminHomepage() {
  return (
    <CollectionEditor
      collection="homepage_sections"
      title="Homepage sections"
      subtitle="Order here = order on Home (top→bottom). Previews reference pujas/festivals/stories live — no text duplicated."
      sharedNote={COLLECTIONS.homepage_sections.shared}
      fields={FIELDS}
      orderField="order"
      idField="key"
      fallbackRows={FALLBACK}
    />
  );
}
