import CollectionEditor from "../components/CollectionEditor";
import { COLLECTIONS } from "../../lib/content";
import { acharyas } from "../../lib/data";

const FIELDS = [
  { key: "name", label: "Name" },
  { key: "tradition", label: "Tradition (EN)" },
  { key: "traditionHi", label: "Tradition (HI)" },
  { key: "place", label: "Place (EN)" },
  { key: "placeHi", label: "Place (HI)" },
  { key: "approach", label: "Approach (EN)" },
  { key: "approachHi", label: "Approach (HI)" },
  { key: "expertise", label: "Expertise (EN)" },
  { key: "expertiseHi", label: "Expertise (HI)" },
  { key: "lineage", label: "Lineage (EN)" },
  { key: "lineageHi", label: "Lineage (HI)" },
  { key: "experience", label: "Experience (EN)" },
  { key: "experienceHi", label: "Experience (HI)" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "image", label: "Portrait", type: "image" },
  { key: "bio", label: "Bio (EN)", type: "textarea" },
  { key: "bioHi", label: "Bio (HI)", type: "textarea" },
  { key: "startDate", label: "Visible from", type: "datetime" },
  { key: "endDate", label: "Visible until", type: "datetime" },
];

export default function AdminAcharyas() {
  return (
    <CollectionEditor
      collection="acharyas"
      title="Acharyas"
      sharedNote={COLLECTIONS.acharyas.shared}
      fields={FIELDS}
      orderField="order"
      fallbackRows={acharyas}
    />
  );
}
