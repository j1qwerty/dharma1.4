import CollectionEditor from "../components/CollectionEditor";
import { COLLECTIONS } from "../../lib/content";
import { festivals, pujas } from "../../lib/data";

const FIELDS = [
  { key: "name", label: "Name (EN)" },
  { key: "nameHi", label: "Name (HI)" },
  { key: "date", label: "Date label", hint: "e.g. Oct 20" },
  { key: "eventDate", label: "Event date (ISO)", hint: "e.g. 2026-10-20 — drives countdown sort" },
  { key: "countdownTo", label: "Countdown to (ISO, optional)" },
  { key: "note", label: "Note (EN)", type: "textarea" },
  { key: "noteHi", label: "Note (HI)", type: "textarea" },
  { key: "image", label: "Image", type: "image" },
  { key: "startDate", label: "Appear on site from", type: "datetime" },
  { key: "endDate", label: "Disappear after", type: "datetime" },
  { key: "linkedPujaIds", label: "Linked puja IDs", type: "list", hint: `Comma-separated, e.g. ${pujas[0]?.id}` },
  { key: "homepageTakeover", label: "Homepage takeover", type: "checkbox", hint: "Feature this festival above the fold." },
];

export default function AdminFestivals() {
  return (
    <CollectionEditor
      collection="festivals"
      title="Festivals + scheduling"
      subtitle="Countdown, marquee + calendar read these. startDate/endDate control site visibility — use Preview on the dashboard to test."
      sharedNote={COLLECTIONS.festivals.shared}
      fields={FIELDS}
      orderField="priority"
      fullHistory
      fallbackRows={festivals.map((f) => ({ id: String(f.name).toLowerCase().replace(/[^a-z0-9]+/g, "-"), ...f }))}
    />
  );
}
