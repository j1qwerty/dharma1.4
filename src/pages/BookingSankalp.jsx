import React, { useEffect, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import BookingFrame from "../components/common/BookingFrame";
import Field from "../components/common/Field";
import SankalpPreview from "../components/common/SankalpPreview";
import SafeImage from "../components/common/SafeImage";
import { useBooking, shraadhTypeOf } from "../lib/booking";
import { SHRAADH_TYPES } from "../lib/shraadhTypes";
import { useCheckoutProgressSync } from "../lib/cmsAdmin";
import { pujas as defaultPujas } from "../lib/data";
import { useLivePujas } from "../lib/cms";
import { Heart } from "../components/common/Icons";
import { useLanguage } from "../components/common/LanguageToggle";
export default function BookingSankalp() {
  const { booking, update } = useBooking();
  const { id } = useParams();
  const [params] = useSearchParams();
  const { t, lang } = useLanguage();
  // Capture the shraadh subtype (?type=) from rite cards; clear it when the
  // flow moves to a different puja so it never leaks across bookings.
  useEffect(() => {
    const type = params.get("type");
    if (id === "shraadh" && type && SHRAADH_TYPES.some((x) => x.id === type)) {
      if (booking.shraadhType !== type || booking.pujaId !== id) update({ pujaId: id, shraadhType: type });
    } else if (id && id !== "shraadh" && booking.shraadhType) {
      update({ shraadhType: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const rite = shraadhTypeOf({ ...booking, pujaId: id || booking.pujaId });
  // Persist a resumable draft at every step (refresh/tab-close/slow-net safe).
  useCheckoutProgressSync("sankalp", id);
  // Cache-first: render hardcoded pujas instantly, then refresh from Firestore
  // in the background when published overrides arrive.
  const { items: livePujas } = useLivePujas();
  const p = useMemo(
    () =>
      livePujas.find((x) => x.id === id) ||
      defaultPujas.find((x) => x.id === id) ||
      defaultPujas[0],
    [livePujas, id]
  );
  const pujaTitle = lang === "hi" && p.titleHi ? p.titleHi : p.title;
  const set = (k, v) => update({ sankalp: { ...booking.sankalp, [k]: v } });
  return (
    <BookingFrame active="sankalp">
      <div className="eyebrow">{t("bs.eyebrow")}</div>
      <h2 className="font-display mt-3 text-4xl">{t("bs.title")}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{t("bs.copy")}</p>
      {rite && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-gold-400/40 bg-gold-400/8 px-4 py-3 text-xs">
          <img src={SHRAADH_TYPES.find((x) => x.id === rite.id)?.image} alt="" className="h-9 w-9 rounded-lg object-cover flex-none" />
          <span className="min-w-0 flex-1">
            <span className="block text-[10px] uppercase tracking-[.14em] text-gold-600">
              {lang === "hi" ? "श्राद्ध विधि" : "Shraadh rite"}
            </span>
            <span className="block font-semibold truncate">{lang === "hi" ? rite.nameHi : rite.name}</span>
          </span>
          <Link to="/pujas/shraadh" className="flex-none text-[11px] font-bold text-gold-600 hover:underline">
            {lang === "hi" ? "बदलें" : "Change"}
          </Link>
        </div>
      )}
      <div className="mt-6 overflow-hidden rounded-2xl">
        <SafeImage src={p.image} alt={pujaTitle} className="h-44 w-full object-cover" />
      </div>
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
