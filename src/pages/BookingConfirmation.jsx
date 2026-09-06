import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  Clock,
  VideoCamera,
} from "@phosphor-icons/react";
import { useBooking } from "../lib/booking";
import { pujas } from "../lib/data";
import { Reveal } from "../components/common/Motion";
import { LeafBranch, LotusLine, DiyaCluster, Conch, SectionDecor } from "../components/common/decor";
export default function BookingConfirmation() {
  const { booking } = useBooking();
  const p = pujas.find((x) => x.id === booking.pujaId) || pujas[0];
  return (
    <section className="site-section has-decor-dt">
        <SectionDecor />
      <DiyaCluster className="decor-dt decor-tl hide-mobile soft-tone" />
      <Conch className="decor-dt decor-br hide-mobile soft-tone" />
      <div className="container-dt max-w-[1100px]">
        <Reveal>
          <div className="panel-dt overflow-hidden">
            <div className="ink-dt p-9 sm:p-12 relative overflow-hidden">
              <div className="relative z-10">
              <CheckCircle size={38} className="text-gold-300" weight="fill" />
              <div className="eyebrow mt-6 !text-gold-300">Booking confirmed</div>
              <h1 className="display-dt mt-3 text-6xl">Your ritual is on the calendar.</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
                Your selection is recorded. The booking detail page now becomes the place to follow
                preparation, performance and delivery.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link className="btn-gold-dt" to="/booking/tracking">
                  Track booking <ArrowRight size={14} />
                </Link>
                <Link
                  className="btn-ghost-dt !border-white/15 !bg-white/[.05] !text-white"
                  to="/dashboard"
                >
                  My account
                </Link>
              </div>
              </div>
            </div>
            <div className="grid gap-5 p-7 sm:p-9 md:grid-cols-2">
              <div className="panel-dt p-5">
                <div className="text-xs muted-dt">Booking ID</div>
                <div className="mt-2 font-mono text-sm">DT-702450912</div>
                <div className="mt-6 grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="muted-dt">Puja</span>
                    <span>{p.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="muted-dt">Date</span>
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="muted-dt">Muhurat</span>
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="muted-dt">Package</span>
                    <span>{booking.package}</span>
                  </div>
                </div>
              </div>
              <div className="panel-dt p-5">
                <div className="text-xs muted-dt">What comes next</div>
                <div className="mt-4 grid gap-4">
                  {[
                    [CalendarBlank, "Preparation", "Temple team receives the booking"],
                    [Clock, "Puja performed", booking.date + " · " + booking.time],
                    [VideoCamera, "Video ready", "Recorded ceremony after processing"],
                  ].map(([Icon, a, b]) => (
                    <div key={a} className="flex gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-400 text-ink-950">
                        <Icon size={14} />
                      </span>
                      <div>
                        <div className="text-sm font-semibold">{a}</div>
                        <div className="mt-1 text-xs muted-dt">{b}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
