// Scheduling engine — single source of truth for date-window visibility.
// Every CMS doc carries status + optional startDate/endDate (Firestore
// Timestamps or ISO strings or null). Preview mode passes ?cmsPreview=ISO.
export function toDate(v) {
  if (!v) return null;
  if (v instanceof Date) return v;
  if (typeof v?.toDate === "function") return v.toDate();
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function isLive(doc, now = new Date()) {
  if (!doc) return false;
  if ((doc.status || "published") !== "published") return false;
  if (doc.enabled === false) return false;
  const start = toDate(doc.startDate ?? doc.visibilityStart);
  const end = toDate(doc.endDate ?? doc.visibilityEnd);
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
}

export function getActiveFestivals(festivals, now = new Date()) {
  return (festivals || [])
    .filter((f) => isLive(f, now))
    .map((f) => ({ ...f, _event: toDate(f.eventDate) || toDate(f.countdownTo) }))
    .sort((a, b) => (a.priority || 0) - (b.priority || 0) || (a._event - b._event));
}

export function getActiveFestival(festivals, now = new Date()) {
  return getActiveFestivals(festivals, now)[0] || null;
}

export function getPreviewNow(search) {
  const params = new URLSearchParams(search || (typeof window !== "undefined" ? window.location.search : ""));
  const raw = params.get("cmsPreview");
  if (!raw) return { now: new Date(), preview: null };
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return { now: new Date(), preview: null };
  return { now: d, preview: d };
}
