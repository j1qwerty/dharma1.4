import CollectionEditor from "../components/CollectionEditor";
import { COLLECTIONS } from "../../lib/content";

const FIELDS = [
  { key: "name", label: "Name" },
  { key: "place", label: "Place" },
  { key: "quote", label: "Quote (EN)", type: "textarea" },
  { key: "quoteHi", label: "Quote (HI)", type: "textarea" },
  { key: "rating", label: "Rating (1–5)", type: "number" },
  { key: "image", label: "Photo (optional)", type: "image" },
  { key: "startDate", label: "Visible from", type: "datetime" },
  { key: "endDate", label: "Visible until", type: "datetime" },
];

export default function AdminTestimonials() {
  return (
    <CollectionEditor
      collection="testimonials"
      title="Testimonials"
      subtitle="Social-proof quotes for trust band / homepage slots."
      sharedNote={COLLECTIONS.testimonials.shared}
      fields={FIELDS}
      orderField="order"
      fallbackRows={[]}
    />
  );
}
