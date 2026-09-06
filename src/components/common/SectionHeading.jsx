import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "./Motion";
export default function SectionHeading({ title, copy, action, soft = false }) {
  return (
    <div className="section-head-dt">
      <Reveal className="section-head-copy-dt">
        <h2 className={`display-dt text-5xl sm:text-6xl${soft ? " title-soft" : ""}`}>{title}</h2>
        {copy && <p>{copy}</p>}
      </Reveal>
      {action && (
        <Link className="btn-ghost-dt shrink-0" to={action.to}>
          {action.label}
          <ArrowUpRight size={14} />
        </Link>
      )}
    </div>
  );
}
