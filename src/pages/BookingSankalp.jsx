import React from "react";
import { useParams } from "react-router-dom";
import BookingFrame from "../components/common/BookingFrame";
import Field from "../components/common/Field";
import SankalpPreview from "../components/common/SankalpPreview";
import { useBooking } from "../lib/booking";
import { pujas } from "../lib/data";
import { Heart } from "../components/common/Icons";
export default function BookingSankalp() {
  const { booking, update } = useBooking();
  const { id } = useParams();
  const p = pujas.find((x) => x.id === id) || pujas[0];
  const set = (k, v) => update({ sankalp: { ...booking.sankalp, [k]: v } });
  return (
    <BookingFrame active="sankalp">
      <div className="eyebrow">Sankalp details</div>
      <h2 className="font-display mt-3 text-4xl">Give the ritual your name and intention.</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        Add the details the priest needs. The patrika on the right updates live as you type, so you
        can see exactly what will be carried into the ritual.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr] items-start">
        <div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Full name"
              value={booking.sankalp.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Aarav Mehta"
            />
            <Field
              label="Gotra"
              value={booking.sankalp.gotra}
              onChange={(e) => set("gotra", e.target.value)}
              helper="Choose 'I do not know' when needed."
              placeholder="Kashyapa"
            />
            <Field
              label="Purpose / manokamna"
              value={booking.sankalp.purpose}
              onChange={(e) => set("purpose", e.target.value)}
              placeholder="Clarity and peace"
            />
            <Field
              label="Family members"
              type="number"
              value={booking.sankalp.family}
              onChange={(e) => set("family", Number(e.target.value))}
              placeholder="2"
            />
          </div>
          <div className="mt-6 rounded-2xl bg-surface-2 p-4 text-xs leading-6 text-muted">
            <Heart size={16} className="mb-2 text-gold-500" /> Your Sankalp details are part of the
            ritual record and should only be shared with the people required to perform the seva.
          </div>
        </div>
        <SankalpPreview
          sankalp={booking.sankalp}
          pujaTitle={p.title}
          temple={p.temple}
          date={booking.date}
          time={booking.time}
        />
      </div>
    </BookingFrame>
  );
}
