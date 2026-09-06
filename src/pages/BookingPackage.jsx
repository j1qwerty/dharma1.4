import React from "react";
import BookingFrame from "../components/common/BookingFrame";
import { CheckCircle, Plus, VideoCamera } from "../components/common/Icons";
import { useBooking } from "../lib/booking";
import { useToast } from "../components/common/Toast";
export default function BookingPackage() {
  const { booking, update } = useBooking();
  const toast = useToast();
  const packs = [
    ["Individual", 1100, "One devotee"],
    ["Couple", 1650, "Two devotees"],
    ["Family", 2100, "Up to four devotees"],
  ];
  const addons = ["Additional Sankalp", "Certificate", "Live participation"];
  return (
    <BookingFrame active="package">
      <div className="eyebrow">Package</div>
      <h2 className="font-display mt-3 text-4xl">Choose the people and the extras.</h2>
      <div className="mt-7 grid gap-3 md:grid-cols-3">
        {packs.map((x) => (
          <button
            key={x[0]}
            onClick={() => {
              update({ package: x[0], packagePrice: x[1] });
              toast.push({
                type: "success",
                title: `${x[0]} package selected`,
                desc: `₹${x[1].toLocaleString("en-IN")} · ${x[2]}`,
              });
            }}
            className={`choice text-left ${booking.package === x[0] ? "active" : ""}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl">{x[0]}</span>
              {booking.package === x[0] && <CheckCircle size={18} className="text-gold-500" />}
            </div>
            <div className="mt-3 text-2xl font-semibold">₹{x[1].toLocaleString("en-IN")}</div>
            <div className="mt-1 text-xs text-muted">{x[2]}</div>
          </button>
        ))}
      </div>
      <div className="mt-10 border-t border-line pt-7">
        <div className="flex items-center gap-2">
          <VideoCamera size={18} className="text-gold-500" />
          <h3 className="font-semibold">Add-ons</h3>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {addons.map((x) => {
            const on = booking.addons.includes(x);
            return (
              <button
                key={x}
                onClick={() => {
                  update({
                    addons: on ? booking.addons.filter((a) => a !== x) : [...booking.addons, x],
                  });
                  toast.push({
                    type: on ? "info" : "success",
                    title: on ? `${x} removed` : `${x} added`,
                  });
                }}
                className={`choice flex items-center justify-between ${on ? "active" : ""}`}
              >
                <span className="text-sm">{x}</span>
                {on ? (
                  <CheckCircle size={18} className="text-gold-500" />
                ) : (
                  <Plus size={18} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </BookingFrame>
  );
}
