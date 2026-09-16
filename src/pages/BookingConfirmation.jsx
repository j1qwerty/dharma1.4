import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarBlank,
  CheckCircle,
  Clock,
  VideoCamera,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { useBooking, buildBookingWhatsAppHref } from "../lib/booking";
import { pujas } from "../lib/data";
import { Reveal } from "../components/common/Motion";
import {
  LeafBranch,
  LotusLine,
  DiyaCluster,
  Conch,
  SectionDecor,
} from "../components/common/decor";
import { useLanguage } from "../components/common/LanguageToggle";

export default function BookingConfirmation() {
  const { booking } = useBooking();
  const { t, lang } = useLanguage();
  const p = pujas.find((x) => x.id === booking.pujaId) || pujas[0];
  const waHref = buildBookingWhatsAppHref(booking, lang);
  const title = lang === "hi" && p.titleHi ? p.titleHi : p.title;
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
                <div className="eyebrow mt-6 !text-gold-300">{t("bc.confirmed")}</div>
                <h1 className="display-dt mt-3 text-6xl">{t("bc.title")}</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">{t("bc.copy")}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link className="btn-gold-dt" to="/booking/tracking">
                    {t("bc.trackBooking")} <ArrowRight size={14} />
                  </Link>
                  <a
                    className="btn-ghost-dt !border-white/15 !bg-white/[.05] !text-white"
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WhatsappLogo size={14} weight="fill" />{" "}
                    {lang === "hi" ? "WhatsApp पर भेजें" : "Send on WhatsApp"}
                  </a>
                  <Link
                    className="btn-ghost-dt !border-white/15 !bg-white/[.05] !text-white"
                    to="/dashboard"
                  >
                    {t("bc.myAccount")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="grid gap-5 p-7 sm:p-9 md:grid-cols-2">
              <div className="panel-dt p-5">
                <div className="text-xs muted-dt">{t("bc.bookingId")}</div>
                <div className="mt-2 font-mono text-sm">DT-702450912</div>
                <div className="mt-6 grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="muted-dt">{t("bpay.puja")}</span>
                    <span className="text-right">{title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="muted-dt">{t("booking.date")}</span>
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="muted-dt">{t("booking.muhurat")}</span>
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="muted-dt">{t("booking.package")}</span>
                    <span>{booking.package}</span>
                  </div>
                </div>
              </div>
              <div className="panel-dt p-5">
                <div className="text-xs muted-dt">{t("bc.whatNext")}</div>
                <div className="mt-4 grid gap-4">
                  {[
                    [CalendarBlank, t("bc.preparation"), t("bc.preparationCopy")],
                    [Clock, t("bc.pujaPerformed"), booking.date + " · " + booking.time],
                    [VideoCamera, t("bc.videoReady"), t("bc.videoReadyCopy")],
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
