import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { pujas } from "./data";
import { WHATSAPP_NUMBER } from "./site";

const C = createContext(null);
const initial = {
  pujaId: "mahadeva-rudra",
  date: "Sep 09, 2026",
  time: "07:30 AM - 08:30 AM",
  package: "Family",
  packagePrice: 2100,
  addons: ["Video"],
  sankalp: { name: "Aarav Mehta", gotra: "Kashyapa", purpose: "Clarity and peace", family: 2 },
  payment: "UPI",
};
export function BookingProvider({ children }) {
  const [booking, setBooking] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dt-booking")) || initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => localStorage.setItem("dt-booking", JSON.stringify(booking)), [booking]);
  const value = useMemo(
    () => ({ booking, setBooking, update: (patch) => setBooking((b) => ({ ...b, ...patch })) }),
    [booking]
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useBooking = () => useContext(C);

/**
 * Build a fully detailed WhatsApp message for the current booking.
 * Includes puja code, title (EN + HI when available), deity, temple, date,
 * muhurat, package, addons, sankalp (name, gotra, purpose, family) and total.
 *
 * @param {object} booking - the active booking state.
 * @param {("en"|"hi")} lang - language for the message header / labels.
 */
export function buildBookingWhatsAppMessage(booking, lang = "en") {
  const p = pujas.find((x) => x.id === booking.pujaId) || pujas[0];
  const addons = Array.isArray(booking.addons) ? booking.addons : [];
  const total =
    (booking.packagePrice || p.price || 0) +
    addons.reduce((sum, _x, i) => sum + (i === 0 ? 0 : 0), 0); // addons have no price in prototype
  const family = Number(booking?.sankalp?.family) || 0;

  const hi = lang === "hi";

  const L = hi
    ? {
        intro: "नमस्ते DharmaTribe, मैं एक पूजा बुक करना चाहता/चाहती हूँ।",
        summaryHead: "बुकिंग विवरण",
        code: "पूजा कोड",
        title: "पूजा",
        titleHi: "पूजा (हिन्दी)",
        deity: "देवता",
        temple: "मंदिर",
        date: "तिथि",
        time: "मुहूर्त",
        package: "पैकेज",
        addons: "ऐड-ऑन",
        none: "कोई नहीं",
        sankalpHead: "संकल्प विवरण",
        name: "भक्त का नाम",
        gotra: "गोत्र",
        purpose: "उद्देश्य",
        family: "परिवार के सदस्य",
        total: "कुल राशि",
        closing: "कृपया इस बुकिंग की पुष्टि करें। धन्यवाद।",
      }
    : {
        intro: "Namaste DharmaTribe, I would like to book a puja.",
        summaryHead: "Booking details",
        code: "Puja code",
        title: "Puja",
        titleHi: "Puja (Hindi)",
        deity: "Deity",
        temple: "Temple",
        date: "Date",
        time: "Muhurat",
        package: "Package",
        addons: "Add-ons",
        none: "None",
        sankalpHead: "Sankalp details",
        name: "Devotee name",
        gotra: "Gotra",
        purpose: "Purpose",
        family: "Family members",
        total: "Total amount",
        closing: "Please confirm this booking. Thank you.",
      };

  const lines = [];
  lines.push(L.intro);
  lines.push("");
  lines.push(`*${L.summaryHead}*`);
  lines.push(`— ${L.code}: ${p.code || "—"}`);
  lines.push(`— ${L.title}: ${p.title}`);
  if (p.titleHi) lines.push(`— ${L.titleHi}: ${p.titleHi}`);
  if (p.deity) lines.push(`— ${L.deity}: ${p.deity}`);
  if (p.temple) lines.push(`— ${L.temple}: ${p.temple}`);
  lines.push(`— ${L.date}: ${booking.date || "—"}`);
  lines.push(`— ${L.time}: ${booking.time || "—"}`);
  lines.push(
    `— ${L.package}: ${booking.package || "—"} (₹${(booking.packagePrice || p.price || 0).toLocaleString("en-IN")})`
  );
  lines.push(`— ${L.addons}: ${addons.length ? addons.join(", ") : L.none}`);
  lines.push("");
  lines.push(`*${L.sankalpHead}*`);
  lines.push(`— ${L.name}: ${booking?.sankalp?.name || "—"}`);
  lines.push(`— ${L.gotra}: ${booking?.sankalp?.gotra || "—"}`);
  lines.push(`— ${L.purpose}: ${booking?.sankalp?.purpose || "—"}`);
  lines.push(`— ${L.family}: ${family > 0 ? family : "—"}`);
  lines.push("");
  lines.push(`*${L.total}: ₹${total.toLocaleString("en-IN")}*`);
  lines.push("");
  lines.push(L.closing);
  return lines.join("\n");
}

/**
 * Build a wa.me link for the current booking.
 * Always pass the effective booking (with the URL pujaId merged in) so the
 * message reflects the puja the user actually selected, not stale storage.
 */
export function buildBookingWhatsAppHref(booking, lang = "en", phone = WHATSAPP_NUMBER) {
  const msg = buildBookingWhatsAppMessage(booking, lang);
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

/**
 * Short per-puja inquiry message (used for "Ask / Speak to Vedacharya" CTAs).
 * Keeps puja code + titles so support knows which puja the question is about.
 */
export function buildInquiryMessage(puja, lang = "en") {
  const hi = lang === "hi";
  const title = puja?.title || "";
  const titleHi = puja?.titleHi || "";
  const code = puja?.code || "";
  const temple = puja?.temple || "";
  if (hi) {
    return [
      "नमस्ते DharmaTribe, मुझे इस पूजा के बारे में पूछना है।",
      "",
      `— पूजा: ${title}${titleHi ? ` · ${titleHi}` : ""}`,
      code ? `— पूजा कोड: ${code}` : "",
      temple ? `— मंदिर: ${temple}` : "",
      "",
      "कृपया विवरण साझा करें। धन्यवाद।",
    ]
      .filter(Boolean)
      .join("\n");
  }
  return [
    "Namaste DharmaTribe, I have a question about this puja.",
    "",
    `— Puja: ${title}${titleHi ? ` · ${titleHi}` : ""}`,
    code ? `— Puja code: ${code}` : "",
    temple ? `— Temple: ${temple}` : "",
    "",
    "Please share the details. Thank you.",
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildInquiryHref(puja, lang = "en", phone = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(buildInquiryMessage(puja, lang))}`;
}

/** Dedicated Gaya Ji experience inquiry (Shraadh flow). */
export function buildGayaJiMessage(lang = "en") {
  if (lang === "hi") {
    return [
      "नमस्ते DharmaTribe, मुझे गया जी में श्राद्ध अनुभव की योजना बनानी है।",
      "",
      "— पूजा: Shraadh · श्राद्ध",
      "— स्थान: Gaya Ji",
      "",
      "कृपया तिथि, विधि और व्यवस्था के बारे में मार्गदर्शन दें। धन्यवाद।",
    ].join("\n");
  }
  return [
    "Namaste DharmaTribe, I want to plan a Gaya Ji Shradh experience.",
    "",
    "— Puja: Shraadh",
    "— Place: Gaya Ji",
    "",
    "Please guide me on Tithi, Vidhi and arrangements. Thank you.",
  ].join("\n");
}

export function buildGayaJiHref(lang = "en", phone = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(buildGayaJiMessage(lang))}`;
}
