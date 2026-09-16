import React from "react";
import BookingFrame from "../components/common/BookingFrame";
import SafeImage from "../components/common/SafeImage";
import { CalendarBlank, Clock, CheckCircle } from "../components/common/Icons";
import { useBooking } from "../lib/booking";
import { pujas } from "../lib/data";
import { useLanguage } from "../components/common/LanguageToggle";
export default function BookingDate() {
  const { booking, update } = useBooking();
  const { t, lang } = useLanguage();
  const p = pujas.find((x) => x.id === booking.pujaId) || pujas[0];
  const dates =
    lang === "hi"
      ? ["09 सितं", "10 सितं", "11 सितं", "12 सितं"]
      : ["Sep 09", "Sep 10", "Sep 11", "Sep 12"];
  const slots = [
    "06:00 AM - 07:00 AM",
    "07:30 AM - 08:30 AM",
    "09:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "05:30 PM - 06:30 PM",
  ];
  // Match a stored English date like "Sep 09, 2026" or "Sep 09" so the highlight works either way.
  const bookedDay = (booking.date || "").split(",")[0].trim();
  return (
    <BookingFrame active="date">
      <div className="eyebrow">{t("bd.chooseDate")}</div>
      <h2 className="font-display mt-3 text-4xl">{t("bd.title")}</h2>
      <div className="mt-6 overflow-hidden rounded-2xl">
        <SafeImage
          src={p.image}
          alt={lang === "hi" && p.titleHi ? p.titleHi : p.title}
          className="h-44 w-full object-cover"
        />
      </div>
      <div className="mt-7 grid gap-7 lg:grid-cols-2">
        <div>
          <label className="text-xs font-bold text-muted">{t("bd.september")}</label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {dates.map((x, i) => {
              const enDate = `Sep 0${9 + i}`;
              const active = bookedDay === enDate || bookedDay === x;
              return (
                <button
                  key={x}
                  onClick={() => update({ date: `${enDate}, 2026` })}
                  className={`choice ${active ? "active" : ""}`}
                >
                  <div className="flex items-center justify-between text-xs text-muted">
                    <CalendarBlank size={15} />
                    {i === 0 ? t("bd.closest") : ""}
                  </div>
                  <div className="mt-3 text-lg font-semibold">{x}</div>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted">{t("bd.availableSlots")}</label>
          <div className="mt-3 grid gap-2">
            {slots.map((x) => (
              <button
                key={x}
                onClick={() => update({ time: x })}
                className={`choice flex items-center justify-between ${booking.time === x ? "active" : ""}`}
              >
                <span className="text-sm">{x}</span>
                {booking.time === x && <CheckCircle size={18} className="text-gold-500" />}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2 rounded-2xl bg-surface-2 p-4 text-xs text-muted">
        <Clock size={17} />
        <span>{t("bd.note")}</span>
      </div>
    </BookingFrame>
  );
}
