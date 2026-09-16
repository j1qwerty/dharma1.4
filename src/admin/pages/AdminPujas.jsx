import CollectionEditor from "../components/CollectionEditor";
import { COLLECTIONS } from "../../lib/content";
import { pujas } from "../../lib/data";

const FIELDS = [
  { key: "title", label: "Title (EN)" },
  { key: "titleHi", label: "Title (HI)" },
  { key: "code", label: "Puja code", hint: "e.g. PUJA-001" },
  { key: "deity", label: "Deity", type: "select", options: ["Shiva", "Vishnu", "Krishna", "Ganesh", "Lakshmi", "Durga", "Hanuman", "Kali", "Navagraha", "Pitru"] },
  { key: "temple", label: "Temple / place" },
  { key: "price", label: "Price (₹)", type: "number" },
  { key: "tag", label: "Tag", type: "select", options: ["Evergreen", "Popular", "Festival", "Remedy", "Limited slots", "Ancestral", "Navratri"] },
  { key: "purpose", label: "Purpose" },
  { key: "type", label: "Type", type: "select", options: ["Abhishek", "Archana", "Puja", "Seva", "Katha", "Homam", "Path", "Jaap", "Shraadh"] },
  { key: "date", label: "Date label", hint: "e.g. Sep 09, 2026" },
  { key: "time", label: "Time / muhurat", hint: "e.g. 07:30 AM" },
  { key: "image", label: "Image", type: "image" },
  { key: "desc", label: "Description (EN)", type: "textarea" },
  { key: "descHi", label: "Description (HI)", type: "textarea" },
  { key: "startDate", label: "Visible from", type: "datetime" },
  { key: "endDate", label: "Visible until", type: "datetime" },
];

export default function AdminPujas() {
  return (
    <CollectionEditor
      collection="pujas"
      title="Pujas"
      subtitle="Catalogue + PujaDetail + homepage 'Dates people are booking' — all read these docs live."
      sharedNote={COLLECTIONS.pujas.shared}
      fields={FIELDS}
      orderField="priority"
      fallbackRows={pujas}
    />
  );
}
