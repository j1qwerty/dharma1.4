import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CalendarBlank, Clock, MapPin } from "@phosphor-icons/react";
import { Reveal, ParallaxImage } from "./Motion";
import FavToggle from "./FavToggle";
export default function PujaCard({ p, featured = false, index = 0 }) {
  return (
    <Reveal delay={index * 0.05}>
      <Link to={`/pujas/${p.id}`} className="card-dt block">
        <div className={`media-dt ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <ParallaxImage src={p.image} alt={p.title} className="h-full w-full" strength={12} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-2.5 py-1.5 text-[9px] font-bold text-white backdrop-blur">
            {p.tag}
          </div>
          <div className="absolute right-3 top-3">
            <FavToggle id={p.id} title={p.title} variant="photo" size={15} className="!w-9 !h-9" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="display-dt text-3xl">{p.title}</h3>
                <div className="mt-1 text-[11px] text-white/65">
                  {p.deity} · {p.temple}
                </div>
              </div>
              <div className="font-semibold text-sm">From ₹{p.price.toLocaleString("en-IN")}</div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs leading-6 text-muted-dt">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-muted-dt">
            <span className="inline-flex items-center gap-1">
              <CalendarBlank size={13} /> {p.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} /> {p.time}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} /> {p.temple}
            </span>
            <span className="ml-auto inline-flex items-center gap-1 font-bold text-gold-600">
              View <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}
