import React from "react";
import BookingFrame from "../components/common/BookingFrame";
import { CheckCircle, Plus, VideoCamera } from "../components/common/Icons";
import { useBooking } from "../lib/booking";
import { useToast } from "../components/common/Toast";
import { useLanguage } from "../components/common/LanguageToggle";
export default function BookingPackage() {
  const { booking, update } = useBooking();
  const toast = useToast();
  const { t, lang } = useLanguage();
  const packs =
    lang === "hi"
      ? [
          [t("bp.individual"), 1100, t("bp.individualDesc")],
          [t("bp.couple"), 1650, t("bp.coupleDesc")],
          [t("bp.family"), 2100, t("bp.familyDesc")],
        ]
      : [
          ["Individual", 1100, "One devotee"],
          ["Couple", 1650, "Two devotees"],
          ["Family", 2100, "Up to four devotees"],
        ];
  const addonLabels =
    lang === "hi"
      ? {
          "Additional Sankalp": t("bp.addonSankalp"),
          Certificate: t("bp.certificate"),
          "Live participation": t("bp.liveParticipation"),
        }
      : null;
  const addons = ["Additional Sankalp", "Certificate", "Live participation"];
  return (
    <BookingFrame active="package">
      <div className="eyebrow">{t("bp.eyebrow")}</div>
      <h2 className="font-display mt-3 text-4xl">{t("bp.title")}</h2>
      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {packs.map((x) => {
          // Match against the canonical English label stored in booking state.
          const canonical = ["Individual", "Couple", "Family"][packs.indexOf(x)];
          const isActive = booking.package === canonical;
          return (
            <button
              key={canonical}
              onClick={() => {
                update({ package: canonical, packagePrice: x[1] });
                toast.push({
                  type: "success",
                  title: `${x[0]} ${t("bp.packageSelected")}`,
                  desc: `₹${x[1].toLocaleString("en-IN")} · ${x[2]}`,
                });
              }}
              className={`choice text-left ${isActive ? "active" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl">{x[0]}</span>
                {isActive && <CheckCircle size={18} className="text-gold-500" />}
              </div>
              <div className="mt-3 text-2xl font-semibold">₹{x[1].toLocaleString("en-IN")}</div>
              <div className="mt-1 text-xs text-muted">{x[2]}</div>
            </button>
          );
        })}
      </div>
      <div className="mt-10 border-t border-line pt-7">
        <div className="flex items-center gap-2">
          <VideoCamera size={18} className="text-gold-500" />
          <h3 className="font-semibold">{t("bp.addons")}</h3>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {addons.map((x) => {
            const on = booking.addons.includes(x);
            const label = addonLabels ? addonLabels[x] : x;
            return (
              <button
                key={x}
                onClick={() => {
                  update({
                    addons: on ? booking.addons.filter((a) => a !== x) : [...booking.addons, x],
                  });
                  toast.push({
                    type: on ? "info" : "success",
                    title: `${label} ${on ? t("bp.removed") : t("bp.added")}`,
                  });
                }}
                className={`choice flex items-center justify-between ${on ? "active" : ""}`}
              >
                <span className="text-sm">{label}</span>
                {on ? <CheckCircle size={18} className="text-gold-500" /> : <Plus size={18} />}
              </button>
            );
          })}
        </div>
      </div>
    </BookingFrame>
  );
}
