import React from "react";
import { Reveal } from "../components/common/Motion";
const content = {
  terms: {
    title: "Terms & Conditions",
    intro:
      "Prototype information architecture for the service rules that should sit around booking and devotional fulfilment.",
    items: [
      "Introduction",
      "Definitions",
      "Nature of devotional services",
      "Eligibility",
      "Booking rules",
      "Sankalp information responsibility",
      "Puja performance",
      "Video / photo delivery",
      "Live participation",
      "Pricing / taxes",
      "Payment",
      "Cancellation and refunds",
      "Rescheduling",
      "Force majeure",
      "Third-party temple / shipping services",
      "Intellectual property",
      "Liability and disclaimer",
      "Governing law",
      "Contact",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "Prototype information architecture for how account, booking, Sankalp, delivery and device information may be handled.",
    items: [
      "Scope",
      "Data collected",
      "Account information",
      "Sankalp / religious data",
      "Birth / astrology data",
      "Address / shipping data",
      "Payment data",
      "Device / usage data",
      "Cookies",
      "Purpose of processing",
      "Sharing with priests / temples",
      "Shipping / payment partners",
      "Data security",
      "Data retention",
      "User rights",
      "Account deletion",
      "Children / minors",
      "International data",
      "Policy updates",
      "Contact",
    ],
  },
};
export default function Legal({ type }) {
  const d = content[type];
  return (
    <section className="site-section">
      <div className="container-dt max-w-[1200px]">
        <Reveal>
          <div className="eyebrow">Legal</div>
          <h1 className="display-dt mt-3 text-6xl">{d.title}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 muted-dt">{d.intro}</p>
        </Reveal>
        <div className="mt-10 legal-layout">
          <aside className="panel-dt legal-nav p-5">
            <div className="eyebrow">On this page</div>
            <div className="mt-4 grid gap-2">
              {d.items.map((x, i) => (
                <a key={x} href={`#s${i}`} className="text-xs muted-dt hover:text-gold-600">
                  {x}
                </a>
              ))}
            </div>
          </aside>
          <article>
            {d.items.map((x, i) => (
              <Reveal key={x} delay={Math.min(i * 0.015, 0.1)}>
                <section id={`s${i}`} className="panel-dt mb-3 p-6 sm:p-7">
                  <h2 className="text-3xl">{x}</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 muted-dt">
                    Approved legal copy should replace this prototype text before production. This
                    section exists so the page hierarchy, navigation and reading rhythm can be
                    tested now.
                  </p>
                </section>
              </Reveal>
            ))}
          </article>
        </div>
      </div>
    </section>
  );
}
