import CollectionEditor from "../components/CollectionEditor";
import { COLLECTIONS } from "../../lib/content";
import { stories } from "../../lib/data";

const FIELDS = [
  { key: "title", label: "Title (EN)" },
  { key: "titleHi", label: "Title (HI)" },
  { key: "category", label: "Category", type: "select", options: ["Festivals", "Deity Stories", "Rituals / Puja Vidhi", "Temple Histories", "Devotee Stories"] },
  { key: "read", label: "Read time", hint: "e.g. 6 min" },
  { key: "date", label: "Date label", hint: "e.g. Sep 04, 2026" },
  { key: "image", label: "Cover image", type: "image" },
  { key: "excerpt", label: "Excerpt (EN)", type: "textarea" },
  { key: "excerptHi", label: "Excerpt (HI)", type: "textarea" },
  { key: "startDate", label: "Visible from", type: "datetime" },
  { key: "endDate", label: "Visible until", type: "datetime" },
];

export default function AdminStories() {
  return (
    <CollectionEditor
      collection="stories"
      title="Stories"
      sharedNote={COLLECTIONS.stories.shared}
      fields={FIELDS}
      fallbackRows={stories}
    />
  );
}
