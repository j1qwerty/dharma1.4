import React from "react";
import { useParams } from "react-router-dom";
import BookingFrame from "../components/common/BookingFrame";
import Field from "../components/common/Field";
import SankalpPreview from "../components/common/SankalpPreview";
import { useBooking } from "../lib/booking";
import { pujas } from "../lib/data";
import { Heart } from "../components/common/Icons";
import { useLanguage } from "../components/common/LanguageToggle";
export default function BookingSankalp() {
  const { booking, update } = useBooking();
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const p = pujas.find((x) => x.id === id) || pujas[0];
  const pujaTitle = lang === "hi" && p.titleHi ? p.titleHi : p.title;
  const set = (k, v) => update({ sankalp: { ...booking.sankalp, [k]: v } });
  return (
    <BookingFrame active="sankalp">
      <div className="eyebrow">{t("bs.eyebrow")}</div>
      <h2 className="font-display mt-3 text-4xl">{t("bs.title")}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{t("bs.copy")}</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr] items-start">
        <div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label={t("bs.fullName")}
              value={booking.sankalp.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Aarav Mehta"
            />
            <Field
              label={t("bs.gotra")}
              value={booking.sankalp.gotra}
              onChange={(e) => set("gotra", e.target.value)}
              helper={t("bs.gotraHelper")}
              placeholder="Kashyapa"
            />
            <Field
              label={t("bs.purpose")}
              value={booking.sankalp.purpose}
              onChange={(e) => set("purpose", e.target.value)}
              placeholder="Clarity and peace"
            />
            <Field
              label={t("bs.familyMembers")}
              type="number"
              value={booking.sankalp.family}
              onChange={(e) => set("family", Number(e.target.value))}
              placeholder="2"
            />
          </div>
          <div className="mt-6 rounded-2xl bg-surface-2 p-4 text-xs leading-6 text-muted">
            <Heart size={16} className="mb-2 text-gold-500" /> {t("bs.note")}
          </div>
        </div>
        <SankalpPreview
          sankalp={booking.sankalp}
          pujaTitle={pujaTitle}
          temple={p.temple}
          date={booking.date}
          time={booking.time}
        />
      </div>
    </BookingFrame>
  );
}
