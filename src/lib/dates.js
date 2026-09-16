/* ------------------------------------------------------------------ *
 * dates - single source of truth for event-relative dates.
 *
 * - Festivals in data.js carry month/day labels ("Sep 12") with no year.
 *   festivalDate() resolves each to its NEXT occurrence relative to today,
 *   so site order flips automatically as dates pass.
 * - Pujas carry full labels ("Sep 09, 2026"). pujaEventDate() parses them;
 *   booking pages then offer the event day + the following 7 days.
 * ------------------------------------------------------------------ */

const EN_MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const EN_MONTHS_LONG = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Short Hindi month labels, matching the existing "सितं" style.
const HI_MONTHS_SHORT = [
  "जन",
  "फ़र",
  "मार्च",
  "अप्रै",
  "मई",
  "जून",
  "जुल",
  "अग",
  "सितं",
  "अक्टू",
  "नवं",
  "दिसं",
];

const HI_MONTHS_LONG = [
  "जनवरी",
  "फ़रवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर",
];

const MONTH_INDEX = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  sept: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

function startOfDay(d) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function parseMonthDay(label) {
  // "Sep 12" / "Sep 09, 2026" / "October 20" -> { month, day } or null.
  if (!label || typeof label !== "string") return null;
  const m = label
    .replace(/,/g, " ")
    .trim()
    .match(/^([A-Za-z]+)\s+(\d{1,2})/);
  if (!m) return null;
  const month = MONTH_INDEX[m[1].slice(0, 4).toLowerCase()];
  const day = Number(m[2]);
  if (month == null || !day || day > 31) return null;
  return { month, day };
}

/* Parse an event label into a Date, or null when it isn't a real date
 * ("Pitru Paksha", "Per Tithi", ...). Supports:
 * - "Sep 09, 2026" / "Sep 09" (year defaults to the relevant year below)
 * - "15/9/2026" or "15/09/2026" (dd/mm/yyyy)
 * - ISO "2026-09-15" */
export function parseEventDate(label, now = new Date()) {
  if (!label || typeof label !== "string") return null;
  const s = label.trim();

  let m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]));
    return Number.isNaN(d.getTime()) ? null : startOfDay(d);
  }

  m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return Number.isNaN(d.getTime()) ? null : startOfDay(d);
  }

  const md = parseMonthDay(s);
  if (!md) return null;
  const yearMatch = s.match(/(\d{4})/);
  const year = yearMatch ? Number(yearMatch[1]) : now.getFullYear();
  const d = new Date(year, md.month, md.day);
  return Number.isNaN(d.getTime()) ? null : startOfDay(d);
}

/* Next occurrence of a month/day: this year, or next year once passed. */
export function nextOccurrence(month, day, now = new Date()) {
  const today = startOfDay(now);
  let d = new Date(today.getFullYear(), month, day);
  if (d < today) d = new Date(today.getFullYear() + 1, month, day);
  return d;
}

/* Resolve a festival ({ date: "Sep 12" }) to its next occurrence. */
export function festivalDate(festival, now = new Date()) {
  const md = parseMonthDay(festival?.date);
  if (!md) return null;
  return nextOccurrence(md.month, md.day, now);
}

/* Festivals ordered by upcoming date (soonest first). Each entry carries
 * a `_next` Date. Undated entries sink to the end, order preserved. */
export function upcomingFestivals(list, now = new Date()) {
  return list
    .map((f, i) => ({ ...f, _next: festivalDate(f, now), _i: i }))
    .sort((a, b) => {
      if (!a._next && !b._next) return a._i - b._i;
      if (!a._next) return 1;
      if (!b._next) return -1;
      return a._next - b._next || a._i - b._i;
    });
}

/* The puja's event day. Falls back to today for season-long labels
 * like "Pitru Paksha" so booking always offers real, bookable days. */
export function pujaEventDate(puja, now = new Date()) {
  return parseEventDate(puja?.date, now) || startOfDay(now);
}

/* Event day + the following days (default: 8 options = day 0..7). */
export function bookingDays(eventDate, count = 8) {
  const start = startOfDay(eventDate);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return d;
  });
}

/* Day button label: "Sep 15" / "15 सितं". */
export function formatDayShort(date, lang = "en") {
  const day = String(date.getDate()).padStart(2, "0");
  if (lang === "hi") return `${day} ${HI_MONTHS_SHORT[date.getMonth()]}`;
  return `${EN_MONTHS_SHORT[date.getMonth()]} ${day}`;
}

/* Canonical stored value, e.g. "Sep 15, 2026". */
export function formatDayValue(date) {
  return `${EN_MONTHS_SHORT[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
}

/* Month heading: "September 2026" / "सितंबर 2026". */
export function formatMonthYear(date, lang = "en") {
  if (lang === "hi") return `${HI_MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`;
  return `${EN_MONTHS_LONG[date.getMonth()]} ${date.getFullYear()}`;
}
