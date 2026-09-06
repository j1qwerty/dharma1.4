import React from "react";
import { FlowerLotus } from "@phosphor-icons/react";

export default function Brand({ dark = false }) {
  return (
    <span className="brand-dt">
      <span className="brand-mark-dt">
        <FlowerLotus size={18} weight="duotone" />
      </span>
      <span className={`brand-word-dt ${dark ? "text-white" : ""}`}>
        Dharma<span className="text-gold-500">Tribe</span>
      </span>
    </span>
  );
}
