import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import BookingFrame from "../components/common/BookingFrame";
import SafeImage from "../components/common/SafeImage";
import { CalendarBlank, Clock, CheckCircle } from "../components/common/Icons";
import { useBooking } from "../lib/booking";
import { useCheckoutProgressSync } from "../lib/cmsAdmin";
import { pujas as defaultPujas } from "../lib/data";
import { useLivePujas } from "../lib/cms";
import {
  pujaEventDate,
  bookingDays,
  formatDayShort,
  formatDayValue,
  formatMonthYear,
} from "../lib/dates";
import { useLanguage } from "../components/common/LanguageToggle";
export default function BookingDate() {
  const { booking, update } = useBooking();
  const { id } = useParams();
  const { t, lang } = useLanguage();
  // Persist a resumable draft at every step (refresh/tab-close/slow-net safe).
  useCheckoutProgressSync("date", id);
  // Cache-first: render hardcoded pujas instantly, then refresh from Firestore
  // in the background when published overrides arrive.
  const { items: livePujas } = useLivePujas();
  const p = useMemo(
    () =>
      livePujas.find((x) => x.id === (id || booking.pujaId)) ||
      defaultPujas.find((x) => x.id === (id || booking.pujaId)) ||
      defaultPujas[0],
    [livePujas, id, booking.pujaId]
  );
  // Event day + the following 7 days, derived from the puja's own date
  // (e.g. event 15/9/2026 -> 15/9, 16/9, 17/9, 18/9 ...). Falls back to
  // today for season-long labels like "Pitru Paksha".
  const days = useMemo(() => bookingDays(pujaEventDate(p)), [p.id, p.date]);
  const slots = [
    "06:00 AM - 07:00 AM",
    "07:30 AM - 08:30 AM",
    "09:00 AM - 10:00 AM",
    "11:00 AM - 12:00 PM",
    "05:30 PM - 06:30 PM",
  ];
  // Match a stored English value like "Sep 15, 2026" so the highlight works either way.
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
          <label className="text-xs font-bold text-muted">{formatMonthYear(days[0], lang)}</label>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {days.map((d, i) => {
              const label = formatDayShort(d, lang);
              const value = formatDayValue(d);
              const active = bookedDay === value.split(",")[0].trim() || bookedDay === label;
              return (
                <button
                  key={value}
                  onClick={() => update({ date: value })}
                  className={`choice ${active ? "active" : ""}`}
                >
                  <div className="flex items-center justify-between text-xs text-muted">
                    <CalendarBlank size={15} />
                    {i === 0 ? t("bd.closest") : ""}
                  </div>
                  <div className="mt-3 text-lg font-semibold">{label}</div>
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
